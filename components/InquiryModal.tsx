"use client";

/**
 * InquiryModal — slide-up drawer for "Fiyat Sorunuz" requests.
 * Writes to Firestore `inquiries` collection on submit.
 * Pre-fills user data if logged in.
 */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { requireDb } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { type Product } from "@/lib/types";

/* ─── Validation schema ─────────────────────────────────────────────────── */
const schema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  company: z.string().min(2, "Firma adı gereklidir"),
  email: z.string().email("Geçerli bir e-posta girin"),
  phone: z.string().min(10, "Geçerli bir telefon girin"),
  quantity: z.string().optional(),
  message: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function InquiryModal({ isOpen, onClose, product }: InquiryModalProps) {
  const { currentUser, userProfile } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: userProfile?.name ?? "",
      company: userProfile?.company ?? "",
      email: userProfile?.email ?? "",
      phone: userProfile?.phone ?? "",
    },
  });

  /* Pre-fill when user logs in */
  useEffect(() => {
    if (userProfile) {
      reset({
        name: userProfile.name,
        company: userProfile.company,
        email: userProfile.email,
        phone: userProfile.phone ?? "",
      });
    }
  }, [userProfile, reset]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function handleClose() {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setSubmitError(null);
      reset();
    }, 350);
  }

  async function onSubmit(data: FormData) {
    setSubmitError(null);
    try {
      await addDoc(collection(requireDb(), "inquiries"), {
        ...data,
        userId: currentUser?.uid ?? null,
        productId: product.id,
        productName: product.name,
        productCode: product.code,
        status: "new",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitError("Talebiniz gönderilemedi. Lütfen tekrar deneyin.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 md:inset-0 md:flex md:items-center md:justify-center md:p-8"
          >
            <div
              className="bg-white border border-slate-200 text-slate-800 rounded-t-3xl md:rounded-2xl w-full md:max-w-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {!submitted ? (
                <>
                  {/* Header */}
                  <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 px-6 py-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-gold-600 text-xs font-bold uppercase tracking-wider mb-1">
                          Fiyat Talebi
                        </p>
                        <h2 className="font-heading font-bold text-slate-900 text-lg leading-snug">
                          {product.name}
                        </h2>
                        <p className="text-slate-500 text-xs font-mono mt-0.5">
                          Kod: {product.code}
                        </p>
                      </div>
                      <button
                        onClick={handleClose}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors shrink-0"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                          Ad Soyad *
                        </label>
                        <input
                          {...register("name")}
                          placeholder="Adınız Soyadınız"
                          className={`input ${errors.name ? "input-error" : ""}`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                          Firma Adı *
                        </label>
                        <input
                          {...register("company")}
                          placeholder="Firma Adı"
                          className={`input ${errors.company ? "input-error" : ""}`}
                        />
                        {errors.company && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.company.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                          E-posta *
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="firma@email.com"
                          className={`input ${errors.email ? "input-error" : ""}`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                          Telefon *
                        </label>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="05XX XXX XX XX"
                          className={`input ${errors.phone ? "input-error" : ""}`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                        Tahmini Miktar
                      </label>
                      <input
                        {...register("quantity")}
                        placeholder="Örn: 50 kg / ay, 100 adet"
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                        Ek Mesaj
                      </label>
                      <textarea
                        {...register("message")}
                        placeholder="Özel gereksinimlerinizi veya sorularınızı yazın..."
                        rows={3}
                        className="input resize-none"
                      />
                    </div>

                    {submitError && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                        <AlertCircle size={15} className="text-red-500 shrink-0" />
                        <p className="text-red-600 text-sm">{submitError}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full py-3 shadow-gold"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Fiyat Talebi Gönder
                        </>
                      )}
                    </button>

                    <p className="text-slate-400 text-xs text-center">
                      En geç 1 iş günü içinde sizinle iletişime geçeceğiz.
                    </p>
                  </form>
                </>
              ) : (
                /* Success state */
                <div className="p-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-xl mb-2">
                    Talebiniz Alındı!
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    <span className="font-semibold text-gold-600">{product.name}</span>{" "}
                    için fiyat talebiniz başarıyla iletildi. En geç 1 iş günü içinde
                    ekibimiz sizinle iletişime geçecektir.
                  </p>
                  <button onClick={handleClose} className="btn-primary">
                    Tamam
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
