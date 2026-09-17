"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileSpreadsheet,
  Database,
  Search,
  X,
  Filter,
  LayoutGrid,
  Table as TableIcon,
  RefreshCw,
  Download,
  Upload,
  Layers,
  ImageIcon,
  CheckCircle2,
  AlertCircle,
  FolderOpen,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { requireDb } from "@/lib/firebase";
import {
  getAllExcelImports,
  updateExcelImportRow,
  detectRowFields,
  type ExcelImportRecord,
} from "@/lib/excel-import-service";
import ExcelDataViewTable from "@/components/admin/excel/ExcelDataViewTable";
import ExcelDataViewGrid from "@/components/admin/excel/ExcelDataViewGrid";
import ExcelRowEditModal from "@/components/admin/excel/ExcelRowEditModal";

// ── Inner Page Component with Search Params ───────────────────────────────────

function ImportedDataContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requestedId = searchParams.get("id");

  const [records, setRecords] = useState<ExcelImportRecord[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Filters & Views
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [imageFilter, setImageFilter] = useState<"all" | "withImage" | "withoutImage">("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Edit Modal State
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // ── Fetch records from Firestore ───────────────────────────────────────────
  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const db = requireDb();
      const list = await getAllExcelImports(db);
      setRecords(list);

      // Select requested record from URL or the latest one
      if (list.length > 0) {
        if (requestedId && list.some((r) => r.id === requestedId)) {
          setSelectedRecordId(requestedId);
        } else if (!selectedRecordId || !list.some((r) => r.id === selectedRecordId)) {
          setSelectedRecordId(list[0].id);
        }
      }
    } catch (err) {
      console.error("İçe aktarılan veriler yüklenirken hata:", err);
      toast.error("Veriler alınırken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [requestedId, selectedRecordId]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // Keep URL in sync when record changes
  const handleSelectRecord = (id: string) => {
    setSelectedRecordId(id);
    router.push(`/admin/ice-aktarilan-veriler?id=${id}`);
  };

  // Active record
  const activeRecord = useMemo(() => {
    return records.find((r) => r.id === selectedRecordId) || null;
  }, [records, selectedRecordId]);

  const activeRows = useMemo(() => {
    return activeRecord ? activeRecord.rows : [];
  }, [activeRecord]);

  const activeColumns = useMemo(() => {
    return activeRecord ? activeRecord.columns : [];
  }, [activeRecord]);

  // Calculate unique categories for active record
  const availableCategories = useMemo(() => {
    if (!activeRecord) return [];
    const set = new Set<string>();
    for (const r of activeRecord.rows) {
      const detected = detectRowFields(r, activeRecord.columns);
      if (detected.category && detected.category.trim()) {
        set.add(detected.category.trim());
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "tr"));
  }, [activeRecord]);

  // Statistics
  const stats = useMemo(() => {
    if (!activeRecord) return { total: 0, withImage: 0, withoutImage: 0, categoryCount: 0 };
    let withImage = 0;
    for (const r of activeRecord.rows) {
      const detected = detectRowFields(r, activeRecord.columns);
      const hasImg = Boolean(
        String(r["Görsel"] || r["Resim"] || detected.imageUrl || "").trim()
      );
      if (hasImg) {
        withImage++;
      }
    }
    return {
      total: activeRecord.rows.length,
      withImage,
      withoutImage: activeRecord.rows.length - withImage,
      categoryCount: availableCategories.length,
    };
  }, [activeRecord, availableCategories]);

  // Filtered rows
  const filteredRows = useMemo(() => {
    if (!activeRecord) return [];

    return activeRecord.rows.filter((row) => {
      const detected = detectRowFields(row, activeRecord.columns);
      const hasImg = Boolean(
        String(row["Görsel"] || row["Resim"] || detected.imageUrl || "").trim()
      );

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesDetected =
          detected.title.toLowerCase().includes(query) ||
          detected.code.toLowerCase().includes(query) ||
          detected.category.toLowerCase().includes(query) ||
          detected.description.toLowerCase().includes(query);

        const matchesRaw = Object.values(row).some((val) =>
          String(val ?? "").toLowerCase().includes(query)
        );

        if (!matchesDetected && !matchesRaw) return false;
      }

      // Category filter
      if (selectedCategory !== "all") {
        if (detected.category !== selectedCategory) return false;
      }

      // Image filter
      if (imageFilter === "withImage") {
        if (!hasImg) return false;
      } else if (imageFilter === "withoutImage") {
        if (hasImg) return false;
      }

      return true;
    });
  }, [activeRecord, searchQuery, selectedCategory, imageFilter]);

  // Save row edit handler
  const handleSaveRow = async (
    rowIndex: number,
    updatedRow: Record<string, unknown>
  ) => {
    if (!activeRecord) return;
    const db = requireDb();

    // Persist to Firestore
    await updateExcelImportRow(db, activeRecord.id, rowIndex, updatedRow);

    // Update local state in memory
    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== activeRecord.id) return rec;
        const newRows = [...rec.rows];
        newRows[rowIndex] = updatedRow;
        return {
          ...rec,
          rows: newRows,
        };
      })
    );
  };

  // Export to Excel file
  const handleExportExcel = () => {
    if (!activeRecord || filteredRows.length === 0) return;
    try {
      const ws = XLSX.utils.json_to_sheet(filteredRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, activeRecord.sheetName || "Veriler");
      XLSX.writeFile(wb, `${activeRecord.fileName.replace(/\.[^/.]+$/, "")}_düzenlenmiş.xlsx`);
      toast.success("Excel dosyası başarıyla indirildi.");
    } catch (err) {
      console.error("Excel indirme hatası:", err);
      toast.error("Excel oluşturulurken bir hata oluştu.");
    }
  };

  return (
    <div className="w-full min-h-screen p-6 sm:p-8 lg:p-10 space-y-8 max-w-[1720px] mx-auto text-slate-800">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80">
              Geniş Ekran Yönetim Modülü
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-slate-900 text-2xl sm:text-3xl lg:text-4xl tracking-tight">
            İçe Aktarılan Veriler & Görsel Yönetimi
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Excel dosyalarından aktarılan tüm ürünleri resimli önizleme, gelişmiş filtreleme ve
            satır bazlı detaylı düzenleme (Edit) modalı ile yönetin.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={fetchRecords}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-xs disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Yenile</span>
          </button>

          <Link
            href="/admin/excel-veri"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition-all shadow-xs"
          >
            <Upload size={14} />
            <span>Yeni Excel Yükle</span>
          </Link>

          {activeRecord && (
            <button
              type="button"
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-semibold shadow-xs hover:shadow-sm transition-all"
            >
              <Download size={14} />
              <span>Excel İndir</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Empty State: No imported files yet ─────────────────────────────── */}
      {!loading && records.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto text-amber-600">
            <FileSpreadsheet size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Henüz İçe Aktarılan Veri Yok</h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
            Geniş ekranda incelemek ve düzenlemek için öncelikle bir Excel (.xlsx, .xls, .csv) dosyası
            yüklemeniz gerekmektedir.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/excel-veri"
              className="inline-flex items-center gap-2 px-5 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-2xl shadow-sm transition-all"
            >
              <Upload size={16} />
              <span>Excel Yükleme Sayfasına Git</span>
            </Link>
          </div>
        </div>
      )}

      {/* ── Main Data View (when records exist) ────────────────────────────── */}
      {records.length > 0 && (
        <div className="space-y-6">
          {/* File Switcher & Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* File Switcher Card */}
            <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
                <FolderOpen size={15} className="text-amber-500" />
                <span>Aktif İçe Aktarım Dosyası</span>
              </div>
              <div className="relative">
                <select
                  value={selectedRecordId}
                  onChange={(e) => handleSelectRecord(e.target.value)}
                  className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-900 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-400/50 cursor-pointer transition-colors"
                >
                  {records.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.fileName} — ({r.rowCount.toLocaleString("tr-TR")} satır · {r.sheetName})
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Stat: Toplam Satır */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                <Layers size={22} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Toplam Satır
                </p>
                <p className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {stats.total.toLocaleString("tr-TR")}
                </p>
              </div>
            </div>

            {/* Stat: Görselli Ürünler */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Görselli Ürün
                </p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xl font-extrabold text-emerald-700">
                    {stats.withImage.toLocaleString("tr-TR")}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    (%{stats.total ? Math.round((stats.withImage / stats.total) * 100) : 0})
                  </span>
                </div>
              </div>
            </div>

            {/* Stat: Kategoriler */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Database size={22} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Kategori Sayısı
                </p>
                <p className="text-xl font-extrabold text-amber-700 mt-0.5">
                  {stats.categoryCount}
                </p>
              </div>
            </div>
          </div>

          {/* ── Toolbar: Search, Filters & View Toggle ───────────────────────── */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün adı, kod, açıklama veya tabloda ara…"
                className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter Dropdowns & View Toggle */}
            <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto justify-end">
              {/* Category Filter */}
              {availableCategories.length > 0 && (
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-2xl px-3.5 py-2 text-xs font-semibold text-slate-700 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-400/40 cursor-pointer"
                  >
                    <option value="all">Tüm Kategoriler ({availableCategories.length})</option>
                    {availableCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              )}

              {/* Image Filter */}
              <div className="relative">
                <select
                  value={imageFilter}
                  onChange={(e) =>
                    setImageFilter(e.target.value as "all" | "withImage" | "withoutImage")
                  }
                  className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-2xl px-3.5 py-2 text-xs font-semibold text-slate-700 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-400/40 cursor-pointer"
                >
                  <option value="all">Tüm Görsel Durumları</option>
                  <option value="withImage">Sadece Görselliler ({stats.withImage})</option>
                  <option value="withoutImage">Görseli Olmayanlar ({stats.withoutImage})</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>

              {/* View Toggle (Table vs Grid) */}
              <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    viewMode === "table"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  title="Geniş Tablo Görünümü"
                >
                  <TableIcon size={14} />
                  <span className="hidden sm:inline">Tablo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  title="Kart Izgara Görünümü"
                >
                  <LayoutGrid size={14} />
                  <span className="hidden sm:inline">Kartlar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Pill info */}
          {(searchQuery || selectedCategory !== "all" || imageFilter !== "all") && (
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 px-1">
              <span>Filtrelenen sonuç:</span>
              <strong className="text-slate-800 font-bold">{filteredRows.length}</strong>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setImageFilter("all");
                }}
                className="text-amber-600 hover:text-amber-800 font-semibold underline ml-2 cursor-pointer"
              >
                Filtreleri Temizle
              </button>
            </div>
          )}

          {/* ── Main Render: Table or Grid ─────────────────────────────────── */}
          {viewMode === "table" ? (
            <ExcelDataViewTable
              rows={filteredRows}
              columns={activeColumns}
              onEditRow={(origIdx) => setEditingIndex(origIdx)}
            />
          ) : (
            <ExcelDataViewGrid
              rows={filteredRows}
              columns={activeColumns}
              onEditRow={(origIdx) => setEditingIndex(origIdx)}
            />
          )}

          {/* ── Edit Modal ─────────────────────────────────────────────────── */}
          {editingIndex !== null && activeRecord && (
            <ExcelRowEditModal
              isOpen={editingIndex !== null}
              onClose={() => setEditingIndex(null)}
              row={activeRecord.rows[editingIndex] || null}
              rowIndex={editingIndex}
              columns={activeColumns}
              onSave={handleSaveRow}
            />
          )}
        </div>
      )}
    </div>
  );
}

// ── Default Export Wrapped in Suspense (Next.js requirement) ──────────────────

export default function ImportedDataPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold text-slate-500">
              Veriler yükleniyor…
            </p>
          </div>
        </div>
      }
    >
      <ImportedDataContent />
    </Suspense>
  );
}
