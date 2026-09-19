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

/* ─── Navigation links ────────────────────────────────────────────────────── */
const navLinks = [
  { label: "Kategoriler", href: "/katalog" },
  { label: "Akademi", href: "/akademi" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, userProfile, userRole, logoutUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);


  /* Load categories & products for mega menu and search */
  useEffect(() => {
    setMounted(true);
    async function loadData() {
      try {
        const results = await Promise.allSettled([
          getActiveCategories(),
          getProducts(),
          getActiveBrands(),
        ]);

        const cats = results[0].status === "fulfilled" ? results[0].value : [];
        const prods = results[1].status === "fulfilled" ? results[1].value : [];
        const brnds = results[2].status === "fulfilled" ? results[2].value : [];

        if (cats.length > 0) {
          const merged = [...cats];
          for (const mc of MOCK_CATEGORIES) {
            if (!merged.some((c) => c.slug === mc.slug || c.id === mc.id)) {
              merged.push(mc);
            }
          }
          setCategories(merged.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        } else {
          setCategories(
            MOCK_CATEGORIES.map((c, i) => ({
              id: c.id,
              name: c.name,
              slug: c.slug,
              parentId: c.parentId,
              imageUrl: c.imageUrl || "",
              order: c.order || i + 1,
              isActive: true,
              description: c.description,
            }))
          );
        }
        if (prods.length > 0) setProducts(prods);
        else {
          setProducts(MOCK_PRODUCTS.map((p, i) => ({
            ...p, codeGroup: "", price: 0, vatRate: 20, order: i + 1,
          })));
        }
        if (brnds.length > 0) setBrands(brnds);
      } catch (err) {
        console.error("Header veri yükleme hatası:", err);
      }
    }
    loadData();

    // Listen for category updates from admin panel
    const handleCategoryUpdate = () => { loadData(); };
    window.addEventListener("categories-updated", handleCategoryUpdate);
    return () => window.removeEventListener("categories-updated", handleCategoryUpdate);
  }, []);


  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menus on route change */
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  /* Outside click handler */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
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
            ? "glass border-b border-slate-200 shadow-sm"
            : "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 sm:h-28">
            {/* ── Sol Taraf: Logo + Kategoriler & Menü ─────────────────────────── */}
            <div className="flex-1 flex items-center justify-start gap-6 lg:gap-8">
              {/* Logo - En Sol (Tıklanabilir → Ana Sayfa) */}
              <Link href="/" className="flex items-center group py-1 shrink-0 max-w-[220px]">
                <Logo size={64} logoScale={1.5} />
              </Link>

              {/* Mobile menu toggle button */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-label="Menü"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Desktop Nav: Kategoriler & Navigasyon */}
              <nav className="hidden lg:flex items-center gap-1.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 uppercase ${
                      isActive(link.href)
                        ? "text-gold-600 bg-gold/10 font-bold border border-gold/30"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {link.href === "/katalog" && <AlignLeft size={16} className="text-gold" />}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* ── Orta Kısım: Çok Satanlar (Logo artık sol tarafa taşındı) ────────────────── */}
            <div className="shrink-0 flex items-center justify-center gap-3 sm:gap-4 px-2">
              {/* Çok Satanlar Linki - Menü isimleri ile aynı sade ve şık stil */}
              <Link
                href="/cok-satanlar"
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 uppercase ${
                  isActive("/cok-satanlar")
                    ? "text-gold-600 bg-gold/10 font-bold border border-gold/30"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Çok Satanlar
              </Link>
            </div>

            {/* ── Sağ Taraf: Arama, Telefon, Giriş/Profil ─────────────────── */}
            <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3">
              {/* Search (desktop) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex p-2.5 rounded-xl items-center gap-2 text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-gold/50 transition-colors"
                title="Ürün ara (Ctrl+K)"
              >
                <Search size={17} className="text-gold" />
                <span className="text-xs text-slate-500 hidden xl:inline font-mono">Ctrl+K</span>
              </button>

              {/* Phone */}
              <a
                href="tel:+905010737113"
                className="hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-gold/50 text-slate-700 hover:text-gold-600 text-sm font-medium transition-all duration-150"
              >
                <Phone size={14} className="text-gold" />
                <span className="text-xs font-semibold tracking-wide">
                  0501 073 71 13
                </span>
              </a>

              {/* Auth buttons */}
              {mounted && currentUser ? (
                <div className="relative" ref={userRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 hover:border-gold/50 transition-all duration-150"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-gold flex items-center justify-center">
                      <User size={13} className="text-slate-900" />
                    </div>
                    <span className="hidden sm:block text-xs font-semibold max-w-[80px] truncate text-slate-800">
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
                        className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-800"
                      >
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="font-semibold text-slate-900 text-sm truncate">
                            {userProfile?.name}
                          </p>
                          <p className="text-slate-500 text-xs truncate">
                            {userProfile?.email}
                          </p>
                          {userRole === "admin" && (
                            <span className="badge badge-gold mt-1">Admin</span>
                          )}
                        </div>
                        <div className="p-2">
                          <Link
                            href="/hesap"
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                          >
                            <User size={15} className="text-gold" />
                            Hesabım
                          </Link>
                          {userRole === "admin" && (
                            <Link
                              href="/admin"
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                            >
                              <LayoutDashboard size={15} className="text-gold" />
                              Admin Paneli
                            </Link>
                          )}
                          <Link
                            href="/katalog"
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                          >
                            <ShoppingBag size={15} className="text-gold" />
                            Katalog
                          </Link>
                        </div>
                        <div className="border-t border-slate-100 p-2">
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
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white border-l border-slate-200 flex flex-col overflow-y-auto text-slate-800">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <Logo size={38} />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav */}
              <div className="flex-1 p-4 space-y-1">
                <Link
                  href="/cok-satanlar"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive("/cok-satanlar")
                      ? "bg-gold/10 text-gold-600 font-bold border border-gold/30"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Çok Satanlar
                </Link>

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(link.href)
                        ? "bg-gold/15 text-gold-700 font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-3 pb-2">
                  <p className="text-2xs text-gold-600 uppercase tracking-widest px-4 pb-2 font-bold">
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
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-slate-50 hover:text-gold-600 transition-colors font-medium"
                          >
                            <div className="w-5 h-5 rounded overflow-hidden relative shrink-0 bg-slate-100">
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
                              className="flex items-center gap-2 pl-10 pr-4 py-2 rounded-xl text-xs text-slate-500 hover:bg-slate-50 hover:text-gold-600 transition-colors"
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
              <div className="border-t border-slate-200 p-4 space-y-2">
                {mounted && currentUser ? (
                  <>
                    <Link href="/hesap" className="btn-secondary w-full justify-start gap-2">
                      <User size={16} className="text-gold" />
                      {userProfile?.name ?? "Hesabım"}
                    </Link>
                    {userRole === "admin" && (
                      <Link href="/admin" className="btn-ghost w-full justify-start gap-2 text-slate-700">
                        <LayoutDashboard size={16} className="text-gold" />
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
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-md flex items-start justify-center pt-20 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] text-slate-800"
            >
              <div className="p-4 border-b border-slate-200 flex items-center gap-3">
                <Search size={20} className="text-gold shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ürün adı, kodu veya kategori ara..."
                  className="flex-1 bg-transparent border-none outline-none text-slate-900 text-lg placeholder:text-slate-400"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
                {searchQuery.trim().length <= 1 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Search size={32} className="mx-auto mb-3 opacity-30 text-gold" />
                    <p className="text-sm">Aramaya başlamak için en az 2 karakter yazın</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
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
                        className="flex items-center gap-4 p-3 bg-white border border-slate-200 rounded-xl hover:border-gold/50 hover:shadow-md transition-all group"
                      >
                        <div className="w-16 h-16 rounded-lg bg-slate-50 overflow-hidden shrink-0 relative border border-slate-100">
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
                            <div className="w-full h-full flex items-center justify-center bg-slate-100">
                              <ImageIcon size={20} className="text-slate-400" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-heading font-semibold text-slate-900 text-sm truncate group-hover:text-gold-600 transition-colors">
                            {product.name}
                          </p>
                          <p className="text-slate-400 text-xs font-mono mt-0.5">
                            {product.code}
                          </p>
                          <span className="text-[11px] font-bold text-gold-600 uppercase">
                            {product.categoryName}
                          </span>
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
