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
          // Dynamic attributes to show on card (show up to 4 key-values)
          const visibleAttrs = dynamicColumns
            .filter((c) => c !== detected.keys.titleKey && String(raw[c] ?? "").trim() !== "")
            .slice(0, 4);

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
                <div className="space-y-2">
                  <h4
                    className="font-bold text-slate-900 text-sm leading-snug line-clamp-2"
                    title={detected.title}
                  >
                    {detected.title || "İsimsiz Ürün"}
                  </h4>

                  {/* Dynamic Excel Attributes list */}
                  {visibleAttrs.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-slate-100 text-[11px]">
                      {visibleAttrs.map((col) => (
                        <div key={col} className="flex items-center justify-between gap-1">
                          <span className="text-slate-400 truncate max-w-[110px]">{col}:</span>
                          <span className="text-slate-700 font-semibold truncate max-w-[120px]">
                            {String(raw[col])}
                          </span>
                        </div>
                      ))}
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
