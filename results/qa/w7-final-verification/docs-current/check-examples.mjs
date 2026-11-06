#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const repo = process.argv[2] ?? '/Users/donbeave/Projects/donbeave/foglamp-design-system';
const docsRoot = path.join(repo, 'apps/docs/content/docs');
const require = createRequire(path.join(repo, 'package.json'));
const ts = require('typescript');

const globals = new Set([
  'Array', 'Boolean', 'Date', 'Error', 'Infinity', 'JSON', 'Map', 'Math',
  'NaN', 'Number', 'Object', 'Promise', 'RegExp', 'Set', 'String', 'Symbol',
  'URL', 'URLSearchParams', 'CustomEvent', 'Event', 'console', 'document',
  'globalThis', 'localStorage', 'null', 'undefined', 'window', 'ReactNode',
  'SVGProps', 'CSSProperties', 'const',
]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : file.endsWith('.mdx') ? [file] : [];
  });
}

function bindingNames(name, names) {
  if (ts.isIdentifier(name)) names.add(name.text);
  else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
    for (const element of name.elements) {
      if (ts.isBindingElement(element)) bindingNames(element.name, names);
    }
  }
}

function candidateIdentifier(node) {
  const parent = node.parent;
  if (!parent) return false;
  if ((ts.isJsxOpeningElement(parent) || ts.isJsxSelfClosingElement(parent) ||
       ts.isJsxClosingElement(parent)) && parent.tagName === node &&
      /^[a-z]/.test(node.text)) return false;
  if ((ts.isPropertyAccessExpression(parent) && parent.name === node) ||
      (ts.isPropertyAssignment(parent) && parent.name === node) ||
      (ts.isMethodDeclaration(parent) && parent.name === node) ||
      (ts.isPropertyDeclaration(parent) && parent.name === node) ||
      (ts.isPropertySignature(parent) && parent.name === node) ||
      (ts.isJsxAttribute(parent) && parent.name === node) ||
      (ts.isVariableDeclaration(parent) && parent.name === node) ||
      (ts.isParameter(parent) && parent.name === node) ||
      (ts.isFunctionDeclaration(parent) && parent.name === node) ||
      (ts.isClassDeclaration(parent) && parent.name === node) ||
      (ts.isInterfaceDeclaration(parent) && parent.name === node) ||
      (ts.isTypeAliasDeclaration(parent) && parent.name === node) ||
      (ts.isImportSpecifier(parent) && (parent.name === node || parent.propertyName === node)) ||
      (ts.isImportClause(parent) && parent.name === node) ||
      (ts.isNamespaceImport(parent) && parent.name === node) ||
      (ts.isTypeParameterDeclaration(parent) && parent.name === node) ||
      (ts.isLabeledStatement(parent) && parent.label === node) ||
      (ts.isBreakOrContinueStatement(parent) && parent.label === node)) return false;
  if (ts.isJsxNamespacedName(parent)) return false;
  return true;
}

function analyze(source, fileLabel) {
  const sf = ts.createSourceFile(fileLabel, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const declared = new Set(globals);
  const uses = new Map();
  function collectDeclarations(node) {
    if (ts.isImportDeclaration(node) && node.importClause) {
      const clause = node.importClause;
      if (clause.name) declared.add(clause.name.text);
      if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
        declared.add(clause.namedBindings.name.text);
      } else if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
        clause.namedBindings.elements.forEach((item) => declared.add(item.name.text));
      }
    }
    if (ts.isVariableDeclaration(node) || ts.isParameter(node) || ts.isBindingElement(node)) {
      bindingNames(node.name, declared);
    }
    if ((ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) ||
         ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) ||
         ts.isEnumDeclaration(node)) && node.name) declared.add(node.name.text);
    if (ts.isTypeParameterDeclaration(node)) declared.add(node.name.text);
    ts.forEachChild(node, collectDeclarations);
  }
  collectDeclarations(sf);

  function collectUses(node) {
    if (ts.isIdentifier(node) && candidateIdentifier(node)) {
      const name = node.text;
      if (!uses.has(name)) uses.set(name, node.getStart(sf));
    }
    ts.forEachChild(node, collectUses);
  }
  collectUses(sf);
  return [...uses]
    .filter(([name]) => !declared.has(name))
    .filter(([name]) => /^[A-Za-z_$][\w$]*$/.test(name))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, offset]) => ({ name, line: sf.getLineAndCharacterOfPosition(offset).line + 1 }));
}

const summaries = [];
const virtualFiles = new Map();
const virtualMetadata = new Map();
let virtualSequence = 0;
for (const file of walk(docsRoot)) {
  const body = fs.readFileSync(file, 'utf8');
  const codeFences = [...body.matchAll(/^```tsx\s*\n([\s\S]*?)^```\s*$/gm)];
  codeFences.forEach((match, index) => {
    const virtualFile = path.join(path.dirname(file), `.mdx-example-${++virtualSequence}.tsx`);
    virtualFiles.set(path.resolve(virtualFile), match[1]);
    virtualMetadata.set(path.resolve(virtualFile), {
      file: path.relative(repo, file),
      fence: index + 1,
    });
    const findings = analyze(match[1], `${file}#tsx-${index + 1}`);
    if (findings.length) summaries.push({
      file: path.relative(repo, file),
      fence: index + 1,
      names: findings.map(({ name }) => name),
    });
  });
}

const configPath = path.join(repo, 'apps/docs/tsconfig.json');
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
if (configFile.error) throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));
const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(configPath));
const compilerOptions = {
  ...parsedConfig.options,
  noEmit: true,
  incremental: false,
  composite: false,
  rootDir: undefined,
  outDir: undefined,
};
const host = ts.createCompilerHost(compilerOptions);
const originalFileExists = host.fileExists.bind(host);
const originalReadFile = host.readFile.bind(host);
const originalGetSourceFile = host.getSourceFile.bind(host);
host.fileExists = (fileName) => virtualFiles.has(path.resolve(fileName)) || originalFileExists(fileName);
host.readFile = (fileName) => virtualFiles.get(path.resolve(fileName)) ?? originalReadFile(fileName);
host.getSourceFile = (fileName, languageVersion, onError, shouldCreateNewSourceFile) => {
  const source = virtualFiles.get(path.resolve(fileName));
  if (source !== undefined) {
    return ts.createSourceFile(fileName, source, languageVersion, true, ts.ScriptKind.TSX);
  }
  return originalGetSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile);
};
const program = ts.createProgram([...virtualFiles.keys()], compilerOptions, host);
const typecheckDiagnostics = ts.getPreEmitDiagnostics(program)
  .filter((diagnostic) => diagnostic.file && virtualMetadata.has(path.resolve(diagnostic.file.fileName)))
  .map((diagnostic) => {
    const metadata = virtualMetadata.get(path.resolve(diagnostic.file.fileName));
    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start ?? 0);
    return {
      ...metadata,
      line: line + 1,
      column: character + 1,
      code: diagnostic.code,
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
    };
  });

console.log(JSON.stringify({
  repo,
  tsxFenceCount: virtualFiles.size,
  likelyUnboundFenceCount: summaries.length,
  findings: summaries,
  typecheck: {
    virtualRootCount: virtualFiles.size,
    diagnosticCount: typecheckDiagnostics.length,
    diagnostics: typecheckDiagnostics,
  },
}, null, 2));
