"use client";

import { Search, LayoutGrid, BookOpen, X } from "lucide-react";
import type { Category } from "@/lib/types";

interface PresentationHeaderProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: "editorial" | "grid";
  onViewModeChange: (mode: "editorial" | "grid") => void;
  totalProductsCount: number;
}

export default function PresentationHeader({
  categories,
  selectedCategoryId,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  totalProductsCount,
}: PresentationHeaderProps) {
  return (
    <header className="border-b border-stone-200/80 bg-stone-50/80 backdrop-blur-md sticky top-0 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        {/* Top bar: Brand & View Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200/60">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-stone-900 text-stone-100 text-[11px] font-medium tracking-widest uppercase mb-2">
              Özel Müşteri Sunumu
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
              Küratörlü Ürün Seçkisi
            </h1>
            <p className="text-sm text-stone-500 font-sans mt-1.5 max-w-xl leading-relaxed">
              İşletmeniz için özel olarak derlenmiş; üstün tat profilleri, zanaatkar işçilik ve profesyonel reçete çözümleri.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            {/* View Mode Toggle */}
            <div className="inline-flex p-1 bg-stone-200/70 rounded-xl border border-stone-300/40">
              <button
                type="button"
                onClick={() => onViewModeChange("editorial")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === "editorial"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
                title="Dergi / Lookbook Görünümü"
              >
                <BookOpen size={14} />
                <span className="hidden sm:inline">Dergi Stili</span>
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
                title="Izgara Görünümü"
              >
                <LayoutGrid size={14} />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-44 sm:w-60">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Seçkide ara..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-8 pr-8 py-2 bg-white/90 border border-stone-300/70 rounded-xl text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-800 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Categories Navigation Bar */}
        <div className="pt-4 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
              selectedCategoryId === "all"
                ? "bg-stone-900 text-white shadow-sm"
                : "bg-transparent text-stone-600 hover:bg-stone-200/50 hover:text-stone-900"
            }`}
          >
            Tüm Koleksiyon ({totalProductsCount})
          </button>

          {categories.map((category) => {
            const isSelected = selectedCategoryId === category.id || selectedCategoryId === category.slug;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                  isSelected
                    ? "bg-stone-900 text-white shadow-sm"
                    : "bg-transparent text-stone-600 hover:bg-stone-200/50 hover:text-stone-900"
                }`}
              >
                {category.icon && <span>{category.icon}</span>}
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
