"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-[8rem] sm:text-[10rem] font-black leading-none shimmer-text opacity-20">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl sm:text-6xl">🕳️</span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Página não encontrada
        </h2>
        <p className="text-sm sm:text-base text-white/40 mb-8 leading-relaxed">
          A página que você está procurando não existe ou foi movida para outro
          endereço.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-purple-500/20"
          >
            <Home className="w-4 h-4" />
            Voltar ao Início
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-light border border-white/[0.06] text-white/60 hover:text-white text-sm font-medium transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
