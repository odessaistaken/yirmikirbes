"use client";

import { motion } from "framer-motion";
import PresentationProductCard from "./PresentationProductCard";
import type { Category } from "@/lib/types";
import type { PresentationProduct } from "@/lib/presentation-catalog-service";

interface PresentationCategorySectionProps {
  category: Category;
  products: PresentationProduct[];
  index: number;
  onOpenDetail: (product: PresentationProduct) => void;
}

export default function PresentationCategorySection({
  category,
  products,
  index,
  onOpenDetail,
}: PresentationCategorySectionProps) {
  const sectionNumber = String(index + 1).padStart(2, "0");

  return (
    <section
      id={`section-${category.slug || category.id}`}
      className="py-12 sm:py-16 scroll-mt-24 border-b border-stone-200/60 last:border-b-0"
    >
      {/* Category Section Header */}
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-300/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-amber-700 font-bold tracking-widest uppercase">
                Bölüm {sectionNumber}
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-xs text-stone-500 font-medium">
                {products.length} Seçkin Ürün
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 tracking-tight flex items-center gap-3">
              {category.icon && <span className="text-2xl sm:text-3xl">{category.icon}</span>}
              <span>{category.name}</span>
            </h2>

            {category.description && (
              <p className="text-sm text-stone-500 mt-2 max-w-2xl font-sans leading-relaxed">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Product Cards Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {products.map((product, pIdx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, delay: (pIdx % 3) * 0.08 }}
          >
            <PresentationProductCard
              product={product}
              index={pIdx}
              onOpenDetail={onOpenDetail}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
