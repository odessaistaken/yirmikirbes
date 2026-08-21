"use client";

/**
 * ProductCard component — displays product image, name, code,
 * category badge, price (for logged-in users), and a "Fiyat Sorunuz" button.
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
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: index * 0.06,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="product-card group"
      >
        {/* Image */}
        <Link href={`/urun/${product.id}`} className="block img-zoom-container aspect-product relative bg-cream-200">
          {!imgError && product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              quality={95}
              className="object-cover transition-transform duration-400"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-cream-200">
              <div className="text-center">
                <ImageIcon size={32} className="text-charcoal-300 mx-auto" />
                <p className="text-charcoal-400 text-xs mt-2">{product.categoryName}</p>
              </div>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="bg-white/90 text-charcoal-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Eye size={12} />
                Detayları Gör
              </span>
            </div>
          </div>
        </Link>

        {/* Body */}
        <div className="p-4">
          {/* Category badge */}
          <div className="flex items-center gap-1.5 mb-2">
            <Tag size={11} className="text-gold-500" />
            <span className="text-2xs text-gold-600 font-semibold uppercase tracking-wider">
              {product.categoryName}
            </span>
          </div>

          {/* Name */}
          <Link href={`/urun/${product.id}`}>
            <h3 className="font-heading font-semibold text-charcoal-800 text-sm leading-snug mb-1 line-clamp-2 hover:text-gold-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Product code */}
          <p className="text-charcoal-400 text-2xs font-mono mb-3 tracking-wide">
            {product.code}
          </p>

          {/* Price display (for logged-in users) */}
          {currentUser && product.price > 0 ? (
            <div className="mb-3">
              <p className="font-heading font-bold text-charcoal-800 text-lg">
                ₺{product.price.toFixed(2)}
                <span className="text-charcoal-400 text-xs font-normal ml-1">
                  +%{product.vatRate} KDV
                </span>
              </p>
            </div>
          ) : (
            /* Specs strip (if available and no price shown) */
            product.specs && Object.keys(product.specs).length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {Object.entries(product.specs)
                  .slice(0, 2)
                  .map(([key, val]) => (
                    <span
                      key={key}
                      className="text-2xs bg-cream-200 text-charcoal-500 px-2 py-0.5 rounded-full"
                    >
                      {key}: {val}
                    </span>
                  ))}
              </div>
            )
          )}

          {/* CTA */}
          <button
            onClick={() => setInquiryOpen(true)}
            className="btn-primary w-full text-xs py-2.5"
          >
            <MessageCircle size={14} />
            Fiyat Sorunuz
          </button>
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
