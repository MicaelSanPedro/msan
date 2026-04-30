import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-lg font-bold gradient-text">MSAN</span>
            </Link>
            <p className="text-sm text-zinc-500 mt-2 max-w-xs leading-relaxed">
              Downloads seguros e verificados para Windows e Android. Tudo
              gratuito, sempre atualizado.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-3">
              Links Rapidos
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Inicio" },
                { href: "/jogos", label: "Jogos" },
                { href: "/softwares", label: "Softwares" },
                { href: "/outros", label: "Utilitarios" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-3">
              Comunidade
            </h3>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} MSAN Downloads. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
