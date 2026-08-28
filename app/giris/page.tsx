"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Logo from "@/components/Logo";

const schema = z.object({
  email: z.string().email("Geçerli bir e-posta girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { loginUser } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setError(null);
    try {
      await loginUser(data.email, data.password);
      router.push("/hesap");
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        setError("E-posta veya şifre hatalı.");
      } else {
        setError("Giriş yapılamadı. Lütfen tekrar deneyin.");
      }
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1600&q=90"
          alt="Pastacılık atölyesi"
          fill
          quality={90}
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-charcoal-900/70" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <div className="mb-4">
            <Logo variant="light" size={42} />
          </div>
          <h2 className="font-heading font-bold text-white text-3xl mb-3">
            Premium B2B<br />Tedarik Portalı
          </h2>
          <p className="text-charcoal-300 text-sm leading-relaxed max-w-sm">
            500+ profesyonel pastacılık ürününe erişim, fiyat teklifi ve toplu sipariş yönetimi.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#121316] text-slate-200">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-[#1B1D23] border border-[#282C36] p-8 sm:p-10 rounded-3xl shadow-2xl"
        >
          <div className="lg:hidden flex items-center mb-8">
            <Logo size={36} />
          </div>

          <div className="mb-8">
            <h1 className="font-heading font-bold text-white text-3xl mb-2">
              Giriş Yapın
            </h1>
            <p className="text-slate-400 text-sm">
              Hesabınız yok mu?{" "}
              <Link href="/kayit" className="text-gold font-bold hover:text-gold-300 transition-colors">
                Kayıt olun
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1.5">
                E-posta Adresi
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="firma@email.com"
                className={`input ${errors.email ? "input-error" : ""}`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-slate-300 text-xs font-semibold">Şifre</label>
                <Link href="#" className="text-gold text-xs font-medium hover:text-gold-300 transition-colors">
                  Şifremi unuttum
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`input pr-12 ${errors.password ? "input-error" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertCircle size={15} className="text-red-400 shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3.5 text-base mt-2 shadow-gold hover:shadow-gold-lg"
            >
              {isSubmitting ? (
                <span className="animate-spin w-4 h-4 border-2 border-slate-700 border-t-black rounded-full" />
              ) : (
                <>
                  <LogIn size={18} />
                  Giriş Yap
                </>
              )}
            </button>
          </form>

          <p className="text-slate-400 text-xs text-center mt-8 leading-relaxed">
            Giriş yaparak{" "}
            <Link href="/kosullar" className="underline text-gold hover:text-gold-300 transition-colors">
              Kullanım Koşulları
            </Link>{" "}
            ve{" "}
            <Link href="/gizlilik" className="underline text-gold hover:text-gold-300 transition-colors">
              Gizlilik Politikası&apos;nı
            </Link>{" "}
            kabul etmiş olursunuz.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
