'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Download,
  Upload,
  Search,
  FileCode2,
  FileText,
  Folder,
  Trash2,
  Eye,
  HardDrive,
  Tag,
  X,
  ChevronDown,
  Terminal,
  Cpu,
  Shield,
  Database,
  Globe,
  Palette,
  BookOpen,
  Wrench,
  Gamepad2,
  Music,
  Layers,
  Sparkles,
  Loader2,
  Copy,
  Check,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// ===================== TYPES =====================
interface FileEntry {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  downloads: number;
  author: string;
  createdAt: string;
}

type SortField = 'downloads' | 'name' | 'createdAt';
type SortOrder = 'asc' | 'desc';

// ===================== CATEGORIES =====================
const CATEGORIES = [
  { value: 'all', label: 'Todos', icon: Layers, color: 'from-green-400 to-emerald-600' },
  { value: 'scripts', label: 'Scripts', icon: Terminal, color: 'from-green-400 to-emerald-600' },
  { value: 'configs', label: 'Configs', icon: Wrench, color: 'from-blue-400 to-cyan-600' },
  { value: 'cheatsheets', label: 'Cheat Sheets', icon: BookOpen, color: 'from-yellow-400 to-amber-600' },
  { value: 'dotfiles', label: 'Dotfiles', icon: FileCode2, color: 'from-purple-400 to-violet-600' },
  { value: 'templates', label: 'Templates', icon: Layers, color: 'from-pink-400 to-rose-600' },
  { value: 'security', label: 'Segurança', icon: Shield, color: 'from-red-400 to-rose-700' },
  { value: 'devops', label: 'DevOps', icon: Cpu, color: 'from-sky-400 to-blue-600' },
  { value: 'database', label: 'Database', icon: Database, color: 'from-orange-400 to-red-600' },
  { value: 'web', label: 'Web', icon: Globe, color: 'from-teal-400 to-emerald-600' },
  { value: 'design', label: 'Design', icon: Palette, color: 'from-fuchsia-400 to-pink-600' },
  { value: 'games', label: 'Games', icon: Gamepad2, color: 'from-indigo-400 to-violet-600' },
  { value: 'audio', label: 'Audio', icon: Music, color: 'from-lime-400 to-green-600' },
];

function getCategoryInfo(value: string) {
  return CATEGORIES.find((c) => c.value === value) || CATEGORIES[0];
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(type: string) {
  if (type.includes('javascript') || type.includes('typescript')) return '⚡';
  if (type.includes('python')) return '🐍';
  if (type.includes('json') || type.includes('yaml') || type.includes('xml')) return '📋';
  if (type.includes('shell') || type.includes('bash')) return '🖥️';
  if (type.includes('sql') || type.includes('database')) return '🗃️';
  if (type.includes('markdown') || type.includes('text')) return '📝';
  if (type.includes('image') || type.includes('svg')) return '🎨';
  if (type.includes('pdf')) return '📄';
  if (type.includes('zip') || type.includes('compressed')) return '📦';
  if (type.includes('css')) return '🎨';
  if (type.includes('html')) return '🌐';
  return '📁';
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'agora';
  if (diffMin < 60) return `${diffMin}min atrás`;
  if (diffHr < 24) return `${diffHr}h atrás`;
  if (diffDay < 30) return `${diffDay}d atrás`;
  return date.toLocaleDateString('pt-BR');
}

// ===================== COMPONENT =====================
export default function Home() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<FileEntry | null>(null);
  const [previewContent, setPreviewContent] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [newFile, setNewFile] = useState({
    name: '',
    description: '',
    category: 'scripts',
    tags: [] as string[],
    author: '',
    file: null as File | null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Load author from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nerdvault_author');
    if (saved) setNewFile((p) => ({ ...p, author: saved }));
  }, []);

  const fetchFiles = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (category !== 'all') params.set('category', category);
      params.set('sortField', sortField);
      params.set('sortOrder', sortOrder);
      const res = await fetch(`/api/files?${params.toString()}`);
      const data = await res.json();
      setFiles(data.files || []);
    } catch {
      toast({ title: 'Erro', description: 'Falha ao carregar arquivos', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [search, category, sortField, sortOrder, toast]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleUpload = async () => {
    if (!newFile.name || !newFile.file) {
      toast({ title: 'Erro', description: 'Nome e arquivo são obrigatórios', variant: 'destructive' });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', newFile.file);
      formData.append('name', newFile.name);
      formData.append('description', newFile.description);
      formData.append('category', newFile.category);
      formData.append('tags', JSON.stringify(newFile.tags));
      formData.append('author', newFile.author || 'Anônimo');

      localStorage.setItem('nerdvault_author', newFile.author || 'Anônimo');

      const res = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast({ title: 'Upload feito!', description: `${newFile.name} está no Vault` });
      setUploadDialogOpen(false);
      setNewFile({ name: '', description: '', category: 'scripts', tags: [], author: newFile.author, file: null });
      setTagInput('');
      fetchFiles();
    } catch (err) {
      toast({ title: 'Erro no upload', description: String(err), variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/files?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao deletar');
      toast({ title: 'Deletado', description: 'Arquivo removido do Vault' });
      fetchFiles();
    } catch {
      toast({ title: 'Erro', description: 'Falha ao deletar', variant: 'destructive' });
    }
  };

  const handleDownload = async (file: FileEntry) => {
    try {
      // Increment download count
      await fetch(`/api/files?id=${file.id}`, { method: 'PATCH' });
      // Download
      window.open(file.fileUrl, '_blank');
      // Update local state
      setFiles((prev) =>
        prev.map((f) => f.id === file.id ? { ...f, downloads: f.downloads + 1 } : f)
      );
    } catch {
      window.open(file.fileUrl, '_blank');
    }
  };

  const handlePreview = async (file: FileEntry) => {
    setPreviewFile(file);
    setPreviewDialogOpen(true);
    setPreviewLoading(true);
    setPreviewContent('');

    try {
      const res = await fetch(file.fileUrl);
      const text = await res.text();
      setPreviewContent(text);
    } catch {
      setPreviewContent('Não foi possível carregar a prévia deste arquivo.');
    } finally {
      setPreviewLoading(false);
    }
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !newFile.tags.includes(tag)) {
      setNewFile((p) => ({ ...p, tags: [...p.tags, tag] }));
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setNewFile((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((p) => p === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Stats
  const totalFiles = files.length;
  const totalDownloads = files.reduce((acc, f) => acc + f.downloads, 0);
  const totalSize = files.reduce((acc, f) => acc + f.fileSize, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e14] text-white">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/5 bg-[#0a0e14]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">
                  Nerd<span className="text-green-400">Vault</span>
                </h1>
                <p className="text-[10px] text-gray-600 -mt-0.5 uppercase tracking-[0.2em]">msan.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Stats */}
              <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><FileCode2 className="w-3 h-3" /> {totalFiles} arquivos</span>
                <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {totalDownloads} downloads</span>
                <span className="flex items-center gap-1"><HardDrive className="w-3 h-3" /> {formatFileSize(totalSize)}</span>
              </div>
              <Button
                onClick={() => setUploadDialogOpen(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white gap-2 shadow-lg shadow-green-500/20"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Upload</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative z-10 border-b border-white/5 bg-gradient-to-b from-green-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" />
            O Refúgio dos Nerds
          </div>
          <h2 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-green-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            Baixe. Compartilhe. Evolua.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Scripts, configs, cheat sheets, dotfiles, templates e tudo que um nerd precisa.
            Faça upload dos seus arquivos ou baixe o que a comunidade compartilhou.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="relative z-10 border-b border-white/5 bg-[#0a0e14]/60 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-3 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Buscar arquivos, tags, categorias..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-green-500 focus:ring-green-500/30 h-10"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleSort('downloads')}
              className={`border-white/10 h-10 w-10 ${sortField === 'downloads' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border whitespace-nowrap ${
                    category === cat.value
                      ? `bg-gradient-to-r ${cat.color} text-white border-white/20 shadow-lg`
                      : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/15 hover:bg-white/10 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* File Grid */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {/* Sort info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-600">
            {loading ? 'Carregando...' : `${files.length} arquivo${files.length !== 1 ? 's' : ''} encontrado${files.length !== 1 ? 's' : ''}`}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Filter className="w-3 h-3" />
            <button onClick={() => toggleSort('createdAt')} className={`hover:text-gray-300 transition-colors ${sortField === 'createdAt' ? 'text-green-400' : ''}`}>
              Data {sortField === 'createdAt' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
            <span>·</span>
            <button onClick={() => toggleSort('downloads')} className={`hover:text-gray-300 transition-colors ${sortField === 'downloads' ? 'text-green-400' : ''}`}>
              Downloads {sortField === 'downloads' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
            <span>·</span>
            <button onClick={() => toggleSort('name')} className={`hover:text-gray-300 transition-colors ${sortField === 'name' ? 'text-green-400' : ''}`}>
              Nome {sortField === 'name' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-green-500" />
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-20">
            <Folder className="w-16 h-16 text-gray-800 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">Vault vazio</h3>
            <p className="text-sm text-gray-700 mt-1">Seja o primeiro a fazer upload!</p>
            <Button
              onClick={() => setUploadDialogOpen(true)}
              className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white gap-2"
            >
              <Upload className="w-4 h-4" /> Upload
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => {
              const catInfo = getCategoryInfo(file.category);
              const Icon = catInfo.icon;
              return (
                <Card
                  key={file.id}
                  className="group bg-white/[0.03] border-white/[0.06] hover:border-green-500/30 hover:bg-white/[0.05] transition-all duration-200 cursor-pointer overflow-hidden"
                  onClick={() => handlePreview(file)}
                >
                  <CardContent className="p-5">
                    {/* Top row */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${catInfo.color} flex items-center justify-center text-xl flex-shrink-0 shadow-lg`}>
                        {getFileIcon(file.fileType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate text-sm">{file.name}</h3>
                        <p className="text-xs text-gray-500 truncate">{file.fileName}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleDelete(file.id, e)}
                        className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-500 hover:bg-red-950/50 transition-all h-7 w-7 p-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{file.description}</p>

                    {/* Tags */}
                    {file.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {file.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-gray-500 border border-white/5">
                            {tag}
                          </span>
                        ))}
                        {file.tags.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] text-gray-600">+{file.tags.length - 3}</span>
                        )}
                      </div>
                    )}

                    {/* Bottom row */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex items-center gap-3 text-[10px] text-gray-600">
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" /> {file.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-3 h-3" /> {formatFileSize(file.fileSize)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-700">{timeAgo(file.createdAt)}</span>
                        <Button
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleDownload(file); }}
                          className="h-7 px-2.5 bg-green-500/10 text-green-400 hover:bg-green-500/20 border-0 text-xs"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Upload card */}
            <Card
              onClick={() => setUploadDialogOpen(true)}
              className="cursor-pointer bg-white/[0.02] border-dashed border-white/10 hover:border-green-500/30 transition-all duration-200"
            >
              <CardContent className="p-5 flex flex-col items-center justify-center h-full min-h-[200px]">
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-3">
                  <Upload className="w-7 h-7 text-green-500/50" />
                </div>
                <p className="text-sm text-gray-500 font-medium">Enviar arquivo</p>
                <p className="text-[10px] text-gray-700 mt-1">Compartilhe com o Vault</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#0a0e14]/80 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <p className="text-[10px] text-gray-700">NerdVault — msan.com • O Refúgio dos Nerds</p>
          <p className="text-[10px] text-gray-700">{totalFiles} arquivos · {formatFileSize(totalSize)}</p>
        </div>
      </footer>

      {/* ===================== UPLOAD DIALOG ===================== */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="bg-[#0d1117] border-white/10 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-green-400" />
              Enviar para o Vault
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* File input */}
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Arquivo *</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-green-500/30 transition-colors cursor-pointer"
              >
                {newFile.file ? (
                  <div className="space-y-1">
                    <span className="text-2xl block">{getFileIcon(newFile.file.type)}</span>
                    <p className="text-sm text-green-400 font-medium">{newFile.file.name}</p>
                    <p className="text-xs text-gray-600">{formatFileSize(newFile.file.size)}</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Upload className="w-8 h-8 text-gray-600 mx-auto" />
                    <p className="text-sm text-gray-500">Clique para selecionar</p>
                    <p className="text-[10px] text-gray-700">Scripts, configs, textos, PDFs... até 50MB</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setNewFile((p) => ({ ...p, file }));
                }}
              />
            </div>

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Nome do arquivo *</label>
              <Input
                value={newFile.name}
                onChange={(e) => setNewFile((p) => ({ ...p, name: e.target.value }))}
                placeholder="Ex: Script de backup automático"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-green-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Descrição</label>
              <Textarea
                value={newFile.description}
                onChange={(e) => setNewFile((p) => ({ ...p, description: e.target.value }))}
                placeholder="O que esse arquivo faz? Pra que serve?"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-green-500 min-h-[80px]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Categoria</label>
              <Select value={newFile.category} onValueChange={(v) => setNewFile((p) => ({ ...p, category: v }))}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0d1117] border-white/10">
                  {CATEGORIES.filter((c) => c.value !== 'all').map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <SelectItem key={cat.value} value={cat.value} className="text-white focus:bg-white/10 focus:text-white">
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5" />
                          {cat.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Tags</label>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                  placeholder="Ex: python, backup, automação"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-green-500"
                />
                <Button variant="outline" onClick={addTag} className="border-white/10 text-gray-400 hover:bg-white/5">
                  <Tag className="w-4 h-4" />
                </Button>
              </div>
              {newFile.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {newFile.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-green-400 border-green-500/20 bg-green-500/5 text-xs gap-1 pr-1">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-red-400 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Author */}
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Autor</label>
              <Input
                value={newFile.author}
                onChange={(e) => setNewFile((p) => ({ ...p, author: e.target.value }))}
                placeholder="Seu nome ou nick"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-green-500"
              />
            </div>

            {/* Submit */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setUploadDialogOpen(false)}
                className="flex-1 border-white/10 text-gray-400 hover:bg-white/5"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpload}
                disabled={uploading}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white gap-2"
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                Enviar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===================== PREVIEW DIALOG ===================== */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="bg-[#0d1117] border-white/10 text-white max-w-2xl max-h-[85vh] overflow-y-auto">
          {previewFile && (() => {
            const catInfo = getCategoryInfo(previewFile.category);
            const Icon = catInfo.icon;
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="text-white flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${catInfo.color} flex items-center justify-center text-xl flex-shrink-0`}>
                      {getFileIcon(previewFile.fileType)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate">{previewFile.name}</h3>
                      <p className="text-xs text-gray-500 font-normal">{previewFile.fileName} · {formatFileSize(previewFile.fileSize)}</p>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                  {/* Meta */}
                  <div className="flex flex-wrap gap-2">
                    <Badge className={`bg-gradient-to-r ${catInfo.color} text-white border-0 text-xs gap-1`}>
                      <Icon className="w-3 h-3" /> {catInfo.label}
                    </Badge>
                    <Badge variant="outline" className="text-gray-400 border-white/10 text-xs gap-1">
                      <Download className="w-3 h-3" /> {previewFile.downloads} downloads
                    </Badge>
                    <Badge variant="outline" className="text-gray-400 border-white/10 text-xs">
                      Por {previewFile.author}
                    </Badge>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm text-gray-300 leading-relaxed">{previewFile.description || 'Sem descrição'}</p>
                  </div>

                  {/* Tags */}
                  {previewFile.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {previewFile.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-white/5 text-gray-400 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Preview content */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 font-medium">Prévia</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(previewContent)}
                        className="h-6 text-xs text-gray-500 hover:text-white gap-1"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? 'Copiado!' : 'Copiar'}
                      </Button>
                    </div>
                    <div className="bg-[#010409] border border-white/5 rounded-xl p-4 max-h-[300px] overflow-auto">
                      {previewLoading ? (
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Loader2 className="w-4 h-4 animate-spin" /> Carregando prévia...
                        </div>
                      ) : (
                        <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap break-all leading-relaxed">
                          {previewContent.slice(0, 5000)}
                          {previewContent.length > 5000 && '\n\n... (arquivo truncado na prévia)'}
                        </pre>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownload(previewFile)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white gap-2"
                    >
                      <Download className="w-4 h-4" /> Baixar Arquivo
                    </Button>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
