import fs from 'fs';
import { getAllExcelProducts } from './parse-all-excels.mjs';

function normalize(s) {
  if (!s) return '';
  return s.toString()
    .replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase()
    .replace(/[^a-z0-9ğüşıöç]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const excelProds = getAllExcelProducts();
const mockProds = JSON.parse(fs.readFileSync('scripts/mock-products.json', 'utf8'));

console.log(`Total mock products: ${mockProds.length}`);
console.log(`Total excel products: ${excelProds.length}`);

// Build lookup maps from Excel
const excelMap = new Map();
for (const ep of excelProds) {
  const norm = normalize(ep.name);
  if (!excelMap.has(norm)) {
    excelMap.set(norm, ep);
  }
}

let matched = 0;
let unmatched = [];

for (const mp of mockProds) {
  const norm = normalize(mp.name);
  let ep = excelMap.get(norm);

  // Try substring or partial match
  if (!ep) {
    for (const [eNorm, eProd] of excelMap.entries()) {
      if (norm.includes(eNorm) || eNorm.includes(norm)) {
        ep = eProd;
        break;
      }
    }
  }

  if (ep) {
    matched++;
  } else {
    unmatched.push(mp.name);
  }
}

console.log(`Direct/fuzzy matched: ${matched} / ${mockProds.length}`);
console.log(`Unmatched sample (first 15):`, unmatched.slice(0, 15));
