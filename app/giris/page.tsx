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
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-cream">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center mb-8">
            <Logo size={36} />
          </div>

          <div className="mb-8">
            <h1 className="font-heading font-bold text-charcoal-800 text-3xl mb-2">
              Giriş Yapın
            </h1>
            <p className="text-charcoal-500 text-sm">
              Hesabınız yok mu?{" "}
              <Link href="/kayit" className="text-gold-600 font-semibold hover:text-gold-700 transition-colors">
                Kayıt olun
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-charcoal-700 text-xs font-semibold mb-1.5">
                E-posta Adresi
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="firma@email.com"
                className={`input ${errors.email ? "input-error" : ""}`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-charcoal-700 text-xs font-semibold">Şifre</label>
                <Link href="#" className="text-gold-600 text-xs hover:text-gold-700 transition-colors">
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle size={15} className="text-red-500 shrink-0" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3.5 text-base mt-2"
            >
              {isSubmitting ? (
                <span className="animate-spin w-4 h-4 border-2 border-charcoal-400 border-t-charcoal-900 rounded-full" />
              ) : (
                <>
                  <LogIn size={18} />
                  Giriş Yap
                </>
              )}
            </button>
          </form>

          <p className="text-charcoal-400 text-xs text-center mt-8 leading-relaxed">
            Giriş yaparak{" "}
            <Link href="/kosullar" className="underline hover:text-gold transition-colors">
              Kullanım Koşulları
            </Link>{" "}
            ve{" "}
            <Link href="/gizlilik" className="underline hover:text-gold transition-colors">
              Gizlilik Politikası&apos;nı
            </Link>{" "}
            kabul etmiş olursunuz.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
