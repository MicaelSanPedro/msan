"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Search as SearchIcon, User, Settings, X, Heart, LogOut } from "lucide-react";
import { AuthButton } from "@/components/AuthButton";
import { openSignInModal } from "@/components/SignInModal";
import { useSession, signOut } from "next-auth/react";
import { Logo } from "@/components/Logo";
import { SearchBar } from "@/components/SearchBar";
import type { PostSummary } from "@/lib/posts";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Categorias", href: "/#categories" },
  { label: "Favoritos", href: "/favoritos" },
];

interface NavbarProps {
  allPosts: PostSummary[];
}

function MobileLoginButton({ onSignIn, setMobileOpen, delay }: { onSignIn: () => void; setMobileOpen: (v: boolean) => void; delay: number }) {
  const { data: session } = useSession();

  if (session?.user) return null;

  return (
    <button
      onClick={() => { setMobileOpen(false); onSignIn(); }}
      className="mobile-menu-link"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span className="mobile-menu-link-text">Entrar</span>
      </div>
      <ArrowRight className="w-4 h-4 opacity-40" />
    </button>
  );
}

function MobileLogoutButton({ setMobileOpen, delay }: { setMobileOpen: (v: boolean) => void; delay: number }) {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <button
      onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/" }); }}
      className="mobile-menu-link"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <LogOut className="w-4 h-4 text-rose-400/70" />
        <span className="mobile-menu-link-text">Sair da conta</span>
      </div>
      <LogOut className="w-4 h-4 opacity-40" />
    </button>
  );
}

export function Navbar({ allPosts }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchActive, setMobileSearchActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categoriesInView, setCategoriesInView] = useState(false);
  const { data: session, status: authStatus } = useSession();
  const userName = (authStatus === "authenticated" && session?.user) ? (session.user.name || session.user.login || null) : null;
  const avatarUrl = (authStatus === "authenticated" && session?.user?.image) ? session.user.image : null;
  const [mobileQuery, setMobileQuery] = useState("");
  const [mobileResults, setMobileResults] = useState<PostSummary[]>([]);
  const pathname = usePathname();
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // ── Mobile search filtering ──
  useEffect(() => {
    if (mobileQuery.trim().length < 2) {
      setMobileResults([]);
      return;
    }
    const q = mobileQuery.toLowerCase();
    const filtered = allPosts.filter(
      (post) =>
        post.frontmatter.title.toLowerCase().includes(q) ||
        post.frontmatter.excerpt.toLowerCase().includes(q) ||
        post.frontmatter.category.toLowerCase().includes(q) ||
        post.frontmatter.tags.some((tag) => tag.toLowerCase().includes(q))
    );
    setMobileResults(filtered.slice(0, 5));
  }, [mobileQuery, allPosts]);

  // Auto-focus mobile input when search is activated
  useEffect(() => {
    if (mobileSearchActive && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [mobileSearchActive]);

  // ── Sliding indicator refs ──
  const pillRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const updateIndicator = useCallback(() => {
    const activeLink = navLinks.find((l) => isActive(l.href));
    if (!activeLink || !indicatorRef.current || !navRef.current) return;

    const el = pillRefs.current.get(activeLink.href);
    if (!el) return;

    const navRect = navRef.current.getBoundingClientRect();
    const pillRect = el.getBoundingClientRect();
    const navPadLeft = parseFloat(getComputedStyle(navRef.current).paddingLeft);

    indicatorRef.current.style.transform = `translateX(${pillRect.left - navRect.left - navPadLeft}px)`;
    indicatorRef.current.style.width = `${pillRect.width}px`;
    indicatorRef.current.style.opacity = "1";
  }, [categoriesInView, pathname]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) updateIndicator();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [updateIndicator]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
        setMobileSearchActive(false);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSearchActive(false);
    setMobileQuery("");
  }, [pathname]);

  // Lock body scroll when mobile menu or search results are open
  useEffect(() => {
    if (mobileOpen || (mobileSearchActive && mobileResults.length > 0)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, mobileSearchActive, mobileResults.length]);

  useEffect(() => {
    if (pathname !== "/") {
      setCategoriesInView(false);
      return;
    }
    const section = document.getElementById("categories");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCategoriesInView(entry.isIntersecting),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [pathname]);

  const handleCategoriesClick = useCallback(() => {
    setCategoriesInView(true);
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/" && !categoriesInView;
    if (href === "/#categories") return pathname === "/" && categoriesInView;
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  }

  function handleMobileSearchSelect(slug: string) {
    setMobileSearchActive(false);
    setMobileQuery("");
  }

  return (
    <>
      {/* ── Top Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 glass-nav ${scrolled ? "scrolled" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
              <div className="relative transition-transform duration-300 group-hover:scale-105">
                <Logo className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" glow />
              </div>
              <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight flex items-center">
                <span className="text-white">Tech</span>
                <span className="shimmer-text">Mate</span>
              </span>
            </Link>

            {/* Desktop Navigation (center) */}
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              <div
                ref={navRef}
                className="relative flex items-center gap-1 p-1 rounded-full
                           backdrop-blur-[40px] saturate-[200%] brightness-[105%]
                           bg-gradient-to-b from-white/[0.08] to-white/[0.02]
                           border border-white/[0.14]
                           shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]"
              >
                <span
                  ref={indicatorRef}
                  aria-hidden="true"
                  className="absolute top-1 left-0 h-[calc(100%-8px)] rounded-full
                             bg-gradient-to-b from-emerald-500/20 to-emerald-500/5
                             backdrop-blur-[40px] saturate-[180%]
                             border border-emerald-400/25
                             shadow-[0_4px_20px_-8px_rgba(52,211,153,0.45),inset_0_1px_0_rgba(255,255,255,0.15)]
                             transition-all duration-300 ease-out pointer-events-none opacity-0"
                  style={{ willChange: "transform, width" }}
                />

                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={link.href === "/#categories" ? handleCategoriesClick : undefined}
                      ref={(el) => {
                        if (el) pillRefs.current.set(link.href, el);
                      }}
                      className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 ${
                        active
                          ? "text-emerald-100"
                          : "text-white/55 hover:text-white"
                      }`}
                    >
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right side (desktop only) */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <SearchBar allPosts={allPosts} />
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Floating Search + Hamburger ── */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className={`mobile-search-bar pointer-events-auto flex items-center ${mobileSearchActive ? 'expanded' : ''}`}>
          {/* Search area */}
          <div className="mobile-search-input-wrap flex items-center gap-1.5 py-2.5 pl-2.5 pr-0 min-w-0">
            <SearchIcon className="w-3.5 h-3.5 text-white/50 shrink-0" />
            <input
              ref={mobileInputRef}
              type="text"
              value={mobileQuery}
              onChange={(e) => {
                setMobileQuery(e.target.value);
                if (!mobileSearchActive) setMobileSearchActive(true);
              }}
              onFocus={() => setMobileSearchActive(true)}
              onBlur={() => { if (!mobileQuery) setMobileSearchActive(false); }}
              placeholder="Pesquisar"
              className="w-[70px] min-w-0 bg-transparent text-xs text-white placeholder:text-white/30 outline-none"
            />
          </div>

          {/* Hamburger - pushed to right edge */}
          <div
            onClick={() => setMobileOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setMobileOpen(true); }}
            className="flex items-center justify-center w-8 h-8 shrink-0 ml-1 py-2.5 pr-1 cursor-pointer select-none"
            aria-label="Abrir menu"
          >
            <span className="flex flex-col gap-[4px]">
              <span className="block w-[12px] h-[1.5px] rounded-full bg-white/80" />
              <span className="block w-[12px] h-[1.5px] rounded-full bg-white/80" />
            </span>
          </div>
        </div>
      </div>

      {/* ── Mobile search results dropdown (above floating bar) ── */}
      {mobileSearchActive && mobileResults.length > 0 && (
        <div className="md:hidden fixed inset-x-0 bottom-24 z-[55] px-4 animate-fade-in">
          <div className="mobile-search-results relative">
            <div className="p-1.5">
              {mobileResults.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  onClick={() => handleMobileSearchSelect(post.slug)}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-lg
                             text-white/80 hover:bg-white/[0.05] active:bg-white/[0.06]
                             transition-colors"
                >
                  <span className="text-emerald-400 mt-0.5 shrink-0">
                    <SearchIcon className="w-3.5 h-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white font-medium truncate">
                      {post.frontmatter.title}
                    </p>
                    <p className="text-xs text-white/30 truncate mt-0.5">
                      {post.frontmatter.category} &middot; {post.frontmatter.readTime} de leitura
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="px-3.5 py-2 border-t border-white/[0.04]">
              <p className="text-[11px] text-white/20">
                {mobileResults.length} resultado{mobileResults.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* No results overlay */}
      {mobileSearchActive && mobileQuery.trim().length >= 2 && mobileResults.length === 0 && (
        <div className="md:hidden fixed inset-x-0 bottom-24 z-[55] px-4 animate-fade-in">
          <div className="mobile-search-results">
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-white/30">
                Nenhum resultado para &quot;{mobileQuery}&quot;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Close mobile search results when tapping outside */}
      {mobileSearchActive && (
        <div
          className="md:hidden fixed inset-0 bottom-0 z-[54]"
          onClick={() => {
            setMobileSearchActive(false);
            setMobileQuery("");
          }}
          aria-hidden
        />
      )}

      {/* ── Mobile Fullscreen Menu Overlay ── */}
      <div
        className={`mobile-menu-overlay md:hidden ${
          mobileOpen ? "mobile-menu-open" : ""
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-menu-backdrop" />
        <div className="mobile-menu-content">
          <button
            onClick={() => setMobileOpen(false)}
            className="mobile-menu-close"
            aria-label="Fechar menu"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mobile-menu-links">
            {userName && (
              <div className="mobile-menu-user flex flex-col items-center">
                {avatarUrl ? (
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0
                              border-2 border-emerald-400/25
                              shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                    <img src={avatarUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 rounded-full shrink-0
                              bg-gradient-to-b from-emerald-400/20 to-emerald-500/10 border border-emerald-400/20">
                    <User className="w-5 h-5 text-emerald-400" />
                  </div>
                )}
                <div className="mt-3 text-center">
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Olá</p>
                  <p className="text-lg font-semibold text-white/90 truncate max-w-[200px]">{userName}</p>
                </div>
              </div>
            )}

            <div className="mobile-menu-nav">
              {navLinks.map((link, index) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`mobile-menu-link ${active ? "active" : ""}`}
                    style={{ animationDelay: `${index * 80 + 100}ms` }}
                  >
                    <span className="mobile-menu-link-text">{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </Link>
                );
              })}

              <Link
                href="/settings"
                onClick={() => setMobileOpen(false)}
                className="mobile-menu-link mobile-menu-link-secondary"
                style={{ animationDelay: `${navLinks.length * 80 + 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4" />
                  <span className="mobile-menu-link-text">Configurações</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </Link>

              {/* Mobile login / logout buttons */}
              <MobileLoginButton onSignIn={() => openSignInModal()} setMobileOpen={setMobileOpen} delay={navLinks.length * 80 + 180} />
              <MobileLogoutButton setMobileOpen={setMobileOpen} delay={navLinks.length * 80 + 260} />
            </div>

            <div className="mobile-menu-cta" style={{ animationDelay: `${navLinks.length * 80 + 200}ms` }}>
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="mobile-menu-cta-btn"
              >
                Ler todos os artigos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
