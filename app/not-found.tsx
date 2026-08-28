import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121316] text-slate-200 px-6">
      <div className="text-center max-w-md bg-[#1B1D23] border border-[#282C36] p-10 rounded-3xl shadow-2xl">
        <p className="font-heading font-black text-gold text-8xl mb-4">404</p>
        <h1 className="font-heading font-bold text-white text-2xl mb-3">
          Sayfa Bulunamadı
        </h1>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
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
