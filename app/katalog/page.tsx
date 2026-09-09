"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { CATEGORIES as MOCK_CATEGORIES, PRODUCTS as MOCK_PRODUCTS } from "@/lib/mock-data";
import { getActiveCategories, getProducts, getActiveBrands } from "@/lib/firestore-collections";
import type { Category, Product, Brand } from "@/lib/types";

import CatalogHero from "@/components/catalog/CatalogHero";
import CategorySidebar from "@/components/catalog/CategorySidebar";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import CatalogGrid from "@/components/catalog/CatalogGrid";

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
    { name: "Taze - Butik Pastalar", query: "butik" },
    { name: "Donuk Pastalar", query: "donuk" },
    { name: "Butik Cup", query: "cup" },
    { name: "Organizasyon Pastaları", query: "organizasyon" },
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
  "butik-cup": [
    { name: "Bireysel Cup Pasta", query: "cup" },
    { name: "Mini Cheesecake Cup", query: "cheesecake" },
  ],
  "organizasyon-pastalari": [
    { name: "Düğün & Nişan", query: "düğün" },
    { name: "Özel Tasarım", query: "özel" },
    { name: "Kurumsal", query: "kurumsal" },
  ],
  "kasa-onu-urunler": [
    { name: "Atıştırmalıklar", query: "atıştırmalık" },
    { name: "İkramlık & Mini", query: "ikramlık" },
  ],
  "ekipmanlar": [
    { name: "Pastacılık Ekipmanları", query: "pastacılık" },
    { name: "Barista Ekipmanları", query: "barista" },
  ],
  "kruvasan": [
    { name: "Taze Kruvasan", query: "taze" },
    { name: "Donuk Kruvasan", query: "donuk" },
    { name: "Dolgulu Kruvasan", query: "dolgulu" },
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
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      try {
        const results = await Promise.allSettled([
          getActiveCategories(),
          getProducts(),
          getActiveBrands(),
        ]);

        const cats = results[0].status === "fulfilled" ? results[0].value : [];
        const prods = results[1].status === "fulfilled" ? results[1].value : [];
        const brnds = results[2].status === "fulfilled" ? results[2].value : [];

        if (cats && cats.length > 0) {
          setCategories(
            cats.filter((c) => c.isActive !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          );
        }
        if (prods && prods.length > 0) {
          setProducts(
            prods.filter((p) => p.isActive !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          );
        }
        if (brnds && brnds.length > 0) {
          setBrands(brnds);
        }
      } catch (err) {
        console.error("Katalog veri yükleme hatası:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();

    const handleCategoryUpdate = () => {
      loadData();
    };
    window.addEventListener("categories-updated", handleCategoryUpdate);
    return () => window.removeEventListener("categories-updated", handleCategoryUpdate);
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
    const childCategoryIds = currentCategory
      ? categories.filter((c) => c.parentId === currentCategory.id).map((c) => c.id)
      : [];
    const childCategorySlugs = currentCategory
      ? categories.filter((c) => c.parentId === currentCategory.id).map((c) => c.slug.toLowerCase())
      : [];

    return products.filter((p) => {
      const matchCat =
        activeCategory === "all" ||
        p.categorySlug === activeCategory ||
        p.categoryId === activeCategory ||
        p.categoryId === currentCategory?.id ||
        (currentCategory && p.categoryName?.toLowerCase() === currentCategory.name.toLowerCase()) ||
        (currentCategory && p.categorySlug?.toLowerCase() === currentCategory.slug.toLowerCase()) ||
        (currentCategory && childCategoryIds.includes(p.categoryId)) ||
        (currentCategory && p.categorySlug && childCategorySlugs.includes(p.categorySlug.toLowerCase()));

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
  }, [products, activeCategory, searchQuery, currentCategory, categories]);

  const currentSubItems = (currentCategory?.slug && SUBCATEGORIES_MAP[currentCategory.slug]) || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* GSAP Animated Hero Banner */}
      <CatalogHero
        currentCategory={currentCategory ?? null}
        filteredCount={filteredProducts.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Mobile Filter Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-30 flex items-center gap-2 btn-primary shadow-gold-lg py-3 px-5 cursor-pointer"
          >
            <SlidersHorizontal size={16} /> Kategoriler & Filtre
          </button>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 rounded-2xl overflow-hidden shadow-soft-lg border border-slate-200">
              <CategorySidebar
                categories={categories}
                products={products}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                searchQuery={searchQuery}
                onBrandSearch={(brand) => {
                  setSearchQuery(brand);
                  setActiveCategory("all");
                }}
              />
            </div>
          </aside>

          {/* Mobile Sidebar Modal Drawer */}
          <AnimatePresence>
            {mobileSidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-40 flex">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                  onClick={() => setMobileSidebarOpen(false)}
                />
                <motion.div
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative w-72 overflow-y-auto z-10 shadow-2xl h-full"
                >
                  <CategorySidebar
                    categories={categories}
                    products={products}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    searchQuery={searchQuery}
                    onBrandSearch={(brand) => {
                      setSearchQuery(brand);
                      setActiveCategory("all");
                    }}
                    onClose={() => setMobileSidebarOpen(false)}
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Products Column */}
          <div className="flex-1 min-w-0">
            {/* Subcategory pills & active filter badge */}
            <CatalogFilters
              subItems={currentSubItems}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* GSAP ScrollTrigger Animated Product Grid */}
            <CatalogGrid
              products={filteredProducts}
              isLoading={isLoading}
              onClearFilters={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
            />
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
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="text-slate-500 text-sm">Katalog yükleniyor...</div>
        </div>
      }
    >
      <KatalogView />
    </Suspense>
  );
}