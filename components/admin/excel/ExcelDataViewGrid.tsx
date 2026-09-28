"use client";

import { useState, useMemo } from "react";
import {
  Pencil,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Copy,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";
import { detectRowFields } from "@/lib/excel-import-service";
import ExcelRowImage from "./ExcelRowImage";

// Helper to normalize Turkish strings for key matching
const normalizeKey = (str: string) => {
  return str
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .trim();
};

// Check if a column represents a price / monetary value
const isPriceColumn = (colName: string): boolean => {
  const n = normalizeKey(colName);
  return (
    n.includes("fiyat") ||
    n.includes("ucret") ||
    n.includes("tutar") ||
    n.includes("price") ||
    (n.includes("satis") && !n.includes("tarih"))
  );
};

// Format numeric price values with Turkish currency symbol ₺
const formatPriceValue = (val: unknown): string => {
  if (val === null || val === undefined || val === "") return "";
  const str = String(val).trim();
  if (
    str.includes("₺") ||
    str.includes("TL") ||
    str.includes("$") ||
    str.includes("€")
  ) {
    return str;
  }
  const cleaned = str.replace(/[^0-9.,]/g, "");
  if (!cleaned) return str;

  let num = NaN;
  if (cleaned.includes(".") && cleaned.includes(",")) {
    if (cleaned.lastIndexOf(",") > cleaned.lastIndexOf(".")) {
      num = parseFloat(cleaned.replace(/\./g, "").replace(",", "."));
    } else {
      num = parseFloat(cleaned.replace(/,/g, ""));
    }
  } else if (cleaned.includes(",")) {
    num = parseFloat(cleaned.replace(",", "."));
  } else {
    num = parseFloat(cleaned);
  }

  if (isNaN(num)) return `${str} ₺`;

  const formatted = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: num % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(num);

  return `${formatted} ₺`;
};

// Format cell values (KDV, prices, standard text)
const formatCellValue = (col: string, val: string) => {
  if (!val && val !== "0") return val;
  const colNorm = normalizeKey(col);
  if (isPriceColumn(col)) {
    return formatPriceValue(val);
  }
  if (colNorm.includes("kdv")) {
    const num = parseFloat(val.replace(",", "."));
    if (!isNaN(num)) {
      if (num > 0 && num < 1) {
        return `%${Math.round(num * 100)}`;
      }
      return `%${num}`;
    }
  }
  return val;
};

// Concise, human-friendly price labels for card pills
const getShortPriceLabel = (colName: string) => {
  const n = normalizeKey(colName);
  if (n.includes("kutu") && n.includes("satis")) return "Kutu Satış";
  if (n.includes("dilim") && n.includes("satis")) return "Dilim Satış";
  if (n.includes("kutu")) return "Kutu Fiyatı";
  if (n.includes("dilim")) return "Dilim Fiyatı";
  if (n.includes("koli") && n.includes("satis")) return "Koli Satış";
  if (n.includes("koli")) return "Koli Fiyatı";
  if (n.includes("adet") && n.includes("satis")) return "Adet Satış";
  if (n.includes("adet")) return "Adet Fiyatı";
  if (n.includes("birim")) return "Birim Fiyatı";
  if (n.includes("satis")) return "Satış Fiyatı";
  return colName;
};

interface ExcelDataViewGridProps {
  rows: Record<string, unknown>[];
  columns: string[];
  onEditRow: (originalIndex: number) => void;
}

export default function ExcelDataViewGrid({
  rows,
  columns,
  onEditRow,
}: ExcelDataViewGridProps) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(24);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Dynamic text columns excluding raw image columns
  const dynamicColumns = useMemo(() => {
    return columns.filter((col) => {
      const l = col.toLowerCase().trim();
      return (
        l !== "görsel" &&
        l !== "gorsel" &&
        l !== "resim" &&
        l !== "image" &&
        l !== "imageurl"
      );
    });
  }, [columns]);

  // Pre-process rows with detected fields and image sources
  const processedRows = useMemo(() => {
    return rows.map((r, originalIndex) => {
      const detected = detectRowFields(r, columns);
      const imgSrc = String(
        r["Görsel"] || r["Resim"] || r["imageUrl"] || detected.imageUrl || ""
      ).trim();

      return {
        originalIndex,
        raw: r,
        imgSrc,
        detected,
      };
    });
  }, [rows, columns]);

  // Pagination
  const totalPages = Math.ceil(processedRows.length / pageSize) || 1;
  const pageRows = useMemo(() => {
    const start = page * pageSize;
    return processedRows.slice(start, start + pageSize);
  }, [processedRows, page, pageSize]);

  const copyImageUrl = (url: string, idx: number) => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopiedIndex(idx);
    toast.success("Görsel panoya kopyalandı.");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (rows.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-400">
        <ImageIcon size={48} className="mx-auto text-slate-300 mb-3" />
        <p className="text-base font-semibold text-slate-700">Gösterilecek Ürün Bulunamadı</p>
        <p className="text-xs text-slate-400 mt-1">Arama kriterlerinizi değiştirmeyi deneyebilirsiniz.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-5">
        {pageRows.map(({ originalIndex, imgSrc, detected, raw }) => {
          // Identify price columns for this row
          const rawPriceAttrs = dynamicColumns.filter(
            (c) => isPriceColumn(c) && String(raw[c] ?? "").trim() !== ""
          );

          // Sort price attributes: Kutu/Koli first, Dilim/Adet second
          const sortedPriceAttrs = [...rawPriceAttrs].sort((a, b) => {
            const aNorm = normalizeKey(a);
            const bNorm = normalizeKey(b);
            const aBox = aNorm.includes("kutu") || aNorm.includes("koli");
            const bBox = bNorm.includes("kutu") || bNorm.includes("koli");
            const aSlice = aNorm.includes("dilim") || aNorm.includes("adet");
            const bSlice = bNorm.includes("dilim") || bNorm.includes("adet");
            if (aBox && !bBox) return -1;
            if (!aBox && bBox) return 1;
            if (aSlice && !bSlice) return -1;
            if (!aSlice && bSlice) return 1;
            return 0;
          });

          // Non-price specifications list (show up to 4 specs, or 6 if no prices)
          const specAttrs = dynamicColumns
            .filter(
              (c) =>
                c !== detected.keys.titleKey &&
                !isPriceColumn(c) &&
                String(raw[c] ?? "").trim() !== ""
            )
            .slice(0, sortedPriceAttrs.length > 0 ? 4 : 6);

          return (
            <div
              key={originalIndex}
              className="bg-white border border-slate-200/90 hover:border-amber-300 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group"
            >
              {/* Image Preview Container */}
              <div className="relative w-full aspect-square bg-slate-50 border-b border-slate-100 overflow-hidden flex items-center justify-center p-3">
                <ExcelRowImage
                  src={imgSrc}
                  alt={detected.title}
                  size="full"
                  className="rounded-2xl"
                />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-slate-600 shadow-xs border border-slate-200/60">
                    #{originalIndex + 1}
                  </span>

                  {detected.category && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-400/90 text-slate-950 shadow-xs truncate max-w-[130px]">
                      {detected.category}
                    </span>
                  )}
                </div>

                {/* Copy URL Button */}
                {imgSrc && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyImageUrl(imgSrc, originalIndex);
                    }}
                    title="Görseli kopyala"
                    className="absolute bottom-3 right-3 p-1.5 bg-white/90 hover:bg-white text-slate-600 hover:text-amber-600 rounded-xl shadow-xs border border-slate-200/80 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedIndex === originalIndex ? (
                      <Check size={12} className="text-emerald-600" />
                    ) : (
                      <Copy size={12} />
                    )}
                  </button>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  <h4
                    className="font-bold text-slate-900 text-sm leading-snug line-clamp-2"
                    title={detected.title}
                  >
                    {detected.title || "İsimsiz Ürün"}
                  </h4>

                  {/* Dynamic Excel Attributes list (Specs) */}
                  {specAttrs.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-slate-100 text-[11px]">
                      {specAttrs.map((col) => (
                        <div key={col} className="flex items-center justify-between gap-1">
                          <span className="text-slate-400 truncate max-w-[110px]">{col}:</span>
                          <span className="text-slate-700 font-semibold truncate max-w-[120px]">
                            {formatCellValue(col, String(raw[col]))}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Kutu, Dilim ve Satış Fiyatları Alanı */}
                  {sortedPriceAttrs.length > 0 && (
                    <div className="pt-1">
                      {sortedPriceAttrs.length === 2 ? (
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-2.5 grid grid-cols-2 gap-2 text-center shadow-2xs">
                          <div className="min-w-0">
                            <div
                              className="text-[10px] font-bold text-amber-800 uppercase tracking-tight truncate"
                              title={sortedPriceAttrs[0]}
                            >
                              {getShortPriceLabel(sortedPriceAttrs[0])}
                            </div>
                            <div className="text-xs sm:text-sm font-black text-amber-950 mt-0.5">
                              {formatPriceValue(raw[sortedPriceAttrs[0]])}
                            </div>
                          </div>
                          <div className="border-l border-amber-500/25 pl-2 min-w-0">
                            <div
                              className="text-[10px] font-bold text-amber-800 uppercase tracking-tight truncate"
                              title={sortedPriceAttrs[1]}
                            >
                              {getShortPriceLabel(sortedPriceAttrs[1])}
                            </div>
                            <div className="text-xs sm:text-sm font-black text-amber-950 mt-0.5">
                              {formatPriceValue(raw[sortedPriceAttrs[1]])}
                            </div>
                          </div>
                        </div>
                      ) : sortedPriceAttrs.length === 1 ? (
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl py-2 px-3 flex items-center justify-between gap-2 shadow-2xs">
                          <span
                            className="text-[11px] font-bold text-amber-800 uppercase tracking-wider truncate"
                            title={sortedPriceAttrs[0]}
                          >
                            {getShortPriceLabel(sortedPriceAttrs[0])}:
                          </span>
                          <span className="text-xs sm:text-sm font-black text-amber-950">
                            {formatPriceValue(raw[sortedPriceAttrs[0]])}
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-1 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-2 shadow-2xs">
                          {sortedPriceAttrs.map((col) => (
                            <div
                              key={col}
                              className="flex items-center justify-between gap-1 text-[11px]"
                            >
                              <span
                                className="text-amber-800 font-bold uppercase tracking-wider truncate max-w-[110px]"
                                title={col}
                              >
                                {getShortPriceLabel(col)}:
                              </span>
                              <span className="text-amber-950 font-black">
                                {formatPriceValue(raw[col])}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Edit Button */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onEditRow(originalIndex)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-400/90 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs hover:shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <Pencil size={13} />
                    <span>Düzenle (Edit)</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-white rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>
            Toplam <strong className="text-slate-800 font-semibold">{rows.length}</strong> karttan{" "}
            <strong className="text-slate-800 font-semibold">
              {page * pageSize + 1} - {Math.min((page + 1) * pageSize, rows.length)}
            </strong>{" "}
            arası
          </span>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-1.5">
            <span>Sayfa boyutu:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(0);
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700 cursor-pointer"
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 mr-2">
            Sayfa {page + 1} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Önceki Sayfa"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Sonraki Sayfa"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
