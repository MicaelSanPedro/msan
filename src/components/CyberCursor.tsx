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
    const CYAN_DIM = "rgba(103, 232, 249, 0.7)";

    /* ─── Cursor: use the exact image ─── */
    /* Image is 54x46, tip hotspot at ~(4, 5) */
    const CURSOR_W = 38;
    const CURSOR_H = 32;
    const HOTSPOT_X = 3;
    const HOTSPOT_Y = 3;

    const cursor = document.createElement("div");
    cursor.id = "cyber-cursor";
    const img = document.createElement("img");
    img.src = "/cursor.png";
    img.alt = "";
    img.draggable = false;
    img.style.cssText = `width:${CURSOR_W}px;height:${CURSOR_H}px;display:block;pointer-events:none;filter:drop-shadow(0 0 3px rgba(103,232,249,0.5)) drop-shadow(0 0 8px rgba(34,211,238,0.2));`;
    cursor.appendChild(img);
    Object.assign(cursor.style, {
      position: "fixed",
      pointerEvents: "none",
      zIndex: "9999999",
      top: "0",
      left: "0",
      willChange: "transform",
      transform: `translate3d(-100px,-100px,0)`,
      transition: "opacity 0.12s ease",
    });
    document.body.appendChild(cursor);

    /* ─── Circle (smaller than cursor, for interactive elements) ─── */
    const circle = document.createElement("div");
    circle.id = "cyber-circle";
    Object.assign(circle.style, {
      position: "fixed",
      width: "16px",
      height: "16px",
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

    /* ─── Spotlight orb ─── */
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

    /* ─── Hide native cursor ─── */
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
      cursor.style.transform = `translate3d(${mouse.x - HOTSPOT_X}px,${mouse.y - HOTSPOT_Y}px,0)`;
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
      cursor.style.transform = `translate3d(${mouse.x - HOTSPOT_X}px,${mouse.y - HOTSPOT_Y}px,0)`;
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
