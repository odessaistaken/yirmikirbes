/**
 * PDF Grid Export Service
 * Renders product cards (grid view) to a high-quality PDF using html2canvas + jsPDF.
 * Each card is captured as a canvas image and placed onto A4 pages with
 * custom header, footer, page numbering, and CORS image handling.
 */

export interface PdfGridExportOptions {
  /** The container element that holds the grid cards */
  containerEl: HTMLElement;
  /** PDF file name (without .pdf) */
  fileName?: string;
  /** Title printed on the PDF header */
  title?: string;
  /** Subtitle or date info on header */
  subtitle?: string;
  /** Number of columns per PDF page row (default: 3) */
  cols?: number;
  /** Gap between cards in mm (default: 4) */
  gap?: number;
  /** A4 page margin in mm (default: 10) */
  margin?: number;
  /** Called with progress 0-100 and status message */
  onProgress?: (pct: number, statusText?: string) => void;
}

/**
 * Waits for all <img> elements inside a container to finish loading.
 */
async function waitForImages(el: HTMLElement): Promise<void> {
  const imgs = Array.from(el.querySelectorAll("img")) as HTMLImageElement[];
  const pending = imgs.filter((img) => !img.complete || img.naturalWidth === 0);
  if (pending.length === 0) return;

  await Promise.allSettled(
    pending.map(
      (img) =>
        new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
          // Safety timeout: 3.5s per image
          setTimeout(resolve, 3500);
        })
    )
  );
}

/**
 * Converts a possibly cross-origin image URL to a base64 data URL.
 * Falls back to the original URL if conversion fails.
 */
async function toDataUrl(url: string): Promise<string> {
  if (!url || url.startsWith("data:")) return url;
  try {
    const res = await fetch(url, { mode: "cors", cache: "force-cache" });
    if (!res.ok) return url;
    const blob = await res.blob();
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(url);
      reader.readAsDataURL(blob);
    });
  } catch {
    return url;
  }
}

/**
 * Pre-fetches all image sources inside a container as data URLs
 * and temporarily replaces src attributes so html2canvas can render them without CORS tainting.
 */
async function inlineImages(el: HTMLElement): Promise<() => void> {
  const imgs = Array.from(el.querySelectorAll("img")) as HTMLImageElement[];
  const originals: Array<{ img: HTMLImageElement; src: string }> = [];

  await Promise.allSettled(
    imgs.map(async (img) => {
      const original = img.src;
      if (!original || original.startsWith("data:")) return;
      const dataUrl = await toDataUrl(original);
      if (dataUrl && dataUrl !== original) {
        originals.push({ img, src: original });
        img.src = dataUrl;
      }
    })
  );

  // Return a restore function
  return () => {
    for (const { img, src } of originals) {
      img.src = src;
    }
  };
}

export async function exportGridToPdf({
  containerEl,
  fileName = "urun-katalogu",
  title = "20:45 HORECA ÜRÜN KATALOĞU",
  subtitle,
  cols = 3,
  gap = 4,
  margin = 10,
  onProgress,
}: PdfGridExportOptions): Promise<void> {
  onProgress?.(5, "Modüller hazırlanıyor...");

  // Dynamic imports to keep initial bundle lean (html2canvas-pro supports modern lab/oklch colors)
  const [html2canvasModule, jsPdfModule] = await Promise.all([
    import("html2canvas-pro"),
    import("jspdf"),
  ]);
  const html2canvas = html2canvasModule.default;
  const jsPDF = jsPdfModule.default;

  // Collect direct child card elements (or cards matching .product-card)
  let cards = Array.from(
    containerEl.querySelectorAll<HTMLElement>(".product-card")
  );
  if (cards.length === 0) {
    cards = Array.from(containerEl.children) as HTMLElement[];
  }

  if (cards.length === 0) {
    throw new Error("Dışa aktarılacak ürün kartı bulunamadı.");
  }

  onProgress?.(10, "Ürün görselleri yükleniyor...");
  await waitForImages(containerEl);

  onProgress?.(18, "Görseller optimize ediliyor...");
  const restoreImages = await inlineImages(containerEl);

  // A4 dimensions in mm (Portrait)
  const PAGE_W = 210;
  const PAGE_H = 297;
  const headerH = 14;
  const footerH = 10;
  const topMargin = margin + headerH;
  const bottomMargin = margin + footerH;
  const usableW = PAGE_W - margin * 2;

  // Card width in mm
  const cardW = (usableW - gap * (cols - 1)) / cols;

  const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });

  const totalCards = cards.length;
  let pageNumber = 1;
  let cursorY = topMargin;
  let cursorX = margin;
  let colIdx = 0;
  let rowMaxH = 0;

  // Draw Header function
  const drawHeader = (pageNum: number) => {
    pdf.setFillColor(250, 250, 250);
    pdf.rect(0, 0, PAGE_W, topMargin - 2, "F");

    // Brand / Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(20, 20, 20);
    pdf.text(title, margin, margin + 4);

    // Subtitle / Date
    const dateText = subtitle || new Date().toLocaleDateString("tr-TR");
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(120, 120, 120);
    pdf.text(dateText, PAGE_W - margin, margin + 4, { align: "right" });

    // Header divider line
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.3);
    pdf.line(margin, margin + 8, PAGE_W - margin, margin + 8);
  };

  // Draw Footer function
  const drawFooter = (pageNum: number) => {
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.3);
    pdf.line(margin, PAGE_H - margin - 2, PAGE_W - margin, PAGE_H - margin - 2);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.5);
    pdf.setTextColor(140, 140, 140);
    pdf.text("20:45 HORECA · www.2045horeca.com", margin, PAGE_H - margin + 3);
    pdf.text(`Sayfa ${pageNum}`, PAGE_W - margin, PAGE_H - margin + 3, {
      align: "right",
    });
  };

  // Initialize first page header
  drawHeader(pageNumber);

  try {
    for (let i = 0; i < totalCards; i++) {
      const card = cards[i];

      onProgress?.(
        20 + Math.round((i / totalCards) * 72),
        `Kart ${i + 1} / ${totalCards} işleniyor...`
      );

      // Capture individual card
      const canvas = await html2canvas(card, {
        scale: 1.8,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        ignoreElements: (element) => {
          return (
            element.classList?.contains("pdf-exclude") ||
            element.getAttribute("data-pdf-ignore") === "true"
          );
        },
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.9);
      const aspectRatio = canvas.height / canvas.width;
      const cardH = cardW * aspectRatio;

      // If starting a new row, check if it fits in current page
      if (colIdx === 0) {
        if (cursorY + cardH > PAGE_H - bottomMargin) {
          drawFooter(pageNumber);
          pdf.addPage();
          pageNumber++;
          drawHeader(pageNumber);
          cursorY = topMargin;
          cursorX = margin;
          rowMaxH = 0;
        }
      }

      // Place card onto PDF
      pdf.addImage(
        imgData,
        "JPEG",
        cursorX,
        cursorY,
        cardW,
        cardH,
        undefined,
        "FAST"
      );

      rowMaxH = Math.max(rowMaxH, cardH);
      colIdx++;
      cursorX += cardW + gap;

      // End of row
      if (colIdx >= cols) {
        cursorY += rowMaxH + gap;
        cursorX = margin;
        colIdx = 0;
        rowMaxH = 0;
      }
    }

    // Finalize footer on the last page
    drawFooter(pageNumber);

    onProgress?.(96, "PDF dosyası oluşturuluyor...");
    pdf.save(`${fileName.replace(/\.[^/.]+$/, "")}-katalog.pdf`);
    onProgress?.(100, "Tamamlandı!");
  } finally {
    // Restore original image sources
    restoreImages();
  }
}
