"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  MessageCircle,
  FileDown,
  ChevronsUpDown,
  Search,
  X,
  Printer,
  Layers,
} from "lucide-react";
import toast from "react-hot-toast";

import PresentationCategoryAccordion from "@/components/presentation/PresentationCategoryAccordion";
import PresentationDetailModal from "@/components/presentation/PresentationDetailModal";
import {
  fetchPresentationCategories,
  fetchPresentationProducts,
  groupProductsByCategory,
  type PresentationProduct,
} from "@/lib/presentation-catalog-service";
import { downloadVectorCatalogPDF } from "@/lib/pdf-generator";
import type { Category } from "@/lib/types";

export default function SunumKataloguPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<PresentationProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openCategoryIds, setOpenCategoryIds] = useState<Set<string>>(new Set());
  const [activeModalProduct, setActiveModalProduct] = useState<PresentationProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // Veri yükleme
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

        // İlk kategoriyi varsayılan olarak açık getir
        if (cats.length > 0) {
          const firstId = cats[0].slug || cats[0].id;
          setOpenCategoryIds(new Set([firstId]));
        }
      } catch (err) {
        console.error("Sunum kataloğu veri yükleme hatası:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Arama filtresi
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

  // Kategori grupları
  const categoryGroups = useMemo(() => {
    return groupProductsByCategory(categories, filteredProducts);
  }, [categories, filteredProducts]);

  // Arama yapıldığında aramayla eşleşen tüm kategorileri otomatik aç
  useEffect(() => {
    if (searchQuery.trim()) {
      const allIds = new Set(categoryGroups.map((g) => g.category.slug || g.category.id));
      setOpenCategoryIds(allIds);
    }
  }, [searchQuery, categoryGroups]);

  // Tekil kategori çekmece toggle
  const toggleCategory = (id: string) => {
    setOpenCategoryIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Tümünü Aç / Kapat toggle
  const areAllOpen = categoryGroups.length > 0 && openCategoryIds.size === categoryGroups.length;

  const toggleAll = () => {
    if (areAllOpen) {
      setOpenCategoryIds(new Set());
    } else {
      const allIds = new Set(categoryGroups.map((g) => g.category.slug || g.category.id));
      setOpenCategoryIds(allIds);
    }
  };

  // Gerçek Vektörel PDF İndirme Fonksiyonu (Ekran görüntüsü içermez)
  const handleExportPDF = async () => {
    setIsExportingPdf(true);
    const toastId = toast.loading("Vektörel PDF belgesi oluşturuluyor...");
    try {
      await downloadVectorCatalogPDF(
        categoryGroups,
        `Yirmikirbes-Ozel-Sunum-Katalogu-${new Date().toISOString().slice(0, 10)}.pdf`
      );
      toast.success("Vektörel PDF başarıyla indirildi!", { id: toastId });
    } catch (err: any) {
      console.error("Vektörel PDF hatası:", err);
      toast.error("PDF oluşturulurken bir sorun oluştu: " + (err?.message || "Lütfen tekrar deneyin."), { id: toastId });
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-stone-900 selection:text-white font-sans">
      {/* ── 1. Hero Presentation Showcase ──────────────────────────────────── */}
      <header className="pt-14 pb-10 sm:pt-18 sm:pb-14 border-b border-stone-200/80 bg-gradient-to-b from-stone-100/70 to-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-100 text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
                <Sparkles size={12} className="text-amber-400" />
                <span>Özel Müşteri Sunum Kataloğu</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight leading-[1.15]">
                Zanaatkar Tatlar & Profesyonel Çözümler
              </h1>

              <p className="text-sm sm:text-base text-stone-600 mt-3 font-sans leading-relaxed">
                İşletmenizin menüsüne prestij katacak; barista şurupları, meyve püreleri, waffle çikolataları
                ve donuk butik pastalardan oluşan seçkin koleksiyonumuz.
              </p>

              <div className="flex items-center gap-4 mt-5 text-xs text-stone-500 font-mono">
                <span>{categoryGroups.length} Kategori</span>
                <span>•</span>
                <span>{products.length} Seçkin Ürün</span>
                <span>•</span>
                <span className="text-amber-800 font-semibold">Toptan Horeca Tedariki</span>
              </div>
            </div>

            {/* Sağ: PDF İndir & Aksiyon Alanı */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                type="button"
                onClick={handleExportPDF}
                disabled={isExportingPdf}
                className="px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-stone-900/10 cursor-pointer"
              >
                {isExportingPdf ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>PDF Hazırlanıyor...</span>
                  </>
                ) : (
                  <>
                    <FileDown size={17} className="text-amber-400" />
                    <span>Kataloğu PDF İndir</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleAll}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronsUpDown size={14} />
                  <span>{areAllOpen ? "Tümünü Kapat" : "Tümünü Genişlet"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="p-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
                  title="Doğrudan Yazdır / PDF Kaydet"
                >
                  <Printer size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. Sticky Kontrol & Arama Çubuğu ───────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Kategori Hızlı Zıplama Butonları */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth flex-1 py-0.5">
              <button
                type="button"
                onClick={toggleAll}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ChevronsUpDown size={12} />
                <span>{areAllOpen ? "Tümünü Daralt" : "Tümünü Aç"}</span>
              </button>

              {categoryGroups.map((g) => {
                const id = g.category.slug || g.category.id;
                const isOpen = openCategoryIds.has(id);
                return (
                  <button
                    key={g.category.id}
                    type="button"
                    onClick={() => {
                      if (!isOpen) toggleCategory(id);
                      const el = document.getElementById(`section-${id}`);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                      isOpen
                        ? "bg-amber-100 text-amber-900 border border-amber-300 font-semibold"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900"
                    }`}
                  >
                    {g.category.icon && <span className="text-xs">{g.category.icon}</span>}
                    <span>{g.category.name}</span>
                    <span className="text-[10px] opacity-60 font-mono">({g.products.length})</span>
                  </button>
                );
              })}
            </div>

            {/* Arama Kutusu */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Katalogda ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-stone-50 border border-stone-200 rounded-full text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Resimli Kategori Kartları ve Çekmece Akışı ──────────────────── */}
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
              className="px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Tüm Ürünleri Göster
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {categoryGroups.map((group, idx) => {
              const id = group.category.slug || group.category.id;
              const isOpen = openCategoryIds.has(id);
              return (
                <PresentationCategoryAccordion
                  key={group.category.id}
                  category={group.category}
                  products={group.products}
                  index={idx}
                  isOpen={isOpen}
                  onToggle={() => toggleCategory(id)}
                  onOpenDetail={(p) => setActiveModalProduct(p)}
                />
              );
            })}
          </div>
        )}
      </main>

      {/* ── 4. Alt Bilgi & İletişim Çağrısı ─────────────────────────────────── */}
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
              className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <MessageCircle size={17} />
              <span>WhatsApp ile Hızlı Teklif Al</span>
            </a>
            <button
              type="button"
              onClick={handleExportPDF}
              disabled={isExportingPdf}
              className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileDown size={16} />
              <span>Kataloğu PDF İndir</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 5. Tam Ekran Sunum Detay Modalı ────────────────────────────────── */}
      <PresentationDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </div>
  );
}
