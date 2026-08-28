import re

# Direct word replacements for remaining issues
replacements = {
    " usuario ": " usuário ",
    " usuario,": " usuário,",
    " usuario.": " usuário.",
    " codigo ": " código ",
    " codigo.": " código.",
    " codigo,": " código,",
    " servico ": " serviço ",
    " servico.": " serviço.",
    " aces ": " acesso ",
    " sera ": " será ",
    " e ": " é ",
    " esta ": " está ",
    " uno": " único",
    " as penalidades": " às penalidades",
    " estara": "estará",
    " ativacao": "ativação",
    " unica": "única",
    " possibilidade": "possibilidade",
    " préferências": "preferências",
}

files = [
    "/home/z/mundo-aprender/src/app/termos-de-uso/page.tsx",
    "/home/z/mundo-aprender/src/app/politica-de-privacidade/page.tsx",
]

for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # More careful replacements - only replace " e " when standalone as verb "is"
    # Not " e " as conjunction "and" - this is tricky in Portuguese
    # Let's be more targeted

    for old, new in replacements.items():
        if old == " e ":
            continue  # Skip this one, too ambiguous
        if old == " esta ":
            continue  # Skip, too ambiguous
        content = content.replace(old, new)

    # Manual fixes for specific lines in termos
    content = content.replace("o aces só sera", "o acesso será")
    content = content.replace("e valido para um unico u só e esta", "é válido para um único uso e está")
    content = content.replace("sujeita as penalidades", "sujeita às penalidades")
    content = content.replace("que permite ao usuario", "que permite ao usuário")
    content = content.replace("O usuario concorda", "O usuário concorda")
    content = content.replace("o usuario autoriza", "o usuário autoriza")
    content = content.replace("por meio de codigo de ativacao unico", "por meio de código de ativação único")
    content = content.replace("Cada codigo e valido para um unico uso e esta vinculado", "Cada código é válido para um único uso e está vinculado")
    content = content.replace("para ativacao do codigo e de 90", "para ativação do código é de 90")
    content = content.replace("o codigo expirara", "o código expirará")
    content = content.replace("direito a reembolso", "direito a reembolso")  # "a" here is preposition, no accent
    content = content.replace("O usuario adquire", "O usuário adquire")
    content = content.replace("servico estara disponivel", "serviço estará disponível")
    content = content.replace("E responsabilidade do usuario", "É responsabilidade do usuário")
    content = content.replace("ativacao de codigo", "ativação de código")
    content = content.replace("do usuario e personalizar", "do usuário e personalizar")  # "e" is "and" here
    content = content.replace("identificacao do usuario", "identificação do usuário")
    content = content.replace("sessao do usuario", "sessão do usuário")
    content = content.replace("fornecedor de servico", "fornecedor de serviço")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Fixed: {filepath}")

print("Done!")
