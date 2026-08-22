"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 400);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      type="button"
      className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-10 h-10 rounded-full
                 backdrop-blur-[24px] saturate-[200%] contrast-[105%]
                 bg-gradient-to-b from-white/[0.18] to-white/[0.05]
                 border border-white/30
                 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_16px_-4px_rgba(0,0,0,0.3)]
                 text-white/40 hover:text-emerald-300
                 hover:bg-white/[0.06] hover:border-white/[0.22]
                 active:scale-90
                 transition-all duration-300
                 ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"}`}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
