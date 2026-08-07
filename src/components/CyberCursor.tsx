"use client";

import { useEffect, useRef } from "react";

export function CyberCursor() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    if (typeof window === "undefined") return;
    initialized.current = true;

    /* ─── Detect touch device ─── */
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    if (isTouch) return;

    /* ─── Colors ─── */
    const CURSOR_CORE = "rgba(129, 140, 248, 1)";       /* indigo-400 */
    const CURSOR_GLOW = "rgba(129, 140, 248, 0.5)";
    const RING_COLOR = "rgba(167, 139, 250, 0.7)";       /* violet-400 */

    /* ─── Create cursor dot ─── */
    const dot = document.createElement("div");
    dot.id = "cyber-dot";
    dot.style.cssText =
      "position:fixed;width:8px;height:8px;border-radius:50%;" +
      "pointer-events:none;z-index:9999999;" +
      "transform:translate3d(-200px,-200px,0) translate(-50%,-50%);" +
      "will-change:transform;top:0;left:0;" +
      `background:${CURSOR_CORE};` +
      `box-shadow:0 0 6px 2px ${CURSOR_GLOW}, 0 0 16px 4px rgba(129,140,248,0.2);` +
      "transition: width 0.2s ease, height 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;";
    document.body.appendChild(dot);

    /* ─── Create ring (link cursor) ─── */
    const ring = document.createElement("div");
    ring.id = "cyber-ring";
    ring.style.cssText =
      "position:fixed;width:36px;height:36px;border-radius:50%;" +
      "pointer-events:none;z-index:9999998;" +
      "transform:translate3d(-200px,-200px,0) translate(-50%,-50%);" +
      "will-change:transform,opacity,border-color,top:0;left:0;" +
      `border:1.5px solid ${RING_COLOR};` +
      "opacity:0;" +
      "transition: width 0.25s cubic-bezier(0.23,1,0.32,1), height 0.25s cubic-bezier(0.23,1,0.32,1), opacity 0.2s ease, border-color 0.2s ease, background 0.2s ease;";
    document.body.appendChild(ring);

    /* ─── Create spotlight orb (Dicas card style) ─── */
    const orb = document.createElement("div");
    orb.id = "cyber-orb";
    orb.style.cssText =
      "position:fixed;width:500px;height:500px;border-radius:50%;" +
      "pointer-events:none;z-index:999990;" +
      "transform:translate3d(-200px,-200px,0) translate(-50%,-50%);" +
      "will-change:transform;top:0;left:0;opacity:0;" +
      "transition: opacity 0.6s ease;" +
      `background:radial-gradient(circle at 50% 50%, rgba(129, 140, 248, 0.12) 0%, rgba(167, 139, 250, 0.06) 30%, rgba(139, 92, 246, 0.02) 55%, transparent 70%);`;
    document.body.appendChild(orb);

    /* ─── State ─── */
    const mouse = { x: -200, y: -200 };
    const dotPos = { x: -200, y: -200 };
    const ringPos = { x: -200, y: -200 };
    const orbPos = { x: -200, y: -200 };
    let rafId = 0;
    let isHovering = false;
    let isVisible = false;

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    /* ─── Mouse events ─── */
    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dotPos.x = mouse.x;
        dotPos.y = mouse.y;
        ringPos.x = mouse.x;
        ringPos.y = mouse.y;
        orbPos.x = mouse.x;
        orbPos.y = mouse.y;
        orb.style.opacity = "1";
      }
    };

    const handleLeave = () => {
      isVisible = false;
      orb.style.opacity = "0";
    };

    const handleEnter = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dotPos.x = mouse.x;
      dotPos.y = mouse.y;
      ringPos.x = mouse.x;
      ringPos.y = mouse.y;
      orbPos.x = mouse.x;
      orbPos.y = mouse.y;
      isVisible = true;
      orb.style.opacity = "1";
    };

    /* ─── Link hover detection via event delegation ─── */
    const handleOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("a, button, [role=\"button\"], input, textarea, select, summary, [onclick]");
      if (t) {
        isHovering = true;
        dot.style.width = "4px";
        dot.style.height = "4px";
        dot.style.background = "rgba(167, 139, 250, 1)";
        dot.style.boxShadow = "0 0 8px 3px rgba(167,139,250,0.5), 0 0 20px 6px rgba(167,139,250,0.2)";
        ring.style.opacity = "1";
        ring.style.width = "44px";
        ring.style.height = "44px";
        ring.style.borderColor = "rgba(167, 139, 250, 0.6)";
        ring.style.background = "rgba(139, 92, 246, 0.06)";
      }
    };

    const handleOut = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("a, button, [role=\"button\"], input, textarea, select, summary, [onclick]");
      if (t) {
        isHovering = false;
        dot.style.width = "8px";
        dot.style.height = "8px";
        dot.style.background = CURSOR_CORE;
        dot.style.boxShadow = `0 0 6px 2px ${CURSOR_GLOW}, 0 0 16px 4px rgba(129,140,248,0.2)`;
        ring.style.opacity = "0";
        ring.style.background = "transparent";
      }
    };

    /* ─── Hide default cursor globally ─── */
    const style = document.createElement("style");
    style.id = "cyber-cursor-style";
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    /* ─── Animation loop ─── */
    const animate = () => {
      /* Dot: fast follow (snappy) */
      dotPos.x = lerp(dotPos.x, mouse.x, 0.35);
      dotPos.y = lerp(dotPos.y, mouse.y, 0.35);
      dot.style.transform =
        `translate3d(${dotPos.x}px,${dotPos.y}px,0) translate(-50%,-50%)`;

      /* Ring: medium follow (slight delay) */
      const ringLerp = isHovering ? 0.2 : 0.15;
      ringPos.x = lerp(ringPos.x, mouse.x, ringLerp);
      ringPos.y = lerp(ringPos.y, mouse.y, ringLerp);
      ring.style.transform =
        `translate3d(${ringPos.x}px,${ringPos.y}px,0) translate(-50%,-50%)`;

      /* Orb: slow follow (spotlight delay) */
      orbPos.x = lerp(orbPos.x, mouse.x, 0.08);
      orbPos.y = lerp(orbPos.y, mouse.y, 0.08);
      orb.style.transform =
        `translate3d(${orbPos.x}px,${orbPos.y}px,0) translate(-50%,-50%)`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(rafId);
      dot.remove();
      ring.remove();
      orb.remove();
      style.remove();
    };
  }, []);

  return null;
}
