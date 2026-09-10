/**
 * Vektörel & Resimli PDF Üretim Servisi (Screen-capture / html2canvas İÇERMEZ)
 * 
 * @react-pdf/renderer kullanarak arka planda State / JSON verilerinden doğrudan
 * gerçek, metinleri seçilebilir, aranabilir ve yüksek kaliteli A4 Dergi/Baskı PDF'i üretir.
 */

import React from "react";
import type { CategoryProductGroup } from "@/lib/presentation-catalog-service";

/**
 * Görsel yollarını @react-pdf/renderer için mutlak URL'ye ve güvenli formata dönüştürür
 */
function prepareCategoryGroupsForPdf(
  categoryGroups: CategoryProductGroup[]
): CategoryProductGroup[] {
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return categoryGroups.map((group) => ({
    ...group,
    products: group.products.map((p) => {
      let img = p.imageUrl ? p.imageUrl.trim() : "";

      // SVG veya geçersiz formatları temizle (react-pdf <Image> SVG desteklemez)
      if (img.toLowerCase().endsWith(".svg")) {
        img = "";
      } else if (img.startsWith("/") && origin) {
        // Göreli yolları (/resimler/...) mutlak URL'ye çevir (http://localhost:3000/resimler/...)
        img = `${origin}${img}`;
      }

      return {
        ...p,
        imageUrl: img,
      };
    }),
  }));
}

export async function downloadVectorCatalogPDF(
  categoryGroups: CategoryProductGroup[],
  fileName = "Yirmikirbes-Ozel-Sunum-Katalogu.pdf"
): Promise<void> {
  if (!categoryGroups || categoryGroups.length === 0) {
    throw new Error("PDF çıktısı için görüntülenecek kategori veya ürün bulunamadı.");
  }

  // 1. Görselleri ve verileri PDF mizanpajı için hazırla
  const sanitizedGroups = prepareCategoryGroupsForPdf(categoryGroups);

  // 2. @react-pdf/renderer ve PDF Şablonunu dinamik yükle (SSR güvenliği için)
  const [{ pdf }, { default: PresentationPDFDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("@/components/presentation/pdf/PresentationPDFDocument"),
  ]);

  // 3. React döküman öğesini oluştur
  const dateStr = new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const element = React.createElement(PresentationPDFDocument, {
    categoryGroups: sanitizedGroups,
    dateStr,
  });

  // 4. Gerçek vektörel ve resimli PDF Blob'u üret
  const blob = await pdf(element as any).toBlob();

  if (!blob || blob.size === 0) {
    throw new Error("PDF belgesi oluşturulamadı (boş veri döndü).");
  }

  // 5. Tarayıcıda dosya indirmesi tetikle
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Bellek temizliği
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}
