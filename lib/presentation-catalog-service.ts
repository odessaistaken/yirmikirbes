/**
 * Özel Müşteri Sunum Kataloğu — Veri ve Entegrasyon Katmanı
 * 
 * Web sitesindeki mevcut "Ürün Kategorileri" ve "Ürünler" verisini
 * Firestore veya Mock veri kaynaklarından doğrudan çeker.
 * 
 * Veri Modeli:
 * id, imageUrl (görsel URL), name (ürün_ismi), price (fiyat), categoryId (kategori_id), description (tanıtım_metni)
 */

import { getActiveCategories, getProducts, updateProduct as firestoreUpdateProduct } from "@/lib/firestore-collections";
import { CATEGORIES as MOCK_CATEGORIES, PRODUCTS as MOCK_PRODUCTS } from "@/lib/mock-data";
import type { Category, Product } from "@/lib/types";

/* ─── 1. Temel Veri Modeli ───────────────────────────────────────────────── */
export interface PresentationProduct {
  id: string;
  imageUrl: string;      // görsel URL
  name: string;          // ürün_ismi
  price: number;         // fiyat
  categoryId: string;    // kategori_id
  description: string;   // ürünü anlatan, müşteriyi cezbedecek tanıtım_metni
  categoryName?: string;
  categorySlug?: string;
  code?: string;
  badge?: string;        // Örn: "İmza Lezzet", "Yeni Sezon", "Şefin Favorisi"
  order?: number;
  isActive?: boolean;
}

/* ─── 2. Backend Entegrasyonu (Doğrudan Sitedeki Verileri Çeker) ──────────── */

/**
 * Web sitesindeki aktif kategorileri çeker
 */
export async function fetchPresentationCategories(): Promise<Category[]> {
  try {
    const cats = await getActiveCategories();
    if (cats && cats.length > 0) {
      return cats
        .filter((c) => c.isActive !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }
    return MOCK_CATEGORIES;
  } catch (err) {
    console.warn("Kategoriler Firestore'dan çekilemedi, mock veri kullanılıyor:", err);
    return MOCK_CATEGORIES;
  }
}

/**
 * Web sitesindeki tüm ürünleri PresentationProduct formatına uyarlayarak çeker.
 * Varsa localStorage'daki sunum düzenlemelerini (overrides) harmanlar.
 */
export async function fetchPresentationProducts(): Promise<PresentationProduct[]> {
  let rawProducts: Product[] = [];
  try {
    rawProducts = await getProducts();
    if (!rawProducts || rawProducts.length === 0) {
      rawProducts = MOCK_PRODUCTS;
    }
  } catch (err) {
    console.warn("Ürünler Firestore'dan çekilemedi, mock veri kullanılıyor:", err);
    rawProducts = MOCK_PRODUCTS;
  }

  // Veri modeli eşleme (id, imageUrl, name, price, categoryId, description)
  const mapped: PresentationProduct[] = rawProducts
    .filter((p) => p.isActive !== false)
    .map((p) => ({
      id: p.id,
      imageUrl: p.imageUrl || "/resimler/logo.png",
      name: p.name,
      price: p.price || 0,
      categoryId: p.categoryId || p.categorySlug || "genel",
      categoryName: p.categoryName || "",
      categorySlug: p.categorySlug || "",
      code: p.code || "",
      description:
        p.description?.trim() ||
        `${p.name}, profesyonel gastronomi ve barista standartları için özel olarak geliştirilmiş seçkin bir lezzet profilidir.`,
      badge: p.isBestSeller ? "Çok Satan" : undefined,
      order: p.order ?? 0,
      isActive: p.isActive !== false,
    }));

  // LocalStorage'daki admin güncellemeleri varsa uygula (anlık önizleme için)
  if (typeof window !== "undefined") {
    const customEdits = localStorage.getItem("presentation_custom_products");
    if (customEdits) {
      try {
        const parsed: Record<string, Partial<PresentationProduct>> = JSON.parse(customEdits);
        return mapped.map((item) => {
          if (parsed[item.id]) {
            return { ...item, ...parsed[item.id] };
          }
          return item;
        });
      } catch (e) {
        console.error("LocalStorage parse hatası:", e);
      }
    }
  }

  return mapped;
}

/* ─── 3. Kategori Bazlı Gruplama Yardımcısı ───────────────────────────────── */
export interface CategoryProductGroup {
  category: Category;
  products: PresentationProduct[];
}

export function groupProductsByCategory(
  categories: Category[],
  products: PresentationProduct[]
): CategoryProductGroup[] {
  // Yalnızca ana kategorileri ve çocuklarını hiyerarşik veya düz gruplar
  return categories
    .map((cat) => {
      const catProducts = products.filter(
        (p) =>
          p.categoryId === cat.id ||
          p.categoryId === cat.slug ||
          p.categorySlug?.toLowerCase() === cat.slug?.toLowerCase() ||
          (p.categoryName && p.categoryName.toLowerCase() === cat.name.toLowerCase())
      );

      return {
        category: cat,
        products: catProducts,
      };
    })
    .filter((group) => group.products.length > 0);
}

/* ─── 4. Mock API & CRUD Fonksiyon İskeletleri ────────────────────────────── */
export const presentationApi = {
  /**
   * Tüm ürünleri listele
   */
  async getAll(): Promise<PresentationProduct[]> {
    return fetchPresentationProducts();
  },

  /**
   * Ürün güncelleme (Edit)
   * Hem Firestore'u günceller hem de lokal sunum state'ini senkronize eder.
   */
  async update(id: string, data: Partial<PresentationProduct>): Promise<PresentationProduct> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        // Firestore güncelleme denemesi (arka planda hata olsa bile akışı bozmaz)
        try {
          await firestoreUpdateProduct(id, {
            name: data.name,
            price: data.price,
            description: data.description,
            imageUrl: data.imageUrl,
            categoryId: data.categoryId,
          });
        } catch (e) {
          console.warn("Firestore güncellemesi atlandı, lokal sunum kaydı yapılıyor:", e);
        }

        // Lokal sunum overrides kaydı
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("presentation_custom_products");
          const map: Record<string, Partial<PresentationProduct>> = stored ? JSON.parse(stored) : {};
          map[id] = { ...map[id], ...data };
          localStorage.setItem("presentation_custom_products", JSON.stringify(map));
        }

        resolve({ id, ...data } as PresentationProduct);
      }, 300);
    });
  },

  /**
   * Yeni sunum ürünü ekleme
   */
  async create(data: Omit<PresentationProduct, "id">): Promise<PresentationProduct> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct: PresentationProduct = {
          ...data,
          id: `pres-${Date.now()}`,
        };
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("presentation_custom_products");
          const map: Record<string, Partial<PresentationProduct>> = stored ? JSON.parse(stored) : {};
          map[newProduct.id] = newProduct;
          localStorage.setItem("presentation_custom_products", JSON.stringify(map));
        }
        resolve(newProduct);
      }, 400);
    });
  },

  /**
   * Sunum ürününü gizleme / silme
   */
  async delete(id: string): Promise<{ success: boolean; id: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("presentation_custom_products");
          const map: Record<string, Partial<PresentationProduct>> = stored ? JSON.parse(stored) : {};
          map[id] = { ...map[id], isActive: false };
          localStorage.setItem("presentation_custom_products", JSON.stringify(map));
        }
        resolve({ success: true, id });
      }, 300);
    });
  },
};
