/**
 * Özel Müşteri Sunum Kataloğu — Veri ve Entegrasyon Katmanı
 * 
 * Sitenin mevcut kategorileriyle tam entegre çalışır.
 * İstenen veri modelini (id, görsel URL, ürün_ismi, fiyat, kategori_id, tanıtım_metni)
 * ve Mock API / Firestore operasyon iskeletlerini sağlar.
 */

import { getActiveCategories, getProducts } from "@/lib/firestore-collections";
import { CATEGORIES as MOCK_CATEGORIES } from "@/lib/mock-data";
import type { Category } from "@/lib/types";

/* ─── 1. Veri Modeli Tanımı ──────────────────────────────────────────────── */
export interface PresentationProduct {
  id: string;
  imageUrl: string;      // görsel URL
  name: string;          // ürün_ismi
  price: number;         // fiyat
  categoryId: string;    // kategori_id
  description: string;   // ürünü anlatan, müşteriyi cezbedecek tanıtım_metni
  categoryName?: string;
  badge?: string;        // Örn: "Şefin Seçimi", "Yeni Sezon", "İmza Lezzet"
  order?: number;
  isActive?: boolean;
}

/* ─── Başlangıç Sunum Ürünleri (Mock / Default Veriler) ───────────────────── */
export const INITIAL_PRESENTATION_PRODUCTS: PresentationProduct[] = [
  {
    id: "pres-1",
    name: "DaVinci Gourmet Madagaskar Vanilya Şurubu",
    imageUrl: "/resimler/urunler/165.webp",
    price: 345.0,
    categoryId: "suruplar",
    categoryName: "Şuruplar",
    badge: "İmza Lezzet",
    description:
      "Gerçek Madagaskar vanilya çekirdeklerinin büyüleyici kokusuyla harmanlanan bu şurup; sıcak ve soğuk kahve reçetelerinizde damakta kadifemsi, kalıcı ve seçkin bir tat profili bırakır. Profesyonel baristaların vazgeçilmez lezzet ortağı.",
    order: 1,
    isActive: true,
  },
  {
    id: "pres-2",
    name: "Caffè NONNO Frozen Orman Meyveleri Püresi",
    imageUrl: "/resimler/urunler/31.webp",
    price: 420.0,
    categoryId: "pureler",
    categoryName: "Püreler",
    badge: "%100 Meyve Yoğunluğu",
    description:
      "Taze toplanmış böğürtlen, frambuaz ve yaban mersininin canlı mayhoşluğunu içeceklerinize taşıyın. Yüksek meyve oranıyla hazırlanan bu püre; artisan kokteyller, mocktail ve frozen sunumlarında göz alıcı renk ve eşsiz bir aroma dengesi sunar.",
    order: 2,
    isActive: true,
  },
  {
    id: "pres-3",
    name: "CALLEI Belçika Fındıklı Sürülebilir Çikolata Kreması",
    imageUrl: "/resimler/urunler/10.webp",
    price: 580.0,
    categoryId: "waffle-malzemeleri",
    categoryName: "Waffle & Pastacılık",
    badge: "Gurme Seçim",
    description:
      "Geleneksel Belçika çikolata ustalığıyla harmanlanmış, kavrulmuş birinci sınıf fındık tanecikleriyle zenginleştirilmiş pürüzsüz doku. Sıcak waffle, krep ve butik pasta dolgularında üstün kıvam ve lüks bir lezzet imzası yaratır.",
    order: 3,
    isActive: true,
  },
  {
    id: "pres-4",
    name: "EASY MIX Botanik Hibiscus & Gül Kokteyl Premiksi",
    imageUrl: "/resimler/urunler/115.webp",
    price: 390.0,
    categoryId: "kokteyller",
    categoryName: "Kokteyl Premiksleri",
    badge: "Trend Koleksiyon",
    description:
      "Doğal hibiscus yaprakları ve Isparta güllerinin zarafetiyle demlenen eşsiz botanik harmoni. Saniyeler içinde hazırlanan yüksek standartlı imza kokteyller için barlara hız, konuklarınıza unutulmaz bir lezzet yolculuğu kazandırır.",
    order: 4,
    isActive: true,
  },
  {
    id: "pres-5",
    name: "Caffè NONNO Altın Karamel Bar Sosu",
    imageUrl: "/resimler/urunler/21.webp",
    price: 310.0,
    categoryId: "bar-sos",
    categoryName: "Bar Sosları",
    badge: "Zengin Doku",
    description:
      "Ağır ateşte karamelize edilen saf şekerin tereyağımsı zenginliği ve ipeksi akışkanlığı. Kahve kreması süslemelerinde, bardak içi dekorasyonlarda ve tatlı tabaklarında kusursuz formunu korur.",
    order: 5,
    isActive: true,
  },
  {
    id: "pres-6",
    name: "San Sebastián Donuk Bask Cheesecake",
    imageUrl: "/resimler/urunler/201.webp",
    price: 750.0,
    categoryId: "donuk-pasta",
    categoryName: "Donuk Pastalar",
    badge: "Şefin Favorisi",
    description:
      "Geleneksel San Sebastián fırınlama tekniğiyle üzeri nar gibi kızarmış, içi akışkan ve yoğun kremamsı kıvamda. Çözündükten sonra ilk anki tazeliğini koruyan, kafe ve restoranlar için fireyi sıfıra indiren birinci sınıf tatlı çözümü.",
    order: 6,
    isActive: true,
  },
];

/* ─── 2. Backend Entegrasyon Fonksiyonları ───────────────────────────────── */

/**
 * Web sitesindeki mevcut kategori listesini çeker.
 */
export async function fetchPresentationCategories(): Promise<Category[]> {
  try {
    const categories = await getActiveCategories();
    if (categories && categories.length > 0) {
      return categories
        .filter((c) => c.isActive !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }
    return MOCK_CATEGORIES;
  } catch (error) {
    console.warn("Kategoriler Firestore'dan çekilemedi, mock veriler kullanılıyor:", error);
    return MOCK_CATEGORIES;
  }
}

/**
 * Sunum kataloğu ürünlerini çeker.
 */
export async function fetchPresentationProducts(): Promise<PresentationProduct[]> {
  // Eğer localStorage veya API'de kayıtlı ürün varsa onu döndür, yoksa başlangıç verisini sun
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("presentation_products");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("LocalStorage parse hatası:", e);
      }
    }
  }
  return INITIAL_PRESENTATION_PRODUCTS;
}

/* ─── 3. Mock API & CRUD Operasyon İskeleti ───────────────────────────────── */

export const presentationApi = {
  /**
   * Tüm ürünleri getir
   */
  async getAll(): Promise<PresentationProduct[]> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const products = await fetchPresentationProducts();
        resolve(products);
      }, 300);
    });
  },

  /**
   * Yeni ürün oluştur
   */
  async create(item: Omit<PresentationProduct, "id">): Promise<PresentationProduct> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const current = await fetchPresentationProducts();
        const newProduct: PresentationProduct = {
          ...item,
          id: `pres-${Date.now()}`,
          order: item.order ?? current.length + 1,
          isActive: item.isActive ?? true,
        };
        const updated = [newProduct, ...current];
        if (typeof window !== "undefined") {
          localStorage.setItem("presentation_products", JSON.stringify(updated));
        }
        resolve(newProduct);
      }, 400);
    });
  },

  /**
   * Ürün güncelle (Edit)
   */
  async update(id: string, updates: Partial<PresentationProduct>): Promise<PresentationProduct> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const current = await fetchPresentationProducts();
        const index = current.findIndex((p) => p.id === id);
        if (index === -1) {
          reject(new Error("Ürün bulunamadı"));
          return;
        }
        const updatedItem = { ...current[index], ...updates };
        current[index] = updatedItem;
        if (typeof window !== "undefined") {
          localStorage.setItem("presentation_products", JSON.stringify(current));
        }
        resolve(updatedItem);
      }, 400);
    });
  },

  /**
   * Ürün sil (Delete)
   */
  async delete(id: string): Promise<{ success: boolean; id: string }> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const current = await fetchPresentationProducts();
        const filtered = current.filter((p) => p.id !== id);
        if (typeof window !== "undefined") {
          localStorage.setItem("presentation_products", JSON.stringify(filtered));
        }
        resolve({ success: true, id });
      }, 300);
    });
  },
};
