"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronRight, Search, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Category } from "@/lib/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface CatalogHeroProps {
  currentCategory: Category | null;
  filteredCount: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function CatalogHero({
  currentCategory,
  filteredCount,
  searchQuery,
  onSearchChange,
}: CatalogHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-breadcrumb", {
        opacity: 0,
        y: -10,
        duration: 0.4,
      })
        .from(
          ".hero-title-group",
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.2"
        )
        .from(
          ".hero-search",
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.45,
          },
          "-=0.3"
        );
    },
    { scope: containerRef, dependencies: [currentCategory?.id] }
  );

  return (
    <div ref={containerRef} className="bg-white pt-8 pb-10 border-b border-slate-200">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="hero-breadcrumb flex items-center gap-2 text-slate-500 text-xs mb-6">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight size={12} />
          <Link
            href="/katalog"
            className={`hover:text-amber-600 transition-colors ${
              !currentCategory ? "text-slate-800 font-semibold" : ""
            }`}
          >
            Katalog
          </Link>
          {currentCategory && (
            <>
              <ChevronRight size={12} />
              <span className="text-amber-700 font-bold">{currentCategory.name}</span>
            </>
          )}
        </div>

        {/* Header content & Search */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
          <div className="hero-title-group">
            <p className="text-amber-700 text-xs font-bold uppercase tracking-widest mb-2">
              {currentCategory ? "Kategori" : "Dijital Ürün Kataloğu"}
            </p>
            <h1 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl">
              {currentCategory ? currentCategory.name : "Tüm Ürünler"}
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              <span className="font-semibold text-slate-700">{filteredCount}</span> ürün listeleniyor
              {currentCategory?.description && ` — ${currentCategory.description}`}
            </p>
          </div>

          <div className="hero-search relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-600" />
            <input
              type="text"
              placeholder="Ürün, marka veya tat ara..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-9 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                aria-label="Aramayı temizle"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
