"use client";

import { useRef } from "react";
import Link from "next/link";
import { AlignLeft, ChevronRight, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Category, Product } from "@/lib/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const BRANDS = [
  { id: "b1", name: "DaVinci Gourmet", logo: "☕" },
  { id: "b2", name: "Caffè NONNO", logo: "🍹" },
  { id: "b3", name: "CALLEI", logo: "🍫" },
  { id: "b4", name: "EASY MIX", logo: "🍸" },
  { id: "b5", name: "Krater", logo: "🍧" },
  { id: "b6", name: "Monte Cristo", logo: "🦜" },
];

interface CategorySidebarProps {
  categories: Category[];
  products: Product[];
  activeCategory: string;
  onCategoryChange: (categorySlugOrId: string) => void;
  searchQuery: string;
  onBrandSearch: (brandName: string) => void;
  onClose?: () => void;
}

export default function CategorySidebar({
  categories,
  products,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onBrandSearch,
  onClose,
}: CategorySidebarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".sidebar-item", {
        opacity: 0,
        x: -12,
        duration: 0.35,
        stagger: 0.03,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  const getCategoryProductCount = (cat: Category) => {
    const childIds = categories.filter((c) => c.parentId === cat.id).map((c) => c.id);
    const childSlugs = categories.filter((c) => c.parentId === cat.id).map((c) => c.slug.toLowerCase());

    return products.filter(
      (p) =>
        p.isActive !== false &&
        (p.categorySlug === cat.slug ||
          p.categoryId === cat.id ||
          p.categorySlug?.toLowerCase() === cat.slug.toLowerCase() ||
          p.categoryName?.toLowerCase() === cat.name.toLowerCase() ||
          childIds.includes(p.categoryId) ||
          (p.categorySlug && childSlugs.includes(p.categorySlug.toLowerCase())))
    ).length;
  };

  const parentCategories = categories.filter((cat) => !cat.parentId);

  return (
    <div
      ref={containerRef}
      className="bg-white border border-slate-200 h-full flex flex-col text-slate-700 select-none"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3.5 border-b border-slate-200 shrink-0 bg-slate-50">
        <AlignLeft size={14} className="text-amber-600" />
        <span className="text-slate-900 font-bold text-xs uppercase tracking-widest">
          Kategorilerimiz
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto text-slate-400 hover:text-slate-700 p-1"
            aria-label="Kapat"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Categories List */}
      <div className="flex-1 overflow-y-auto">
        {/* All Products button */}
        <button
          onClick={() => {
            onCategoryChange("all");
            onClose?.();
          }}
          className={`sidebar-item w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-150 border-b border-slate-100 ${
            activeCategory === "all"
              ? "bg-amber-50/70 text-amber-800 font-bold"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <span className="flex items-center gap-2">
            <span>✨</span> Tüm Ürünler
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <span
              className={`text-2xs px-1.5 py-0.5 rounded font-mono ${
                activeCategory === "all"
                  ? "bg-amber-100 text-amber-800 font-bold"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {products.length}
            </span>
            <ChevronRight size={13} className="opacity-50" />
          </span>
        </button>

        {parentCategories.map((parentCat) => {
          const children = categories.filter((c) => c.parentId === parentCat.id);
          const parentCount = getCategoryProductCount(parentCat);
          const isParentActive =
            activeCategory === parentCat.slug || activeCategory === parentCat.id;

          return (
            <div key={parentCat.id} className="border-b border-slate-100">
              {/* Ana Kategori */}
              <button
                onClick={() => {
                  onCategoryChange(parentCat.slug || parentCat.id);
                  onClose?.();
                }}
                className={`sidebar-item w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                  isParentActive
                    ? "bg-amber-50/70 text-amber-800 font-bold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="truncate text-left flex items-center gap-2">
                  {parentCat.icon && <span>{parentCat.icon}</span>}
                  <span>{parentCat.name}</span>
                </span>
                <span className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`text-2xs px-1.5 py-0.5 rounded font-mono ${
                      isParentActive
                        ? "bg-amber-100 text-amber-800 font-bold"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {parentCount}
                  </span>
                  <ChevronRight size={13} className="opacity-50" />
                </span>
              </button>

              {/* Alt Kategoriler */}
              {children.map((child) => {
                const childCount = getCategoryProductCount(child);
                const isChildActive =
                  activeCategory === child.slug || activeCategory === child.id;

                return (
                  <button
                    key={child.id}
                    onClick={() => {
                      onCategoryChange(child.slug || child.id);
                      onClose?.();
                    }}
                    className={`sidebar-item w-full flex items-center justify-between pl-8 pr-4 py-2.5 text-xs font-medium transition-colors duration-150 border-t border-slate-100 ${
                      isChildActive
                        ? "bg-amber-50/70 text-amber-800 font-bold"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    <span className="truncate text-left flex items-center gap-2">
                      {child.icon ? (
                        <span>{child.icon}</span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      )}
                      <span>{child.name}</span>
                    </span>
                    <span className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-2xs px-1.5 py-0.5 rounded font-mono ${
                          isChildActive
                            ? "bg-amber-100 text-amber-800 font-bold"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {childCount}
                      </span>
                      <ChevronRight size={11} className="opacity-40" />
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Brands section */}
      <div className="border-t border-slate-200 p-4 shrink-0 bg-slate-50">
        <p className="text-amber-700 text-2xs font-bold uppercase tracking-widest mb-3">
          Markalarımız
        </p>
        <div className="space-y-1.5">
          {BRANDS.map((brand) => (
            <button
              key={brand.id}
              onClick={() => {
                onBrandSearch(brand.name);
                onClose?.();
              }}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors duration-150 ${
                searchQuery.toLowerCase() === brand.name.toLowerCase()
                  ? "bg-amber-100/70 text-amber-800 font-bold border border-amber-300"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <span className="text-sm shrink-0">{brand.logo}</span>
              <span className="text-xs font-semibold uppercase tracking-wide truncate">
                {brand.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* B2B / Whosale Callout */}
      <div className="p-4 border-t border-slate-200 shrink-0 bg-white">
        <p className="font-heading font-semibold text-slate-900 text-xs mb-1">
          Toplu Sipariş & Teklif
        </p>
        <p className="text-slate-500 text-2xs mb-3">
          Özel toptan fiyatlandırma için bizimle iletişime geçin.
        </p>
        <Link
          href="/iletisim"
          className="btn-primary py-2 w-full text-xs justify-center shadow-gold text-center block"
        >
          Teklif Al
        </Link>
      </div>
    </div>
  );
}
