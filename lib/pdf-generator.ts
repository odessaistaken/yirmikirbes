/**
 * Vektörel & Resimli PDF Üretim Servisi (Screen-capture / html2canvas İÇERMEZ)
 * 
 * @react-pdf/renderer kullanarak doğrudan State / JSON verilerinden
 * gerçek, metinleri seçilebilir ve optimize edilmiş resimlerle A4 dergi formatında PDF üretir.
 */

import React from "react";
import type { CategoryProductGroup } from "@/lib/presentation-catalog-service";

/**
 * Tarayıcı ortamında görseli yükler, canvas ile 180px'e boyutlandırıp
 * optimize edilmiş JPEG base64 veri formatına dönüştürür. Hata veya zaman aşımında null döner.
 */
async function optimizeImageForPdf(url: string): Promise<string | null> {
  if (!url || typeof window === "undefined") return null;

  return new Promise((resolve) => {
    const fullUrl = url.startsWith("/") ? `${window.location.origin}${url}` : url;
    const img = new window.Image();
    img.crossOrigin = "anonymous";

    // 2.5 saniyelik zaman aşımı koruması (asla kilitlenmez)
    const timer = setTimeout(() => {
      resolve(null);
    }, 2500);

    img.onload = () => {
      clearTimeout(timer);
      try {
        const canvas = document.createElement("canvas");
        const maxDim = 180; // 64x64pt kutu için ~2.8x Retina DPI çözünürlüğü
        let width = img.naturalWidth || img.width || maxDim;
        let height = img.naturalHeight || img.height || maxDim;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(null);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Optimize JPEG formatı (~12-20 KB per resim)
        const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
        resolve(dataUrl);
      } catch {
        resolve(null);
      }
    };

    img.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };

    img.src = fullUrl;
  });
}

/**
 * Ürün görsellerini tarayıcı belleğinde optimize ederek PDF şablonu için hazırlar
 */
async function prepareCategoryGroupsForPdf(
  categoryGroups: CategoryProductGroup[]
): Promise<CategoryProductGroup[]> {
  const result: CategoryProductGroup[] = [];

  for (const group of categoryGroups) {
    const productsWithOptimizedImages = [];
    const chunkSize = 12; // 12'şerli eşzamanlı görsel işleme

    for (let i = 0; i < group.products.length; i += chunkSize) {
      const slice = group.products.slice(i, i + chunkSize);
      const processedSlice = await Promise.all(
        slice.map(async (p) => {
          let base64Img: string | null = null;
          if (p.imageUrl && !p.imageUrl.toLowerCase().endsWith(".svg")) {
            base64Img = await optimizeImageForPdf(p.imageUrl);
          }
          return {
            ...p,
            imageUrl: base64Img || "",
          };
        })
      );
      productsWithOptimizedImages.push(...processedSlice);
    }

    result.push({
      ...group,
      products: productsWithOptimizedImages,
    });
  }

  return result;
}

export async function downloadVectorCatalogPDF(
  categoryGroups: CategoryProductGroup[],
  fileName = "Yirmikirbes-Ozel-Sunum-Katalogu.pdf"
): Promise<void> {
  if (!categoryGroups || categoryGroups.length === 0) {
    throw new Error("PDF çıktısı için görüntülenecek kategori veya ürün bulunamadı.");
  }

  // 1. Görselleri bellekte optimize et (react-pdf'in takılmasını ve boş sayfa üretmesini engeller)
  const sanitizedGroups = await prepareCategoryGroupsForPdf(categoryGroups);

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

  // 6. Bellek temizliği (tarayıcı indirme akışını kesmemek için 60 saniye sonra serbest bırakılır)
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 60000);
}
