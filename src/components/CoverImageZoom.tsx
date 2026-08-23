"use client";

import Image from "next/image";

interface CoverImageZoomProps {
  src: string;
  alt: string;
}

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="7 2 2 2 2 7" />
      <polyline points="17 2 22 2 22 7" />
      <polyline points="2 17 2 22 7 22" />
      <polyline points="22 17 22 22 17 22" />
    </svg>
  );
}

export function CoverImageZoom({ src, alt }: CoverImageZoomProps) {
  const handleClick = () => {
    const url = src.startsWith("/") ? `${window.location.origin}${src}` : src;
    window.open(url, "_blank");
  };

  return (
    <div
      className="cover-zoom-wrapper"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
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
        <ExpandIcon className="cover-zoom-icon" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}
