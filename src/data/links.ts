export type CategoryType = 'games' | 'filmes-series' | 'dev-tech' | 'comics-mangas' | 'ciencia' | 'cultura-geek';

export interface LinkItem {
  id: number;
  title: string;
  description: string;
  url: string;
  category: CategoryType;
  icon: string;
}

export const categories = [
  { id: 'games' as CategoryType, name: 'Games', icon: 'Gamepad2' },
  { id: 'filmes-series' as CategoryType, name: 'Filmes & Séries', icon: 'Film' },
  { id: 'dev-tech' as CategoryType, name: 'Dev & Tech', icon: 'Code2' },
  { id: 'comics-mangas' as CategoryType, name: 'Comics & Mangás', icon: 'BookOpen' },
  { id: 'ciencia' as CategoryType, name: 'Ciência', icon: 'Microscope' },
  { id: 'cultura-geek' as CategoryType, name: 'Cultura Geek', icon: 'Dices' },
];

export const links: LinkItem[] = [
  // === GAMES ===
  { id: 1, title: 'Steam', description: 'A maior loja de jogos digitais para PC. Ofertas semanais e uma biblioteca gigante.', url: 'https://store.steampowered.com', category: 'games', icon: 'ShoppingCart' },
  { id: 2, title: 'Epic Games Store', description: 'Jogos grátis toda semana e exclusivos temporários. Vale a pena conferir.', url: 'https://store.epicgames.com', category: 'games', icon: 'Gift' },
  { id: 3, title: 'IGN Brasil', description: 'Notícias, reviews e vídeos sobre games, filmes e séries em português.', url: 'https://br.ign.com', category: 'games', icon: 'Newspaper' },
  { id: 4, title: 'Voxel', description: 'Portal brasileiro sobre games com reviews, notícias e análises aprofundadas.', url: 'https://voxel.com.br', category: 'games', icon: 'Gamepad2' },
  { id: 5, title: 'HowLongToBeat', description: 'Saiba quanto tempo leva para completar qualquer jogo antes de começar.', url: 'https://howlongtobeat.com', category: 'games', icon: 'Clock' },
  { id: 6, title: 'GOG.com', description: 'Jogos clássicos e indie sem DRM. Biblioteca curada com gems do passado.', url: 'https://www.gog.com', category: 'games', icon: 'Archive' },
  { id: 7, title: 'Metacritic', description: 'Agregador de reviews. Confira a pontuação média antes de comprar.', url: 'https://www.metacritic.com', category: 'games', icon: 'BarChart3' },

  // === FILMES & SÉRIES ===
  { id: 8, title: 'Crunchyroll', description: 'A maior plataforma de streaming de anime. Milhares de títulos com legendas em português.', url: 'https://www.crunchyroll.com', category: 'filmes-series', icon: 'Play' },
  { id: 9, title: 'Letterboxd', description: 'Rede social para cinéfilos. Catalogue seus filmes e descubra recomendações.', url: 'https://letterboxd.com', category: 'filmes-series', icon: 'Film' },
  { id: 10, title: 'MyAnimeList', description: 'O maior banco de dados de anime e mangá. Acompanhe o que você assistiu e leu.', url: 'https://myanimelist.net', category: 'filmes-series', icon: 'List' },
  { id: 11, title: 'IMDb', description: 'Banco de dados de filmes e séries mais completo da internet.', url: 'https://www.imdb.com', category: 'filmes-series', icon: 'Star' },
  { id: 12, title: 'JustWatch', description: 'Descubra em qual streaming cada filme ou série está disponível no Brasil.', url: 'https://www.justwatch.com/br', category: 'filmes-series', icon: 'Search' },
  { id: 13, title: 'Rotten Tomatoes', description: 'Reviews agregados de críticos profissionais e público para filmes e séries.', url: 'https://www.rottentomatoes.com', category: 'filmes-series', icon: 'Tomato' },

  // === DEV & TECH ===
  { id: 14, title: 'GitHub', description: 'A plataforma de hospedagem de código mais usada no mundo. Open source e colaboração.', url: 'https://github.com', category: 'dev-tech', icon: 'Github' },
  { id: 15, title: 'Stack Overflow', description: 'O maior fórum de perguntas e respostas para programadores. Se tem um bug, a resposta está aqui.', url: 'https://stackoverflow.com', category: 'dev-tech', icon: 'Layers' },
  { id: 16, title: 'MDN Web Docs', description: 'Documentação oficial de HTML, CSS e JavaScript. A referência definitiva para web devs.', url: 'https://developer.mozilla.org', category: 'dev-tech', icon: 'Globe' },
  { id: 17, title: 'freeCodeCamp', description: 'Aprenda programação de graça com projetos práticos. Certificações reconhecidas.', url: 'https://www.freecodecamp.org', category: 'dev-tech', icon: 'GraduationCap' },
  { id: 18, title: 'Dev.to', description: 'Comunidade de desenvolvedores com artigos, tutoriais e discussões técnicas.', url: 'https://dev.to', category: 'dev-tech', icon: 'MessageSquare' },
  { id: 19, title: 'Hacker News', description: 'Agregador de notícias de tecnologia mais influente. Startups, IA e open source.', url: 'https://news.ycombinator.com', category: 'dev-tech', icon: 'Zap' },
  { id: 20, title: 'Can I Use', description: 'Verifique a compatibilidade de features de CSS e JavaScript entre navegadores.', url: 'https://caniuse.com', category: 'dev-tech', icon: 'CheckCircle' },
  { id: 21, title: 'TypeScript Docs', description: 'Documentação oficial do TypeScript. Guias, playground e referência da linguagem.', url: 'https://www.typescriptlang.org/docs/', category: 'dev-tech', icon: 'FileCode' },

  // === COMICS & MANGÁS ===
  { id: 22, title: 'MangaPlus', description: 'Mangás oficiais e gratuitos da Shueisha. One Piece, Jujutsu Kaisen e mais.', url: 'https://mangaplus.shueisha.co.jp', category: 'comics-mangas', icon: 'BookOpen' },
  { id: 23, title: 'ComiXology (Amazon)', description: 'Maior loja de quadrinhos digitais. DC, Marvel, indie e muito mais.', url: 'https://www.comixology.com', category: 'comics-mangas', icon: 'BookMarked' },
  { id: 24, title: 'Leitor.net', description: 'Leia mangás online em português. Acervo enorme e atualizações diárias.', url: 'https://leitor.net', category: 'comics-mangas', icon: 'BookCopy' },
  { id: 25, title: 'Anime News Network', description: 'Notícias, reviews e enciclopédia sobre anime e mangá. A fonte mais completa.', url: 'https://www.animenewsnetwork.com', category: 'comics-mangas', icon: 'Newspaper' },
  { id: 26, title: 'Read Comics Online', description: 'Banco de quadrinhos ocidentais para leitura online. Classics e modernos.', url: 'https://readcomiconline.li', category: 'comics-mangas', icon: 'BookHeart' },

  // === CIÊNCIA ===
  { id: 27, title: 'Kurzgesagt', description: 'Animações sobre ciência com qualidade absurda. Space, biologia, física e mais.', url: 'https://www.youtube.com/@kurzgesagt', category: 'ciencia', icon: 'Sparkles' },
  { id: 28, title: 'Vsauce', description: 'Canal que explora perguntas que você nunca soube que tinha. Ciência e filosofia.', url: 'https://www.youtube.com/@Vsauce', category: 'ciencia', icon: 'Lightbulb' },
  { id: 29, title: 'Scientific American', description: 'Uma das revistas de ciência mais respeitadas do mundo. Artigos acessíveis e rigorosos.', url: 'https://www.scientificamerican.com', category: 'ciencia', icon: 'FlaskConical' },
  { id: 30, title: 'Space.com', description: 'As últimas notícias sobre exploração espacial, astronomia e missões.', url: 'https://www.space.com', category: 'ciencia', icon: 'Rocket' },
  { id: 31, title: 'ArXiv', description: 'Papers científicos open access em física, matemática, CS e biologia. Para os curiosos.', url: 'https://arxiv.org', category: 'ciencia', icon: 'ScrollText' },
  { id: 32, title: 'Veritasium', description: 'Derek Muller explica fenômenos científicos com experimentos e histórias fascinantes.', url: 'https://www.youtube.com/@veritasium', category: 'ciencia', icon: 'Atom' },

  // === CULTURA GEEK ===
  { id: 33, title: 'D&D Beyond', description: 'Ferramenta oficial para Dungeons & Dragons. Crie personagens e gerencie campanhas.', url: 'https://www.dndbeyond.com', category: 'cultura-geek', icon: 'Dices' },
  { id: 34, title: 'BoardGameGeek', description: 'O maior banco de dados de board games. Reviews, rankings e fórum ativo.', url: 'https://boardgamegeek.com', category: 'cultura-geek', icon: 'LayoutGrid' },
  { id: 35, title: 'Reddit r/nerd', description: 'Comunidade discutindo cultura nerd, lançamentos, teorias e memes.', url: 'https://www.reddit.com/r/nerd', category: 'cultura-geek', icon: 'MessageCircle' },
  { id: 36, title: 'Critical Role', description: 'Campanha de D&D jogada por atores de dublagem. O inicio do D&D mainstream.', url: 'https://www.critrole.com', category: 'cultura-geek', icon: 'Mic' },
  { id: 37, title: 'Lore Olympus', description: 'Webcomic fenômeno sobre mitologia grega. Arte linda e narrativa cativante.', url: 'https://www.webtoons.com/en/romance/lore-olympus/list?title_no=1320', category: 'cultura-geek', icon: 'Palette' },
  { id: 38, title: 'CCXP', description: 'A maior convenção de cultura pop da América Latina. São Paulo, anualmente.', url: 'https://www.ccxp.com.br', category: 'cultura-geek', icon: 'Ticket' },
];

export function getLinksByCategory(category: CategoryType): LinkItem[] {
  return links.filter((l) => l.category === category);
}

export function searchLinks(query: string): LinkItem[] {
  const q = query.toLowerCase();
  return links.filter(
    (l) =>
      l.title.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.category.includes(q)
  );
}
