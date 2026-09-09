"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { Plus, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import PresentationAdminTable from "@/components/presentation/admin/PresentationAdminTable";
import PresentationEditModal from "@/components/presentation/admin/PresentationEditModal";
import {
  fetchPresentationCategories,
  presentationApi,
  type PresentationProduct,
} from "@/lib/presentation-catalog-service";
import type { Category } from "@/lib/types";

export default function AdminSunumKataloguPage() {
  const [products, setProducts] = useState<PresentationProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<PresentationProduct | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [cats, prods] = await Promise.all([
        fetchPresentationCategories(),
        presentationApi.getAll(),
      ]);
      setCategories(cats);
      setProducts(prods);
    } catch (err) {
      console.error("Veriler yüklenemedi:", err);
      toast.error("Sunum verileri yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (product: PresentationProduct) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const handleSave = async (data: Omit<PresentationProduct, "id"> | PresentationProduct) => {
    try {
      if ("id" in data && data.id) {
        await presentationApi.update(data.id, data);
        toast.success("Sunum ürünü güncellendi.");
      } else {
        await presentationApi.create(data);
        toast.success("Yeni sunum ürünü eklendi.");
      }
      await loadData();
    } catch (err: any) {
      console.error("Kaydetme hatası:", err);
      toast.error(err?.message || "Kayıt işlemi başarısız.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu ürünü sunum kataloğundan silmek istediğinize emin misiniz?")) return;
    try {
      await presentationApi.delete(id);
      toast.success("Ürün sunum kataloğundan silindi.");
      await loadData();
    } catch (err: any) {
      console.error("Silme hatası:", err);
      toast.error("Silme işlemi başarısız.");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto text-stone-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-1.5">
            <Sparkles size={12} />
            <span>Özel Müşteri Sunum Paneli</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-stone-900 font-bold">
            Sunum Kataloğu Yönetimi
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Müşterilere gösterilen özel lookbook kataloğundaki ürünleri, tanıtım yazılarını ve fiyatları yönetin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/sunum-katalogu"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>Canlı Sunumu Aç</span>
            <ExternalLink size={13} />
          </Link>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus size={15} />
            <span>Yeni Ürün Ekle</span>
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-20 text-center text-xs text-stone-500 font-mono">
          Yükleniyor...
        </div>
      ) : (
        <PresentationAdminTable
          products={products}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Edit / Add Modal */}
      <PresentationEditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={editProduct}
        categories={categories}
        onSave={handleSave}
      />
    </div>
  );
}
