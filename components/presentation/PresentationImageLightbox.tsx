"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Sparkles, MessageCircle } from "lucide-react";
import type { PresentationProduct } from "@/lib/presentation-catalog-service";

interface PresentationImageLightboxProps {
  product: PresentationProduct | null;
  onClose: () => void;
}

export default function PresentationImageLightbox({
  product,
  onClose,
}: PresentationImageLightboxProps) {
  // ESC tuşuna basıldığında Lightbox'ı kapat
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, handleKeyDown]);

  if (!product) return null;

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Merhaba, Özel Sunum Kataloğunuzdaki "${product.name}" hakkında görsel detayları ve toptan teklif almak istiyorum.`;
    window.open(`https://wa.me/905324546440?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10">
        {/* ── Karartılmış Arka Plan (Backdrop) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/90 backdrop-blur-xl transition-all cursor-zoom-out"
          title="Kapatmak için tıklayın"
        />

        {/* ── Üst Kapatma Butonu ve Bilgi ── */}
        <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-60 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            aria-label="Kapat"
          >
            <X size={18} />
            <span className="hidden sm:inline">Kapat (ESC)</span>
          </button>
        </div>

        {/* ── Lightbox İçerik Penceresi ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-55 flex flex-col items-center max-w-5xl w-full max-h-[92vh] select-none"
        >
          {/* Büyük Görsel Alanı */}
          <div className="relative w-full aspect-square max-w-[620px] sm:max-w-[700px] max-h-[65vh] bg-stone-900/60 rounded-3xl border border-white/15 overflow-hidden flex items-center justify-center p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-medium backdrop-blur-md">
                <Sparkles size={12} className="text-amber-400" />
                <span>{product.badge}</span>
              </div>
            )}

            <div className="relative w-full h-full">
              <Image
                src={product.imageUrl || "/resimler/logo.png"}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 90vw, 800px"
                quality={100}
                priority
                className="object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Görsel Altı Açıklama ve Detay Kartı */}
          <div className="mt-4 w-full max-w-[620px] sm:max-w-[700px] bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-amber-300">
                  {product.categoryName || "Özel Koleksiyon"}
                </span>
                {product.code && (
                  <span className="text-[10px] text-stone-400 font-mono">
                    • {product.code}
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-serif font-bold text-white truncate">
                {product.name}
              </h3>

              {product.description && (
                <p className="text-xs text-stone-300 line-clamp-1 font-sans mt-0.5">
                  {product.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
              <span className="text-base sm:text-lg font-serif font-bold text-amber-300">
                {product.price > 0
                  ? `₺${product.price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}`
                  : "Özel Teklif"}
              </span>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                <MessageCircle size={14} />
                <span>Teklif İste</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
