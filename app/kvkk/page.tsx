import Link from "next/link";

export const metadata = {
  title: "KVKK Aydınlatma Metni | 20:45 Pastacılık",
  description: "20:45 Pastacılık Gıda A.Ş. KVKK kapsamında kişisel verilerinizin işlenmesine ilişkin aydınlatma metni.",
};

const sections = [
  {
    title: "1. Veri Sorumlusu",
    content: `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; veri sorumlusu sıfatıyla 20:45 Pastacılık Gıda A.Ş. ("Şirket") tarafından aşağıda açıklanan kapsamda işlenecektir.

Şirket Unvanı: 20:45 Pastacılık Gıda A.Ş.
Adres: Atatürk Mah. Gıda Çarşısı No:45/B, Bağcılar / İstanbul
E-posta: kvkk@2045pastaci.com`,
  },
  {
    title: "2. İşlenen Kişisel Veriler",
    content: `Platformumuzda hesap oluşturduğunuzda veya bizimle iletişime geçtiğinizde aşağıdaki kişisel verileriniz işlenebilir:

• Kimlik Bilgileri: Ad, soyad
• İletişim Bilgileri: E-posta adresi, telefon numarası
• Ticari Bilgiler: Firma adı, vergi numarası, sektör
• Kullanım Verileri: Siteye giriş tarihi, görüntülenen ürün sayfaları
• Talep Bilgileri: Fiyat talebi detayları, iletişim mesajı içeriği`,
  },
  {
    title: "3. Kişisel Verilerin İşlenme Amaçları",
    content: `Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:

• B2B üyelik hesabı oluşturulması ve yönetilmesi
• Fiyat talebi ve sipariş süreçlerinin yürütülmesi
• Müşteri hizmetleri ve teknik destek sağlanması
• Yasal yükümlülüklerin yerine getirilmesi
• Bilgi güvenliği süreçlerinin yürütülmesi
• Şirketin meşru menfaatlerinin korunması`,
  },
  {
    title: "4. Kişisel Verilerin Aktarılması",
    content: `Kişisel verileriniz; hizmetlerin yürütülmesi amacıyla ve KVKK'nın 8. ve 9. maddelerinde öngörülen koşullar çerçevesinde aşağıdaki taraflarla paylaşılabilir:

• Lojistik ve kargo şirketleri (teslimat bilgileri)
• Bulut altyapı hizmet sağlayıcıları (Firebase / Google LLC)
• Muhasebe ve mali müşavirlik firmaları
• Yetkili kamu kurumları (yasal zorunluluk halinde)`,
  },
  {
    title: "5. Kişisel Veri Saklama Süreleri",
    content: `Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve yasal yükümlülükler kapsamında saklanır:

• Müşteri hesap bilgileri: Hesap aktif olduğu sürece + 3 yıl
• Fatura ve ticari kayıtlar: 10 yıl (Vergi Usul Kanunu)
• İletişim mesajları: 2 yıl
• Çerez verileri: Oturum süresi veya en fazla 1 yıl`,
  },
  {
    title: "6. İlgili Kişinin Hakları",
    content: `KVKK'nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:

• Kişisel verilerinizin işlenip işlenmediğini öğrenme
• İşlenmişse buna ilişkin bilgi talep etme
• İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme
• Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme
• Verilerin eksik veya yanlış işlenmesi halinde düzeltme talep etme
• KVKK'nın 7. maddesi çerçevesinde silinmesini veya yok edilmesini talep etme
• Otomatik sistemler vasıtasıyla analiz edilmesi nedeniyle aleyhte oluşan sonuca itiraz etme
• Kanuna aykırı işlenmesi nedeniyle zarara uğramanız halinde zararın giderilmesini talep etme

Başvurularınızı kvkk@2045pastaci.com adresine iletebilirsiniz.`,
  },
  {
    title: "7. Çerez (Cookie) Politikası",
    content: `Web sitemizde kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanılmaktadır. Zorunlu çerezler sitenin işlevselliği için gereklidir; analitik ve pazarlama çerezleri ise tercihlerinize bağlıdır. Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.`,
  },
];

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-charcoal-900 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="section-label">Hukuki Bildirim</span>
          <h1 className="font-heading font-bold text-white text-4xl mt-2 mb-3">KVKK Aydınlatma Metni</h1>
          <p className="text-charcoal-400 text-sm">Son güncelleme: 1 Ocak 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-border rounded-2xl p-8 md:p-12 shadow-card">
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
            <p className="text-charcoal-400 text-xs">
              Bu metin bilgilendirme amaçlıdır ve hukuki danışmanlık niteliği taşımaz.
            </p>
            <Link href="/iletisim" className="btn-primary text-sm">
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
