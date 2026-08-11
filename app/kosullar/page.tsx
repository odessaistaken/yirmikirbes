import Link from "next/link";

export const metadata = {
  title: "Kullanım Koşulları | 20:45 Pastacılık",
  description: "20:45 Pastacılık B2B portalının kullanım koşulları ve hizmet sözleşmesi.",
};

const sections = [
  {
    title: "1. Hizmetin Kapsamı",
    content: `20:45 Pastacılık B2B Portalı ("Platform"), yalnızca ticari amaçla faaliyet gösteren pastacı, fırıncı, kafe ve gıda işletmelerine yönelik toptan ürün kataloğu ve fiyat talep sistemi sunmaktadır. Platform üzerinden doğrudan satış gerçekleştirilmemekte; fiyat teklifleri ve sipariş süreçleri satış ekibimiz aracılığıyla yürütülmektedir.`,
  },
  {
    title: "2. Üyelik ve Hesap Güvenliği",
    content: `Platform'a üye olmak için geçerli bir ticari işletme unvanı ve iletişim bilgileri zorunludur. Hesap güvenliğinden siz sorumlusunuz; şifrenizi kimseyle paylaşmayın. Şüpheli bir hesap aktivitesi fark etmeniz durumunda derhal info@2045pastaci.com adresine bildirin.

Şirket, tek taraflı olarak herhangi bir hesabı askıya alma veya sonlandırma hakkını saklı tutar.`,
  },
  {
    title: "3. Kullanım Kuralları",
    content: `Platform'u kullanırken aşağıdaki kurallara uymayı kabul edersiniz:

• Yalnızca gerçek B2B amaçlarla fiyat talebinde bulunmak
• Yanıltıcı veya eksik bilgi vermemek
• Platformun teknik altyapısına zarar verebilecek eylemlerden kaçınmak
• Fikri mülkiyet haklarına saygı göstermek
• Platform içeriklerini izinsiz kopyalamak veya dağıtmamak`,
  },
  {
    title: "4. Fiyatlar ve Siparişler",
    content: `Platform üzerindeki fiyat talepleri bağlayıcı bir satış sözleşmesi oluşturmaz. Tüm fiyatlar satış ekibimizin onayına tabidir ve piyasa koşullarına, ürün stoğuna ve sipariş miktarına göre değişebilir. Kesin sipariş koşulları ayrı bir satış sözleşmesiyle belirlenir.`,
  },
  {
    title: "5. Fikri Mülkiyet",
    content: `Platform'daki tüm içerikler, görseller, marka adları ve tasarım unsurları 20:45 Pastacılık Gıda A.Ş.'ye aittir ve telif hakkı yasaları kapsamında korunmaktadır. Yazılı izin alınmadan hiçbir içerik kopyalanamaz, dağıtılamaz veya ticari amaçla kullanılamaz.`,
  },
  {
    title: "6. Sorumluluk Sınırlaması",
    content: `Şirket, Platform'un kesintisiz ve hatasız çalışacağını garanti etmez. Teknik arızalar, veri kaybı veya üçüncü taraf hizmet kesintilerinden kaynaklanabilecek dolaylı zararlardan Şirket sorumlu tutulamaz.`,
  },
  {
    title: "7. Değişiklikler",
    content: `Bu koşullar zaman zaman güncellenebilir. Önemli değişiklikler kayıtlı e-posta adresinize bildirilecektir. Güncel koşulları bu sayfadan takip etmeniz önerilir. Platformu kullanmaya devam etmeniz, güncel koşulları kabul ettiğiniz anlamına gelir.`,
  },
  {
    title: "8. Uygulanacak Hukuk",
    content: `Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir. Herhangi bir uyuşmazlıkta İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.`,
  },
];

export default function KosullarPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-charcoal-900 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="section-label">Hukuki Bildirim</span>
          <h1 className="font-heading font-bold text-white text-4xl mt-2 mb-3">Kullanım Koşulları</h1>
          <p className="text-charcoal-400 text-sm">Son güncelleme: 1 Ocak 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-border rounded-2xl p-8 md:p-12 shadow-card">
          <p className="text-charcoal-600 text-sm leading-relaxed mb-8 p-4 bg-gold-50 border border-gold-200 rounded-xl">
            Bu kullanım koşulları, 20:45 Pastacılık Gıda A.Ş. tarafından işletilen B2B portalının kullanımına
            ilişkin hüküm ve koşulları belirlemektedir. Platformu kullanarak bu koşulları kabul etmiş sayılırsınız.
          </p>

          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-heading font-bold text-charcoal-800 text-lg mb-3 pb-2 border-b border-border">
                  {s.title}
                </h2>
                <div className="text-charcoal-600 text-sm leading-loose whitespace-pre-line">
                  {s.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-charcoal-400">
              <Link href="/kvkk" className="hover:text-gold transition-colors underline">KVKK Aydınlatma Metni</Link>
              <span>·</span>
              <Link href="/iletisim" className="hover:text-gold transition-colors underline">İletişim</Link>
            </div>
            <Link href="/kayit" className="btn-primary text-sm">
              B2B Hesabı Aç
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
