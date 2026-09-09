"use client";

import { useState, useEffect } from "react";
import { Search, X, ChevronDown, ArrowUp } from "lucide-react";
import type { Category } from "@/lib/types";

interface PresentationSectionNavProps {
  categories: Category[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeSectionId: string;
}

export default function PresentationSectionNav({
  categories,
  searchQuery,
  onSearchChange,
  activeSectionId,
}: PresentationSectionNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 180);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      const yOffset = -90; // sticky nav offset
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/80 py-3"
          : "bg-[#FAF9F6] border-b border-stone-200/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Quick Jump Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 scroll-smooth flex-1">
            <button
              type="button"
              onClick={scrollToTop}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors"
            >
              En Başa Dön
            </button>

            {categories.map((cat) => {
              const isActive = activeSectionId === cat.id || activeSectionId === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => scrollToSection(cat.slug || cat.id)}
                  className={`shrink-0 flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? "bg-stone-900 text-white font-semibold shadow-sm"
                      : "bg-stone-200/60 text-stone-700 hover:bg-stone-300/80 hover:text-stone-950"
                  }`}
                >
                  {cat.icon && <span className="text-xs">{cat.icon}</span>}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-56 shrink-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Tüm ürünlerde ara..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-8 py-1.5 bg-white border border-stone-300/80 rounded-full text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all shadow-2xs"
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
    </div>
  );
}
