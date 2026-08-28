"use client";

import { useStore } from "@/lib/store";
import { generateFastfetchConfig, generateKittyConfig } from "@/lib/generators";
import { Copy, Check, Download, FileJson, FileText, Archive } from "lucide-react";
import { useState, useCallback } from "react";
import JSZip from "jszip";

function CodeBlock({
  title,
  code,
  filename,
  icon,
}: {
  title: string;
  code: string;
  filename: string;
  icon: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [code, filename]);

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="neo-btn w-10 h-10 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="text-[13px] font-semibold text-white/85">{title}</h3>
            <span className="text-[11px] font-mono text-[var(--neo-text-dim)]">{filename}</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-4 py-2 text-[11px] font-medium transition-all duration-200 text-[var(--neo-text-dim)] hover:text-white/80 ${
              copied ? "neo-pressed" : "neo-btn-sm"
            }`
            }
          >
            {copied ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copied ? "Copiado!" : "Copiar"}
          </button>
          <button
            onClick={handleDownload}
            className="neo-btn-sm flex items-center gap-1.5 px-4 py-2 text-[11px] font-medium text-[var(--neo-text-dim)] hover:text-white/80 transition-all duration-300"
          >
            <Download className="w-3.5 h-3.5" />
            Baixar
          </button>
        </div>
      </div>

      {/* Code area - deep inset */}
      <div
        className="overflow-hidden"
        style={{
          borderRadius: "18px",
          boxShadow: "inset 5px 5px 14px var(--neo-shadow-dark), inset -5px -5px 14px var(--neo-shadow-light)",
        }}
      >
        <pre className="bg-[#0e0e1a] p-5 text-[11px] font-mono text-white/45 overflow-x-auto max-h-[360px] overflow-y-auto leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export function CodeExport() {
  const state = useStore();
  const [zipping, setZipping] = useState(false);

  const fastfetchCode = generateFastfetchConfig({
    enabledModules: state.enabledModules,
    selectedDistro: state.selectedDistro,
    username: state.username,
    hostname: state.hostname,
  });

  const kittyCode = generateKittyConfig(state.theme, !!state.wallpaper);

  const handleDownloadZip = useCallback(async () => {
    setZipping(true);
    const zip = new JSZip();
    const kittyFolder = zip.folder("kitty");
    kittyFolder?.file("kitty.conf", kittyCode);
    if (state.wallpaper) {
      const base64 = state.wallpaper.split(",")[1];
      if (base64) {
        kittyFolder?.file("wallpaper.png", base64, { base64: true });
      }
    }
    const ffFolder = zip.folder("fastfetch");
    ffFolder?.file("config.jsonc", fastfetchCode);
    zip.file(
      "INSTALL.txt",
      `Terminal Rice Studio - Como instalar
====================================

1. Descompacte este zip
2. Copie a pasta "kitty" para: ~/.config/kitty/
   cp -r kitty/* ~/.config/kitty/
3. Copie a pasta "fastfetch" para: ~/.config/fastfetch/
   cp -r fastfetch/* ~/.config/fastfetch/
4. Reinicie o Kitty (feche e abra de novo)

Se usou wallpaper, o arquivo wallpaper.png ja esta na pasta kitty.
O kitty.conf referencia ele como caminho relativo.

Arch:  sudo pacman -S kitty fastfetch
Debian: sudo apt install kitty fastfetch
`
    );
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "terminal-rice-configs.zip";
    a.click();
    URL.revokeObjectURL(url);
    setZipping(false);
  }, [fastfetchCode, kittyCode, state.wallpaper]);

  return (
    <div className="space-y-8">
      <div className="neo-pressed p-3.5">
        <p className="text-[11px] text-[var(--neo-text-dim)] leading-relaxed">
          <span className="text-amber-400 font-medium">config.jsonc</span> funciona em qualquer terminal. <span className="text-cyan-400 font-medium">kitty.conf</span> só funciona no Kitty — outros terminais vão ignorar.
        </p>
      </div>

      {/* Download all as zip */}
      <button
        onClick={handleDownloadZip}
        disabled={zipping}
        className={`w-full flex items-center justify-center gap-3 py-4 text-[13px] font-semibold text-[var(--neo-text-dim)] hover:text-white/90 transition-all duration-200 disabled:opacity-50 ${
          zipping ? "neo-pressed" : "neo-flat hover:shadow-[10px_10px_25px_var(--neo-shadow-dark),-10px_-10px_25px_var(--neo-shadow-light)]"
        }`}
      >
        <div className="neo-btn-sm w-9 h-9 flex items-center justify-center">
          <Archive className="w-4 h-4" />
        </div>
        {zipping ? "Compactando..." : "Baixar tudo (.zip)"}
      </button>

      <CodeBlock
        title="Configuração do Fastfetch"
        code={fastfetchCode}
        filename="config.jsonc"
        icon={<FileJson className="w-4 h-4 text-amber-400" />}
      />
      <CodeBlock
        title="Configuração do Kitty"
        code={kittyCode}
        filename="kitty.conf"
        icon={<FileText className="w-4 h-4 text-cyan-400" />}
      />
    </div>
  );
}
