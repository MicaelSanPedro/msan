import Link from "next/link";
import { Heart, Github, Twitter, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";

const categoryLinks = [
  { label: "Linux", href: "/blog?category=Linux" },
  { label: "Windows", href: "/blog?category=Windows" },
  { label: "Desenvolvimento", href: "/blog?category=Dev" },
  { label: "Segurança", href: "/blog?category=Segurança" },
  { label: "Hardware", href: "/blog?category=Hardware" },
  { label: "Dicas", href: "/blog?category=Dicas" },
];

const quickLinks = [
  { label: "Início", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre", href: "/#sobre" },
  { label: "GitHub", href: "https://github.com/MicaelSanPedro/linuxzeiro" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/MicaelSanPedro/linuxzeiro",
    icon: Github,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer relative mt-auto overflow-hidden">
      {/* Top gradient divider — liquid glass edge */}
      <div className="relative h-px">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/[0.04] blur-3xl rounded-full" />
      </div>

      {/* Giant brand watermark */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-1/3 pointer-events-none select-none whitespace-nowrap overflow-hidden">
        <div className="text-center">
          <span className="text-[22vw] sm:text-[16vw] lg:text-[10rem] font-extrabold leading-none tracking-tighter
                           bg-gradient-to-b from-white/[0.04] to-transparent bg-clip-text text-transparent inline-block">
            TECHMATE
          </span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 sm:mb-5 w-fit group">
              <Logo className="w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105" glow />
              <span className="text-base sm:text-lg font-bold tracking-tight">
                <span className="text-white">Tech</span>
                <span className="shimmer-text">Mate</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-white/55 leading-relaxed max-w-xs text-pretty">
              Tech blog brasileiro sobre Linux, Windows, dev, gaming e segurança. Tutoriais honestos e dicas práticas.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-5 sm:mt-6">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="glass-card w-10 h-10 inline-flex items-center justify-center
                             text-white/65 hover:text-emerald-300
                             hover:bg-white/[0.10] hover:border-white/45
                             active:scale-95
                             transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="text-[11px] font-semibold text-emerald-300/80 mb-4 sm:mb-5 uppercase tracking-[0.18em]">
              Categorias
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {categoryLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-emerald-200 transition-colors duration-200
                               hover:bg-white/[0.03] rounded-lg -ml-1 pl-1 py-0.5"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gradient-to-r from-emerald-400 to-transparent transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-[11px] font-semibold text-emerald-300/80 mb-4 sm:mb-5 uppercase tracking-[0.18em]">
              Navegação
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {quickLinks.map((item) => {
                const isExternal = item.href.startsWith("http");
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-emerald-200 transition-colors duration-200
                                 hover:bg-white/[0.03] rounded-lg -ml-1 pl-1 py-0.5"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-gradient-to-r from-emerald-400 to-transparent transition-all duration-300" />
                      {item.label}
                      {isExternal && (
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Status / colofon */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-[11px] font-semibold text-emerald-300/80 mb-4 sm:mb-5 uppercase tracking-[0.18em]">
              Status
            </h4>
            <div className="space-y-2.5 sm:space-y-3 text-sm">
              <div className="inline-flex items-center gap-2 text-white/65">
                <span className="live-dot" />
                Tudo operacional
              </div>
              <div className="text-white/45 text-xs font-mono">
                v1.0.0 · build {currentYear}
              </div>
              <div className="text-white/45 text-xs">
                Hospedado com ❤
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 sm:mt-14 pt-5 sm:pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-xs text-white/40">
            © {currentYear} <span className="text-white/65">TechMate</span>. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1.5 flex-wrap justify-center">
            Feito com <Heart className="w-3 h-3 text-emerald-400 fill-emerald-400 animate-pulse" /> e café pra galera
            <span className="text-emerald-300/70">tech BR</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
