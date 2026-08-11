"use client";

export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import {
  collection, getDocs, query, orderBy, updateDoc, doc, where,
} from "firebase/firestore";
import { requireDb } from "@/lib/firebase";
import { motion } from "framer-motion";
import { MessageSquare, Clock, Building2, Mail, Phone, Eye, Check, Filter } from "lucide-react";

interface Inquiry {
  id: string;
  userName: string;
  company: string;
  email: string;
  phone: string;
  productId: string;
  productName: string;
  productCode: string;
  message?: string;
  quantity?: string;
  status: "new" | "seen" | "replied";
  createdAt: { toDate: () => Date } | null;
}

const statusConfig = {
  new: { label: "Yeni", className: "badge-gold", icon: <Eye size={11} /> },
  seen: { label: "Görüldü", className: "bg-blue-50 text-blue-700 border border-blue-200", icon: <Eye size={11} /> },
  replied: { label: "Yanıtlandı", className: "badge-green", icon: <Check size={11} /> },
};

export default function AdminTalepler() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(
          query(collection(requireDb(), "inquiries"), orderBy("createdAt", "desc"))
        );
        setInquiries(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Inquiry)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function updateStatus(id: string, status: Inquiry["status"]) {
    try {
      await updateDoc(doc(requireDb(), "inquiries", id), { status });
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status } : i))
      );
      if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
    } catch (err) {
      console.error(err);
    }
  }

  const counts = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    seen: inquiries.filter((i) => i.status === "seen").length,
    replied: inquiries.filter((i) => i.status === "replied").length,
  };

  const filtered = statusFilter === "all"
    ? inquiries
    : inquiries.filter((i) => i.status === statusFilter);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="section-label">Admin</p>
        <h1 className="font-heading font-bold text-charcoal-800 text-3xl">Fiyat Talepleri</h1>
        <p className="text-charcoal-500 text-sm mt-1">
          {counts.new > 0 && (
            <span className="text-gold-600 font-semibold">{counts.new} yeni talep · </span>
          )}
          Toplam {counts.all} talep
        </p>
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {[
          { key: "all", label: "Tümü", count: counts.all },
          { key: "new", label: "Yeni", count: counts.new },
          { key: "seen", label: "Görüldü", count: counts.seen },
          { key: "replied", label: "Yanıtlandı", count: counts.replied },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setStatusFilter(f.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
              statusFilter === f.key
                ? "bg-gold text-charcoal-900"
                : "bg-white border border-border text-charcoal-600 hover:border-gold hover:text-gold"
            }`}
          >
            {f.label}
            <span className={`text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center ${statusFilter === f.key ? "bg-charcoal-900/15" : "bg-cream-200"}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex gap-6">
        {/* List */}
        <div className={`card overflow-hidden ${selected ? "hidden lg:block lg:flex-1" : "w-full"}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream border-b border-border">
                <tr>
                  <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">Müşteri</th>
                  <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">Ürün</th>
                  <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">Tarih</th>
                  <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 4 }).map((_, j) => (
                        <td key={j} className="py-4 px-5"><div className="skeleton h-4 w-full rounded" /></td>
                      ))}
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12">
                      <MessageSquare size={32} className="text-charcoal-300 mx-auto mb-3" />
                      <p className="text-charcoal-400 text-sm">Talep bulunamadı.</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((iq) => {
                    const cfg = statusConfig[iq.status];
                    return (
                      <tr
                        key={iq.id}
                        onClick={() => { setSelected(iq); updateStatus(iq.id, "seen"); }}
                        className={`cursor-pointer hover:bg-cream-100 transition-colors ${selected?.id === iq.id ? "bg-gold-50" : ""}`}
                      >
                        <td className="py-3.5 px-5">
                          <p className="font-semibold text-charcoal-800 text-sm">{iq.userName}</p>
                          <p className="text-charcoal-400 text-xs">{iq.company}</p>
                        </td>
                        <td className="py-3.5 px-5">
                          <p className="text-charcoal-700 text-sm truncate max-w-[150px]">{iq.productName}</p>
                          <p className="text-charcoal-400 text-xs font-mono">{iq.productCode}</p>
                        </td>
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-1 text-charcoal-400 text-xs">
                            <Clock size={11} />
                            {iq.createdAt ? new Date(iq.createdAt.toDate()).toLocaleDateString("tr-TR") : "—"}
                          </div>
                        </td>
                        <td className="py-3.5 px-5">
                          <span className={`badge text-xs flex items-center gap-1 w-fit ${cfg.className}`}>
                            {cfg.icon}
                            {cfg.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-80 shrink-0"
          >
            <div className="card p-5 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-charcoal-800">Talep Detayı</h3>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-cream text-charcoal-400">
                  <Eye size={15} />
                </button>
              </div>

              {/* Product */}
              <div className="p-3 bg-cream-100 rounded-xl">
                <p className="text-2xs text-charcoal-400 uppercase tracking-wider mb-1">Ürün</p>
                <p className="font-semibold text-charcoal-800 text-sm">{selected.productName}</p>
                <p className="text-charcoal-400 text-xs font-mono">{selected.productCode}</p>
              </div>

              {/* Contact */}
              <div className="space-y-2.5">
                <p className="text-2xs text-charcoal-400 uppercase tracking-wider">Müşteri</p>
                <p className="font-semibold text-charcoal-800">{selected.userName}</p>
                <div className="space-y-1.5">
                  {[
                    { icon: <Building2 size={13} />, val: selected.company },
                    { icon: <Mail size={13} />, val: selected.email },
                    { icon: <Phone size={13} />, val: selected.phone },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-2 text-charcoal-500 text-xs">
                      <span className="text-gold shrink-0">{row.icon}</span>
                      {row.val}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              {selected.quantity && (
                <div>
                  <p className="text-2xs text-charcoal-400 uppercase tracking-wider mb-1">Miktar</p>
                  <p className="text-charcoal-700 text-sm">{selected.quantity}</p>
                </div>
              )}

              {/* Message */}
              {selected.message && (
                <div>
                  <p className="text-2xs text-charcoal-400 uppercase tracking-wider mb-1">Mesaj</p>
                  <p className="text-charcoal-600 text-sm leading-relaxed bg-cream-100 rounded-lg p-3">
                    {selected.message}
                  </p>
                </div>
              )}

              {/* Status actions */}
              <div>
                <p className="text-2xs text-charcoal-400 uppercase tracking-wider mb-2">Durum Güncelle</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["new", "seen", "replied"] as const).map((s) => {
                    const cfg = statusConfig[s];
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected.id, s)}
                        className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          selected.status === s
                            ? "bg-gold text-charcoal-900 border-gold"
                            : "border-border text-charcoal-600 hover:border-gold hover:text-gold"
                        }`}
                      >
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Email CTA */}
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.productName} Fiyat Talebi`}
                className="btn-primary w-full py-2.5 text-sm"
              >
                <Mail size={15} />
                E-posta Gönder
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
