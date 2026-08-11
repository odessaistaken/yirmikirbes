import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | 20:45 Pastacılık — YKB Gıda",
    default: "20:45 Pastacılık — YKB Gıda | Premium Toptan Pastacılık Tedarikçisi",
  },
  description:
    "YKB Gıda bünyesindeki 20:45 Pastacılık; profesyonel pastacılık ve fırıncılık endüstrisine yönelik premium hammadde ve yarı mamul ürünler sunar. İletişim: ykbgida@gmail.com - 0501 073 71 13",
  keywords: [
    "20:45 Pastacılık",
    "YKB GIDA",
    "pastacılık toptan",
    "profesyonel pastacılık malzemeleri",
    "waffle malzemeleri",
    "meyve püresi toptan",
    "şurup toptan",
    "donuk pasta",
    "B2B pastacılık",
  ],
  authors: [{ name: "20:45 Pastacılık - YKB Gıda" }],
  creator: "YKB GIDA",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://2045pastaci.com",
    siteName: "20:45 Pastacılık - YKB Gıda",
    title: "20:45 Pastacılık — YKB Gıda | Premium Toptan Pastacılık Tedarikçisi",
    description:
      "YKB Gıda - 20:45 Pastacılık: Profesyonel pastacılık ve fırıncılık endüstrisine yönelik premium hammadde ve yarı mamul ürünler.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans bg-cream text-charcoal antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1C1C1E",
                color: "#FAFAF7",
                borderRadius: "12px",
                fontSize: "14px",
                border: "1px solid #3D3D3D",
              },
              success: {
                iconTheme: { primary: "#C9A84C", secondary: "#1C1C1E" },
              },
            }}
          />
          <Header />
          <main className="flex-1 pt-18 overflow-x-hidden">{children}</main>
          <Footer />
          <WhatsAppButton />
        </AuthProvider>
      </body>
    </html>
  );
}

