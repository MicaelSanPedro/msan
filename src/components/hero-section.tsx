"use client";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-36">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/[0.07] blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.05] blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-zinc-400">
            Todos os apps sao gratuitos
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-slide-up">
          Descubra os{" "}
          <span className="gradient-text-subtle">Melhores Apps</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Downloads seguros e verificados para Windows e Android. Tudo gratuito,
          sempre atualizado.
        </p>

        {/* CTA Button */}
        <a
          href="#apps"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-medium text-sm hover:from-violet-500 hover:to-cyan-500 transition-all animate-pulse-subtle animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          Explorar Apps
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>

        {/* Stats Bar */}
        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-semibold text-white">300+</span>
            <span className="text-sm text-zinc-500">Apps</span>
          </div>
          <div className="w-px h-5 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-semibold text-white">
              2.4M
            </span>
            <span className="text-sm text-zinc-500">Downloads</span>
          </div>
          <div className="w-px h-5 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-semibold text-white">
              850K
            </span>
            <span className="text-sm text-zinc-500">Usuarios</span>
          </div>
        </div>
      </div>
    </section>
  );
}
