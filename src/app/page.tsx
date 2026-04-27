'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Download,
  Search,
  ExternalLink,
  Terminal,
  Shield,
  Cpu,
  Database,
  Globe,
  Palette,
  BookOpen,
  Wrench,
  Gamepad2,
  Music,
  Layers,
  Star,
  TrendingUp,
  Clock,
  Tag,
  ChevronRight,
  Sparkles,
  Loader2,
  Heart,
  Eye,
  Zap,
  Monitor,
  Wifi,
  Code2,
  FileCode,
  GitBranch,
  Container,
  Bug,
  Lock,
  Server,
  LayoutGrid,
  List,
  ArrowUp,
  Filter,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// ===================== TYPES =====================
interface DownloadItem {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  downloadUrl: string;
  officialUrl: string;
  version: string;
  platform: string[];
  icon: string;
  rating: number;
  downloads: number;
  featured: boolean;
  author: string;
  createdAt: string;
}

type ViewMode = 'grid' | 'list';

// ===================== CATEGORIES =====================
const CATEGORIES = [
  { value: 'all', label: 'Todos', icon: Layers, gradient: 'from-green-400 via-emerald-500 to-teal-600', bg: 'bg-green-500' },
  { value: 'dev-tools', label: 'Dev Tools', icon: Code2, gradient: 'from-blue-400 via-indigo-500 to-violet-600', bg: 'bg-blue-500' },
  { value: 'terminals', label: 'Terminais', icon: Terminal, gradient: 'from-green-400 via-emerald-500 to-green-700', bg: 'bg-green-600' },
  { value: 'editors', label: 'Editores', icon: FileCode, gradient: 'from-cyan-400 via-blue-500 to-indigo-600', bg: 'bg-cyan-500' },
  { value: 'languages', label: 'Linguagens', icon: Cpu, gradient: 'from-yellow-400 via-amber-500 to-orange-600', bg: 'bg-yellow-500' },
  { value: 'devops', label: 'DevOps', icon: Container, gradient: 'from-sky-400 via-blue-500 to-blue-700', bg: 'bg-sky-500' },
  { value: 'git', label: 'Git & Versionamento', icon: GitBranch, gradient: 'from-red-400 via-orange-500 to-amber-600', bg: 'bg-red-500' },
  { value: 'security', label: 'Segurança', icon: Shield, gradient: 'from-red-500 via-rose-600 to-pink-700', bg: 'bg-red-600' },
  { value: 'database', label: 'Bancos de Dados', icon: Database, gradient: 'from-orange-400 via-amber-500 to-yellow-600', bg: 'bg-orange-500' },
  { value: 'networking', label: 'Redes', icon: Wifi, gradient: 'from-teal-400 via-cyan-500 to-sky-600', bg: 'bg-teal-500' },
  { value: 'web', label: 'Web & APIs', icon: Globe, gradient: 'from-emerald-400 via-green-500 to-teal-600', bg: 'bg-emerald-500' },
  { value: 'design', label: 'Design & UI', icon: Palette, gradient: 'from-pink-400 via-fuchsia-500 to-purple-600', bg: 'bg-pink-500' },
  { value: 'cheatsheets', label: 'Cheat Sheets', icon: BookOpen, gradient: 'from-amber-400 via-yellow-500 to-lime-600', bg: 'bg-amber-500' },
  { value: 'productivity', label: 'Produtividade', icon: Zap, gradient: 'from-violet-400 via-purple-500 to-fuchsia-600', bg: 'bg-violet-500' },
  { value: 'gaming', label: 'Games & Emuladores', icon: Gamepad2, gradient: 'from-indigo-400 via-violet-500 to-purple-700', bg: 'bg-indigo-500' },
  { value: 'audio', label: 'Audio & Music', icon: Music, gradient: 'from-lime-400 via-green-500 to-emerald-600', bg: 'bg-lime-500' },
  { value: 'systems', label: 'Sistemas Operacionais', icon: Monitor, gradient: 'from-gray-400 via-slate-500 to-zinc-700', bg: 'bg-gray-500' },
  { value: 'debug', label: 'Debug & Testing', icon: Bug, gradient: 'from-rose-400 via-red-500 to-orange-600', bg: 'bg-rose-500' },
  { value: 'servers', label: 'Servidores', icon: Server, gradient: 'from-slate-400 via-gray-500 to-zinc-700', bg: 'bg-slate-500' },
  { value: 'crypto', label: 'Criptografia & VPN', icon: Lock, gradient: 'from-emerald-400 via-green-600 to-teal-800', bg: 'bg-emerald-600' },
];

// ===================== DEFAULT DATA (curated) =====================
const DEFAULT_DOWNLOADS: Omit<DownloadItem, 'id' | 'createdAt'>[] = [
  // Dev Tools
  { name: 'Visual Studio Code', description: 'O editor de código mais popular do mundo', longDescription: 'Editor de código-fonte gratuito da Microsoft com suporte a centenas de linguagens, extensões, debugging integrado, terminal embutido, Git e muito mais. Leve, rápido e absurdamente extensível.', category: 'editors', tags: ['editor', 'ide', 'microsoft', 'coding'], downloadUrl: 'https://code.visualstudio.com/Download', officialUrl: 'https://code.visualstudio.com', version: '1.98', platform: ['Windows', 'macOS', 'Linux'], icon: '💻', rating: 5, downloads: 15420, featured: true, author: 'Microsoft' },
  { name: 'Git', description: 'Sistema de controle de versão distribuído', longDescription: 'O sistema de versionamento mais usado no mundo. Controle cada mudança no seu código, colabore com equipes, crie branches, faça merge e muito mais. Essencial para qualquer desenvolvedor.', category: 'git', tags: ['git', 'versionamento', 'scm', 'colaboração'], downloadUrl: 'https://git-scm.com/downloads', officialUrl: 'https://git-scm.com', version: '2.47', platform: ['Windows', 'macOS', 'Linux'], icon: '🔀', rating: 5, downloads: 12800, featured: true, author: 'Linus Torvalds' },
  { name: 'Docker Desktop', description: 'Containerize suas aplicações', longDescription: 'Crie, gerencie e rode containers Docker no seu desktop. Empacote sua app com todas as dependências e rode em qualquer lugar. Docker Compose incluso para ambientes multi-container.', category: 'devops', tags: ['docker', 'container', 'devops', 'deploy'], downloadUrl: 'https://www.docker.com/products/docker-desktop/', officialUrl: 'https://www.docker.com', version: '4.34', platform: ['Windows', 'macOS', 'Linux'], icon: '🐳', rating: 5, downloads: 9800, featured: true, author: 'Docker Inc.' },
  { name: 'Node.js', description: 'Runtime JavaScript no servidor', longDescription: 'Execute JavaScript fora do navegador. Build servers, APIs, CLIs e aplicações real-time com o V8 engine do Chrome. Milhares de pacotes no npm. Essencial para qualquer dev web moderno.', category: 'languages', tags: ['javascript', 'runtime', 'server', 'npm'], downloadUrl: 'https://nodejs.org/en/download/', officialUrl: 'https://nodejs.org', version: '22 LTS', platform: ['Windows', 'macOS', 'Linux'], icon: '🟢', rating: 5, downloads: 11200, featured: true, author: 'OpenJS Foundation' },
  { name: 'Python', description: 'Linguagem versátil e poderosa', longDescription: 'A linguagem mais querida por cientistas de dados, devs AI, automação e web. Sintaxe limpa, milhares de bibliotecas, comunidade gigante. De scripts a machine learning, Python faz tudo.', category: 'languages', tags: ['python', 'ai', 'data-science', 'scripting'], downloadUrl: 'https://www.python.org/downloads/', officialUrl: 'https://www.python.org', version: '3.13', platform: ['Windows', 'macOS', 'Linux'], icon: '🐍', rating: 5, downloads: 10500, featured: true, author: 'Python Software Foundation' },
  { name: 'Rust', description: 'Performance e segurança sem garbage collector', longDescription: 'Linguagem de sistemas que combina performance de C++ com segurança de memória garantida em tempo de compilação. Zero-cost abstractions, fearless concurrency. A linguagem mais amada há anos.', category: 'languages', tags: ['rust', 'systems', 'performance', 'safe'], downloadUrl: 'https://www.rust-lang.org/tools/install', officialUrl: 'https://www.rust-lang.org', version: '1.82', platform: ['Windows', 'macOS', 'Linux'], icon: '🦀', rating: 5, downloads: 6200, featured: false, author: 'Mozilla / Rust Foundation' },
  { name: 'Postman', description: 'Teste e documente APIs facilmente', longDescription: 'A ferramenta definitiva para trabalhar com APIs. Crie e organize requests, teste responses, automatize testes, documente endpoints, compartilhe collections com a equipe e publique documentação.', category: 'web', tags: ['api', 'rest', 'testing', 'http'], downloadUrl: 'https://www.postman.com/downloads/', officialUrl: 'https://www.postman.com', version: '11', platform: ['Windows', 'macOS', 'Linux'], icon: '📬', rating: 4, downloads: 7400, featured: true, author: 'Postman Inc.' },
  { name: 'Wireshark', description: 'Analise tráfego de rede em tempo real', longDescription: 'O analisador de protocolos de rede mais usado no mundo. Capture pacotes, inspecione tráfego, debug protocolos, analise segurança. Essencial para qualquer profissional de redes ou segurança.', category: 'networking', tags: ['network', 'packets', 'analysis', 'protocol'], downloadUrl: 'https://www.wireshark.org/download.html', officialUrl: 'https://www.wireshark.org', version: '4.4', platform: ['Windows', 'macOS', 'Linux'], icon: '🦈', rating: 5, downloads: 5600, featured: false, author: 'Wireshark Foundation' },
  { name: 'Kali Linux', description: 'Distro Linux para pentesting e segurança', longDescription: 'A distribuição Linux definitiva para segurança ofensiva. Centenas de ferramentas de pentesting pré-instaladas: Nmap, Metasploit, Burp Suite, Aircrack-ng e muito mais. O canivete suíço do hacker ético.', category: 'security', tags: ['linux', 'pentesting', 'hacking', 'security'], downloadUrl: 'https://www.kali.org/get-kali/', officialUrl: 'https://www.kali.org', version: '2025.1', platform: ['Live USB', 'VM', 'WSL'], icon: '🐉', rating: 5, downloads: 8900, featured: true, author: 'Offensive Security' },
  { name: 'Oh My Zsh', description: 'Deixe seu terminal incrível', longDescription: 'Framework para gerenciar sua configuração do Zsh. Temas lindos, centenas de plugins, aliases úteis, autocompletion poderoso. Transforma qualquer terminal num ambiente produtivo e estiloso.', category: 'terminals', tags: ['zsh', 'shell', 'terminal', 'theme'], downloadUrl: 'https://ohmyz.sh/#install', officialUrl: 'https://ohmyz.sh', version: 'Latest', platform: ['macOS', 'Linux'], icon: '✨', rating: 5, downloads: 7200, featured: false, author: 'Community' },
  { name: 'Windows Terminal', description: 'Terminal moderno e customizável do Windows', longDescription: 'O terminal oficial do Windows com tabs, GPU-accelerated rendering, suporte a CMD, PowerShell e WSL. Temas customizáveis, backgrounds com imagens e transparência. Muito superior ao CMD.', category: 'terminals', tags: ['terminal', 'windows', 'powershell', 'wsl'], downloadUrl: 'https://apps.microsoft.com/detail/9N0DX20HK701', officialUrl: 'https://github.com/microsoft/terminal', version: '1.22', platform: ['Windows'], icon: '🖥️', rating: 4, downloads: 5800, featured: false, author: 'Microsoft' },
  { name: 'PostgreSQL', description: 'O banco de dados relacional mais avançado', longDescription: 'Banco de dados open-source mais poderoso do mercado. ACID compliant, suporte a JSON, full-text search, extensões (PostGIS, TimescaleDB), CTEs, window functions e muito mais. O MySQL dos adultos.', category: 'database', tags: ['sql', 'database', 'relational', 'open-source'], downloadUrl: 'https://www.postgresql.org/download/', officialUrl: 'https://www.postgresql.org', version: '17', platform: ['Windows', 'macOS', 'Linux'], icon: '🐘', rating: 5, downloads: 6800, featured: true, author: 'PostgreSQL Global Dev Group' },
  { name: 'Redis', description: 'In-memory database ultra-rápido', longDescription: 'Store in-memory key-value que voa. Use como cache, message broker, session store, real-time analytics. Suporta strings, lists, sets, sorted sets, hashes, streams. Pub/sub integrado.', category: 'database', tags: ['cache', 'in-memory', 'nosql', 'redis'], downloadUrl: 'https://redis.io/download', officialUrl: 'https://redis.io', version: '7.4', platform: ['Windows', 'macOS', 'Linux'], icon: '🔴', rating: 5, downloads: 5200, featured: false, author: 'Redis Ltd.' },
  { name: 'Figma', description: 'Design de interfaces colaborativo', longDescription: 'A ferramenta de design UI/UX que dominou o mercado. Design, prototype, handoff — tudo no browser. Colaboração em tempo real, componentes, auto layout, variants e integração com dev mode.', category: 'design', tags: ['design', 'ui', 'ux', 'prototype'], downloadUrl: 'https://www.figma.com/downloads/', officialUrl: 'https://www.figma.com', version: 'Desktop', platform: ['Windows', 'macOS', 'Web'], icon: '🎨', rating: 5, downloads: 6400, featured: true, author: 'Figma Inc.' },
  { name: 'VeraCrypt', description: 'Criptografa discos e arquivos com segurança militar', longDescription: 'Crie volumes criptografados virtuais, criptografe partições inteiras ou o disco completo. Suporta hidden volumes, plausible deniability. Successor do TrueCrypt. Open-source e auditado.', category: 'crypto', tags: ['encryption', 'privacy', 'disk', 'security'], downloadUrl: 'https://www.veracrypt.fr/en/Downloads.html', officialUrl: 'https://www.veracrypt.fr', version: '1.26.7', platform: ['Windows', 'macOS', 'Linux'], icon: '🔒', rating: 5, downloads: 4300, featured: false, author: 'IDRIX' },
  { name: 'ProtonVPN', description: 'VPN gratuita e segura da Suíça', longDescription: 'VPN do mesmo time do ProtonMail. Sem logs, criptografia AES-256, Secure Core, Kill Switch. Plano gratuito sem limites de velocidade (3 países). Baseada na Suíça, leis de privacidade fortes.', category: 'crypto', tags: ['vpn', 'privacy', 'encryption', 'free'], downloadUrl: 'https://protonvpn.com/download', officialUrl: 'https://protonvpn.com', version: 'Latest', platform: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'], icon: '🛡️', rating: 4, downloads: 5100, featured: false, author: 'Proton AG' },
  { name: 'Cheat.sh', description: 'Cheat sheets no terminal', longDescription: 'Acesse cheat sheets de qualquer linguagem ou ferramenta direto no terminal com curl. Sem instalação, sem dependências. cobre Python, JS, Go, Rust, Docker, Git e centenas de outros tópicos.', category: 'cheatsheets', tags: ['cheatsheet', 'terminal', 'reference', 'cli'], downloadUrl: 'https://github.com/chubin/cheat.sh', officialUrl: 'https://cht.sh', version: 'Latest', platform: ['macOS', 'Linux'], icon: '📋', rating: 5, downloads: 3200, featured: false, author: 'chubin' },
  { name: 'Obsidian', description: 'Base de conhecimento pessoal em Markdown', longDescription: 'Tome notas em Markdown, conecte ideias com links bidirecionais, visualize com graph view. Tudo fica local nos seus arquivos. Plugins comunitários expandem infinitamente. Segundo cérebro digital.', category: 'productivity', tags: ['notes', 'markdown', 'knowledge', 'pkms'], downloadUrl: 'https://obsidian.md/download', officialUrl: 'https://obsidian.md', version: '1.7', platform: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'], icon: '💎', rating: 5, downloads: 5900, featured: true, author: 'Obsidian' },
  { name: 'RetroArch', description: 'Emulador all-in-one para retro gaming', longDescription: 'Frontend para emuladores com interface unificada. Emule SNES, Genesis, GBA, PS1, N64, Arcade e dezenas de outros sistemas. Shaders, save states, netplay, achievements e muito mais.', category: 'gaming', tags: ['emulator', 'retro', 'gaming', 'console'], downloadUrl: 'https://retroarch.com/?page=downloads', officialUrl: 'https://retroarch.com', version: '1.19', platform: ['Windows', 'macOS', 'Linux', 'Android'], icon: '🎮', rating: 5, downloads: 4600, featured: false, author: 'libretro' },
  { name: 'Audacity', description: 'Editor de áudio gratuito e open-source', longDescription: 'Grave, edite e mixe áudio com facilidade. Multi-track, efeitos (reverb, EQ, compressão), remoção de ruído, exportação em MP3/WAV/FLAC/OGG. Perfeito para podcasts, música e edição de áudio.', category: 'audio', tags: ['audio', 'editor', 'music', 'podcast'], downloadUrl: 'https://www.audacityteam.org/download/', officialUrl: 'https://www.audacityteam.org', version: '3.7', platform: ['Windows', 'macOS', 'Linux'], icon: '🎵', rating: 4, downloads: 4800, featured: false, author: 'Audacity Team' },
  { name: 'Tails', description: 'Sistema operacional para privacidade extrema', longDescription: 'Distro Linux que roda de USB, não deixa rastros no computador. Todo tráfego vai pela rede Tor. Amnesia ao desligar. Usado por jornalistas, ativistas e quem precisa de privacidade máxima.', category: 'systems', tags: ['linux', 'privacy', 'tor', 'live-usb'], downloadUrl: 'https://tails.net/install/download', officialUrl: 'https://tails.net', version: '6.10', platform: ['Live USB'], icon: '🕵️', rating: 5, downloads: 3800, featured: false, author: 'Tails Project' },
  { name: 'Insomnia', description: 'Cliente API bonito e open-source', longDescription: 'Alternativa ao Postman mais leve e open-source. Design limpo, suporte a REST, GraphQL, gRPC. Ambientes, code generation, plugins. Perfeito para devs que querem algo mais focado.', category: 'web', tags: ['api', 'rest', 'graphql', 'http'], downloadUrl: 'https://insomnia.rest/download', officialUrl: 'https://insomnia.rest', version: '10', platform: ['Windows', 'macOS', 'Linux'], icon: '😴', rating: 4, downloads: 3100, featured: false, author: 'Kong' },
  { name: 'Burp Suite Community', description: 'Ferramenta de pentesting web essencial', longDescription: 'Proxy interceptador para testar segurança de aplicações web. Intercepte e modifique requests/responses, scanner de vulnerabilidades, intruder, repeater. A ferramenta #1 de bug bounty hunters.', category: 'security', tags: ['security', 'pentesting', 'web', 'proxy'], downloadUrl: 'https://portswigger.net/burp/communitydownload', officialUrl: 'https://portswigger.net', version: '2025', platform: ['Windows', 'macOS', 'Linux'], icon: '🔐', rating: 5, downloads: 4500, featured: false, author: 'PortSwigger' },
  { name: 'Thunder Client', description: 'Cliente API leve dentro do VS Code', longDescription: 'Extensão do VS Code que substitui o Postman. Teste APIs sem sair do editor. Interface limpa, collections, environments, GraphQL support. Leve, rápido e integrado ao seu fluxo.', category: 'dev-tools', tags: ['api', 'vscode', 'rest', 'extension'], downloadUrl: 'https://www.thunderclient.com/', officialUrl: 'https://www.thunderclient.com', version: 'Latest', platform: ['VS Code Extension'], icon: '⚡', rating: 4, downloads: 2900, featured: false, author: 'Thunder Client' },
  { name: 'FFmpeg', description: 'Swiss army knife de vídeo e áudio', longDescription: 'Converte, grava, stream e processa qualquer formato de vídeo/áudio. CLI poderosíssima para compressão, cortes, merge, extração de áudio, conversão de formatos. Usado por YouTube, Netflix, Vimeo.', category: 'dev-tools', tags: ['video', 'audio', 'converter', 'cli'], downloadUrl: 'https://ffmpeg.org/download.html', officialUrl: 'https://ffmpeg.org', version: '7.1', platform: ['Windows', 'macOS', 'Linux'], icon: '🎬', rating: 5, downloads: 5300, featured: false, author: 'FFmpeg Team' },
  { name: 'htop', description: 'Monitor de processos interativo', longDescription: 'O top turbinado. Interface colorida, suporte a mouse, scroll, kill de processos com F9, tree view, filtra por nome. Muito superior ao top padrão. Essencial em qualquer servidor Linux.', category: 'terminals', tags: ['monitor', 'processes', 'linux', 'cli'], downloadUrl: 'https://htop.dev/downloads.html', officialUrl: 'https://htop.dev', version: '3.4', platform: ['macOS', 'Linux'], icon: '📊', rating: 4, downloads: 3400, featured: false, author: 'htop dev team' },
  { name: 'Neovim', description: 'O Vim do futuro', longDescription: 'Vim modernizado com Lua config, LSP nativo, tree-sitter, async, terminal integrado. Configuração em Lua é poderosa e elegante. Comunidade gigante com plugins incríveis. O editor dos nerds.', category: 'editors', tags: ['vim', 'editor', 'terminal', 'lua'], downloadUrl: 'https://github.com/neovim/neovim/releases', officialUrl: 'https://neovim.io', version: '0.10', platform: ['Windows', 'macOS', 'Linux'], icon: '🚀', rating: 5, downloads: 4700, featured: false, author: 'Neovim Community' },
  { name: 'DBeaver', description: 'Cliente universal de banco de dados', longDescription: 'Conecte a MySQL, PostgreSQL, SQLite, Oracle, SQL Server, MongoDB e qualquer banco com JDBC. Editor SQL com autocompletion, ER diagrams, export/import, gestão de dados. Tudo num app só.', category: 'database', tags: ['sql', 'client', 'database', 'gui'], downloadUrl: 'https://dbeaver.io/download/', officialUrl: 'https://dbeaver.io', version: '24', platform: ['Windows', 'macOS', 'Linux'], icon: '🦫', rating: 5, downloads: 4100, featured: false, author: 'DBeaver Corp' },
  { name: 'Tor Browser', description: 'Navegue anonimamente pela rede Tor', longDescription: 'Browser baseado em Firefox que roteia seu tráfego pela rede Tor em 3 camadas de criptografia. Anonimato real contra rastreamento e vigilância. Acesso a .onion sites. Essencial para privacidade.', category: 'crypto', tags: ['browser', 'anonymity', 'privacy', 'tor'], downloadUrl: 'https://www.torproject.org/download/', officialUrl: 'https://www.torproject.org', version: '14', platform: ['Windows', 'macOS', 'Linux', 'Android'], icon: '🧅', rating: 5, downloads: 5700, featured: false, author: 'Tor Project' },
  { name: 'Go', description: 'Linguagem simples, rápida e concorrente', longDescription: 'Linguagem do Google que compila rápido, roda rápido e lida bem com concorrência. Perfeita para APIs, CLIs, microserviços, DevOps tools. Goroutines são mágicas. Docker, Kubernetes e Terraform são feitos em Go.', category: 'languages', tags: ['golang', 'server', 'cloud', 'concurrency'], downloadUrl: 'https://go.dev/dl/', officialUrl: 'https://go.dev', version: '1.23', platform: ['Windows', 'macOS', 'Linux'], icon: '🔵', rating: 5, downloads: 3800, featured: false, author: 'Google' },
  { name: 'Jest', description: 'Framework de testes JavaScript delicioso', longDescription: 'Test framework do Facebook com zero config. Snapshot testing, mocking, coverage, async support. Funciona com React, Vue, Node, TypeScript. O padrão da indústria para testes JS.', category: 'debug', tags: ['testing', 'javascript', 'react', 'unit-test'], downloadUrl: 'https://jestjs.io/docs/getting-started', officialUrl: 'https://jestjs.io', version: '29', platform: ['Node.js'], icon: '🃏', rating: 4, downloads: 3200, featured: false, author: 'Meta' },
  { name: 'Nginx', description: 'Servidor web e reverse proxy ultra-rápido', longDescription: 'O servidor web que serve 33% dos sites do mundo. Reverse proxy, load balancer, cache, HTTP/3, WebSocket. Leve, estável, escala para milhões de requests. Essencial para qualquer infra web.', category: 'servers', tags: ['server', 'proxy', 'web', 'load-balancer'], downloadUrl: 'https://nginx.org/en/download.html', officialUrl: 'https://nginx.org', version: '1.27', platform: ['Windows', 'macOS', 'Linux'], icon: '🌐', rating: 5, downloads: 4900, featured: false, author: 'F5 / Igor Sysoev' },
];

function formatDownloads(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}`} />
  ));
}

// ===================== COMPONENT =====================
export default function Home() {
  const [items, setItems] = useState<DownloadItem[]>(DEFAULT_DOWNLOADS as DownloadItem[]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'name' | 'rating'>('popular');
  const [selectedItem, setSelectedItem] = useState<DownloadItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const { toast } = useToast();

  // Filter & sort
  const filteredItems = items
    .filter((item) => {
      if (category !== 'all' && item.category !== category) return false;
      if (platformFilter !== 'all' && !item.platform.includes(platformFilter)) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q)) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.downloads - a.downloads;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const featuredItems = DEFAULT_DOWNLOADS.filter((i) => i.featured) as DownloadItem[];
  const catInfo = CATEGORIES.find((c) => c.value === category) || CATEGORIES[0];
  const platforms = ['all', 'Windows', 'macOS', 'Linux', 'Android', 'iOS'];

  return (
    <div className="min-h-screen bg-[#080b12] text-white">
      {/* ===== SIDEBAR + MAIN LAYOUT ===== */}
      <div className="flex">

        {/* ===== SIDEBAR ===== */}
        <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-[#0c1018] border-r border-white/5 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
          {/* Logo */}
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight">Nerd<span className="text-green-400">Vault</span></h1>
                <p className="text-[9px] text-gray-600 uppercase tracking-[0.25em]">O Refúgio dos Nerds</p>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex-1 p-3 space-y-0.5">
            <p className="px-3 py-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Categorias</p>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = category === cat.value;
              const count = cat.value === 'all' ? items.length : items.filter((i) => i.category === cat.value).length;
              return (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left text-xs font-medium">{cat.label}</span>
                  <span className={`text-[10px] ${isActive ? 'text-white/70' : 'text-gray-700'}`}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/5">
            <p className="text-[10px] text-gray-700 text-center">msan.com — {items.length} recursos</p>
          </div>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 min-h-screen">

          {/* ===== TOP BAR ===== */}
          <div className="sticky top-0 z-50 bg-[#080b12]/85 backdrop-blur-xl border-b border-white/5">
            <div className="px-4 lg:px-6 py-3">
              {/* Mobile logo row */}
              <div className="lg:hidden flex items-center gap-2 mb-3">
                <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-base font-black">Nerd<span className="text-green-400">Vault</span></h1>
              </div>

              {/* Search row */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Buscar ferramentas, linguagens, frameworks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 h-11 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-600 focus:border-green-500/50 focus:ring-green-500/20 text-sm rounded-xl"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`h-11 px-4 border-white/[0.08] gap-2 rounded-xl ${showFilters ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Filtros</span>
                </Button>
              </div>

              {/* Filters row */}
              {showFilters && (
                <div className="mt-3 p-3 bg-white/[0.02] rounded-xl border border-white/5 space-y-3">
                  {/* Sort */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider mr-1">Ordenar:</span>
                    {[
                      { value: 'popular', label: 'Popular', icon: TrendingUp },
                      { value: 'rating', label: 'Rating', icon: Star },
                      { value: 'name', label: 'A-Z', icon: Layers },
                    ].map((s) => (
                      <button
                        key={s.value}
                        onClick={() => setSortBy(s.value as typeof sortBy)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          sortBy === s.value
                            ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                            : 'bg-white/[0.03] text-gray-500 border border-white/5 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <s.icon className="w-3 h-3" />
                        {s.label}
                      </button>
                    ))}
                  </div>

                  {/* Platform */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider mr-1">Plataforma:</span>
                    {platforms.map((p) => (
                      <button
                        key={p}
                        onClick={() => setPlatformFilter(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          platformFilter === p
                            ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                            : 'bg-white/[0.03] text-gray-500 border border-white/5 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {p === 'all' ? 'Todas' : p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile category tabs */}
              <div className="lg:hidden flex gap-2 overflow-x-auto mt-3 pb-1 scrollbar-hide">
                {CATEGORIES.slice(0, 8).map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border whitespace-nowrap ${
                        category === cat.value
                          ? `bg-gradient-to-r ${cat.gradient} text-white border-white/20`
                          : 'bg-white/5 text-gray-500 border-white/5'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ===== FEATURED SECTION (only on "all" category without search) ===== */}
          {category === 'all' && !search && (
            <div className="px-4 lg:px-6 pt-6 pb-2">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <h2 className="text-base font-bold">Em Destaque</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {featuredItems.slice(0, 4).map((item) => {
                  const catData = CATEGORIES.find((c) => c.value === item.category) || CATEGORIES[0];
                  return (
                    <Card
                      key={item.name}
                      onClick={() => setSelectedItem(item)}
                      className="group cursor-pointer bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-white/[0.06] hover:border-yellow-500/30 transition-all duration-200 overflow-hidden"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${catData.gradient} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-bold text-sm truncate">{item.name}</h3>
                              <Badge className="bg-yellow-500/15 text-yellow-400 border-0 text-[9px] px-1.5 h-4 flex-shrink-0">
                                <Star className="w-2.5 h-2.5 mr-0.5 fill-yellow-400" /> TOP
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.description}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <div className="flex">{renderStars(item.rating)}</div>
                              <span className="text-[10px] text-gray-600">{formatDownloads(item.downloads)} downloads</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===== CATEGORY HEADER ===== */}
          <div className="px-4 lg:px-6 pt-5 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${catInfo.gradient} flex items-center justify-center shadow-lg`}>
                  {(() => { const Icon = catInfo.icon; return <Icon className="w-4 h-4 text-white" />; })()}
                </div>
                <div>
                  <h2 className="text-base font-bold">
                    {category === 'all' ? 'Todos os Recursos' : catInfo.label}
                  </h2>
                  <p className="text-[10px] text-gray-600">{filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} encontrado{filteredItems.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-600 hover:text-white'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-600 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ===== CONTENT GRID / LIST ===== */}
          <div className="px-4 lg:px-6 pb-8">
            {filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-gray-800 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-gray-600">Nenhum resultado</h3>
                <p className="text-xs text-gray-700 mt-1">Tente outro termo ou categoria</p>
              </div>
            ) : viewMode === 'grid' ? (
              /* ===== GRID VIEW ===== */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredItems.map((item) => {
                  const catData = CATEGORIES.find((c) => c.value === item.category) || CATEGORIES[0];
                  return (
                    <Card
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="group cursor-pointer bg-white/[0.03] border-white/[0.06] hover:border-green-500/30 hover:bg-white/[0.05] transition-all duration-200"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${catData.gradient} flex items-center justify-center text-2xl shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform`}>
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm truncate group-hover:text-green-300 transition-colors">{item.name}</h3>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.description}</p>
                          </div>
                        </div>

                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">{item.longDescription.slice(0, 120)}...</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-white/[0.04] text-gray-500 border border-white/[0.04]">{tag}</span>
                          ))}
                          {item.tags.length > 3 && <span className="text-[10px] text-gray-700">+{item.tags.length - 3}</span>}
                        </div>

                        {/* Bottom */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                          <div className="flex items-center gap-3">
                            <div className="flex">{renderStars(item.rating)}</div>
                            <span className="text-[10px] text-gray-600 flex items-center gap-1">
                              <Download className="w-3 h-3" /> {formatDownloads(item.downloads)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {item.platform.slice(0, 2).map((p) => (
                              <span key={p} className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-gray-500 border border-white/[0.04]">
                                {p === 'Windows' ? '🪟' : p === 'macOS' ? '🍎' : p === 'Linux' ? '🐧' : p === 'Android' ? '📱' : p === 'iOS' ? '📱' : '💻'} {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              /* ===== LIST VIEW ===== */
              <div className="space-y-2">
                {filteredItems.map((item) => {
                  const catData = CATEGORIES.find((c) => c.value === item.category) || CATEGORIES[0];
                  const CatIcon = catData.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="group flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-green-500/20 hover:bg-white/[0.04] cursor-pointer transition-all"
                    >
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${catData.gradient} flex items-center justify-center text-xl shadow-lg flex-shrink-0`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm truncate group-hover:text-green-300 transition-colors">{item.name}</h3>
                          {item.featured && <Badge className="bg-yellow-500/15 text-yellow-400 border-0 text-[9px] px-1.5 h-4">TOP</Badge>}
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                      </div>
                      <div className="hidden md:flex items-center gap-3">
                        <div className="flex">{renderStars(item.rating)}</div>
                        <span className="text-xs text-gray-600 w-16 text-right">{formatDownloads(item.downloads)} dl</span>
                        <Badge variant="outline" className="text-[10px] text-gray-500 border-white/5">
                          <CatIcon className="w-3 h-3 mr-1" /> {catData.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {item.platform.slice(0, 3).map((p) => (
                          <span key={p} className="text-[10px]">{p === 'Windows' ? '🪟' : p === 'macOS' ? '🍎' : p === 'Linux' ? '🐧' : '💻'}</span>
                        ))}
                      </div>
                      <Button
                        size="sm"
                        className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border-0 h-8 px-3"
                        onClick={(e) => { e.stopPropagation(); window.open(item.downloadUrl, '_blank'); }}
                      >
                        <Download className="w-3.5 h-3.5 mr-1" /> Baixar
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ===== DETAIL PANEL (modal) ===== */}
      {selectedItem && (() => {
        const item = selectedItem;
        const catData = CATEGORIES.find((c) => c.value === item.category) || CATEGORIES[0];
        const CatIcon = catData.icon;
        return (
          <div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="bg-[#0c1018] border border-white/10 rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`p-6 bg-gradient-to-r ${catData.gradient} rounded-t-2xl relative`}>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-black">{item.name}</h2>
                    <p className="text-white/70 text-sm mt-0.5">{item.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex">{renderStars(item.rating)}</div>
                      <span className="text-xs text-white/60">{formatDownloads(item.downloads)} downloads</span>
                      {item.version && <Badge className="bg-white/15 text-white border-0 text-[10px]">v{item.version}</Badge>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                {/* Category & Author */}
                <div className="flex items-center gap-3">
                  <Badge className={`bg-gradient-to-r ${catData.gradient} text-white border-0 gap-1.5`}>
                    <CatIcon className="w-3 h-3" /> {catData.label}
                  </Badge>
                  <span className="text-xs text-gray-500">Por {item.author}</span>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sobre</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.longDescription}</p>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg text-xs bg-white/[0.04] text-gray-400 border border-white/[0.06]">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Platforms */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Plataformas</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.platform.map((p) => (
                      <span key={p} className="px-3 py-1.5 rounded-lg text-xs bg-white/[0.04] text-gray-300 border border-white/[0.06] flex items-center gap-1.5">
                        {p === 'Windows' ? '🪟' : p === 'macOS' ? '🍎' : p === 'Linux' ? '🐧' : p === 'Android' ? '📱' : p === 'iOS' ? '📱' : '💻'} {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Download buttons */}
                <div className="space-y-2 pt-2">
                  <Button
                    onClick={() => window.open(item.downloadUrl, '_blank')}
                    className={`w-full h-12 bg-gradient-to-r ${catData.gradient} hover:opacity-90 text-white font-bold text-sm gap-2 shadow-lg`}
                  >
                    <Download className="w-5 h-5" /> Baixar {item.name}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(item.officialUrl, '_blank')}
                    className="w-full h-10 border-white/10 text-gray-400 hover:text-white hover:bg-white/5 gap-2 text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Site Oficial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
