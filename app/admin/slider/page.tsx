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
  getSliders, addSlider, updateSlider, deleteSlider, uploadImage, deleteStoredImage,
} from "@/lib/firestore-collections";
import type { SliderItem } from "@/lib/types";

export default function AdminSlider() {
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<SliderItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SliderItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
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

  async function handleRemoveImage() {
    if (form.imageStoragePath || form.imageUrl) {
      await deleteStoredImage(form.imageStoragePath || form.imageUrl);
    }
    setForm((prev) => ({
      ...prev,
      imageUrl: "",
      imageStoragePath: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Slider görseli silindi. Lütfen yeni bir görsel seçin veya URL girin.");
  }

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
        name: form.name.trim(),
        order: Number(form.order) || 0,
        targetUrl: form.targetUrl.trim(),
        imageUrl: form.imageUrl.trim(),
        imageAlt: form.imageAlt.trim(),
        imageStoragePath: form.imageStoragePath || "",
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
    if (!s) {
      setDeleteTarget(null);
      return;
    }
    setDeleting(true);
    try {
      await deleteSlider(s);
      setSliders((prev) => prev.filter((x) => x.id !== s.id));
      toast.success("Slider başarıyla silindi.");
    } catch (err: any) {
      console.error("Slider silme hatası:", err);
      toast.error(`Silinemedi: ${err?.message || "Bilinmeyen hata"}`);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="p-8 text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="section-label">Admin</p>
          <h1 className="font-heading font-bold text-slate-900 text-3xl">
            Slider Yönetimi
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Ana sayfadaki hero slider görsellerini yönetin.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary shadow-gold">
          <Plus size={16} />
          Yeni Slider
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider w-8" />
                <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider w-20">
                  Görsel
                </th>
                <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  Ad
                </th>
                <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  Hedef URL
                </th>
                <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  Sıra
                </th>
                <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  Durum
                </th>
                <th className="text-right py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : sliders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <Layers size={32} className="text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">Henüz slider eklenmemiş.</p>
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
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-5 text-slate-400">
                        <GripVertical size={16} />
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="w-20 h-12 rounded-lg overflow-hidden bg-slate-50 border border-slate-200 relative shrink-0">
                          {s.imageUrl ? (
                            <Image src={s.imageUrl} alt={s.imageAlt || s.name} fill sizes="80px" quality={85} className="object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <ImageIcon size={16} className="text-slate-400" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <p className="font-semibold text-slate-900 text-sm">{s.name}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{s.imageAlt}</p>
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
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="text-slate-700 text-sm">{s.order}</span>
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
                            className="p-2 rounded-lg text-slate-400 hover:text-gold hover:bg-gold/10 transition-colors"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(s)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
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
              className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto text-slate-800"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <Layers size={18} className="text-gold-600" />
                    <h2 className="font-heading font-bold text-slate-900 text-lg">
                      {editTarget ? "Slider'ı Düzenle" : "Yeni Slider Ekle"}
                    </h2>
                  </div>
                  <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  {/* Image Upload */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-slate-700 text-xs font-semibold">
                        Slider Görseli (1920x600 önerilir)
                      </label>
                      {form.imageUrl && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="text-red-500 hover:text-red-600 text-xs font-medium flex items-center gap-1 hover:underline transition-colors cursor-pointer"
                        >
                          <Trash2 size={12} /> Görseli Kaldır / Sil
                        </button>
                      )}
                    </div>

                    <div
                      className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center gap-3 transition-colors ${
                        form.imageUrl
                          ? "border-slate-200 bg-slate-50"
                          : "border-slate-300 bg-slate-50 hover:border-gold cursor-pointer"
                      }`}
                      onClick={() => !form.imageUrl && fileInputRef.current?.click()}
                    >
                      {form.imageUrl ? (
                        <div className="relative w-full aspect-[21/9] rounded-lg overflow-hidden group bg-slate-100">
                          <Image
                            src={form.imageUrl}
                            alt="preview"
                            fill
                            sizes="(max-width: 768px) 100vw, 500px"
                            quality={90}
                            className="object-cover"
                          />
                          {/* Hover action overlay */}
                          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                              }}
                              className="text-white text-xs font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-md"
                            >
                              <Upload size={13} /> Değiştir
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage();
                              }}
                              className="text-white text-xs font-semibold bg-red-600/80 hover:bg-red-600 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-md"
                            >
                              <Trash2 size={13} /> Görseli Sil
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <Upload size={28} className="text-slate-400 mx-auto mb-2" />
                          <p className="text-slate-700 text-xs">Görsel yüklemek için tıklayın</p>
                          <p className="text-slate-400 text-2xs mt-1">PNG, JPG, WEBP — Max 5MB</p>
                        </div>
                      )}
                      {uploadProgress !== null && (
                        <div className="w-full">
                          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gold transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-1 text-center">{uploadProgress}%</p>
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

                    <div className="flex items-center justify-between gap-2 mt-2">
                      <p className="text-slate-500 text-xs">veya URL giriniz:</p>
                      {form.imageUrl && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="text-red-500 hover:text-red-600 text-2xs flex items-center gap-1 hover:underline"
                        >
                          <Trash2 size={10} /> Görseli Temizle
                        </button>
                      )}
                    </div>
                    <input
                      value={form.imageUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        setForm({
                          ...form,
                          imageUrl: val,
                          imageStoragePath: val ? form.imageStoragePath : "",
                        });
                      }}
                      placeholder="https://..."
                      className="input mt-1 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                        Slider Adı *
                      </label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Örn: Yeni Sezon İndirimi"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 text-xs font-semibold mb-1.5">
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
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                      Görsel Alt Metni (SEO)
                    </label>
                    <input
                      value={form.imageAlt}
                      onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
                      placeholder="Callebaut Çikolata Kampanyası"
                      className="input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                      Tıklama Hedef URL
                    </label>
                    <input
                      value={form.targetUrl}
                      onChange={(e) => setForm({ ...form, targetUrl: e.target.value })}
                      placeholder="/katalog veya https://..."
                      className="input text-sm"
                    />
                  </div>

                  {/* Active toggle */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, isActive: !form.isActive })}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${form.isActive ? "bg-gold" : "bg-slate-200"}`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${form.isActive ? "translate-x-5" : "translate-x-0.5"}`}
                      />
                    </button>
                    <span className="text-slate-700 text-sm font-medium">
                      {form.isActive ? "Aktif (sliderda görünür)" : "Pasif (gizli)"}
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
                    className="btn-primary flex-1 shadow-gold"
                  >
                    {saving ? (
                      <span className="animate-spin w-4 h-4 border-2 border-slate-700 border-t-black rounded-full" />
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => !deleting && setDeleteTarget(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center text-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={28} className="text-red-500" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-lg mb-2">
                Slider&apos;ı Sil
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                &quot;{deleteTarget.name}&quot; slider görseli kalıcı olarak silinecek.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => setDeleteTarget(null)}
                  className="btn-secondary flex-1"
                >
                  İptal
                </button>
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => handleDelete(deleteTarget)}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Siliniyor...</span>
                    </>
                  ) : (
                    "Sil"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
