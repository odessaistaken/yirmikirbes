"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Filter, ChevronRight, SlidersHorizontal, X, AlignLeft, ImageIcon } from "lucide-react";
import { CATEGORIES as MOCK_CATEGORIES, PRODUCTS as MOCK_PRODUCTS } from "@/lib/mock-data";
import { getActiveCategories, getProducts, getActiveBrands } from "@/lib/firestore-collections";
import type { Category, Product, Brand } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

/* ─── Subcategories & Brand links map ─────────────────────────────────────── */
const SUBCATEGORIES_MAP: Record<string, { name: string; query: string }[]> = {
  "waffle": [
    { name: "Waffle Kek", query: "waffle kek" },
    { name: "Waffle Sos", query: "waffle sos" },
    { name: "Waffle Süsleme", query: "waffle susleme" },
    { name: "Waffle Çikolata", query: "cikolata" },
  ],
  "suruplar": [
    { name: "DAVİNCİ", query: "davinci" },
    { name: "MONTE CRİSTO", query: "monte cristo" },
    { name: "NONNO", query: "nonno" },
  ],
  "pureler": [
    { name: "Davinci Püre", query: "davinci" },
    { name: "Monte Cristo Püre", query: "monte cristo" },
  ],
  "donuk-pasta": [
    { name: "Çikolatalı Pasta", query: "cikolata" },
    { name: "Meyveli Pasta", query: "meyve" },
    { name: "Cheesecake", query: "cheesecake" },
    { name: "San Sebastian", query: "sebastian" },
  ],
};

function KatalogContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || searchParams.get("q") || "";
  const initialBrand = searchParams.get("brand") || "";
  const initialCategory = searchParams.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch || initialBrand);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const s = searchParams.get("search") || searchParams.get("brand") || "";
    if (s) setSearchQuery(s);
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods, brnds] = await Promise.all([
          getActiveCategories(),
          getProducts(),
          getActiveBrands(),
        ]);
        setCategories(cats.length > 0 ? cats.filter((c) => c.isActive !== false).sort((a, b) => a.order - b.order) : MOCK_CATEGORIES);
        setProducts(prods.length > 0 ? prods.filter((p) => p.isActive !== false) : MOCK_PRODUCTS);
        if (brnds.length > 0) setBrands(brnds);
      } catch {
        setCategories(MOCK_CATEGORIES);
        setProducts(MOCK_PRODUCTS);
      }
    }
    loadData();
  }, []);

  const currentCategory = useMemo(() => categories.find((c) => c.slug === activeCategory || c.id === activeCategory), [categories, activeCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        activeCategory === "all" ||
        p.categorySlug === activeCategory ||
        p.categoryId === activeCategory ||
        p.categoryId === currentCategory?.id ||
        (currentCategory && p.categoryName?.toLowerCase() === currentCategory.name.toLowerCase()) ||
        (currentCategory && p.categorySlug?.toLowerCase() === currentCategory.slug.toLowerCase());

      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query) ||
        p.categoryName?.toLowerCase().includes(query) ||
        p.tags?.some((t) => t.toLowerCase().includes(query));

      return matchCat && matchSearch && p.isActive;
    });
  }, [products, activeCategory, searchQuery, currentCategory]);

  const getCategoryProductCount = (cat: Category) =>
    products.filter(
      (p) =>
        p.isActive &&
        (p.categorySlug === cat.slug ||
          p.categoryId === cat.id ||
          p.categorySlug?.toLowerCase() === cat.slug.toLowerCase() ||
          p.categoryName?.toLowerCase() === cat.name.toLowerCase())
    ).length;

  const currentSubItems = (currentCategory?.slug && SUBCATEGORIES_MAP[currentCategory.slug]) || [];

  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <div className="bg-charcoal-900 h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3.5 border-b border-charcoal-700 shrink-0">
        <AlignLeft size={14} className="text-white" />
        <span className="text-white font-bold text-xs uppercase tracking-widest">Kategorilerimiz</span>
        {onClose && (
          <button onClick={onClose} className="ml-auto text-charcoal-400 hover:text-white">
            <X size={18} />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        <button
          onClick={() => { setActiveCategory("all"); onClose?.(); }}
          className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-150 border-b border-charcoal-800 ${activeCategory === "all" ? "bg-charcoal-700 text-white" : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white"}`}
        >
          <span>Tüm Ürünler</span>
          <ChevronRight size={14} className="opacity-60" />
        </button>
        {categories.map((cat) => {
          const count = getCategoryProductCount(cat);
          const isActive = activeCategory === cat.slug || activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.slug || cat.id); onClose?.(); }}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-150 border-b border-charcoal-800/50 ${isActive ? "bg-charcoal-700 text-white" : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white"}`}
            >
              <span className="truncate text-left">{cat.name}</span>
              <span className="flex items-center gap-1.5 shrink-0">
                <span className={`text-2xs px-1.5 py-0.5 rounded ${isActive ? "bg-white/20 text-white" : "bg-charcoal-700 text-charcoal-400"}`}>{count}</span>
                <ChevronRight size={13} className="opacity-50" />
              </span>
            </button>
          );
        })}
      </div>
      {brands.length > 0 && (
        <div className="border-t border-charcoal-700 p-4 shrink-0">
          <p className="text-charcoal-400 text-2xs font-semibold uppercase tracking-widest mb-3">Markalarımız</p>
          <div className="space-y-1.5">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => {
                  setSearchQuery(brand.name);
                  setActiveCategory("all");
                  onClose?.();
                }}
                className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-left transition-colors duration-150 ${
                  searchQuery.toLowerCase() === brand.name.toLowerCase()
                    ? "bg-charcoal-700 text-gold"
                    : "text-charcoal-300 hover:text-white hover:bg-charcoal-800"
                }`}
              >
                {brand.imageUrl ? (
                  <div className="w-5 h-5 relative shrink-0">
                    <Image src={brand.imageUrl} alt={brand.name} fill sizes="20px" className="object-contain" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded bg-charcoal-700 shrink-0 flex items-center justify-center">
                    <ImageIcon size={10} className="text-charcoal-500" />
                  </div>
                )}
                <span className="text-xs font-bold uppercase tracking-wide truncate">{brand.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="p-4 border-t border-charcoal-700 shrink-0">
        <p className="font-heading font-semibold text-white text-xs mb-1">Toplu Sipariş mi?</p>
        <p className="text-charcoal-400 text-2xs mb-3">Özel fiyatlandırma için iletişime geçin.</p>
        <Link href="/iletisim" className="btn-primary py-2 w-full text-xs justify-center">Teklif Al</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream">
      {/* Page header */}
      <div className="bg-charcoal-900 pt-8 pb-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-charcoal-400 text-xs mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Ana Sayfa</Link>
            <ChevronRight size={12} />
            <span className="text-charcoal-200">Katalog</span>
            {currentCategory && (
              <>
                <ChevronRight size={12} />
                <span className="text-gold">{currentCategory.name}</span>
              </>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <div>
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">Ürün Kataloğu</p>
              <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl">
                {currentCategory ? currentCategory.name : "Tüm Ürünler"}
              </h1>
              <p className="text-charcoal-400 text-sm mt-2">{filteredProducts.length} ürün listeleniyor</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400" />
              <input
                type="text"
                placeholder="Ürün veya marka ara..."
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

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-6">
          <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden fixed bottom-6 right-6 z-30 flex items-center gap-2 btn-primary shadow-gold-lg py-3 px-5">
            <SlidersHorizontal size={16} />Filtrele
          </button>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 rounded-2xl overflow-hidden shadow-soft-lg">
              <SidebarContent />
            </div>
          </aside>

          {/* Mobile sidebar */}
          {mobileSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40 flex">
              <div className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
              <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ duration: 0.25 }} className="relative w-72 overflow-y-auto">
                <SidebarContent onClose={() => setMobileSidebarOpen(false)} />
              </motion.div>
            </div>
          )}

          {/* Products Column */}
          <div className="flex-1 min-w-0">
            {/* Subcategories / Brands Quick Pills Bar */}
            {currentSubItems.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2 bg-white p-3.5 rounded-2xl border border-border shadow-sm">
                <span className="text-charcoal-400 text-xs font-semibold uppercase tracking-wider mr-1">
                  Çeşitler & Markalar:
                </span>
                <button
                  onClick={() => setSearchQuery("")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    !searchQuery
                      ? "bg-charcoal-900 text-white shadow-sm"
                      : "bg-cream text-charcoal-600 hover:bg-cream-200"
                  }`}
                >
                  Tümü
                </button>
                {currentSubItems.map((sub, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(sub.query)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      searchQuery.toLowerCase() === sub.query.toLowerCase()
                        ? "bg-gold-500 text-white shadow-sm"
                        : "bg-cream text-charcoal-700 hover:bg-gold-50 hover:text-gold-700 border border-border/70"
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}

            {/* Active search filter badge */}
            {searchQuery && (
              <div className="mb-4 flex items-center gap-2">
                <span className="text-xs text-charcoal-500">Aktif Filtre:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gold-50 border border-gold-200 text-gold-800 text-xs font-medium">
                  {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="hover:text-charcoal-900">
                    <X size={12} />
                  </button>
                </span>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-border">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-heading font-semibold text-charcoal-700 text-lg mb-2">Ürün bulunamadı</h3>
                <p className="text-charcoal-400 text-sm mb-6">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
                <button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }} className="btn-gold-outline">
                  <Filter size={15} />Filtreleri Temizle
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => (<ProductCard key={product.id} product={product} index={i} />))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center"><div className="text-charcoal-400 text-sm">Yükleniyor...</div></div>}>
      <KatalogContent />
    </Suspense>
  );
}