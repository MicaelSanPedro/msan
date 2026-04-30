import {
  Gamepad2, Film, Code2, BookOpen, Microscope, Dices,
  ShoppingCart, Gift, Newspaper, Clock, Archive, BarChart3,
  Play, List, Star, Search, CircleDot,
  Github, Layers, Globe, GraduationCap, MessageSquare, Zap,
  CheckCircle, FileCode,
  Bookmark, BookCopy, BookHeart,
  Sparkles, Lightbulb, FlaskConical, Rocket, ScrollText, Atom,
  LayoutGrid, MessageCircle, Mic, Palette, Ticket,
  ExternalLink
} from 'lucide-react';
import type { LinkItem } from '@/data/links';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Gamepad2, Film, Code2, BookOpen, Microscope, Dices,
  ShoppingCart, Gift, Newspaper, Clock, Archive, BarChart3,
  Play, List, Star, Search, Tomato: CircleDot,
  Github, Layers, Globe, GraduationCap, MessageSquare, Zap,
  CheckCircle, FileCode,
  BookMarked: Bookmark, BookCopy, BookHeart,
  Sparkles, Lightbulb, FlaskConical, Rocket, ScrollText, Atom,
  LayoutGrid, MessageCircle, Mic, Palette, Ticket,
};

interface LinkCardProps {
  link: LinkItem;
}

export default function LinkCard({ link }: LinkCardProps) {
  const IconComponent = iconMap[link.icon] || ExternalLink;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 glass-card rounded-xl p-4 transition-all duration-300 hover:translate-y-[-2px]"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center">
        <IconComponent className="h-5 w-5 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm text-text-primary group-hover:text-accent transition-colors mb-1">
          {link.title}
        </h3>
        <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
          {link.description}
        </p>
      </div>
      <ExternalLink className="flex-shrink-0 h-4 w-4 text-text-muted group-hover:text-accent transition-colors mt-1" />
    </a>
  );
}
