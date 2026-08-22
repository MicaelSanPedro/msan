"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="liquid-glass-panel relative overflow-hidden p-8 sm:p-10">
      {/* Specular highlight */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-xl">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
          Newsletter <span className="text-emerald-400">TechMate</span>
        </h3>
        <p className="text-white/50 text-sm sm:text-base mb-8 leading-relaxed">
          Receba tutoriais exclusivos, dicas de Linux e novidades de dev diretamente no seu e-mail. 
          Sem spam, apenas conteúdo técnico de verdade.
        </p>

        {status === "success" ? (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 animate-fade-up">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium text-sm">Inscrição realizada com sucesso!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="seu@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="liquid-glass-input flex-1 px-5 py-3.5
                         text-white placeholder:text-white/20 outline-none
                         transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary whitespace-nowrap px-8 py-3.5 h-auto disabled:opacity-50"
            >
              {status === "loading" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Inscrever
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
        
        <p className="text-[10px] text-white/20 mt-4 uppercase tracking-widest font-mono">
          JOIN 2,400+ READERS · OPT-OUT ANYTIME
        </p>
      </div>
    </div>
  );
}
