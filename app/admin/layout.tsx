"use client";

export const dynamic = 'force-dynamic';
import { useEffect } from "react";
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
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} />, exact: true },
  { label: "Slider", href: "/admin/slider", icon: <Layers size={18} /> },
  { label: "Kategoriler", href: "/admin/kategoriler", icon: <Tag size={18} /> },
  { label: "Ürünler", href: "/admin/urunler", icon: <Package size={18} /> },
  { label: "Markalar", href: "/admin/markalar", icon: <Award size={18} /> },
  { label: "Kullanıcılar", href: "/admin/kullanicilar", icon: <Users size={18} /> },
  { label: "Talepler", href: "/admin/talepler", icon: <MessageSquare size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, userRole, loading, logoutUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  /* Guard: only admin */
  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.push("/giris");
      } else if (userRole && userRole !== "admin") {
        router.push("/hesap");
      }
    }
  }, [currentUser, userRole, loading, router]);

  if (loading || !currentUser || userRole !== "admin") {
    return (
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal-800 border-r border-charcoal-700 flex flex-col shrink-0 fixed top-0 left-0 bottom-0 z-30">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-charcoal-700">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0">
              <span className="text-charcoal-900 font-heading font-black text-xs">20:45</span>
            </div>
            <div>
              <p className="font-heading font-bold text-white text-sm">20:45 Pastacılık</p>
              <p className="text-charcoal-400 text-2xs">Admin Paneli</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {adminNavItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${
                  isActive ? "admin-nav-item-active" : "admin-nav-item-inactive"
                }`}
              >
                {item.icon}
                {item.label}
                {isActive && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-charcoal-700 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs text-charcoal-400 hover:bg-charcoal-700 hover:text-white transition-colors"
          >
            <Package size={14} />
            Siteye Dön
          </Link>
          <button
            onClick={async () => { await logoutUser(); router.push("/"); }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors w-full"
          >
            <LogOut size={14} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-64 min-h-screen bg-cream overflow-auto">
        {children}
      </div>
    </div>
  );
}
