import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { CategoryProductGroup } from "@/lib/presentation-catalog-service";

/* ─── Türkçe Karakter Destekli Font Kaydı ─────────────────────────────────── */
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: 300,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 700,
    },
  ],
});

/* ─── Vektörel PDF Stil Tanımları ─────────────────────────────────────────── */
const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 48,
    paddingHorizontal: 36,
    fontFamily: "Roboto",
    backgroundColor: "#FAF9F6",
    fontSize: 9,
    color: "#1E293B",
  },
  // Kapak & Üst Banner
  coverHeader: {
    borderBottomWidth: 2,
    borderBottomColor: "#B89327",
    paddingBottom: 14,
    marginBottom: 16,
  },
  brandTag: {
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 2,
    color: "#B89327",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0F172A",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 9,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 1.3,
  },
  metaBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0F172A",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  metaText: {
    color: "#E2E8F0",
    fontSize: 8,
    fontWeight: 500,
  },
  metaHighlight: {
    color: "#F2D98A",
    fontSize: 8,
    fontWeight: 700,
  },

  // Kategori Bölümü
  categorySection: {
    marginTop: 12,
    marginBottom: 8,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
    paddingBottom: 4,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#0F172A",
  },
  categoryCount: {
    fontSize: 8,
    color: "#64748B",
  },
  categoryDesc: {
    fontSize: 8,
    color: "#64748B",
    marginBottom: 8,
    lineHeight: 1.3,
  },

  // Ürün Izgarası (2 Kolon)
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48.5%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 6,
    padding: 9,
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  productName: {
    fontSize: 9.5,
    fontWeight: 700,
    color: "#0F172A",
    flex: 1,
    marginRight: 6,
    lineHeight: 1.25,
  },
  priceBadge: {
    fontSize: 9.5,
    fontWeight: 700,
    color: "#B89327",
  },
  productDesc: {
    fontSize: 7.8,
    color: "#475569",
    lineHeight: 1.35,
    marginTop: 3,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#F1F5F9",
    paddingTop: 4,
    marginTop: 5,
  },
  badgeText: {
    fontSize: 6.5,
    fontWeight: 700,
    color: "#B89327",
    textTransform: "uppercase",
  },
  codeText: {
    fontSize: 6.5,
    color: "#94A3B8",
  },

  // Sayfa Numarası & Alt Bilgi
  footer: {
    position: "absolute",
    bottom: 20,
    left: 36,
    right: 36,
    borderTopWidth: 0.5,
    borderTopColor: "#CBD5E1",
    paddingTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 7,
    color: "#94A3B8",
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

  return (
    <Document
      title="Yirmikirbes Özel Müşteri Sunum Kataloğu"
      author="Yirmikirbes Gıda"
      subject="Profesyonel Barista ve Pastacılık Ürün Seçkisi"
      keywords="katalog, barista, suruplar, pureler, waffle, horeca"
    >
      <Page size="A4" style={styles.page}>
        {/* ── Kapak Başlık Alanı ── */}
        <View style={styles.coverHeader}>
          <Text style={styles.brandTag}>YİRMİKİRBES • HORECA PASTACILIK & GIDA</Text>
          <Text style={styles.mainTitle}>ÖZEL MÜŞTERİ SUNUM KATALOĞU</Text>
          <Text style={styles.subtitle}>
            İşletmeniz için özel olarak derlenmiş; barista şurupları, meyve püreleri, waffle çikolataları ve gurme tatlar.
          </Text>

          <View style={styles.metaBar}>
            <Text style={styles.metaText}>Toplam {categoryGroups.length} Kategori • {totalProducts} Ürün</Text>
            <Text style={styles.metaText}>Tarih: {dateStr}</Text>
            <Text style={styles.metaHighlight}>B2B Özel Fiyatlandırma</Text>
          </View>
        </View>

        {/* ── Kategori Bölümleri ve Ürünler ── */}
        {categoryGroups.map((group, groupIdx) => (
          <View key={group.category.id || groupIdx} style={styles.categorySection} wrap={false}>
            {/* Kategori Başlığı */}
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>
                {String(groupIdx + 1).padStart(2, "0")} • {group.category.name}
              </Text>
              <Text style={styles.categoryCount}>{group.products.length} Çeşit Ürün</Text>
            </View>

            {group.category.description && (
              <Text style={styles.categoryDesc}>{group.category.description}</Text>
            )}

            {/* Ürün Kartları */}
            <View style={styles.productsGrid}>
              {group.products.map((p, pIdx) => (
                <View key={p.id || pIdx} style={styles.productCard}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.productName}>{p.name}</Text>
                    <Text style={styles.priceBadge}>
                      {p.price > 0 ? `₺${p.price.toFixed(2)}` : "Özel Teklif"}
                    </Text>
                  </View>

                  <Text style={styles.productDesc}>{p.description}</Text>

                  <View style={styles.cardFooter}>
                    <Text style={styles.badgeText}>{p.badge || group.category.name}</Text>
                    <Text style={styles.codeText}>{p.code || `№ ${String(pIdx + 1).padStart(2, "0")}`}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* ── Sayfa Numarası ve Alt Bilgi ── */}
        <View
          style={styles.footer}
          fixed
        >
          <Text>Yirmikirbes Gıda San. Tic. Ltd. Şti. • www.yirmikirbes.com • 0532 454 64 40</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Sayfa ${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
