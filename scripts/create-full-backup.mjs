import fs from "fs";
import path from "path";
import JSZip from "jszip";

const EXCLUDE_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "out",
  ".tempmediaStorage",
  ".system_generated",
]);

const EXCLUDE_FILES = new Set([
  "tsconfig.tsbuildinfo",
]);

function shouldExclude(relPath) {
  const normalized = relPath.replace(/\\/g, "/");
  const parts = normalized.split("/");

  // Check directories
  for (const p of parts) {
    if (EXCLUDE_DIRS.has(p)) return true;
  }

  // Do not include previous zip archives inside the new zip
  if (normalized.endsWith(".zip")) return true;

  const fileName = parts[parts.length - 1];
  if (EXCLUDE_FILES.has(fileName)) return true;
  if (fileName.endsWith(".log") || fileName.endsWith(".tmp")) return true;

  return false;
}

function getAllFiles(dirPath, arrayOfFiles = [], baseDir = "") {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relPath = path.relative(baseDir || dirPath, fullPath);

    if (shouldExclude(relPath)) {
      continue;
    }

    if (entry.isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles, baseDir || dirPath);
    } else {
      arrayOfFiles.push({ fullPath, relPath });
    }
  }

  return arrayOfFiles;
}

async function main() {
  const rootDir = process.cwd();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupsDir = path.join(rootDir, "backups");
  const archivesDir = path.join(backupsDir, "archives");

  fs.mkdirSync(archivesDir, { recursive: true });

  console.log(`\n======================================================`);
  console.log(`📦 20:45 PASTACILIK — TAM PROJE & WEB SİTESİ YEDEĞİ`);
  console.log(`Tarih: ${new Date().toLocaleString("tr-TR")}`);
  console.log(`======================================================\n`);

  console.log(`1. Dosyalar taranıyor (node_modules, .next ve .git hariç tutuluyor)...`);
  const files = getAllFiles(rootDir, [], rootDir);
  console.log(`✓ Toplam ${files.length} dosya yedekleme listesine alındı.`);

  const zip = new JSZip();

  let processedCount = 0;
  for (const file of files) {
    const relPath = file.relPath.replace(/\\/g, "/");
    const content = fs.readFileSync(file.fullPath);
    zip.file(relPath, content);
    processedCount++;
    if (processedCount % 100 === 0 || processedCount === files.length) {
      process.stdout.write(`\rSıkıştırılıyor: ${processedCount} / ${files.length} dosya...`);
    }
  }
  console.log(`\n✓ Tüm dosyalar ZIP paketine eklendi.`);

  const zipFileName = `yirmikirbes_full_backup_${timestamp}.zip`;
  const zipFilePath = path.join(archivesDir, zipFileName);
  const latestZipPath = path.join(backupsDir, "yirmikirbes_full_backup_latest.zip");

  console.log(`\n2. ZIP arşivi oluşturuluyor ve diske yazılıyor (DEFLATE)...`);
  const buffer = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  fs.writeFileSync(zipFilePath, buffer);
  // Also copy/write to latest
  fs.writeFileSync(latestZipPath, buffer);

  const sizeMb = (buffer.length / (1024 * 1024)).toFixed(2);

  // Write comprehensive README for backups
  const readmeContent = `# 20:45 Pastacılık — Proje ve Veritabanı Yedekleri

Bu klasör, **20:45 Pastacılık (YKB Gıda)** web sitesi projesinin kaynak kodlarının, excel verilerinin ve Firebase Firestore veritabanının tam yedeğini içerir.

---

## 📁 Yedek Dosyaları ve Yapısı

1. **Tam Proje ZIP Yedeği:**
   - \`yirmikirbes_full_backup_latest.zip\` (Güncel tam yedek: ${sizeMb} MB)
   - \`archives/${zipFileName}\` (Zaman damgalı arşiv)
   - *İçerik:* Tüm React/Next.js kaynak kodları (\`app/\`, \`components/\`, \`lib/\`), stiller, resimler ve katalog excel dosyaları (\`public/\`), veri aktarma ve yedekleme scriptleri (\`scripts/\`), ortam değişkenleri (\`.env.local\`, \`.env.example\`) ve Firebase veritabanı yedeği.

2. **Firebase Firestore Veritabanı Yedeği:**
   - \`firebase/firestore_backup_latest.json\` (Tüm koleksiyonların tek dosyadaki tam yedeği)
   - \`firebase/history/\` (Zaman damgalı geçmiş Firestore yedekleri)
   - \`firebase/collections/products.json\` (270 adet ürün verisi ve özellikleri)
   - \`firebase/collections/categories.json\` (26 adet kategori verisi)
   - \`firebase/collections/sliders.json\` (3 adet anasayfa slider verisi)
   - \`firebase/collections/brands.json\` (6 adet marka verisi)
   - \`firebase/collections/users.json\` (Kullanıcı profilleri)
   - \`firebase/collections/contact_messages.json\` (İletişim mesajları)

---

## 🚀 Projeyi ve Veritabanını Geri Yükleme Rehberi

### 1. Web Sitesini Çalıştırma:
\`\`\`bash
# 1. ZIP dosyasını bir klasöre çıkarın
# 2. Bağımlılıkları yükleyin:
npm install

# 3. Geliştirme sunucusunu başlatın:
npm run dev
\`\`\`

### 2. Firebase Firestore Verilerini Yeniden Yükleme (Geri Yükleme):
Eğer Firebase veritabanını yedekten geri yüklemek isterseniz:
\`\`\`bash
node scripts/restore-firestore-backup.mjs
\`\`\`
*(Farklı bir yedek dosyasından yüklemek için dosya yolunu parametre verebilirsiniz: \`node scripts/restore-firestore-backup.mjs backups/firebase/history/firestore_backup_....json\`)*

### 3. Yeni Firebase Yedeği Alma:
İleride istediğiniz an yeni bir Firebase yedeği almak için:
\`\`\`bash
node scripts/backup-firestore.mjs
\`\`\`

### 4. Yeni Tam Proje Yedeği Alma:
\`\`\`bash
node scripts/create-full-backup.mjs
\`\`\`

---
*Yedekleme Tarihi: ${new Date().toLocaleString("tr-TR")}*
*Toplam Dosya Sayısı: ${files.length}*
*ZIP Boyutu: ${sizeMb} MB*
`;

  fs.writeFileSync(path.join(backupsDir, "README.md"), readmeContent, "utf8");

  console.log(`\n======================================================`);
  console.log(`✅ TAM YEDEKLEME BAŞARIYLA TAMAMLANDI!`);
  console.log(`Arşiv Dosyası: ${zipFilePath}`);
  console.log(`Güncel Yedek Kopyası: ${latestZipPath}`);
  console.log(`Boyut: ${sizeMb} MB (${buffer.length} bayt)`);
  console.log(`Dosya Sayısı: ${files.length}`);
  console.log(`Rehber: backups/README.md`);
  console.log(`======================================================\n`);
}

main().catch((err) => {
  console.error("Tam yedekleme sırasında hata:", err);
  process.exit(1);
});
