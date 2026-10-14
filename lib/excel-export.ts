import * as XLSX from "xlsx";

export interface ExportToExcelOptions {
  fileName: string;
  sheetName?: string;
  columns?: string[];
  rows: Record<string, unknown>[];
}

/**
 * Excel dışa aktarma (export/download) işlemini tamamen güvenli,
 * bozulmayan ve estetik formatlı şekilde gerçekleştirir.
 *
 * Çözülen Temel Hatalar:
 * 1. Base64 resimlerin hücreye yazılarak Excel'in 32.767 karakter sınırını aşması
 *    ve dosyanın "Bu çalışma kitabında sorun bulundu" hatasıyla bozulması engellenir.
 * 2. Hayalet/boş sütunlar filtrelenir.
 * 3. Kolonlar düzgün sırada dışa aktarılır.
 * 4. Otomatik sütun genişliği (auto-fit) ve filtreleme (AutoFilter) eklenir.
 * 5. Türkçe karakterli dosya adları tüm tarayıcılarla uyumlu hale getirilir.
 */
export function exportToExcel({
  fileName,
  sheetName = "Veriler",
  columns,
  rows,
}: ExportToExcelOptions): boolean {
  if (!rows || rows.length === 0) {
    throw new Error("Dışa aktarılacak satır verisi bulunamadı.");
  }

  // 1. Dışa aktarılacak sütunları belirle
  let exportColumns: string[] = [];

  if (columns && columns.length > 0) {
    // Kullanıcının belirlediği sütunlar içinden tamamen boş hayalet sütunları (örn: Kolon_14) temizle
    exportColumns = columns.filter((col) => {
      // "Kolon_X" veya "Sütun_X" şeklinde olup tüm satırlarda boş olan sütunları atla
      if (/^(kolon|sütun|sutun)_\d+$/i.test(col.trim())) {
        const hasAnyData = rows.some((r) => {
          const v = r[col];
          return v !== undefined && v !== null && String(v).trim() !== "";
        });
        return hasAnyData;
      }
      return true;
    });
  } else {
    // Sütun verilmediyse satırlardaki ilk geçerli anahtarları al
    const seen = new Set<string>();
    rows.forEach((r) => {
      Object.keys(r).forEach((k) => seen.add(k));
    });
    exportColumns = Array.from(seen);
  }

  // Eğer Görsel sütunu varsa en sona veya ilk sıraya uygun yerleştirelim
  const isImageKey = (k: string) =>
    /^(görsel|gorsel|resim|image|imageurl|görsel url)$/i.test(k.trim());

  // 2. Satır verilerini temizle ve Excel hücre sınırlarına göre formatla
  const exportRows = rows.map((r, rowIndex) => {
    const rowObj: Record<string, unknown> = {};

    exportColumns.forEach((col) => {
      let val = r[col];

      if (isImageKey(col)) {
        const valStr = String(val ?? "").trim();
        if (valStr.startsWith("data:image/")) {
          // Base64 resimler Excel hücre sınırını (32.767) aşarak dosyayı bozar!
          // Hücreye temiz ve profesyonel durum metni yazıyoruz:
          rowObj[col] = "[Görsel Mevcut]";
        } else if (
          valStr.startsWith("http://") ||
          valStr.startsWith("https://") ||
          valStr.startsWith("/resimler/")
        ) {
          rowObj[col] = valStr;
        } else if (valStr) {
          rowObj[col] = valStr.length > 250 ? "[Görsel Mevcut]" : valStr;
        } else {
          rowObj[col] = "";
        }
        return;
      }

      // Sayısal değerleri sayı türüne çevir (Excel formülleri ve sıralama için)
      if (val !== undefined && val !== null && val !== "") {
        if (typeof val === "number") {
          rowObj[col] = val;
        } else {
          const str = String(val).trim();
          // Eğer saf sayı ise number'a çevir, değilse string olarak bırak
          if (/^-?\d+(\.\d+)?$/.test(str) && str.length < 15 && !str.startsWith("0")) {
            rowObj[col] = Number(str);
          } else {
            rowObj[col] = str;
          }
        }
      } else {
        rowObj[col] = "";
      }
    });

    return rowObj;
  });

  // 3. Çalışma sayfası (worksheet) oluştur
  const ws = XLSX.utils.json_to_sheet(exportRows, { header: exportColumns });

  // 4. Sütun genişliklerini içeriğe göre akıllıca hesapla (Auto-fit)
  const colWidths = exportColumns.map((col) => {
    let maxLen = col.length;
    // Performans için ilk 100 satırı ve en uzun değerleri tara
    for (let i = 0; i < Math.min(exportRows.length, 100); i++) {
      const val = exportRows[i][col];
      if (val !== undefined && val !== null) {
        const len = String(val).length;
        if (len > maxLen) maxLen = len;
      }
    }
    // Min 10, Max 50 karakter genişlik
    return { wch: Math.min(50, Math.max(10, maxLen + 3)) };
  });
  ws["!cols"] = colWidths;

  // 5. Başlık satırına AutoFilter ekle
  if (ws["!ref"]) {
    ws["!autofilter"] = { ref: ws["!ref"] };
  }

  // 6. Güvenli Sheet ve Dosya adı
  const safeSheetName = (sheetName || "Veriler")
    .slice(0, 31)
    .replace(/[:\\/?*[\]]/g, "_");

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, safeSheetName);

  // Dosya adını temizle
  const rawBaseName = (fileName || "excel_verisi").replace(/\.[^/.]+$/, "");
  const safeBaseName = rawBaseName
    .replace(/[^\w\s\u00C0-\u017F-]/g, "")
    .trim()
    .replace(/\s+/g, "_");

  const finalFileName = `${safeBaseName || "excel_verisi"}_duzenlenmis.xlsx`;

  XLSX.writeFile(wb, finalFileName);
  return true;
}
