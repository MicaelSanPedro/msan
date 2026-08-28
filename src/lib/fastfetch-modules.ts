export interface FastfetchModule {
  id: string;
  label: string;
  key: string;
  default: boolean;
}

export const fastfetchModules: FastfetchModule[] = [
  { id: "os", label: "Sistema Operacional", key: "OS", default: true },
  { id: "kernel", label: "Kernel", key: "Kernel", default: true },
  { id: "uptime", label: "Uptime", key: "Uptime", default: true },
  { id: "packages", label: "Pacotes", key: "Packages", default: true },
  { id: "shell", label: "Shell", key: "Shell", default: true },
  { id: "wm", label: "Gerenciador de Janelas", key: "WM", default: true },
  { id: "terminal", label: "Terminal", key: "Terminal", default: true },
  { id: "cpu", label: "CPU", key: "CPU", default: true },
  { id: "gpu", label: "GPU", key: "GPU", default: true },
  { id: "memory", label: "Memória RAM", key: "Memory", default: true },
];

export const distroOptions = [
  "Arch",
  "Fedora",
  "Debian",
  "Ubuntu",
  "NixOS",
  "Mint",
  "Gentoo",
];

export const defaultModuleValues: Record<string, string> = {
  os: "Arch Linux x86_64",
  kernel: "6.10.7-arch1-1",
  uptime: "3 hours, 42 mins",
  packages: "847 (pacman)",
  shell: "zsh 5.9",
  wm: "Hyprland",
  terminal: "kitty",
  cpu: "AMD Ryzen 5 7600X (12) @ 5.1GHz",
  gpu: "NVIDIA GeForce RTX 4060",
  memory: "8192MiB / 32768MiB",
};
