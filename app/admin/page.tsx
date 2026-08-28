"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { requireDb } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Package, Tag, Users, MessageSquare, TrendingUp, Clock, Layers, Award } from "lucide-react";

interface Inquiry {
  id: string;
  userName: string;
  company: string;
  productName: string;
  status: "new" | "seen" | "replied";
  createdAt: { toDate: () => Date } | null;
}

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [counts, setCounts] = useState({
    products: 0,
    categories: 0,
    brands: 0,
    sliders: 0,
    users: 0,
    newInquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const db = requireDb();

        // Parallel fetch all counts
        const [
          productsSnap,
          categoriesSnap,
          brandsSnap,
          slidersSnap,
          usersSnap,
          newInqSnap,
          recentInqSnap,
        ] = await Promise.all([
          getDocs(collection(db, "products")),
          getDocs(collection(db, "categories")),
          getDocs(collection(db, "brands")),
          getDocs(collection(db, "sliders")),
          getDocs(collection(db, "users")),
          getDocs(query(collection(db, "inquiries"), where("status", "==", "new"))),
          getDocs(query(collection(db, "inquiries"), orderBy("createdAt", "desc"), limit(5))),
        ]);

        setCounts({
          products: productsSnap.size,
          categories: categoriesSnap.size,
          brands: brandsSnap.size,
          sliders: slidersSnap.size,
          users: usersSnap.size,
          newInquiries: newInqSnap.size,
        });

        setInquiries(
          recentInqSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Inquiry))
        );
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const stats = [
    {
      label: "Toplam Ürün",
      value: counts.products,
      icon: <Package size={22} />,
      color: "bg-blue-50 text-blue-600",
      href: "/admin/urunler",
    },
    {
      label: "Kategoriler",
      value: counts.categories,
      icon: <Tag size={22} />,
      color: "bg-purple-50 text-purple-600",
      href: "/admin/kategoriler",
    },
    {
      label: "Markalar",
      value: counts.brands,
      icon: <Award size={22} />,
      color: "bg-orange-50 text-orange-600",
      href: "/admin/markalar",
    },
    {
      label: "Slider",
      value: counts.sliders,
      icon: <Layers size={22} />,
      color: "bg-teal-50 text-teal-600",
      href: "/admin/slider",
    },
    {
      label: "Kayıtlı Kullanıcı",
      value: counts.users,
      icon: <Users size={22} />,
      color: "bg-green-50 text-green-600",
      href: "/admin/kullanicilar",
    },
    {
      label: "Yeni Talep",
      value: counts.newInquiries,
      icon: <MessageSquare size={22} />,
      color: "bg-gold-50 text-gold-600",
      highlight: counts.newInquiries > 0,
      href: "/admin/talepler",
    },
  ];

  const statusColors: Record<string, string> = {
    new: "badge-gold",
    seen: "bg-blue-50 text-blue-700 border border-blue-200",
    replied: "badge-green",
  };

  const statusLabels: Record<string, string> = {
    new: "Yeni",
    seen: "Görüldü",
    replied: "Yanıtlandı",
  };

  return (
    <div className="p-8 text-slate-200">
      {/* Header */}
      <div className="mb-8">
        <p className="section-label">Admin Paneli</p>
        <h1 className="font-heading font-bold text-white text-3xl">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Genel bakış ve son aktiviteler</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {stats.map((stat, i) => (
          <motion.a
            key={stat.label}
            href={stat.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className={`bg-[#1B1D23] border border-[#282C36] rounded-2xl p-6 cursor-pointer shadow-lg hover:border-gold/50 transition-all ${stat.highlight ? "ring-2 ring-gold" : ""}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gold/15 text-gold">
                {stat.icon}
              </div>
              {stat.highlight && (
                <span className="badge badge-gold text-xs">
                  <TrendingUp size={10} className="mr-1" />
                  Yeni
                </span>
              )}
            </div>
            <p className="font-heading font-bold text-white text-3xl">
              {loading ? "—" : stat.value}
            </p>
            <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
          </motion.a>
        ))}
      </div>

      {/* Recent inquiries */}
      <div className="bg-[#1B1D23] border border-[#282C36] rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading font-semibold text-white text-lg">
            Son Fiyat Talepleri
          </h2>
          <a href="/admin/talepler" className="text-gold text-sm font-semibold hover:text-gold-300">
            Tümünü gör →
          </a>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-14 w-full bg-[#16181D]" />
            ))}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-10">
            <MessageSquare size={32} className="text-slate-500 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">Henüz talep bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#282C36]">
                  <th className="text-left py-2.5 pr-4 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    Müşteri
                  </th>
                  <th className="text-left py-2.5 pr-4 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    Ürün
                  </th>
                  <th className="text-left py-2.5 pr-4 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="text-left py-2.5 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    Durum
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#282C36]">
                {inquiries.map((iq) => (
                  <tr key={iq.id} className="hover:bg-[#16181D] transition-colors">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-white">{iq.userName}</p>
                      <p className="text-slate-400 text-xs">{iq.company}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <p className="text-slate-300 truncate max-w-[180px]">{iq.productName}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                        <Clock size={11} />
                        {iq.createdAt
                          ? new Date(iq.createdAt.toDate()).toLocaleDateString("tr-TR")
                          : "—"}
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`badge text-xs ${statusColors[iq.status] ?? "badge-gold"}`}>
                        {statusLabels[iq.status] ?? iq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
