"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export function DetailShareButton({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: name, url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl glass-light border border-white/[0.06] text-white/50 hover:text-white hover:border-white/10 text-sm font-medium transition-all duration-300 mt-3"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400">Link copiado!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          Compartilhar
        </>
      )}
    </button>
  );
}
