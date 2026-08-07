"use client";

import { useEffect, useRef } from "react";

export function CyberCursor() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    if (typeof window === "undefined") return;
    initialized.current = true;

    /* ─── Detect primary touch device (phone/tablet, NOT touchscreen laptop) ─── */
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasFinePointer || !hasHover) return;

    /* ─── Colors (Dicas card style: cyan/teal) ─── */
    const DOT_COLOR = "rgba(103, 232, 249, 1)";          /* cyan-300 */
    const DOT_GLOW = "rgba(103, 232, 249, 0.6)";
    const RING_COLOR = "rgba(34, 211, 238, 0.6)";        /* cyan-400 */

    /* ─── Create cursor dot (small, snappy) ─── */
    const dot = document.createElement("div");
    dot.id = "cyber-dot";
    Object.assign(dot.style, {
      position: "fixed",
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "9999999",
      top: "0",
      left: "0",
      willChange: "transform",
      transform: "translate3d(-100px,-100px,0) translate(-50%,-50%)",
      background: DOT_COLOR,
      boxShadow: `0 0 6px 2px ${DOT_GLOW}, 0 0 14px 4px rgba(103,232,249,0.25)`,
      transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
    });
    document.body.appendChild(dot);

    /* ─── Create ring (link/button cursor) ─── */
    const ring = document.createElement("div");
    ring.id = "cyber-ring";
    Object.assign(ring.style, {
      position: "fixed",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "9999998",
      top: "0",
      left: "0",
      willChange: "transform, opacity",
      transform: "translate3d(-100px,-100px,0) translate(-50%,-50%)",
      border: `1.5px solid ${RING_COLOR}`,
      opacity: "0",
      transition: "width 0.25s cubic-bezier(0.23,1,0.32,1), height 0.25s cubic-bezier(0.23,1,0.32,1), opacity 0.2s ease, border-color 0.2s ease, background 0.2s ease",
    });
    document.body.appendChild(ring);

    /* ─── Create spotlight orb (Dicas card hover style) ─── */
    const orb = document.createElement("div");
    orb.id = "cyber-orb";
    Object.assign(orb.style, {
      position: "fixed",
      width: "400px",
      height: "400px",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "1",
      top: "0",
      left: "0",
      willChange: "transform, opacity",
      transform: "translate3d(-100px,-100px,0) translate(-50%,-50%)",
      opacity: "0",
      transition: "opacity 0.8s ease",
      background:
        "radial-gradient(circle at 50% 50%, rgba(103, 232, 249, 0.08) 0%, rgba(34, 211, 238, 0.04) 30%, rgba(103, 232, 249, 0.015) 50%, transparent 70%)",
    });
    document.body.appendChild(orb);

    /* ─── State ─── */
    const mouse = { x: -100, y: -100 };
    const dotPos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    const orbPos = { x: -100, y: -100 };
    let rafId = 0;
    let isHovering = false;
    let isVisible = false;
    let cursorHidden = false;

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    /* ─── Show/hide default cursor ONLY on document element ─── */
    /* This is safer than cursor:none on * because if JS fails,
       the default cursor still works everywhere */
    const hideNativeCursor = () => {
      if (cursorHidden) return;
      cursorHidden = true;
      document.documentElement.style.cursor = "none";
      document.body.style.cursor = "none";
    };

    const showNativeCursor = () => {
      if (!cursorHidden) return;
      cursorHidden = false;
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
    };

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
        hideNativeCursor();
      }
    };

    const handleLeave = () => {
      isVisible = false;
      orb.style.opacity = "0";
      showNativeCursor();
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
      hideNativeCursor();
    };

    /* ─── Link hover detection via event delegation ─── */
    const interactiveSelector = "a, button, [role=\"button\"], input, textarea, select, summary, [onclick], [tabindex]";

    const handleOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(interactiveSelector);
      if (t) {
        isHovering = true;
        dot.style.width = "3px";
        dot.style.height = "3px";
        dot.style.background = "rgba(34, 211, 238, 1)";
        dot.style.boxShadow = "0 0 8px 3px rgba(34,211,238,0.5), 0 0 18px 5px rgba(34,211,238,0.2)";
        ring.style.opacity = "1";
        ring.style.width = "40px";
        ring.style.height = "40px";
        ring.style.borderColor = "rgba(34, 211, 238, 0.5)";
        ring.style.background = "rgba(103, 232, 249, 0.04)";
      }
    };

    const handleOut = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(interactiveSelector);
      if (t) {
        isHovering = false;
        dot.style.width = "6px";
        dot.style.height = "6px";
        dot.style.background = DOT_COLOR;
        dot.style.boxShadow = `0 0 6px 2px ${DOT_GLOW}, 0 0 14px 4px rgba(103,232,249,0.25)`;
        ring.style.opacity = "0";
        ring.style.background = "transparent";
      }
    };

    /* ─── Animation loop ─── */
    const animate = () => {
      /* Dot: fast follow (snappy) */
      dotPos.x = lerp(dotPos.x, mouse.x, 0.4);
      dotPos.y = lerp(dotPos.y, mouse.y, 0.4);
      dot.style.transform = `translate3d(${dotPos.x}px,${dotPos.y}px,0) translate(-50%,-50%)`;

      /* Ring: medium follow (slight delay) */
      const ringLerp = isHovering ? 0.22 : 0.18;
      ringPos.x = lerp(ringPos.x, mouse.x, ringLerp);
      ringPos.y = lerp(ringPos.y, mouse.y, ringLerp);
      ring.style.transform = `translate3d(${ringPos.x}px,${ringPos.y}px,0) translate(-50%,-50%)`;

      /* Orb: slow follow (spotlight delay) */
      orbPos.x = lerp(orbPos.x, mouse.x, 0.07);
      orbPos.y = lerp(orbPos.y, mouse.y, 0.07);
      orb.style.transform = `translate3d(${orbPos.x}px,${orbPos.y}px,0) translate(-50%,-50%)`;

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
      showNativeCursor();
    };
  }, []);

  return null;
}
