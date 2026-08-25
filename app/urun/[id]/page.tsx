"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Tag, Package, MessageCircle, Share2, CheckCircle, ArrowLeft, ImageIcon } from "lucide-react";
import { getProductById as getMockProduct, getRelatedProducts as getMockRelated } from "@/lib/mock-data";
import { getProductById as getFirestoreProduct, getProducts } from "@/lib/firestore-collections";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import InquiryModal from "@/components/InquiryModal";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      setLoading(true);
      try {
        // 1. Check in-memory / mock products first
        let found = getMockProduct(id);

        // 2. If not found in mock, check Firestore
        if (!found) {
          found = (await getFirestoreProduct(id)) ?? undefined;
        }

        if (found) {
          setProduct(found);
          // Load related products from same category
          try {
            const allProds = await getProducts();
            const rel = allProds.filter(
              (p) =>
                p.isActive &&
                p.id !== found!.id &&
                (p.categoryId === found!.categoryId || p.categorySlug === found!.categorySlug)
            ).slice(0, 5);
            
            if (rel.length > 0) {
              setRelated(rel);
            } else {
              setRelated(getMockRelated(found));
            }
          } catch {
            setRelated(getMockRelated(found));
          }
        } else {
          setNotFoundState(true);
        }
      } catch {
        const foundMock = getMockProduct(id);
        if (foundMock) {
          setProduct(foundMock);
          setRelated(getMockRelated(foundMock));
        } else {
          setNotFoundState(true);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-charcoal-500 text-sm font-medium">Ürün yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (notFoundState || !product) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center py-24 text-center px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="font-heading font-bold text-charcoal-800 text-2xl mb-2">Ürün Bulunamadı</h1>
        <p className="text-charcoal-500 text-sm mb-6">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
        <Link href="/katalog" className="btn-primary">
          <ArrowLeft size={16} /> Kataloğa Dön
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-cream">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-charcoal-400 text-xs">
              <Link href="/" className="hover:text-gold transition-colors">Ana Sayfa</Link>
              <ChevronRight size={12} />
              <Link href="/katalog" className="hover:text-gold transition-colors">Katalog</Link>
              <ChevronRight size={12} />
              <Link href={`/katalog/${product.categorySlug}`} className="hover:text-gold transition-colors">
                {product.categoryName || "Kategori"}
              </Link>
              <ChevronRight size={12} />
              <span className="text-charcoal-600 truncate max-w-40">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product detail */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* ── Image panel ─────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-product rounded-2xl overflow-hidden bg-cream-200 shadow-soft-lg">
                {!imgError && product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    quality={95}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    onError={() => setImgError(true)}
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-cream-200">
                    <div className="text-center">
                      <ImageIcon size={48} className="text-charcoal-300 mx-auto" />
                      <p className="text-charcoal-400 text-sm mt-2">{product.categoryName}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* ── Info panel ──────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Category & code */}
              <div className="flex items-center gap-3">
                <Link
                  href={`/katalog/${product.categorySlug}`}
                  className="flex items-center gap-1.5 text-gold-600 text-xs font-semibold uppercase tracking-wider hover:text-gold-700 transition-colors"
                >
                  <Tag size={11} />
                  {product.categoryName || "Kategori"}
                </Link>
                <span className="w-1 h-1 rounded-full bg-charcoal-300" />
                <span className="text-charcoal-400 text-xs font-mono">{product.code}</span>
              </div>

              {/* Name */}
              <div>
                <h1 className="font-heading font-bold text-charcoal-800 text-3xl sm:text-4xl leading-tight mb-3">
                  {product.name}
                </h1>
                <div className="gold-divider" />
              </div>

              {/* Description */}
              <p className="text-charcoal-600 text-base leading-relaxed">
                {product.description}
              </p>

              {/* Specs */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="card-flat p-5 space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Package size={14} className="text-gold" />
                    <p className="text-charcoal-700 text-sm font-semibold">Ürün Özellikleri</p>
                  </div>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="text-charcoal-500 text-sm">{key}</span>
                      <span className="text-charcoal-800 text-sm font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="badge badge-gold capitalize">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Trust points */}
              <div className="space-y-2">
                {[
                  "ISO sertifikalı tedarikçilerden temin edilmektedir",
                  "Soğuk zincir korumalı teslimat",
                  "Toplu sipariş için özel fiyat teklifi",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2.5">
                    <CheckCircle size={15} className="text-gold-500 shrink-0" />
                    <span className="text-charcoal-600 text-sm">{point}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setInquiryOpen(true)}
                  className="btn-primary py-4 text-base flex-1"
                >
                  <MessageCircle size={18} />
                  Fiyat Sorunuz
                </button>
              </div>

              <p className="text-charcoal-400 text-xs">
                B2B müşterileri için özel fiyatlandırma ve minimum sipariş miktarı hakkında 
                bilgi almak için lütfen teklif formunu doldurun.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="bg-surface-alt py-16">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="section-label">Benzer Ürünler</p>
                  <h2 className="font-heading font-bold text-charcoal-800 text-2xl">
                    İlgili Ürünler
                  </h2>
                </div>
                <Link
                  href={`/katalog/${product.categorySlug}`}
                  className="text-charcoal-500 hover:text-gold text-sm font-medium transition-colors"
                >
                  Tümünü gör →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4.5">
                {related.map((rp, i) => (
                  <ProductCard key={rp.id} product={rp} index={i} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        product={product}
      />
    </>
  );
}
