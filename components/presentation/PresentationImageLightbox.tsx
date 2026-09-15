"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, MessageCircle } from "lucide-react";
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-3 overflow-hidden">
        {/* ── Karartılmış Arka Plan (Backdrop) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/92 backdrop-blur-2xl transition-all cursor-zoom-out"
          title="Kapatmak için boşluğa tıklayın"
        />

        {/* ── Üst Kapatma Butonu (Fixed Floating) ── */}
        <div className="fixed top-3 sm:top-6 right-3 sm:right-6 z-70 flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/85 text-white text-xs font-semibold backdrop-blur-md border border-white/25 transition-all cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
            aria-label="Kapat"
          >
            <X size={18} />
            <span className="hidden sm:inline">Kapat (ESC)</span>
          </button>
        </div>

        {/* ── Devasa Lightbox Görsel Kapsayıcısı (max-w-[95vw] ve max-h-[90vh]) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-55 flex items-center justify-center w-full max-w-[95vw] h-full max-h-[90vh] select-none p-0"
        >
          {/* Rozet */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/25 text-amber-300 border border-amber-400/40 text-xs font-medium backdrop-blur-md shadow-lg">
              <Sparkles size={12} className="text-amber-400" />
              <span>{product.badge}</span>
            </div>
          )}

          {/* Dev Boyutlu Görsel Kutusu: Boşluklar sıfırlandı, object-contain ile tüm viewport'a yayılır */}
          <div className="relative flex items-center justify-center w-full max-w-[95vw] max-h-[90vh] p-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl || "/resimler/logo.png"}
              alt={product.name}
              className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.98)] select-none pointer-events-auto"
            />
          </div>
        </motion.div>

        {/* ── Alt Yüzen Bilgi ve Sipariş Barı (Floating Bar) ── */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-60 bg-black/85 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-3 text-white max-w-[92vw] sm:max-w-2xl w-full flex items-center justify-between gap-4 shadow-2xl"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-amber-300">
                {product.categoryName || "Özel Koleksiyon"}
              </span>
              {product.code && (
                <span className="text-[10px] text-stone-400 font-mono">
                  • {product.code}
                </span>
              )}
            </div>

            <h3 className="text-sm sm:text-base font-serif font-bold text-white truncate">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm sm:text-base font-serif font-bold text-amber-300">
              {product.price > 0
                ? `₺${product.price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}`
                : "Özel Teklif"}
            </span>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <MessageCircle size={14} />
              <span className="hidden sm:inline">Teklif İste</span>
            </button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
