#!/usr/bin/env python3
"""Insert pastel pink glassmorphism CSS into globals.css before the reduce motion section."""

PASTEL_CSS = r'''/* ═══════════════════════════════════════════════════════════════
   Pastel Pink Glassmorphism — Menu & Search System
   Mobile app UI aesthetic · Frosted glass · Soft pink palette
   ═══════════════════════════════════════════════════════════════ */

:root {
  --pastel-pink: 255, 182, 193;
  --pastel-rose: 244, 143, 177;
  --pastel-blush: 255, 218, 226;
  --pastel-lavender: 219, 196, 255;
  --pastel-bg-1: rgba(255, 230, 240, 0.10);
  --pastel-bg-2: rgba(255, 210, 225, 0.05);
  --pastel-bg-3: rgba(255, 220, 235, 0.07);
  --pastel-border: 0.28;
  --pastel-blur: 20px;
  --pastel-volumetric:
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.45),
    0 8px 32px -8px rgba(244, 143, 177, 0.12),
    0 2px 8px -2px rgba(0, 0, 0, 0.2);
  --pastel-volumetric-hover:
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.55),
    0 12px 40px -8px rgba(244, 143, 177, 0.18),
    0 4px 12px -2px rgba(0, 0, 0, 0.25);
  --pastel-transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    background 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ─── Pastel Glass Navbar ─── */
.pastel-nav {
  position: relative;
  background: linear-gradient(180deg, var(--pastel-bg-1), var(--pastel-bg-2));
  backdrop-filter: blur(var(--pastel-blur)) saturate(180%) contrast(105%);
  -webkit-backdrop-filter: blur(var(--pastel-blur)) saturate(180%) contrast(105%);
  border-bottom: 1px solid rgba(var(--pastel-pink), var(--pastel-border));
  box-shadow: var(--pastel-volumetric);
  transition: var(--pastel-transition);
}
.pastel-nav::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(var(--pastel-blush), 0.3) 20%,
    rgba(var(--pastel-pink), 0.6) 50%,
    rgba(var(--pastel-blush), 0.3) 80%,
    transparent 100%
  );
  z-index: 3;
  pointer-events: none;
}
.pastel-nav::after {
  content: '';
  position: absolute;
  bottom: -24px;
  left: 0;
  right: 0;
  height: 24px;
  background: linear-gradient(to bottom, rgba(6, 10, 8, 0.4), transparent);
  pointer-events: none;
  z-index: -1;
}
.pastel-nav.scrolled {
  background: linear-gradient(180deg, var(--pastel-bg-1), rgba(var(--pastel-blush), 0.04));
  box-shadow: var(--pastel-volumetric);
}
@supports not (backdrop-filter: blur(20px)) {
  .pastel-nav { background: rgba(8, 7, 10, 0.95); }
  .pastel-nav::before { display: none; }
  .pastel-nav::after { display: none; }
}
@media (max-width: 640px) {
  .pastel-nav::after { display: none; }
}

/* ─── Pastel Glass Pill (desktop nav container) ─── */
.pastel-pill {
  position: relative;
  background: linear-gradient(
    var(--glass-bg-angle, 135deg),
    var(--pastel-bg-1) 0%,
    var(--pastel-bg-2) 50%,
    var(--pastel-bg-3) 100%
  );
  backdrop-filter: blur(var(--pastel-blur)) saturate(180%) contrast(105%);
  -webkit-backdrop-filter: blur(var(--pastel-blur)) saturate(180%) contrast(105%);
  border: 1px solid rgba(var(--pastel-pink), var(--pastel-border));
  border-radius: 9999px;
  box-shadow: var(--pastel-volumetric);
  overflow: hidden;
  transition: var(--pastel-transition);
}
.pastel-pill::before {
  content: '';
  position: absolute;
  top: 0;
  left: 12%;
  right: 12%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(var(--pastel-blush), 0.5) 30%,
    rgba(var(--pastel-pink), 0.8) 50%,
    rgba(var(--pastel-blush), 0.5) 70%,
    transparent 100%
  );
  z-index: 3;
  pointer-events: none;
}
.pastel-pill::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 50% 35% at var(--light-x, 50%) var(--light-y, 20%),
    rgba(var(--pastel-pink), 0.1) 0%,
    transparent 55%
  );
  pointer-events: none;
  z-index: 1;
}
.pastel-pill > * {
  position: relative;
  z-index: 2;
}
.pastel-pill:hover {
  box-shadow: var(--pastel-volumetric-hover);
  border-color: rgba(var(--pastel-pink), 0.4);
}
.pastel-pill:active {
  transform: scale(0.97);
  box-shadow:
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.4),
    inset 0 -2px 6px 0 rgba(0, 0, 0, 0.2),
    0 8px 20px -6px rgba(0, 0, 0, 0.3);
}
@supports not (backdrop-filter: blur(16px)) {
  .pastel-pill { background: rgba(13, 13, 13, 0.9); }
}

/* ─── Pastel Pill Sliding Indicator ─── */
.pastel-pill-indicator {
  position: absolute;
  background: linear-gradient(
    135deg,
    rgba(var(--pastel-pink), 0.18) 0%,
    rgba(var(--pastel-rose), 0.12) 100%
  );
  border-radius: 9999px;
  transition: all 0.3s ease-out;
  pointer-events: none;
}
.pastel-pill-indicator::before {
  content: '';
  position: absolute;
  top: 0;
  left: 15%;
  right: 15%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(var(--pastel-pink), 0.4) 30%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(var(--pastel-pink), 0.4) 70%,
    transparent 100%
  );
}

/* ─── Pastel Nav Link ─── */
.pastel-nav-link {
 position: relative;
 padding: 0.375rem 1rem;
 font-size: 0.875rem;
 font-weight: 500;
 border-radius: 9999px;
 color: rgba(255, 255, 255, 0.6);
 transition: color 0.3s ease;
 text-decoration: none;
 z-index: 2;
}
.pastel-nav-link:hover {
  color: rgba(255, 255, 255, 0.9);
}
.pastel-nav-link.active {
  color: rgba(var(--pastel-blush), 1);
}

/* ─── Pastel Search Button (closed) ─── */
.pastel-search-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 14px;
  position: relative;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.5);
 background: linear-gradient(135deg, var(--pastel-bg-1), var(--pastel-bg-2));
  border: 1px solid rgba(var(--pastel-pink), var(--pastel-border));
  backdrop-filter: blur(var(--pastel-blur)) saturate(180%) contrast(105%);
  -webkit-backdrop-filter: blur(var(--pastel-blur)) saturate(180%) contrast(105%);
  box-shadow: var(--pastel-volumetric);
  transition: var(--pastel-transition);
  cursor: pointer;
  font-size: 0.875rem;
}
.pastel-search-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 15%;
  right: 15%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(var(--pastel-blush), 0.3) 25%,
    rgba(var(--pastel-pink), 0.5) 50%,
    rgba(var(--pastel-blush), 0.3) 75%,
    transparent 100%
  );
  z-index: 2;
  pointer-events: none;
}
.pastel-search-btn:hover {
  color: rgba(255, 255, 255, 0.75);
  border-color: rgba(var(--pastel-pink), 0.4);
  box-shadow: var(--pastel-volumetric-hover);
}
.pastel-search-btn:active {
  transform: scale(0.96);
}

/* ─── Pastel Search Input (open) ─── */
.pastel-search-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 300px;
  padding: 0.5rem 0.75rem 0.5rem 1rem;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(var(--pastel-blur)) saturate(180%) contrast(105%);
  -webkit-backdrop-filter: blur(var(--pastel-blur)) saturate(180%) contrast(105%);
  background: linear-gradient(135deg, var(--pastel-bg-1), var(--pastel-bg-2));
  border: 1px solid rgba(var(--pastel-pink), var(--pastel-border));
  box-shadow: var(--pastel-volumetric);
  animation: pastel-search-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  transition: var(--pastel-transition);
}
.pastel-search-wrap::before {
  content: '';
  position: absolute;
  top: 0;
  left: 8%;
  right: 8%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(var(--pastel-blush), 0.3) 20%,
    rgba(var(--pastel-pink), 0.5) 45%,
    rgba(var(--pastel-lavender), 0.2) 55%,
    rgba(var(--pastel-blush), 0.3) 80%,
    transparent 100%
  );
  z-index: 3;
  pointer-events: none;
}
.pastel-search-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 60% 40% at var(--light-x, 50%) var(--light-y, 20%),
    rgba(var(--pastel-pink), 0.06) 0%,
    transparent 50%
  );
  pointer-events: none;
  z-index: 1;
}
.pastel-search-wrap > * {
  position: relative;
  z-index: 2;
}
.pastel-search-closing {
  animation: pastel-search-out 0.2s cubic-bezier(0.5, 0, 0.75, 0) forwards;
}
@keyframes pastel-search-in {
  from { opacity: 0; transform: scaleX(0.85) scaleY(0.9); transform-origin: right center; }
  to { opacity: 1; transform: scaleX(1) scaleY(1); transform-origin: right center; }
}
@keyframes pastel-search-out {
  from { opacity: 1; transform: scaleX(1) scaleY(1); transform-origin: right center; }
  to { opacity: 0; transform: scaleX(0.85) scaleY(0.9); transform-origin: right center; }
}
.pastel-search-wrap:focus-within {
  box-shadow:
    0 0 0 3px rgba(var(--pastel-pink), 0.15),
    var(--pastel-volumetric);
  border-color: rgba(var(--pastel-pink), 0.45);
}
.pastel-search-input {
  flex: 1;
  min-width: 0;
  background: transparent;
  font-size: 0.875rem;
  color: white;
  outline: none;
}
.pastel-search-input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

/* ─── Pastel Search Dropdown ─── */
.pastel-search-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  left: auto;
  width: 360px;
  border-radius: 20px;
  overflow: hidden;
  z-index: 50;
  backdrop-filter: blur(var(--pastel-blur)) saturate(180%) contrast(105%);
  -webkit-backdrop-filter: blur(var(--pastel-blur)) saturate(180%) contrast(105%);
  background: linear-gradient(
    135deg,
    rgba(20, 16, 22, 0.90) 0%,
    rgba(14, 12, 16, 0.95) 100%
  );
  border: 1px solid rgba(var(--pastel-pink), 0.18);
  box-shadow:
    0 16px 48px -12px rgba(244, 143, 177, 0.15),
    0 4px 16px -4px rgba(0, 0, 0, 0.3);
  animation: pastel-drop-in 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.pastel-search-dropdown::before {
  content: '';
  position: absolute;
  top: 0;
  left: 8%;
  right: 8%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(var(--pastel-blush), 0.25) 20%,
    rgba(var(--pastel-pink), 0.35) 45%,
    rgba(var(--pastel-lavender), 0.15) 55%,
    rgba(var(--pastel-blush), 0.25) 80%,
    transparent 100%
  );
  z-index: 3;
  pointer-events: none;
}
.pastel-search-closing .pastel-search-dropdown {
  animation: pastel-drop-out 0.15s cubic-bezier(0.5, 0, 0.75, 0) forwards;
}
@keyframes pastel-drop-in {
  from { opacity: 0; transform: translateY(-6px) scaleY(0.96); }
  to { opacity: 1; transform: translateY(0) scaleY(1); }
}
@keyframes pastel-drop-out {
  from { opacity: 1; transform: translateY(0) scaleY(1); }
  to { opacity: 0; transform: translateY(-4px) scaleY(0.97); }
}
.pastel-search-result {
  width: 100%;
  text-align: left;
  padding: 0.6rem 0.75rem;
  border-radius: 12px;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.75);
  transition: background 0.15s ease;
  cursor: pointer;
}
.pastel-search-result:hover,
.pastel-search-result-active {
  background: rgba(var(--pastel-pink), 0.08);
  backdrop-filter: blur(10px);
}

/* ─── Pastel Mobile Floating Bar ─── */
.pastel-mobile-bar {
  display: inline-flex;
  align-items: center;
  width: 150px;
  border-radius: 9999px;
  background: linear-gradient(
    135deg,
    rgba(var(--pastel-pink), 0.12) 0%,
    rgba(var(--pastel-rose), 0.06) 100%
  );
  border: 1px solid rgba(var(--pastel-pink), var(--pastel-border));
  backdrop-filter: blur(var(--pastel-blur)) saturate(180%) contrast(105%);
  -webkit-backdrop-filter: blur(var(--pastel-blur)) saturate(180%) contrast(105%);
  box-shadow:
    0 8px 32px -8px rgba(var(--pastel-rose), 0.15),
    0 2px 8px -2px rgba(0, 0, 0, 0.2);
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s ease, border-color 0.3s ease;
  position: relative;
  overflow: hidden;
}
.pastel-mobile-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 15%;
  right: 15%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(var(--pastel-blush), 0.4) 25%,
    rgba(var(--pastel-pink), 0.7) 50%,
    rgba(var(--pastel-blush), 0.4) 75%,
    transparent 100%
  );
  z-index: 2;
  pointer-events: none;
}
.pastel-mobile-bar::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 50% 35% at 30% 20%,
    rgba(var(--pastel-pink), 0.08) 0%,
    transparent 55%
  );
  pointer-events: none;
  z-index: 1;
}
.pastel-mobile-bar > * {
  position: relative;
  z-index: 2;
}
.pastel-mobile-bar button {
  -webkit-appearance: none;
  appearance: none;
  border: none !important;
  background: transparent !important;
  outline: none !important;
  box-shadow: none !important;
  -webkit-tap-highlight-color: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
.pastel-mobile-bar input {
  -webkit-appearance: none;
  appearance: none;
  border: none !important;
  background: transparent !important;
  outline: none !important;
  box-shadow: none !important;
}
.pastel-mobile-bar.expanded {
  width: calc(100vw - 2rem);
  border-radius: 16px;
}
.pastel-mobile-bar .pastel-mobile-input-wrap {
  flex: 0 1 auto;
  transition: flex 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.pastel-mobile-bar .pastel-mobile-input-wrap input {
  width: 70px;
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.3s ease;
}
.pastel-mobile-bar.expanded .pastel-mobile-input-wrap {
  flex: 1 1 0%;
}
.pastel-mobile-bar.expanded .pastel-mobile-input-wrap input {
  width: 100%;
}
.pastel-mobile-bar:focus-within {
  box-shadow:
    0 8px 40px -4px rgba(var(--pastel-rose), 0.25),
    0 2px 8px -2px rgba(0, 0, 0, 0.3);
  border-color: rgba(var(--pastel-pink), 0.45);
}

/* ─── Pastel Mobile Search Results ─── */
.pastel-mobile-results {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(20, 16, 22, 0.92) 0%,
    rgba(14, 12, 16, 0.96) 100%
  );
  backdrop-filter: blur(16px) saturate(180%) contrast(105%);
  -webkit-backdrop-filter: blur(16px) saturate(180%) contrast(105%);
  border: 1px solid rgba(var(--pastel-pink), 0.18);
  border-radius: 20px;
  box-shadow:
    0 16px 48px -12px rgba(var(--pastel-rose), 0.12),
    0 4px 16px -4px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.pastel-mobile-results::before {
  content: "";
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(var(--pastel-blush), 0.2) 20%,
    rgba(var(--pastel-pink), 0.3) 45%,
    rgba(var(--pastel-lavender), 0.1) 55%,
    rgba(var(--pastel-blush), 0.2) 80%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 3;
}

/* ─── Pastel Mobile Fullscreen Menu ─── */
.pastel-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  visibility: hidden;
  transition: visibility 0s linear 0.35s;
}
.pastel-menu-overlay.pastel-menu-open {
  pointer-events: auto;
  visibility: visible;
  transition: visibility 0s linear 0s;
}
.pastel-menu-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  opacity: 0;
  transition: opacity 0.35s ease;
}
.pastel-menu-open .pastel-menu-backdrop {
  opacity: 1;
}
.pastel-menu-content {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(16, 14, 20, 0.96) 0%,
    rgba(12, 10, 14, 0.98) 100%
  );
  backdrop-filter: blur(20px) saturate(200%) brightness(105%);
  -webkit-backdrop-filter: blur(20px) saturate(200%) brightness(105%);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 0 1.5rem;
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}
.pastel-menu-open .pastel-menu-content {
  transform: translateY(0);
  opacity: 1;
}
.pastel-menu-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 15%;
  right: 15%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(var(--pastel-blush), 0.2) 20%,
    rgba(var(--pastel-pink), 0.4) 50%,
    rgba(var(--pastel-blush), 0.2) 80%,
    transparent 100%
  );
  pointer-events: none;
}

/* Close button */
.pastel-menu-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(var(--pastel-pink), var(--pastel-border));
  background: linear-gradient(135deg, var(--pastel-bg-1), var(--pastel-bg-2));
  backdrop-filter: blur(var(--pastel-blur)) saturate(180%) contrast(105%);
  -webkit-backdrop-filter: blur(var(--pastel-blur)) saturate(180%) contrast(105%);
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: var(--pastel-transition);
  box-shadow: var(--pastel-volumetric);
}
.pastel-menu-close:hover {
  background: rgba(var(--pastel-pink), 0.12);
  border-color: rgba(var(--pastel-pink), 0.4);
  color: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
}
.pastel-menu-close:active {
  transform: scale(0.95);
}

/* Links container */
.pastel-menu-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  max-width: 400px;
  padding-top: 4rem;
}
.pastel-menu-user {
  margin-bottom: 2rem;
  opacity: 0;
  animation: pastel-menu-item-in 0.4s ease forwards;
  animation-delay: 0ms;
}
.pastel-menu-nav {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.pastel-menu-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.25rem;
  border-radius: 16px;
  font-size: 1.05rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
  opacity: 0;
  animation: pastel-menu-item-in 0.4s ease forwards;
}
.pastel-menu-link:hover {
  color: rgba(255, 255, 255, 1);
  background: rgba(var(--pastel-pink), 0.06);
  border-color: rgba(var(--pastel-pink), 0.12);
}
.pastel-menu-link.active {
  color: rgba(var(--pastel-blush), 1);
  background: rgba(var(--pastel-pink), 0.1);
  border-color: rgba(var(--pastel-pink), 0.2);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
.pastel-menu-link-secondary {
  margin-top: 0.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(var(--pastel-pink), 0.08);
  color: rgba(255, 255, 255, 0.4);
}
.pastel-menu-link-secondary:hover {
  color: rgba(255, 255, 255, 0.6);
}
.pastel-menu-cta {
  width: 100%;
  margin-top: 2rem;
  padding-bottom: 2rem;
  opacity: 0;
  animation: pastel-menu-item-in 0.4s ease forwards;
}
.pastel-menu-cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.85rem 1.5rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a2040;
  background: linear-gradient(
    180deg,
    rgba(var(--pastel-blush), 0.85) 0%,
    rgba(var(--pastel-pink), 0.9) 100%
  );
  border: 1px solid rgba(var(--pastel-pink), 0.35);
  box-shadow:
    0 4px 20px -4px rgba(var(--pastel-rose), 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
  transition: all 0.2s ease;
  text-decoration: none;
}
.pastel-menu-cta-btn:hover {
  box-shadow:
    0 8px 28px -4px rgba(var(--pastel-rose), 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.45);
  transform: translateY(-1px);
}
.pastel-menu-cta-btn:active {
  transform: translateY(0) scale(0.98);
}
@keyframes pastel-menu-item-in {
  0% {
    opacity: 0;
    transform: translateY(16px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ─── Light mode adjustments ─── */
html:not(.dark) .pastel-nav {
  background: linear-gradient(180deg, rgba(255, 240, 245, 0.85), rgba(255, 235, 242, 0.75));
  border-bottom-color: rgba(var(--pastel-pink), 0.2);
  box-shadow:
    inset 0 -1px 0 rgba(255, 255, 255, 0.6),
    0 4px 16px -4px rgba(var(--pastel-rose), 0.1);
}
html:not(.dark) .pastel-pill {
  background: linear-gradient(135deg, rgba(255, 240, 245, 0.7), rgba(255, 230, 240, 0.5));
  border-color: rgba(var(--pastel-pink), 0.2);
}
html:not(.dark) .pastel-search-btn {
  background: linear-gradient(135deg, rgba(255, 240, 245, 0.6), rgba(255, 230, 240, 0.4));
  border-color: rgba(var(--pastel-pink), 0.18);
  color: rgba(30, 20, 25, 0.5);
}
html:not(.dark) .pastel-search-btn:hover {
  color: rgba(30, 20, 25, 0.75);
}
html:not(.dark) .pastel-mobile-bar {
  background: linear-gradient(135deg, rgba(255, 240, 245, 0.8), rgba(255, 230, 240, 0.6));
  border-color: rgba(var(--pastel-pink), 0.2);
  box-shadow:
    0 8px 32px -4px rgba(var(--pastel-rose), 0.08),
    0 2px 8px -2px rgba(0, 0, 0, 0.06);
}
html:not(.dark) .pastel-mobile-bar:focus-within {
  box-shadow:
    0 8px 40px -4px rgba(var(--pastel-rose), 0.15),
    0 2px 8px -2px rgba(0, 0, 0, 0.08);
}
html:not(.dark) .pastel-mobile-results {
  background: linear-gradient(
    180deg,
    rgba(255, 245, 248, 0.98) 0%,
    rgba(255, 242, 246, 0.99) 100%
  );
  border-color: rgba(var(--pastel-pink), 0.15);
  box-shadow: 0 -8px 40px -8px rgba(var(--pastel-rose), 0.08);
}
html:not(.dark) .pastel-menu-backdrop {
  background: rgba(255, 240, 245, 0.5);
}
html:not(.dark) .pastel-menu-content {
  background: linear-gradient(
    180deg,
    rgba(255, 245, 248, 0.97) 0%,
    rgba(255, 240, 245, 0.99) 100%
  );
}
html:not(.dark) .pastel-menu-content::before {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(var(--pastel-rose), 0.1) 20%,
    rgba(var(--pastel-pink), 0.2) 50%,
    rgba(var(--pastel-rose), 0.1) 80%,
    transparent 100%
  );
}
html:not(.dark) .pastel-menu-close {
  border-color: rgba(var(--pastel-pink), 0.15);
  background: rgba(var(--pastel-pink), 0.08);
  color: rgba(0, 0, 0, 0.5);
}
html:not(.dark) .pastel-menu-close:hover {
  background: rgba(var(--pastel-pink), 0.15);
  color: rgba(0, 0, 0, 0.8);
}
html:not(.dark) .pastel-menu-link {
  color: rgba(30, 20, 25, 0.7);
}
html:not(.dark) .pastel-menu-link:hover {
  color: rgba(30, 20, 25, 0.95);
  background: rgba(var(--pastel-pink), 0.08);
  border-color: rgba(var(--pastel-pink), 0.12);
}
html:not(.dark) .pastel-menu-link.active {
  color: rgba(180, 60, 100, 0.95);
  background: rgba(var(--pastel-pink), 0.12);
  border-color: rgba(var(--pastel-pink), 0.2);
}
html:not(.dark) .pastel-menu-link-secondary {
  border-top-color: rgba(var(--pastel-pink), 0.1);
  color: rgba(30, 20, 25, 0.4);
}
html:not(.dark) .pastel-menu-link-secondary:hover {
  color: rgba(30, 20, 25, 0.65);
}
'''

# Read the globals.css file
with open('/home/z/my-project/src/app/globals.css', 'r') as f:
    content = f.read()

# Insert before the "Reduce motion" section
marker = '/* ─── Reduce motion (user toggle & system) ── */'
if marker not in content:
    print('ERROR: Marker not found!')
    exit(1)

idx = content.index(marker)
new_content = content[:idx] + PASTEL_CSS + '\n' + content[idx:]

with open('/home/z/my-project/src/app/globals.css', 'w') as f:
    f.write(new_content)

print(f'Successfully inserted {len(PASTEL_CSS.splitlines())} lines of pastel CSS')
print(f'New file size: {len(new_content.splitlines())} lines')
