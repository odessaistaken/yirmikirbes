"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Save,
  ImageIcon,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Upload,
  Layers,
  Sparkles,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { resizeImageBase64 } from "@/lib/excel-image-extractor";

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
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Identify which key in row stores the image
  const imageKey =
    columns.find((c) => {
      const l = c.toLowerCase().trim();
      return (
        l === "görsel" ||
        l === "gorsel" ||
        l === "resim" ||
        l === "image" ||
        l === "imageurl"
      );
    }) || "Görsel";

  // Filter out imageKey from dynamic text columns so it's managed in the dedicated visual image manager
  const textColumns = columns.filter((col) => {
    const l = col.toLowerCase().trim();
    return (
      l !== "görsel" &&
      l !== "gorsel" &&
      l !== "resim" &&
      l !== "image" &&
      l !== "imageurl"
    );
  });

  // Initialize form state
  useEffect(() => {
    if (row) {
      setFormData({ ...row });
      setImageError(false);
    }
  }, [row]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !saving) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, saving, onClose]);

  if (!isOpen || !row) return null;

  const currentImage = String(formData[imageKey] || "").trim();

  const handleFieldChange = (key: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key === imageKey) {
      setImageError(false);
    }
  };

  // Upload local image from computer
  const handleLocalImageSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Lütfen geçerli bir resim dosyası seçin (PNG, JPG, WEBP).");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const rawBase64 = e.target?.result as string;
        if (rawBase64) {
          // Resize & compress for safety
          const compressed = await resizeImageBase64(rawBase64, 400, 400, 0.85);
          handleFieldChange(imageKey, compressed);
          toast.success("Yeni görsel başarıyla yüklendi.");
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Resim okuma hatası:", err);
      toast.error("Görsel okunurken bir hata oluştu.");
    }
  };

  const handleReset = () => {
    setFormData({ ...row });
    setImageError(false);
    toast.success("Orijinal değerler geri yüklendi.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(rowIndex, formData);
      toast.success(`Satır #${rowIndex + 1} başarıyla güncellendi.`);
      onClose();
    } catch (err: any) {
      console.error("Satır kaydetme hatası:", err);
      toast.error(err?.message || "Kayıt güncellenirken bir hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  // Find a friendly row title for modal header
  const titleCandidate =
    String(
      formData["ÜRÜN ADI"] ||
        formData["Ürün Adı"] ||
        formData["name"] ||
        formData[textColumns[0]] ||
        `Satır #${rowIndex + 1}`
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={!saving ? onClose : undefined}
      />

      {/* Modal Dialog */}
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
                  Excel Verisini Düzenle
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-amber-100/70 text-amber-800 font-semibold">
                  Satır #{rowIndex + 1}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate max-w-md mt-0.5">
                {titleCandidate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors text-xs flex items-center gap-1.5"
              title="Değişiklikleri orijinal haline sıfırla"
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

        {/* Modal Form Body */}
        <form
          id="dynamic-row-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT: Resim (Görsel) Yönetimi & Canlı Önizleme */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4.5 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-amber-500" />
                    Ürün Görseli
                  </label>
                  {currentImage && (
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
                          <CheckCircle2 size={10} /> Yüklendi
                        </>
                      )}
                    </span>
                  )}
                </div>

                {/* Resim Önizleme Kutusu */}
                <div className="relative w-full aspect-square bg-white rounded-2xl border border-slate-200 flex items-center justify-center overflow-hidden shadow-xs">
                  {currentImage && !imageError ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={currentImage}
                        alt="Önizleme"
                        onError={() => setImageError(true)}
                        className="w-full h-full object-contain p-2 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => handleFieldChange(imageKey, "")}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-lg shadow-xs transition-colors"
                        title="Görseli kaldır"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                      <ImageIcon size={42} className="text-slate-300 mb-2" />
                      <p className="text-xs font-medium text-slate-600">
                        {currentImage ? "Görsel yüklenemedi" : "Görsel Yok"}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1 max-w-[200px]">
                        Aşağıdaki alana yeni bir resim URL&apos;si yazabilir veya bilgisayarınızdan resim seçebilirsiniz.
                      </p>
                    </div>
                  )}
                </div>

                {/* Bilgisayardan Resim Yükleme Butonu */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleLocalImageSelect(file);
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors shadow-xs"
                >
                  <Upload size={14} className="text-amber-600" />
                  <span>Bilgisayardan Yeni Resim Seç</span>
                </button>

                {/* Resim URL / Yolu Input Alanı */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold text-slate-700">
                      Görsel Yolu / URL / Base64
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={currentImage.startsWith("data:image") ? "Gömülü Resim (Base64)" : currentImage}
                      onChange={(e) => handleFieldChange(imageKey, e.target.value)}
                      placeholder="https://... veya /resimler/ornek.png"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/40 font-mono transition-all pr-8"
                    />
                    {currentImage && (
                      <button
                        type="button"
                        onClick={() => handleFieldChange(imageKey, "")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        title="Temizle"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Yeni bir resim URL&apos;si yazabilir veya yukarıdaki butonla doğrudan görsel yükleyebilirsiniz.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Dinamik Olarak Excel'den Gelen TÜM Sütunlar */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Layers size={15} className="text-amber-500" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Excel Sütun Bilgileri ({textColumns.length} Alan)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {textColumns.map((colName) => {
                  const val = formData[colName];
                  const strVal = String(val ?? "");
                  const lowerCol = colName.toLowerCase();
                  const isLongText =
                    lowerCol.includes("açıklama") ||
                    lowerCol.includes("aciklama") ||
                    lowerCol.includes("not") ||
                    lowerCol.includes("detay") ||
                    lowerCol.includes("içerik") ||
                    lowerCol.includes("icerik") ||
                    strVal.length > 60;

                  return (
                    <div
                      key={colName}
                      className={`space-y-1.5 ${isLongText ? "sm:col-span-2" : ""}`}
                    >
                      <label className="text-xs font-semibold text-slate-700 block truncate" title={colName}>
                        {colName}
                      </label>

                      {isLongText ? (
                        <textarea
                          rows={3}
                          value={strVal}
                          onChange={(e) => handleFieldChange(colName, e.target.value)}
                          placeholder={`${colName} giriniz…`}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all resize-y"
                        />
                      ) : (
                        <input
                          type="text"
                          value={strVal}
                          onChange={(e) => handleFieldChange(colName, e.target.value)}
                          placeholder={`${colName} giriniz…`}
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all font-medium"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <p className="text-xs text-slate-400 hidden sm:block">
            Tüm değişiklikler içe aktarılan kayda kalıcı olarak kaydedilecektir.
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
              form="dynamic-row-form"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all disabled:opacity-50 cursor-pointer"
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
