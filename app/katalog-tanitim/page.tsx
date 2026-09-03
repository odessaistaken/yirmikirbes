import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ürün Tanıtım Kataloğu 2026 | Yirmikirbes",
  description: "Profesyonel pastacılık ve barista çözümleri — Caffè NONNO, DaVinci Gourmet, CALLEI ve EASY MIX koleksiyonlarımız.",
};

const SECTIONS = [
  {
    id: "pureler",
    title: "Püreler",
    subtitle: "Frozen Meyve Koleksiyonu",
    image: "/resimler/katalog/pureler.jpg",
    description: "Caffè NONNO Frozen, DaVinci Fruit Mix ve Krater meyve karışımlarından oluşan zengin püre koleksiyonumuz. Bar, kafe ve pastane menülerinizi taze meyve yoğunluğuyla buluşturun.",
    accent: "from-rose-900/60 to-rose-950/90",
    tag: "rose",
    products: [
      { name: "Raspberry Frozen Frambuaz Püresi", brand: "Caffè NONNO", sub: "750ml" },
      { name: "Strawberry Frozen Çilek Püresi", brand: "Caffè NONNO", sub: "750ml" },
      { name: "Mango Frozen Mango Püresi", brand: "Caffè NONNO", sub: "750ml" },
      { name: "Passion Frozen Çarkıfelek Püresi", brand: "Caffè NONNO", sub: "750ml" },
      { name: "Blueberry Frozen Yaban Mersini", brand: "Caffè NONNO", sub: "750ml" },
      { name: "Peach Frozen Şeftali Püresi", brand: "Caffè NONNO", sub: "750ml" },
      { name: "Lemon Frozen Limon Püresi", brand: "Caffè NONNO", sub: "750ml" },
      { name: "Cherry Frozen Vişne Püresi", brand: "Caffè NONNO", sub: "750ml" },
      { name: "Coconut Frozen Hindistancevizi", brand: "Caffè NONNO", sub: "750ml" },
      { name: "Mango Fruit Mix Püresi", brand: "DaVinci Gourmet", sub: "1L" },
      { name: "Strawberry Fruit Mix Çilek Püresi", brand: "DaVinci Gourmet", sub: "1L" },
      { name: "Raspberry Fruit Mix Frambuaz Püresi", brand: "DaVinci Gourmet", sub: "1L" },
      { name: "Passion Fruit Mix Çarkıfelek Püresi", brand: "DaVinci Gourmet", sub: "1L" },
      { name: "Mango Meyve Karışımı", brand: "Krater", sub: "1L" },
      { name: "Tropikal Meyve Karışımı", brand: "Krater", sub: "1L" },
      { name: "Çilek Meyve Karışımı", brand: "Krater", sub: "1L" },
    ],
  },
  {
    id: "suruplar",
    title: "Şuruplar",
    subtitle: "Premium Barista Şurupları",
    image: "/resimler/katalog/suruplar.jpg",
    description: "DaVinci Gourmet, Caffè NONNO ve Monte Cristo'nun vazgeçilmez lezzetleri. Kahveden kokteylee, limonatadan tatlıya kadar her içeceği premium bir deneyime dönüştürün.",
    accent: "from-amber-900/60 to-amber-950/90",
    tag: "amber",
    products: [
      { name: "Caramel Aromalı Şurup", brand: "Caffè NONNO", sub: "750ml" },
      { name: "Vanilla Aromalı Vanilya Şurubu", brand: "Caffè NONNO", sub: "750ml" },
      { name: "Hazelnut Aromalı Fındık Şurubu", brand: "Caffè NONNO", sub: "750ml" },
      { name: "Chocolate Aromalı Çikolata Şurubu", brand: "Caffè NONNO", sub: "750ml" },
      { name: "Pistachio Aromalı Antep Fıstığı", brand: "Caffè NONNO", sub: "750ml" },
      { name: "White Chocolate Beyaz Çikolata", brand: "Caffè NONNO", sub: "750ml" },
      { name: "Rose Aromalı Gül Şurubu", brand: "Caffè NONNO", sub: "750ml" },
      { name: "Vanilla Klasik Vanilya Şurubu", brand: "DaVinci Gourmet", sub: "750ml" },
      { name: "Caramel Karamel Şurubu", brand: "DaVinci Gourmet", sub: "750ml" },
      { name: "Hazelnut Fındık Şurubu", brand: "DaVinci Gourmet", sub: "750ml" },
      { name: "Pistachio Antep Fıstığı Şurubu", brand: "DaVinci Gourmet", sub: "750ml" },
      { name: "Vanilla Aromalı Vanilya Şurubu", brand: "Monte Cristo", sub: "700ml" },
      { name: "Caramel Aromalı Karamel Şurubu", brand: "Monte Cristo", sub: "700ml" },
      { name: "Hazelnut Aromalı Fındık Şurubu", brand: "Monte Cristo", sub: "700ml" },
      { name: "Pistachio Aromalı Antep Fıstığı", brand: "Monte Cristo", sub: "700ml" },
      { name: "Rose Aromalı Gül Şurubu", brand: "Monte Cristo", sub: "700ml" },
    ],
  },
  {
    id: "kokteyller",
    title: "Kokteyller",
    subtitle: "EASY MIX Kokteyl Premiksleri",
    image: "/resimler/katalog/kokteyller.jpg",
    description: "EASY MIX'in doğal meyve ve botanik özlü kokteyl premiksleri ile barınıza profesyonel bir dokunuş katın. Alkollü veya alkolsüz, her servise uygun.",
    accent: "from-cyan-900/60 to-cyan-950/90",
    tag: "cyan",
    parent: "Şuruplar Koleksiyonu",
    products: [
      { name: "Margarita Kokteyl Premiksi", brand: "EASY MIX", sub: "700ml" },
      { name: "Mojito Kokteyl Premiksi", brand: "EASY MIX", sub: "700ml" },
      { name: "Passion Fruit Kokteyl Premiksi", brand: "EASY MIX", sub: "700ml" },
      { name: "Lychee Martini Kokteyl Premiksi", brand: "EASY MIX", sub: "700ml" },
      { name: "Mango Daiquiri Kokteyl Premiksi", brand: "EASY MIX", sub: "700ml" },
      { name: "Strawberry Daiquiri Kokteyl Premiksi", brand: "EASY MIX", sub: "700ml" },
      { name: "Pina Colada Kokteyl Premiksi", brand: "EASY MIX", sub: "700ml" },
      { name: "Refresher Tropikal Kokteyl Premiksi", brand: "EASY MIX", sub: "700ml" },
      { name: "Refresher Mint & Lime Premiksi", brand: "EASY MIX", sub: "700ml" },
      { name: "Refresher Elderflower Mürver Çiçeği", brand: "EASY MIX", sub: "700ml" },
      { name: "Refresher Hibiscus & Rose", brand: "EASY MIX", sub: "700ml" },
      { name: "Premium Limonata Şurubu", brand: "EASY MIX", sub: "700ml" },
    ],
  },
  {
    id: "bar-sos",
    title: "Bar Sos",
    subtitle: "Premium Servis Sosları",
    image: "/resimler/katalog/bar-sos.jpg",
    description: "DaVinci Gourmet ve Caffè NONNO'nun yoğun aromalu karamel, çikolata ve meyve sosları. Pasta süslemeden içecek servisine, her kullanımda fark yaratan lezzetler.",
    accent: "from-orange-900/60 to-orange-950/90",
    tag: "orange",
    products: [
      { name: "Karamel Sos", brand: "DaVinci Gourmet", sub: "2L" },
      { name: "Çikolata Sos", brand: "DaVinci Gourmet", sub: "2L" },
      { name: "Beyaz Çikolata Sos", brand: "DaVinci Gourmet", sub: "2L" },
      { name: "Çilek Sos", brand: "DaVinci Gourmet", sub: "2L" },
      { name: "Frambuaz Sos", brand: "DaVinci Gourmet", sub: "2L" },
      { name: "Karamel Bar Sosu", brand: "Caffè NONNO", sub: "750g" },
      { name: "Çikolata Bar Sosu", brand: "Caffè NONNO", sub: "750g" },
      { name: "Beyaz Çikolata Bar Sosu", brand: "Caffè NONNO", sub: "750g" },
      { name: "Çilek Bar Sosu", brand: "Caffè NONNO", sub: "750g" },
      { name: "Condensed Milk (Yoğunlaştırılmış Süt)", brand: "Caffè NONNO", sub: "750g" },
      { name: "Blue Curacao Portakal Aromalı Sos", brand: "Caffè NONNO", sub: "750g" },
      { name: "Nar (Grenadine) Sos", brand: "Caffè NONNO", sub: "750g" },
    ],
  },
  {
    id: "taze-pastalar",
    title: "Taze & Butik Pastalar",
    subtitle: "El Yapımı Günlük Taze Üretim",
    image: "/resimler/katalog/taze-pastalar.jpg",
    description: "Günlük taze üretim, el yapımı butik pastalar ve tatlılar. Cheesecake, tiramisu, macaron, ekler ve daha fazlası ile sofistike bir tatlı deneyimi sunun.",
    accent: "from-pink-900/60 to-pink-950/90",
    tag: "pink",
    parent: "Pastalar Koleksiyonu",
    products: [
      { name: "Klasik New York Cheesecake", brand: "Taze", sub: "Dilim" },
      { name: "Çilekli New York Cheesecake", brand: "Taze", sub: "Dilim" },
      { name: "Yaban Mersinli Cheesecake", brand: "Taze", sub: "Dilim" },
      { name: "Tuzlu Karamel Cheesecake", brand: "Taze", sub: "Dilim" },
      { name: "Antep Fıstıklı Cheesecake", brand: "Taze", sub: "Dilim" },
      { name: "Lotus Cheesecake", brand: "Taze", sub: "Dilim" },
      { name: "Klasik İtalyan Tiramisu", brand: "Taze", sub: "Dilim" },
      { name: "Red Velvet", brand: "Taze", sub: "Dilim" },
      { name: "Çikolata Mousse Pasta", brand: "Taze", sub: "Dilim" },
      { name: "Mocha Opera Pasta", brand: "Taze", sub: "Dilim" },
      { name: "Karışık Macaron", brand: "Taze", sub: "6'lı Kutu" },
      { name: "Vanilyalı Ekler", brand: "Taze", sub: "Adet" },
      { name: "Çikolatalı Ekler", brand: "Taze", sub: "Adet" },
      { name: "Profiterol", brand: "Taze", sub: "3'lü Servis" },
      { name: "Taze Çikolata Brownie", brand: "Taze", sub: "Dilim" },
      { name: "Taze Çikolata Fondant", brand: "Taze", sub: "Adet" },
    ],
  },
  {
    id: "donuk-pastalar",
    title: "Donuk Pastalar",
    subtitle: "Profesyonel Mutfak Koleksiyonu",
    image: "/resimler/katalog/donuk-pastalar.jpg",
    description: "Kafeterya, restoran ve otel mutfakları için hazır pişirme ve servis çözümleri. Donuk cheesecake, tiramisu, mono kutu pasta ve cookie çeşitlerimizle zamandan tasarruf edin.",
    accent: "from-sky-900/60 to-sky-950/90",
    tag: "sky",
    parent: "Pastalar Koleksiyonu",
    products: [
      { name: "Klasik New York Cheesecake", brand: "Donuk", sub: "Bütün / 14 Dilim" },
      { name: "Çilekli Cheesecake", brand: "Donuk", sub: "Bütün" },
      { name: "Yaban Mersinli Cheesecake", brand: "Donuk", sub: "Bütün" },
      { name: "Lotus Biscoff Karamel Cheesecake", brand: "Donuk", sub: "Bütün" },
      { name: "San Sebastian Yanık Cheesecake", brand: "Donuk", sub: "Dilim" },
      { name: "İtalyan Tiramisu", brand: "Donuk", sub: "Dilim" },
      { name: "Çikolata Glazürlü Tiramisu", brand: "Donuk", sub: "Dilim" },
      { name: "Belçika Çikolatalı Mousse Pasta", brand: "Donuk", sub: "Dilim" },
      { name: "Red Velvet Cheesecake", brand: "Donuk", sub: "Dilim" },
      { name: "Opera Pasta (Mocha & Karamel)", brand: "Donuk", sub: "Dilim" },
      { name: "Medovik Ballı Pasta", brand: "Donuk", sub: "Dilim" },
      { name: "Çikolata Kaplı Çilekli Mono Pasta", brand: "Donuk", sub: "Tekil" },
      { name: "Antep Fıstıklı Mono Pasta", brand: "Donuk", sub: "Tekil" },
      { name: "Orman Meyveli Mono Pasta", brand: "Donuk", sub: "Tekil" },
      { name: "Gurme Amerikan Cookie", brand: "Donuk", sub: "2'li / Koli" },
      { name: "Çift Çikolatalı Gurme Cookie", brand: "Donuk", sub: "2'li Paket" },
    ],
  },
  {
    id: "waffle",
    title: "Waffle Çikolataları",
    subtitle: "CALLEI Krema & Süsleme Koleksiyonu",
    image: "/resimler/katalog/waffle.jpg",
    description: "CALLEI'nin rengarenk sürülebilir kreması, hazır waffle tozu, draje ve krokan çeşitleriyle yaratıcılığınıza ilham verin. Canlı renkler, zengin dokular, sınırsız sunum.",
    accent: "from-yellow-900/60 to-yellow-950/90",
    tag: "yellow",
    products: [
      { name: "Bitter Çikolatalı Waffle Kreması", brand: "CALLEI", sub: "1kg" },
      { name: "Beyaz Çikolatalı Waffle Kreması", brand: "CALLEI", sub: "1kg" },
      { name: "Sütlü Çikolatalı Waffle Kreması", brand: "CALLEI", sub: "1kg" },
      { name: "Çilek Aromalı Pembe Krema", brand: "CALLEI", sub: "1kg" },
      { name: "Frambuaz Aromalı Krema", brand: "CALLEI", sub: "1kg" },
      { name: "Antep Fıstıklı Yeşil Krema", brand: "CALLEI", sub: "1kg" },
      { name: "Speculoos Bisküvili Krema", brand: "CALLEI", sub: "1kg" },
      { name: "Karamel Aromalı Sürülebilir Krema", brand: "CALLEI", sub: "1kg" },
      { name: "Hazır Waffle, Krep & Pancake Tozu", brand: "CALLEI", sub: "1kg" },
      { name: "Beyaz Çikolatalı Pirinç Patlağı Draje", brand: "CALLEI", sub: "Topping" },
      { name: "Sütlü Çikolatalı Pirinç Patlağı", brand: "CALLEI", sub: "Topping" },
      { name: "Renkli Granül Süsleme Şekeri", brand: "—", sub: "1kg" },
      { name: "Karamelize Fındık Krokan Parçacıkları", brand: "—", sub: "1kg" },
      { name: "Renkli Mini Draje Çikolata", brand: "—", sub: "1kg" },
      { name: "Sütlü / Bitter / Beyaz Damla Çikolata", brand: "—", sub: "1kg" },
    ],
  },
  {
    id: "kremali",
    title: "Kremalı Ürünler",
    subtitle: "Profesyonel Pastacılık Kreması",
    image: "/resimler/katalog/kremali.jpg",
    description: "Profesyonel barista ve pasta sunumlarında mükemmel kıvam. SAMARA Sprey Krem Şanti ile saniyeler içinde lüks bir sunum oluşturun.",
    accent: "from-purple-900/60 to-purple-950/90",
    tag: "purple",
    products: [
      { name: "Barista Sprey Krem Şanti", brand: "SAMARA", sub: "250ml — Whipped Cream" },
    ],
  },
];

const TAG_COLORS: Record<string, { pill: string; text: string }> = {
  rose:   { pill: "bg-rose-500/20 text-rose-300 border-rose-500/30",     text: "text-rose-300" },
  amber:  { pill: "bg-amber-500/20 text-amber-300 border-amber-500/30",  text: "text-amber-300" },
  cyan:   { pill: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",     text: "text-cyan-300" },
  orange: { pill: "bg-orange-500/20 text-orange-300 border-orange-500/30", text: "text-orange-300" },
  pink:   { pill: "bg-pink-500/20 text-pink-300 border-pink-500/30",     text: "text-pink-300" },
  sky:    { pill: "bg-sky-500/20 text-sky-300 border-sky-500/30",        text: "text-sky-300" },
  yellow: { pill: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30", text: "text-yellow-300" },
  purple: { pill: "bg-purple-500/20 text-purple-300 border-purple-500/30", text: "text-purple-300" },
};

export default function KatalogTanitimPage() {
  return (
    <div className="min-h-screen bg-[#080909] text-slate-200">

      {/* HERO */}
      <div className="relative h-screen min-h-[600px] max-h-[900px] flex items-end overflow-hidden">
        <Image src="/resimler/katalog/kapak.jpg" alt="Yirmikirbes Ürün Kataloğu" fill priority quality={95} className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-[#080909]/60 to-[#080909]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080909]/50 via-transparent to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pb-16 sm:pb-24 w-full">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.35em] mb-4">Yirmikirbes — YKB Gıda</p>
          <h1 className="font-heading font-bold text-5xl sm:text-7xl text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display','Georgia',serif" }}>
            Ürün<br /><span className="text-[#C9A84C]">Kataloğu</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
            Profesyonel pastacılık ve barista çözümleri — dünyaca ünlü markalardan özenle seçilmiş premium koleksiyonumuz.
          </p>
          <div className="flex flex-wrap gap-4">
            {["255+ Ürün", "8 Kategori", "6 Dünya Markası"].map((s) => (
              <span key={s} className="px-4 py-2 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-semibold">{s}</span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-6 right-10 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">Kaydır</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#C9A84C]/60 to-transparent" />
        </div>
      </div>

      {/* SECTIONS */}
      {SECTIONS.map((section) => {
        const clr = TAG_COLORS[section.tag] ?? TAG_COLORS["amber"];
        return (
          <section key={section.id} id={section.id} className="relative">
            {/* Category hero image */}
            <div className="relative h-[50vh] min-h-[320px] max-h-[520px] overflow-hidden">
              <Image src={section.image} alt={section.title} fill quality={90} className="object-cover object-center" />
              <div className={`absolute inset-0 bg-gradient-to-b ${section.accent}`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                {section.parent && (
                  <p className={`text-xs font-bold uppercase tracking-[0.3em] mb-2 opacity-70 ${clr.text}`}>{section.parent} ›</p>
                )}
                <h2 className="font-heading font-bold text-4xl sm:text-6xl text-white mb-3 drop-shadow-2xl" style={{ fontFamily: "'Playfair Display','Georgia',serif" }}>
                  {section.title}
                </h2>
                <p className={`text-sm font-semibold uppercase tracking-widest ${clr.text}`}>{section.subtitle}</p>
              </div>
            </div>

            {/* Content */}
            <div className="bg-[#0D0E11] border-b border-[#1B1D23]">
              <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mb-12">{section.description}</p>

                {/* Product grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#1B1D23]">
                  {section.products.map((product, i) => (
                    <div key={i} className="bg-[#0D0E11] p-5 group hover:bg-[#111215] transition-colors duration-200">
                      <div className={`w-6 h-px mb-4 transition-opacity opacity-50 group-hover:opacity-100 ${clr.text}`} style={{ background: "currentColor" }} />
                      <p className="text-white font-semibold text-sm leading-snug mb-2">{product.name}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className={`text-xs font-bold border px-2 py-0.5 rounded-full ${clr.pill}`}>{product.brand}</span>
                        <span className="text-slate-600 text-xs">{product.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-[#1B1D23] pt-6">
                  <span className="text-slate-600 text-xs uppercase tracking-widest">{section.products.length} ürün</span>
                  <Link href={`/katalog?category=${section.id}`} className={`text-xs font-bold uppercase tracking-wider hover:opacity-80 transition-opacity flex items-center gap-2 ${clr.text}`}>
                    Katalogda Görüntüle →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* FOOTER CTA */}
      <div className="bg-[#080909] py-24 px-6 text-center border-t border-[#1B1D23]">
        <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.3em] mb-6">Toplu Sipariş & Özel Teklif</p>
        <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white mb-6" style={{ fontFamily: "'Playfair Display','Georgia',serif" }}>
          Ürünlerimizi Keşfedin
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto mb-10 leading-relaxed">
          255'ten fazla premium ürünümüzün tamamına erişmek, toplu sipariş vermek veya özel teklif almak için iletişime geçin.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/katalog" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A84C] hover:bg-[#E0C97A] text-[#0D0E11] font-bold text-sm rounded-xl transition-colors">
            Tüm Ürünleri İncele
          </Link>
          <Link href="/iletisim" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#C9A84C]/50 hover:border-[#C9A84C] text-[#C9A84C] font-bold text-sm rounded-xl transition-colors">
            İletişime Geç
          </Link>
        </div>
        <p className="text-slate-700 text-xs mt-16">© {new Date().getFullYear()} Yirmikirbes — YKB Gıda. Tüm hakları saklıdır.</p>
      </div>
    </div>
  );
}
