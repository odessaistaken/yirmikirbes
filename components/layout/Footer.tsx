import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import Logo from "@/components/Logo";
import { CATEGORIES as MOCK_CATEGORIES } from "@/lib/mock-data";
import { getActiveCategories } from "@/lib/firestore-collections";

export default async function Footer() {
  const year = new Date().getFullYear();
  let categories = [];
  try {
    categories = await getActiveCategories();
    if (categories.length === 0) categories = MOCK_CATEGORIES;
  } catch {
    categories = MOCK_CATEGORIES;
  }

  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200">
      {/* ── Top CTA Strip ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-slate-50 via-amber-50/40 to-slate-50 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <p className="font-heading font-bold text-slate-900 text-2xl">
              Toptan Sipariş & <span className="gold-text">Fiyat Teklifi</span>
            </p>
            <p className="text-slate-500 text-sm mt-1">
              YKB Gıda & 20:45 Pastacılık B2B müşterileri için özel fiyatlandırma ve hızlı teslimat seçenekleri.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/905010737113?text=Merhaba,%20toptan%20sipari%C5%9F%20ve%20fiyat%20teklifi%20almak%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-md hover:scale-105"
            >
              <MessageCircle size={18} />
              WhatsApp&apos;tan Ulaşın
            </a>
            <Link
              href="/iletisim"
              className="flex items-center gap-2 bg-gold hover:bg-gold-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-gold hover:-translate-y-0.5"
            >
              Teklif Alın
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Footer ───────────────────────────────────────────── */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-5">
            <Link href="/" className="inline-block group">
              <Logo variant="dark" size={44} />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              YKB Gıda güvencesiyle 20:45 Pastacılık, profesyonel pastacılık ve fırıncılık endüstrisine yönelik premium hammadde,
              yarı mamul ve yardımcı ürünler sunar.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/905010737113"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="mailto:ykbgida@gmail.com"
                className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-gold hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200 border border-slate-200"
                aria-label="E-posta"
              >
                <Mail size={16} />
              </a>
              <a
                href="tel:+905010737113"
                className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-gold hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200 border border-slate-200"
                aria-label="Telefon"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-slate-900 text-sm uppercase tracking-wider mb-5">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Ana Sayfa", href: "/" },
                { label: "Çok Satanlar 🔥", href: "/cok-satanlar" },
                { label: "Ürün Kataloğu", href: "/katalog" },
                { label: "Hakkımızda", href: "/hakkimizda" },
                { label: "İletişim", href: "/iletisim" },
                { label: "Giriş Yap", href: "/giris" },
                { label: "Kayıt Ol", href: "/kayit" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-gold-600 text-sm transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/60 group-hover:bg-gold transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading font-semibold text-slate-900 text-sm uppercase tracking-wider mb-5">
              Ürün Kategorileri
            </h3>
            <ul className="space-y-2.5">
              {categories.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/katalog/${cat.slug}`}
                    className="text-slate-600 hover:text-gold-600 text-sm transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/60 group-hover:bg-gold transition-colors" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-slate-900 text-sm uppercase tracking-wider mb-5">
              İletişim Bilgileri
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-gold" />
                </div>
                <div>
                  <p className="text-slate-900 text-sm font-medium">Firma / Adres</p>
                  <a
                    href="https://maps.app.goo.gl/73MbWwGjFQdZ2mLE6"
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-gold-600 text-xs leading-relaxed mt-0.5 block transition-colors group"
                  >
                    <strong className="text-slate-700 group-hover:text-gold-600 transition-colors">YKB GIDA - 20:45 Pastacılık</strong><br />
                    Yeni, 5105. Sk. No:46, 41420 Çayırova/Kocaeli
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-gold" />
                </div>
                <div>
                  <p className="text-slate-900 text-sm font-medium">Telefon & WhatsApp</p>
                  <a
                    href="tel:+905010737113"
                    className="text-slate-500 hover:text-gold-600 text-xs transition-colors mt-0.5 block"
                  >
                    0501 073 71 13
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-gold" />
                </div>
                <div>
                  <p className="text-slate-900 text-sm font-medium">E-posta</p>
                  <a
                    href="mailto:ykbgida@gmail.com"
                    className="text-slate-500 hover:text-gold-600 text-xs transition-colors mt-0.5 block"
                  >
                    ykbgida@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ────────────────────────────────────────────── */}
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs text-center sm:text-left">
            © {year} 20:45 Pastacılık — YKB GIDA. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {[
              { label: "Gizlilik Politikası", href: "/gizlilik" },
              { label: "Kullanım Koşulları", href: "/kosullar" },
              { label: "KVKK", href: "/kvkk" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-500 hover:text-slate-800 text-xs transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
