export type CategoryType = 'games' | 'filmes-series' | 'dev-tech' | 'comics-mangas' | 'ciencia' | 'cultura-geek';

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  category: CategoryType;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
  coverGradient: string;
  coverEmoji: string;
}

export const categories: { id: CategoryType; name: string; icon: string }[] = [
  { id: 'games', name: 'Games', icon: 'Gamepad2' },
  { id: 'filmes-series', name: 'Filmes & Séries', icon: 'Film' },
  { id: 'dev-tech', name: 'Dev & Tech', icon: 'Code2' },
  { id: 'comics-mangas', name: 'Comics & Mangás', icon: 'BookOpen' },
  { id: 'ciencia', name: 'Ciência', icon: 'Microscope' },
  { id: 'cultura-geek', name: 'Cultura Geek', icon: 'Dices' },
];

export const articles: Article[] = [
  // === GAMES ===
  {
    id: 'review-elden-ring-dlc',
    title: 'Elden Ring: Shadow of the Erdtree — A DLC que Redefiniu Expansões',
    subtitle: 'A expansão da FromSoftware não é apenas mais conteúdo — é uma experiência que rivaliza com o jogo base em escala e qualidade.',
    content: `Quando a FromSoftware anunciou Shadow of the Erdtree, a expectativa era alta, mas ninguém previu a escala colossal do que estava por vir. Esta não é simplesmente uma expansão — é praticamente um jogo completo ambientado na Terra das Sombras, uma região inteiramente nova com sua própria mitologia, ecossistema e desafios que vão testar até os jogadores mais veteranos.

O design de mundo aberto que fez Elden Ring ser aclamado em 2022 atinge seu ápice aqui. A Terra das Sombras é uma das regiões mais bem desenhadas da história dos games, com cada canto escondendo segredos, chefes opcionais e narrativas entrelaçadas. A verticalidade do mapa é impressionante — você pode explorar ruínas submersas, fortalezas nas nuvens e florestas corrompidas, tudo conectado de forma orgânica que premia a curiosidade do jogador.

Em termos de combate, a expansão introduz novos tipos de armas, Ashes of War e um sistema de árvores de habilidades que adiciona profundidade significativa às builds. Os novos chefes são algumas das lutas mais memoráveis da franquia, com padrões complexos que exigem domínio total dos mecânicas. O chefe final, sem spoilers, é considerado por muitos como uma das melhores lutas já criadas pela FromSoftware.

A narrativa de Shadow of the Erdtree aprofunda a lore de Miquella e Marika de formas surpreendentes, revelando conexões que mudam a forma como você percebe o jogo base. Os NPCs têm arcos mais desenvolvidos, e as múltiplas conclusões garantem recompensas para quem investe em explorar cada detalhe.

Com mais de 40 horas de conteúdo principal e dezenas de horas extras em conteúdo opcional, Shadow of the Erdtree estabelece um novo padrão para o que uma expansão pode ser. Se você curte jogos desafiadores com mundo aberto e narrativa ambiental, esta é uma experiência obrigatória que vai ser lembrada por anos.`,
    category: 'games',
    author: 'Thiago "Miyazaki" Santos',
    date: '2026-04-25',
    readTime: 6,
    tags: ['Elden Ring', 'FromSoftware', 'DLC', 'Review', 'RPG'],
    featured: true,
    coverGradient: 'from-amber-900/40 to-orange-900/30',
    coverEmoji: '⚔️',
  },
  {
    id: 'melhores-indies-2026',
    title: 'Os 10 Melhores Jogos Indie de 2026 Que Você Precisa Jogar',
    subtitle: 'O cenário indie nunca esteve tão forte. Conheça os destaques que estão redefinindo o que é possível com orçamentos menores.',
    content: `O ano de 2026 está sendo um marco para jogos independentes, com lançamentos que desafiam as expectativas em criatividade, profundidade e polimento. Enquanto os AAAs lutam com orçamentos inflados e datas de lançamento atrasadas, os estúdios menores estão entregando experiências memoráveis que rivalem — e às vezes superam — os gigantes da indústria.

Destaca-se "Hollow Depths", um metroidvania ambientado em uma cidade subaquática que combina exploração fluida com uma narrativa emocionante sobre isolamento e esperança. A pixel art é de outro mundo, com animações que lembram os trabalhos de Studio MDHR, e a trilha sonora sintetizada é hipnotizante. É o tipo de jogo que você começa "só para testar" e termina seis horas depois.

"Astral Kitchen" é outra surpresa — um cozy game onde você gerencia um restaurante interestelar, cozinhando pratos alienígenas enquanto desvenda conspirações galácticas entre os pedidos. A mistura de gestão com narrativa cômica funciona perfeitamente, e o humor é afiado o suficiente para fazer você rir alto mesmo jogando sozinho.

Para os fãs de roguelikes, "Signal Lost" oferece uma abordagem única: você é um astronauta cujas memórias foram fragmentadas, e cada run restaura pedaços diferentes de sua história. A variação entre runs é genuinamente surpreendente, com endings que mudam completamente dependendo das memórias que você recuperou.

Outros destaques incluem "Paper Trails", um puzzle game sobre dobra espacial com estilo visual em aquarela; "Neon Streets", um beat 'em up cyberpunk com combate fluido inspirado em Devil May Cry; e "Garden of Echoes", um walking simulator poético que usa IA generativa de forma criativa para criar diálogos únicos a cada playthrough.

O que esses jogos têm em comum é a paixão evidente de seus criadores. Em uma era de monetização agressiva e live services, os indies de 2026 lembram por que começamos a jogar: pela experiência pura e inesquecível.`,
    category: 'games',
    author: 'Ana "Pixel" Rodrigues',
    date: '2026-04-20',
    readTime: 5,
    tags: ['Indie', 'PC', 'Metroidvania', 'Cozy Game', 'Roguelike'],
    coverGradient: 'from-emerald-900/30 to-teal-900/30',
    coverEmoji: '🎮',
  },
  {
    id: 'baldurs-gate-3-mudanca-industria',
    title: "Por Que Baldur's Gate 3 Mudou a Indústria de RPGs Para Sempre",
    subtitle: 'A Larian Studios provou que você não precisa simplificar um RPG para vender milhões. A revolução táctica chegou para ficar.',
    content: `Quando Baldur's Gate 3 foi lançado, muitos analistas da indústria achavam que RPGs de turnos e com sistema complexo de regras eram "nichos" demais para o mercado mainstream. A Larian Studios não apenas provou o contrário, mas estabeleceu um novo padrão que toda a indústria está tentando seguir — e falhando.

A genialidade de Baldur's Gate 3 está em como ele traduz as regras de D&D 5ª Edição para o mundo digital sem perder a essência da mesa de RPG. Cada decisão importa, cada diálogo pode ter consequências imprevisíveis, e o sistema de dados virtuais adiciona uma camada de drama e improviso que poucos jogos conseguem replicar. A sensação de "qualquer coisa pode acontecer" é palpável.

O sucesso comercial — mais de 15 milhões de cópias vendidas — mandou uma mensagem clara para a indústria: jogadores querem profundidade. Eles querem sistemas complexos, escolhas difíceis e consequências reais. A tentação de "streamline" tudo para alcançar um público mais amplo não é mais necessária quando o jogo é bom o suficiente para atrair todos.

A comparação com outros RPGs modernos é inevitável. Jogos como Starfield, que prometiam liberdade mas entregaram superficialidade, parecem ainda mais fracos em contraste. A Larian mostrou que você pode ter gráficos impressionantes, performance otimizada e sistemas profundos — não é preciso escolher apenas um.

O impacto no longo prazo já é visível: estúdios como Obsidian e BioWare citaram BG3 como influência direta em seus próximos projetos. A era dos RPGs "simplificados" pode estar chegando ao fim, e os jogadores são os maiores beneficiários dessa mudança.`,
    category: 'games',
    author: 'Rafael "D20" Mendes',
    date: '2026-04-15',
    readTime: 5,
    tags: ['Baldurs Gate 3', 'Larian', 'RPG', 'D&D', 'Indústria'],
    coverGradient: 'from-purple-900/30 to-violet-900/30',
    coverEmoji: '🎲',
  },

  // === FILMES & SÉRIES ===
  {
    id: 'duna-parte-dois-review',
    title: 'Duna: Parte Dois — A Adaptação Sci-Fi que a Gente Merecia',
    subtitle: 'Denis Villeneuve entregou o épico desertico que os fãs de Frank Herbert esperavam há décadas. Uma obra-prima visual.',
    content: `Duna: Parte Dois não é apenas uma continuação — é a realização de uma visão cinematográfica que parecia impossível de ser adaptada para a tela grande. Denis Villeneuve, com a liberdade criativa de não precisar estabelecer o mundo na primeira metade, mergulha de cabeça na política, nas batalhas e na espiritualidade de Arrakis com uma confiança rara em blockbusters contemporâneos.

A escala visual é absolutamente absurda. Cada frame parece uma pintura, com a fotografia de Greig Fraser capturando a vastidão do deserto e a intimidade dos momentos políticos com igual maestria. As cenas de batalha com os sandriders são do tipo que fazem você segurar a respiração, e a trilha sonora de Hans Zimmer atinge novos patamares com instrumentos de corda distorcidos e vocais etéreos que parecem vindos de outro planeta.

Timothée Chalamet finalmente assume o papel de Paul Atreides com a gravidade que a personagem exige. A transformação de jovem nobre exilado para líder messiânico é conduzida com sutileza, e os momentos em que ele abraça seu destino — e os horrores que ele traz — são devastadores. Zendaya ganha muito mais tempo de tela como Chani, e a química entre os dois adiciona uma camada emocional crucial ao épico.

Austin Butler como Feyd-Rautha é a revelação da película. Sua interpretação do jovem Harkonnen é perturbadora, magnética e perigosamente carismática. Cada cena dele ameaça roubar o filme, e seu duelo final com Paul é uma das sequências de luta mais bem coreografadas dos últimos anos.

Villeneuve consegue algo raro: honrar o material original enquanto faz comentários relevantes sobre messianismo, colonialismo e o perigo de líderes inquestionados. Duna: Parte Dois é o tipo de filme que define uma era do cinema — e que vai ser estudado por gerações de cineastas.`,
    category: 'filmes-series',
    author: 'Marina "Reel" Costa',
    date: '2026-04-22',
    readTime: 6,
    tags: ['Duna', 'Denis Villeneuve', 'Sci-Fi', 'Cinema', 'Review'],
    featured: true,
    coverGradient: 'from-amber-800/40 to-orange-900/30',
    coverEmoji: '🏜️',
  },
  {
    id: 'animes-2026-lancamentos',
    title: 'Animes de 2026: Os Lançamentos Mais Esperados da Temporada',
    subtitle: 'De sequências aguardadas a adaptações surpresa, a temporada de primavera 2026 promete ser uma das melhores da década.',
    content: `A temporada de primavera de 2026 está sendo apontada por críticos e fãs como uma das mais fortes dos últimos anos, com uma mistura perfeita de sequências de franquias amadas e adaptações de mangás populares que finalmente ganham suas versões animadas.

O grande destaque é a segunda temporada de "Chainsaw Man", que promete cobrir os arcos do Crime e da Academia, com a MAPPA mantendo a qualidade visual impressionante do primeiro cour. Os novos designs de personagens já foram revelados e mostram uma evolução estilística que deixa os fãs ansiosos. O orçamento aparentemente foi aumentado, o que é um ótimo sinal para as cenas de ação que estão por vir.

"Frieren: Beyond Journey's End" continua com sua segunda temporada, aprofundando a exploração da imortalidade e da memória. O episódio piloto da nova temporada já quebrou recordes de streaming no Japão, e a discussão sobre a narrativa temporalmente não-linear domina os fóruns de discussão weekly.

Entre as novidades, "Sakamoto Days" da TMS Entertainment está impressionando com sua ação estilosa e humor único, enquanto "Kaiju No. 8" da Production I.G adapta o mangá com uma qualidade de animação que rivaliza com filmes. A história de Kafka, um homem de 32 anos que se transforma em um kaiju, ressoa com um público adulto que busca algo além dos protagonistas adolescentes.

Para os fãs de slice of life, "Apothecary Diaries" retorna com arcos mais sombrios, e o novo anime "The Elusive Samurai" da CloverWorks promete combinar comédia histórica com animação experimental que lembra os trabalhos de Yuasa Masaaki.

O ecossistema de anime em 2026 está mais saudável do que nunca, com plataformas como Crunchyroll e Netflix investindo pesadamente em produções originais. A diversidade de gêneros e estilos garante que há algo para todos os tipos de espectadores.`,
    category: 'filmes-series',
    author: 'Lucas "Otaku" Ferreira',
    date: '2026-04-18',
    readTime: 5,
    tags: ['Anime', 'Temporada 2026', 'Crunchyroll', 'Chainsaw Man', 'Frieren'],
    coverGradient: 'from-rose-900/30 to-pink-900/30',
    coverEmoji: '🎌',
  },
  {
    id: 'shogun-obra-prima',
    title: 'Shogun — Por Que Esta Série É Obra-Prima da Televisão',
    subtitle: 'A adaptação da FX/Hulu redefiniu o que é possível em drama histórico na TV. Uma aula de storytelling e direção.',
    content: `Shogun, a adaptação do clássico de James Clavell pela FX, não é apenas uma boa série histórica — é uma das melhores produções televisivas da década, independente de gênero. Em dez episódios, a série constrói um mundo tão rico e complexo quanto o de Game of Thrones, mas com uma disciplina narrativa e uma atenção ao detalhe que poucas produções conseguem igualar.

A genialidade da série está em sua estrutura narrativa que apresenta três perspectivas em conflito: Lord Yoshii Toranaga, interpretado por Hiroyuki Sanada com uma gravidade magnética; John Blackthorne, o piloto inglês perdido no Japão feudal, vivido por Cosmo Jarvis com uma vulnerabilidade cativante; e Lady Mariko, interpretada por Anna Sawai, cuja complexidade moral é o coração emocional da série.

A direção, dividida entre Jonathan van Tulleken e Frederick E.O. Toyobe, é impecável. Cada frame é composto como uma pintura ukiyo-e, com a câmera se movendo com a precisão de um samurai em combate. As cenas de política do castelo são tão tensionantes quanto as batalhas campais, e a série entende que palavras, olhares e silêncios podem ser tão devastadores quanto espadas.

A produção é de tirar o fôlego. Os castelos foram construídos em escala real na British Columbia, os kimonos são feitos artesanalmente com tecidos importados do Japão, e o cuidado com a autenticidade histórica se estende até aos detalhes dos rituais de chá e cerimônias do bushido.

Shogun provou que o público está pronto para séries densas, com diálogos em japonês sem legendas forçadas e narrativas que não tratam o espectador como alguém que precisa de tudo explicado. É televisionamento no seu mais alto nível — uma experiência que fica com você muito depois dos créditos finais.`,
    category: 'filmes-series',
    author: 'Marina "Reel" Costa',
    date: '2026-04-10',
    readTime: 6,
    tags: ['Shogun', 'FX', 'Drama Histórico', 'Série', 'Samurai'],
    coverGradient: 'from-red-900/30 to-amber-900/30',
    coverEmoji: '⛩️',
  },

  // === DEV & TECH ===
  {
    id: 'rust-vs-go-2026',
    title: 'Rust vs Go em 2026: Qual Escolher Para Seu Próximo Projeto?',
    subtitle: 'O debate clássico continua. Analisamos o cenário atual de ambas as linguagens e ajudamos você a tomar a melhor decisão.',
    content: `O debate entre Rust e Go continua sendo um dos mais acalorados na comunidade de desenvolvimento, e em 2026 as duas linguagens evoluíram significativamente. A boa notícia é que ambas são excelentes — a má notícia é que a escolha nunca foi tão difícil.

Go continua sendo a escolha pragmática para a maioria dos projetos de backend. A simplicidade da linguagem, o modelo de concorrência baseado em goroutines, e o ecossistema maduro de ferramentas como Gin, gRPC e Kubernetes fazem dela a opção mais produtiva para APIs, microservices e sistemas distribuídos. O tempo de aprendizado é significativamente menor, e onboarding de novos desenvolvedores na equipe é praticamente instantâneo.

Em 2026, Go ganhou melhorias significativas no suporte a generics (que agora estão estáveis e bem integradas), uma ferramenta de profiling mais poderosa e melhorias de performance no garbage collector que reduzem latência em workloads críticos. Para a maioria das empresas, Go continua sendo a escolha "segura" que entrega resultado.

Rust, por outro lado, brilha em cenários onde performance e segurança de memória são críticos. O compilador continua sendo seu maior trunfo — se compila, provavelmente funciona. Em 2026, o ecossistema Rust amadureceu enormemente: Axum e Actix-Web são frameworks web robustos, Tokio é o runtime assíncrono mais eficiente disponível, e crates como sqlx, serde e tracing formam uma stack completa e confiável.

A curva de aprendizado do Rust continua sendo o maior obstáculo. O borrow checker é implacável no início, e o tempo de desenvolvimento para projetos simples pode ser 2-3x maior que em Go. Porém, para sistemas de alta performance como bancos de dados, engines de jogos, compiladores e runtime de blockchain, Rust é praticamente imbatível.

A recomendação prática? Se você precisa de produtividade e time-to-market rápido, vá de Go. Se você precisa de performance extrema, segurança de memória garantida e está disposto a investir no aprendizado, Rust é a escolha. Para muitos projetos, as duas coexistem pacificamente — Rust para o core engine e Go para os serviços em camada superior.`,
    category: 'dev-tech',
    author: 'Carlos "Compiler" Lima',
    date: '2026-04-24',
    readTime: 7,
    tags: ['Rust', 'Go', 'Backend', 'Programação', 'Comparativo'],
    featured: true,
    coverGradient: 'from-blue-900/30 to-cyan-900/30',
    coverEmoji: '🦀',
  },
  {
    id: 'nextjs-16-guia',
    title: 'Como Criar Seu Primeiro App com Next.js 16 — Guia Completo',
    subtitle: 'Do zero ao deploy: tudo que você precisa saber para começar com a versão mais recente do framework React mais popular.',
    content: `Next.js 16 chegou com mudanças significativas que tornam o desenvolvimento web mais produtivo e performático. Este guia vai te levar do zero à sua primeira aplicação deployada, cobrindo os conceitos essenciais e as novas funcionalidades que fazem desta versão a melhor até agora.

A instalação é simples: basta rodar \`npx create-next-app@latest\` e seguir as perguntas interativas. A versão 16 traz um template renovado com suporte nativo a Tailwind CSS 4, TypeScript e a nova App Router como padrão. O App Router, que usa React Server Components por padrão, permite uma separação clara entre lógica de servidor e interatividade do cliente.

A arquitetura baseada em pastas é intuitiva: cada pasta dentro de \`src/app\` se torna uma rota automaticamente. Arquivos \`page.tsx\` exportam os componentes da página, \`layout.tsx\` define layouts compartilhados, e \`loading.tsx\` cria estados de carregamento instantâneos com Suspense. Os Server Components são o padrão, o que significa que todo o código roda no servidor por padrão — você só precisa marcar com \`'use client'\` quando precisar de interatividade.

Uma das features mais poderosas do Next.js 16 é o Server Actions, que permite executar código no servidor diretamente dos componentes sem precisar criar APIs separadas. Isso simplifica enormemente operações como submit de formulários, validação de dados e mutações no banco.

Para estilização, o Tailwind CSS 4 agora usa a engine Oxide, que é até 10x mais rápido que a versão anterior. A sintaxe foi simplificada — não é mais necessário o arquivo \`tailwind.config.js\` na maioria dos casos, e variáveis CSS são usadas diretamente nos estilos.

Para deploy, a Vercel continua sendo a opção mais simples com integração zero-config, mas Next.js 16 roda perfeitamente em qualquer plataforma que suporte Node.js, incluindo Docker, AWS e VPS tradicionais. O comando \`next build\` gera arquivos estáticos e dinâmicos otimizados automaticamente.`,
    category: 'dev-tech',
    author: 'Carlos "Compiler" Lima',
    date: '2026-04-12',
    readTime: 8,
    tags: ['Next.js', 'React', 'Tutorial', 'TypeScript', 'Web Dev'],
    coverGradient: 'from-slate-800/30 to-blue-900/30',
    coverEmoji: '⚡',
  },
  {
    id: 'ferramentas-ia-desenvolvedor',
    title: 'As 15 Ferramentas de IA Que Todo Desenvolvedor Deveria Conhecer',
    subtitle: 'De code completion a debugging assistido, essas ferramentas vão acelerar seu fluxo de trabalho significativamente.',
    content: `A inteligência artificial transformou radicalmente a forma como escrevemos código, e em 2026 o ecossistema de ferramentas assistivas atingiu um nível de maturidade impressionante. Seja você um desenvolvedor júnior buscando acelerar o aprendizado ou um sênior querendo aumentar produtividade, há ferramentas para cada etapa do ciclo de desenvolvimento.

Para edição de código, o GitHub Copilot continua sendo a referência, mas concorrentes como Cursor IDE (que integra IA diretamente no editor) e Codeium oferecem alternativas gratuitas ou mais baratas com qualidade comparável. O segredo não é aceitar sugestões cegamente, mas usar a IA como um par de programação que sugere abordagens e pega erros que você pode ter perdido.

Para debugging, ferramentas como AI Engineer e Debugbear usam LLMs para analisar stack traces e logs, sugerindo correções com explicações claras. Em testes unitários, o CodiumAI gera suites de testes automaticamente baseadas no comportamento esperado do código, cobrindo edge cases que muitos desenvolvedores esqueceriam.

Para documentação, o Mintlify e o Swimm criam documentação automatizada que se mantém sincronizada com o código. Já ferramentas como Phind e Perplexity são motores de busca especializados em programação que encontram respostas técnicas mais relevantes que o Google tradicional.

Para review de código, o CodeRabbit automatiza code reviews com feedback contextual, identificação de bugs e sugestões de melhoria de performance. O Bito oferece refatoração assistida por IA que respeita os padrões do seu projeto.

No pipeline de CI/CD, o Earthly com IA otimiza builds e detecta gargalos automaticamente. Para infraestrutura, ferramentas como K8sGPT ajudam a diagnosticar problemas em clusters Kubernetes.

A chave para usar essas ferramentas efetivamente é entender que elas são amplificadores, não substitutos. Um desenvolvedor que entende fundamentos e usa IA como ferramenta complementar será infinitamente mais produtivo do que alguém que depende cegamente das sugestões.`,
    category: 'dev-tech',
    author: 'Pedro "BugFree" Almeida',
    date: '2026-04-08',
    readTime: 7,
    tags: ['IA', 'Produtividade', 'Ferramentas', 'GitHub Copilot', 'Programação'],
    coverGradient: 'from-violet-900/30 to-blue-900/30',
    coverEmoji: '🤖',
  },
  {
    id: 'linux-desktop-2026',
    title: 'Linux no Desktop Finalmente Conseguiu? Análise Honesta em 2026',
    subtitle: 'Depois de décadas de promessas, vamos analisar o estado real do Linux como sistema de uso diário em desktops e laptops.',
    content: `A pergunta "O ano do Linux no desktop?" virou meme, mas em 2026 a resposta é mais complexa e, surpreendentemente, mais positiva do que nunca. Não é que o Linux "conseguiu" de repente — é que o contexto mudou de forma que o Linux se tornou a escolha mais lógica para muitos usuários.

O KDE Plasma 6 e o GNOME 47 atingiram níveis de polimento que rivalizam — e em alguns casos superam — Windows 11 e macOS em usabilidade. O KDE em particular tem uma customização que deixa qualquer outro DE no chinelo, com widgets, temas globais e integração Wayland que finalmente funciona sem falhas. O suporte a HiDPI, multi-monitor e periféricos Bluetooth é plug-and-play na maioria dos hardwares mainstream.

A compatibilidade de software é o ponto que mais melhorou. O Steam Deck provou que Proton é viável para gaming, e hoje mais de 90% dos jogos do Steam rodam no Linux via camada de compatibilidade. Para produtividade, o LibreOffice evoluiu significativamente, ferramentas como OnlyOffice e WPS Office oferecem compatibilidade com formatos Microsoft, e o Firefox é excelente para uso diário.

O maior trunfo do Linux em 2026, porém, pode ser algo que os entusiastas menos esperavam: a integração com IA. Ferramentas como Ollama permitem rodar LLMs localmente com interface web, e a performance no Linux é consistentemente melhor que no Windows para workloads de IA/ML.

Onde o Linux ainda peca é em softwares profissionais específicos: Adobe Creative Suite não tem versão nativa (embora o Figma funcione perfeitamente no navegador), Microsoft Office via web é funcional mas limitado, e softwares de DJ/música profissional ainda dependem de workarounds.

O veredito honesto? Para desenvolvedores, estudantes, usuários de produtividade e gamers casuais, o Linux é uma excelente escolha em 2026. Para profissionais de criação que dependem do ecossistema Adobe, ainda há barreiras. Mas a tendência é claramente positiva.`,
    category: 'dev-tech',
    author: 'Carlos "Compiler" Lima',
    date: '2026-04-05',
    readTime: 7,
    tags: ['Linux', 'Desktop', 'KDE', 'GNOME', 'Open Source'],
    coverGradient: 'from-amber-900/20 to-yellow-900/20',
    coverEmoji: '🐧',
  },

  // === COMICS & MANGÁS ===
  {
    id: 'one-piece-teorias',
    title: 'One Piece: As Teorias Mais Loucas Que Podem Ser Verdade',
    subtitle: 'Com a saga final em andamento, analisamos as teorias mais populares da comunidade e as evidências que as sustentam.',
    content: `One Piece está em sua saga final, e Eiichiro Oda está entregando revelações que confirmam teorias de fãs de mais de uma década. Isso nos faz olhar para as teorias ainda não resolvidas com um olhar mais sério — afinal, o mangaká já provou que planta sementes anos antes de colhê-las.

A teoria mais discutida é sobre o verdadeiro significado do One Piece. A teoria do "Rio Poneglyph" sugere que os Poneglyphs espalhados pelo mundo, quando conectados, formam um mapa que revela não apenas a localização de Laugh Tale, mas também a verdadeira história do Século Perdido. Oda já confirmou que o One Piece não é "algo como um sentimento" como tantos acreditaram, e sim um tesouro tangível.

A teoria de que Luffy representa a "esperança" ou a "liberdade" personificada — e não apenas um pirata em busca de aventura — ganhou força recentemente com as revelações sobre o poder do Nika e o despertar do Gomu Gomu no Mi (na verdade Hito Hito no Mi, Modelo Nika). O paralelo com Joy Boy e a promessa feita há 800 anos aponta para um destino muito maior que encontrar um tesouro.

Outra teoria fascinante é sobre a identidade de Im-sama, a figura misteriosa que governa o Mundo por trás do trono vazio. Muitos acreditam que Im é um celestial immortal ligado à linhagem dos criadores do mundo, possivelmente com poderes relacionados ao controle do mar ou até mesmo à capacidade de manipular a vontade das pessoas — o que explicaria como a Governo Mundial mantém controle absoluto.

A teoria do " ciclo das frutas do diabo" sugere que quando um usuário morre, a fruta renasce na fruta mais próxima — e que isso cria um ciclo kármico onde os poderes passam entre gerações conectadas por destino. Isso explicaria por que tantos personagens com frutas poderosas têm conexões genealógicas ou narrativas entre si.

Com o manga entrando em sua fase final, cada capítulo é uma mina de informações. A janela para novas teorias está se fechando, mas a emoção de ver décadas de especulação finalmente se resolver é algo único na cultura pop.`,
    category: 'comics-mangas',
    author: 'Juliana "Mangaka" Silva',
    date: '2026-04-23',
    readTime: 6,
    tags: ['One Piece', 'Teorias', 'Mangá', 'Oda', 'Egghead'],
    coverGradient: 'from-red-900/30 to-amber-800/30',
    coverEmoji: '🏴‍☠️',
  },
  {
    id: 'sandman-neil-gaiman',
    title: 'Sandman da DC — Por Que Neil Gaiman Criou uma Obra-Prima',
    subtitle: 'A série que redefiniu o que quadrinhos podem ser. Uma jornada pelos sonhos, mitos e a própria natureza da criatividade.',
    content: `Quando Neil Gaiman começou a escrever Sandman em 1988, poucos imaginavam que uma série sobre a personificação dos Sonhos da mitologia se tornaria uma das obras literárias mais influentes do século XX — independentemente do formato. Sandman não é apenas uma história em quadrinhos; é uma exploração profunda sobre narrativa, identidade, mudança e o poder transformador das histórias.

A premissa é enganosamente simples: Morpheus, o Senhor dos Sonhos (também conhecido como Dream, Oneiros e dezenas de outros nomes), é capturado por um culto e mantido prisioneiro por 75 anos. Ao escapar, ele encontra seu reino em ruínas e embarca em uma jornada para recuperar seus instrumentos de poder — enquanto confronta as consequências de seu longo cativeiro.

O que eleva Sandman além de uma simples fantasy é a maneira como Gaiman tece mitologias de diferentes culturas, literatura, história e religião em uma tapeçaria coesa. Personagens como Death (a Morte como uma garota gótica empática), Lucifer Morningstar (que abandona o Inferno porque está "entediado") e Hob Gadling (um mortal que recebe imortalidade de Dream por capricho) são tão complexos e memoráveis quanto os de qualquer romance clássico.

A arte variada — com contribuições de Dave McKean, Sam Kieth, Mike Dringenberg, Jill Thompson e muitos outros — cria uma linguagem visual que muda de acordo com o tom da narrativa. Histórias de horror têm arte expressionista, mitológicas têm linhas clássicas, e os momentos íntimos são desenhados com delicadeza fotográfica.

O legado de Sandman é imenso. A série abriu portas para quadrinhos "adultos" e literários, influenciando criadores de Alan Moore a J.K. Rowling. A adaptação para série da Netflix trouxe a obra para uma nova geração, e a qualidade da adaptação prova que a história é atemporal. Se você nunca leu, comece pelo volume "Prelúdios e Nocturnos" — e prepare-se para nunca mais ver quadrinhos da mesma forma.`,
    category: 'comics-mangas',
    author: 'Juliana "Mangaka" Silva',
    date: '2026-04-16',
    readTime: 6,
    tags: ['Sandman', 'Neil Gaiman', 'DC', 'Quadrinhos', 'Fantasia'],
    coverGradient: 'from-indigo-900/30 to-purple-900/30',
    coverEmoji: '🌙',
  },
  {
    id: 'mangas-escondidos-joias',
    title: 'Mangás Escondidos: 7 Joias Que Ninguém Te Contou',
    subtitle: 'Esqueça os shonens mainstream. Esses mangás lesser-known merecem um lugar na sua estante.',
    content: `Para cada One Piece ou Attack on Titan que domina as listas de best-sellers, existem dezenas de mangás brilhantes que passam despercebidos pela maioria dos leitores. Estes são os mangás que os fãs verdadeiramente obcecados recomendam com os olhos brilhando — obras-primas que merecem muito mais atenção do que recebem.

"Dorohedoro" de Q Hayashida é uma experiência surreal. Ambientado em um mundo onde pessoas são amaldiçoadas e transformadas em monstros, a história segue Caiman, um homem com cabeça de lagarto que busca descobrir quem o amaldiçoou. A arte é visceral e única, com personagens grotescamente carismáticos. A mistura de humor negro, gore e momentos genuinamente comoventes cria uma atmosfera que não se parece com mais nada.

"Goodnight Punpun" de Inio Asano não é para os fracos de coração. Começa como um slice of life sobre um menino e seu pássaro de estimação antropomórfico, e gradualmente se transforma em um dos retratos mais devastadores de depressão e auto-destruição já criados em qualquer mídia. A arte de Asano é realista e desconfortável, capturando emoções que palavras não conseguiriam expressar.

"Fire Punch" de Tatsuki Fujimoto (o criador de Chainsaw Man) é um post-apocalíptico brutal sobre Agni, um homem imortal que arde eternamente. A narrativa imprevisível de Fujimoto, que mistura humor absurdo com tragédia visceral, já era evidente aqui. Os twists são genuinamente surpreendentes, e a exploração de imortalidade como maldição é profunda.

"Homunculus" de Naoki Yamamoto segue Susumu Nokoshi, um homem sem-teto que ganha a habilidade de ver homúnculos — visões que revelam os traumas psicológicos das pessoas. É um mangá psicológico denso que desafia o leitor a questionar a própria percepção de realidade e sanidade.

"Boys on the Run" do mesmo Yamamoto é o oposto completo — uma comédia trágica sobre um homem patético tentando impressionar uma colega de trabalho. É dolorosamente engraçado e incrivelmente humano na sua representação de insegurança masculina.

"In clothes called fat" de Moeko Hayashi aborda transtornos alimentares com uma crueza rara na manga. A história de Noko e seu ciclo de compulsão e culpa é difícil de ler mas essencial.

"Oyasumi Punpun" aparece na lista novamente porque merece ser mencionado duas vezes. Simplesmente assim.`,
    category: 'comics-mangas',
    author: 'Lucas "Otaku" Ferreira',
    date: '2026-04-03',
    readTime: 6,
    tags: ['Mangá', 'Indicações', 'Dorohedoro', 'Goodnight Punpun', 'Fire Punch'],
    coverGradient: 'from-teal-900/30 to-cyan-900/30',
    coverEmoji: '📚',
  },

  // === CIÊNCIA ===
  {
    id: 'buraco-negro-mais-antigo',
    title: 'Buraco Negro Mais Antigo Já Descoberto Desafia a Física',
    subtitle: 'A 13,2 bilhões de anos de idade, este buraco negro supermassivo não deveria existir segundo os modelos atuais.',
    content: `Em abril de 2026, astrônomos usando o James Webb Space Telescope (JWST) anunciaram a descoberta de um buraco negro supermassivo com aproximadamente 40 milhões de vezes a massa do Sol, formado apenas 500 milhões de anos após o Big Bang. O problema? Segundo nossos modelos atuais de formação de buracos negros, um objeto tão massivo simplesmente não deveria existir tão cedo na história do universo.

A descoberta, publicada na revista Nature, desafia o chamado "paradoxo dos sementões" — a questão de como buracos negros supermassivos puderam crescer tão rapidamente nos primórdios cósmicos. Os modelos tradicionais sugerem que buracos negros crescem "acumulando" matéria ao redor, mas mesmo com as taxas máximas teóricas de acreção (conhecidas como limite de Eddington), levaria bilhões de anos para um buraco negro de estrela alcançar 40 milhões de massas solares.

Existem várias hipóteses tentando explicar o fenômeno. A mais radical é a teoria dos "seed black holes" — buracos negros primordiais formados diretamente pelo colapso de nuvens de gás massivas nos primeiros instantes do universo, sem passar pela fase de estrela. Esses buracos negros "diretos" poderiam começar com massas muito maiores que os formados por supernovas.

Outra hipótese envolve "super-Eddington accretion" — períodos onde o buraco negro absorve matéria a taxas que excedem o limite teórico, possivelmente por efeitos de fusão direta com outros buracos negros na região densamente povoada do universo primitivo.

A implicação é profunda: se buracos negros supermassivos puderam se formar tão cedo, isso pode afetar nosso entendimento sobre como galáxias se formaram, já que há uma forte correlação entre a massa do buraco negro central e as propriedades da galáxia hospedeira.

O JWST continua surpreendendo a comunidade científica com descobertas que forçam revisões de modelos estabelecidos. Este buraco negro em particular pode ser o primeiro de muitos que desafiarão nossa compreensão da cosmologia.`,
    category: 'ciencia',
    author: 'Dr. Fernando "Cosmos" Oliveira',
    date: '2026-04-26',
    readTime: 7,
    tags: ['Buraco Negro', 'JWST', 'Astrofísica', 'Cosmologia', 'Nature'],
    featured: true,
    coverGradient: 'from-purple-900/40 to-slate-900/30',
    coverEmoji: '🕳️',
  },
  {
    id: 'neurociencia-sono-sonhos',
    title: 'Neurociência do Sono: Por Que Sonhamos e o Que Significa',
    subtitle: 'Novas pesquisas revelam que os sonhos são muito mais do que "restos do dia" — eles são essenciais para a saúde mental.',
    content: `A ciência do sono avançou dramaticamente nos últimos anos, e a compreensão sobre por que sonhamos está passando por uma revolução. Longe de serem apenas "restos neurais" do dia, os sonhos estão se revelando processos cognitivos fundamentais que afetam nossa saúde mental, criatividade e capacidade de aprendizado.

Pesquisas recentes publicadas no journal Science mostram que durante a fase REM (Rapid Eye Movement) do sono, o cérebro realiza um processo chamado "memory consolidation with emotional processing" — ele reativa memórias do dia, mas as "reprocessa" com uma redução na química do estresse (noradrenalina). Isso explica por why acordamos se sentindo melhor sobre problemas que nos perturbaram antes de dormir — literalmente sonhamos nossos problemas com uma perspectiva menos emocional.

Um estudo da Universidade de Stanford em 2025 usou implantes cerebrais para decodificar padrões de sonho em tempo real, alcançando 60% de acurácia na identificação de conteúdo. Os resultados sugerem que os sonhos não são aleatórios — eles seguem narrativas com começo, meio e fim, e frequentemente exploram cenários hipotéticos que o cérebro usa como "simulações" para preparar respostas emocionais.

A ligação entre sonhos e criatividade é particularmente fascinante. Durante o sono REM, o córtex pré-frontal (responsável pelo pensamento lógico) reduz sua atividade, enquanto áreas associativas do cérebro se tornam mais ativas. Isso permite conexões improváveis entre conceitos que não ocorreriam no estado acordado — é por isso que tantos "eurekas" científicos e artísticos acontecem durante o sono.

A privação de sono REM, causada por distúrbios como apneia do sono ou simplesmente noites curtas, está ligada a aumento de ansiedade, dificuldade de concentração e até maior risco de depressão. Os pesquisadores agora recomendam explicitamente 7-9 horas de sono com ciclos REM completos como parte do tratamento de saúde mental.

A mensagem é clara: aqueles 20% da vida que passamos dormindo não são "tempo perdido". São horas onde o cérebro faz algum de seu trabalho mais importante e criativo.`,
    category: 'ciencia',
    author: 'Dr. Fernando "Cosmos" Oliveira',
    date: '2026-04-19',
    readTime: 6,
    tags: ['Neurociência', 'Sono', 'Sonhos', 'Pesquisa', 'Saúde'],
    coverGradient: 'from-indigo-900/30 to-blue-900/30',
    coverEmoji: '🧠',
  },
  {
    id: 'computacao-quantica-2026',
    title: 'Computação Quântica em 2026: Onde Estamos Realmente?',
    subtitle: 'Entre promessas exageradas e avanços reais, um panorama honesto do estado atual da computação quântica.',
    content: `A computação quântica está em um momento peculiar: entre o hype exagerado de empresas prometendo "computadores quânticos em casa" e a realidade técnica de sistemas que ainda operam em condições extremas, é difícil separar o que é real do que é marketing. Vamos analisar o estado atual com honestidade.

Em 2026, os computadores quânticos mais poderosos do mundo operam com cerca de 1.000-2.000 qubits lógicos, após correção de erros. Isso é um salto enorme em relação aos ~100 qubits de 2023, mas ainda estamos muito longe dos milhões de qubits necessários para aplicações práticas em larga escala. O Google, IBM e startups como IonQ e Quantinuum estão em uma corrida acirrada, cada uma com abordagens diferentes (supercondutores, íons aprisionados, fôtons).

Onde a computação quântica já mostra vantagem real? Em simulação molecular e química — o campo onde os qubits foram originalmente concebidos para brilhar. Farmacêuticas como Pfizer e Novartis estão usando computadores quânticos para simular interações moleculares que levariam anos em supercomputadores clássicos. Isso está acelerando o desenvolvimento de novos medicamentos de formas tangíveis.

Em criptografia, a ameaça quântica já é real, mesmo que os computadores não estejam prontos para quebrar o RSA amanhã. O princípio "harvest now, decrypt later" — onde adversários capturam dados criptografados hoje para decriptá-los quando a computação quântica estiver madura — está motivando governos e empresas a adotar criptografia pós-quântica. O NIST já padronizou os primeiros algoritmos pós-quânticos em 2024.

Onde ainda somos honestos sobre as limitações: os computadores quânticos não vão substituir seus PCs para tarefas comuns. Processamento de texto, navegação web e jogos não se beneficiam da computação quântica. A vantagem é específica para problemas de otimização, simulação e criptografia que são intrinsecamente quânticos.

O timeline realista para computação quântica "prática" (resolver problemas que computadores clássicos genuinamente não conseguem em tempo viável) é entre 5-15 anos. Estamos no equivalente aos anos 1950 da computação clássica — os fundamentos estão lá, mas a aplicabilidade comercial em larga escala ainda é futura.`,
    category: 'ciencia',
    author: 'Dr. Fernando "Cosmos" Oliveira',
    date: '2026-04-11',
    readTime: 7,
    tags: ['Computação Quântica', 'Tecnologia', 'IBM', 'Google', 'Criptografia'],
    coverGradient: 'from-cyan-900/30 to-blue-900/30',
    coverEmoji: '⚛️',
  },

  // === CULTURA GEEK ===
  {
    id: 'dnd-beyond-guia',
    title: 'D&D Beyond: Guia Definitivo Para Começar Sua Campanha',
    subtitle: 'Tudo que você precisa saber para configurar sua mesa, criar personagens e rolar dados como um veterano.',
    content: `Dungeons & Dragons está vivendo sua era de maior popularidade, graças em parte a Stranger Things, Critical Role e ao acesso facilitado through plataformas como D&D Beyond. Se você está pensando em começar sua primeira campanha mas não sabe por onde começar, este guia é para você.

O primeiro passo é entender que você não precisa de muito para começar. O D&D Beyond oferece os livros básicos digitalmente: o Player's Handbook (PHB), o Dungeon Master's Guide (DMG) e o Monster Manual (MM). Para uma primeira campanha, o PHB é o único indispensável — ele contém todas as regras de criação de personagem e combate que jogadores precisam.

A criação de personagem no D&D Beyond é intuitiva e guiada. Você escolhe uma raça (humano, elfo, anão, etc.), uma classe (guerreiro, mago, ladino, etc.), e o sistema calcula automaticamente seus atributos, habilidades e proficiências. Para iniciantes, classes como Guerreiro e Ladino são mais amigáveis, enquanto Bardos e Paladinos oferecem mais opções táticas.

Encontrar um grupo é mais fácil do que nunca. Plataformas como StartPlaying.games conectam jogadores com mesas, o Discord tem milhares de servidores dedicados, e sites como Roll20 facilitam mesas online com mapas virtuais e dados integrados. Para mesas presenciais, lojas de hobbies locais frequentemente organizam noites de D&D abertas.

Para o Dungeon Master (DM) iniciante, o conselho mais valioso é: não tente ser perfeito. O D&D é sobre colaboração criativa, não sobre seguir regras rigidamente. Se os jogadores querem tentar algo que não está nas regras, use "regra da legalidade" — se for legal e divertido, deixe acontecer. Os momentos mais memoráveis de D&D vêm de decisões improváveis, não de planos perfeitos.

Módulos de campanha publicados como "Lost Mine of Phandelver" (incluso no Starter Set) são excelentes para primeiras vezes, pois fornecem uma estrutura narrativa com liberdade para improvisação. Conforme o grupo ganha confiança, campanhas originais se tornam cada vez mais naturais.

O mais importante: divirta-se. D&D é, no fim das contas, um jogo de contar histórias com amigos. Os dados são apenas ferramentas — a magia real acontece na mesa.`,
    category: 'cultura-geek',
    author: 'Rafael "D20" Mendes',
    date: '2026-04-21',
    readTime: 7,
    tags: ['D&D', 'RPG', 'D&D Beyond', 'Guia', 'Tabletop'],
    coverGradient: 'from-red-900/30 to-amber-800/30',
    coverEmoji: '🐉',
  },
  {
    id: 'historia-nintendo-64',
    title: 'A História do Nintendo 64 e Como Ele Mudou os Games',
    subtitle: 'Do cartucho ao analógico: como o N64 revolucionou a indústria e deixou um legado que influencia jogos até hoje.',
    content: `Lançado em junho de 1996 no Japão (e em setembro do mesmo ano nos EUA), o Nintendo 64 é frequentemente lembrado como o console que "perdeu" para o PlayStation, mas essa narrativa ignora o impacto imenso que ele teve na indústria de games e na cultura nerd em geral.

A decisão mais controversa — e a mais influente — da Nintendo foi manter cartuchos em vez de adotar CDs como a Sony e a Sega. Isso limitava a capacidade de armazenamento (64MB vs 650MB de um CD), mas oferecia tempos de carregamento virtualmente nulos e uma resistência a pirataria que os CDs não conseguiam igualar. O alto custo de produção dos cartuchos fez com que muitos desenvolvedores terceiros migrassem para o PlayStation, o que ironicamente concentrou a biblioteca do N64 em jogos de qualidade excepcional da Nintendo e parceiros próximos.

O legado do N64 em mecânicas de jogo é inegável. Super Mario 64 definiu como jogos em 3D deveriam funcionar — o sistema de câmera, o controle analógico e o design de níveis abertos são estudados até hoje. The Legend of Zelda: Ocarina of Time inventou o "Z-targeting" (sistema de lock-on), que se tornou padrão absoluto em jogos de ação 3D. GoldenEye 007 provou que FPS podiam funcionar em consoles, e seu sistema de multiplayer split-screen é lendário.

O controle do N64, com seu design único de três "alças" e o stick analógico central, foi revolucionário para a época. O stick permitiu um controle de precisão que o D-pad simplesmente não oferecia em ambientes 3D. A inclusão de quatro portas para controles no console, incomum na época, posicionou o N64 como a melhor opção para jogos multiplayer local.

A biblioteca relativamente pequena (388 jogos no total, contra mais de 1.300 do PlayStation) tem uma proporção de obras-primas impressionante: além dos já mencionados, Star Fox 64, Paper Mario, Mario Kart 64, Super Smash Bros., F-Zero X e Banjo-Kazooie são todos considerados clássicos que resistiram ao teste do tempo.

O N64 também inaugurou a era do multiplayer competitivo nos consoles. Antes dele, o multiplayer era predominantemente cooperative ou limitado. GoldenEye 64, Mario Kart 64 e especialmente Super Smash Bros. criaram as bases para o gaming competitivo que conhecemos hoje.`,
    category: 'cultura-geek',
    author: 'Thiago "Miyazaki" Santos',
    date: '2026-04-14',
    readTime: 6,
    tags: ['Nintendo 64', 'Retro', 'História', 'Mario 64', 'Zelda'],
    coverGradient: 'from-red-800/30 to-yellow-900/20',
    coverEmoji: '🕹️',
  },
  {
    id: 'board-games-modernos',
    title: 'Board Games Modernos: Os 10 Melhores Para Jogar com Amigos',
    subtitle: 'Esqueça Monopoly e War. Esses jogos de tabuleiro contemporâneos vão transformar suas noites de jogo.',
    content: `A revolução dos board games modernos trouxe uma era dourada para jogos de tabuleiro. Longe dos jogos de mercado que muitas vezes definham em fortunas intermináveis e turnos sem graça, os jogos de tabuleiro contemporâneos oferecem profundidade estratégica, temas envolventes e mecânicas inovadoras que rivalizam com videogames em engajamento.

"Gloomhaven" é frequentemente considerado o melhor jogo de tabuleiro já criado. Esse RPG tático cooperativo com campanha de 100+ cenários, progressão de personagem e um sistema de combate com cartas que substitui dados é uma experiência massiva. A desvantagem é o preço (caro) e o tempo de setup (longo), mas a recompensa é incomparável.

"Terraforming Mars" coloca jogadores na pele de corporações competindo para transformar Marte em um planeta habitável. O engine de recursos é brilhante — cada ação gera múltiplos benefícios encadeados, e a sensação de ver seu ecossistema marciano crescer é incrivelmente satisfatória. Para quem gosta de engine building, é o ápice.

"Wingspan" surpreende por seu tema inusitado — você é um observador de pássaros tentando atrair as melhores espécies para seu santuário. A combinação de engine building, draft de cartas e uma estética visual deslumbrante criou um fenômeno que transcendeu a comunidade de board gamers e ganhou prêmios como o Kennerspiel des Jahres.

"Spirit Island" inverte a premissa de colonização: você é um espírito da natureza defendendo sua ilha contra invasores. A cooperação é intensa e assimétrica — cada espírito joga de forma completamente diferente. É um dos jogos cooperativos mais profundos disponíveis.

"Root" é uma guerra assimétrica onde cada facção tem regras completamente diferentes: os Gatos da Floresta jogam como um jogo de area control, as Aves de Rapina como engine building, a Aliança dos Bosques como guerrilha, e o Vagabundo como RPG solo. Ensinar o jogo é um desafio, mas quando todos dominam suas facções, a dinâmica é fascinante.

Outros destaques: "Azul" (abstrato, fácil de ensinar, lindo), "Pandemic Legacy" (campanha narrativa cooperativa que muda permanentemente), "7 Wonders" (draft civilizacional rápido), "Twilight Struggle" (guerra fria para 2 jogadores) e "Scythe" (steampunk com area control e engine building).`,
    category: 'cultura-geek',
    author: 'Rafael "D20" Mendes',
    date: '2026-04-07',
    readTime: 6,
    tags: ['Board Games', 'Gloomhaven', 'Wingspan', 'Diversão', 'Tabletop'],
    coverGradient: 'from-emerald-900/30 to-green-900/30',
    coverEmoji: '🎲',
  },
  {
    id: 'evolucao-cosplay',
    title: 'A Evolução dos Cosplays — De Fã a Profissional',
    subtitle: 'O cosplay cresceu de hobby de nicho para indústria bilionária. Conheça a evolução e os profissionais que fazem arte usando espuma e LEDs.',
    content: `O cosplay evoluiu dramaticamente nas últimas duas décadas, passando de uma atividade marginal em convenções de anime para uma forma de arte respeitada — e lucrativa — com comunidades globais, competições profissionais e até carreiras full-time. A transformação é tão significativa que o termo "cosplayer" hoje pode descrever tanto um fã casual quanto um artista profissional com milhões de seguidores.

Nos anos 2000, cosplay era predominantemente caseiro: fantasias feitas com materiais de loja de artesanato, perucas de baixa qualidade e uma ênfase em imitar ao invés de criar. As técnicas se espalhavam lentamente through fóruns e blogs, e o comunitário era pequeno mas apaixonado. Ir a uma anime convention como Anime Friends ou CCXP com cosplay significava ser uma minoria entre os attendees.

A explosão das redes sociais mudou tudo. Instagram, YouTube e TikTok deram aos cosplayers uma plataforma global para showcase de seu trabalho. Pela primeira vez, um cosplayer brasileiro podia ser visto por milhões de pessoas no mundo inteiro. Ferramentas como 3D printing, espuma EVA, LEDs programáveis e airbrushing profissional se tornaram acessíveis, elevando a qualidade média dos cosplays dramaticamente.

Hoje, o cosplay profissional é uma carreira viável. Cosplayers como Kamui (Japão), Jessica Nigri (EUA) e Anya Pain (Brasil) ganham salários de seis dígitos através de patrocínios, presença em eventos, venda de prints e conteúdo exclusivo. Convenções como CCXP e Anime Expo têm áreas dedicadas com prêmios em dinheiro significativos.

A cultura do cosplay também se tornou mais inclusiva. O movimento "Cosplay is for Everyone" combateram discriminção baseada em corpo, gênero, raça e habilidade. Hoje, é aceito e celebrado que qualquer pessoa pode cosplay qualquer personagem — a diversidade enriquece a comunidade.

A tecnologia continua expandindo os limites. Cosplays com armaduras motorizadas, displays integrados, próteses de impressão 3D e maquiagem de特效 de cinema nivelam o cosplay com produção de Hollywood. O futuro promete integração com realidade aumentada e realidade virtual, criando possibilidades que os pioneiros do cosplay nem poderiam imaginar.`,
    category: 'cultura-geek',
    author: 'Ana "Pixel" Rodrigues',
    date: '2026-04-02',
    readTime: 6,
    tags: ['Cosplay', 'CCXP', 'Arte', 'Comunidade', 'Profissional'],
    coverGradient: 'from-pink-900/30 to-purple-900/30',
    coverEmoji: '🎭',
  },

  // === ARTIGOS EXTRA PARA MAIS CONTEÚDO ===
  {
    id: 'futuro-do-gaming-cloud',
    title: 'O Futuro do Cloud Gaming: Hype ou Realidade?',
    subtitle: 'Com o avanço do 5G e redução de latência, será que finalmente vamos jogar AAA na nuvem sem frustração?',
    content: `O cloud gaming voltou à discussão em 2026 com melhorias significativas na infraestrutura, mas a pergunta permanece: será que desta vez é diferente? Serviços como GeForce Now, Xbox Cloud Gaming e Luna evoluíram muito desde os primeiros testes problemáticos de 2019-2020, mas a tecnologia ainda enfrenta desafios fundamentais.

A latência, que costumava ser o grande vilão, melhorou significativamente. Com data centers mais próximos dos usuários e protocolos de streaming otimizados, a experiência em conexões de fibra é surpreendentemente boa — na casa de 20-30ms, imperceptível para a maioria dos jogos. O problema é que isso exige infraestrutura de internet que a maioria dos brasileiros ainda não tem de forma consistente.

A resolução e bitrate de streaming também avançaram. O GeForce Now da NVIDIA agora oferece streams em 4K a 60fps com codec AV1, proporcionando imagem nítida que rivaliza com hardware local. Os artefatos de compressão ainda aparecem em cenas de movimento rápido, mas são significativamente menos perceptíveis que há dois anos.

O modelo de negócios, porém, continua problemático. Você precisa comprar o jogo na Steam/Epic E também pagar a assinatura do serviço de cloud — sem contar que nem todos os jogos estão disponíveis. A proposta de valor é clara para quem não tem hardware, mas ambígua para quem já tem um PC ou console decente.

O cenário mais realista para 2026-2028 é o cloud gaming como complemento, não substituição. Jogar jogos AAA em dispositivos móveis durante viagens, acessar seu PC de casa remotamente, ou experimentar jogos antes de comprar são os casos de uso mais práticos. O futuro é híbrido: processamento local quando possível, nuvem quando necessário.`,
    category: 'games',
    author: 'Pedro "BugFree" Almeida',
    date: '2026-03-28',
    readTime: 5,
    tags: ['Cloud Gaming', 'GeForce Now', 'Xbox', 'Streaming', 'Gaming'],
    coverGradient: 'from-sky-900/30 to-blue-900/30',
    coverEmoji: '☁️',
  },
  {
    id: 'typescript-truques-avancados',
    title: 'TypeScript: 10 Truques Avançados Que Vão Melhorar Seu Código',
    subtitle: 'Vá além do básico e domine features poderosas do TypeScript que a maioria dos devs desconhece.',
    content: `TypeScript se tornou a linguagem padrão para desenvolvimento web em 2026, mas muitos desenvolvedores ainda usam apenas uma fração do que a linguagem oferece. Esses dez truques avançados vão elevar seu TypeScript para o próximo nível e tornar seu código mais seguro, expressivo e maintainable.

Template Literal Types são uma das features mais poderosas e subutilizadas. Com elas, você pode criar tipos baseados em combinações de strings: \`type EventName = \\\`on\\\${Capitalize<string>}\\\`\` cria automaticamente tipos como "onClick", "onHover", etc. Isso é especialmente útil para criar APIs tipadas consistentes.

Conditional Types permitem criar tipos que dependem de outros tipos. O operador \`T extends U ? X : Y\` funciona como um ternário para tipos, e combinado com \`infer\`, você pode extrair tipos de estruturas complexas. Por exemplo, extrair o tipo de retorno de uma função: \`type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any\`.

Mapped Types com \`as\` clause permitem transformar propriedades de objetos. Com \`{ [K in keyof T as NewKey]: NewType }\`, você pode renomear chaves, filtrar propriedades ou transformar tipos em massa. Isso é infinitamente útil para criar versões "opcionais" ou "readonly" de interfaces.

Discriminated Unions com \`satisfies\` operator (adicionado no TS 4.9) permitem verificar tipos sem perder informações específicas. Isso é perfeito para state machines tipadas e configurações com variantes.

O \`const\` type parameter, adicionado recentemente, permite criar objetos com tipos literal extremamente específicos sem precisar de \`as const\` explícitos. Funções genéricas com \`const\` type params inferem os tipos mais específicos possíveis.

Outros truques incluem: Recursive Types para estruturas profundas, branded types para segurança de domínio, type guards customizados com \`asserts\`, e o uso de \`never\` para validação exhaustiva em switch statements.`,
    category: 'dev-tech',
    author: 'Pedro "BugFree" Almeida',
    date: '2026-03-22',
    readTime: 6,
    tags: ['TypeScript', 'Tips', 'Advanced', 'Programação', 'Web Dev'],
    coverGradient: 'from-blue-900/40 to-indigo-900/30',
    coverEmoji: '🔷',
  },

  // === STEAM TOOLS ===
  {
    id: 'steam-tools-guia-completo',
    title: 'Steam Tools: Guia Completo — O Que É, Como Usar e Melhores Features',
    subtitle: 'Descubra como o Steam Tools pode transformar sua experiência na Steam com customização, estatísticas e ferramentas avançadas.',
    content: `O Steam Tools é um dos utilitários mais populares entre jogadores de PC que querem ir além do cliente padrão da Steam. Trata-se de uma plataforma que integra diversas funcionalidades que a Valve não inclui nativamente no seu cliente, permitindo que você personalize sua experiência, analise seu perfil de jogador e acesse recursos avançados de gestão de biblioteca.

A instalação é simples e direta: basta baixar o instalador pelo site oficial, executar e seguir o processo padrão. O Steam Tools é compatível com Windows 10/11 e não interfere com o funcionamento do cliente Steam original — ele funciona como uma camada complementar que se integra ao seu perfil e biblioteca existentes.

Entre as features mais usadas, destaca-se o perfil estendido, que mostra estatísticas detalhadas do seu tempo de jogo, conquistas desbloqueadas, comparações com amigos e gráficos de atividade. Você pode ver quantas horas investiu em cada jogo, quais gêneros mais joga, seu padrão de jogo durante a semana e muito mais. Para quem gosta de dados, é um paraíso.

A ferramenta de gestão de biblioteca permite organizar seus jogos em coleções personalizadas com tags, notas e categorias. Diferente das categorias padrão da Steam, o Steam Tools oferece filtros avançados, ordenação por múltiplos critérios e até recomendações baseadas no seu histórico de jogo.

O Steam Tools também oferece um sistema de skins e temas que permitem personalizar a interface do Steam. Existem centenas de temas criados pela comunidade, desde minimalistas até elaborados com efeitos visuais. A instalação é feita com um clique, e você pode alternar entre temas livremente.

Para quem revende ou troca itens, o Steam Tools inclui ferramentas de análise de mercado que mostram tendências de preços, histórico de vendas e alertas de oportunidades. Isso é particularmente útil para quem opera no mercado de cards e skins da Steam.

O Steam Tools é gratuito, recebe atualizações regulares e tem uma comunidade ativa que cria plugins e extensões. Se você é um usuário heavy da Steam, vale muito a pena experimentar.`,
    category: 'games',
    author: 'Thiago "Miyazaki" Santos',
    date: '2026-04-30',
    readTime: 6,
    tags: ['Steam', 'Steam Tools', 'Tutorial', 'PC Gaming', 'Customização'],
    featured: true,
    coverGradient: 'from-slate-800/40 to-blue-900/30',
    coverEmoji: '🛠️',
  },
  {
    id: 'millennium-steam-client',
    title: 'Millennium: O Cliente Steam Que a Valve Devia Ter Feito',
    subtitle: 'Substitua o client padrão da Steam por algo muito mais bonito, rápido e funcional. Tutorial completo de instalação e configuração.',
    content: `O Millennium é um client alternativo para a Steam que ganhou uma base de fãs enorme nos últimos anos — e por um bom motivo. Enquanto o client oficial da Steam continua recebendo atualizações que nem sempre melhoram a experiência, o Millennium se propõe a ser tudo que a Steam deveria ser: bonito, rápido e funcional.

A instalação é straightforward. Acesse o site oficial do Millennium, baixe o instalador correspondente ao seu sistema operacional (Windows ou Linux) e execute-o. Durante a instalação, o Millennium detecta automaticamente sua instalação da Steam e configura tudo. Não é necessário criar uma conta nova ou fazer login novamente — ele usa as credenciais da Steam diretamente.

O primeiro impacto visual é imediato. O Millennium usa uma interface moderna baseada em web technologies que é significativamente mais rápida que o client oficial da Valve. Os carregamentos são instantâneos, as transições são suaves e o design é limpo e intuitivo. Você pode escolher entre vários temas, incluindo opções escuras, claras e personalizadas pela comunidade.

As funcionalidades principais incluem: navegação por abas fluida, página inicial personalizada com widgets configuráveis, loja aprimorada com filtros melhores e uma biblioteca redeseñada com capas em alta resolução e organização avançada. O Millennium também adiciona features que a Steam não tem nativamente, como estatísticas detalhadas de tempo de jogo, integração com Discord enriched e um sistema de perfis expandidos.

Para quem gosta de customização, o Millennium suporta plugins e extensões criados pela comunidade. Existem plugins para integrar HowLongToBeat, mostrar preços históricos, adicionar atalhos personalizados e muito mais. O ecossistema de plugins está crescendo rapidamente e já conta com centenas de opções.

O Millennium é open source, gratuito e seguro. Como ele usa as APIs oficiais da Steam, não há risco de banimento. O projeto é mantido por desenvolvedores independentes e o código está disponível no GitHub para auditoria. Atualizações são lançadas regularmente com correções e novas features.

Se você está cansado da interface pesada e lenta do client oficial da Steam, o Millennium é sem dúvida a melhor alternativa disponível. A experiência de uso é superior em praticamente todos os aspectos, e a transição é tão suave que você vai se perguntar por que não mudou antes.`,
    category: 'games',
    author: 'Rafael "D20" Mendes',
    date: '2026-04-29',
    readTime: 7,
    tags: ['Steam', 'Millennium', 'Client', 'Tutorial', 'Customização'],
    coverGradient: 'from-cyan-900/30 to-blue-900/40',
    coverEmoji: '🔮',
  },
  {
    id: 'lua-tools-steam',
    title: 'Lua Tools: Tutorial Completo — Como Configurar e Usar no Steam',
    subtitle: 'Aprenda a instalar e configurar o Lua Tools, a ferramenta essencial para gerenciar e organizar sua biblioteca Steam.',
    content: `O Lua Tools é uma ferramenta de gestão para a Steam que se tornou indispensável para muitos jogadores de PC. Com ele, você pode gerenciar sua biblioteca de jogos de forma muito mais eficiente do que usando apenas o client padrão, com recursos avançados de organização, automação e personalização.

O processo de instalação é simples. Acesse o site oficial do Lua Tools e baixe a versão mais recente. O instalador é leve — menos de 50MB — e a configuração inicial leva menos de dois minutos. Após instalar, abra o Lua Tools e ele vai solicitar acesso à sua conta Steam. O login é feito de forma segura usando os servidores oficiais da Valve, e o Lua Tools não armazena suas credenciais localmente.

A tela principal do Lua Tools mostra sua biblioteca completa de jogos, mas com uma diferença significativa: você pode organizar tudo de forma muito mais granular. Crie categorias personalizadas, adicione tags detalhadas, defina prioridades de instalação e configure atalhos globais que funcionam mesmo com a Steam fechada.

Um dos recursos mais úteis é o gerenciador de espaço em disco. O Lua Tools mostra exatamente quanto cada jogo ocupa, permite ordenar por tamanho, identificar jogos que você não abre há meses e sugere desinstalações baseadas no seu padrão de uso. Para quem tem SSD com espaço limitado, isso é ouro.

O sistema de automação permite configurar ações para eventos específicos: atualizar automaticamente determinados jogos, fazer backup de saves em intervalos regulares, e até fechar aplicativos que consomem recursos antes de iniciar um jogo pesado. Esses scripts são criados usando uma interface visual simples, sem precisar programar.

O Lua Tools também oferece integração com o Steam Workshop, permitindo gerenciar mods de forma centralizada. Você pode ver quais mods estão instalados em cada jogo, atualizar todos de uma vez e receber notificações quando mods favoritos são atualizados pelos criadores.

A configuração de performance é outra feature forte. O Lua Tools pode otimizar automaticamente as configurações gráficas dos seus jogos baseado no hardware do seu PC, garantindo o melhor equilíbrio entre qualidade visual e FPS. Ele também monitora a temperatura e o uso de recursos enquanto você joga, com alertas se algo estiver fora do normal.

O Lua Tools é gratuito para uso pessoal, com uma versão premium que adiciona features avançadas como sincronização entre PCs, backup na nuvem e suporte prioritário. Para a maioria dos jogadores, a versão gratuita é mais do que suficiente.

Se você quer ter controle total sobre sua experiência Steam, o Lua Tools é uma das melhores ferramentas disponíveis. A combinação de organização, automação e performance em um único pacote faz dele um must-have para qualquer gamer de PC.`,
    category: 'games',
    author: 'Thiago "Miyazaki" Santos',
    date: '2026-04-28',
    readTime: 6,
    tags: ['Steam', 'Lua Tools', 'Tutorial', 'PC Gaming', 'Ferramentas'],
    coverGradient: 'from-emerald-900/30 to-teal-900/30',
    coverEmoji: '🌙',
  },
];

export function getArticleBySlug(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getArticlesByCategory(category: CategoryType): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

export function getCategoryName(id: CategoryType): string {
  return categories.find((c) => c.id === id)?.name ?? id;
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.subtitle.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.category.includes(q)
  );
}
