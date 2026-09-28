/**
 * Merkezi Kategori Sıralama Modülü
 *
 * Projenin TÜM noktalarında geçerli olan kesin kategori sıralamasını yönetir.
 * Sıralama (1-9):
 *  1. Pastalar
 *  2. Waffle Malzemeleri
 *  3. Kruvasan
 *  4. Kremalı Ürünler & Pastacılık
 *  5. Şurup
 *  6. Bar Sos
 *  7. Püre
 *  8. Kasa Önü Malzemeler
 *  9. Kremalar
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

  // 2. Waffle Malzemeleri
  if (
    normSlug.includes("waffle") ||
    normName.includes("waffle") ||
    id === "cat-3"
  ) {
    return 2.0;
  }

  // 3. Kruvasan
  if (
    normSlug.includes("kruvasan") ||
    normSlug.includes("kuruvasan") ||
    normName.includes("kruvasan") ||
    normName.includes("kuruvasan") ||
    id === "cat-kruvasan"
  ) {
    return 3.0;
  }

  // 4. Kremalı Ürünler & Pastacılık
  if (
    normSlug.includes("kremali") ||
    normName.includes("kremali") ||
    id === "cat-6"
  ) {
    return 4.0;
  }

  // 5. Şurup (Şuruplar & Kokteyller)
  if (
    normSlug === "suruplar" ||
    normSlug === "surup" ||
    normName === "suruplar" ||
    normName === "surup" ||
    id === "cat-2"
  ) {
    return 5.0;
  }
  if (
    normSlug.includes("kokteyl") ||
    normName.includes("kokteyl") ||
    cat.parentId === "cat-2" ||
    cat.parentId === "suruplar"
  ) {
    return 5.1;
  }
  if (normSlug.includes("surup") || normName.includes("surup")) {
    return 5.2;
  }

  // 6. Bar Sos
  if (
    normSlug.includes("barsos") ||
    normName.includes("barsos") ||
    normSlug.includes("tatlisos") ||
    normName.includes("tatlisos") ||
    id === "cat-4"
  ) {
    return 6.0;
  }

  // 7. Püre
  if (
    normSlug.includes("pure") ||
    normName.includes("pure") ||
    id === "cat-1"
  ) {
    return 7.0;
  }

  // 8. Kasa Önü Malzemeler
  if (
    normSlug.includes("kasaonu") ||
    normName.includes("kasaonu") ||
    id === "cat-kasa-onu"
  ) {
    return 8.0;
  }

  // 9. Kremalar (Kremalı Ürünlerden farklı olarak sürülebilir & dolgu kremaları)
  if (
    normSlug.includes("kremalar") ||
    normName.includes("kremalar") ||
    normSlug === "krema" ||
    normName === "krema" ||
    id === "cat-kremalar"
  ) {
    return 9.0;
  }

  // Ekipmanlar — opsiyonel / sona gelir
  if (
    normSlug.includes("ekipman") ||
    normName.includes("ekipman") ||
    id === "cat-ekipmanlar"
  ) {
    return 10.0;
  }

  return 9999;
}

/**
 * Verilen kategori dizisini kesin sıraya göre sıralar.
 * Orijinal diziyi bozmaz (immutable).
 */
export function sortCategories<T extends Partial<Category>>(categories: T[]): T[] {
  return [...categories].sort((a, b) => {
    const rankA = getCategoryRank(a);
    const rankB = getCategoryRank(b);
    if (rankA !== rankB) {
      return rankA - rankB;
    }
    return (a.order ?? 0) - (b.order ?? 0);
  });
}

/**
 * Yalnızca ana (parent olmayan) kategorileri kesin 1-9 sıralamasına göre döndürür.
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
 */
export function getProductCategoryRank(p: {
  categorySlug?: string;
  categoryId?: string;
  categoryName?: string;
}): number {
  return getCategoryRank({
    slug: p.categorySlug,
    id: p.categoryId,
    name: p.categoryName,
  });
}

/**
 * Ürün dizisini öncelikle 1-9 kategori sırasına,
 * ardından kategori içindeki kendi 'order' değerine ve adına göre sıralar.
 */
export function sortProductsByCategoryOrder<
  T extends {
    categorySlug?: string;
    categoryId?: string;
    categoryName?: string;
    order?: number;
    name?: string;
  }
>(products: T[]): T[] {
  return [...products].sort((a, b) => {
    const rankA = getProductCategoryRank(a);
    const rankB = getProductCategoryRank(b);
    if (rankA !== rankB) {
      return rankA - rankB;
    }
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return (a.name || "").localeCompare(b.name || "", "tr");
  });
}

