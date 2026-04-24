'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Upload,
  Download,
  Trash2,
  Search,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  Presentation,
  FolderOpen,
  HardDrive,
  CloudUpload,
  X,
  Loader2,
  ArrowUpDown,
  Package,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface FileEntry {
  id: string;
  name: string;
  originalName: string;
  size: number;
  type: string;
  category: string;
  downloads: number;
  createdAt: string;
}

interface Stats {
  totalFiles: number;
  totalDownloads: number;
  totalSize: number;
}

const CATEGORIES = [
  { value: 'todos', label: 'Todos', icon: FolderOpen },
  { value: 'imagens', label: 'Imagens', icon: FileImage },
  { value: 'videos', label: 'Vídeos', icon: FileVideo },
  { value: 'audios', label: 'Áudios', icon: FileAudio },
  { value: 'documentos', label: 'Documentos', icon: FileText },
  { value: 'planilhas', label: 'Planilhas', icon: FileSpreadsheet },
  { value: 'apresentacoes', label: 'Apresentações', icon: Presentation },
  { value: 'compactados', label: 'Compactados', icon: FileArchive },
  { value: 'codigo', label: 'Código', icon: FileCode },
  { value: 'outros', label: 'Outros', icon: File },
];

function getFileIcon(category: string) {
  const cat = CATEGORIES.find((c) => c.value === category);
  return cat ? cat.icon : File;
}

function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    imagens: 'bg-pink-100 text-pink-700 border-pink-200',
    videos: 'bg-purple-100 text-purple-700 border-purple-200',
    audios: 'bg-orange-100 text-orange-700 border-orange-200',
    documentos: 'bg-blue-100 text-blue-700 border-blue-200',
    planilhas: 'bg-green-100 text-green-700 border-green-200',
    apresentacoes: 'bg-amber-100 text-amber-700 border-amber-200',
    compactados: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    codigo: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    outros: 'bg-gray-100 text-gray-700 border-gray-200',
  };
  return colors[category] || colors.outros;
}

function getCategoryIconBg(category: string): string {
  const colors: Record<string, string> = {
    imagens: 'bg-pink-50 text-pink-600',
    videos: 'bg-purple-50 text-purple-600',
    audios: 'bg-orange-50 text-orange-600',
    documentos: 'bg-blue-50 text-blue-600',
    planilhas: 'bg-green-50 text-green-600',
    apresentacoes: 'bg-amber-50 text-amber-600',
    compactados: 'bg-yellow-50 text-yellow-600',
    codigo: 'bg-emerald-50 text-emerald-600',
    outros: 'bg-gray-50 text-gray-600',
  };
  return colors[category] || colors.outros;
}

export default function Home() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [stats, setStats] = useState<Stats>({ totalFiles: 0, totalDownloads: 0, totalSize: 0 });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('todos');
  const [sort, setSort] = useState('recent');
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<FileEntry | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchFiles = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (category && category !== 'todos') params.set('category', category);
      if (sort) params.set('sort', sort);

      const res = await fetch(`/api/files?${params.toString()}`);
      const data = await res.json();
      setFiles(data.files || []);
      setStats(data.stats || { totalFiles: 0, totalDownloads: 0, totalSize: 0 });
    } catch {
      toast({ title: 'Erro', description: 'Falha ao carregar arquivos', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [search, category, sort, toast]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleUpload = async (fileList: FileList | File[]) => {
    const filesToUpload = Array.from(fileList);
    if (filesToUpload.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < filesToUpload.length; i++) {
        const formData = new FormData();
        formData.append('file', filesToUpload[i]);

        const res = await fetch('/api/files', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Erro no upload');
        }

        setUploadProgress(Math.round(((i + 1) / filesToUpload.length) * 100));
      }

      toast({
        title: 'Upload concluído!',
        description: `${filesToUpload.length} arquivo(s) enviado(s) com sucesso.`,
      });

      fetchFiles();
    } catch (error: any) {
      toast({
        title: 'Erro no upload',
        description: error.message || 'Falha ao enviar arquivo',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDownload = async (file: FileEntry) => {
    try {
      const res = await fetch(`/api/files/${file.id}/download`);
      if (!res.ok) throw new Error('Erro no download');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.originalName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Download iniciado!',
        description: `${file.originalName} está sendo baixado.`,
      });

      // Atualizar contador
      setFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, downloads: f.downloads + 1 } : f))
      );
    } catch {
      toast({
        title: 'Erro no download',
        description: 'Falha ao baixar o arquivo.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!fileToDelete) return;

    try {
      const res = await fetch(`/api/files?id=${fileToDelete.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao deletar');

      toast({
        title: 'Arquivo deletado',
        description: `${fileToDelete.originalName} foi removido.`,
      });

      fetchFiles();
    } catch {
      toast({
        title: 'Erro ao deletar',
        description: 'Falha ao remover o arquivo.',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setFileToDelete(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">msan.com</h1>
                <p className="text-[10px] text-gray-400 -mt-0.5 font-medium uppercase tracking-widest">
                  File Sharing
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <HardDrive className="w-4 h-4" />
                <span>{stats.totalFiles} arquivos</span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Download className="w-4 h-4" />
                <span>{stats.totalDownloads} downloads</span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>{formatSize(stats.totalSize)} total</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300
            ${
              isDragging
                ? 'border-emerald-400 bg-emerald-50 scale-[1.01]'
                : 'border-gray-300 bg-white hover:border-emerald-300 hover:bg-emerald-50/30'
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleUpload(e.target.files)}
          />

          <div className="flex flex-col items-center gap-3">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isDragging
                  ? 'bg-emerald-100 text-emerald-600 scale-110'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <CloudUpload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {isDragging ? 'Solte os arquivos aqui!' : 'Arraste e solte seus arquivos'}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                ou clique para selecionar do computador
              </p>
            </div>
          </div>

          {uploading && (
            <div className="mt-4 max-w-xs mx-auto">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-gray-500 mt-2">
                Enviando... {uploadProgress}%
              </p>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar arquivos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white border-gray-200 focus:border-emerald-400 focus:ring-emerald-400"
            />
          </div>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-48 bg-white border-gray-200">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full sm:w-44 bg-white border-gray-200">
              <ArrowUpDown className="w-4 h-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Mais recentes</SelectItem>
              <SelectItem value="name">Nome A-Z</SelectItem>
              <SelectItem value="size">Maior tamanho</SelectItem>
              <SelectItem value="downloads">Mais baixados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Pills (Mobile) */}
        <div className="flex gap-2 overflow-x-auto pb-1 sm:hidden">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                category === cat.value
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-white text-gray-500 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Stats Cards (Mobile) */}
        <div className="grid grid-cols-3 gap-3 sm:hidden">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-gray-900">{stats.totalFiles}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Arquivos</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-gray-900">{stats.totalDownloads}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Downloads</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-gray-900">{formatSize(stats.totalSize)}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Total</p>
            </CardContent>
          </Card>
        </div>

        {/* File List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-20">
            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-500">Nenhum arquivo encontrado</h3>
            <p className="text-sm text-gray-400 mt-1">
              Faça upload de um arquivo para começar!
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {files.map((file) => {
              const IconComp = getFileIcon(file.category);
              return (
                <Card
                  key={file.id}
                  className="group bg-white hover:shadow-md transition-all duration-200 border-0 shadow-sm overflow-hidden"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getCategoryIconBg(file.category)}`}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {file.originalName}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                          <span className="text-xs text-gray-400">
                            {formatSize(file.size)}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-[10px] px-1.5 py-0 h-5 ${getCategoryColor(file.category)}`}
                          >
                            {file.category}
                          </Badge>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {file.downloads}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatDate(file.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          onClick={() => handleDownload(file)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                        >
                          <Download className="w-4 h-4 mr-1.5" />
                          Baixar
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setFileToDelete(file);
                            setDeleteDialogOpen(true);
                          }}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Package className="w-4 h-4" />
              <span>msan.com — File Sharing</span>
            </div>
            <p className="text-xs text-gray-400">
              Armazenamento seguro e compartilhamento rápido de arquivos
            </p>
          </div>
        </div>
      </footer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Tem certeza que deseja deletar <strong>{fileToDelete?.originalName}</strong>?
            Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setFileToDelete(null);
              }}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Deletar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
