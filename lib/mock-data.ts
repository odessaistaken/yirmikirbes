/**
 * Mock data for 20:45 Pastacılık catalog.
 * Used for initial development before Firestore data is populated.
 * 6 categories, 24 products covering all major bakery/pastry lines.
 */



import type { Category, Product } from "@/lib/types";
export type { Category, Product };
export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Püreler",
    slug: "pureler",
    description: "Profesyonel pasta üretimi için meyve ve fındık pürelerinden oluşan premium koleksiyonumuz.",
    icon: "🍓",
    productCount: 6,
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80",
    order: 1,
    isActive: true,
  },
  {
    id: "cat-2",
    name: "Şuruplar",
    slug: "suruplar",
    description: "Kahve, waffle ve tatlılarınız için özel formüle edilmiş lezzet şurupları.",
    icon: "🍯",
    productCount: 5,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80",
    order: 2,
    isActive: true,
  },
  {
    id: "cat-3",
    name: "Waffle Malzemeleri",
    slug: "waffle-malzemeleri",
    description: "Crispy ve lezzetli waffle yapımı için gerekli tüm karışım ve toppingler.",
    icon: "🧇",
    productCount: 4,
    imageUrl: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&q=80",
    order: 3,
    isActive: true,
  },
  {
    id: "cat-4",
    name: "Donuk Pasta",
    slug: "donuk-pasta",
    description: "Kolayca pişirilip servis edilebilen dondurulmuş premium pasta çeşitleri.",
    icon: "🎂",
    productCount: 5,
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    order: 4,
    isActive: true,
  },
  {
    id: "cat-5",
    name: "Kremalı Ürünler",
    slug: "kremali-urunler",
    description: "Chantilly, ganache ve özel krema bazlı profesyonel pastacılık hammaddeleri.",
    icon: "🍰",
    productCount: 4,
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
    order: 5,
    isActive: true,
  },
  {
    id: "cat-6",
    name: "Tatlı Soslar",
    slug: "tatli-soslar",
    description: "Çikolata, karamel ve meyve sosuyla tatlılarınıza premium lezzet katın.",
    icon: "🍫",
    productCount: 4,
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80",
    order: 6,
    isActive: true,
  },
];/* ─── Categories ─────────────────────────────────────────────────────────── */



const RAW_PRODUCTS = [
  {
    id: "prod-1",
    name: "Çilek Püresi Premium",
    code: "PUR-2045-001",
    categoryId: "cat-1",
    categoryName: "Püreler",
    categorySlug: "pureler",
    description: "Taze hasat çileklerden üretilen yoğun aromalı ticari çilek püresi. Pastalar, dondurma ve tatlılarda kullanım için idealdir. 1 kg ambalajda temin edilir.",
    imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80",
    isActive: true,
    isFeatured: true,
    tags: ["püre", "çilek", "meyve", "dondurma"],
    specs: { "Ambalaj": "1 kg", "Muhafaza": "-18°C", "Raf Ömrü": "24 ay" },
  },
  {
    id: "prod-2",
    name: "Ahududu Püresi",
    code: "PUR-2045-002",
    categoryId: "cat-1",
    categoryName: "Püreler",
    categorySlug: "pureler",
    description: "Fransız tarzı tatlılar için mükemmel, hafif ekşi ve yoğun aromalı ahududu püresi.",
    imageUrl: "https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=600&q=80",
    isActive: true,
    isFeatured: true,
    tags: ["püre", "ahududu", "meyve"],
    specs: { "Ambalaj": "1 kg", "Muhafaza": "-18°C", "Raf Ömrü": "24 ay" },
  },
  {
    id: "prod-3",
    name: "Mango Püresi Exotique",
    code: "PUR-2045-003",
    categoryId: "cat-1",
    categoryName: "Püreler",
    categorySlug: "pureler",
    description: "Hint kökenli Alphonso mangosundan üretilen tropikal lezzetli püre. Ekzotik tatlılar için vazgeçilmezdir.",
    imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80",
    isActive: true,
    isFeatured: false,
    tags: ["püre", "mango", "tropikal", "egzotik"],
    specs: { "Ambalaj": "1 kg", "Muhafaza": "-18°C", "Raf Ömrü": "24 ay" },
  },
  {
    id: "prod-4",
    name: "Fındık Püresi Piemonte",
    code: "PUR-2045-004",
    categoryId: "cat-1",
    categoryName: "Püreler",
    categorySlug: "pureler",
    description: "İtalya'nın Piemonte bölgesinden seçme Tonda Gentile fındığından üretilen yoğun fındık ezmesi.",
    imageUrl: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=600&q=80",
    isActive: true,
    isFeatured: true,
    tags: ["püre", "fındık", "fıstık"],
    specs: { "Ambalaj": "1 kg", "Muhafaza": "+4°C ile +20°C", "Raf Ömrü": "18 ay" },
  },
  {
    id: "prod-5",
    name: "Passion Fruit Püresi",
    code: "PUR-2045-005",
    categoryId: "cat-1",
    categoryName: "Püreler",
    categorySlug: "pureler",
    description: "Taze çarkıfelek meyvesinden elde edilen ekşi ve aromalı püre. Mousse ve cheesecake için mükemmeldir.",
    imageUrl: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=600&q=80",
    isActive: true,
    isFeatured: false,
    tags: ["püre", "çarkıfelek", "tropikal"],
    specs: { "Ambalaj": "1 kg", "Muhafaza": "-18°C", "Raf Ömrü": "24 ay" },
  },
  {
    id: "prod-6",
    name: "Kare Portakal Püresi",
    code: "PUR-2045-006",
    categoryId: "cat-1",
    categoryName: "Püreler",
    categorySlug: "pureler",
    description: "Sicilyalı kan portakallarından elde edilen derin kırmızı rengi ve yoğun aromasıyla özel bir püre.",
    imageUrl: "https://images.unsplash.com/photo-1547514701-42782101795e?w=600&q=80",
    isActive: true,
    isFeatured: false,
    tags: ["püre", "portakal", "meyve", "ekşi"],
    specs: { "Ambalaj": "1 kg", "Muhafaza": "-18°C", "Raf Ömrü": "24 ay" },
  },

  // ── Şuruplar ──────────────────────────────────────────────────────────────
  {
    id: "prod-7",
    name: "Vanilya Şurubu Classic",
    code: "SYR-2045-001",
    categoryId: "cat-2",
    categoryName: "Şuruplar",
    categorySlug: "suruplar",
    description: "Madagaskar vanilyasından damıtılan otantik lezzetiyle kahve ve tatlı kreasyonlarına değer katan premium şurup.",
    imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80",
    isActive: true,
    isFeatured: true,
    tags: ["şurup", "vanilya", "kahve", "içecek"],
    specs: { "Ambalaj": "750 ml", "Muhafaza": "Oda sıcaklığı", "Raf Ömrü": "36 ay" },
  },
  {
    id: "prod-8",
    name: "Karamel Şurubu Artisan",
    code: "SYR-2045-002",
    categoryId: "cat-2",
    categoryName: "Şuruplar",
    categorySlug: "suruplar",
    description: "Gerçek karamelizasyon süreciyle üretilen derin amber renginde buttery karamel şurubu.",
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80",
    isActive: true,
    isFeatured: true,
    tags: ["şurup", "karamel", "kahve"],
    specs: { "Ambalaj": "750 ml", "Muhafaza": "Oda sıcaklığı", "Raf Ömrü": "36 ay" },
  },
  {
    id: "prod-9",
    name: "Antep Fıstığı Şurubu",
    code: "SYR-2045-003",
    categoryId: "cat-2",
    categoryName: "Şuruplar",
    categorySlug: "suruplar",
    description: "Türk mutfağının efsanevi lezzeti, Gaziantep antep fıstığından elde edilen yoğun aromatlı şurup.",
    imageUrl: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&q=80",
    isActive: true,
    isFeatured: false,
    tags: ["şurup", "fıstık", "türk", "aromalı"],
    specs: { "Ambalaj": "750 ml", "Muhafaza": "Oda sıcaklığı", "Raf Ömrü": "24 ay" },
  },
  {
    id: "prod-10",
    name: "Frambuaz Şurubu",
    code: "SYR-2045-004",
    categoryId: "cat-2",
    categoryName: "Şuruplar",
    categorySlug: "suruplar",
    description: "Doğal frambuaz ekstresiyle zenginleştirilmiş, limonata ve mocktail'larınız için ideal ekşi-tatlı şurup.",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
    isActive: true,
    isFeatured: false,
    tags: ["şurup", "frambuaz", "meyve", "içecek"],
    specs: { "Ambalaj": "750 ml", "Muhafaza": "Oda sıcaklığı", "Raf Ömrü": "36 ay" },
  },
  {
    id: "prod-11",
    name: "Haselnuss Çikolata Şurubu",
    code: "SYR-2045-005",
    categoryId: "cat-2",
    categoryName: "Şuruplar",
    categorySlug: "suruplar",
    description: "Fındık ve bitter çikolatanın mükemmel birleşiminden oluşan yoğun lezzetli topping şurubu.",
    imageUrl: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&q=80",
    isActive: true,
    isFeatured: false,
    tags: ["şurup", "çikolata", "fındık", "topping"],
    specs: { "Ambalaj": "750 ml", "Muhafaza": "Oda sıcaklığı", "Raf Ömrü": "24 ay" },
  },

  // ── Waffle Malzemeleri ───────────────────────────────────────────────────
  {
    id: "prod-12",
    name: "Waffle Mix Classic",
    code: "WAF-2045-001",
    categoryId: "cat-3",
    categoryName: "Waffle Malzemeleri",
    categorySlug: "waffle-malzemeleri",
    description: "Dışı crispy, içi yumuşak ve kabarık Belçika wafflesi hazırlamak için özel hazırlanmış premium toz karışım.",
    imageUrl: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&q=80",
    isActive: true,
    isFeatured: true,
    tags: ["waffle", "karışım", "belçika", "kahvaltı"],
    specs: { "Ambalaj": "5 kg", "Muhafaza": "Kuru, serin yerde", "Raf Ömrü": "12 ay" },
  },
  {
    id: "prod-13",
    name: "Bubble Waffle Karışımı",
    code: "WAF-2045-002",
    categoryId: "cat-3",
    categoryName: "Waffle Malzemeleri",
    categorySlug: "waffle-malzemeleri",
    description: "Hong Kong stili crispy-yumuşak balon waffle yapımı için formüle edilmiş özel karışım.",
    imageUrl: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=80",
    isActive: true,
    isFeatured: false,
    tags: ["waffle", "bubble", "hong kong", "trend"],
    specs: { "Ambalaj": "5 kg", "Muhafaza": "Kuru, serin yerde", "Raf Ömrü": "12 ay" },
  },
  {
    id: "prod-14",
    name: "Waffle Çikolata Sosu",
    code: "WAF-2045-003",
    categoryId: "cat-3",
    categoryName: "Waffle Malzemeleri",
    categorySlug: "waffle-malzemeleri",
    description: "Sıcak waffleler ve dondurma üzerine akıcı şekilde dökülen sıcaklık stabilitesi yüksek çikolata sosu.",
    imageUrl: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=600&q=80",
    isActive: true,
    isFeatured: false,
    tags: ["waffle", "çikolata", "sos", "topping"],
    specs: { "Ambalaj": "3 kg", "Muhafaza": "+15°C - +25°C", "Raf Ömrü": "18 ay" },
  },
  {
    id: "prod-15",
    name: "Waffle Krispy Topping Mix",
    code: "WAF-2045-004",
    categoryId: "cat-3",
    categoryName: "Waffle Malzemeleri",
    categorySlug: "waffle-malzemeleri",
    description: "Waffle sunumunu tamamlayan puf pirinç, granola ve şeker kaplamalı topping karışımı.",
    imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
    isActive: true,
    isFeatured: false,
    tags: ["waffle", "topping", "crispy", "granola"],
    specs: { "Ambalaj": "1 kg", "Muhafaza": "Kuru, serin yerde", "Raf Ömrü": "9 ay" },
  },

  // ── Donuk Pasta ──────────────────────────────────────────────────────────
  {
    id: "prod-16",
    name: "Frambuazlı Charlotte Royale",
    code: "FRZ-2045-001",
    categoryId: "cat-4",
    categoryName: "Donuk Pasta",
    categorySlug: "donuk-pasta",
    description: "Kakaolu bisküvi tabanlı, çilek-frambuaz mousse dolgulu klasik Fransız şarlotkası. Çözünce servis edilebilir.",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    isActive: true,
    isFeatured: true,
    tags: ["pasta", "donuk", "mousse", "çilek", "fransız"],
    specs: { "Ambalaj": "4 kişilik / 800g", "Muhafaza": "-18°C", "Raf Ömrü": "12 ay" },
  },
  {
    id: "prod-17",
    name: "Mango Coconut Entrement",
    code: "FRZ-2045-002",
    categoryId: "cat-4",
    categoryName: "Donuk Pasta",
    categorySlug: "donuk-pasta",
    description: "Tropikal mango ve hindistan cevizi kremasının mükemmel uyumundan oluşan mirror glazed modern pasta.",
    imageUrl: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&q=80",
    isActive: true,
    isFeatured: true,
    tags: ["pasta", "donuk", "mango", "tropikal", "mirror glaze"],
    specs: { "Ambalaj": "6 kişilik / 1.2 kg", "Muhafaza": "-18°C", "Raf Ömrü": "12 ay" },
  },
  {
    id: "prod-18",
    name: "Bitter Çikolata Fondant",
    code: "FRZ-2045-003",
    categoryId: "cat-4",
    categoryName: "Donuk Pasta",
    categorySlug: "donuk-pasta",
    description: "%72 bitter çikolata kullanılarak hazırlanmış, ısıtıldığında içi akan akışkan kek.",
    imageUrl: "https://images.unsplash.com/photo-1606890542013-0022735a92cd?w=600&q=80",
    isActive: true,
    isFeatured: false,
    tags: ["pasta", "donuk", "çikolata", "fondant"],
    specs: { "Ambalaj": "8 adet / kutu", "Muhafaza": "-18°C", "Raf Ömrü": "6 ay" },
  },
  {
    id: "prod-19",
    name: "Cheesecake New York Style",
    code: "FRZ-2045-004",
    categoryId: "cat-4",
    categoryName: "Donuk Pasta",
    categorySlug: "donuk-pasta",
    description: "Yoğun cream cheese dolgusu, granüllü bisküvi tabanı ile otantik New York usulü cheesecake.",
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80",
    isActive: true,
    isFeatured: true,
    tags: ["cheesecake", "donuk", "new york", "tatlı"],
    specs: { "Ambalaj": "8 kişilik / 1.4 kg", "Muhafaza": "-18°C", "Raf Ömrü": "9 ay" },
  },
  {
    id: "prod-20",
    name: "Tiramisu Classic",
    code: "FRZ-2045-005",
    categoryId: "cat-4",
    categoryName: "Donuk Pasta",
    categorySlug: "donuk-pasta",
    description: "Maskarpone kreması ve espresso şerbetli İtalyan klasiği Tiramisu. Bireysel porsiyonlarda.",
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80",
    isActive: true,
    isFeatured: false,
    tags: ["tiramisu", "donuk", "italyan", "kahve", "maskarpone"],
    specs: { "Ambalaj": "6 porsiyon", "Muhafaza": "-18°C", "Raf Ömrü": "6 ay" },
  },

  // ── Kremalı Ürünler ──────────────────────────────────────────────────────
  {
    id: "prod-21",
    name: "Premium Chantilly Kremasi",
    code: "KRM-2045-001",
    categoryId: "cat-5",
    categoryName: "Kremalı Ürünler",
    categorySlug: "kremali-urunler",
    description: "Stabil şekilde çırpılabilen, %35 yağ oranıyla professional pastacılık için ideal chantilly kreması.",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
    isActive: true,
    isFeatured: true,
    tags: ["krema", "chantilly", "çırpılmış", "süt"],
    specs: { "Ambalaj": "1 L", "Muhafaza": "+2°C - +8°C", "Raf Ömrü": "60 gün" },
  },
  {
    id: "prod-22",
    name: "Ganache Bitter %70",
    code: "KRM-2045-002",
    categoryId: "cat-5",
    categoryName: "Kremalı Ürünler",
    categorySlug: "kremali-urunler",
    description: "Pastacılık sınıfı %70 kakao oranında Callebaut çikolatasından hazırlanmış hazır ganache.",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    isActive: true,
    isFeatured: false,
    tags: ["krema", "ganache", "çikolata", "bitter"],
    specs: { "Ambalaj": "3 kg", "Muhafaza": "+10°C - +18°C", "Raf Ömrü": "45 gün" },
  },
  {
    id: "prod-23",
    name: "Frangipane Badem Krema",
    code: "KRM-2045-003",
    categoryId: "cat-5",
    categoryName: "Kremalı Ürünler",
    categorySlug: "kremali-urunler",
    description: "Fransız tarzı tartes, croissant ve köy ekmeği için ideal geleneksel badem krema.",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    isActive: true,
    isFeatured: false,
    tags: ["krema", "badem", "frangipane", "fransız"],
    specs: { "Ambalaj": "1 kg", "Muhafaza": "+2°C - +8°C", "Raf Ömrü": "30 gün" },
  },
  {
    id: "prod-24",
    name: "Mocha Mascarpone Krema",
    code: "KRM-2045-004",
    categoryId: "cat-5",
    categoryName: "Kremalı Ürünler",
    categorySlug: "kremali-urunler",
    description: "Espresso ve maskarpone peynirinin buluştuğu yoğun ve kadifemsi pasta dolgu kreması.",
    imageUrl: "https://images.unsplash.com/photo-1559181567-c3190ca9d6c4?w=600&q=80",
    isActive: true,
    isFeatured: false,
    tags: ["krema", "maskarpone", "kahve", "mocha"],
    specs: { "Ambalaj": "1 kg", "Muhafaza": "+2°C - +8°C", "Raf Ömrü": "21 gün" },
  },
];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((p, i) => ({
  codeGroup: "",
  price: 0,
  vatRate: 20,
  order: i + 1,
  ...p,
}));

import { setDbItem, getDbItem } from "@/lib/db-store";

/* ─── Persistent Storage Helpers (IndexedDB + localStorage fallback) ────── */
export function getStoredProducts(): Product[] {
  if (typeof window !== "undefined") {
    try {
      getDbItem<Product[]>("ykb_custom_products").then((stored) => {
        if (stored && Array.isArray(stored) && stored.length > 0) {
          stored.forEach((p) => {
            const idx = PRODUCTS.findIndex((x) => x.id === p.id);
            if (idx >= 0) PRODUCTS[idx] = p;
            else PRODUCTS.unshift(p);
          });
        }
      });
      const storedLS = localStorage.getItem("ykb_custom_products");
      if (storedLS) {
        const parsed = JSON.parse(storedLS) as Product[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed.forEach((p) => {
            const idx = PRODUCTS.findIndex((x) => x.id === p.id);
            if (idx >= 0) PRODUCTS[idx] = p;
            else PRODUCTS.unshift(p);
          });
        }
      }
    } catch {
      // ignore
    }
  }
  return PRODUCTS;
}

export function saveProducts(productsList: Product[]) {
  if (typeof window !== "undefined") {
    setDbItem("ykb_custom_products", productsList);
    try {
      localStorage.setItem("ykb_custom_products", JSON.stringify(productsList));
    } catch {
      // ignore localStorage quota exceeded
    }
  }
}

export function getStoredCategories(): Category[] {
  if (typeof window !== "undefined") {
    try {
      getDbItem<Category[]>("ykb_custom_categories").then((stored) => {
        if (stored && Array.isArray(stored) && stored.length > 0) {
          stored.forEach((c) => {
            const idx = CATEGORIES.findIndex((x) => x.id === c.id || x.slug === c.slug);
            if (idx >= 0) CATEGORIES[idx] = c;
            else CATEGORIES.push(c);
          });
        }
      });
      const storedLS = localStorage.getItem("ykb_custom_categories");
      if (storedLS) {
        const parsed = JSON.parse(storedLS) as Category[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed.forEach((c) => {
            const idx = CATEGORIES.findIndex((x) => x.id === c.id || x.slug === c.slug);
            if (idx >= 0) CATEGORIES[idx] = c;
            else CATEGORIES.push(c);
          });
        }
      }
    } catch {
      // ignore
    }
  }
  return CATEGORIES;
}

export function saveCategories(catList: Category[]) {
  if (typeof window !== "undefined") {
    setDbItem("ykb_custom_categories", catList);
    try {
      localStorage.setItem("ykb_custom_categories", JSON.stringify(catList));
    } catch {
      // ignore
    }
  }
}

/* ─── Helper functions ───────────────────────────────────────────────────── */
export function getProductsByCategory(slug: string): Product[] {
  const prods = getStoredProducts();
  return prods.filter((p) => p.categorySlug === slug && p.isActive);
}

export function getFeaturedProducts(): Product[] {
  const prods = getStoredProducts();
  return prods.filter((p) => p.isFeatured && p.isActive);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const cats = getStoredCategories();
  return cats.find((c) => c.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  const prods = getStoredProducts();
  return prods.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const prods = getStoredProducts();
  return prods.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id && p.isActive
  ).slice(0, limit);
}

export function registerCategory(cat: Category) {
  const idx = CATEGORIES.findIndex((c) => c.id === cat.id || c.slug === cat.slug);
  if (idx >= 0) {
    CATEGORIES[idx] = { ...CATEGORIES[idx], ...cat };
  } else {
    CATEGORIES.push({
      id: cat.id || `cat-${CATEGORIES.length + 1}`,
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      icon: cat.icon || "🏷️",
      productCount: cat.productCount || 0,
      imageUrl: cat.imageUrl || "",
      order: cat.order || CATEGORIES.length + 1,
      isActive: cat.isActive ?? true,
    });
  }
  saveCategories(CATEGORIES);
}

export function registerProduct(product: Product) {
  const idx = PRODUCTS.findIndex((p) => p.id === product.id || (p.code && p.code === product.code));
  if (idx >= 0) {
    PRODUCTS[idx] = { ...PRODUCTS[idx], ...product };
  } else {
    PRODUCTS.unshift({
      ...product,
      codeGroup: product.codeGroup || "",
      price: product.price || 0,
      vatRate: product.vatRate || 20,
      order: product.order || 0,
      tags: product.tags || [],
      isActive: product.isActive ?? true,
    });
  }
  saveProducts(PRODUCTS);
}

export function unregisterProduct(id: string) {
  const idx = PRODUCTS.findIndex((p) => p.id === id);
  if (idx >= 0) {
    PRODUCTS.splice(idx, 1);
  }
  saveProducts(PRODUCTS);
}

export function unregisterCategory(id: string) {
  const idx = CATEGORIES.findIndex((c) => c.id === id || c.slug === id);
  if (idx >= 0) {
    CATEGORIES.splice(idx, 1);
  }
  saveCategories(CATEGORIES);
}

