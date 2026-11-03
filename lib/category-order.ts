/**
 * Merkezi Kategori Sıralama Modülü
 *
 * Marka odaklı kategori mimarisi:
 *  1. Pastalar (Butik Pastalar, Donuk Pastalar, Cup Tatlılar, Organizasyon)
 *  2. Kruvasan
 *  3. DaVinci Gourmet (Şuruplar, Bar Soslar, Püreler)
 *  4. Caffè NONNO (Şuruplar, Bar Soslar, Püreler)
 *  5. CALLEI (Waffle Çikolataları, Waffle Süslemeleri)
 *  6. EASY MIX (Kokteyller & Premiksler)
 *  7. Krater (Meyve Püreleri)
 *  8. Monte Cristo (Barista Şurupları)
 *  9. Kasa Önü Ürünler
 *  10. Kremalı Ürünler & Pastacılık
 *  11. Kremalar
 */

import type { Category } from "@/lib/types";

/**
 * Türkçe karakterleri ASCII'ye dönüştürüp temizler
 */
export function normalizeCategoryText(str?: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Her kategori için evrensel sıralama katsayısı döndürür.
 * Düşük sayı daha önce gelir.
 */
export function getCategoryRank(cat: Partial<Category> | null | undefined): number {
  if (!cat) return 9999;

  const slug = (cat.slug || "").toLowerCase().trim();
  const id = (cat.id || "").toLowerCase().trim();
  const normName = normalizeCategoryText(cat.name);
  const normSlug = normalizeCategoryText(slug);

  // 1. Pastalar (Ana ve alt kategoriler)
  if (
    slug === "pastalar" ||
    id === "cat-8" ||
    (normName === "pastalar" && !cat.parentId)
  ) {
    return 1.0;
  }
  if (normSlug.includes("butikpasta") || normName.includes("butikpasta") || normSlug.includes("tazepasta")) {
    return 1.1;
  }
  if (normSlug.includes("donukpasta") || normName.includes("donukpasta") || normSlug.includes("donuk")) {
    return 1.2;
  }
  if (normSlug.includes("cup") || normName.includes("cup")) {
    return 1.3;
  }
  if (normSlug.includes("organizasyon") || normName.includes("organizasyon")) {
    return 1.4;
  }
  if (normSlug.includes("kek") || normSlug.includes("cookie") || normSlug.includes("kurabiye")) {
    return 1.5;
  }
  if (cat.parentId === "cat-8" || cat.parentId === "pastalar") {
    return 1.6;
  }

  // 2. Kruvasan
  if (
    normSlug.includes("kruvasan") ||
    normSlug.includes("kuruvasan") ||
    normName.includes("kruvasan") ||
    normName.includes("kuruvasan") ||
    id === "cat-kruvasan"
  ) {
    return 2.0;
  }

  // 3. DaVinci Gourmet (Ana ve alt kategoriler)
  if (
    (normSlug.includes("davinci") || normName.includes("davinci") || id === "cat-brand-davinci") &&
    !cat.parentId
  ) {
    return 3.0;
  }
  if (
    (cat.parentId === "cat-brand-davinci" && (normSlug.includes("surup") || normName.includes("surup"))) ||
    (normSlug.includes("davinci") && normSlug.includes("surup")) ||
    id === "cat-1792159145530" ||
    id === "cat-davinci-suruplar"
  ) {
    return 3.1;
  }
  if (
    (cat.parentId === "cat-brand-davinci" && (normSlug.includes("sos") || normName.includes("sos"))) ||
    (normSlug.includes("davinci") && normSlug.includes("sos")) ||
    id === "cat-1792159660497" ||
    id === "cat-davinci-bar-sos"
  ) {
    return 3.2;
  }
  if (
    (cat.parentId === "cat-brand-davinci" && (normSlug.includes("pure") || normName.includes("pure"))) ||
    (normSlug.includes("davinci") && normSlug.includes("pure")) ||
    id === "cat-1792159702988" ||
    id === "cat-davinci-pureler"
  ) {
    return 3.3;
  }
  if (cat.parentId === "cat-brand-davinci") {
    return 3.4;
  }

  // 4. Caffè NONNO (Ana ve alt kategoriler)
  if (
    (normSlug.includes("nonno") || normName.includes("nonno") || id === "cat-brand-nonno") &&
    !cat.parentId
  ) {
    return 4.0;
  }
  if (
    (cat.parentId === "cat-brand-nonno" && (normSlug.includes("surup") || normName.includes("surup"))) ||
    (normSlug.includes("nonno") && normSlug.includes("surup")) ||
    id === "cat-1792159460097" ||
    id === "cat-nonno-suruplar"
  ) {
    return 4.1;
  }
  if (
    (cat.parentId === "cat-brand-nonno" && (normSlug.includes("sos") || normName.includes("sos"))) ||
    (normSlug.includes("nonno") && normSlug.includes("sos")) ||
    id === "cat-caffe-nonno-bar-soslar" ||
    id === "cat-nonno-bar-sos"
  ) {
    return 4.2;
  }
  if (
    (cat.parentId === "cat-brand-nonno" && (normSlug.includes("pure") || normName.includes("pure"))) ||
    (normSlug.includes("nonno") && normSlug.includes("pure")) ||
    id === "cat-1792159899479" ||
    id === "cat-nonno-pureler"
  ) {
    return 4.3;
  }
  if (cat.parentId === "cat-brand-nonno") {
    return 4.4;
  }

  // 5. CALLEI (Ana ve alt kategoriler)
  if (
    (normSlug.includes("callei") || normName.includes("callei") || id === "cat-brand-callei") &&
    !cat.parentId
  ) {
    return 5.0;
  }
  if (
    (cat.parentId === "cat-brand-callei" && (normSlug.includes("cikolata") || normName.includes("cikolata"))) ||
    id === "cat-1790668749112"
  ) {
    return 5.1;
  }
  if (
    (cat.parentId === "cat-brand-callei" && (normSlug.includes("susle") || normName.includes("susle"))) ||
    id === "cat-1790668787142"
  ) {
    return 5.2;
  }
  if (
    cat.parentId === "cat-brand-callei" ||
    id === "cat-1790668777717" ||
    id === "cat-3" ||
    normSlug.includes("waffle") ||
    normName.includes("waffle")
  ) {
    return 5.3;
  }

  // 6. EASY MIX (Ana ve alt kategoriler)
  if (
    (normSlug.includes("easymix") || normName.includes("easymix") || id === "cat-brand-easymix") &&
    !cat.parentId
  ) {
    return 6.0;
  }
  if (
    cat.parentId === "cat-brand-easymix" ||
    normSlug.includes("kokteyl") ||
    normName.includes("kokteyl") ||
    id === "cat-7"
  ) {
    return 6.1;
  }

  // 7. Krater (Ana ve alt kategoriler)
  if (
    (normSlug.includes("krater") || normName.includes("krater") || id === "cat-brand-krater") &&
    !cat.parentId
  ) {
    return 7.0;
  }
  if (cat.parentId === "cat-brand-krater" || id === "cat-1792159793131") {
    return 7.1;
  }

  // 8. Monte Cristo (Ana ve alt kategoriler)
  if (
    (normSlug.includes("montecristo") || normName.includes("montecristo") || id === "cat-brand-montecristo") &&
    !cat.parentId
  ) {
    return 8.0;
  }
  if (cat.parentId === "cat-brand-montecristo" || id === "cat-1792159526675") {
    return 8.1;
  }

  // 9. Kasa Önü Malzemeler
  if (normSlug.includes("kasaonu") || normName.includes("kasaonu") || id === "cat-kasa-onu" || id === "cat-11") {
    return 9.0;
  }

  // 10. Kremalı Ürünler & Pastacılık
  if (normSlug.includes("kremali") || normName.includes("kremali") || id === "cat-6") {
    return 10.0;
  }

  // 11. Kremalar
  if (normSlug.includes("kremalar") || normName.includes("kremalar") || id === "cat-kremalar") {
    return 11.0;
  }

  // 12. Sandviç / Unlu Mamuller
  if (normSlug.includes("sandvic") || id === "cat-1792072881776") {
    return 12.0;
  }

  // Eski genel kategoriler (eğer arşivlenmişse arkaya at)
  if (normSlug === "suruplar" || id === "cat-2") return 30.0;
  if (normSlug === "barsos" || id === "cat-4") return 31.0;
  if (normSlug === "pureler" || id === "cat-1") return 32.0;

  return 9999;
}

/**
 * Verilen kategori dizisini kesin sıraya göre sıralar.
 * Orijinal diziyi bozmaz (immutable).
 */
export function sortCategories<T extends Partial<Category>>(categories: T[]): T[] {
  // Sort first so canonical categories have priority rank
  const sorted = [...categories].sort((a, b) => {
    const rankA = getCategoryRank(a);
    const rankB = getCategoryRank(b);
    if (rankA !== rankB) {
      return rankA - rankB;
    }
    return (a.order ?? 0) - (b.order ?? 0);
  });

  // Deduplicate by slug and id to prevent duplicate categories from appearing
  const seen = new Set<string>();
  const unique: T[] = [];

  for (const cat of sorted) {
    const slugKey = (cat.slug || "").toLowerCase().trim();
    const idKey = (cat.id || "").toLowerCase().trim();
    const key = slugKey || idKey;

    if (key) {
      if (!seen.has(key)) {
        seen.add(key);
        if (idKey) seen.add(idKey);
        unique.push(cat);
      }
    } else {
      unique.push(cat);
    }
  }

  return unique;
}

/**
 * Yalnızca ana (parent olmayan) kategorileri kesin sıralamasına göre döndürür.
 */
export function sortTopLevelCategories<T extends Partial<Category>>(categories: T[]): T[] {
  return sortCategories(categories.filter((c) => !c.parentId));
}

/**
 * Bir ana kategoriye ait alt kategorileri sıralar.
 */
export function sortChildCategories<T extends Partial<Category>>(
  categories: T[],
  parentId: string
): T[] {
  return sortCategories(categories.filter((c) => c.parentId === parentId));
}

/**
 * Bir ürünün kategori sıralama katsayısını döndürür.
 * Ürünün codeGroup veya name değerindeki marka bilgisini de kontrol eder.
 */
export function getProductCategoryRank(p: {
  categorySlug?: string;
  categoryId?: string;
  categoryName?: string;
  codeGroup?: string;
  name?: string;
}): number {
  const codeGroup = normalizeCategoryText(p.codeGroup);
  const name = normalizeCategoryText(p.name);
  const slug = (p.categorySlug || "").toLowerCase();
  const id = (p.categoryId || "").toLowerCase();

  // DaVinci Gourmet Products
  if (codeGroup.includes("davinci") || name.includes("davinci")) {
    if (slug.includes("surup") || id === "cat-1792159145530" || id === "cat-davinci-suruplar") return 3.1;
    if (slug.includes("sos") || id === "cat-1792159660497" || id === "cat-davinci-bar-sos" || id === "cat-4") return 3.2;
    if (slug.includes("pure") || id === "cat-1792159702988" || id === "cat-davinci-pureler" || id === "cat-1") return 3.3;
    return 3.0;
  }

  // Caffè NONNO Products
  if (codeGroup.includes("nonno") || name.includes("nonno")) {
    if (slug.includes("surup") || id === "cat-1792159460097" || id === "cat-nonno-suruplar") return 4.1;
    if (slug.includes("sos") || id === "cat-caffe-nonno-bar-soslar" || id === "cat-nonno-bar-sos" || id === "cat-4") return 4.2;
    if (slug.includes("pure") || id === "cat-1792159899479" || id === "cat-nonno-pureler" || id === "cat-1") return 4.3;
    return 4.0;
  }

  // CALLEI Products
  if (codeGroup.includes("callei") || name.includes("callei")) {
    if (slug.includes("susle") || id === "cat-1790668787142") return 5.2;
    return 5.1;
  }

  // EASY MIX Products
  if (codeGroup.includes("easymix") || name.includes("easymix") || id === "cat-7" || slug.includes("kokteyl")) {
    return 6.1;
  }

  // Krater Products
  if (codeGroup.includes("krater") || name.includes("krater") || id === "cat-1792159793131") {
    return 7.1;
  }

  // Monte Cristo Products
  if (codeGroup.includes("montecristo") || name.includes("montecristo") || id === "cat-1792159526675") {
    return 8.1;
  }

  return getCategoryRank({
    slug: p.categorySlug,
    id: p.categoryId,
    name: p.categoryName,
  });
}

/**
 * Ürün dizisini öncelikle kategori sırasına,
 * ardından kategori içinde ürünün kendi 'order' (katalog sıra) değerine göre sıralar.
 * Sıra numarası eşit veya belirtilmemişse alfabetik ürün adına göre ikincil sıralama yapar.
 */
export function sortProductsByCategoryOrder<
  T extends {
    categorySlug?: string;
    categoryId?: string;
    categoryName?: string;
    order?: number;
    name?: string;
    codeGroup?: string;
  }
>(products: T[]): T[] {
  return [...products].sort((a, b) => {
    const rankA = getProductCategoryRank(a);
    const rankB = getProductCategoryRank(b);
    if (rankA !== rankB) {
      return rankA - rankB;
    }
    const orderA = a.order ?? 9999;
    const orderB = b.order ?? 9999;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    const nameA = (a.name || "").trim();
    const nameB = (b.name || "").trim();
    return nameA.localeCompare(nameB, "tr", { sensitivity: "base" });
  });
}

/**
 * Ürün dizisini doğrudan alfabetik olarak (A-Z veya Z-A) sıralar.
 */
export function sortProductsAlphabetically<
  T extends {
    name?: string;
    order?: number;
  }
>(products: T[], direction: "asc" | "desc" = "asc"): T[] {
  return [...products].sort((a, b) => {
    const nameA = (a.name || "").trim();
    const nameB = (b.name || "").trim();
    const cmp = nameA.localeCompare(nameB, "tr", { sensitivity: "base" });
    if (cmp !== 0) {
      return direction === "asc" ? cmp : -cmp;
    }
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    return orderA - orderB;
  });
}
