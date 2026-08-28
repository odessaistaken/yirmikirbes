"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone, Mail, MapPin, Clock, MessageCircle,
  Send, CheckCircle, AlertCircle, Building2,
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
    title: "Telefon",
    lines: ["0501 073 71 13"],
    sub: "Pzt–Cum: 08:30–18:00",
    href: "tel:+905010737113",
    cta: "Ara",
  },
  {
    icon: <MessageCircle size={22} />,
    title: "WhatsApp",
    lines: ["0501 073 71 13"],
    sub: "7/24 Hızlı yanıt için tercih edin",
    href: "https://wa.me/905010737113?text=Merhaba,%2020:45%20Pastac%C4%B1l%C4%B1k%20/ %20YKB%20G%C4%B1da%20bilgi%20almak%20istiyorum.",
    cta: "Mesaj Gönder",
  },
  {
    icon: <Mail size={22} />,
    title: "E-posta",
    lines: ["ykbgida@gmail.com"],
    sub: "En kısa sürede dönüş sağlanır",
    href: "mailto:ykbgida@gmail.com",
    cta: "E-posta Gönder",
  },
  {
    icon: <MapPin size={22} />,
    title: "Firma / Adres",
    lines: ["YKB GIDA - 20:45 Pastacılık", "İstanbul, Türkiye"],
    sub: "B2B Toptan Tedarik",
    href: "https://maps.google.com",
    cta: "Haritada Gör",
  },
];

const subjects = [
  "Ürün ve Fiyat Bilgisi",
  "Toplu Sipariş Teklifi",
  "Distribütörlük Başvurusu",
  "Teknik Destek",
  "Şikayet / Öneri",
  "Diğer",
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
      /* Write to Firestore `contact_messages` collection */
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
      setError("Mesajınız gönderilemedi. Lütfen e-posta ile iletişime geçin.");
    }
  }

  return (
    <div className="min-h-screen bg-[#121316] text-slate-200">

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="bg-[#0D0E11] pt-12 pb-14 border-b border-[#282C36]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label">İletişim</span>
            <h1 className="font-heading font-bold text-white text-4xl md:text-5xl mt-2 mb-3">
              Bize Ulaşın
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl">
              B2B fiyat teklifi, distribütörlük başvurusu veya ürün bilgisi için
              uzman ekibimizle iletişime geçin.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Contact cards ──────────────────────────────────────────────────── */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactCards.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-[#1B1D23] border border-[#282C36] rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:border-gold/50 hover:-translate-y-1 transition-all duration-300 group block"
            >
              <div className="w-11 h-11 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-[#0D0E11] transition-all duration-200">
                {card.icon}
              </div>
              <p className="font-heading font-bold text-white text-sm mb-2 group-hover:text-gold transition-colors">{card.title}</p>
              {card.lines.map((line) => (
                <p key={line} className="text-slate-300 text-sm">{line}</p>
              ))}
              <p className="text-slate-400 text-xs mt-2 flex items-center gap-1">
                <Clock size={10} className="shrink-0" />
                {card.sub}
              </p>
              <span className="inline-flex items-center gap-1 text-gold text-xs font-bold mt-3 group-hover:underline">
                {card.cta} →
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* ── Main section: form + map ──────────────────────────────────────── */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-[#1B1D23] border border-[#282C36] rounded-2xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                  <Send size={18} />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-white text-xl">Mesaj Gönderin</h2>
                  <p className="text-slate-400 text-xs mt-0.5">En geç 24 saat içinde yanıt veririz</p>
                </div>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-xl mb-2">Mesajınız İletildi!</h3>
                  <p className="text-slate-300 text-sm mb-6">
                    Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                  </p>
                  <button onClick={() => setSent(false)} className="btn-primary shadow-gold">
                    Yeni Mesaj Gönder
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-xs font-semibold mb-1.5">Ad Soyad *</label>
                      <input {...register("name")} placeholder="Adınız Soyadınız" className={`input ${errors.name ? "input-error" : ""}`} />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-slate-300 text-xs font-semibold mb-1.5">Firma Adı *</label>
                      <input {...register("company")} placeholder="Firma / İşletme Adı" className={`input ${errors.company ? "input-error" : ""}`} />
                      {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-xs font-semibold mb-1.5">E-posta *</label>
                      <input {...register("email")} type="email" placeholder="firma@email.com" className={`input ${errors.email ? "input-error" : ""}`} />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-slate-300 text-xs font-semibold mb-1.5">Telefon *</label>
                      <input {...register("phone")} type="tel" placeholder="05XX XXX XX XX" className={`input ${errors.phone ? "input-error" : ""}`} />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 text-xs font-semibold mb-1.5">Konu *</label>
                    <select {...register("subject")} className={`input ${errors.subject ? "input-error" : ""}`}>
                      <option value="" className="bg-[#1B1D23] text-slate-400">Konu seçiniz...</option>
                      {subjects.map((s) => <option key={s} value={s} className="bg-[#1B1D23] text-white">{s}</option>)}
                    </select>
                    {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-slate-300 text-xs font-semibold mb-1.5">Mesajınız *</label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Mesajınızı buraya yazın... Ürün adı, talep ettiğiniz miktar ve teslimat tercihinizi belirtirseniz daha hızlı yanıt verebiliriz."
                      className={`input resize-none ${errors.message ? "input-error" : ""}`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <AlertCircle size={15} className="text-red-400 shrink-0" />
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3.5 text-base mt-2 shadow-gold hover:shadow-gold-lg">
                    {isSubmitting ? (
                      <span className="animate-spin w-4 h-4 border-2 border-slate-700 border-t-black rounded-full" />
                    ) : (
                      <>
                        <Send size={17} />
                        Mesajı Gönder
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right side info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-[#282C36] shadow-card bg-[#16181D] relative h-64">
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#16181D] gap-3">
                <MapPin size={28} className="text-gold" />
                <p className="text-white font-semibold text-sm">Bağcılar, İstanbul</p>
                <a
                  href="https://maps.google.com/?q=Bagcilar+Istanbul"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold-outline text-xs py-1.5 px-4"
                >
                  Haritada Aç
                </a>
              </div>
            </div>

            {/* Working hours */}
            <div className="bg-[#1B1D23] border border-[#282C36] rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-gold" />
                <h3 className="font-heading font-semibold text-white text-sm">Çalışma Saatleri</h3>
              </div>
              <div className="space-y-2.5">
                {[
                  { days: "Pazartesi – Cuma", hours: "08:30 – 18:00" },
                  { days: "Cumartesi", hours: "09:00 – 14:00" },
                  { days: "Pazar", hours: "Kapalı" },
                ].map((row) => (
                  <div key={row.days} className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">{row.days}</span>
                    <span className={`text-sm font-medium ${row.hours === "Kapalı" ? "text-red-400" : "text-gold font-bold"}`}>
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Company quick info */}
            <div className="bg-[#16181D] border border-[#282C36] rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={16} className="text-gold" />
                <h3 className="font-heading font-semibold text-white text-sm">Şirket Bilgileri</h3>
              </div>
              <div className="space-y-2.5 text-sm">
                {[
                  { label: "Unvan", value: "20:45 Pastacılık Gıda A.Ş." },
                  { label: "Vergi Dairesi", value: "Bağcılar VD" },
                  { label: "Vergi No", value: "1234567890" },
                  { label: "Ticaret Sicil", value: "İstanbul / 123456" },
                ].map((row) => (
                  <div key={row.label} className="flex items-start gap-2">
                    <span className="text-slate-400 w-28 shrink-0">{row.label}</span>
                    <span className="text-slate-200 font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
