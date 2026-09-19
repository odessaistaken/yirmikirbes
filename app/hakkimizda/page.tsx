"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Award, Truck, Users, ShieldCheck,
  ArrowRight, CheckCircle, Globe, Thermometer,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import Logo from "@/components/Logo";

/* ─── Fade-in helper ──────────────────────────────────────────────────────── */
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

/* ─── Hero Coffee Slider Data ────────────────────────────────────────────── */
const HERO_SLIDES = [
  {
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=85",
    alt: "Artisan Kahve & Barista Sanatı",
    subtitle: "Hakkımızda",
    title: "Pastacılığın ve Kahvenin Güvenilir Tedarikçisi",
    desc: "2009'dan bu yana Türkiye'nin önde gelen pastacı, fırıncı ve kafe zincirlerine premium hammadde ve yarı mamul ürün tedarik ediyoruz.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=85",
    alt: "Taze Kavrulmuş Nitelikli Kahve Çekirdekleri",
    subtitle: "Kahve & Miksoloji",
    title: "Aromatik Şuruplar & Nitelikli Kahve Çözümleri",
    desc: "DaVinci Gourmet, Caffè NONNO ve Monte Cristo güvencesiyle en seçkin kahve ve içecek reçeteleri için tek adres.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=85",
    alt: "Profesyonel Barista İstasyonu",
    subtitle: "Ustalık & Kalite",
    title: "En İyilerle Çalışan Profesyonellerin Tercihi",
    desc: "Soğuk zincir lojistiğimiz ve 120'den fazla ürün portföyümüzle Türkiye'nin 81 iline kesintisiz tedarik sağlıyoruz.",
  },
];

/* ─── Story Coffee Slider Data ───────────────────────────────────────────── */
const STORY_SLIDES = [
  {
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&q=85",
    alt: "Kahve ve Şurup Sunumu",
    caption: "İmza Kahve & Barista Reçeteleri",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&q=85",
    alt: "Latte Art ve Espresso Sanatı",
    caption: "Kusursuz Ekstraksiyon & Latte Art",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=1200&q=85",
    alt: "Kavrulmuş Kahve Çekirdekleri",
    caption: "Taze Hammadde & B2B Güvencesi",
  },
];

/* ─── Data ────────────────────────────────────────────────────────────────── */
const stats = [
  { value: "200+", label: "Aktif B2B Müşteri" },
  { value: "120+", label: "SKU Ürün Çeşidi" },
  { value: "15+", label: "Yıllık Deneyim" },
  { value: "81", label: "İl'e Teslimat" },
];

const values = [
  {
    icon: <Award size={24} />,
    title: "Premium Kalite",
    desc: "Her ürünümüz uluslararası gıda güvenliği standartlarına uygun olarak üretilir ve sıkı kalite kontrolünden geçer.",
  },
  {
    icon: <Thermometer size={24} />,
    title: "Soğuk Zincir",
    desc: "Ürünleriniz depodan teslimat noktasına kadar kesintisiz soğuk zincir güvencesiyle taşınır.",
  },
  {
    icon: <Truck size={24} />,
    title: "Hızlı Teslimat",
    desc: "Türkiye genelinde organize lojistik ağımız sayesinde siparişleriniz zamanında ve hasarsız ulaşır.",
  },
  {
    icon: <Users size={24} />,
    title: "B2B Uzmanlığı",
    desc: "Yalnızca profesyonel işletmelere hizmet veriyoruz. Alanında uzman satış ekibimiz her adımda yanınızda.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Sertifikalı Üretim",
    desc: "TSE, ISO 22000 ve HACCP belgeli tedarikçilerle çalışarak ürün güvenilirliğini maksimum düzeyde tutuyoruz.",
  },
  {
    icon: <Globe size={24} />,
    title: "Global Tedarik",
    desc: "Dünyanın dört bir yanındaki önde gelen üreticilerle doğrudan iş birliği kurarak en uygun fiyatı sunuyoruz.",
  },
];

const milestones = [
  { year: "2009", text: "20:45 Pastacılık İstanbul'da kuruldu. İlk B2B pasta malzemesi distribütörlüğü başlatıldı." },
  { year: "2013", text: "Soğuk zincir lojistik altyapısı kuruldu. Türkiye'nin 7 büyük iline hizmet genişletildi." },
  { year: "2017", text: "Ürün portföyü 80 SKU'ya ulaştı. Avrupa'dan doğrudan ithalat anlaşmaları imzalandı." },
  { year: "2021", text: "Dijital B2B katalog portalı devreye alındı. Müşteri tabanı 150 işletmeyi aştı." },
  { year: "2024", text: "Türkiye'nin 81 iline teslimat kapasitesine ulaşıldı. 120+ ürün çeşidi ile sektörde lider konum." },
];

export default function HakkimizdaPage() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [storySlide, setStorySlide] = useState(0);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(heroTimer);
  }, []);

  useEffect(() => {
    const storyTimer = setInterval(() => {
      setStorySlide((prev) => (prev + 1) % STORY_SLIDES.length);
    }, 4500);
    return () => clearInterval(storyTimer);
  }, []);

  const prevHero = () => setHeroSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  const nextHero = () => setHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">

      {/* ── Hero Carousel (Coffee Themed) ─────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[460px] flex items-end overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`hero-${heroSlide}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[heroSlide].imageUrl}
              alt={HERO_SLIDES[heroSlide].alt}
              fill
              quality={90}
              sizes="100vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />

        {/* Navigation buttons */}
        <button
          onClick={prevHero}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-gold text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-200"
          aria-label="Önceki slayt"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={nextHero}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-gold text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-200"
          aria-label="Sonraki slayt"
        >
          <ChevronRight size={22} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 right-8 z-20 flex items-center gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === heroSlide ? "w-8 bg-gold" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${heroSlide}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-label text-amber-300">
                {HERO_SLIDES[heroSlide].subtitle}
              </span>
              <h1 className="text-white font-heading font-bold text-4xl md:text-5xl lg:text-6xl mt-2 mb-4 drop-shadow-lg">
                {HERO_SLIDES[heroSlide].title}
              </h1>
              <p className="text-slate-200 text-base sm:text-lg max-w-2xl drop-shadow-md">
                {HERO_SLIDES[heroSlide].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-10 border-y border-slate-200 shadow-sm">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08} className="text-center">
                <p className="text-amber-700 font-heading font-black text-4xl lg:text-5xl mb-1">{s.value}</p>
                <p className="text-slate-600 text-sm font-semibold">{s.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="section-label">Hikayemiz</span>
              <h2 className="font-heading font-bold text-slate-900 text-3xl lg:text-4xl mt-2 mb-6">
                Pastacılık endüstrisinin ihtiyaçlarını anlıyoruz
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  20:45 Pastacılık, 2009 yılında İstanbul&apos;da profesyonel pastacılık tedarik
                  firması olarak yola çıktı. Kuruluşumuzdaki en büyük motivasyon, Türkiye&apos;deki
                  profesyonel pastacıların ve fırıncıların kaliteli hammaddeye erişimde
                  yaşadığı güçlükleri doğrudan çözmekti.
                </p>
                <p>
                  Bugün 200&apos;ü aşkın B2B müşterimize 120&apos;den fazla ürün çeşidiyle hizmet
                  veriyoruz. Avrupa ve Asya&apos;nın önde gelen üreticileriyle kurduğumuz doğrudan
                  tedarik ilişkileri sayesinde hem premium kalite hem de rekabetçi fiyat sunabiliyoruz.
                </p>
                <p>
                  Soğuk zincir lojistik altyapımız, ISO sertifikalı depolama tesislerimiz
                  ve alanında uzman satış kadromuzla sektörün en güvenilir B2B tedarikçisi
                  olmayı sürdürüyoruz.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link href="/katalog" className="btn-primary shadow-gold">
                  Ürün Kataloğuna Bak
                  <ArrowRight size={16} />
                </Link>
                <Link href="/iletisim" className="btn-secondary">
                  Bize Ulaşın
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-soft-lg border border-slate-200 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`story-${storySlide}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={STORY_SLIDES[storySlide].imageUrl}
                      alt={STORY_SLIDES[storySlide].alt}
                      fill
                      quality={90}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Dot Indicators */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                  {STORY_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setStorySlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === storySlide ? "w-5 bg-gold" : "w-1.5 bg-white/60 hover:bg-white"
                      }`}
                      aria-label={`Slayt ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10 flex items-end justify-between">
                  <Logo variant="light" size={44} />
                  <span className="text-white text-xs font-semibold drop-shadow-md bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                    {STORY_SLIDES[storySlide].caption}
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="section-label">Değerlerimiz</span>
            <h2 className="font-heading font-bold text-slate-900 text-3xl lg:text-4xl mt-2">
              Neden 20:45 Pastacılık?
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.07}>
                <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-amber-300 hover:shadow-card-hover transition-all duration-300 group h-full">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                    {v.icon}
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-base mb-2 group-hover:text-amber-700 transition-colors">{v.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="section-label">Tarihçemiz</span>
            <h2 className="font-heading font-bold text-slate-900 text-3xl lg:text-4xl mt-2">
              15 Yılda Büyüme Hikayemiz
            </h2>
          </FadeIn>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-amber-300 lg:-translate-x-px" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <FadeIn key={m.year} delay={i * 0.1}>
                  <div className={`relative flex items-start gap-6 lg:gap-0 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    {/* Dot */}
                    <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white shadow-md shrink-0 mt-1.5" />

                    {/* Content */}
                    <div className={`ml-14 lg:ml-0 lg:w-[46%] ${i % 2 === 0 ? "lg:pr-10 lg:text-right" : "lg:pl-10 lg:ml-auto"}`}>
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span className="font-heading font-black text-amber-700 text-xl">{m.year}</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                        {m.text}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications strip ──────────────────────────────────────────── */}
      <section className="bg-white py-10 border-y border-slate-200 shadow-sm">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-slate-900 font-heading font-bold text-xl mb-1">Sertifikalar & Uyum</p>
              <p className="text-slate-500 text-sm">Tedarikçilerimizin tamamı uluslararası standartlara uygundur</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {["ISO 22000", "HACCP", "TSE", "GMP+", "IFS Food"].map((cert) => (
                <div key={cert} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 shadow-2xs">
                  <CheckCircle size={13} className="text-amber-600 shrink-0" />
                  <span className="text-slate-700 text-xs font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="section-label">B2B İş Birliği</span>
            <h2 className="font-heading font-bold text-slate-900 text-3xl lg:text-4xl mt-2 mb-4">
              Birlikte büyüyelim
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              İşletmeniz için özel fiyat teklifi almak veya ürün kataloğumuzu incelemek için
              bizimle iletişime geçin. Uzman satış ekibimiz en kısa sürede yanınızda olacak.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/iletisim" className="btn-primary px-8 py-3.5 text-base shadow-gold">
                İletişime Geç
                <ArrowRight size={18} />
              </Link>
              <Link href="/katalog" className="btn-secondary px-8 py-3.5 text-base">
                Ürünleri İncele
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
