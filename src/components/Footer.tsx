"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">Linux</span>
                <span className="shimmer-text">Zeiro</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/30 leading-relaxed max-w-xs">
              Seu guia completo para encontrar e instalar os melhores aplicativos no Linux. Comandos prontos para copiar e dicas úteis.
            </p>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 mb-4">Categorias</h4>
            <ul className="space-y-2.5">
              {["Navegadores", "Produtividade", "Desenvolvimento", "Mídia", "Jogos", "Utilitários"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-xs sm:text-sm text-white/30 hover:text-green-400 transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 mb-4">Recursos</h4>
            <ul className="space-y-2.5">
              {["Todos os Apps", "Categorias", "Como Instalar", "Dicas Linux", "Distribuições"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-xs sm:text-sm text-white/30 hover:text-green-400 transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 mb-4">Sobre</h4>
            <ul className="space-y-2.5">
              {["Sobre o Projeto", "Contribuir", "GitHub", "Contato"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-xs sm:text-sm text-white/30 hover:text-green-400 transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {currentYear} LinuxZeiro. Feito com 💚 para a comunidade Linux.
          </p>
          <p className="text-xs text-white/20 flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-green-500 fill-green-500" /> e 🐧 para o Open Source
          </p>
        </div>
      </div>
    </footer>
  );
}
