"use client";

/**
 * ProductCard component — displays product image, name, code,
 * category badge, price (for logged-in users), specs, and a "Fiyat Sorunuz" button.
 * Fully optimized for responsive 5-column catalog grids.
 * Includes lightbox modal for full-size image preview.
 */
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Tag, Eye, ImageIcon, X, ZoomIn } from "lucide-react";
import { type Product } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";
import InquiryModal from "@/components/InquiryModal";

interface ProductCardProps {
  product: Product;
  /** Animation delay index for stagger effect */
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { currentUser } = useAuth();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          delay: Math.min((index % 10) * 0.04, 0.4),
          ease: [0.16, 1, 0.3, 1],
        }}
        className="product-card group flex flex-col h-full bg-[#1B1D23] rounded-xl border border-[#282C36] overflow-hidden hover:border-gold/50 hover:shadow-card-hover transition-all duration-200"
      >
        {/* Image */}
        <div className="img-zoom-container aspect-square relative bg-[#16181D] shrink-0 overflow-hidden">
          <Link href={`/urun/${product.id}`} className="block absolute inset-0">
            {!imgError && product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                quality={85}
                loading={index < 8 ? "eager" : "lazy"}
                className="object-contain p-2.5 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1440px) 25vw, 20vw"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#21242C]">
                <div className="text-center p-3">
                  <ImageIcon size={28} className="text-slate-500 mx-auto" />
                  <p className="text-slate-400 text-2xs mt-1 truncate">{product.categoryName}</p>
                </div>
              </div>
            )}
          </Link>

          {/* Hover overlay — İncele linki */}
          <div className="absolute inset-0 bg-[#0D0E11]/0 group-hover:bg-[#0D0E11]/25 transition-colors duration-200 flex items-center justify-center pointer-events-none">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Link
                href={`/urun/${product.id}`}
                className="pointer-events-auto bg-[#1B1D23]/95 text-gold border border-gold/40 text-2xs font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1"
              >
                <Eye size={11} /> İncele
              </Link>
            </div>
          </div>

          {/* Lightbox zoom button */}
          {!imgError && product.imageUrl && (
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 bg-[#1B1D23]/90 hover:bg-gold text-gold hover:text-[#0D0E11] border border-gold/40 rounded-lg"
              title="Görseli büyüt"
            >
              <ZoomIn size={13} />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between bg-[#1B1D23]">
          <div>
            {/* Category / Brand Badge */}
            <div className="flex items-center gap-1 mb-1">
              <Tag size={10} className="text-gold shrink-0" />
              <span className="text-[10px] text-gold font-bold uppercase tracking-wider truncate">
                {product.codeGroup || product.categoryName}
              </span>
            </div>

            {/* Name */}
            <Link href={`/urun/${product.id}`}>
              <h3 className="font-heading font-semibold text-slate-100 text-xs sm:text-sm leading-snug line-clamp-2 hover:text-gold transition-colors mb-1">
                {product.name}
              </h3>
            </Link>

            {/* Product code */}
            <p className="text-slate-400 text-[10px] font-mono mb-2 tracking-wider">
              {product.code}
            </p>

            {/* Price display (for logged-in users) */}
            {currentUser && product.price > 0 && (
              <div className="mb-2">
                <p className="font-heading font-bold text-white text-sm sm:text-base">
                  ₺{product.price.toFixed(2)}
                  <span className="text-slate-400 text-[10px] font-normal ml-1">
                    +%{product.vatRate} KDV
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-2 pt-2 border-t border-[#282C36]">
            <button
              onClick={() => setInquiryOpen(true)}
              className="btn-primary w-full text-2xs sm:text-xs py-2 px-2 justify-center gap-1.5 font-bold rounded-lg shadow-sm hover:shadow-gold"
            >
              <MessageCircle size={13} className="shrink-0" />
              <span>Fiyat Sorunuz</span>
            </button>
          </div>
        </div>
      </motion.div>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        product={product}
      />

      {/* ── Lightbox Modal ──────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && product.imageUrl && !imgError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-3xl w-full bg-[#16181D] rounded-2xl border border-[#282C36] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-3 right-3 z-10 p-2 bg-[#1B1D23]/90 hover:bg-[#282C36] text-slate-300 hover:text-white rounded-xl border border-[#282C36] transition-colors"
              >
                <X size={18} />
              </button>

              {/* Image */}
              <div className="relative w-full aspect-square max-h-[80vh]">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  quality={95}
                  sizes="90vw"
                  className="object-contain p-6"
                  priority
                />
              </div>

              {/* Caption */}
              <div className="px-5 py-3 border-t border-[#282C36] bg-[#1B1D23]">
                <p className="font-heading font-semibold text-white text-sm truncate">{product.name}</p>
                <p className="text-slate-400 text-xs font-mono mt-0.5">{product.code}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
