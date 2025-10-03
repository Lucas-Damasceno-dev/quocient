# Descrição da Interface do Aplicativo de Trivia (Baseado no Figma)

Este documento detalha a estrutura e o design das telas para um aplicativo de trivia (quiz), com base na captura de tela do Figma (`Captura de imagem_20250930_182006.png`). As outras imagens servem como referência secundária para o estilo visual.

## Fluxo de Telas no Figma

O design do Figma apresenta um fluxo de três telas principais: Configuração, Pergunta e Resultados.

### 1. Tela de Configuração (`configuração`)

Esta é a tela inicial onde o usuário prepara o quiz.

- **Título:** "Olá Bem Vindo Ao Quotient!"
- **Seleção de Número de Perguntas:**
  - Um campo numérico (iniciado com "10") com botões de "+" e "-" para ajustar a quantidade de perguntas.
- **Seleção de Dificuldade:**
  - Botões para escolher o nível: "Easy", "Medium", "Hard".
- **Seleção de Categoria:**
  - Um botão principal "Select Category".
  - Ao lado, uma grade de categorias (em vermelho) para o usuário escolher. Exemplos: "Categoria x", "Categoria y", "Categoria z".
- **Seleção de Tipo de Pergunta:**
  - Botões para escolher o formato: "Multiple Choice" (Múltipla Escolha) ou "True/False" (Verdadeiro/Falso).
- **Ação Principal:**
  - Um botão "Start Quiz" para iniciar o jogo com as configurações selecionadas.

### 2. Tela de Pergunta (`pergunta`)

Esta é a tela principal do jogo onde as perguntas são exibidas.

- **Layout:** Design limpo e centralizado.
- **Cronômetro:**
  - Um círculo verde no topo exibindo o tempo restante (ex: "30s").
- **Área da Pergunta:**
  - Um grande bloco retangular centralizado onde o texto da "PERGUNTA" será exibido.
- **Alternativas de Resposta:**
  - Quatro botões retangulares para as alternativas: "Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D".
- **Ação de Confirmação:**
  - Um botão "CONFIRME" na parte inferior para submeter a resposta selecionada.

### 3. Tela de Resultados (`resultados`)

Esta tela é exibida ao final do quiz.

- **Layout:** Um card centralizado.
- **Mensagem de Resultado:**
  - Texto principal informando o desempenho. Ex: "Você acertou x de y perguntas. Parabéns".
- **Ação Principal:**
  - Um botão "Reiniciar" (em laranja) para jogar novamente.

## Resumo do Design a ser Implementado

O objetivo é replicar a funcionalidade e o layout das três telas definidas no Figma:

1.  **Configuração do Quiz:** Permitir que o usuário personalize a partida (número de questões, dificuldade, categoria, tipo).
2.  **Execução do Quiz:** Apresentar as perguntas com um cronômetro e opções de resposta.
3.  **Exibição dos Resultados:** Mostrar o placar final e oferecer a opção de reiniciar.

O design é minimalista e focado na funcionalidade, utilizando blocos de cores e layout simples para guiar o usuário. As imagens de referência de smartphones (`Home.png`, `Leaderboard.png`, etc.) podem ser usadas como inspiração para o estilo visual (cores, fontes, ícones), mas o layout estrutural deve seguir o Figma.
