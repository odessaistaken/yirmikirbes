"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  User,
  LogIn,
  LogOut,
  LayoutDashboard,
  ShoppingBag,
  Search,
  Phone,
  ImageIcon,
  AlignLeft,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Logo from "@/components/Logo";
import { CATEGORIES as MOCK_CATEGORIES, PRODUCTS as MOCK_PRODUCTS } from "@/lib/mock-data";
import { getActiveCategories, getProducts, getActiveBrands } from "@/lib/firestore-collections";
import type { Category, Product, Brand } from "@/lib/types";

/* ─── Subcategories & Brand links map (matching active categories) ───────── */
const SUBCATEGORIES_MAP: Record<string, { name: string; href: string }[]> = {
  "pureler": [
    { name: "Caffè NONNO Frozen Püre", href: "/katalog/pureler?search=nonno" },
    { name: "DaVinci Fruit Mix İçecek", href: "/katalog/pureler?search=davinci" },
    { name: "Krater Meyveli Karışımlar", href: "/katalog/pureler?search=krater" },
  ],
  "suruplar": [
    { name: "DaVinci Gourmet Şuruplar", href: "/katalog/suruplar?search=davinci" },
    { name: "Caffè NONNO Şuruplar", href: "/katalog/suruplar?search=nonno" },
    { name: "Monte Cristo Şuruplar", href: "/katalog/suruplar?search=monte%20cristo" },
    { name: "EASY MIX Bar Şurupları", href: "/katalog/suruplar?search=easy%20mix" },
    { name: "Kokteyller →", href: "/katalog/kokteyller" },
  ],
  "kokteyller": [
    { name: "EASY MIX Kokteyl Premiksleri", href: "/katalog/kokteyller?search=easy%20mix" },
    { name: "Meyve Bazlı Kokteyller", href: "/katalog/kokteyller?search=meyve" },
    { name: "Botanik Kokteyl Karışımları", href: "/katalog/kokteyller?search=botanik" },
  ],
  "bar-sos": [
    { name: "DaVinci 2L Soslar (Karamel, Çikolata)", href: "/katalog/bar-sos?search=davinci" },
    { name: "Caffè NONNO 750g Dekor Sosları", href: "/katalog/bar-sos?search=nonno" },
    { name: "Condensed Milk (Koyulaştırılmış Süt)", href: "/katalog/bar-sos?search=condensed" },
    { name: "Blue Curacao Sos", href: "/katalog/bar-sos?search=curacao" },
  ],
  "pastalar": [
    { name: "Taze - Butik Pastalar", href: "/katalog/taze-butik-pastalar" },
    { name: "Donuk Pastalar", href: "/katalog/donuk-pasta" },
  ],
  "taze-butik-pastalar": [
    { name: "El Yapımı Butik Pastalar", href: "/katalog/taze-butik-pastalar?search=butik" },
    { name: "Özel Tasarım Pastalar", href: "/katalog/taze-butik-pastalar?search=ozel" },
  ],
  "donuk-pasta": [
    { name: "Donuk Cheesecake", href: "/katalog/donuk-pasta?search=cheesecake" },
    { name: "Donuk Tiramisu", href: "/katalog/donuk-pasta?search=tiramisu" },
    { name: "Mono Kutu Pastalar", href: "/katalog/donuk-pasta?search=mono" },
    { name: "Dilimli Pastalar", href: "/katalog/donuk-pasta?search=dilimli" },
    { name: "Donuk Unlu Mamuller", href: "/katalog/donuk-pasta?search=ekmek" },
  ],
  "waffle-malzemeleri": [
    { name: "CALLEI Çikolata Kremaları", href: "/katalog/waffle-malzemeleri?search=callei" },
    { name: "Hazır Waffle & Krep Tozu", href: "/katalog/waffle-malzemeleri?search=waffle" },
    { name: "Pasta & Waffle Süslemeleri", href: "/katalog/waffle-malzemeleri?search=draje" },
    { name: "Damla Çikolata Drops", href: "/katalog/waffle-malzemeleri?search=damla" },
    { name: "Fındık Krokan & Topping", href: "/katalog/waffle-malzemeleri?search=krokan" },
  ],
  "kremali-urunler": [
    { name: "Pastacı Kreması (Creme Patissiere)", href: "/katalog/kremali-urunler?search=pastacı" },
    { name: "Chantilly Şanti Tozu", href: "/katalog/kremali-urunler?search=şanti" },
    { name: "Bitter & Beyaz Ganache", href: "/katalog/kremali-urunler?search=ganache" },
  ],
};

/* ─── Mega Menu data ──────────────────────────────────────────────────────── */
const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Katalog", href: "/katalog", hasMega: true },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, userProfile, userRole, logoutUser } = useAuth();
  const megaRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  /* Load categories & products for mega menu and search */
  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods, brnds] = await Promise.all([
          getActiveCategories(),
          getProducts(),
          getActiveBrands(),
        ]);
        if (cats.length > 0) setCategories(cats);
        else {
          setCategories(MOCK_CATEGORIES.map((c, i) => ({
            id: c.id, name: c.name, slug: c.slug,
            imageUrl: "", order: i + 1, isActive: true, description: c.description,
          })));
        }
        if (prods.length > 0) setProducts(prods);
        else {
          setProducts(MOCK_PRODUCTS.map((p, i) => ({
            ...p, codeGroup: "", price: 0, vatRate: 20, order: i + 1,
          })));
        }
        if (brnds.length > 0) setBrands(brnds);
      } catch {
        setCategories(MOCK_CATEGORIES.map((c, i) => ({
          id: c.id, name: c.name, slug: c.slug,
          imageUrl: "", order: i + 1, isActive: true, description: c.description,
        })));
        setProducts(MOCK_PRODUCTS.map((p, i) => ({
          ...p, codeGroup: "", price: 0, vatRate: 20, order: i + 1,
        })));
      }
    }
    loadData();
  }, []);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menus on route change */
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
    setActiveSubCategory(null);
  }, [pathname]);

  /* Outside click handler */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* Keyboard shortcut: Ctrl+K or / to open search, Escape to close */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.ctrlKey && e.key === "k") || (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA")) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  /* Focus search input when overlay opens */
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  const searchResults = searchQuery.trim().length > 1
    ? products.filter((p) =>
        p.isActive && (
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ).slice(0, 6)
    : [];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-border shadow-soft"
            : "bg-[#121316]/90 backdrop-blur-md border-b border-[#282C36]/60 shadow-lg"
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22">
            {/* ── Sol Taraf: Kategoriler & Menü ─────────────────────────── */}
            <div className="flex-1 flex items-center justify-start gap-1 sm:gap-2">
              {/* Mobile menu toggle button */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-[#1B1D23] hover:text-white transition-colors"
                aria-label="Menü"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Desktop Nav: Kategoriler & Navigasyon */}
              <nav className="hidden lg:flex items-center gap-1.5">
                {navLinks.map((link) =>
                  link.hasMega ? (
                    <div key={link.href} className="relative" ref={megaRef}>
                      <button
                        onClick={() => { setMegaOpen((v) => !v); setActiveSubCategory(null); }}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                          isActive(link.href)
                            ? "text-gold bg-gold/10 font-bold border border-gold/30"
                            : "text-slate-200 hover:text-white hover:bg-[#1B1D23] border border-transparent hover:border-[#282C36]"
                        }`}
                      >
                        <AlignLeft size={16} className="text-gold" />
                        <span>{link.label}</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${
                            megaOpen ? "rotate-180 text-gold" : "text-slate-400"
                          }`}
                        />
                      </button>

                      {/* Mega Menu Dropdown — Sol Hizada */}
                      <AnimatePresence>
                        {megaOpen && (() => {
                          const isAllSelected = activeSubCategory === "__all__";
                          const activeCat = isAllSelected
                            ? null
                            : (categories.find(c => c.id === activeSubCategory) ?? categories[0]);
                          const catProducts = activeCat
                            ? products.filter(p =>
                                p.isActive && (
                                  p.categorySlug === activeCat.slug ||
                                  p.categoryId === activeCat.id ||
                                  p.categoryName?.toLowerCase() === activeCat.name.toLowerCase()
                                )
                              )
                            : [];

                          return (
                            <motion.div
                              initial={{ opacity: 0, y: -8, scale: 0.97 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -8, scale: 0.97 }}
                              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute top-full left-0 mt-3 w-[840px] max-w-[85vw] bg-[#16181D] rounded-2xl shadow-2xl border border-[#282C36] overflow-hidden flex z-50 text-slate-100"
                              style={{ maxHeight: "480px" }}
                            >
                              {/* ── Sol Panel: Kategoriler ── */}
                              <div className="w-[240px] shrink-0 bg-[#121316] border-r border-[#282C36] flex flex-col overflow-y-auto">
                                {/* Başlık */}
                                <div className="flex items-center gap-2 px-4 py-3.5 border-b border-[#282C36]">
                                  <AlignLeft size={14} className="text-gold" />
                                  <span className="text-white font-bold text-xs uppercase tracking-widest">
                                    Kategorilerimiz
                                  </span>
                                </div>

                                {/* Tüm Ürünler */}
                                <button
                                  onMouseEnter={() => setActiveSubCategory("__all__")}
                                  onClick={() => { setMegaOpen(false); router.push("/katalog"); }}
                                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-150 border-b border-[#282C36]/60 ${
                                    isAllSelected
                                      ? "bg-[#1B1D23] text-gold font-bold"
                                      : "text-slate-300 hover:bg-[#1B1D23] hover:text-white"
                                  }`}
                                >
                                  <span>✨ Tüm Ürünler</span>
                                  <ChevronRight size={14} className="opacity-60" />
                                </button>

                                {/* Ana + Alt kategori hiyerarşik listesi */}
                                {categories
                                  .filter((cat) => !cat.parentId)
                                  .map((parentCat) => {
                                    const children = categories.filter((c) => c.parentId === parentCat.id);
                                    return (
                                      <div key={parentCat.id}>
                                        {/* Ana kategori */}
                                        <button
                                          onMouseEnter={() => setActiveSubCategory(parentCat.id)}
                                          onClick={() => { setMegaOpen(false); router.push(`/katalog/${parentCat.slug}`); }}
                                          className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-150 border-b border-[#282C36]/40 ${
                                            activeSubCategory === parentCat.id
                                              ? "bg-[#1B1D23] text-gold font-bold"
                                              : "text-slate-300 hover:bg-[#1B1D23] hover:text-white"
                                          }`}
                                        >
                                          <span className="truncate text-left">{parentCat.name}</span>
                                          <ChevronRight size={14} className="shrink-0 opacity-60" />
                                        </button>
                                        {/* Alt kategoriler */}
                                        {children.map((child) => (
                                          <button
                                            key={child.id}
                                            onMouseEnter={() => setActiveSubCategory(child.id)}
                                            onClick={() => { setMegaOpen(false); router.push(`/katalog/${child.slug}`); }}
                                            className={`w-full flex items-center justify-between pl-8 pr-4 py-2.5 text-xs font-medium transition-colors duration-150 border-b border-[#282C36]/30 ${
                                              activeSubCategory === child.id
                                                ? "bg-[#1B1D23] text-gold font-bold"
                                                : "text-slate-400 hover:bg-[#1B1D23] hover:text-white"
                                            }`}
                                          >
                                            <span className="flex items-center gap-1.5 truncate text-left">
                                              <span className="w-1 h-1 rounded-full bg-gold/60 shrink-0" />
                                              {child.name}
                                            </span>
                                            <ChevronRight size={12} className="shrink-0 opacity-50" />
                                          </button>
                                        ))}
                                      </div>
                                    );
                                  })
                                }
                              </div>

                              {/* ── Sağ Panel: Ürün/Alt Başlık İçeriği ── */}
                              <div className="flex-1 overflow-y-auto bg-[#16181D]">
                                {isAllSelected ? (
                                  /* Tüm Ürünler: Tüm Kategoriler + Markalarımız */
                                  <div className="p-5 space-y-5">
                                    <div>
                                      <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-3">
                                        Tüm Kategoriler
                                      </p>
                                      <div className="grid grid-cols-3 gap-x-6 gap-y-2.5">
                                        {categories.map((cat) => (
                                          <Link
                                            key={cat.id}
                                            href={`/katalog/${cat.slug}`}
                                            onClick={() => setMegaOpen(false)}
                                            className="text-sm text-slate-300 hover:text-gold font-medium transition-colors duration-150 truncate"
                                          >
                                            {cat.name}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>

                                    {brands.length > 0 && (
                                      <div className="border-t border-[#282C36] pt-4">
                                        <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-3">
                                          Markalarımız
                                        </p>
                                        <div className="flex flex-wrap gap-2.5">
                                          {brands.map((brand) => (
                                            <Link
                                              key={brand.id}
                                              href={`/katalog?search=${encodeURIComponent(brand.name.toLowerCase())}`}
                                              onClick={() => setMegaOpen(false)}
                                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1B1D23] hover:bg-[#282C36] border border-[#282C36] hover:border-gold/50 transition-all duration-150 group"
                                            >
                                              {brand.imageUrl && (
                                                <div className="w-5 h-5 relative shrink-0">
                                                  <Image src={brand.imageUrl} alt={brand.name} fill sizes="20px" className="object-contain" />
                                                </div>
                                              )}
                                              <span className="text-xs font-bold text-slate-200 group-hover:text-gold tracking-wide uppercase">
                                                {brand.name}
                                              </span>
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ) : (() => {
                                  const subItems = (activeCat?.slug && SUBCATEGORIES_MAP[activeCat.slug]) || [];
                                  const hasSubItems = subItems.length > 0;
                                  const hasProducts = catProducts.length > 0;

                                  return (
                                    <div className="p-5 space-y-4">
                                      <div className="flex items-center justify-between border-b border-[#282C36] pb-3">
                                        <div>
                                          <p className="text-white font-heading font-bold text-base uppercase tracking-wide">
                                            {activeCat?.name}
                                          </p>
                                          {activeCat?.description && (
                                            <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">
                                              {activeCat.description}
                                            </p>
                                          )}
                                        </div>
                                        <Link
                                          href={`/katalog/${activeCat?.slug}`}
                                          onClick={() => setMegaOpen(false)}
                                          className="text-gold hover:text-gold-300 text-xs font-semibold shrink-0 transition-colors"
                                        >
                                          Tümünü Gör →
                                        </Link>
                                      </div>

                                      {/* Alt başlıklar / Markalar */}
                                      {hasSubItems && (
                                        <div>
                                          <p className="text-gold text-2xs font-semibold uppercase tracking-wider mb-2.5">
                                            Çeşitler & Markalar
                                          </p>
                                          <div className="grid grid-cols-3 gap-x-6 gap-y-2.5">
                                            {subItems.map((item, idx) => (
                                              <Link
                                                key={idx}
                                                href={item.href}
                                                onClick={() => setMegaOpen(false)}
                                                className="text-sm font-semibold text-slate-300 hover:text-gold transition-colors duration-150 truncate flex items-center gap-1.5"
                                              >
                                                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                                                <span className="truncate">{item.name}</span>
                                              </Link>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* Ürünler */}
                                      {hasProducts && (
                                        <div className={hasSubItems ? "border-t border-[#282C36] pt-3" : ""}>
                                          <p className="text-gold text-2xs font-semibold uppercase tracking-wider mb-2.5">
                                            Öne Çıkan Ürünler
                                          </p>
                                          <div className="grid grid-cols-3 gap-x-6 gap-y-2.5">
                                            {catProducts.slice(0, 12).map((product) => (
                                              <Link
                                                key={product.id}
                                                href={`/katalog/${activeCat?.slug}`}
                                                onClick={() => setMegaOpen(false)}
                                                className="text-sm text-slate-300 hover:text-gold font-medium transition-colors duration-150 truncate"
                                              >
                                                {product.name}
                                              </Link>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {!hasSubItems && !hasProducts && (
                                        <div className="py-8 text-center">
                                          <p className="text-slate-400 text-sm mb-3">
                                            Bu kategoriye ait ürünleri katalogda inceleyin.
                                          </p>
                                          <Link
                                            href={`/katalog/${activeCat?.slug}`}
                                            onClick={() => setMegaOpen(false)}
                                            className="btn-gold-outline py-1.5 px-4 text-xs"
                                          >
                                            Kategori Ürünlerini Gör →
                                          </Link>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })()}
                              </div>
                            </motion.div>
                          );
                        })()}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                        isActive(link.href)
                          ? "text-gold bg-gold/10 font-bold"
                          : "text-slate-300 hover:text-white hover:bg-[#1B1D23]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
            </div>

            {/* ── Orta Kısım: Büyütülmüş & Ortalanmış Logo ────────────────── */}
            <div className="shrink-0 flex items-center justify-center px-2">
              <Link href="/" className="flex items-center group py-1">
                <Logo size={54} logoScale={1.4} />
              </Link>
            </div>

            {/* ── Sağ Taraf: Arama, Telefon, Giriş/Profil ─────────────────── */}
            <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3">
              {/* Search (desktop) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex p-2.5 rounded-xl items-center gap-2 text-slate-300 hover:text-white bg-[#1B1D23]/60 hover:bg-[#1B1D23] border border-[#282C36] hover:border-gold/50 transition-colors"
                title="Ürün ara (Ctrl+K)"
              >
                <Search size={17} className="text-gold" />
                <span className="text-xs text-slate-400 hidden xl:inline font-mono">Ctrl+K</span>
              </button>

              {/* Phone */}
              <a
                href="tel:+905010737113"
                className="hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1B1D23]/60 hover:bg-[#1B1D23] border border-[#282C36] hover:border-gold/50 text-slate-200 hover:text-gold text-sm font-medium transition-all duration-150"
              >
                <Phone size={14} className="text-gold" />
                <span className="text-xs font-semibold tracking-wide">
                  0501 073 71 13
                </span>
              </a>

              {/* Auth buttons */}
              {currentUser ? (
                <div className="relative" ref={userRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1B1D23] border border-[#282C36] text-white hover:border-gold/50 transition-all duration-150"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-gold flex items-center justify-center">
                      <User size={13} className="text-[#0D0E11]" />
                    </div>
                    <span className="hidden sm:block text-xs font-semibold max-w-[80px] truncate text-slate-200">
                      {userProfile?.name ?? "Hesabım"}
                    </span>
                    <ChevronDown size={12} className="text-gold" />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-52 bg-[#1B1D23] rounded-xl shadow-soft-lg border border-[#282C36] overflow-hidden z-50 text-slate-200"
                      >
                        <div className="px-4 py-3 border-b border-[#282C36]">
                          <p className="font-semibold text-white text-sm truncate">
                            {userProfile?.name}
                          </p>
                          <p className="text-slate-400 text-xs truncate">
                            {userProfile?.email}
                          </p>
                          {userRole === "admin" && (
                            <span className="badge badge-gold mt-1">Admin</span>
                          )}
                        </div>
                        <div className="p-2">
                          <Link
                            href="/hesap"
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-[#282C36] transition-colors"
                          >
                            <User size={15} className="text-gold" />
                            Hesabım
                          </Link>
                          {userRole === "admin" && (
                            <Link
                              href="/admin"
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-[#282C36] transition-colors"
                            >
                              <LayoutDashboard size={15} className="text-gold" />
                              Admin Paneli
                            </Link>
                          )}
                          <Link
                            href="/katalog"
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-[#282C36] transition-colors"
                          >
                            <ShoppingBag size={15} className="text-gold" />
                            Katalog
                          </Link>
                        </div>
                        <div className="border-t border-[#282C36] p-2">
                          <button
                            onClick={logoutUser}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full"
                          >
                            <LogOut size={15} />
                            Çıkış Yap
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link href="/giris" className="btn-ghost text-sm py-2 px-3 text-slate-200 hover:text-white">
                    <LogIn size={16} />
                    Giriş Yap
                  </Link>
                  <Link href="/kayit" className="btn-primary text-sm py-2 px-4 shadow-gold">
                    Kayıt Ol
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-[#0D0E11]/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#16181D] border-l border-[#282C36] flex flex-col overflow-y-auto text-slate-200">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#282C36]">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <Logo size={38} />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-[#282C36] text-slate-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav */}
              <div className="flex-1 p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(link.href)
                        ? "bg-gold/15 text-gold font-bold"
                        : "text-slate-300 hover:bg-[#1B1D23] hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-3 pb-2">
                  <p className="text-2xs text-gold uppercase tracking-widest px-4 pb-2 font-bold">
                    Kategoriler
                  </p>
                  {categories
                    .filter((cat) => !cat.parentId)
                    .map((parentCat) => {
                      const children = categories.filter((c) => c.parentId === parentCat.id);
                      return (
                        <div key={parentCat.id}>
                          {/* Ana kategori */}
                          <Link
                            href={`/katalog/${parentCat.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-[#1B1D23] hover:text-gold transition-colors font-medium"
                          >
                            <div className="w-5 h-5 rounded overflow-hidden relative shrink-0 bg-[#21242C]">
                              {parentCat.imageUrl && <Image src={parentCat.imageUrl} alt={parentCat.name} fill sizes="20px" quality={85} className="object-cover" />}
                            </div>
                            {parentCat.name}
                          </Link>
                          {/* Alt kategoriler — girintili */}
                          {children.map((child) => (
                            <Link
                              key={child.id}
                              href={`/katalog/${child.slug}`}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2 pl-10 pr-4 py-2 rounded-xl text-xs text-slate-400 hover:bg-[#1B1D23] hover:text-gold transition-colors"
                            >
                              <span className="w-1 h-1 rounded-full bg-gold/60 shrink-0" />
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      );
                    })
                  }
                </div>

              </div>

              {/* Auth */}
              <div className="border-t border-[#282C36] p-4 space-y-2">
                {currentUser ? (
                  <>
                    <Link href="/hesap" className="btn-secondary w-full justify-start gap-2">
                      <User size={16} className="text-gold" />
                      {userProfile?.name ?? "Hesabım"}
                    </Link>
                    {userRole === "admin" && (
                      <Link href="/admin" className="btn-ghost w-full justify-start gap-2 text-slate-300">
                        <LayoutDashboard size={16} className="text-gold" />
                        Admin Paneli
                      </Link>
                    )}
                    <button
                      onClick={logoutUser}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full"
                    >
                      <LogOut size={16} />
                      Çıkış Yap
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/giris" className="btn-secondary w-full">
                      Giriş Yap
                    </Link>
                    <Link href="/kayit" className="btn-primary w-full">
                      Kayıt Ol
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Search Overlay ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[#0D0E11]/80 backdrop-blur-md flex items-start justify-center pt-20 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#1B1D23] rounded-2xl w-full max-w-3xl shadow-soft-lg border border-[#282C36] overflow-hidden flex flex-col max-h-[80vh] text-slate-200"
            >
              <div className="p-4 border-b border-[#282C36] flex items-center gap-3">
                <Search size={20} className="text-gold shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ürün adı, kodu veya kategori ara..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-slate-500"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-2 text-slate-400 hover:text-white bg-[#282C36] hover:bg-[#333845] rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 bg-[#121316]">
                {searchQuery.trim().length <= 1 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Search size={32} className="mx-auto mb-3 opacity-20 text-gold" />
                    <p className="text-sm">Aramaya başlamak için en az 2 karakter yazın</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <p className="text-sm">&quot;{searchQuery}&quot; için sonuç bulunamadı.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/urun/${product.id}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-4 p-3 bg-[#1B1D23] border border-[#282C36] rounded-xl hover:border-gold/50 hover:shadow-soft transition-all group"
                      >
                        <div className="w-16 h-16 rounded-lg bg-[#21242C] overflow-hidden shrink-0 relative">
                          {product.imageUrl ? (
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              sizes="64px"
                              quality={85}
                              className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#282C36]">
                              <ImageIcon size={20} className="text-slate-400" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-heading font-semibold text-white text-sm truncate group-hover:text-gold transition-colors">
                            {product.name}
                          </p>
                          <p className="text-slate-400 text-xs truncate mt-0.5">
                            {product.categoryName} • Kod: {product.code}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {searchResults.length > 0 && (
                <div className="p-3 border-t border-[#282C36] bg-[#16181D] text-center">
                  <Link
                    href={`/katalog?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="text-gold hover:text-gold-300 text-sm font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    Tüm sonuçları katalogda gör <ChevronDown size={14} className="-rotate-90" />
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
