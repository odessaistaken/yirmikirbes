"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles, MessageCircle } from "lucide-react";
import type { PresentationProduct } from "@/lib/presentation-catalog-service";

interface PresentationProductCardProps {
  product: PresentationProduct;
  index: number;
  onOpenDetail: (product: PresentationProduct) => void;
}

export default function PresentationProductCard({
  product,
  index,
  onOpenDetail,
}: PresentationProductCardProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  const handleQuickWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Merhaba, Özel Sunum Kataloğunuzdaki "${product.name}" hakkında toptan fiyat ve numune bilgisi almak istiyorum.`;
    window.open(`https://wa.me/905324546440?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <article
      onClick={() => onOpenDetail(product)}
      className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden hover:border-stone-400/90 transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/40 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Visual Showcase */}
        <div className="relative aspect-square bg-stone-50 overflow-hidden flex items-center justify-center p-6 border-b border-stone-100">
          {product.badge && (
            <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-900 text-stone-100 text-[10px] font-medium tracking-wide shadow-sm">
              <Sparkles size={10} className="text-amber-400" />
              <span>{product.badge}</span>
            </div>
          )}

          <span className="absolute bottom-3.5 right-3.5 z-10 font-mono text-stone-300 text-[11px] tracking-widest group-hover:text-stone-500 transition-colors">
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

        {/* Narrative & Info */}
        <div className="p-6">
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700">
              {product.categoryName || "Küratör Seçkisi"}
            </span>
            <span className="text-stone-900 font-serif font-semibold text-base">
              {product.price > 0 ? `₺${product.price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}` : "Özel Teklif"}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-serif text-stone-900 tracking-tight leading-snug mb-3 group-hover:text-amber-800 transition-colors">
            {product.name}
          </h3>

          {/* Tanıtım Metni (Cezbedici Açıklama) */}
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans text-pretty">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer Action */}
      <div className="px-6 pb-6 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleQuickWhatsApp}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:text-[#1eb956] transition-colors"
          title="WhatsApp ile Fiyat & Numune İste"
        >
          <MessageCircle size={14} />
          <span>Fiyat Sor</span>
        </button>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
          <span>Sunum Kartı</span>
          <ArrowUpRight size={14} />
        </span>
      </div>
    </article>
  );
}
