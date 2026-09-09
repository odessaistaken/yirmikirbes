"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCcw } from "lucide-react";
import PresentationCard from "./PresentationCard";
import type { PresentationProduct } from "@/lib/presentation-catalog-service";

interface PresentationGridProps {
  products: PresentationProduct[];
  viewMode: "editorial" | "grid";
  onOpenDetail: (product: PresentationProduct) => void;
  onResetFilters: () => void;
}

export default function PresentationGrid({
  products,
  viewMode,
  onOpenDetail,
  onResetFilters,
}: PresentationGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center max-w-md mx-auto">
        <div className="w-12 h-12 rounded-full bg-stone-200/60 flex items-center justify-center mx-auto mb-4 text-stone-600">
          <Sparkles size={20} />
        </div>
        <h3 className="text-xl font-serif text-stone-900 mb-2">Kriterlere Uygun Ürün Bulunamadı</h3>
        <p className="text-sm text-stone-500 mb-6">
          Seçtiğiniz kategori veya arama terimine ait bir sunum ürünü bulunmuyor.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-colors"
        >
          <RefreshCcw size={13} />
          <span>Filtreleri Temizle</span>
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
      >
        {viewMode === "editorial" ? (
          <div className="space-y-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <PresentationCard
                  product={product}
                  index={index}
                  viewMode="editorial"
                  onOpenDetail={onOpenDetail}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
              >
                <PresentationCard
                  product={product}
                  index={index}
                  viewMode="grid"
                  onOpenDetail={onOpenDetail}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
