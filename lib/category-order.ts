import type { Category } from "./types";

/**
 * Standard fixed category order requested by business requirements:
 * 1. Pastalar
 * 2. Waffle Malzemeleri
 * 3. Kruvasan
 * 4. Şuruplar
 * 5. Bar Soslar
 * 6. Püreler
 * 7. Kasa Önü Ürünler
 * 8. Kremalar
 */
export const TARGET_CATEGORY_ORDER = [
  { key: "pastalar", slugs: ["pastalar", "donuk-pasta", "taze-butik-pastalar"], nameMatch: "pasta" },
  { key: "waffle-malzemeleri", slugs: ["waffle-malzemeleri"], nameMatch: "waffle" },
  { key: "kruvasan", slugs: ["kruvasan"], nameMatch: "kruvasan" },
  { key: "suruplar", slugs: ["suruplar"], nameMatch: "şurup" },
  { key: "bar-sos", slugs: ["bar-sos"], nameMatch: "bar sos" },
  { key: "pureler", slugs: ["pureler"], nameMatch: "püre" },
  { key: "kasa-onu-urunler", slugs: ["kasa-onu-urunler"], nameMatch: "kasa önü" },
  { key: "kremali-urunler", slugs: ["kremali-urunler"], nameMatch: "krema" },
];

/**
 * Returns the sort index for a given category based on standard business order.
 */
export function getCategoryOrderIndex(cat: { slug?: string; name?: string }): number {
  const slug = (cat.slug || "").toLowerCase().trim();
  const name = (cat.name || "").toLowerCase().trim();

  for (let i = 0; i < TARGET_CATEGORY_ORDER.length; i++) {
    const target = TARGET_CATEGORY_ORDER[i];
    if (target.slugs.some((s) => slug === s || slug.includes(s))) {
      return i;
    }
    if (name.includes(target.nameMatch)) {
      return i;
    }
  }

  return 999;
}

/**
 * Sorts any list of categories according to the official standard order.
 */
export function sortCategoriesByStandardOrder<T extends { slug?: string; name?: string }>(
  categories: T[]
): T[] {
  return [...categories].sort((a, b) => {
    const idxA = getCategoryOrderIndex(a);
    const idxB = getCategoryOrderIndex(b);
    if (idxA !== idxB) return idxA - idxB;
    return (a.name || "").localeCompare(b.name || "", "tr");
  });
}
