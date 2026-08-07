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
    <div className="relative overflow-hidden rounded-3xl p-8 sm:p-10
                    backdrop-blur-[40px] saturate-[200%] brightness-[105%]
                    bg-gradient-to-br from-amber-500/[0.08] via-white/[0.03] to-white/[0.01]
                    border border-white/[0.14]
                    shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]">
      {/* Specular highlight */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-xl">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
          Newsletter <span className="text-amber-400">TechMate</span>
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
              className="flex-1 px-5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.1] 
                         text-white placeholder:text-white/20 outline-none focus:border-amber-500/50 
                         transition-all focus:bg-white/[0.06]"
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
