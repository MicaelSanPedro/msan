import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollRevealInit } from "@/components/ScrollRevealInit";
import { LazyBokehParticles } from "@/components/LazyBokehParticles";
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
  themeColor: "#060a08",
};

export const metadata: Metadata = {
  title: "TechMate — Seu parceiro em tech",
  description:
    "Tutoriais, dicas e guias sobre Linux, Windows, desenvolvimento, seguranca e gaming. Conteudo honesto e pratico, direto ao ponto.",
  keywords: [
    "tech",
    "tecnologia",
    "tutoriais",
    "linux",
    "windows",
    "desenvolvimento",
    "programacao",
    "gaming",
    "seguranca",
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
            __html: `(function(){try{var t=localStorage.getItem('techmate_theme');if(t==='light'){document.documentElement.classList.remove('dark');var m=document.querySelector('meta[name="theme-color"]');if(m)m.content='#f0f5f2'}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        {/* ═══ Liquid Glass 3D: SVG Optical Refraction Filters ═══ */}
        <svg
          aria-hidden="true"
          style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        >
          <defs>
            {/* Main liquid refraction filter - subtle displacement + blur */}
            <filter id="liquid-refraction" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015 0.015"
                numOctaves="3"
                seed="2"
                result="noise"
              >
                <animate
                  attributeName="seed"
                  values="1;50;100;50;1"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="3"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            {/* Caustic light pattern filter */}
            <filter id="caustic-light" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.03 0.02"
                numOctaves="2"
                seed="5"
                result="caustic"
              >
                <animate
                  attributeName="baseFrequency"
                  values="0.03 0.02;0.035 0.025;0.025 0.015;0.03 0.02"
                  dur="15s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feColorMatrix
                type="luminanceToAlpha"
                in="caustic"
                result="causticAlpha"
              />
              <feComponentTransfer in="causticAlpha" result="causticFaded">
                <feFuncA type="linear" slope="0.08" intercept="0" />
              </feComponentTransfer>
              <feBlend in="SourceGraphic" in2="causticFaded" mode="screen" />
            </filter>
            {/* Glass surface specular highlight filter */}
            <filter id="glass-specular" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.008"
                numOctaves="4"
                seed="10"
                result="specNoise"
              >
                <animate
                  attributeName="seed"
                  values="10;30;10"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="specNoise"
                scale="1.5"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        {/* ═══ Liquid Glass 3D: Mouse-Tracking Dynamic Lighting ═══ */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              var raf=null;
              var mx=0.5,my=0.2,angle=135;
              function updateLight(){
                var root=document.documentElement;
                root.style.setProperty('--light-x',mx*100+'%');
                root.style.setProperty('--light-y',my*100+'%');
                root.style.setProperty('--light-angle',angle+'deg');
                raf=null;
              }
              function onMouseMove(e){
                mx=e.clientX/window.innerWidth;
                my=e.clientY/window.innerHeight;
                angle=Math.atan2(e.clientY-window.innerHeight/2,e.clientX-window.innerWidth/2)*180/Math.PI+180;
                if(!raf)raf=requestAnimationFrame(updateLight);
              }
              function onTouchMove(e){
                if(e.touches.length>0){
                  var t=e.touches[0];
                  mx=t.clientX/window.innerWidth;
                  my=t.clientY/window.innerHeight;
                  angle=Math.atan2(t.clientY-window.innerHeight/2,t.clientX-window.innerWidth/2)*180/Math.PI+180;
                  if(!raf)raf=requestAnimationFrame(updateLight);
                }
              }
              document.addEventListener('mousemove',onMouseMove,{passive:true});
              document.addEventListener('touchmove',onTouchMove,{passive:true});
              updateLight();
            })()`,
          }}
        />
        <ThemeSync />
        <div className="site-backdrop" aria-hidden>
          <div className="mesh-bg" style={{filter:'url(#liquid-refraction)'}} />
          <div className="noise-overlay" />
        </div>

        <SessionProvider>
          <FavoritesProvider>
            <WelcomeScreen />

            <div className="cinema-vignette" aria-hidden />
            <div className="light-leak light-leak--emerald" aria-hidden />
            <div className="light-leak light-leak--rose" aria-hidden />
            <div className="light-leak light-leak--sky" aria-hidden />
            <LazyBokehParticles />
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
