"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ImageIcon } from "lucide-react";
import type { Category } from "@/lib/types";
import type { PresentationProduct } from "@/lib/presentation-catalog-service";

interface PresentationEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: PresentationProduct | null;
  categories: Category[];
  onSave: (data: Omit<PresentationProduct, "id"> | PresentationProduct) => Promise<void>;
}

export default function PresentationEditModal({
  isOpen,
  onClose,
  product,
  categories,
  onSave,
}: PresentationEditModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    price: 0,
    categoryId: "",
    description: "",
    badge: "",
    isActive: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        categoryId: product.categoryId,
        description: product.description,
        badge: product.badge || "",
        isActive: product.isActive !== false,
      });
    } else {
      setFormData({
        name: "",
        imageUrl: "",
        price: 0,
        categoryId: categories[0]?.id || "suruplar",
        description: "",
        badge: "",
        isActive: true,
      });
    }
  }, [product, categories, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const selectedCategory = categories.find((c) => c.id === formData.categoryId);
      const payload = {
        ...formData,
        categoryName: selectedCategory?.name || "",
      };

      if (product) {
        await onSave({ ...payload, id: product.id });
      } else {
        await onSave(payload);
      }
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 bg-stone-50/70">
              <div>
                <h3 className="font-serif text-lg text-stone-900 font-semibold">
                  {product ? "Sunum Ürününü Düzenle" : "Yeni Sunum Ürünü Ekle"}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Müşteri sunum kataloğundaki içerik ve fiyat bilgilerini güncelleyin.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 text-stone-800">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Ürün İsmi *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Örn: Madagaskar Vanilya Şurubu"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all"
                />
              </div>

              {/* Image URL & Preview */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Görsel URL *
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="/resimler/urunler/165.webp veya https://..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all font-mono text-xs"
                  />
                  {formData.imageUrl && (
                    <div className="relative w-11 h-11 rounded-xl border border-stone-200 bg-stone-50 overflow-hidden shrink-0">
                      <Image
                        src={formData.imageUrl}
                        alt="Preview"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Fiyat (₺) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Kategori *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id || cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Badge */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Öne Çıkan Rozet (İsteğe Bağlı)
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="Örn: İmza Lezzet, Şefin Favorisi, Yeni Sezon"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all"
                />
              </div>

              {/* Description (Tanıtım Metni) */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Müşteriyi Cezbedecek Tanıtım Metni *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ürünün lezzet profilini, aromatik zenginliğini ve müşteride merak uyandıracak profesyonel hikayesini yazın..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    formData.isActive ? "bg-stone-900" : "bg-stone-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      formData.isActive ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <span className="text-xs font-medium text-stone-700">
                  {formData.isActive ? "Sunumda Görünür (Aktif)" : "Gizli (Pasif)"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Check size={14} />
                      <span>{product ? "Değişiklikleri Kaydet" : "Kataloğa Ekle"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
