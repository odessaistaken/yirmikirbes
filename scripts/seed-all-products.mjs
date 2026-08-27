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
  {
    "name": "Caffè NONNO Caramel Aromalı Şurup 750ml",
    "code": "NON-CAR-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p3/p3_1.png",
    "description": "Kahveler, sıcak ve soğuk içecekler için zengin ve kremsi karamel aromalı premium bar şurubu.",
    "tags": [
      "Caffè NONNO",
      "Karamel",
      "Şurup",
      "Kahve",
      "Barista"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Sıcak/Soğuk Kahve, Latte, Kokteyl",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Caffè NONNO Mint Aromalı Nane Şurubu 750ml",
    "code": "NON-MNT-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p3/p3_2.png",
    "description": "Ferahlatıcı nane lezzetiyle kokteyller, limonatalar ve soğuk içecekler için ferahlatıcı şurup.",
    "tags": [
      "Caffè NONNO",
      "Nane",
      "Mint",
      "Şurup",
      "Limonata",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Kokteyl, Mocktail, Limonata",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Raspberry Frozen Frambuaz Püresi 750ml",
    "code": "NON-RAS-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p3/p3_3.png",
    "description": "Taze frambuaz tanelerinin yoğun lezzetini içeren özel akışkan kapaklı frozen ve smoothie püresi.",
    "tags": [
      "Caffè NONNO",
      "Frambuaz",
      "Ahududu",
      "Püre",
      "Frozen",
      "Smoothie"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Frozen, Smoothie, Kokteyl, Pasta",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Caffè NONNO Mojito Aromalı Şurup 750ml",
    "code": "NON-MOJ-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p3/p3_4.png",
    "description": "Misket limonu ve taze nane uyumuyla mükemmel alkolsüz mojito ve kokteyl hazırlama şurubu.",
    "tags": [
      "Caffè NONNO",
      "Mojito",
      "Lime",
      "Şurup",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Mojito, Kokteyl, Mocktail",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Hazelnut Fındık Aromalı Şurup 750ml",
    "code": "NON-HAZ-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p3/p3_5.png",
    "description": "Kavrulmuş fındık aromasıyla kahve ve sıcak çikolatalarınıza derinlik katan lezzet şurubu.",
    "tags": [
      "Caffè NONNO",
      "Fındık",
      "Hazelnut",
      "Şurup",
      "Kahve",
      "Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Espresso, Latte, Sıcak Çikolata",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Caffè NONNO Cool Berry Orman Meyveleri Şurubu 750ml",
    "code": "NON-CBR-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p3/p3_6.png",
    "description": "Böğürtlen, çilek ve yaban mersini aromalarının buzlu ferahlatıcı lezzet şurubu.",
    "tags": [
      "Caffè NONNO",
      "Cool Berry",
      "Orman Meyvesi",
      "Şurup",
      "İçecek"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Cool Berry, Buzlu İçecek, Soda",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Cool Lime Misket Limonu Şurubu 750ml",
    "code": "NON-CLM-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p3/p3_7.png",
    "description": "Yaz aylarının vazgeçilmezi buzlu Cool Lime içecekleri için özel formül konsantre şurup.",
    "tags": [
      "Caffè NONNO",
      "Cool Lime",
      "Misket Limonu",
      "Şurup",
      "Refresher"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Cool Lime, Buzlu İçecek, Mocktail",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Caffè NONNO Vanilla Vanilya Aromalı Şurup 750ml",
    "code": "NON-VAN-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p3/p3_8.png",
    "description": "Doğal Madagaskar vanilyası notalarıyla kahve ve tatlı tariflerini zenginleştiren klasik şurup.",
    "tags": [
      "Caffè NONNO",
      "Vanilya",
      "Vanilla",
      "Şurup",
      "Kahve",
      "Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Vanilla Latte, Frappe, Tatlı",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Chocolate Çikolata Aromalı Şurup 750ml",
    "code": "NON-CHO-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p3/p3_9.png",
    "description": "Yoğun kakao aroması ile mocha, sıcak çikolata ve milkshake yapımı için özel lezzet şurubu.",
    "tags": [
      "Caffè NONNO",
      "Çikolata",
      "Chocolate",
      "Şurup",
      "Mocha",
      "Frappe"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Mocha, Milkshake, Sıcak Çikolata",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO White Chocolate Beyaz Çikolata Şurubu 750ml",
    "code": "NON-WCH-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p3/p3_10.png",
    "description": "Kremsi beyaz çikolata lezzeti sunan White Mocha ve özel içecekler için gurme şurup.",
    "tags": [
      "Caffè NONNO",
      "Beyaz Çikolata",
      "White Mocha",
      "Şurup",
      "Kahve"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "White Mocha, Kahve, Milkshake",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Blue Ocean Aromalı Şurup 750ml",
    "code": "DVG-BOC-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p4/p4_1.png",
    "description": "Tropikal portakal ve narenciye dokunuşlarıyla egzotik mavi kokteyller için DaVinci Blue Ocean.",
    "tags": [
      "DaVinci Gourmet",
      "Blue Ocean",
      "Mavi Portakal",
      "Şurup",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Mocktail, Kokteyl, Limonata",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "DaVinci Gourmet Lemon Tea Aromalı Şurup 750ml",
    "code": "DVG-LTE-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p4/p4_2.png",
    "description": "Geleneksel demlenmiş çay ve ferahlatıcı limon lezzetini bir araya getiren gurme buzlu çay şurubu.",
    "tags": [
      "DaVinci Gourmet",
      "Limon Çayı",
      "Ice Tea",
      "Şurup",
      "Soğuk Çay"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Ice Tea, Soğuk İçecek",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Classic Vanilla Aromalı Şurup 750ml",
    "code": "DVG-VAN-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p4/p4_3.png",
    "description": "Dünya standartlarında saf vanilya çekirdeği aroması sunan DaVinci Classic Vanilla şurubu.",
    "tags": [
      "DaVinci Gourmet",
      "Vanilla",
      "Vanilya",
      "Şurup",
      "Kahve",
      "Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Kahve, Latte, Cappuccino, Frappe",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "DaVinci Gourmet Shortbread Cookies Aromalı Şurup 750ml",
    "code": "DVG-SBC-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p4/p4_4.png",
    "description": "Taze fırından çıkmış tereyağlı İskoç kurabiyesi lezzeti sunan özel DaVinci kurabiye şurubu.",
    "tags": [
      "DaVinci Gourmet",
      "Kurabiye",
      "Shortbread Cookies",
      "Şurup",
      "Kahve"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Latte, Frappe, Milkshake",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Menta Cubano Aromalı Şurup 750ml",
    "code": "DVG-MCU-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p4/p4_1.png",
    "description": "Küba nanesinin doğal ferahlığıyla hazırlanan otantik mojito ve kokteyl şurubu.",
    "tags": [
      "DaVinci Gourmet",
      "Menta Cubano",
      "Nane",
      "Mojito",
      "Şurup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Mojito, Kokteyl, Soda",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Classic Strawberry Çilek Şurubu 750ml",
    "code": "DVG-STR-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p4/p4_6.png",
    "description": "Olgun bahçe çileklerinin tatlı ve ferah aromasıyla hazırlanan DaVinci gurme şurup.",
    "tags": [
      "DaVinci Gourmet",
      "Çilek",
      "Strawberry",
      "Şurup",
      "Limonata",
      "Milkshake"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Milkshake, Smoothie, Limonata, Kokteyl",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Peach Garden Şeftali Şurubu 750ml",
    "code": "DVG-PGA-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p4/p4_7.png",
    "description": "Yaz şeftalisinin sulu ve tatlı lezzetiyle buzlu çaylar ve ferahlatıcı içecekler için DaVinci şurup.",
    "tags": [
      "DaVinci Gourmet",
      "Şeftali",
      "Peach",
      "Ice Tea",
      "Şurup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Peach Ice Tea, Limonata, Kokteyl",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Classic Hazelnut Fındık Şurubu 750ml",
    "code": "DVG-HAZ-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p4/p4_8.png",
    "description": "Zengin kavrulmuş fındık aromasıyla kahve zincirlerinin bir numaralı tercihi DaVinci Classic Hazelnut.",
    "tags": [
      "DaVinci Gourmet",
      "Fındık",
      "Hazelnut",
      "Kahve Şurubu",
      "Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Latte, Cappuccino, Sıcak Çikolata",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "DaVinci Gourmet Pecan Praline Aromalı Şurup 750ml",
    "code": "DVG-PPR-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p4/p4_9.png",
    "description": "Pekan cevizi ve karamelize pralin notalarıyla zenginleştirilmiş özel gurme kahve şurubu.",
    "tags": [
      "DaVinci Gourmet",
      "Pecan Praline",
      "Pekan Cevizi",
      "Şurup",
      "Kahve"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Özel Kahve Reçeteleri, Frappe",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Forest Berries Orman Meyveleri Şurubu 750ml",
    "code": "DVG-FBR-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p4/p4_10.png",
    "description": "Böğürtlen, frambuaz ve ahududu meyve kombinasyonuyla zengin lezzet profili sunar.",
    "tags": [
      "DaVinci Gourmet",
      "Forest Berries",
      "Orman Meyvesi",
      "Şurup",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Ice Tea, Limonata, Kokteyl",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Classic Caramel Şurubu 750ml",
    "code": "DVG-CAR-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p5/p5_1.png",
    "description": "Karamelize şeker ve hafif vanilya tonlarının dengeli uyumuyla üretilen en popüler kahve şurubu.",
    "tags": [
      "DaVinci Gourmet",
      "Caramel",
      "Karamel",
      "Şurup",
      "Caramel Macchiato"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Caramel Macchiato, Latte, Frappe",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "DaVinci Gourmet Butterscotch Aromalı Sos 2L",
    "code": "DVG-BSC-2000",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "bar-sos",
    "imageUrl": "/resimler/p5/p5_2.png",
    "description": "Eski usul tereyağı ve esmer şekerin karamelize lezzetini sunan yoğun kıvamlı DaVinci Butterscotch sos.",
    "tags": [
      "DaVinci Gourmet",
      "Butterscotch",
      "Karamel Sos",
      "Kahve Sosu",
      "Dondurma Sosu"
    ],
    "specs": {
      "Hacim": "2 Litre",
      "Kullanım": "Kahve Üstü Süsleme, Waffle, Dondurma, Pasta",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "DaVinci Gourmet Classic Blueberry Şurubu 750ml",
    "code": "DVG-BLU-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p5/p5_3.png",
    "description": "Doğal yaban mersini aromasıyla soğuk çaylar, limonatalar ve kokteyller için mor renkli şurup.",
    "tags": [
      "DaVinci Gourmet",
      "Blueberry",
      "Yaban Mersini",
      "Şurup",
      "Limonata"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Limonata, Kokteyl, Mocktail",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Classic Roasted Almond Şurubu 750ml",
    "code": "DVG-ALM-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p5/p5_4.png",
    "description": "Fırınlanmış acıbadem ve tatlı badem aromalarının harmanlandığı özel kahve şurubu.",
    "tags": [
      "DaVinci Gourmet",
      "Badem",
      "Roasted Almond",
      "Şurup",
      "Kahve"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Latte, Sıcak Çikolata, Kokteyl",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet White Chocolate Şurubu 750ml",
    "code": "DVG-WCH-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p5/p5_5.png",
    "description": "Kakao yağı ve vanilyanın pürüzsüz karışımıyla White Chocolate Mocha tutkunları için ideal şurup.",
    "tags": [
      "DaVinci Gourmet",
      "White Chocolate",
      "Beyaz Çikolata",
      "Şurup",
      "Mocha"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "White Mocha, Frappe, Sıcak Süt",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Toffeenut Aromalı Şurup 750ml",
    "code": "DVG-TOF-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p5/p5_6.png",
    "description": "Tereyağlı tofi şekeri ve kavrulmuş fındık tanelerinin muazzam buluşmasıyla kış aylarının favorisi.",
    "tags": [
      "DaVinci Gourmet",
      "Toffeenut",
      "Tofi",
      "Fındık",
      "Şurup",
      "Toffee Nut Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Toffee Nut Latte, Frappe, Mocha",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "DaVinci Gourmet Classic Coconut Şurubu 750ml",
    "code": "DVG-COC-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p5/p5_7.png",
    "description": "Tropikal hindistan cevizinin egzotik aromasıyla Pina Colada ve özel kahve tarifleri için şurup.",
    "tags": [
      "DaVinci Gourmet",
      "Hindistan Cevizi",
      "Coconut",
      "Şurup",
      "Pina Colada"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Tropikal Kokteyl, Mocha, Frappe",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Juicy Lime Aromalı Şurup 750ml",
    "code": "DVG-JLM-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p5/p5_8.png",
    "description": "Taze sıkılmış misket limonu suyu tazeliği sunan kokteyl ve soğuk meşrubat şurubu.",
    "tags": [
      "DaVinci Gourmet",
      "Juicy Lime",
      "Misket Limonu",
      "Şurup",
      "Limonata"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Limonata, Kokteyl, Soda",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Spiced Chai Tea Konsantre Şurup 750ml",
    "code": "DVG-CHA-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p5/p5_9.png",
    "description": "Tarçın, kakule, zencefil ve karanfil baharatlarıyla harmanlanmış otantik Chai Tea Latte konsantresi.",
    "tags": [
      "DaVinci Gourmet",
      "Chai Tea",
      "Baharatlı Çay",
      "Chai Latte",
      "Şurup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Chai Tea Latte, Sıcak/Soğuk Sütlü Çay",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "DaVinci Gourmet Classic Chocolate Şurubu 750ml",
    "code": "DVG-CHO-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p5/p5_10.png",
    "description": "Koyu kakao çekirdeklerinin yoğun aromasıyla sıcak ve soğuk kahvelerde mükemmel çikolata lezzeti.",
    "tags": [
      "DaVinci Gourmet",
      "Çikolata",
      "Chocolate",
      "Mocha",
      "Şurup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Caffè Mocha, Milkshake, Frappe",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Blue Curacao Bar Sosu 750g",
    "code": "NON-BCS-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "bar-sos",
    "imageUrl": "/resimler/p6/p6_1.png",
    "description": "Canlı mavi rengi ve narenciye aromasıyla bar sunumları, tatlılar ve kokteyller için özel sıkma sos.",
    "tags": [
      "Caffè NONNO",
      "Blue Curacao",
      "Bar Sosu",
      "Tatlı Sosu",
      "Kokteyl"
    ],
    "specs": {
      "Gramaj": "750 g",
      "Kullanım": "Bar Süsleme, Tatlı Tabağı Dekoru, Kokteyl",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Muz Aromalı Bar Sosu 750g",
    "code": "NON-BNS-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "bar-sos",
    "imageUrl": "/resimler/p6/p6_2.png",
    "description": "Sarı muz aromalı akışkan dekor sosu; dondurma, waffle ve pastacılık tabaklarında harika sunum sağlar.",
    "tags": [
      "Caffè NONNO",
      "Muz",
      "Muz Sosu",
      "Tatlı Sosu",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "750 g",
      "Kullanım": "Waffle, Dondurma, Pasta Süsleme",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "EASY MIX Orange Mango Kokteyl Premiksi 1000ml",
    "code": "EMX-OMG-1000",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p6/p6_3.png",
    "description": "Portakal ve mango meyvelerinin mükemmel dengesiyle hızlı ve pratik kokteyl & mocktail miksi.",
    "tags": [
      "EASY MIX",
      "Portakal",
      "Mango",
      "Kokteyl Premiksi",
      "Barista"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Kokteyl, Mocktail, Frozen",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "EASY MIX Bodrum Mandalin Kokteyl Premiksi 1000ml",
    "code": "EMX-BDR-1000",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p6/p6_4.png",
    "description": "Coğrafi işaretli Bodrum mandalinasının eşsiz kokusu ve tadıyla profesyonel barlar için hazır premiks.",
    "tags": [
      "EASY MIX",
      "Bodrum Mandalina",
      "Kokteyl Miksi",
      "Premix"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Kokteyl, Mocktail, Limonata",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "DaVinci Gourmet Cheese Cake Aromalı Sos 2L",
    "code": "DVG-CHK-2000",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "bar-sos",
    "imageUrl": "/resimler/p6/p6_5.png",
    "description": "Kremamsı New York cheesecake lezzetini kahvelere, frappeler ve tatlı tabaklarına taşıyan özel 2L sos.",
    "tags": [
      "DaVinci Gourmet",
      "Cheesecake Sos",
      "Tatlı Sosu",
      "Kahve Sosu",
      "Frappe"
    ],
    "specs": {
      "Hacim": "2 Litre",
      "Kullanım": "Cheesecake Latte, Frappe, Dondurma, Pasta",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "DaVinci Gourmet White Chocolate Aromalı Sos 2L",
    "code": "DVG-WCS-2000",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "bar-sos",
    "imageUrl": "/resimler/p6/p6_6.png",
    "description": "İpeksi beyaz çikolata dokusu ve zengin süt aromasıyla baristaların vazgeçilmezi 2 litrelik sos.",
    "tags": [
      "DaVinci Gourmet",
      "White Chocolate",
      "Beyaz Çikolata Sosu",
      "Mocha"
    ],
    "specs": {
      "Hacim": "2 Litre",
      "Kullanım": "White Mocha, Sıcak Çikolata, Waffle, Dondurma",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "DaVinci Gourmet Caramel Aromalı Sos 2L",
    "code": "DVG-CRS-2000",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "bar-sos",
    "imageUrl": "/resimler/p6/p6_7.png",
    "description": "Geleneksel tereyağlı karamel kıvamı ve parlak dokusuyla kahve ve tatlı sunumlarında lider sos.",
    "tags": [
      "DaVinci Gourmet",
      "Karamel Sos",
      "Caramel Drizzle",
      "Kahve Sosu"
    ],
    "specs": {
      "Hacim": "2 Litre",
      "Kullanım": "Caramel Macchiato, Waffle, Pasta, Dondurma",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "DaVinci Gourmet Chocolate Aromalı Sos 2L",
    "code": "DVG-CHS-2000",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "bar-sos",
    "imageUrl": "/resimler/p6/p6_8.png",
    "description": "Zengin kakao çekirdeklerinden üretilen koyu çikolata sosu; sıcak ve soğuk içeceklerde kusursuz erir.",
    "tags": [
      "DaVinci Gourmet",
      "Çikolata Sosu",
      "Mocha Sos",
      "Waffle",
      "Pasta"
    ],
    "specs": {
      "Hacim": "2 Litre",
      "Kullanım": "Caffè Mocha, Dondurma, Waffle, Pancake",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "Caffè NONNO White Chocolate Bar Sosu 750g",
    "code": "NON-WCS-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "bar-sos",
    "imageUrl": "/resimler/p6/p6_9.png",
    "description": "Özel ince uçlu sıkma şişesiyle pasta, waffle ve kahve üzeri desenler için beyaz çikolata dekor sosu.",
    "tags": [
      "Caffè NONNO",
      "Beyaz Çikolata Sosu",
      "Dekor Sos",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "750 g",
      "Kullanım": "Kahve Süsleme, Waffle, Tabak Dekoru",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Blue Curacao Bar & Tatlı Sosu 750g",
    "code": "NON-BCS-750B",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "bar-sos",
    "imageUrl": "/resimler/p6/p6_10.png",
    "description": "Kokteyl ve tatlı sunumlarına derin mavi ton ve tatlı portakal lezzeti kazandıran özel dekor sos.",
    "tags": [
      "Caffè NONNO",
      "Blue Curacao",
      "Dekor Sos",
      "Barista"
    ],
    "specs": {
      "Gramaj": "750 g",
      "Kullanım": "Bardak Süsleme, Kokteyl, Tatlı Tabağı",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "EASY MIX Citrus Blend Kokteyl Premiksi 1000ml",
    "code": "EMX-CIT-1000",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p7/p7_1.png",
    "description": "Limon, misket limonu ve portakalın ferahlatıcı dengesiyle sour kokteyllerin temel harcı.",
    "tags": [
      "EASY MIX",
      "Citrus Blend",
      "Narenciye",
      "Kokteyl Premiksi",
      "Sour"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Sour Kokteyller, Limonata, Mocktail",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "EASY MIX Pitaya Refresher İçecek 700ml",
    "code": "EMX-PIT-700",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p7/p7_2.png",
    "description": "Ejder meyvesi (Pitaya) ve yeşil çay bazıyla pembe renkli tropikal ferahlık sunan konsantre içecek.",
    "tags": [
      "EASY MIX",
      "Pitaya",
      "Ejder Meyvesi",
      "Refresher",
      "Buzlu İçecek"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Buzlu Refresher, Mocktail, Kokteyl",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "EASY MIX Cherry & Chocolate Kokteyl Premiksi 500ml",
    "code": "EMX-CCH-500",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p7/p7_3.png",
    "description": "Koyu kiraz ve bitter çikolata uyumuyla gurme kokteyller ve tatlı içecekler için premiks.",
    "tags": [
      "EASY MIX",
      "Kiraz Çikolata",
      "Cherry Chocolate",
      "Kokteyl Miksi"
    ],
    "specs": {
      "Hacim": "500 ml",
      "Kullanım": "Gurme Kokteyl, Tatlı İçecek",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "EASY MIX Rooibos Peach Refresher İçecek 700ml",
    "code": "EMX-RBP-700",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p7/p7_4.png",
    "description": "Güney Afrika Rooibos çayı ve tatlı şeftali harmanıyla kafeinsiz doğal buzlu içecek bazı.",
    "tags": [
      "EASY MIX",
      "Rooibos",
      "Şeftali",
      "Refresher",
      "Ice Tea"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Buzlu Çay, Refresher, Kokteyl",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "EASY MIX Tuxedo Çikolata & Vanilya Premiksi 1000ml",
    "code": "EMX-TUX-1000",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p7/p7_5.png",
    "description": "Siyah ve beyaz çikolatanın vanilya ile mükemmel dengesiyle lüks kokteyl bazı.",
    "tags": [
      "EASY MIX",
      "Tuxedo",
      "Çikolata",
      "Vanilya",
      "Premix"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Tatlı Kokteyller, Barista İçecekleri",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "EASY MIX Passion Martini Kokteyl Premiksi 1000ml",
    "code": "EMX-PSM-1000",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p7/p7_6.png",
    "description": "Çarkıfelek meyvesi, vanilya ve narenciye notalarıyla dünyaca ünlü Passion Martini hazırlama miksi.",
    "tags": [
      "EASY MIX",
      "Passion Martini",
      "Çarkıfelek",
      "Kokteyl Premiksi"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Pornstar Martini, Passion Mocktail, Frozen",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "EASY MIX Passion Martini Kokteyl Miksi 1000ml",
    "code": "EMX-PSM-1000B",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p7/p7_7.png",
    "description": "Barlar ve restoranlar için standart reçeteli yoğun çarkıfelek meyveli kokteyl bazı.",
    "tags": [
      "EASY MIX",
      "Passion Fruit",
      "Martini Miksi",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Kokteyl, Mocktail, Frozen",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "EASY MIX Chili Mango Kokteyl Premiksi 1000ml",
    "code": "EMX-CHM-1000",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p7/p7_8.png",
    "description": "Tatlı tropikal mango ile hafif acı acı biberin heyecan verici ve cüretkar kokteyl kombinasyonu.",
    "tags": [
      "EASY MIX",
      "Chili Mango",
      "Acılı Mango",
      "Kokteyl Premiksi",
      "Margarita"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Spicy Mango Margarita, Frozen, Kokteyl",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "EASY MIX Purple Basil Limon & Reyhan Premiksi 1000ml",
    "code": "EMX-PRB-1000",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p7/p7_9.png",
    "description": "Mor reyhanın aromatik yapısı ve taze limon suyuyla hazırlanan otantik gurme kokteyl premiksi.",
    "tags": [
      "EASY MIX",
      "Mor Reyhan",
      "Purple Basil",
      "Reyhan Şerbeti",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Reyhan Kokteyli, Gurme Limonata",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "EASY MIX Sorrel & Green Plum Refresher 700ml",
    "code": "EMX-SGP-700",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p7/p7_10.png",
    "description": "Ekşi yeşil erik ve taze kuzu kulağının ferahlatıcı yeşil çay bazıyla eşsiz uyumu.",
    "tags": [
      "EASY MIX",
      "Yeşil Erik",
      "Kuzukulağı",
      "Refresher",
      "Ekşi İçecek"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Buzlu Refresher, Ekşi Kokteyl",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Tiramisu Aromalı Şurup 750ml",
    "code": "NON-TIR-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p8/p8_1.png",
    "description": "İtalyan maskarpone peyniri, bisküvi ve kahve notalarıyla zenginleştirilmiş özel tiramisu şurubu.",
    "tags": [
      "Caffè NONNO",
      "Tiramisu",
      "Şurup",
      "Kahve",
      "Tatlı"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Tiramisu Latte, Sıcak İçecekler, Frappe",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Toffee Nut Aromalı Şurup 750ml",
    "code": "NON-TFN-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p8/p8_2.png",
    "description": "Karamelize tereyağı ve fındık tanelerinin buluşmasıyla kış kahvelerinin vazgeçilmezi.",
    "tags": [
      "Caffè NONNO",
      "Toffee Nut",
      "Fındık Şurubu",
      "Kahve"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Toffee Nut Latte, Cappuccino",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Caffè NONNO Toffee Nut Gourmet Şurup 750ml",
    "code": "NON-TFN-750B",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p8/p8_3.png",
    "description": "Yoğun tofi şekeri ve kavrulmuş kuruyemiş profili sunan gurme seri kahve şurubu.",
    "tags": [
      "Caffè NONNO",
      "Toffee Nut",
      "Gourmet Şurup",
      "Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Kahve, Sıcak Süt, Frappe",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "EASY MIX Watermelon Margarita Kokteyl Premiksi 500ml",
    "code": "EMX-WMM-500",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p8/p8_4.png",
    "description": "Sulu karpuz ve misket limonunun dengeli formülüyle mükemmel Watermelon Margarita bazı.",
    "tags": [
      "EASY MIX",
      "Karpuz",
      "Margarita",
      "Kokteyl Premiksi"
    ],
    "specs": {
      "Hacim": "500 ml",
      "Kullanım": "Karpuz Margarita, Frozen, Mocktail",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "EASY MIX Libido Orman Meyveli Kokteyl Premiksi 1000ml",
    "code": "EMX-LBD-1000",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p8/p8_5.png",
    "description": "Kırmızı orman meyveleri ve Bodrum mandalinasının canlı rengi ve lezzetiyle özel parti miksi.",
    "tags": [
      "EASY MIX",
      "Orman Meyvesi",
      "Mandalina",
      "Kokteyl Premiksi"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Kokteyl, Mocktail, Shot",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "EASY MIX Ocean Karadut & Narenciye Refresher 700ml",
    "code": "EMX-OCN-700",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p8/p8_6.png",
    "description": "Portakal, greyfurt ve karadut meyvelerinin berrak mavi okyanus tonuyla buluştuğu refresher.",
    "tags": [
      "EASY MIX",
      "Ocean",
      "Karadut",
      "Refresher",
      "Mavi İçecek"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Buzlu Refresher, Okyanus Kokteyli",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "EASY MIX Yeşil Çay & Kavun Kokteyl Premiksi 700ml",
    "code": "EMX-MLN-700",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p8/p8_7.png",
    "description": "Antioksidan zengini yeşil çay özü ve tatlı yaz kavunu harmanı.",
    "tags": [
      "EASY MIX",
      "Kavun",
      "Yeşil Çay",
      "Kokteyl Premiksi",
      "Refresher"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Kavunlu Ice Tea, Kokteyl, Mocktail",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "EASY MIX Beyaz Çay & Şeftali Kokteyl Premiksi 700ml",
    "code": "EMX-WPC-700",
    "codeGroup": "EASY MIX",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p8/p8_8.png",
    "description": "Hafif beyaz çay yaprakları ve taze sulu şeftali aromasıyla zarif bir içecek bazı.",
    "tags": [
      "EASY MIX",
      "Beyaz Çay",
      "Şeftali",
      "Ice Tea",
      "Premix"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Beyaz Çaylı İçecek, Kokteyl",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "EASY MIX Frambuaz Artisan Bar Şurubu 700ml",
    "code": "EMX-RAS-700",
    "codeGroup": "EASY MIX",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p8/p8_9.png",
    "description": "The Pumps serisi özel basmalı başlığıyla barlar ve kafeler için pratik frambuaz şurubu.",
    "tags": [
      "EASY MIX",
      "Frambuaz",
      "Artisan Şurup",
      "Barista"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Kokteyl, Kahve, Limonata",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Nar Aromalı Şurup 750ml",
    "code": "NON-POM-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p8/p8_10.png",
    "description": "Tatlı ve mayhoş nar lezzetiyle limonatalar, mocktail ve sıcak kış çayları için özel şurup.",
    "tags": [
      "Caffè NONNO",
      "Nar",
      "Pomegranate",
      "Şurup",
      "Limonata"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Limonata, Kokteyl, Sıcak Meyve Çayı",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Muz Aromalı Şurup 750ml",
    "code": "NON-BAN-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p8/p8_11.png",
    "description": "Tropikal muz lezzetiyle sütlü kahveler, milkshake ve frappe çeşitlerine tatlılık katar.",
    "tags": [
      "Caffè NONNO",
      "Muz",
      "Banana",
      "Şurup",
      "Milkshake"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Milkshake, Muzlu Latte, Frappe",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "CALLEI Bitter Çikolatalı Waffle & Krep Kreması 1kg",
    "code": "CAL-BIT-1000",
    "codeGroup": "CALLEI",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p9/p9_1.png",
    "description": "Zengin bitter kakao içeriği ve pürüzsüz sürülebilir kıvamıyla profesyonel waffle ve krep kreması.",
    "tags": [
      "CALLEI",
      "Bitter Çikolata",
      "Waffle Kreması",
      "Krep",
      "Sürülebilir Çikolata"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Pancake, Kruvasan Dolgusu",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Renkli Granül Pasta & Waffle Süsleme Şekeri 1kg",
    "code": "TOP-SPR-1000",
    "codeGroup": "Pastacılık Süsleme",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p9/p9_2.png",
    "description": "Waffle, dondurma, pasta ve cupcake sunumları için renkli granül süsleme şekerlemeleri.",
    "tags": [
      "Granül Şeker",
      "Renkli Pasta Süsü",
      "Waffle Topping",
      "Süsleme"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Dondurma, Cupcake, Pasta",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Karamelize Fındık Krokan Parçacıkları 1kg",
    "code": "TOP-CRK-1000",
    "codeGroup": "Pastacılık Süsleme",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p9/p9_3.png",
    "description": "Çıtır karamel ve fındık parçacıklarının harmanıyla waffle ve pasta üstü için gurme krokan.",
    "tags": [
      "Krokan",
      "Fındık Krokan",
      "Waffle Süsleme",
      "Çıtır Topping"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Pasta, Dondurma, Tatlı",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Renkli Mini Bonibon Draje Çikolata 1kg",
    "code": "TOP-BNB-1000",
    "codeGroup": "Pastacılık Süsleme",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p9/p9_4.png",
    "description": "Çıtır şeker kaplamalı renkli mini sütlü çikolata drajeleri.",
    "tags": [
      "Bonibon",
      "Renkli Draje",
      "Waffle Süsleme",
      "Çikolata Draje"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Dondurma, Pasta",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Sütlü Damla Çikolata Drops 1kg",
    "code": "TOP-MDC-1000",
    "codeGroup": "Pastacılık Hammadde",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p9/p9_5.png",
    "description": "Fırına ve eritmeye dayanıklı kaliteli sütlü damla çikolata; kurabiye, kek ve waffle için.",
    "tags": [
      "Sütlü Damla Çikolata",
      "Çikolata Drops",
      "Kurabiye Çikolatası",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Kurabiye, Kek, Waffle, Dondurma",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Renkli Çakıl Taşı Draje Çikolata 1kg",
    "code": "TOP-CKL-1000",
    "codeGroup": "Pastacılık Süsleme",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p9/p9_6.png",
    "description": "Doğal taş görünümünde renkli şeker kaplı sütlü çikolata taneleri.",
    "tags": [
      "Çakıl Taşı Çikolata",
      "Draje",
      "Waffle Süsü",
      "Pasta Süsleme"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Dondurma, Pasta",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Bitter Damla Çikolata Drops 1kg",
    "code": "TOP-BDC-1000",
    "codeGroup": "Pastacılık Hammadde",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p9/p9_7.png",
    "description": "Yüksek kakao oranlı ısıya dayanıklı bitter damla çikolata parçaları.",
    "tags": [
      "Bitter Damla Çikolata",
      "Kakao Drops",
      "Kurabiye",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Kurabiye, Muffin, Waffle",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Beyaz Damla Çikolata Drops 1kg",
    "code": "TOP-WDC-1000",
    "codeGroup": "Pastacılık Hammadde",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p9/p9_8.png",
    "description": "Kakao yağı ve vanilyalı beyaz damla çikolata; kurabiye ve pasta süslemelerinde estetik dokunuş.",
    "tags": [
      "Beyaz Damla Çikolata",
      "White Drops",
      "Kurabiye",
      "Pasta"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Kurabiye, Pasta Süsleme, Waffle",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "CALLEI Hazır Waffle, Krep & Pancake Toz Karışımı 1kg",
    "code": "CAL-WFX-1000",
    "codeGroup": "CALLEI",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p9/p9_9.png",
    "description": "Su ve yağ ilavesiyle dakikalar içinde dışı çıtır, içi yumuşacık altın sarısı waffle, krep ve pankek harcı.",
    "tags": [
      "CALLEI",
      "Waffle Tozu",
      "Waffle Mix",
      "Krep Harcı",
      "Pancake Tozu"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Karışım": "1kg Mix + 1.25L Su + 200g Sıvı Yağ",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Kavrulmuş Pirinç Fındık Parçacıkları 1kg",
    "code": "TOP-FND-1000",
    "codeGroup": "Pastacılık Süsleme",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p9/p9_10.png",
    "description": "Özenle kavrulmuş ve elenmiş pirinç fındık taneleri; waffle, çikolata ve pastalara eşsiz çıtırlık katar.",
    "tags": [
      "Pirinç Fındık",
      "Kavrulmuş Fındık",
      "Waffle Süsü",
      "Pasta Topping"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Pasta, Dondurma",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "CALLEI Speculoos Bisküvili Waffle & Krep Kreması 1kg",
    "code": "CAL-SPC-1000",
    "codeGroup": "CALLEI",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p10/p10_1.png",
    "description": "Orijinal karamelize Belçika Speculoos bisküvisi parçacıklı lüks sürülebilir krema.",
    "tags": [
      "CALLEI",
      "Speculoos",
      "Bisküvi Kreması",
      "Lotus",
      "Waffle Kreması"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Kruvasan Dolgusu, Cheesecake",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "CALLEI Çilek Aromalı Pembe Waffle & Krep Kreması 1kg",
    "code": "CAL-STR-1000",
    "codeGroup": "CALLEI",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p10/p10_2.png",
    "description": "Canlı pembe rengi ve tatlı çilek aromasıyla dikkat çeken özel sürülebilir krema.",
    "tags": [
      "CALLEI",
      "Çilek Kreması",
      "Pembe Çikolata",
      "Waffle",
      "Krep"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Pasta Kaplama",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "CALLEI Beyaz Çikolatalı Waffle & Krep Kreması 1kg",
    "code": "CAL-WHT-1000",
    "codeGroup": "CALLEI",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p10/p10_3.png",
    "description": "Kremsi dokusu ve yoğun sütlü beyaz çikolata lezzetiyle vazgeçilmez waffle kreması.",
    "tags": [
      "CALLEI",
      "Beyaz Çikolata",
      "Sürülebilir Krema",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Profiterol Dolgusu",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "CALLEI Sütlü Çikolatalı Waffle & Krep Kreması 1kg",
    "code": "CAL-MLK-1000",
    "codeGroup": "CALLEI",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p10/p10_4.png",
    "description": "Bol sütlü ve fındıklı geleneksel çikolata kreması; profesyonel işletmeler için 1 kg ambalajda.",
    "tags": [
      "CALLEI",
      "Sütlü Çikolata",
      "Fındık Kreması",
      "Waffle",
      "Krep"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Pancake, Kruvasan",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "CALLEI Frambuaz Aromalı Waffle & Krep Kreması 1kg",
    "code": "CAL-RAS-1000",
    "codeGroup": "CALLEI",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p10/p10_5.png",
    "description": "Frambuaz meyvesinin mayhoş tatlı aromasıyla tatlı tabaklarına renk katan krema.",
    "tags": [
      "CALLEI",
      "Frambuaz Kreması",
      "Ahududu",
      "Waffle",
      "Krep"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Tatlı Dolgusu",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "CALLEI Bubble Gum Aromalı Mavi Waffle Kreması 1kg",
    "code": "CAL-BBG-1000",
    "codeGroup": "CALLEI",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p10/p10_6.png",
    "description": "Eğlenceli sakız aroması ve göz alıcı turkuaz mavi rengiyle çocukların ve gençlerin gözdesi.",
    "tags": [
      "CALLEI",
      "Bubble Gum",
      "Sakız Aromalı",
      "Mavi Krema",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Milkshake, Dondurma",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "CALLEI Antep Fıstıklı Yeşil Waffle & Krep Kreması 1kg",
    "code": "CAL-PST-1000",
    "codeGroup": "CALLEI",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p10/p10_7.png",
    "description": "Gerçek Antep fıstığı ezmesi içeren zengin yeşil renkli ve gurme lezzetli sürülebilir krema.",
    "tags": [
      "CALLEI",
      "Antep Fıstığı",
      "Fıstık Kreması",
      "Dubai Çikolatası",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Dubai Çikolatası, Krep, Kruvasan",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "CALLEI Karamel Aromalı Sürülebilir Krema 1kg",
    "code": "CAL-CAR-1000",
    "codeGroup": "CALLEI",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/p10/p10_8.png",
    "description": "Koyu altın rengi ve karamelize şeker tadıyla krep, waffle ve pasta aralarında eşsiz tat.",
    "tags": [
      "CALLEI",
      "Karamel Kreması",
      "Dulce de Leche",
      "Waffle",
      "Krep"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Kek Dolgusu",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Passion Fruit Çarkıfelek Püresi 750ml",
    "code": "NON-PAS-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p12/p12_1.png",
    "description": "Tropikal çarkıfelek meyvesi çekirdekleri ve püresi içeren yoğun meyve konsantresi.",
    "tags": [
      "Caffè NONNO",
      "Passion Fruit",
      "Çarkıfelek",
      "Püre",
      "Frozen"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Frozen, Smoothie, Kokteyl, Pasta",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Monte Cristo Speculaas Bisküvi Aromalı Şurup 700ml",
    "code": "MTC-SPC-700",
    "codeGroup": "Monte Cristo",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p12/p12_2.png",
    "description": "Tarçın, zencefil ve karamelize bisküvi lezzetini kahveye taşıyan otantik Monte Cristo Speculaas şurubu.",
    "tags": [
      "Monte Cristo",
      "Speculaas",
      "Bisküvi Şurubu",
      "Kahve",
      "Latte"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Speculaas Latte, Frappe, Sıcak Süt",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Caffè NONNO Kivi Aromalı Frozen Püre 750ml",
    "code": "NON-KIW-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p12/p12_3.png",
    "description": "Doğal yeşil rengi ve kivi taneleriyle frozen ve kokteyller için ferahlatıcı ekşi-tatlı püre.",
    "tags": [
      "Caffè NONNO",
      "Kivi",
      "Kiwi Frozen",
      "Püre",
      "Smoothie"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Frozen, Smoothie, Kokteyl",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Krater Elmalı Meyve Karışımı 1000g",
    "code": "KRT-APL-1000",
    "codeGroup": "Krater",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p12/p12_4.png",
    "description": "Maestro del Gelato serisi ekşi yeşil elma harcı; dondurma, pasta ve frozen yapımında üstün lezzet.",
    "tags": [
      "Krater",
      "Elma",
      "Yeşil Elma",
      "Dondurma",
      "Meyve Karışımı"
    ],
    "specs": {
      "Gramaj": "1000 g",
      "Kullanım": "Gelato, Dondurma, Frozen, Pasta",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Krater Ananaslı Meyve Karışımı 1000g",
    "code": "KRT-PIN-1000",
    "codeGroup": "Krater",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/p12/p12_5.png",
    "description": "Tropikal ananas lezzeti ve kokusunu dondurma ve tatlılarınıza kazandıran profesyonel meyve sosu.",
    "tags": [
      "Krater",
      "Ananas",
      "Pineapple",
      "Gelato",
      "Dondurma Harcı"
    ],
    "specs": {
      "Gramaj": "1000 g",
      "Kullanım": "Gelato, Frozen, Dondurma, Pasta",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Monte Cristo Badem Aromalı Şurup 700ml",
    "code": "MTC-ALM-700",
    "codeGroup": "Monte Cristo",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p12/p12_6.png",
    "description": "Doğal kavrulmuş badem ve acıbadem dokunuşuyla kahveler ve sıcak içecekler için Monte Cristo şurubu.",
    "tags": [
      "Monte Cristo",
      "Badem",
      "Almond",
      "Şurup",
      "Kahve"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Almond Latte, Sıcak İçecekler",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Monte Cristo Chai Tea Baharatlı Şurup 700ml",
    "code": "MTC-CHT-700",
    "codeGroup": "Monte Cristo",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p12/p12_7.png",
    "description": "Geleneksel Hint baharatları karanfil, tarçın ve kakule özüyle Chai Tea Latte hazırlama şurubu.",
    "tags": [
      "Monte Cristo",
      "Chai Tea",
      "Baharatlı Şurup",
      "Chai Latte"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Chai Latte, Sıcak Süt, Çay",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Monte Cristo Antep Fıstığı Aromalı Şurup 700ml",
    "code": "MTC-PST-700",
    "codeGroup": "Monte Cristo",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p12/p12_8.png",
    "description": "Göz alıcı zümrüt yeşili rengi ve yoğun Antep fıstığı aromasıyla özel kahveler ve kokteyller için.",
    "tags": [
      "Monte Cristo",
      "Antep Fıstığı",
      "Pistachio",
      "Şurup",
      "Pistachio Latte"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Pistachio Latte, Frappe, Mocktail",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Monte Cristo Çikolata Aromalı Şurup 700ml",
    "code": "MTC-CHO-700",
    "codeGroup": "Monte Cristo",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p12/p12_9.png",
    "description": "Koyu İsviçre çikolatası aromasıyla mocha ve sıcak tatlı içeceklerinize lezzet katar.",
    "tags": [
      "Monte Cristo",
      "Çikolata",
      "Chocolate",
      "Mocha",
      "Şurup"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Mocha, Milkshake, Frappe",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Monte Cristo Pumpkin Spice Balkabağı Şurubu 700ml",
    "code": "MTC-PMP-700",
    "codeGroup": "Monte Cristo",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/p12/p12_10.png",
    "description": "Sonbahar klasiği balkabağı püresi, tarçın ve muskat baharatı uyumuyla Pumpkin Spice Latte şurubu.",
    "tags": [
      "Monte Cristo",
      "Pumpkin Spice",
      "Balkabağı",
      "Latte",
      "Şurup"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Pumpkin Spice Latte, Frappe",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Krater Çilekli Meyve Karışımı 1000g",
    "code": "KRT-STR-1000",
    "codeGroup": "Krater",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt1/pt1_1.png",
    "description": "Doğal çilek püresi içeren altın ambalajlı dondurma, pasta ve bar sos & püre karışımı.",
    "tags": [
      "Krater",
      "Çilek",
      "Püre",
      "Gelato",
      "Dondurma"
    ],
    "specs": {
      "Gramaj": "1000 g",
      "Kullanım": "Dondurma, Pasta, Frozen, Tatlı",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Krater Frambuazlı Meyve Karışımı 1000g",
    "code": "KRT-RAS-1000",
    "codeGroup": "Krater",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt1/pt1_2.png",
    "description": "Taze frambuaz taneleriyle zenginleştirilmiş yoğun lezzetli gelato ve pastacılık meyve miksi.",
    "tags": [
      "Krater",
      "Frambuaz",
      "Ahududu",
      "Püre",
      "Dondurma"
    ],
    "specs": {
      "Gramaj": "1000 g",
      "Kullanım": "Dondurma, Pasta, Cheesecake",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Krater Kavunlu Meyve Karışımı 1000g",
    "code": "KRT-MEL-1000",
    "codeGroup": "Krater",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt1/pt1_3.png",
    "description": "Mis kokulu sarı kavun püresi; dondurma ve soğuk içecek reçetelerinde taze yaz esintisi.",
    "tags": [
      "Krater",
      "Kavun",
      "Melon",
      "Püre",
      "Gelato"
    ],
    "specs": {
      "Gramaj": "1000 g",
      "Kullanım": "Gelato, Frozen, Dondurma",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Krater Elmalı Meyve Karışımı Gold 1000g",
    "code": "KRT-APG-1000",
    "codeGroup": "Krater",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt1/pt1_4.png",
    "description": "Yeşil elmanın ferahlatıcı ekşiliğiyle donatılmış profesyonel pastacılık ve dondurma bazı.",
    "tags": [
      "Krater",
      "Yeşil Elma",
      "Apple Mix",
      "Püre",
      "Tatlı"
    ],
    "specs": {
      "Gramaj": "1000 g",
      "Kullanım": "Dondurma, Pasta, Frozen",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Condensed Milk Koyulaştırılmış Süt Sosu 1L",
    "code": "DVG-CND-1000",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "bar-sos",
    "imageUrl": "/resimler/pt1/pt1_5.png",
    "description": "İspanyol kahvesi, Vietnam kahvesi ve özel tatlılar için yoğunlaştırılmış süt lezzeti sunan 1L sos.",
    "tags": [
      "DaVinci Gourmet",
      "Condensed Milk",
      "Koyulaştırılmış Süt",
      "Süt Sosu",
      "Kahve"
    ],
    "specs": {
      "Hacim": "1 Litre",
      "Kullanım": "Spanish Latte, Vietnam Kahvesi, Tatlı",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "Krater Şeftalili Meyve Karışımı 1000g",
    "code": "KRT-PCH-1000",
    "codeGroup": "Krater",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt1/pt1_6.png",
    "description": "Olgun bahçe şeftalilerinin doğal tadını barındıran altın şişeli gurme meyve karışımı.",
    "tags": [
      "Krater",
      "Şeftali",
      "Peach",
      "Püre",
      "Dondurma"
    ],
    "specs": {
      "Gramaj": "1000 g",
      "Kullanım": "Gelato, Dondurma, Frozen, Pasta",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Yoğunlaştırılmış Süt Aromalı Sos 1L",
    "code": "DVG-CND-1000B",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "bar-sos",
    "imageUrl": "/resimler/pt1/pt1_7.png",
    "description": "Kahve zincirleri için özel tasarlanmış ipeksi kıvamlı koyulaştırılmış süt sosu.",
    "tags": [
      "DaVinci Gourmet",
      "Condensed Milk",
      "Barista Sosu",
      "Latte"
    ],
    "specs": {
      "Hacim": "1 Litre",
      "Kullanım": "Kahve, Latte, Bubble Tea",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Mango Fruit Beverage Mix 1L",
    "code": "DVG-MNG-1000",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt1/pt1_8.png",
    "description": "Egzotik Alfonso mangolarının bol etli püresiyle hazırlanan premium smoothie ve kokteyl bazı.",
    "tags": [
      "DaVinci Gourmet",
      "Mango Püresi",
      "Fruit Mix",
      "Smoothie",
      "Frozen"
    ],
    "specs": {
      "Hacim": "1 Litre",
      "Kullanım": "Mango Smoothie, Frozen, Kokteyl",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "DaVinci Gourmet Strawberry Fruit Beverage Mix 1L",
    "code": "DVG-STR-1000",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt1/pt1_9.png",
    "description": "Doğal çilek parçacıklı kıvamıyla milkshake, smoothie ve kokteyller için vazgeçilmez içecek miksi.",
    "tags": [
      "DaVinci Gourmet",
      "Çilek Püresi",
      "Strawberry Mix",
      "Smoothie"
    ],
    "specs": {
      "Hacim": "1 Litre",
      "Kullanım": "Çilek Smoothie, Frozen, Kokteyl",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "DaVinci Gourmet Mixed Berry Fruit Beverage Mix 1L",
    "code": "DVG-MXB-1000",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt1/pt1_10.png",
    "description": "Ahududu, böğürtlen, çilek ve yaban mersininin muazzam birleşimiyle antioksidan dolu meyve püresi.",
    "tags": [
      "DaVinci Gourmet",
      "Mixed Berry",
      "Orman Meyvesi Püresi",
      "Smoothie"
    ],
    "specs": {
      "Hacim": "1 Litre",
      "Kullanım": "Berry Smoothie, Frozen, Kokteyl",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "Caffè NONNO Coconut Hindistan Cevizi Frozen Püre 750ml",
    "code": "NON-COC-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt2/pt2_1.png",
    "description": "Egzotik hindistan cevizi sütü ve püresi; Pina Colada ve tropikal içecekler için mükemmel kıvam.",
    "tags": [
      "Caffè NONNO",
      "Hindistan Cevizi",
      "Coconut Frozen",
      "Püre",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Pina Colada, Smoothie, Frappe, Tatlı",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Caffè NONNO Karpuz Aromalı Frozen Püre 750ml",
    "code": "NON-WTR-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt2/pt2_2.png",
    "description": "Ferahlatıcı yaz karpuzunun taze tadıyla buz gibi frozen ve frozen margarita tarifleri için püre.",
    "tags": [
      "Caffè NONNO",
      "Karpuz",
      "Watermelon Frozen",
      "Püre",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Karpuz Frozen, Kokteyl, Mocktail",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Red Forest Kırmızı Orman Meyveli Frozen 750ml",
    "code": "NON-ROF-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt2/pt2_3.png",
    "description": "Kırmızı frenk üzümü, çilek ve ahududu harmanıyla canlı kırmızı renkte ferahlatıcı meyve püresi.",
    "tags": [
      "Caffè NONNO",
      "Red Forest",
      "Kırmızı Orman Meyvesi",
      "Püre",
      "Smoothie"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Frozen, Smoothie, Kokteyl, Pasta",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Caffè NONNO Kavun Aromalı Frozen Püre 750ml",
    "code": "NON-MEL-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt2/pt2_4.png",
    "description": "Yoğun kokulu yaz kavunu aromasıyla kafeler ve barlar için pratik sıkmalı frozen püresi.",
    "tags": [
      "Caffè NONNO",
      "Kavun",
      "Melon Frozen",
      "Püre",
      "İçecek"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Kavun Frozen, Smoothie, Kokteyl",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Karadut Aromalı Frozen Püre 750ml",
    "code": "NON-BKM-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt2/pt2_5.png",
    "description": "Ege karadutunun zengin koyu mor rengi ve aromasıyla buzlu içeceklerinize doğal dokunuş.",
    "tags": [
      "Caffè NONNO",
      "Karadut",
      "Black Mulberry",
      "Püre",
      "Frozen"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Karadut Frozen, Limonata, Kokteyl",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Caffè NONNO Çilek Aromalı Frozen Püre 750ml",
    "code": "NON-STR-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt2/pt2_6.png",
    "description": "Taze hasat bahçe çileklerinden elde edilen pürüzsüz ve lezzetli frozen içecek püresi.",
    "tags": [
      "Caffè NONNO",
      "Çilek",
      "Strawberry Frozen",
      "Püre",
      "Smoothie"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Çilek Frozen, Smoothie, Milkshake",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Şeftali Aromalı Frozen Püre 750ml",
    "code": "NON-PCH-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt2/pt2_7.png",
    "description": "Bursa şeftalisinin tatlı aromasıyla hazırlanan yoğun kıvamlı ve ferahlatıcı püre.",
    "tags": [
      "Caffè NONNO",
      "Şeftali",
      "Peach Frozen",
      "Püre",
      "Ice Tea"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Şeftali Frozen, Smoothie, Kokteyl",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Mango & Maracuja Frozen Püre 750ml",
    "code": "NON-MNG-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt2/pt2_8.png",
    "description": "Egzotik mango ve marakuya meyvelerinin mükemmel birleşimiyle tropikal tat deneyimi.",
    "tags": [
      "Caffè NONNO",
      "Mango",
      "Maracuja",
      "Tropikal Püre",
      "Frozen"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Mango Frozen, Tropikal Kokteyl, Smoothie",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "DaVinci Gourmet Mixed Berry Orman Meyveli Mix 1L",
    "code": "DVG-MXB-1000B",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt2/pt2_9.png",
    "description": "Yaban mersini, nar, böğürtlen ve ahududu harmanıyla hazırlanmış profesyonel meyve karışımı.",
    "tags": [
      "DaVinci Gourmet",
      "Mixed Berry",
      "Meyve Miksi",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "1 Litre",
      "Kullanım": "Kokteyl, Smoothie, Frozen",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": false
  },
  {
    "name": "DaVinci Gourmet Passionfruit Çarkıfelek Mix 1L",
    "code": "DVG-PAS-1000",
    "codeGroup": "DaVinci Gourmet",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt2/pt2_10.png",
    "description": "Tropikaların vazgeçilmezi marakuya çarkıfelek meyvesi özüyle hazırlanan konsantre içecek harcı.",
    "tags": [
      "DaVinci Gourmet",
      "Passionfruit",
      "Çarkıfelek",
      "Püre",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "1 Litre",
      "Kullanım": "Passion Smoothie, Kokteyl, Mocktail",
      "Menşei": "Malezya / ABD"
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Çörek Otlu & Susamlı Mini Tuzlu Kurabiye",
    "code": "DNK-KRB-001",
    "codeGroup": "Donuk Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt11/pt11_1.png",
    "description": "Ağızda dağılan çıtır yapısı, bol susam ve çörek otu aromasıyla çay saatlerinin vazgeçilmez mini kurabiyesi.",
    "tags": [
      "Donuk Kurabiye",
      "Tuzlu Kurabiye",
      "Çörek Otlu",
      "Unlu Mamul",
      "Kafeterya"
    ],
    "specs": {
      "Muhafaza": "-18°C",
      "Hazırlık": "Oda sıcaklığında 20 dk çözünme / 180°C 5 dk ısıtma",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Gurme Susamlı Tuzlu Atıştırmalık Tabağı",
    "code": "DNK-KRB-002",
    "codeGroup": "Donuk Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt11/pt11_2.png",
    "description": "Kafeler ve oteller için pratik porsiyonlanan tereyağlı çıtır tuzlu kurabiye atıştırmalığı.",
    "tags": [
      "Donuk Kurabiye",
      "Tuzlu Atıştırmalık",
      "İkramlık",
      "Kafeterya"
    ],
    "specs": {
      "Muhafaza": "-18°C",
      "Kullanım": "Çözündür ve Servis Et",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Ananas Aromalı Frozen Püre 750ml",
    "code": "NON-PIN-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt11/pt11_3.png",
    "description": "Taze tropikal ananas aromasıyla ferahlatıcı smoothie ve kokteyller için püre.",
    "tags": [
      "Caffè NONNO",
      "Ananas",
      "Pineapple Frozen",
      "Püre"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Ananas Frozen, Smoothie, Kokteyl",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Cool Poka Portakallı Şurup 750ml",
    "code": "NON-CPK-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/pt11/pt11_4.png",
    "description": "Buzlu narenciye ve tatlı portakal aromasıyla Cool Poka yaz içecekleri için özel şurup.",
    "tags": [
      "Caffè NONNO",
      "Cool Poka",
      "Portakal",
      "Şurup",
      "Soğuk İçecek"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Cool Poka, Buzlu İçecek, Soda",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Çikolatalı Kurabiye Şurubu 750ml",
    "code": "NON-CKY-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/pt11/pt11_5.png",
    "description": "Çikolata parçacıklı Amerikan kurabiyesi lezzetiyle kahve ve frappeler için özel şurup.",
    "tags": [
      "Caffè NONNO",
      "Çikolata Kurabiye",
      "Cookie Şurubu",
      "Kahve",
      "Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Cookie Latte, Frappe, Milkshake",
      "Menşei": "Türkiye"
    },
    "isFeatured": true
  },
  {
    "name": "Caffè NONNO Vişne Aromalı Frozen Püre 750ml",
    "code": "NON-CHR-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt11/pt11_6.png",
    "description": "Koyu kırmızı vişne ekşiliği ve tatlılığıyla mükemmel dengeli frozen meyve püresi.",
    "tags": [
      "Caffè NONNO",
      "Vişne",
      "Cherry Frozen",
      "Püre",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Vişne Frozen, Kokteyl, Pasta",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Muz Aromalı Frozen Püre 750ml",
    "code": "NON-BNF-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt11/pt11_7.png",
    "description": "Doğal muz püresi dokusuyla milkshake ve smoothie çeşitlerine dolgunluk kazandırır.",
    "tags": [
      "Caffè NONNO",
      "Muz",
      "Banana Frozen",
      "Püre",
      "Milkshake"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Muzlu Smoothie, Frozen, Milkshake",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Peynirli Mini Poğaça Topları",
    "code": "DNK-PGC-001",
    "codeGroup": "Donuk Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt11/pt11_8.png",
    "description": "Mayalı yumuşacık hamur içerisinde leziz peynir dolgusu; fırında 10 dakikada servise hazır.",
    "tags": [
      "Donuk Poğaça",
      "Peynirli Poğaça",
      "Unlu Mamul",
      "Kahvaltı"
    ],
    "specs": {
      "Muhafaza": "-18°C",
      "Pişirme": "180°C önceden ısıtılmış fırında 10-12 dk",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Caffè NONNO Yeşil Elma Frozen Püre 750ml",
    "code": "NON-GAP-750",
    "codeGroup": "Caffè NONNO",
    "categoryKey": "pureler",
    "imageUrl": "/resimler/pt11/pt11_9.png",
    "description": "Canlandırıcı ekşi Granny Smith yeşil elma aromasıyla serinletici frozen püresi.",
    "tags": [
      "Caffè NONNO",
      "Yeşil Elma",
      "Green Apple",
      "Püre",
      "Frozen"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Elma Frozen, Kokteyl, Limonata",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Mini Ekmek & Sandviç Hamur Topu",
    "code": "DNK-EKM-001",
    "codeGroup": "Donuk Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt11/pt11_10.png",
    "description": "Çıtır kabuklu, içi gözenekli mini gurme ekmek ve sandviç hamuru.",
    "tags": [
      "Donuk Ekmek",
      "Sandviç Ekmeği",
      "Gurme Ekmek",
      "Unlu Mamul"
    ],
    "specs": {
      "Muhafaza": "-18°C",
      "Pişirme": "200°C fırında 8-10 dk",
      "Menşei": "Türkiye"
    },
    "isFeatured": false
  },
  {
    "name": "Monte Cristo Tarçın Aromalı Şurup 700 ml",
    "code": "MC-SYR-CIN-700",
    "codeGroup": "Monte Cristo",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/pt12/pt12_1.png",
    "description": "Sıcak ve soğuk kahve çeşitlerinde, kokteyllerde ve tatlılarda yoğun aromatik tarçın lezzeti sağlayan premium gurme bar şurubu.",
    "tags": [
      "Monte Cristo",
      "Tarçın",
      "Şurup",
      "Kahve",
      "Barista",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Ambalaj": "Cam Şişe",
      "Menşei": "Türkiye",
      "Kullanım Alanı": "Kahve, Sıcak Çikolata, Kokteyller, Tatlılar",
      "Saklama Koşulu": "Oda sıcaklığında, kuru ve serin yerde saklayınız."
    },
    "isFeatured": true
  },
  {
    "name": "Monte Cristo Nar Aromalı Şurup 700 ml",
    "code": "MC-SYR-POM-700",
    "codeGroup": "Monte Cristo",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/pt12/pt12_2.png",
    "description": "Taze mayhoş nar tadıyla kokteyller, mocktailler, limonatalar ve frozen içecekler için özel gurme şurup.",
    "tags": [
      "Monte Cristo",
      "Nar",
      "Şurup",
      "Kokteyl",
      "Limonata",
      "Frozen"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Ambalaj": "Cam Şişe",
      "Menşei": "Türkiye",
      "Kullanım Alanı": "Kokteyller, Limonata, Frozen, Soğuk Çaylar",
      "Saklama Koşulu": "Güneş ışığından uzak, serin yerde muhafaza ediniz."
    },
    "isFeatured": false
  },
  {
    "name": "Monte Cristo Hindistan Cevizi Aromalı Şurup 700 ml",
    "code": "MC-SYR-COC-700",
    "codeGroup": "Monte Cristo",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/pt12/pt12_3.png",
    "description": "Egzotik hindistan cevizi lezzeti sunan, latte, kokteyl ve soğuk içecekler için mükemmel kıvamlı bar şurubu.",
    "tags": [
      "Monte Cristo",
      "Hindistan Cevizi",
      "Şurup",
      "Latte",
      "Kokteyl",
      "Egzotik"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Ambalaj": "Cam Şişe",
      "Menşei": "Türkiye",
      "Kullanım Alanı": "Kahve Çeşitleri, Pina Colada, Mocktail, Milkshake",
      "Saklama Koşulu": "Kapağı kapalı olarak serin ortamda saklayınız."
    },
    "isFeatured": true
  },
  {
    "name": "Monte Cristo Fındık Aromalı Şurup 700 ml",
    "code": "MC-SYR-HAZ-700",
    "codeGroup": "Monte Cristo",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/pt12/pt12_4.png",
    "description": "Kavrulmuş fındık notalarıyla kahve ve sıcak içecek menülerinin vazgeçilmezi gurme bar şurubu.",
    "tags": [
      "Monte Cristo",
      "Fındık",
      "Şurup",
      "Kahve",
      "Barista",
      "Latte"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Ambalaj": "Cam Şişe",
      "Menşei": "Türkiye",
      "Kullanım Alanı": "Filtre Kahve, Espresso, Latte, Sıcak İçecekler",
      "Saklama Koşulu": "Oda sıcaklığında kuru yerde saklayınız."
    },
    "isFeatured": false
  },
  {
    "name": "Monte Cristo Karpuz Aromalı Şurup 700 ml",
    "code": "MC-SYR-WAT-700",
    "codeGroup": "Monte Cristo",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/pt12/pt12_5.png",
    "description": "Yaz içecekleri, ferahlatıcı frozen ve soğuk kokteyller için yoğun taze karpuz aromalı şurup.",
    "tags": [
      "Monte Cristo",
      "Karpuz",
      "Şurup",
      "Frozen",
      "Kokteyl",
      "Soğuk İçecek"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Ambalaj": "Cam Şişe",
      "Menşei": "Türkiye",
      "Kullanım Alanı": "Frozen İçecekler, Limonata, Kokteyller, Smoothie",
      "Saklama Koşulu": "Serin ve kuru yerde muhafaza ediniz."
    },
    "isFeatured": false
  },
  {
    "name": "Monte Cristo Misket Limonu (Lime) Aromalı Şurup 700 ml",
    "code": "MC-SYR-LIM-700",
    "codeGroup": "Monte Cristo",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/pt12/pt12_6.png",
    "description": "Mojito, limonata ve narenciye bazlı bar miksleri için taze misket limonu (lime) aromalı şurup.",
    "tags": [
      "Monte Cristo",
      "Lime",
      "Misket Limonu",
      "Şurup",
      "Mojito",
      "Barista"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Ambalaj": "Cam Şişe",
      "Menşei": "Türkiye",
      "Kullanım Alanı": "Mojito, Kokteyl, Soğuk Çay, Limonata Çeşitleri",
      "Saklama Koşulu": "Güneş görmeyen serin yerde muhafaza ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "CALLEI Beyaz Çikolatalı Çıtır Pirinç Patlağı Draje (İnci Topping)",
    "code": "CAL-TOP-WHT-1K",
    "codeGroup": "CALLEI Chocolate",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/pt12/pt12_7.png",
    "description": "Waffle, dondurma, krep ve pastacılık süslemeleri için çıtır dokulu beyaz çikolatalı inci patlak.",
    "tags": [
      "CALLEI Chocolate",
      "Beyaz Çikolata",
      "Pirinç Patlağı",
      "Draje",
      "Waffle",
      "Topping"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Ambalaj": "Kilitli Doypack / Kova",
      "Çikolata Türü": "Beyaz Çikolata Kaplama",
      "Kullanım Alanı": "Waffle, Krep, Dondurma, Pasta ve Tatlı Süslemeleri",
      "Saklama Koşulu": "15-20°C sıcaklıkta, nemsiz ortamda saklayınız."
    },
    "isFeatured": true
  },
  {
    "name": "Monte Cristo Yeşil Limon (Lime) Kokteyl Şurubu 700 ml",
    "code": "MC-SYR-LIM2-700",
    "codeGroup": "Monte Cristo",
    "categoryKey": "suruplar",
    "imageUrl": "/resimler/pt12/pt12_8.png",
    "description": "Barlarda ve kafelerde kokteyl ve soğuk çay hazırlığı için dengeli asiditeye sahip ferahlatıcı lime şurubu.",
    "tags": [
      "Monte Cristo",
      "Yeşil Limon",
      "Lime",
      "Kokteyl",
      "Şurup"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Ambalaj": "Cam Şişe",
      "Menşei": "Türkiye",
      "Kullanım Alanı": "Barista Miksleri, Kokteyller, Limonata",
      "Saklama Koşulu": "Kuru ve serin ortamda saklayınız."
    },
    "isFeatured": false
  },
  {
    "name": "CALLEI Pembe Çıtır Pirinç Patlağı Süsleme Drajesi (Fuşya İnci)",
    "code": "CAL-TOP-PNK-1K",
    "codeGroup": "CALLEI Chocolate",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/pt12/pt12_9.png",
    "description": "Waffle, donut ve pasta süslemelerinde görsel canlılık ve çıtırlık katan pembe çikolatalı inci draje.",
    "tags": [
      "CALLEI Chocolate",
      "Pembe",
      "Pirinç Patlağı",
      "Draje",
      "Süsleme",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Ambalaj": "Kilitli Ambalaj",
      "Kullanım Alanı": "Waffle, Donut, Cupcake, Pasta Dekorasyonu",
      "Saklama Koşulu": "18-22°C oda sıcaklığında saklayınız."
    },
    "isFeatured": false
  },
  {
    "name": "CALLEI Sütlü Çikolatalı Çıtır Pirinç Patlağı Draje Topping",
    "code": "CAL-TOP-MLK-1K",
    "codeGroup": "CALLEI Chocolate",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/pt12/pt12_10.png",
    "description": "Waffle, krep ve dondurma üzeri için gerçek sütlü çikolata kaplı çıtır pirinç draje.",
    "tags": [
      "CALLEI Chocolate",
      "Sütlü Çikolata",
      "Pirinç Patlağı",
      "Draje",
      "Waffle",
      "Krep"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Ambalaj": "Kilitli Ambalaj",
      "Çikolata Türü": "Sütlü Çikolata Kaplama",
      "Kullanım Alanı": "Waffle, Krep, Pancake, Dondurma, Pasta",
      "Saklama Koşulu": "Kuru ve serin ortamda muhafaza ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "CALLEI Canlı Fuşya Çıtır Pirinç Patlağı Pasta & Waffle Drajesi",
    "code": "CAL-TOP-FUS-1K",
    "codeGroup": "CALLEI Chocolate",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/pt12/pt12_11.png",
    "description": "Pasta, kek ve tatlı sunumlarına canlılık ve çıtırlık katan parlak fuşya renkli çıtır pirinç süslemesi.",
    "tags": [
      "CALLEI Chocolate",
      "Fuşya",
      "Pirinç Patlağı",
      "Pasta",
      "Waffle",
      "Dekor"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Ambalaj": "Kilitli Ambalaj",
      "Kullanım Alanı": "Waffle, Pasta, Dondurma, Butik Tatlılar",
      "Saklama Koşulu": "Güneş görmeyen serin yerde saklayınız."
    },
    "isFeatured": false
  },
  {
    "name": "CALLEI Bitter Çikolatalı Çıtır Pirinç Patlağı Draje Topping",
    "code": "CAL-TOP-DRK-1K",
    "codeGroup": "CALLEI Chocolate",
    "categoryKey": "waffle-sos",
    "imageUrl": "/resimler/pt12/pt12_12.png",
    "description": "Yoğun kakao lezzeti ve çıtır yapısıyla profesyonel pastacılık ve waffle süsleme drajesi.",
    "tags": [
      "CALLEI Chocolate",
      "Bitter Çikolata",
      "Pirinç Patlağı",
      "Draje",
      "Waffle",
      "Pasta"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Ambalaj": "Kilitli Ambalaj",
      "Çikolata Türü": "Bitter Çikolata Kaplama",
      "Kullanım Alanı": "Waffle, Profiterol, Pasta, Tatlı Sunumları",
      "Saklama Koşulu": "15-20°C nemsiz ortamda muhafaza ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Mangolu & Chia Tohumlu Dilimli Cheesecake",
    "code": "PST-DNK-MNG-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt12/pt12_13.png",
    "description": "Kremamsı peynir dolgusu, tereyağlı bisküvi tabanı ve egzotik mango-chia jölesi ile porsiyonluk donuk cheesecake (10-12 dilim).",
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "Mango",
      "Chia",
      "Dilimli",
      "Pastane"
    ],
    "specs": {
      "Porsiyon": "10-12 Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 3-4 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Çözündükten sonra servise hazırdır, tekrar dondurmayınız."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk İtalyan Tiramisu Dilimli Pasta",
    "code": "PST-DNK-TIR-10D",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt12/pt12_14.png",
    "description": "Orijinal kedidili bisküvi, espresso şurubu ve zengin mascarpone kreması ile hazırlanmış porsiyonluk İtalyan tiramisu.",
    "tags": [
      "Donuk Pasta",
      "Tiramisu",
      "İtalyan",
      "Kahveli",
      "Dilimli",
      "Kafe"
    ],
    "specs": {
      "Porsiyon": "10-12 Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Servis öncesi buzdolabında dinlendiriniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Antep Fıstıklı & Çikolatalı Mono Kutu Pasta (Dubai Pasta)",
    "code": "PST-DNK-DUB-BOX",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt12/pt12_15.png",
    "description": "Şeffaf monobox ambalajında, çıtır kadayıf, yoğun Antep fıstığı ezmesi ve akışkan çikolata ganajlı mono pasta.",
    "tags": [
      "Donuk Pasta",
      "Antep Fıstığı",
      "Dubai Pasta",
      "Mono Pasta",
      "Kutu Pasta",
      "Çikolata"
    ],
    "specs": {
      "Porsiyon": "12 Adet Bireysel Mono Box",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Kendi özel kutusunda pratik paket ve masa servisi."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Lotus Bisküvili & Yaban Mersinli Bütün Pasta (Dilimli)",
    "code": "PST-DNK-LOT-BLU",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt12/pt12_16.png",
    "description": "Lotus karamel bisküvisi, yoğun çikolata tabanı ve taze yaban mersini taneleriyle süslenmiş hazır dilimli bütün pasta.",
    "tags": [
      "Donuk Pasta",
      "Lotus",
      "Yaban Mersini",
      "Bütün Pasta",
      "Dilimli",
      "Karamel"
    ],
    "specs": {
      "Porsiyon": "12 Dilim Bütün Pasta",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 4 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Dilim bazlı veya bütün olarak servis edilebilir."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Yoğun Çikolatalı & Fıstık Ezmeli Dilim Pasta",
    "code": "PST-DNK-PNT-CHOC",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt12/pt12_17.png",
    "description": "Nemli kakaolu pandispanya, fıstık ezmeli krema dolgusu ve bitter çikolata ganajlı dilim pasta.",
    "tags": [
      "Donuk Pasta",
      "Çikolata",
      "Fıstık Ezmesi",
      "Ganaj",
      "Dilimli",
      "Pastane"
    ],
    "specs": {
      "Porsiyon": "10-12 Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Servis öncesi +4°C'de çözündürünüz."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Karamelli & Fındık Parçacıklı Mono Pasta",
    "code": "PST-DNK-CRM-MONO",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt12/pt12_18.png",
    "description": "Karamel sos kaplamalı, kavrulmuş fındık krokantlı ve vanilyalı mus dolgulu tek kişilik mono pasta.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Karamel",
      "Fındık",
      "Krokant",
      "Tek Kişilik"
    ],
    "specs": {
      "Porsiyon": "12 Adet Tek Kişilik Mono",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Tabakta şık sunumlar için ideal tek kişilik porsiyon."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Kuruyemişli & Kırmızı Meyveli Fudgy Brownie Dilim",
    "code": "PST-DNK-BRW-NUT",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt12/pt12_19.png",
    "description": "Fındık, ceviz ve kurutulmuş kırmızı meyvelerle zenginleştirilmiş, yoğun çikolatalı fudgy brownie dilimi.",
    "tags": [
      "Donuk Pasta",
      "Brownie",
      "Kuruyemiş",
      "Kırmızı Meyve",
      "Fudgy",
      "Çikolata"
    ],
    "specs": {
      "Porsiyon": "12-16 Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat veya ılık servis",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Ilık servis edilerek dondurma eşliğinde sunulabilir."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Antep Fıstıklı & Ahududu Katmanlı Dilim Pasta",
    "code": "PST-DNK-PST-RAS",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt12/pt12_20.png",
    "description": "Yoğun Antep fıstıklı pandispanya katmanları arasında mayhoş ahududu marmelatı ve beyaz çikolata kreması.",
    "tags": [
      "Donuk Pasta",
      "Antep Fıstığı",
      "Ahududu",
      "Dilimli",
      "Pastane",
      "Gurme"
    ],
    "specs": {
      "Porsiyon": "10-12 Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Servis öncesi buzdolabında çözündürünüz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Çikolata Kaplı Çilekli Mono Pasta",
    "code": "PST-DNK-MN-CHOC-STR",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_1.png",
    "description": "Parlak çikolata glazür kaplaması, ipeksi krema dolgusu ve üzerinde taze çilek dilimi ile şık sunumlu bireysel mono pasta.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Çikolata",
      "Çilek",
      "Tek Kişilik",
      "Glazür",
      "Kafe Tatlısı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C donuk muhafaza ediniz.",
      "Servis Tavsiyesi": "Çözündükten sonra doğrudan servis ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Antep Fıstıklı Mono Pasta (Fıstık Rüyası)",
    "code": "PST-DNK-MN-PST",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_2.png",
    "description": "Yoğun Antep fıstıklı ganaj kaplama, hafif bisküvi tabanı ve fıstık taneleriyle süslenmiş gurme tek kişilik pasta.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Antep Fıstığı",
      "Fıstık Ganaj",
      "Gurme",
      "Tek Kişilik"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C donuk muhafaza ediniz.",
      "Servis Tavsiyesi": "Taze kahve ve çay ile mükemmel uyum."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Limonlu & Glazürlü Mono Kubbe Pasta",
    "code": "PST-DNK-MN-LIM",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_3.png",
    "description": "Ferahlatıcı limon kreması, parlak sarı ayna glazür kaplama ve nane yaprağı süslemesiyle hafif narenciye mono tatlısı.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Limonlu",
      "Kubbe Pasta",
      "Ferahlatıcı",
      "Narenciye"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C'de saklayınız.",
      "Servis Tavsiyesi": "Soğuk servis önerilir."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Orman Meyveli & Ahududulu Mono Pasta (Red Berry)",
    "code": "PST-DNK-MN-RED",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_4.png",
    "description": "Canlı kırmızı glazür kaplı, taze ahududu meyvesi ve fındık tabanlı mayhoş orman meyveli bireysel mono pasta.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Orman Meyveli",
      "Ahududu",
      "Red Berry",
      "Glazür"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C donuk muhafaza ediniz.",
      "Servis Tavsiyesi": "Çözündükten sonra tabak sunumuna hazırdır."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Lotus Bisküvili Karamel Mono Pasta",
    "code": "PST-DNK-MN-LOT",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_5.png",
    "description": "Orijinal Lotus Biscoff karamel ezmesi, baharatlı bisküvi parçaları ve vanilyalı mus dolgulu mono kubbe pasta.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Lotus",
      "Biscoff",
      "Karamel",
      "Bisküvili"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C donuk",
      "Servis Tavsiyesi": "Espresso ve filtre kahve yanına tavsiye edilir."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Rocher Fındıklı & Çikolatalı Mono Pasta",
    "code": "PST-DNK-MN-ROC",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_6.png",
    "description": "Kavrulmuş fındık parçacıklı çıtır sütlü çikolata kabuğu, akışkan pralin ve fındık krema dolgulu lüks mono tatlı.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Rocher",
      "Fındıklı",
      "Çikolata",
      "Pralin"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C muhafaza ediniz.",
      "Servis Tavsiyesi": "Oda sıcaklığına yakın kıvamda tüketilmesi önerilir."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Karamel Soslu & Kremalı Katlı Dilim Pasta",
    "code": "PST-DNK-DL-CRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_7.png",
    "description": "Tereyağlı bisküvi tabanı, kat kat ipeksi pastacı kreması ve yoğun akışkan karamel sos kaplamalı hazır dilimli pasta.",
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Karamel",
      "Kremalı",
      "Kafe Pasta",
      "Porsiyonluk"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C muhafaza",
      "Servis Tavsiyesi": "+4°C'de çözündürünüz."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Antep Fıstıklı & Çikolatalı Katlı Dilim Pasta",
    "code": "PST-DNK-DL-PSTC",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_8.png",
    "description": "Zengin Antep fıstığı kreması ve nemli kakaolu pandispanya katmanlarının uyumuyla hazırlanan dilim pasta.",
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Antep Fıstığı",
      "Çikolata",
      "Katlı Pasta",
      "Gurme"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C donuk",
      "Servis Tavsiyesi": "Çözündükten sonra servis ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Moka Kahveli & Fındıklı Dilim Pasta",
    "code": "PST-DNK-DL-MOK",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_9.png",
    "description": "Aromatik kahve dolgusu, kavrulmuş fındık parçaları ve yumuşak kahveli pandispanya katmanları içeren dilim pasta.",
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Moka",
      "Kahveli",
      "Fındıklı",
      "Barista"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Sıcak içecekler eşliğinde servis ediniz."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Karaorman Meyveli (Schwarzwalder) Dilim Pasta",
    "code": "PST-DNK-DL-BLF",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_10.png",
    "description": "Klasik Alman Karaorman pastası; yoğun bitter kakaolu pandispanya, vişne sosu ve beyaz krema katmanları.",
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Karaorman",
      "Vişneli",
      "Schwarzwalder",
      "Çikolata"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Servis öncesi +4°C'de dinlendiriniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Çikolatalı & Fındık Parçacıklı Dilim Kek",
    "code": "PST-DNK-DL-CHK-KEK",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_11.png",
    "description": "Yoğun kakaolu kek tabanı, kremamsı çikolata dolgusu ve kıtır fındık kaplamasıyla porsiyonluk hazır dilim kek.",
    "tags": [
      "Donuk Pasta",
      "Dilimli Kek",
      "Çikolata",
      "Fındıklı",
      "Kafe Keki",
      "Porsiyonluk"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Oda sıcaklığına gelince servis ediniz."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Geleneksel Çikolatalı Mozaik Pasta Dilimi",
    "code": "PST-DNK-DL-MOZ",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_12.png",
    "description": "Geleneksel lezzetiyle tereyağlı bisküvi parçaları ve hakiki kakao ganajından üretilen pratik mozaik pasta dilimi.",
    "tags": [
      "Donuk Pasta",
      "Mozaik Pasta",
      "Bisküvili",
      "Çikolata",
      "Geleneksel",
      "Dilimli"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis edilir."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Çilekli Mono Box Magnolia & Kutu Pasta",
    "code": "PST-DNK-BX-STR",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_13.png",
    "description": "Özel şeffaf kutusunda, taze çilek sosu, ufalanmış bebe bisküvisi ve kadife magnolia kreması içeren kutu tatlısı.",
    "tags": [
      "Donuk Pasta",
      "Kutu Pasta",
      "Mono Box",
      "Magnolia",
      "Çilekli",
      "Paket Servis"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Box (Kutulu)",
      "Ambalaj": "Koli / Kutu (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kutusunda pratik kaşıkla tüketime hazır."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Oreo & Çikolatalı Mono Box Kutu Pasta",
    "code": "PST-DNK-BX-OREO",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_14.png",
    "description": "Şeffaf kutuda Oreo bisküvi kırıntıları, çift katmanlı çikolata ganajı ve vanilyalı pürüzsüz krema.",
    "tags": [
      "Donuk Pasta",
      "Kutu Pasta",
      "Mono Box",
      "Oreo",
      "Çikolata",
      "Kafe Tatlısı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Box",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis yapınız."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Lotus Biscoff Mono Box Kutu Pasta",
    "code": "PST-DNK-BX-LOT",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_15.png",
    "description": "Bütün Lotus bisküvi taçlandırması, karamelize bisküvi ezmesi ve ipeksi tatlı kremasıyla hazırlanan popüler kutu tatlı.",
    "tags": [
      "Donuk Pasta",
      "Kutu Pasta",
      "Mono Box",
      "Lotus Biscoff",
      "Karamel",
      "Magnolia"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Box",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kendi kutusunda veya tabakta sunulabilir."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Çikolatalı Kubbe Rulo Dilim Pasta (D-Kek)",
    "code": "PST-DNK-DL-KUB",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_16.png",
    "description": "Kubbe formunda yoğun kakaolu nemli kek, çikolata kaplama ve rende çikolata talaşlarıyla bezenmiş porsiyonluk pasta.",
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Kubbe Kek",
      "D-Kek",
      "Çikolata",
      "Rulo Pasta"
    ],
    "specs": {
      "Porsiyon": "Porsiyonluk Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kahve eşliğinde servis ediniz."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Orman Meyveli & Crumble Cheesecake Dilimi",
    "code": "PST-DNK-DL-CRM-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_17.png",
    "description": "Fırınlanmış tereyağlı çıtır crumble (kırıntı) üst katmanı, taze yaban mersini dolgusu ve kremsi cheesecake dokusu.",
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "Crumble",
      "Orman Meyveli",
      "Kırıntılı",
      "Dilimli"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "+4°C dolapta çözündükten sonra servis ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Çikolata Dolgulu Cookie Turta (Cookie Pie) Dilimi",
    "code": "PST-DNK-DL-CKP",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_18.png",
    "description": "Amerikan tarzı dev kurabiye hamuru arasında akışkan çikolata kreması dolgulu gurme Cookie Pie dilimi.",
    "tags": [
      "Donuk Pasta",
      "Cookie Pie",
      "Kurabiye Turta",
      "Çikolata Dolgulu",
      "Ilık Tatlı",
      "Kafe"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "Mikrodalgada 20-30 sn veya +4°C dolapta 1 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Hafif ısıtılarak vanilyalı dondurma ile servis önerilir."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Çilekli & Antep Fıstıklı Mono Cheesecake",
    "code": "PST-DNK-MN-STR-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_19.png",
    "description": "Bireysel yuvarlak formda bisküvi tabanı, fırın cheesecake dolgusu, çilek marmelatı ve beyaz çikolata süslemesi.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Cheesecake",
      "Çilekli",
      "Antep Fıstıklı",
      "Tek Kişilik"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Cheesecake",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Dubai Kadayıflı & Fıstıklı Mono Küre Pasta",
    "code": "PST-DNK-MN-DUB-KAD",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt13/pt13_20.png",
    "description": "Dışı tereyağında kavrulmuş çıtır tel kadayıfla kaplı, içi yoğun Antep fıstığı ezmeli krema ve çikolata dolgulu trend Dubai küre pasta.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Dubai Çikolatası",
      "Kadayıflı",
      "Antep Fıstığı",
      "Küre Pasta",
      "Trend"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Küre",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Özel altın altlığı ile doğrudan servise hazırdır."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk İtalyan Tiramisu Üçgen Dilim Pasta",
    "code": "PST-DNK-DL-TIR-TRI",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_1.png",
    "description": "Espresso şurubuyla ıslatılmış yumuşacık pandispanya katları, zengin mascarpone peynirli krema ve yoğun kakao tozu.",
    "tags": [
      "Donuk Pasta",
      "Tiramisu",
      "İtalyan",
      "Kahveli",
      "Dilimli Pasta",
      "Mascarpone"
    ],
    "specs": {
      "Porsiyon": "Hazır Üçgen Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Frambuazlı & Beyaz Çikolatalı Dilim Pasta",
    "code": "PST-DNK-DL-FRM-WHT",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_2.png",
    "description": "Kakaolu pandispanya katları arasında ipeksi beyaz çikolata kreması ve üstte bol taze frambuaz jölesi.",
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Frambuazlı",
      "Beyaz Çikolata",
      "Orman Meyveli",
      "Pastane"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Çözündükten sonra servis ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Böğürtlenli & Mor Glazürlü Mono Kubbe Pasta",
    "code": "PST-DNK-MN-BGR",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_3.png",
    "description": "Mor orman meyveli ayna glazür kaplama, hindistan cevizi işlemeli etek, böğürtlen mus dolgulu tek kişilik zarif kubbe pasta.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Böğürtlenli",
      "Glazür",
      "Kubbe Pasta",
      "Orman Meyvesi"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Kubbe",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis önerilir."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Kare Porsiyon İtalyan Tiramisu",
    "code": "PST-DNK-SQ-TIR",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_4.png",
    "description": "Kare kesim modern formuyla espresso aromalı kedidili bisküvi, mascarpone mus ve kakao örtüsüyle hazırlanmış tiramisu.",
    "tags": [
      "Donuk Pasta",
      "Tiramisu",
      "Kare Dilim",
      "İtalyan",
      "Kahveli",
      "Kafe"
    ],
    "specs": {
      "Porsiyon": "Bireysel Kare Porsiyon",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "+4°C dolapta dinlendirip servis ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Geleneksel Ballı Medovik Dilim Pasta",
    "code": "PST-DNK-DL-MED",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_5.png",
    "description": "Geleneksel Rus tarifine sadık, incecik karamelize ballı bisküvi yaprakları ve hafif ekşi krema katmanlı gurme Medovik pasta.",
    "tags": [
      "Donuk Pasta",
      "Medovik",
      "Bal Pastası",
      "Ballı",
      "Rus Pastası",
      "Dilimli"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Sıcak çay veya filtre kahve eşliğinde mükemmel lezzet."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Frambuazlı & Egzotik Meyveli Mono Parfe",
    "code": "PST-DNK-MN-PRF-1",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_6.png",
    "description": "Yivli pembe parfe gövdesi, üzerinde donuk böğürtlen, frambuaz ve mango küpleri bulunan ferahlatıcı dondurmalı tatlı.",
    "tags": [
      "Donuk Pasta",
      "Mono Parfe",
      "Frambuazlı",
      "Semifreddo",
      "Dondurmalı Tatlı",
      "Meyveli"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Parfe",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "Servisten 10-15 dk önce buzluktan çıkarınız",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C donuk muhafaza",
      "Servis Tavsiyesi": "Yarı donuk (semifreddo) olarak servis edilir."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Orman Meyveli Çiçek Desenli Mono Parfe",
    "code": "PST-DNK-MN-PRF-2",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_7.png",
    "description": "Kristalize orman meyveleriyle taçlandırılmış, pembe meyve kremalı özel formlu mono parfe tatlısı.",
    "tags": [
      "Donuk Pasta",
      "Mono Parfe",
      "Orman Meyveli",
      "Çiçek Formu",
      "Semifreddo",
      "Donuk Tatlı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Parfe",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "Servis öncesi 10 dk oda sıcaklığında dinlendirin",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Yarı donuk servis tavsiye edilir."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Karışık Meyveli Silindir Mono Parfe",
    "code": "PST-DNK-MN-PRF-3",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_8.png",
    "description": "Meyve taneleri, taze süt kreması ve frambuaz püresiyle hazırlanan silindirik formlu soğuk mono parfe.",
    "tags": [
      "Donuk Pasta",
      "Mono Parfe",
      "Meyveli",
      "Silindir Parfe",
      "Donuk Tatlı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "10-15 dakika",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk / donuk tüketim."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Yaban Mersinli (Blueberry) Cheesecake Dilimi",
    "code": "PST-DNK-DL-BLU-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_9.png",
    "description": "New York stili fırınlanmış peynir dolgusu, tereyağlı bisküvi tabanı ve üstte tane yaban mersini soslu nefis cheesecake dilimi.",
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "Yaban Mersinli",
      "Blueberry",
      "Dilimli Pasta",
      "Kafe"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 3-4 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "+4°C'de çözündürerek soğuk servis ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Kahve Çekirdeği Şekilli Mono Mousse Pasta",
    "code": "PST-DNK-MN-COF-BEAN",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_10.png",
    "description": "Gerçek kahve çekirdeği görünümünde, espresso aromalı bitter çikolata ganajı ve kahveli mus dolgulu özel tasarım mono tatlı.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Kahve Çekirdeği",
      "Espresso",
      "Mousse",
      "Çikolata",
      "Özel Tasarım"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Özel Mono",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Nitelikli kahve sunumları için idealdir."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Bitter Çikolata & Fıstık Kaplı Baton Mono Kek",
    "code": "PST-DNK-MN-BAT-CHOC",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_11.png",
    "description": "Rocher çikolata kaplamalı, fıstık dokunuşlu, içi nemli çikolatalı brownie ve krema dolgulu dikdörtgen baton mono kek.",
    "tags": [
      "Donuk Pasta",
      "Baton Kek",
      "Mono Kek",
      "Bitter Çikolata",
      "Fıstıklı",
      "Snack Kek"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Baton Mono",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Doğrudan servise uygundur."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Gökkuşağı (Rainbow) Katlı Dilim Pasta",
    "code": "PST-DNK-DL-RNB",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_12.png",
    "description": "Rengarenk pandispanya katları, hafif vanilyalı süt kreması ve üzeri fıstık-bisküvi kırıntılarıyla neşeli dilim pasta.",
    "tags": [
      "Donuk Pasta",
      "Rainbow",
      "Gökkuşağı",
      "Katlı Pasta",
      "Renkli Pasta",
      "Dilimli"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Servis öncesi +4°C'de dinlendiriniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Karamelli & Krokantlı Dilim Pasta",
    "code": "PST-DNK-DL-CRM-KROK",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_13.png",
    "description": "Karamel kreması, çıtır fındık krokant parçacıkları ve yumuşacık pandispanya katmanlarıyla zengin dilim pasta.",
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Karamel",
      "Krokant",
      "Fındıklı",
      "Kafe Tatlısı"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "+4°C'de çözündükten sonra servis ediniz."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Oreo & Karamel Kremalı Mono Pasta",
    "code": "PST-DNK-MN-OREO-CRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_14.png",
    "description": "Siyah Oreo bisküvi tabanı, karamel mousse, çırpılmış vanilya kreması ve bütün Oreo bisküvisiyle tek kişilik mono tatlı.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Oreo",
      "Karamel",
      "Bisküvili",
      "Tek Kişilik"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Yuvarlak Mono",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis önerilir."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Antep Fıstıklı & Ganajlı Mono Pasta",
    "code": "PST-DNK-MN-PST-GNJ",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_15.png",
    "description": "Doğal yeşil fıstıklı pandispanya, yoğun çikolata ganaj tabakası ve fıstıklı krem şantiyle süslenmiş mono pasta.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Antep Fıstığı",
      "Ganaj",
      "Çikolata",
      "Gurme"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Pasta",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kahve yanına servis ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Fıstıklı & Çikolata Kremalı Mini Mono Pasta",
    "code": "PST-DNK-MN-PST-MINI",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_16.png",
    "description": "Fıstık tozu kaplamalı kenarlar, çikolatalı ipeksi mousse ve fıstık draje detaylı butik mono tatlı.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Mini Pasta",
      "Fıstıklı",
      "Çikolatalı",
      "Butik"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Butik Mono",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "+4°C'de servis ediniz."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Çikolatalı Kadife Mousse Dilim Pasta",
    "code": "PST-DNK-DL-CHOC-VLV",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_17.png",
    "description": "Kadife kakaolu sünger katmanları, yoğun çikolatalı ipeksi mousse dolgusu ve toz çikolata örtülü dilim pasta.",
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Çikolata",
      "Mousse",
      "Kadife",
      "Kakaolu"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Servis öncesi dolapta dinlendiriniz."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Yoğun Çikolatalı Mono Box Mousse Tatlısı",
    "code": "PST-DNK-BX-CHOC-MSS",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_18.png",
    "description": "Özel şeffaf kutusunda, çift kademeli bitter ve sütlü çikolata mus, akışkan ganaj ve rende çikolata talaşları.",
    "tags": [
      "Donuk Pasta",
      "Kutu Tatlısı",
      "Mono Box",
      "Çikolata Mousse",
      "Bitter",
      "Yoğun Lezzet"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Box",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kutusunda pratik kaşık servisine uygundur."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Orman Meyveli & Kadife Mono Box Kutu Pasta",
    "code": "PST-DNK-BX-FRM-MSS",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_19.png",
    "description": "Red velvet kek kırıntıları, taze orman meyvesi marmelatı ve beyaz vanilyalı krema katmanlı kutu mono tatlı.",
    "tags": [
      "Donuk Pasta",
      "Kutu Pasta",
      "Mono Box",
      "Orman Meyveli",
      "Red Velvet",
      "Magnolia"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Box",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Profiterollü & Supangle Mono Box Tatlısı",
    "code": "PST-DNK-BX-PRO-SUP",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt14/pt14_20.png",
    "description": "Kutu içerisinde geleneksel vanilya kreması, koyu çikolatalı supangle sosu, çıtır fıstık ve çikolata rendeli tatlı şöleni.",
    "tags": [
      "Donuk Pasta",
      "Kutu Tatlısı",
      "Mono Box",
      "Supangle",
      "Profiterol",
      "Çikolata Sos"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Box",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kendi kutusunda kaşıkla servise hazır."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Antep Fıstıklı Magnolia Mono Box Tatlısı",
    "code": "PST-DNK-BX-PST",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_1.png",
    "description": "Özel Antep fıstığı kreması, ipeksi pastacı vanilyası ve üzeri iri fıstık parçacıklarıyla zenginleştirilmiş tek kişilik mono box kutu tatlı.",
    "tags": [
      "Donuk Pasta",
      "Mono Box",
      "Kutu Tatlısı",
      "Antep Fıstığı",
      "Pistachio",
      "Magnolia"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Box",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kutusunda pratik kaşık servisine uygundur."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Yaban Mersinli & Böğürtlenli Dilim Pasta",
    "code": "PST-DNK-DLM-BLU",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_2.png",
    "description": "Yumuşak kakaolu pandispanya katları arasında mayhoş yaban mersini ve böğürtlenli hafif mus krema, üzerinde parlak meyve glazürü.",
    "tags": [
      "Donuk Pasta",
      "Dilim Pasta",
      "Yaban Mersini",
      "Böğürtlen",
      "Kakaolu Pandispanya",
      "Glazür"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis (Tek Kişilik)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk İtalyan Tiramisu & Kakaolu Mousse Dilim Pasta",
    "code": "PST-DNK-DLM-TIR-CHOC",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_3.png",
    "description": "Espresso aromalı yumuşak kek tabanı, kadifemsi mascarpone vanilya dolgusu ve yoğun çikolata mousse katmanı, üzeri bol kakao tozlu.",
    "tags": [
      "Donuk Pasta",
      "Dilim Pasta",
      "Tiramisu",
      "Çikolata Mousse",
      "Mascarpone",
      "Kakao"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Taze çekilmiş espresso eşliğinde servis önerilir."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Frambuazlı & Çikolatalı Parfe Kup Tatlısı",
    "code": "PST-DNK-KP-FRM-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_4.png",
    "description": "Bireysel sunum bardağında kremsi çikolata ve moka musu, taze bütün frambuaz meyveleri ve pudra şekeri serpiştirmeli nefis parfe kup.",
    "tags": [
      "Donuk Pasta",
      "Kup Tatlısı",
      "Frambuaz",
      "Çikolatalı Parfe",
      "Mono Tatlı",
      "Kafe Menüsü"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kup Bardak",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Bardağında doğrudan servis edilir."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Karamelize Fındık & Krokanlı Mono Pasta",
    "code": "PST-DNK-MN-KRO-CAR",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_5.png",
    "description": "Karamelli ve fındıklı çift katmanlı krema, yumuşak kek tabanı ve üzerinde sıkma karamel kreması ile çıtır karamelize fındık krokanları.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Krokan",
      "Fındıklı",
      "Karamel",
      "Porsiyonluk Pasta"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Çözündükten sonra doğrudan servis ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Bol Çikolata Parçacıklı Gurme Amerikan Cookie (2'li / Koli)",
    "code": "PST-DNK-CKI-CHOC-2",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_6.png",
    "description": "Dışı hafif kıtır, içi yumuşacık ve akışkan bitter & sütlü Belçika çikolatası parçacıklı Amerikan tipi jumbo boy gurme kurabiye.",
    "tags": [
      "Donuk Pasta",
      "Unlu Mamuller",
      "Kurabiye",
      "Cookie",
      "Çikolata Parçacıklı",
      "Amerikan Cookie"
    ],
    "specs": {
      "Porsiyon": "2'li Porsiyon / Koli",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Isıtma": "Oda sıcaklığında 30 dk veya fırında 160°C'de 3-4 dk",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Ilık servis edildiğinde çikolata akışkanlaşır."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Klasik Vanilyalı & Çikolata Taneli Jumbo Cookie (3'lü Sunum)",
    "code": "PST-DNK-CKI-JUMBO-3",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_7.png",
    "description": "Hakiki tereyağı ve vanilya aromasıyla harmanlanmış, yoğun çikolata dolgulu jumbo boy kafe tipi fırınlanmaya hazır gurme cookie.",
    "tags": [
      "Donuk Pasta",
      "Unlu Mamuller",
      "Cookie",
      "Jumbo Cookie",
      "Tereyağlı",
      "Kahve Yanı"
    ],
    "specs": {
      "Porsiyon": "3'lü Sunum Tabağı / Koli",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Isıtma": "Oda sıcaklığında 30 dk veya fırında 160°C'de 3-4 dk",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Filtre kahve ve latte yanında idealdir."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Mavi Haşhaşlı & Limonlu Baton Dilim Kek",
    "code": "PST-DNK-KEK-HSH-LIM",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_8.png",
    "description": "Ferahlatıcı limon kabuğu rendesi ve çıtır mavi haşhaş tohumları ile kabarmış, kahve yanı servisleri için kalın dilimli nefis baton kek.",
    "tags": [
      "Donuk Pasta",
      "Baton Kek",
      "Dilim Kek",
      "Haşhaşlı Kek",
      "Limonlu",
      "Kafe Keki"
    ],
    "specs": {
      "Porsiyon": "Kalın Baton Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1 saat veya oda sıcaklığında 30 dk",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Çay ve kahve sunumlarına uygundur."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Fırın Tipi Çift Çikolatalı Gurme Cookie (2'li Paket)",
    "code": "PST-DNK-CKI-DBL-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_9.png",
    "description": "Bol bitter çikolata parçaları ve altın sarısı pişmiş gevrek dokusuyla çay-kahve saatlerine özel porsiyonluk hazır donuk cookie.",
    "tags": [
      "Donuk Pasta",
      "Cookie",
      "Kurabiye",
      "Çift Çikolatalı",
      "Unlu Mamuller"
    ],
    "specs": {
      "Porsiyon": "2'li Paket / Koli",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Isıtma": "Oda sıcaklığında 30 dk çözündürünüz.",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Ilık servis edilebilir."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Mozaik (Ebruli) Kakaolu & Sade Baton Dilim Kek",
    "code": "PST-DNK-KEK-MOZ-BAT",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_10.png",
    "description": "Geleneksel lezzette kakaolu ve vanilyalı hamurun ebruli kıvrımlarıyla harmanlandığı, porsiyonluk dilimli yumuşacık mozaik baton kek.",
    "tags": [
      "Donuk Pasta",
      "Dilim Kek",
      "Mozaik Kek",
      "Kakaolu Kek",
      "Baton Kek",
      "Unlu Mamuller"
    ],
    "specs": {
      "Porsiyon": "Baton Dilim (Tek Porsiyon)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Sıcak içecekler ile mükemmel uyum sağlar."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Havuçlu, Tarçınlı & Cevizli Gurme Baton Dilim Kek",
    "code": "PST-DNK-KEK-HVC-TRC",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_11.png",
    "description": "Taze rendelenmiş havuç, aromatik Seylan tarçını ve dövülmüş ceviz parçalarıyla zenginleştirilmiş, nemli dokulu klasik havuçlu kek dilimi.",
    "tags": [
      "Donuk Pasta",
      "Havuçlu Kek",
      "Tarçınlı",
      "Cevizli Kek",
      "Baton Dilim",
      "Kafe Keki"
    ],
    "specs": {
      "Porsiyon": "Gurme Baton Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1 saat veya oda sıcaklığında 30 dk",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kahve yanı menülerinde en çok tercih edilen lezzet."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Çikolata Ganajlı & Vanilyalı Kare Mono Kup Tatlısı",
    "code": "PST-DNK-KP-VAN-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_12.png",
    "description": "Şeffaf kare sunum kabında kat kat vanilya kreması, yumuşak pandispanya ve üzerinde kavrulmuş fındıklı akışkan çikolata ganajı.",
    "tags": [
      "Donuk Pasta",
      "Kup Tatlısı",
      "Kare Mono",
      "Vanilyalı",
      "Çikolata Ganaj",
      "Mono Tatlı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kare Mono Kup",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kendi şık kabında kaşıkla pratik servis."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Red Velvet Kalp Mono Pasta",
    "code": "PST-DNK-MN-RED-HRT",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_13.png",
    "description": "Romantik kalp formunda, kadifemsi kırmızı kek kırıntılarıyla kaplanmış, içi yumuşacık peynirli vanilya kremalı özel mono pasta.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Red Velvet",
      "Kalp Pasta",
      "Kırmızı Kadife",
      "Özel Gün"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kalp Mono",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Tabak sunumunda nane yaprağı ve taze meyveyle süslenebilir."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Boston Kremalı & Çikolata Soslu Dilim Pasta",
    "code": "PST-DNK-DLM-BST-CRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_14.png",
    "description": "Altın sarısı sünger pandispanya arasında yoğun çikolata mousse dolgusu, üzeri vanilyalı beyaz krema ve zikzak çikolata çizgili zarif dilim pasta.",
    "tags": [
      "Donuk Pasta",
      "Dilim Pasta",
      "Boston Krema",
      "Çikolatalı Pasta",
      "Kafeterya Tatlısı"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Yulaflı & Damla Çikolatalı Gurme Cookie (2'li)",
    "code": "PST-DNK-CKI-OAT-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_15.png",
    "description": "Besleyici yulaf ezmesi ve yoğun kakao taneleriyle harmanlanmış, çıtır kenarlı ve tok dokulu gurme fırın cookie.",
    "tags": [
      "Donuk Pasta",
      "Cookie",
      "Yulaflı Kurabiye",
      "Damla Çikolatalı",
      "Unlu Mamuller"
    ],
    "specs": {
      "Porsiyon": "2'li Porsiyon / Koli",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Isıtma": "Oda sıcaklığında 30 dk veya 160°C fırında 3 dk",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Sıcak veya soğuk içeceklerle ikram edilebilir."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Limonlu Kadife Kubbe (Lemon Dome) Mono Pasta",
    "code": "PST-DNK-MN-LIM-DOM",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_16.png",
    "description": "Kadife sarı püskürtme dokusuyla göz alıcı kubbe şeklinde, içi ferah limon dolgusu ve hafif bisküvi tabanlı porsiyonluk mono pasta.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Limonlu",
      "Kubbe Pasta",
      "Lemon Dome",
      "Kadife Doku"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kubbe Mono",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Tabak sunumunda şık bir tatlı alternatifi."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Tropikal Mango & Çarkıfelek Kubbe Mono Pasta",
    "code": "PST-DNK-MN-MNG-PAS",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_17.png",
    "description": "Tropikal mango ve passion fruit pürelerinin ferahlatıcı ekşi-tatlı dengesi ile hazırlanan sarı kubbe mono tatlı.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Mango",
      "Passion Fruit",
      "Tropikal",
      "Kubbe"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kubbe Mono",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Karamelli & Fıstıklı Snickers Mono Pasta",
    "code": "PST-DNK-MN-SNK-CAR",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_18.png",
    "description": "Kakaolu kek tabanı, fıstık ezmeli krema katmanı, akışkan sütlü karamel sosu ve bol kavrulmuş yer fıstığı kaplı gurme mono pasta.",
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Snickers",
      "Karamel",
      "Yer Fıstığı",
      "Çikolatalı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Çözündükten sonra doğrudan servis ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Red Velvet & Antep Fıstıklı Gurme Dilim Pasta",
    "code": "PST-DNK-DLM-RED-PST",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_19.png",
    "description": "Kırmızı kadife kek tabanı üzerinde kadifemsi peynir kreması, üzeri bol kırmızı kek tozu ve kırık Antep fıstığı süslemeli şık dilim pasta.",
    "tags": [
      "Donuk Pasta",
      "Dilim Pasta",
      "Red Velvet",
      "Antep Fıstığı",
      "Cheesecake",
      "Kırmızı Kadife"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Red Velvet Cheesecake Dilim Pasta",
    "code": "PST-DNK-DLM-RED-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_20.png",
    "description": "New York usulü fırınlanmış yoğun peynir dolgusu, kırmızı kadife bisküvi tabanı ve fıstıklı kırmızı kadife kaplama ile mükemmel uyum.",
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "Red Velvet",
      "Dilim Pasta",
      "Gurme Tatlı"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Meyve sosu eşliğinde servis edilebilir."
    },
    "isFeatured": false
  },
  {
    "name": "Donuk Yoğun Bitter Çikolatalı & Deniz Tuzlu Gurme Tartlet",
    "code": "PST-DNK-TRT-BIT-CHOC",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_21.png",
    "description": "Gevrek kakaolu tart hamuru içerisinde akışkan ve yoğun bitter Belçika çikolatası ganajı, hafif pudra şekeri ve deniz tuzu dokunuşlu.",
    "tags": [
      "Donuk Pasta",
      "Tartlet",
      "Bitter Çikolata",
      "Ganaj",
      "Deniz Tuzlu",
      "Gurme Tart"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Gurme Tartlet",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1 saat veya oda sıcaklığında 20 dk",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Hafif ısıtıldığında akışkan sufle kıvamına gelir."
    },
    "isFeatured": true
  },
  {
    "name": "Donuk Çıtır Kıtır Craquelin Ekler Kabuğu & Dolgulu Ekler",
    "code": "PST-DNK-EKL-CRQ-10",
    "codeGroup": "20:45 Pastacılık",
    "categoryKey": "donuk-pasta",
    "imageUrl": "/resimler/pt15/pt15_22.png",
    "description": "Fransız usulü craquelin kıtır kaplamalı şu hamuru, vanilyalı pastacı kreması dolgulu veya dolgusuz servise hazır çıtır ekler.",
    "tags": [
      "Donuk Pasta",
      "Ekler",
      "Craquelin",
      "Şu Hamuru",
      "Fransız Pastacılığı",
      "Unlu Mamuller"
    ],
    "specs": {
      "Porsiyon": "Tekli / Koli İçi Çoklu",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Servis": "+4°C dolapta 1 saatte servise hazır hale gelir.",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Üzerine çikolata ganaj veya pudra şekeri ile servis edilir."
    },
    "isFeatured": true
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
    const cat = CATEGORIES_MAP[p.categoryKey] || CATEGORIES_MAP["donuk-pasta"];
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
