import re

replacements = {
    # Termos comuns
    "Introducao": "Introdução",
    "Definicoes": "Definições",
    "Legislacao": "Legislação",
    "Alteracoes": "Alteracoes",  # placeholder
    "Limitacao": "Limitação",
    "Politica": "Política",
    "Protecao": "Proteção",
    "Armazenamento": "Armazenamento",  # ok
    "Finalidade": "Finalidade",  # ok
    "Compartilhamento": "Compartilhamento",  # ok
    "Seguranca": "Segurança",
    "Minimos": "Mínimos",  # placeholder
    "regulatorias": "regulatórias",
    "tecnicas": "técnicas",
    "organizacionais": "organizacionais",  # ok
    "estatisticos": "estatísticos",
    "basico": "básico",
    "automaticamente": "automaticamente",  # ok actually

    # Verbos e palavras comuns
    " voce ": " você ",
    " voce,": " você,",
    " voce.": " você.",
    " voce(": " você(",
    " nao ": " não ",
    " nao,": " não,",
    " nao.": " não.",
    "nao ": "não ",
    "similares": "similares",  # ok
    " porem ": " porém ",
    "tambem": "também",
    "alem": "além",
    "ate ": "até ",
    "ja ": "já ",
    "so ": " só ",
    "pos": "pós",
    "pre": "pré",
    "apos ": "após ",
    "pos ": "pós ",
    "hah": "há",

    # Substantivos
    "atencao": "atenção",
    "iniciacao": "iniciação",
    "confirmacao": "confirmação",
    "educacao": "educação",
    "informacoes": "informações",
    "secoes": "seções",
    "oposicao": "oposição",
    "utilizacao": "utilização",
    "reproducao": "reprodução",
    "distribuicao": "distribuição",
    "modificacao": "modificação",
    "autorizacao": "autorização",
    "comunicacao": "comunicação",
    "eliminacao": "eliminação",
    "anonimizacao": "anonimização",
    "portabilidade": "portabilidade",  # ok
    "revogacao": "revogação",
    "prestacao": "prestação",
    "retencao": "retenção",
    "manutencao": "manutenção",
    "identificacao": "identificação",
    "comprovacao": "comprovação",
    "controvérsias": "controvérsias",
    "reclamacoes": "reclamações",

    # Adjetivos
    "didaticos": "didáticos",
    "pedagogicas": "pedagógicas",
    "alfanumerica": "alfanumérica",
    "essenciais": "essenciais",  # ok
    "obrigacoes": "obrigações",
    "contratuais": "contratuais",  # ok
    "desnecessarios": "desnecessários",
    "ininterrupta": "ininterrupta",  # ok
    "previa": "prévia",
    "anônimas": "anônimas",
    "anonimizados": "anonimizados",  # ok

    # Outros
    "usuarios": "usuários",
    "codigos": "códigos",
    " robos": " robôs",
    "precos": "preços",
    "servicos": "serviços",
    "conteudo": "conteúdo",
    "ilustracoes": "ilustrações",
    "legislacao": "legislação",
    "logotipos": "logotipos",  # ok
    "propriedade": "propriedade",  # ok
    "intelectual": "intelectual",  # ok
    "direitos": "direitos",  # ok
    "autorais": "autorais",  # ok
    "penalidades": "penalidades",  # ok
    "estarah": "estará",
    "disponiveis": "disponíveis",
    "responsavel": "responsável",
    "necessario": "necessário",
    "continuo": "contínuo",
    "razoaveis": "razoáveis",
    "infalivel": "infalível",
    "uteis": "úteis",
    "minimo": "mínimo",
    "fiscais": "fiscais",  # ok
    "segura": "segura",  # ok
    "existencia": "existência",
    "maes": "mães",
    "responsáveis": "responsáveis",
    "crianca": "criança",
    "intencionalmente": "intencionalmente",  # ok
    "rapido": "rápido",
    "transparente": "transparente",  # ok
    "inexatos": "inexatos",  # ok
    "desatualizados": "desatualizados",  # ok
    "incompletos": "incompletos",  # ok
    "anônimas": "anônimas",
    "anonimizados": "anonimizados",  # ok
    "publico": "público",
    "infantojuvenil": "infantojuvenil",  # ok
    "voltado": "voltado",  # ok
    "fornecimento": "fornecimento",  # ok
    "autoridade": "autoridade",  # ok
    "inadequado": "inadequado",  # ok
    "destruicao": "destruição",
    "perda": "perda",  # ok
    "alteracao": "alteração",
    "encriptacao": "encriptação",  # ok
    "transito": "trânsito",
    "acesso": "acesso",  # ok
    "restritos": "restritos",  # ok
    "monitoramento": "monitoramento",  # ok
    "esforcos": "esforços",

    # Específicos
    "Fisica": "Física",
    " didatica": " didática",
    " didatico": "didático",
    "Termos de Uso": "Termos de Uso",  # ok
    "Privacidade": "Privacidade",  # ok

    # Extra
    "Ultima": "Última",
    " atualizacao": " atualização",
    "historico": "histórico",
    "operação": "operação",  # ok
    "regulatória": "regulatória",  # ok
    "venda": "venda",  # ok
    "materiais": "materiais",  # ok
    "necessários": "necessários",
    "privacidade": "privacidade",  # ok

    # Words that need fixing
    "Codigo": "Código",
    "Usuario": "Usuário",
    "Plataforma": "Plataforma",  # ok
    "Produto": "Produto",  # ok
    "Compra": "Compra",  # ok
    "Pagamento": "Pagamento",  # ok
    "Propriedade": "Propriedade",  # ok
    "Intelectual": "Intelectual",  # ok
    "Responsabilidade": "Responsabilidade",  # ok
    "Aplicavel": "Aplicável",
    "Dados": "Dados",  # ok
    "Coletados": "Coletados",  # ok
    "Tratamento": "Tratamento",  # ok
    "Cookies": "Cookies",  # ok
    "Tecnologias": "Tecnologias",  # ok
    "Similares": "Similares",  # ok
    "Titular": "Titular",  # ok
    "Menores": "Menores",  # ok
    "Idade": "Idade",  # ok
    "Contato": "Contato",  # ok
    "Sessao": "Sessão",
    "desabilitar": "desabilitar",  # ok
    "sobrecarregar": "sobrecarregar",  # ok
    "prejudicar": "prejudicar",  # ok
    "funcionamento": "funcionamento",  # ok
    "scrapers": "scrapers",  # ok
    "ferramenta": "ferramenta",  # ok
    "automatizada": "automatizada",  # ok
    "restritas": "restritas",  # ok
    "terceiros": "terceiros",  # ok
    "nao autorizados": "não autorizados",
    "ofensivo": "ofensivo",  # ok
    "discriminatorio": "discriminatório",
    "viole": "viole",  # ok
    "Reais": "Reais",  # ok
    "alterados": "alterados",  # ok
    "processado": "processado",  # ok
    "certificados": "certificados",  # ok
    "finalizar": "finalizar",  # ok
    "autoriza": "autoriza",  # ok
    "cobranca": "cobrança",
    "selecionado": "selecionado",  # ok
    "entrega": "entrega",  # ok
    "digitais": "digitais",  # ok
    "iniciado": "iniciado",  # ok
    "Liberado": "Liberado",  # ok
    "ativo": "ativo",  # ok
    "valido": "válido",
    "vinculado": "vinculado",  # ok
    "prazo": "prazo",  # ok
    "noventa": "noventa",  # ok
    "data": "data",  # ok
    "compra": "compra",  # ok
    "findo": "findo",  # ok
    "expirara": "expirará",
    "direito": "direito",  # ok
    "reembolso": "reembolso",  # ok
    "disponivel": "disponível",
    "ininterrupta": "ininterrupta",  # ok
    "erros": "erros",  # ok
    "diretos": "diretos",  # ok
    "indiretos": "indiretos",  # ok
    "incidentais": "incidentais",  # ok
    "consequentes": "consequentes",  # ok
    "decorrentes": "decorrentes",  # ok
    "impossibilidade": "impossibilidade",  # ok
    "destina-se": "destina-se",  # ok
    "complementar": "complementar",  # ok
    "substitui": "substitui",  # ok
    "orientacao": "orientação",
    "pedagogica": "pedagógica",
    "profissional": "profissional",  # ok
    "reserva-se": "reserva-se",  # ok
    "modificar": "modificar",  # ok
    "momento": "momento",  # ok
    "aviso previo": "aviso prévio",
    "alteracoes": "alterações",
    "enteram": "entram",  # ok
    "vigor": "vigor",  # ok
    "imediatamente": "imediatamente",  # ok
    "publicacao": "publicação",
    "aceitacao": "aceitação",
    "implicita": "implícita",
    "regidos": "regidos",  # ok
    "brasileira": "brasileira",  # ok
    "Quaisquer": "Quaisquer",  # ok
    "duvidas": "dúvidas",
    "submetidas": "submetidas",  # ok
    "foro": "foro",  # ok
    "Comarca": "Comarca",  # ok
    "Estado": "Estado",  # ok
    "renuncia": "renúncia",
    "expressa": "expressa",  # ok
    "privilegiado": "privilegiado",  # ok
    "solicitacoes": "solicitações",
    "seguranca": "segurança",
    "LGPD": "LGPD",  # ok
    "valoriza": "valoriza",  # ok
    "descreve": "descreve",  # ok
    "coletamos": "coletamos",  # ok
    "utilizamos": "utilizamos",  # ok
    "armazenamos": "armazenamos",  # ok
    "protegemos": "protegemos",  # ok
    "pessoais": "pessoais",  # ok
    "conformidade": "conformidade",  # ok
    "consente": "consente",  # ok
    "praticas": "práticas",
    "Recomendamos": "Recomendamos",  # ok
    "leitura": "leitura",  # ok
    "atenta": "atenta",  # ok
    "compreenda": "compreenda",  # ok
    "plenamente": "plenamente",  # ok
    "tratamos": "tratamos",  # ok
    "garantir": "garantir",  # ok
    "adequado": "adequado",  # ok
    "oferecer": "oferecer",  # ok
    "experiencia": "experiência",
    "personalizada": "personalizada",  # ok
    "cadastro": "cadastro",  # ok
    "completo": "completo",  # ok
    "endereco": "endereço",
    "numero": "número",
    "telefone": "telefone",  # ok
    "fornecidos": "fornecidos",  # ok
    "transacao": "transação",
    "metodos": "métodos",
    "relacionados": "relacionados",  # ok
    "processamento": "processamento",  # ok
    "pedidos": "pedidos",  # ok
    "navegacao": "navegação",
    "sistema": "sistema",  # ok
    "operacional": "operacional",  # ok
    "paginas": "páginas",
    "visitadas": "visitadas",  # ok
    "permanencia": "permanência",
    "coletados": "coletados",  # ok
    "visializados": "visualizados",  # ok
    "interacoes": "interações",
    "exclusivamente": "exclusivamente",  # ok
    "finalidades": "finalidades",  # ok
    "Processar": "Processar",  # ok
    "entregar": "entregar",  # ok
    "fisicos": "físicos",
    "Enviar": "Enviar",  # ok
    "comprovantes": "comprovantes",  # ok
    "status": "status",  # ok
    "Ativar": "Ativar",  # ok
    "acesso": "acesso",  # ok
    "digital": "digital",  # ok
    "adquirido": "adquirido",  # ok
    "Melhorar": "Melhorar",  # ok
    "personalizar": "personalizar",  # ok
    "oferecido": "oferecido",  # ok
    "Comunicar": "Comunicar",  # ok
    "novidades": "novidades",  # ok
    "promocoes": "promoções",
    "atualizacoes": "atualizações",
    "mediante": "mediante",  # ok
    "consentimento": "consentimento",  # ok
    "Cumprir": "Cumprir",  # ok
    "obrigacoes": "obrigações",
    "legais": "legais",  # ok
    "regulatorias": "regulatórias",
    "Prevenir": "Prevenir",  # ok
    "fraudes": "fraudes",  # ok
    "vende": "vende",  # ok
    "aluga": "aluga",  # ok
    "comerciais": "comerciais",  # ok
    "prestadores": "prestadores",  # ok
    "essenciais": "essenciais",  # ok
    "e-mail": "e-mail",  # ok
    "contratuais": "contratuais",  # ok
    "sigilo": "sigilo",  # ok
    "Anonimizados": "Anonimizados",  # ok
    "estatisticos": "estatísticos",
    "melhoria": "melhoria",  # ok
    "possibilidade": "possibilidade",  # ok
    "Necessarios": "Necessários",
    "funcionamento": "funcionamento",  # ok
    "preferencias": "preferências",
    "aceite": "aceite",  # ok
    "sessao": "sessão",
    "desempenho": "desempenho",  # ok
    "interagir": "interagir",  # ok
    "funcionalidade": "funcionalidade",  # ok
    "configurar": "configurar",  # ok
    "navegador": "navegador",  # ok
    "recusar": "recusar",  # ok
    "afetar": "afetar",  # ok
    "Adotamos": "Adotamos",  # ok
    "medidas": "medidas",  # ok
    "pessoais": "pessoais",  # ok
    "contra": "contra",  # ok
    "autorizado": "autorizado",  # ok
    "destruicao": "destruição",
    "perda": "perda",  # ok
    "alteracao": "alteração",
    "inadequado": "inadequado",  # ok
    "encriptacao": "encriptação",  # ok
    "transito": "trânsito",
    "controles": "controles",  # ok
    "restritos": "restritos",  # ok
    "monitoramento": "monitoramento",  # ok
    "backups": "backups",  # ok
    "regulares": "regulares",  # ok
    "Embora": "Embora",  # ok
    "empreguemos": "empreguemos",  # ok
    "razoaveis": "razoáveis",
    "proteger": "proteger",  # ok
    "nenhum": "nenhum",  # ok
    "completamente": "completamente",  # ok
    "infalivel": "infalível",
    "garantir": "garantir",  # ok
    "absoluta": "absoluta",  # ok
    "transmitidos": "transmitidos",  # ok
    "internet": "internet",  # ok
    "possui": "possui",  # ok
    "seguintes": "seguintes",  # ok
    "relacao": "relação",
    "Confirmacao": "Confirmação",
    "existencia": "existência",
    "acessar": "acessar",  # ok
    "Correcao": "Correção",
    "Solicitar": "Solicitar",  # ok
    "incompletos": "incompletos",  # ok
    "inexatos": "inexatos",  # ok
    "desatualizados": "desatualizados",  # ok
    "Anonimizacao": "Anonimização",
    "bloqueio": "bloqueio",  # ok
    "eliminacao": "eliminação",
    "desnecessarios": "desnecessários",
    "Portabilidade": "Portabilidade",  # ok
    "Revogacao": "Revogação",
    "previamente": "previamente",  # ok
    "concedido": "concedido",  # ok
    "momento": "momento",  # ok
    "Oposicao": "Oposição",
    "realizado": "realizado",  # ok
    "irregularidade": "irregularidade",  # ok
    "exercer": "exercer",  # ok
    "destes": "destes",  # ok
    "direitos": "direitos",  # ok
    "contato": "contato",  # ok
    "canais": "canais",  # ok
    "Responderemos": "Responderemos",  # ok
    "solicitacao": "solicitação",
    "no prazo de ate": "no prazo de até",
    "uteis": "úteis",
    "conforme": "conforme",  # ok
    "previsto": "previsto",  # ok
    "periodo": "período",
    "cumprir": "cumprir",  # ok
    "coletados": "coletados",  # ok
    "fiscais": "fiscais",  # ok
    "termino": "término",
    "retencao": "retenção",
    "eliminados": "eliminados",  # ok
    "anonimizados": "anonimizados",  # ok
    "salvo": "salvo",  # ok
    "legal": "legal",  # ok
    "voltado": "voltado",  # ok
    "infantojuvenil": "infantojuvenil",  # ok
    "porem": "porém",
    "compras": "compras",  # ok
    "realizados": "realizados",  # ok
    "pais": "pais",  # ok
    "maes": "mães",
    "legais": "legais",  # ok
    "fornecer": "fornecer",  # ok
    "menores": "menores",  # ok
    "responsavel": "responsável",
    "confirma": "confirma",  # ok
    "possui": "possui",  # ok
    "autoridade": "autoridade",  # ok
    "conceder": "conceder",  # ok
    "nome": "nome",  # ok
    "Reservamo-nos": "Reservamo-nos",  # ok
    "solicitar": "solicitar",  # ok
    "comprovacao": "comprovação",
    "parental": "parental",  # ok
    "necessario": "necessário",
    "Nao": "Não",
    "coletamos": "coletamos",  # ok
    "intencionalmente": "intencionalmente",  # ok
    "reclamacoes": "reclamações",
    "tratamento": "tratamento",  # ok
    "Encarregado": "Encarregado",  # ok
    "comprometidos": "comprometidos",  # ok
    "atender": "atender",  # ok
    "forma": "forma",  # ok
    "rapido": "rápido",
    "transparente": "transparente",  # ok

    # Edição e correção do metadata
    "Politica de Privacidade": "Política de Privacidade",
    "Didaticos": "Didáticos",

    # Outras correções específicas
    "Legislacao Aplicavel": "Legislação Aplicável",
    "Limitacao de Responsabilidade": "Limitação de Responsabilidade",
    "Alteracoes nos Termos": "Alterações nos Termos",
    "Armazenamento de Dados": "Armazenamento de Dados",
    "Direitos do Titular dos Dados": "Direitos do Titular dos Dados",
    "Cookies e Tecnologias Similares": "Cookies e Tecnologias Similares",
    "Seguranca dos Dados": "Segurança dos Dados",
    "Compartilhamento de Dados": "Compartilhamento de Dados",
    "Finalidade do Tratamento": "Finalidade do Tratamento",
    "Dados Coletados": "Dados Coletados",
    "Menores de Idade": "Menores de Idade",
    "Propriedade Intelectual": "Propriedade Intelectual",
    "Compras e Pagamentos": "Compras e Pagamentos",
    "Uso da Plataforma": "Uso da Plataforma",
    "Ver Politica de Privacidade": "Ver Política de Privacidade",
    "Ver Termos de Uso": "Ver Termos de Uso",

    # Última atualização
    "Ultima atualizacao": "Última atualização",
}

# Files to fix
files = [
    "/home/z/mundo-aprender/src/app/termos-de-uso/page.tsx",
    "/home/z/mundo-aprender/src/app/politica-de-privacidade/page.tsx",
]

for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Sort replacements by length (longest first) to avoid partial replacements
    sorted_replacements = sorted(replacements.items(), key=lambda x: -len(x[0]))

    for old, new in sorted_replacements:
        content = content.replace(old, new)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Fixed: {filepath}")

print("Done!")
