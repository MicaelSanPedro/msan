import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
};

export const metadata: Metadata = {
  title: "MSAN Downloads — Apps para Windows e Android",
  description:
    "Downloads seguros e verificados para Windows e Android. Tudo gratuito, sempre atualizado.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
