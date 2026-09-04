import { readFileSync, writeFileSync } from 'fs';

const content = readFileSync('./scripts/seed-all-products.mjs', 'utf8');

const nameLines = [];
const lines = content.split('\n');
let inProducts = false;
let currentName = '';

for (const line of lines) {
  if (line.includes('export const ALL_PRODUCTS')) { inProducts = true; continue; }
  if (!inProducts) continue;
  
  if (line.includes('"name":') && !line.includes('categoryName') && !line.includes('codeGroup') && !line.includes('categorySlug')) {
    const m = line.match(/"name":\s*"([^"]+)"/);
    if (m) currentName = m[1];
  }
  if (line.includes('"categoryName":')) {
    const m = line.match(/"categoryName":\s*"([^"]+)"/);
    if (m && currentName) {
      nameLines.push({ name: currentName, cat: m[1] });
      currentName = '';
    }
  }
}

const byCategory = {};
for (const { name, cat } of nameLines) {
  if (!byCategory[cat]) byCategory[cat] = [];
  byCategory[cat].push(name);
}

let out = `YIRMIKIRBES — TAM ÜRÜN LİSTESİ\n`;
out += `${'='.repeat(52)}\n`;
out += `Toplam Ürün: ${nameLines.length}\n`;
out += `Toplam Kategori: ${Object.keys(byCategory).length}\n`;
out += `${'='.repeat(52)}\n`;

for (const [cat, prods] of Object.entries(byCategory)) {
  out += `\n\n${cat.toUpperCase()} (${prods.length} ürün)\n`;
  out += `${'-'.repeat(44)}\n`;
  prods.forEach((n, i) => {
    out += `  ${String(i + 1).padStart(3, ' ')}. ${n}\n`;
  });
}

writeFileSync('urun-listesi-tam.txt', out, 'utf8');
console.log(`Toplam ${nameLines.length} urun, ${Object.keys(byCategory).length} kategori.`);
for (const [cat, prods] of Object.entries(byCategory)) {
  console.log(`  ${cat}: ${prods.length}`);
}
