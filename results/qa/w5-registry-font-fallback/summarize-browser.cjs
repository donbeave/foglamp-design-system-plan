const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const base = '/Users/donbeave/Projects/donbeave/foglamp-design-system-plan/results/qa/w5-registry-font-fallback';
const rawCss = JSON.parse(fs.readFileSync(path.join(base, 'logs/browser-cssom-raw.json'), 'utf8'));
const rawLoad = JSON.parse(fs.readFileSync(path.join(base, 'logs/browser-font-load-raw.json'), 'utf8'));
const page = JSON.parse(rawCss);
const loaded = JSON.parse(rawLoad);
const unquote = (value) => value.replace(/^"|"$/g, '');
const faces = page.faces.map((face) => ({...face, family: unquote(face.family), src: face.src.startsWith('url("data:font/woff2;base64,') ? 'inline woff2' : face.src.split('/').at(-1).slice(0, 70)}));
const fallbackMetrics = Object.fromEntries(faces.filter((face) => face.family.endsWith('Fallback')).map((face) => [face.family, { ascent: face.ascent, descent: face.descent, lineGap: face.lineGap, sizeAdjust: face.sizeAdjust, src: face.src }]));
const interFaces = page.faces.filter((face) => face.family === 'Inter');
const interFontSources = interFaces.map((face) => {
  const match = face.src.match(/base64,([A-Za-z0-9+/=]+)/);
  return match ? {bytes: Buffer.from(match[1], 'base64').length, sha256: crypto.createHash('sha256').update(Buffer.from(match[1], 'base64')).digest('hex')} : null;
});
const expectedMetrics = {
  'Inter Fallback': {ascent:'89.79%',descent:'22.36%',lineGap:'0%',sizeAdjust:'107.89%'},
  'Geist Mono Fallback': {ascent:'74.67%',descent:'21.92%',lineGap:'0%',sizeAdjust:'134.59%'},
  'Host Grotesk Fallback': {ascent:'96.69%',descent:'30.01%',lineGap:'0%',sizeAdjust:'104.98%'},
};
const sourceRegular = fs.readFileSync('/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/assets/InterVariable.woff2');
const sourceItalic = fs.readFileSync('/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/assets/InterVariable-Italic.woff2');
const report = {
  url: page.url,
  rootFontStack: page.rootStack,
  fallbackMetrics,
  fallbackMetricsMatch: Object.entries(expectedMetrics).every(([family, expected]) => JSON.stringify(fallbackMetrics[family]) === JSON.stringify({...expected, src:'local("Arial")'})),
  interRegular: interFontSources[0],
  interItalic: interFontSources[1],
  interNormalBytesMatchSource: interFontSources[0]?.sha256 === crypto.createHash('sha256').update(sourceRegular).digest('hex'),
  interItalicBytesMatchSource: interFontSources[1]?.sha256 === crypto.createHash('sha256').update(sourceItalic).digest('hex'),
  loadedFaces: loaded.filter((face) => face.status === 'loaded'),
};
if (!report.fallbackMetricsMatch || !report.interNormalBytesMatchSource || !report.interItalicBytesMatchSource) throw new Error(JSON.stringify(report, null, 2));
fs.writeFileSync(path.join(base, 'logs/browser-cssom-validation.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
