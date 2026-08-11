"use client";

export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, Check, Upload,
  AlertTriangle, Search, Package, ImageIcon, Copy,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getProducts, getCategories as fetchCategories,
  addProduct, updateProduct, deleteProduct, cloneProduct,
  uploadImage,
} from "@/lib/firestore-collections";
import { PRODUCTS, CATEGORIES as MOCK_CATEGORIES, registerProduct } from "@/lib/mock-data";
import type { Product, Category } from "@/lib/types";

export default function AdminUrunler() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
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
      const { url, path } = await uploadImage(file, "products", setUploadProgress);
      setForm((prev) => ({ ...prev, imageUrl: url, imageStoragePath: path }));
      toast.success("Ürün görseli yüklendi!");
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setForm((prev) => ({ ...prev, imageUrl: reader.result as string }));
          toast.success("Görsel yüklendi!");
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadProgress(null);
    }
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
  };
  const [form, setForm] = useState(emptyForm);

  /* Load data from Firestore, fallback to mock */
  useEffect(() => {
    async function load() {
      try {
        const [firestoreProducts, firestoreCategories] = await Promise.all([
          getProducts(),
          fetchCategories(),
        ]);
        if (firestoreProducts.length > 0) {
          setProducts(firestoreProducts);
        } else {
          // Fallback: map mock products to new Product shape
          setProducts(
            PRODUCTS.map((p, i) => ({
              ...p,
              codeGroup: "",
              price: 0,
              vatRate: 20,
              order: i + 1,
            }))
          );
        }
        if (firestoreCategories.length > 0) {
          setCategories(firestoreCategories);
        } else {
          setCategories(
            MOCK_CATEGORIES.map((c, i) => ({
              ...c,
              imageUrl: "",
              order: i + 1,
              isActive: true,
            }))
          );
        }
      } catch {
        // Fallback to mock
        setProducts(
          PRODUCTS.map((p, i) => ({
            ...p,
            codeGroup: "",
            price: 0,
            vatRate: 20,
            order: i + 1,
          }))
        );
        setCategories(
          MOCK_CATEGORIES.map((c, i) => ({
            ...c,
            imageUrl: "",
            order: i + 1,
            isActive: true,
          }))
        );
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
    });
    setModalOpen(true);
  }

  async function handleClone(p: Product) {
    try {
      const newId = await cloneProduct(p);
      const cloned: Product = {
        ...p,
        id: newId,
        name: `${p.name} (Kopya)`,
        code: `${p.code}-COPY`,
      };
      setProducts((prev) => [...prev, cloned]);
      toast.success(`"${p.name}" klonlandı.`);
    } catch (err) {
      console.error(err);
      toast.error("Klonlama başarısız.");
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
        imageUrl: form.imageUrl,
        isActive: form.isActive,
      };
      
      if (form.imageStoragePath) {
        payload.imageStoragePath = form.imageStoragePath;
      }

      if (editTarget) {
        try {
          await updateProduct(editTarget.id, payload);
        } catch { /* fallback */ }
        const prodObj = { id: editTarget.id, ...payload };
        setProducts((prev) =>
          prev.map((p) => (p.id === editTarget.id ? prodObj : p))
        );
        registerProduct(prodObj);
        toast.success("Ürün güncellendi.");
      } else {
        let id = `prod-${Date.now()}`;
        try {
          id = await addProduct(payload);
        } catch { /* fallback */ }
        const prodObj = { id, ...payload };
        setProducts((prev) => [...prev, prodObj]);
        registerProduct(prodObj);
        toast.success("Yeni ürün eklendi.");
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Kaydedilemedi. Lütfen tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(p: Product) {
    try {
      await deleteProduct(p);
      setProducts((prev) => prev.filter((x) => x.id !== p.id));
      toast.success("Ürün silindi.");
    } catch (err) {
      console.error(err);
      toast.error("Silinemedi.");
    } finally {
      setDeleteTarget(null);
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="section-label">Admin</p>
          <h1 className="font-heading font-bold text-charcoal-800 text-3xl">Ürünler</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ürün ara..."
              className="input pl-9 w-52 py-2.5 text-sm"
            />
          </div>
          <button onClick={openAdd} className="btn-primary">
            <Plus size={16} />
            Yeni Ürün
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream border-b border-border">
              <tr>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider w-16">Görsel</th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">Ürün Adı</th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">Kod</th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">Kategori</th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">Fiyat</th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">Sıra</th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">Durum</th>
                <th className="text-right py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-cream-100 transition-colors">
                  <td className="py-3 px-5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-cream-200 relative shrink-0">
                      {p.imageUrl ? (
                        <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon size={16} className="text-charcoal-300" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <p className="font-semibold text-charcoal-800 text-sm">{p.name}</p>
                    {p.codeGroup && (
                      <p className="text-charcoal-400 text-xs mt-0.5">Grup: {p.codeGroup}</p>
                    )}
                  </td>
                  <td className="py-3 px-5">
                    <code className="text-xs bg-cream-200 text-charcoal-600 px-2 py-0.5 rounded">{p.code}</code>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-charcoal-500 text-sm">
                      {categories.find((c) => c.id === p.categoryId)?.name ?? p.categoryName ?? p.categoryId}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-charcoal-700 text-sm font-medium">
                      {p.price > 0 ? `₺${p.price.toFixed(2)}` : "—"}
                    </span>
                    {p.price > 0 && (
                      <span className="text-charcoal-400 text-xs ml-1">+%{p.vatRate}</span>
                    )}
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-charcoal-500 text-sm">{p.order}</span>
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
                        className="p-2 rounded-lg text-charcoal-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Copy size={15} />
                      </button>
                      <button
                        onClick={() => openEdit(p)}
                        className="p-2 rounded-lg text-charcoal-400 hover:text-gold hover:bg-gold-50 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(p.id)}
                        className="p-2 rounded-lg text-charcoal-400 hover:text-red-500 hover:bg-red-50 transition-colors"
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
              <Package size={32} className="text-charcoal-300 mx-auto mb-3" />
              <p className="text-charcoal-500 text-sm">Ürün bulunamadı.</p>
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
              className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="bg-white rounded-2xl shadow-soft-lg w-full max-w-xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                  <h2 className="font-heading font-bold text-charcoal-800 text-lg">
                    {editTarget ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
                  </h2>
                  <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-cream">
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  {/* Image upload with Drag & Drop */}
                  <div>
                    <label className="block text-charcoal-700 text-xs font-semibold mb-2">Ürün Görseli (Sürükle & Bırak veya Tıkla)</label>
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
                          : form.imageUrl
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
                      ) : form.imageUrl ? (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden group">
                          <Image src={form.imageUrl} alt="preview" fill className="object-cover" />
                          <div className="absolute inset-0 bg-charcoal-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-semibold bg-charcoal-900/70 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                              <Upload size={14} /> Değiştir (Sürükle veya Tıkla)
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-2">
                          <ImageIcon size={28} className="text-charcoal-400 mx-auto mb-2" />
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
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      placeholder="https://..."
                      className="input mt-1 text-sm"
                    />
                  </div>

                  {/* Name & Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Ürün Adı *</label>
                      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ürün adı" className="input" />
                    </div>
                    <div>
                      <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Ürün Kodu *</label>
                      <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="PUR-2045-001" className="input font-mono text-sm" />
                    </div>
                  </div>

                  {/* Code Group & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Kod Grubu</label>
                      <input value={form.codeGroup} onChange={(e) => setForm({ ...form, codeGroup: e.target.value })} placeholder="PUR-2045" className="input font-mono text-sm" />
                    </div>
                    <div>
                      <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Kategori</label>
                      <select
                        value={form.categoryId}
                        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                        className="input"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Price, VAT, Order */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Fiyat (₺)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">KDV (%)</label>
                      <select
                        value={form.vatRate}
                        onChange={(e) => setForm({ ...form, vatRate: Number(e.target.value) })}
                        className="input"
                      >
                        <option value={1}>%1</option>
                        <option value={10}>%10</option>
                        <option value={20}>%20</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Sıra</label>
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
                    <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Açıklama</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={3}
                      placeholder="Ürün açıklaması..."
                      className="input resize-none"
                    />
                  </div>

                  {/* Status toggle */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, isActive: !form.isActive })}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${form.isActive ? "bg-gold" : "bg-charcoal-300"}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${form.isActive ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                    <span className="text-charcoal-700 text-sm font-medium">
                      {form.isActive ? "Aktif (katalogda görünür)" : "Pasif (katalogda gizli)"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 px-6 pb-6">
                  <button onClick={() => setModalOpen(false)} className="btn-secondary flex-1">İptal</button>
                  <button onClick={handleSave} disabled={saving || uploadProgress !== null} className="btn-primary flex-1">
                    {saving ? (
                      <span className="animate-spin w-4 h-4 border-2 border-charcoal-400 border-t-charcoal-900 rounded-full" />
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
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-soft-lg p-6 max-w-sm w-full text-center" onClick={(e) => e.stopPropagation()}>
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle size={28} className="text-red-500" />
                </div>
                <h3 className="font-heading font-bold text-charcoal-800 text-lg mb-2">Ürünü sil</h3>
                <p className="text-charcoal-500 text-sm mb-6">Bu ürün kalıcı olarak silinecek. Bu işlem geri alınamaz.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteTarget(null)} className="btn-secondary flex-1">İptal</button>
                  <button
                    onClick={() => {
                      const p = products.find((x) => x.id === deleteTarget);
                      if (p) handleDelete(p);
                    }}
                    className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-sm transition-colors"
                  >
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
