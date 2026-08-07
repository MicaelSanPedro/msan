"use client";

import { useEffect, useState } from "react";
import { Link as ScrollLink } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".prose-custom h2, .prose-custom h3"))
      .map((elem) => ({
        id: elem.id,
        text: (elem as HTMLElement).innerText,
        level: Number(elem.tagName.charAt(1)),
      }));
    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    document.querySelectorAll(".prose-custom h2, .prose-custom h3").forEach((elem) => {
      observer.observe(elem);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-32 h-fit max-w-[240px] ml-auto p-6 rounded-2xl 
                    backdrop-blur-xl bg-white/[0.02] border border-white/[0.08]
                    shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-2 mb-4 text-white/40 uppercase tracking-widest text-[10px] font-bold">
        <ScrollLink className="w-3 h-3" />
        Conteúdo
      </div>
      <ul className="space-y-3">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={`text-sm transition-all duration-300 block hover:text-amber-300 ${
                activeId === heading.id
                  ? "text-amber-400 font-medium translate-x-1"
                  : "text-white/40"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
