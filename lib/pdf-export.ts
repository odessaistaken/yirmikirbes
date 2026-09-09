/**
 * Özel Müşteri Sunum Kataloğu — PDF Dışa Aktarma Servisi
 * 
 * html2canvas ve jsPDF kullanarak kataloğu yüksek çözünürlüklü,
 * düzgün sayfa düzeninde A4 formatında PDF olarak indirir.
 */

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function exportCatalogToPdf(
  containerElementId: string,
  fileName = "Yirmikirbes-Ozel-Sunum-Katalogu.pdf"
): Promise<void> {
  const element = document.getElementById(containerElementId);
  if (!element) {
    throw new Error("PDF içeriği bulunamadı.");
  }

  // Geçici görünürlük ayarı
  const originalDisplay = element.style.display;
  const originalPosition = element.style.position;
  const originalVisibility = element.style.visibility;

  element.style.display = "block";
  element.style.position = "fixed";
  element.style.top = "0";
  element.style.left = "0";
  element.style.zIndex = "-9999";
  element.style.visibility = "visible";
  element.style.width = "1000px";

  try {
    // 1. Canvas oluştur (yüksek DPI için scale: 2)
    const canvas = await html2canvas(element, {
      scale: 1.8,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#FAF9F6",
      logging: false,
      windowWidth: 1000,
    });

    // 2. A4 Sayfa Boyutları (mm)
    const imgWidth = 210; // A4 genişlik
    const pageHeight = 297; // A4 yükseklik
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // 3. jsPDF Belgesi Oluştur
    const pdf = new jsPDF("p", "mm", "a4");
    let position = 0;

    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    // İlk sayfa
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
    heightLeft -= pageHeight;

    // Çoklu sayfalar
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= pageHeight;
    }

    // 4. İndir
    pdf.save(fileName);
  } finally {
    // Görünürlüğü eski haline getir
    element.style.display = originalDisplay;
    element.style.position = originalPosition;
    element.style.visibility = originalVisibility;
    element.style.zIndex = "";
    element.style.top = "";
    element.style.left = "";
    element.style.width = "";
  }
}
