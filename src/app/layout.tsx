import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollRevealInit } from "@/components/ScrollRevealInit";
import { BokehParticles } from "@/components/BokehParticles";
import { CyberCursor } from "@/components/CyberCursor";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeSync } from "@/components/ThemeSync";
import { getAllPosts } from "@/lib/posts";
import { SessionProvider } from "@/components/SessionProvider";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import { GlobalSignInModal } from "@/components/GlobalSignInModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08070a",
};

export const metadata: Metadata = {
  title: "TechMate — Seu parceiro em tech",
  description:
    "Tutoriais, dicas e guias sobre Linux, Windows, desenvolvimento, segurança e gaming. Conteúdo honesto e prático, sem fluff.",
  keywords: [
    "tech",
    "tecnologia",
    "tutoriais",
    "linux",
    "windows",
    "desenvolvimento",
    "programação",
    "gaming",
    "segurança",
    "hardware",
    "open source",
    "tech blog brasil",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allPosts = getAllPosts();

  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('techmate_theme');if(t==='light'){document.documentElement.classList.remove('dark');var m=document.querySelector('meta[name="theme-color"]');if(m)m.content='#f8f7f5'}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        <ThemeSync />
        <div className="site-backdrop" aria-hidden>
          {/* Grid background */}
          <div className="grid-bg" />


          {/* Noise overlay */}
          <div className="noise-overlay" />
        </div>

        <SessionProvider>
          <FavoritesProvider>
            {/* Cinematic overlays */}
            {/* Welcome screen for first-time visitors */}
            <WelcomeScreen />

            <div className="cinema-vignette" aria-hidden />
            <div className="cinema-grain" aria-hidden />
            <div className="light-leak light-leak--amber" aria-hidden />
            <div className="light-leak light-leak--rose" aria-hidden />
            <div className="light-leak light-leak--sky" aria-hidden />
            <BokehParticles />
            <CyberCursor />

            <div className="relative z-10 min-h-screen flex flex-col">
              <ScrollRevealInit />
              <Navbar allPosts={allPosts} />
              <main className="flex-1">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </div>
            <ScrollToTop />
            <GlobalSignInModal />
          </FavoritesProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
