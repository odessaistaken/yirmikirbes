"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, MessageCircle, Share2 } from "lucide-react";
import type { PresentationProduct } from "@/lib/presentation-catalog-service";

interface PresentationDetailModalProps {
  product: PresentationProduct | null;
  onClose: () => void;
}

export default function PresentationDetailModal({
  product,
  onClose,
}: PresentationDetailModalProps) {
  if (!product) return null;

  const handleWhatsApp = () => {
    const text = `Merhaba, Özel Sunum Kataloğunuzdaki "${product.name}" ürünü hakkında detaylı bilgi ve toptan teklif almak istiyorum.`;
    window.open(`https://wa.me/905324546440?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-stone-200 shadow-2xl flex flex-col md:flex-row overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            aria-label="Kapat"
          >
            <X size={18} />
          </button>

          {/* Left: Product Visual */}
          <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto min-h-[320px] bg-stone-100 p-10 flex items-center justify-center">
            {product.badge && (
              <div className="absolute top-6 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-stone-100 text-xs font-medium">
                <Sparkles size={12} className="text-amber-400" />
                <span>{product.badge}</span>
              </div>
            )}
            <div className="relative w-full h-full max-h-[400px]">
              <Image
                src={product.imageUrl || "/resimler/logo.png"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={95}
                className="object-contain"
              />
            </div>
          </div>

          {/* Right: Product Narrative */}
          <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                  {product.categoryName || "Seçkin Koleksiyon"}
                </span>
                <span className="text-stone-900 font-serif font-medium text-2xl">
                  {product.price > 0 ? `₺${product.price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}` : "Özel Teklif"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 tracking-tight leading-snug mb-5">
                {product.name}
              </h2>

              <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed font-sans mb-8">
                <p className="text-stone-800 font-medium leading-relaxed">
                  {product.description}
                </p>
                <p className="text-xs text-stone-400 leading-relaxed pt-2 border-t border-stone-100">
                  Profesyonel işletmeler, oteller ve kafeler için optimize edilmiş reçete uyumu ve üstün raf ömrü standartları.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex-1 py-3 px-5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-stone-900/10"
              >
                <MessageCircle size={16} />
                <span>Toptan Teklif & Numune İste</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-5 rounded-2xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-medium text-xs sm:text-sm transition-all"
              >
                Kapat
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
