import fs from 'fs';
import path from 'path';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getAllExcelProducts } from './parse-all-excels.mjs';

const firebaseConfig = {
  apiKey: "AIzaSyARd2f0Fea3_3Rie1BdNqg-oiFDUnMQP7Y",
  authDomain: "project-6884460393570611503.firebaseapp.com",
  projectId: "project-6884460393570611503",
  storageBucket: "project-6884460393570611503.firebasestorage.app",
  messagingSenderId: "897409225916",
  appId: "1:897409225916:web:a982cd3bb5733befb22cb9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function cleanStr(s) {
  if (!s) return '';
  return s.toString()
    .replace(/davinci gourmet|da vinci gourmet|davinci|da vinci/gi, '')
    .replace(/caffè nonno|caffe nonno|nonno/gi, '')
    .replace(/callei|easy mix|monte cristo/gi, '')
    .replace(/[\(\)\[\]\-–—/]/g, ' ')
    .replace(/\b(donuk|taze|butik|gurme|şurubu|şurup|püresi|püre|sos|sosu|pasta|pastası|kek|keki|karamelize|aromalı|çeşitleri|classic|flavoured|sauce|fruit|beverage|mix|1l|2l|750ml|1000ml|1kg)\b/gi, ' ')
    .replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase()
    .replace(/[^a-z0-9ğüşıöç]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeName(s) {
  if (!s) return '';
  return s.toString()
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLowerCase()
    .replace(/[^a-z0-9ğüşıöç]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  const excelProducts = getAllExcelProducts();
  console.log(`Loaded ${excelProducts.length} Excel product rows.`);

  const mockPath = path.resolve('scripts/mock-products.json');
  const mockProducts = JSON.parse(fs.readFileSync(mockPath, 'utf8'));

  // Separate Excel products by file/category
  const pastaExcels = excelProducts.filter(e => e.source.includes('PASTA') || e.source.includes('KEK'));
  const kruvasanExcels = excelProducts.filter(e => e.source.includes('KRUVASAN'));
  const sandvicExcels = excelProducts.filter(e => e.source.includes('SANDİVİÇ'));
  const icecekExcels = excelProducts.filter(e => e.source.includes('İÇECEK'));
  const cayExcels = excelProducts.filter(e => e.source.includes('ÇAY'));
  const kahveExcels = excelProducts.filter(e => e.source.includes('KAHVE'));
  const waffleExcels = excelProducts.filter(e => e.source.includes('WAFFLE'));
  const cocktailExcels = excelProducts.filter(e => e.source.includes('EASY MİX'));
  const syrupExcels = excelProducts.filter(e => e.source.includes('DAVİNCİ') || e.source.includes('NONNO') || e.source.includes('MONTE'));

  function findExcelMatch(p) {
    const pName = (p.name || '').trim();
    const norm = normalizeName(pName);
    const cleaned = cleanStr(pName);
    const catName = (p.categoryName || '').toLowerCase();
    const catSlug = (p.categorySlug || '').toLowerCase();
    const codeGroup = (p.codeGroup || '').toLowerCase();

    // Specific manual overrides
    if (norm.includes('linzer') && norm.includes('çikolat')) {
      return pastaExcels.find(e => {
        const en = normalizeName(e.name);
        return en.includes('linzer') && en.includes('çikolat');
      });
    }
    if (norm.includes('linzer') && norm.includes('lotus')) {
      return pastaExcels.find(e => {
        const en = normalizeName(e.name);
        return en.includes('linzer') && en.includes('lotus');
      });
    }
    if (norm.includes('linzer') && (norm.includes('yaban') || norm.includes('mersin'))) {
      return pastaExcels.find(e => {
        const en = normalizeName(e.name);
        return en.includes('linzer') && en.includes('yaban');
      });
    }
    if (norm.includes('devil') && norm.includes('fıstık')) {
      return pastaExcels.find(e => normalizeName(e.name).includes('devil') && normalizeName(e.name).includes('fıstık'));
    }
    if (norm.includes('devil')) {
      return pastaExcels.find(e => normalizeName(e.name).includes('devil') && !normalizeName(e.name).includes('fıstık'));
    }

    // Determine candidate pool based on product name & category
    let pool = excelProducts;
    if (norm.includes('kruvasan') || norm.includes('danish') || norm.includes('daniş') || catName.includes('kruvasan')) {
      pool = kruvasanExcels;
    } else if (norm.includes('sandviç') || norm.includes('bagel') || norm.includes('panini') || norm.includes('ciabatta') || norm.includes('jiabatta') || norm.includes('foccacio')) {
      pool = sandvicExcels;
    } else if (catName.includes('pasta') || catSlug.includes('pasta') || catName.includes('kek') || codeGroup.includes('pastacılık') || (p.id && (p.id.includes('pt12') || p.id.includes('pt13') || p.id.includes('pt14') || p.id.includes('pt15') || p.id.includes('pt16') || p.id.includes('pt17') || p.id.includes('pt18')))) {
      pool = pastaExcels;
    } else if (catName.includes('kokteyl') || catSlug.includes('kokteyl')) {
      pool = cocktailExcels;
    } else if (catName.includes('waffle') || catSlug.includes('waffle')) {
      pool = waffleExcels;
    } else if (catName.includes('şurup') || catSlug.includes('surup') || catName.includes('püre') || catSlug.includes('pure')) {
      pool = syrupExcels;
    } else if (catName.includes('kahve') || catSlug.includes('kahve')) {
      pool = kahveExcels;
    } else if (catName.includes('çay') || catSlug.includes('cay')) {
      pool = cayExcels;
    }

    // 1. Exact match in pool
    let match = pool.find(e => normalizeName(e.name) === norm);
    if (match) return match;

    // 2. Cleaned match in pool
    match = pool.find(e => cleanStr(e.name) === cleaned);
    if (match) return match;

    // 3. Substring match in pool
    if (cleaned.length > 3) {
      match = pool.find(e => {
        const ec = cleanStr(e.name);
        return ec.length > 3 && (cleaned.includes(ec) || ec.includes(cleaned));
      });
      if (match) return match;
    }

    // 4. Word-by-word token overlap
    const pTokens = cleaned.split(' ').filter(t => t.length > 2);
    if (pTokens.length > 0) {
      let bestScore = 0;
      let bestItem = null;
      for (const e of pool) {
        const eTokens = cleanStr(e.name).split(' ').filter(t => t.length > 2);
        const overlap = pTokens.filter(t => eTokens.includes(t)).length;
        if (overlap > bestScore && overlap >= Math.min(2, pTokens.length)) {
          bestScore = overlap;
          bestItem = e;
        }
      }
      if (bestItem) return bestItem;
    }

    return null;
  }

  function buildUpdatedSpecs(p, ep) {
    const oldSpecs = p.specs || {};
    const newSpecs = {};

    const isFrozen = (p.categorySlug || '').includes('pasta') ||
      (p.categorySlug || '').includes('donuk') ||
      (p.categoryName || '').includes('Pasta') ||
      (p.codeGroup || '').includes('Pastacılık') ||
      (ep && ep.source && (ep.source.includes('DONUK') || ep.source.includes('BUTİK') || ep.source.includes('KRUVASAN') || ep.source.includes('SANDİVİÇ') || ep.source.includes('KEK')));

    // 1. Raf Ömrü combined single line
    // "Raf Ömrü, Ambalaj, ve Servis Tavsiyesi tek bir satırda olacak raf ömrü satırında olacak diğer saydıklarım kalkacak"
    if (isFrozen) {
      newSpecs['Raf Ömrü'] = "-18°C'de 12 Ay (+4°C dolapta 3 gün) • Koli (-18°C Donuk) • Servis: Çözündükten sonra doğrudan servis ediniz.";
    } else {
      newSpecs['Raf Ömrü'] = "24 Ay • Koli • Serin ve kuru yerde saklayınız.";
    }

    // 2. Kutu Gramaj & Dilim Gramaj from Excel
    if (ep && ep.dilimGramaj) {
      newSpecs['Dilim Gramaj'] = String(ep.dilimGramaj).trim();
    } else if (oldSpecs['Dilim Gramaj'] && isFrozen) {
      newSpecs['Dilim Gramaj'] = oldSpecs['Dilim Gramaj'];
    }

    if (ep && ep.kutuGramaj) {
      newSpecs['Kutu Gramaj'] = String(ep.kutuGramaj).trim();
    } else if (oldSpecs['Kutu Gramaj'] && isFrozen) {
      newSpecs['Kutu Gramaj'] = oldSpecs['Kutu Gramaj'];
    }

    // 3. Kutu İçi Dilim Adeti (Requirement: "porsiyon yerine kutu içi dilim adeti yazmasını istiyorum")
    if (ep && ep.dilim) {
      newSpecs['Kutu İçi Dilim Adeti'] = typeof ep.dilim === 'number' ? `${ep.dilim} Dilim` : String(ep.dilim).trim();
    } else if (ep && ep.koliAdet) {
      newSpecs['Kutu İçi Dilim Adeti'] = `${ep.koliAdet} Adet`;
    } else if (oldSpecs['Kutu İçi Dilim Adeti']) {
      newSpecs['Kutu İçi Dilim Adeti'] = oldSpecs['Kutu İçi Dilim Adeti'];
    } else if (oldSpecs['Porsiyon'] || oldSpecs['porsiyon'] || oldSpecs['Kutu İçi Dilim']) {
      const v = oldSpecs['Porsiyon'] || oldSpecs['porsiyon'] || oldSpecs['Kutu İçi Dilim'];
      newSpecs['Kutu İçi Dilim Adeti'] = /^\d+$/.test(String(v).trim()) ? `${String(v).trim()} Dilim` : String(v).trim();
    }

    // 4. Miktar / Hacim
    if (ep && ep.miktar) {
      newSpecs['Miktar'] = String(ep.miktar).trim();
    } else if (oldSpecs['Miktar'] || oldSpecs['Hacim']) {
      newSpecs['Miktar'] = oldSpecs['Miktar'] || oldSpecs['Hacim'];
    }

    // 5. Hazırlanışı
    if (ep && ep.hazirlanisi) {
      newSpecs['Hazırlanışı'] = String(ep.hazirlanisi).trim();
    } else if (oldSpecs['Hazırlanışı']) {
      newSpecs['Hazırlanışı'] = oldSpecs['Hazırlanışı'];
    }

    return newSpecs;
  }

  // Update Firestore
  console.log('Fetching Firestore products...');
  const snap = await getDocs(collection(db, 'products'));
  console.log(`Updating ${snap.docs.length} Firestore products...`);

  let count = 0;
  for (const d of snap.docs) {
    const data = d.data();
    const ep = findExcelMatch(data);

    let price = data.price;
    if (ep) {
      if (ep.kutuFiyat && typeof ep.kutuFiyat === 'number') price = ep.kutuFiyat;
      else if (ep.fiyat && typeof ep.fiyat === 'number') price = ep.fiyat;
    }

    const updatedSpecs = buildUpdatedSpecs(data, ep);

    let description = data.description;
    if ((d.id === 'prod-pt13-1' || (data.name || '').includes('LİNZER')) && (description || '').includes('Devils Food')) {
      description = 'Geleneksel Avusturya Linzer keki, çikolatalı krema ve fındıklı hamur.';
    }

    const updatePayload = {
      specs: updatedSpecs,
      updatedAt: serverTimestamp(),
    };
    if (price && price > 0) updatePayload.price = price;
    if (description) updatePayload.description = description;

    await updateDoc(doc(db, 'products', d.id), updatePayload);
    count++;
    if (count % 30 === 0 || d.id === 'prod-pt13-1') {
      console.log(`Firestore ✅ [${d.id}] "${data.name}" -> Kutu İçi: ${updatedSpecs['Kutu İçi Dilim Adeti']}, Dilim Gr: ${updatedSpecs['Dilim Gramaj']}, Kutu Gr: ${updatedSpecs['Kutu Gramaj']}, Fiyat: ${price}`);
    }
  }

  // Update scripts/mock-products.json
  const updatedMockProducts = mockProducts.map(p => {
    const ep = findExcelMatch(p);
    let price = p.price;
    if (ep) {
      if (ep.kutuFiyat && typeof ep.kutuFiyat === 'number') price = ep.kutuFiyat;
      else if (ep.fiyat && typeof ep.fiyat === 'number') price = ep.fiyat;
    }
    const specs = buildUpdatedSpecs(p, ep);
    let desc = p.description;
    if ((p.id === 'prod-pt13-1' || (p.name || '').includes('LİNZER')) && (desc || '').includes('Devils Food')) {
      desc = 'Geleneksel Avusturya Linzer keki, çikolatalı krema ve fındıklı hamur.';
    }
    return { ...p, price, specs, description: desc };
  });
  fs.writeFileSync(mockPath, JSON.stringify(updatedMockProducts, null, 2), 'utf8');

  // Update products_json.json
  const prodJsonPath = path.resolve('products_json.json');
  if (fs.existsSync(prodJsonPath)) {
    const rawProdJson = JSON.parse(fs.readFileSync(prodJsonPath, 'utf8'));
    if (Array.isArray(rawProdJson)) {
      const updatedRaw = rawProdJson.map(p => {
        const ep = findExcelMatch(p);
        let price = p.price;
        if (ep) {
          if (ep.kutuFiyat && typeof ep.kutuFiyat === 'number') price = ep.kutuFiyat;
          else if (ep.fiyat && typeof ep.fiyat === 'number') price = ep.fiyat;
        }
        const specs = buildUpdatedSpecs(p, ep);
        let desc = p.description;
        if ((p.id === 'prod-pt13-1' || (p.name || '').includes('LİNZER')) && (desc || '').includes('Devils Food')) {
          desc = 'Geleneksel Avusturya Linzer keki, çikolatalı krema ve fındıklı hamur.';
        }
        return { ...p, price, specs, description: desc };
      });
      fs.writeFileSync(prodJsonPath, JSON.stringify(updatedRaw, null, 2), 'utf8');
    }
  }

  // Update lib/mock-data.ts RAW_PRODUCTS
  let tsContent = fs.readFileSync('lib/mock-data.ts', 'utf8');
  const startMarker = 'const RAW_PRODUCTS = [';
  const startIdx = tsContent.indexOf(startMarker);
  const endMarker = 'export const PRODUCTS';
  const endIdx = tsContent.indexOf(endMarker, startIdx);
  if (startIdx !== -1 && endIdx !== -1) {
    const jsonStr = JSON.stringify(updatedMockProducts, null, 2);
    const newRawProducts = 'const RAW_PRODUCTS = ' + jsonStr + ';\n\n';
    tsContent = tsContent.slice(0, startIdx) + newRawProducts + tsContent.slice(endIdx);
    fs.writeFileSync('lib/mock-data.ts', tsContent, 'utf8');
  }

  console.log(`\n🎉 TAMAMLANDI! ${count} ürünün verileri Excel'den çekildi ve Firestore/MockData güncellendi!`);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
