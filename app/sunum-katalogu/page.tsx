"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Sparkles, MessageCircle, ArrowUp } from "lucide-react";
import PresentationSectionNav from "@/components/presentation/PresentationSectionNav";
import PresentationCategorySection from "@/components/presentation/PresentationCategorySection";
import PresentationDetailModal from "@/components/presentation/PresentationDetailModal";
import {
  fetchPresentationCategories,
  fetchPresentationProducts,
  groupProductsByCategory,
  type PresentationProduct,
} from "@/lib/presentation-catalog-service";
import type { Category } from "@/lib/types";

export default function SunumKataloguPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<PresentationProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [activeModalProduct, setActiveModalProduct] = useState<PresentationProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [cats, prods] = await Promise.all([
          fetchPresentationCategories(),
          fetchPresentationProducts(),
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        console.error("Sunum kataloğu veri yükleme hatası:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter products by search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
        (p.code && p.code.toLowerCase().includes(q))
    );
  }, [products, searchQuery]);

  // Group filtered products by category
  const categoryGroups = useMemo(() => {
    return groupProductsByCategory(categories, filteredProducts);
  }, [categories, filteredProducts]);

  // Observer for active category while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const group of categoryGroups) {
        const id = group.category.slug || group.category.id;
        const el = document.getElementById(`section-${id}`);
        if (el) {
          const top = el.offsetTop - 140;
          const bottom = top + el.offsetHeight;
          if (scrollY >= top && scrollY < bottom) {
            setActiveSectionId(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categoryGroups]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-stone-900 selection:text-white font-sans">
      {/* ── 1. Hero Presentation Showcase ──────────────────────────────────── */}
      <header className="pt-16 pb-12 sm:pt-20 sm:pb-16 border-b border-stone-200/80 bg-gradient-to-b from-stone-100/60 to-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-100 text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles size={12} className="text-amber-400" />
            <span>Özel Müşteri Sunum Kataloğu</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-900 tracking-tight max-w-3xl mx-auto leading-[1.15]">
            Zanaatkar Tatlar & Profesyonel Çözümler
          </h1>

          <p className="text-sm sm:text-base text-stone-600 mt-4 max-w-2xl mx-auto leading-relaxed font-sans">
            Pastacılık, barista ve miksoloji alanında işletmenizin menüsüne prestij katacak;
            yüksek kaliteli şuruplar, püreler, çikolatalar ve donuk tatlı koleksiyonumuz.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-stone-500 font-mono">
            <span>{categories.length} Kategori</span>
            <span>•</span>
            <span>{products.length} Seçkin Ürün</span>
            <span>•</span>
            <span className="text-amber-700 font-semibold">Toptan & Kurumsal Tedarik</span>
          </div>
        </div>
      </header>

      {/* ── 2. Sticky Quick Navigation Bar ─────────────────────────────────── */}
      <PresentationSectionNav
        categories={categories}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeSectionId={activeSectionId}
      />

      {/* ── 3. Category by Category Product Stream ─────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {loading ? (
          <div className="py-32 text-center">
            <div className="w-10 h-10 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs text-stone-500 font-mono uppercase tracking-widest">
              Katalog Hazırlanıyor...
            </p>
          </div>
        ) : categoryGroups.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto">
            <h3 className="text-xl font-serif text-stone-900 mb-2">Aramanızla Eşleşen Ürün Bulunamadı</h3>
            <p className="text-sm text-stone-500 mb-6">
              Lütfen farklı bir anahtar kelime deneyin veya filtreyi temizleyin.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
            >
              Tüm Ürünleri Göster
            </button>
          </div>
        ) : (
          categoryGroups.map((group, idx) => (
            <PresentationCategorySection
              key={group.category.id}
              category={group.category}
              products={group.products}
              index={idx}
              onOpenDetail={(p) => setActiveModalProduct(p)}
            />
          ))
        )}
      </main>

      {/* ── 4. Bottom Presentation Footer Callout ──────────────────────────── */}
      <section className="border-t border-stone-200/80 bg-stone-100/70 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-3">
            Özel Fiyat Teklifi ve Numune Talebi
          </h3>
          <p className="text-stone-600 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            İşletmenize özel toptan fiyat listesi, reçete danışmanlığı ve ürün numuneleri için
            satış ekibimizle doğrudan iletişime geçebilirsiniz.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/905324546440?text=Merhaba,%20Özel%20Sunum%20Kataloğunuzdaki%20ürünler%20için%20fiyat%20teklifi%20ve%20numune%20almak%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <MessageCircle size={17} />
              <span>WhatsApp ile Hızlı Teklif Al</span>
            </a>
            <Link
              href="/iletisim"
              className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm transition-all"
            >
              İletişim Formu
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. Presentation Detail Modal ───────────────────────────────────── */}
      <PresentationDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </div>
  );
}
