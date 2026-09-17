"use client";

import { useState } from "react";
import { X, FileSpreadsheet, CheckCircle, AlertCircle, Table2 } from "lucide-react";
import type { ParsedExcelData } from "./ExcelUploader";

// ── Types ──────────────────────────────────────────────────────────────────────

interface ExcelImportModalProps {
  data: ParsedExcelData;
  onConfirm: (data: ParsedExcelData) => void;
  onCancel: () => void;
  importing?: boolean;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function ExcelImportModal({
  data,
  onConfirm,
  onCancel,
  importing = false,
}: ExcelImportModalProps) {
  const [page, setPage] = useState(0);
  const PREVIEW_ROWS = 5;
  const previewRows = data.rows.slice(0, PREVIEW_ROWS);

  const handleConfirm = () => {
    onConfirm(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={!importing ? onCancel : undefined}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <FileSpreadsheet size={20} className="text-amber-600" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 text-base">Import Önizleme</h2>
              <p className="text-xs text-slate-500 mt-0.5 truncate max-w-sm">
                {data.fileName} &nbsp;›&nbsp; {data.sheetName}
              </p>
            </div>
          </div>
          {!importing && (
            <button
              onClick={onCancel}
              className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <Table2 size={15} className="text-slate-400" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Satır</p>
              <p className="text-slate-800 font-bold text-lg leading-none">{data.rows.length.toLocaleString("tr-TR")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Table2 size={15} className="text-slate-400" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Kolon</p>
              <p className="text-slate-800 font-bold text-lg leading-none">{data.columns.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <FileSpreadsheet size={15} className="text-slate-400" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Sayfa</p>
              <p className="text-slate-800 font-bold text-lg leading-none truncate">{data.sheetName}</p>
            </div>
          </div>
        </div>

        {/* Columns list */}
        <div className="px-6 py-3 border-b border-slate-100 bg-white">
          <p className="text-xs text-slate-500 font-semibold mb-2">Kolonlar</p>
          <div className="flex flex-wrap gap-1.5">
            {data.columns.map((col) => (
              <span
                key={col}
                className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg px-2.5 py-0.5 text-xs font-medium"
              >
                <CheckCircle size={10} />
                {col}
              </span>
            ))}
          </div>
        </div>

        {/* Preview Table */}
        <div className="flex-1 overflow-auto px-6 py-4">
          <p className="text-xs text-slate-500 font-semibold mb-2">
            İlk {Math.min(PREVIEW_ROWS, data.rows.length)} satır önizleme
          </p>
          {previewRows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
              <AlertCircle size={28} className="mb-2" />
              <p className="text-sm">Bu sayfada veri bulunamadı.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-3 py-2.5 text-left text-slate-400 font-semibold uppercase tracking-wider whitespace-nowrap w-10">
                      #
                    </th>
                    {data.columns.map((col) => (
                      <th
                        key={col}
                        className="px-3 py-2.5 text-left text-slate-600 font-semibold uppercase tracking-wider whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {previewRows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-2 text-slate-400">{i + 1}</td>
                      {data.columns.map((col) => {
                        const val = String(row[col] ?? "");
                        const isImg =
                          col === "Görsel" ||
                          val.startsWith("data:image/") ||
                          val.startsWith("/resimler/") ||
                          ((val.startsWith("http://") || val.startsWith("https://")) &&
                            /\.(png|jpe?g|webp|svg|gif)(\?.*)?$/i.test(val));

                        return (
                          <td key={col} className="px-3 py-2 text-slate-700 max-w-[200px] truncate">
                            {isImg && val ? (
                              <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={val}
                                  alt="Önizleme"
                                  className="w-full h-full object-contain p-0.5"
                                />
                              </div>
                            ) : (
                              val
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {data.rows.length > PREVIEW_ROWS && (
            <p className="text-xs text-slate-400 text-center mt-2">
              … ve {(data.rows.length - PREVIEW_ROWS).toLocaleString("tr-TR")} satır daha
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-white rounded-b-2xl">
          <p className="text-xs text-slate-400">
            Tüm veriler Firestore&apos;da ayrı bir koleksiyona kaydedilir. Müşteri kataloğu etkilenmez.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              disabled={importing}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 transition-colors"
            >
              İptal
            </button>
            <button
              onClick={handleConfirm}
              disabled={importing || data.rows.length === 0}
              className="px-5 py-2 rounded-xl text-sm font-bold bg-amber-400 text-slate-900 hover:bg-amber-500 disabled:opacity-50 transition-all flex items-center gap-2 shadow-sm"
            >
              {importing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  Kaydediliyor…
                </>
              ) : (
                <>
                  <CheckCircle size={15} />
                  {data.rows.length.toLocaleString("tr-TR")} Satırı İçe Aktar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
