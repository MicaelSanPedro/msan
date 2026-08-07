---
title: "Como Ativar o Windows 11 com Um nico Comando no PowerShell"
date: "2026-08-07"
excerpt: "Sem softwares suspeitos, sem keygens, sem dor de cabea. Um nico comando no PowerShell e o Windows 11 est ativado. Veja como funciona."
category: "Windows"
tags: ["windows", "powershell", "ativacao", "dicas", "tutorial"]
coverImage: "/posts/windows-11-gaming.jpg"
readTime: "4 min"
featured: false
---

## Um comando. Isso  tudo.

Se voc comprou um PC com Windows 11 (ou fez upgrade) e a ativao est pendente, existe um mtodo que a maioria das pessoas no conhece: o **Microsoft Activation Scripts (MAS)**. Um projeto open source que faz tudo automaticamente com um nico comando no PowerShell.

Sem baixar executveis aleatrios. Sem crack suspeito. Sem keygen cheio de vrus. Apenas uma linha de texto.

---

## Pr-requisitos

Antes de comear, garanta que voc tem:

- **Windows 10 ou 11** (qualquer edio)
- **Conexo com a internet**
- **PowerShell executando como Administrador**

### Como abrir o PowerShell como Administrador

1. Pressione **Windows + X**
2. Clique em **Terminal (Admin)** ou **Windows PowerShell (Admin)**
3. Confirme o prompt do UAC (Controle de Conta de Usurio)

Alternativa rpida: digite `powershell` na barra de pesquisa do Windows, clique com o boto direito e selecione **"Executar como administrador"**.

---

## O Comando

Com o PowerShell aberto como Administrador, cole este comando e aperte Enter:

```powershell
irm https://get.activated.win | iex
```

O que esse comando faz:

- `irm` (Invoke-RestMethod) baixa o script do site oficial do projeto MAS
- `iex` (Invoke-Expression) executa o script baixado
- Um menu aparecer na tela com vrias opes

---

## Ativando: s apertar 1

Aps executar o comando, um menu colorido aparece no terminal. Para ativar o Windows,  assim:

```
[1] HWID
[2] Ohook
[3] KMS38
[4] KMS
[5] TSA
```

**Aperte 1 e Enter.**  s isso.

O script vai:

1. Verificar o status da ativao atual
2. Aplicar a chave HWID (Hardware ID) gerada a partir do hardware do seu PC
3. Confirmar a ativao com sucesso

### O que  HWID?

HWID  um mtodo de ativao que gera uma chave nica baseada no **hardware da sua mquina** (placa-me, CPU, etc.). Uma vez ativado, essa chave fica vinculada ao seu hardware. Se voc formatar ou trocar pea principal, pode precisar ativar novamente.

---

## Verificando se funcionou

Aps o processo, voc pode verificar o status da ativao de duas formas:

### Via PowerShell

```powershell
slmgr /xpr
```

Vai aparecer um popup dizendo se o Windows est ativado permanentemente.

### Via Configuraes

1. Abra **Configuraes** (Windows + I)
2. V em **Sistema** > **Ativao**
3. Deve aparecer: **"O Windows est ativado com uma licena digital"**

---

## E se a opo 1 no funcionar?

Se o HWID falhar (raro, mas acontece), tente as outras opes do menu:

| Opo | Quando usar |
|------|------------|
| **1 - HWID** | Primeira escolha. Funciona na maioria dos PCs com Windows 10/11 |
| **2 - Ohook** | Alternativa para Office. No ativa o Windows, s o pacote Office |
| **3 - KMS38** | Ativao vlida at 2038. Bom para servidores e mquinas virtuais |
| **4 - KMS** | Ativao por 180 dias, mas renova automaticamente. Funciona em quase tudo |

A opo **4 (KMS)**  o plano B mais confivel. Ela ativa por perodos de 180 dias, mas o prprio script configura uma tarefa agendada no Windows que renova automaticamente antes de expirar. Na prtica, voc nunca precisa se preocupar.

---

## Segurana:  confivel?

O projeto **Microsoft Activation Scripts**  open source, hospedado no GitHub com milhares de estrelas. O cdigo  pblico e auditvel por qualquer pessoa. O script no instala nada permanentemente no sistema (a no ser a tarefa de renovao KMS, se voc escolher essa opo).

Pontos importantes:

- O repositrio no GitHub: github.com/massgravel/Microsoft-Activation-Scripts
- O cdigo  revisado pela comunidade
- No modifica arquivos do sistema alm do necessrio
- Pode ser completamente revertido se necessrio

---

## Resumo rpido

```
1. Abra PowerShell como Administrador
2. Cole: irm https://get.activated.win | iex
3. Aperte 1 + Enter
4. Pronto, Windows ativado
```

Um comando, nenhum software extra, nenhuma complicao.
