"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES as MOCK_CATEGORIES, PRODUCTS as MOCK_PRODUCTS } from "@/lib/mock-data";
import { getActiveCategories, getProducts } from "@/lib/firestore-collections";
import type { Category, Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

export default function KatalogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([
          getActiveCategories(),
          getProducts(),
        ]);

        const mergedCats = [...cats];
        for (const mc of MOCK_CATEGORIES) {
          if (!mergedCats.some((c) => c.slug === mc.slug || c.id === mc.id || c.name.toLowerCase() === mc.name.toLowerCase())) {
            mergedCats.push(mc);
          }
        }

        const mergedProds = [...prods];
        for (const mp of MOCK_PRODUCTS) {
          if (!mergedProds.some((p) => p.id === mp.id || p.code === mp.code)) {
            mergedProds.push(mp);
          }
        }

        setCategories(mergedCats.filter((c) => c.isActive !== false).sort((a, b) => a.order - b.order));
        setProducts(mergedProds.filter((p) => p.isActive !== false));
      } catch {
        setCategories(MOCK_CATEGORIES);
        setProducts(MOCK_PRODUCTS);
      }
    }
    loadData();
  }, []);

  const currentCategory = useMemo(() => {
    return categories.find((c) => c.slug === activeCategory || c.id === activeCategory);
  }, [categories, activeCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        activeCategory === "all" ||
        p.categorySlug === activeCategory ||
        p.categoryId === activeCategory ||
        p.categoryId === currentCategory?.id ||
        (currentCategory && p.categoryName?.toLowerCase() === currentCategory.name.toLowerCase()) ||
        (currentCategory && p.categorySlug?.toLowerCase() === currentCategory.slug.toLowerCase());

      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchSearch && p.isActive;
    });
  }, [products, activeCategory, searchQuery, currentCategory]);

  const getCategoryProductCount = (cat: Category) => {
    return products.filter(
      (p) =>
        p.isActive &&
        (p.categorySlug === cat.slug ||
          p.categoryId === cat.id ||
          p.categorySlug?.toLowerCase() === cat.slug.toLowerCase() ||
          p.categoryName?.toLowerCase() === cat.name.toLowerCase())
    ).length;
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* ── Page header ───────────────────────────────────────────── */}
      <div className="bg-charcoal-900 pt-8 pb-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-charcoal-400 text-xs mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Ana Sayfa</Link>
            <ChevronRight size={12} />
            <span className="text-charcoal-200">Katalog</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <div>
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">
                Ürün Kataloğu
              </p>
              <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl">
                {currentCategory ? currentCategory.name : "Tüm Ürünler"}
              </h1>
              <p className="text-charcoal-400 text-sm mt-2">
                {filteredProducts.length} ürün listeleniyor
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400" />
              <input
                type="text"
                placeholder="Ürün veya kod ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-charcoal-700 border border-charcoal-600 rounded-xl text-white text-sm placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Mobile filter button */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-30 flex items-center gap-2 btn-primary shadow-gold-lg py-3 px-5"
          >
            <SlidersHorizontal size={16} />
            Filtrele
          </button>

          {/* ── Sidebar ──────────────────────────────────────────── */}
          {/* Desktop */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-24 space-y-2">
              <p className="text-2xs text-charcoal-400 uppercase tracking-widest font-semibold px-3 pb-1">
                Kategoriler
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                  activeCategory === "all"
                    ? "bg-gold text-charcoal-900"
                    : "text-charcoal-700 hover:bg-cream-200"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span>🏷️</span>
                  Tüm Ürünler
                </span>
                <span className={`text-xs rounded-full px-2 py-0.5 ${activeCategory === "all" ? "bg-charcoal-900/20" : "bg-cream-200 text-charcoal-400"}`}>
                  {products.length}
                </span>
              </button>

              {categories.map((cat) => {
                const count = getCategoryProductCount(cat);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.slug || cat.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                      activeCategory === cat.slug || activeCategory === cat.id
                        ? "bg-gold text-charcoal-900"
                        : "text-charcoal-700 hover:bg-cream-200"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <span>{cat.icon || "🏷️"}</span>
                      <span className="truncate">{cat.name}</span>
                    </span>
                    <span className={`text-xs rounded-full px-2 py-0.5 shrink-0 ${activeCategory === cat.slug || activeCategory === cat.id ? "bg-charcoal-900/20" : "bg-cream-200 text-charcoal-400"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}

              {/* Inquiry CTA in sidebar */}
              <div className="mt-6 p-4 bg-warm-brown rounded-2xl">
                <p className="font-heading font-semibold text-white text-sm mb-2">
                  Toplu Sipariş mi?
                </p>
                <p className="text-charcoal-300 text-xs mb-3">
                  Özel fiyatlandırma için bizimle iletişime geçin.
                </p>
                <Link href="/iletisim" className="btn-primary py-2 w-full text-xs">
                  Teklif Al
                </Link>
              </div>
            </div>
          </aside>

          {/* Mobile sidebar overlay */}
          {mobileSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40 flex">
              <div
                className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm"
                onClick={() => setMobileSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.25 }}
                className="relative bg-white w-72 p-6 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <p className="font-heading font-bold text-charcoal-800">Kategoriler</p>
                  <button onClick={() => setMobileSidebarOpen(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => { setActiveCategory("all"); setMobileSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${activeCategory === "all" ? "bg-gold text-charcoal-900" : "text-charcoal-700 hover:bg-cream-200"}`}
                  >
                    <span>🏷️ Tüm Ürünler</span>
                    <span className="text-xs bg-cream-200 px-2 py-0.5 rounded-full">{products.length}</span>
                  </button>
                  {categories.map((cat) => {
                    const count = getCategoryProductCount(cat);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => { setActiveCategory(cat.slug || cat.id); setMobileSidebarOpen(false); }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${activeCategory === cat.slug || activeCategory === cat.id ? "bg-gold text-charcoal-900" : "text-charcoal-700 hover:bg-cream-200"}`}
                      >
                        <span className="truncate">{cat.icon || "🏷️"} {cat.name}</span>
                        <span className="text-xs bg-cream-200 px-2 py-0.5 rounded-full shrink-0">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}

          {/* ── Products Grid ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-heading font-semibold text-charcoal-700 text-lg mb-2">
                  Ürün bulunamadı
                </h3>
                <p className="text-charcoal-400 text-sm mb-6">
                  Arama kriterlerinizi değiştirerek tekrar deneyin.
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                  className="btn-gold-outline"
                >
                  <Filter size={15} />
                  Filtreleri Temizle
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
