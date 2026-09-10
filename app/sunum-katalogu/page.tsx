"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  MessageCircle,
  FileDown,
  Search,
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Layers,
  CheckCircle2,
  Printer,
} from "lucide-react";
import toast from "react-hot-toast";

import PresentationCategoryCard from "@/components/presentation/PresentationCategoryCard";
import PresentationProductCard from "@/components/presentation/PresentationProductCard";
import PresentationDetailModal from "@/components/presentation/PresentationDetailModal";
import {
  fetchPresentationCategories,
  fetchPresentationProducts,
  groupProductsByCategory,
  type PresentationProduct,
  type CategoryProductGroup,
} from "@/lib/presentation-catalog-service";
import { downloadVectorCatalogPDF } from "@/lib/pdf-generator";
import type { Category } from "@/lib/types";

const CATEGORY_BG_MAP: Record<string, string> = {
  "suruplar": "/resimler/katalog/suruplar.jpg",
  "pureler": "/resimler/katalog/pureler.jpg",
  "waffle-malzemeleri": "/resimler/katalog/waffle.jpg",
  "waffle": "/resimler/katalog/waffle.jpg",
  "kokteyller": "/resimler/katalog/kokteyller.jpg",
  "bar-sos": "/resimler/katalog/bar-sos.jpg",
  "pastalar": "/resimler/katalog/taze-pastalar.jpg",
  "taze-butik-pastalar": "/resimler/katalog/taze-pastalar.jpg",
  "donuk-pasta": "/resimler/katalog/donuk-pastalar.jpg",
  "kremali-urunler": "/resimler/katalog/kremali.jpg",
  "kruvasan": "/resimler/kategoriler/kruvasan.jpg",
  "kasa-onu-urunler": "/resimler/kategoriler/kasa-onu-urunler.jpg",
  "ekipmanlar": "/resimler/kategoriler/ekipmanlar.jpg",
};

function SunumKataloguInner() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategori") || null;

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<PresentationProduct[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
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
      } catch (err) {
        console.error("Sunum kataloğu veri yükleme hatası:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Tarayıcı geri/ileri tuşlarını (popstate) dinle
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const kat = params.get("kategori");
      setActiveCategoryId(kat || null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Kategori grupları
  const categoryGroups = useMemo(() => {
    return groupProductsByCategory(categories, products);
  }, [categories, products]);

  // Aktif seçili kategori grubu
  const activeGroup = useMemo(() => {
    if (!activeCategoryId) return null;
    return (
      categoryGroups.find(
        (g) =>
          (g.category.slug && g.category.slug.toLowerCase() === activeCategoryId.toLowerCase()) ||
          g.category.id === activeCategoryId
      ) || null
    );
  }, [categoryGroups, activeCategoryId]);

  // Kategori içine girme
  const handleSelectCategory = (catIdOrSlug: string) => {
    setActiveCategoryId(catIdOrSlug);
    setSearchQuery("");
    const url = new URL(window.location.href);
    url.searchParams.set("kategori", catIdOrSlug);
    window.history.pushState({}, "", url.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Ana kategori listesine geri dönme
  const handleBackToAllCategories = () => {
    setActiveCategoryId(null);
    setSearchQuery("");
    const url = new URL(window.location.href);
    url.searchParams.delete("kategori");
    window.history.pushState({}, "", url.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Aktif kategorideki filtrelenmiş ürünler
  const displayedProducts = useMemo(() => {
    if (!activeGroup) return [];
    if (!searchQuery.trim()) return activeGroup.products;
    const q = searchQuery.toLowerCase().trim();
    return activeGroup.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.code && p.code.toLowerCase().includes(q))
    );
  }, [activeGroup, searchQuery]);

  // Global arama (Tüm Kategoriler görünümünde arama yapıldığında)
  const globalFilteredProducts = useMemo(() => {
    if (!searchQuery.trim() || activeGroup) return [];
    const q = searchQuery.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
        (p.code && p.code.toLowerCase().includes(q))
    );
  }, [searchQuery, activeGroup, products]);

  // Önceki ve Sonraki Kategori İndeksleri
  const activeIndex = categoryGroups.findIndex((g) => g === activeGroup);
  const prevCategory = activeIndex > 0 ? categoryGroups[activeIndex - 1] : null;
  const nextCategory = activeIndex < categoryGroups.length - 1 ? categoryGroups[activeIndex + 1] : null;

  // Gerçek Vektörel PDF İndirme Fonksiyonu (@react-pdf/renderer)
  const handleExportPDF = async (targetGroup?: CategoryProductGroup | null) => {
    setIsExportingPdf(true);
    const isSingle = !!targetGroup;
    const toastId = toast.loading(
      isSingle
        ? `"${targetGroup.category.name}" için vektörel PDF hazırlanıyor...`
        : "Tüm katalog için dergi kalitesinde vektörel PDF hazırlanıyor..."
    );

    try {
      const groupsToExport = targetGroup ? [targetGroup] : categoryGroups;
      const fileName = targetGroup
        ? `Yirmikirbes-${targetGroup.category.slug || "kategori"}-Katalogu-${new Date().toISOString().slice(0, 10)}.pdf`
        : `Yirmikirbes-Ozel-Sunum-Katalogu-${new Date().toISOString().slice(0, 10)}.pdf`;

      await downloadVectorCatalogPDF(groupsToExport, fileName);
      toast.success("Vektörel PDF başarıyla indirildi!", { id: toastId });
    } catch (err: any) {
      console.error("Vektörel PDF hatası:", err);
      toast.error("PDF oluşturulurken bir sorun oluştu: " + (err?.message || "Lütfen tekrar deneyin."), {
        id: toastId,
      });
    } finally {
      setIsExportingPdf(false);
    }
  };

  const activeBgImage = activeGroup
    ? CATEGORY_BG_MAP[activeGroup.category.slug || ""] ||
      CATEGORY_BG_MAP[activeGroup.category.id || ""] ||
      activeGroup.category.imageUrl ||
      "/resimler/katalog/kapak.jpg"
    : "/resimler/katalog/kapak.jpg";

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-stone-900 selection:text-white font-sans pb-16">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ── 1. GÖRÜNÜM: KATEGORİ DETAY SAYFASI (Bir kategori seçildiğinde) ─── */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeGroup ? (
        <div>
          {/* ── Üst Yapışkan Navigasyon Barı (Geri Dön & Kategori Seçici) ─── */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/90 py-3.5 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
                {/* Sol: Estetik Geri Dön Butonu & Breadcrumb */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleBackToAllCategories}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-900 text-stone-800 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-2xs border border-stone-200 hover:border-stone-900 cursor-pointer shrink-0"
                    title="Ana Kategori Listesine Geri Dön"
                  >
                    <ArrowLeft size={15} />
                    <span>Tüm Kategoriler</span>
                  </button>

                  <div className="h-4 w-px bg-stone-300 hidden sm:block" />

                  <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-stone-500">
                    <span>Sunum Kataloğu</span>
                    <span>/</span>
                    <span className="text-stone-900 font-semibold">{activeGroup.category.name}</span>
                  </div>
                </div>

                {/* Sağ: Kategori İçi Arama ve PDF Butonları */}
                <div className="flex items-center gap-2.5">
                  {/* Bu Kategoride Ara */}
                  <div className="relative flex-1 sm:w-56">
                    <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      placeholder={`Bu kategoride ara (${activeGroup.products.length})...`}
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

                  {/* Kategori PDF İndir */}
                  <button
                    type="button"
                    onClick={() => handleExportPDF(activeGroup)}
                    disabled={isExportingPdf}
                    className="shrink-0 px-4 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                    title="Bu kategoriyi A4 vektörel PDF olarak indir"
                  >
                    {isExportingPdf ? (
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FileDown size={14} className="text-amber-400" />
                    )}
                    <span className="hidden sm:inline">Kategoriyi PDF İndir</span>
                    <span className="sm:hidden">PDF</span>
                  </button>
                </div>
              </div>

              {/* Hızlı Kategori Değiştirme Hapları (Pills) */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth pt-3 mt-1 border-t border-stone-100">
                <button
                  type="button"
                  onClick={handleBackToAllCategories}
                  className="shrink-0 px-3 py-1 rounded-full text-2xs font-medium bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  ← Kategori Vitrini
                </button>

                {categoryGroups.map((g) => {
                  const id = g.category.slug || g.category.id;
                  const isCurrent = g === activeGroup;
                  return (
                    <button
                      key={g.category.id}
                      type="button"
                      onClick={() => handleSelectCategory(id)}
                      className={`shrink-0 flex items-center gap-1 px-3 py-1 rounded-full text-2xs font-medium tracking-wide transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-amber-100 text-amber-950 border border-amber-300/80 font-bold shadow-2xs"
                          : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                      }`}
                    >
                      {g.category.icon && <span>{g.category.icon}</span>}
                      <span>{g.category.name}</span>
                      <span className="opacity-60 font-mono">({g.products.length})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Kategori Lüks Hero Başlığı ─── */}
          <div className="relative overflow-hidden bg-stone-900 border-b border-stone-800">
            {/* Arka Plan Fotoğrafı & Gradyan */}
            <div className="absolute inset-0">
              <Image
                src={activeBgImage}
                alt={activeGroup.category.name}
                fill
                sizes="100vw"
                priority
                className="object-cover object-center opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-stone-900/40" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  {/* Bölüm Numarası & Ürün Sayısı */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold tracking-widest uppercase">
                      <Sparkles size={11} />
                      <span>Koleksiyon {String(activeIndex + 1).padStart(2, "0")}</span>
                    </span>
                    <span className="text-stone-300 text-xs font-mono">
                      {activeGroup.products.length} Seçkin Ürün
                    </span>
                  </div>

                  {/* Kategori Başlığı */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight flex items-center gap-3.5">
                    {activeGroup.category.icon && (
                      <span className="text-3xl sm:text-4xl">{activeGroup.category.icon}</span>
                    )}
                    <span>{activeGroup.category.name}</span>
                  </h1>

                  {/* Kategori Açıklaması */}
                  {activeGroup.category.description && (
                    <p className="text-sm sm:text-base text-stone-200/90 mt-3 font-sans leading-relaxed">
                      {activeGroup.category.description}
                    </p>
                  )}
                </div>

                {/* Sağ Butonlar: Tüm Kataloğu PDF İndir & WhatsApp */}
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href={`https://wa.me/905324546440?text=${encodeURIComponent(
                      `Merhaba, Özel Sunum Kataloğunuzdaki "${activeGroup.category.name}" kategorisi için toptan fiyat ve numune listesi rica ediyorum.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp Numune Talebi</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleExportPDF(null)}
                    disabled={isExportingPdf}
                    className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <FileDown size={15} className="text-amber-400" />
                    <span>Tüm Kataloğu İndir</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Kategori Ürün Izgarası (Grid) ─── */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            {displayedProducts.length === 0 ? (
              <div className="py-24 text-center max-w-md mx-auto bg-white rounded-3xl border border-stone-200 p-8 shadow-xs">
                <h3 className="text-xl font-serif text-stone-900 mb-2">Bu Kategoride Ürün Bulunamadı</h3>
                <p className="text-sm text-stone-500 mb-6">
                  {searchQuery ? `"${searchQuery}" aramasıyla eşleşen bir ürün yok.` : "Şu anda bu kategoride listelenmiş ürün bulunmuyor."}
                </p>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    Aramayı Temizle
                  </button>
                )}
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-200">
                  <div className="flex items-center gap-2 text-xs font-serif text-stone-700">
                    <Layers size={15} className="text-amber-700" />
                    <span className="font-semibold text-stone-900 text-sm">
                      {activeGroup.category.name} Ürün Listesi
                    </span>
                  </div>
                  <span className="text-xs text-stone-500 font-mono">
                    {displayedProducts.length} Ürün Gösteriliyor
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {displayedProducts.map((product, pIdx) => (
                    <PresentationProductCard
                      key={product.id}
                      product={product}
                      index={pIdx}
                      onOpenDetail={(p) => setActiveModalProduct(p)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Alt Sayfa Navigasyonu: Önceki / Sonraki Kategori ve Geri Dön ─── */}
            <div className="mt-16 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              {prevCategory ? (
                <button
                  type="button"
                  onClick={() => handleSelectCategory(prevCategory.category.slug || prevCategory.category.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                >
                  <ChevronLeft size={16} />
                  <span>Önceki: {prevCategory.category.name}</span>
                </button>
              ) : (
                <div className="hidden sm:block" />
              )}

              <button
                type="button"
                onClick={handleBackToAllCategories}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-md"
              >
                <ArrowLeft size={15} />
                <span>Tüm Kategorilere Geri Dön</span>
              </button>

              {nextCategory ? (
                <button
                  type="button"
                  onClick={() => handleSelectCategory(nextCategory.category.slug || nextCategory.category.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                >
                  <span>Sonraki: {nextCategory.category.name}</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <div className="hidden sm:block" />
              )}
            </div>
          </main>
        </div>
      ) : (
        /* ─────────────────────────────────────────────────────────────────── */
        /* ── 2. GÖRÜNÜM: TÜM KATEGORİLER VİTRİNİ (Ana Liste) ───────────────── */
        /* ─────────────────────────────────────────────────────────────────── */
        <div>
          {/* ── Hero Presentation Showcase ─── */}
          <header className="pt-14 pb-12 sm:pt-18 sm:pb-16 border-b border-stone-200/80 bg-gradient-to-b from-stone-100/80 to-[#FAF9F6]">
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

                  <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-stone-500 font-mono">
                    <span>{categoryGroups.length} Kategori</span>
                    <span>•</span>
                    <span>{products.length} Seçkin Ürün</span>
                    <span>•</span>
                    <span className="text-amber-800 font-semibold">Toptan Horeca Tedariki</span>
                  </div>
                </div>

                {/* Sağ: Vektörel PDF İndir & Hızlı Butonlar */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleExportPDF(null)}
                    disabled={isExportingPdf}
                    className="px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-stone-900/10 cursor-pointer disabled:opacity-50"
                  >
                    {isExportingPdf ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Vektörel PDF Hazırlanıyor...</span>
                      </>
                    ) : (
                      <>
                        <FileDown size={17} className="text-amber-400" />
                        <span>Kataloğu PDF İndir (Vektörel & Resimli)</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://wa.me/905324546440?text=Merhaba,%20Özel%20Sunum%20Kataloğunuz%20hakkında%20bilgi%20ve%20teklif%20almak%20istiyorum."
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageCircle size={14} className="text-[#25D366]" />
                      <span>WhatsApp İletişim</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="p-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
                      title="Yazdır"
                    >
                      <Printer size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* ── Sticky Arama ve Kategori Hızlı Zıplama ─── */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80 py-3 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Kategori Butonları */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth flex-1 py-0.5">
                  <span className="text-2xs font-mono uppercase text-stone-400 font-semibold mr-1 shrink-0">
                    Koleksiyonlar:
                  </span>
                  {categoryGroups.map((g) => {
                    const id = g.category.slug || g.category.id;
                    return (
                      <button
                        key={g.category.id}
                        type="button"
                        onClick={() => handleSelectCategory(id)}
                        className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide bg-stone-100 text-stone-700 hover:bg-stone-900 hover:text-white transition-all cursor-pointer"
                      >
                        {g.category.icon && <span>{g.category.icon}</span>}
                        <span>{g.category.name}</span>
                        <span className="text-2xs opacity-60 font-mono">({g.products.length})</span>
                      </button>
                    );
                  })}
                </div>

                {/* Arama Kutusu */}
                <div className="relative w-full sm:w-64 shrink-0">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Katalogdaki tüm ürünlerde ara..."
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

          {/* ── Ana Kategori Vitrini Izgarası ─── */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            {loading ? (
              <div className="py-32 text-center">
                <div className="w-10 h-10 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-xs text-stone-500 font-mono uppercase tracking-widest">
                  Katalog Hazırlanıyor...
                </p>
              </div>
            ) : searchQuery.trim() ? (
              /* Arama yapıldığında ürün sonuçları */
              <div>
                <div className="mb-6 flex items-center justify-between pb-3 border-b border-stone-200">
                  <h2 className="text-xl font-serif font-bold text-stone-900">
                    "{searchQuery}" için Arama Sonuçları
                  </h2>
                  <span className="text-xs text-stone-500 font-mono">
                    {globalFilteredProducts.length} Ürün Bulundu
                  </span>
                </div>

                {globalFilteredProducts.length === 0 ? (
                  <div className="py-24 text-center max-w-md mx-auto">
                    <h3 className="text-xl font-serif text-stone-900 mb-2">Eşleşen Ürün Bulunamadı</h3>
                    <p className="text-sm text-stone-500 mb-6">
                      Lütfen farklı bir anahtar kelime deneyin veya kategori vitrinine göz atın.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                    >
                      Aramayı Temizle
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {globalFilteredProducts.map((p, idx) => (
                      <PresentationProductCard
                        key={p.id}
                        product={p}
                        index={idx}
                        onOpenDetail={(product) => setActiveModalProduct(product)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Normal Vitrin: Kategori Kartları Izgarası (Accordion DEĞİL, tıklanınca kategori içine girer) */
              <div>
                <div className="mb-8">
                  <span className="text-xs font-mono font-bold tracking-widest text-amber-800 uppercase block mb-1">
                    ÖZEL ÜRÜN REHBERİ
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                    Kategori Koleksiyonları
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    İncelemek istediğiniz kategori kartına tıklayarak doğrudan ilgili koleksiyonun detay sayfasına ve ürün ızgarasına ulaşabilirsiniz.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {categoryGroups.map((group, idx) => {
                    const id = group.category.slug || group.category.id;
                    return (
                      <PresentationCategoryCard
                        key={group.category.id}
                        category={group.category}
                        productCount={group.products.length}
                        index={idx}
                        onClick={() => handleSelectCategory(id)}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ── 3. Alt Bilgi & İletişim Çağrısı ─────────────────────────────────── */}
      <section className="border-t border-stone-200/80 bg-stone-100/70 py-16 mt-12">
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
              onClick={() => handleExportPDF(null)}
              disabled={isExportingPdf}
              className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <FileDown size={16} />
              <span>Kataloğu PDF İndir (Vektörel)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 4. Tam Ekran Sunum Detay Modalı ────────────────────────────────── */}
      <PresentationDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </div>
  );
}

export default function SunumKataloguPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
        </div>
      }
    >
      <SunumKataloguInner />
    </Suspense>
  );
}
