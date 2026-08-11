import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="text-center max-w-md">
        <p className="font-heading font-black text-gold text-8xl mb-4">404</p>
        <h1 className="font-heading font-bold text-charcoal-800 text-2xl mb-3">
          Sayfa Bulunamadı
        </h1>
        <p className="text-charcoal-500 text-sm mb-8 leading-relaxed">
          Aradığınız sayfa kaldırılmış, taşınmış veya hiç var olmamış olabilir.
        </p>
        <Link href="/" className="btn-primary">
          <ArrowLeft size={16} />
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
