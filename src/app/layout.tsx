import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0f0d",
};

export const metadata: Metadata = {
  title: "LinuxZeiro - Seu guia de apps para Linux",
  description:
    "Encontre os melhores aplicativos para sua distribuição Linux. Comandos prontos para copiar, observações e dicas.",
  keywords: [
    "linux",
    "apps",
    "install",
    "flatpak",
    "snap",
    "apt",
    "pacman",
    "guia",
    "aplicativos",
    "software",
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
        className={`${geistSans.variable} font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        {/* Ambient gradient orbs */}
        <div className="ambient-orb animate-orb-1 w-[500px] h-[500px] top-[-100px] left-[-100px] bg-green-600/15 opacity-60" />
        <div className="ambient-orb animate-orb-2 w-[600px] h-[600px] top-[40%] right-[-150px] bg-emerald-500/10 opacity-50" />
        <div className="ambient-orb animate-orb-3 w-[400px] h-[400px] bottom-[-50px] left-[30%] bg-lime-500/8 opacity-40" />

        {/* Grid background */}
        <div className="fixed inset-0 grid-bg pointer-events-none z-0" />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
