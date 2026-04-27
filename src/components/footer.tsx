"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Github, Heart, ExternalLink } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/downloads";

export function Footer() {
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <footer className="relative border-t border-white/[0.04] mt-auto">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold shimmer-text">MSAN</span>
            </div>
            <p className="text-xs sm:text-sm text-white/30 leading-relaxed max-w-xs">
              O melhor site de downloads com links verificados e atualizados.
              Jogos, softwares e ferramentas gratuitas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 mb-4">
              Categorias
            </h4>
            <ul className="space-y-2">
              {categories.slice(1).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${cat.id}`}
                    className="text-xs sm:text-sm text-white/30 hover:text-purple-400 transition-colors flex items-center gap-2"
                  >
                    <span>{cat.emoji}</span> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 mb-4">Info</h4>
            <ul className="space-y-2">
              {[
                "Sobre nós",
                "Termos de Uso",
                "Política de Privacidade",
                "Contato",
              ].map((item) => (
                <li key={item}>
                  <span className="text-xs sm:text-sm text-white/30 hover:text-purple-400 transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 mb-4">
              Redes Sociais
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/MicaelSanPedro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-light flex items-center justify-center hover:neon-glow-purple transition-all duration-300 group"
              >
                <Github className="w-4 h-4 text-white/40 group-hover:text-purple-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {currentYear} MSAN Downloads. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/20 flex items-center gap-1">
            Feito com{" "}
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> por
            MicaelSanPedro
          </p>
        </div>
      </div>
    </footer>
  );
}
