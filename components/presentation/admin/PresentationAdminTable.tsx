"use client";

import Image from "next/image";
import { Pencil, Trash2, Sparkles } from "lucide-react";
import type { PresentationProduct } from "@/lib/presentation-catalog-service";

interface PresentationAdminTableProps {
  products: PresentationProduct[];
  onEdit: (product: PresentationProduct) => void;
  onDelete: (id: string) => void;
}

export default function PresentationAdminTable({
  products,
  onEdit,
  onDelete,
}: PresentationAdminTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/75 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              <th className="py-3.5 px-4 w-16">Görsel</th>
              <th className="py-3.5 px-4">Ürün İsmi & Rozet</th>
              <th className="py-3.5 px-4">Kategori</th>
              <th className="py-3.5 px-4">Fiyat</th>
              <th className="py-3.5 px-4 max-w-xs">Tanıtım Metni</th>
              <th className="py-3.5 px-4 text-center">Durum</th>
              <th className="py-3.5 px-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                {/* Visual */}
                <td className="py-3 px-4">
                  <div className="relative w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                    <Image
                      src={p.imageUrl || "/resimler/logo.png"}
                      alt={p.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                </td>

                {/* Name & Badge */}
                <td className="py-3 px-4">
                  <p className="font-semibold text-stone-900 text-sm leading-snug">{p.name}</p>
                  {p.badge && (
                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-medium text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                      <Sparkles size={10} className="text-amber-600" />
                      <span>{p.badge}</span>
                    </span>
                  )}
                </td>

                {/* Category */}
                <td className="py-3 px-4">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 font-medium text-[11px]">
                    {p.categoryName || p.categoryId}
                  </span>
                </td>

                {/* Price */}
                <td className="py-3 px-4 font-mono font-medium text-stone-900">
                  {p.price > 0 ? `₺${p.price.toFixed(2)}` : "—"}
                </td>

                {/* Description snippet */}
                <td className="py-3 px-4 max-w-xs">
                  <p className="line-clamp-2 text-stone-500 text-[11px] leading-relaxed">
                    {p.description}
                  </p>
                </td>

                {/* Status */}
                <td className="py-3 px-4 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      p.isActive !== false
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-stone-100 text-stone-400"
                    }`}
                  >
                    {p.isActive !== false ? "Aktif" : "Pasif"}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(p)}
                      title="Düzenle"
                      className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(p.id)}
                      title="Sil"
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="py-12 text-center text-stone-400 text-xs">
            Katalogda henüz ürün bulunmuyor. Yeni ürün ekleyebilirsiniz.
          </div>
        )}
      </div>
    </div>
  );
}
