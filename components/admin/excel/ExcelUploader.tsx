"use client";

import { useRef, useState, useCallback } from "react";
import * as XLSX from "xlsx";
import { UploadCloud, FileSpreadsheet, X, ChevronDown, ImageIcon, CheckCircle2 } from "lucide-react";
import { extractExcelEmbeddedImages, resizeImageBase64 } from "@/lib/excel-image-extractor";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ParsedExcelData {
  fileName: string;
  sheetName: string;
  sheetNames: string[];
  columns: string[];
  rows: Record<string, unknown>[];
  extractedImagesCount?: number;
}

interface ExcelUploaderProps {
  onParsed: (data: ParsedExcelData) => void;
  disabled?: boolean;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function ExcelUploader({ onParsed, disabled }: ExcelUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>("");
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractedImageCount, setExtractedImageCount] = useState<number>(0);

  // ── Header scoring helper ────────────────────────────────────────────────────
  const HEADER_KEYWORDS = [
    "ürün", "urun", "adı", "adi", "fiyat", "fiyati", "kdv", "miktar",
    "koli", "kutu", "dilim", "gramaj", "kod", "barkod", "stok",
    "kategori", "açıklama", "aciklama", "detay", "no", "tutar", "birim",
    "name", "price", "sku", "category", "code", "desc", "şurup", "surup", "sos", "püre", "pure", "hazırlanışı"
  ];

  const scoreHeaderRow = (row: unknown[]): number => {
    const filled = row.filter((c) => c !== null && c !== undefined && String(c).trim() !== "");
    if (filled.length === 0) return -100;

    const firstStr = String(filled[0]).trim().toLowerCase();
    if (
      firstStr.startsWith("***") ||
      firstStr.startsWith("not:") ||
      firstStr.startsWith("uyarı:") ||
      firstStr.startsWith("açıklama:")
    ) {
      return -100;
    }

    let score = 0;
    let numericCount = 0;

    for (const c of filled) {
      const valStr = String(c).trim().toLowerCase();
      const isNum = !isNaN(Number(valStr)) && valStr !== "";
      if (isNum) {
        numericCount++;
        continue;
      }

      let matched = false;
      for (const kw of HEADER_KEYWORDS) {
        if (valStr.includes(kw)) {
          score += 10;
          matched = true;
          break;
        }
      }
      if (!matched) score += 1;
    }

    // Heavy penalty for rows containing numeric prices or quantities
    score -= numericCount * 8;
    return score;
  };

  // ── Parse workbook for a specific sheet with image mapping ──────────────────
  const parseSheet = useCallback(
    async (
      wb: XLSX.WorkBook,
      sheet: string,
      fname: string,
      allSheets: string[],
      buffer?: ArrayBuffer | null
    ) => {
      const ws = wb.Sheets[sheet];
      if (!ws) return;

      // 1. Gömülü resimleri bu sayfa için ZIP'ten çıkar
      let imagesByRow: Record<number, string> = {};
      let imagesByCell: Record<string, string> = {};
      const activeBuf = buffer || fileBuffer;

      if (activeBuf && fname.match(/\.xlsx$/i)) {
        try {
          const imgResult = await extractExcelEmbeddedImages(activeBuf, sheet);
          imagesByRow = imgResult.imagesByRow;
          imagesByCell = imgResult.imagesByCell || {};
        } catch (imgErr) {
          console.warn("Gömülü resim çıkarma atlandı:", imgErr);
        }
      }

      // 2. Ham satırları al
      const rawRows = XLSX.utils.sheet_to_json<unknown[]>(ws, {
        header: 1,
        defval: "",
      });

      if (rawRows.length === 0) {
        setError("Seçilen sayfada veri bulunamadı.");
        return;
      }

      // 3. Akıllı Başlık (Header) Tespiti
      let bestHeaderIdx = 0;
      let bestScore = -999;
      for (let i = 0; i < Math.min(15, rawRows.length); i++) {
        const s = scoreHeaderRow(rawRows[i] || []);
        if (s > bestScore) {
          bestScore = s;
          bestHeaderIdx = i;
        }
      }

      const hasExplicitHeader = bestScore > 0;
      const rawHeaderRow = (hasExplicitHeader ? (rawRows[bestHeaderIdx] || []) : []) as unknown[];

      // Başlıktan sonra verinin başladığı satır indeksi
      let dataStartIdx = hasExplicitHeader ? bestHeaderIdx + 1 : 0;
      if (!hasExplicitHeader) {
        // Eğer 0. satır sadece 1-2 hücreli bir başlık afişiyse (örn: MONTE CRİSTO ŞURUPLAR)
        const row0Filled = (rawRows[0] || []).filter((c) => String(c ?? "").trim() !== "").length;
        if (row0Filled > 0 && row0Filled <= 2 && rawRows.length > 1) {
          dataStartIdx = 1;
        }
      }

      // 4. Veri içeren aktif sütunları tespit et (tamamen boş hayalet sütunları eler)
      const maxCols = Math.max(
        rawHeaderRow.length,
        ...rawRows.slice(dataStartIdx).map((r) => (r || []).length)
      );

      const activeColIndices: number[] = [];
      for (let c = 0; c < maxCols; c++) {
        const headerVal = String(rawHeaderRow[c] ?? "").trim();
        const hasData = rawRows.slice(dataStartIdx).some((r) => {
          const v = (r || [])[c];
          return v !== null && v !== undefined && String(v).trim() !== "";
        });
        if (hasData || headerVal) {
          activeColIndices.push(c);
        }
      }

      // 5. Temiz ve benzersiz sütun adları üret
      const columns: string[] = [];
      const seenHeaders = new Set<string>();

      activeColIndices.forEach((colIdx, position) => {
        let name = String(rawHeaderRow[colIdx] ?? "").trim();
        if (!name) {
          // İlk sütun ardışık sıra numarası mı?
          const isSequentialNumbers = rawRows.slice(dataStartIdx, dataStartIdx + 5).every((r) => {
            const v = Number((r || [])[colIdx]);
            return !isNaN(v) && v > 0;
          });
          if (position === 0 && isSequentialNumbers) {
            name = "No";
          } else {
            name = `Sütun_${position + 1}`;
          }
        }

        let uniqueName = name;
        let counter = 2;
        while (seenHeaders.has(uniqueName.toLowerCase())) {
          uniqueName = `${name}_${counter}`;
          counter++;
        }
        seenHeaders.add(uniqueName.toLowerCase());
        columns.push(uniqueName);
      });

      // 6. Veri satırlarını oluştur ve gömülü resimleri tam 1-e-1 eşleştir
      const parsedRows: Record<string, unknown>[] = [];
      let totalFoundImages = 0;

      for (let i = dataStartIdx; i < rawRows.length; i++) {
        const r = (rawRows[i] || []) as unknown[];

        // Aktif sütunlarda veri var mı kontrol et
        const filledCells = activeColIndices.filter(
          (c) => String(r[c] ?? "").trim() !== ""
        );
        if (filledCells.length === 0) continue;

        // Dipnot satırlarını filtrele (örn: tek hücreli ***BUZDOLABINDA...)
        if (filledCells.length === 1) {
          const singleVal = String(r[filledCells[0]] ?? "").trim().toLowerCase();
          if (
            singleVal.startsWith("***") ||
            singleVal.startsWith("not:") ||
            singleVal.startsWith("uyarı:") ||
            singleVal.startsWith("açıklama:")
          ) {
            continue;
          }
        }

        const rowObj: Record<string, unknown> = {};
        activeColIndices.forEach((c, idx) => {
          const colName = columns[idx];
          let val = r[c] !== undefined ? r[c] : "";
          if (typeof val === "string") val = val.trim();
          rowObj[colName] = val;
        });

        // Bu satıra ait gömülü resmi bul (1-e-1 kesin satır eşleşmesi, kayma olmadan)
        const foundImg = imagesByRow[i] || "";

        if (foundImg) {
          const compressed = await resizeImageBase64(foundImg, 320, 320, 0.82);
          rowObj["Görsel"] = compressed;
          totalFoundImages++;
        }

        parsedRows.push(rowObj);
      }

      // "Görsel" sütununu sütun listesine mantıklı bir konuma ekle
      let finalColumns = [...columns];
      if (totalFoundImages > 0 && !finalColumns.includes("Görsel")) {
        const noIdx = finalColumns.findIndex((c) => /^no$/i.test(c.trim()));
        if (noIdx !== -1) {
          finalColumns.splice(noIdx + 1, 0, "Görsel");
        } else {
          finalColumns = ["Görsel", ...finalColumns];
        }
      }

      setExtractedImageCount(totalFoundImages);

      onParsed({
        fileName: fname,
        sheetName: sheet,
        sheetNames: allSheets,
        columns: finalColumns,
        rows: parsedRows,
        extractedImagesCount: totalFoundImages,
      });
    },
    [fileBuffer, onParsed]
  );

  // ── Process a File object ────────────────────────────────────────────────────
  const processFile = useCallback(
    async (file: File) => {
      if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
        setError("Lütfen geçerli bir Excel (.xlsx, .xls) veya CSV dosyası seçin.");
        return;
      }

      setError(null);
      setParsing(true);
      setFileName(file.name);
      setExtractedImageCount(0);

      try {
        const buffer = await file.arrayBuffer();
        setFileBuffer(buffer);

        const wb = XLSX.read(buffer, { type: "array" });
        const sheets = wb.SheetNames;

        setWorkbook(wb);
        setSheetNames(sheets);
        setSelectedSheet(sheets[0]);

        await parseSheet(wb, sheets[0], file.name, sheets, buffer);
      } catch (err) {
        console.error("Excel dosya okuma hatası:", err);
        setError("Dosya okunurken hata oluştu. Lütfen geçerli bir Excel dosyası kullanın.");
      } finally {
        setParsing(false);
      }
    },
    [parseSheet]
  );

  // ── Sheet change ─────────────────────────────────────────────────────────────
  const handleSheetChange = async (sheet: string) => {
    if (!workbook || !fileName) return;
    setSelectedSheet(sheet);
    setParsing(true);
    try {
      await parseSheet(workbook, sheet, fileName, sheetNames, fileBuffer);
    } finally {
      setParsing(false);
    }
  };

  // ── Reset ────────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setFileName(null);
    setSheetNames([]);
    setSelectedSheet("");
    setWorkbook(null);
    setFileBuffer(null);
    setExtractedImageCount(0);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  // ── Drag events ──────────────────────────────────────────────────────────────
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onClick={() => !disabled && !fileName && inputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          relative border-2 border-dashed rounded-2xl transition-all duration-200
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${
            dragging
              ? "border-amber-400 bg-amber-50 scale-[1.01]"
              : fileName
              ? "border-green-300 bg-green-50"
              : "border-slate-300 bg-slate-50 hover:border-amber-400 hover:bg-amber-50/40"
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          disabled={disabled}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) processFile(file);
          }}
        />

        <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
          {parsing ? (
            <>
              <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-slate-600 text-sm font-medium">
                Excel okunuyor ve gömülü resimler çıkarılıyor…
              </p>
            </>
          ) : fileName ? (
            <>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-3">
                <FileSpreadsheet size={24} className="text-green-600" />
              </div>
              <p className="text-slate-900 font-semibold text-sm truncate max-w-xs">
                {fileName}
              </p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap justify-center">
                <span className="text-green-700 text-xs font-medium">
                  {sheetNames.length} sayfa bulundu
                </span>
                {extractedImageCount > 0 && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    <ImageIcon size={12} />
                    {extractedImageCount} gömülü resim ayıklandı
                  </span>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-amber-100 transition-colors">
                <UploadCloud size={24} className="text-slate-400" />
              </div>
              <p className="text-slate-700 font-semibold text-sm">
                Excel dosyasını buraya sürükleyin
              </p>
              <p className="text-slate-400 text-xs mt-1">
                veya tıklayarak seçin &nbsp;·&nbsp; .xlsx, .xls, .csv
              </p>
              <p className="text-[11px] text-amber-600 font-medium mt-2 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                ✨ Excel içindeki gömülü hücre resimleri otomatik olarak ayıklanır
              </p>
            </>
          )}
        </div>

        {/* Remove button */}
        {fileName && !parsing && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            className="absolute top-3 right-3 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors shadow-sm"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Sheet Selector */}
      {sheetNames.length > 1 && (
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-600 whitespace-nowrap">
            Sayfa Seç:
          </label>
          <div className="relative flex-1 max-w-xs">
            <select
              value={selectedSheet}
              onChange={(e) => handleSheetChange(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-700 font-medium pr-9 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
            >
              {sheetNames.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-600 text-xs bg-red-50 border border-red-100 px-4 py-2.5 rounded-xl">
          {error}
        </p>
      )}
    </div>
  );
}
