/**
 * Dijital Ürün Kataloğu — Veri ve Entegrasyon Katmanı (Catalog Service)
 * 
 * Hem Firestore gerçek veritabanı hem de Mock API/State ile tam uyumlu
 * çalışan servis fonksiyonları ve veri modeli tanımları.
 */

import {
  getActiveCategories,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  cloneProduct,
} from "@/lib/firestore-collections";
import { CATEGORIES as MOCK_CATEGORIES, PRODUCTS as MOCK_PRODUCTS } from "@/lib/mock-data";
import type { Category, Product } from "@/lib/types";

/* ─── Kullanıcı İsteğine Özel Veri Modeli ──────────────────────────────────── */
export interface CatalogProduct {
  id: string;
  imageUrl: string;      // görsel URL
  name: string;          // ürün_ismi
  price: number;         // fiyat
  categoryId: string;    // kategori_id
  description: string;   // ürünü anlatan müşteriyi cezbedecek tanıtım_metni
  code?: string;
  codeGroup?: string;
  categoryName?: string;
  categorySlug?: string;
  vatRate?: number;
  order?: number;
  isActive?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
}

export interface CatalogCategory {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  order?: number;
  isActive?: boolean;
  description?: string;
  icon?: string;
  parentId?: string;
}

/* ─── Veri Çekme Fonksiyonları (Backend Entegrasyonu) ─────────────────────── */

/**
 * Aktif kategorileri Firestore'dan çeker. Hata durumunda veya boşsa mock veriye düşer.
 */
export async function getCatalogCategories(): Promise<Category[]> {
  try {
    const cats = await getActiveCategories();
    if (cats && cats.length > 0) {
      return cats
        .filter((c) => c.isActive !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }
    return MOCK_CATEGORIES;
  } catch (error) {
    console.warn("Firestore kategorileri çekilemedi, mock veriler kullanılıyor:", error);
    return MOCK_CATEGORIES;
  }
}

/**
 * Katalog ürünlerini Firestore'dan çeker. Hata durumunda mock veriye düşer.
 */
export async function getCatalogProducts(): Promise<Product[]> {
  try {
    const prods = await getProducts();
    if (prods && prods.length > 0) {
      return prods
        .filter((p) => p.isActive !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }
    return MOCK_PRODUCTS;
  } catch (error) {
    console.warn("Firestore ürünleri çekilemedi, mock veriler kullanılıyor:", error);
    return MOCK_PRODUCTS;
  }
}

/* ─── Mock API Operasyon İskeletleri (Geliştirme & Test Ortamı) ───────────── */

export const mockCatalogApi = {
  /**
   * Mock gecikmeli kategori listesi
   */
  async getCategories(delayMs = 400): Promise<Category[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_CATEGORIES), delayMs);
    });
  },

  /**
   * Mock gecikmeli ürün listesi
   */
  async getProducts(delayMs = 500): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PRODUCTS), delayMs);
    });
  },

  /**
   * Mock ürün oluşturma
   */
  async createProduct(data: Omit<CatalogProduct, "id">, delayMs = 600): Promise<CatalogProduct> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct: CatalogProduct = {
          ...data,
          id: `mock-${Date.now()}`,
          code: data.code || `PRD-${Date.now().toString().slice(-4)}`,
          isActive: data.isActive ?? true,
        };
        resolve(newProduct);
      }, delayMs);
    });
  },

  /**
   * Mock ürün güncelleme
   */
  async updateProduct(id: string, data: Partial<CatalogProduct>, delayMs = 500): Promise<CatalogProduct> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, ...data } as CatalogProduct);
      }, delayMs);
    });
  },

  /**
   * Mock ürün silme
   */
  async deleteProduct(id: string, delayMs = 400): Promise<{ success: boolean; id: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id });
      }, delayMs);
    });
  },
};
