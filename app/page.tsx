"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  Truck,
  Award,
  Users,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  ImageIcon,
} from "lucide-react";
import { CATEGORIES as MOCK_CATEGORIES, getFeaturedProducts as getMockFeatured } from "@/lib/mock-data";
import {
  getActiveSliders,
  getActiveCategories,
  getActiveBrands,
  getFeaturedProducts as getFirestoreFeatured,
} from "@/lib/firestore-collections";
import type { SliderItem, Category, Brand, Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

/* ─── Fade-in wrapper ────────────────────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const DEFAULT_SLIDERS: SliderItem[] = [
  {
    id: "slide-1",
    name: "Çikolatalı & Meyveli Premium Donuk Pastalar",
    description: "Profesyonel kafeler ve restoranlar için anında servise hazır donuk pasta çeşitleri.",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1400&q=85",
    imageAlt: "Donuk Pasta Çeşitleri",
    order: 1,
    isActive: true,
    targetUrl: "/katalog/donuk-pasta",
  },
  {
    id: "slide-2",
    name: "Belçika Usulü Waffle & Özel Çikolata Sosları",
    description: "Çıtır dış doku ve akışkan premium çikolata sosları ile lezzet lezzeti.",
    imageUrl: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=1400&q=85",
    imageAlt: "Waffle Malzemeleri",
    order: 2,
    isActive: true,
    targetUrl: "/katalog/waffle-malzemeleri",
  },
  {
    id: "slide-3",
    name: "%100 Doğal Meyve Püreleri & Konsantreler",
    description: "Çilek, ahududu ve mango püreleri ile pastalarınıza doğal meyve tadı verin.",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1400&q=85",
    imageAlt: "Meyve Püreleri",
    order: 3,
    isActive: true,
    targetUrl: "/katalog/pureler",
  },
  {
    id: "slide-4",
    name: "Aromatik Kahve & Gurme Lezzet Şurupları",
    description: "Karamel, vanilya ve fındık aromalarıyla içecek ve tatlılarınızı zenginleştirin.",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1400&q=85",
    imageAlt: "Lezzet Şurupları",
    order: 4,
    isActive: true,
    targetUrl: "/katalog/suruplar",
  },
  {
    id: "slide-5",
    name: "San Sebastian & Taze Fırıncılık Hammaddeleri",
    description: "Gurme pastaneler için yüksek kaliteli hamur ve krema malzemeleri.",
    imageUrl: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=1400&q=85",
    imageAlt: "Pastacılık Hammaddeleri",
    order: 5,
    isActive: true,
    targetUrl: "/katalog",
  },
];

const DEFAULT_BRANDS: Brand[] = [
  {
    id: "b-1",
    name: "DaVinci Gourmet",
    subtitle: "Premium Barista Şurup & Püre",
    order: 1,
    targetUrl: "/katalog?search=davinci",
    imageUrl: "",
    isActive: true,
  },
  {
    id: "b-2",
    name: "Caffè NONNO",
    subtitle: "İtalyan Şurup & Frozen Püre",
    order: 2,
    targetUrl: "/katalog?search=nonno",
    imageUrl: "",
    isActive: true,
  },
  {
    id: "b-3",
    name: "Monte Cristo",
    subtitle: "Gurme Bar Şurupları & Soslar",
    order: 3,
    targetUrl: "/katalog?search=monte-cristo",
    imageUrl: "",
    isActive: true,
  },
  {
    id: "b-4",
    name: "CALLEI Chocolate",
    subtitle: "Waffle, Krep & Dekor Çikolataları",
    order: 4,
    targetUrl: "/katalog?search=callei",
    imageUrl: "",
    isActive: true,
  },
  {
    id: "b-5",
    name: "EASY MIX",
    subtitle: "Doğal Meyve & Kokteyl Premiksleri",
    order: 5,
    targetUrl: "/katalog?search=easy%20mix",
    imageUrl: "",
    isActive: true,
  },
  {
    id: "b-6",
    name: "Krater",
    subtitle: "Maestro del Gelato Meyve Miksleri",
    order: 6,
    targetUrl: "/katalog?search=krater",
    imageUrl: "",
    isActive: true,
  },
];

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>(DEFAULT_BRANDS);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  /* Load all dynamic data */
  useEffect(() => {
    async function load() {
      try {
        const [c, b, p] = await Promise.all([
          getActiveCategories(),
          getActiveBrands(),
          getFirestoreFeatured(10),
        ]);

        if (c.length > 0) {
          setCategories(
            c.map((cat) => {
              const mockCat = MOCK_CATEGORIES.find(
                (m) => m.slug === cat.slug || m.name.toLowerCase() === cat.name.toLowerCase()
              );
              return {
                ...cat,
                imageUrl: cat.imageUrl || mockCat?.imageUrl || "",
              };
            })
          );
        } else {
          setCategories(
            MOCK_CATEGORIES.map((mc, i) => ({
              id: mc.id,
              name: mc.name,
              slug: mc.slug,
              imageUrl: mc.imageUrl || "",
              order: i + 1,
              isActive: true,
              description: mc.description,
            }))
          );
        }
        if (b.length > 0) setBrands(b);
        else setBrands(DEFAULT_BRANDS);
        if (p.length > 0) {
          setFeaturedProducts(
            p.map((prod) => {
              const mockProd = getMockFeatured().find(
                (m) => m.id === prod.id || m.code === prod.code || m.name.toLowerCase() === prod.name.toLowerCase()
              );
              return {
                ...prod,
                imageUrl: prod.imageUrl || mockProd?.imageUrl || "",
              };
            })
          );
        } else {
          const mockFeatured = getMockFeatured();
          setFeaturedProducts(
            mockFeatured.map((mp, i) => ({
              ...mp,
              codeGroup: "",
              price: 0,
              vatRate: 20,
              order: i + 1,
            }))
          );
        }
      } catch {
        setCategories(
          MOCK_CATEGORIES.map((mc, i) => ({
            id: mc.id,
            name: mc.name,
            slug: mc.slug,
            imageUrl: mc.imageUrl || "",
            order: i + 1,
            isActive: true,
            description: mc.description,
          }))
        );
        const mockFeatured = getMockFeatured();
        setFeaturedProducts(
          mockFeatured.map((mp, i) => ({
            ...mp,
            codeGroup: "",
            price: 0,
            vatRate: 20,
            order: i + 1,
          }))
        );
      } finally {
        setDataLoaded(true);
      }
    }
    load();
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HERO SECTION — X-Axis Split Layout (50% Text / 50% Slider)
      ════════════════════════════════════════════════════════════ */}
      {/* ════════════════════════════════════════════════════════════
          HERO SECTION — White Background & X-Axis Split (50% / 50%)
      ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white text-charcoal-900 min-h-[80vh] flex items-center py-10 lg:py-16 overflow-hidden border-b border-border">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-100/40 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cream-200/50 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-[5] relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ── Left Column: Text & Content (50% Width on Desktop) ──────── */}
            <div className="lg:col-span-6 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 sm:gap-3"
              >
                <span className="text-gold-700 bg-gold-50 border border-gold-200/60 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  YKB GIDA — 20:45 PASTACILIK
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-heading text-3xl sm:text-5xl lg:text-5xl font-extrabold text-charcoal-900 leading-tight"
              >
                Günün her anına uygun <span className="gold-text">doyurucu bir lezzet</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-charcoal-600 text-base sm:text-lg leading-relaxed max-w-xl"
              >
                Profesyonel pastacılık ve fırıncılık işletmeleri için özel olarak seçilmiş 
                premium hammadde ve yarı mamul ürünler. Güvenilir B2B tedarik zinciri.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <Link
                  href="/katalog"
                  className="btn-primary text-sm sm:text-base py-3 px-7 shadow-gold flex items-center gap-2"
                >
                  Kataloğu İncele
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="https://wa.me/905010737113?text=Merhaba,%2020:45%20Pastac%C4%B1l%C4%B1k%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:scale-105"
                >
                  WhatsApp Teklif Al
                </a>
              </motion.div>

              {/* Mini Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="grid grid-cols-3 gap-4 pt-6 border-t border-charcoal-200/80 max-w-md"
              >
                {[
                  { value: "500+", label: "Ürün Çeşidi" },
                  { value: "81", label: "İl Teslimat" },
                  { value: "15+", label: "Yıl Deneyim" },
                ].map((stat) => (
                  <div key={stat.label} className="text-left">
                    <p className="font-heading font-extrabold text-gold-600 text-xl sm:text-2xl">{stat.value}</p>
                    <p className="text-charcoal-500 text-xs font-semibold">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right Column: Category Showcase Cards (No Slider) ──────── */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-3.5 sm:gap-4.5">
                {[
                  {
                    title: "Aromalı Şuruplar",
                    brand: "DaVinci & NONNO",
                    count: "42+ Çeşit",
                    href: "/katalog/suruplar",
                    image: "/resimler/p4/p4_1.png",
                    tag: "Barista & Kahve",
                    borderColor: "hover:border-gold-400",
                  },
                  {
                    title: "Püreler & Miksler",
                    brand: "Caffè NONNO & EASY MIX",
                    count: "44+ Çeşit",
                    href: "/katalog/pureler",
                    image: "/resimler/pt1/pt1_1.png",
                    tag: "Frozen & Kokteyl",
                    borderColor: "hover:border-gold-400",
                  },
                  {
                    title: "Waffle Malzemeleri",
                    brand: "CALLEI Kremaları & Süs",
                    count: "18+ Çeşit",
                    href: "/katalog/waffle-malzemeleri",
                    image: "/resimler/p10/p10_1.png",
                    tag: "Waffle & Krep",
                    borderColor: "hover:border-gold-400",
                  },
                  {
                    title: "Tatlı & Bar Sosları",
                    brand: "DaVinci 2L & NONNO",
                    count: "11+ Çeşit",
                    href: "/katalog/tatli-soslar",
                    image: "/resimler/p6/p6_7.png",
                    tag: "Karamel & Çikolata",
                    borderColor: "hover:border-gold-400",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.15 + idx * 0.08 }}
                  >
                    <Link
                      href={item.href}
                      className={`group block p-3.5 sm:p-4 rounded-2xl bg-white border border-border shadow-soft hover:shadow-soft-lg ${item.borderColor} transition-all duration-300 relative overflow-hidden`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 bg-gold-50 px-2 py-0.5 rounded">
                          {item.tag}
                        </span>
                        <span className="text-[10px] font-semibold text-charcoal-400">
                          {item.count}
                        </span>
                      </div>

                      <div className="relative aspect-square w-full max-w-[130px] sm:max-w-[150px] mx-auto my-1 bg-cream-100/60 rounded-xl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 40vw, 180px"
                          className="object-contain p-2 group-hover:scale-108 transition-transform duration-300"
                        />
                      </div>

                      <div className="mt-2 text-center">
                        <h3 className="font-heading font-bold text-charcoal-900 text-xs sm:text-sm group-hover:text-gold-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-charcoal-500 text-[11px] mt-0.5 truncate">
                          {item.brand}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TRUST STRIP & BRANDS (Hero Altı Siyah Alan)
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-charcoal-900 py-8 border-b border-charcoal-800">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* 3 Güven Rozeti */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-charcoal-700">
            {[
              {
                icon: <Award size={24} className="text-gold" />,
                title: "Premium Kalite",
                desc: "ISO sertifikalı tedarikçilerden seçilen ürünler",
              },
              {
                icon: <Truck size={24} className="text-gold" />,
                title: "Türkiye Geneli Teslimat",
                desc: "Soğuk zincir korumalı, 81 ile güvenli nakliye",
              },
              {
                icon: <Users size={24} className="text-gold" />,
                title: "Özel B2B Desteği",
                desc: "Teknik satış ekibimiz her zaman yanınızda",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-6 py-2 sm:py-0 first:pl-0 last:pr-0"
              >
                <div className="w-12 h-12 rounded-xl bg-charcoal-700 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-heading font-semibold text-white text-sm">
                    {item.title}
                  </p>
                  <p className="text-charcoal-400 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Çalıştığımız Markalar (DAVİNCİ, MONTE CRİSTO, NONNO vb.) */}
          {brands.length > 0 && (
            <div className="pt-5 border-t border-charcoal-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <p className="text-charcoal-300 text-xs font-bold uppercase tracking-widest">
                  Çalıştığımız Markalar:
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {brands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/katalog?search=${encodeURIComponent(brand.name.toLowerCase())}`}
                    className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 hover:border-gold/50 transition-all duration-200 group shadow-sm"
                  >
                    {brand.imageUrl && (
                      <div className="w-6 h-6 relative shrink-0">
                        <Image src={brand.imageUrl} alt={brand.name} fill sizes="24px" className="object-contain" />
                      </div>
                    )}
                    <span className="font-heading font-bold text-white group-hover:text-gold text-xs uppercase tracking-wider transition-colors">
                      {brand.name}
                    </span>
                    {brand.subtitle && (
                      <span className="text-charcoal-400 text-2xs hidden sm:inline">
                        • {brand.subtitle}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CATEGORIES SHOWCASE — Dynamic with images
      ════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-cream">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
              <div>
                <p className="section-label">Ürün Kategorileri</p>
                <h2 className="font-heading font-bold text-charcoal-800">
                  Tüm İhtiyaçlarınız<br />
                  <span className="gold-text">Tek Çatı Altında</span>
                </h2>
              </div>
              <Link
                href="/katalog"
                className="flex items-center gap-2 text-charcoal-600 hover:text-gold-600 text-sm font-semibold transition-colors shrink-0"
              >
                Tüm kategoriler
                <ChevronRight size={16} />
              </Link>
            </div>
          </FadeIn>

          {!dataLoaded ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton h-48 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat, i) => (
                <FadeIn key={cat.id} delay={i * 0.07}>
                  <Link
                    href={`/katalog/${cat.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-gold-200 transition-all duration-300"
                  >
                    {/* Category Image */}
                    <div className="relative aspect-[4/3] bg-cream-200 overflow-hidden">
                      {cat.imageUrl ? (
                        <Image
                          src={cat.imageUrl}
                          alt={cat.name}
                          fill
                          quality={90}
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold-50 to-cream-200">
                          <ImageIcon size={32} className="text-charcoal-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {/* Category Info */}
                    <div className="p-4 text-center">
                      <p className="font-heading font-semibold text-charcoal-800 text-sm mb-1 group-hover:text-gold-700 transition-colors">
                        {cat.name}
                      </p>
                      <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-gold transition-all duration-300 mx-auto rounded-full" />
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FEATURED PRODUCTS
      ════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-surface-alt">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
              <div>
                <p className="section-label">Öne Çıkan Ürünler</p>
                <h2 className="font-heading font-bold text-charcoal-800">
                  En Çok Tercih Edilen
                  <br />
                  <span className="gold-text">Premium Ürünler</span>
                </h2>
              </div>
              <Link
                href="/katalog"
                className="flex items-center gap-2 text-charcoal-600 hover:text-gold-600 text-sm font-semibold transition-colors shrink-0"
              >
                Tüm ürünler
                <ChevronRight size={16} />
              </Link>
            </div>
          </FadeIn>

          {!dataLoaded ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="skeleton h-80 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4.5">
              {featuredProducts.slice(0, 10).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}

          <FadeIn delay={0.2}>
            <div className="text-center mt-12">
              <Link href="/katalog" className="btn-secondary px-10 py-3.5">
                Tüm Ürün Kataloğunu İncele
                <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          BRANDS LOGO STRIP — Dynamic
      ════════════════════════════════════════════════════════════ */}
      {brands.length > 0 && (
        <section className="py-16 bg-white border-y border-border">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-10">
                <p className="section-label text-center">Çalıştığımız Markalar</p>
                <h2 className="font-heading font-bold text-charcoal-800">
                  Dünya Standartlarında <span className="gold-text">Markalar</span>
                </h2>
              </div>
            </FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
              {brands.map((brand, i) => (
                <FadeIn key={brand.id} delay={i * 0.05}>
                  {brand.targetUrl ? (
                    <a
                      href={brand.targetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col items-center gap-2"
                    >
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-cream border border-border flex items-center justify-center p-3 group-hover:border-gold-200 group-hover:shadow-card-hover transition-all duration-300">
                        {brand.imageUrl ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={brand.imageUrl}
                              alt={brand.name}
                              fill
                              quality={90}
                              sizes="120px"
                              className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                          </div>
                        ) : (
                          <span className="font-heading font-bold text-charcoal-400 text-xs text-center">
                            {brand.name}
                          </span>
                        )}
                      </div>
                      {brand.subtitle && (
                        <p className="text-charcoal-400 text-xs text-center font-medium group-hover:text-charcoal-600 transition-colors">
                          {brand.subtitle}
                        </p>
                      )}
                    </a>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-cream border border-border flex items-center justify-center p-3">
                        {brand.imageUrl ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={brand.imageUrl}
                              alt={brand.name}
                              fill
                              quality={90}
                              sizes="120px"
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <span className="font-heading font-bold text-charcoal-400 text-xs text-center">
                            {brand.name}
                          </span>
                        )}
                      </div>
                      {brand.subtitle && (
                        <p className="text-charcoal-400 text-xs text-center font-medium">
                          {brand.subtitle}
                        </p>
                      )}
                    </div>
                  )}
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          B2B INTRO BANNER
      ════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1920&q=85"
            alt="Pastacılık atölyesi"
            fill
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-900/85" />
        </div>
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="section-label text-center !text-gold-400">
                Kurumsal B2B Çözümler
              </p>
              <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl mb-6">
                İşletmenizin Büyümesine{" "}
                <span className="gold-text">Ortak Oluyoruz</span>
              </h2>
              <p className="text-charcoal-300 text-base sm:text-lg leading-relaxed mb-10">
                Pastane, otel, restoran veya endüstriyel mutfak işletiyorsanız; 
                özel B2B fiyatlandırma, esnek ödeme vadesi ve teknik destek 
                hizmetlerimizden yararlanabilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kayit" className="btn-primary px-8 py-4 shadow-gold-lg">
                  B2B Hesap Oluştur
                  <ArrowRight size={18} />
                </Link>
                <Link href="/katalog" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/30 text-white font-semibold hover:border-gold hover:text-gold transition-all duration-200">
                  Kataloğu İncele
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
