"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import { KatalogView } from "@/app/katalog/page";

export default function CategoryPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "all";

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-charcoal-400 text-sm">Kategori yükleniyor...</div>
        </div>
      }
    >
      <KatalogView forcedCategorySlug={slug} />
    </Suspense>
  );
}
