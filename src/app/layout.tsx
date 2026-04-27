import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ParticleField } from "@/components/particle-field";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050508",
};

export const metadata: Metadata = {
  title: "MSAN - Downloads | Jogos, Softwares e Muito Mais",
  description:
    "Baixe jogos, softwares e utilitários de graça. O melhor site de downloads com links verificados e atualizados.",
  keywords: [
    "downloads",
    "jogos",
    "softwares",
    "grátis",
    "free",
    "games",
    "apps",
  ],
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} font-[family-name:var(--font-geist-sans)] antialiased noise-overlay`}
      >
        <div className="relative min-h-screen flex flex-col">
          <ParticleField />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
