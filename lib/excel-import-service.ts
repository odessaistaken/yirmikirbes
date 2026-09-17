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

export function detectRowFields(
  row: Record<string, unknown>,
  columns: string[] = []
): DetectedRowData {
  const rowKeys = Object.keys(row);
  const allKeys = columns.length > 0 ? columns : rowKeys;

  // Helper matcher
  const findKey = (patterns: (string | RegExp)[]): string => {
    for (const pat of patterns) {
      for (const k of allKeys) {
        const lower = k.trim().toLowerCase();
        if (typeof pat === "string") {
          if (lower === pat.toLowerCase()) return k;
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

  // If no explicit image column name found, check if any column value looks like an image URL/path
  if (!imageKey) {
    for (const k of rowKeys) {
      const val = String(row[k] ?? "").trim();
      if (
        (val.startsWith("http://") ||
          val.startsWith("https://") ||
          val.startsWith("/resimler/") ||
          val.startsWith("/")) &&
        /\.(png|jpe?g|webp|svg|gif|avif)(\?.*)?$/i.test(val)
      ) {
        imageKey = k;
        break;
      }
    }
  }

  // 2. Title / Name Key
  const titleKey = findKey([
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
    /ad[ıi]?$/i,
    /isim$/i,
    /ürün/i,
  ]);

  // 3. Price Key
  const priceKey = findKey([
    "fiyat",
    "fiyatı",
    "fiyati",
    "birim fiyat",
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
    "category",
    "grup",
    "tür",
    /kategori/i,
    /category/i,
  ]);

  // 5. Code / SKU Key
  const codeKey = findKey([
    "kod",
    "ürün kodu",
    "urunkodu",
    "code",
    "sku",
    "barkod",
    "barcode",
    "stok kodu",
    /kod/i,
    /sku/i,
  ]);

  // 6. Description Key
  const descriptionKey = findKey([
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

  const title = titleKey
    ? String(row[titleKey] ?? "")
    : String(
        row["name"] ||
          row["Ürün Adı"] ||
          row["title"] ||
          row[allKeys[0]] ||
          "İsimsiz Ürün"
      );

  const imageUrl = imageKey ? String(row[imageKey] ?? "").trim() : "";
  const price = priceKey ? (row[priceKey] as string | number) : "";
  const category = categoryKey ? String(row[categoryKey] ?? "") : "";
  const code = codeKey ? String(row[codeKey] ?? "") : "";
  const description = descriptionKey ? String(row[descriptionKey] ?? "") : "";

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
