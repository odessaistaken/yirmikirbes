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
  /** 0-indexed Excel "satır_sütun" koordinatı -> Base64 Data URI */
  imagesByCell: Record<string, string>;
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
  quality = 0.82
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
      if (width <= maxWidth && height <= maxHeight && base64Str.length < 40000) {
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
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(base64Str);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const compressed = canvas.toDataURL("image/jpeg", quality);
      resolve(compressed);
    };
    img.onerror = () => resolve(base64Str);
    img.src = base64Str;
  });
}

/**
 * Bir .xlsx dosyasından (ArrayBuffer) tüm gömülü resimleri ve satır/hücre eşleşmelerini çıkarır.
 * @param fileBuffer Excel dosyasının ArrayBuffer'ı
 * @param targetSheetName İsteğe bağlı hedef sayfa adı (varsa sadece o sayfanın çizimleri eşlenir)
 */
export async function extractExcelEmbeddedImages(
  fileBuffer: ArrayBuffer,
  targetSheetName?: string
): Promise<ExtractedExcelImages> {
  const imagesByRow: Record<number, string> = {};
  const imagesByCell: Record<string, string> = {};
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

    // 3. Eğer targetSheetName belirtilmişse bu sayfanın çizim dosyasını tespit et
    let targetDrawingPath: string | null = null;
    if (targetSheetName) {
      const wbXml = await zip.file("xl/workbook.xml")?.async("string");
      const wbRelsXml = await zip.file("xl/_rels/workbook.xml.rels")?.async("string");

      if (wbXml && wbRelsXml) {
        // Sheet name regex to find r:id
        const sheetRegex = new RegExp(
          `<sheet[^>]+name=["']${targetSheetName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]+r:id=["']([^"']+)["']`,
          "i"
        );
        const sheetMatch = wbXml.match(sheetRegex);
        if (sheetMatch) {
          const rId = sheetMatch[1];
          const relRegex = new RegExp(
            `<Relationship[^>]+Id=["']${rId}["'][^>]+Target=["']([^"']+)["']`,
            "i"
          );
          const relMatch = wbRelsXml.match(relRegex);
          if (relMatch) {
            let sheetPath = relMatch[1];
            if (!sheetPath.startsWith("xl/")) {
              sheetPath = "xl/" + sheetPath.replace(/^\//, "");
            }
            const sheetRelsPath = sheetPath.replace(
              /worksheets\/(sheet\d+\.xml)$/i,
              "worksheets/_rels/$1.rels"
            );
            const sheetRelsText = await zip.file(sheetRelsPath)?.async("string");
            if (sheetRelsText) {
              const drawMatch = sheetRelsText.match(
                /Target=["'](\.\.\/drawings\/drawing\d+\.xml)["']/i
              );
              if (drawMatch) {
                targetDrawingPath = "xl/drawings/" + drawMatch[1].split("/").pop();
              }
            }
          }
        }
      }
    }

    // 4. Drawing XML dosyalarından anchor'ları parse et
    for (const [drawingPath, rels] of Object.entries(relsByDrawing)) {
      // Eğer hedef sayfa çizimi biliniyorsa diğer sayfaların çizimlerini bu sayfaya karıştırma
      if (targetDrawingPath && drawingPath !== targetDrawingPath) {
        continue;
      }

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
        const colMatch = anchorContent.match(
          /<xdr:from>[\s\S]*?<xdr:col>(\d+)<\/xdr:col>/i
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
            if (colMatch) {
              const excelCol = parseInt(colMatch[1], 10);
              imagesByCell[`${excelRow}_${excelCol}`] = imageUri;
            }
          }
        }
      }
    }

    // 5. Excel 365 "Hücre İçine Yerleştir" (cellimages.xml) kontrolü
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

        const picRegex =
          /<etc:cellImage[^>]*>[\s\S]*?<a:blip[^>]+r:embed=["']([^"']+)["'][\s\S]*?<\/etc:cellImage>/gi;
        let pm: RegExpExecArray | null;
        let idx = 0;
        while ((pm = picRegex.exec(ciXmlText)) !== null) {
          const rId = pm[1];
          const mediaPath = ciRels[rId];
          if (mediaPath && mediaCache[mediaPath]) {
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
    imagesByCell,
    allMedia,
  };
}
