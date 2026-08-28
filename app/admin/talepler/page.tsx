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
  seen: { label: "Görüldü", className: "bg-blue-500/15 text-blue-300 border border-blue-500/30", icon: <Eye size={11} /> },
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
    <div className="p-8 text-slate-200">
      {/* Header */}
      <div className="mb-8">
        <p className="section-label">Admin</p>
        <h1 className="font-heading font-bold text-white text-3xl">Fiyat Talepleri</h1>
        <p className="text-slate-400 text-sm mt-1">
          {counts.new > 0 && (
            <span className="text-gold font-semibold">{counts.new} yeni talep · </span>
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
                ? "bg-gold text-charcoal-900 font-semibold shadow-gold"
                : "bg-[#1B1D23] border border-[#282C36] text-slate-300 hover:border-gold hover:text-gold"
            }`}
          >
            {f.label}
            <span className={`text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center ${statusFilter === f.key ? "bg-black/20 text-charcoal-900 font-bold" : "bg-[#16181D] text-slate-400 border border-[#282C36]"}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* List */}
        <div className={`bg-[#1B1D23] border border-[#282C36] rounded-2xl overflow-hidden shadow-xl ${selected ? "hidden lg:block lg:flex-1" : "w-full"}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#121316] border-b border-[#282C36]">
                <tr>
                  <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Müşteri</th>
                  <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Ürün</th>
                  <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Tarih</th>
                  <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#282C36]">
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
                      <MessageSquare size={32} className="text-slate-500 mx-auto mb-3" />
                      <p className="text-slate-400 text-sm">Talep bulunamadı.</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((iq) => {
                    const cfg = statusConfig[iq.status];
                    return (
                      <tr
                        key={iq.id}
                        onClick={() => { setSelected(iq); updateStatus(iq.id, "seen"); }}
                        className={`cursor-pointer hover:bg-[#16181D] transition-colors ${selected?.id === iq.id ? "bg-gold/10 border-l-2 border-gold" : ""}`}
                      >
                        <td className="py-3.5 px-5">
                          <p className="font-semibold text-white text-sm">{iq.userName}</p>
                          <p className="text-slate-400 text-xs">{iq.company}</p>
                        </td>
                        <td className="py-3.5 px-5">
                          <p className="text-slate-200 text-sm truncate max-w-[150px]">{iq.productName}</p>
                          <p className="text-gold text-xs font-mono">{iq.productCode}</p>
                        </td>
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-1 text-slate-400 text-xs">
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
            <div className="bg-[#1B1D23] border border-[#282C36] rounded-2xl p-5 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-white">Talep Detayı</h3>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-[#16181D] text-slate-400 hover:text-white">
                  <Eye size={15} />
                </button>
              </div>

              {/* Product */}
              <div className="p-3.5 bg-[#16181D] border border-[#282C36] rounded-xl">
                <p className="text-2xs text-slate-500 uppercase tracking-wider mb-1">Ürün</p>
                <p className="font-semibold text-white text-sm">{selected.productName}</p>
                <p className="text-gold text-xs font-mono mt-0.5">{selected.productCode}</p>
              </div>

              {/* Contact */}
              <div className="space-y-2.5">
                <p className="text-2xs text-slate-500 uppercase tracking-wider">Müşteri</p>
                <p className="font-semibold text-white">{selected.userName}</p>
                <div className="space-y-2">
                  {[
                    { icon: <Building2 size={13} />, val: selected.company },
                    { icon: <Mail size={13} />, val: selected.email },
                    { icon: <Phone size={13} />, val: selected.phone },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300 text-xs">
                      <span className="text-gold shrink-0">{row.icon}</span>
                      {row.val}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              {selected.quantity && (
                <div>
                  <p className="text-2xs text-slate-500 uppercase tracking-wider mb-1">Miktar</p>
                  <p className="text-slate-200 text-sm font-medium">{selected.quantity}</p>
                </div>
              )}

              {/* Message */}
              {selected.message && (
                <div>
                  <p className="text-2xs text-slate-500 uppercase tracking-wider mb-1">Mesaj</p>
                  <p className="text-slate-300 text-sm leading-relaxed bg-[#16181D] border border-[#282C36] rounded-lg p-3">
                    {selected.message}
                  </p>
                </div>
              )}

              {/* Status actions */}
              <div>
                <p className="text-2xs text-slate-500 uppercase tracking-wider mb-2">Durum Güncelle</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["new", "seen", "replied"] as const).map((s) => {
                    const cfg = statusConfig[s];
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected.id, s)}
                        className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          selected.status === s
                            ? "bg-gold text-charcoal-900 border-gold font-semibold"
                            : "border-[#282C36] bg-[#16181D] text-slate-300 hover:border-gold hover:text-gold"
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
                className="btn-primary w-full py-2.5 text-sm shadow-gold flex items-center justify-center gap-2"
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
