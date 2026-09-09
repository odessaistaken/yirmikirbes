"use client";

import type { CategoryProductGroup } from "@/lib/presentation-catalog-service";

interface PresentationPDFTemplateProps {
  categoryGroups: CategoryProductGroup[];
}

export default function PresentationPDFTemplate({
  categoryGroups,
}: PresentationPDFTemplateProps) {
  const dateStr = new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      id="presentation-pdf-container"
      style={{ display: "none" }}
      className="bg-[#FAF9F6] text-stone-900 font-sans p-12 max-w-[1000px] mx-auto"
    >
      {/* ── PDF KAPAK SAYFASI ────────────────────────────────────────────── */}
      <div className="border-b-2 border-stone-800 pb-10 mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-2xs font-mono uppercase tracking-[0.3em] text-amber-800 font-bold block mb-1">
              YİRMİKİRBES • HORECA GIDA
            </span>
            <h1 className="text-4xl font-serif font-bold text-stone-900 tracking-tight">
              ÖZEL MÜŞTERİ SUNUM KATALOĞU
            </h1>
            <p className="text-sm text-stone-600 mt-2 font-sans">
              Barista, Pastacılık ve Miksoloji Koleksiyonu — Seçkin Ürün Kataloğu
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-stone-500 block">Tarih: {dateStr}</span>
            <span className="text-xs font-mono text-stone-500 block mt-1">İletişim: 0532 454 64 40</span>
          </div>
        </div>

        <div className="bg-stone-900 text-stone-100 p-4 rounded-xl flex items-center justify-between text-xs">
          <span>Toplam {categoryGroups.length} Kategori</span>
          <span>•</span>
          <span>
            Toplam {categoryGroups.reduce((acc, g) => acc + g.products.length, 0)} Ürün
          </span>
          <span>•</span>
          <span className="text-amber-300 font-semibold">Toptan ve Özel B2B Fiyatlandırması</span>
        </div>
      </div>

      {/* ── KATEGORİLER VE ÜRÜNLER ────────────────────────────────────────── */}
      <div className="space-y-12">
        {categoryGroups.map((group, groupIdx) => (
          <div key={group.category.id} className="pb-8 border-b border-stone-200">
            {/* Kategori Başlığı */}
            <div className="flex items-baseline justify-between mb-6 pb-2 border-b-2 border-stone-300">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-amber-800 font-bold">
                  [{String(groupIdx + 1).padStart(2, "0")}]
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  {group.category.name}
                </h2>
              </div>
              <span className="text-xs text-stone-500 font-mono">
                {group.products.length} Ürün
              </span>
            </div>

            {/* Ürün Listesi Grid (2 Kolonlu PDF Düzeni) */}
            <div className="grid grid-cols-2 gap-6">
              {group.products.map((product, pIdx) => (
                <div
                  key={product.id}
                  className="bg-white border border-stone-200 rounded-xl p-4 flex gap-4 break-inside-avoid"
                >
                  {/* Görsel */}
                  <div className="w-24 h-24 bg-stone-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-1 border border-stone-100">
                    {/* html2canvas ile tam uyumlu img etiketi */}
                    <img
                      src={product.imageUrl || "/resimler/logo.png"}
                      alt={product.name}
                      crossOrigin="anonymous"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Detay */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-xs font-serif font-bold text-stone-900 leading-snug truncate">
                          {product.name}
                        </h3>
                        <span className="text-xs font-serif font-bold text-amber-800 shrink-0">
                          {product.price > 0 ? `₺${product.price.toFixed(2)}` : "—"}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-600 leading-relaxed line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-2 mt-1 border-t border-stone-100 flex items-center justify-between text-[9px] text-stone-400 font-mono">
                      <span>№ {String(pIdx + 1).padStart(2, "0")}</span>
                      <span>Yirmikirbes Horeca</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── PDF ALT BİLGİ ─────────────────────────────────────────────────── */}
      <div className="pt-8 text-center text-xs text-stone-500 border-t border-stone-300 mt-12">
        <p className="font-serif font-semibold text-stone-800 text-sm mb-1">
          Yirmikirbes Gıda San. ve Tic. Ltd. Şti.
        </p>
        <p>Web: www.yirmikirbes.com | WhatsApp Sipariş Hattı: +90 532 454 64 40</p>
        <p className="text-2xs text-stone-400 mt-2">
          * Fiyatlar toptan siparişler için gösterge niteliğinde olup dönemsel kampanyalara göre değişkenlik gösterebilir.
        </p>
      </div>
    </div>
  );
}
