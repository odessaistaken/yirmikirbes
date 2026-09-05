"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Flame, Search, ChevronRight, SlidersHorizontal, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getBestSellerProducts, getProducts } from "@/lib/firestore-collections";
import { PRODUCTS as MOCK_PRODUCTS } from "@/lib/mock-data";
import type { Product } from "@/lib/types";

export default function CokSatanlarPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    async function loadData() {
      try {
        const best = await getBestSellerProducts();
        if (best.length > 0) {
          setProducts(best);
        } else {
          // Fallback: If no products marked as best sellers yet in DB,
          // fetch active products and take top featured/first products as fallback so page is lively
          const allProds = await getProducts();
          const activeProds = allProds.length > 0 ? allProds.filter((p) => p.isActive) : [];
          if (activeProds.length > 0) {
            setProducts(activeProds.slice(0, 15));
          } else {
            // Mock fallback
            setProducts(
              MOCK_PRODUCTS.slice(0, 12).map((p, i) => ({
                ...p,
                codeGroup: "",
                price: 0,
                vatRate: 20,
                order: i + 1,
              }))
            );
          }
        }
      } catch (err) {
        console.error("Çok Satanlar yükleme hatası:", err);
        setProducts(
          MOCK_PRODUCTS.slice(0, 12).map((p, i) => ({
            ...p,
            codeGroup: "",
            price: 0,
            vatRate: 20,
            order: i + 1,
          }))
        );
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      if (p.categoryName) {
        map.set(p.categoryId || p.categorySlug || p.categoryName, p.categoryName);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== "all") {
        if (p.categoryId !== selectedCategory && p.categorySlug !== selectedCategory && p.categoryName !== selectedCategory) {
          return false;
        }
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
  }, [products, selectedCategory, search]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0D0E11] text-slate-900 dark:text-slate-100 transition-colors">
      {/* ── Hero Banner ── */}
      <div className="relative bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-8xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-amber-100 text-xs mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight size={12} className="opacity-70" />
            <span className="text-white font-semibold">Çok Satanlar</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4 border border-white/30">
              <Flame size={15} className="fill-amber-300 text-amber-300" />
              <span>En Çok Tercih Edilenler</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Sektörün En Çok Satan <span className="underline decoration-amber-300 decoration-4">Popüler Ürünleri</span>
            </h1>
            <p className="mt-4 text-amber-50 text-sm sm:text-base leading-relaxed max-w-2xl">
              Türkiye&apos;nin önde gelen kafe, otel ve pastanelerinin en çok sipariş verdiği hammadde, püre, pasta ve şurup çeşitleri tek bir çatı altında.
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Search & Category Filter Bar */}
        <div className="bg-white dark:bg-[#16181D] border border-slate-200 dark:border-[#282C36] rounded-2xl p-4 sm:p-5 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-slate-100 dark:bg-[#1B1D23] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#282C36]"
              }`}
            >
              Tümü ({products.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === c.id
                    ? "bg-amber-500 text-white shadow-md"
                    : "bg-slate-100 dark:bg-[#1B1D23] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#282C36]"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Çok satanlarda ara..."
              className="w-full bg-slate-50 dark:bg-[#1B1D23] border border-slate-200 dark:border-[#282C36] text-slate-800 dark:text-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-slate-200 dark:bg-[#1B1D23] animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-[#16181D] border border-slate-200 dark:border-[#282C36] rounded-2xl p-12 text-center shadow-sm">
            <Flame size={48} className="text-amber-500/50 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
              Aramanıza uygun ürün bulunamadı
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Filtrelerinizi temizleyerek veya farklı bir arama yaparak tekrar deneyebilirsiniz.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
              className="btn-primary bg-amber-500 hover:bg-amber-600 text-white font-bold mt-4 inline-flex py-2 px-6 rounded-xl text-xs sm:text-sm"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
