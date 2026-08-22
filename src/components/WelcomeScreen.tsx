"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Logo } from "./Logo";
import { User } from "lucide-react";
import { openSignInModal } from "./SignInModal";

const WELCOMED_KEY = "techmate_welcomed";

function hasWelcomed(): boolean {
  if (typeof window === "undefined") return true;
  try { return localStorage.getItem(WELCOMED_KEY) === "true"; } catch { return true; }
}

function markWelcomed() {
  try { localStorage.setItem(WELCOMED_KEY, "true"); } catch { /* ignore */ }
}

export function WelcomeScreen() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [isVisible, setIsVisible] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [progress, setProgress] = useState(0);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [displayPhoto, setDisplayPhoto] = useState<string | null>(null);
  const signInAttempted = useRef(false);
  const prevStatus = useRef(status);

  // Hydrate — only act once session status is resolved
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle first visit (open modal) and welcome screen logic
  useEffect(() => {
    if (!mounted) return;

    // Wait until NextAuth has resolved the session
    if (status === "loading") return;

    const welcomed = hasWelcomed();

    if (welcomed) {
      // Returning user — show welcome splash if logged in
      if (status === "authenticated" && session?.user && !showWelcome) {
        setDisplayName(session.user.name || session.user.login || null);
        setDisplayPhoto(session.user.image || null);
        setShowWelcome(true);
        setIsVisible(true);
        setPhase("enter");
      }
      // Not logged in + already welcomed = no welcome screen
    } else {
      // First visit — open login modal once
      if (!signInAttempted.current) {
        signInAttempted.current = true;
        // Mark as welcomed immediately so a refresh won't re-trigger the modal
        markWelcomed();
        setTimeout(() => openSignInModal(), 800);
      }

      // If user is authenticated (just logged in via modal), show welcome
      if (status === "authenticated" && session?.user && !showWelcome) {
        setDisplayName(session.user.name || session.user.login || null);
        setDisplayPhoto(session.user.image || null);
        setShowWelcome(true);
        setIsVisible(true);
        setPhase("enter");
        markWelcomed();
      }
    }

    prevStatus.current = status;
  }, [mounted, status, session?.user, showWelcome]);

  // Progress bar
  useEffect(() => {
    if (!mounted || !isVisible || phase !== "enter") return;
    const duration = 3000;
    const startTime = performance.now();
    let rafId: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      setProgress(Math.round(t * 100));
      if (t < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [mounted, isVisible, phase]);

  // Phase transitions
  useEffect(() => {
    if (!mounted || !isVisible) return;
    if (phase === "enter") {
      const timer = setTimeout(() => setPhase("exit"), 3000);
      return () => clearTimeout(timer);
    }
    if (phase === "exit") {
      const timer = setTimeout(() => setIsVisible(false), 900);
      return () => clearTimeout(timer);
    }
  }, [phase, mounted, isVisible]);

  if (!mounted) return null;
  if (!isVisible) return null;

  const isExiting = phase === "exit";

  return (
    <div
      className={`welcome-overlay ${phase === "enter" ? "welcome-enter" : "welcome-hold"} ${isExiting ? "welcome-exit" : ""}`}
      aria-hidden="true"
      style={isExiting ? { pointerEvents: "none" } : undefined}
    >
      {/* Letterbox bars */}
      <div className="welcome-letterbox welcome-letterbox--top" />
      <div className="welcome-letterbox welcome-letterbox--bottom" />

      {/* Vignette */}
      <div className="welcome-vignette" />

      {/* Ambient glow behind logo */}
      <div className="welcome-glow" />

      {/* Content */}
      <div className="welcome-content">
        {/* Avatar or Logo */}
        <div className="welcome-logo-wrap">
          {displayPhoto ? (
            <div className="welcome-avatar-circle">
              <img src={displayPhoto} alt="" className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
            </div>
          ) : displayName ? (
            <div className="welcome-avatar-circle welcome-avatar-circle--fallback">
              <User className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400" />
            </div>
          ) : (
            <Logo className="w-20 h-20 sm:w-24 sm:h-24" glow variant="emerald" />
          )}
        </div>

        {/* Returning / newly logged-in user */}
        {displayName ? (
          <div className="welcome-text-group">
            <h1 className="welcome-title">
              <span className="welcome-title--tech">Bem-vindo{showWelcome && !hasWelcomed() ? "" : " de volta"}, </span>
              <span className="welcome-title--mate welcome-name-shine">{displayName}</span>
              <span className="welcome-title--tech">!</span>
            </h1>
            <p className="welcome-tagline">Bom te ver por aqui</p>
          </div>
        ) : (
          <div className="welcome-text-group">
            <h1 className="welcome-title">
              <span className="welcome-title--tech">Tech</span>
              <span className="welcome-title--mate shimmer-text">Mate</span>
            </h1>
            <p className="welcome-tagline">Bem-vindo ao seu parceiro em tech</p>
          </div>
        )}

        {/* Decorative line */}
        <div className="welcome-line" />

        {/* Progress bar */}
        {phase === "enter" && (
          <div className="welcome-progress-wrap">
            <div className="welcome-progress-track">
              <div
                className="welcome-progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Subtle particles ring */}
      <div className="welcome-ring" />
      <div className="welcome-ring welcome-ring--outer" />
    </div>
  );
}

/* ── Re-export getUsername for backward compat (Navbar) ── */
export function getUsername(): string | null {
  return null;
}
