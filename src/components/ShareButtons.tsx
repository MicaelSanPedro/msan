"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Share2,
  Link2,
  Check,
  Twitter,
  MessageCircle,
  Send,
  Linkedin,
} from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

export function ShareButtons({ url, title, className = "" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "Twitter / X",
      icon: <Twitter className="w-4 h-4" />,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:bg-sky-500/15 hover:text-sky-300 hover:border-sky-500/30",
    },
    {
      label: "WhatsApp",
      icon: <MessageCircle className="w-4 h-4" />,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-emerald-500/15 hover:text-emerald-300 hover:border-emerald-500/30",
    },
    {
      label: "Telegram",
      icon: <Send className="w-4 h-4" />,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:bg-blue-500/15 hover:text-blue-300 hover:border-blue-500/30",
    },
    {
      label: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-blue-600/15 hover:text-blue-200 hover:border-blue-600/30",
    },
  ];

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  const toggleMenu = useCallback(() => {
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
      return;
    }
    if (open) {
      setOpen(false);
      return;
    }
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 8,
        left: Math.max(8, rect.right - 190),
      });
    }
    setOpen(true);
  }, [title, url, open]);

  /* Close on outside mousedown */
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      const t = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(t) && triggerRef.current && !triggerRef.current.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const dropdown = open
    ? createPortal(
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setOpen(false)} />
          <div
            ref={menuRef}
            className="fixed z-[9999] animate-fade-in"
            style={{ top: menuPos.top, left: menuPos.left }}
          >
            <div className="liquid-glass-panel flex flex-col gap-1 p-1.5 min-w-[180px]">
              <button
                onClick={copyLink}
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs text-white/70 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all"
                type="button"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
                {copied ? "Link copiado!" : "Copiar link"}
              </button>
              <div className="h-px bg-white/[0.06] mx-1 my-0.5" />
              {shareLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-white/70 border border-transparent transition-all ${link.color}`}
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </>,
        document.body
      )
    : null;

  return (
    <div className={`relative ${className}`}>
      <button
        ref={triggerRef}
        onClick={toggleMenu}
        className="inline-flex items-center gap-2 text-xs text-white/45 hover:text-emerald-300 transition-colors group"
        aria-label="Compartilhar"
        type="button"
      >
        <Share2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
        <span>Compartilhar</span>
      </button>
      {dropdown}
    </div>
  );
}
