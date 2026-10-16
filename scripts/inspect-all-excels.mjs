import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

const excelDir = path.resolve('public/excel');
const files = fs.readdirSync(excelDir).filter(f => f.endsWith('.xlsx'));

for (const f of files) {
  console.log('====================================');
  console.log('FILE:', f);
  const wb = xlsx.readFile(path.join(excelDir, f));
  for (const s of wb.SheetNames) {
    console.log('--- Sheet:', s);
    const data = xlsx.utils.sheet_to_json(wb.Sheets[s], { header: 1 });
    for (let i = 0; i < Math.min(12, data.length); i++) {
      if (data[i] && data[i].length) {
        console.log(`[${i}]`, JSON.stringify(data[i]));
      }
    }
  }
}
