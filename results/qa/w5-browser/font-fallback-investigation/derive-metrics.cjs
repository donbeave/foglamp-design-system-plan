// Run after extracting next@16.2.4 into /tmp/foglamp-next-font.
const fs = require('node:fs');
const base = '/tmp/foglamp-next-font/package/dist/compiled/@next/font/dist';
const fontkit = require(`${base}/fontkit`).default;
const parse = fontkit.default || fontkit;
const { getFallbackMetricsFromFontFile } = require(`${base}/local/get-fallback-metrics-from-font-file`);
const font = parse(fs.readFileSync('/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/app/fonts/InterVariable.woff2'));
console.log(JSON.stringify(getFallbackMetricsFromFontFile(font, 'sans-serif'), null, 2));
