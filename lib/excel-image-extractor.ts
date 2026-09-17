/**
 * Excel Gömülü Resim (Embedded Image) Çıkarma Servisi
 *
 * Bu modül, .xlsx (OpenXML) dosyalarının içindeki ZIP arşivini JSZip ile açarak
 * xl/drawings/ ve xl/media/ klasörlerindeki gömülü resimleri okur ve
 * bunları Excel satırlarıyla (row anchor) birebir eşleştirerek Base64 Data URI'ye çevirir.
 */

import JSZip from "jszip";

export interface ExtractedExcelImages {
  /** 0-indexed Excel satır numarası -> Base64 Data URI */
  imagesByRow: Record<number, string>;
  /** Dosyadaki tüm çıkarılan resimlerin listesi (fallback için) */
  allMedia: string[];
}

/**
 * Dosya uzantısına göre MIME türünü belirler.
 */
function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "jpeg";
  switch (ext) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    case "svg":
      return "image/svg+xml";
    case "bmp":
      return "image/bmp";
    default:
      return "image/jpeg";
  }
}

/**
 * Canvas kullanarak büyük base64 resimlerini küçük thumbnail boyutuna sıkıştırır.
 * Bu sayede Firestore 1MB limitine takılmadan onlarca resim güvenle saklanabilir.
 */
export async function resizeImageBase64(
  base64Str: string,
  maxWidth = 320,
  maxHeight = 320,
  quality = 0.8
): Promise<string> {
  // Sadece browser ortamında çalıştır
  if (typeof window === "undefined" || !base64Str.startsWith("data:image")) {
    return base64Str;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Boyut zaten küçükse sıkıştırmaya gerek yok
      if (width <= maxWidth && height <= maxHeight && base64Str.length < 50000) {
        resolve(base64Str);
        return;
      }

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(base64Str);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      // JPEG olarak sıkıştırarak boyutu %80-90 oranında küçült
      const compressed = canvas.toDataURL("image/jpeg", quality);
      resolve(compressed);
    };
    img.onerror = () => resolve(base64Str);
    img.src = base64Str;
  });
}

/**
 * Bir .xlsx dosyasından (ArrayBuffer) tüm gömülü resimleri ve satır eşleşmelerini çıkarır.
 */
export async function extractExcelEmbeddedImages(
  fileBuffer: ArrayBuffer
): Promise<ExtractedExcelImages> {
  const imagesByRow: Record<number, string> = {};
  const allMedia: string[] = [];

  try {
    const zip = await JSZip.loadAsync(fileBuffer);
    const files = Object.keys(zip.files);

    // 1. Media klasöründeki tüm resim dosyalarını Base64'e dönüştür
    const mediaFiles = files.filter((f) => f.startsWith("xl/media/"));
    const mediaCache: Record<string, string> = {};

    for (const mf of mediaFiles) {
      const fileObj = zip.file(mf);
      if (!fileObj) continue;
      const mime = getMimeType(mf);
      const base64Data = await fileObj.async("base64");
      const fullDataUri = `data:${mime};base64,${base64Data}`;
      mediaCache[mf] = fullDataUri;
      allMedia.push(fullDataUri);
    }

    // 2. xl/drawings/_rels/drawing*.xml.rels dosyalarını bul ve ilişki haritası çıkar
    const drawingRelsFiles = files.filter((f) =>
      /xl\/drawings\/_rels\/drawing\d+\.xml\.rels$/i.test(f)
    );

    const relsByDrawing: Record<string, Record<string, string>> = {};

    for (const rf of drawingRelsFiles) {
      const drawingPath = rf.replace("_rels/", "").replace(/\.rels$/i, "");
      const relsText = await zip.file(rf)?.async("string");
      if (!relsText) continue;

      const rels: Record<string, string> = {};
      const relRegex =
        /<Relationship[^>]+Id=["']([^"']+)["'][^>]+Target=["']([^"']+)["']/gi;
      let rm: RegExpExecArray | null;
      while ((rm = relRegex.exec(relsText)) !== null) {
        let target = rm[2].replace(/^\.\.\//, "xl/");
        if (!target.startsWith("xl/")) target = "xl/" + target;
        rels[rm[1]] = target;
      }
      relsByDrawing[drawingPath] = rels;
    }

    // 3. Her drawing XML dosyasından anchor'ları (<xdr:from><xdr:row>) parse et
    for (const [drawingPath, rels] of Object.entries(relsByDrawing)) {
      const drawFile = zip.file(drawingPath);
      if (!drawFile) continue;
      const drawText = await drawFile.async("string");

      const anchorRegex =
        /<xdr:(?:twoCellAnchor|oneCellAnchor)[^>]*>([\s\S]*?)<\/xdr:(?:twoCellAnchor|oneCellAnchor)>/gi;
      let am: RegExpExecArray | null;

      while ((am = anchorRegex.exec(drawText)) !== null) {
        const anchorContent = am[1];
        const rowMatch = anchorContent.match(
          /<xdr:from>[\s\S]*?<xdr:row>(\d+)<\/xdr:row>/i
        );
        const blipMatch = anchorContent.match(
          /<a:blip[^>]+r:embed=["']([^"']+)["']/i
        );

        if (rowMatch && blipMatch) {
          const excelRow = parseInt(rowMatch[1], 10);
          const rId = blipMatch[1];
          const mediaPath = rels[rId];
          const imageUri = mediaPath ? mediaCache[mediaPath] : null;

          if (imageUri) {
            imagesByRow[excelRow] = imageUri;
          }
        }
      }
    }

    // 4. Excel 365 "Hücre İçine Yerleştir" (cellimages.xml) kontrolü
    const cellImagesRels = files.find((f) =>
      /xl\/_rels\/cellimages\.xml\.rels$/i.test(f)
    );
    const cellImagesXml = files.find((f) => /xl\/cellimages\.xml$/i.test(f));

    if (cellImagesRels && cellImagesXml) {
      const ciRelsText = await zip.file(cellImagesRels)?.async("string");
      const ciXmlText = await zip.file(cellImagesXml)?.async("string");

      if (ciRelsText && ciXmlText) {
        const ciRels: Record<string, string> = {};
        const relRegex =
          /<Relationship[^>]+Id=["']([^"']+)["'][^>]+Target=["']([^"']+)["']/gi;
        let rm: RegExpExecArray | null;
        while ((rm = relRegex.exec(ciRelsText)) !== null) {
          let target = rm[2].replace(/^\.\.\//, "xl/");
          if (!target.startsWith("xl/")) target = "xl/" + target;
          ciRels[rm[1]] = target;
        }

        // Cell image anchor'ları
        const picRegex =
          /<etc:cellImage[^>]*>[\s\S]*?<a:blip[^>]+r:embed=["']([^"']+)["'][\s\S]*?<\/etc:cellImage>/gi;
        let pm: RegExpExecArray | null;
        let idx = 0;
        while ((pm = picRegex.exec(ciXmlText)) !== null) {
          const rId = pm[1];
          const mediaPath = ciRels[rId];
          if (mediaPath && mediaCache[mediaPath]) {
            // Hücre içi resim sırası
            if (!imagesByRow[idx]) {
              imagesByRow[idx] = mediaCache[mediaPath];
            }
          }
          idx++;
        }
      }
    }
  } catch (err) {
    console.warn("Excel gömülü resim çıkarma sırasında uyarı/hata:", err);
  }

  return {
    imagesByRow,
    allMedia,
  };
}
