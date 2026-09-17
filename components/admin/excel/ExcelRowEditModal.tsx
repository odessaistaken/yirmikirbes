"use client";

import { useState, useEffect } from "react";
import {
  X,
  Save,
  ImageIcon,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import { detectRowFields, type DetectedRowData } from "@/lib/excel-import-service";

interface ExcelRowEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  row: Record<string, unknown> | null;
  rowIndex: number;
  columns: string[];
  onSave: (rowIndex: number, updatedRow: Record<string, unknown>) => Promise<void>;
}

export default function ExcelRowEditModal({
  isOpen,
  onClose,
  row,
  rowIndex,
  columns,
  onSave,
}: ExcelRowEditModalProps) {
  // State for all editable fields
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [detected, setDetected] = useState<DetectedRowData | null>(null);
  const [saving, setSaving] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showAllColumns, setShowAllColumns] = useState(false);

  // Initialize form data when row changes
  useEffect(() => {
    if (row) {
      setFormData({ ...row });
      const detectedInfo = detectRowFields(row, columns);
      setDetected(detectedInfo);
      setImageError(false);
    }
  }, [row, columns]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !saving) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, saving, onClose]);

  if (!isOpen || !row || !detected) return null;

  // Active field keys
  const { titleKey, imageKey, priceKey, categoryKey, codeKey, descriptionKey } =
    detected.keys;

  const currentImageUrl = String(formData[imageKey] ?? "").trim();

  // Handle single field change
  const handleFieldChange = (key: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key === imageKey) {
      setImageError(false);
    }
  };

  // Reset to original row values
  const handleReset = () => {
    setFormData({ ...row });
    setImageError(false);
    toast.success("Değerler orijinal haline sıfırlandı.");
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(rowIndex, formData);
      toast.success(`Satır #${rowIndex + 1} başarıyla güncellendi.`);
      onClose();
    } catch (err: any) {
      console.error("Satır güncelleme hatası:", err);
      toast.error(err?.message || "Kayıt güncellenirken bir hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  // Collect other miscellaneous columns
  const mainKeys = new Set([
    titleKey,
    imageKey,
    priceKey,
    categoryKey,
    codeKey,
    descriptionKey,
  ]);
  const otherKeys = columns.filter((col) => !mainKeys.has(col));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={!saving ? onClose : undefined}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[92vh] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
              <Sparkles size={18} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg truncate">
                  Ürünü Düzenle
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-amber-100/70 text-amber-800 font-semibold">
                  Satır #{rowIndex + 1}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate max-w-md mt-0.5">
                {String(formData[titleKey] || "İsimsiz Ürün")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors text-xs flex items-center gap-1.5"
              title="Değişiklikleri geri al"
            >
              <RotateCcw size={15} />
              <span className="hidden sm:inline">Sıfırla</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body Form */}
        <form id="edit-row-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT / TOP: Resim (Görsel) Yönetimi & Canlı Önizleme */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4.5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-amber-500" />
                    Ürün Görseli Önizleme
                  </label>
                  {currentImageUrl && (
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        imageError
                          ? "bg-red-100 text-red-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {imageError ? (
                        <>
                          <AlertCircle size={10} /> Link Kırık
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={10} /> Aktif
                        </>
                      )}
                    </span>
                  )}
                </div>

                {/* Resim Önizleme Çerçevesi */}
                <div className="relative w-full aspect-square bg-white rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden shadow-xs">
                  {currentImageUrl && !imageError ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={currentImageUrl}
                        alt="Önizleme"
                        onError={() => setImageError(true)}
                        className="w-full h-full object-contain p-2"
                      />
                      <a
                        href={currentImageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white text-slate-600 rounded-lg shadow-xs transition-colors"
                        title="Yeni sekmede aç"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                      <ImageIcon size={40} className="text-slate-300 mb-2" />
                      <p className="text-xs font-medium text-slate-600">
                        {currentImageUrl ? "Görsel yüklenemedi" : "Görsel Belirtilmedi"}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1 max-w-[200px]">
                        Aşağıdaki alana geçerli bir görsel URL&apos;si veya yolu girin.
                      </p>
                    </div>
                  )}
                </div>

                {/* Görsel URL Input Alanı */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                    <span>Görsel Yolu / URL</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      kolon: {imageKey}
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={String(formData[imageKey] ?? "")}
                      onChange={(e) => handleFieldChange(imageKey, e.target.value)}
                      placeholder="https://... veya /resimler/ornek.png"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 font-mono transition-all pr-8"
                    />
                    {String(formData[imageKey] ?? "") && (
                      <button
                        type="button"
                        onClick={() => handleFieldChange(imageKey, "")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        title="URL'yi temizle"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Harici web linki (URL) veya sitenizdeki yerel görsel yolunu yazabilirsiniz.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT / MAIN: Metinsel Ürün Bilgileri */}
            <div className="lg:col-span-7 space-y-4">
              {/* Ürün Adı */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    Ürün Adı / Başlık <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">{titleKey}</span>
                </div>
                <input
                  type="text"
                  required
                  value={String(formData[titleKey] ?? "")}
                  onChange={(e) => handleFieldChange(titleKey, e.target.value)}
                  placeholder="Örn: Caramel Aromalı Şurup 750ml"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all"
                />
              </div>

              {/* Fiyat & Kategori & Kod (3'lü veya 2'li grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Fiyat */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">Fiyat</label>
                    <span className="text-[10px] text-slate-400 font-mono">{priceKey}</span>
                  </div>
                  <input
                    type="text"
                    value={String(formData[priceKey] ?? "")}
                    onChange={(e) => handleFieldChange(priceKey, e.target.value)}
                    placeholder="Örn: 250 veya 250 TL"
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all font-medium"
                  />
                </div>

                {/* Kategori */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">Kategori</label>
                    <span className="text-[10px] text-slate-400 font-mono">{categoryKey}</span>
                  </div>
                  <input
                    type="text"
                    value={String(formData[categoryKey] ?? "")}
                    onChange={(e) => handleFieldChange(categoryKey, e.target.value)}
                    placeholder="Örn: Şuruplar, Kahve vb."
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all"
                  />
                </div>

                {/* Ürün Kodu / SKU */}
                <div className="space-y-1.5 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Ürün Kodu / Barkod / SKU
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">{codeKey}</span>
                  </div>
                  <input
                    type="text"
                    value={String(formData[codeKey] ?? "")}
                    onChange={(e) => handleFieldChange(codeKey, e.target.value)}
                    placeholder="Örn: NON-CAR-750"
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Açıklama */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">Açıklama</label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {descriptionKey}
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={String(formData[descriptionKey] ?? "")}
                  onChange={(e) => handleFieldChange(descriptionKey, e.target.value)}
                  placeholder="Ürün açıklaması, özellikleri veya notlar…"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all resize-y"
                />
              </div>

              {/* Diğer Kolonlar Accordion / Section */}
              {otherKeys.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAllColumns(!showAllColumns)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 py-1 transition-colors"
                  >
                    <Layers size={13} />
                    <span>
                      {showAllColumns ? "Diğer Kolonları Gizle" : `Diğer Kolonları Düzenle (${otherKeys.length} kolon)`}
                    </span>
                  </button>

                  {showAllColumns && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                      {otherKeys.map((colKey) => (
                        <div key={colKey} className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-600 truncate block">
                            {colKey}
                          </label>
                          <input
                            type="text"
                            value={String(formData[colKey] ?? "")}
                            onChange={(e) => handleFieldChange(colKey, e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-400"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <p className="text-xs text-slate-400 hidden sm:block">
            Değişiklikler doğrudan içe aktarılan kayda işlenecektir.
          </p>
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors disabled:opacity-50"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              form="edit-row-form"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  <span>Kaydediliyor…</span>
                </>
              ) : (
                <>
                  <Save size={14} />
                  <span>Değişiklikleri Kaydet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
