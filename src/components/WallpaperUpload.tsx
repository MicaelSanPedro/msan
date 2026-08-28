"use client";

import { useStore } from "@/lib/store";
import { ImageIcon, X, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";

export function WallpaperUpload() {
  const { wallpaper, setWallpaper } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setWallpaper(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [setWallpaper]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="neo-btn-sm w-8 h-8 flex items-center justify-center">
          <ImageIcon className="w-4 h-4 text-rose-400" />
        </div>
        <div>
          <p className="text-white/80 text-[13px] font-semibold">Wallpaper do Terminal</p>
          <p className="text-[11px] text-[var(--neo-text-dim)] mt-0.5">
            Exclusivo do Kitty. Outros terminais não suportam wallpaper via config.
          </p>
        </div>
      </div>

      {wallpaper ? (
        <div
          className="relative group overflow-hidden neo-flat p-1.5 transition-all duration-300 hover:shadow-[10px_10px_25px_var(--neo-shadow-dark),-10px_-10px_25px_var(--neo-shadow-light)]"
        >
          <div
            className="h-44 bg-cover bg-center rounded-[14px]"
            style={{ backgroundImage: `url('${wallpaper}')` }}
          />
          <div className="absolute inset-1.5 bg-black/60 backdrop-blur-sm rounded-[14px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
            <button
              onClick={() => inputRef.current?.click()}
              className="neo-btn flex items-center gap-2 px-4 py-2.5 text-white text-xs font-medium"
            >
              <Upload className="w-3.5 h-3.5" />
              Trocar
            </button>
            <button
              onClick={() => setWallpaper(null)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-rose-300 text-xs font-medium transition-all duration-200"
              style={{
                boxShadow: "inset 3px 3px 8px rgba(0,0,0,0.4), inset -3px -3px 8px rgba(60,20,20,0.3)",
              }}
            >
              <X className="w-3.5 h-3.5" />
              Remover
            </button>
          </div>
        </div>
      ) : (
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center h-44 rounded-[20px] cursor-pointer transition-all duration-400
            ${
              dragOver
                ? "animate-border-glow"
                : "neo-convex hover:shadow-[10px_10px_25px_var(--neo-shadow-dark),-10px_-10px_25px_var(--neo-shadow-light)]"
            }`
          }
        >
          <div className={`neo-btn w-14 h-14 flex items-center justify-center mb-4 transition-all duration-300 ${dragOver ? "!bg-emerald-500/20" : ""}`}>
            <Upload className={`w-6 h-6 transition-colors duration-300 ${dragOver ? "text-emerald-400" : "text-[var(--neo-text-dim)]"}`} />
          </div>
          <p className="text-[13px] text-[var(--neo-text-dim)] font-medium transition-colors duration-300">
            {dragOver ? "Solte a imagem aqui" : "Clique ou arraste uma imagem"}
          </p>
          <p className="text-[10px] text-[var(--neo-text-dim)] mt-1.5 uppercase tracking-wider">PNG, JPG, WebP</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
      )}
    </div>
  );
}
