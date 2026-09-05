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
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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
      <body className="font-sans bg-[#FFFFFF] text-[#1E293B] antialiased min-h-screen flex flex-col selection:bg-gold/30 selection:text-slate-900">
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#FFFFFF",
                color: "#0F172A",
                borderRadius: "12px",
                fontSize: "14px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              },
              success: {
                iconTheme: { primary: "#D4AF37", secondary: "#FFFFFF" },
              },
            }}
          />
          <Header />
          <main className="flex-1 pt-20 sm:pt-22 overflow-x-hidden">{children}</main>
          <Footer />
          <WhatsAppButton />
        </AuthProvider>
      </body>
    </html>
  );
}

