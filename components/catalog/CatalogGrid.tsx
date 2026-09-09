"use client";

import { useRef } from "react";
import { Filter } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProductCard from "@/components/ProductCard";
import ProductSkeletonGrid from "./ProductSkeletonGrid";
import type { Product } from "@/lib/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface CatalogGridProps {
  products: Product[];
  isLoading?: boolean;
  onClearFilters: () => void;
}

export default function CatalogGrid({
  products,
  isLoading = false,
  onClearFilters,
}: CatalogGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isLoading || products.length === 0) return;

      const items = gsap.utils.toArray<HTMLElement>(".catalog-grid-item");
      if (!items.length) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [products, isLoading] }
  );

  if (isLoading) {
    return <ProductSkeletonGrid count={10} />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="font-heading font-semibold text-slate-900 text-lg mb-2">
          Ürün bulunamadı
        </h3>
        <p className="text-slate-500 text-sm mb-6 max-w-sm">
          Arama veya kategori kriterlerinizi değiştirerek tekrar deneyin.
        </p>
        <button
          type="button"
          onClick={onClearFilters}
          className="btn-gold-outline flex items-center gap-2 cursor-pointer"
        >
          <Filter size={15} /> Filtreleri Temizle
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4.5">
        {products.map((product, i) => (
          <div key={product.id} className="catalog-grid-item h-full">
            <ProductCard product={product} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
