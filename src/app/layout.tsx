import type { Metadata } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ReadingProgress from '@/components/reading-progress';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'O Refúgio — Seu Cantinho Nerd na Internet',
  description: 'Blog e portal de cultura nerd: artigos sobre games, filmes, tecnologia, ciência, mangás e cultura geek.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <ReadingProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
