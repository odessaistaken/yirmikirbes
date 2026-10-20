import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDF_DEFINITIONS } from './pdf-definitions.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mockDataPath = path.join(__dirname, '..', 'lib', 'mock-data.ts');

function main() {
  console.log("Reading lib/mock-data.ts...");
  let content = fs.readFileSync(mockDataPath, 'utf8');

  // Let's create lookup maps
  const defByImage = new Map();
  const defByCode = new Map();
  const defByName = new Map();

  for (const def of PDF_DEFINITIONS) {
    for (const img of def.matchImages) {
      defByImage.set(img.toLowerCase(), def);
    }
    for (const c of def.matchCodes) {
      defByCode.set(c.toUpperCase(), def);
    }
    defByName.set(def.canonicalName.toUpperCase(), def);
    for (const n of def.matchNames) {
      defByName.set(n.toUpperCase(), def);
    }
  }

  // Parse products from mock-data.ts
  // We will find each product object block in RAW_PRODUCTS
  // and update its description and specs if it matches a PDF definition
  const rawProductsMatch = content.match(/const RAW_PRODUCTS = (\[[\s\S]*?\n\];)/);
  if (!rawProductsMatch) {
    console.error("Could not find RAW_PRODUCTS in mock-data.ts");
    process.exit(1);
  }

  // Parse using JSON-like evaluation
  const arraySource = rawProductsMatch[1];
  const products = eval(arraySource);
  console.log(`Parsed ${products.length} products from mock-data.ts`);

  let updatedCount = 0;
  const updateSummary = [];

  for (const p of products) {
    const pImg = p.imageUrl ? path.basename(p.imageUrl, path.extname(p.imageUrl)).toLowerCase() : '';
    const pCode = (p.code || '').toUpperCase().trim();
    const pName = (p.name || '').toUpperCase().trim();

    // Matching precedence:
    // 1. Direct name match
    // 2. Direct code match
    // 3. Direct image match (only if relevant category)
    let def = defByName.get(pName);
    if (!def) {
      def = defByCode.get(pCode);
    }
    if (!def && (p.categorySlug === 'donuk-pasta' || p.categorySlug === 'taze-butik-pastalar' || p.categorySlug === 'butik-cup' || p.categorySlug === 'cup-tatlilar')) {
      def = defByImage.get(pImg);
    }

    if (def) {
      updatedCount++;
      const oldDesc = p.description;
      p.description = def.description;

      // Update specs
      p.specs = p.specs || {};
      p.specs["İçindekiler"] = def.ingredients.join(", ");
      p.specs["Net Miktar"] = def.netMiktar.toUpperCase();
      p.specs["Porsiyon"] = def.porsiyon;
      p.specs["Kutu İçi Adet"] = String(def.kutuAdet);
      p.specs["Koli İçi Adet"] = String(def.koliAdet);
      p.specs["Raf Ömrü"] = def.rafOmru;

      updateSummary.push({
        id: p.id,
        name: p.name,
        category: p.categorySlug,
        matchedPdf: def.canonicalName,
        page: def.page,
        oldDesc: oldDesc ? oldDesc.slice(0, 40) + '...' : '(empty)',
        newDesc: def.description
      });
    }
  }

  console.log(`\nUpdated ${updatedCount} products in mock-data!`);

  // Re-serialize RAW_PRODUCTS with clean formatting
  const formattedArray = JSON.stringify(products, null, 2);
  const newContent = content.replace(
    /const RAW_PRODUCTS = \[[\s\S]*?\n\];/,
    `const RAW_PRODUCTS = ${formattedArray};`
  );

  fs.writeFileSync(mockDataPath, newContent, 'utf8');
  console.log("Successfully wrote updated mock-data.ts");

  fs.writeFileSync(
    path.join(__dirname, 'applied-updates-summary.json'),
    JSON.stringify(updateSummary, null, 2),
    'utf8'
  );
  console.log("Saved update log to scripts/applied-updates-summary.json");
}

main();
