"use client";

export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, Check, Upload,
  GripVertical, ImageIcon, Tag, AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getCategories, addCategory, updateCategory, deleteCategory,
  uploadImage, compressImage, slugify,
} from "@/lib/firestore-collections";
import type { Category } from "@/lib/types";

export default function AdminKategoriler() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Lütfen geçerli bir resim dosyası seçin (PNG, JPG, WEBP).");
      return;
    }
    try {
      const { url, path } = await uploadImage(file, "categories", setUploadProgress);
      setFormData((prev) => ({ ...prev, imageUrl: url, imageStoragePath: path }));
      toast.success("Kategori görseli yüklendi!");
    } catch (err: any) {
      console.error("Resim yükleme hatası:", err);
      toast.error(err?.message || "Görsel yüklenemedi. Lütfen bir resim URL'si girin.");
    } finally {
      setUploadProgress(null);
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    imageUrl: "",
    imageStoragePath: "",
    order: 1,
    isActive: true,
    description: "",
  });

  /* Load data from Firestore — single source of truth */
  useEffect(() => {
    async function load() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Firestore kategori yükleme hatası:", err);
        toast.error("Kategoriler yüklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function openAdd() {
    setEditTarget(null);
    setFormData({
      name: "",
      slug: "",
      imageUrl: "",
      imageStoragePath: "",
      order: categories.length + 1,
      isActive: true,
      description: "",
    });
    setModalOpen(true);
  }

  function openEdit(cat: Category) {
    setEditTarget(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      imageUrl: cat.imageUrl || "",
      imageStoragePath: cat.imageStoragePath ?? "",
      order: cat.order,
      isActive: cat.isActive,
      description: cat.description ?? "",
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!formData.name.trim()) {
      toast.error("Kategori adı gereklidir.");
      return;
    }
    setSaving(true);
    try {
      const slug = formData.slug || slugify(formData.name);
      
      // Base64 görsel kontrolü
      let safeImageUrl = formData.imageUrl;
      if (safeImageUrl?.startsWith("data:") && safeImageUrl.length > 200000) {
        toast.error("Resim boyutu çok yüksek! Lütfen daha küçük bir resim seçin veya URL girin.");
        setSaving(false);
        return;
      }

      const payload: Record<string, any> = {
        name: formData.name,
        slug,
        imageUrl: safeImageUrl || "",
        order: formData.order,
        isActive: formData.isActive,
        description: formData.description || "",
      };

      if (formData.imageStoragePath) {
        payload.imageStoragePath = formData.imageStoragePath;
      }

      if (editTarget) {
        await updateCategory(editTarget.id, payload as Partial<Category>);
        const catObj = { id: editTarget.id, ...payload } as Category;
        setCategories((prev) => prev.map((c) => (c.id === editTarget.id ? catObj : c)));
        toast.success("Kategori güncellendi.");
      } else {
        const id = await addCategory(payload as Omit<Category, "id">);
        const catObj = { id, ...payload } as Category;
        setCategories((prev) => [...prev, catObj]);
        toast.success("Yeni kategori eklendi.");
      }
      setModalOpen(false);
    } catch (err: any) {
      console.error("Firestore kategori kaydetme hatası:", err);
      const msg = err?.message || err?.code || "Bilinmeyen hata";
      toast.error(`Kaydedilemedi: ${msg}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;
    try {
      await deleteCategory(cat);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success("Kategori silindi.");
      setDeleteTarget(null);
    } catch (err) {
      console.error("Firestore kategori silme hatası:", err);
      toast.error("Kategori silinemedi. Firestore bağlantısını kontrol edin.");
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="section-label">Admin</p>
          <h1 className="font-heading font-bold text-charcoal-800 text-3xl">Kategoriler</h1>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus size={16} />
          Yeni Kategori
        </button>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream border-b border-border">
              <tr>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider w-8" />
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider w-16">
                  Görsel
                </th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">
                  Kategori
                </th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">
                  Slug
                </th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">
                  Sıra
                </th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">
                  Durum
                </th>
                <th className="text-right py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : (
                categories
                  .sort((a, b) => a.order - b.order)
                  .map((cat) => (
                    <tr key={cat.id} className="hover:bg-cream-100 transition-colors">
                      <td className="py-3.5 px-5 text-charcoal-300">
                        <GripVertical size={16} />
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-cream-200 relative shrink-0">
                          {cat.imageUrl ? (
                            <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <ImageIcon size={16} className="text-charcoal-300" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <p className="font-semibold text-charcoal-800 text-sm">{cat.name}</p>
                        {cat.description && (
                          <p className="text-charcoal-400 text-xs mt-0.5 line-clamp-1">{cat.description}</p>
                        )}
                      </td>
                      <td className="py-3.5 px-5">
                        <code className="text-xs bg-cream-200 text-charcoal-600 px-2 py-0.5 rounded">
                          {cat.slug}
                        </code>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="text-charcoal-500 text-sm">{cat.order}</span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`badge ${cat.isActive ? "badge-green" : "badge-red"}`}>
                          {cat.isActive ? "Aktif" : "Pasif"}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(cat)}
                            className="p-2 rounded-lg text-charcoal-400 hover:text-gold hover:bg-gold-50 transition-colors"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(cat.id)}
                            className="p-2 rounded-lg text-charcoal-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-soft-lg w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Tag size={18} className="text-gold" />
                    <h2 className="font-heading font-bold text-charcoal-800 text-lg">
                      {editTarget ? "Kategoriyi Düzenle" : "Yeni Kategori"}
                    </h2>
                  </div>
                  <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-cream">
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {/* Image Upload with Drag & Drop */}
                  <div>
                    <label className="block text-charcoal-700 text-xs font-semibold mb-2">
                      Kategori Görseli (Sürükle & Bırak veya Tıkla)
                    </label>
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
                          await handleFileSelect(file);
                        }
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all duration-200 ${
                        isDragging
                          ? "border-gold bg-gold/10 scale-[1.02]"
                          : formData.imageUrl
                          ? "border-border bg-cream-50 hover:border-gold"
                          : "border-border bg-cream hover:border-gold hover:bg-gold/5"
                      }`}
                    >
                      {isDragging ? (
                        <div className="text-center py-4">
                          <Upload size={32} className="text-gold animate-bounce mx-auto mb-1.5" />
                          <p className="font-heading font-semibold text-gold text-xs">
                            Resmi Buraya Bırakın
                          </p>
                        </div>
                      ) : formData.imageUrl ? (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden group">
                          <Image src={formData.imageUrl} alt="preview" fill className="object-cover" />
                          <div className="absolute inset-0 bg-charcoal-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-semibold bg-charcoal-900/70 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                              <Upload size={14} /> Değiştir (Sürükle veya Tıkla)
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-2">
                          <Upload size={28} className="text-charcoal-400 mx-auto mb-2" />
                          <p className="text-charcoal-700 text-xs font-semibold">
                            Resmi buraya sürükleyip bırakın
                          </p>
                          <p className="text-charcoal-400 text-2xs mt-1">
                            veya seçmek için tıklayın (PNG, JPG, WEBP)
                          </p>
                        </div>
                      )}

                      {uploadProgress !== null && (
                        <div className="w-full mt-2">
                          <div className="h-1.5 bg-cream-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gold transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                          </div>
                          <p className="text-xs text-charcoal-400 mt-1 text-center">Yükleniyor... %{uploadProgress}</p>
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
                          await handleFileSelect(file);
                        }
                      }}
                    />

                    <p className="text-charcoal-400 text-xs mt-2">veya Görsel URL giriniz:</p>
                    <input
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://..."
                      className="input mt-1 text-sm"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Kategori Adı *</label>
                    <input
                      value={formData.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        name: e.target.value,
                        slug: slugify(e.target.value),
                      })}
                      placeholder="Örn: Dondurma Bazları"
                      className="input"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Slug</label>
                    <input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="dondurma-bazlari"
                      className="input font-mono text-sm"
                    />
                    <p className="text-charcoal-400 text-xs mt-1">URL: /katalog/{formData.slug || "…"}</p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Açıklama</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      placeholder="Kategori açıklaması..."
                      className="input resize-none"
                    />
                  </div>

                  {/* Order */}
                  <div>
                    <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Sıralama</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                      className="input w-24"
                    />
                  </div>

                  {/* Status toggle */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${formData.isActive ? "bg-gold" : "bg-charcoal-300"}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${formData.isActive ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                    <span className="text-charcoal-700 text-sm font-medium">
                      {formData.isActive ? "Aktif (katalogda görünür)" : "Pasif (gizli)"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 px-6 pb-6">
                  <button onClick={() => setModalOpen(false)} className="btn-secondary flex-1">
                    İptal
                  </button>
                  <button onClick={handleSave} disabled={saving || uploadProgress !== null} className="btn-primary flex-1">
                    {saving ? (
                      <span className="animate-spin w-4 h-4 border-2 border-charcoal-400 border-t-charcoal-900 rounded-full" />
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

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteTarget && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm"
              onClick={() => setDeleteTarget(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-soft-lg p-6 max-w-sm w-full text-center" onClick={(e) => e.stopPropagation()}>
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle size={28} className="text-red-500" />
                </div>
                <h3 className="font-heading font-bold text-charcoal-800 text-lg mb-2">
                  Silmek istediğinize emin misiniz?
                </h3>
                <p className="text-charcoal-500 text-sm mb-6">
                  Bu kategori kalıcı olarak silinecektir.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteTarget(null)} className="btn-secondary flex-1">İptal</button>
                  <button onClick={() => handleDelete(deleteTarget)} className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-sm transition-colors">
                    Sil
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
