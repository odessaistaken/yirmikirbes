import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { CategoryProductGroup } from "@/lib/presentation-catalog-service";

/* ─── Türkçe Karakter Destekli Yerel Font Kaydı ───────────────────────────── */
const origin = typeof window !== "undefined" ? window.location.origin : "";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: origin
        ? `${origin}/fonts/Roboto-Regular.ttf`
        : "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: origin
        ? `${origin}/fonts/Roboto-Bold.ttf`
        : "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 700,
    },
  ],
});

/* ─── Dizi Parçalama Yardımcısı (2 Kolonlu Satırlar İçin) ─────────────────── */
function chunkArray<T>(arr: T[], size = 2): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/* ─── Vektörel Dergi & Baskı Mizanpaj Stilleri ────────────────────────────── */
const styles = StyleSheet.create({
  // ── 1. Kapak Sayfası Stilleri ──
  coverPage: {
    backgroundColor: "#0B101D",
    padding: 32,
    fontFamily: "Roboto",
    color: "#F8FAFC",
  },
  coverBorder: {
    borderWidth: 1.5,
    borderColor: "#B89327",
    padding: 26,
    flex: 1, // 'height: 100%' yerine flex: 1 Yoga çökmesini önler
    justifyContent: "space-between",
  },
  coverTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.8,
    borderBottomColor: "#334155",
    paddingBottom: 10,
  },
  coverBrandText: {
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 2,
    color: "#E2E8F0",
    textTransform: "uppercase",
  },
  coverEditionBadge: {
    fontSize: 7.5,
    fontWeight: 700,
    letterSpacing: 1.2,
    color: "#F2D98A",
    textTransform: "uppercase",
  },
  coverCenterBlock: {
    paddingVertical: 32,
  },
  coverGoldTag: {
    fontSize: 8.5,
    fontWeight: 700,
    letterSpacing: 2.5,
    color: "#F2D98A",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  coverMainTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: "#FFFFFF",
    letterSpacing: -0.5,
    lineHeight: 1.2,
    marginBottom: 12,
  },
  coverSubtitle: {
    fontSize: 9.5,
    fontWeight: 400,
    color: "#94A3B8",
    lineHeight: 1.5,
    maxWidth: 420,
    marginBottom: 20,
  },
  coverAccentLine: {
    width: 50,
    height: 3,
    backgroundColor: "#B89327",
    marginBottom: 20,
  },
  coverStatsBar: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 0.8,
    borderColor: "rgba(242, 217, 138, 0.25)",
    borderRadius: 6,
    padding: 10,
  },
  coverStatItem: {
    flex: 1,
    paddingHorizontal: 6,
  },
  coverStatNumber: {
    fontSize: 12,
    fontWeight: 700,
    color: "#F2D98A",
    marginBottom: 2,
  },
  coverStatLabel: {
    fontSize: 7,
    fontWeight: 400,
    color: "#94A3B8",
    textTransform: "uppercase",
  },
  coverFooter: {
    borderTopWidth: 0.8,
    borderTopColor: "#334155",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coverFooterText: {
    fontSize: 7.2,
    fontWeight: 400,
    color: "#64748B",
  },
  coverFooterHighlight: {
    fontSize: 7.2,
    color: "#F2D98A",
    fontWeight: 700,
  },

  // ── 2. İçindekiler Sayfası Stilleri ──
  tocPage: {
    backgroundColor: "#FAF9F6",
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 32,
    fontFamily: "Roboto",
    color: "#0F172A",
  },
  tocHeader: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#B89327",
    paddingBottom: 8,
    marginBottom: 14,
  },
  tocTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0F172A",
    letterSpacing: -0.3,
  },
  tocSubtitle: {
    fontSize: 8,
    fontWeight: 400,
    color: "#64748B",
    marginTop: 3,
  },
  tocLetterBox: {
    backgroundColor: "#FFFFFF",
    borderWidth: 0.8,
    borderColor: "#E2E8F0",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  tocLetterHeading: {
    fontSize: 9.5,
    fontWeight: 700,
    color: "#0F172A",
    marginBottom: 3,
  },
  tocLetterBody: {
    fontSize: 7.5,
    fontWeight: 400,
    color: "#475569",
    lineHeight: 1.4,
  },
  tocRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  tocCard: {
    width: "48.8%",
    backgroundColor: "#FFFFFF",
    borderWidth: 0.8,
    borderColor: "#E2E8F0",
    borderRadius: 6,
    padding: 8,
  },
  tocCardPlaceholder: {
    width: "48.8%",
    opacity: 0,
  },
  tocCardIndex: {
    fontSize: 7,
    fontWeight: 700,
    color: "#B89327",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  tocCardTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: "#0F172A",
    marginBottom: 2,
  },
  tocCardDesc: {
    fontSize: 6.8,
    fontWeight: 400,
    color: "#64748B",
    lineHeight: 1.25,
    marginBottom: 4,
  },
  tocCardCount: {
    fontSize: 6.5,
    fontWeight: 700,
    color: "#475569",
  },

  // ── 3. Ürün Sayfaları Stilleri ──
  contentPage: {
    backgroundColor: "#FAF9F6",
    paddingTop: 38,
    paddingBottom: 42,
    paddingHorizontal: 30,
    fontFamily: "Roboto",
    color: "#0F172A",
  },
  runningHeader: {
    position: "absolute",
    top: 14,
    left: 30,
    right: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.6,
    borderBottomColor: "#CBD5E1",
    paddingBottom: 4,
  },
  runningHeaderText: {
    fontSize: 6.8,
    fontWeight: 700,
    color: "#64748B",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  runningHeaderTag: {
    fontSize: 6.8,
    fontWeight: 700,
    color: "#B89327",
  },
  runningFooter: {
    position: "absolute",
    bottom: 14,
    left: 30,
    right: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.6,
    borderTopColor: "#CBD5E1",
    paddingTop: 4,
  },
  runningFooterText: {
    fontSize: 6.8,
    fontWeight: 400,
    color: "#94A3B8",
  },

  // Kategori Başlık Şeridi
  categorySectionHeader: {
    backgroundColor: "#FFFFFF",
    borderWidth: 0.8,
    borderColor: "#E2E8F0",
    borderLeftWidth: 3,
    borderLeftColor: "#B89327",
    borderRadius: 6,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 8,
    marginTop: 6,
  },
  categorySectionBadge: {
    fontSize: 6.5,
    fontWeight: 700,
    color: "#B89327",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 1,
  },
  categorySectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#0F172A",
    letterSpacing: -0.2,
  },
  categorySectionDesc: {
    fontSize: 7,
    fontWeight: 400,
    color: "#64748B",
    marginTop: 2,
    lineHeight: 1.25,
  },

  // Ürün Satırları (flexWrap: wrap yerine satır bazlı mizanpaj)
  productsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  productCard: {
    width: "48.8%",
    backgroundColor: "#FFFFFF",
    borderWidth: 0.8,
    borderColor: "#E2E8F0",
    borderRadius: 6,
    padding: 7,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 82,
  },
  productCardPlaceholder: {
    width: "48.8%",
    opacity: 0,
  },
  productImageContainer: {
    width: 64,
    height: 64,
    backgroundColor: "#F8FAFC",
    borderWidth: 0.6,
    borderColor: "#E2E8F0",
    borderRadius: 4,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  productImageFallback: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    padding: 2,
  },
  productFallbackBrand: {
    fontSize: 6,
    fontWeight: 700,
    color: "#B89327",
    textAlign: "center",
    marginBottom: 1,
  },
  productFallbackCategory: {
    fontSize: 5.5,
    fontWeight: 400,
    color: "#94A3B8",
    textAlign: "center",
  },
  productContent: {
    flex: 1,
    paddingLeft: 7,
    justifyContent: "space-between",
  },
  productMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  productCode: {
    fontSize: 6,
    color: "#64748B",
    fontWeight: 400,
  },
  productPrice: {
    fontSize: 8,
    fontWeight: 700,
    color: "#B89327",
  },
  productName: {
    fontSize: 8,
    fontWeight: 700,
    color: "#0F172A",
    lineHeight: 1.2,
    marginBottom: 2,
  },
  productDesc: {
    fontSize: 6.5,
    fontWeight: 400,
    color: "#475569",
    lineHeight: 1.25,
  },
  productFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 3,
    paddingTop: 2.5,
    borderTopWidth: 0.4,
    borderTopColor: "#F1F5F9",
  },
  productBadge: {
    fontSize: 5.8,
    fontWeight: 700,
    color: "#B89327",
    textTransform: "uppercase",
  },
  productTag: {
    fontSize: 5.8,
    fontWeight: 400,
    color: "#94A3B8",
  },

  // ── 4. Arka Kapak Sayfası Stilleri ──
  backCoverPage: {
    backgroundColor: "#0B101D",
    padding: 32,
    fontFamily: "Roboto",
    color: "#F8FAFC",
  },
  backCoverBorder: {
    borderWidth: 1.5,
    borderColor: "#B89327",
    padding: 26,
    flex: 1, // Yoga taşmasını önlemek için flex: 1
    justifyContent: "space-between",
  },
  backCoverTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#FFFFFF",
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  backCoverSubtitle: {
    fontSize: 9,
    fontWeight: 400,
    color: "#94A3B8",
    lineHeight: 1.5,
    maxWidth: 420,
    marginBottom: 20,
  },
  backCoverColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  backCoverCol: {
    width: "31%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 0.6,
    borderColor: "rgba(242, 217, 138, 0.2)",
    borderRadius: 6,
    padding: 10,
  },
  backCoverColTitle: {
    fontSize: 8,
    fontWeight: 700,
    color: "#F2D98A",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 5,
  },
  backCoverColText: {
    fontSize: 6.8,
    fontWeight: 400,
    color: "#CBD5E1",
    lineHeight: 1.4,
  },
  backCoverLegal: {
    borderTopWidth: 0.8,
    borderTopColor: "#334155",
    paddingTop: 10,
  },
  backCoverLegalText: {
    fontSize: 6.5,
    fontWeight: 400,
    color: "#64748B",
    lineHeight: 1.35,
  },
});

interface PresentationPDFDocumentProps {
  categoryGroups: CategoryProductGroup[];
  dateStr?: string;
}

export default function PresentationPDFDocument({
  categoryGroups,
  dateStr = new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
}: PresentationPDFDocumentProps) {
  const totalProducts = categoryGroups.reduce((acc, g) => acc + g.products.length, 0);
  const tocRows = chunkArray(categoryGroups, 2);

  return (
    <Document
      title="Yirmikirbes Özel Müşteri Sunum Kataloğu"
      author="Yirmikirbes Gıda San. Tic. Ltd. Şti."
      subject="Profesyonel Barista Şurupları, Gurme Meyve Püreleri, Waffle Çikolataları ve Donuk Pastacılık"
      keywords="katalog, barista, horeca, gurme, suruplar, pureler, waffle, pastacilik"
    >
      {/* ── 1. ÖN KAPAK SAYFASI ── */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.coverBorder}>
          <View style={styles.coverTopBar}>
            <Text style={styles.coverBrandText}>YİRMİKİRBES • GURME HORECA GIDA SANAYİ</Text>
            <Text style={styles.coverEditionBadge}>EDİSYON 2026 • ÖZEL SEÇKİ</Text>
          </View>

          <View style={styles.coverCenterBlock}>
            <Text style={styles.coverGoldTag}>PROFESYONEL BARİSTA & PASTACILIK ÇÖZÜMLERİ</Text>
            <Text style={styles.coverMainTitle}>
              ÖZEL MÜŞTERİ{"\n"}SUNUM KATALOĞU
            </Text>
            <View style={styles.coverAccentLine} />
            <Text style={styles.coverSubtitle}>
              İşletmenizin menüsüne prestij katacak; barista şurupları, doğal meyve püreleri,
              waffle çikolataları ve donuk butik pastalardan oluşan seçkin koleksiyonumuz.
            </Text>

            <View style={styles.coverStatsBar}>
              <View style={styles.coverStatItem}>
                <Text style={styles.coverStatNumber}>{categoryGroups.length} Koleksiyon</Text>
                <Text style={styles.coverStatLabel}>Kategori</Text>
              </View>
              <View style={styles.coverStatItem}>
                <Text style={styles.coverStatNumber}>{totalProducts} Seçkin Ürün</Text>
                <Text style={styles.coverStatLabel}>Gurme Lezzet</Text>
              </View>
              <View style={styles.coverStatItem}>
                <Text style={styles.coverStatNumber}>B2B Özel</Text>
                <Text style={styles.coverStatLabel}>Toptan Fiyat</Text>
              </View>
            </View>
          </View>

          <View style={styles.coverFooter}>
            <Text style={styles.coverFooterText}>
              Yirmikirbes Gıda San. Tic. Ltd. Şti. • www.yirmikirbes.com
            </Text>
            <Text style={styles.coverFooterHighlight}>Tarih: {dateStr}</Text>
          </View>
        </View>
      </Page>

      {/* ── 2. İÇİNDEKİLER VE MANİFESTO SAYFASI ── */}
      <Page size="A4" style={styles.tocPage}>
        <View style={styles.tocHeader}>
          <Text style={styles.tocTitle}>İÇİNDEKİLER & KOLEKSİYON REHBERİ</Text>
          <Text style={styles.tocSubtitle}>
            Katalog genelinde yer alan ürün kategorileri ve sunulan çözümler
          </Text>
        </View>

        <View style={styles.tocLetterBox}>
          <Text style={styles.tocLetterHeading}>Gastronomi ve Kahve Barınız İçin Zanaatkar Standartlar</Text>
          <Text style={styles.tocLetterBody}>
            Yirmikirbes olarak; DaVinci Gourmet, Caffè NONNO, CALLEI ve EASY MIX gibi sektörün lider
            markalarını en taze ve profesyonel reçetelerle bir araya getiriyoruz. Kafeterya, otel ve pastane
            operasyonlarınızda istikrarlı lezzet ve yüksek kârlılık sağlamak adına özenle seçilmiş ürün
            portföyümüzü beğeninize sunarız.
          </Text>
        </View>

        {/* 2 Kolonlu Satır Bazlı Fihrist */}
        {tocRows.map((row, rIdx) => (
          <View key={rIdx} style={styles.tocRow} wrap={false}>
            {row.map((group, gIdx) => {
              const globalIdx = rIdx * 2 + gIdx;
              return (
                <View key={group.category.id || gIdx} style={styles.tocCard}>
                  <Text style={styles.tocCardIndex}>
                    BÖLÜM {String(globalIdx + 1).padStart(2, "0")}
                  </Text>
                  <Text style={styles.tocCardTitle}>{group.category.name}</Text>
                  {group.category.description ? (
                    <Text style={styles.tocCardDesc}>{group.category.description}</Text>
                  ) : null}
                  <Text style={styles.tocCardCount}>{group.products.length} Çeşit Ürün</Text>
                </View>
              );
            })}
            {row.length === 1 && <View style={styles.tocCardPlaceholder} />}
          </View>
        ))}

        <View style={styles.runningFooter} fixed>
          <Text style={styles.runningFooterText}>
            Yirmikirbes Gıda San. Tic. Ltd. Şti. • 0532 454 64 40 • info@yirmikirbes.com
          </Text>
          <Text
            style={styles.runningFooterText}
            render={({ pageNumber, totalPages }) => `Sayfa ${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>

      {/* ── 3. BÖLÜM VE ÜRÜN SAYFALARI (Satır Bazlı 2 Kolonlu Mizanpaj) ── */}
      <Page size="A4" style={styles.contentPage}>
        <View style={styles.runningHeader} fixed>
          <Text style={styles.runningHeaderText}>YİRMİKİRBES • ÖZEL MÜŞTERİ SUNUM KATALOĞU</Text>
          <Text style={styles.runningHeaderTag}>PROFESYONEL HORECA ÇÖZÜMLERİ</Text>
        </View>

        {categoryGroups.map((group, gIdx) => {
          const productRows = chunkArray(group.products, 2);

          return (
            <View key={group.category.id || gIdx}>
              {/* Kategori Başlık Kartı */}
              <View style={styles.categorySectionHeader} wrap={false}>
                <Text style={styles.categorySectionBadge}>
                  KOLEKSİYON {String(gIdx + 1).padStart(2, "0")} • {group.products.length} ÇEŞİT ÜRÜN
                </Text>
                <Text style={styles.categorySectionTitle}>{group.category.name}</Text>
                {group.category.description ? (
                  <Text style={styles.categorySectionDesc}>{group.category.description}</Text>
                ) : null}
              </View>

              {/* Satır Bazlı Ürün Kartları (Yoga çökmesini önleyen 2'li satırlar) */}
              {productRows.map((row, rowIdx) => (
                <View key={rowIdx} style={styles.productsRow} wrap={false}>
                  {row.map((product, pIdx) => {
                    const hasValidImage = product.imageUrl && product.imageUrl.trim().length > 0;
                    const itemGlobalIdx = rowIdx * 2 + pIdx;

                    return (
                      <View key={product.id || pIdx} style={styles.productCard}>
                        {/* Ürün Görseli Kutusu */}
                        <View style={styles.productImageContainer}>
                          {hasValidImage ? (
                            <Image
                              src={product.imageUrl}
                              style={styles.productImage}
                            />
                          ) : (
                            <View style={styles.productImageFallback}>
                              <Text style={styles.productFallbackBrand}>YİRMİKİRBES</Text>
                              <Text style={styles.productFallbackCategory}>
                                {product.badge || group.category.name}
                              </Text>
                            </View>
                          )}
                        </View>

                        {/* Ürün Açıklama ve Detay Alanı */}
                        <View style={styles.productContent}>
                          <View>
                            <View style={styles.productMetaRow}>
                              <Text style={styles.productCode}>
                                {product.code || `№ ${String(itemGlobalIdx + 1).padStart(2, "0")}`}
                              </Text>
                              <Text style={styles.productPrice}>
                                {product.price > 0
                                  ? `₺${product.price.toFixed(2)}`
                                  : "Özel Teklif"}
                              </Text>
                            </View>

                            <Text style={styles.productName}>{product.name}</Text>

                            <Text style={styles.productDesc}>
                              {product.description}
                            </Text>
                          </View>

                          <View style={styles.productFooterRow}>
                            <Text style={styles.productBadge}>
                              {product.badge || group.category.name}
                            </Text>
                            <Text style={styles.productTag}>Horeca Standart</Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                  {row.length === 1 && <View style={styles.productCardPlaceholder} />}
                </View>
              ))}
            </View>
          );
        })}

        <View style={styles.runningFooter} fixed>
          <Text style={styles.runningFooterText}>
            Yirmikirbes Gıda San. Tic. Ltd. Şti. • 0532 454 64 40 • www.yirmikirbes.com
          </Text>
          <Text
            style={styles.runningFooterText}
            render={({ pageNumber, totalPages }) => `Sayfa ${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>

      {/* ── 4. ARKA KAPAK SAYFASI ── */}
      <Page size="A4" style={styles.backCoverPage}>
        <View style={styles.backCoverBorder}>
          <View>
            <View style={styles.coverTopBar}>
              <Text style={styles.coverBrandText}>YİRMİKİRBES GIDA • İŞ ORTAKLIĞI</Text>
              <Text style={styles.coverEditionBadge}>İLETİŞİM & TEDARİK</Text>
            </View>

            <View style={{ marginTop: 24 }}>
              <Text style={styles.coverGoldTag}>ÇÖZÜM ORTAĞINIZ</Text>
              <Text style={styles.backCoverTitle}>
                Gastronomi ve İçecek Sektöründe{"\n"}Güvenilir Tedarikçiniz
              </Text>
              <View style={styles.coverAccentLine} />
              <Text style={styles.backCoverSubtitle}>
                İşletmenizin ihtiyacı olan tüm barista şurupları, püreler, pasta malzemeleri ve donuk
                ürünlerde doğrudan tedarik, reçete danışmanlığı ve hızlı lojistik avantajı sağlıyoruz.
              </Text>
            </View>
          </View>

          <View style={styles.backCoverColumns}>
            <View style={styles.backCoverCol}>
              <Text style={styles.backCoverColTitle}>Toptan Sipariş</Text>
              <Text style={styles.backCoverColText}>
                Hızlı WhatsApp:{"\n"}
                +90 532 454 64 40{"\n"}
                info@yirmikirbes.com
              </Text>
            </View>

            <View style={styles.backCoverCol}>
              <Text style={styles.backCoverColTitle}>Numune & Demo</Text>
              <Text style={styles.backCoverColText}>
                Özel reçete oluşturma ve ürün numune talepleri için uzman ekibimiz daima yanınızda.
              </Text>
            </View>

            <View style={styles.backCoverCol}>
              <Text style={styles.backCoverColTitle}>Sevkiyat Ağı</Text>
              <Text style={styles.backCoverColText}>
                İstanbul içi planlı doğrudan soğuk zincir ve Türkiye geneli anlaşmalı ambar gönderimi.
              </Text>
            </View>
          </View>

          <View style={styles.backCoverLegal}>
            <Text style={styles.backCoverLegalText}>
              * Bu katalogda belirtilen ürünler ve fiyatlar toptan Horeca müşterileri için referans
              niteliğinde olup, kurumsal sözleşmelere göre revize edilebilir.{"\n"}
              © 2026 Yirmikirbes Gıda Sanayi ve Ticaret Ltd. Şti. Tüm hakları saklıdır.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
