"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserPlus, Eye, EyeOff, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/auth-context";

const schema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  company: z.string().min(2, "Firma adı gereklidir"),
  phone: z.string().min(10, "Geçerli bir telefon girin"),
  email: z.string().email("Geçerli bir e-posta girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});
type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { registerUser } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setError(null);
    try {
      await registerUser(data.name, data.company, data.email, data.phone, data.password);
      toast.success("Hesabınız başarıyla oluşturuldu.");
      router.push("/hesap");
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/email-already-in-use") {
        setError("Bu e-posta adresi zaten kayıtlı. Giriş yapmayı deneyin.");
        toast.error("Bu e-posta adresi zaten kayıtlı.");
      } else if (code === "auth/weak-password") {
        setError("Şifre çok zayıf.");
        toast.error("Şifre çok zayıf.");
      } else {
        const msg = (err as any)?.message || "Kayıt oluşturulamadı.";
        setError(msg);
        toast.error(msg);
      }
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1587749091230-8e54cd9e3c0e?w=1200&q=85"
          alt="Pastacılık ürünleri"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-charcoal-900/75" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center mb-4 shadow-gold">
            <span className="text-charcoal-900 font-heading font-black text-sm">20:45</span>
          </div>
          <h2 className="font-heading font-bold text-white text-3xl mb-3">
            B2B Hesabınızı<br />Oluşturun
          </h2>
          <p className="text-charcoal-300 text-sm leading-relaxed max-w-sm">
            Kayıt olduktan sonra özel B2B fiyatlandırma, toplu sipariş ve teknik destek hizmetlerinden yararlanabilirsiniz.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-cream overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
              <span className="text-charcoal-900 font-heading font-black text-sm">20:45</span>
            </div>
            <p className="font-heading font-bold text-charcoal-800 text-base">20:45 Pastacılık</p>
          </div>

          <div className="mb-8">
            <h1 className="font-heading font-bold text-charcoal-800 text-3xl mb-2">
              Kayıt Olun
            </h1>
            <p className="text-charcoal-500 text-sm">
              Zaten hesabınız var mı?{" "}
              <Link href="/giris" className="text-gold-600 font-semibold hover:text-gold-700 transition-colors">
                Giriş yapın
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Ad Soyad *</label>
                <input {...register("name")} placeholder="Adınız Soyadınız" className={`input ${errors.name ? "input-error" : ""}`} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Firma Adı *</label>
                <input {...register("company")} placeholder="Firma Adı" className={`input ${errors.company ? "input-error" : ""}`} />
                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Telefon *</label>
              <input {...register("phone")} type="tel" placeholder="05XX XXX XX XX" className={`input ${errors.phone ? "input-error" : ""}`} />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">E-posta Adresi *</label>
              <input {...register("email")} type="email" placeholder="firma@email.com" className={`input ${errors.email ? "input-error" : ""}`} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Şifre *</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="En az 6 karakter"
                  className={`input pr-12 ${errors.password ? "input-error" : ""}`}
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">Şifre Tekrar *</label>
              <input
                {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                placeholder="Şifrenizi tekrar girin"
                className={`input ${errors.confirmPassword ? "input-error" : ""}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle size={15} className="text-red-500 shrink-0" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3.5 text-base mt-2">
              {isSubmitting ? (
                <span className="animate-spin w-4 h-4 border-2 border-charcoal-400 border-t-charcoal-900 rounded-full" />
              ) : (
                <>
                  <UserPlus size={18} />
                  Hesap Oluştur
                </>
              )}
            </button>
          </form>

          <p className="text-charcoal-400 text-xs text-center mt-6 leading-relaxed">
            Kayıt olarak{" "}
            <Link href="/kosullar" className="underline hover:text-gold transition-colors">Kullanım Koşulları</Link>{" "}
            ve{" "}
            <Link href="/kvkk" className="underline hover:text-gold transition-colors">KVKK Aydınlatma Metni</Link>&apos;ni kabul etmiş olursunuz.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
