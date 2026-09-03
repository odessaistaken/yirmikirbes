import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ürün Kataloğu | Yirmikirbes",
  description: "Tüm kategorilere göre düzenlenmiş eksiksiz ürün listemiz — Püreler, Şuruplar, Kokteyller, Bar Sos, Pastalar, Waffle Malzemeleri ve daha fazlası.",
};

/* ─── Statik katalog verisi ─────────────────────────────────────────────────── */
const CATALOG = [
  {
    id: "cat-1",
    name: "Püreler",
    icon: "🍓",
    description: "Caffè NONNO Frozen püreleri, DaVinci Fruit Mix ve Krater meyve karışımları.",
    products: [
      { code: "NON-RAS-750", name: "Caffè NONNO Raspberry Frozen Frambuaz Püresi 750ml" },
      { code: "NON-STR-750", name: "Caffè NONNO Strawberry Frozen Çilek Püresi 750ml" },
      { code: "NON-MNG-750", name: "Caffè NONNO Mango Frozen Mango Püresi 750ml" },
      { code: "NON-PAS-750", name: "Caffè NONNO Passion Frozen Passion Fruit Püresi 750ml" },
      { code: "NON-BLU-750", name: "Caffè NONNO Blueberry Frozen Yaban Mersinli Püre 750ml" },
      { code: "NON-GRN-750", name: "Caffè NONNO Green Tea Frozen Yeşil Çay Püresi 750ml" },
      { code: "NON-PCH-750", name: "Caffè NONNO Peach Frozen Şeftali Püresi 750ml" },
      { code: "NON-LMN-750", name: "Caffè NONNO Lemon Frozen Limon Püresi 750ml" },
      { code: "NON-CRY-750", name: "Caffè NONNO Cherry Frozen Vişne Püresi 750ml" },
      { code: "NON-CKN-750", name: "Caffè NONNO Coconut Frozen Hindistancevizi Püresi 750ml" },
      { code: "NON-BBR-750", name: "Caffè NONNO Blackberry Frozen Böğürtlen Püresi 750ml" },
      { code: "NON-WMN-750", name: "Caffè NONNO Watermelon Frozen Karpuz Püresi 750ml" },
      { code: "DAV-FMX-MNG", name: "DaVinci Gourmet Mango Fruit Mix Püresi 1L" },
      { code: "DAV-FMX-STR", name: "DaVinci Gourmet Strawberry Fruit Mix Çilek Püresi 1L" },
      { code: "DAV-FMX-RAS", name: "DaVinci Gourmet Raspberry Fruit Mix Frambuaz Püresi 1L" },
      { code: "DAV-FMX-PCH", name: "DaVinci Gourmet Peach Fruit Mix Şeftali Püresi 1L" },
      { code: "DAV-FMX-BLU", name: "DaVinci Gourmet Blueberry Fruit Mix Yaban Mersini Püresi 1L" },
      { code: "DAV-FMX-PAS", name: "DaVinci Gourmet Passion Fruit Mix Çarkıfelek Püresi 1L" },
      { code: "DAV-FMX-LYC", name: "DaVinci Gourmet Lychee Fruit Mix Liçi Püresi 1L" },
      { code: "KRT-MNG-1L", name: "Krater Mango Meyve Karışımı 1L" },
      { code: "KRT-STR-1L", name: "Krater Çilek Meyve Karışımı 1L" },
      { code: "KRT-TRP-1L", name: "Krater Tropikal Meyve Karışımı 1L" },
      { code: "KRT-PCH-1L", name: "Krater Şeftali Meyve Karışımı 1L" },
      { code: "KRT-BLU-1L", name: "Krater Yaban Mersini Meyve Karışımı 1L" },
      { code: "KRT-KRP-1L", name: "Krater Karpuz Meyve Karışımı 1L" },
      { code: "KRT-LMN-1L", name: "Krater Limon Meyve Karışımı 1L" },
      { code: "KRT-CRY-1L", name: "Krater Kiraz Meyve Karışımı 1L" },
    ],
  },
  {
    id: "cat-2",
    name: "Şuruplar",
    icon: "🍯",
    description: "DaVinci Gourmet, Caffè NONNO ve Monte Cristo aromalı barista şurupları.",
    products: [
      { code: "NON-CAR-750", name: "Caffè NONNO Caramel Aromalı Şurup 750ml" },
      { code: "NON-MNT-750", name: "Caffè NONNO Mint Aromalı Nane Şurubu 750ml" },
      { code: "NON-VNL-750", name: "Caffè NONNO Vanilla Aromalı Vanilya Şurubu 750ml" },
      { code: "NON-HZL-750", name: "Caffè NONNO Hazelnut Aromalı Fındık Şurubu 750ml" },
      { code: "NON-CHL-750", name: "Caffè NONNO Chocolate Aromalı Çikolata Şurubu 750ml" },
      { code: "NON-ALM-750", name: "Caffè NONNO Almond Aromalı Badem Şurubu 750ml" },
      { code: "NON-CKN-SYR-750", name: "Caffè NONNO Coconut Aromalı Hindistancevizi Şurubu 750ml" },
      { code: "NON-TFF-750", name: "Caffè NONNO Toffee Aromalı Şurup 750ml" },
      { code: "NON-WCH-750", name: "Caffè NONNO White Chocolate Aromalı Beyaz Çikolata Şurubu 750ml" },
      { code: "NON-IRB-750", name: "Caffè NONNO Irish Cream Aromalı Şurup 750ml" },
      { code: "NON-GBR-750", name: "Caffè NONNO Gingerbread Aromalı Zencefilli Kurabiye Şurubu 750ml" },
      { code: "NON-PST-750", name: "Caffè NONNO Pistachio Aromalı Antep Fıstığı Şurubu 750ml" },
      { code: "NON-ROS-750", name: "Caffè NONNO Rose Aromalı Gül Şurubu 750ml" },
      { code: "NON-LVN-750", name: "Caffè NONNO Lavender Aromalı Lavanta Şurubu 750ml" },
      { code: "NON-BBR-SYR-750", name: "Caffè NONNO Blueberry Aromalı Yaban Mersini Şurubu 750ml" },
      { code: "NON-STR-SYR-750", name: "Caffè NONNO Strawberry Aromalı Çilek Şurubu 750ml" },
      { code: "NON-RAS-SYR-750", name: "Caffè NONNO Raspberry Aromalı Frambuaz Şurubu 750ml" },
      { code: "NON-PCH-SYR-750", name: "Caffè NONNO Peach Aromalı Şeftali Şurubu 750ml" },
      { code: "NON-MNG-SYR-750", name: "Caffè NONNO Mango Aromalı Şurup 750ml" },
      { code: "DAV-VNL-750", name: "DaVinci Gourmet Vanilla Klasik Vanilya Şurubu 750ml" },
      { code: "DAV-CAR-750", name: "DaVinci Gourmet Caramel Karamel Şurubu 750ml" },
      { code: "DAV-HZL-750", name: "DaVinci Gourmet Hazelnut Fındık Şurubu 750ml" },
      { code: "DAV-CHC-750", name: "DaVinci Gourmet Chocolate Çikolata Şurubu 750ml" },
      { code: "DAV-IRB-750", name: "DaVinci Gourmet Irish Cream Şurubu 750ml" },
      { code: "DAV-CKN-750", name: "DaVinci Gourmet Coconut Hindistancevizi Şurubu 750ml" },
      { code: "DAV-ALM-750", name: "DaVinci Gourmet Almond Badem Şurubu 750ml" },
      { code: "DAV-MNT-750", name: "DaVinci Gourmet Mint Nane Şurubu 750ml" },
      { code: "DAV-PST-750", name: "DaVinci Gourmet Pistachio Antep Fıstığı Şurubu 750ml" },
      { code: "DAV-WCH-750", name: "DaVinci Gourmet White Chocolate Beyaz Çikolata Şurubu 750ml" },
      { code: "DAV-BRW-750", name: "DaVinci Gourmet Brown Sugar Esmer Şeker Şurubu 750ml" },
      { code: "MCR-VNL-700", name: "Monte Cristo Vanilla Aromalı Vanilya Şurubu 700ml" },
      { code: "MCR-CAR-700", name: "Monte Cristo Caramel Aromalı Karamel Şurubu 700ml" },
      { code: "MCR-HZL-700", name: "Monte Cristo Hazelnut Aromalı Fındık Şurubu 700ml" },
      { code: "MCR-CHC-700", name: "Monte Cristo Chocolate Aromalı Çikolata Şurubu 700ml" },
      { code: "MCR-STR-700", name: "Monte Cristo Strawberry Aromalı Çilek Şurubu 700ml" },
      { code: "MCR-MNT-700", name: "Monte Cristo Mint Aromalı Nane Şurubu 700ml" },
      { code: "MCR-BLU-700", name: "Monte Cristo Blueberry Aromalı Yaban Mersini Şurubu 700ml" },
      { code: "MCR-MNG-700", name: "Monte Cristo Mango Aromalı Şurup 700ml" },
      { code: "MCR-RAS-700", name: "Monte Cristo Raspberry Aromalı Frambuaz Şurubu 700ml" },
      { code: "MCR-ROS-700", name: "Monte Cristo Rose Aromalı Gül Şurubu 700ml" },
      { code: "MCR-PST-700", name: "Monte Cristo Pistachio Aromalı Antep Fıstığı Şurubu 700ml" },
      { code: "MCR-CKN-700", name: "Monte Cristo Coconut Aromalı Hindistancevizi Şurubu 700ml" },
      { code: "MCR-TFF-700", name: "Monte Cristo Toffee Aromalı Şurup 700ml" },
      { code: "MCR-LVN-700", name: "Monte Cristo Lavender Aromalı Lavanta Şurubu 700ml" },
      { code: "MCR-PCH-700", name: "Monte Cristo Peach Aromalı Şeftali Şurubu 700ml" },
      { code: "MCR-WCH-700", name: "Monte Cristo White Chocolate Aromalı Beyaz Çikolata Şurubu 700ml" },
      { code: "MCR-ALM-700", name: "Monte Cristo Almond Aromalı Badem Şurubu 700ml" },
      { code: "MCR-CKY-700", name: "Monte Cristo Cookie Aromalı Kurabiye Şurubu 700ml" },
      { code: "MCR-CNF-700", name: "Monte Cristo Cinnamon Aromalı Tarçın Şurubu 700ml" },
    ],
  },
  {
    id: "cat-7",
    name: "Kokteyller",
    icon: "🍹",
    description: "EASY MIX doğal meyve ve botanik kokteyl premiksleri.",
    parentName: "Şuruplar",
    products: [
      { code: "EZM-MAR-700", name: "EASY MIX Margarita Kokteyl Premiksi 700ml" },
      { code: "EZM-MJT-700", name: "EASY MIX Mojito Kokteyl Premiksi 700ml" },
      { code: "EZM-PSN-700", name: "EASY MIX Passion Fruit Kokteyl Premiksi 700ml" },
      { code: "EZM-LCH-700", name: "EASY MIX Lychee Martini Kokteyl Premiksi 700ml" },
      { code: "EZM-MNG-700", name: "EASY MIX Mango Daiquiri Kokteyl Premiksi 700ml" },
      { code: "EZM-STR-700", name: "EASY MIX Strawberry Daiquiri Kokteyl Premiksi 700ml" },
      { code: "EZM-WMP-700", name: "EASY MIX Watermelon Punch Kokteyl Premiksi 700ml" },
      { code: "EZM-PNA-700", name: "EASY MIX Pina Colada Kokteyl Premiksi 700ml" },
      { code: "EZM-APC-700", name: "EASY MIX Aperitif Citrus Kokteyl Premiksi 700ml" },
      { code: "EZM-GRS-700", name: "EASY MIX Grenadine Pomegranate Nar Şurubu 700ml" },
      { code: "EZM-BLC-700", name: "EASY MIX Blue Curacao Portakal Likörü Aromalı Şurup 700ml" },
      { code: "EZM-RFR-TRP-700", name: "EASY MIX Refresher Tropikal Koktey Premiksi 700ml" },
      { code: "EZM-RFR-MNT-700", name: "EASY MIX Refresher Mint & Lime Kokteyl Premiksi 700ml" },
      { code: "EZM-RFR-ELD-700", name: "EASY MIX Refresher Elderflower Mürver Çiçeği Premiksi 700ml" },
      { code: "EZM-RFR-GNG-700", name: "EASY MIX Refresher Ginger & Lemon Zencefil Limon Premiksi 700ml" },
      { code: "EZM-RFR-HBK-700", name: "EASY MIX Refresher Hibiscus & Rose Kokteyl Premiksi 700ml" },
      { code: "EZM-LMN-700", name: "EASY MIX Premium Limonata Şurubu (Klasik & Nane) 700ml" },
      { code: "EZM-SPR-700", name: "EASY MIX Sparkling Spritz Aperitif Premiksi 700ml" },
    ],
  },
  {
    id: "cat-4",
    name: "Bar Sos",
    icon: "🍫",
    description: "DaVinci 2L ve Caffè NONNO 750g karamel, çikolata ve meyve sosları.",
    products: [
      { code: "DAV-SOS-CAR-2L", name: "DaVinci Gourmet Karamel Sos 2L" },
      { code: "DAV-SOS-CHC-2L", name: "DaVinci Gourmet Çikolata Sos 2L" },
      { code: "DAV-SOS-WCH-2L", name: "DaVinci Gourmet Beyaz Çikolata Sos 2L" },
      { code: "DAV-SOS-STR-2L", name: "DaVinci Gourmet Çilek Sos 2L" },
      { code: "DAV-SOS-RAS-2L", name: "DaVinci Gourmet Frambuaz Sos 2L" },
      { code: "DAV-SOS-MNG-2L", name: "DaVinci Gourmet Mango Sos 2L" },
      { code: "NON-SOS-CAR-750", name: "Caffè NONNO Karamel Bar Sosu 750g" },
      { code: "NON-SOS-CHC-750", name: "Caffè NONNO Çikolata Bar Sosu 750g" },
      { code: "NON-SOS-WCH-750", name: "Caffè NONNO Beyaz Çikolata Bar Sosu 750g" },
      { code: "NON-SOS-STR-750", name: "Caffè NONNO Çilek Bar Sosu 750g" },
      { code: "NON-SOS-RAS-750", name: "Caffè NONNO Frambuaz Bar Sosu 750g" },
      { code: "NON-SOS-CDM-750", name: "Caffè NONNO Condensed Milk (Yoğunlaştırılmış Süt) Sosu 750g" },
      { code: "NON-SOS-BCR-750", name: "Caffè NONNO Blue Curacao Portakal Aromalı Sos 750g" },
      { code: "NON-SOS-MNT-750", name: "Caffè NONNO Nane (Mint) Sos 750g" },
      { code: "NON-SOS-GRN-750", name: "Caffè NONNO Nar (Grenadine) Sos 750g" },
    ],
  },
  {
    id: "cat-9",
    name: "Taze – Butik Pastalar",
    icon: "🍰",
    description: "Günlük taze üretim, el yapımı butik pasta ve tatlı çeşitleri.",
    parentName: "Pastalar",
    products: [
      { code: "PST-TZ-CHK-NRM", name: "Taze Klasik New York Cheesecake Dilim" },
      { code: "PST-TZ-CHK-STR", name: "Taze Çilekli New York Cheesecake Dilim" },
      { code: "PST-TZ-CHK-BLU", name: "Taze Yaban Mersinli Cheesecake Dilim" },
      { code: "PST-TZ-CHK-CAR", name: "Taze Karamelli Cheesecake Dilim" },
      { code: "PST-TZ-CHK-PST", name: "Taze Antep Fıstıklı Cheesecake Dilim" },
      { code: "PST-TZ-TIR-CLS", name: "Taze Klasik İtalyan Tiramisu Dilim" },
      { code: "PST-TZ-TIR-CHC", name: "Taze Çikolatalı Tiramisu Dilim" },
      { code: "PST-TZ-CHC-MUS", name: "Taze Çikolata Mousse Dilim Pasta" },
      { code: "PST-TZ-RED-VLV", name: "Taze Red Velvet Dilim Pasta" },
      { code: "PST-TZ-LMN-TRT", name: "Taze Limonlu Tart" },
      { code: "PST-TZ-CHC-BRN", name: "Taze Çikolata Brownie Dilim" },
      { code: "PST-TZ-BCL-VNL", name: "Taze Vanilyalı Baklava Cheesecake" },
      { code: "PST-TZ-CAR-SLT", name: "Taze Tuzlu Karamel Dilim Pasta" },
      { code: "PST-TZ-FRG-MUS", name: "Taze Orman Meyveli Mousse Pasta" },
      { code: "PST-TZ-MSC-TRP", name: "Taze Mascarpone & Tropikal Tart" },
      { code: "PST-TZ-ROS-RAS", name: "Taze Gül & Frambuaz Dilim Pasta" },
      { code: "PST-TZ-MCH-OPR", name: "Taze Mocha Opera Dilim Pasta" },
      { code: "PST-TZ-PST-BKL", name: "Taze Antep Fıstıklı Bülbül Yuvası" },
      { code: "PST-TZ-CHN-MNG", name: "Taze Mango & Hindistancevizi Tart" },
      { code: "PST-TZ-VNL-ECL", name: "Taze Vanilyalı Ekler" },
      { code: "PST-TZ-CHC-ECL", name: "Taze Çikolatalı Ekler" },
      { code: "PST-TZ-CRM-BRL", name: "Taze Klasik Crème Brûlée" },
      { code: "PST-TZ-CHC-FND", name: "Taze Çikolatalı & Fındıklı Dilim" },
      { code: "PST-TZ-STR-SRT", name: "Taze Çilekli Bisküvili Tart" },
      { code: "PST-TZ-BAN-FOS", name: "Taze Bananafoster Tart" },
      { code: "PST-TZ-ORO-CHK", name: "Taze Oreo Cheesecake" },
      { code: "PST-TZ-CTN-MUS", name: "Taze Kestaneli Mousse" },
      { code: "PST-TZ-PSN-MUS", name: "Taze Çarkıfelek Mousse Dilim" },
      { code: "PST-TZ-MCR-ASS", name: "Taze Karışık Macaron (6'lı Kutu)" },
      { code: "PST-TZ-MCR-VNL", name: "Taze Vanilyalı Macaron (6'lı)" },
      { code: "PST-TZ-MCR-CHC", name: "Taze Çikolatalı Macaron (6'lı)" },
      { code: "PST-TZ-MCR-PST", name: "Taze Antep Fıstıklı Macaron (6'lı)" },
      { code: "PST-TZ-MCR-STR", name: "Taze Çilekli Macaron (6'lı)" },
      { code: "PST-TZ-CKI-CHC", name: "Taze Çikolatalı Cookie" },
      { code: "PST-TZ-CKI-OAT", name: "Taze Yulaflı Cookie" },
      { code: "PST-TZ-CKI-PST", name: "Taze Antep Fıstıklı Cookie" },
      { code: "PST-TZ-CKI-DBL", name: "Taze Çift Çikolatalı Cookie" },
      { code: "PST-TZ-WFL-TZ", name: "Taze Belçika Waffle" },
      { code: "PST-TZ-CRP-NTL", name: "Taze Nutella'lı Krep" },
      { code: "PST-TZ-DRT-ASS", name: "Taze Karışık Mini Tatlı Tabağı (10'lu)" },
      { code: "PST-TZ-KNF-PST", name: "Taze Antep Fıstıklı Künefe" },
      { code: "PST-TZ-BKL-PST", name: "Taze Fıstıklı Baklava (Kilo)" },
      { code: "PST-TZ-STL-CAR", name: "Taze Karamelli Sufle" },
      { code: "PST-TZ-STL-CHC", name: "Taze Çikolatalı Sufle" },
      { code: "PST-TZ-PND-VNL", name: "Taze Vanilyalı Panna Cotta" },
      { code: "PST-TZ-PND-STR", name: "Taze Çilekli Panna Cotta" },
      { code: "PST-TZ-TRF-CHC", name: "Taze Çikolata Trüf (6'lı Kutu)" },
      { code: "PST-TZ-TRF-PST", name: "Taze Antep Fıstıklı Trüf (6'lı)" },
      { code: "PST-TZ-FND-CHC", name: "Taze Çikolata Fondant" },
      { code: "PST-TZ-POF-CHC", name: "Taze Profiterol (3'lü Servis)" },
      { code: "PST-TZ-CHK-LOT", name: "Taze Lotus Cheesecake Dilim" },
      { code: "PST-TZ-LYR-CHC", name: "Taze Çikolata Katmanlı Pasta Dilim" },
      { code: "PST-TZ-CHC-FRC", name: "Taze Çikolata Fudge Cake" },
      { code: "PST-TZ-VNL-CLR", name: "Taze Vanilyalı Éclair" },
      { code: "PST-TZ-LVN-CAK", name: "Taze Lavanta Aromalı Mus Kek" },
      { code: "PST-TZ-CRM-CRB", name: "Taze Karamelli Kurabiye" },
    ],
  },
  {
    id: "cat-5",
    name: "Donuk Pastalar",
    icon: "❄️",
    description: "Kafeterya ve restoranlar için pratik donuk pasta çeşitleri.",
    parentName: "Pastalar",
    products: [
      { code: "PST-DNK-CHK-CLS", name: "Donuk Klasik New York Cheesecake (Bütün / 14 Dilim)" },
      { code: "PST-DNK-CHK-STR", name: "Donuk Çilekli New York Cheesecake (Bütün)" },
      { code: "PST-DNK-CHK-BLU", name: "Donuk Yaban Mersinli Cheesecake (Bütün)" },
      { code: "PST-DNK-CHK-CAR", name: "Donuk Karamelli Cheesecake (Bütün)" },
      { code: "PST-DNK-CHK-LOT", name: "Donuk Lotus Biscoff Karamel Cheesecake (Bütün)" },
      { code: "PST-DNK-TIR-ITA", name: "Donuk Orijinal İtalyan Tiramisu (Dilim)" },
      { code: "PST-DNK-TIR-GLZ", name: "Donuk Çikolata Glazürlü Tiramisu (Dilim)" },
      { code: "PST-DNK-MED", name: "Donuk Medovik Ballı Dilim Pasta" },
      { code: "PST-DNK-LOT-BLU", name: "Donuk Lotus & Yaban Mersinli Bütün Pasta (Dilimli)" },
      { code: "PST-DNK-PNT-CHOC", name: "Donuk Yoğun Çikolatalı & Fıstık Ezmeli Dilim Pasta" },
      { code: "PST-DNK-CRM-MONO", name: "Donuk Karamelli & Fındık Parçacıklı Mono Pasta" },
      { code: "PST-DNK-BRW-NUT", name: "Donuk Kuruyemişli & Kırmızı Meyveli Fudgy Brownie Dilim" },
      { code: "PST-DNK-PST-RAS", name: "Donuk Antep Fıstıklı & Ahududu Katmanlı Dilim Pasta" },
      { code: "PST-DNK-MN-CHOC-STR", name: "Donuk Çikolata Kaplı Çilekli Mono Pasta" },
      { code: "PST-DNK-MN-PST", name: "Donuk Antep Fıstıklı Mono Pasta (Fıstık Rüyası)" },
      { code: "PST-DNK-MN-LIM", name: "Donuk Limonlu & Glazürlü Mono Kubbe Pasta" },
      { code: "PST-DNK-MN-RED", name: "Donuk Orman Meyveli & Ahududulu Mono Pasta (Red Berry)" },
      { code: "PST-DNK-MN-LOT", name: "Donuk Lotus Bisküvili Karamel Mono Pasta" },
      { code: "PST-DNK-MN-ROC", name: "Donuk Rocher Fındıklı & Çikolatalı Mono Pasta" },
      { code: "PST-DNK-DL-CRM", name: "Donuk Karamel Soslu & Kremalı Katlı Dilim Pasta" },
      { code: "PST-DNK-DL-PSTC", name: "Donuk Antep Fıstıklı & Çikolatalı Katlı Dilim Pasta" },
      { code: "PST-DNK-DL-MOK", name: "Donuk Moka Kahveli & Fındıklı Dilim Pasta" },
      { code: "PST-DNK-DL-BLF", name: "Donuk Karaorman Meyveli (Schwarzwalder) Dilim Pasta" },
      { code: "PST-DNK-DL-CHK-KEK", name: "Donuk Çikolatalı & Fındık Parçacıklı Dilim Kek" },
      { code: "PST-DNK-DL-MOZ", name: "Donuk Geleneksel Çikolatalı Mozaik Pasta Dilimi" },
      { code: "PST-DNK-BX-OREO", name: "Donuk Oreo & Çikolatalı Mono Box Kutu Pasta" },
      { code: "PST-DNK-BX-LOT", name: "Donuk Lotus Biscoff Mono Box Kutu Pasta" },
      { code: "PST-DNK-DL-CRM-CHK", name: "Donuk Orman Meyveli & Crumble Cheesecake Dilimi" },
      { code: "PST-DNK-DL-CKP", name: "Donuk Çikolata Dolgulu Cookie Turta (Cookie Pie) Dilimi" },
      { code: "PST-DNK-MN-STR-CHK", name: "Donuk Çilekli & Antep Fıstıklı Mono Cheesecake" },
      { code: "PST-DNK-DL-TIR-TRI", name: "Donuk İtalyan Tiramisu Üçgen Dilim Pasta" },
      { code: "PST-DNK-SQ-TIR", name: "Donuk Kare Porsiyon İtalyan Tiramisu" },
      { code: "PST-DNK-DL-MED", name: "Donuk Geleneksel Ballı Medovik Dilim Pasta" },
      { code: "PST-DNK-DL-BLU-CHK", name: "Donuk Yaban Mersinli (Blueberry) Cheesecake Dilimi" },
      { code: "PST-DNK-MN-COF-BEAN", name: "Donuk Kahve Çekirdeği Şekilli Mono Mousse Pasta" },
      { code: "PST-DNK-DL-CHOC-VLV", name: "Donuk Çikolatalı Kadife Mousse Dilim Pasta" },
      { code: "PST-DNK-BX-CHOC-MSS", name: "Donuk Yoğun Çikolatalı Mono Box Mousse Tatlısı" },
      { code: "PST-DNK-BX-FRM-MSS", name: "Donuk Orman Meyveli & Kadife Mono Box Kutu Pasta" },
      { code: "PST-DNK-BX-PRO-SUP", name: "Donuk Profiterollü & Supangle Mono Box Tatlısı" },
      { code: "PST-DNK-DLM-TIR-CHOC", name: "Donuk İtalyan Tiramisu & Kakaolu Mousse Dilim Pasta" },
      { code: "PST-DNK-CKI-CHOC-2", name: "Donuk Bol Çikolata Parçacıklı Gurme Amerikan Cookie (2'li / Koli)" },
      { code: "PST-DNK-CKI-JUMBO-3", name: "Donuk Klasik Vanilyalı & Çikolata Taneli Jumbo Cookie (3'lü Sunum)" },
      { code: "PST-DNK-CKI-DBL-CHO", name: "Donuk Fırın Tipi Çift Çikolatalı Gurme Cookie (2'li Paket)" },
      { code: "PST-DNK-DLM-BST-CRM", name: "Donuk Boston Kremalı & Çikolata Soslu Dilim Pasta" },
      { code: "PST-DNK-CKI-OAT-CHO", name: "Donuk Yulaflı & Damla Çikolatalı Gurme Cookie (2'li)" },
      { code: "PST-DNK-DLM-RED-CHK", name: "Donuk Red Velvet Cheesecake Dilim Pasta" },
      { code: "PST-DNK-DLM-DEV-CHO", name: "Donuk Yoğun Bitter Çikolatalı Devil's Dilim Pasta" },
      { code: "PST-DNK-DLM-MOZ-CLS", name: "Donuk Geleneksel Çikolatalı Bisküvili Mozaik Dilim Pasta" },
      { code: "PST-DNK-DLM-SAN-SEB", name: "Donuk Orijinal San Sebastian Yanık Cheesecake Dilim Pasta" },
      { code: "PST-DNK-DLM-CHK-LOT", name: "Donuk Lotus Biscoff Karamel Bisküvili Cheesecake Dilim" },
      { code: "PST-DNK-DLM-RED-VEL", name: "Donuk Klasik Red Velvet (Kırmızı Kadife) Dilim Pasta" },
      { code: "PST-DNK-DLM-OPR-MCH", name: "Donuk Mocha & Karamel Glazürlü Çok Katlı Opera Dilim Pasta" },
      { code: "PST-DNK-DLM-OPR-ESP", name: "Donuk Kahveli & Fırınlanmış Karamel Opera Dilim Pasta" },
      { code: "PST-DNK-DLM-BEL-MOU", name: "Donuk Belçika Çikolatalı Yoğun Mousse Dilim Pasta" },
      { code: "PST-DNK-DLM-CHK-LIM", name: "Donuk Limon Soslu Klasik New York Cheesecake Dilim" },
      { code: "PST-DNK-DLM-CHK-LM2", name: "Donuk Sicilya Limonlu Gurme Cheesecake Dilim" },
      { code: "PST-DNK-DLM-CHK-FRM", name: "Donuk Frambuaz Soslu Klasik New York Cheesecake Dilim" },
      { code: "PST-DNK-DLM-TIR-ITA", name: "Donuk Orijinal İtalyan Usulü Tiramisu Dilim Pasta" },
      { code: "PST-DNK-DLM-TIR-GLZ", name: "Donuk Çikolata Glazürlü & Mascarpone Tiramisu Dilim Pasta" },
      { code: "PST-DNK-DLM-TIR-ESP", name: "Donuk Espresso Aromalı Mascarpone Tiramisu Dilim" },
      { code: "PST-DNK-CKI-RED-WHT", name: "Donuk Red Velvet & Beyaz Çikolata Parçacıklı Gurme Cookie (2'li)" },
      { code: "PST-DNK-DLM-CHK-BER", name: "Donuk Orman Meyveli & Böğürtlenli Cheesecake Dilim" },
      { code: "PST-DNK-DLM-CHK-ALM", name: "Donuk Karamel Soslu & File Bademli Cheesecake Dilim" },
      { code: "PST-DNK-BX-LIM-OVL", name: "Donuk Limonlu & Karamel Katmanlı Oval Mono Box Tatlısı" },
      { code: "PST-DNK-BX-CHO-REC", name: "Donuk Çikolata Ganajlı & Bisküvili Dikdörtgen Mono Box Tatlısı" },
      { code: "PST-DNK-DLM-CHK-BLU-TN", name: "Donuk Tane Yaban Mersinli & Krokan Kenarlı Cheesecake Dilim" },
      { code: "PST-DNK-UNL-KRV-SAD", name: "Donuk Fransız Tereyağlı Sade Klasik Kruvasan (Pişmeye / Servise Hazır)" },
      { code: "PST-DNK-UNL-NY-ROLL", name: "Donuk New York Roll Spiral Kat Kat Kruvasan Çöreği" },
      { code: "PST-DNK-UNL-KRV-CHO-FND", name: "Donuk Çikolata Dolgulu & Kavrulmuş Fındıklı Gurme Kruvasan" },
      { code: "PST-DNK-UNL-PAIN-CHO", name: "Donuk Fransız Pain au Chocolat (Çift Çikolata Çubuklu Çörek)" },
      { code: "PST-DNK-UNL-TST-EKM", name: "Donuk Gurme Tost & Sandviç Ekmeği Kalın Dilim (2'li Servis)" },
    ],
  },
  {
    id: "cat-3",
    name: "Waffle Çikolataları",
    icon: "🧇",
    description: "CALLEI sürülebilir renkli kremalar, waffle tozu, draje ve krokan süsleme çeşitleri.",
    products: [
      { code: "CAL-BIT-1000", name: "CALLEI Bitter Çikolatalı Waffle & Krep Kreması 1kg" },
      { code: "CAL-WHT-1000", name: "CALLEI Beyaz Çikolatalı Waffle & Krep Kreması 1kg" },
      { code: "CAL-MLK-1000", name: "CALLEI Sütlü Çikolatalı Waffle & Krep Kreması 1kg" },
      { code: "CAL-STR-1000", name: "CALLEI Çilek Aromalı Pembe Waffle & Krep Kreması 1kg" },
      { code: "CAL-RAS-1000", name: "CALLEI Frambuaz Aromalı Waffle & Krep Kreması 1kg" },
      { code: "CAL-PST-1000", name: "CALLEI Antep Fıstıklı Yeşil Waffle & Krep Kreması 1kg" },
      { code: "CAL-SPC-1000", name: "CALLEI Speculoos Bisküvili Waffle & Krep Kreması 1kg" },
      { code: "CAL-BBG-1000", name: "CALLEI Bubble Gum Aromalı Mavi Waffle Kreması 1kg" },
      { code: "CAL-CAR-1000", name: "CALLEI Karamel Aromalı Sürülebilir Krema 1kg" },
      { code: "CAL-WFX-1000", name: "CALLEI Hazır Waffle, Krep & Pancake Toz Karışımı 1kg" },
      { code: "CAL-TOP-WHT-1K", name: "CALLEI Beyaz Çikolatalı Çıtır Pirinç Patlağı Draje (İnci Topping)" },
      { code: "CAL-TOP-PNK-1K", name: "CALLEI Pembe Çıtır Pirinç Patlağı Süsleme Drajesi (Fuşya İnci)" },
      { code: "CAL-TOP-MLK-1K", name: "CALLEI Sütlü Çikolatalı Çıtır Pirinç Patlağı Draje Topping" },
      { code: "CAL-TOP-FUS-1K", name: "CALLEI Canlı Fuşya Çıtır Pirinç Patlağı Pasta & Waffle Drajesi" },
      { code: "CAL-TOP-DRK-1K", name: "CALLEI Bitter Çikolatalı Çıtır Pirinç Patlağı Draje Topping" },
      { code: "TOP-SPR-1000", name: "Renkli Granül Pasta & Waffle Süsleme Şekeri 1kg" },
      { code: "TOP-CRK-1000", name: "Karamelize Fındık Krokan Parçacıkları 1kg" },
      { code: "TOP-BNB-1000", name: "Renkli Mini Bonibon Draje Çikolata 1kg" },
      { code: "TOP-MDC-1000", name: "Sütlü Damla Çikolata Drops 1kg" },
      { code: "TOP-CKL-1000", name: "Renkli Çakıl Taşı Draje Çikolata 1kg" },
      { code: "TOP-BDC-1000", name: "Bitter Damla Çikolata Drops 1kg" },
      { code: "TOP-WDC-1000", name: "Beyaz Damla Çikolata Drops 1kg" },
      { code: "TOP-FND-1000", name: "Kavrulmuş Pirinç Fındık Parçacıkları 1kg" },
      { code: "WFL-DNK-BEL-BRX-1", name: "Donuk Dikdörtgen Belçika Waffle Ekmeği (Brüksel Tipi Hazır Pişmiş)" },
    ],
  },
  {
    id: "cat-6",
    name: "Kremalı Ürünler & Pastacılık",
    icon: "🍦",
    description: "Chantilly, ganaj ve profesyonel pastacılık krema hammaddeleri.",
    products: [
      { code: "KRM-SAM-SPR-250", name: "SAMARA Barista Sprey Krem Şanti 250ml (Whipped Cream)" },
    ],
  },
];

/* ─── Baskı / export için toplam sayı ──────────────────────────────────────── */
const totalProducts = CATALOG.reduce((sum, cat) => sum + cat.products.length, 0);

/* ─── Renk paleti (her kategori için) ─────────────────────────────────────── */
const CAT_COLORS: Record<string, { bg: string; text: string; border: string; num: string }> = {
  "cat-1":  { bg: "bg-rose-950/40",   text: "text-rose-300",   border: "border-rose-700/40",   num: "bg-rose-700/60" },
  "cat-2":  { bg: "bg-amber-950/40",  text: "text-amber-300",  border: "border-amber-700/40",  num: "bg-amber-700/60" },
  "cat-7":  { bg: "bg-cyan-950/40",   text: "text-cyan-300",   border: "border-cyan-700/40",   num: "bg-cyan-700/60" },
  "cat-4":  { bg: "bg-orange-950/40", text: "text-orange-300", border: "border-orange-700/40", num: "bg-orange-700/60" },
  "cat-9":  { bg: "bg-pink-950/40",   text: "text-pink-300",   border: "border-pink-700/40",   num: "bg-pink-700/60" },
  "cat-5":  { bg: "bg-sky-950/40",    text: "text-sky-300",    border: "border-sky-700/40",    num: "bg-sky-700/60" },
  "cat-3":  { bg: "bg-yellow-950/40", text: "text-yellow-300", border: "border-yellow-700/40", num: "bg-yellow-700/60" },
  "cat-6":  { bg: "bg-purple-950/40", text: "text-purple-300", border: "border-purple-700/40", num: "bg-purple-700/60" },
};

export default function KatalogListesiPage() {
  return (
    <div className="min-h-screen bg-[#0D0E11] text-slate-200">
      {/* ── Üst başlık ── */}
      <div className="border-b border-[#282C36] bg-[#121316]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-5">
            <Link href="/" className="hover:text-gold transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-slate-300">Ürün Listesi</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-2">
                Tam Ürün Kataloğu
              </p>
              <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl leading-tight">
                Ürün Listesi
              </h1>
              <p className="text-slate-400 text-sm mt-2">
                {CATALOG.length} kategori · {totalProducts} ürün
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href="/katalog"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border border-[#282C36] text-slate-300 hover:text-white hover:border-[#C9A84C]/60 transition-colors"
              >
                Katalog Sayfası →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Hızlı gezinti (anchor links) ── */}
      <div className="sticky top-16 z-20 bg-[#0D0E11]/95 backdrop-blur-md border-b border-[#282C36]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {CATALOG.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#1B1D23] transition-colors whitespace-nowrap"
              >
                {cat.icon} {cat.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── İçerik ── */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {CATALOG.map((cat, catIdx) => {
          const colors = CAT_COLORS[cat.id] ?? {
            bg: "bg-slate-900/40", text: "text-slate-300",
            border: "border-slate-700/40", num: "bg-slate-700/60",
          };
          return (
            <section key={cat.id} id={cat.id}>
              {/* Kategori başlığı */}
              <div className={`rounded-2xl border ${colors.border} ${colors.bg} px-6 py-5 mb-6`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <div>
                      {cat.parentName && (
                        <p className={`text-xs font-bold uppercase tracking-widest mb-0.5 opacity-70 ${colors.text}`}>
                          {cat.parentName} ›
                        </p>
                      )}
                      <h2 className={`font-heading font-bold text-xl ${colors.text}`}>
                        {cat.name}
                      </h2>
                      <p className="text-slate-400 text-sm mt-0.5">{cat.description}</p>
                    </div>
                  </div>
                  <span className={`shrink-0 ${colors.num} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {cat.products.length} ürün
                  </span>
                </div>
              </div>

              {/* Ürün tablosu */}
              <div className="bg-[#1B1D23] border border-[#282C36] rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#121316] border-b border-[#282C36]">
                    <tr>
                      <th className="text-left py-3 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider w-8">#</th>
                      <th className="text-left py-3 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider w-44">Ürün Kodu</th>
                      <th className="text-left py-3 px-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">Ürün Adı</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#282C36]/50">
                    {cat.products.map((prod, i) => (
                      <tr key={prod.code} className="hover:bg-[#16181D] transition-colors">
                        <td className="py-3 px-5 text-slate-600 text-xs tabular-nums">{i + 1}</td>
                        <td className="py-3 px-5">
                          <code className="text-xs font-mono text-[#C9A84C] bg-[#C9A84C]/10 px-2 py-0.5 rounded border border-[#C9A84C]/20">
                            {prod.code}
                          </code>
                        </td>
                        <td className="py-3 px-5 text-sm text-slate-200">{prod.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bölüm ayracı */}
              {catIdx < CATALOG.length - 1 && (
                <div className="mt-16 border-t border-[#282C36]/50" />
              )}
            </section>
          );
        })}

        {/* Footer */}
        <div className="text-center pt-8 pb-4 border-t border-[#282C36]">
          <p className="text-slate-500 text-xs">
            Toplam <span className="text-[#C9A84C] font-bold">{totalProducts}</span> ürün ·{" "}
            <span className="text-[#C9A84C] font-bold">{CATALOG.length}</span> kategori
          </p>
          <p className="text-slate-600 text-xs mt-1">
            © {new Date().getFullYear()} Yirmikirbes — Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </div>
  );
}
