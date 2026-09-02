"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
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
    imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=1400&q=85",
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
    imageUrl: "/brands/davinci-gourmet.png",
    isActive: true,
  },
  {
    id: "b-2",
    name: "Caffè NONNO",
    subtitle: "İtalyan Şurup & Frozen Püre",
    order: 2,
    targetUrl: "/katalog?search=nonno",
    imageUrl: "/brands/caffe-nonno.png",
    isActive: true,
  },
  {
    id: "b-3",
    name: "Monte Cristo",
    subtitle: "Gurme Bar Şurupları & Soslar",
    order: 3,
    targetUrl: "/katalog?search=monte-cristo",
    imageUrl: "/brands/monte-cristo.png",
    isActive: true,
  },
  {
    id: "b-4",
    name: "CALLEI Chocolate",
    subtitle: "Waffle, Krep & Dekor Çikolataları",
    order: 4,
    targetUrl: "/katalog?search=callei",
    imageUrl: "/brands/callei-chocolate.png",
    isActive: true,
  },
  {
    id: "b-5",
    name: "EASY MIX",
    subtitle: "Doğal Meyve & Kokteyl Premiksleri",
    order: 5,
    targetUrl: "/katalog?search=easy%20mix",
    imageUrl: "/brands/easy-mix.png",
    isActive: true,
  },
  {
    id: "b-6",
    name: "Krater",
    subtitle: "Maestro del Gelato Meyve Miksleri",
    order: 6,
    targetUrl: "/katalog?search=krater",
    imageUrl: "/brands/krater.png",
    isActive: true,
  },
];

export default function HomePage() {
  const [sliders, setSliders] = useState<SliderItem[]>(DEFAULT_SLIDERS);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>(DEFAULT_BRANDS);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [dataLoaded, setDataLoaded] = useState(false);
  const sliderTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Load all dynamic data */
  useEffect(() => {
    async function load() {
      try {
        const [s, c, b, p] = await Promise.all([
          getActiveSliders(),
          getActiveCategories(),
          getActiveBrands(),
          getFirestoreFeatured(10),
        ]);
        if (s.length > 0) setSliders(s);
        else setSliders(DEFAULT_SLIDERS);

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
        if (b.length > 0) {
          setBrands(
            b.map((brand) => {
              const def = DEFAULT_BRANDS.find(
                (d) =>
                  d.id === brand.id ||
                  d.name.toLowerCase() === brand.name.toLowerCase() ||
                  brand.name.toLowerCase().includes(d.name.toLowerCase()) ||
                  d.name.toLowerCase().includes(brand.name.toLowerCase())
              );
              return {
                ...brand,
                imageUrl: brand.imageUrl || def?.imageUrl || "",
              };
            })
          );
        } else setBrands(DEFAULT_BRANDS);
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
        setSliders(DEFAULT_SLIDERS);
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

  /* Auto-advance slider */
  const startTimer = useCallback(() => {
    if (sliderTimer.current) clearInterval(sliderTimer.current);
    if (sliders.length <= 1) return;
    sliderTimer.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % sliders.length);
    }, 5000);
  }, [sliders.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (sliderTimer.current) clearInterval(sliderTimer.current);
    };
  }, [startTimer]);

  function goToSlide(index: number) {
    if (index === currentSlide) return;
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    startTimer();
  }
  function prevSlide() {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length);
    startTimer();
  }
  function nextSlide() {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % sliders.length);
    startTimer();
  }

  const hasSliders = sliders.length > 0;

  /* Sinematik Ken Burns & Soft Crossfade Animasyonu */
  const slideVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 1.08,
      filter: "blur(4px)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        opacity: { duration: 0.8, ease: "easeInOut" },
        scale: { duration: 1.2, ease: "easeInOut" },
        filter: { duration: 0.5 },
      },
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      filter: "blur(2px)",
      transition: {
        opacity: { duration: 0.6, ease: "easeInOut" },
        filter: { duration: 0.4 },
      },
    },
  };

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HERO SECTION — Anthracite Background & X-Axis Split (50% / 50%)
      ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#121316] text-white min-h-[80vh] flex items-center py-10 lg:py-16 overflow-hidden border-b border-[#282C36]">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

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
                <span className="text-gold bg-gold/10 border border-gold/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  YKB GIDA — 20:45 PASTACILIK
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-heading text-3xl sm:text-5xl lg:text-5xl font-extrabold text-white leading-tight"
              >
                Günün her anına uygun <span className="gold-text">doyurucu bir lezzet</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl"
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
                className="grid grid-cols-3 gap-4 pt-6 border-t border-[#282C36] max-w-md"
              >
                {[
                  { value: "500+", label: "Ürün Çeşidi" },
                  { value: "81", label: "İl Teslimat" },
                  { value: "15+", label: "Yıl Deneyim" },
                ].map((stat) => (
                  <div key={stat.label} className="text-left">
                    <p className="font-heading font-extrabold text-gold text-xl sm:text-2xl">{stat.value}</p>
                    <p className="text-slate-400 text-xs font-semibold">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right Column: Slider (50% Width on Desktop) ─────── */}
            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-[350px] sm:h-[460px] lg:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-[#282C36] group bg-[#16181D]"
              >
                {/* Image Slider */}
                {hasSliders ? (
                  <>
                    <AnimatePresence mode="sync">
                      <motion.div
                        key={currentSlide}
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0"
                      >
                        <Image
                          src={sliders[currentSlide].imageUrl}
                          alt={sliders[currentSlide].imageAlt || sliders[currentSlide].name}
                          fill
                          quality={95}
                          sizes="(max-width: 1280px) 100vw, 1280px"
                          className="object-cover"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11]/95 via-[#0D0E11]/30 to-transparent" />

                    {/* Slide Caption / Tag */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`caption-${currentSlide}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="absolute bottom-6 left-6 right-6 z-10"
                      >
                        <span className="inline-block bg-gold text-[#0D0E11] text-2xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider mb-2">
                          Öne Çıkan Ürün
                        </span>
                        <h3 className="font-heading font-bold text-white text-lg sm:text-xl drop-shadow-md">
                          {sliders[currentSlide].name}
                        </h3>
                        {sliders[currentSlide].description && (
                          <p className="text-slate-300 text-xs sm:text-sm line-clamp-1 mt-1">
                            {sliders[currentSlide].description}
                          </p>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    {sliders.length > 1 && (
                      <>
                        <button
                          onClick={prevSlide}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#121316]/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:text-[#0D0E11] transition-all duration-200"
                          aria-label="Önceki görsel"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextSlide}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#121316]/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:text-[#0D0E11] transition-all duration-200"
                          aria-label="Sonraki görsel"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}

                    {/* Dot Indicators */}
                    {sliders.length > 1 && (
                      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-[#121316]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        {sliders.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            className={`transition-all duration-300 rounded-full ${
                              i === currentSlide
                                ? "w-6 h-2 bg-gold"
                                : "w-2 h-2 bg-white/40 hover:bg-white/70"
                            }`}
                            aria-label={`Slide ${i + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Image
                      src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=1600&q=90"
                      alt="Premium pastacılık ürünleri"
                      fill
                      quality={95}
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11]/85 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 z-10">
                      <span className="inline-block bg-gold text-[#0D0E11] text-2xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider mb-1">
                        Toptan Tedarik
                      </span>
                      <h3 className="font-heading font-bold text-white text-xl">
                        Premium Pastacılık & Fırıncılık Ürünleri
                      </h3>
                    </div>
                  </>
                )}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          BRANDS SHOWCASE — Hero Altı Markalar Alanı
      ════════════════════════════════════════════════════════════ */}
      {brands.length > 0 && (
        <section className="py-16 bg-[#0D0E11] border-b border-[#282C36]">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-10">
                <p className="section-label text-center">Çalıştığımız Markalar</p>
                <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl lg:text-4xl">
                  Dünya Standartlarında <span className="gold-text">Markalar</span>
                </h2>
              </div>
            </FadeIn>
            <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8 lg:gap-10">
              {brands.map((brand, i) => {
                const targetHref = brand.targetUrl || `/katalog?search=${encodeURIComponent(brand.name.toLowerCase())}`;
                const isExternal = targetHref.startsWith("http://") || targetHref.startsWith("https://");

                return (
                  <FadeIn key={brand.id} delay={i * 0.05}>
                    {isExternal ? (
                      <a
                        href={targetHref}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col items-center gap-2.5 text-center w-28 sm:w-32 transition-transform duration-300 hover:-translate-y-1"
                      >
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#1B1D23] border border-[#282C36] flex items-center justify-center p-3.5 group-hover:border-gold/50 group-hover:shadow-card-hover transition-all duration-300">
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
                            <span className="font-heading font-bold text-slate-300 group-hover:text-gold text-xs text-center transition-colors">
                              {brand.name}
                            </span>
                          )}
                        </div>
                        {brand.subtitle && (
                          <p className="text-slate-400 text-xs font-medium group-hover:text-slate-200 transition-colors leading-snug">
                            {brand.subtitle}
                          </p>
                        )}
                      </a>
                    ) : (
                      <Link
                        href={targetHref}
                        className="group flex flex-col items-center gap-2.5 text-center w-28 sm:w-32 transition-transform duration-300 hover:-translate-y-1"
                      >
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#1B1D23] border border-[#282C36] flex items-center justify-center p-3.5 group-hover:border-gold/50 group-hover:shadow-card-hover transition-all duration-300">
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
                            <span className="font-heading font-bold text-slate-300 group-hover:text-gold text-xs text-center transition-colors">
                              {brand.name}
                            </span>
                          )}
                        </div>
                        {brand.subtitle && (
                          <p className="text-slate-400 text-xs font-medium group-hover:text-slate-200 transition-colors leading-snug">
                            {brand.subtitle}
                          </p>
                        )}
                      </Link>
                    )}
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          CATEGORIES SHOWCASE — Dynamic with images
      ════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#121316]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
              <div>
                <p className="section-label">Ürün Kategorileri</p>
                <h2 className="font-heading font-bold text-white">
                  Tüm İhtiyaçlarınız<br />
                  <span className="gold-text">Tek Çatı Altında</span>
                </h2>
              </div>
              <Link
                href="/katalog"
                className="flex items-center gap-2 text-slate-300 hover:text-gold text-sm font-semibold transition-colors shrink-0"
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
              {(categories.some((c) => !c.parentId) ? categories.filter((c) => !c.parentId) : categories).map((cat, i) => (
                <FadeIn key={cat.id} delay={i * 0.07}>
                  <Link
                    href={`/katalog/${cat.slug}`}
                    className="group block bg-[#1B1D23] rounded-2xl overflow-hidden border border-[#282C36] shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-gold/50 transition-all duration-300"
                  >
                    {/* Category Image */}
                    <div className="relative aspect-[4/3] bg-[#16181D] overflow-hidden">
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
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#16181D] to-[#21242C]">
                          <ImageIcon size={32} className="text-slate-500" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {/* Category Info */}
                    <div className="p-4 text-center bg-[#1B1D23]">
                      <p className="font-heading font-semibold text-slate-100 text-sm mb-1 group-hover:text-gold transition-colors">
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
      <section className="py-24 bg-[#16181D] border-y border-[#282C36]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
              <div>
                <p className="section-label">Öne Çıkan Ürünler</p>
                <h2 className="font-heading font-bold text-white">
                  En Çok Tercih Edilen
                  <br />
                  <span className="gold-text">Premium Ürünler</span>
                </h2>
              </div>
              <Link
                href="/katalog"
                className="flex items-center gap-2 text-slate-300 hover:text-gold text-sm font-semibold transition-colors shrink-0"
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
              <Link href="/katalog" className="btn-secondary px-10 py-3.5 shadow-md">
                Tüm Ürün Kataloğunu İncele
                <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

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
          <div className="absolute inset-0 bg-[#0D0E11]/88 backdrop-blur-[2px]" />
        </div>
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="section-label text-center !text-gold">
                Kurumsal B2B Çözümler
              </p>
              <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl mb-6">
                İşletmenizin Büyümesine{" "}
                <span className="gold-text">Ortak Oluyoruz</span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-10">
                Pastane, otel, restoran veya endüstriyel mutfak işletiyorsanız; 
                özel B2B fiyatlandırma, esnek ödeme vadesi ve teknik destek 
                hizmetlerimizden yararlanabilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kayit" className="btn-primary px-8 py-4 shadow-gold-lg">
                  B2B Hesap Oluştur
                  <ArrowRight size={18} />
                </Link>
                <Link href="/katalog" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#383E4C] bg-[#16181D]/80 text-white font-semibold hover:border-gold hover:text-gold transition-all duration-200">
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
