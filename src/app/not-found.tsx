import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl md:text-9xl font-extrabold tracking-tighter gradient-text mb-4">
        404
      </h1>
      <p className="text-lg text-zinc-400 mb-8">Página não encontrada</p>
      <Link
        href="/"
        className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
