/**
 * Vektörel PDF Üretim Servisi (Screen-capture/canvas İÇERMEZ)
 * 
 * @react-pdf/renderer kullanarak arka planda State verisinden doğrudan
 * gerçek, metinleri seçilebilir, aranabilir ve yüksek kaliteli A4 PDF üretir.
 */

import React from "react";
import type { CategoryProductGroup } from "@/lib/presentation-catalog-service";

export async function downloadVectorCatalogPDF(
  categoryGroups: CategoryProductGroup[],
  fileName = "Yirmikirbes-Ozel-Sunum-Katalogu.pdf"
): Promise<void> {
  // 1. @react-pdf/renderer ve PDF Şablonunu dinamik yükle (SSR güvenliği için)
  const [{ pdf }, { default: PresentationPDFDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("@/components/presentation/pdf/PresentationPDFDocument"),
  ]);

  // 2. React öğesini oluştur
  const element = React.createElement(PresentationPDFDocument, {
    categoryGroups,
    dateStr: new Date().toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  });

  // 3. Gerçek vektörel PDF Blob'u üret
  const blob = await pdf(element as any).toBlob();

  // 4. Tarayıcıda temiz dosya indirmesi tetikle
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
