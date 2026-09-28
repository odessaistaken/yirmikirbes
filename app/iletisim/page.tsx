"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ArrowUpRight,
  Building2,
  Truck,
  Globe,
  ShieldCheck,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════
   SCHEMA
════════════════════════════════════════════════════════════ */
const schema = z.object({
  name: z.string().min(2, "En az 2 karakter giriniz"),
  company: z.string().min(2, "Firma adı zorunludur"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  subject: z.string().min(1, "Talep konusu seçiniz"),
  message: z.string().min(20, "En az 20 karakter giriniz"),
});
type FormData = z.infer<typeof schema>;

/* ════════════════════════════════════════════════════════════
   STATIC DATA
════════════════════════════════════════════════════════════ */
const CONTACT_ITEMS = [
  {
    label: "Satış Hattı",
    value: "0501 073 71 13",
    sub: "Pazartesi – Cuma, 08:30 – 18:00",
    href: "tel:+905010737113",
    Icon: Phone,
  },
  {
    label: "E-Posta",
    value: "ykbgida@gmail.com",
    sub: "Kurumsal talep ve teklifler",
    href: "mailto:ykbgida@gmail.com",
    Icon: Mail,
  },
  {
    label: "Adres",
    value: "5105. Sk. No:46, Çayırova",
    sub: "41420 Kocaeli / Türkiye",
    href: "https://maps.app.goo.gl/73MbWwGjFQdZ2mLE6",
    Icon: MapPin,
  },
  {
    label: "WhatsApp",
    value: "0501 073 71 13",
    sub: "7/24 hızlı sipariş hattı",
    href: "https://wa.me/905010737113?text=Merhaba,%20fiyat%20teklifi%20almak%20istiyorum.",
    Icon: MessageCircle,
  },
];

const SUBJECTS = [
  "B2B Tedarik Anlaşması",
  "Distribütörlük / Bayilik Başvurusu",
  "Özel Katalog Talebi",
  "Teknik & Barista Destek",
  "Diğer Kurumsal Konular",
];

const CREDENTIALS = [
  { Icon: Globe, title: "4 İl", sub: "" },
  { Icon: Truck, title: "Soğuk Zincir", sub: "" },
  { Icon: Building2, title: "B2B Odaklı", sub: "" },
  { Icon: ShieldCheck, title: "Güvenilir", sub: "" },
];

const WORKING_HOURS = [
  { day: "Pazartesi – Cuma", time: "08:30 – 18:00", open: true },
  { day: "Cumartesi", time: "09:00 – 14:00", open: true },
  { day: "Pazar", time: "Kapalı", open: false },
];

/* ════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
════════════════════════════════════════════════════════════ */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/* ════════════════════════════════════════════════════════════
   SCROLL-AWARE FADE
════════════════════════════════════════════════════════════ */
function Reveal({
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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   FORM FIELD
════════════════════════════════════════════════════════════ */
function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-400">
        {label}
      </label>
      {children}
      {error && (
        <span className="flex items-center gap-1 text-[11px] text-red-400">
          <AlertCircle size={10} />
          {error}
        </span>
      )}
    </div>
  );
}

const fieldCls = (hasError?: boolean) =>
  `w-full px-3.5 py-3 text-sm bg-white border rounded-lg text-slate-900 placeholder:text-slate-300 outline-none transition-all duration-150 ${hasError
    ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
    : "border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/15"
  }`;

/* ════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════ */
export default function IletisimPage() {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setSubmitError(null);
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
    } catch {
      setSubmitError(
        "Mesajınız gönderilemedi. Lütfen doğrudan telefon veya WhatsApp ile ulaşın."
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      {/* ══════════════════════════════════════════════════════
          BREADCRUMB BAR
      ══════════════════════════════════════════════════════ */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-3.5 flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-700 transition-colors">Ana Sayfa</Link>
          <ChevronRight size={11} />
          <span className="text-slate-700 font-medium">İletişim</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          PAGE HEADER — Minimal & Authoritative
      ══════════════════════════════════════════════════════ */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold mb-4">
                Kurumsal İletişim
              </p>
              <h1 className="font-heading font-extrabold text-slate-900 text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight tracking-tight">
                Satış ve Tedarik Ekibimizle
                <br className="hidden sm:block" />
                <span className="gold-text"> Doğrudan İletişime Geçin</span>
              </h1>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm lg:text-right">
              Pastane, kafe, otel ve fırın işletmelerine yönelik B2B toptan tedarik için
              deneyimli satış ekibimiz hizmetinizde.
            </p>
          </div>

          {/* Gold rule */}
          <div className="mt-10 h-px bg-gradient-to-r from-gold/60 via-gold/20 to-transparent" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          CREDENTIALS ROW
      ══════════════════════════════════════════════════════ */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
            {CREDENTIALS.map(({ Icon, title, sub }, i) => (
              <Reveal key={title} delay={i * 0.06} className="py-6 px-6 flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-gold/8 text-gold flex items-center justify-center shrink-0">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="font-heading font-bold text-slate-900 text-sm">{title}</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">{sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN SPLIT: LEFT INFO  |  RIGHT FORM
      ══════════════════════════════════════════════════════ */}
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ── LEFT COLUMN (5 cols) ──────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col gap-8">

            {/* Contact details */}
            <Reveal>
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="px-7 py-5 border-b border-slate-50 bg-slate-50/60">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400">
                    İletişim Kanalları
                  </p>
                </div>
                <motion.ul variants={stagger} initial="hidden" animate="show">
                  {CONTACT_ITEMS.map(({ label, value, sub, href, Icon }) => (
                    <motion.li key={label} variants={item}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="group flex items-start gap-4 px-7 py-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition-colors duration-150"
                      >
                        <div className="w-9 h-9 rounded-lg bg-gold/8 text-gold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-gold group-hover:text-white transition-all duration-200">
                          <Icon size={15} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-400 mb-0.5">
                            {label}
                          </p>
                          <p className="text-slate-900 font-semibold text-sm truncate">{value}</p>
                          <p className="text-slate-400 text-xs mt-0.5">{sub}</p>
                        </div>
                        <ArrowUpRight
                          size={14}
                          className="text-slate-300 group-hover:text-gold shrink-0 mt-1 transition-colors"
                        />
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </Reveal>

            {/* Map */}
            <Reveal delay={0.05}>
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="px-7 py-5 border-b border-slate-50 bg-slate-50/60 flex items-center justify-between">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400">
                    Konum
                  </p>
                  <a
                    href="https://maps.app.goo.gl/73MbWwGjFQdZ2mLE6"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold text-gold hover:underline flex items-center gap-1"
                  >
                    Google Maps&rsquo;te Aç
                    <ArrowUpRight size={11} />
                  </a>
                </div>
                <div className="h-52">
                  <iframe
                    title="20:45 Pastacılık Konum"
                    src="https://maps.google.com/maps?q=40.8210718,29.3710342&hl=tr&z=16&output=embed"
                    className="w-full h-full border-0 grayscale"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="px-7 py-4 bg-slate-50/60 text-xs text-slate-500 flex items-start gap-2">
                  <MapPin size={12} className="text-gold shrink-0 mt-0.5" />
                  5105. Sk. No:46, 41420 Çayırova / Kocaeli — YKB Gıda
                </div>
              </div>
            </Reveal>

            {/* Working Hours */}
            <Reveal delay={0.08}>
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="px-7 py-5 border-b border-slate-50 bg-slate-50/60 flex items-center justify-between">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400">
                    Çalışma Saatleri
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Aktif
                  </span>
                </div>
                <ul>
                  {WORKING_HOURS.map(({ day, time, open }) => (
                    <li
                      key={day}
                      className="flex items-center justify-between px-7 py-4 border-b border-slate-50 last:border-0"
                    >
                      <span className="text-slate-500 text-sm">{day}</span>
                      <span className={`text-sm font-semibold ${open ? "text-slate-800" : "text-slate-300"}`}>
                        {time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

          </div>

          {/* ── RIGHT COLUMN: FORM (7 cols) ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

              {/* Form header */}
              <div className="px-8 sm:px-10 pt-10 pb-8 border-b border-slate-50">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-1 h-5 rounded-full bg-gold" />
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-slate-400">
                    Kurumsal Talep Formu
                  </p>
                </div>
                <h2 className="font-heading font-bold text-slate-900 text-xl sm:text-2xl mt-3">
                  Fiyat Teklifi & İş Ortaklığı Başvurusu
                </h2>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Formu doldurun, satış temsilcimiz <strong className="text-slate-600">aynı iş günü</strong> içinde sizinle iletişime geçsin.
                </p>
              </div>

              <div className="px-8 sm:px-10 py-8">
                {/* ── Success ── */}
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-5">
                      <CheckCircle size={28} className="text-emerald-500" />
                    </div>
                    <h3 className="font-heading font-bold text-slate-900 text-xl mb-2">
                      Talebiniz Alındı
                    </h3>
                    <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-8">
                      Müşteri temsilcimiz en geç 1 iş günü içinde sizinle telefon veya e-posta
                      yoluyla iletişime geçecektir.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="btn-secondary rounded-lg px-6 py-2.5 text-sm"
                    >
                      Yeni Talep Oluştur
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <FormField label="Ad Soyad *" error={errors.name?.message}>
                        <input
                          {...register("name")}
                          autoComplete="name"
                          placeholder="Ahmet Yılmaz"
                          className={fieldCls(!!errors.name)}
                        />
                      </FormField>
                      <FormField label="Firma / İşletme *" error={errors.company?.message}>
                        <input
                          {...register("company")}
                          autoComplete="organization"
                          placeholder="YKB Gıda A.Ş."
                          className={fieldCls(!!errors.company)}
                        />
                      </FormField>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <FormField label="E-Posta *" error={errors.email?.message}>
                        <input
                          {...register("email")}
                          type="email"
                          autoComplete="email"
                          placeholder="ornek@firma.com"
                          className={fieldCls(!!errors.email)}
                        />
                      </FormField>
                      <FormField label="Telefon *" error={errors.phone?.message}>
                        <input
                          {...register("phone")}
                          type="tel"
                          autoComplete="tel"
                          placeholder="05XX XXX XX XX"
                          className={fieldCls(!!errors.phone)}
                        />
                      </FormField>
                    </div>

                    {/* Subject */}
                    <FormField label="Talep Konusu *" error={errors.subject?.message}>
                      <select
                        {...register("subject")}
                        className={fieldCls(!!errors.subject)}
                      >
                        <option value="">Seçiniz...</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </FormField>

                    {/* Message */}
                    <FormField label="Mesaj / Talep Detayı *" error={errors.message?.message}>
                      <textarea
                        {...register("message")}
                        rows={5}
                        placeholder="İhtiyaç duyduğunuz ürün kategorileri, tahmini aylık sipariş hacmi veya özel taleplerinizi belirtiniz."
                        className={`${fieldCls(!!errors.message)} resize-none`}
                      />
                    </FormField>

                    {/* Divider */}
                    <div className="h-px bg-slate-100" />

                    {/* Submit error */}
                    {submitError && (
                      <div className="flex items-start gap-2.5 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                        <AlertCircle size={15} className="shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary rounded-lg px-8 py-3.5 text-sm shadow-gold flex items-center gap-2.5 disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Send size={15} />
                        )}
                        {isSubmitting ? "Gönderiliyor..." : "Talebi İlet"}
                      </button>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Bilgileriniz yalnızca bu talep kapsamında işlenir ve üçüncü taraflarla
                        paylaşılmaz.
                      </p>
                    </div>

                    {/* WhatsApp alternative */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex-1 h-px bg-slate-100" />
                      <span className="text-xs text-slate-400 whitespace-nowrap">veya</span>
                      <div className="flex-1 h-px bg-slate-100" />
                    </div>

                    <a
                      href="https://wa.me/905010737113?text=Merhaba,%20fiyat%20teklifi%20almak%20istiyorum."
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-semibold hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-150"
                    >
                      <MessageCircle size={16} />
                      WhatsApp ile Hızlı Teklif Al
                    </a>

                  </form>
                )}
              </div>
            </div>

            {/* Bottom disclaimer */}
            <div className="mt-5 px-1 flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
              <ShieldCheck size={12} className="text-gold shrink-0 mt-0.5" />
              <span>
                Bu form aracılığıyla iletilen bilgiler yalnızca talep değerlendirmesi amacıyla
                kullanılır. Gizlilik politikamız kapsamında güvence altındadır.
              </span>
            </div>
          </motion.div>

        </div>
      </div>



    </div>
  );
}
