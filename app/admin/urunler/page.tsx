"use client";

export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, Check, Upload,
  AlertTriangle, Search, Package, ImageIcon, Copy, Flame,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getProducts, getCategories as fetchCategories,
  addProduct, updateProduct, deleteProduct, cloneProduct,
  uploadImage, compressImage, deleteStoredImage,
} from "@/lib/firestore-collections";
import type { Product, Category } from "@/lib/types";


export default function AdminUrunler() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
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
      const { url, path } = await uploadImage(file, "products", setUploadProgress);
      setForm((prev) => ({ ...prev, imageUrl: url, imageStoragePath: path }));
      toast.success("Ürün görseli yüklendi!");
    } catch (err: any) {
      console.error("Resim yükleme hatası:", err);
      toast.error(err?.message || "Görsel yüklenemedi. Lütfen bir resim URL'si girin.");
    } finally {
      setUploadProgress(null);
    }
  }

  async function handleRemoveImage() {
    if (form.imageStoragePath || form.imageUrl) {
      await deleteStoredImage(form.imageStoragePath || form.imageUrl);
    }
    setForm((prev) => ({
      ...prev,
      imageUrl: "",
      imageStoragePath: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Ürün görseli kaldırıldı.");
  }

  const emptyForm = {
    name: "",
    code: "",
    codeGroup: "",
    categoryId: "",
    price: 0,
    vatRate: 20,
    order: 1,
    description: "",
    imageUrl: "",
    imageStoragePath: "",
    isActive: true,
    isBestSeller: false,
  };
  const [form, setForm] = useState(emptyForm);

  /* Load data from Firestore — single source of truth */
  useEffect(() => {
    async function load() {
      try {
        const [firestoreProducts, firestoreCategories] = await Promise.all([
          getProducts(),
          fetchCategories(),
        ]);
        setProducts(firestoreProducts);
        setCategories(firestoreCategories);
      } catch (err) {
        console.error("Firestore veri yükleme hatası:", err);
        toast.error("Veriler yüklenirken hata oluştu. Lütfen sayfayı yenileyin.");
      }
    }
    load();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditTarget(null);
    setForm({
      ...emptyForm,
      categoryId: categories[0]?.id ?? "",
      order: products.length + 1,
    });
    setModalOpen(true);
  }

  function openEdit(p: Product) {
    setEditTarget(p);
    setForm({
      name: p.name,
      code: p.code,
      codeGroup: p.codeGroup || "",
      categoryId: p.categoryId,
      price: p.price || 0,
      vatRate: p.vatRate || 20,
      order: p.order || 0,
      description: p.description,
      imageUrl: p.imageUrl,
      imageStoragePath: p.imageStoragePath ?? "",
      isActive: p.isActive,
      isBestSeller: !!p.isBestSeller,
    });
    setModalOpen(true);
  }

  async function handleToggleBestSeller(p: Product) {
    const newVal = !p.isBestSeller;
    try {
      await updateProduct(p.id, { isBestSeller: newVal });
      setProducts((prev) =>
        prev.map((item) => (item.id === p.id ? { ...item, isBestSeller: newVal } : item))
      );
      toast.success(newVal ? `"${p.name}" Çok Satanlara eklendi.` : `"${p.name}" Çok Satanlardan çıkarıldı.`);
    } catch (err) {
      console.error(err);
      toast.error("İşlem başarısız oldu.");
    }
  }

  async function handleClone(p: Product) {
    try {
      const newId = await cloneProduct(p);
      const cloned: Product = { ...p, id: newId, name: `${p.name} (Kopya)`, code: `${p.code}-COPY` };
      setProducts((prev) => [...prev, cloned]);
      toast.success(`"${p.name}" klonlandı.`);
    } catch (err) {
      console.error(err);
      toast.error("Klonlama başarısız. Firestore bağlantısını kontrol edin.");
    }
  }

  async function handleSave() {
    if (!form.name.trim() || !form.code.trim()) {
      toast.error("Ürün adı ve kodu gereklidir.");
      return;
    }
    setSaving(true);
    try {
      const cat = categories.find((c) => c.id === form.categoryId || c.slug === form.categoryId);

      // Base64 görsel optimizasyonu (Firestore 1MB doküman güvenliği)
      let safeImageUrl = form.imageUrl;
      if (safeImageUrl?.startsWith("data:") && safeImageUrl.length > 600000) {
        try {
          const res = await fetch(safeImageUrl);
          const blob = await res.blob();
          const rawF = new File([blob], "image.webp", { type: "image/webp" });
          const compressed = await compressImage(rawF, 1000, 0.78);
          safeImageUrl = await new Promise<string>((resolve) => {
            const r = new FileReader();
            r.onload = () => resolve(r.result as string);
            r.readAsDataURL(compressed);
          });
        } catch {
          console.warn("Base64 görsel optimizasyonu atlandı");
        }
      }

      const payload: any = {
        name: form.name,
        code: form.code,
        codeGroup: form.codeGroup,
        categoryId: cat?.id || form.categoryId,
        categoryName: cat?.name ?? "",
        categorySlug: cat?.slug ?? "",
        price: form.price,
        vatRate: form.vatRate,
        order: form.order,
        description: form.description,
        imageUrl: safeImageUrl?.trim() || "",
        imageStoragePath: form.imageStoragePath || "",
        isActive: form.isActive,
        isBestSeller: form.isBestSeller,
        tags: [],
      };

      if (editTarget) {
        await updateProduct(editTarget.id, payload);
        const prodObj = { id: editTarget.id, ...payload, tags: editTarget.tags || [] } as Product;
        setProducts((prev) => prev.map((p) => (p.id === editTarget.id ? prodObj : p)));
        toast.success("Ürün güncellendi.");
      } else {
        const id = await addProduct(payload);
        const prodObj = { id, ...payload } as Product;
        setProducts((prev) => [...prev, prodObj]);
        toast.success("Yeni ürün eklendi.");
      }
      setModalOpen(false);
    } catch (err: any) {
      console.error("Firestore kaydetme hatası:", err);
      const msg = err?.message || err?.code || "Bilinmeyen hata";
      toast.error(`Kaydedilemedi: ${msg}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(targetId: string) {
    const prod = products.find((p) => p.id === targetId);
    if (!prod) {
      setDeleteTarget(null);
      return;
    }
    setDeleting(true);
    try {
      await deleteProduct(prod);
      setProducts((prev) => prev.filter((x) => x.id !== targetId));
      toast.success("Ürün başarıyla silindi.");
    } catch (err: any) {
      console.error("Firestore ürün silme hatası:", err);
      toast.error(`Ürün silinemedi: ${err?.message || "Firestore bağlantısını kontrol edin."}`);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="p-8 text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="section-label">Admin</p>
          <h1 className="font-heading font-bold text-white text-3xl">Ürünler</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ürün ara..."
              className="input pl-9 w-52 py-2.5 text-sm"
            />
          </div>
          <button onClick={openAdd} className="btn-primary shadow-gold">
            <Plus size={16} />
            Yeni Ürün
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1B1D23] border border-[#282C36] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#121316] border-b border-[#282C36]">
              <tr>
                <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider w-16">Görsel</th>
                <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Ürün Adı</th>
                <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Kod</th>
                <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Kategori</th>
                <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Fiyat</th>
                <th className="text-center py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Çok Satan</th>
                <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Sıra</th>
                <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Durum</th>
                <th className="text-right py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#282C36]">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[#16181D] transition-colors">
                  <td className="py-3 px-5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#16181D] border border-[#282C36] relative shrink-0">
                      {p.imageUrl ? (
                        <Image src={p.imageUrl} alt={p.name} fill sizes="48px" quality={85} className="object-contain p-1" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon size={16} className="text-slate-500" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <p className="font-semibold text-white text-sm">{p.name}</p>
                    {p.codeGroup && (
                      <p className="text-slate-400 text-xs mt-0.5">Grup: {p.codeGroup}</p>
                    )}
                  </td>
                  <td className="py-3 px-5">
                    <code className="text-xs bg-[#121316] text-gold border border-[#282C36] px-2 py-0.5 rounded font-mono">{p.code}</code>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-slate-300 text-sm">
                      {categories.find((c) => c.id === p.categoryId)?.name ?? p.categoryName ?? p.categoryId}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-slate-200 text-sm font-medium">
                      {p.price > 0 ? `₺${p.price.toFixed(2)}` : "—"}
                    </span>
                    {p.price > 0 && (
                      <span className="text-slate-400 text-xs ml-1">+%{p.vatRate}</span>
                    )}
                  </td>
                  <td className="py-3 px-5 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleBestSeller(p)}
                      title={p.isBestSeller ? "Çok Satanlardan Çıkar" : "Çok Satanlara Ekle"}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                        p.isBestSeller
                          ? "bg-amber-500 text-white shadow-sm hover:bg-amber-600"
                          : "bg-[#282C36] text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 border border-[#383E4C]"
                      }`}
                    >
                      <Flame size={12} className={p.isBestSeller ? "fill-white" : ""} />
                      <span>{p.isBestSeller ? "Evet" : "Hayır"}</span>
                    </button>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-slate-300 text-sm">{p.order}</span>
                  </td>
                  <td className="py-3 px-5">
                    <span className={`badge ${p.isActive ? "badge-green" : "badge-red"}`}>
                      {p.isActive ? "Aktif" : "Pasif"}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleClone(p)}
                        title="Klonla"
                        className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                      >
                        <Copy size={15} />
                      </button>
                      <button
                        onClick={() => openEdit(p)}
                        className="p-2 rounded-lg text-slate-400 hover:text-gold hover:bg-gold/10 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(p.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Package size={32} className="text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Ürün bulunamadı.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#0D0E11]/80 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="bg-[#1B1D23] border border-[#282C36] rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto text-slate-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#282C36] bg-[#121316]">
                  <h2 className="font-heading font-bold text-white text-lg">
                    {editTarget ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
                  </h2>
                  <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#16181D]">
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  {/* Image upload */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-slate-300 text-xs font-semibold">
                        Ürün Görseli
                      </label>
                      {form.imageUrl && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="text-red-400 hover:text-red-300 text-xs font-medium flex items-center gap-1 hover:underline transition-colors cursor-pointer"
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
                      onClick={() => !form.imageUrl && fileInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2.5 transition-all duration-200 ${
                        isDragging
                          ? "border-gold bg-gold/15 scale-[1.02]"
                          : form.imageUrl
                          ? "border-[#282C36] bg-[#16181D]"
                          : "border-[#282C36] bg-[#16181D] hover:border-gold hover:bg-gold/5 cursor-pointer"
                      }`}
                    >
                      {isDragging ? (
                        <div className="text-center py-4">
                          <Upload size={32} className="text-gold animate-bounce mx-auto mb-1.5" />
                          <p className="font-heading font-semibold text-gold text-xs">
                            Resmi Buraya Bırakın
                          </p>
                        </div>
                      ) : form.imageUrl ? (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden group bg-[#121316]">
                          <Image
                            src={form.imageUrl}
                            alt="preview"
                            fill
                            sizes="(max-width: 768px) 100vw, 500px"
                            quality={90}
                            className="object-contain p-2"
                          />
                          {/* Hover action overlay */}
                          <div className="absolute inset-0 bg-[#0D0E11]/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                              }}
                              className="text-white text-xs font-semibold bg-[#1B1D23] hover:bg-[#282C36] border border-[#282C36] px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-md"
                            >
                              <Upload size={13} /> Değiştir
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage();
                              }}
                              className="text-red-300 text-xs font-semibold bg-red-950/80 hover:bg-red-900 border border-red-700/50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-md"
                            >
                              <Trash2 size={13} /> Görseli Sil
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-2">
                          <ImageIcon size={28} className="text-slate-400 mx-auto mb-2" />
                          <p className="text-slate-200 text-xs font-semibold">
                            Resmi buraya sürükleyip bırakın
                          </p>
                          <p className="text-slate-400 text-2xs mt-1">
                            veya seçmek için tıklayın (PNG, JPG, WEBP)
                          </p>
                        </div>
                      )}

                      {uploadProgress !== null && (
                        <div className="w-full mt-2">
                          <div className="h-1.5 bg-[#282C36] rounded-full overflow-hidden">
                            <div className="h-full bg-gold transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                          </div>
                          <p className="text-xs text-slate-400 mt-1 text-center">Yükleniyor... %{uploadProgress}</p>
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
                      <p className="text-slate-400 text-xs">veya Görsel URL giriniz:</p>
                      {form.imageUrl && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="text-red-400 hover:text-red-300 text-2xs flex items-center gap-1 hover:underline"
                        >
                          <Trash2 size={10} /> Görseli Temizle
                        </button>
                      )}
                    </div>
                    <input
                      value={form.imageUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        setForm({
                          ...form,
                          imageUrl: val,
                          imageStoragePath: val ? form.imageStoragePath : "",
                        });
                      }}
                      placeholder="https://..."
                      className="input mt-1 text-sm"
                    />
                  </div>

                  {/* Name & Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-xs font-semibold mb-1.5">Ürün Adı *</label>
                      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ürün adı" className="input" />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-xs font-semibold mb-1.5">Ürün Kodu *</label>
                      <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="PUR-2045-001" className="input font-mono text-sm" />
                    </div>
                  </div>

                  {/* Code Group & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-xs font-semibold mb-1.5">Kod Grubu</label>
                      <input value={form.codeGroup} onChange={(e) => setForm({ ...form, codeGroup: e.target.value })} placeholder="PUR-2045" className="input font-mono text-sm" />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-xs font-semibold mb-1.5">Kategori</label>
                      <select
                        value={form.categoryId}
                        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                        className="input"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id} className="bg-[#1B1D23] text-white">{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Price, VAT, Order */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-300 text-xs font-semibold mb-1.5">Fiyat (₺)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-xs font-semibold mb-1.5">KDV (%)</label>
                      <select
                        value={form.vatRate}
                        onChange={(e) => setForm({ ...form, vatRate: Number(e.target.value) })}
                        className="input"
                      >
                        <option value={1} className="bg-[#1B1D23] text-white">%1</option>
                        <option value={10} className="bg-[#1B1D23] text-white">%10</option>
                        <option value={20} className="bg-[#1B1D23] text-white">%20</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 text-xs font-semibold mb-1.5">Sıra</label>
                      <input
                        type="number"
                        value={form.order}
                        onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                        className="input"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-slate-300 text-xs font-semibold mb-1.5">Açıklama</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={3}
                      placeholder="Ürün açıklaması..."
                      className="input resize-none"
                    />
                  </div>

                  {/* Status & Best Seller toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, isActive: !form.isActive })}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${form.isActive ? "bg-gold" : "bg-[#282C36]"}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${form.isActive ? "translate-x-5" : "translate-x-0.5"}`} />
                      </button>
                      <span className="text-slate-300 text-sm font-medium">
                        {form.isActive ? "Aktif Ürün" : "Pasif Ürün"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, isBestSeller: !form.isBestSeller })}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${form.isBestSeller ? "bg-amber-500" : "bg-[#282C36]"}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${form.isBestSeller ? "translate-x-5" : "translate-x-0.5"}`} />
                      </button>
                      <span className="text-slate-300 text-sm font-medium flex items-center gap-1.5">
                        <Flame size={14} className={form.isBestSeller ? "text-amber-500 fill-amber-500" : "text-slate-500"} />
                        {form.isBestSeller ? "Çok Satanlar'da Göster" : "Normal Ürün"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 px-6 pb-6">
                  <button onClick={() => setModalOpen(false)} className="btn-secondary flex-1">İptal</button>
                  <button onClick={handleSave} disabled={saving || uploadProgress !== null} className="btn-primary flex-1 shadow-gold">
                    {saving ? (
                      <span className="animate-spin w-4 h-4 border-2 border-slate-700 border-t-black rounded-full" />
                    ) : (
                      <><Check size={15} />{editTarget ? "Güncelle" : "Kaydet"}</>
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
              className="fixed inset-0 bg-[#0D0E11]/80 backdrop-blur-sm"
              onClick={() => !deleting && setDeleteTarget(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 bg-[#1B1D23] border border-[#282C36] rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center text-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={28} className="text-red-400" />
              </div>
              <h3 className="font-heading font-bold text-white text-lg mb-2">Ürünü sil</h3>
              <p className="text-slate-400 text-sm mb-6">Bu ürün kalıcı olarak silinecek. Bu işlem geri alınamaz.</p>
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
                  onClick={() => deleteTarget && handleDelete(deleteTarget)}
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
