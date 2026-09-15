"use client";

import Image from "next/image";
import { Sparkles, ArrowRight, Layers } from "lucide-react";
import type { Category } from "@/lib/types";

const CATEGORY_BG_MAP: Record<string, string> = {
  "suruplar": "/resimler/katalog/suruplar.jpg",
  "pureler": "/resimler/katalog/pureler.jpg",
  "waffle-malzemeleri": "/resimler/katalog/waffle.jpg",
  "waffle": "/resimler/katalog/waffle.jpg",
  "kokteyller": "/resimler/katalog/kokteyller.jpg",
  "bar-sos": "/resimler/katalog/bar-sos.jpg",
  "pastalar": "/resimler/katalog/taze-pastalar.jpg",
  "taze-butik-pastalar": "/resimler/katalog/taze-pastalar.jpg",
  "donuk-pasta": "/resimler/katalog/donuk-pastalar.jpg",
  "kremali-urunler": "/resimler/katalog/kremali.jpg",
  "kruvasan": "/resimler/kategoriler/kruvasan.jpg",
  "kasa-onu-urunler": "/resimler/kategoriler/kasa-onu-urunler.jpg",
  "ekipmanlar": "/resimler/kategoriler/ekipmanlar.jpg",
};

interface PresentationCategoryCardProps {
  category: Category;
  productCount: number;
  index: number;
  onClick: () => void;
}

export default function PresentationCategoryCard({
  category,
  productCount,
  index,
  onClick,
}: PresentationCategoryCardProps) {
  const sectionNumber = String(index + 1).padStart(2, "0");
  const bgImage =
    CATEGORY_BG_MAP[category.slug || ""] ||
    CATEGORY_BG_MAP[category.id || ""] ||
    category.imageUrl ||
    "/resimler/katalog/kapak.jpg";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      className="group relative w-full h-[280px] sm:h-[320px] rounded-3xl overflow-hidden cursor-pointer select-none border border-stone-200/90 hover:border-amber-500/60 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-6 sm:p-8"
    >
      {/* ── Arka Plan Görseli & Aydınlık Gradyan ── */}
      <div className="absolute inset-0 bg-stone-900">
        <Image
          src={bgImage}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={90}
          className="object-cover object-center opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-700 ease-out"
        />
        {/* Zarif ve Aydınlık Karartma Katmanı (Resmin net görünmesini sağlar) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-500" />
      </div>

      {/* ── Üst Bilgi Barı: Bölüm No & Adet ── */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 text-amber-300 border border-amber-400/40 text-[11px] font-mono font-bold tracking-widest uppercase backdrop-blur-md drop-shadow-sm">
          <Sparkles size={11} className="text-amber-400" />
          <span>Koleksiyon {sectionNumber}</span>
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 text-white text-xs font-mono font-medium backdrop-blur-md border border-white/20 drop-shadow-sm">
          <Layers size={12} className="text-amber-300" />
          <span>{productCount} Çeşit</span>
        </span>
      </div>

      {/* ── Alt Bilgi: Başlık, Açıklama ve Giriş Aksiyonu ── */}
      <div className="relative z-10 flex flex-col justify-end">
        <div className="relative z-10 flex items-center gap-2.5 mb-2">
          {category.icon && (
            <span className="text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {category.icon}
            </span>
          )}
          <h2
            style={{ color: "#ffffff" }}
            className="relative z-10 text-2xl sm:text-3xl font-serif font-bold !text-white tracking-tight drop-shadow-lg drop-shadow-[0_4px_14px_rgba(0,0,0,0.98)] shadow-black"
          >
            {category.name}
          </h2>
        </div>

        {category.description && (
          <p
            style={{ color: "#f8fafc" }}
            className="relative z-10 text-xs sm:text-sm !text-white font-sans leading-relaxed mb-5 max-w-xl line-clamp-2 drop-shadow-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
          >
            {category.description}
          </p>
        )}

        <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/30 backdrop-blur-[2px]">
          <span
            style={{ color: "#f1f5f9" }}
            className="text-xs !text-white/90 font-mono drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
          >
            Horeca & Barista Seçkisi
          </span>

          <div className="inline-flex items-center gap-2 text-xs font-semibold !text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            <span>Koleksiyonu Keşfet</span>
            <ArrowRight size={15} />
          </div>
        </div>
      </div>
    </div>
  );
}
