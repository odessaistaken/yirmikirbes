"use client";

export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, updateDoc, doc } from "firebase/firestore";
import { requireDb } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Users, Shield, ShieldOff, Search, Building2, Mail, Phone } from "lucide-react";

interface UserRecord {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  createdAt: { toDate: () => Date } | null;
}

export default function AdminKullanicilar() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(query(collection(requireDb(), "users"), orderBy("createdAt", "desc")));
        setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserRecord)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function toggleRole(user: UserRecord) {
    const newRole = user.role === "admin" ? "user" : "admin";
    try {
      await updateDoc(doc(requireDb(), "users", user.id), { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error(err);
    }
  }

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 text-slate-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="section-label">Admin</p>
          <h1 className="font-heading font-bold text-white text-3xl">Kullanıcılar</h1>
          <p className="text-slate-400 text-sm mt-1">{users.length} kayıtlı kullanıcı</p>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Kullanıcı ara..."
            className="input pl-9 w-56 py-2.5 text-sm"
          />
        </div>
      </div>

      <div className="bg-[#1B1D23] border border-[#282C36] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#121316] border-b border-[#282C36]">
              <tr>
                <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Kullanıcı</th>
                <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Firma</th>
                <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">İletişim</th>
                <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Rol</th>
                <th className="text-left py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Kayıt Tarihi</th>
                <th className="text-right py-3.5 px-5 text-slate-400 text-xs font-semibold uppercase tracking-wider">Yetki</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#282C36]">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="py-4 px-5">
                        <div className="skeleton h-4 w-full rounded" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <Users size={32} className="text-slate-500 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm">Kullanıcı bulunamadı.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-[#16181D] transition-colors"
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                          <span className="text-gold font-bold text-sm">
                            {user.name[0]?.toUpperCase()}
                          </span>
                        </div>
                        <p className="font-semibold text-white text-sm">{user.name}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-1.5 text-slate-300 text-sm">
                        <Building2 size={13} className="text-slate-500 shrink-0" />
                        {user.company}
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <Mail size={11} className="shrink-0 text-slate-500" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                            <Phone size={11} className="shrink-0 text-slate-500" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`badge text-xs ${user.role === "admin" ? "badge-gold" : "bg-[#16181D] text-slate-400 border border-[#282C36]"}`}>
                        {user.role === "admin" ? "Admin" : "Kullanıcı"}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <p className="text-slate-400 text-xs">
                        {user.createdAt
                          ? new Date(user.createdAt.toDate()).toLocaleDateString("tr-TR")
                          : "—"}
                      </p>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex justify-end">
                        <button
                          onClick={() => toggleRole(user)}
                          title={user.role === "admin" ? "Admin yetkisini kaldır" : "Admin yap"}
                          className={`p-2 rounded-lg transition-colors ${
                            user.role === "admin"
                              ? "text-gold bg-gold/10 hover:bg-gold/20"
                              : "text-slate-400 hover:text-gold hover:bg-gold/10"
                          }`}
                        >
                          {user.role === "admin" ? <ShieldOff size={16} /> : <Shield size={16} />}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
