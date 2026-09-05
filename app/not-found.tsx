import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-slate-800 px-6">
      <div className="text-center max-w-md bg-white border border-slate-200 p-10 rounded-3xl shadow-xl">
        <p className="font-heading font-black text-amber-700 text-8xl mb-4">404</p>
        <h1 className="font-heading font-bold text-slate-900 text-2xl mb-3">
          Sayfa Bulunamadı
        </h1>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          Aradığınız sayfa kaldırılmış, taşınmış veya hiç var olmamış olabilir.
        </p>
        <Link href="/" className="btn-primary shadow-gold">
          <ArrowLeft size={16} />
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
