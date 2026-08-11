"use client";

export const dynamic = 'force-dynamic';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User, Building2, Mail, Phone, Calendar,
  MessageCircle, ShoppingBag, Shield, LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function AccountPage() {
  const { currentUser, userProfile, userRole, logoutUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/giris");
    }
  }, [currentUser, loading, router]);

  if (loading || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <p className="section-label">Hesap Yönetimi</p>
            <h1 className="font-heading font-bold text-charcoal-800 text-3xl">
              Merhaba, {userProfile.name.split(" ")[0]}!
            </h1>
          </div>
          <button
            onClick={async () => { await logoutUser(); router.push("/"); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
          >
            <LogOut size={15} />
            Çıkış
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="card p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center mb-3 shadow-gold">
                  <User size={28} className="text-charcoal-900" />
                </div>
                <p className="font-heading font-bold text-charcoal-800 text-lg">
                  {userProfile.name}
                </p>
                {userRole === "admin" && (
                  <span className="badge badge-gold mt-1 flex items-center gap-1">
                    <Shield size={10} />
                    Admin
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {[
                  { icon: <Building2 size={14} />, label: userProfile.company },
                  { icon: <Mail size={14} />, label: userProfile.email },
                  { icon: <Phone size={14} />, label: userProfile.phone ?? "—" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-charcoal-600 text-sm">
                    <span className="text-gold shrink-0">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </div>
                ))}
              </div>

              <Link href="/admin" className="btn-primary w-full mt-5 text-sm py-2.5 flex items-center justify-center gap-2">
                <Shield size={16} />
                Admin Paneli →
              </Link>
            </div>
          </motion.div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Quick action cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/katalog" className="card p-5 flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-gold-50 flex items-center justify-center group-hover:bg-gold transition-colors duration-200">
                  <ShoppingBag size={20} className="text-gold group-hover:text-charcoal-900 transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-800 text-sm">Katalog</p>
                  <p className="text-charcoal-400 text-xs">Tüm ürünleri incele</p>
                </div>
              </Link>

              <Link href="/katalog" className="card p-5 flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-gold-50 flex items-center justify-center group-hover:bg-gold transition-colors duration-200">
                  <MessageCircle size={20} className="text-gold group-hover:text-charcoal-900 transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-800 text-sm">Fiyat Taleplerim</p>
                  <p className="text-charcoal-400 text-xs">Gönderilen talepler</p>
                </div>
              </Link>
            </div>

            {/* B2B info box */}
            <div className="card-flat p-6 bg-charcoal-900 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
                  <Calendar size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-white text-sm mb-1">
                    B2B Müşteri Avantajları
                  </p>
                  <ul className="text-charcoal-300 text-xs space-y-1 mt-2">
                    {[
                      "Özel B2B fiyat listesi",
                      "Esnek ödeme vadeleri",
                      "Öncelikli teknik destek",
                      "Türkiye geneli soğuk zincir teslimat",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/iletisim" className="btn-gold-outline mt-4 inline-flex py-2 text-xs">
                    Temsilci ile Görüş
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
