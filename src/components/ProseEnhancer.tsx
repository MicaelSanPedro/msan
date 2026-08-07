"use client";

import { useEffect } from "react";

function wrapPreWithCopyButton(pre: HTMLPreElement) {
  // Skip if already wrapped
  if (pre.parentElement?.classList.contains("pre-wrapper")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "pre-wrapper";

  // Insert wrapper before pre, then move pre inside
  pre.parentNode!.insertBefore(wrapper, pre);
  wrapper.appendChild(pre);

  // Create copy button (still reads code from pre)
  const btn = document.createElement("button");
  btn.className = "copy-btn";
  btn.type = "button";
  btn.setAttribute("aria-label", "Copiar código");
  btn.innerHTML = `
    <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
    <span class="copy-label">Copiar</span>
    <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span class="copied-label">Copiado!</span>
  `;

  btn.addEventListener("click", async () => {
    const code = pre.querySelector("code")?.textContent || pre.textContent || "";
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }

    btn.classList.add("copied");
    setTimeout(() => btn.classList.remove("copied"), 2000);
  });

  wrapper.appendChild(btn);
}

/**
 * Enhances prose-custom content:
 * - Wraps all <pre> code blocks in a relative div
 * - Adds copy button outside the scrollable area
 */
export function ProseEnhancer() {
  useEffect(() => {
    const container = document.querySelector(".prose-custom");
    if (!container) return;

    const pres = container.querySelectorAll<HTMLPreElement>("pre");

    pres.forEach((pre) => {
      wrapPreWithCopyButton(pre);
    });

    // Also detect new <pre> blocks added later (scroll-reveal, etc.)
    const observer = new MutationObserver(() => {
      const newPres = container.querySelectorAll<HTMLPreElement>("pre");
      newPres.forEach((pre) => {
        wrapPreWithCopyButton(pre);
      });
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
