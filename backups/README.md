# 20:45 Pastacılık — Proje ve Veritabanı Yedekleri

Bu klasör, **20:45 Pastacılık (YKB Gıda)** web sitesi projesinin kaynak kodlarının, excel verilerinin ve Firebase Firestore veritabanının tam yedeğini içerir.

---

## 📁 Yedek Dosyaları ve Yapısı

1. **Tam Proje ZIP Yedeği:**
   - `yirmikirbes_full_backup_latest.zip` (Güncel tam yedek: 937.59 MB)
   - `archives/yirmikirbes_full_backup_2026-10-16T17-52-20-445Z.zip` (Zaman damgalı arşiv)
   - *İçerik:* Tüm React/Next.js kaynak kodları (`app/`, `components/`, `lib/`), stiller, resimler ve katalog excel dosyaları (`public/`), veri aktarma ve yedekleme scriptleri (`scripts/`), ortam değişkenleri (`.env.local`, `.env.example`) ve Firebase veritabanı yedeği.

2. **Firebase Firestore Veritabanı Yedeği:**
   - `firebase/firestore_backup_latest.json` (Tüm koleksiyonların tek dosyadaki tam yedeği)
   - `firebase/history/` (Zaman damgalı geçmiş Firestore yedekleri)
   - `firebase/collections/products.json` (270 adet ürün verisi ve özellikleri)
   - `firebase/collections/categories.json` (26 adet kategori verisi)
   - `firebase/collections/sliders.json` (3 adet anasayfa slider verisi)
   - `firebase/collections/brands.json` (6 adet marka verisi)
   - `firebase/collections/users.json` (Kullanıcı profilleri)
   - `firebase/collections/contact_messages.json` (İletişim mesajları)

---

## 🚀 Projeyi ve Veritabanını Geri Yükleme Rehberi

### 1. Web Sitesini Çalıştırma:
```bash
# 1. ZIP dosyasını bir klasöre çıkarın
# 2. Bağımlılıkları yükleyin:
npm install

# 3. Geliştirme sunucusunu başlatın:
npm run dev
```

### 2. Firebase Firestore Verilerini Yeniden Yükleme (Geri Yükleme):
Eğer Firebase veritabanını yedekten geri yüklemek isterseniz:
```bash
node scripts/restore-firestore-backup.mjs
```
*(Farklı bir yedek dosyasından yüklemek için dosya yolunu parametre verebilirsiniz: `node scripts/restore-firestore-backup.mjs backups/firebase/history/firestore_backup_....json`)*

### 3. Yeni Firebase Yedeği Alma:
İleride istediğiniz an yeni bir Firebase yedeği almak için:
```bash
node scripts/backup-firestore.mjs
```

### 4. Yeni Tam Proje Yedeği Alma:
```bash
node scripts/create-full-backup.mjs
```

---
*Yedekleme Tarihi: 16.10.2026 20:53:06*
*Toplam Dosya Sayısı: 965*
*ZIP Boyutu: 937.59 MB*
