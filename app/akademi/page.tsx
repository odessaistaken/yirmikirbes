"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Coffee,
  Sparkles,
  Calendar,
  Clock,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  MessageCircle,
  ChevronRight,
  ArrowRight,
  Send,
  Star,
  Layers,
  Flame,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AkademiPage() {
  const [activeTab, setActiveTab] = useState<"all" | "serif" | "neslihan">("all");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    business: "",
    workshop: "Şerif Yeğen ile Barista & Kahve Miksolojisi Masterclass",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Lütfen adınızı ve telefon numaranızı giriniz.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Workshop ön başvurunuz alındı! Danışmanımız en kısa sürede sizinle iletişime geçecektir.");
      setFormData({
        name: "",
        phone: "",
        business: "",
        workshop: "Şerif Yeğen ile Barista & Kahve Miksolojisi Masterclass",
        notes: "",
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#383b40] text-slate-200">
      {/* ── Breadcrumb ── */}
      <div className="bg-[#121316] border-b border-[#282C36]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Link href="/" className="hover:text-gold transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight size={12} />
            <span className="text-gold font-semibold">20:45 Akademi</span>
          </div>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-[#121316] via-[#1B1D23] to-[#383b40] border-b border-[#282C36]">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gold/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B1D23] border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
            >
              <GraduationCap size={15} />
              <span>20:45 Gastronomi & Barista Akademisi</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-extrabold text-white text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight mb-6"
            >
              Sektörün Ustalarıyla{" "}
              <span className="gold-text">Workshop & Masterclass</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8"
            >
              Ünlü Barista <strong>Şerif Yeğen</strong> ve Profesyonel Pastacılık Şefi{" "}
              <strong>Neslihan Demir</strong> eşliğinde; teorik bilgiyi pratik uzmanlığa dönüştüren,
              işletmelerinize değer katacak özel eğitim serileri.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="#workshops"
                className="btn-primary py-3.5 px-6 rounded-xl font-bold shadow-gold flex items-center gap-2 text-sm"
              >
                <BookOpen size={16} />
                Workshopları İncele
              </a>
              <a
                href="#kayit"
                className="btn-secondary py-3.5 px-6 rounded-xl font-semibold border border-gold/40 text-gold hover:bg-gold hover:text-[#0D0E11] transition-all text-sm flex items-center gap-2"
              >
                <Calendar size={16} />
                Katılım Başvurusu
              </a>
            </motion.div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {[
              { icon: <Award size={20} className="text-gold" />, title: "Resmi Sertifika", desc: "20:45 Akademi Onaylı Belge" },
              { icon: <Users size={20} className="text-gold" />, title: "Butik Gruplar", desc: "Maks. 6-8 Kişilik İstasyonlar" },
              { icon: <Sparkles size={20} className="text-gold" />, title: "Özel Reçeteler", desc: "Ticari Uygulanabilir Portföy" },
              { icon: <Coffee size={20} className="text-gold" />, title: "Premium Hammadde", desc: "DaVinci, Nonno & Krater" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#1B1D23]/80 backdrop-blur border border-[#282C36] rounded-2xl p-4 text-center hover:border-gold/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-2.5">
                  {item.icon}
                </div>
                <p className="font-heading font-bold text-white text-sm">{item.title}</p>
                <p className="text-slate-400 text-2xs mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Filter Tabs ── */}
      <div id="workshops" className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "all"
                ? "bg-gold text-[#0D0E11] shadow-gold"
                : "bg-[#1B1D23] text-slate-300 hover:text-white border border-[#282C36]"
            }`}
          >
            Tüm Workshoplar
          </button>
          <button
            onClick={() => setActiveTab("serif")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "serif"
                ? "bg-gold text-[#0D0E11] shadow-gold"
                : "bg-[#1B1D23] text-slate-300 hover:text-white border border-[#282C36]"
            }`}
          >
            <Coffee size={15} />
            Barista Şerif Yeğen
          </button>
          <button
            onClick={() => setActiveTab("neslihan")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "neslihan"
                ? "bg-gold text-[#0D0E11] shadow-gold"
                : "bg-[#1B1D23] text-slate-300 hover:text-white border border-[#282C36]"
            }`}
          >
            <Flame size={15} />
            Şef Neslihan Demir
          </button>
        </div>
      </div>

      {/* ── Workshop 1: Şerif Yeğen ── */}
      {(activeTab === "all" || activeTab === "serif") && (
        <section className="py-12 sm:py-16">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#1B1D23] rounded-3xl border border-[#282C36] overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-start">
                {/* Left Col: Info & Modules */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge badge-gold font-bold">Kahve & Barista Masterclass</span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Clock size={13} className="text-gold" /> Tam Gün / 8 Saat
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Users size={13} className="text-gold" /> Maks. 8 Katılımcı
                    </span>
                  </div>

                  <div>
                    <h2 className="font-heading font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl leading-snug">
                      Espresso Kalibrasyonu, Latte Art &{" "}
                      <span className="gold-text">Yeni Nesil Barista Miksolojisi</span>
                    </h2>
                    <p className="text-gold font-semibold text-sm sm:text-base mt-1.5 flex items-center gap-2">
                      <span>Eğitmen:</span>
                      <strong className="text-white font-heading tracking-wide">Şerif Yeğen</strong>
                      <span className="text-slate-400 text-xs font-normal">
                        (Baş Barista & SCA Kahve Danışmanı)
                      </span>
                    </p>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Nitelikli kahve barlarında standart ve tutarlı lezzet yakalamanın kimyası, değirmen mikron kalibrasyonu,
                    su sertliği ve ekstraksiyon dinamikleri. DaVinci Gourmet ve Caffè NONNO ürünleriyle imza mocktail,
                    soğuk kahve ve aromatik içecek reçetelerinin oluşturulması.
                  </p>

                  {/* Modules */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold flex items-center gap-1.5">
                      <Layers size={14} /> Eğitim Modülleri
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          title: "Espresso Dial-In & Ekstraksiyon",
                          desc: "TDS ölçümleri, demleme oranı (brew ratio) ve kanalizasyon kontrolü.",
                        },
                        {
                          title: "Mikro Köpük & İleri Latte Art",
                          desc: "Süt protein yapısı, serbest döküş teknikleri (Rosetta, Tulip, Kuğu).",
                        },
                        {
                          title: "Soğuk İçecek & Şurup Miksolojisi",
                          desc: "DaVinci & NONNO püreleriyle yaz/kış imza reçete tasarımı.",
                        },
                        {
                          title: "İstasyon Ergonomisi & Hız",
                          desc: "Pik saatlerde lezzet standardını bozmadan hızlı servis operasyonu.",
                        },
                      ].map((mod, idx) => (
                        <div
                          key={idx}
                          className="bg-[#121316] border border-[#282C36] rounded-xl p-3.5 hover:border-gold/30 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle size={14} className="text-gold shrink-0" />
                            <p className="font-heading font-semibold text-white text-xs sm:text-sm">{mod.title}</p>
                          </div>
                          <p className="text-slate-400 text-2xs leading-normal">{mod.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href="#kayit"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          workshop: "Şerif Yeğen ile Barista & Kahve Miksolojisi Masterclass",
                        }))
                      }
                      className="btn-primary py-3 px-6 rounded-xl font-bold shadow-gold text-xs sm:text-sm flex items-center gap-2"
                    >
                      Bu Workshopa Kayıt Ol
                      <ArrowRight size={14} />
                    </a>
                    <a
                      href="https://wa.me/905010737113?text=Merhaba,%20Şerif%20Yeğen%20barista%20workshopu%20hakkında%20bilgi%20almak%20istiyorum."
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-xs sm:text-sm font-semibold"
                    >
                      <MessageCircle size={15} />
                      WhatsApp ile Bilgi Al
                    </a>
                  </div>
                </div>

                {/* Right Col: Instructor Article / Card */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-[#121316] border border-[#282C36] rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex items-center gap-3.5 pb-4 border-b border-[#282C36]">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/30 to-[#1B1D23] border border-gold/40 flex items-center justify-center shrink-0 text-2xl">
                        ☕
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-base">Şerif Yeğen</p>
                        <p className="text-gold text-xs font-semibold">Baş Barista & SCA Kahve Eğitmeni</p>
                        <p className="text-slate-400 text-2xs">20:45 Akademi Baş Danışmanı</p>
                      </div>
                    </div>

                    <div className="pt-4 space-y-3">
                      <div className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider">
                        <Star size={13} fill="currentColor" />
                        <span>Eğitmen Yazısı</span>
                      </div>
                      <h3 className="font-heading font-bold text-white text-base leading-snug">
                        &quot;Kusursuz Bir Espresso Shot ve Baristanın İmzası&quot;
                      </h3>
                      <div className="text-slate-300 text-xs sm:text-sm leading-relaxed space-y-2.5 font-sans">
                        <p>
                          <em>
                            &quot;Kahve sadece bir hammadde değil; çekirdeğin kavrulma profilinden suyun mineral dengesine,
                            değirmenin mikron ayarından sütün köpürtülme açısına kadar yaşayan bir bilim dalıdır.&quot;
                          </em>
                        </p>
                        <p>
                          20:45 Akademi atölyelerimizde katılımcılarımıza yalnızca bir espresso makinesinin tuşuna basmayı
                          değil, çekirdeğin dilini çözmeyi öğretiyoruz. DaVinci Gourmet ve Caffè NONNO&apos;nun benzersiz
                          şurup ve püre skalası ile kahveyi klasik kalıpların dışına çıkarıp gastronomi düzeyinde imza
                          içeceklere dönüştürüyoruz.
                        </p>
                        <p>
                          İşletmenizde her gün yüzlerce fincan çıkarken, birinci fincan ile sonuncu fincanın aynı dengeli
                          asidite ve kadife gövdeye sahip olmasının anahtarı bu workshopta gizli.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Workshop 2: Neslihan Demir ── */}
      {(activeTab === "all" || activeTab === "neslihan") && (
        <section className="py-12 sm:py-16 bg-[#16181D]/60 border-y border-[#282C36]">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#1B1D23] rounded-3xl border border-[#282C36] overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-start">
                {/* Left Col: Info & Modules */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge badge-gold font-bold">Pastacılık & Çikolata Masterclass</span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Clock size={13} className="text-gold" /> 2 Günlük Yoğun Kamp
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Users size={13} className="text-gold" /> Maks. 6 Katılımcı
                    </span>
                  </div>

                  <div>
                    <h2 className="font-heading font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl leading-snug">
                      Modern Monoporiyon Pastalar, Choux Hamuru &{" "}
                      <span className="gold-text">Artisan Çikolata Sanatı</span>
                    </h2>
                    <p className="text-gold font-semibold text-sm sm:text-base mt-1.5 flex items-center gap-2">
                      <span>Eğitmen:</span>
                      <strong className="text-white font-heading tracking-wide">Şef Neslihan Demir</strong>
                      <span className="text-slate-400 text-xs font-normal">
                        (Executive Pastry Chef & Pastacılık Danışmanı)
                      </span>
                    </p>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Fransız pastacılık disiplinini modern vitrin trendleriyle buluşturan ileri seviye workshop.
                    Pate a Choux ve Craquelin teknikleri, CALLEI çikolatalarıyla doğru temperleme ve ayna glaze kaplamalar,
                    Krater meyve püreleriyle asidite ve doku dengesi.
                  </p>

                  {/* Modules */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold flex items-center gap-1.5">
                      <Layers size={14} /> Eğitim Modülleri
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          title: "Pate a Choux & Craquelin",
                          desc: "Kabaran çıtır kabuk, çatlamayan form ve ipeksi Creme Patissiere dolguları.",
                        },
                        {
                          title: "Ayna Glaze & Kadife Doku",
                          desc: "Ayna parlaklığında glaze soslar ve tabanca ile püskürtme kadife kaplamalar.",
                        },
                        {
                          title: "CALLEI Çikolata Temperleme",
                          desc: "Tablalama ve tohumlama yöntemleriyle çıtır kırılma ve kusursuz parlaklık.",
                        },
                        {
                          title: "Meyve & Asidite Katmanları",
                          desc: "Krater meyveli karışımlarla damakta ferah bitiş sağlayan jel ve kremler.",
                        },
                      ].map((mod, idx) => (
                        <div
                          key={idx}
                          className="bg-[#121316] border border-[#282C36] rounded-xl p-3.5 hover:border-gold/30 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle size={14} className="text-gold shrink-0" />
                            <p className="font-heading font-semibold text-white text-xs sm:text-sm">{mod.title}</p>
                          </div>
                          <p className="text-slate-400 text-2xs leading-normal">{mod.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href="#kayit"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          workshop: "Şef Neslihan Demir ile Modern Pastacılık & Çikolata Masterclass",
                        }))
                      }
                      className="btn-primary py-3 px-6 rounded-xl font-bold shadow-gold text-xs sm:text-sm flex items-center gap-2"
                    >
                      Bu Workshopa Kayıt Ol
                      <ArrowRight size={14} />
                    </a>
                    <a
                      href="https://wa.me/905010737113?text=Merhaba,%20Şef%20Neslihan%20Demir%20pastacılık%20workshopu%20hakkında%20bilgi%20almak%20istiyorum."
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-xs sm:text-sm font-semibold"
                    >
                      <MessageCircle size={15} />
                      WhatsApp ile Bilgi Al
                    </a>
                  </div>
                </div>

                {/* Right Col: Instructor Article / Card */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-[#121316] border border-[#282C36] rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex items-center gap-3.5 pb-4 border-b border-[#282C36]">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/30 to-[#1B1D23] border border-gold/40 flex items-center justify-center shrink-0 text-2xl">
                        🍰
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-base">Şef Neslihan Demir</p>
                        <p className="text-gold text-xs font-semibold">Executive Pastry Chef</p>
                        <p className="text-slate-400 text-2xs">Pastacılık & Gastronomi Danışmanı</p>
                      </div>
                    </div>

                    <div className="pt-4 space-y-3">
                      <div className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider">
                        <Star size={13} fill="currentColor" />
                        <span>Eğitmen Yazısı</span>
                      </div>
                      <h3 className="font-heading font-bold text-white text-base leading-snug">
                        &quot;Pastacılıkta Denge: Lezzet, Doku ve Estetiğin Matematiksel Uyumu&quot;
                      </h3>
                      <div className="text-slate-300 text-xs sm:text-sm leading-relaxed space-y-2.5 font-sans">
                        <p>
                          <em>
                            &quot;İyi bir pasta sadece damağa değil; önce göze, sonra dokuya ve en sonunda hafızaya hitap eder.
                            Şekerin baskın olmadığı, meyvenin gerçek ferahlığını ve kaliteli çikolatanın ipeksiliğini
                            hissettiren formüller yaratmak ustalık gerektirir.&quot;
                          </em>
                        </p>
                        <p>
                          20:45 Akademi mutfağında gerçekleştirdiğimiz bu masterclass programında, katılımcılara ezbere tarif
                          vermiyoruz. Bir pate a choux hamurunun fırında nasıl yükseldiğini, CALLEI çikolatalarının kristal
                          yapısının sıcaklıkla nasıl kilitlendiğini ve Krater meyve karışımlarının tatlıdaki yağ dengesini
                          nasıl sıfırladığını laboratuvar titizliğiyle deneyimliyoruz.
                        </p>
                        <p>
                          Kafeler, butik fırınlar ve otel mutfakları için vitrinde günlerce tazeliğini ve formunu koruyan
                          ürünler üretmenin püf noktalarını bu atölyede paylaşıyorum.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Registration Form Section ── */}
      <section id="kayit" className="py-20 bg-gradient-to-b from-[#383b40] to-[#121316]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1B1D23] border border-[#282C36] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 blur-3xl pointer-events-none" />

            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="badge badge-gold mb-3">Sınırlı Kontenjan</span>
              <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl">
                Workshop Katılım & Ön Başvuru Formu
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Bilgilerinizi bırakın, eğitim takvimi ve kontenjan durumuna göre danışmanımız sizi arasın.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Örn: Ahmet Yılmaz"
                    className="w-full bg-[#121316] border border-[#282C36] rounded-xl px-4 py-3 text-white text-sm focus:border-gold outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Telefon Numarası *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05XX XXX XX XX"
                    className="w-full bg-[#121316] border border-[#282C36] rounded-xl px-4 py-3 text-white text-sm focus:border-gold outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    İşletme / Unvan (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    placeholder="Örn: Coffee Shop / Kafe Sahibi / Şef"
                    className="w-full bg-[#121316] border border-[#282C36] rounded-xl px-4 py-3 text-white text-sm focus:border-gold outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    İlgilendiğiniz Workshop *
                  </label>
                  <select
                    value={formData.workshop}
                    onChange={(e) => setFormData({ ...formData, workshop: e.target.value })}
                    className="w-full bg-[#121316] border border-[#282C36] rounded-xl px-4 py-3 text-white text-sm focus:border-gold outline-none transition-colors"
                  >
                    <option value="Şerif Yeğen ile Barista & Kahve Miksolojisi Masterclass">
                      Şerif Yeğen — Barista & Kahve Miksolojisi
                    </option>
                    <option value="Şef Neslihan Demir ile Modern Pastacılık & Çikolata Masterclass">
                      Şef Neslihan Demir — Modern Pastacılık & Çikolata
                    </option>
                    <option value="Her İki Eğitime de Katılmak İstiyorum">
                      Her İki Eğitime de Katılmak İstiyorum
                    </option>
                    <option value="Kurumsal / İşletmeye Özel Workshop Talebi">
                      Kurumsal / İşletmeye Özel Workshop Talebi
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Notlarınız / Sorularınız
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Deneyim seviyeniz, katılmak istediğiniz tarih aralığı veya öğrenmek istedikleriniz..."
                  className="w-full bg-[#121316] border border-[#282C36] rounded-xl px-4 py-3 text-white text-sm focus:border-gold outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full py-4 text-sm font-bold shadow-gold flex items-center justify-center gap-2 rounded-xl"
                >
                  {submitting ? (
                    <span>Gönderiliyor...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Ön Başvuru Formunu Gönder</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-3">
                <p className="text-slate-400 text-xs">
                  Veya doğrudan WhatsApp üzerinden iletişime geçebilirsiniz:{" "}
                  <a
                    href="https://wa.me/905010737113?text=Merhaba,%2020:45%20Akademi%20workshopları%20hakkında%20bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noreferrer"
                    className="text-gold hover:underline font-semibold"
                  >
                    0501 073 71 13
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}