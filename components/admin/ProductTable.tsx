"use client";

import Image from "next/image";
import { Copy, Flame, ImageIcon, Package, Pencil, Trash2 } from "lucide-react";
import type { Product, Category } from "@/lib/types";

interface ProductTableProps {
  products: Product[];
  categories: Category[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onClone: (product: Product) => void;
  onToggleBestSeller: (product: Product) => void;
}

export default function ProductTable({
  products,
  categories,
  onEdit,
  onDelete,
  onClone,
  onToggleBestSeller,
}: ProductTableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider w-16">
                Görsel
              </th>
              <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                Ürün Adı
              </th>
              <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                Kod
              </th>
              <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                Kategori
              </th>
              <th className="text-left py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                Fiyat
              </th>
              <th className="text-center py-3.5 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                Çok Satan
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
            {products.map((p) => {
              const categoryName =
                categories.find((c) => c.id === p.categoryId)?.name ??
                p.categoryName ??
                p.categoryId;

              return (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 relative shrink-0">
                      {p.imageUrl ? (
                        <Image
                          src={p.imageUrl}
                          alt={p.name}
                          fill
                          sizes="48px"
                          quality={85}
                          className="object-contain p-1"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon size={16} className="text-slate-400" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <p className="font-semibold text-slate-900 text-sm">{p.name}</p>
                    {p.codeGroup && (
                      <p className="text-slate-500 text-xs mt-0.5">Grup: {p.codeGroup}</p>
                    )}
                  </td>
                  <td className="py-3 px-5">
                    <code className="text-xs bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-mono">
                      {p.code}
                    </code>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-slate-600 text-sm">{categoryName}</span>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-slate-900 text-sm font-medium">
                      {p.price > 0 ? `₺${p.price.toFixed(2)}` : "—"}
                    </span>
                    {p.price > 0 && (
                      <span className="text-slate-500 text-xs ml-1">+%{p.vatRate}</span>
                    )}
                  </td>
                  <td className="py-3 px-5 text-center">
                    <button
                      type="button"
                      onClick={() => onToggleBestSeller(p)}
                      title={p.isBestSeller ? "Çok Satanlardan Çıkar" : "Çok Satanlara Ekle"}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        p.isBestSeller
                          ? "bg-amber-500 text-white shadow-sm hover:bg-amber-600"
                          : "bg-slate-100 text-slate-600 hover:text-amber-600 hover:bg-amber-50 border border-slate-200"
                      }`}
                    >
                      <Flame size={12} className={p.isBestSeller ? "fill-white" : ""} />
                      <span>{p.isBestSeller ? "Evet" : "Hayır"}</span>
                    </button>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-slate-700 text-sm">{p.order}</span>
                  </td>
                  <td className="py-3 px-5">
                    <span className={`badge ${p.isActive ? "badge-green" : "badge-red"}`}>
                      {p.isActive ? "Aktif" : "Pasif"}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onClone(p)}
                        title="Klonla"
                        className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <Copy size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(p)}
                        title="Düzenle"
                        className="p-2 rounded-lg text-slate-400 hover:text-gold hover:bg-gold/10 transition-colors cursor-pointer"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(p.id)}
                        title="Sil"
                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-12">
            <Package size={32} className="text-slate-400 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Ürün bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}
