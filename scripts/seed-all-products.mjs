import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, serverTimestamp, getDocs, collection, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARd2f0Fea3_3Rie1BdNqg-oiFDUnMQP7Y",
  authDomain: "project-6884460393570611503.firebaseapp.com",
  projectId: "project-6884460393570611503",
  storageBucket: "project-6884460393570611503.firebasestorage.app",
  messagingSenderId: "897409225916",
  appId: "1:897409225916:web:a982cd3bb5733befb22cb9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Category mapping matching seeded categories in Firestore
const CATEGORIES_MAP = {
  "suruplar": { id: "cat-1787620072902-12", name: "Şuruplar", slug: "suruplar" },
  "pureler": { id: "cat-1787620073244-13", name: "Püreler", slug: "pureler" },
  "waffle": { id: "cat-1787620070903-6", name: "Waffle", slug: "waffle" },
  "waffle-kek": { id: "cat-1787620071247-7", name: "Waffle Kek", slug: "waffle-kek" },
  "waffle-sos": { id: "cat-1787620071578-8", name: "Waffle Sos", slug: "waffle-sos" },
  "waffle-susleme": { id: "cat-1787620071918-9", name: "Waffle Süsleme", slug: "waffle-susleme" },
  "bar-sos": { id: "cat-1787620072589-11", name: "Bar Sos", slug: "bar-sos" },
  "cookies-kurabiye": { id: "cat-1787620070579-5", name: "Cookies - Kurabiye", slug: "cookies-kurabiye" },
  "donuk-pasta": { id: "cat-1787620068687-0", name: "Donuk Pasta", slug: "donuk-pasta" },
  "taze-pasta": { id: "cat-1787620069218-1", name: "Taze Pasta", slug: "taze-pasta" },
  "kahveler": { id: "cat-1787620073556-14", name: "Kahveler", slug: "kahveler" },
  "bitki-caylari": { id: "cat-1787620073977-15", name: "Bitki Çayları", slug: "bitki-caylari" },
};

export const ALL_PRODUCTS = [
  // ─── PT1 (Krater & DaVinci Püreler & Soslar) ─────────────
  {
    name: "Krater Çilekli Meyve Karışımı 1000g",
    code: "KRT-STR-1000",
    codeGroup: "Krater",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt1/pt1_1.png",
    description: "Profesyonel pastacılık ve dondurma üretimi için taze çilek aromalı yoğun meyveli karışım.",
    tags: ["Krater", "Çilek", "Püre", "Dondurma", "Meyveli Karışım"],
    specs: { "Hacim / Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Pasta, Dondurma, Frozen, Tatlı Sosu" },
    isFeatured: true
  },
  {
    name: "DaVinci Gourmet Orman Meyveleri Püresi 1000ml",
    code: "DVG-MXB-1000",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt1/pt1_2.png",
    description: "Yaban mersini, böğürtlen ve ahududu harmanı ile zenginleştirilmiş premium meyve püresi.",
    tags: ["DaVinci", "Orman Meyvesi", "Püre", "Smoothie", "Kokteyl"],
    specs: { "Hacim": "1000 ml", "Menşei": "Malezya / ABD", "Kullanım": "Smoothie, Frozen, Kokteyl, Pasta" },
    isFeatured: true
  },
  {
    name: "Krater Frambuaz & Ahududu Meyveli Karışım 1000g",
    code: "KRT-RAS-1000",
    codeGroup: "Krater",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt1/pt1_3.png",
    description: "Yoğun frambuaz lezzeti sunan, altın şişeli özel pastacılık ve dondurma sos & püre miksi.",
    tags: ["Krater", "Frambuaz", "Ahududu", "Püre", "Dondurma"],
    specs: { "Hacim / Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Pastacılık, Dondurma, Tatlı" }
  },
  {
    name: "Krater Kavun Meyveli Karışım 1000g",
    code: "KRT-MEL-1000",
    codeGroup: "Krater",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt1/pt1_4.png",
    description: "Yaz kavununun ferahlatıcı lezzetini tatlılarınıza ve frozen içeceklerinize taşıyan özel karışım.",
    tags: ["Krater", "Kavun", "Püre", "Frozen", "Dondurma"],
    specs: { "Hacim / Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "İçecek, Frozen, Dondurma" }
  },
  {
    name: "Krater Yeşil Elma Meyveli Karışım 1000g",
    code: "KRT-GAP-1000",
    codeGroup: "Krater",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt1/pt1_5.png",
    description: "Canlandırıcı ekşi yeşil elma aromasıyla pastacılık ve bar sunumları için ideal meyve harcı.",
    tags: ["Krater", "Yeşil Elma", "Püre", "Kokteyl", "Tatlı"],
    specs: { "Hacim / Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Frozen, Kokteyl, Pasta" }
  },
  {
    name: "DaVinci Gourmet Yoğunlaştırılmış Sütlü Sos (Condensed Milk) 2L",
    code: "DVG-CON-2000",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "bar-sos",
    imageUrl: "/resimler/pt1/pt1_6.png",
    description: "İspanyol ve Asya kahve tarifleri, latte ve pastalar için kremsi yoğunlaştırılmış süt lezzeti.",
    tags: ["DaVinci", "Süt Sosu", "Barista", "Kahve", "Sos"],
    specs: { "Hacim": "2 Litre", "Menşei": "Malezya", "Kullanım": "Kahve, Tatlı, Bubble Tea" }
  },
  {
    name: "Krater Şeftali Meyveli Karışım 1000g",
    code: "KRT-PEA-1000",
    codeGroup: "Krater",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt1/pt1_7.png",
    description: "Bursa şeftalisinin eşsiz kokusu ve tadını barındıran altın seri dondurma ve tatlı meyve miksi.",
    tags: ["Krater", "Şeftali", "Püre", "Dondurma", "Meyveli Karışım"],
    specs: { "Hacim / Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Dondurma, Tatlı, Frozen" }
  },
  {
    name: "DaVinci Gourmet Yoğunlaştırılmış Süt Sosu Barista Özel 2L",
    code: "DVG-CON-2001",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "bar-sos",
    imageUrl: "/resimler/pt1/pt1_8.png",
    description: "Karamelize süt notaları ile kahvelere ipeksi gövde ve tat kazandıran profesyonel barista sosu.",
    tags: ["DaVinci", "Condensed Milk", "Barista", "Sos"],
    specs: { "Hacim": "2 Litre", "Menşei": "Malezya", "Kullanım": "Latte, Frappe, Milkshake" }
  },
  {
    name: "DaVinci Gourmet Mango Meyve Püresi 1000ml",
    code: "DVG-MAN-1000",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt1/pt1_9.png",
    description: "Tropikal Alphonso mango lezzeti ile zenginleştirilmiş yoğun meyve konsantresi.",
    tags: ["DaVinci", "Mango", "Püre", "Tropikal", "Smoothie"],
    specs: { "Hacim": "1000 ml", "Menşei": "Malezya", "Kullanım": "Smoothie, Frozen, Kokteyl" },
    isFeatured: true
  },
  {
    name: "DaVinci Gourmet Çilek Meyve Püresi 1000ml",
    code: "DVG-STR-1000",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt1/pt1_10.png",
    description: "Gerçek çilek tanecikleri içeren, içecek ve tatlılarda renk ve koku patlaması yaratan püre.",
    tags: ["DaVinci", "Çilek", "Püre", "Smoothie", "Limonata"],
    specs: { "Hacim": "1000 ml", "Menşei": "Malezya", "Kullanım": "Çilekli Limonata, Frozen, Smoothie" }
  },

  // ─── PT2 (Caffè NONNO Frozen & DaVinci) ─────────────────
  {
    name: "Caffè NONNO Coconut (Hindistan Cevizi) Frozen 750ml",
    code: "NON-COC-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt2/pt2_1.png",
    description: "Yoğun tropikal hindistan cevizi aroması sunan sıkılabilir şişede frozen & kokteyl püresi.",
    tags: ["NONNO", "Coconut", "Hindistan Cevizi", "Frozen", "Püre"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye / İtalyan Formül", "Kullanım": "Frozen, Kokteyl, Frappe" },
    isFeatured: true
  },
  {
    name: "DaVinci Gourmet Passion Fruit (Çarkıfelek) Püresi 1000ml",
    code: "DVG-PAS-1000",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt2/pt2_2.png",
    description: "Egzotik çarkıfelek meyvesinin mayhoş ve aromatik lezzetini taşıyan gurme püre.",
    tags: ["DaVinci", "Passion Fruit", "Çarkıfelek", "Püre", "Kokteyl"],
    specs: { "Hacim": "1000 ml", "Menşei": "Malezya", "Kullanım": "Kokteyl, Frozen, Pasta Sosu" }
  },
  {
    name: "Caffè NONNO Watermelon (Karpuz) Frozen 750ml",
    code: "NON-WAT-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt2/pt2_3.png",
    description: "Ferahlatıcı yaz karpuzu aroması ile frozen, smoothie ve soğuk içecekler için mükemmel kıvam.",
    tags: ["NONNO", "Karpuz", "Watermelon", "Frozen", "Püre"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Frozen, Soğuk İçecek, Kokteyl" }
  },
  {
    name: "Caffè NONNO Red Forest (Orman Meyveleri) Frozen 750ml",
    code: "NON-RED-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt2/pt2_4.png",
    description: "Ahududu, böğürtlen ve frenk üzümü karışımı zengin orman meyveleri frozen püresi.",
    tags: ["NONNO", "Orman Meyvesi", "Red Forest", "Frozen", "Püre"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Smoothie, Frozen, Limonata" }
  },
  {
    name: "Caffè NONNO Melon (Kavun) Frozen 750ml",
    code: "NON-MEL-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt2/pt2_5.png",
    description: "Mis kokulu tatlı kavun aroması ile hazırlanmış profesyonel bar frozen meyve püre konsantresi.",
    tags: ["NONNO", "Kavun", "Melon", "Frozen", "İçecek"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Frozen, Kokteyl" }
  },
  {
    name: "Caffè NONNO Blackberry (Böğürtlen) Frozen 750ml",
    code: "NON-BLA-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt2/pt2_6.png",
    description: "Koyu renkli ve zengin böğürtlen lezzeti sunan gurme frozen püre.",
    tags: ["NONNO", "Böğürtlen", "Blackberry", "Frozen", "Püre"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Frozen, Milkshake, Tatlı" }
  },
  {
    name: "Caffè NONNO Strawberry (Çilek) Frozen 750ml",
    code: "NON-STR-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt2/pt2_7.png",
    description: "Doğal çilek püresi bazlı, hızlı ve pratik servis sağlayan ergonomik şişeli frozen püresi.",
    tags: ["NONNO", "Çilek", "Strawberry", "Frozen", "Püre"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Frozen, Çilekli Limonata, Kokteyl" }
  },
  {
    name: "Caffè NONNO Peach (Şeftali) Frozen 750ml",
    code: "NON-PEA-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt2/pt2_8.png",
    description: "İpeksi dokusu ve yoğun şeftali aroması ile buzlu içeceklerde tam uyum.",
    tags: ["NONNO", "Şeftali", "Peach", "Frozen", "Püre"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Ice Tea, Frozen, Kokteyl" }
  },
  {
    name: "Caffè NONNO Mango Frozen 750ml",
    code: "NON-MAN-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt2/pt2_9.png",
    description: "Egzotik mango meyvesinin en canlı hali ile tropikal bar reçeteleri için hazır püre.",
    tags: ["NONNO", "Mango", "Frozen", "Püre", "Tropikal"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Mango Frozen, Smoothie, Kokteyl" }
  },
  {
    name: "DaVinci Gourmet Orman Meyveleri Şişe Püre 1000ml",
    code: "DVG-MXB-1001",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt2/pt2_10.png",
    description: "DaVinci kalitesiyle üretilmiş, yüksek meyve oranına sahip orman meyveleri içecek ve pasta püresi.",
    tags: ["DaVinci", "Orman Meyvesi", "Püre", "Barista"],
    specs: { "Hacim": "1000 ml", "Menşei": "Malezya", "Kullanım": "İçecek ve Pastacılık" }
  },

  // ─── P3 (Caffè NONNO Cam Şişe Şuruplar) ──────────────────
  {
    name: "Caffè NONNO Karamel Şurubu 750ml",
    code: "NON-SYR-CAR-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p3/p3_1.png",
    description: "Kahveler, sıcak çikolatalar ve tatlılar için zengin tereyağlı karamel aromalı barista şurubu.",
    tags: ["NONNO", "Karamel", "Şurup", "Kahve", "Barista"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Latte, Cappuccino, Frappe, Tatlı" },
    isFeatured: true
  },
  {
    name: "Caffè NONNO Beyaz Çikolata Şurubu 750ml",
    code: "NON-SYR-WCH-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p3/p3_2.png",
    description: "Kremsi kakao yağı ve vanilya dokunuşlu beyaz çikolata lezzeti.",
    tags: ["NONNO", "Beyaz Çikolata", "Şurup", "Mocha"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "White Mocha, Sıcak İçecekler" }
  },
  {
    name: "Caffè NONNO Nane (Mint) Şurubu 750ml",
    code: "NON-SYR-MNT-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p3/p3_3.png",
    description: "Yeşil nane ferahlığı ile mocktail, kokteyl ve soğuk kahveler için canlandırıcı lezzet.",
    tags: ["NONNO", "Nane", "Mint", "Şurup", "Mojito"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Mojito, Limonata, Sıcak/Soğuk Çikolata" }
  },
  {
    name: "Caffè NONNO Frambuaz (Raspberry) Frozen 750ml",
    code: "NON-RAS-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "pureler",
    imageUrl: "/resimler/p3/p3_4.png",
    description: "Dengeli tatlı-ekşi profili ile frambuazlı içecek ve tatlı dekorlarında üstün performans.",
    tags: ["NONNO", "Frambuaz", "Frozen", "Püre"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Frozen, Smoothie, Tatlı" }
  },
  {
    name: "Caffè NONNO Limon & Misket Limonu Şurubu 750ml",
    code: "NON-SYR-LML-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p3/p3_5.png",
    description: "Akdeniz limonları ve taze lime notalarıyla canlandırıcı aromatik şurup.",
    tags: ["NONNO", "Limon", "Lime", "Şurup", "Limonata"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Limonata, Kokteyl, Soğuk Çay" }
  },
  {
    name: "Caffè NONNO Fındık (Hazelnut) Şurubu 750ml",
    code: "NON-SYR-HAZ-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p3/p3_6.png",
    description: "Kavrulmuş fındık aromasıyla espresso bazlı sütlü kahvelere mükemmel uyum.",
    tags: ["NONNO", "Fındık", "Hazelnut", "Şurup", "Kahve"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Hazelnut Latte, Americano, Frappe" },
    isFeatured: true
  },
  {
    name: "Caffè NONNO Orman Meyveleri Şurubu 750ml",
    code: "NON-SYR-WBR-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p3/p3_7.png",
    description: "Zengin orman meyveleri aroması ile mocktail ve aromalı latte yapımında ideal.",
    tags: ["NONNO", "Orman Meyvesi", "Şurup", "Kokteyl"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Kokteyl, Ice Tea, Soda" }
  },
  {
    name: "Caffè NONNO Lime (Misket Limonu) Şurubu 750ml",
    code: "NON-SYR-LIM-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p3/p3_8.png",
    description: "Narenciye kokteylleri ve Cool Lime içecekleri için vazgeçilmez zesty lezzet.",
    tags: ["NONNO", "Lime", "Misket Limonu", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Cool Lime, Mojito, Kokteyl" }
  },
  {
    name: "Caffè NONNO Vanilya (Vanilla) Şurubu 750ml",
    code: "NON-SYR-VAN-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p3/p3_9.png",
    description: "Madagaskar vanilya çekirdeği aromalı, kahvelerin klasik ve en popüler eşlikçisi.",
    tags: ["NONNO", "Vanilya", "Vanilla", "Şurup", "Kahve"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Vanilla Latte, Frappuccino, Tatlı" },
    isFeatured: true
  },
  {
    name: "Caffè NONNO Çikolata (Chocolate) Şurubu 750ml",
    code: "NON-SYR-CHO-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p3/p3_10.png",
    description: "Yoğun kakao tadıyla mocha, sıcak çikolata ve milkshake tariflerinde zengin lezzet.",
    tags: ["NONNO", "Çikolata", "Chocolate", "Şurup", "Mocha"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Caffè Mocha, Sıcak Çikolata, Frappe" }
  },

  // ─── P4 (DaVinci Gourmet Özel Şuruplar) ──────────────────
  {
    name: "DaVinci Gourmet Blue Ocean Aromalı Şurup 750ml",
    code: "DVG-SYR-BLU-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p4/p4_1.png",
    description: "Turunç kabuğu ve tropikal meyve notalı, büyüleyici mavi renkli ikonik kokteyl şurubu.",
    tags: ["DaVinci", "Blue Ocean", "Mavi Şurup", "Kokteyl", "Mocktail"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Blue Lagoon, Mocktail, Limonata" },
    isFeatured: true
  },
  {
    name: "DaVinci Gourmet Mixed Berry Aromalı Şurup 750ml",
    code: "DVG-SYR-MXB-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p4/p4_2.png",
    description: "Yaban mersini, böğürtlen ve ahududunun eşsiz dengesi ile mor yakut rengi sunumlar.",
    tags: ["DaVinci", "Mixed Berry", "Orman Meyvesi", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Ice Tea, Soda, Kokteyl" }
  },
  {
    name: "DaVinci Gourmet Lemon Tea (Limonlu Çay) Şurubu 750ml",
    code: "DVG-SYR-LTE-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p4/p4_3.png",
    description: "Siyah çay ekstraktı ve Akdeniz limonu ile saniyeler içinde taze Ice Tea hazırlama kolaylığı.",
    tags: ["DaVinci", "Lemon Tea", "Ice Tea", "Soğuk Çay", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Ice Tea, Soğuk İçecek" }
  },
  {
    name: "DaVinci Gourmet Classic Vanilla Şurubu 750ml",
    code: "DVG-SYR-VAN-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p4/p4_4.png",
    description: "Doğala özdeş vanilya aromasıyla kahvenin acılığını yumuşatan dünya lideri barista şurubu.",
    tags: ["DaVinci", "Vanilya", "Classic Vanilla", "Şurup", "Kahve"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Latte, Flat White, Frappe" },
    isFeatured: true
  },
  {
    name: "DaVinci Gourmet Sweet Orange (Tatlı Portakal) Şurubu 750ml",
    code: "DVG-SYR-ORA-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p4/p4_5.png",
    description: "Taze sıkılmış portakal tadında, meyve kokteylleri ve aromatik kahveler için özel reçete.",
    tags: ["DaVinci", "Portakal", "Sweet Orange", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Kokteyl, Mocktail, Orange Mocha" }
  },
  {
    name: "DaVinci Gourmet Menta Cubano (Küba Nanesi) Şurubu 750ml",
    code: "DVG-SYR-MNT-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p4/p4_6.png",
    description: "Küba nanesinin doğal ferahlığıyla otantik Mojito ve ferahlatıcı yaz içecekleri için formüle edilmiştir.",
    tags: ["DaVinci", "Menta Cubano", "Mojito", "Nane", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Mojito, Virgin Mojito, Limonata" }
  },
  {
    name: "DaVinci Gourmet Classic Strawberry (Çilek) Şurubu 750ml",
    code: "DVG-SYR-STR-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p4/p4_7.png",
    description: "Yaz çileğinin tatlı ve canlı aromasıyla milkshake, limonata ve kokteyllerinizde fark yaratır.",
    tags: ["DaVinci", "Çilek", "Strawberry", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Çilekli Süt, Limonata, Kokteyl" }
  },
  {
    name: "DaVinci Gourmet Peach Garden (Şeftali Bahçesi) Şurubu 750ml",
    code: "DVG-SYR-PEA-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p4/p4_8.png",
    description: "Olgun şeftali nektarı lezzeti ile soğuk çay ve kokteyller için gurme şurup.",
    tags: ["DaVinci", "Şeftali", "Peach", "Ice Tea", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Peach Ice Tea, Bellini, Mocktail" }
  },
  {
    name: "DaVinci Gourmet Classic Hazelnut (Kavrulmuş Fındık) Şurubu 750ml",
    code: "DVG-SYR-HAZ-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p4/p4_9.png",
    description: "Zengin kavrulmuş fındık profili, sütlü kahvelere derinlik ve mükemmel koku katar.",
    tags: ["DaVinci", "Fındık", "Hazelnut", "Barista", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Hazelnut Macchiato, Latte, Frappe" },
    isFeatured: true
  },
  {
    name: "DaVinci Gourmet Pecan Praline (Pekan Cevizi) Şurubu 750ml",
    code: "DVG-SYR-PEC-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p4/p4_10.png",
    description: "Karamelize pekan cevizi ve pralin lezzetiyle gurme kahveler için benzersiz imza lezzet.",
    tags: ["DaVinci", "Pekan Cevizi", "Pecan Praline", "Gurme", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Specialty Coffee, Latte, Tatlı" }
  },

  // ─── P5 (DaVinci Gourmet Şuruplar & Pompalı Soslar) ──────
  {
    name: "DaVinci Gourmet Classic Caramel Şurubu 750ml",
    code: "DVG-SYR-CAR-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p5/p5_1.png",
    description: "Dünyaca ünlü karamel formülü ile Caramel Macchiato ve Frappelerin vazgeçilmezi.",
    tags: ["DaVinci", "Karamel", "Caramel", "Barista", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Caramel Macchiato, Latte, Frappe" },
    isFeatured: true
  },
  {
    name: "DaVinci Gourmet Koyu Çikolata Şurubu 750ml",
    code: "DVG-SYR-DCH-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p5/p5_2.png",
    description: "Asil kakao çekirdeklerinden gelen yoğun bitter çikolata notaları.",
    tags: ["DaVinci", "Çikolata", "Dark Chocolate", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Dark Mocha, Sıcak Çikolata" }
  },
  {
    name: "DaVinci Gourmet Bittersweet Chocolate Pompalı Sos 2L",
    code: "DVG-SAU-BCH-2000",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "bar-sos",
    imageUrl: "/resimler/p5/p5_3.png",
    description: "2 litrelik profesyonel pompalı bidonda yoğun kıvamlı bitter çikolata sosu.",
    tags: ["DaVinci", "Bitter Çikolata", "Pompalı Sos", "Barista", "Sos"],
    specs: { "Hacim": "2 Litre", "Menşei": "Malezya", "Kullanım": "Mocha, Bardak Dekoru, Waffle, Dondurma" },
    isFeatured: true
  },
  {
    name: "DaVinci Gourmet Blueberry (Yaban Mersini) Şurubu 750ml",
    code: "DVG-SYR-BLB-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p5/p5_4.png",
    description: "Taze yabani mersin meyvesi aroması ile içeceklerde mor tonlar ve dengeli asidite.",
    tags: ["DaVinci", "Yaban Mersini", "Blueberry", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Blueberry Mojito, Limonata, Kokteyl" }
  },
  {
    name: "DaVinci Gourmet Roasted Almond (Kavrulmuş Badem) Şurubu 750ml",
    code: "DVG-SYR-ALM-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p5/p5_5.png",
    description: "Kavrulmuş Akdeniz bademi aromasıyla kahvelere zengin ve kremsi dokunuş.",
    tags: ["DaVinci", "Badem", "Roasted Almond", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Almond Latte, Kokteyl, Sıcak Kahveler" }
  },
  {
    name: "DaVinci Gourmet White Chocolate Şurubu 750ml",
    code: "DVG-SYR-WCH-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p5/p5_6.png",
    description: "Kakao yağı ve vanilyanın pürüzsüz uyumuyla White Chocolate Mocha şurubu.",
    tags: ["DaVinci", "Beyaz Çikolata", "White Chocolate", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "White Mocha, Sıcak İçecekler" }
  },
  {
    name: "DaVinci Gourmet Toffee Nut (Karamelli Fındık) Şurubu 750ml",
    code: "DVG-SYR-TOF-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p5/p5_7.png",
    description: "Karamel şekeri ve fındık tanelerinin fırınlanmış lezzeti ile kış kahvelerinin yıldızı.",
    tags: ["DaVinci", "Toffee Nut", "Karamelli Fındık", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Toffee Nut Latte, Frappe, Tatlı" },
    isFeatured: true
  },
  {
    name: "DaVinci Gourmet Coconut (Hindistan Cevizi) Şurubu 750ml",
    code: "DVG-SYR-COC-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p5/p5_8.png",
    description: "Egzotik hindistan cevizi sütü lezzeti, Pina Colada ve tropikal kahveler için.",
    tags: ["DaVinci", "Coconut", "Hindistan Cevizi", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Pina Colada, Coconut Latte, Kokteyl" }
  },
  {
    name: "DaVinci Gourmet Juicy Lime (Misket Limonu) Şurubu 750ml",
    code: "DVG-SYR-LIM-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p5/p5_9.png",
    description: "Taze sıkılmış yeşil misket limonu suyu aroması ile ferahlatıcı kokteyl ve soğuk içecek bazı.",
    tags: ["DaVinci", "Juicy Lime", "Misket Limonu", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Kokteyl, Cool Lime, Limonata" }
  },
  {
    name: "DaVinci Gourmet Spiced Chai Latte Şurubu 750ml",
    code: "DVG-SYR-CHA-750",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p5/p5_10.png",
    description: "Tarçın, karanfil, kakule ve zencefil baharatlarının siyah çay ile harmanlandığı otantik Chai şurubu.",
    tags: ["DaVinci", "Chai Tea", "Chai Latte", "Baharat", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Malezya", "Kullanım": "Chai Tea Latte, Iced Chai" },
    isFeatured: true
  },

  // ─── P6 (Monte Cristo & DaVinci 2L Soslar) ───────────────
  {
    name: "Monte Cristo Blue Curacao Dekor Sosu 750g",
    code: "MTC-SAU-BLU-750",
    codeGroup: "Monte Cristo",
    categoryKey: "bar-sos",
    imageUrl: "/resimler/p6/p6_1.png",
    description: "Sıkılabilir aplikatörlü şişede turunç aromalı büyüleyici mavi dekor ve bar sosu.",
    tags: ["Monte Cristo", "Blue Curacao", "Dekor Sosu", "Bar Sos"],
    specs: { "Gramaj": "750 g", "Menşei": "Türkiye", "Kullanım": "Bardak Dekoru, Dondurma, Waffle, Kokteyl" },
    isFeatured: true
  },
  {
    name: "Monte Cristo Blue Curacao Dekor Sosu (Varyant) 750g",
    code: "MTC-SAU-BLU-751",
    codeGroup: "Monte Cristo",
    categoryKey: "bar-sos",
    imageUrl: "/resimler/p6/p6_2.png",
    description: "Görsel sunumlarda akma yapmayan mükemmel kıvamlı mavi turunç sosu.",
    tags: ["Monte Cristo", "Blue Curacao", "Dekor Sos"],
    specs: { "Gramaj": "750 g", "Menşei": "Türkiye", "Kullanım": "Bardak Dekoru, Tatlı Sunumu" }
  },
  {
    name: "Monte Cristo Muz Aromalı Dekor Sosu 750g",
    code: "MTC-SAU-BAN-750",
    codeGroup: "Monte Cristo",
    categoryKey: "bar-sos",
    imageUrl: "/resimler/p6/p6_3.png",
    description: "Tatlı muz kokusu ve sarı rengiyle waffle, dondurma ve tatlı tabağı süslemelerinde ideal.",
    tags: ["Monte Cristo", "Muz", "Banana", "Dekor Sosu", "Waffle Sos"],
    specs: { "Gramaj": "750 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Krep, Dondurma, Tabak Dekoru" }
  },
  {
    name: "EASY MIX Orange Mango Kokteyl Miksi 1000ml",
    code: "EAS-ORM-1000",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p6/p6_4.png",
    description: "Taze portakal suyu ve Alphonso mango püresinin bir araya geldiği doğal kokteyl premiksi.",
    tags: ["EASY MIX", "Orange Mango", "Kokteyl", "Premix", "Püre"],
    specs: { "Hacim": "1000 ml", "Menşei": "Türkiye", "Kullanım": "Kokteyl, Mocktail, Frozen" }
  },
  {
    name: "EASY MIX Bodrum Mandalini Kokteyl Miksi 1000ml",
    code: "EAS-MAN-1000",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p6/p6_5.png",
    description: "Coğrafi işaretli Bodrum mandalinasının taze narenciye kokusunu kokteyllere taşıyan premiks.",
    tags: ["EASY MIX", "Bodrum Mandalinası", "Kokteyl", "Premix"],
    specs: { "Hacim": "1000 ml", "Menşei": "Türkiye", "Kullanım": "Mandalina Vurgulu Kokteyller, Limonata" },
    isFeatured: true
  },
  {
    name: "DaVinci Gourmet Cheesecake Aromalı Pompalı Sos 2L",
    code: "DVG-SAU-CHK-2000",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "bar-sos",
    imageUrl: "/resimler/p6/p6_6.png",
    description: "Gerçek New York cheesecake lezzetini içeceklere ve tatlılara katan kremsi barista sosu.",
    tags: ["DaVinci", "Cheesecake", "Pompalı Sos", "Barista"],
    specs: { "Hacim": "2 Litre", "Menşei": "Malezya", "Kullanım": "Frappe, Milkshake, Tatlı Üzeri" }
  },
  {
    name: "DaVinci Gourmet Beyaz Çikolata Pompalı Sos 2L",
    code: "DVG-SAU-WCH-2000",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "bar-sos",
    imageUrl: "/resimler/p6/p6_7.png",
    description: "Zengin kakao yağı içeriğiyle White Chocolate Mocha ve tatlılar için birinci sınıf sos.",
    tags: ["DaVinci", "Beyaz Çikolata", "White Chocolate", "Pompalı Sos"],
    specs: { "Hacim": "2 Litre", "Menşei": "Malezya", "Kullanım": "White Mocha, Waffle, Dondurma" },
    isFeatured: true
  },
  {
    name: "DaVinci Gourmet Karamel Pompalı Sos 2L",
    code: "DVG-SAU-CAR-2000",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "bar-sos",
    imageUrl: "/resimler/p6/p6_8.png",
    description: "Koyu altın rengi, akışkan parlak dokusu ve zengin tereyağlı karamel lezzeti.",
    tags: ["DaVinci", "Karamel", "Caramel Sauce", "Pompalı Sos"],
    specs: { "Hacim": "2 Litre", "Menşei": "Malezya", "Kullanım": "Caramel Macchiato, Bardak Süsleme, Tatlı" },
    isFeatured: true
  },
  {
    name: "DaVinci Gourmet Çikolata Pompalı Sos 2L",
    code: "DVG-SAU-CHO-2000",
    codeGroup: "DaVinci Gourmet",
    categoryKey: "bar-sos",
    imageUrl: "/resimler/p6/p6_9.png",
    description: "Sütlü ve bitter çikolata dengesi ile içecek ve waffle sunumları için endüstri standardı.",
    tags: ["DaVinci", "Çikolata", "Chocolate Sauce", "Pompalı Sos"],
    specs: { "Hacim": "2 Litre", "Menşei": "Malezya", "Kullanım": "Mocha, Milkshake, Waffle, Krep" },
    isFeatured: true
  },
  {
    name: "Monte Cristo Beyaz Çikolata Dekor Sosu 750g",
    code: "MTC-SAU-WCH-750",
    codeGroup: "Monte Cristo",
    categoryKey: "bar-sos",
    imageUrl: "/resimler/p6/p6_10.png",
    description: "İnce uçlu aplikatörü ile kahve köpüğü üzerine latte art ve tabak süslemesi için ideal.",
    tags: ["Monte Cristo", "Beyaz Çikolata", "Dekor Sosu", "Latte Art"],
    specs: { "Gramaj": "750 g", "Menşei": "Türkiye", "Kullanım": "Latte Art, Tabak Dekoru, Waffle" }
  },

  // ─── P7 (EASY MIX Kokteyl & Mocktail Premiksleri) ─────────
  {
    name: "EASY MIX Citrus Blend Kokteyl Miksi 1000ml",
    code: "EAS-CIT-1000",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p7/p7_1.png",
    description: "Greyfurt, portakal ve limonun dengeli asiditesi ile saniyeler içinde mükemmel narenciye kokteylleri.",
    tags: ["EASY MIX", "Citrus", "Narenciye", "Kokteyl", "Premix"],
    specs: { "Hacim": "1000 ml", "Menşei": "Türkiye", "Kullanım": "Kokteyl, Mocktail, Limonata" },
    isFeatured: true
  },
  {
    name: "EASY MIX Sorrel & Green Plum (Kuzukulağı & Erik) 1000ml",
    code: "EAS-SGP-1000",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p7/p7_2.png",
    description: "Taze yeşil erik ve kuzukulağının eşsiz ekşiliği ile imza bar menüleri için özel miks.",
    tags: ["EASY MIX", "Yeşil Erik", "Kuzukulağı", "İmza Kokteyl"],
    specs: { "Hacim": "1000 ml", "Menşei": "Türkiye", "Kullanım": "Gurme Kokteyller, Ekşi İçecekler" }
  },
  {
    name: "EASY MIX Pitaya / Dragon Fruit Kokteyl Miksi 1000ml",
    code: "EAS-PIT-1000",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p7/p7_3.png",
    description: "Canlı fuşya rengi ve egzotik pitaya aroması ile göz alıcı sunumlar.",
    tags: ["EASY MIX", "Pitaya", "Dragon Fruit", "Kokteyl", "Premix"],
    specs: { "Hacim": "1000 ml", "Menşei": "Türkiye", "Kullanım": "Tropikal Kokteyl, Mocktail, Frozen" },
    isFeatured: true
  },
  {
    name: "EASY MIX Cherry & Chocolate Kokteyl Miksi 500ml",
    code: "EAS-CCH-500",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p7/p7_4.png",
    description: "Koyu kiraz ve bitter çikolata notalarının lüks harmanı.",
    tags: ["EASY MIX", "Kiraz", "Çikolata", "Cherry Chocolate"],
    specs: { "Hacim": "500 ml", "Menşei": "Türkiye", "Kullanım": "Tatlı Kokteyller, Kahve Miksleri" }
  },
  {
    name: "EASY MIX Rooibos Peach Kokteyl Miksi 1000ml",
    code: "EAS-RPE-1000",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p7/p7_5.png",
    description: "Güney Afrika Rooibos çayı ve tatlı şeftali aromalı dinlendirici lezzet bazı.",
    tags: ["EASY MIX", "Rooibos", "Şeftali", "Ice Tea", "Kokteyl"],
    specs: { "Hacim": "1000 ml", "Menşei": "Türkiye", "Kullanım": "Ice Tea, Kokteyl, Mocktail" }
  },
  {
    name: "EASY MIX Vanilla Bourbon Kokteyl Miksi 1000ml",
    code: "EAS-VBO-1000",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p7/p7_6.png",
    description: "Doğal Bourbon vanilya aromasıyla tatlı ve sıcak kokteyl tabanları için ideal.",
    tags: ["EASY MIX", "Vanilla Bourbon", "Vanilya", "Kokteyl"],
    specs: { "Hacim": "1000 ml", "Menşei": "Türkiye", "Kullanım": "Kokteyl, Kahve, Mocktail" }
  },
  {
    name: "EASY MIX Passion Fruit & Vanilla Kokteyl Miksi 1000ml",
    code: "EAS-PFV-1000",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p7/p7_7.png",
    description: "Pornstar Martini ve egzotik içeceklerin vazgeçilmez çarkıfelek & vanilya eşleşmesi.",
    tags: ["EASY MIX", "Passion Fruit", "Vanilya", "Pornstar Martini"],
    specs: { "Hacim": "1000 ml", "Menşei": "Türkiye", "Kullanım": "Martini, Egzotik Kokteyl, Mocktail" },
    isFeatured: true
  },
  {
    name: "EASY MIX Passion Fruit & Mango Kokteyl Miksi 1000ml",
    code: "EAS-PFM-1000",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p7/p7_8.png",
    description: "Çarkıfelek ve mango meyvelerinin mükemmel tropikal füzyonu.",
    tags: ["EASY MIX", "Passion Fruit", "Mango", "Tropikal", "Miks"],
    specs: { "Hacim": "1000 ml", "Menşei": "Türkiye", "Kullanım": "Frozen, Smoothie, Kokteyl" }
  },
  {
    name: "EASY MIX Chili Mango Kokteyl Miksi 1000ml",
    code: "EAS-CHM-1000",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p7/p7_9.png",
    description: "Tatlı Alphonso mango lezzetinin hafif acı chili biber ile buluştuğu cesur miks.",
    tags: ["EASY MIX", "Chili Mango", "Acılı Mango", "Kokteyl"],
    specs: { "Hacim": "1000 ml", "Menşei": "Türkiye", "Kullanım": "Spicy Margarita, İmza Kokteyller" },
    isFeatured: true
  },
  {
    name: "EASY MIX Purple Basil (Mor Fesleğen) 1000ml",
    code: "EAS-PBA-1000",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p7/p7_10.png",
    description: "Taze mor fesleğen yapraklarından elde edilen aromatik, ferahlatıcı kokteyl bazı.",
    tags: ["EASY MIX", "Mor Fesleğen", "Purple Basil", "Botanik"],
    specs: { "Hacim": "1000 ml", "Menşei": "Türkiye", "Kullanım": "Cin-Tonik, Fesleğenli Limonata, Kokteyl" }
  },

  // ─── P8 (EASY MIX Meyve Miksleri & Caffè NONNO Şuruplar) ─
  {
    name: "Caffè NONNO Tiramisu Şurubu 750ml",
    code: "NON-SYR-TIR-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p8/p8_1.png",
    description: "İtalyan mascarpone ve kahve bisküvisi lezzetini fincana taşıyan özel şurup.",
    tags: ["NONNO", "Tiramisu", "Şurup", "İtalyan", "Kahve"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Tiramisu Latte, Soğuk Kahveler, Tatlı" },
    isFeatured: true
  },
  {
    name: "Caffè NONNO Toffee Nut Şurubu 750ml",
    code: "NON-SYR-TOF-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p8/p8_2.png",
    description: "Karamelize tereyağlı şeker ve fındık notalarıyla kış kahvelerinin vazgeçilmezi.",
    tags: ["NONNO", "Toffee Nut", "Karamel", "Fındık", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Toffee Nut Latte, Frappe" },
    isFeatured: true
  },
  {
    name: "Caffè NONNO Toffee Nut Barista Sunum Şişesi 750ml",
    code: "NON-SYR-TOF-751",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p8/p8_3.png",
    description: "Özel kavrulmuş fındık parçacıkları eşliğinde sunulan premium kahve şurubu.",
    tags: ["NONNO", "Toffee Nut", "Barista", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Kahve Barı, Sıcak İçecekler" }
  },
  {
    name: "EASY MIX Watermelon Margarita Kokteyl Miksi 500ml",
    code: "EAS-WMA-500",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p8/p8_4.png",
    description: "Taze karpuz ve misket limonu suyu harmanı ile tuzlu kenarlı bardakta eşsiz Margarita.",
    tags: ["EASY MIX", "Watermelon Margarita", "Karpuz", "Kokteyl"],
    specs: { "Hacim": "500 ml", "Menşei": "Türkiye", "Kullanım": "Margarita, Frozen, Mocktail" },
    isFeatured: true
  },
  {
    name: "EASY MIX Libido Spicy Berry Kokteyl Miksi 1000ml",
    code: "EAS-LIB-1000",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p8/p8_5.png",
    description: "Kırmızı orman meyveleri ve gizli baharat notalarıyla tutkulu imza kokteyl miksi.",
    tags: ["EASY MIX", "Libido", "Spicy Berry", "Kokteyl", "Premix"],
    specs: { "Hacim": "1000 ml", "Menşei": "Türkiye", "Kullanım": "İmza Kokteyller, Party Mix" }
  },
  {
    name: "EASY MIX Blue Ocean Kokteyl Miksi 500ml",
    code: "EAS-BLU-500",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p8/p8_6.png",
    description: "Turunçgiller ve tropikal meyvelerin masmavi deniz ferahlığıyla buluştuğu miks.",
    tags: ["EASY MIX", "Blue Ocean", "Mavi Kokteyl", "Mocktail"],
    specs: { "Hacim": "500 ml", "Menşei": "Türkiye", "Kullanım": "Blue Lagoon, Limonata, Kokteyl" }
  },
  {
    name: "EASY MIX Sweet Melon (Kavun) Kokteyl Miksi 1000ml",
    code: "EAS-MEL-1000",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p8/p8_7.png",
    description: "Tatlı olgun kavun lezzetiyle yaz kokteylleri ve ferahlatıcı mocktailler.",
    tags: ["EASY MIX", "Kavun", "Melon", "Kokteyl"],
    specs: { "Hacim": "1000 ml", "Menşei": "Türkiye", "Kullanım": "Frozen, Kokteyl, Soğuk İçecek" }
  },
  {
    name: "EASY MIX White Peach (Beyaz Şeftali) 1000ml",
    code: "EAS-WPE-1000",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p8/p8_8.png",
    description: "Zarif beyaz şeftali nektarı ile Bellini ve meyveli kokteyller için lüks temel.",
    tags: ["EASY MIX", "Beyaz Şeftali", "White Peach", "Bellini"],
    specs: { "Hacim": "1000 ml", "Menşei": "Türkiye", "Kullanım": "Bellini, Ice Tea, Kokteyl" }
  },
  {
    name: "EASY MIX Raspberry (Frambuaz) Miksi 500ml",
    code: "EAS-RAS-500",
    codeGroup: "EASY MIX",
    categoryKey: "pureler",
    imageUrl: "/resimler/p8/p8_9.png",
    description: "Doğal frambuaz meyvesi konsantresi ile pembe kokteyller ve ferah mocktailler.",
    tags: ["EASY MIX", "Frambuaz", "Raspberry", "Premix"],
    specs: { "Hacim": "500 ml", "Menşei": "Türkiye", "Kullanım": "Raspberry Mojito, Frozen, Limonata" }
  },
  {
    name: "Caffè NONNO Nar (Pomegranate) Şurubu 750ml",
    code: "NON-SYR-POM-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p8/p8_10.png",
    description: "Güneydoğu Anadolu narlarının mayhoş lezzeti ve yakut kırmızısı rengiyle.",
    tags: ["NONNO", "Nar", "Pomegranate", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Kokteyl, Soda, Soğuk Çay" }
  },
  {
    name: "Caffè NONNO Muz (Banana) Şurubu 750ml",
    code: "NON-SYR-BAN-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p8/p8_11.png",
    description: "Doğal muz aroması ile milkshake, frappe ve tropikal kokteyller için tatlı lezzet.",
    tags: ["NONNO", "Muz", "Banana", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Muzlu Süt, Milkshake, Kokteyl" }
  },

  // ─── P9 (CALLEI Çikolata & Waffle Süsleme Malzemeleri) ─────
  {
    name: "CALLEI Bitter Waffle & Krep Kreması 1000g",
    code: "CAL-BIT-1000",
    codeGroup: "CALLEI Chocolate",
    categoryKey: "waffle-sos",
    imageUrl: "/resimler/p9/p9_1.png",
    description: "Sıkılabilir şişede akışkan, donmayan %100 profesyonel bitter waffle ve krep çikolatası.",
    tags: ["CALLEI", "Bitter", "Waffle Çikolatası", "Waffle Sos", "Krep"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Krep, Pankek, Dondurma" },
    isFeatured: true
  },
  {
    name: "Renkli Pasta & Waffle Vermisel Süsü 1000g",
    code: "GUR-VER-1000",
    codeGroup: "20:45 Pastacılık",
    categoryKey: "waffle-susleme",
    imageUrl: "/resimler/p9/p9_2.png",
    description: "Rengarenk şekerleme vermiseller ile waffle, pasta ve dondurmalarınıza neşeli dokunuş.",
    tags: ["Waffle Süsleme", "Vermisel", "Pasta Süsü", "Renkli"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Pasta Dekoru, Donut" }
  },
  {
    name: "Karamel Bisküvi Krokan Parçacıkları 1000g",
    code: "GUR-KRO-1000",
    codeGroup: "20:45 Pastacılık",
    categoryKey: "waffle-susleme",
    imageUrl: "/resimler/p9/p9_3.png",
    description: "Çıtır fırınlanmış karamelli bisküvi parçacıkları ile waffle ve pastalara kıtırlık katın.",
    tags: ["Waffle Süsleme", "Krokan", "Bisküvi", "Karamel"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Dondurma, Pasta İçi" },
    isFeatured: true
  },
  {
    name: "Renkli Bonibon & Mini Drajeler 1000g",
    code: "GUR-BON-1000",
    codeGroup: "20:45 Pastacılık",
    categoryKey: "waffle-susleme",
    imageUrl: "/resimler/p9/p9_4.png",
    description: "Çikolata dolgulu çıtır şeker kaplı renkli bonibon draje süsleme.",
    tags: ["Waffle Süsleme", "Bonibon", "Draje", "Çikolata"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Krep, Çocuk Menüleri" }
  },
  {
    name: "Sütlü Damla Çikolata Parçacıkları 1000g",
    code: "GUR-DCH-1000",
    codeGroup: "20:45 Pastacılık",
    categoryKey: "waffle-susleme",
    imageUrl: "/resimler/p9/p9_5.png",
    description: "Isıya dayanıklı, kaliteli kakao yağı içeren sütlü damla çikolata.",
    tags: ["Waffle Süsleme", "Damla Çikolata", "Sütlü Çikolata", "Pasta"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Kek, Kurabiye, Dondurma" }
  },
  {
    name: "Renkli Çakıl Taşı Çikolata Süsleme 1000g",
    code: "GUR-CAK-1000",
    codeGroup: "20:45 Pastacılık",
    categoryKey: "waffle-susleme",
    imageUrl: "/resimler/p9/p9_6.png",
    description: "Gerçek çakıl taşı görünümünde renkli şeker kaplı sütlü çikolata draje.",
    tags: ["Waffle Süsleme", "Çakıl Taşı", "Draje", "Dekor"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle Dekoru, Tatlı Tabağı" }
  },
  {
    name: "Bitter Parça Damla Çikolata (%54 Kakao) 1000g",
    code: "GUR-BIT-1000",
    codeGroup: "20:45 Pastacılık",
    categoryKey: "waffle-susleme",
    imageUrl: "/resimler/p9/p9_7.png",
    description: "Gerçek bitter kakao kitlesi ile üretilmiş yoğun çikolata lezzeti.",
    tags: ["Waffle Süsleme", "Bitter Çikolata", "Damla Çikolata"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Kurabiye, Waffle, Kek İçi" }
  },
  {
    name: "Beyaz Çikolatalı Pirinç Patlağı 1000g",
    code: "GUR-PAT-1000",
    codeGroup: "20:45 Pastacılık",
    categoryKey: "waffle-susleme",
    imageUrl: "/resimler/p9/p9_8.png",
    description: "Hafif ve çıtır pirinç patlaklarının fildişi beyaz çikolata ile kaplanmış hali.",
    tags: ["Waffle Süsleme", "Pirinç Patlağı", "Beyaz Çikolata", "Çıtır"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Dondurma, Pasta Süsü" }
  },
  {
    name: "CALLEI Profesyonel Waffle Tozu (Waffle Mix) 10kg",
    code: "CAL-MIX-10000",
    codeGroup: "CALLEI Chocolate",
    categoryKey: "waffle-kek",
    imageUrl: "/resimler/p9/p9_9.png",
    description: "Su ve yağ ile kolayca hazırlanan, dışı altın sarısı çıtır, içi yumuşacık Belçika usulü waffle harcı.",
    tags: ["CALLEI", "Waffle Tozu", "Waffle Mix", "Belçika Waffle", "Waffle Kek"],
    specs: { "Gramaj": "10 kg Torba / 1 kg Paket", "Menşei": "Türkiye", "Kullanım": "Waffle Makineleri, Krep" },
    isFeatured: true
  },
  {
    name: "Kavrulmuş Giresun Fındık Krokan Parçaları 1000g",
    code: "GUR-FND-1000",
    codeGroup: "20:45 Pastacılık",
    categoryKey: "waffle-susleme",
    imageUrl: "/resimler/p9/p9_10.png",
    description: "Karamelize edilmiş taze Giresun fındık parçacıkları ile eşsiz lezzet ve çıtırlık.",
    tags: ["Waffle Süsleme", "Fındık Krokan", "Giresun Fındığı", "Pasta"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Pasta İçi/Dışı, Dondurma" }
  },

  // ─── P10 (CALLEI Gurme Aromalı Waffle Kremaları) ─────────
  {
    name: "CALLEI Speculoos Karamel & Bisküvili Waffle Kreması 1000g",
    code: "CAL-SPE-1000",
    codeGroup: "CALLEI Chocolate",
    categoryKey: "waffle-sos",
    imageUrl: "/resimler/p10/p10_1.png",
    description: "Orijinal Belçika Speculoos bisküvisi ve tereyağlı karamel aromalı sıkılabilir waffle kreması.",
    tags: ["CALLEI", "Speculoos", "Bisküvi Kreması", "Karamel", "Waffle Sos"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Krep, Kruvasan Dolgusu" },
    isFeatured: true
  },
  {
    name: "CALLEI Çilekli Pembe Waffle Kreması 1000g",
    code: "CAL-STR-1000",
    codeGroup: "CALLEI Chocolate",
    categoryKey: "waffle-sos",
    imageUrl: "/resimler/p10/p10_2.png",
    description: "Doğal çilek aromalı pembe renkli akışkan waffle ve tatlı kreması.",
    tags: ["CALLEI", "Çilekli Krema", "Pembe Çikolata", "Waffle Sos"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Krep, Dondurma" }
  },
  {
    name: "CALLEI Beyaz Çikolatalı Waffle Kreması 1000g",
    code: "CAL-WCH-1000",
    codeGroup: "CALLEI Chocolate",
    categoryKey: "waffle-sos",
    imageUrl: "/resimler/p10/p10_3.png",
    description: "İpeksi dokuda akışkan beyaz çikolata kreması. Isıtma gerektirmeden direkt uygulanır.",
    tags: ["CALLEI", "Beyaz Çikolata", "Waffle Kreması", "Waffle Sos"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Pankek, Krep" },
    isFeatured: true
  },
  {
    name: "CALLEI Sütlü Çikolatalı Waffle Kreması 1000g",
    code: "CAL-MLK-1000",
    codeGroup: "CALLEI Chocolate",
    categoryKey: "waffle-sos",
    imageUrl: "/resimler/p10/p10_4.png",
    description: "Enfes sütlü çikolata tadı ile waffle tutkunlarının en çok tercih ettiği klasik sos.",
    tags: ["CALLEI", "Sütlü Çikolata", "Waffle Sos", "Krema"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Krep, Churros" },
    isFeatured: true
  },
  {
    name: "CALLEI Frambuazlı Ruby Waffle Kreması 1000g",
    code: "CAL-RUB-1000",
    codeGroup: "CALLEI Chocolate",
    categoryKey: "waffle-sos",
    imageUrl: "/resimler/p10/p10_5.png",
    description: "Fuşya rengi ve taze frambuaz aromasıyla göz kamaştıran gurme waffle kreması.",
    tags: ["CALLEI", "Frambuaz", "Ruby", "Waffle Sos"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Pasta Dekoru, Krep" }
  },
  {
    name: "CALLEI Bubble Gum Sakız Aromalı Mavi Waffle Kreması 1000g",
    code: "CAL-BUB-1000",
    codeGroup: "CALLEI Chocolate",
    categoryKey: "waffle-sos",
    imageUrl: "/resimler/p10/p10_6.png",
    description: "Göz alıcı mavi rengi ve nostaljik sakız kokusuyla çocukların ve gençlerin favorisi.",
    tags: ["CALLEI", "Bubble Gum", "Sakız Aromalı", "Mavi Krema", "Waffle"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Dondurma, Donut" }
  },
  {
    name: "CALLEI Antep Fıstıklı Waffle Kreması 1000g",
    code: "CAL-PIS-1000",
    codeGroup: "CALLEI Chocolate",
    categoryKey: "waffle-sos",
    imageUrl: "/resimler/p10/p10_7.png",
    description: "Hakiki Antep fıstığı püresi içeren lüks yeşil renkli akışkan waffle kreması.",
    tags: ["CALLEI", "Antep Fıstığı", "Pistachio", "Waffle Sos", "Krema"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Kruvasan, Dubai Çikolatası, Krep" },
    isFeatured: true
  },
  {
    name: "CALLEI Portakallı Waffle & Krep Kreması 1000g",
    code: "CAL-ORA-1000",
    codeGroup: "CALLEI Chocolate",
    categoryKey: "waffle-sos",
    imageUrl: "/resimler/p10/p10_8.png",
    description: "Portakal kabuğu esansı ve çikolatanın ferahlatıcı narenciye uyumu.",
    tags: ["CALLEI", "Portakal", "Orange", "Waffle Sos"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Waffle, Krep, Tatlı Dekoru" }
  },

  // ─── PT11 (Gurme Kurabiyeler & Caffè NONNO Şuruplar) ─────
  {
    name: "20:45 Çörekotlu & Susamlı Mini Tuzlu Kurabiye Topu",
    code: "GUR-KUR-TUZ-01",
    codeGroup: "20:45 Pastacılık",
    categoryKey: "cookies-kurabiye",
    imageUrl: "/resimler/pt11/pt11_1.png",
    description: "Hakiki tereyağı ile yoğrulmuş, ağızda kum gibi dağılan geleneksel susamlı çörekotlu tuzlu kurabiye.",
    tags: ["Kurabiye", "Tuzlu Kurabiye", "Çörekotlu", "Susamlı", "El Yapımı"],
    specs: { "Porsiyon": "Tekli / Kilo İle", "Menşei": "Türkiye / 20:45 Atölye", "Kullanım": "Çay Saati, Kahve Yanı, İkramlık" },
    isFeatured: true
  },
  {
    name: "20:45 Çörekotlu & Susamlı Gurme Tuzlu Kurabiye Tabağı (1kg)",
    code: "GUR-KUR-TUZ-1000",
    codeGroup: "20:45 Pastacılık",
    categoryKey: "cookies-kurabiye",
    imageUrl: "/resimler/pt11/pt11_2.png",
    description: "Pastane ve kafeler için toplu servis tepsisinde günlük taze üretilen tuzlu kurabiye.",
    tags: ["Kurabiye", "Tuzlu Kurabiye", "Toplu Sipariş", "B2B"],
    specs: { "Gramaj": "1000 g Kutu / Tepsi", "Menşei": "Türkiye", "Kullanım": "Kafe Menüsü, Toplu İkram" }
  },
  {
    name: "Caffè NONNO Pineapple (Ananas) Frozen 750ml",
    code: "NON-PIN-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt11/pt11_3.png",
    description: "Tropikal ananas meyvesinin sulu ve tatlı lezzeti ile buzlu içeceklerde tam kıvam.",
    tags: ["NONNO", "Ananas", "Pineapple", "Frozen", "Püre"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Frozen, Smoothie, Kokteyl" }
  },
  {
    name: "Caffè NONNO Cool Lime Aromalı Şurup 750ml",
    code: "NON-SYR-CLM-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/pt11/pt11_4.png",
    description: "Nane ve yeşil limon ekstraktları ile popüler Cool Lime içeceğini pratik hazırlama bazı.",
    tags: ["NONNO", "Cool Lime", "Misket Limonu", "Şurup", "Soğuk İçecek"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Cool Lime, Ferahlatıcı İçecekler" },
    isFeatured: true
  },
  {
    name: "Caffè NONNO Chocolate Cookie (Çikolatalı Kurabiye) Şurubu 750ml",
    code: "NON-SYR-CKI-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "suruplar",
    imageUrl: "/resimler/pt11/pt11_5.png",
    description: "Fırından yeni çıkmış çikolata parçacıklı kurabiye kokusunu kahvelerinize ekleyin.",
    tags: ["NONNO", "Chocolate Cookie", "Kurabiye Şurubu", "Kahve"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Cookie Latte, Frappe, Milkshake" }
  },
  {
    name: "Caffè NONNO Yeşil Elma (Green Apple) Frozen 750ml",
    code: "NON-GAP-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt11/pt11_6.png",
    description: "Canlandırıcı ekşi Granny Smith elması aroması ile frozen içeceklerde popüler lezzet.",
    tags: ["NONNO", "Yeşil Elma", "Green Apple", "Frozen"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Elmalı Frozen, Smoothie, Kokteyl" }
  },
  {
    name: "Caffè NONNO Banana (Muz) Frozen 750ml",
    code: "NON-BAN-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt11/pt11_7.png",
    description: "Kremsi kıvamlı muz püresi bazı ile smoothie ve frozen yapımında üstün performans.",
    tags: ["NONNO", "Muz", "Banana", "Frozen", "Püre"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Muzlu Frozen, Smoothie, Milkshake" }
  },
  {
    name: "20:45 Pudra Şekerli Fındıklı Un Kurabiyesi Tabağı (1kg)",
    code: "GUR-KUR-FIN-1000",
    codeGroup: "20:45 Pastacılık",
    categoryKey: "cookies-kurabiye",
    imageUrl: "/resimler/pt11/pt11_8.png",
    description: "Kavrulmuş fındık parçalı, bol pudra şekerli geleneksel enfes un kurabiyesi.",
    tags: ["Kurabiye", "Un Kurabiyesi", "Fındıklı", "Tatlı Kurabiye"],
    specs: { "Gramaj": "1000 g Kutu", "Menşei": "Türkiye", "Kullanım": "Kahve Eşlikçisi, Tatlı Büfesi" },
    isFeatured: true
  },
  {
    name: "Caffè NONNO Yeşil Elma Frozen Barista Seri 750ml",
    code: "NON-GAP-751",
    codeGroup: "Caffè NONNO",
    categoryKey: "pureler",
    imageUrl: "/resimler/pt11/pt11_9.png",
    description: "Ekstra meyve aromalı yeşil elma frozen püresi.",
    tags: ["NONNO", "Yeşil Elma", "Frozen"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Frozen ve Kokteyller" }
  },
  {
    name: "20:45 Pudra Şekerli Gurme Fındıklı Kurabiye Topu",
    code: "GUR-KUR-FIN-01",
    codeGroup: "20:45 Pastacılık",
    categoryKey: "cookies-kurabiye",
    imageUrl: "/resimler/pt11/pt11_10.png",
    description: "Ağızda eriyen kıvamı ve yoğun fındık lezzeti ile gurme tekli porsiyon un kurabiyesi.",
    tags: ["Kurabiye", "Un Kurabiyesi", "Fındıklı Kurabiye"],
    specs: { "Porsiyon": "Tekli Sunum", "Menşei": "Türkiye", "Kullanım": "Kahve Yanı İkramı" }
  },

  // ─── P12 (Monte Cristo Şuruplar & Krater/NONNO) ──────────
  {
    name: "Caffè NONNO Passion Fruit Frozen Barista Şişe 750ml",
    code: "NON-PAS-751",
    codeGroup: "Caffè NONNO",
    categoryKey: "pureler",
    imageUrl: "/resimler/p12/p12_1.png",
    description: "Çarkıfelek meyvesinin tropikal lezzeti ve göz alıcı rengi ile profesyonel bar çözümü.",
    tags: ["NONNO", "Passion Fruit", "Çarkıfelek", "Frozen", "Püre"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Frozen, Kokteyl, Smoothie" }
  },
  {
    name: "Monte Cristo Balkabağı & Baharat (Pumpkin Spice) Şurubu 750ml",
    code: "MTC-SYR-PUM-750",
    codeGroup: "Monte Cristo",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p12/p12_2.png",
    description: "Fırınlanmış balkabağı, tarçın, zencefil ve hindistan cevizi baharatlarıyla efsanevi Pumpkin Spice Latte.",
    tags: ["Monte Cristo", "Pumpkin Spice", "Balkabağı", "Latte", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye / Efesli Gıda", "Kullanım": "Pumpkin Spice Latte, Sıcak İçecekler" },
    isFeatured: true
  },
  {
    name: "Monte Cristo Speculoos Bisküvi Şurubu 750ml",
    code: "MTC-SYR-SPE-750",
    codeGroup: "Monte Cristo",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p12/p12_3.png",
    description: "Baharatlı Belçika bisküvisi Speculoos aromalı tatlı ve doyurucu gurme şurup.",
    tags: ["Monte Cristo", "Speculoos", "Bisküvi", "Şurup", "Kahve"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Speculoos Latte, Frappe, Milkshake" },
    isFeatured: true
  },
  {
    name: "Caffè NONNO Kiwi (Kivi) Frozen 750ml",
    code: "NON-KIW-750",
    codeGroup: "Caffè NONNO",
    categoryKey: "pureler",
    imageUrl: "/resimler/p12/p12_4.png",
    description: "Taze kivi çekirdekleri dokusu ve canlı yeşil rengi ile buzlu içeceklerde tam lezzet.",
    tags: ["NONNO", "Kivi", "Kiwi", "Frozen", "Püre"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Kivili Frozen, Kokteyl, Smoothie" }
  },
  {
    name: "Krater Yeşil Elma Meyveli Karışım (Beyaz Şişe) 1000g",
    code: "KRT-GAP-1001",
    codeGroup: "Krater",
    categoryKey: "pureler",
    imageUrl: "/resimler/p12/p12_5.png",
    description: "Doğal yeşil elma özü ile dondurma ve tatlılarda üstün aroma ve parlaklık.",
    tags: ["Krater", "Yeşil Elma", "Püre", "Dondurma"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Dondurma, Pasta, Frozen" }
  },
  {
    name: "Krater Ananas Meyveli Karışım (Beyaz Şişe) 1000g",
    code: "KRT-PIN-1000",
    codeGroup: "Krater",
    categoryKey: "pureler",
    imageUrl: "/resimler/p12/p12_6.png",
    description: "Güneşte olgunlaşmış tropikal ananas aromalı özel pastacılık meyveli sosu.",
    tags: ["Krater", "Ananas", "Pineapple", "Püre", "Dondurma"],
    specs: { "Gramaj": "1000 g", "Menşei": "Türkiye", "Kullanım": "Pastacılık, Dondurma, Tatlı" }
  },
  {
    name: "Monte Cristo Badem (Almond) Şurubu 750ml",
    code: "MTC-SYR-ALM-750",
    codeGroup: "Monte Cristo",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p12/p12_7.png",
    description: "Doğal badem özü ve hafif acıbadem dokunuşlu geleneksel Orgeat & kahve şurubu.",
    tags: ["Monte Cristo", "Badem", "Almond", "Şurup", "Orgeat"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Mai Tai Kokteyl, Bademli Latte, Soğuk Kahve" }
  },
  {
    name: "Monte Cristo Chai Tea Baharatlı Çay Şurubu 750ml",
    code: "MTC-SYR-CHA-750",
    codeGroup: "Monte Cristo",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p12/p12_8.png",
    description: "Doğu baharatları (tarçın, zencefil, kakule) ile sütlü Chai Tea Latte için yoğun konsantre.",
    tags: ["Monte Cristo", "Chai Tea", "Baharat", "Şurup"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Chai Latte, Sıcak Baharatlı İçecekler" },
    isFeatured: true
  },
  {
    name: "Monte Cristo Antep Fıstığı (Pistachio) Şurubu 750ml",
    code: "MTC-SYR-PIS-750",
    codeGroup: "Monte Cristo",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p12/p12_9.png",
    description: "Güneydoğu nun meşhur Antep fıstığı aromasıyla kahvelere zengin lezzet ve fıstık yeşili renk.",
    tags: ["Monte Cristo", "Antep Fıstığı", "Pistachio", "Şurup", "Dubai"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Pistachio Latte, Frappe, Tatlı" },
    isFeatured: true
  },
  {
    name: "Monte Cristo Çikolata (Chocolate) Şurubu 750ml",
    code: "MTC-SYR-CHO-750",
    codeGroup: "Monte Cristo",
    categoryKey: "suruplar",
    imageUrl: "/resimler/p12/p12_10.png",
    description: "Yoğun kakao aroması ile kahve ve sıcak içeceklerde pürüzsüz çikolata dokunuşu.",
    tags: ["Monte Cristo", "Çikolata", "Chocolate", "Şurup", "Mocha"],
    specs: { "Hacim": "750 ml", "Menşei": "Türkiye", "Kullanım": "Mocha, Sıcak Çikolata, Milkshake" }
  }
];

export const BRANDS_DATA = [
  { name: "DaVinci Gourmet", subtitle: "Dünya Standartlarında Barista Şurupları & Püreler", order: 1, targetUrl: "/katalog?search=davinci", imageUrl: "", isActive: true },
  { name: "Caffè NONNO", subtitle: "İtalyan Reçeteli Kahve Şurupları & Frozen Püreleri", order: 2, targetUrl: "/katalog?search=nonno", imageUrl: "", isActive: true },
  { name: "Monte Cristo", subtitle: "Gurme Bar Şurupları & Profesyonel Dekor Sosları", order: 3, targetUrl: "/katalog?search=monte-cristo", imageUrl: "", isActive: true },
  { name: "CALLEI Chocolate", subtitle: "Waffle, Krep & Dondurma Çikolata Kremaları & Waffle Mix", order: 4, targetUrl: "/katalog?search=callei", imageUrl: "", isActive: true },
  { name: "EASY MIX Premixes", subtitle: "Doğal Meyve & Botanik Kokteyl Premiksleri", order: 5, targetUrl: "/katalog?search=easy%20mix", imageUrl: "", isActive: true },
  { name: "Krater", subtitle: "Maestro del Gelato Pastacılık & Dondurma Meyve Karışımları", order: 6, targetUrl: "/katalog?search=krater", imageUrl: "", isActive: true }
];

async function seed() {
  console.log("Seeding brands...");
  const brandSnap = await getDocs(collection(db, "brands"));
  for (const docSnap of brandSnap.docs) {
    await deleteDoc(doc(db, "brands", docSnap.id));
  }
  for (let i = 0; i < BRANDS_DATA.length; i++) {
    const b = BRANDS_DATA[i];
    const id = `brand-${i + 1}`;
    await setDoc(doc(db, "brands", id), {
      ...b,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log(`✓ Brand: ${b.name}`);
  }

  console.log(`\nSeeding ${ALL_PRODUCTS.length} products...`);
  const prodSnap = await getDocs(collection(db, "products"));
  for (const docSnap of prodSnap.docs) {
    await deleteDoc(doc(db, "products", docSnap.id));
  }

  for (let i = 0; i < ALL_PRODUCTS.length; i++) {
    const p = ALL_PRODUCTS[i];
    const cat = CATEGORIES_MAP[p.categoryKey] || CATEGORIES_MAP["suruplar"];
    const id = `prod-${p.code.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${i + 1}`;

    const productDoc = {
      name: p.name,
      code: p.code,
      codeGroup: p.codeGroup,
      categoryId: cat.id,
      categoryName: cat.name,
      categorySlug: cat.slug,
      price: 0,
      vatRate: 20,
      order: i + 1,
      description: p.description,
      imageUrl: p.imageUrl,
      isActive: true,
      isFeatured: p.isFeatured || false,
      tags: p.tags,
      specs: p.specs || {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, "products", id), productDoc);
    console.log(`[${i + 1}/${ALL_PRODUCTS.length}] ✓ ${p.name} (${cat.name})`);
  }

  console.log("\n🎉 All products and brands successfully seeded into Firestore!");
}

seed().catch(console.error);
