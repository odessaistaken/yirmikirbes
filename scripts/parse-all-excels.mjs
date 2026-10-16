import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

const excelDir = path.resolve('public/excel');

export function getAllExcelProducts() {
  const items = [];

  // Helper to push
  function add(item) {
    if (!item.name || typeof item.name !== 'string') return;
    const cleanName = item.name.trim();
    if (!cleanName || cleanName.length < 2) return;
    // Skip header words
    if (/^(ürün|urun|no|fiyat|miktar|kdv|koli|kutu|sayfa)/i.test(cleanName)) return;
    items.push({
      ...item,
      name: cleanName,
    });
  }

  // 1. 1-DONUK PASTALAR.xlsx
  {
    const wb = xlsx.readFile(path.join(excelDir, '1-DONUK PASTALAR.xlsx'));
    const rows = xlsx.utils.sheet_to_json(wb.Sheets['Sayfa1'], { header: 1 });
    // Rows start at index 2
    for (let i = 2; i < rows.length; i++) {
      const r = rows[i];
      if (!r || !r[2]) continue;
      add({
        source: '1-DONUK PASTALAR.xlsx',
        name: r[2],
        dilim: r[3],
        kutuGramaj: r[4],
        dilimGramaj: r[5],
        kutuFiyat: r[6],
        dilimFiyat: r[7],
        kdv: r[8],
      });
    }
  }

  // 2. 2-BUTİK PASTALAR.xlsx
  {
    const wb = xlsx.readFile(path.join(excelDir, '2-BUTİK PASTALAR.xlsx'));
    const rows = xlsx.utils.sheet_to_json(wb.Sheets['Sayfa1'], { header: 1 });
    for (let i = 2; i < rows.length; i++) {
      const r = rows[i];
      if (!r) continue;
      // Left side: [null, name, dilim, kutuGramaj, dilimGramaj, kutuFiyat, dilimFiyat]
      if (r[1] && typeof r[1] === 'string' && !r[1].includes('ÜRÜN')) {
        add({
          source: '2-BUTİK PASTALAR.xlsx (Sol)',
          name: r[1],
          dilim: r[2],
          kutuGramaj: r[3],
          dilimGramaj: r[4],
          kutuFiyat: r[5],
          dilimFiyat: r[6],
        });
      }
      // Right side: [..., name(col 9), dilim(10), kutuGramaj(11), dilimGramaj(12), kutuFiyat(13), dilimFiyat(14)]
      if (r[9] && typeof r[9] === 'string' && !r[9].includes('ÜRÜN')) {
        add({
          source: '2-BUTİK PASTALAR.xlsx (Sağ)',
          name: r[9],
          dilim: r[10],
          kutuGramaj: r[11],
          dilimGramaj: r[12],
          kutuFiyat: r[13],
          dilimFiyat: r[14],
        });
      }
    }
  }

  // 3. 11- KEKLER.xlsx
  {
    const wb = xlsx.readFile(path.join(excelDir, '11- KEKLER.xlsx'));
    const rows = xlsx.utils.sheet_to_json(wb.Sheets['Sayfa1'], { header: 1 });
    for (let i = 2; i < rows.length; i++) {
      const r = rows[i];
      if (!r || !r[1]) continue;
      add({
        source: '11- KEKLER.xlsx',
        name: r[1],
        dilim: r[2],
        kutuGramaj: r[3],
        dilimGramaj: r[4],
        kutuFiyat: r[5],
        dilimFiyat: r[6],
        kdv: r[7],
      });
    }
  }

  // 4. 8-KRUVASAN.xlsx
  {
    const wb = xlsx.readFile(path.join(excelDir, '8-KRUVASAN.xlsx'));
    const rows = xlsx.utils.sheet_to_json(wb.Sheets['Sayfa1'], { header: 1 });
    for (let i = 2; i < rows.length; i++) {
      const r = rows[i];
      if (!r || !r[1]) continue;
      add({
        source: '8-KRUVASAN.xlsx',
        name: r[1],
        miktar: r[2],
        fiyat: r[3],
        kdv: r[4],
        koliAdet: r[5],
      });
    }
  }

  // 5. 9-SANDİVİÇLER.xlsx
  {
    const wb = xlsx.readFile(path.join(excelDir, '9-SANDİVİÇLER.xlsx'));
    const rows = xlsx.utils.sheet_to_json(wb.Sheets['Sayfa1'], { header: 1 });
    for (let i = 2; i < rows.length; i++) {
      const r = rows[i];
      if (!r || !r[1]) continue;
      add({
        source: '9-SANDİVİÇLER.xlsx',
        name: r[1],
        miktar: r[2],
        koliAdet: r[3],
        fiyat: r[4],
      });
    }
  }

  // 6. 10-KONSANTRE İÇECEKLER.xlsx
  {
    const wb = xlsx.readFile(path.join(excelDir, '10-KONSANTRE İÇECEKLER.xlsx'));
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
    for (let i = 2; i < rows.length; i++) {
      const r = rows[i];
      if (!r || !r[1]) continue;
      add({
        source: '10-KONSANTRE İÇECEKLER.xlsx',
        name: r[1],
        miktar: r[2],
        koliAdet: r[3],
        fiyat: r[4],
        koliFiyat: r[5],
        kdv: r[6],
        hazirlanisi: r[7],
      });
    }
  }

  // 7. 12-BİTKİ ÇAYLARI.xlsx
  {
    const wb = xlsx.readFile(path.join(excelDir, '12-BİTKİ ÇAYLARI.xlsx'));
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
    for (let i = 2; i < rows.length; i++) {
      const r = rows[i];
      if (!r || !r[1]) continue;
      add({
        source: '12-BİTKİ ÇAYLARI.xlsx',
        name: r[1],
        miktar: r[2],
        fiyat: r[3],
        kdv: r[4],
      });
    }
  }

  // 8. 3-DAVİNCİ ŞURUP PÜRE SOS.xlsx
  {
    const wb = xlsx.readFile(path.join(excelDir, '3-DAVİNCİ ŞURUP PÜRE SOS.xlsx'));
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r) continue;
      if (r[1] && typeof r[1] === 'string' && !r[1].includes('ŞURUP') && !r[1].includes('ÜRÜN')) {
        add({
          source: '3-DAVİNCİ (Sol)',
          name: r[1],
          miktar: r[2],
          fiyat: r[3],
          kdv: r[4],
          brand: 'DaVinci Gourmet',
        });
      }
      if (r[7] && typeof r[7] === 'string' && !r[7].includes('ŞURUP') && !r[7].includes('ÜRÜN')) {
        add({
          source: '3-DAVİNCİ (Sağ)',
          name: r[7],
          miktar: r[8],
          fiyat: r[9],
          kdv: r[10],
          brand: 'DaVinci Gourmet',
        });
      }
    }
  }

  // 9. 4-NONNO ŞURUP PÜRE.xlsx
  {
    const wb = xlsx.readFile(path.join(excelDir, '4-NONNO ŞURUP PÜRE.xlsx'));
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
    for (let i = 2; i < rows.length; i++) {
      const r = rows[i];
      if (!r) continue;
      if (r[0] && typeof r[0] === 'string') {
        add({
          source: '4-NONNO Şurup',
          name: r[0],
          miktar: r[1],
          fiyat: r[2],
          kdv: r[3],
          brand: 'Caffè NONNO',
        });
      }
      if (r[5] && typeof r[5] === 'string') {
        add({
          source: '4-NONNO Püre',
          name: r[5],
          miktar: r[6],
          fiyat: r[7],
          kdv: r[8],
          brand: 'Caffè NONNO',
        });
      }
    }
  }

  // 10. 5-EASY MİX KOKTEYL.xlsx
  {
    const wb = xlsx.readFile(path.join(excelDir, '5-EASY MİX KOKTEYL.xlsx'));
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r) continue;
      // Premixes: col 3 is name, col 4 is Gr/Lt, col 5 is Fiyat, col 6 is KDV
      if (r[3] && typeof r[3] === 'string' && !r[3].includes('PREMİXED')) {
        add({
          source: '5-EASY MİX Premix',
          name: r[3],
          miktar: r[4],
          fiyat: r[5],
          kdv: r[6],
          brand: 'EASY MIX',
        });
      }
      // Pumps: col 9 is name, col 10 is Gr/Lt, col 11 is Fiyat, col 12 is KDV
      if (r[9] && typeof r[9] === 'string' && !r[9].includes('PUMPS')) {
        add({
          source: '5-EASY MİX Pumps',
          name: r[9],
          miktar: r[10],
          fiyat: r[11],
          kdv: r[12],
          brand: 'EASY MIX',
        });
      }
    }
  }

  // 11. 6-KAHVE MİLKSHAKE.xlsx
  {
    const wb = xlsx.readFile(path.join(excelDir, '6-KAHVE MİLKSHAKE.xlsx'));
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
    for (let i = 2; i < rows.length; i++) {
      const r = rows[i];
      if (!r || !r[0] || typeof r[0] !== 'string') continue;
      add({
        source: '6-KAHVE MİLKSHAKE.xlsx',
        name: r[0],
        miktar: r[1],
        fiyat: r[2],
        kdv: r[3],
      });
    }
  }

  // 12. 7-WAFFLE-ÇİKOLATA.xlsx
  {
    const wb = xlsx.readFile(path.join(excelDir, '7-WAFFLE-ÇİKOLATA.xlsx'));
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
    for (let i = 2; i < rows.length; i++) {
      const r = rows[i];
      if (!r) continue;
      // Left side: [num, name, koliIci, koliFiyat, adetFiyat, kdv]
      if (r[1] && typeof r[1] === 'string' && !r[1].includes('ÜRÜN')) {
        add({
          source: '7-WAFFLE (Sol)',
          name: r[1],
          koliAdet: r[2],
          koliFiyat: r[3],
          fiyat: r[4],
          kdv: r[5],
          brand: 'Callei',
        });
      }
      // Right side: [..., name(col 8), koliIci(9), koliFiyat(10), adetFiyat(11), kdv(12)]
      if (r[8] && typeof r[8] === 'string' && !r[8].includes('ÜRÜN') && !r[8].includes('KG')) {
        add({
          source: '7-WAFFLE (Sağ)',
          name: r[8],
          koliAdet: r[9],
          koliFiyat: r[10],
          fiyat: r[11],
          kdv: r[12],
          brand: 'Callei',
        });
      }
    }
  }

  // 13. MONTE CRİSTO.xlsx
  {
    const wb = xlsx.readFile(path.join(excelDir, 'MONTE CRİSTO.xlsx'));
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r) continue;
      if (r[0] && typeof r[0] === 'string') {
        add({
          source: 'MONTE CRİSTO (Sol)',
          name: r[0],
          miktar: r[1],
          fiyat: r[2],
          kdv: r[3],
          brand: 'Monte Cristo',
        });
      }
      if (r[5] && typeof r[5] === 'string') {
        add({
          source: 'MONTE CRİSTO (Sağ)',
          name: r[5],
          miktar: r[6],
          fiyat: r[7],
          kdv: r[8],
          brand: 'Monte Cristo',
        });
      }
    }
  }

  return items;
}

if (process.argv[1]?.includes('parse-all-excels.mjs')) {
  const all = getAllExcelProducts();
  console.log(`Successfully extracted ${all.length} products from Excel files!`);
  console.log('Sample items:');
  console.log(all.slice(0, 5));
  fs.writeFileSync('scratch/all_parsed_excel_products.json', JSON.stringify(all, null, 2), 'utf8');
}
