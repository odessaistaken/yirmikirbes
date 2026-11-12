"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Search, Flame, MessageCircle } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Admin sayfalarında mobil alt menüyü gizle
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleOpenSearch = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-global-search"));
    }
  };

  const whatsappNumber = "905010737113";
  const defaultMessage = encodeURIComponent(
    "Merhaba, 20:45 Pastacılık / YKB Gıda web sitenizden ulaşıyorum. Bilgi almak istiyorum."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <nav
      aria-label="Mobil Alt Menü"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-1 items-center">
        {/* 1. Ana Sayfa */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center h-full gap-0.5 transition-colors ${
            isActive("/") ? "text-amber-600 font-bold" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Home size={20} className={isActive("/") ? "stroke-[2.5]" : "stroke-[1.8]"} />
          <span className="text-[10px] tracking-tight">Ana Sayfa</span>
        </Link>

        {/* 2. Katalog */}
        <Link
          href="/katalog"
          className={`flex flex-col items-center justify-center h-full gap-0.5 transition-colors ${
            isActive("/katalog") ? "text-amber-600 font-bold" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <LayoutGrid size={20} className={isActive("/katalog") ? "stroke-[2.5]" : "stroke-[1.8]"} />
          <span className="text-[10px] tracking-tight">Katalog</span>
        </Link>

        {/* 3. Arama */}
        <button
          onClick={handleOpenSearch}
          className="flex flex-col items-center justify-center h-full gap-0.5 text-slate-500 hover:text-amber-600 transition-colors"
          title="Ürün veya kategori ara"
        >
          <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center -mt-1 shadow-sm border border-amber-200/80">
            <Search size={18} className="stroke-[2.2]" />
          </div>
          <span className="text-[10px] tracking-tight font-medium text-amber-800">Ara</span>
        </button>

        {/* 4. Çok Satanlar */}
        <Link
          href="/cok-satanlar"
          className={`flex flex-col items-center justify-center h-full gap-0.5 transition-colors ${
            isActive("/cok-satanlar") ? "text-amber-600 font-bold" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Flame size={20} className={isActive("/cok-satanlar") ? "text-amber-600 fill-amber-500/20 stroke-[2.5]" : "stroke-[1.8]"} />
          <span className="text-[10px] tracking-tight">Çok Satan</span>
        </Link>

        {/* 5. WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-full gap-0.5 text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <div className="relative">
            <MessageCircle size={20} className="stroke-[2.2] fill-emerald-500/10" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="text-[10px] tracking-tight font-medium text-emerald-700">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}

