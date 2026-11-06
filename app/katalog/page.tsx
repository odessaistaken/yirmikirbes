"use client";

import { Suspense } from "react";
import KatalogView from "@/components/catalog/KatalogView";

export default function KatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="text-slate-500 text-sm">Katalog yükleniyor...</div>
        </div>
      }
    >
      <KatalogView />
    </Suspense>
  );
}
