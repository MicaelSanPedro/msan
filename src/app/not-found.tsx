import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🌌</div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-4">
          404
        </h1>
        <h2 className="font-serif text-xl font-semibold text-accent mb-3">
          Essa página se perdeu no multiverso
        </h2>
        <p className="text-text-secondary mb-8 leading-relaxed">
          O endereço que você está procurando pode ter sido movido, deletado,
          ou talvez nunca tenha existido nesta linha temporal.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-background font-medium text-sm rounded-lg hover:bg-accent-hover transition-colors"
        >
          <Home className="h-4 w-4" />
          Voltar ao Refúgio
        </Link>
      </div>
    </div>
  );
}
