"use client";

/**
 * ProductCard component — displays product image, name, code,
 * category badge, price (for logged-in users), specs, and a "Fiyat Sorunuz" button.
 * Fully optimized for responsive 5-column catalog grids.
 */
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Tag, Eye, ImageIcon } from "lucide-react";
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
        className="product-card group flex flex-col h-full bg-white rounded-xl border border-border overflow-hidden hover:border-gold-300 hover:shadow-soft-md transition-all duration-200"
      >
        {/* Image */}
        <Link href={`/urun/${product.id}`} className="block img-zoom-container aspect-square relative bg-cream-100 shrink-0 overflow-hidden">
          {!imgError && product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              quality={85}
              loading={index < 8 ? "eager" : "lazy"}
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1440px) 25vw, 20vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-cream-200">
              <div className="text-center p-3">
                <ImageIcon size={28} className="text-charcoal-300 mx-auto" />
                <p className="text-charcoal-400 text-2xs mt-1 truncate">{product.categoryName}</p>
              </div>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/15 transition-colors duration-200 flex items-center justify-center pointer-events-none">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="bg-white/95 text-charcoal-900 text-2xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Eye size={11} /> İncele
              </span>
            </div>
          </div>
        </Link>

        {/* Body */}
        <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
          <div>
            {/* Category / Brand Badge */}
            <div className="flex items-center gap-1 mb-1">
              <Tag size={10} className="text-gold-500 shrink-0" />
              <span className="text-[10px] text-gold-700 font-semibold uppercase tracking-wider truncate">
                {product.codeGroup || product.categoryName}
              </span>
            </div>

            {/* Name */}
            <Link href={`/urun/${product.id}`}>
              <h3 className="font-heading font-semibold text-charcoal-800 text-xs sm:text-sm leading-snug line-clamp-2 hover:text-gold-600 transition-colors mb-1">
                {product.name}
              </h3>
            </Link>

            {/* Product code */}
            <p className="text-charcoal-400 text-[10px] font-mono mb-2 tracking-wider">
              {product.code}
            </p>

            {/* Price display (for logged-in users) */}
            {currentUser && product.price > 0 && (
              <div className="mb-2">
                <p className="font-heading font-bold text-charcoal-800 text-sm sm:text-base">
                  ₺{product.price.toFixed(2)}
                  <span className="text-charcoal-400 text-[10px] font-normal ml-1">
                    +%{product.vatRate} KDV
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-2 pt-2 border-t border-cream-200/80">
            <button
              onClick={() => setInquiryOpen(true)}
              className="btn-primary w-full text-2xs sm:text-xs py-2 px-2 justify-center gap-1.5 font-medium rounded-lg"
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
    </>
  );
}
