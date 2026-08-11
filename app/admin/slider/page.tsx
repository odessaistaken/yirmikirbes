"use client";

export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, Check, Upload,
  AlertTriangle, Layers, ImageIcon, GripVertical,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getSliders, addSlider, updateSlider, deleteSlider, uploadImage,
} from "@/lib/firestore-collections";
import type { SliderItem } from "@/lib/types";

export default function AdminSlider() {
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<SliderItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SliderItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    order: 1,
    targetUrl: "",
    imageUrl: "",
    imageAlt: "",
    imageStoragePath: "",
    isActive: true,
  });

  /* Load sliders on mount */
  useEffect(() => {
    async function load() {
      try {
        const data = await getSliders();
        setSliders(data);
      } catch (err) {
        console.error("Slider load error:", err);
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
      order: sliders.length + 1,
      targetUrl: "",
      imageUrl: "",
      imageAlt: "",
      imageStoragePath: "",
      isActive: true,
    });
    setModalOpen(true);
  }

  function openEdit(s: SliderItem) {
    setEditTarget(s);
    setForm({
      name: s.name,
      order: s.order,
      targetUrl: s.targetUrl,
      imageUrl: s.imageUrl,
      imageAlt: s.imageAlt,
      imageStoragePath: s.imageStoragePath ?? "",
      isActive: s.isActive,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.name.trim()) {
      toast.error("Slider adı gereklidir.");
      return;
    }
    if (!form.imageUrl.trim()) {
      toast.error("Slider görseli gereklidir.");
      return;
    }
    setSaving(true);
    try {
      const payload: Omit<SliderItem, "id"> = {
        name: form.name,
        order: form.order,
        targetUrl: form.targetUrl,
        imageUrl: form.imageUrl,
        imageAlt: form.imageAlt,
        imageStoragePath: form.imageStoragePath || undefined,
        isActive: form.isActive,
      };

      if (editTarget) {
        await updateSlider(editTarget.id, payload);
        setSliders((prev) =>
          prev.map((s) => (s.id === editTarget.id ? { ...s, ...payload } : s))
        );
        toast.success("Slider güncellendi.");
      } else {
        const id = await addSlider(payload);
        setSliders((prev) => [...prev, { id, ...payload }]);
        toast.success("Yeni slider eklendi.");
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Kaydedilemedi. Lütfen tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(s: SliderItem) {
    try {
      await deleteSlider(s);
      setSliders((prev) => prev.filter((x) => x.id !== s.id));
      toast.success("Slider silindi.");
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
            Slider Yönetimi
          </h1>
          <p className="text-charcoal-500 text-sm mt-1">
            Ana sayfadaki hero slider görsellerini yönetin.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus size={16} />
          Yeni Slider
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
                  Görsel
                </th>
                <th className="text-left py-3.5 px-5 text-charcoal-400 text-xs font-semibold uppercase tracking-wider">
                  Ad
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
                  <td colSpan={7} className="py-12 text-center">
                    <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : sliders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <Layers size={32} className="text-charcoal-300 mx-auto mb-3" />
                    <p className="text-charcoal-500 text-sm">Henüz slider eklenmemiş.</p>
                    <button onClick={openAdd} className="btn-gold-outline mt-4 text-xs">
                      <Plus size={14} />
                      İlk Slider&apos;ı Ekle
                    </button>
                  </td>
                </tr>
              ) : (
                sliders
                  .sort((a, b) => a.order - b.order)
                  .map((s) => (
                    <tr key={s.id} className="hover:bg-cream-100 transition-colors">
                      <td className="py-3.5 px-5 text-charcoal-300">
                        <GripVertical size={16} />
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="w-20 h-12 rounded-lg overflow-hidden bg-cream-200 relative shrink-0">
                          {s.imageUrl ? (
                            <Image src={s.imageUrl} alt={s.imageAlt || s.name} fill className="object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <ImageIcon size={16} className="text-charcoal-300" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <p className="font-semibold text-charcoal-800 text-sm">{s.name}</p>
                        <p className="text-charcoal-400 text-xs mt-0.5">{s.imageAlt}</p>
                      </td>
                      <td className="py-3.5 px-5">
                        {s.targetUrl ? (
                          <a
                            href={s.targetUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-gold-600 text-xs hover:text-gold-700"
                          >
                            <ExternalLink size={11} />
                            {s.targetUrl.length > 30 ? s.targetUrl.slice(0, 30) + "…" : s.targetUrl}
                          </a>
                        ) : (
                          <span className="text-charcoal-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="text-charcoal-500 text-sm">{s.order}</span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`badge ${s.isActive ? "badge-green" : "badge-red"}`}>
                          {s.isActive ? "Aktif" : "Pasif"}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(s)}
                            className="p-2 rounded-lg text-charcoal-400 hover:text-gold hover:bg-gold-50 transition-colors"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(s)}
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
                    <Layers size={18} className="text-gold" />
                    <h2 className="font-heading font-bold text-charcoal-800 text-lg">
                      {editTarget ? "Slider Düzenle" : "Yeni Slider Ekle"}
                    </h2>
                  </div>
                  <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-cream">
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-charcoal-700 text-xs font-semibold mb-2">
                      Slider Görseli *
                    </label>
                    <div
                      className="border-2 border-dashed border-border rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer hover:border-gold transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {form.imageUrl ? (
                        <div className="relative w-full aspect-[16/7] rounded-lg overflow-hidden">
                          <Image src={form.imageUrl} alt="preview" fill className="object-cover" />
                        </div>
                      ) : (
                        <>
                          <Upload size={28} className="text-charcoal-300" />
                          <p className="text-charcoal-500 text-xs">Görsel yüklemek için tıklayın</p>
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
                          const { url, path } = await uploadImage(file, "sliders", setUploadProgress);
                          setForm({ ...form, imageUrl: url, imageStoragePath: path });
                          setUploadProgress(null);
                        } catch {
                          toast.error("Görsel yüklenemedi.");
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
                        Slider Adı *
                      </label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Yaz Kampanyası"
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
                      Hedef URL
                    </label>
                    <input
                      value={form.targetUrl}
                      onChange={(e) => setForm({ ...form, targetUrl: e.target.value })}
                      placeholder="/katalog veya https://..."
                      className="input text-sm"
                    />
                    <p className="text-charcoal-400 text-xs mt-1">
                      Slider tıklandığında yönlendirilecek sayfa.
                    </p>
                  </div>

                  <div>
                    <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">
                      Görsel Alt Metni
                    </label>
                    <input
                      value={form.imageAlt}
                      onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
                      placeholder="Premium pastacılık ürünleri kampanyası"
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
                      {form.isActive ? "Aktif (ana sayfada görünür)" : "Pasif (gizli)"}
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
                  Slider&apos;ı Sil
                </h3>
                <p className="text-charcoal-500 text-sm mb-6">
                  &quot;{deleteTarget.name}&quot; slider&apos;ı kalıcı olarak silinecek.
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
