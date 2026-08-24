"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { ArrowRight, Search as SearchIcon, User, Settings, X, LogOut, Home, BookOpen, Grid3X3, Heart, Menu } from "lucide-react";
import { AuthButton } from "@/components/AuthButton";
import { openSignInModal } from "@/components/SignInModal";
import { useSession, signOut } from "next-auth/react";
import { Logo } from "@/components/Logo";
import type { PostSummary } from "@/lib/posts";

const navLinks = [
  { label: "Início", href: "/", icon: Home },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Categorias", href: "/#categories", icon: Grid3X3 },
  { label: "Favoritos", href: "/favoritos", icon: Heart },
];

interface NavbarProps {
  allPosts: PostSummary[];
}

export function Navbar({ allPosts }: NavbarProps) {
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [mobileSearchActive, setMobileSearchActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categoriesInView, setCategoriesInView] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session, status: authStatus } = useSession();
  const userName = (authStatus === "authenticated" && session?.user) ? (session.user.name || session.user.login || null) : null;
  const avatarUrl = (authStatus === "authenticated" && session?.user?.image) ? session.user.image : null;
  const [mobileQuery, setMobileQuery] = useState("");
  const [mobileResults, setMobileResults] = useState<PostSummary[]>([]);
  const pathname = usePathname();
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Desktop inline search state
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [desktopQuery, setDesktopQuery] = useState("");
  const [desktopResults, setDesktopResults] = useState<PostSummary[]>([]);
  const [desktopSelectedIndex, setDesktopSelectedIndex] = useState(-1);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const router = useRouter();

  // Portal mount point
  useEffect(() => { setMounted(true); }, []);

  // ── Desktop search filtering ──
  useEffect(() => {
    if (desktopQuery.trim().length < 2) {
      setDesktopResults([]);
      setDesktopSelectedIndex(-1);
      return;
    }
    const q = desktopQuery.toLowerCase();
    const filtered = allPosts.filter(
      (post) =>
        post.frontmatter.title.toLowerCase().includes(q) ||
        post.frontmatter.excerpt.toLowerCase().includes(q) ||
        post.frontmatter.category.toLowerCase().includes(q) ||
        post.frontmatter.tags.some((tag) => tag.toLowerCase().includes(q))
    );
    setDesktopResults(filtered.slice(0, 6));
    setDesktopSelectedIndex(-1);
  }, [desktopQuery, allPosts]);

  useEffect(() => {
    if (desktopSearchOpen && desktopInputRef.current) {
      desktopInputRef.current.focus();
    }
  }, [desktopSearchOpen]);

  useEffect(() => {
    if (!desktopSearchOpen) return;
    function handleClick(e: MouseEvent) {
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(e.target as Node)) {
        closeDesktopSearch();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [desktopSearchOpen]);

  // ── Mobile search filtering ──
  useEffect(() => {
    if (mobileQuery.trim().length < 2) { setMobileResults([]); return; }
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

  useEffect(() => {
    if (mobileSearchActive && mobileInputRef.current) mobileInputRef.current.focus();
  }, [mobileSearchActive]);

  // ── Sliding indicator ──
  const updateIndicator = useCallback(() => {
    if (desktopSearchOpen) return;
    const activeLink = navLinks.find((l) => isActive(l.href));
    if (!activeLink || !indicatorRef.current || !pillRef.current) return;
    const el = linkRefs.current.get(activeLink.href);
    if (!el) return;
    const pillRect = pillRef.current.getBoundingClientRect();
    const linkRect = el.getBoundingClientRect();
    indicatorRef.current.style.transform = `translateX(${linkRect.left - pillRect.left}px)`;
    indicatorRef.current.style.width = `${linkRect.width}px`;
    indicatorRef.current.style.opacity = "1";
  }, [categoriesInView, pathname, desktopSearchOpen]);

  useEffect(() => { updateIndicator(); }, [updateIndicator]);
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) updateIndicator(); };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [updateIndicator]);

  // ── Scroll ──
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) { requestAnimationFrame(() => { setScrolled(window.scrollY > 20); ticking = false; }); ticking = true; }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) { setMobileMoreOpen(false); setMobileSearchActive(false); } };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => { setMobileMoreOpen(false); setMobileSearchActive(false); setMobileQuery(""); setDesktopSearchOpen(false); setDesktopQuery(""); }, [pathname]);

  // Lock body scroll
  useEffect(() => {
    if (mobileMoreOpen || mobileSearchActive) {
      document.body.style.overflow = "hidden";
    } else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMoreOpen, mobileSearchActive]);

  // Categories intersection observer
  useEffect(() => {
    if (pathname !== "/") { setCategoriesInView(false); return; }
    const section = document.getElementById("categories");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCategoriesInView(entry.isIntersecting),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [pathname]);

  const handleCategoriesClick = useCallback(() => { setCategoriesInView(true); }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/" && !categoriesInView;
    if (href === "/#categories") return pathname === "/" && categoriesInView;
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  }

  function closeDesktopSearch() {
    setDesktopSearchOpen(false);
    setDesktopQuery("");
    setDesktopResults([]);
    setDesktopSelectedIndex(-1);
  }

  function handleDesktopSearchSelect(slug: string) {
    closeDesktopSearch();
    router.push(`/blog/${slug}`);
  }

  function handleDesktopKeyDown(e: React.KeyboardEvent) {
    if (desktopResults.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setDesktopSelectedIndex((p) => (p < desktopResults.length - 1 ? p + 1 : 0)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setDesktopSelectedIndex((p) => (p > 0 ? p - 1 : desktopResults.length - 1)); }
    else if (e.key === "Enter" && desktopSelectedIndex >= 0) { e.preventDefault(); handleDesktopSearchSelect(desktopResults[desktopSelectedIndex].slug); }
    else if (e.key === "Escape") { closeDesktopSearch(); }
  }

  function handleMobileSearchSelect(slug: string) {
    setMobileSearchActive(false);
    setMobileQuery("");
  }

  // ── Desktop Floating Liquid Glass Pill (portaled to body) ──
  const desktopPill = (
    <div
      ref={pillRef}
      className={`float-menu ${scrolled ? "scrolled" : ""}`}
    >
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className="float-pill-indicator"
        style={{ opacity: 0, willChange: "transform, width" }}
      />
      <Link href="/" className="flex items-center gap-2 shrink-0 mr-1">
        <Logo className="w-7 h-7" glow />
        <span className="text-sm font-bold tracking-tight flex items-center">
          <span className="text-white">Tech</span>
          <span className="shimmer-text">Mate</span>
        </span>
      </Link>
      {!desktopSearchOpen && (
        <>
          <span className="float-divider" />
          <div className="flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={link.href === "/#categories" ? handleCategoriesClick : undefined}
                  ref={(el) => { if (el) linkRefs.current.set(link.href, el); }}
                  className={`float-nav-link ${active ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </>
      )}
      <div ref={desktopSearchRef} className="relative ml-auto flex items-center">
        {!desktopSearchOpen ? (
          <button
            onClick={() => setDesktopSearchOpen(true)}
            className="float-search-btn"
            aria-label="Buscar artigos"
            type="button"
          >
            <SearchIcon className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-xs">Buscar...</span>
            <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}>
              Ctrl K
            </kbd>
          </button>
        ) : (
          <div className="float-search-inline">
            <SearchIcon className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(var(--accent-rgb), 0.7)" }} />
            <input
              ref={desktopInputRef}
              type="text"
              value={desktopQuery}
              onChange={(e) => setDesktopQuery(e.target.value)}
              onKeyDown={handleDesktopKeyDown}
              placeholder="Buscar artigos, tags..."
            />
            <button
              onClick={closeDesktopSearch}
              className="p-0.5 rounded-full hover:bg-white/10 transition-colors shrink-0"
              type="button"
              aria-label="Fechar busca"
            >
              <X className="w-3 h-3 text-white/50" />
            </button>
            {desktopResults.length > 0 && desktopQuery.trim().length >= 2 && (
              <div className="float-search-dropdown">
                <div className="p-1 max-h-[60vh] overflow-y-auto">
                  {desktopResults.map((post, i) => (
                    <button
                      key={post.slug}
                      onClick={() => handleDesktopSearchSelect(post.slug)}
                      className={`float-search-result ${i === desktopSelectedIndex ? "float-search-result-active" : ""}`}
                      type="button"
                    >
                      <span className="mt-0.5 shrink-0" style={{ color: "rgba(var(--accent-rgb), 0.7)" }}>
                        <SearchIcon className="w-3.5 h-3.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-white font-medium truncate">{post.frontmatter.title}</p>
                        <p className="text-xs text-white/40 truncate mt-0.5">
                          {post.frontmatter.category} · {post.frontmatter.readTime} de leitura
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="px-3 py-2 border-t border-white/[0.04]">
                  <p className="text-[11px] text-white/30">
                    {desktopResults.length} resultado{desktopResults.length !== 1 ? "s" : ""} · Enter para abrir
                  </p>
                </div>
              </div>
            )}
            {desktopQuery.trim().length >= 2 && desktopResults.length === 0 && (
              <div className="float-search-dropdown">
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-white/40">Nenhum resultado para &quot;{desktopQuery}&quot;</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {!desktopSearchOpen && (
        <>
          <span className="float-divider" />
          <div className="flex items-center">
            <AuthButton />
          </div>
        </>
      )}
    </div>
  );

  // ── Mobile Floating Tab Bar (portaled to body) ──
  const mobileTabBar = (
    <div
      className="mobile-tab-bar"
    >
      <div className="mobile-tab-bar-items">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={link.href === "/#categories" ? handleCategoriesClick : undefined}
              className={`mobile-tab-item ${active ? "active" : ""}`}
            >
              <div className="mobile-tab-icon-wrap">
                <Icon className="mobile-tab-icon" strokeWidth={active ? 2.2 : 1.8} />
                {active && <div className="mobile-tab-glow" />}
              </div>
              <span className="mobile-tab-label">{link.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setMobileSearchActive(true)}
          className={`mobile-tab-item ${mobileSearchActive ? "active" : ""}`}
          type="button"
          aria-label="Pesquisar"
        >
          <div className="mobile-tab-icon-wrap">
            <SearchIcon className="mobile-tab-icon" strokeWidth={mobileSearchActive ? 2.2 : 1.8} />
            {mobileSearchActive && <div className="mobile-tab-glow" />}
          </div>
          <span className="mobile-tab-label">Buscar</span>
        </button>
        <button
          onClick={() => setMobileMoreOpen(true)}
          className={`mobile-tab-item ${mobileMoreOpen ? "active" : ""}`}
          type="button"
          aria-label="Mais opções"
        >
          <div className="mobile-tab-icon-wrap">
            <Menu className="mobile-tab-icon" strokeWidth={mobileMoreOpen ? 2.2 : 1.8} />
            {mobileMoreOpen && <div className="mobile-tab-glow" />}
          </div>
          <span className="mobile-tab-label">Mais</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop pill — portaled to body as direct child for LiquidGlass lib */}
      {mounted && createPortal(desktopPill, document.body)}

      {/* Mobile tab bar — portaled to body as direct child for LiquidGlass lib */}
      {mounted && createPortal(mobileTabBar, document.body)}

      {/* Mobile Search Overlay (NOT a glass element, rendered normally) */}
      {mobileSearchActive && (
        <>
          <div
            className="md:hidden fixed inset-0 z-[58]"
            onClick={() => { setMobileSearchActive(false); setMobileQuery(""); }}
            aria-hidden
          />
          <div className="md:hidden mobile-search-overlay z-[59]">
            <div className="mobile-search-overlay-inner">
              <div className="mobile-search-overlay-shine" aria-hidden="true" />
              <SearchIcon className="w-4 h-4 text-white/50 shrink-0" />
              <input
                ref={mobileInputRef}
                type="text"
                value={mobileQuery}
                onChange={(e) => setMobileQuery(e.target.value)}
                placeholder="Buscar artigos, tags..."
                className="mobile-search-overlay-input"
                autoFocus
              />
              <button
                onClick={() => { setMobileSearchActive(false); setMobileQuery(""); }}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                type="button"
                aria-label="Fechar busca"
              >
                <X className="w-4 h-4 text-white/50" />
              </button>
            </div>
            {mobileQuery.trim().length >= 2 && (
              <div className="mobile-search-overlay-results">
                {mobileResults.length > 0 ? (
                  <>
                    <div className="p-1">
                      {mobileResults.map((post) => (
                        <Link
                          key={post.slug}
                          href={`/blog/${post.slug}`}
                          onClick={() => handleMobileSearchSelect(post.slug)}
                          className="flex items-start gap-3 px-3 py-2.5 rounded-xl text-white/80 hover:bg-white/[0.06] active:bg-white/[0.08] transition-all"
                        >
                          <span className="mt-0.5 shrink-0" style={{ color: "rgba(var(--accent-rgb), 0.7)" }}>
                            <SearchIcon className="w-3.5 h-3.5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-white font-medium truncate">{post.frontmatter.title}</p>
                            <p className="text-xs text-white/40 truncate mt-0.5">{post.frontmatter.category} &middot; {post.frontmatter.readTime} de leitura</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="px-3 py-2 border-t border-white/[0.05]">
                      <p className="text-[11px] text-white/30">{mobileResults.length} resultado{mobileResults.length !== 1 ? "s" : ""}</p>
                    </div>
                  </>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-white/40">Nenhum resultado para &quot;{mobileQuery}&quot;</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Mobile More Menu Overlay (NOT a glass element) */}
      <div className={`mobile-menu-overlay md:hidden ${mobileMoreOpen ? "mobile-menu-open" : ""}`} aria-hidden={!mobileMoreOpen}>
        <div className="mobile-menu-backdrop" onClick={() => setMobileMoreOpen(false)} />
        <div className="mobile-menu-content">
          <button onClick={() => setMobileMoreOpen(false)} className="mobile-menu-close" aria-label="Fechar menu" type="button">
            <X className="w-6 h-6" />
          </button>
          <div className="mobile-menu-links">
            {userName && (
              <div className="mobile-menu-user flex flex-col items-center">
                {avatarUrl ? (
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-emerald-400/25 shadow-[0_0_20px_var(--accent-glow)]">
                    <img src={avatarUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 rounded-full shrink-0 bg-gradient-to-b from-emerald-400/20 to-emerald-500/10 border border-emerald-400/20">
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
              <Link href="/settings" onClick={() => setMobileMoreOpen(false)} className="mobile-menu-link mobile-menu-link-secondary" style={{ animationDelay: `100ms` }}>
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4" />
                  <span className="mobile-menu-link-text">Configurações</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </Link>
              {!session?.user && (
                <button
                  onClick={() => { setMobileMoreOpen(false); openSignInModal(); }}
                  className="mobile-menu-link"
                  style={{ animationDelay: `180ms` }}
                  type="button"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="mobile-menu-link-text">Entrar</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </button>
              )}
              {session?.user && (
                <button
                  onClick={() => { setMobileMoreOpen(false); signOut({ callbackUrl: "/" }); }}
                  className="mobile-menu-link"
                  style={{ animationDelay: `260ms` }}
                  type="button"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="w-4 h-4 text-rose-400/70" />
                    <span className="mobile-menu-link-text">Sair da conta</span>
                  </div>
                  <LogOut className="w-4 h-4 opacity-40" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
