"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone, Mail, MapPin, Clock, MessageCircle,
  Send, CheckCircle, AlertCircle, Building2, Navigation,
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
    lines: ["Yeni, 5105. Sk. No:46", "41420 Çayırova / Kocaeli"],
    sub: "YKB GIDA - 20:45 Pastacılık",
    href: "https://maps.app.goo.gl/73MbWwGjFQdZ2mLE6",
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="bg-white pt-12 pb-14 border-b border-slate-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label">İletişim</span>
            <h1 className="font-heading font-bold text-slate-900 text-4xl md:text-5xl mt-2 mb-3">
              Bize Ulaşın
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl">
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
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-card-hover hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 group block"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-all duration-200">
                {card.icon}
              </div>
              <p className="font-heading font-bold text-slate-900 text-sm mb-2 group-hover:text-amber-700 transition-colors">{card.title}</p>
              {card.lines.map((line) => (
                <p key={line} className="text-slate-600 text-sm">{line}</p>
              ))}
              <p className="text-slate-500 text-xs mt-2 flex items-center gap-1">
                <Clock size={10} className="shrink-0" />
                {card.sub}
              </p>
              <span className="inline-flex items-center gap-1 text-amber-700 text-xs font-bold mt-3 group-hover:underline">
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
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Send size={18} />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-slate-900 text-xl">Mesaj Gönderin</h2>
                  <p className="text-slate-500 text-xs mt-0.5">En geç 24 saat içinde yanıt veririz</p>
                </div>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-xl mb-2">Mesajınız İletildi!</h3>
                  <p className="text-slate-600 text-sm mb-6">
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
                      <label className="block text-slate-700 text-xs font-semibold mb-1.5">Ad Soyad *</label>
                      <input {...register("name")} placeholder="Adınız Soyadınız" className={`input ${errors.name ? "input-error" : ""}`} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-slate-700 text-xs font-semibold mb-1.5">Firma Adı *</label>
                      <input {...register("company")} placeholder="Firma / İşletme Adı" className={`input ${errors.company ? "input-error" : ""}`} />
                      {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 text-xs font-semibold mb-1.5">E-posta *</label>
                      <input {...register("email")} type="email" placeholder="firma@email.com" className={`input ${errors.email ? "input-error" : ""}`} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-slate-700 text-xs font-semibold mb-1.5">Telefon *</label>
                      <input {...register("phone")} type="tel" placeholder="05XX XXX XX XX" className={`input ${errors.phone ? "input-error" : ""}`} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">Konu *</label>
                    <select {...register("subject")} className={`input ${errors.subject ? "input-error" : ""}`}>
                      <option value="" className="text-slate-400">Konu seçiniz...</option>
                      {subjects.map((s) => <option key={s} value={s} className="text-slate-800">{s}</option>)}
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">Mesajınız *</label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Mesajınızı buraya yazın... Ürün adı, talep ettiğiniz miktar ve teslimat tercihinizi belirtirseniz daha hızlı yanıt verebiliriz."
                      className={`input resize-none ${errors.message ? "input-error" : ""}`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle size={15} className="text-red-500 shrink-0" />
                      <p className="text-red-700 text-sm">{error}</p>
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
            {/* Google Maps Container */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white flex flex-col">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-slate-900 text-sm">Konumumuz</h3>
                    <p className="text-slate-500 text-xs">Çayırova / Kocaeli</p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/73MbWwGjFQdZ2mLE6"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold-outline text-xs py-1.5 px-3 flex items-center gap-1.5 hover:shadow-gold transition-all"
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
                  className="text-amber-700 hover:underline font-semibold flex items-center gap-1 shrink-0"
                >
                  Haritada Aç →
                </a>
              </div>
            </div>

            {/* Working hours */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-amber-600" />
                <h3 className="font-heading font-semibold text-slate-900 text-sm">Çalışma Saatleri</h3>
              </div>
              <div className="space-y-2.5">
                {[
                  { days: "Pazartesi – Cuma", hours: "08:30 – 18:00" },
                  { days: "Cumartesi", hours: "09:00 – 14:00" },
                  { days: "Pazar", hours: "Kapalı" },
                ].map((row) => (
                  <div key={row.days} className="flex items-center justify-between">
                    <span className="text-slate-600 text-sm">{row.days}</span>
                    <span className={`text-sm font-medium ${row.hours === "Kapalı" ? "text-red-500" : "text-amber-700 font-bold"}`}>
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Company quick info */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={16} className="text-amber-600" />
                <h3 className="font-heading font-semibold text-slate-900 text-sm">Şirket Bilgileri</h3>
              </div>
              <div className="space-y-2.5 text-sm">
                {[
                  { label: "Unvan", value: "20:45 Pastacılık — YKB Gıda" },
                  { label: "Adres", value: "Yeni, 5105. Sk. No:46, 41420 Çayırova/Kocaeli" },
                  { label: "Dağıtım", value: "81 İl & Marmara B2B Tedarik" },
                  { label: "Ticaret Sicil", value: "Kocaeli / Gebze" },
                ].map((row) => (
                  <div key={row.label} className="flex items-start gap-2">
                    <span className="text-slate-500 w-28 shrink-0">{row.label}</span>
                    <span className="text-slate-800 font-medium">{row.value}</span>
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
