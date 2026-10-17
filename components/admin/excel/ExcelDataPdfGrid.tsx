"use client";

import { useMemo } from "react";
import { detectRowFields } from "@/lib/excel-import-service";

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

interface ExcelDataPdfGridProps {
  rows: Record<string, unknown>[];
  columns: string[];
}

/**
 * Dedicated render component for capturing product cards into PDF.
 * Uses exact same styling as ExcelDataViewGrid cards, without interactive buttons.
 */
export default function ExcelDataPdfGrid({
  rows,
  columns,
}: ExcelDataPdfGridProps) {
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

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-white">
      {rows.map((raw, originalIndex) => {
        const detected = detectRowFields(raw, columns);
        const imgSrc = String(
          raw["Görsel"] ||
            raw["Resim"] ||
            raw["imageUrl"] ||
            detected.imageUrl ||
            ""
        ).trim();

        const rawPriceAttrs = dynamicColumns.filter(
          (c) => isPriceColumn(c) && String(raw[c] ?? "").trim() !== ""
        );

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
            className="product-card w-[290px] bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs flex flex-col box-border font-sans"
            style={{ pageBreakInside: "avoid" }}
          >
            {/* Image Preview Container */}
            <div className="relative w-full aspect-square bg-slate-50 border-b border-slate-100 overflow-hidden flex items-center justify-center p-3">
              {imgSrc ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={imgSrc}
                  alt={detected.title}
                  crossOrigin="anonymous"
                  className="w-full h-full object-contain p-1 rounded-2xl"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-300">
                  <span className="text-xs font-semibold">Görsel Yok</span>
                </div>
              )}

              {/* Top Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/95 text-slate-600 shadow-xs border border-slate-200/60">
                  #{originalIndex + 1}
                </span>

                {detected.category && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 shadow-xs truncate max-w-[130px]">
                    {detected.category}
                  </span>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
              <div className="space-y-2.5">
                <h4
                  className="font-bold text-slate-900 text-sm leading-snug line-clamp-2"
                  style={{ minHeight: "2.4rem" }}
                >
                  {detected.title || "İsimsiz Ürün"}
                </h4>

                {/* Specs */}
                {specAttrs.length > 0 && (
                  <div className="space-y-1 pt-1 border-t border-slate-100 text-[11px]">
                    {specAttrs.map((col) => (
                      <div
                        key={col}
                        className="flex items-center justify-between gap-1"
                      >
                        <span className="text-slate-400 truncate max-w-[120px]">
                          {col}:
                        </span>
                        <span className="text-slate-700 font-semibold truncate max-w-[130px]">
                          {formatCellValue(col, String(raw[col]))}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Price Display */}
                {sortedPriceAttrs.length > 0 && (
                  <div className="pt-1">
                    {sortedPriceAttrs.length === 2 ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-2.5 grid grid-cols-2 gap-2 text-center">
                        <div className="min-w-0">
                          <div className="text-[10px] font-bold text-amber-800 uppercase tracking-tight truncate">
                            {getShortPriceLabel(sortedPriceAttrs[0])}
                          </div>
                          <div className="text-xs sm:text-sm font-black text-amber-950 mt-0.5">
                            {formatPriceValue(raw[sortedPriceAttrs[0]])}
                          </div>
                        </div>
                        <div className="border-l border-amber-200 pl-2 min-w-0">
                          <div className="text-[10px] font-bold text-amber-800 uppercase tracking-tight truncate">
                            {getShortPriceLabel(sortedPriceAttrs[1])}
                          </div>
                          <div className="text-xs sm:text-sm font-black text-amber-950 mt-0.5">
                            {formatPriceValue(raw[sortedPriceAttrs[1]])}
                          </div>
                        </div>
                      </div>
                    ) : sortedPriceAttrs.length === 1 ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl py-2 px-3 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider truncate">
                          {getShortPriceLabel(sortedPriceAttrs[0])}:
                        </span>
                        <span className="text-xs sm:text-sm font-black text-amber-950">
                          {formatPriceValue(raw[sortedPriceAttrs[0]])}
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1 bg-amber-50 border border-amber-200 rounded-2xl p-2">
                        {sortedPriceAttrs.map((col) => (
                          <div
                            key={col}
                            className="flex items-center justify-between gap-1 text-[11px]"
                          >
                            <span className="text-amber-800 font-bold uppercase tracking-wider truncate max-w-[120px]">
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
            </div>
          </div>
        );
      })}
    </div>
  );
}
