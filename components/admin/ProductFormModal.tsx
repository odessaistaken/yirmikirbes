"use client";

import { useRef, type RefObject } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Flame, ImageIcon, Trash2, Upload, X } from "lucide-react";
import type { Product, Category } from "@/lib/types";

export interface ProductFormData {
  name: string;
  code: string;
  codeGroup: string;
  categoryId: string;
  price: number;
  vatRate: number;
  order: number;
  description: string;
  imageUrl: string;
  imageStoragePath: string;
  isActive: boolean;
  isBestSeller: boolean;
}

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editTarget: Product | null;
  categories: Category[];
  form: ProductFormData;
  setForm: React.Dispatch<React.SetStateAction<ProductFormData>>;
  onSave: () => void;
  saving: boolean;
  uploadProgress: number | null;
  isDragging: boolean;
  setIsDragging: (val: boolean) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileSelect: (file: File) => Promise<void>;
  onRemoveImage: () => Promise<void>;
}

export default function ProductFormModal({
  isOpen,
  onClose,
  editTarget,
  categories,
  form,
  setForm,
  onSave,
  saving,
  uploadProgress,
  isDragging,
  setIsDragging,
  fileInputRef,
  onFileSelect,
  onRemoveImage,
}: ProductFormModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto text-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50">
                <h2 className="font-heading font-bold text-slate-900 text-lg">
                  {editTarget ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Image upload */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-slate-700 text-xs font-semibold">
                      Ürün Görseli
                    </label>
                    {form.imageUrl && (
                      <button
                        type="button"
                        onClick={onRemoveImage}
                        className="text-red-500 hover:text-red-600 text-xs font-medium flex items-center gap-1 hover:underline transition-colors cursor-pointer"
                      >
                        <Trash2 size={12} /> Görseli Kaldır / Sil
                      </button>
                    )}
                  </div>

                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDragging(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDragging(false);
                    }}
                    onDrop={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDragging(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        await onFileSelect(file);
                      }
                    }}
                    onClick={() => !form.imageUrl && fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2.5 transition-all duration-200 ${
                      isDragging
                        ? "border-amber-500 bg-amber-50/50 scale-[1.02]"
                        : form.imageUrl
                        ? "border-slate-200 bg-slate-50"
                        : "border-slate-300 bg-slate-50 hover:border-amber-500 hover:bg-amber-50/30 cursor-pointer"
                    }`}
                  >
                    {isDragging ? (
                      <div className="text-center py-4">
                        <Upload size={32} className="text-amber-600 animate-bounce mx-auto mb-1.5" />
                        <p className="font-heading font-semibold text-amber-600 text-xs">
                          Resmi Buraya Bırakın
                        </p>
                      </div>
                    ) : form.imageUrl ? (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden group bg-slate-100">
                        <Image
                          src={form.imageUrl}
                          alt="preview"
                          fill
                          sizes="(max-width: 768px) 100vw, 500px"
                          quality={90}
                          className="object-contain p-2"
                        />
                        {/* Hover action overlay */}
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              fileInputRef.current?.click();
                            }}
                            className="text-white text-xs font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
                          >
                            <Upload size={13} /> Değiştir
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveImage();
                            }}
                            className="text-white text-xs font-semibold bg-red-600/80 hover:bg-red-600 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
                          >
                            <Trash2 size={13} /> Görseli Sil
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-2">
                        <ImageIcon size={28} className="text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-700 text-xs font-semibold">
                          Resmi buraya sürükleyip bırakın
                        </p>
                        <p className="text-slate-400 text-2xs mt-1">
                          veya seçmek için tıklayın (PNG, JPG, WEBP)
                        </p>
                      </div>
                    )}

                    {uploadProgress !== null && (
                      <div className="w-full mt-2">
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-1 text-center">
                          Yükleniyor... %{uploadProgress}
                        </p>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        await onFileSelect(file);
                      }
                    }}
                  />

                  <div className="flex items-center justify-between gap-2 mt-2">
                    <p className="text-slate-500 text-xs">veya Görsel URL giriniz:</p>
                    {form.imageUrl && (
                      <button
                        type="button"
                        onClick={onRemoveImage}
                        className="text-red-500 hover:text-red-600 text-2xs flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Trash2 size={10} /> Görseli Temizle
                      </button>
                    )}
                  </div>
                  <input
                    value={form.imageUrl}
                    onChange={(e) => {
                      const val = e.target.value;
                      setForm((prev) => ({
                        ...prev,
                        imageUrl: val,
                        imageStoragePath: val ? prev.imageStoragePath : "",
                      }));
                    }}
                    placeholder="https://..."
                    className="input mt-1 text-sm"
                  />
                </div>

                {/* Name & Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                      Ürün Adı *
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Örn: Vanilya Aromalı Şurup"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                      Ürün Kodu *
                    </label>
                    <input
                      value={form.code}
                      onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value }))}
                      placeholder="PUR-2045-001"
                      className="input font-mono text-sm"
                    />
                  </div>
                </div>

                {/* Code Group & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                      Kod Grubu
                    </label>
                    <input
                      value={form.codeGroup}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, codeGroup: e.target.value }))
                      }
                      placeholder="PUR-2045"
                      className="input font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                      Kategori *
                    </label>
                    <select
                      value={form.categoryId}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, categoryId: e.target.value }))
                      }
                      className="input"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price, VAT, Order */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                      Fiyat (₺)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.price}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, price: Number(e.target.value) }))
                      }
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                      KDV (%)
                    </label>
                    <select
                      value={form.vatRate}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, vatRate: Number(e.target.value) }))
                      }
                      className="input"
                    >
                      <option value={1}>%1</option>
                      <option value={10}>%10</option>
                      <option value={20}>%20</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                      Sıra
                    </label>
                    <input
                      type="number"
                      value={form.order}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, order: Number(e.target.value) }))
                      }
                      className="input"
                    />
                  </div>
                </div>

                {/* Description (Tanıtım Metni) */}
                <div>
                  <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                    Tanıtım Metni (Açıklama)
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    rows={3}
                    placeholder="Müşteriyi cezbedecek ürün tanıtım metni..."
                    className="input resize-none"
                  />
                </div>

                {/* Status & Best Seller toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, isActive: !prev.isActive }))
                      }
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                        form.isActive ? "bg-amber-600" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                          form.isActive ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                    <span className="text-slate-700 text-sm font-medium">
                      {form.isActive ? "Aktif Ürün" : "Pasif Ürün"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, isBestSeller: !prev.isBestSeller }))
                      }
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                        form.isBestSeller ? "bg-amber-500" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                          form.isBestSeller ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                    <span className="text-slate-700 text-sm font-medium flex items-center gap-1.5">
                      <Flame
                        size={14}
                        className={form.isBestSeller ? "text-amber-500 fill-amber-500" : "text-slate-400"}
                      />
                      {form.isBestSeller ? "Çok Satanlar'da Göster" : "Normal Ürün"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 pb-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary flex-1 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="button"
                  onClick={onSave}
                  disabled={saving || uploadProgress !== null}
                  className="btn-primary flex-1 shadow-gold cursor-pointer flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <span className="animate-spin w-4 h-4 border-2 border-slate-700 border-t-black rounded-full" />
                  ) : (
                    <>
                      <Check size={15} />
                      {editTarget ? "Güncelle" : "Kaydet"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
