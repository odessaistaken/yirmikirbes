"use client";

import { useState, useMemo } from "react";
import {
  Pencil,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Hash,
  Copy,
  Check,
  Columns,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";
import { detectRowFields } from "@/lib/excel-import-service";
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
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showColumnManager, setShowColumnManager] = useState(false);

  // Filter out any raw image column from text columns so we don't display massive base64 strings as raw text
  const dynamicColumns = useMemo(() => {
    return columns.filter((col) => {
      const lower = col.toLowerCase().trim();
      return (
        lower !== "görsel" &&
        lower !== "gorsel" &&
        lower !== "image" &&
        lower !== "imageurl" &&
        lower !== "resim"
      );
    });
  }, [columns]);

  // Manage column visibility
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());

  const visibleColumns = useMemo(() => {
    return dynamicColumns.filter((c) => !hiddenColumns.has(c));
  }, [dynamicColumns, hiddenColumns]);

  const toggleColumn = (col: string) => {
    setHiddenColumns((prev) => {
      const next = new Set(prev);
      if (next.has(col)) {
        next.delete(col);
      } else {
        next.add(col);
      }
      return next;
    });
  };

  // Pre-process rows with extracted images
  const processedRows = useMemo(() => {
    return rows.map((r, originalIndex) => {
      const detected = detectRowFields(r, columns);
      // Image source priority: row['Görsel'] or detected.imageUrl
      const imgSrc =
        String(r["Görsel"] || r["Resim"] || r["imageUrl"] || detected.imageUrl || "").trim();

      return {
        originalIndex,
        raw: r,
        imgSrc,
        detected,
      };
    });
  }, [rows, columns]);

  // Sorting across any dynamic column
  const sortedRows = useMemo(() => {
    if (!sortColumn) return processedRows;

    const list = [...processedRows];
    list.sort((a, b) => {
      const valA = a.raw[sortColumn];
      const valB = b.raw[sortColumn];

      if (valA === undefined || valA === null || valA === "") return 1;
      if (valB === undefined || valB === null || valB === "") return -1;

      // Try numeric sort
      const numA = typeof valA === "number" ? valA : parseFloat(String(valA).replace(/[^0-9.-]+/g, ""));
      const numB = typeof valB === "number" ? valB : parseFloat(String(valB).replace(/[^0-9.-]+/g, ""));

      if (!isNaN(numA) && !isNaN(numB)) {
        return sortAsc ? numA - numB : numB - numA;
      }

      // String locale sort
      const strA = String(valA);
      const strB = String(valB);
      const cmp = strA.localeCompare(strB, "tr");
      return sortAsc ? cmp : -cmp;
    });
    return list;
  }, [processedRows, sortColumn, sortAsc]);

  // Pagination
  const totalPages = Math.ceil(sortedRows.length / pageSize) || 1;
  const pageRows = useMemo(() => {
    const start = page * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [sortedRows, page, pageSize]);

  const handleSort = (colName: string) => {
    if (sortColumn === colName) {
      if (sortAsc) {
        setSortAsc(false);
      } else {
        setSortColumn(null);
        setSortAsc(true);
      }
    } else {
      setSortColumn(colName);
      setSortAsc(true);
    }
  };

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
        <p className="text-base font-semibold text-slate-700">Gösterilecek Veri Bulunamadı</p>
        <p className="text-xs text-slate-400 mt-1">Arama kriterlerinizi değiştirmeyi deneyebilirsiniz.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden flex flex-col w-full">
      {/* Table Toolbar: Column Manager & Quick Info */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 bg-slate-50/50 flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">
            Dinamik Sütunlar ({visibleColumns.length}/{dynamicColumns.length}):
          </span>
          <span className="text-slate-400">
            Excel başlık satırındaki tüm sütunlar otomatik listelenmektedir.
          </span>
        </div>

        {/* Column visibility toggle button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColumnManager(!showColumnManager)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer transition-colors"
          >
            <Columns size={13} className="text-amber-500" />
            <span>Sütunları Yönet</span>
          </button>

          {showColumnManager && (
            <div className="absolute right-0 top-full mt-2 w-64 max-h-72 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-30 space-y-1 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-bold text-slate-800">
                <span>Görünür Sütunlar</span>
                <button
                  type="button"
                  onClick={() => setHiddenColumns(new Set())}
                  className="text-[10px] text-amber-600 hover:underline"
                >
                  Tümünü Göster
                </button>
              </div>
              {dynamicColumns.map((col) => {
                const isVisible = !hiddenColumns.has(col);
                return (
                  <button
                    key={col}
                    type="button"
                    onClick={() => toggleColumn(col)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="truncate pr-2 text-slate-700 font-medium">{col}</span>
                    {isVisible ? (
                      <Eye size={13} className="text-emerald-600 shrink-0" />
                    ) : (
                      <EyeOff size={13} className="text-slate-300 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Table Container (Full-width with horizontal scroll if needed) */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-xs border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-semibold select-none">
              {/* Pinned 1: Row number */}
              <th className="py-3.5 px-4 w-14 sticky left-0 z-20 bg-slate-50 border-r border-slate-200/60 shadow-xs">
                <div className="flex items-center gap-1 text-slate-400">
                  <Hash size={12} />
                  <span>#</span>
                </div>
              </th>

              {/* Pinned 2: Image Thumbnail */}
              <th className="py-3.5 px-4 w-20 sticky left-14 z-20 bg-slate-50 border-r border-slate-200/60 shadow-xs">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                  <ImageIcon size={14} className="text-amber-500" />
                  <span>Görsel</span>
                </div>
              </th>

              {/* Pinned 3: Actions */}
              <th className="py-3.5 px-4 w-28 sticky left-34 z-20 bg-slate-50 border-r border-slate-200/60 shadow-xs text-slate-700 font-bold">
                İşlem
              </th>

              {/* Dynamic Excel Columns */}
              {visibleColumns.map((col) => {
                const isSorted = sortColumn === col;
                return (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    className={`py-3.5 px-4 whitespace-nowrap cursor-pointer hover:bg-slate-100/80 transition-colors border-r border-slate-100 ${
                      isSorted ? "bg-amber-50/70 text-amber-900" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold uppercase tracking-wider">{col}</span>
                      <ArrowUpDown
                        size={11}
                        className={`transition-colors ${
                          isSorted ? "text-amber-600" : "text-slate-300 group-hover:text-slate-500"
                        }`}
                      />
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100">
            {pageRows.map(({ originalIndex, imgSrc, raw }) => {
              return (
                <tr
                  key={originalIndex}
                  className="hover:bg-amber-50/25 transition-colors group"
                >
                  {/* Pinned 1: Row Index */}
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px] sticky left-0 z-10 bg-white group-hover:bg-amber-50/40 border-r border-slate-100 shadow-xs">
                    {originalIndex + 1}
                  </td>

                  {/* Pinned 2: Image Thumbnail */}
                  <td className="py-2.5 px-4 sticky left-14 z-10 bg-white group-hover:bg-amber-50/40 border-r border-slate-100 shadow-xs">
                    <div className="relative group/thumb">
                      <ExcelRowImage
                        src={imgSrc}
                        alt="Ürün Görseli"
                        size="md"
                        className="shadow-xs"
                      />
                      {imgSrc && (
                        <button
                          type="button"
                          onClick={() => copyImageUrl(imgSrc, originalIndex)}
                          title="Görseli kopyala"
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

                  {/* Pinned 3: Actions (Düzenle) */}
                  <td className="py-3 px-4 sticky left-34 z-10 bg-white group-hover:bg-amber-50/40 border-r border-slate-100 shadow-xs">
                    <button
                      type="button"
                      onClick={() => onEditRow(originalIndex)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs hover:shadow-sm transition-all transform active:scale-95 cursor-pointer"
                    >
                      <Pencil size={12} />
                      <span>Düzenle</span>
                    </button>
                  </td>

                  {/* Dynamic Excel Cells */}
                  {visibleColumns.map((col) => {
                    const rawVal = raw[col];
                    const strVal = String(rawVal ?? "").trim();
                    const isLongText = strVal.length > 50;

                    return (
                      <td
                        key={col}
                        className="py-3 px-4 text-slate-700 max-w-xs border-r border-slate-50"
                      >
                        {strVal ? (
                          isLongText ? (
                            <span className="line-clamp-2 leading-relaxed" title={strVal}>
                              {strVal}
                            </span>
                          ) : (
                            <span className="font-medium whitespace-nowrap">{strVal}</span>
                          )
                        ) : (
                          <span className="text-slate-300 text-[11px]">—</span>
                        )}
                      </td>
                    );
                  })}
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
