import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-lg font-extrabold tracking-tighter gradient-text">
              MSAN
            </Link>
            <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
              Downloads seguros e verificados para Windows e Android. Tudo gratuito,
              sempre atualizado.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-3">Categorias</h4>
            <ul className="space-y-2">
              {['Jogos', 'Softwares', 'Outros'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/${cat.toLowerCase()}`}
                    className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-3">Comunidade</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-zinc-500">GitHub</span>
              </li>
              <li>
                <span className="text-sm text-zinc-500">Discord</span>
              </li>
              <li>
                <span className="text-sm text-zinc-500">Twitter</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} MSAN Downloads. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
