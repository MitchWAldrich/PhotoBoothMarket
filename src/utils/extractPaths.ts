const fs = require('fs');
const svg = fs.readFileSync('../src/assets/cornerSVG.ts'
, 'utf-8');
const ds = Array.from(svg.matchAll(/<path\s+d="([^"]+)"/g), m => m[1]);
const out = 'export const SVG_PATHS = [\n' +
  ds.map(d => `  \`${d}\`,`).join('\n') +
  '\n];\n';
fs.writeFileSync('SVG_PATHS.ts', out);
console.log(`✅ Extracted ${ds.length} paths into SVG_PATHS.ts`);