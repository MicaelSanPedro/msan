'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Send,
  Plus,
  ArrowLeft,
  Search,
  Sparkles,
  Loader2,
  Trash2,
  Bot,
  X,
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

interface Character {
  id: string;
  name: string;
  description: string;
  personality: string;
  greeting: string;
  avatar: string;
  category: string;
  chats: number;
  createdAt: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CATEGORIES = [
  { value: 'todos', label: 'Todos' },
  { value: 'anime', label: '🎌 Anime' },
  { value: 'herois', label: '🦸 Heróis' },
  { value: 'historia', label: '📜 História' },
  { value: 'utilidade', label: '🛠️ Utilidade' },
  { value: 'custom', label: '✨ Customizado' },
];

const AVATAR_OPTIONS = ['🤖', '🧙', '🦊', '🐉', '👻', '🧛', '🥷', '🧑‍💻', '🎭', '👾', '🐱', '🦁', '🐸', '🦉', '🐍', '🦅', '🌸', '🔥', '⚡', '🌊', '🌙', '⭐', '💎', '🎯', '🎪', '🎸', '🎹', '🧪', '🔭', '⚔️'];

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('todos');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newChar, setNewChar] = useState({
    name: '',
    description: '',
    personality: '',
    greeting: '',
    avatar: '🤖',
    category: 'custom',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const fetchCharacters = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (category && category !== 'todos') params.set('category', category);
      const res = await fetch(`/api/characters?${params.toString()}`);
      const data = await res.json();
      setCharacters(data.characters || []);
    } catch {
      toast({ title: 'Erro', description: 'Falha ao carregar personagens', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [search, category, toast]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startChat = (character: Character) => {
    setSelectedCharacter(character);
    setMessages([{ role: 'assistant', content: character.greeting }]);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !selectedCharacter || sending) return;

    const userMsg = inputMessage.trim();
    setInputMessage('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setSending(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterId: selectedCharacter.id,
          message: userMsg,
          history,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
    } catch {
      toast({ title: 'Erro', description: 'Falha ao enviar mensagem', variant: 'destructive' });
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setSending(false);
    }
  };

  const createCharacter = async () => {
    if (!newChar.name || !newChar.personality) {
      toast({ title: 'Erro', description: 'Nome e personalidade são obrigatórios', variant: 'destructive' });
      return;
    }

    try {
      const res = await fetch('/api/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChar),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast({ title: 'Personagem criado!', description: `${newChar.name} está pronto para conversar` });
      setCreateDialogOpen(false);
      setNewChar({ name: '', description: '', personality: '', greeting: '', avatar: '🤖', category: 'custom' });
      fetchCharacters();
    } catch {
      toast({ title: 'Erro', description: 'Falha ao criar personagem', variant: 'destructive' });
    }
  };

  const deleteCharacter = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`/api/characters?id=${id}`, { method: 'DELETE' });
      toast({ title: 'Deletado', description: 'Personagem removido' });
      fetchCharacters();
    } catch {
      toast({ title: 'Erro', description: 'Falha ao deletar', variant: 'destructive' });
    }
  };

  // ===================== CHAT VIEW =====================
  if (selectedCharacter) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-950 text-white">
        {/* Chat Header */}
        <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-4xl mx-auto px-4 flex items-center gap-3 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setSelectedCharacter(null); setMessages([]); }}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xl">
              {selectedCharacter.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-white truncate">{selectedCharacter.name}</h2>
              <p className="text-xs text-gray-500 truncate">{selectedCharacter.description}</p>
            </div>
            <Badge variant="outline" className="text-gray-500 border-gray-700 text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              IA
            </Badge>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full px-4 py-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-md'
                    : 'bg-gray-800 text-gray-100 rounded-bl-md'
                }`}
              >
                {msg.role === 'assistant' && (
                  <span className="text-xs text-emerald-400 font-medium block mb-1">
                    {selectedCharacter.avatar} {selectedCharacter.name}
                  </span>
                )}
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}

          {sending && (
            <div className="flex justify-start">
              <div className="bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{selectedCharacter.name} está digitando...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="sticky bottom-0 bg-gray-900/80 backdrop-blur-md border-t border-gray-800">
          <div className="max-w-4xl mx-auto px-4 py-3 flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder={`Converse com ${selectedCharacter.name}...`}
              className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500"
              disabled={sending}
            />
            <Button
              onClick={sendMessage}
              disabled={sending || !inputMessage.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ===================== HOME VIEW =====================
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/50">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">msan.com</h1>
              <p className="text-[10px] text-gray-500 -mt-0.5 uppercase tracking-widest">AI Characters</p>
            </div>
          </div>
          <Button
            onClick={() => setCreateDialogOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Criar Personagem</span>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-8 pb-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Converse com qualquer personagem
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-xl mx-auto">
            Escolha um personagem ou crie o seu. Heróis, vilões, históricos, de anime — você decide quem conversar.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Buscar personagens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  category === cat.value
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-gray-900 text-gray-500 border border-gray-800 hover:border-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Character Grid */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 pb-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : characters.length === 0 ? (
          <div className="text-center py-20">
            <Bot className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-500">Nenhum personagem encontrado</h3>
            <p className="text-sm text-gray-600 mt-1">Crie o primeiro personagem!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {characters.map((char) => (
              <Card
                key={char.id}
                onClick={() => startChat(char)}
                className="group cursor-pointer bg-gray-900 border-gray-800 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-900/20 transition-all duration-200 overflow-hidden"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-emerald-900/30 transition-colors">
                      {char.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{char.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{char.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-[10px] text-gray-500 border-gray-700 px-1.5 h-5">
                          {char.category}
                        </Badge>
                        <span className="text-[10px] text-gray-600">{char.chats} conversas</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => deleteCharacter(char.id, e)}
                      className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-500 hover:bg-red-950/50 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Create New Card */}
            <Card
              onClick={() => setCreateDialogOpen(true)}
              className="cursor-pointer bg-gray-900/50 border-dashed border-gray-700 hover:border-emerald-500/50 transition-all duration-200"
            >
              <CardContent className="p-5 flex items-center justify-center h-full min-h-[120px]">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-2 group-hover:bg-emerald-900/30">
                    <Plus className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-500">Criar personagem</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center">
          <p className="text-xs text-gray-600">msan.com — AI Character Chat • Powered by Gemini</p>
        </div>
      </footer>

      {/* Create Character Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Criar Personagem</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Avatar Picker */}
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">Avatar</label>
              <div className="flex flex-wrap gap-2">
                {AVATAR_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setNewChar((prev) => ({ ...prev, avatar: emoji }))}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all ${
                      newChar.avatar === emoji
                        ? 'bg-emerald-600/20 ring-2 ring-emerald-500 scale-110'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Nome *</label>
              <Input
                value={newChar.name}
                onChange={(e) => setNewChar((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Dumbledore, Pikachu, Elon Musk..."
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 focus:border-emerald-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Descrição curta</label>
              <Input
                value={newChar.description}
                onChange={(e) => setNewChar((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Ex: Mago de Harry Potter"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 focus:border-emerald-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Categoria</label>
              <Select value={newChar.category} onValueChange={(v) => setNewChar((prev) => ({ ...prev, category: v }))}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {CATEGORIES.filter((c) => c.value !== 'todos').map((cat) => (
                    <SelectItem key={cat.value} value={cat.value} className="text-white focus:bg-gray-700">
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Personality */}
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Personalidade *</label>
              <Textarea
                value={newChar.personality}
                onChange={(e) => setNewChar((prev) => ({ ...prev, personality: e.target.value }))}
                placeholder="Descreva como o personagem fala, age e pensa. Ex: Você é um pirata destemido que fala com sotaque e sempre menciona o mar..."
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 focus:border-emerald-500 min-h-[100px]"
              />
            </div>

            {/* Greeting */}
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Saudação inicial</label>
              <Textarea
                value={newChar.greeting}
                onChange={(e) => setNewChar((prev) => ({ ...prev, greeting: e.target.value }))}
                placeholder="A primeira mensagem do personagem quando alguém inicia o chat"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 focus:border-emerald-500 min-h-[80px]"
              />
            </div>

            {/* Submit */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setCreateDialogOpen(false)}
                className="flex-1 border-gray-700 text-gray-400 hover:bg-gray-800"
              >
                Cancelar
              </Button>
              <Button
                onClick={createCharacter}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Criar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
