"use client";

import { useStore } from "@/lib/store";
import { fastfetchModules, distroOptions } from "@/lib/fastfetch-modules";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FastfetchConfig() {
  const { enabledModules, selectedDistro, username, hostname, toggleModule, setDistro, setUsername, setHostname } =
    useStore();

  return (
    <div className="space-y-8">
      {/* Distro Selection */}
      <div className="space-y-3">
        <Label className="text-[var(--neo-text-dim)] text-[11px] uppercase tracking-[0.15em] font-semibold flex items-center gap-2.5">
          <div className="neo-btn-sm w-2 h-2 bg-emerald-400" />
          Logo da Distribuição
        </Label>
        <Select value={selectedDistro} onValueChange={(v: string) => setDistro(v as typeof selectedDistro)}>
          <SelectTrigger className="neo-input h-11 text-white border-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="neo-raised border-none p-1.5">
            {distroOptions.map((d) => (
              <SelectItem
                key={d}
                value={d}
                className="rounded-[12px] text-white/70 focus:text-white focus:bg-white/[0.04] py-2 px-3 transition-all"
              >
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* User & Hostname */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label className="text-[var(--neo-text-dim)] text-[11px] uppercase tracking-[0.15em] font-semibold flex items-center gap-2.5">
            <div className="neo-btn-sm w-2 h-2 bg-blue-400" />
            Usuário
          </Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="neo-input h-11 text-white border-none focus:ring-0 focus:border-none"
            placeholder="user"
          />
        </div>
        <div className="space-y-3">
          <Label className="text-[var(--neo-text-dim)] text-[11px] uppercase tracking-[0.15em] font-semibold flex items-center gap-2.5">
            <div className="neo-btn-sm w-2 h-2 bg-amber-400" />
            Máquina
          </Label>
          <Input
            value={hostname}
            onChange={(e) => setHostname(e.target.value)}
            className="neo-input h-11 text-white border-none focus:ring-0 focus:border-none"
            placeholder="archlinux"
          />
        </div>
      </div>

      {/* Module toggles */}
      <div className="space-y-3.5">
        <p className="text-[var(--neo-text-dim)] text-[11px] uppercase tracking-[0.15em] font-semibold flex items-center gap-2.5">
          <div className="neo-btn-sm w-2 h-2 bg-purple-400" />
          Módulos de Informação
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {fastfetchModules.map((m, idx) => {
            const isActive = !!enabledModules[m.id];
            return (
              <button
                key={m.id}
                onClick={() => toggleModule(m.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-[16px] cursor-pointer transition-all duration-300 group text-left w-full
                  ${
                    isActive
                      ? "neo-pressed"
                      : "neo-flat"
                  }`
                }
                style={{
                  animation: `fade-in-up 0.35s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.04}s both`,
                }}
              >
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                      : ""
                  }`}
                  style={!isActive ? {
                    boxShadow: "inset 2px 2px 4px var(--neo-shadow-dark), inset -2px -2px 4px var(--neo-shadow-light)"
                  } : undefined}
                >
                  {isActive && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`flex-1 text-[13px] transition-colors duration-200 ${
                  isActive ? "text-white/90 font-medium" : "text-[var(--neo-text-dim)]"
                }`}>
                  {m.label}
                </span>
                <span className="text-[10px] font-mono text-[var(--neo-text-dim)]">
                  {m.key}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}