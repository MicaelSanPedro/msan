import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl sm:text-8xl font-bold gradient-text mb-4">
          404
        </h1>
        <p className="text-xl text-zinc-400 font-medium mb-2">
          Pagina nao encontrada
        </p>
        <p className="text-sm text-zinc-500 mb-8 max-w-sm mx-auto">
          A pagina que voce esta procurando nao existe ou foi movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors"
        >
          Voltar ao inicio
        </Link>
      </div>
    </div>
  );
}
