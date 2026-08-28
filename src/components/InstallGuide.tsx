"use client";

import { useState, useCallback } from "react";
import { Copy, Check, ChevronDown, ChevronUp, Terminal } from "lucide-react";

interface DistroInstall {
  name: string;
  color: string;
  tag: string;
  featured?: boolean;
  packages: string;
  commands: { label: string; cmd: string }[];
  note?: string;
}

const distros: DistroInstall[] = [
  {
    name: "CachyOS",
    color: "#00d4aa",
    tag: "Recomendado",
    featured: true,
    packages: "kitty fastfetch",
    commands: [
      { label: "Instalar", cmd: "sudo pacman -S kitty fastfetch" },
      { label: "Copiar configs", cmd: "cp -r kitty/* ~/.config/kitty/ && cp -r fastfetch/* ~/.config/fastfetch/" },
      { label: "Reiniciar Kitty", cmd: "kitty +kitten @ close-window --self" },
    ],
    note: "O CachyOS já vem com KDE Wayland otimizado. O Kitty funciona perfeito com aceleração GPU nativa.",
  },
  {
    name: "Arch Linux",
    color: "#1793d1",
    tag: "Base",
    packages: "kitty fastfetch",
    commands: [
      { label: "Instalar", cmd: "sudo pacman -S kitty fastfetch" },
      { label: "Copiar configs", cmd: "cp -r kitty/* ~/.config/kitty/ && cp -r fastfetch/* ~/.config/fastfetch/" },
    ],
  },
  {
    name: "Fedora",
    color: "#51a2da",
    tag: "RHEL",
    packages: "kitty fastfetch",
    commands: [
      { label: "Instalar", cmd: "sudo dnf install kitty fastfetch" },
      { label: "Copiar configs", cmd: "cp -r kitty/* ~/.config/kitty/ && cp -r fastfetch/* ~/.config/fastfetch/" },
    ],
  },
  {
    name: "Ubuntu",
    color: "#e95420",
    tag: "Debian",
    packages: "kitty fastfetch",
    commands: [
      { label: "Instalar", cmd: "sudo apt install kitty fastfetch" },
      { label: "Copiar configs", cmd: "cp -r kitty/* ~/.config/kitty/ && cp -r fastfetch/* ~/.config/fastfetch/" },
    ],
    note: "Se o pacote não for encontrado, instale via Snap: sudo snap install kitty",
  },
  {
    name: "Debian",
    color: "#a80030",
    tag: "Estável",
    packages: "kitty fastfetch",
    commands: [
      { label: "Habilitar backports", cmd: "echo 'deb http://deb.debian.org/debian bookworm-backports main contrib non-free' | sudo tee /etc/apt/sources.list.d/backports.list" },
      { label: "Atualizar", cmd: "sudo apt update" },
      { label: "Instalar", cmd: "sudo apt install -t bookworm-backports kitty fastfetch" },
      { label: "Copiar configs", cmd: "cp -r kitty/* ~/.config/kitty/ && cp -r fastfetch/* ~/.config/fastfetch/" },
    ],
    note: "No Debian, o Kitty geralmente precisa do repositório backports para ter a versão mais recente.",
  },
  {
    name: "NixOS",
    color: "#7e7eff",
    tag: "Declarativo",
    packages: "kitty fastfetch",
    commands: [
      { label: "Adicionar ao config", cmd: "programs.kitty.enable = true; programs.fastfetch.enable = true;" },
      { label: "Aplicar", cmd: "sudo nixos-rebuild switch" },
      { label: "Copiar temas (manual)", cmd: "cp -r kitty/* ~/.config/kitty/ && cp -r fastfetch/* ~/.config/fastfetch/" },
    ],
    note: "No NixOS, ative os programas no configuration.nix e depois substitua os arquivos de tema gerados aqui.",
  },
  {
    name: "Linux Mint",
    color: "#87cf3e",
    tag: "Ubuntu",
    packages: "kitty fastfetch",
    commands: [
      { label: "Instalar", cmd: "sudo apt install kitty fastfetch" },
      { label: "Copiar configs", cmd: "cp -r kitty/* ~/.config/kitty/ && cp -r fastfetch/* ~/.config/fastfetch/" },
    ],
  },
  {
    name: "Gentoo",
    color: "#54487a",
    tag: "Source",
    packages: "x11-terms/kitty app-misc/fastfetch",
    commands: [
      { label: "Instalar", cmd: "sudo emerge x11-terms/kitty app-misc/fastfetch" },
      { label: "Copiar configs", cmd: "cp -r kitty/* ~/.config/kitty/ && cp -r fastfetch/* ~/.config/fastfetch/" },
    ],
  },
  {
    name: "openSUSE",
    color: "#73ba25",
    tag: "SUSE",
    packages: "kitty fastfetch",
    commands: [
      { label: "Instalar", cmd: "sudo zypper install kitty fastfetch" },
      { label: "Copiar configs", cmd: "cp -r kitty/* ~/.config/kitty/ && cp -r fastfetch/* ~/.config/fastfetch/" },
    ],
  },
  {
    name: "Manjaro",
    color: "#35bf5c",
    tag: "Arch",
    packages: "kitty fastfetch",
    commands: [
      { label: "Instalar", cmd: "sudo pacman -S kitty fastfetch" },
      { label: "Copiar configs", cmd: "cp -r kitty/* ~/.config/kitty/ && cp -r fastfetch/* ~/.config/fastfetch/" },
    ],
    note: "Manjaro usa os mesmos pacotes do Arch. Comandos idênticos.",
  },
];

function CopyCmd({ cmd }: { cmd: string }) {
  const [copied, setCopied] = useState(false);
  const handle = useCallback(async () => {
    await navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [cmd]);
  return (
    <div
      className={`neo-input px-3 py-2.5 flex items-center gap-2.5 group cursor-pointer transition-all duration-200 ${
        copied ? "!shadow-[inset_3px_3px_6px_var(--neo-shadow-dark),inset_-3px_-3px_6px_var(--neo-shadow-light)]" : ""
      }`}
      onClick={handle}
    >
      <span className="text-[11px] font-mono text-white/50 flex-1 select-all leading-relaxed">{cmd}</span>
      <span className="shrink-0">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-white/15 group-hover:text-white/40 transition-colors" />
        )}
      </span>
    </div>
  );
}

function DistroCard({ distro, index }: { distro: DistroInstall; index: number }) {
  const [open, setOpen] = useState(distro.featured ? true : false);

  return (
    <div
      className={`transition-all duration-400 ${distro.featured ? "neo-glow" : "neo-flat"} overflow-hidden`}
      style={{
        animation: `fade-in-up 0.35s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.05}s both`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3.5 p-4 text-left transition-all duration-200 ${open ? "neo-pressed" : ""}`}
        style={{ borderRadius: "inherit" }}
      >
        <div
          className="neo-btn w-10 h-10 shrink-0 flex items-center justify-center text-[13px] font-black"
          style={{ color: distro.color }}
        >
          {distro.name.slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[13px] font-bold text-white/90">{distro.name}</h3>
            <span
              className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md"
              style={{
                color: distro.color,
                boxShadow: `inset 1px 1px 3px var(--neo-shadow-dark), inset -1px -1px 3px var(--neo-shadow-light)`,
              }}
            >
              {distro.tag}
            </span>

          </div>
          <p className="text-[11px] text-[var(--neo-text-dim)] mt-0.5 font-mono">{distro.packages}</p>
        </div>
        <div className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-[10px] transition-all duration-200 ${open ? "neo-pressed" : "neo-btn-sm"}`}>
          {open ? <ChevronUp className="w-4 h-4 text-[var(--neo-text-dim)]" /> : <ChevronDown className="w-4 h-4 text-[var(--neo-text-dim)]" />}
        </div>
      </button>

      <div
        className="grid transition-all duration-400 ease-in-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 space-y-2.5">
            <div className="space-y-2">
              {distro.commands.map((c, i) => (
                <div key={i} style={{ animation: open ? `fade-in-up 0.25s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.06}s both` : "none" }}>
                  <span className="text-[10px] text-[var(--neo-text-dim)] ml-1 mb-1 block uppercase tracking-wider font-semibold">{c.label}</span>
                  <CopyCmd cmd={c.cmd} />
                </div>
              ))}
            </div>
            {distro.note && (
              <p className="text-[10px] text-[var(--neo-text-dim)] ml-1 mt-1 leading-relaxed">{distro.note}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function InstallGuide() {
  return (
    <div className="space-y-6">
      <div className="neo-pressed p-4">
        <div className="flex items-start gap-3">
          <div className="neo-btn w-9 h-9 shrink-0 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-[13px] font-bold text-white/90">Como instalar e aplicar</h2>
            <p className="text-[11px] text-[var(--neo-text-dim)] mt-1 leading-relaxed">
              Baixe o <span className="text-white/60 font-medium">.zip</span> na aba Exportar, descompacte, e use os comandos da sua distro abaixo para copiar os configs pro lugar certo.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {distros.map((d, i) => (
          <DistroCard key={d.name} distro={d} index={i} />
        ))}
      </div>
    </div>
  );
}
