"use client";

import { useState, useEffect, useMemo } from "react";
import PresentationHeader from "@/components/presentation/PresentationHeader";
import PresentationGrid from "@/components/presentation/PresentationGrid";
import PresentationDetailModal from "@/components/presentation/PresentationDetailModal";
import {
  fetchPresentationCategories,
  fetchPresentationProducts,
  type PresentationProduct,
} from "@/lib/presentation-catalog-service";
import type { Category } from "@/lib/types";

export default function SunumKataloguPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<PresentationProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"editorial" | "grid">("editorial");
  const [activeModalProduct, setActiveModalProduct] = useState<PresentationProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [cats, prods] = await Promise.all([
          fetchPresentationCategories(),
          fetchPresentationProducts(),
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        console.error("Sunum kataloğu yüklenirken hata:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.isActive === false) return false;

      // Category matching
      const matchCategory =
        selectedCategory === "all" ||
        p.categoryId === selectedCategory ||
        p.categoryId?.toLowerCase() === selectedCategory.toLowerCase();

      // Search matching
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-stone-900 selection:text-white">
      {/* Editorial Header */}
      <PresentationHeader
        categories={categories}
        selectedCategoryId={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalProductsCount={products.length}
      />

      {/* Main Content Showcase */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs text-stone-500 font-mono tracking-widest uppercase">
              Özel Sunum Yükleniyor...
            </p>
          </div>
        ) : (
          <PresentationGrid
            products={filteredProducts}
            viewMode={viewMode}
            onOpenDetail={(product) => setActiveModalProduct(product)}
            onResetFilters={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
          />
        )}
      </main>

      {/* Presentation Fullscreen Detail Modal */}
      <PresentationDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </div>
  );
}
