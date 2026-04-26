import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Battle — Quiz de Programação | msan.com",
  description: "Teste seus conhecimentos em programação! Quiz interativo com JavaScript, Python, React, CSS e mais. Ganhe XP, suba de nível e dispute o ranking!",
  keywords: ["quiz", "programação", "code battle", "javascript", "python", "react", "developer", "msan"],
  authors: [{ name: "msan.com" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Code Battle — Quiz de Programação",
    description: "Teste seus conhecimentos em programação e dispute o ranking!",
    siteName: "msan.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
