"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Tag,
  Package,
  Users,
  MessageSquare,
  LogOut,
  ChevronRight,
  Layers,
  Award,
  Flame,
  BookOpen,
  FileSpreadsheet,
  Database,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import Logo from "@/components/Logo";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} />, exact: true },
  { label: "Slider", href: "/admin/slider", icon: <Layers size={18} /> },
  { label: "Kategoriler", href: "/admin/kategoriler", icon: <Tag size={18} /> },
  { label: "Ürünler", href: "/admin/urunler", icon: <Package size={18} /> },
  { label: "Sunum Kataloğu", href: "/admin/sunum-katalogu", icon: <BookOpen size={18} className="text-amber-500" /> },
  { label: "Çok Satanlar", href: "/admin/cok-satanlar", icon: <Flame size={18} className="text-amber-500" /> },
  { label: "Markalar", href: "/admin/markalar", icon: <Award size={18} /> },
  { label: "Kullanıcılar", href: "/admin/kullanicilar", icon: <Users size={18} /> },
  { label: "Talepler", href: "/admin/talepler", icon: <MessageSquare size={18} /> },
  { label: "Excel Veri", href: "/admin/excel-veri", icon: <FileSpreadsheet size={18} className="text-emerald-500" /> },
  { label: "İçe Aktarılan Veriler", href: "/admin/ice-aktarilan-veriler", icon: <Database size={18} className="text-amber-500" /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, userRole, loading, logoutUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sayfa değiştiğinde mobil menüyü otomatik kapat
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  /* Guard: only admin */
  useEffect(() => {
    if (mounted && !loading) {
      if (!currentUser) {
        router.push("/giris");
      } else if (userRole && userRole !== "admin") {
        router.push("/hesap");
      }
    }
  }, [currentUser, userRole, loading, router, mounted]);

  if (!mounted || loading || !currentUser || userRole !== "admin") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="h-full flex flex-col bg-white">
      {/* Brand */}
      <div className="px-5 py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Logo variant="dark" size={34} />
          <span className="text-2xs font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
            Admin
          </span>
        </Link>
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            aria-label="Kapat"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {adminNavItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => isMobile && setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-gold text-slate-950 font-bold shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto text-slate-950 shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-200 space-y-1 bg-white shrink-0">
        <Link
          href="/"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          <Package size={14} />
          <span>Siteye Dön</span>
        </Link>
        <button
          onClick={async () => {
            await logoutUser();
            router.push("/");
          }}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors w-full"
        >
          <LogOut size={14} />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-slate-800 admin-root -mt-18 sm:-mt-24 relative z-20">
      {/* ── Mobil Üst Bar (lg:hidden) ─────────────────────────── */}
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-3.5 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 active:scale-95 transition-all"
            aria-label="Menüyü Aç"
          >
            <Menu size={20} />
          </button>
          <Link href="/admin" className="flex items-center gap-2">
            <Logo variant="dark" size={30} />
            <span className="font-heading font-extrabold text-[11px] uppercase tracking-wider text-amber-900 bg-amber-100/80 border border-amber-300 px-2 py-0.5 rounded-md">
              Admin
            </span>
          </Link>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition-colors"
        >
          <Package size={14} className="text-amber-600" />
          <span>Site</span>
        </Link>
      </div>

      <div className="flex-1 flex w-full relative">
        {/* ── Masaüstü Sabit Sidebar (hidden lg:block) ─────────────── */}
        <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col shrink-0 fixed top-0 left-0 bottom-0 z-30 shadow-sm">
          <SidebarContent />
        </aside>

        {/* ── Mobil Kayar Menü Drawer (lg:hidden) ────────────────── */}
        <AnimatePresence>
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              {/* Karartma Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
              />
              {/* Drawer Gövdesi */}
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-72 max-w-[85vw] h-full bg-white z-10 shadow-2xl overflow-hidden flex flex-col"
              >
                <SidebarContent isMobile />
              </motion.aside>
            </div>
          )}
        </AnimatePresence>

        {/* ── Ana İçerik Alanı ───────────────────────────────────── */}
        <main className="flex-1 w-full lg:ml-64 min-h-[calc(100vh-60px)] bg-[#F8FAFC] overflow-x-hidden text-slate-800">
          {children}
        </main>
      </div>
    </div>
  );
}
