"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";

interface CoverImageZoomProps {
  src: string;
  alt: string;
}

export function CoverImageZoom({ src, alt }: CoverImageZoomProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = useCallback(() => setIsOpen(true), []);
  const closeLightbox = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeLightbox]);

  return (
    <>
      {/* Cover image with hover icon */}
      <div
        className="cover-zoom-wrapper"
        onClick={openLightbox}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openLightbox();
        }}
        data-scroll-reveal
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 768px"
          priority
        />
        <div className="cover-zoom-overlay">
          <Maximize2 className="cover-zoom-icon" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="cover-lightbox-backdrop"
          onClick={closeLightbox}
        >
          <button
            className="cover-lightbox-close"
            onClick={closeLightbox}
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="cover-lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="cover-lightbox-img" />
          </div>
        </div>
      )}
    </>
  );
}
