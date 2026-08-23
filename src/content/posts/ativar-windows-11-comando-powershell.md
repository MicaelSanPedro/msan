---
title: "Como Ativar o Windows 11 com Um Único Comando no PowerShell"
date: "2026-08-07"
excerpt: "Sem softwares suspeitos, sem keygens, sem dor de cabeça. Um único comando no PowerShell e o Windows 11 está ativado. Veja como funciona."
category: "Windows"
tags: ["windows", "powershell", "ativação", "dicas", "tutorial"]
coverImage: "/posts/windows-activation-powershell.jpg"
readTime: "4 min"
featured: false
---

## Um comando. Isso é tudo.

Se você comprou um PC com Windows 11 (ou fez upgrade) e a ativação está pendente, existe um método que a maioria das pessoas não conhece: o **Microsoft Activation Scripts (MAS)**. Um projeto open source que faz tudo automaticamente com um único comando no PowerShell.

Sem baixar executáveis aleatórios. Sem crack suspeito. Sem keygen cheio de vírus. Apenas uma linha de texto.

---

## Pré-requisitos

Antes de começar, garanta que você tem:

- **Windows 10 ou 11** (qualquer edição)
- **Conexão com a internet**
- **PowerShell executando como Administrador**

### Como abrir o PowerShell como Administrador

1. Pressione **Windows + X**
2. Clique em **Terminal (Admin)** ou **Windows PowerShell (Admin)**
3. Confirme o prompt do UAC (Controle de Conta de Usuário)

Alternativa rápida: digite `powershell` na barra de pesquisa do Windows, clique com o botão direito e selecione **"Executar como administrador"**.

---

## O Comando

Com o PowerShell aberto como Administrador, cole este comando e aperte Enter:

```powershell
irm https://get.activated.win | iex
```

O que esse comando faz:

- `irm` (Invoke-RestMethod) baixa o script do site oficial do projeto MAS
- `iex` (Invoke-Expression) executa o script baixado
- Um menu aparecerá na tela com várias opções

---

## Ativando: só apertar 1

Após executar o comando, um menu colorido aparece no terminal. Para ativar o Windows, é assim:

```
[1] HWID
[2] Ohook
[3] KMS38
[4] KMS
[5] TSA
```

**Aperte 1 e Enter.** É só isso.

O script vai:

1. Verificar o status da ativação atual
2. Aplicar a chave HWID (Hardware ID) gerada a partir do hardware do seu PC
3. Confirmar a ativação com sucesso

### O que é HWID?

HWID é um método de ativação que gera uma chave única baseada no **hardware da sua máquina** (placa-mãe, CPU, etc.). Uma vez ativado, essa chave fica vinculada ao seu hardware. Se você formatar ou trocar a peça principal, pode precisar ativar novamente.

---

## Verificando se funcionou

Após o processo, você pode verificar o status da ativação de duas formas:

### Via PowerShell

```powershell
slmgr /xpr
```

Vai aparecer um popup dizendo se o Windows está ativado permanentemente.

### Via Configurações

1. Abra **Configurações** (Windows + I)
2. Vá em **Sistema** > **Ativação**
3. Deve aparecer: **"O Windows está ativado com uma licença digital"**

---

## E se a opção 1 não funcionar?

Se o HWID falhar (raro, mas acontece), tente as outras opções do menu:

| Opção | Quando usar |
|------|------------|
| **1 - HWID** | Primeira escolha. Funciona na maioria dos PCs com Windows 10/11 |
| **2 - Ohook** | Alternativa para Office. Não ativa o Windows, só o pacote Office |
| **3 - KMS38** | Ativação válida até 2038. Bom para servidores e máquinas virtuais |
| **4 - KMS** | Ativação por 180 dias, mas renova automaticamente. Funciona em quase tudo |

A opção **4 (KMS)** é o plano B mais confiável. Ela ativa por períodos de 180 dias, mas o próprio script configura uma tarefa agendada no Windows que renova automaticamente antes de expirar. Na prática, você nunca precisa se preocupar.

---

## Segurança: é confiável?

O projeto **Microsoft Activation Scripts** é open source, hospedado no GitHub com milhares de estrelas. O código é público e auditável por qualquer pessoa. O script não instala nada permanentemente no sistema (a não ser a tarefa de renovação KMS, se você escolher essa opção).

Pontos importantes:

- O repositório no GitHub: github.com/massgravel/Microsoft-Activation-Scripts
- O código é revisado pela comunidade
- Não modifica arquivos do sistema além do necessário
- Pode ser completamente revertido se necessário

---

## Resumo rápido

```
1. Abra PowerShell como Administrador
2. Cole: irm https://get.activated.win | iex
3. Aperte 1 + Enter
4. Pronto, Windows ativado
```

Um comando, nenhum software extra, nenhuma complicação.
