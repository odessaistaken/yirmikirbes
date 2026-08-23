"use client";

export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, Check, Upload,
  AlertTriangle, Award, ImageIcon, GripVertical,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getBrands, addBrand, updateBrand, deleteBrand, uploadImage,
} from "@/lib/firestore-collections";
import type { Brand } from "@/lib/types";

export default function AdminMarkalar() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Brand | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Brand | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    order: 1,
    targetUrl: "",
    imageUrl: "",
    imageStoragePath: "",
    subtitle: "",
    isActive: true,
  });

  /* Load brands on mount */
  useEffect(() => {
    async function load() {
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (err) {
        console.error("Brand load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function openAdd() {
    setEditTarget(null);
    setForm({
      name: "",
      order: brands.length + 1,
      targetUrl: "",
      imageUrl: "",
      imageStoragePath: "",
      subtitle: "",
      isActive: true,
    });
    setModalOpen(true);
  }

  function openEdit(b: Brand) {
    setEditTarget(b);
    setForm({
      name: b.name,
      order: b.order,
      targetUrl: b.targetUrl,
      imageUrl: b.imageUrl,
      imageStoragePath: b.imageStoragePath ?? "",
      subtitle: b.subtitle,
      isActive: b.isActive,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.name.trim()) {
      toast.error("Marka adı gereklidir.");
      return;
    }
    setSaving(true);
    try {
      const payload: Omit<Brand, "id"> = {
        name: form.name,
        order: form.order,
        targetUrl: form.targetUrl,
        imageUrl: form.imageUrl,
        imageStoragePath: form.imageStoragePath || undefined,
        subtitle: form.subtitle,
        isActive: form.isActive,
      };

      if (editTarget) {
        await updateBrand(editTarget.id, payload);
        setBrands((prev) =>
          prev.map((b) => (b.id === editTarget.id ? { ...b, ...payload } : b))
        );
        toast.success("Marka güncellendi.");
      } else {
        const id = await addBrand(payload);
        setBrands((prev) => [...prev, { id, ...payload }]);
        toast.success("Yeni marka eklendi.");
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Kaydedilemedi. Lütfen tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(b: Brand) {
    try {
      await deleteBrand(b);
      setBrands((prev) => prev.filter((x) => x.id !== b.id));
      toast.success("Marka silindi.");
    } catch (err) {
      console.error(err);
      toast.error("Silinemedi.");
    } finally {
      setDeleteTarget(null);
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="section-label">Admin</p>
          <h1 className="font-heading font-bold text-charcoal-800 text-3xl">
            Markalar
          </h1>
          <p className="text-charcoal-500 text-sm mt-1">
            Ana sayfada gösterilen marka logolarını yönetin.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus size={16} />
          Yeni Marka
        </button>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream border-b border-border">
              <tr>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider w-8" />
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider w-20">
                  Logo
                </th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">
                  Marka Adı
                </th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">
                  Altyazı
                </th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">
                  Hedef URL
                </th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">
                  Sıra
                </th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">
                  Durum
                </th>
                <th className="text-right py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : brands.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12">
                    <Award size={32} className="text-charcoal-300 mx-auto mb-3" />
                    <p className="text-charcoal-500 text-sm">Henüz marka eklenmemiş.</p>
                    <button onClick={openAdd} className="btn-gold-outline mt-4 text-xs">
                      <Plus size={14} />
                      İlk Markayı Ekle
                    </button>
                  </td>
                </tr>
              ) : (
                brands
                  .sort((a, b) => a.order - b.order)
                  .map((b) => (
                    <tr key={b.id} className="hover:bg-cream-100 transition-colors">
                      <td className="py-3.5 px-5 text-charcoal-300">
                        <GripVertical size={16} />
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-cream-200 relative shrink-0 border border-border">
                          {b.imageUrl ? (
                            <Image src={b.imageUrl} alt={b.name} fill sizes="56px" quality={90} className="object-contain p-1" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <ImageIcon size={16} className="text-charcoal-300" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <p className="font-semibold text-charcoal-800 text-sm">{b.name}</p>
                      </td>
                      <td className="py-3.5 px-5">
                        <p className="text-charcoal-500 text-sm">{b.subtitle || "—"}</p>
                      </td>
                      <td className="py-3.5 px-5">
                        {b.targetUrl ? (
                          <a
                            href={b.targetUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-gold-600 text-xs hover:text-gold-700"
                          >
                            <ExternalLink size={11} />
                            {b.targetUrl.length > 25 ? b.targetUrl.slice(0, 25) + "…" : b.targetUrl}
                          </a>
                        ) : (
                          <span className="text-charcoal-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="text-charcoal-500 text-sm">{b.order}</span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`badge ${b.isActive ? "badge-green" : "badge-red"}`}>
                          {b.isActive ? "Aktif" : "Pasif"}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(b)}
                            className="p-2 rounded-lg text-charcoal-400 hover:text-gold hover:bg-gold-50 transition-colors"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(b)}
                            className="p-2 rounded-lg text-charcoal-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="bg-white rounded-2xl shadow-soft-lg w-full max-w-xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-gold" />
                    <h2 className="font-heading font-bold text-charcoal-800 text-lg">
                      {editTarget ? "Markayı Düzenle" : "Yeni Marka Ekle"}
                    </h2>
                  </div>
                  <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-cream">
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  {/* Logo Upload */}
                  <div>
                    <label className="block text-charcoal-700 text-xs font-semibold mb-2">
                      Marka Logosu
                    </label>
                    <div
                      className="border-2 border-dashed border-border rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer hover:border-gold transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {form.imageUrl ? (
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                          <Image src={form.imageUrl} alt="preview" fill sizes="128px" quality={90} className="object-contain" />
                        </div>
                      ) : (
                        <>
                          <Upload size={28} className="text-charcoal-300" />
                          <p className="text-charcoal-500 text-xs">Logo yüklemek için tıklayın</p>
                        </>
                      )}
                      {uploadProgress !== null && (
                        <div className="w-full">
                          <div className="h-1.5 bg-cream-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gold transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <p className="text-xs text-charcoal-400 mt-1 text-center">{uploadProgress}%</p>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const { url, path } = await uploadImage(file, "brands", setUploadProgress);
                          setForm({ ...form, imageUrl: url, imageStoragePath: path });
                          setUploadProgress(null);
                        } catch {
                          toast.error("Logo yüklenemedi.");
                          setUploadProgress(null);
                        }
                      }}
                    />
                    <p className="text-charcoal-400 text-xs mt-1.5">veya URL giriniz:</p>
                    <input
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      placeholder="https://..."
                      className="input mt-1 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">
                        Marka Adı *
                      </label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Callebaut"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">
                        Sıralama
                      </label>
                      <input
                        type="number"
                        value={form.order}
                        onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                        className="input w-24"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">
                      Altyazı
                    </label>
                    <input
                      value={form.subtitle}
                      onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                      placeholder="Premium Belçika Çikolatası"
                      className="input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">
                      Hedef URL
                    </label>
                    <input
                      value={form.targetUrl}
                      onChange={(e) => setForm({ ...form, targetUrl: e.target.value })}
                      placeholder="https://callebaut.com"
                      className="input text-sm"
                    />
                  </div>

                  {/* Active toggle */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, isActive: !form.isActive })}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${form.isActive ? "bg-gold" : "bg-charcoal-300"}`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${form.isActive ? "translate-x-5" : "translate-x-0.5"}`}
                      />
                    </button>
                    <span className="text-charcoal-700 text-sm font-medium">
                      {form.isActive ? "Aktif (sayfada görünür)" : "Pasif (gizli)"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 px-6 pb-6">
                  <button onClick={() => setModalOpen(false)} className="btn-secondary flex-1">
                    İptal
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || uploadProgress !== null}
                    className="btn-primary flex-1"
                  >
                    {saving ? (
                      <span className="animate-spin w-4 h-4 border-2 border-charcoal-400 border-t-charcoal-900 rounded-full" />
                    ) : (
                      <>
                        <Check size={15} />
                        {editTarget ? "Güncelle" : "Kaydet"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteTarget && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm"
              onClick={() => setDeleteTarget(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="bg-white rounded-2xl shadow-soft-lg p-6 max-w-sm w-full text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle size={28} className="text-red-500" />
                </div>
                <h3 className="font-heading font-bold text-charcoal-800 text-lg mb-2">
                  Markayı Sil
                </h3>
                <p className="text-charcoal-500 text-sm mb-6">
                  &quot;{deleteTarget.name}&quot; markası kalıcı olarak silinecek.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteTarget(null)} className="btn-secondary flex-1">
                    İptal
                  </button>
                  <button
                    onClick={() => handleDelete(deleteTarget)}
                    className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-sm transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
