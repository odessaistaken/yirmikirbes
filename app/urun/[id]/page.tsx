"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Tag, Package, MessageCircle, Share2, CheckCircle, ArrowLeft, ImageIcon, Store, X, ZoomIn } from "lucide-react";
import { getProductById as getMockProduct, getRelatedProducts as getMockRelated, getBrandProducts as getMockBrandProducts } from "@/lib/mock-data";
import { getProductById as getFirestoreProduct, getProducts } from "@/lib/firestore-collections";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import InquiryModal from "@/components/InquiryModal";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [brandProducts, setBrandProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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

          try {
            const allProds = await getProducts();

            // Related: same category
            const rel = allProds.filter(
              (p) =>
                p.isActive &&
                p.id !== found!.id &&
                (p.categoryId === found!.categoryId || p.categorySlug === found!.categorySlug)
            ).slice(0, 5);
            setRelated(rel.length > 0 ? rel : getMockRelated(found));

            // Brand: same codeGroup
            if (found.codeGroup) {
              const brand = allProds.filter(
                (p) =>
                  p.isActive &&
                  p.id !== found!.id &&
                  p.codeGroup &&
                  p.codeGroup.toLowerCase() === found!.codeGroup.toLowerCase()
              ).slice(0, 8);
              setBrandProducts(brand.length > 0 ? brand : getMockBrandProducts(found));
            } else {
              setBrandProducts([]);
            }
          } catch {
            setRelated(getMockRelated(found));
            setBrandProducts(getMockBrandProducts(found));
          }
        } else {
          setNotFoundState(true);
        }
      } catch {
        const foundMock = getMockProduct(id);
        if (foundMock) {
          setProduct(foundMock);
          setRelated(getMockRelated(foundMock));
          setBrandProducts(getMockBrandProducts(foundMock));
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
      <div className="min-h-screen bg-[#121316] flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm font-medium">Ürün yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (notFoundState || !product) {
    return (
      <div className="min-h-screen bg-[#121316] flex flex-col items-center justify-center py-24 text-center px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="font-heading font-bold text-white text-2xl mb-2">Ürün Bulunamadı</h1>
        <p className="text-slate-400 text-sm mb-6">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
        <Link href="/katalog" className="btn-primary shadow-gold">
          <ArrowLeft size={16} /> Kataloğa Dön
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#121316] text-slate-200">
        {/* Breadcrumb */}
        <div className="bg-[#0D0E11] border-b border-[#282C36]">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Link href="/" className="hover:text-gold transition-colors">Ana Sayfa</Link>
              <ChevronRight size={12} />
              <Link href="/katalog" className="hover:text-gold transition-colors">Katalog</Link>
              <ChevronRight size={12} />
              <Link href={`/katalog/${product.categorySlug}`} className="hover:text-gold transition-colors">
                {product.categoryName || "Kategori"}
              </Link>
              <ChevronRight size={12} />
              <span className="text-gold font-semibold truncate max-w-40">{product.name}</span>
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
              <div
                className={`relative aspect-product rounded-2xl overflow-hidden bg-[#16181D] border border-[#282C36] shadow-2xl p-4 ${
                  !imgError && product.imageUrl ? "cursor-zoom-in" : ""
                }`}
                onClick={() => { if (!imgError && product.imageUrl) setLightboxOpen(true); }}
                title={!imgError && product.imageUrl ? "Görseli büyütmek için tıklayın" : undefined}
              >
                {!imgError && product.imageUrl ? (
                  <>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      quality={95}
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      onError={() => setImgError(true)}
                      priority
                    />
                    <div className="absolute bottom-3 right-3 bg-[#1B1D23]/80 text-gold border border-gold/30 rounded-lg p-1.5">
                      <ZoomIn size={16} />
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#21242C]">
                    <div className="text-center">
                      <ImageIcon size={48} className="text-slate-500 mx-auto" />
                      <p className="text-slate-400 text-sm mt-2">{product.categoryName}</p>
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
                  className="flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider hover:text-gold-300 transition-colors"
                >
                  <Tag size={11} />
                  {product.categoryName || "Kategori"}
                </Link>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="text-slate-400 text-xs font-mono">Kod: {product.code}</span>
              </div>

              {/* Name */}
              <div>
                <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl leading-tight mb-3">
                  {product.name}
                </h1>
                <div className="gold-divider" />
              </div>

              {/* Description */}
              <p className="text-slate-300 text-base leading-relaxed">
                {product.description}
              </p>

              {/* Specs */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="bg-[#1B1D23] border border-[#282C36] rounded-2xl p-5 space-y-3 shadow-md">
                  <div className="flex items-center gap-2 mb-1">
                    <Package size={14} className="text-gold" />
                    <p className="text-white text-sm font-semibold">Ürün Özellikleri</p>
                  </div>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between py-2 border-b border-[#282C36] last:border-0">
                      <span className="text-slate-400 text-sm">{key}</span>
                      <span className="text-slate-100 text-sm font-medium">{val}</span>
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
                    <CheckCircle size={15} className="text-gold shrink-0" />
                    <span className="text-slate-300 text-sm">{point}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setInquiryOpen(true)}
                  className="btn-primary py-4 text-base flex-1 shadow-gold hover:shadow-gold-lg"
                >
                  <MessageCircle size={18} />
                  Fiyat Sorunuz
                </button>
              </div>

              <p className="text-slate-400 text-xs">
                B2B müşterileri için özel fiyatlandırma ve minimum sipariş miktarı hakkında 
                bilgi almak için lütfen teklif formunu doldurun.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Related products — same category */}
        {related.length > 0 && (
          <div className="bg-[#16181D] py-16 border-t border-[#282C36]">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="section-label">Benzer Ürünler</p>
                  <h2 className="font-heading font-bold text-white text-2xl">
                    İlgili Ürünler
                  </h2>
                </div>
                <Link
                  href={`/katalog/${product.categorySlug}`}
                  className="text-gold hover:text-gold-300 text-sm font-semibold transition-colors"
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

        {/* Brand products — same codeGroup */}
        {brandProducts.length > 0 && product.codeGroup && (
          <div className="bg-[#121316] py-16 border-t border-[#282C36]">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Store size={14} className="text-gold" />
                    <p className="section-label !mb-0">Marka</p>
                  </div>
                  <h2 className="font-heading font-bold text-white text-2xl">
                    Aynı Markanın Diğer Ürünleri
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    <span className="text-gold font-semibold">{product.codeGroup}</span> markasına ait diğer ürünler
                  </p>
                </div>
                <Link
                  href={`/katalog?search=${encodeURIComponent(product.codeGroup)}`}
                  className="text-gold hover:text-gold-300 text-sm font-semibold transition-colors shrink-0"
                >
                  Tüm {product.codeGroup} →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3.5 sm:gap-4.5">
                {brandProducts.map((bp, i) => (
                  <ProductCard key={bp.id} product={bp} index={i} />
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

      {/* ── Lightbox Modal ──────────────────────────────────────────── */}
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
              className="relative max-w-4xl w-full bg-[#16181D] rounded-2xl border border-[#282C36] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-3 right-3 z-10 p-2 bg-[#1B1D23]/90 hover:bg-[#282C36] text-slate-300 hover:text-white rounded-xl border border-[#282C36] transition-colors"
              >
                <X size={20} />
              </button>
              <div className="relative w-full aspect-square max-h-[85vh]">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  quality={98}
                  sizes="95vw"
                  className="object-contain p-8"
                  priority
                />
              </div>
              <div className="px-6 py-4 border-t border-[#282C36] bg-[#1B1D23]">
                <p className="font-heading font-bold text-white">{product.name}</p>
                <p className="text-slate-400 text-sm font-mono mt-0.5">Kod: {product.code}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

