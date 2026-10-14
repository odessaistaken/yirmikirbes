/**
 * Excel Veri Yönetimi — Firestore Servisi
 *
 * Bu servis YALNIZCA admin panelindeki Excel yükleme modülüne aittir.
 * Müşteri kataloğu, sunum kataloğu veya ürün koleksiyonları ile
 * HİÇBİR ilişkisi yoktur.
 *
 * Firestore Koleksiyonu: "excelImports"
 */

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  Timestamp,
  serverTimestamp,
  type Firestore,
} from "firebase/firestore";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ExcelImportRecord {
  id: string;
  fileName: string;
  sheetName: string;
  importedAt: Timestamp;
  updatedAt?: Timestamp;
  rowCount: number;
  columns: string[];
  rows: Record<string, unknown>[];
}

export interface NewExcelImport {
  fileName: string;
  sheetName: string;
  rowCount: number;
  columns: string[];
  rows: Record<string, unknown>[];
}

export interface DetectedRowData {
  id: string | number;
  title: string;
  imageUrl: string;
  price: string | number;
  category: string;
  code: string;
  description: string;
  rawRow: Record<string, unknown>;
  // Resolved field names so we know which keys in rawRow to update
  keys: {
    titleKey: string;
    imageKey: string;
    priceKey: string;
    categoryKey: string;
    codeKey: string;
    descriptionKey: string;
  };
}

// ── Collection name — completely separate from catalog ─────────────────────────
const COLLECTION = "excelImports";

// ── Helper: Intelligently detect product fields from dynamic Excel row ──────────

function normalizeKey(str: string): string {
  return str
    .replace(/İ/g, "i")
    .replace(/I/g, "ı")
    .trim()
    .toLowerCase();
}

export function detectRowFields(
  row: Record<string, unknown>,
  columns: string[] = []
): DetectedRowData {
  const rowKeys = Object.keys(row);
  const allKeys = columns.length > 0 ? columns : rowKeys;

  // Helper matcher with Turkish character normalization
  const findKey = (patterns: (string | RegExp)[]): string => {
    for (const pat of patterns) {
      for (const k of allKeys) {
        const lower = normalizeKey(k);
        if (typeof pat === "string") {
          const patLower = normalizeKey(pat);
          if (lower === patLower) return k;
        } else if (pat.test(lower)) {
          return k;
        }
      }
    }
    return "";
  };

  // 1. Image Key detection
  let imageKey = findKey([
    "görsel",
    "gorsel",
    "resim",
    "image",
    "imageurl",
    "img",
    "foto",
    "fotograf",
    "fotoğraf",
    "resimyolu",
    "resim_yolu",
    "gorsel_yolu",
    "picture",
    "thumbnail",
    /image/i,
    /g[öo]rsel/i,
    /resim/i,
    /foto/i,
  ]);

  // If no explicit image column name found, check if any column value looks like an image URL/path/base64
  if (!imageKey) {
    for (const k of rowKeys) {
      const val = String(row[k] ?? "").trim();
      if (
        val.startsWith("data:image/") ||
        ((val.startsWith("http://") ||
          val.startsWith("https://") ||
          val.startsWith("/resimler/") ||
          val.startsWith("/")) &&
          /\.(png|jpe?g|webp|svg|gif|avif)(\?.*)?$/i.test(val))
      ) {
        imageKey = k;
        break;
      }
    }
  }

  // 2. Title / Name Key
  let titleKey = findKey([
    "ürün adı",
    "urun adi",
    "ürünadı",
    "urunadi",
    "ürün",
    "urun",
    "başlık",
    "baslik",
    "name",
    "title",
    "ad",
    "isim",
    "lezzet",
    "çeşit",
    "çeşidi",
    "premixed",
    "pumps",
    "da vinci şurup",
    "da vinci surup",
    "monte cristo",
    "nonno şurup",
    "nonno surup",
    "callei",
    /ad[ıi]?$/i,
    /isim$/i,
    /ürün/i,
    /urun/i,
  ]);

  // Fallback: If no explicit title key, find the first text column with meaningful string values
  if (!titleKey) {
    for (const k of allKeys) {
      const kLower = normalizeKey(k);
      // Skip numeric, price, code, unit, image columns
      if (
        /^(no|sira|sıra|kod|sku|fiyat|price|kdv|miktar|gr|gramaj|koli|kutu|görsel|resim)/i.test(kLower)
      ) {
        continue;
      }
      const val = String(row[k] ?? "").trim();
      if (val && isNaN(Number(val)) && val.length > 2 && !val.startsWith("http")) {
        titleKey = k;
        break;
      }
    }
  }

  // 3. Price Key
  const priceKey = findKey([
    "kutu satış fiyatı",
    "kutu satis fiyati",
    "koli fiyatı",
    "koli fiyati",
    "adet fiyat",
    "adet fiyatı",
    "adet fiyati",
    "satış fiyatı",
    "satis fiyati",
    "birim fiyat",
    "birim fiyatı",
    "birim fiyati",
    "kdv dahil fiyat",
    "fiyat",
    "fiyatı",
    "fiyati",
    "price",
    "tutar",
    "ücret",
    /fiyat/i,
    /price/i,
  ]);

  // 4. Category Key
  const categoryKey = findKey([
    "kategori",
    "kategori adı",
    "kategoriadi",
    "ürün ana grubu",
    "urun ana grubu",
    "ana grup",
    "category",
    "grup",
    "tür",
    /kategori/i,
    /category/i,
  ]);

  // 5. Code / SKU Key
  const codeKey = findKey([
    "ürün kodu",
    "urunkodu",
    "stok kodu",
    "stokkodu",
    "barkod",
    "barcode",
    "kod",
    "code",
    "sku",
    "no",
    /kod/i,
    /sku/i,
  ]);

  // 6. Description Key
  const descriptionKey = findKey([
    "hazırlanışı",
    "hazirlanisi",
    "açıklama",
    "aciklama",
    "detay",
    "description",
    "özellik",
    "bilgi",
    /açıklama/i,
    /aciklama/i,
    /desc/i,
  ]);

  let title = titleKey ? String(row[titleKey] ?? "").trim() : "";
  if (!title) {
    // Check common fallbacks
    for (const fallbackKey of ["Ürün Adı", "name", "title", "ÜRÜN ADI"]) {
      if (row[fallbackKey]) {
        title = String(row[fallbackKey]).trim();
        break;
      }
    }
    if (!title && allKeys.length > 0) {
      // Pick first non-empty text value in the row
      for (const k of allKeys) {
        const val = String(row[k] ?? "").trim();
        if (val && isNaN(Number(val)) && !val.startsWith("data:") && !val.startsWith("http")) {
          title = val;
          break;
        }
      }
    }
  }
  if (!title) title = "İsimsiz Ürün";

  const imageUrl = imageKey ? String(row[imageKey] ?? "").trim() : "";
  const price = priceKey ? (row[priceKey] as string | number) : "";
  const category = categoryKey ? String(row[categoryKey] ?? "").trim() : "";
  const code = codeKey ? String(row[codeKey] ?? "").trim() : "";
  const description = descriptionKey ? String(row[descriptionKey] ?? "").trim() : "";

  return {
    id: (row["id"] as string | number) || code || title || Math.random(),
    title,
    imageUrl,
    price,
    category,
    code,
    description,
    rawRow: row,
    keys: {
      titleKey: titleKey || allKeys[0] || "Ürün Adı",
      imageKey: imageKey || "Görsel",
      priceKey: priceKey || "Fiyat",
      categoryKey: categoryKey || "Kategori",
      codeKey: codeKey || "Ürün Kodu",
      descriptionKey: descriptionKey || "Açıklama",
    },
  };
}

// ── Service Functions ──────────────────────────────────────────────────────────

/**
 * Tüm Excel import kayıtlarını en yeniden eskiye doğru getirir.
 */
export async function getAllExcelImports(
  db: Firestore
): Promise<ExcelImportRecord[]> {
  const q = query(collection(db, COLLECTION), orderBy("importedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<ExcelImportRecord, "id">),
  }));
}

/**
 * Tek bir Excel import kaydını ID'ye göre getirir.
 */
export async function getExcelImportById(
  db: Firestore,
  id: string
): Promise<ExcelImportRecord | null> {
  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return {
    id: snap.id,
    ...(snap.data() as Omit<ExcelImportRecord, "id">),
  };
}

/**
 * Yeni bir Excel import kaydı oluşturur.
 * Her yükleme ayrı bir kayıt olarak tarih damgasıyla saklanır.
 */
export async function createExcelImport(
  db: Firestore,
  data: NewExcelImport
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    importedAt: Timestamp.now(),
  });
  return docRef.id;
}

/**
 * Belirtilen ID'li Excel import kaydındaki tüm satırları günceller.
 */
export async function updateExcelImportRows(
  db: Firestore,
  recordId: string,
  newRows: Record<string, unknown>[]
): Promise<void> {
  const ref = doc(db, COLLECTION, recordId);
  await updateDoc(ref, {
    rows: newRows,
    rowCount: newRows.length,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Belirtilen ID'li kayıttaki tek bir satırı günceller.
 */
export async function updateExcelImportRow(
  db: Firestore,
  recordId: string,
  rowIndex: number,
  updatedRow: Record<string, unknown>
): Promise<void> {
  const record = await getExcelImportById(db, recordId);
  if (!record) throw new Error("İçe aktarım kaydı bulunamadı.");

  const newRows = [...record.rows];
  if (rowIndex < 0 || rowIndex >= newRows.length) {
    throw new Error("Geçersiz satır indeksi.");
  }

  newRows[rowIndex] = updatedRow;

  await updateDoc(doc(db, COLLECTION, recordId), {
    rows: newRows,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Belirtilen ID'li Excel import kaydını siler.
 */
export async function deleteExcelImport(
  db: Firestore,
  id: string
): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
