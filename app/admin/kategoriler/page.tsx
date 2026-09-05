"use client";

export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, Check, Upload,
  GripVertical, ImageIcon, Tag, AlertTriangle, Search,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getCategories, addCategory, updateCategory, deleteCategory,
  uploadImage, compressImage, slugify, deleteStoredImage,
} from "@/lib/firestore-collections";
import type { Category } from "@/lib/types";

export default function AdminKategoriler() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
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

  async function handleRemoveImage() {
    if (formData.imageStoragePath || formData.imageUrl) {
      await deleteStoredImage(formData.imageStoragePath || formData.imageUrl);
    }
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
      imageStoragePath: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Kategori görseli kaldırıldı.");
  }

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    imageUrl: "",
    imageStoragePath: "",
    order: 1,
    isActive: true,
    description: "",
    parentId: "",
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
    const maxOrder = categories.reduce((max, c) => Math.max(max, Number(c.order) || 0), 0);
    setFormData({
      name: "",
      slug: "",
      imageUrl: "",
      imageStoragePath: "",
      order: maxOrder + 1,
      isActive: true,
      description: "",
      parentId: "",
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
      parentId: cat.parentId ?? "",
    });
    setModalOpen(true);
  }

  async function handleSave() {
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      toast.error("Kategori adı gereklidir.");
      return;
    }
    setSaving(true);
    try {
      const slug = (formData.slug.trim() || slugify(trimmedName)).toLowerCase();
      
      // Check slug conflict with another category
      const conflict = categories.find(
        (c) => c.slug === slug && c.id !== editTarget?.id
      );
      if (conflict) {
        toast.error(`"${slug}" slug'ı zaten "${conflict.name}" kategorisinde kullanılıyor. Lütfen farklı bir slug veya isim belirleyin.`);
        setSaving(false);
        return;
      }

      const safeOrder = Number.isFinite(Number(formData.order)) ? Number(formData.order) : (categories.length + 1);

      const payload: Record<string, any> = {
        name: trimmedName,
        slug,
        imageUrl: formData.imageUrl?.trim() || "",
        imageStoragePath: formData.imageStoragePath || "",
        order: safeOrder,
        isActive: Boolean(formData.isActive),
        description: formData.description?.trim() || "",
        ...(formData.parentId ? { parentId: formData.parentId } : { parentId: "" }),
      };

      if (editTarget) {
        await updateCategory(editTarget.id, payload as Partial<Category>);
        toast.success("Kategori güncellendi.");
      } else {
        await addCategory(payload as Omit<Category, "id">);
        toast.success("Yeni kategori başarıyla eklendi.");
      }

      // Re-fetch authoritative fresh data from Firestore
      const freshData = await getCategories();
      setCategories(freshData);

      // Notify other components (Header, Katalog, etc.) immediately
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("categories-updated"));
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
    if (!cat) {
      setDeleteTarget(null);
      return;
    }
    setDeleting(true);
    try {
      await deleteCategory(cat);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      getCategories().then((fresh) => setCategories(fresh)).catch(() => {});
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("categories-updated"));
      }
      toast.success("Kategori başarıyla silindi.");
    } catch (err: any) {
      console.error("Firestore kategori silme hatası:", err);
      toast.error(`Kategori silinemedi: ${err?.message || "Firestore bağlantısını kontrol edin."}`);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="p-8 text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="section-label">Admin</p>
          <h1 className="font-heading font-bold text-slate-900 text-3xl">
            Kategoriler <span className="text-slate-500 text-lg font-normal">({categories.length})</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Kategori ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold"
            />
          </div>
          <button onClick={openAdd} className="btn-primary shadow-gold shrink-0">
            <Plus size={16} />
            Yeni Kategori
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider w-8" />
                <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider w-16">
                  Görsel
                </th>
                <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  Kategori
                </th>
                <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  Slug
                </th>
                <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  Üst Kat.
                </th>
                <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  Sıra
                </th>
                <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  Durum
                </th>
                <th className="text-right py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : (
                [...categories]
                  .filter((cat) =>
                    search
                      ? cat.name.toLowerCase().includes(search.toLowerCase()) ||
                        cat.slug.toLowerCase().includes(search.toLowerCase())
                      : true
                  )
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                  .map((cat) => (
                    <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-5 text-slate-400">
                        <GripVertical size={16} />
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 relative shrink-0">
                          {cat.imageUrl ? (
                            <Image src={cat.imageUrl} alt={cat.name} fill sizes="48px" quality={85} className="object-contain p-1" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <ImageIcon size={16} className="text-slate-400" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <p className="font-semibold text-slate-900 text-sm">{cat.name}</p>
                        {cat.description && (
                          <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">{cat.description}</p>
                        )}
                      </td>
                      <td className="py-3.5 px-5">
                        <code className="text-xs bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-mono">
                          {cat.slug}
                        </code>
                      </td>
                      <td className="py-3.5 px-5">
                        {cat.parentId ? (
                          <span className="text-xs text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                            {categories.find((c) => c.id === cat.parentId)?.name ?? cat.parentId}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="text-slate-700 text-sm">{cat.order}</span>
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
                            className="p-2 rounded-lg text-slate-400 hover:text-gold hover:bg-gold/10 transition-colors"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(cat.id)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
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
              className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto text-slate-800" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <Tag size={18} className="text-gold-600" />
                    <h2 className="font-heading font-bold text-slate-900 text-lg">
                      {editTarget ? "Kategoriyi Düzenle" : "Yeni Kategori"}
                    </h2>
                  </div>
                  <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {/* Image Upload */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-slate-700 text-xs font-semibold">
                        Kategori Görseli
                      </label>
                      {formData.imageUrl && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
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
                          await handleFileSelect(file);
                        }
                      }}
                      onClick={() => !formData.imageUrl && fileInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2.5 transition-all duration-200 ${
                        isDragging
                          ? "border-gold bg-gold/15 scale-[1.02]"
                          : formData.imageUrl
                          ? "border-slate-200 bg-slate-50"
                          : "border-slate-300 bg-slate-50 hover:border-gold hover:bg-gold/5 cursor-pointer"
                      }`}
                    >
                      {isDragging ? (
                        <div className="text-center py-4">
                          <Upload size={32} className="text-gold-600 animate-bounce mx-auto mb-1.5" />
                          <p className="font-heading font-semibold text-gold-600 text-xs">
                            Resmi Buraya Bırakın
                          </p>
                        </div>
                      ) : formData.imageUrl ? (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden group bg-slate-100">
                          <Image
                            src={formData.imageUrl}
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
                              className="text-white text-xs font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-md"
                            >
                              <Upload size={13} /> Değiştir
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage();
                              }}
                              className="text-white text-xs font-semibold bg-red-600/80 hover:bg-red-600 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-md"
                            >
                              <Trash2 size={13} /> Görseli Sil
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-2">
                          <Upload size={28} className="text-slate-400 mx-auto mb-2" />
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
                            <div className="h-full bg-gold transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                          </div>
                          <p className="text-xs text-slate-500 mt-1 text-center">Yükleniyor... %{uploadProgress}</p>
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

                    <div className="flex items-center justify-between gap-2 mt-2">
                      <p className="text-slate-500 text-xs">veya Görsel URL giriniz:</p>
                      {formData.imageUrl && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="text-red-500 hover:text-red-600 text-2xs flex items-center gap-1 hover:underline"
                        >
                          <Trash2 size={10} /> Görseli Temizle
                        </button>
                      )}
                    </div>
                    <input
                      value={formData.imageUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData({
                          ...formData,
                          imageUrl: val,
                          imageStoragePath: val ? formData.imageStoragePath : "",
                        });
                      }}
                      placeholder="https://..."
                      className="input mt-1 text-sm"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">Kategori Adı *</label>
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
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">Slug</label>
                    <input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="dondurma-bazlari"
                      className="input font-mono text-sm"
                    />
                    <p className="text-slate-500 text-xs mt-1">URL: /katalog/{formData.slug || "…"}</p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">Açıklama</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      placeholder="Kategori açıklaması..."
                      className="input resize-none"
                    />
                  </div>

                  {/* Parent Category */}
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">Üst Kategori (Ana Kategori)</label>
                    <select
                      value={formData.parentId}
                      onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                      className="input text-sm"
                    >
                      <option value="">— Ana Kategori (üst kategori yok)</option>
                      {categories
                        .filter((c) => !c.parentId && c.id !== editTarget?.id)
                        .sort((a, b) => a.order - b.order)
                        .map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                    <p className="text-slate-500 text-xs mt-1">
                      Alt kategori yapmak için bir üst kategori seçin.
                    </p>
                  </div>

                  {/* Order */}
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">Sıralama</label>
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
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${formData.isActive ? "bg-gold" : "bg-slate-200"}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${formData.isActive ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                    <span className="text-slate-700 text-sm font-medium">
                      {formData.isActive ? "Aktif (katalogda görünür)" : "Pasif (gizli)"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 px-6 pb-6">
                  <button onClick={() => setModalOpen(false)} className="btn-secondary flex-1">
                    İptal
                  </button>
                  <button onClick={handleSave} disabled={saving || uploadProgress !== null} className="btn-primary flex-1 shadow-gold">
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

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => !deleting && setDeleteTarget(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center text-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={28} className="text-red-500" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-lg mb-2">
                Silmek istediğinize emin misiniz?
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Bu kategori kalıcı olarak silinecektir.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => setDeleteTarget(null)}
                  className="btn-secondary flex-1"
                >
                  İptal
                </button>
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => handleDelete(deleteTarget)}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Siliniyor...</span>
                    </>
                  ) : (
                    "Sil"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
