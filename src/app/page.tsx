'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Trophy,
  Zap,
  Flame,
  Star,
  Crown,
  Code2,
  Timer,
  ChevronRight,
  Play,
  RotateCcw,
  Skull,
  CheckCircle2,
  XCircle,
  ArrowUp,
  Medal,
  Target,
  Brain,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

// ===================== TYPES =====================
interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  streak: number;
  level: number;
  questionsAnswered: number;
  createdAt: string;
}

type GameState = 'home' | 'playing' | 'result' | 'leaderboard';

// ===================== QUESTION BANK =====================
const QUESTIONS: Question[] = [
  // JavaScript
  { id: 1, question: 'Qual o resultado de typeof null em JavaScript?', options: ['"null"', '"object"', '"undefined"', '"boolean"'], correct: 1, category: 'javascript', difficulty: 'easy', explanation: 'typeof null retorna "object" — é um bug histórico do JavaScript que existe desde a primeira versão.' },
  { id: 2, question: 'O que o método Array.prototype.map() retorna?', options: ['O array original modificado', 'Um novo array com os resultados', 'undefined', 'Um booleano'], correct: 1, category: 'javascript', difficulty: 'easy', explanation: 'map() retorna um NOVO array com os resultados da função callback aplicada a cada elemento.' },
  { id: 3, question: 'Qual a diferença entre == e === em JavaScript?', options: ['Nenhuma', '== compara valor e tipo, === só valor', '== compara valor, === compara valor e tipo', '=== é mais rápido que =='], correct: 2, category: 'javascript', difficulty: 'easy', explanation: '== faz coerção de tipo (compara só o valor), === compara valor E tipo (igualdade estrita).' },
  { id: 4, question: 'O que é Closure em JavaScript?', options: ['Um tipo de loop', 'Uma função que lembra do escopo onde foi criada', 'Um método de array', 'Uma forma de declarar variáveis'], correct: 1, category: 'javascript', difficulty: 'medium', explanation: 'Closure é quando uma função "lembra" do escopo léxico onde foi definida, mesmo quando executada fora dele.' },
  { id: 5, question: 'Qual o resultado de: console.log(0.1 + 0.2 === 0.3)?', options: ['true', 'false', 'undefined', 'Erro'], correct: 1, category: 'javascript', difficulty: 'medium', explanation: 'Devido à precisão de ponto flutuante IEEE 754, 0.1 + 0.2 = 0.30000000000000004, então a comparação retorna false.' },
  { id: 6, question: 'O que faz o operador ?? (nullish coalescing)?', options: ['Retorna o lado direito se o esquerdo for null/undefined', 'Retorna o lado direito sempre', 'Verifica se ambos são null', 'Faz OR lógico'], correct: 0, category: 'javascript', difficulty: 'medium', explanation: 'O operador ?? retorna o lado direito APENAS se o lado esquerdo for null ou undefined (diferente de || que considera falsy).' },
  { id: 7, question: 'O que é Event Loop em JavaScript?', options: ['Um evento que se repete', 'O mecanismo que permite operações assíncronas', 'Um tipo de promise', 'Uma biblioteca de eventos'], correct: 1, category: 'javascript', difficulty: 'hard', explanation: 'O Event Loop é o mecanismo que permite ao JavaScript single-threaded executar operações assíncronas gerenciando a call stack e a callback queue.' },
  { id: 8, question: 'Qual o resultado de: [...new Set([1,1,2,2,3])]?', options: ['[1,1,2,2,3]', '[1,2,3]', 'Erro', '[3,2,1]'], correct: 1, category: 'javascript', difficulty: 'medium', explanation: 'Set remove duplicatas e o spread operator (...) converte o Set de volta para array. Resultado: [1,2,3].' },

  // Python
  { id: 9, question: 'Qual a saída de: print(type([])) em Python?', options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"], correct: 0, category: 'python', difficulty: 'easy', explanation: '[] é a sintaxe literal de uma lista em Python. type() retorna <class \'list\'.' },
  { id: 10, question: 'O que faz o decorador @staticmethod em Python?', options: ['Transforma o método em async', 'Define um método que não recebe self nem cls', 'Cria uma propriedade', 'Herda de outra classe'], correct: 1, category: 'python', difficulty: 'medium', explanation: '@staticmethod define um método que não recebe automaticamente self (instância) nem cls (classe) como primeiro parâmetro.' },
  { id: 11, question: 'Qual a diferença entre list e tuple em Python?', options: ['Nenhuma', 'List é imutável, tuple é mutável', 'List é mutável, tuple é imutável', 'Tuple aceita tipos diferentes, list não'], correct: 2, category: 'python', difficulty: 'easy', explanation: 'Listas ([]) são mutáveis — podem ser alteradas. Tuplas (()) são imutáveis — não podem ser modificadas após criação.' },
  { id: 12, question: 'O que significa PEP 8?', options: ['Uma biblioteca Python', 'O guia de estilo de código Python', 'Um framework web', 'Um padrão de banco de dados'], correct: 1, category: 'python', difficulty: 'easy', explanation: 'PEP 8 é o guia de estilo oficial para código Python, definindo convenções de formatação e boas práticas.' },
  { id: 13, question: 'Qual a saída de: print(2 ** 3 ** 2)?', options: ['64', '512', '36', 'Erro'], correct: 1, category: 'python', difficulty: 'hard', explanation: 'O operador ** é associativo à direita em Python: 2 ** (3 ** 2) = 2 ** 9 = 512.' },
  { id: 14, question: 'O que é um generator em Python?', options: ['Um tipo de lista', 'Uma função que usa yield para produzir valores sob demanda', 'Um decorador', 'Um módulo built-in'], correct: 1, category: 'python', difficulty: 'medium', explanation: 'Generators usam yield para pausar a execução e retornar valores um de cada vez, economizando memória.' },

  // CSS
  { id: 15, question: 'O que faz display: flex em CSS?', options: ['Esconde o elemento', 'Cria um container flexível para alinhar filhos', 'Deixa o elemento invisível mas ocupando espaço', 'Transforma em inline'], correct: 1, category: 'css', difficulty: 'easy', explanation: 'display: flex transforma o elemento em um flex container, permitindo alinhar e distribuir os filhos facilmente.' },
  { id: 16, question: 'Qual a diferença entre padding e margin?', options: ['São iguais', 'Padding é espaço interno, margin é externo', 'Margin é interno, padding é externo', 'Padding é para texto, margin para imagens'], correct: 1, category: 'css', difficulty: 'easy', explanation: 'Padding é o espaçamento INTERNO (entre conteúdo e borda). Margin é o espaçamento EXTERNO (entre borda e outros elementos).' },
  { id: 17, question: 'O que faz position: sticky em CSS?', options: ['Fixa o elemento sempre no topo', 'Alterna entre relative e fixed baseado no scroll', 'Posiciona relativo ao pai', 'Remove o elemento do fluxo'], correct: 1, category: 'css', difficulty: 'medium', explanation: 'sticky funciona como relative até atingir um limiar de scroll, então se comporta como fixed.' },
  { id: 18, question: 'Qual a especificidade CSS correta (menor para maior)?', options: ['ID > Classe > Elemento', 'Elemento > Classe > ID', 'Classe > ID > Elemento', 'Elemento > ID > Classe'], correct: 0, category: 'css', difficulty: 'medium', explanation: 'A ordem de especificidade é: Elemento (0,0,1) < Classe (0,1,0) < ID (1,0,0). !important sobrepõe tudo.' },
  { id: 19, question: 'O que é CSS Grid?', options: ['Um sistema de cores', 'Um layout bidimensional de linhas e colunas', 'Um framework CSS', 'Um pré-processador'], correct: 1, category: 'css', difficulty: 'easy', explanation: 'CSS Grid é um sistema de layout bidimensional que permite organizar elementos em linhas e colunas simultaneamente.' },

  // React
  { id: 20, question: 'O que é JSX?', options: ['Uma biblioteca', 'Extensão de sintaxe que permite escrever HTML no JavaScript', 'Um framework', 'Um transpilador'], correct: 1, category: 'react', difficulty: 'easy', explanation: 'JSX é uma extensão de sintaxe do JavaScript que permite escrever estruturas HTML-like dentro do código JavaScript.' },
  { id: 21, question: 'Qual a diferença entre useState e useEffect?', options: ['São iguais', 'useState gerencia estado, useEffect gerencia efeitos colaterais', 'useEffect gerencia estado, useState gerencia efeitos', 'Não existem no React'], correct: 1, category: 'react', difficulty: 'easy', explanation: 'useState declara variáveis de estado. useEffect executa efeitos colaterais (fetch, timers, subscriptions) após a renderização.' },
  { id: 22, question: 'O que faz a prop key em uma lista React?', options: ['Estiliza o elemento', 'Ajuda o React a identificar quais itens mudaram', 'Cria uma chave de segurança', 'Define o tipo do elemento'], correct: 1, category: 'react', difficulty: 'medium', explanation: 'A prop key ajuda o React a identificar de forma única cada item na lista, otimizando o re-render e evitando bugs.' },
  { id: 23, question: 'O que é Virtual DOM?', options: ['Uma cópia do DOM real em memória', 'Um navegador virtual', 'Uma biblioteca externa', 'Um tipo de componente'], correct: 0, category: 'react', difficulty: 'medium', explanation: 'Virtual DOM é uma representação leve do DOM real em memória. React compara mudanças e aplica apenas o necessário (reconciliation).' },
  { id: 24, question: 'Quando usar useMemo no React?', options: ['Sempre que possível', 'Para memoizar cálculos pesados e evitar recomputação', 'Para gerenciar estado', 'Para fazer fetch de dados'], correct: 1, category: 'react', difficulty: 'hard', explanation: 'useMemo memoiza o resultado de uma função custosa, só recomputando quando as dependências mudam. Use com moderação.' },

  // TypeScript
  { id: 25, question: 'Qual a diferença entre interface e type em TypeScript?', options: ['São idênticos', 'Interface é extensível, type é mais flexível com uniões', 'Type é para classes, interface para objetos', 'Não existe diferença prática'], correct: 1, category: 'typescript', difficulty: 'medium', explanation: 'Interfaces suportam declaration merging e extensão. Types suportam uniões, interseções e tipos condicionais mais facilmente.' },
  { id: 26, question: 'O que faz o operador ! (non-null assertion) em TypeScript?', options: ['Negação lógica', 'Afirma que o valor não é null/undefined', 'Converte para boolean', 'Remove o valor'], correct: 1, category: 'typescript', difficulty: 'medium', explanation: 'O operador ! diz ao TypeScript "confia, esse valor não é null nem undefined". Remove null/undefined do tipo. Cuidado: não verifica em runtime!' },
  { id: 27, question: 'O que são Generics em TypeScript?', options: ['Tipos genéricos que aceitam qualquer valor', 'Tipos parametrizáveis que permitem reutilizar código com tipos diferentes', 'Variáveis globais', 'Um framework'], correct: 1, category: 'typescript', difficulty: 'hard', explanation: 'Generics permitem criar funções/classes que trabalham com tipos variados mantendo a segurança de tipo, como Array<T>.' },

  // SQL
  { id: 28, question: 'Qual a diferença entre INNER JOIN e LEFT JOIN?', options: ['São iguais', 'INNER retorna só matches, LEFT retorna tudo da esquerda + matches', 'LEFT é mais rápido', 'INNER retorna mais linhas'], correct: 1, category: 'sql', difficulty: 'medium', explanation: 'INNER JOIN retorna apenas linhas com match em ambas as tabelas. LEFT JOIN retorna TODAS as linhas da tabela esquerda, com NULL onde não há match.' },
  { id: 29, question: 'O que faz a cláusula GROUP BY em SQL?', options: ['Ordena resultados', 'Agrupa linhas com valores iguais para funções agregadas', 'Filtra linhas', 'Cria índices'], correct: 1, category: 'sql', difficulty: 'easy', explanation: 'GROUP BY agrupa linhas que têm os mesmos valores, usado com funções agregadas como COUNT, SUM, AVG, MAX, MIN.' },
  { id: 30, question: 'Qual a diferença entre WHERE e HAVING?', options: ['São iguais', 'WHERE filtra antes do GROUP BY, HAVING filtra depois', 'HAVING é mais rápido', 'WHERE é para joins'], correct: 1, category: 'sql', difficulty: 'medium', explanation: 'WHERE filtra linhas ANTES do agrupamento. HAVING filtra grupos DEPOIS do GROUP BY, podendo usar funções agregadas.' },

  // Git
  { id: 31, question: 'Qual a diferença entre git merge e git rebase?', options: ['São iguais', 'Merge preserva histórico, rebase reescreve', 'Rebase é mais seguro', 'Merge apaga commits'], correct: 1, category: 'git', difficulty: 'hard', explanation: 'Merge cria um merge commit preservando o histórico. Rebase reescreve o histórico aplicando commits em cima da base, criando histórico linear.' },
  { id: 32, question: 'O que faz git stash?', options: ['Deleta mudanças', 'Salva mudanças temporariamente sem commit', 'Cria um branch', 'Faz push'], correct: 1, category: 'git', difficulty: 'easy', explanation: 'git stash guarda suas mudanças não commitadas temporariamente, permitindo trocar de branch ou fazer pull sem perder trabalho.' },
  { id: 33, question: 'Qual comando desfaz o último commit mantendo as mudanças?', options: ['git reset --hard HEAD~1', 'git reset --soft HEAD~1', 'git revert HEAD', 'git delete commit'], correct: 1, category: 'git', difficulty: 'medium', explanation: 'git reset --soft HEAD~1 desfaz o commit mas mantém as mudanças staged. --hard apaga tudo. revert cria um novo commit desfazendo.' },

  // HTML
  { id: 34, question: 'Qual a diferença entre <div> e <span>?', options: ['São iguais', 'div é block, span é inline', 'span é block, div é inline', 'div é para texto, span para imagens'], correct: 1, category: 'html', difficulty: 'easy', explanation: '<div> é um elemento block (ocupa toda a largura). <span> é inline (ocupa só o espaço do conteúdo).' },
  { id: 35, question: 'O que é semântica em HTML5?', options: ['Usar CSS bonito', 'Usar tags que descrevem o significado do conteúdo', 'Usar JavaScript', 'Criar animações'], correct: 1, category: 'html', difficulty: 'easy', explanation: 'HTML semântico usa tags como <header>, <nav>, <main>, <article>, <footer> que descrevem o SIGNIFICADO do conteúdo, melhorando acessibilidade e SEO.' },

  // Node.js
  { id: 36, question: 'O que é middleware em Express.js?', options: ['Um banco de dados', 'Uma função que intercepta e processa requisições', 'Um template engine', 'Um servidor separado'], correct: 1, category: 'node', difficulty: 'medium', explanation: 'Middleware é uma função que tem acesso ao req, res e next(). Pode modificar requisições, validar dados, logar, tratar erros, etc.' },
  { id: 37, question: 'O que é o event-driven architecture do Node.js?', options: ['Um padrão de design', 'Um modelo onde ações são disparadas por eventos', 'Uma biblioteca', 'Um banco de dados'], correct: 1, category: 'node', difficulty: 'medium', explanation: 'Node.js usa um modelo event-driven: em vez de bloquear esperando I/O, registra callbacks que executam quando operações terminam (via Event Loop).' },

  // Docker
  { id: 38, question: 'Qual a diferença entre Docker image e container?', options: ['São iguais', 'Image é o template, container é a instância rodando', 'Container é o template, image é a instância', 'Image é para produção, container para dev'], correct: 1, category: 'devops', difficulty: 'easy', explanation: 'Image é um template imutável com o app e dependências. Container é uma instância rodando dessa image — como classe vs objeto.' },
  { id: 39, question: 'O que faz um Dockerfile?', options: ['Rodar containers', 'Definir instruções para buildar uma image', 'Gerenciar networks', 'Fazer deploy'], correct: 1, category: 'devops', difficulty: 'easy', explanation: 'Dockerfile é um arquivo de instruções (FROM, RUN, COPY, CMD) que define como construir uma Docker image.' },

  // Algoritmos
  { id: 40, question: 'Qual a complexidade de busca binária?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1, category: 'algoritmos', difficulty: 'medium', explanation: 'Busca binária divide o problema pela metade a cada passo, resultando em complexidade O(log n).' },
  { id: 41, question: 'Qual estrutura de dados usa FIFO?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correct: 1, category: 'algoritmos', difficulty: 'easy', explanation: 'Queue (Fila) usa First In, First Out — o primeiro a entrar é o primeiro a sair. Stack usa LIFO (Last In, First Out).' },
  { id: 42, question: 'O que é recursão?', options: ['Um tipo de loop', 'Uma função que chama a si mesma', 'Uma estrutura de dados', 'Um algoritmo de ordenação'], correct: 1, category: 'algoritmos', difficulty: 'easy', explanation: 'Recursão é quando uma função chama a si mesma para resolver subproblemas menores, com um caso base para parar.' },
  { id: 43, question: 'Qual algoritmo de ordenação tem complexidade O(n log n) no pior caso?', options: ['Bubble Sort', 'Merge Sort', 'Selection Sort', 'Insertion Sort'], correct: 1, category: 'algoritmos', difficulty: 'hard', explanation: 'Merge Sort sempre divide e conquista em O(n log n). Bubble, Selection e Insertion Sort são O(n²) no pior caso.' },

  // Segurança
  { id: 44, question: 'O que é XSS (Cross-Site Scripting)?', options: ['Um framework', 'Um ataque que injeta scripts maliciosos em páginas', 'Um protocolo de segurança', 'Um tipo de criptografia'], correct: 1, category: 'seguranca', difficulty: 'medium', explanation: 'XSS é um ataque onde scripts maliciosos são injetados em páginas web visualizadas por outros usuários, roubando dados ou sessões.' },
  { id: 45, question: 'O que é CORS?', options: ['Um banco de dados', 'Um mecanismo que controla requisições cross-origin', 'Um framework CSS', 'Um servidor proxy'], correct: 1, category: 'seguranca', difficulty: 'medium', explanation: 'CORS (Cross-Origin Resource Sharing) é um mecanismo de segurança do navegador que controla quais domínios podem fazer requisições ao seu servidor.' },

  // APIs
  { id: 46, question: 'Qual a diferença entre REST e GraphQL?', options: ['São iguais', 'REST usa endpoints fixos, GraphQL usa queries flexíveis', 'GraphQL é mais antigo', 'REST é para frontend, GraphQL para backend'], correct: 1, category: 'api', difficulty: 'medium', explanation: 'REST tem endpoints fixos que retornam dados pré-definidos. GraphQL tem um endpoint único onde o cliente especifica exatamente os dados que precisa.' },
  { id: 47, question: 'O que é um status HTTP 404?', options: ['Erro do servidor', 'Não encontrado', 'Não autorizado', 'Requisição inválida'], correct: 1, category: 'api', difficulty: 'easy', explanation: '404 Not Found significa que o recurso solicitado não existe no servidor. 500 é erro do servidor, 401 é não autorizado, 400 é bad request.' },
  { id: 48, question: 'Qual método HTTP é idempotente?', options: ['POST', 'PUT', 'PATCH', 'Nenhum'], correct: 1, category: 'api', difficulty: 'hard', explanation: 'PUT é idempotente — fazer a mesma requisição várias vezes produz o mesmo resultado. POST não é: pode criar recursos duplicados.' },
];

const CATEGORIES = [
  { value: 'all', label: 'Todas', icon: '🎯', color: 'from-violet-500 to-purple-600' },
  { value: 'javascript', label: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-amber-500' },
  { value: 'python', label: 'Python', icon: '🐍', color: 'from-blue-400 to-green-500' },
  { value: 'css', label: 'CSS', icon: '🎨', color: 'from-pink-500 to-rose-500' },
  { value: 'react', label: 'React', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
  { value: 'typescript', label: 'TypeScript', icon: '🔷', color: 'from-blue-500 to-indigo-600' },
  { value: 'sql', label: 'SQL', icon: '🗃️', color: 'from-orange-400 to-red-500' },
  { value: 'git', label: 'Git', icon: '🔀', color: 'from-red-500 to-orange-600' },
  { value: 'html', label: 'HTML', icon: '📄', color: 'from-orange-500 to-red-600' },
  { value: 'node', label: 'Node.js', icon: '🟢', color: 'from-green-500 to-emerald-600' },
  { value: 'algoritmos', label: 'Algoritmos', icon: '🧠', color: 'from-purple-500 to-violet-600' },
  { value: 'devops', label: 'DevOps', icon: '🐳', color: 'from-sky-400 to-cyan-500' },
  { value: 'seguranca', label: 'Segurança', icon: '🔒', color: 'from-red-600 to-rose-700' },
  { value: 'api', label: 'APIs', icon: '🌐', color: 'from-teal-400 to-emerald-500' },
];

const LEVEL_NAMES = [
  'Bug Novato', 'Script Kiddie', 'Debugger', 'Code Monkey', 'Junior Dev',
  'Mid-Level', 'Senior Dev', 'Tech Lead', 'Architect', 'CTO Supremo',
  'Lord do Código', 'Deus do Terminal', 'Hacker Ético', 'Mestre dos Bits', 'Lenda Viva',
];

const XP_PER_LEVEL = 100;
const TIME_PER_QUESTION = 15; // seconds

function getLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL);
}

function getXPProgress(xp: number): number {
  return (xp % XP_PER_LEVEL) / XP_PER_LEVEL * 100;
}

function getLevelName(xp: number): string {
  const level = getLevel(xp);
  return LEVEL_NAMES[Math.min(level, LEVEL_NAMES.length - 1)];
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ===================== COMPONENT =====================
export default function Home() {
  const [gameState, setGameState] = useState<GameState>('home');
  const [playerName, setPlayerName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [comboText, setComboText] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { toast } = useToast();

  // Load saved name
  useEffect(() => {
    const saved = localStorage.getItem('codebattle_name');
    if (saved) setPlayerName(saved);
    const savedXP = localStorage.getItem('codebattle_xp');
    if (savedXP) setTotalXP(parseInt(savedXP));
  }, []);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing' || showExplanation) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up!
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, currentQuestion, showExplanation]);

  const handleTimeout = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsCorrect(false);
    setStreak(0);
    setWrongCount((p) => p + 1);
    setShowExplanation(true);
    setSelectedAnswer(-1);
  };

  const startGame = useCallback(() => {
    if (!playerName.trim()) {
      toast({ title: 'Nome necessário!', description: 'Digite seu nome para jogar', variant: 'destructive' });
      return;
    }

    localStorage.setItem('codebattle_name', playerName.trim());

    let filtered = QUESTIONS;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((q) => q.category === selectedCategory);
    }
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter((q) => q.difficulty === selectedDifficulty);
    }

    if (filtered.length === 0) {
      toast({ title: 'Sem perguntas!', description: 'Tente outra categoria/dificuldade', variant: 'destructive' });
      return;
    }

    const shuffled = shuffleArray(filtered).slice(0, 10);
    setQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setXp(0);
    setCorrectCount(0);
    setWrongCount(0);
    setTimeLeft(TIME_PER_QUESTION);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameState('playing');
  }, [playerName, selectedCategory, selectedDifficulty, toast]);

  const selectAnswer = (index: number) => {
    if (selectedAnswer !== null || showExplanation) return;

    if (timerRef.current) clearInterval(timerRef.current);

    const question = questions[currentQuestion];
    const correct = index === question.correct;
    setSelectedAnswer(index);
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      const timeBonus = Math.floor(timeLeft * 2);
      const streakBonus = streak * 5;
      const difficultyBonus = question.difficulty === 'hard' ? 20 : question.difficulty === 'medium' ? 10 : 5;
      const points = 10 + timeBonus + streakBonus + difficultyBonus;
      const xpGain = 10 + difficultyBonus + (timeBonus > 10 ? 5 : 0);

      setScore((p) => p + points);
      setXp((p) => p + xpGain);
      setStreak((p) => {
        const newStreak = p + 1;
        setMaxStreak((ms) => Math.max(ms, newStreak));
        return newStreak;
      });
      setCorrectCount((p) => p + 1);

      // Combo text
      if (streak >= 4) setComboText('INSANO!! 🔥🔥🔥');
      else if (streak >= 3) setComboText('ON FIRE!! 🔥🔥');
      else if (streak >= 2) setComboText('STREAK! 🔥');
      else if (streak >= 1) setComboText('COMBO! ⚡');
      else setComboText('BOOM! 💥');
    } else {
      setStreak(0);
      setWrongCount((p) => p + 1);
      setComboText('');
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 >= questions.length) {
      // Game over
      const newTotalXP = totalXP + xp;
      setTotalXP(newTotalXP);
      localStorage.setItem('codebattle_xp', String(newTotalXP));
      saveScore(score, maxStreak, getLevel(newTotalXP), questions.length);
      setGameState('result');
    } else {
      setCurrentQuestion((p) => p + 1);
      setTimeLeft(TIME_PER_QUESTION);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setComboText('');
    }
  };

  const saveScore = async (finalScore: number, finalStreak: number, finalLevel: number, totalQ: number) => {
    try {
      await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: playerName.trim(),
          score: finalScore,
          streak: finalStreak,
          level: finalLevel,
          questionsAnswered: totalQ,
        }),
      });
    } catch {
      // Silently fail - leaderboard is optional
    }
  };

  const fetchLeaderboard = useCallback(async () => {
    try {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      setLeaderboard(data.entries || []);
    } catch {
      // Silently fail
    }
  }, []);

  useEffect(() => {
    if (gameState === 'leaderboard') {
      fetchLeaderboard();
    }
  }, [gameState, fetchLeaderboard]);

  const question = questions[currentQuestion];
  const progressPercent = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  // ===================== HOME VIEW =====================
  if (gameState === 'home') {
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0a1a] text-white overflow-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Header */}
        <header className="relative z-10 border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">Code Battle</h1>
                <p className="text-[10px] text-gray-500 -mt-0.5 uppercase tracking-widest">msan.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-violet-400 border-violet-500/30 bg-violet-500/10 text-xs">
                <Star className="w-3 h-3 mr-1" />
                Nv. {getLevel(totalXP)} — {getLevelName(totalXP)}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-gray-500 hover:text-white hover:bg-white/5"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="max-w-lg w-full space-y-8">
            {/* Hero */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium">
                <Sparkles className="w-3 h-3" />
                Quiz de Programação
              </div>
              <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-violet-400 via-cyan-300 to-pink-400 bg-clip-text text-transparent leading-tight">
                Teste seu código
              </h2>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">
                Responda perguntas sobre programação, ganhe XP, suba de nível e dispute o topo do ranking!
              </p>
            </div>

            {/* Player name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Seu nome de guerreiro</label>
              <Input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Digite seu nome..."
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-violet-500 focus:ring-violet-500/30 h-12 text-lg"
                onKeyDown={(e) => e.key === 'Enter' && startGame()}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Categoria</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`p-2.5 rounded-xl text-xs font-medium transition-all border ${
                      selectedCategory === cat.value
                        ? `bg-gradient-to-br ${cat.color} text-white border-white/20 shadow-lg scale-105`
                        : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <span className="block text-base mb-0.5">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Dificuldade</label>
              <div className="flex gap-2">
                {[
                  { value: 'all', label: 'Todas', color: 'from-gray-400 to-gray-500' },
                  { value: 'easy', label: 'Fácil', color: 'from-green-400 to-emerald-500' },
                  { value: 'medium', label: 'Médio', color: 'from-yellow-400 to-amber-500' },
                  { value: 'hard', label: 'Difícil', color: 'from-red-400 to-rose-500' },
                ].map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDifficulty(d.value as typeof selectedDifficulty)}
                    className={`flex-1 p-2.5 rounded-xl text-xs font-medium transition-all border ${
                      selectedDifficulty === d.value
                        ? `bg-gradient-to-br ${d.color} text-white border-white/20 shadow-lg`
                        : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Play button */}
            <Button
              onClick={startGame}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-5 h-5 mr-2" />
              BATALHAR!
            </Button>

            {/* Quick stats */}
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Target className="w-3 h-3" /> {QUESTIONS.length} perguntas</span>
              <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> Streaks</span>
              <span className="flex items-center gap-1"><Crown className="w-3 h-3" /> Ranking</span>
            </div>

            {/* Leaderboard button */}
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setGameState('leaderboard')}
                className="text-gray-500 hover:text-white hover:bg-white/5 gap-2"
              >
                <Trophy className="w-4 h-4" />
                Ver Ranking
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===================== PLAYING VIEW =====================
  if (gameState === 'playing' && question) {
    const catInfo = CATEGORIES.find((c) => c.value === question.category) || CATEGORIES[0];
    const timerPercent = (timeLeft / TIME_PER_QUESTION) * 100;
    const timerColor = timeLeft > 10 ? 'bg-green-500' : timeLeft > 5 ? 'bg-yellow-500' : 'bg-red-500';

    return (
      <div className="min-h-screen flex flex-col bg-[#0a0a1a] text-white">
        {/* Game header */}
        <header className="sticky top-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-md border-b border-white/5">
          <div className="max-w-2xl mx-auto px-4 py-3 space-y-2">
            {/* Top stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className={`bg-gradient-to-r ${catInfo.color} text-white border-0 text-xs`}>
                  {catInfo.icon} {catInfo.label}
                </Badge>
                <Badge variant="outline" className={`text-xs ${
                  question.difficulty === 'hard' ? 'text-red-400 border-red-500/30' :
                  question.difficulty === 'medium' ? 'text-yellow-400 border-yellow-500/30' :
                  'text-green-400 border-green-500/30'
                }`}>
                  {question.difficulty === 'hard' ? '💀 Difícil' : question.difficulty === 'medium' ? '⚡ Médio' : '✨ Fácil'}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                {streak > 0 && (
                  <div className="flex items-center gap-1 text-orange-400 animate-pulse">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm font-bold">{streak}x</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-cyan-400">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-bold">{score}</span>
                </div>
              </div>
            </div>

            {/* Timer bar */}
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full ${timerColor} rounded-full transition-all duration-1000 ease-linear`}
                style={{ width: `${timerPercent}%` }}
              />
            </div>

            {/* Progress */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{currentQuestion + 1} / {questions.length}</span>
              <div className="flex items-center gap-1">
                <Timer className="w-3 h-3" />
                <span className={timeLeft <= 5 ? 'text-red-400 font-bold' : ''}>{timeLeft}s</span>
              </div>
            </div>
          </div>
        </header>

        {/* Question */}
        <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
          {/* Combo notification */}
          {comboText && showExplanation && isCorrect && (
            <div className="text-center animate-bounce">
              <span className="text-2xl font-black bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
                {comboText}
              </span>
            </div>
          )}

          {/* Question card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg sm:text-xl font-bold leading-relaxed">{question.question}</h3>
            </CardContent>
          </Card>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let optionStyle = 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20';

              if (showExplanation) {
                if (index === question.correct) {
                  optionStyle = 'bg-green-500/20 border-green-500/50 text-green-300';
                } else if (index === selectedAnswer && !isCorrect) {
                  optionStyle = 'bg-red-500/20 border-red-500/50 text-red-300';
                } else {
                  optionStyle = 'bg-white/3 border-white/5 opacity-50';
                }
              } else if (selectedAnswer === index) {
                optionStyle = 'bg-violet-500/20 border-violet-500/50 text-violet-300';
              }

              return (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-xl text-left transition-all border ${optionStyle} ${
                    !showExplanation ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      showExplanation && index === question.correct
                        ? 'bg-green-500/30 text-green-400'
                        : showExplanation && index === selectedAnswer && !isCorrect
                        ? 'bg-red-500/30 text-red-400'
                        : 'bg-white/10 text-gray-400'
                    }`}>
                      {showExplanation && index === question.correct ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : showExplanation && index === selectedAnswer && !isCorrect ? (
                        <XCircle className="w-4 h-4" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </div>
                    <span className="text-sm sm:text-base font-medium">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <Card className={`border ${isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <Badge className="bg-green-500/20 text-green-400 border-0 gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Correto!
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/20 text-red-400 border-0 gap-1">
                      <XCircle className="w-3 h-3" /> Errado!
                    </Badge>
                  )}
                  {isCorrect && streak > 1 && (
                    <Badge className="bg-orange-500/20 text-orange-400 border-0 gap-1">
                      <Flame className="w-3 h-3" /> {streak}x Streak
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{question.explanation}</p>
                <Button
                  onClick={nextQuestion}
                  className="w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold"
                >
                  {currentQuestion + 1 >= questions.length ? 'Ver Resultado' : 'Próxima Pergunta'}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // ===================== RESULT VIEW =====================
  if (gameState === 'result') {
    const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    const newLevel = getLevel(totalXP);
    const levelName = getLevelName(totalXP);
    const resultEmoji = accuracy >= 80 ? '🏆' : accuracy >= 60 ? '👍' : accuracy >= 40 ? '🤔' : '💀';
    const resultTitle = accuracy >= 80 ? 'Lendário!' : accuracy >= 60 ? 'Mandou bem!' : accuracy >= 40 ? 'Quase lá!' : 'Precisa treinar!';

    return (
      <div className="min-h-screen flex flex-col bg-[#0a0a1a] text-white">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="max-w-md w-full space-y-6 text-center">
            {/* Result header */}
            <div className="space-y-2">
              <span className="text-6xl">{resultEmoji}</span>
              <h2 className="text-3xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {resultTitle}
              </h2>
              <p className="text-gray-400">{playerName}</p>
            </div>

            {/* Score card */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-black text-cyan-400">{score}</p>
                    <p className="text-xs text-gray-500 mt-1">Pontos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-black text-green-400">{accuracy}%</p>
                    <p className="text-xs text-gray-500 mt-1">Precisão</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <p className="text-sm font-bold">{correctCount}</p>
                    <p className="text-[10px] text-gray-500">Acertos</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <XCircle className="w-5 h-5 text-red-400 mx-auto mb-1" />
                    <p className="text-sm font-bold">{wrongCount}</p>
                    <p className="text-[10px] text-gray-500">Erros</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                    <p className="text-sm font-bold">{maxStreak}x</p>
                    <p className="text-[10px] text-gray-500">Max Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Level progress */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowUp className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-bold">Nível {newLevel} — {levelName}</span>
                  </div>
                  <span className="text-xs text-gray-500">{totalXP} XP total</span>
                </div>
                <Progress value={getXPProgress(totalXP)} className="h-2" />
                <p className="text-xs text-gray-500 text-center">
                  {XP_PER_LEVEL - (totalXP % XP_PER_LEVEL)} XP para o próximo nível
                </p>
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="space-y-3">
              <Button
                onClick={startGame}
                className="w-full h-12 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Jogar Novamente
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setGameState('leaderboard')}
                  className="flex-1 border-white/10 text-gray-300 hover:bg-white/5"
                >
                  <Trophy className="w-4 h-4 mr-2" /> Ranking
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setGameState('home')}
                  className="flex-1 border-white/10 text-gray-300 hover:bg-white/5"
                >
                  <Code2 className="w-4 h-4 mr-2" /> Início
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===================== LEADERBOARD VIEW =====================
  if (gameState === 'leaderboard') {
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0a1a] text-white">
        <header className="sticky top-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-md border-b border-white/5">
          <div className="max-w-2xl mx-auto px-4 flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => setGameState('home')}
              className="text-gray-400 hover:text-white hover:bg-white/5"
            >
              ← Voltar
            </Button>
            <h1 className="text-lg font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" /> Ranking
            </h1>
            <div className="w-16" />
          </div>
        </header>

        <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-3">
          {leaderboard.length === 0 ? (
            <div className="text-center py-20">
              <Crown className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-500">Ranking vazio</h3>
              <p className="text-sm text-gray-600 mt-1">Seja o primeiro a pontuar!</p>
            </div>
          ) : (
            <>
              {/* Top 3 podium */}
              {leaderboard.length >= 3 && (
                <div className="flex items-end justify-center gap-3 mb-6 pt-4">
                  {/* 2nd place */}
                  <div className="text-center w-28">
                    <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-xl font-bold text-gray-800 mb-2">
                      {leaderboard[1].name.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-xs font-bold truncate">{leaderboard[1].name}</p>
                    <p className="text-[10px] text-gray-500">{leaderboard[1].score} pts</p>
                    <div className="mt-2 bg-gray-400/20 rounded-t-lg h-20 flex items-center justify-center">
                      <Medal className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  {/* 1st place */}
                  <div className="text-center w-32">
                    <Crown className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center text-2xl font-bold text-yellow-900 mb-2 shadow-lg shadow-yellow-500/30">
                      {leaderboard[0].name.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm font-bold truncate">{leaderboard[0].name}</p>
                    <p className="text-xs text-yellow-400">{leaderboard[0].score} pts</p>
                    <div className="mt-2 bg-yellow-400/20 rounded-t-lg h-28 flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-yellow-400" />
                    </div>
                  </div>
                  {/* 3rd place */}
                  <div className="text-center w-28">
                    <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-xl font-bold text-amber-200 mb-2">
                      {leaderboard[2].name.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-xs font-bold truncate">{leaderboard[2].name}</p>
                    <p className="text-[10px] text-gray-500">{leaderboard[2].score} pts</p>
                    <div className="mt-2 bg-amber-600/20 rounded-t-lg h-14 flex items-center justify-center">
                      <Medal className="w-5 h-5 text-amber-600" />
                    </div>
                  </div>
                </div>
              )}

              {/* Full list */}
              {leaderboard.map((entry, index) => (
                <Card
                  key={entry.id}
                  className={`bg-white/5 border-white/10 ${index < 3 ? 'border-yellow-500/20' : ''}`}
                >
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                      index === 1 ? 'bg-gray-400/20 text-gray-400' :
                      index === 2 ? 'bg-amber-600/20 text-amber-500' :
                      'bg-white/5 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{entry.name}</p>
                      <p className="text-[10px] text-gray-500">
                        Nv. {entry.level} • {entry.questionsAnswered} perguntas
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-cyan-400">{entry.score}</p>
                      <div className="flex items-center gap-1 justify-end">
                        <Flame className="w-3 h-3 text-orange-400" />
                        <span className="text-[10px] text-gray-500">{entry.streak}x</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}

          <div className="pt-4 text-center">
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold gap-2"
            >
              <Play className="w-4 h-4" /> Jogar e Subir no Ranking
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
