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
  title: "NerdVault — O Refúgio dos Nerds | msan.com",
  description: "Baixe scripts, configs, cheat sheets, dotfiles, templates e tudo que um nerd precisa. Upload e compartilhe seus arquivos!",
  keywords: ["nerd", "download", "scripts", "configs", "dotfiles", "cheatsheets", "templates", "programação", "msan"],
  authors: [{ name: "msan.com" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "NerdVault — O Refúgio dos Nerds",
    description: "Baixe scripts, configs, cheat sheets e tudo que um nerd precisa!",
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
