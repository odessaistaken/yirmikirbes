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
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
  type Firestore,
} from "firebase/firestore";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ExcelImportRecord {
  id: string;
  fileName: string;
  sheetName: string;
  importedAt: Timestamp;
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

// ── Collection name — completely separate from catalog ─────────────────────────
const COLLECTION = "excelImports";

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
 * Belirtilen ID'li Excel import kaydını siler.
 */
export async function deleteExcelImport(
  db: Firestore,
  id: string
): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
