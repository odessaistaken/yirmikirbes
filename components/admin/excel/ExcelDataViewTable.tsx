"use client";

import { useState, useMemo } from "react";
import {
  Pencil,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Tag,
  Hash,
  Copy,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";
import { detectRowFields, type DetectedRowData } from "@/lib/excel-import-service";
import ExcelRowImage from "./ExcelRowImage";

interface ExcelDataViewTableProps {
  rows: Record<string, unknown>[];
  columns: string[];
  onEditRow: (originalIndex: number) => void;
}

export default function ExcelDataViewTable({
  rows,
  columns,
  onEditRow,
}: ExcelDataViewTableProps) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [sortKey, setSortKey] = useState<"title" | "price" | "category" | "index">("index");
  const [sortAsc, setSortAsc] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Pre-process rows with detected fields while preserving their original index in the dataset
  const processedRows = useMemo(() => {
    return rows.map((r, originalIndex) => {
      const detected: DetectedRowData = detectRowFields(r, columns);
      return {
        originalIndex,
        raw: r,
        detected,
      };
    });
  }, [rows, columns]);

  // Sorting
  const sortedRows = useMemo(() => {
    const list = [...processedRows];
    list.sort((a, b) => {
      if (sortKey === "index") {
        return sortAsc ? a.originalIndex - b.originalIndex : b.originalIndex - a.originalIndex;
      }
      if (sortKey === "title") {
        const cmp = a.detected.title.localeCompare(b.detected.title, "tr");
        return sortAsc ? cmp : -cmp;
      }
      if (sortKey === "category") {
        const cmp = a.detected.category.localeCompare(b.detected.category, "tr");
        return sortAsc ? cmp : -cmp;
      }
      if (sortKey === "price") {
        const pA = parseFloat(String(a.detected.price).replace(/[^0-9.-]+/g, "")) || 0;
        const pB = parseFloat(String(b.detected.price).replace(/[^0-9.-]+/g, "")) || 0;
        return sortAsc ? pA - pB : pB - pA;
      }
      return 0;
    });
    return list;
  }, [processedRows, sortKey, sortAsc]);

  // Pagination
  const totalPages = Math.ceil(sortedRows.length / pageSize) || 1;
  const pageRows = useMemo(() => {
    const start = page * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [sortedRows, page, pageSize]);

  const handleSort = (key: "title" | "price" | "category" | "index") => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const copyImageUrl = (url: string, idx: number) => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopiedIndex(idx);
    toast.success("Görsel URL panoya kopyalandı.");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (rows.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-400">
        <ImageIcon size={48} className="mx-auto text-slate-300 mb-3" />
        <p className="text-base font-semibold text-slate-700">Gösterilecek Veri Bulunamadı</p>
        <p className="text-xs text-slate-400 mt-1">Arama kriterlerinizi değiştirmeyi deneyebilirsiniz.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden flex flex-col">
      {/* Table Container (Full-width with horizontal scroll if needed on smaller screens) */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-xs border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-semibold select-none">
              {/* Row number */}
              <th
                onClick={() => handleSort("index")}
                className="py-3.5 px-4 w-16 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <Hash size={12} className="text-slate-400" />
                  <span>#</span>
                  <ArrowUpDown size={11} className="text-slate-400" />
                </div>
              </th>

              {/* Thumbnail preview */}
              <th className="py-3.5 px-4 w-20">
                <div className="flex items-center gap-1 text-slate-500">
                  <ImageIcon size={13} />
                  <span>Görsel</span>
                </div>
              </th>

              {/* Product title & code */}
              <th
                onClick={() => handleSort("title")}
                className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors min-w-[240px]"
              >
                <div className="flex items-center gap-1">
                  <span>Ürün Adı & Kod</span>
                  <ArrowUpDown size={11} className="text-slate-400" />
                </div>
              </th>

              {/* Category */}
              <th
                onClick={() => handleSort("category")}
                className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors min-w-[140px]"
              >
                <div className="flex items-center gap-1">
                  <Tag size={12} className="text-slate-400" />
                  <span>Kategori</span>
                  <ArrowUpDown size={11} className="text-slate-400" />
                </div>
              </th>

              {/* Price */}
              <th
                onClick={() => handleSort("price")}
                className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors min-w-[110px]"
              >
                <div className="flex items-center gap-1">
                  <span>Fiyat</span>
                  <ArrowUpDown size={11} className="text-slate-400" />
                </div>
              </th>

              {/* Description */}
              <th className="py-3.5 px-4 min-w-[260px] text-slate-500">Açıklama</th>

              {/* Actions */}
              <th className="py-3.5 px-4 w-32 text-right pr-6 text-slate-700">İşlemler</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100">
            {pageRows.map(({ originalIndex, detected }) => {
              return (
                <tr
                  key={originalIndex}
                  className="hover:bg-amber-50/25 transition-colors group"
                >
                  {/* Row index */}
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {originalIndex + 1}
                  </td>

                  {/* Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="relative group/thumb">
                      <ExcelRowImage
                        src={detected.imageUrl}
                        alt={detected.title}
                        size="md"
                        className="shadow-xs"
                      />
                      {detected.imageUrl && (
                        <button
                          type="button"
                          onClick={() => copyImageUrl(detected.imageUrl, originalIndex)}
                          title="Görsel URL kopyala"
                          className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-xs border border-slate-200 opacity-0 group-hover/thumb:opacity-100 hover:text-amber-600 transition-opacity"
                        >
                          {copiedIndex === originalIndex ? (
                            <Check size={11} className="text-emerald-600" />
                          ) : (
                            <Copy size={11} className="text-slate-500" />
                          )}
                        </button>
                      )}
                    </div>
                  </td>

                  {/* Product title & code */}
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2">
                      {detected.title || "İsimsiz Ürün"}
                    </p>
                    {detected.code && (
                      <span className="inline-block mt-1 font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/60">
                        {detected.code}
                      </span>
                    )}
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4">
                    {detected.category ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-900 border border-amber-200/60">
                        {detected.category}
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4">
                    {detected.price ? (
                      <span className="font-semibold text-slate-900 text-xs">
                        {detected.price}
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>

                  {/* Description */}
                  <td className="py-3.5 px-4 text-slate-500 text-xs max-w-sm">
                    {detected.description ? (
                      <p className="line-clamp-2 leading-relaxed" title={detected.description}>
                        {detected.description}
                      </p>
                    ) : (
                      <span className="text-slate-300 italic text-[11px]">Açıklama yok</span>
                    )}
                  </td>

                  {/* Action: Düzenle (Edit) Button */}
                  <td className="py-3.5 px-4 text-right pr-6">
                    <button
                      type="button"
                      onClick={() => onEditRow(originalIndex)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-400/90 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs hover:shadow-sm transition-all transform active:scale-95 cursor-pointer"
                    >
                      <Pencil size={13} />
                      <span>Düzenle</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>
            Toplam <strong className="text-slate-800 font-semibold">{rows.length}</strong> satırdan{" "}
            <strong className="text-slate-800 font-semibold">
              {page * pageSize + 1} - {Math.min((page + 1) * pageSize, rows.length)}
            </strong>{" "}
            arası gösteriliyor
          </span>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-1.5">
            <span>Sayfa başına:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(0);
              }}
              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {/* Page navigation */}
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
