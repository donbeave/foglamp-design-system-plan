const fs = require('node:fs');
const path = require('node:path');
const dir = '/Users/donbeave/Projects/donbeave/foglamp-design-system-plan/results/qa/w5-registry-font-fallback/fixture-final/dist/assets';
const css = fs.readdirSync(dir).filter((file) => file.endsWith('.css')).map((file) => fs.readFileSync(path.join(dir, file), 'utf8')).join('\n');
const checks = {
  interFallbackFace: /font-family:["']?Inter Fallback/.test(css),
  geistMonoFallbackFace: /font-family:["']?Geist Mono Fallback/.test(css),
  hostGroteskFallbackFace: /font-family:["']?Host Grotesk Fallback/.test(css),
  fallbackMetrics: ['89.79%', '22.36%', '107.89%', '74.67%', '21.92%', '134.59%', '96.69%', '30.01%', '104.98%'].every((metric) => css.includes(metric)),
  interStack: /--font-sans:\s*Inter,\s*["']Inter Fallback["'],\s*sans-serif/.test(css),
  geistStack: /--font-geist-mono:\s*["']Geist Mono Variable["'],\s*["']Geist Mono Fallback["'],\s*monospace/.test(css),
  hostStack: /--font-host-grotesk:\s*["']Host Grotesk Variable["'],\s*["']Host Grotesk Fallback["'],\s*sans-serif/.test(css),
  embeddedInterFonts: (css.match(/data:font\/woff2;base64,/g) || []).length >= 2,
};
if (Object.values(checks).some((value) => !value)) throw new Error(JSON.stringify(checks, null, 2));
console.log(JSON.stringify({ ...checks, builtCssBytes: Buffer.byteLength(css) }, null, 2));
