"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Award, Truck, Users, ShieldCheck,
  ArrowRight, CheckCircle, Globe, Thermometer,
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
  return (
    <div className="min-h-screen bg-cream">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=85"
          alt="20:45 Pastacılık atölyesi"
          fill
          quality={90}
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/50 to-charcoal-900/20" />
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label">Hakkımızda</span>
            <h1 className="text-white font-heading font-bold text-4xl md:text-5xl lg:text-6xl mt-2 mb-4">
              Pastacılığın <span className="gold-text">Güvenilir</span> Tedarikçisi
            </h1>
            <p className="text-charcoal-200 text-lg max-w-2xl">
              2009'dan bu yana Türkiye'nin önde gelen pastacı, fırıncı ve kafe zincirlerine
              premium hammadde ve yarı mamul ürün tedarik ediyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="bg-charcoal-900 py-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08} className="text-center">
                <p className="gold-text font-heading font-black text-4xl lg:text-5xl mb-1">{s.value}</p>
                <p className="text-charcoal-300 text-sm">{s.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="section-label">Hikayemiz</span>
              <h2 className="font-heading font-bold text-charcoal-800 text-3xl lg:text-4xl mt-2 mb-6">
                Pastacılık endüstrisinin ihtiyaçlarını anlıyoruz
              </h2>
              <div className="space-y-4 text-charcoal-600 leading-relaxed">
                <p>
                  20:45 Pastacılık, 2009 yılında İstanbul'da küçük bir pastacılık tedarik
                  firması olarak yola çıktı. Kuruluşumuzdaki en büyük motivasyon, Türkiye'deki
                  profesyonel pastacıların ve fırıncıların kaliteli hammaddeye erişimde
                  yaşadığı güçlükleri doğrudan gözlemlemekten kaynaklanıyordu.
                </p>
                <p>
                  Bugün 200'ü aşkın B2B müşterimize 120'den fazla ürün çeşidiyle hizmet
                  veriyoruz. Avrupa ve Asya'nın önde gelen üreticileriyle kurduğumuz doğrudan
                  tedarik ilişkileri sayesinde hem premium kalite hem de rekabetçi fiyat sunabiliyoruz.
                </p>
                <p>
                  Soğuk zincir lojistik altyapımız, ISO sertifikalı depolama tesislerimiz
                  ve alanında uzman satış kadromuzla sektörün en güvenilir B2B tedarikçisi
                  olmayı sürdürüyoruz.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link href="/katalog" className="btn-primary">
                  Ürün Kataloğuna Bak
                  <ArrowRight size={16} />
                </Link>
                <Link href="/iletisim" className="btn-secondary">
                  Bize Ulaşın
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-soft-lg">
                <Image
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85"
                  alt="Pastacılık üretim atölyesi"
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal-900/80 to-transparent">
                  <Logo variant="light" size={32} />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="section-label">Değerlerimiz</span>
            <h2 className="font-heading font-bold text-charcoal-800 text-3xl lg:text-4xl mt-2">
              Neden 20:45 Pastacılık?
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.07}>
                <div className="p-6 rounded-2xl border border-border bg-cream hover:border-gold transition-colors duration-300 group h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-charcoal-900 transition-all duration-300">
                    {v.icon}
                  </div>
                  <h3 className="font-heading font-bold text-charcoal-800 text-base mb-2">{v.title}</h3>
                  <p className="text-charcoal-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="section-label">Tarihçemiz</span>
            <h2 className="font-heading font-bold text-charcoal-800 text-3xl lg:text-4xl mt-2">
              15 Yılda Büyüme Hikayemiz
            </h2>
          </FadeIn>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gold/30 lg:-translate-x-px" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <FadeIn key={m.year} delay={i * 0.1}>
                  <div className={`relative flex items-start gap-6 lg:gap-0 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    {/* Dot */}
                    <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold border-2 border-cream shadow-gold shrink-0 mt-1.5" />

                    {/* Content */}
                    <div className={`ml-14 lg:ml-0 lg:w-[46%] ${i % 2 === 0 ? "lg:pr-10 lg:text-right" : "lg:pl-10 lg:ml-auto"}`}>
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span className="font-heading font-black text-gold text-xl">{m.year}</span>
                      </div>
                      <p className="text-charcoal-600 text-sm leading-relaxed bg-white border border-border rounded-xl p-4 shadow-card">
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
      <section className="bg-charcoal-900 py-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-heading font-bold text-xl mb-1">Sertifikalar & Uyum</p>
              <p className="text-charcoal-400 text-sm">Tedarikçilerimizin tamamı uluslararası standartlara uygundur</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {["ISO 22000", "HACCP", "TSE", "GMP+", "IFS Food"].map((cert) => (
                <div key={cert} className="flex items-center gap-1.5 bg-charcoal-800 border border-charcoal-700 rounded-lg px-3 py-1.5">
                  <CheckCircle size={13} className="text-gold shrink-0" />
                  <span className="text-charcoal-200 text-xs font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="section-label">B2B İş Birliği</span>
            <h2 className="font-heading font-bold text-charcoal-800 text-3xl lg:text-4xl mt-2 mb-4">
              Birlikte büyüyelim
            </h2>
            <p className="text-charcoal-500 mb-8 leading-relaxed">
              İşletmeniz için özel fiyat teklifi almak veya ürün kataloğumuzu incelemek için
              bizimle iletişime geçin. Uzman satış ekibimiz en kısa sürede yanınızda olacak.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/iletisim" className="btn-primary px-8 py-3.5 text-base">
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
