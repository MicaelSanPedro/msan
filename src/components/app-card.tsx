"use client";

import { useState } from "react";
import { Download, Check } from "lucide-react";
import { StarRating } from "@/components/star-rating";
import type { DownloadItem } from "@/data/downloads";

interface AppCardProps {
  item: DownloadItem;
}

export function AppCard({ item }: AppCardProps) {
  const [downloaded, setDownloaded] = useState(false);
  const rating = item.id % 2 === 0 ? 4.5 : 5;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (downloaded) return;
    setDownloaded(true);
  };

  const isWindows = item.platform.includes("Windows");
  const isMobile = item.platform.includes("Mobile");

  return (
    <a
      href={`/${item.category}/${item.id}`}
      className="group block bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/30 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.15)] hover:bg-white/[0.05] focus-ring"
    >
      {/* Top: Icon + Badges */}
      <div className="flex items-start gap-4 mb-4">
        {/* Squircle Icon */}
        <div
          className={`shrink-0 w-14 h-14 rounded-[20%] bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl shadow-lg`}
        >
          {item.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-lg truncate leading-tight">
            {item.name}
          </h3>
          <p className="text-sm text-zinc-400 truncate mt-0.5">
            {item.description}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-3">
        <StarRating rating={rating} size={14} />
      </div>

      {/* Platform badges + metadata */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          {isWindows && (
            <span className="inline-flex items-center gap-1 bg-white/5 rounded-full px-2 py-0.5 text-[10px] text-zinc-400 font-medium">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12V6.75l8-1.25V12H3zm10-6.75L21 4v8h-8V5.25zM3 13h8v6.5l-8-1.25V13zm10 0h8v7.5l-8-1.25V13z"/>
              </svg>
              Win
            </span>
          )}
          {isMobile && (
            <span className="inline-flex items-center gap-1 bg-white/5 rounded-full px-2 py-0.5 text-[10px] text-zinc-400 font-medium">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 1H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm-2 18H9v-1h6v1zm2-3H7V4h10v12z"/>
              </svg>
              Android
            </span>
          )}
        </div>
        <span className="text-xs text-zinc-500">
          v{item.version} &middot; {item.size}
        </span>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={downloaded}
        className={`w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
          downloaded
            ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/20"
            : "bg-violet-600 hover:bg-violet-500 text-white active:scale-[0.98]"
        }`}
      >
        {downloaded ? (
          <>
            <Check className="w-4 h-4" />
            Baixado!
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Baixar
          </>
        )}
      </button>
    </a>
  );
}
