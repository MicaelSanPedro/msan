"use client";

import { useEffect, useRef } from "react";
import type { LiquidGlass as LiquidGlassType } from "@ybouane/liquidglass";

export function LiquidGlassInit() {
  const instanceRef = useRef<LiquidGlassType | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    // Skip on server and during SSR hydration
    if (typeof window === "undefined") return;
    if (mountedRef.current) return;
    mountedRef.current = true;

    let destroyed = false;

    async function init() {
      // Wait for layout to be stable
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (destroyed) return;

      const root = document.body;
      const glassElements = root.querySelectorAll<HTMLElement>(".lg-glass");

      if (glassElements.length === 0) {
        // Retry after a short delay (page may still be loading)
        setTimeout(() => {
          if (destroyed) return;
          const retry = root.querySelectorAll<HTMLElement>(".lg-glass");
          if (retry.length > 0) doInit(root, retry);
        }, 1000);
        return;
      }

      doInit(root, glassElements);
    }

    async function doInit(root: HTMLElement, elements: NodeListOf<HTMLElement>) {
      try {
        const { LiquidGlass } = await import("@ybouane/liquidglass");
        if (destroyed) return;

        const instance = await LiquidGlass.init({
          root,
          glassElements: Array.from(elements),
          defaults: {
            blurAmount: 0.01,
            refraction: 0.55,
            chromAberration: 0.04,
            edgeHighlight: 0.10,
            specular: 0.20,
            fresnel: 0.85,
            distortion: 0.00,
            cornerRadius: 9999,
            zRadius: 32,
            opacity: 0.94,
            saturation: 0.04,
            tintStrength: 0.02,
            brightness: 0.02,
            shadowOpacity: 0.30,
            shadowSpread: 16,
            shadowOffsetY: 5,
            floating: false,
            button: false,
            bevelMode: 0,
          },
        });

        if (!destroyed) {
          instanceRef.current = instance;
        } else {
          instance.destroy();
        }
      } catch (err) {
        console.warn("LiquidGlass init failed:", err);
      }
    }

    init();

    return () => {
      destroyed = true;
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, []);

  // Re-init when pathname changes (page transitions may add/remove glass elements)
  useEffect(() => {
    return () => {
      // Cleanup on unmount/navigation
      instanceRef.current?.destroy();
      instanceRef.current = null;
      mountedRef.current = false;
    };
  }, []);

  return null;
}
