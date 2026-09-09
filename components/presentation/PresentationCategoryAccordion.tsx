"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Layers } from "lucide-react";
import PresentationProductCard from "./PresentationProductCard";
import type { Category } from "@/lib/types";
import type { PresentationProduct } from "@/lib/presentation-catalog-service";

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

interface PresentationCategoryAccordionProps {
  category: Category;
  products: PresentationProduct[];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  onOpenDetail: (product: PresentationProduct) => void;
}

export default function PresentationCategoryAccordion({
  category,
  products,
  index,
  isOpen,
  onToggle,
  onOpenDetail,
}: PresentationCategoryAccordionProps) {
  const sectionNumber = String(index + 1).padStart(2, "0");
  const bgImage =
    CATEGORY_BG_MAP[category.slug || ""] ||
    CATEGORY_BG_MAP[category.id || ""] ||
    category.imageUrl ||
    "/resimler/katalog/kapak.jpg";

  return (
    <div
      id={`section-${category.slug || category.id}`}
      className="scroll-mt-24 border-b border-stone-200/70 last:border-b-0 py-5 sm:py-6"
    >
      {/* ── 1. Resimli Kategori Kartı (Accordion Tetikleyici) ───────────── */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onToggle()}
        className={`group relative w-full rounded-3xl overflow-hidden cursor-pointer select-none transition-all duration-300 border ${
          isOpen
            ? "border-stone-900 shadow-xl ring-2 ring-stone-900/10"
            : "border-stone-200/90 hover:border-stone-400 hover:shadow-lg"
        }`}
      >
        {/* Arka Plan Görseli & Gradyan */}
        <div className="absolute inset-0 bg-stone-900">
          <Image
            src={bgImage}
            alt={category.name}
            fill
            sizes="100vw"
            quality={85}
            className={`object-cover object-center transition-transform duration-700 ease-out ${
              isOpen ? "scale-105 opacity-40" : "opacity-50 group-hover:scale-105 group-hover:opacity-40"
            }`}
          />
          {/* Lüks Karartma & Dokusal Gradyan */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        </div>

        {/* Kart İçi İçerik */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 min-h-[160px] sm:min-h-[180px]">
          <div className="max-w-2xl">
            {/* Numara ve Meta */}
            <div className="flex items-center gap-3 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-mono font-bold tracking-widest uppercase">
                <Sparkles size={10} />
                <span>Bölüm {sectionNumber}</span>
              </span>
              <span className="text-stone-300 text-xs font-mono">
                {products.length} Çeşit Ürün
              </span>
            </div>

            {/* Kategori Başlığı */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight flex items-center gap-3">
              {category.icon && <span className="text-2xl sm:text-3xl">{category.icon}</span>}
              <span>{category.name}</span>
            </h2>

            {/* Kategori Açıklaması */}
            {category.description && (
              <p className="text-xs sm:text-sm text-stone-200/90 mt-2 line-clamp-2 font-sans leading-relaxed">
                {category.description}
              </p>
            )}
          </div>

          {/* Sağ Aksiyon: Çekmece Durum Butonu */}
          <div className="flex items-center gap-4 shrink-0 self-start md:self-center">
            <div
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                isOpen
                  ? "bg-amber-400 text-stone-950 shadow-md"
                  : "bg-white/15 text-white backdrop-blur-md group-hover:bg-white/25"
              }`}
            >
              <span>{isOpen ? "Ürünleri Kapat" : "Ürünleri İncele"}</span>
            </div>

            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 shadow-md ${
                isOpen
                  ? "bg-amber-400 text-stone-950 rotate-180"
                  : "bg-white/20 text-white backdrop-blur-md group-hover:bg-white group-hover:text-stone-900"
              }`}
            >
              <ChevronDown size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Çekmece (Accordion) Açılır Ürün Izgarası ───────────────── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="drawer-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-8 pb-4">
              {/* Çekmece İçi Başlık Şeridi */}
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-200">
                <div className="flex items-center gap-2 text-xs font-serif text-stone-700">
                  <Layers size={14} className="text-amber-700" />
                  <span className="font-semibold">{category.name} Koleksiyonu Ürün Listesi</span>
                </div>
                <span className="text-2xs text-stone-400 font-mono">
                  {products.length} Ürün Listeleniyor
                </span>
              </div>

              {/* Ürün Kartları Izgarası (3 Kolonlu) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {products.map((product, pIdx) => (
                  <PresentationProductCard
                    key={product.id}
                    product={product}
                    index={pIdx}
                    onOpenDetail={onOpenDetail}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
