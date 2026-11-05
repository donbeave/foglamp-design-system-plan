// Next 16.2.4 dist/server/font-utils.js formula and bundled capsize metrics.
// Extract package/dist/server/capsize-font-metrics.json from next-16.2.4.tgz first.
const metrics = require('/tmp/foglamp-next-font/package/dist/server/capsize-font-metrics.json');
for (const key of ['hostGrotesk', 'geistMono']) {
  const font = metrics[key];
  const fallback = metrics.arial;
  const size = font.xWidthAvg / font.unitsPerEm / (fallback.xWidthAvg / fallback.unitsPerEm);
  const format = value => `${Math.abs(value * 100).toFixed(2)}%`;
  console.log(key, JSON.stringify({ fallback: 'Arial', ascent: format(font.ascent / font.unitsPerEm / size), descent: format(font.descent / font.unitsPerEm / size), lineGap: format(font.lineGap / font.unitsPerEm / size), sizeAdjust: format(size) }));
}
