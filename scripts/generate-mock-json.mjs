/**
 * generate-mock-json.mjs
 *
 * Extracts the RAW_PRODUCTS array from lib/mock-data.ts and writes it
 * to scripts/mock-products.json so that sync-mock-to-firestore.mjs can use it.
 *
 * It works by stripping TypeScript syntax and eval-ing the array literal.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mockDataPath = path.join(__dirname, "..", "lib", "mock-data.ts");
const outPath = path.join(__dirname, "mock-products.json");

const src = fs.readFileSync(mockDataPath, "utf8");

// Find the start of RAW_PRODUCTS
const startMarker = "const RAW_PRODUCTS = [";
const startIdx = src.indexOf(startMarker);
if (startIdx === -1) {
  console.error("Could not find RAW_PRODUCTS in mock-data.ts");
  process.exit(1);
}

// Find the closing bracket — walk character by character
let depth = 0;
let endIdx = -1;
let inString = false;
let strChar = "";
let escaped = false;

for (let i = startIdx + startMarker.length - 1; i < src.length; i++) {
  const ch = src[i];
  if (escaped) { escaped = false; continue; }
  if (ch === "\\") { escaped = true; continue; }
  if (inString) {
    if (ch === strChar) inString = false;
    continue;
  }
  if (ch === '"' || ch === "'" || ch === "`") { inString = true; strChar = ch; continue; }
  if (ch === "[" || ch === "{") depth++;
  if (ch === "]" || ch === "}") {
    depth--;
    if (depth === 0) { endIdx = i; break; }
  }
}

if (endIdx === -1) {
  console.error("Could not find end of RAW_PRODUCTS array");
  process.exit(1);
}

const arraySource = src.slice(startIdx + "const RAW_PRODUCTS = ".length, endIdx + 1);

// Evaluate — strip TypeScript-specific casts (there are none in this data)
// Just use Function constructor to evaluate the JSON-like literal
let products;
try {
  products = new Function(`return ${arraySource}`)();
} catch (e) {
  console.error("Failed to evaluate RAW_PRODUCTS:", e.message);
  process.exit(1);
}

// Now find PRODUCTS (the spread with isBestSeller etc.) — but RAW_PRODUCTS
// is sufficient since the names, prices, specs are in RAW_PRODUCTS.
// We just need to add default fields that PRODUCTS adds.
const enriched = products.map((p, i) => ({
  isActive: true,
  isFeatured: false,
  isBestSeller: false,
  vatRate: 20,
  price: 0,
  tags: [],
  specs: {},
  order: i + 1,
  ...p,
}));

fs.writeFileSync(outPath, JSON.stringify(enriched, null, 2), "utf8");
console.log(`✅  Wrote ${enriched.length} products to ${outPath}`);
