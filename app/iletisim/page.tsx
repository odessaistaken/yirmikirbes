"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone, Mail, MapPin, Clock, MessageCircle,
  Send, CheckCircle, AlertCircle, Building2, Navigation,
  ChevronRight, ShieldCheck, Sparkles,
} from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  company: z.string().min(2, "Firma adı gereklidir"),
  email: z.string().email("Geçerli bir e-posta girin"),
  phone: z.string().min(10, "Geçerli bir telefon girin"),
  subject: z.string().min(1, "Konu seçiniz"),
  message: z.string().min(20, "Mesaj en az 20 karakter olmalıdır"),
});
type FormData = z.infer<typeof schema>;

const contactCards = [
  {
    icon: <Phone size={22} />,
    title: "Müşteri Hattı",
    lines: ["0501 073 71 13"],
    sub: "Pzt–Cum: 08:30–18:00",
    href: "tel:+905010737113",
    cta: "Hemen Ara",
    badge: "Doğrudan İletişim",
  },
  {
    icon: <MessageCircle size={22} />,
    title: "WhatsApp Sipariş",
    lines: ["0501 073 71 13"],
    sub: "7/24 hızlı katalog ve fiyat teklifi",
    href: "https://wa.me/905010737113?text=Merhaba,%2020:45%20Pastac%C4%B1l%C4%B1k%20/%20YKB%20G%C4%B1da%20bilgi%20ve%20fiyat%20teklifi%20almak%20istiyorum.",
    cta: "WhatsApp'tan Yaz",
    badge: "Hızlı Yanıt",
  },
  {
    icon: <Mail size={22} />,
    title: "E-Posta",
    lines: ["ykbgida@gmail.com"],
    sub: "Resmi teklif ve kurumsal talepler",
    href: "mailto:ykbgida@gmail.com",
    cta: "E-Posta Gönder",
    badge: "Kurumsal",
  },
  {
    icon: <MapPin size={22} />,
    title: "Merkez Ofis & Depo",
    lines: ["Yeni, 5105. Sk. No:46", "41420 Çayırova / Kocaeli"],
    sub: "YKB Gıda — 20:45 Pastacılık",
    href: "https://maps.app.goo.gl/73MbWwGjFQdZ2mLE6",
    cta: "Haritada Aç",
    badge: "Konum",
  },
];

const subjects = [
  "Toptan Ürün ve Fiyat Bilgisi",
  "Düzenli B2B Tedarik Anlaşması",
  "Özel Müşteri Sunum Kataloğu Talebi",
  "Distribütörlük / Bayilik Başvurusu",
  "Teknik & Barista Destek",
  "Diğer Kurumsal Konular",
];

export default function IletisimPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setError(null);
    try {
      const { requireDb } = await import("@/lib/firebase");
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      await addDoc(collection(requireDb(), "contact_messages"), {
        ...data,
        createdAt: serverTimestamp(),
        status: "new",
      });
      setSent(true);
      reset();
    } catch (err) {
      console.error(err);
      setError("Mesajınız gönderilemedi. Lütfen doğrudan WhatsApp veya telefon ile iletişime geçin.");
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <Link href="/" className="hover:text-gold-600 transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight size={12} />
            <span className="text-gold-600 font-semibold">İletişim</span>
          </div>
        </div>
      </div>

      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-12 pb-16 border-b border-slate-200 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/10 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold-600 text-xs font-bold uppercase tracking-wider mb-4"
            >
              <Sparkles size={14} />
              <span>B2B Hızlı İletişim & Tedarik Hattı</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-extrabold text-slate-900 text-3xl sm:text-5xl tracking-tight leading-tight mb-4"
            >
              İşletmeniz İçin <span className="gold-text">Doğrudan İletişime Geçin</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-600 text-base sm:text-lg leading-relaxed"
            >
              Pastane, kafe, otel ve fırın işletmelerinizin tüm hammadde, sos, püre ve pasta ihtiyaçları için
              deneyimli satış ve lojistik ekibimizle anında görüşün.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Contact Quick Cards ─────────────────────────────────────────────── */}
      <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {contactCards.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-card-hover hover:border-gold hover:-translate-y-1 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold-600 flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all duration-200">
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                    {card.badge}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-base mb-1.5 group-hover:text-gold-600 transition-colors">
                  {card.title}
                </h3>
                {card.lines.map((line) => (
                  <p key={line} className="text-slate-700 text-sm font-semibold">{line}</p>
                ))}
                <p className="text-slate-500 text-xs mt-2 flex items-center gap-1.5">
                  <Clock size={11} className="shrink-0 text-gold-600" />
                  {card.sub}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-gold-600 text-xs font-bold group-hover:underline flex items-center gap-1">
                  {card.cta} →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── Main Section: Form (Left 7 cols) & Info + Map (Right 5 cols) ────── */}
      <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Left Column: Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-soft-lg relative">
              <div className="flex items-center gap-3.5 mb-8 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold-600 flex items-center justify-center shrink-0">
                  <Send size={20} />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-slate-900 text-xl sm:text-2xl">
                    Kurumsal İletişim & Fiyat Teklifi Formu
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                    İşletme bilgilerinizi ve talebinizi iletin, satış temsilcimiz aynı gün içinde teklifinizi hazırlasın.
                  </p>
                </div>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-14"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-2xl mb-2">
                    Talebiniz Alındı!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                    Mesajınız müşteri temsilcimize başarıyla iletildi. En kısa sürede telefon veya e-posta yoluyla sizinle irtibat kurulacaktır.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="btn-primary shadow-gold py-3 px-6 rounded-xl"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                        Ad Soyad *
                      </label>
                      <input
                        {...register("name")}
                        placeholder="Örn: Ahmet Yılmaz"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all ${
                          errors.name ? "border-red-400 ring-2 ring-red-100" : "border-slate-200"
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                        Firma / İşletme Adı *
                      </label>
                      <input
                        {...register("company")}
                        placeholder="Örn: Gurme Fırın & Kafe"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all ${
                          errors.company ? "border-red-400 ring-2 ring-red-100" : "border-slate-200"
                        }`}
                      />
                      {errors.company && <p className="text-red-500 text-xs mt-1.5">{errors.company.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                        Kurumsal E-Posta *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="ornek@isletmeniz.com"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all ${
                          errors.email ? "border-red-400 ring-2 ring-red-100" : "border-slate-200"
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                        Telefon Numarası *
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="05XX XXX XX XX"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all ${
                          errors.phone ? "border-red-400 ring-2 ring-red-100" : "border-slate-200"
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                      Talep Konusu *
                    </label>
                    <select
                      {...register("subject")}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all ${
                        errors.subject ? "border-red-400 ring-2 ring-red-100" : "border-slate-200"
                      }`}
                    >
                      <option value="" className="text-slate-400">Konu başlığı seçiniz...</option>
                      {subjects.map((s) => (
                        <option key={s} value={s} className="text-slate-800">
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1.5">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                      Mesajınız & Talep Detayları *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="İhtiyaç duyduğunuz ürün kategorilerini, tahmini aylık sipariş hacminizi veya lokasyonunuzu belirtiniz..."
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm placeholder:text-slate-400 resize-none focus:bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all ${
                        errors.message ? "border-red-400 ring-2 ring-red-100" : "border-slate-200"
                      }`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message.message}</p>}
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                      <AlertCircle size={16} className="text-red-500 shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 text-base rounded-xl shadow-gold hover:shadow-gold-lg flex items-center justify-center gap-2 mt-3"
                  >
                    {isSubmitting ? (
                      <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                    ) : (
                      <>
                        <Send size={18} />
                        Mesajı Gönder
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right Column: Interactive Map & Details (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Google Maps Container */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-soft-lg bg-white flex flex-col">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold-600 flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                      Depo & Ofis Konumumuz
                    </h3>
                    <p className="text-slate-500 text-xs">Çayırova / Kocaeli</p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/73MbWwGjFQdZ2mLE6"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold-outline text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 hover:shadow-gold transition-all"
                >
                  <Navigation size={13} />
                  Yol Tarifi Al
                </a>
              </div>

              <div className="relative w-full h-72 sm:h-80 bg-slate-100">
                <iframe
                  title="YKB Gıda / 20:45 Pastacılık Harita Konumu"
                  src="https://maps.google.com/maps?q=40.8210718,29.3710342&hl=tr&z=16&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="text-slate-600">
                  <span className="font-semibold text-slate-900">Adres: </span>
                  Yeni, 5105. Sk. No:46, 41420 Çayırova/Kocaeli
                </div>
                <a
                  href="https://maps.app.goo.gl/73MbWwGjFQdZ2mLE6"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold-600 hover:underline font-bold flex items-center gap-1 shrink-0"
                >
                  Haritada Aç →
                </a>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <Clock size={18} className="text-gold-600" />
                  <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                    Çalışma Saatlerimiz
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 text-2xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Mesai Saatleri
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { days: "Pazartesi – Cuma", hours: "08:30 – 18:00" },
                  { days: "Cumartesi", hours: "09:00 – 14:00" },
                  { days: "Pazar", hours: "Kapalı (Sadece Acil Lojistik)" },
                ].map((row) => (
                  <div key={row.days} className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-600">{row.days}</span>
                    <span className={`font-semibold ${row.hours.includes("Kapalı") ? "text-slate-400" : "text-slate-900"}`}>
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate & Logistics Info */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
                <Building2 size={18} className="text-gold-600" />
                <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                  Kurumsal Bilgiler
                </h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm">
                {[
                  { label: "Ticari Unvan", value: "20:45 Pastacılık — YKB Gıda Ltd. Şti." },
                  { label: "Sevkiyat Ağı", value: "Türkiye Geneli 81 İl & Marmara Soğuk Zincir" },
                  { label: "Sektörel Segment", value: "B2B Pastacılık & Barista Toptan Tedarik" },
                ].map((row) => (
                  <div key={row.label} className="flex items-start gap-2">
                    <span className="text-slate-500 w-32 shrink-0">{row.label}:</span>
                    <span className="text-slate-800 font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Direct Banner */}
            <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-heading font-bold text-slate-900 text-sm">
                  Acil Sipariş & Canlı WhatsApp Danışmanı
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  Mesai saatlerinde ortalama yanıt süremiz 5 dakikadır.
                </p>
              </div>
              <a
                href="https://wa.me/905010737113?text=Merhaba,%20hızlı%20teklif%20ve%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all duration-200 shrink-0 flex items-center gap-2"
              >
                <MessageCircle size={16} />
                WhatsApp&apos;a Başla
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
