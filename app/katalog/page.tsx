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
export const SUBCATEGORIES_MAP: Record<string, { name: string; query: string }[]> = {
  "suruplar": [
    { name: "DaVinci Gourmet", query: "davinci" },
    { name: "Caffè NONNO", query: "nonno" },
    { name: "Monte Cristo", query: "monte cristo" },
    { name: "EASY MIX", query: "easy mix" },
    { name: "Vanilya & Karamel", query: "vanilya" },
    { name: "Fındık & Toffee", query: "fındık" },
  ],
  "kokteyller": [
    { name: "EASY MIX Kokteyl Premiksi", query: "easy mix" },
    { name: "Meyveli Kokteyller", query: "mango" },
    { name: "Refresher & Botanik", query: "refresher" },
    { name: "Margarita & Martini", query: "martini" },
  ],
  "pureler": [
    { name: "Caffè NONNO Frozen", query: "nonno" },
    { name: "DaVinci Fruit Mix", query: "davinci" },
    { name: "Krater Meyve Miksi", query: "krater" },
    { name: "Çilek & Orman Meyvesi", query: "çilek" },
    { name: "Mango & Tropikal", query: "mango" },
  ],
  "waffle-malzemeleri": [
    { name: "CALLEI Çikolata Kremaları", query: "callei" },
    { name: "Waffle & Krep Tozu", query: "waffle" },
    { name: "Speculoos & Bisküvi", query: "speculoos" },
    { name: "Antep Fıstıklı", query: "fıstık" },
    { name: "Draje & Süsleme Şekeri", query: "draje" },
    { name: "Damla Çikolatalar", query: "damla" },
    { name: "Krokan & Fındık", query: "krokan" },
  ],
  "bar-sos": [
    { name: "DaVinci 2L Soslar", query: "davinci" },
    { name: "Caffè NONNO 750g Bar Sosu", query: "nonno" },
    { name: "Karamel Sos", query: "karamel" },
    { name: "Çikolata Sos", query: "çikolata" },
    { name: "Condensed Milk (Süt Sosu)", query: "condensed" },
    { name: "Blue Curacao", query: "curacao" },
  ],
  "pastalar": [
    { name: "Tüm Pastalar", query: "" },
    { name: "Cheesecake & Tiramisu", query: "cheesecake" },
    { name: "Mono Pastalar", query: "mono" },
  ],
  "taze-butik-pastalar": [
    { name: "Butik Pastalar", query: "butik" },
    { name: "Özel Tasarım", query: "özel" },
  ],
  "donuk-pasta": [
    { name: "Donuk Cheesecake", query: "cheesecake" },
    { name: "Mono Kutu Pasta", query: "mono" },
    { name: "Tuzlu Mini Kurabiye", query: "kurabiye" },
    { name: "Donuk Poğaça Topları", query: "poğaça" },
    { name: "Gurme Ekmek & Sandviç", query: "ekmek" },
  ],
  "kremali-urunler": [
    { name: "CALLEI Pastacı Kreması", query: "pastacı" },
    { name: "Chantilly Şanti Tozu", query: "şanti" },
    { name: "Bitter Ganaj", query: "bitter" },
    { name: "Beyaz Ganaj", query: "beyaz" },
  ],
};

interface KatalogViewProps {
  forcedCategorySlug?: string;
}

export function KatalogView({ forcedCategorySlug }: KatalogViewProps) {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || searchParams.get("q") || "";
  const initialBrand = searchParams.get("brand") || "";
  const initialCategory = forcedCategorySlug || searchParams.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch || initialBrand);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    if (forcedCategorySlug) {
      setActiveCategory(forcedCategorySlug);
    }
  }, [forcedCategorySlug]);

  useEffect(() => {
    const s = searchParams.get("search") || searchParams.get("brand") || "";
    if (s) setSearchQuery(s);
    const cat = searchParams.get("category");
    if (cat && !forcedCategorySlug) setActiveCategory(cat);
  }, [searchParams, forcedCategorySlug]);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods, brnds] = await Promise.all([
          getActiveCategories(),
          getProducts(),
          getActiveBrands(),
        ]);
        if (cats && cats.length > 0) {
          setCategories(cats.filter((c) => c.isActive !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        }
        if (prods && prods.length > 0) {
          setProducts(prods.filter((p) => p.isActive !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        }
        if (brnds && brnds.length > 0) {
          setBrands(brnds);
        }
      } catch {
        setCategories(MOCK_CATEGORIES);
        setProducts(MOCK_PRODUCTS);
      }
    }
    loadData();
  }, []);

  const currentCategory = useMemo(() => {
    if (activeCategory === "all") return null;
    return categories.find(
      (c) =>
        c.slug === activeCategory ||
        c.id === activeCategory ||
        c.slug?.toLowerCase() === activeCategory.toLowerCase()
    );
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

      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query) ||
        p.categoryName?.toLowerCase().includes(query) ||
        p.categorySlug?.toLowerCase().includes(query) ||
        p.tags?.some((t) => t.toLowerCase().includes(query));

      return matchCat && matchSearch && p.isActive !== false;
    });
  }, [products, activeCategory, searchQuery, currentCategory]);

  const getCategoryProductCount = (cat: Category) =>
    products.filter(
      (p) =>
        p.isActive !== false &&
        (p.categorySlug === cat.slug ||
          p.categoryId === cat.id ||
          p.categorySlug?.toLowerCase() === cat.slug.toLowerCase() ||
          p.categoryName?.toLowerCase() === cat.name.toLowerCase())
    ).length;

  const currentSubItems = (currentCategory?.slug && SUBCATEGORIES_MAP[currentCategory.slug]) || [];

  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <div className="bg-[#16181D] border border-[#282C36] h-full flex flex-col text-slate-200">
      <div className="flex items-center gap-2 px-4 py-3.5 border-b border-[#282C36] shrink-0 bg-[#121316]">
        <AlignLeft size={14} className="text-gold" />
        <span className="text-white font-bold text-xs uppercase tracking-widest">Kategorilerimiz</span>
        {onClose && (
          <button onClick={onClose} className="ml-auto text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        <button
          onClick={() => {
            setActiveCategory("all");
            onClose?.();
          }}
          className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-150 border-b border-[#282C36]/50 ${
            activeCategory === "all" ? "bg-[#1B1D23] text-gold font-bold" : "text-slate-300 hover:bg-[#1B1D23] hover:text-white"
          }`}
        >
          <span className="flex items-center gap-2">
            <span>✨</span> Tüm Ürünler
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <span className={`text-2xs px-1.5 py-0.5 rounded ${activeCategory === "all" ? "bg-gold/20 text-gold font-bold" : "bg-[#282C36] text-slate-400"}`}>
              {products.length}
            </span>
            <ChevronRight size={13} className="opacity-50" />
          </span>
        </button>
        {categories.map((cat) => {
          const count = getCategoryProductCount(cat);
          const isActive = activeCategory === cat.slug || activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.slug || cat.id);
                onClose?.();
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-150 border-b border-[#282C36]/30 ${
                isActive ? "bg-[#1B1D23] text-gold font-bold" : "text-slate-300 hover:bg-[#1B1D23] hover:text-white"
              }`}
            >
              <span className="truncate text-left flex items-center gap-2">
                {cat.icon && <span>{cat.icon}</span>}
                <span>{cat.name}</span>
              </span>
              <span className="flex items-center gap-1.5 shrink-0">
                <span className={`text-2xs px-1.5 py-0.5 rounded ${isActive ? "bg-gold/20 text-gold font-bold" : "bg-[#282C36] text-slate-400"}`}>
                  {count}
                </span>
                <ChevronRight size={13} className="opacity-50" />
              </span>
            </button>
          );
        })}
      </div>

      {/* Brands section */}
      <div className="border-t border-[#282C36] p-4 shrink-0 bg-[#121316]">
        <p className="text-gold text-2xs font-bold uppercase tracking-widest mb-3">Markalarımız</p>
        <div className="space-y-1.5">
          {[
            { id: "b1", name: "DaVinci Gourmet", logo: "☕" },
            { id: "b2", name: "Caffè NONNO", logo: "🍹" },
            { id: "b3", name: "CALLEI", logo: "🍫" },
            { id: "b4", name: "EASY MIX", logo: "🍸" },
            { id: "b5", name: "Krater", logo: "🍧" },
            { id: "b6", name: "Monte Cristo", logo: "🦜" },
          ].map((brand) => (
            <button
              key={brand.id}
              onClick={() => {
                setSearchQuery(brand.name);
                setActiveCategory("all");
                onClose?.();
              }}
              className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-left transition-colors duration-150 ${
                searchQuery.toLowerCase() === brand.name.toLowerCase()
                  ? "bg-[#1B1D23] text-gold font-bold border border-gold/30"
                  : "text-slate-300 hover:text-white hover:bg-[#1B1D23]"
              }`}
            >
              <span className="text-sm shrink-0">{brand.logo}</span>
              <span className="text-xs font-bold uppercase tracking-wide truncate">{brand.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-[#282C36] shrink-0 bg-[#16181D]">
        <p className="font-heading font-semibold text-white text-xs mb-1">Toplu Sipariş & Teklif</p>
        <p className="text-slate-400 text-2xs mb-3">Özel toptan fiyatlandırma için bizimle iletişime geçin.</p>
        <Link href="/iletisim" className="btn-primary py-2 w-full text-xs justify-center shadow-gold">
          Teklif Al
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#121316]">
      {/* Page header banner */}
      <div className="bg-[#0D0E11] pt-8 pb-10 border-b border-[#282C36]">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-6">
            <Link href="/" className="hover:text-gold transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight size={12} />
            <Link href="/katalog" className={`hover:text-gold transition-colors ${!currentCategory ? "text-slate-200 font-semibold" : ""}`}>
              Katalog
            </Link>
            {currentCategory && (
              <>
                <ChevronRight size={12} />
                <span className="text-gold font-bold">{currentCategory.name}</span>
              </>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <div>
              <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">
                {currentCategory ? "Kategori" : "Ürün Kataloğu"}
              </p>
              <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl">
                {currentCategory ? currentCategory.name : "Tüm Ürünler"}
              </h1>
              <p className="text-slate-400 text-sm mt-2">
                {filteredProducts.length} ürün listeleniyor
                {currentCategory?.description && ` — ${currentCategory.description}`}
              </p>
            </div>
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold" />
              <input
                type="text"
                placeholder="Ürün, marka veya tat ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-3 bg-[#16181D] border border-[#282C36] rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-30 flex items-center gap-2 btn-primary shadow-gold-lg py-3 px-5"
          >
            <SlidersHorizontal size={16} /> Kategoriler & Filtre
          </button>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 rounded-2xl overflow-hidden shadow-soft-lg border border-[#282C36]">
              <SidebarContent />
            </div>
          </aside>

          {/* Mobile sidebar */}
          {mobileSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40 flex">
              <div
                className="absolute inset-0 bg-[#0D0E11]/80 backdrop-blur-sm"
                onClick={() => setMobileSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.25 }}
                className="relative w-72 overflow-y-auto z-10 shadow-2xl"
              >
                <SidebarContent onClose={() => setMobileSidebarOpen(false)} />
              </motion.div>
            </div>
          )}

          {/* Products Column */}
          <div className="flex-1 min-w-0">
            {/* Subcategories / Brands Quick Pills Bar */}
            {currentSubItems.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2 bg-[#1B1D23] p-3.5 rounded-2xl border border-[#282C36] shadow-sm">
                <span className="text-gold text-xs font-bold uppercase tracking-wider mr-1">
                  Çeşitler & Markalar:
                </span>
                <button
                  onClick={() => setSearchQuery("")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    !searchQuery
                      ? "bg-gold text-[#0D0E11] font-bold shadow-sm"
                      : "bg-[#16181D] text-slate-300 hover:text-white border border-[#282C36]"
                  }`}
                >
                  Tümü
                </button>
                {currentSubItems.map((sub, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(sub.query)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      searchQuery.toLowerCase() === sub.query.toLowerCase()
                        ? "bg-gold text-[#0D0E11] font-bold shadow-sm"
                        : "bg-[#16181D] text-slate-300 hover:bg-[#21242C] hover:text-gold border border-[#282C36]"
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
                <span className="text-xs text-slate-400">Aktif Filtre:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gold/15 border border-gold/30 text-gold text-xs font-bold">
                  {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="hover:text-white">
                    <X size={12} />
                  </button>
                </span>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-[#1B1D23] rounded-2xl border border-[#282C36]">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-heading font-semibold text-white text-lg mb-2">Ürün bulunamadı</h3>
                <p className="text-slate-400 text-sm mb-6">Arama veya kategori kriterlerinizi değiştirerek tekrar deneyin.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="btn-gold-outline"
                >
                  <Filter size={15} /> Filtreleri Temizle
                </button>
              </div>
            ) : (
              /* 5-Column Responsive Product Grid */
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4.5">
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

export default function KatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#121316] flex items-center justify-center">
          <div className="text-slate-400 text-sm">Katalog yükleniyor...</div>
        </div>
      }
    >
      <KatalogView />
    </Suspense>
  );
}