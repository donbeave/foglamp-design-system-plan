#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const repo = process.argv[2] ?? '/Users/donbeave/Projects/donbeave/foglamp-design-system';
const require = createRequire(path.join(repo, 'package.json'));
const pkg = require(path.join(repo, 'packages/design-system/package.json'));
const docsRoot = path.join(repo, 'apps/docs/content/docs');
const packageRoot = path.join(repo, 'packages/design-system');
const seen = new Map();

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : file.endsWith('.mdx') ? [file] : [];
  });
}

for (const file of walk(docsRoot)) {
  const text = fs.readFileSync(file, 'utf8');
  const packageImport = text.match(/^- \*\*Package import\*\*: `(@tailrocks\/framerock[^`]+)`/m)?.[1];
  if (packageImport) {
    const entry = seen.get(packageImport) ?? { pages: [], snippets: 0 };
    entry.pages.push(path.relative(repo, file));
    seen.set(packageImport, entry);
  }
  for (const match of text.matchAll(/\bfrom\s*["'](@tailrocks\/framerock[^"']+)["']/g)) {
    const entry = seen.get(match[1]) ?? { pages: [], snippets: 0 };
    entry.snippets++;
    seen.set(match[1], entry);
  }
}

const exportEntries = Object.entries(pkg.exports ?? {}).map(([key, target]) => [key.replace(/^\.\//, ''), target]);
function resolveExport(subpath) {
  const exact = exportEntries.find(([key]) => key === subpath);
  if (exact) return exact[1];
  const matches = exportEntries.flatMap(([key, target]) => {
    const marker = key.indexOf('*');
    if (marker < 0) return [];
    const before = key.slice(0, marker);
    const after = key.slice(marker + 1);
    if (!subpath.startsWith(before) || !subpath.endsWith(after)) return [];
    return [{ target, pattern: key, capture: subpath.slice(before.length, subpath.length - after.length) }];
  }).sort((a, b) => b.pattern.length - a.pattern.length);
  const match = matches[0];
  return match ? match.target.replace('*', match.capture) : undefined;
}

const findings = [];
for (const [specifier, usage] of seen) {
  const subpath = specifier === '@tailrocks/framerock' ? '.' : `./${specifier.slice('@tailrocks/framerock/'.length)}`;
  const target = resolveExport(subpath.replace(/^\.\//, ''));
  if (!target) {
    findings.push({ specifier, pages: usage.pages, snippets: usage.snippets, issue: 'No matching package.json exports entry' });
    continue;
  }
  const resolved = path.resolve(packageRoot, target);
  if (!resolved.startsWith(`${packageRoot}${path.sep}`) || !fs.existsSync(resolved)) {
    findings.push({ specifier, target, pages: usage.pages, snippets: usage.snippets, issue: 'Mapped export target does not exist under package root' });
  }
}

console.log(JSON.stringify({
  repo,
  uniqueDocumentedSubpaths: seen.size,
  packageExports: exportEntries.length,
  checkedOccurrences: [...seen.values()].reduce((sum, item) => sum + item.pages.length + item.snippets, 0),
  findingCount: findings.length,
  findings,
}, null, 2));
