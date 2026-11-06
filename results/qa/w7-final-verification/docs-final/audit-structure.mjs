#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const repo = process.argv[2] ?? '/Users/donbeave/Projects/donbeave/foglamp-design-system';
const root = path.join(repo, 'apps/docs/content/docs');
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.mdx')) files.push(file);
  }
}
walk(root);

const result = {
  pages: files.length,
  componentPages: 0,
  duplicateH1Pages: [],
  repeatedOpeningDescriptions: [],
  mdxStoryProvenancePages: [],
  mdxAttributionSections: [],
  legacyRelativeLinks: [],
  brokenRegistryJsonLinks: [],
  missingUsageSection: [],
  componentTsxFences: 0,
  componentFencesWithoutPackageImport: [],
};

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---\s*/);
  const body = fm ? text.slice(fm[0].length) : text;
  const relative = path.relative(repo, file);
  const category = path.basename(path.dirname(file));
  const isComponent = ['primitives', 'widgets', 'charts', 'figures', 'blocks'].includes(category);
  if (/^#\s+/m.test(body)) result.duplicateH1Pages.push(relative);
  const description = fm?.[1].match(/^description:\s*["']?(.*?)["']?\s*$/m)?.[1];
  if (description && body.split(/\r?\n/).some((line) => line.trim() === description)) {
    result.repeatedOpeningDescriptions.push(relative);
  }
  if (/\bStoryProvenance\b/.test(body)) result.mdxStoryProvenancePages.push(relative);
  if (/^## Attribution\s*$/m.test(body)) result.mdxAttributionSections.push(relative);
  if (/\]\(\.\.\/\.\.\/\.\.\/(?:src\/stories|public\/r)(?:\/|\))/m.test(body)) {
    result.legacyRelativeLinks.push(relative);
  }
  for (const match of body.matchAll(/\]\((\/r\/[^)]+\.json)\)/g)) {
    const payload = path.join(repo, 'apps/docs/public', match[1]);
    if (!fs.existsSync(payload)) result.brokenRegistryJsonLinks.push({ file: relative, link: match[1] });
  }
  if (!isComponent) continue;
  result.componentPages++;
  if (!/^## (?:Usage|Example)\s*$/m.test(body)) result.missingUsageSection.push(relative);
  const fences = [...body.matchAll(/^```tsx\r?\n([\s\S]*?)^```/gm)];
  result.componentTsxFences += fences.length;
  if (fences.some((fence) => !/@tailrocks\/framerock\//.test(fence[1]))) {
    result.componentFencesWithoutPackageImport.push(relative);
  }
}

console.log(JSON.stringify(result, null, 2));
