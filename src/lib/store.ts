"use client";

import { create } from "zustand";
import { kittyPresets, type KittyTheme } from "./kitty-presets";

export type Distro = "Arch" | "Fedora" | "Debian" | "Ubuntu" | "NixOS" | "Mint" | "Gentoo";

const defaultTheme = kittyPresets[0];

interface StoreState {
  enabledModules: Record<string, boolean>;
  selectedDistro: Distro;
  username: string;
  hostname: string;
  theme: KittyTheme;
  wallpaper: string | null;

  toggleModule: (id: string) => void;
  setDistro: (d: Distro) => void;
  setUsername: (u: string) => void;
  setHostname: (h: string) => void;
  setThemeColor: (key: keyof KittyTheme, color: string) => void;
  applyPreset: (preset: KittyTheme) => void;
  setWallpaper: (url: string | null) => void;
}

const initialModules: Record<string, boolean> = {
  os: true,
  kernel: true,
  uptime: true,
  packages: true,
  shell: true,
  wm: true,
  terminal: true,
  cpu: true,
  gpu: true,
  memory: true,
};

export const useStore = create<StoreState>((set) => ({
  enabledModules: initialModules,
  selectedDistro: "Arch",
  username: "user",
  hostname: "archlinux",
  theme: { ...defaultTheme },
  wallpaper: null,

  toggleModule: (id) =>
    set((s) => ({
      enabledModules: { ...s.enabledModules, [id]: !s.enabledModules[id] },
    })),

  setDistro: (d) => set({ selectedDistro: d }),
  setUsername: (u) => set({ username: u }),
  setHostname: (h) => set({ hostname: h }),

  setThemeColor: (key, color) =>
    set((s) => ({
      theme: { ...s.theme, [key]: color },
    })),

  applyPreset: (preset) => set({ theme: { ...preset } }),
  setWallpaper: (url) => set({ wallpaper: url }),
}));
