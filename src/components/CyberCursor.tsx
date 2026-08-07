"use client";

import { useEffect, useRef } from "react";

export function CyberCursor() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    if (typeof window === "undefined") return;
    initialized.current = true;

    /* ─── Detect primary touch device ─── */
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasFinePointer || !hasHover) return;

    /* ─── Colors ─── */
    const CYAN = "#67e8f9";
    const CYAN_GLOW = "rgba(103, 232, 249, 0.55)";
    const CYAN_DIM = "rgba(103, 232, 249, 0.7)";

    /* ─── SVG: wireframe arrow cursor with inner chevron cutout ─── */
    const arrowSVG = `
<svg width="22" height="24" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg"
     style="filter:drop-shadow(0 0 3px ${CYAN_GLOW}) drop-shadow(0 0 8px rgba(34,211,238,0.2))">
  <path fill-rule="evenodd" d="
    M 1.5 1.5
    L 1.5 24
    C 1.5 24, 8 18.5, 8.5 17.5
    L 13.5 24.5
    C 13.5 24.5, 16 22, 14.5 20
    L 9.5 14.5
    L 17 16
    C 17 16, 17 13.5, 14 13.5
    L 1.5 1.5 Z
    M 4.5 7.5
    L 4.5 15
    L 10 13.5
    L 13 17
    C 13 17, 12 16, 11.5 15.5
    L 8.5 12
    L 4.5 15
    L 4.5 7.5 Z
  " fill="${CYAN}" opacity="0.9"/>
</svg>`;

    /* ─── Create cursor element ─── */
    const cursor = document.createElement("div");
    cursor.id = "cyber-cursor";
    cursor.innerHTML = arrowSVG;
    Object.assign(cursor.style, {
      position: "fixed",
      width: "22px",
      height: "24px",
      pointerEvents: "none",
      zIndex: "9999999",
      top: "0",
      left: "0",
      willChange: "transform",
      transform: "translate3d(-100px,-100px,0)",
      transition: "opacity 0.12s ease",
    });
    document.body.appendChild(cursor);

    /* ─── Create circle (smaller than cursor, for interactive elements) ─── */
    const circle = document.createElement("div");
    circle.id = "cyber-circle";
    Object.assign(circle.style, {
      position: "fixed",
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "9999998",
      top: "0",
      left: "0",
      willChange: "transform, opacity",
      transform: "translate3d(-100px,-100px,0) translate(-50%,-50%)",
      border: `1.5px solid ${CYAN_DIM}`,
      boxShadow: `0 0 5px 1px rgba(103,232,249,0.15)`,
      background: "transparent",
      opacity: "0",
      transition: "opacity 0.15s ease",
    });
    document.body.appendChild(circle);

    /* ─── Create spotlight orb ─── */
    const orb = document.createElement("div");
    orb.id = "cyber-orb";
    Object.assign(orb.style, {
      position: "fixed",
      width: "500px",
      height: "500px",
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
        "radial-gradient(circle at 50% 50%, rgba(103, 232, 249, 0.12) 0%, rgba(34, 211, 238, 0.06) 25%, rgba(103, 232, 249, 0.03) 45%, transparent 65%)",
    });
    document.body.appendChild(orb);

    /* ─── State ─── */
    const mouse = { x: -100, y: -100 };
    const orbPos = { x: -100, y: -100 };
    let rafId = 0;
    let isVisible = false;
    let cursorHidden = false;

    /* ─── Inject style to hide native cursor ─── */
    const styleEl = document.createElement("style");
    styleEl.id = "cyber-cursor-hide";
    styleEl.textContent = `.cyber-cursor-active, .cyber-cursor-active *, .cyber-cursor-active *::before, .cyber-cursor-active *::after { cursor: none !important; }`;
    document.head.appendChild(styleEl);

    const hideNativeCursor = () => {
      if (cursorHidden) return;
      cursorHidden = true;
      document.documentElement.classList.add("cyber-cursor-active");
    };

    const showNativeCursor = () => {
      if (!cursorHidden) return;
      cursorHidden = false;
      document.documentElement.classList.remove("cyber-cursor-active");
    };

    /* ─── Mouse events ─── */
    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      cursor.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0)`;
      circle.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0) translate(-50%,-50%)`;
      if (!isVisible) {
        isVisible = true;
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
      cursor.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0)`;
      orbPos.x = mouse.x;
      orbPos.y = mouse.y;
      isVisible = true;
      orb.style.opacity = "1";
      hideNativeCursor();
    };

    /* ─── Hover detection ─── */
    const sel = "a, button, [role=\"button\"], input, textarea, select, summary, [onclick], [tabindex]";

    const handleOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(sel)) {
        cursor.style.opacity = "0";
        circle.style.opacity = "1";
      }
    };

    const handleOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(sel)) {
        cursor.style.opacity = "1";
        circle.style.opacity = "0";
      }
    };

    /* ─── Animation loop (orb only, with delay) ─── */
    const animate = () => {
      orbPos.x += (mouse.x - orbPos.x) * 0.06;
      orbPos.y += (mouse.y - orbPos.y) * 0.06;
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
      cursor.remove();
      circle.remove();
      orb.remove();
      styleEl.remove();
      showNativeCursor();
    };
  }, []);

  return null;
}
