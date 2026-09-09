"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { PresentationProduct } from "@/lib/presentation-catalog-service";

interface PresentationCardProps {
  product: PresentationProduct;
  index: number;
  viewMode: "editorial" | "grid";
  onOpenDetail: (product: PresentationProduct) => void;
}

export default function PresentationCard({
  product,
  index,
  viewMode,
  onOpenDetail,
}: PresentationCardProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  if (viewMode === "editorial") {
    return (
      <article className="group bg-white rounded-3xl border border-stone-200/80 overflow-hidden hover:border-stone-400/80 transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/40 flex flex-col md:flex-row">
        {/* Visual Showcase Side */}
        <div className="relative w-full md:w-5/12 aspect-[4/3] md:aspect-auto min-h-[300px] md:min-h-[380px] bg-stone-100 overflow-hidden flex items-center justify-center p-8">
          {product.badge && (
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/90 backdrop-blur-md text-stone-100 text-[11px] font-medium tracking-wider">
              <Sparkles size={11} className="text-amber-400" />
              <span>{product.badge}</span>
            </div>
          )}
          <span className="absolute bottom-4 left-4 z-10 font-mono text-stone-400 text-xs tracking-widest">
            № {formattedIndex}
          </span>

          <div className="relative w-full h-full">
            <Image
              src={product.imageUrl || "/resimler/logo.png"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        </div>

        {/* Narrative & Specifications Side */}
        <div className="w-full md:w-7/12 p-8 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                {product.categoryName || "Küratör Seçkisi"}
              </span>
              <span className="text-stone-900 font-serif font-medium text-lg">
                {product.price > 0 ? `₺${product.price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}` : "Özel Fiyat"}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif text-stone-900 tracking-tight leading-snug mb-4">
              {product.name}
            </h3>

            {/* Tanıtım Metni (Cezbedici Anlatım) */}
            <p className="text-stone-600 text-sm leading-relaxed font-sans mb-6 text-pretty">
              {product.description}
            </p>
          </div>

          <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-400 font-mono">
              Yirmikirbes Horeca Collection
            </span>

            <button
              type="button"
              onClick={() => onOpenDetail(product)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-stone-900 hover:text-amber-700 transition-colors py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              <span>Sunum Kartını Aç</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Grid Mode (Modern Minimal Lookbook Card)
  return (
    <article className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden hover:border-stone-400/80 transition-all duration-300 hover:shadow-lg flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-square bg-stone-100 p-6 flex items-center justify-center overflow-hidden">
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-900/90 text-stone-100 text-[10px] font-medium tracking-wider">
            <Sparkles size={10} className="text-amber-400" />
            <span>{product.badge}</span>
          </div>
        )}
        <span className="absolute bottom-3 right-3 z-10 font-mono text-stone-400 text-[10px] tracking-widest">
          № {formattedIndex}
        </span>

        <div className="relative w-full h-full">
          <Image
            src={product.imageUrl || "/resimler/logo.png"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider text-amber-700 text-[11px]">
              {product.categoryName}
            </span>
            <span className="font-serif font-medium text-stone-900">
              {product.price > 0 ? `₺${product.price.toFixed(2)}` : "—"}
            </span>
          </div>

          <h3 className="text-base font-serif text-stone-900 leading-snug line-clamp-2 mb-3">
            {product.name}
          </h3>

          <p className="text-stone-500 text-xs leading-relaxed line-clamp-3 mb-4">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-stone-100">
          <button
            type="button"
            onClick={() => onOpenDetail(product)}
            className="w-full py-2.5 px-3 rounded-xl bg-stone-50 hover:bg-stone-900 hover:text-white text-stone-800 text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
          >
            <span>Detay & Sunum</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}
