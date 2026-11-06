#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const repo = process.argv[2] ?? '/Users/donbeave/Projects/donbeave/foglamp-design-system';
const require = createRequire(path.join(repo, 'package.json'));
const ts = require('typescript');
const docsRoot = path.join(repo, 'apps/docs/content/docs');
const categories = ['primitives', 'widgets', 'charts', 'figures', 'blocks'];
const configFile = ts.readConfigFile(path.join(repo, 'apps/docs/tsconfig.json'), ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(
  configFile.config,
  ts.sys,
  path.join(repo, 'apps/docs'),
);
const catalog = JSON.parse(fs.readFileSync(path.join(repo, 'apps/docs/public/r/story-items.json'), 'utf8'));
const provenance = JSON.parse(fs.readFileSync(path.join(repo, 'scripts/provenance/manifest.json'), 'utf8'));

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : file.endsWith('.mdx') ? [file] : [];
  });
}

const pages = categories.flatMap((category) => walk(path.join(docsRoot, category))
  .filter((file) => path.basename(file) !== 'index.mdx')
  .map((file) => ({ category, file, text: fs.readFileSync(file, 'utf8') })));
function storyFor(page) {
  return path.join(repo, 'apps/docs/src/stories', page.category,
    `${path.basename(page.file, '.mdx')}.story.tsx`);
}
function targetSourceFor(page) {
  const story = fs.existsSync(storyFor(page)) ? fs.readFileSync(storyFor(page), 'utf8') : '';
  const id = story.match(/registryItem\s*:\s*['"]([^'"]+)['"]/)?.[1];
  const item = catalog.items.find((entry) => entry.registryItem === id);
  const entry = item?.upstreamPath
    ? provenance.entries.find((candidate) => candidate.upstream_path === item.upstreamPath)
    : undefined;
  return entry?.path ? path.join(repo, entry.path) : undefined;
}
const storyFiles = pages
  .map(storyFor)
  .filter((file) => fs.existsSync(file));
const targetFiles = pages.map(targetSourceFor).filter((file) => file && fs.existsSync(file));
const virtualFiles = new Map();
const moduleTargets = new Set();
for (const page of pages) {
  const apiStart = page.text.search(/^## (?:Public API|API and props)$/m);
  if (apiStart < 0) continue;
  const tail = page.text.slice(apiStart);
  const sectionEnd = tail.indexOf('\n## ');
  const apiSection = sectionEnd > 0 ? tail.slice(0, sectionEnd) : tail;
  const packageModule = page.text.match(/^- \*\*Package import\*\*: `([^`]+)`/m)?.[1];
  if (packageModule) moduleTargets.add(packageModule);
  for (const line of apiSection.split('\n')) {
    const module = line.match(/^\|\s*[^|]*\|\s*`(@tailrocks\/framerock\/[^`]+)`\s*\|/)?.[1];
    if (module) moduleTargets.add(module);
  }
}
let moduleIndex = 0;
const virtualRootMetadata = new Map();
for (const target of moduleTargets) {
  const file = path.join(docsRoot, `.api-module-${++moduleIndex}.tsx`);
  const absolute = path.resolve(file);
  virtualFiles.set(absolute, `import * as Target from ${JSON.stringify(target)}; export { Target };`);
  virtualRootMetadata.set(target, absolute);
}
const host = ts.createCompilerHost({ ...parsed.options, noEmit: true });
const originalFileExists = host.fileExists.bind(host);
const originalReadFile = host.readFile.bind(host);
const originalGetSourceFile = host.getSourceFile.bind(host);
host.fileExists = (fileName) => virtualFiles.has(path.resolve(fileName)) || originalFileExists(fileName);
host.readFile = (fileName) => virtualFiles.get(path.resolve(fileName)) ?? originalReadFile(fileName);
host.getSourceFile = (fileName, languageVersion, onError, shouldCreateNewSourceFile) => {
  const source = virtualFiles.get(path.resolve(fileName));
  return source === undefined
    ? originalGetSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile)
    : ts.createSourceFile(fileName, source, languageVersion, true, ts.ScriptKind.TSX);
};
const program = ts.createProgram([...storyFiles, ...targetFiles, ...virtualFiles.keys()],
  { ...parsed.options, noEmit: true }, host);
const checker = program.getTypeChecker();
const misses = [];
let apiPages = 0;
let resolvedPages = 0;
for (const page of pages) {
  const apiStart = page.text.search(/^## (?:Public API|API and props)$/m);
  if (apiStart < 0) continue;
  apiPages++;
  const tail = page.text.slice(apiStart);
  const nextHeading = tail.search(/^## (?!Additional props)/m);
  const apiSection = nextHeading > 0 ? tail.slice(0, nextHeading) : tail;
  const pkgImport = page.text.match(/^- \*\*Package import\*\*: `([^`]+)`/m)?.[1];
  const virtualRoot = pkgImport && virtualRootMetadata.get(pkgImport);
  const virtualSource = virtualRoot && program.getSourceFile(virtualRoot);
  const target = virtualSource?.statements.find((node) =>
    ts.isImportDeclaration(node) && node.moduleSpecifier.text === pkgImport);
  const moduleSymbol = target && checker.getSymbolAtLocation(target.moduleSpecifier);
  const sourcePath = targetSourceFor(page);
  const sourceFile = sourcePath && program.getSourceFile(path.resolve(sourcePath));
  const sourceSymbol = sourceFile && checker.getSymbolAtLocation(sourceFile);
  const sourceExports = sourceSymbol
    ? new Set(checker.getExportsOfModule(sourceSymbol).map((symbol) => symbol.name))
    : undefined;
  if (!moduleSymbol) {
    misses.push({
      page: path.relative(repo, page.file),
      issue: `Could not resolve documented target package import ${pkgImport ?? '(missing)'}`,
    });
    continue;
  }
  resolvedPages++;
  const packageExports = new Set(checker.getExportsOfModule(moduleSymbol).map((symbol) => symbol.name));
  for (const line of apiSection.split('\n')) {
    const firstColumn = line.match(/^\|\s*([^|]*)\|/m)?.[1]?.trim();
    if (!firstColumn || firstColumn === 'Export' || firstColumn === '---') continue;
    const names = [...firstColumn.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
    const moduleColumn = line.match(/^\|\s*[^|]*\|\s*`(@tailrocks\/framerock\/[^`]+)`\s*\|/)?.[1];
    const targetModule = moduleColumn ?? pkgImport;
    const virtualRoot = targetModule && virtualRootMetadata.get(targetModule);
    const virtualSource = virtualRoot && program.getSourceFile(virtualRoot);
    const targetImport = virtualSource?.statements.find((node) =>
      ts.isImportDeclaration(node) && node.moduleSpecifier.text === targetModule);
    const targetSymbol = targetImport && checker.getSymbolAtLocation(targetImport.moduleSpecifier);
    if (!targetSymbol) {
      if (names.some((name) => !name.includes('.') && name !== '—')) {
        misses.push({
          page: path.relative(repo, page.file),
          issue: `API table target module ${targetModule ?? '(missing)'} could not be resolved`,
        });
      }
      continue;
    }
    const exportedNames = new Set(checker.getExportsOfModule(targetSymbol).map((symbol) => symbol.name));
    for (const name of names) {
      if (name.includes('.') || name === '—' || exportedNames.has(name)) continue;
      if (/^(Props|Parameter|Return|Type|Prop)/i.test(name)) continue;
      misses.push({ page: path.relative(repo, page.file), issue: `API table lists ${name}, absent from exports of ${targetModule}` });
    }
  }
}

const apiRowFindings = [];
const packageImportFindings = new Map();
const pageByRelativePath = new Map(pages.map((page) => [path.relative(repo, page.file), page]));
for (const miss of misses) {
  const name = miss.issue.match(/API table lists ([^,]+), absent from exports/)?.[1];
  const page = pageByRelativePath.get(miss.page);
  const targetFile = page && targetSourceFor(page);
  const source = targetFile && program.getSourceFile(path.resolve(targetFile));
  const sourceSymbol = source && checker.getSymbolAtLocation(source);
  const targetExports = sourceSymbol
    ? new Set(checker.getExportsOfModule(sourceSymbol).map((symbol) => symbol.name))
    : new Set();
  if (name && targetExports.has(name)) {
    const findings = packageImportFindings.get(miss.page) ?? [];
    findings.push(name);
    packageImportFindings.set(miss.page, findings);
  } else {
    apiRowFindings.push(miss);
  }
}

console.log(JSON.stringify({
  repo,
  componentPages: pages.length,
  pagesWithApiTables: apiPages,
  pagesWithResolvedTargetModules: resolvedPages,
  findingsAgainstDeclaredPackageImports: misses.length,
  declaredImportFindings: misses,
  incorrectPublicApiRows: apiRowFindings.length,
  apiRowFindings,
  packageImportMismatchPages: packageImportFindings.size,
  packageImportFindings: [...packageImportFindings].map(([page, names]) => ({ page, exportsListedButUnavailableFromDeclaredPackageImport: names })),
}, null, 2));
