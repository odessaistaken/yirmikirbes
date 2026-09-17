"use client";

import { useState } from "react";
import {
  FileSpreadsheet,
  Trash2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Table2,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { ExcelImportRecord } from "@/lib/excel-import-service";

// ── Types ──────────────────────────────────────────────────────────────────────

interface ExcelDataTableProps {
  records: ExcelImportRecord[];
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatDate(ts: ExcelImportRecord["importedAt"]): string {
  if (!ts) return "—";
  const d = ts.toDate();
  return d.toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const PAGE_SIZE = 20;

// ── Sub-component: Expanded record viewer ─────────────────────────────────────

function RecordViewer({ record }: { record: ExcelImportRecord }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const filtered = search
    ? record.rows.filter((row) =>
        Object.values(row).some((v) =>
          String(v).toLowerCase().includes(search.toLowerCase())
        )
      )
    : record.rows;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageRows = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="border-t border-slate-100 bg-slate-50/60 px-6 py-4 space-y-3">
      {/* Search + pagination info */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tabloda ara…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="w-full pl-8 pr-8 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-400/40"
          />
          {search && (
            <button onClick={() => { setSearch(""); setPage(0); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X size={12} />
            </button>
          )}
        </div>
        <span className="text-xs text-slate-400">
          {filtered.length.toLocaleString("tr-TR")} satır gösteriliyor
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-3 py-2.5 text-left text-slate-400 font-semibold w-10">#</th>
              {record.columns.map((col) => (
                <th
                  key={col}
                  className="px-3 py-2.5 text-left text-slate-600 font-semibold whitespace-nowrap uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={record.columns.length + 1} className="py-8 text-center text-slate-400">
                  Sonuç bulunamadı.
                </td>
              </tr>
            ) : (
              pageRows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-2 text-slate-400">{page * PAGE_SIZE + i + 1}</td>
                  {record.columns.map((col) => (
                    <td key={col} className="px-3 py-2 text-slate-700 max-w-[220px] truncate">
                      {String(row[col] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Sayfa {page + 1} / {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronLeft size={13} /> Önceki
            </button>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Sonraki <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function ExcelDataTable({
  records,
  onDelete,
  loading = false,
}: ExcelDataTableProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      await onDelete(id);
    } finally {
      setDeleting(null);
      setConfirmDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-slate-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <FileSpreadsheet size={40} className="mb-3 opacity-40" />
        <p className="text-sm font-medium">Henüz Excel verisi yüklenmedi.</p>
        <p className="text-xs mt-1">Yukarıdaki alandan bir dosya yükleyerek başlayın.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {records.map((record) => {
        const isExpanded = expanded === record.id;
        const isDeleting = deleting === record.id;
        const isConfirming = confirmDelete === record.id;

        return (
          <div
            key={record.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-slate-300 shadow-sm"
          >
            {/* Record Header */}
            <div className="flex items-center gap-4 px-5 py-4">
              {/* Icon */}
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                <FileSpreadsheet size={18} className="text-amber-600" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">
                  {record.fileName}
                </p>
                <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Table2 size={11} /> {record.sheetName}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500">
                    {record.rowCount.toLocaleString("tr-TR")} satır
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500">
                    {record.columns.length} kolon
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar size={10} />
                    {formatDate(record.importedAt)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Expand */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : record.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  {isExpanded ? "Kapat" : "Görüntüle"}
                </button>

                {/* Delete */}
                {isConfirming ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setConfirmDelete(null)}
                      disabled={isDeleting}
                      className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold transition-colors disabled:opacity-50"
                    >
                      Hayır
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      disabled={isDeleting}
                      className="px-2.5 py-1.5 text-xs rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      {isDeleting ? (
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>Evet, sil</>
                      )}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(record.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Kaydı sil"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Columns pills (collapsed preview) */}
            {!isExpanded && (
              <div className="px-5 pb-3 flex flex-wrap gap-1">
                {record.columns.slice(0, 8).map((col) => (
                  <span
                    key={col}
                    className="text-[10px] bg-slate-50 border border-slate-200 text-slate-500 rounded px-2 py-0.5"
                  >
                    {col}
                  </span>
                ))}
                {record.columns.length > 8 && (
                  <span className="text-[10px] text-slate-400 px-2 py-0.5">
                    +{record.columns.length - 8} kolon
                  </span>
                )}
              </div>
            )}

            {/* Expanded viewer */}
            {isExpanded && <RecordViewer record={record} />}
          </div>
        );
      })}
    </div>
  );
}
