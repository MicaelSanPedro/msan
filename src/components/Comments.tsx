"use client";

import { useEffect, useRef } from "react";

interface CommentsProps {
  slug: string;
}

function getGiscusTheme(): string {
  if (typeof window === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

const GISCUS_CSS = `
  .giscus,
  .giscus-frame {
    width: 100% !important;
    max-width: 100% !important;
  }
  .giscus .giscus-box {
    border: none !important;
    border-radius: 0.75rem !important;
    background: transparent !important;
  }
  .giscus .comment,
  .giscus .comment-body,
  .giscus .comment-header,
  .giscus .comment-content,
  .giscus .reaction-group,
  .giscus .form-control {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    border-radius: 0.5rem !important;
  }
  .giscus .comment {
    border: none !important;
    padding: 0.75rem 0 !important;
  }
  .giscus .comment-body {
    padding: 0 !important;
  }
  .giscus .comment-header {
    padding: 0 !important;
    border: none !important;
  }
  .giscus .comment-content {
    padding: 0 !important;
  }
  .giscus .comment-action,
  .giscus .comment-actions {
    gap: 0.5rem !important;
  }
  .giscus .reaction-group {
    display: flex !important;
    gap: 0.25rem !important;
    padding: 0 !important;
  }
  .giscus .reaction-group .reaction-button {
    margin: 0 !important;
    border-radius: 0.5rem !important;
  }
  .giscus .form-control {
    padding: 0.75rem !important;
  }
  .giscus .giscus-footer {
    display: none !important;
  }
`;

export function Comments({ slug }: CommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    const theme = getGiscusTheme();

    function injectCSS() {
      setTimeout(() => {
        const iframe = containerRef.current?.querySelector(
          "iframe.giscus-frame"
        ) as HTMLIFrameElement | null;
        if (!iframe || !iframe.contentDocument) return;

        const style = iframe.contentDocument.createElement("style");
        style.textContent = GISCUS_CSS;
        iframe.contentDocument.head.appendChild(style);
      }, 1000);
    }

    if (scriptLoaded.current) {
      const iframe = containerRef.current?.querySelector(
        "iframe.giscus-frame"
      ) as HTMLIFrameElement | null;
      if (iframe) {
        iframe.contentWindow?.postMessage(
          { giscus: { setConfig: { theme } } },
          "https://giscus.app"
        );
        injectCSS();
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("data-repo", "MicaelSanPedro/techmate");
    script.setAttribute("data-repo-id", "R_kgDOSNS99g");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOSNS99s4C-O3q");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", "pt");
    script.setAttribute("data-loading", "lazy");

    containerRef.current?.appendChild(script);
    scriptLoaded.current = true;

    // Inject CSS after iframe loads
    script.addEventListener("load", injectCSS);

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const newTheme = getGiscusTheme();
      const iframe = containerRef.current?.querySelector(
        "iframe.giscus-frame"
      ) as HTMLIFrameElement | null;
      if (iframe) {
        iframe.contentWindow?.postMessage(
          { giscus: { setConfig: { theme: newTheme } } },
          "https://giscus.app"
        );
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
      if (containerRef.current) {
        const iframe = containerRef.current.querySelector("iframe.giscus-frame");
        if (iframe) iframe.remove();
      }
    };
  }, []);

  return (
    <section className="mt-12 sm:mt-16" id="comments">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400/20 to-amber-600/10 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-white/90 tracking-tight">
          Comentários
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      <div
        className="rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02]"
        style={{ minHeight: "120px" }}
      >
        <div ref={containerRef} />
      </div>

      <p className="text-[11px] text-white/25 mt-3 text-center">
        Comentários via GitHub Discussions —{" "}
        <a
          href="https://github.com/MicaelSanPedro/techmate/discussions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400/50 hover:text-amber-400/80 transition-colors"
        >
          ver todas as discussões
        </a>
      </p>
    </section>
  );
}
