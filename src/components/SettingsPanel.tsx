"use client";

import { useState, useEffect, useRef } from "react";
import { Settings, User, Trash2, Moon, Sun, ChevronRight } from "lucide-react";
import { ToggleSlider } from "@/components/ToggleSlider";

const STORAGE_KEY = "techmate_username";
const THEME_KEY = "techmate_theme";

interface SettingsPanelProps {
  userName: string;
  onNameChange: (name: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ userName, onNameChange, isOpen, onClose }: SettingsPanelProps) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(userName);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showConfirm, setShowConfirm] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === "light") setTheme("light");
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  const handleSaveName = () => {
    const trimmed = newName.trim();
    if (!trimmed || trimmed === userName) {
      setEditing(false);
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, trimmed);
      window.dispatchEvent(new CustomEvent("techmate:username-set"));
      onNameChange(trimmed);
    } catch { /* ignore */ }
    setEditing(false);
  };

  const handleThemeToggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
      document.documentElement.classList.toggle("dark", next === "dark");
      const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
      if (meta) meta.content = next === "dark" ? "#060a08" : "#f0f5f2";
    } catch { /* ignore */ }
  };

  const handleClearData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(THEME_KEY);
    } catch { /* ignore */ }
    window.dispatchEvent(new CustomEvent("techmate:username-set"));
    onNameChange("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm sm:hidden"
        onClick={onClose}
      />
      <div ref={panelRef} className="settings-panel settings-panel-mobile">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-emerald-400/70" />
            <span className="text-sm font-semibold text-white/80">Configurações</span>
          </div>
          <span className="text-[10px] text-white/25 uppercase tracking-widest">TechMate</span>
        </div>

      <div className="settings-divider" />

      {/* Edit name */}
      <div className="px-4 py-3">
        {!editing ? (
          <button
            onClick={() => { setNewName(userName); setEditing(true); }}
            className="w-full flex items-center justify-between group"
            type="button"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center
                          bg-emerald-500/[0.08] border border-emerald-500/15">
                <User className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/40 mb-0.5">Nome</p>
                <p className="text-sm font-medium text-white/80">{userName || "--"}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
              maxLength={24}
              className="settings-input flex-1"
              placeholder="Novo nome..."
              autoComplete="off"
            />
            <button onClick={handleSaveName} className="settings-btn-sm" type="button">
              OK
            </button>
            <button onClick={() => setEditing(false)} className="settings-btn-sm settings-btn-cancel" type="button">
              X
            </button>
          </div>
        )}
      </div>

      <div className="settings-divider" />

      {/* Theme toggle */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border
                      ${theme === "dark"
                        ? "bg-indigo-500/[0.08] border-indigo-500/15"
                        : "bg-yellow-500/[0.08] border-yellow-500/15"}`}>
            {theme === "dark"
              ? <Moon className="w-4 h-4 text-indigo-400" />
              : <Sun className="w-4 h-4 text-yellow-400" />}
          </div>
          <div className="text-left">
            <p className="text-xs text-white/40 mb-0.5">Tema</p>
            <p className="text-sm font-medium text-white/80">
              {theme === "dark" ? "Escuro" : "Claro"}
            </p>
          </div>
        </div>
        <ToggleSlider checked={theme === "light"} onChange={() => handleThemeToggle()} variant="v3" aria-label="Alternar tema" />
      </div>

      <div className="settings-divider" />

      {/* Clear data */}
      <div className="px-4 py-3">
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full flex items-center justify-between group"
            type="button"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center
                          bg-red-500/[0.08] border border-red-500/15">
                <Trash2 className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/40 mb-0.5">Dados</p>
                <p className="text-sm font-medium text-white/80">Limpar tudo</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-red-400/50 transition-colors" />
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-red-400/80 px-11">Isso vai apagar seu nome e preferências.</p>
            <div className="flex gap-2 px-11">
              <button onClick={handleClearData} className="settings-btn-danger flex-1" type="button">
                Limpar
              </button>
              <button onClick={() => setShowConfirm(false)} className="settings-btn-sm settings-btn-cancel" type="button">
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
