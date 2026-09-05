"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Flame, Search, ChevronRight, SlidersHorizontal, Sparkles, X } from "lucide-react";
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* ── Page Header Banner ── */}
      <div className="bg-white pt-8 pb-10 border-b border-slate-200">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-6">
            <Link href="/" className="hover:text-amber-600 transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight size={12} />
            <span className="text-amber-700 font-semibold">Çok Satanlar</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <div>
              <p className="text-amber-700 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Flame size={15} className="text-amber-600 fill-amber-500" />
                <span>En Çok Tercih Edilenler</span>
              </p>
              <h1 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl">
                Çok Satan Ürünler
              </h1>
              <p className="text-slate-500 text-sm mt-2">
                {filteredProducts.length} popüler ürün listeleniyor — Kafe, otel ve pastanelerin en çok tercih ettiği ürünler
              </p>
            </div>

            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-600" />
              <input
                type="text"
                placeholder="Çok satanlarda ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-9 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Quick Pills Bar */}
        {categories.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-amber-800 text-xs font-bold uppercase tracking-wider mr-1">
              Kategoriler:
            </span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-amber-600 text-white font-bold shadow-sm"
                  : "bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Tümü ({products.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === c.id
                    ? "bg-amber-600 text-white font-bold shadow-sm"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-amber-700 border border-slate-200"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        {/* Active search filter badge */}
        {search && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs text-slate-500">Aktif Filtre:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold">
              {search}
              <button onClick={() => setSearch("")} className="hover:text-amber-900">
                <X size={12} />
              </button>
            </span>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-white border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-heading font-semibold text-slate-900 text-lg mb-2">
              Aramanıza uygun ürün bulunamadı
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Filtrelerinizi temizleyerek veya farklı bir arama yaparak tekrar deneyebilirsiniz.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
              className="btn-gold-outline"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4.5">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
