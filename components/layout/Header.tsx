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
  "suruplar": [
    { name: "DaVinci Gourmet Şuruplar", href: "/katalog/suruplar?search=davinci" },
    { name: "Caffè NONNO Şuruplar", href: "/katalog/suruplar?search=nonno" },
    { name: "Monte Cristo Şuruplar", href: "/katalog/suruplar?search=monte%20cristo" },
    { name: "EASY MIX Bar Şurupları", href: "/katalog/suruplar?search=easy%20mix" },
  ],
  "pureler": [
    { name: "Caffè NONNO Frozen Püre", href: "/katalog/pureler?search=nonno" },
    { name: "DaVinci Fruit Mix İçecek", href: "/katalog/pureler?search=davinci" },
    { name: "EASY MIX Kokteyl Premiksleri", href: "/katalog/pureler?search=easy%20mix" },
    { name: "Krater Meyveli Karışımlar", href: "/katalog/pureler?search=krater" },
  ],
  "waffle-malzemeleri": [
    { name: "CALLEI Çikolata Kremaları", href: "/katalog/waffle-malzemeleri?search=callei" },
    { name: "Hazır Waffle & Krep Tozu", href: "/katalog/waffle-malzemeleri?search=waffle" },
    { name: "Pasta & Waffle Süslemeleri", href: "/katalog/waffle-malzemeleri?search=draje" },
    { name: "Damla Çikolata Drops", href: "/katalog/waffle-malzemeleri?search=damla" },
    { name: "Fındık Krokan & Topping", href: "/katalog/waffle-malzemeleri?search=krokan" },
  ],
  "tatli-soslar": [
    { name: "DaVinci 2L Soslar (Karamel, Çikolata)", href: "/katalog/tatli-soslar?search=davinci" },
    { name: "Caffè NONNO 750g Dekor Sosları", href: "/katalog/tatli-soslar?search=nonno" },
    { name: "Condensed Milk (Koyulaştırılmış Süt)", href: "/katalog/tatli-soslar?search=condensed" },
    { name: "Blue Curacao Sos", href: "/katalog/tatli-soslar?search=curacao" },
  ],
  "donuk-pasta": [
    { name: "Donuk Tuzlu Kurabiyeler", href: "/katalog/donuk-pasta?search=kurabiye" },
    { name: "Donuk Poğaça Topları", href: "/katalog/donuk-pasta?search=poğaça" },
    { name: "Donuk Ekmek & Sandviç Hamuru", href: "/katalog/donuk-pasta?search=ekmek" },
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
            : "bg-transparent"
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* ── Logo ─────────────────────────────────────────────── */}
            <Link href="/" className="flex items-center group shrink-0">
              <Logo size={40} />
            </Link>

            {/* ── Desktop Nav ───────────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasMega ? (
                  <div key={link.href} className="relative" ref={megaRef}>
                    <button
                      onClick={() => { setMegaOpen((v) => !v); setActiveSubCategory(null); }}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                        isActive(link.href)
                          ? "text-gold-600 bg-gold-50"
                          : "text-charcoal-700 hover:text-charcoal-900 hover:bg-charcoal-50"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          megaOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Mega Menu Dropdown — Sol Sidebar + Sağ İçerik */}
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
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[820px] bg-white rounded-2xl shadow-soft-lg border border-border overflow-hidden flex"
                            style={{ maxHeight: "480px" }}
                          >
                            {/* ── Sol Panel: Kategoriler ── */}
                            <div className="w-[230px] shrink-0 bg-charcoal-900 flex flex-col overflow-y-auto">
                              {/* Başlık */}
                              <div className="flex items-center gap-2 px-4 py-3.5 border-b border-charcoal-700">
                                <AlignLeft size={14} className="text-white" />
                                <span className="text-white font-bold text-xs uppercase tracking-widest">
                                  Kategorilerimiz
                                </span>
                              </div>

                              {/* Tüm Ürünler */}
                              <button
                                onMouseEnter={() => setActiveSubCategory("__all__")}
                                onClick={() => { setMegaOpen(false); router.push("/katalog"); }}
                                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-150 border-b border-charcoal-800 ${
                                  isAllSelected
                                    ? "bg-charcoal-700 text-white"
                                    : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white"
                                }`}
                              >
                                <span>Tüm Ürünler</span>
                                <ChevronRight size={14} className="opacity-60" />
                              </button>

                              {/* Kategori listesi */}
                              {categories.map((cat) => (
                                <button
                                  key={cat.id}
                                  onMouseEnter={() => setActiveSubCategory(cat.id)}
                                  onClick={() => { setMegaOpen(false); router.push(`/katalog/${cat.slug}`); }}
                                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-150 border-b border-charcoal-800/50 ${
                                    activeSubCategory === cat.id
                                      ? "bg-charcoal-700 text-white"
                                      : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white"
                                  }`}
                                >
                                  <span className="truncate text-left">{cat.name}</span>
                                  <ChevronRight size={14} className="shrink-0 opacity-60" />
                                </button>
                              ))}
                            </div>

                            {/* ── Sağ Panel: Ürün/Alt Başlık İçeriği ── */}
                            <div className="flex-1 overflow-y-auto">
                              {isAllSelected ? (
                                /* Tüm Ürünler: Tüm Kategoriler + Markalarımız */
                                <div className="p-5 space-y-5">
                                  <div>
                                    <p className="text-charcoal-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                      Tüm Kategoriler
                                    </p>
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-2.5">
                                      {categories.map((cat) => (
                                        <Link
                                          key={cat.id}
                                          href={`/katalog/${cat.slug}`}
                                          onClick={() => setMegaOpen(false)}
                                          className="text-sm text-charcoal-700 hover:text-gold-600 font-medium transition-colors duration-150 truncate"
                                        >
                                          {cat.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>

                                  {brands.length > 0 && (
                                    <div className="border-t border-border pt-4">
                                      <p className="text-charcoal-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                        Markalarımız
                                      </p>
                                      <div className="flex flex-wrap gap-2.5">
                                        {brands.map((brand) => (
                                          <Link
                                            key={brand.id}
                                            href={`/katalog?search=${encodeURIComponent(brand.name.toLowerCase())}`}
                                            onClick={() => setMegaOpen(false)}
                                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cream hover:bg-gold-50 border border-border hover:border-gold-300 transition-all duration-150 group"
                                          >
                                            {brand.imageUrl && (
                                              <div className="w-5 h-5 relative shrink-0">
                                                <Image src={brand.imageUrl} alt={brand.name} fill sizes="20px" className="object-contain" />
                                              </div>
                                            )}
                                            <span className="text-xs font-bold text-charcoal-800 group-hover:text-gold-700 tracking-wide uppercase">
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
                                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                                      <div>
                                        <p className="text-charcoal-800 font-heading font-bold text-base uppercase tracking-wide">
                                          {activeCat?.name}
                                        </p>
                                        {activeCat?.description && (
                                          <p className="text-charcoal-400 text-xs mt-0.5 line-clamp-1">
                                            {activeCat.description}
                                          </p>
                                        )}
                                      </div>
                                      <Link
                                        href={`/katalog/${activeCat?.slug}`}
                                        onClick={() => setMegaOpen(false)}
                                        className="text-gold-600 hover:text-gold-700 text-xs font-semibold shrink-0 transition-colors"
                                      >
                                        Tümünü Gör →
                                      </Link>
                                    </div>

                                    {/* Alt başlıklar / Markalar (Örn: Waffle Kek, Waffle Sos veya DAVİNCİ, MONTE CRİSTO) */}
                                    {hasSubItems && (
                                      <div>
                                        <p className="text-charcoal-400 text-2xs font-semibold uppercase tracking-wider mb-2.5">
                                          Çeşitler & Markalar
                                        </p>
                                        <div className="grid grid-cols-3 gap-x-6 gap-y-2.5">
                                          {subItems.map((item, idx) => (
                                            <Link
                                              key={idx}
                                              href={item.href}
                                              onClick={() => setMegaOpen(false)}
                                              className="text-sm font-semibold text-charcoal-700 hover:text-gold-600 transition-colors duration-150 truncate flex items-center gap-1.5"
                                            >
                                              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                                              <span className="truncate">{item.name}</span>
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Ürünler */}
                                    {hasProducts && (
                                      <div className={hasSubItems ? "border-t border-border/60 pt-3" : ""}>
                                        <p className="text-charcoal-400 text-2xs font-semibold uppercase tracking-wider mb-2.5">
                                          Öne Çıkan Ürünler
                                        </p>
                                        <div className="grid grid-cols-3 gap-x-6 gap-y-2.5">
                                          {catProducts.slice(0, 12).map((product) => (
                                            <Link
                                              key={product.id}
                                              href={`/katalog/${activeCat?.slug}`}
                                              onClick={() => setMegaOpen(false)}
                                              className="text-sm text-charcoal-600 hover:text-gold-600 font-medium transition-colors duration-150 truncate"
                                            >
                                              {product.name}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {!hasSubItems && !hasProducts && (
                                      <div className="py-8 text-center">
                                        <p className="text-charcoal-400 text-sm mb-3">
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      isActive(link.href)
                        ? "text-gold-600 bg-gold-50"
                        : "text-charcoal-700 hover:text-charcoal-900 hover:bg-charcoal-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* ── Right Actions ─────────────────────────────────────── */}
            <div className="flex items-center gap-2">
              {/* Search (desktop) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex btn-ghost p-2 rounded-lg items-center gap-1.5 text-charcoal-500 hover:text-charcoal-900"
                title="Ürün ara (Ctrl+K)"
              >
                <Search size={18} />
                <span className="text-xs text-charcoal-400 hidden xl:inline">Ctrl+K</span>
              </button>

              {/* Phone */}
              <a
                href="tel:+905010737113"
                className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-lg text-charcoal-600 hover:text-gold-600 text-sm font-medium transition-colors duration-150"
              >
                <Phone size={15} />
                <span className="text-xs font-semibold tracking-wide">
                  0501 073 71 13
                </span>
              </a>

              {/* Auth buttons */}
              {currentUser ? (
                <div className="relative" ref={userRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gold-50 border border-gold-200 text-charcoal-800 hover:bg-gold-100 transition-all duration-150"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-gold flex items-center justify-center">
                      <User size={13} className="text-charcoal-900" />
                    </div>
                    <span className="hidden sm:block text-xs font-semibold max-w-[80px] truncate">
                      {userProfile?.name ?? "Hesabım"}
                    </span>
                    <ChevronDown size={12} />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-soft-lg border border-border overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-border">
                          <p className="font-semibold text-charcoal-800 text-sm truncate">
                            {userProfile?.name}
                          </p>
                          <p className="text-charcoal-400 text-xs truncate">
                            {userProfile?.email}
                          </p>
                          {userRole === "admin" && (
                            <span className="badge badge-gold mt-1">Admin</span>
                          )}
                        </div>
                        <div className="p-2">
                          <Link
                            href="/hesap"
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-charcoal-700 hover:bg-charcoal-50 transition-colors"
                          >
                            <User size={15} />
                            Hesabım
                          </Link>
                          {userRole === "admin" && (
                            <Link
                              href="/admin"
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-charcoal-700 hover:bg-charcoal-50 transition-colors"
                            >
                              <LayoutDashboard size={15} />
                              Admin Paneli
                            </Link>
                          )}
                          <Link
                            href="/katalog"
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-charcoal-700 hover:bg-charcoal-50 transition-colors"
                          >
                            <ShoppingBag size={15} />
                            Katalog
                          </Link>
                        </div>
                        <div className="border-t border-border p-2">
                          <button
                            onClick={logoutUser}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
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
                  <Link href="/giris" className="btn-ghost text-sm py-2">
                    <LogIn size={16} />
                    Giriş Yap
                  </Link>
                  <Link href="/kayit" className="btn-primary text-sm py-2.5">
                    Kayıt Ol
                  </Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden p-2 rounded-lg text-charcoal-700 hover:bg-charcoal-100 transition-colors"
                aria-label="Menü"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
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
              className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white flex flex-col overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <Logo size={38} />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-charcoal-100 text-charcoal-700"
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
                        ? "bg-gold-50 text-gold-700"
                        : "text-charcoal-700 hover:bg-charcoal-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-3 pb-2">
                  <p className="text-2xs text-charcoal-400 uppercase tracking-widest px-4 pb-2 font-semibold">
                    Kategoriler
                  </p>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/katalog/${cat.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-charcoal-700 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                    >
                      <div className="w-5 h-5 rounded overflow-hidden relative shrink-0 bg-cream-200">
                        {cat.imageUrl && <Image src={cat.imageUrl} alt={cat.name} fill sizes="20px" quality={85} className="object-cover" />}
                      </div>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Auth */}
              <div className="border-t border-border p-4 space-y-2">
                {currentUser ? (
                  <>
                    <Link href="/hesap" className="btn-secondary w-full justify-start gap-2">
                      <User size={16} />
                      {userProfile?.name ?? "Hesabım"}
                    </Link>
                    {userRole === "admin" && (
                      <Link href="/admin" className="btn-ghost w-full justify-start gap-2">
                        <LayoutDashboard size={16} />
                        Admin Paneli
                      </Link>
                    )}
                    <button
                      onClick={logoutUser}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
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
            className="fixed inset-0 z-[60] bg-charcoal-900/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl w-full max-w-3xl shadow-soft-lg overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-4 border-b border-border flex items-center gap-3">
                <Search size={20} className="text-charcoal-400 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ürün adı, kodu veya kategori ara..."
                  className="flex-1 bg-transparent border-none outline-none text-charcoal-800 text-lg placeholder:text-charcoal-300"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-2 text-charcoal-400 hover:text-charcoal-800 bg-charcoal-50 hover:bg-charcoal-100 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 bg-cream">
                {searchQuery.trim().length <= 1 ? (
                  <div className="text-center py-12 text-charcoal-400">
                    <Search size={32} className="mx-auto mb-3 opacity-20" />
                    <p className="text-sm">Aramaya başlamak için en az 2 karakter yazın</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-12 text-charcoal-400">
                    <p className="text-sm">"{searchQuery}" için sonuç bulunamadı.</p>
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
                        className="flex items-center gap-4 p-3 bg-white border border-border rounded-xl hover:border-gold hover:shadow-soft transition-all group"
                      >
                        <div className="w-16 h-16 rounded-lg bg-cream overflow-hidden shrink-0 relative">
                          {product.imageUrl ? (
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              sizes="64px"
                              quality={85}
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-cream-300">
                              <ImageIcon size={20} className="text-charcoal-400" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-heading font-semibold text-charcoal-800 text-sm truncate">
                            {product.name}
                          </p>
                          <p className="text-charcoal-400 text-xs truncate mt-0.5">
                            {product.categoryName} • Kod: {product.code}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {searchResults.length > 0 && (
                <div className="p-3 border-t border-border bg-white text-center">
                  <Link
                    href={`/katalog?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="text-gold-600 hover:text-gold-700 text-sm font-medium hover:underline inline-flex items-center gap-1"
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
