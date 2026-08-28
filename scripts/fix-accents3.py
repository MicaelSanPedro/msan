import re

def fix_accents(content):
    """Fix Portuguese accents in legal text. Only replaces exact words."""
    words = {
        # Words that need accent - map from unaccented to accented
        "Introducao": "Introdução",
        "Introdução": "Introdução",  # already ok
        "Definicoes": "Definições",
        "Legislacao": "Legislação",
        "Alteracoes": "Alterações",
        "Limitacao": "Limitação",
        "Politica": "Política",
        "Protecao": "Proteção",
        "Seguranca": "Segurança",
        "regulatorias": "regulatórias",
        "tecnicas": "técnicas",
        "estatisticos": "estatísticos",
        "Necessarios": "Necessários",
        "basico": "básico",
        "Aplicavel": "Aplicável",
        "Ultima": "Última",
        "atualizacao": "atualização",
        "Voce": "Você",
        "voce": "você",
        "nao": "não",
        "Nao": "Não",
        "sim": "sim",  # don't touch
        "porem": "porém",
        "alem": "além",
        "tambem": "também",
        "ate": "até",
        "ja": "já",
        "so": "só",
        "pos": "pós",
        "pre": "pré",
        "apos": "após",
        "com": "com",  # don't touch
        "nap": "não",  # special case
        "tem": "têm",  # careful
        "tem ": "tem ",  # don't touch verb "tem" = has
        "sao": "são",
        "estao": "estão",
        "esta": "está",  # verb "is"
        "sera": "será",
        "estara": "estará",
        "era": "era",  # don't touch
        "pode": "pode",  # don't touch
        "poder": "poder",  # don't touch
        "obre": "obre",  # don't touch
        "the": "the",  # don't touch
        "direto": "direto",  # don't touch
        "atencao": "atenção",
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
        "eliminacao": "eliminação",
        "anonimizacao": "anonimização",
        "revogacao": "revogação",
        "prestacao": "prestação",
        "retencao": "retenção",
        "manutencao": "manutenção",
        "identificacao": "identificação",
        "comprovacao": "comprovação",
        "reclamacoes": "reclamações",
        "cobranca": "cobrança",
        "orientacao": "orientação",
        "publicacao": "publicação",
        "aceitacao": "aceitação",
        "solicitacao": "solicitação",
        "transacao": "transação",
        "metodos": "métodos",
        "navegacao": "navegação",
        "paginas": "páginas",
        "permanencia": "permanência",
        "interacoes": "interações",
        "praticas": "práticas",
        "preferencias": "preferências",
        "experiencia": "experiência",
        "promocoes": "promoções",
        "atualizacoes": "atualizações",
        "destruicao": "destruição",
        "alteracao": "alteração",
        "transito": "trânsito",
        "esforcos": "esforços",
        "didaticos": "didáticos",
        "pedagogicas": "pedagógicas",
        "didatica": "didática",
        "pedagogica": "pedagógica",
        "alfanumerica": "alfanumérica",
        "obrigacoes": "obrigações",
        "contratuais": "contratuais",  # no accent needed
        "desnecessarios": "desnecessários",
        "anônimas": "anônimas",
        "usuarios": "usuários",
        "Usuario": "Usuário",
        "usuario": "usuário",
        "codigos": "códigos",
        "Codigo": "Código",
        "codigo": "código",
        "precos": "preços",
        "servicos": "serviços",
        "servico": "serviço",
        "conteudo": "conteúdo",
        "ilustracoes": "ilustrações",
        "logotipos": "logotipos",  # no accent needed
        "legislacao": "legislação",
        "estara": "estará",
        "disponiveis": "disponíveis",
        "responsavel": "responsável",
        "necessario": "necessário",
        "continuo": "contínuo",
        "razoaveis": "razoáveis",
        "infalivel": "infalível",
        "uteis": "úteis",
        "minimo": "mínimo",
        "maes": "mães",
        "responsáveis": "responsáveis",
        "crianca": "criança",
        "rapido": "rápido",
        "valido": "válido",
        "unico": "único",
        "disponivel": "disponível",
        "periodo": "período",
        "termino": "término",
        "existencia": "existência",
        "publico": "público",
        "historico": "histórico",
        "numero": "número",
        "endereco": "endereço",
        "discriminatorio": "discriminatório",
        "implicita": "implícita",
        "fisico": "físico",
        "fisica": "física",
        "fiscais": "fiscais",  # no accent needed
        "duvidas": "dúvidas",
        "voluntário": "voluntário",
        "violacao": "violação",
        "aviso previo": "aviso prévio",
        "Aprender": "Aprender",  # don't touch brand name
        "renuncia": "renúncia",
        "quantidade": "quantidade",  # no accent needed
        "funcionamento": "funcionamento",  # no accent needed
        "acesso": "acesso",  # no accent needed
        "sessao": "sessão",
        "direcao": "direção",
        "pai": "pai",  # don't touch
        "pais": "país",  # depends on context - "pais" as countries has accent, but here it means "parents"
        "nao autorizados": "não autorizados",
    }

    # Do word-boundary replacements where possible
    for old, new in words.items():
        if old == new:
            continue
        # Use word boundary regex for standalone words
        pattern = re.compile(r'\b' + re.escape(old) + r'\b')
        content = pattern.sub(new, content)

    return content

files = [
    "/home/z/mundo-aprender/src/app/termos-de-uso/page.tsx",
    "/home/z/mundo-aprender/src/app/politica-de-privacidade/page.tsx",
]

for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    content = fix_accents(content)

    # Post-fix known issues
    # Fix "pais" context - in mundo-aprender it means "parents" not "countries"
    content = content.replace("país", "pais")  # revert country accent since here it means parents

    # Fix "é" vs "e" - the word "e" surrounded by spaces is ambiguous (can be "and" or verb "is")
    # In legal text, standalone " e " between nouns is usually "and", not "is"
    # The verb "is" is usually "é" with accent - let's be careful

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Fixed: {filepath}")

print("Done!")
