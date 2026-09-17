"use client";

export const dynamic = "force-dynamic";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FileSpreadsheet, RefreshCw, Database, Info } from "lucide-react";
import { requireDb } from "@/lib/firebase";
import {
  getAllExcelImports,
  createExcelImport,
  deleteExcelImport,
  type ExcelImportRecord,
} from "@/lib/excel-import-service";
import ExcelUploader, { type ParsedExcelData } from "@/components/admin/excel/ExcelUploader";
import ExcelImportModal from "@/components/admin/excel/ExcelImportModal";
import ExcelDataTable from "@/components/admin/excel/ExcelDataTable";

// ── Page Component ─────────────────────────────────────────────────────────────

export default function ExcelVeriPage() {
  const [records, setRecords] = useState<ExcelImportRecord[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [parsedData, setParsedData] = useState<ParsedExcelData | null>(null);
  const [importing, setImporting] = useState(false);

  // ── Fetch existing records ─────────────────────────────────────────────────
  const fetchRecords = useCallback(async () => {
    setLoadingRecords(true);
    try {
      const db = requireDb();
      const data = await getAllExcelImports(db);
      setRecords(data);
    } catch (err) {
      console.error("Excel import fetch error:", err);
      toast.error("Kayıtlar yüklenirken hata oluştu.");
    } finally {
      setLoadingRecords(false);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // ── Upload & confirm ───────────────────────────────────────────────────────
  const handleConfirmImport = async (data: ParsedExcelData) => {
    setImporting(true);
    try {
      const db = requireDb();
      await createExcelImport(db, {
        fileName: data.fileName,
        sheetName: data.sheetName,
        rowCount: data.rows.length,
        columns: data.columns,
        rows: data.rows,
      });
      toast.success(
        `"${data.fileName}" başarıyla içe aktarıldı. ${data.rows.length.toLocaleString("tr-TR")} satır kaydedildi.`
      );
      setParsedData(null);
      await fetchRecords();
    } catch (err) {
      console.error("Excel import create error:", err);
      toast.error("Veri kaydedilirken hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setImporting(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    try {
      const db = requireDb();
      await deleteExcelImport(db, id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
      toast.success("Kayıt silindi.");
    } catch (err) {
      console.error("Excel import delete error:", err);
      toast.error("Kayıt silinirken hata oluştu.");
    }
  };

  return (
    <div className="p-8 text-slate-800 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <p className="section-label">Admin Paneli</p>
        <div className="flex items-center gap-3">
          <h1 className="font-heading font-bold text-slate-900 text-3xl">
            Excel Veri Yönetimi
          </h1>
        </div>
        <p className="text-slate-500 text-sm mt-1">
          Excel dosyalarını yükle, içe aktar ve yönet. Müşteri kataloğu ile hiçbir bağlantısı yoktur.
        </p>
      </motion.div>

      {/* Info banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-8"
      >
        <Info size={16} className="text-amber-600 mt-0.5 shrink-0" />
        <div className="text-xs text-amber-800 leading-relaxed">
          <strong className="font-semibold">Bu modül yalnızca admin panelinize aittir.</strong>{" "}
          Yüklediğiniz Excel verileri Firestore&apos;da{" "}
          <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-[10px]">excelImports</code>{" "}
          koleksiyonunda ayrı olarak saklanır. Müşteri kataloğu, ürün listesi veya sunum kataloğu hiçbir
          şekilde etkilenmez.
        </div>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
            <FileSpreadsheet size={17} className="text-amber-600" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 text-base">Dosya Yükle</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              .xlsx, .xls veya .csv formatlarını destekler
            </p>
          </div>
        </div>

        <ExcelUploader
          onParsed={(data) => setParsedData(data)}
          disabled={importing}
        />

        {/* Parsed summary — show after file selected but before confirming */}
        {parsedData && !importing && (
          <div className="mt-4 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <div className="text-sm text-slate-700">
              <span className="font-semibold">{parsedData.fileName}</span>
              <span className="text-slate-400 mx-2">·</span>
              <span>{parsedData.rows.length.toLocaleString("tr-TR")} satır</span>
              <span className="text-slate-400 mx-2">·</span>
              <span>{parsedData.columns.length} kolon</span>
            </div>
            <button
              onClick={() => setParsedData(parsedData)}
              className="px-4 py-1.5 text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-xl transition-colors shadow-sm"
            >
              Önizle & İçe Aktar
            </button>
          </div>
        )}
      </motion.div>

      {/* Records Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
              <Database size={17} className="text-slate-500" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 text-base">
                İçe Aktarılan Veriler
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {loadingRecords ? "Yükleniyor…" : `${records.length} kayıt`}
              </p>
            </div>
          </div>
          <button
            onClick={fetchRecords}
            disabled={loadingRecords}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
          >
            <RefreshCw size={12} className={loadingRecords ? "animate-spin" : ""} />
            Yenile
          </button>
        </div>

        <ExcelDataTable
          records={records}
          onDelete={handleDelete}
          loading={loadingRecords}
        />
      </motion.div>

      {/* Import Modal */}
      {parsedData && (
        <ExcelImportModal
          data={parsedData}
          importing={importing}
          onConfirm={handleConfirmImport}
          onCancel={() => setParsedData(null)}
        />
      )}
    </div>
  );
}
