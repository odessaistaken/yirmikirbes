"use client";

export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";
import { Plus, Search } from "lucide-react";
import toast from "react-hot-toast";
import {
  getProducts,
  getCategories as fetchCategories,
  addProduct,
  updateProduct,
  deleteProduct,
  cloneProduct,
  uploadImage,
  compressImage,
  deleteStoredImage,
} from "@/lib/firestore-collections";
import type { Product, Category } from "@/lib/types";

import ProductTable from "@/components/admin/ProductTable";
import ProductFormModal, { type ProductFormData } from "@/components/admin/ProductFormModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

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

  const emptyForm: ProductFormData = {
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
  const [form, setForm] = useState<ProductFormData>(emptyForm);

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
      description: p.description || "",
      imageUrl: p.imageUrl || "",
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
      toast.success(
        newVal ? `"${p.name}" Çok Satanlara eklendi.` : `"${p.name}" Çok Satanlardan çıkarıldı.`
      );
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
    <div className="p-8 text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="section-label">Admin</p>
          <h1 className="font-heading font-bold text-slate-900 text-3xl">Ürünler</h1>
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
          <button onClick={openAdd} className="btn-primary shadow-gold cursor-pointer flex items-center gap-2">
            <Plus size={16} />
            Yeni Ürün
          </button>
        </div>
      </div>

      {/* Product Table Component */}
      <ProductTable
        products={filtered}
        categories={categories}
        onEdit={openEdit}
        onDelete={(id) => setDeleteTarget(id)}
        onClone={handleClone}
        onToggleBestSeller={handleToggleBestSeller}
      />

      {/* Add/Edit Product Modal Component */}
      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editTarget={editTarget}
        categories={categories}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        saving={saving}
        uploadProgress={uploadProgress}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        fileInputRef={fileInputRef}
        onFileSelect={handleFileSelect}
        onRemoveImage={handleRemoveImage}
      />

      {/* Delete Confirmation Modal Component */}
      <DeleteConfirmModal
        targetId={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={deleting}
      />
    </div>
  );
}
