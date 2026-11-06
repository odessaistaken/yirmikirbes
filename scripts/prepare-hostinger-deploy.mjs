import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const rootDir = process.cwd();
const deployDir = path.join(rootDir, "hostinger-deploy");
const standaloneDir = path.join(rootDir, ".next", "standalone");
const staticDir = path.join(rootDir, ".next", "static");
const publicDir = path.join(rootDir, "public");

console.log("🚀 Hostinger yayına hazırlama süreci başladı...");

if (!fs.existsSync(standaloneDir)) {
  console.error("❌ .next/standalone klasörü bulunamadı! Lütfen önce derlemeyi tamamlayın.");
  process.exit(1);
}

// 1. Temiz hostinger-deploy klasörü oluştur
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true, force: true });
}
fs.mkdirSync(deployDir, { recursive: true });

// 2. Standalone içeriğini kopyala
console.log("📦 Standalone dosyaları kopyalanıyor...");
fs.cpSync(standaloneDir, deployDir, { recursive: true });

// 3. .next/static klasörünü deployDir/.next/static içine kopyala
const targetStaticDir = path.join(deployDir, ".next", "static");
console.log("🎨 Statik varlıklar (.next/static) kopyalanıyor...");
fs.mkdirSync(targetStaticDir, { recursive: true });
fs.cpSync(staticDir, targetStaticDir, { recursive: true });

// 4. public klasörünü deployDir/public içine kopyala
const targetPublicDir = path.join(deployDir, "public");
console.log("🖼️ Public klasörü kopyalanıyor...");
fs.cpSync(publicDir, targetPublicDir, { recursive: true });

// 5. .env.local varsa kopyala (.env.production olarak da)
const envLocalPath = path.join(rootDir, ".env.local");
if (fs.existsSync(envLocalPath)) {
  console.log("🔑 .env.local kopyalanıyor...");
  fs.copyFileSync(envLocalPath, path.join(deployDir, ".env.local"));
  fs.copyFileSync(envLocalPath, path.join(deployDir, ".env.production"));
}

// 6. Hostinger için ecosystem.config.js (PM2 / Node process yöneticisi için opsiyonel ama hayat kurtarır)
const ecosystemContent = `module.exports = {
  apps: [
    {
      name: "yirmikirbes",
      script: "server.js",
      env: {
        PORT: process.env.PORT || 3000,
        NODE_ENV: "production"
      }
    }
  ]
};
`;
fs.writeFileSync(path.join(deployDir, "ecosystem.config.js"), ecosystemContent, "utf-8");

// 7. Zip arşivi oluştur (PowerShell Compress-Archive)
const zipPath = path.join(rootDir, "hostinger-deploy.zip");
if (fs.existsSync(zipPath)) {
  fs.rmSync(zipPath, { force: true });
}

console.log("🗜️ hostinger-deploy.zip arşivi oluşturuluyor...");
try {
  // Use PowerShell Compress-Archive without progress output
  execSync(`powershell -NoProfile -Command "$ProgressPreference = 'SilentlyContinue'; Compress-Archive -Path '${deployDir}\\*' -DestinationPath '${zipPath}' -Force"`, {
    stdio: "inherit"
  });
  console.log("✅ hostinger-deploy.zip başarıyla oluşturuldu!");
} catch (err) {
  console.warn("⚠️ Zip oluşturma hatası, ancak hostinger-deploy klasörü hazır:", err.message);
}

console.log("\n🎉 TEBRİKLER! Hostinger için yayın paketi hazır:");
console.log(`📁 Klasör: ${deployDir}`);
console.log(`📦 Zip Dosyası: ${zipPath}`);
