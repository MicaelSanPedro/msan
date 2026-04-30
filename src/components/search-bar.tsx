"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar apps...",
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      window.location.href = `/busca?q=${encodeURIComponent(value.trim())}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="relative group">
        <Search
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
            isFocused ? "text-violet-400" : "text-zinc-500"
          }`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
        />
      </div>
    </form>
  );
}
