"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flame, Search, Check, Plus, Minus, Package,
  ImageIcon, ExternalLink, ArrowRight, Sparkles, Filter
} from "lucide-react";
import toast from "react-hot-toast";
import { getProducts, updateProduct, getCategories } from "@/lib/firestore-collections";
import type { Product, Category } from "@/lib/types";

export default function AdminCokSatanlar() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"all" | "bestsellers">("bestsellers");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
        setProducts(prods);
        setCategories(cats);
      } catch (err) {
        console.error("Çok Satanlar veri yükleme hatası:", err);
        toast.error("Ürünler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleToggle(p: Product) {
    const nextVal = !p.isBestSeller;
    setTogglingId(p.id);
    try {
      await updateProduct(p.id, { isBestSeller: nextVal });
      setProducts((prev) =>
        prev.map((item) => (item.id === p.id ? { ...item, isBestSeller: nextVal } : item))
      );
      toast.success(
        nextVal
          ? `"${p.name}" Çok Satanlar listesine eklendi.`
          : `"${p.name}" Çok Satanlar listesinden çıkarıldı.`
      );
    } catch (err: any) {
      console.error("Güncelleme hatası:", err);
      toast.error(`Hata: ${err?.message || "İşlem tamamlanamadı."}`);
    } finally {
      setTogglingId(null);
    }
  }

  const bestSellers = useMemo(() => {
    return products.filter((p) => p.isBestSeller);
  }, [products]);

  const displayedProducts = useMemo(() => {
    return products.filter((p) => {
      if (activeTab === "bestsellers" && !p.isBestSeller) return false;
      if (selectedCategory !== "all" && p.categoryId !== selectedCategory && p.categorySlug !== selectedCategory) {
        return false;
      }
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.categoryName?.toLowerCase().includes(q) ||
        p.codeGroup?.toLowerCase().includes(q)
      );
    });
  }, [products, activeTab, selectedCategory, search]);

  return (
    <div className="p-6 sm:p-8 text-slate-800 dark:text-slate-200 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 mb-1">
            <Flame size={16} className="fill-amber-500 text-amber-500" />
            <span>Vitrin & Popüler Ürün Yönetimi</span>
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Çok Satan Ürünler
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Katalogdaki ürünleri tek tıkla Çok Satanlar listesine ekleyip çıkarabilirsiniz.
          </p>
        </div>

        {/* View on live site */}
        <div className="flex items-center gap-3">
          <Link
            href="/cok-satanlar"
            target="_blank"
            className="btn-primary bg-amber-500 hover:bg-amber-600 text-white font-bold flex items-center gap-2 py-2.5 px-4 rounded-xl shadow-md text-sm"
          >
            <span>Sayfayı Gör</span>
            <ExternalLink size={15} />
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1B1D23] border border-slate-200 dark:border-[#282C36] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Çok Satan Ürün Sayısı</p>
              <p className="text-3xl font-extrabold text-amber-500 mt-1">{bestSellers.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Flame size={24} className="fill-amber-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1B1D23] border border-slate-200 dark:border-[#282C36] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Toplam Ürün Havuzu</p>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{products.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#282C36] text-slate-600 dark:text-slate-300 flex items-center justify-center">
              <Package size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 text-white shadow-md flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-amber-100">Aktif Vitrin Oranı</p>
            <p className="text-3xl font-extrabold mt-1">
              {products.length > 0 ? `%${Math.round((bestSellers.length / products.length) * 100)}` : "%0"}
            </p>
          </div>
          <Sparkles size={28} className="text-amber-200" />
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="bg-white dark:bg-[#1B1D23] border border-slate-200 dark:border-[#282C36] rounded-2xl p-4 sm:p-5 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Tab Selector */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-[#121316] rounded-xl border border-slate-200 dark:border-[#282C36] self-start">
            <button
              onClick={() => setActiveTab("bestsellers")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === "bestsellers"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Flame size={14} className={activeTab === "bestsellers" ? "fill-white" : ""} />
              <span>Sadece Çok Satanlar ({bestSellers.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === "all"
                  ? "bg-white dark:bg-[#1B1D23] text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>Tüm Ürünler ({products.length})</span>
            </button>
          </div>

          {/* Search and Category Filter */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Select */}
            <div className="relative min-w-[160px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#16181D] border border-slate-200 dark:border-[#282C36] text-slate-800 dark:text-slate-200 text-xs sm:text-sm rounded-xl py-2 px-3 outline-none"
              >
                <option value="all">Tüm Kategoriler</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Box */}
            <div className="relative flex-1 sm:w-64">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ürün adı veya kodu ara..."
                className="w-full bg-slate-50 dark:bg-[#16181D] border border-slate-200 dark:border-[#282C36] text-slate-800 dark:text-slate-200 text-xs sm:text-sm rounded-xl py-2 pl-9 pr-3 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product List Table / Grid */}
      <div className="bg-white dark:bg-[#1B1D23] border border-slate-200 dark:border-[#282C36] rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400 text-sm">Ürünler yükleniyor...</p>
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="py-16 text-center px-4">
            <Package size={42} className="text-slate-400 dark:text-slate-600 mx-auto mb-3" />
            <p className="font-heading font-bold text-lg text-slate-700 dark:text-slate-300">
              {activeTab === "bestsellers" ? "Henüz çok satan ürün eklenmedi" : "Eşleşen ürün bulunamadı"}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-md mx-auto">
              {activeTab === "bestsellers"
                ? "Yukarıdaki 'Tüm Ürünler' sekmesine geçerek genel ürün listesinden dilediğiniz ürünleri çok satanlara ekleyebilirsiniz."
                : "Arama teriminizi veya filtrelerinizi değiştirip tekrar deneyin."}
            </p>
            {activeTab === "bestsellers" && (
              <button
                onClick={() => setActiveTab("all")}
                className="btn-primary bg-amber-500 hover:bg-amber-600 text-white font-bold mt-4 inline-flex items-center gap-2 py-2 px-5 rounded-xl text-sm"
              >
                <span>Tüm Ürünleri İncele & Ekle</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-[#16181D] border-b border-slate-200 dark:border-[#282C36] text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 w-16">Görsel</th>
                  <th className="py-3.5 px-4">Ürün Adı & Kod</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Fiyat</th>
                  <th className="py-3.5 px-4 text-center">Durum</th>
                  <th className="py-3.5 px-4 text-right">Çok Satan Durumu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#282C36]">
                {displayedProducts.map((p) => {
                  const isBusy = togglingId === p.id;
                  const isBest = !!p.isBestSeller;

                  return (
                    <tr
                      key={p.id}
                      className={`transition-colors ${
                        isBest
                          ? "bg-amber-50/40 dark:bg-amber-950/10 hover:bg-amber-50/70 dark:hover:bg-amber-950/20"
                          : "hover:bg-slate-50 dark:hover:bg-[#16181D]"
                      }`}
                    >
                      {/* Image */}
                      <td className="py-3 px-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white dark:bg-[#16181D] border border-slate-200 dark:border-[#282C36] relative shrink-0">
                          {p.imageUrl ? (
                            <Image
                              src={p.imageUrl}
                              alt={p.name}
                              fill
                              sizes="48px"
                              className="object-contain p-1"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                              <ImageIcon size={18} />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Product Name & Code */}
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">{p.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <code className="text-2xs bg-slate-100 dark:bg-[#121316] text-amber-600 dark:text-amber-400 border border-slate-200 dark:border-[#282C36] px-1.5 py-0.5 rounded font-mono">
                            {p.code}
                          </code>
                          {p.codeGroup && (
                            <span className="text-2xs text-slate-400">Grup: {p.codeGroup}</span>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="text-xs text-slate-600 dark:text-slate-300">
                          {categories.find((c) => c.id === p.categoryId)?.name ?? p.categoryName ?? p.categoryId}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                        {p.price > 0 ? `₺${p.price.toFixed(2)}` : "—"}
                      </td>

                      {/* Active / Inactive */}
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-2xs font-bold ${
                            p.isActive
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                          }`}
                        >
                          {p.isActive ? "Aktif" : "Pasif"}
                        </span>
                      </td>

                      {/* Action Button */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleToggle(p)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                            isBest
                              ? "bg-amber-500 hover:bg-amber-600 text-white border border-amber-600"
                              : "bg-slate-100 hover:bg-amber-500 hover:text-white dark:bg-[#282C36] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#383E4C]"
                          }`}
                        >
                          {isBusy ? (
                            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : isBest ? (
                            <>
                              <Check size={13} />
                              <span>Çok Satanlarda</span>
                              <Minus size={11} className="ml-1 opacity-70" />
                            </>
                          ) : (
                            <>
                              <Plus size={13} />
                              <span>Listeye Ekle</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
