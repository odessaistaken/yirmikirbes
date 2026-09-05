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
  Flame,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Logo from "@/components/Logo";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} />, exact: true },
  { label: "Slider", href: "/admin/slider", icon: <Layers size={18} /> },
  { label: "Kategoriler", href: "/admin/kategoriler", icon: <Tag size={18} /> },
  { label: "Ürünler", href: "/admin/urunler", icon: <Package size={18} /> },
  { label: "Çok Satanlar", href: "/admin/cok-satanlar", icon: <Flame size={18} className="text-amber-500" /> },
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 admin-root">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 fixed top-0 left-0 bottom-0 z-30 shadow-sm">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-slate-200 bg-white">
          <Link href="/" className="flex items-center gap-3">
            <Logo variant="dark" size={36} />
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {adminNavItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-gold text-slate-950 font-bold shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {item.icon}
                {item.label}
                {isActive && <ChevronRight size={14} className="ml-auto text-slate-950" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 space-y-1 bg-white">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <Package size={14} />
            Siteye Dön
          </Link>
          <button
            onClick={async () => { await logoutUser(); router.push("/"); }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors w-full"
          >
            <LogOut size={14} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-64 min-h-screen bg-[#F8FAFC] overflow-auto text-slate-800">
        {children}
      </div>
    </div>
  );
}
