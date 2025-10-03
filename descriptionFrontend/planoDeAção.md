# Plano de Ação: Desenvolvimento do App de Trivia - Ecomp Jr.

## 1. Resumo Executivo

### Visão Geral do Projeto
O App de Trivia é uma aplicação web interativa desenvolvida como MVP para futuras iniciativas de gamificação da Ecomp Jr. A aplicação permite que usuários configurem e participem de quizzes personalizados, consumindo dados da API Open Trivia DB.

### Objetivos Principais
- Criar uma experiência de usuário fluida e agradável através de uma interface intuitiva
- Implementar um sistema de quiz configurável com diferentes categorias, dificuldades e tipos de perguntas
- Desenvolver uma arquitetura frontend escalável e bem componentizada
- Demonstrar proficiência nas tecnologias React, Vite e Tailwind CSS

### Experiência do Usuário Esperada
A aplicação oferecerá uma jornada completa de quiz em três etapas principais: configuração personalizada do quiz, resposta sequencial às perguntas com feedback visual claro, e visualização dos resultados finais com opção de jogar novamente. Todo o fluxo será otimizado para dispositivos desktop e mobile.

## 2. Levantamento e Análise de Requisitos

### 2.1 Requisitos Funcionais (RF)

#### RF01 - Tela de Configuração
- **RF01.1**: O sistema deve exibir um formulário de configuração com os seguintes campos:
  - Campo numérico para quantidade de perguntas (mínimo 1, máximo definido pela API)
  - Seletor dropdown para categorias (carregadas dinamicamente da API)
  - Seletor dropdown para dificuldade com opções: Easy, Medium, Hard
  - Seletor dropdown para tipo de questão: Multiple Choice, True/False
- **RF01.2**: O botão "Iniciar Quiz" deve estar desabilitado até que todos os campos sejam preenchidos
- **RF01.3**: Ao clicar em "Iniciar Quiz", o sistema deve buscar as perguntas na API com os parâmetros selecionados
- **RF01.4**: Após sucesso na busca, o sistema deve navegar automaticamente para a Tela do Quiz

#### RF02 - Tela do Quiz
- **RF02.1**: Exibir uma pergunta por vez com suas opções de resposta
- **RF02.2**: Permitir seleção de apenas uma resposta por pergunta
- **RF02.3**: Implementar navegação para próxima pergunta após seleção da resposta
- **RF02.4**: Mostrar contador de progresso no formato "Questão X de Y"
- **RF02.5**: Armazenar as respostas do usuário para cálculo posterior da pontuação
- **RF02.6**: Após responder todas as perguntas, navegar automaticamente para a Tela de Resultados

#### RF03 - Tela de Resultados
- **RF03.1**: Exibir pontuação final no formato "Você acertou X de Y perguntas"
- **RF03.2**: Calcular e mostrar porcentagem de acertos
- **RF03.3**: Implementar botão "Jogar Novamente" que retorna à Tela de Configuração
- **RF03.4**: Limpar todos os dados da sessão anterior ao iniciar novo jogo

### 2.2 Requisitos Não Funcionais (RNF)

- **RNF01**: A aplicação deve ser responsiva e funcionar adequadamente em telas de 320px até 1920px de largura
- **RNF02**: O código deve ser organizado em componentes reutilizáveis seguindo princípios de componentização
- **RNF03**: Utilizar convenção de commits padronizada (Conventional Commits)
- **RNF04**: Incluir documentação README.md completa com instruções de instalação e execução
- **RNF05**: Tempo de resposta da interface deve ser inferior a 200ms para ações do usuário
- **RNF06**: A aplicação deve funcionar nos navegadores Chrome, Firefox, Safari e Edge (versões atuais)

### 2.3 Requisitos Diferenciais

- **RD01**: Implementar componentes usando a biblioteca shadcn/ui
- **RD02**: Fornecer feedback visual instantâneo nas respostas (verde para correto, vermelho para incorreto)
- **RD03**: Criar protótipo visual no Figma antes da implementação
- **RD04**: Implementar animações suaves entre transições de telas e componentes

## 3. Definição da Stack Tecnológica

### Stack Principal (Obrigatória)
- **React 18**: Framework principal para construção da UI
- **Vite 5**: Build tool e dev server para desenvolvimento rápido
- **Tailwind CSS 3**: Framework CSS utility-first para estilização
- **Axios**: Cliente HTTP para comunicação com a API Open Trivia DB

### Bibliotecas Adicionais Recomendadas
- **react-router-dom v6**: Gerenciamento de rotas e navegação entre telas
- **zod**: Validação de esquemas para formulários e respostas da API
- **react-hook-form**: Gerenciamento eficiente de formulários
- **clsx**: Utilitário para construção condicional de classes CSS
- **shadcn/ui**: Biblioteca de componentes baseada em Radix UI (diferencial)
- **framer-motion**: Animações e transições suaves (opcional)
- **@tanstack/react-query**: Gerenciamento de estado do servidor e cache (opcional)

### Ferramentas de Desenvolvimento
- **TypeScript**: Para type safety e melhor experiência de desenvolvimento
- **ESLint + Prettier**: Padronização e formatação de código
- **Git + GitHub**: Controle de versão e hospedagem do código

## 4. Arquitetura e Estrutura do Projeto

### 4.1 Estrutura de Pastas
```
trivia-app/
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── ui/              # Componentes base (Button, Select, etc.)
│   │   ├── quiz/            # Componentes específicos do quiz
│   │   └── layout/          # Componentes de layout
│   ├── pages/               # Componentes de página/tela
│   │   ├── ConfigPage.tsx
│   │   ├── QuizPage.tsx
│   │   └── ResultsPage.tsx
│   ├── hooks/               # Custom hooks
│   │   ├── useQuiz.ts
│   │   └── useApi.ts
│   ├── services/            # Serviços e integrações
│   │   └── triviaApi.ts
│   ├── utils/               # Funções utilitárias
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── types/               # TypeScript types/interfaces
│   │   └── quiz.types.ts
│   ├── styles/              # Estilos globais
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── public/                  # Assets estáticos
├── .env.example            # Variáveis de ambiente exemplo
├── README.md               # Documentação do projeto
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

### 4.2 Estratégia de Gerenciamento de Estado

#### Estado Local (useState)
Para estados simples e isolados de componentes:
- Estado de formulário na tela de configuração
- Estado de resposta selecionada em cada pergunta
- Estados de UI (loading, modals, etc.)

#### Contexto Global (Context API + useReducer)
Para o estado principal do quiz que precisa ser compartilhado entre telas:
```typescript
interface QuizState {
  config: QuizConfig;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Answer[];
  isLoading: boolean;
  error: string | null;
}
```

#### Fluxo de Dados
1. **ConfigPage**: Captura configurações → Dispara action para buscar perguntas
2. **QuizContext**: Gerencia estado global do quiz e respostas do usuário
3. **QuizPage**: Consome perguntas do contexto → Atualiza respostas
4. **ResultsPage**: Calcula pontuação baseada no estado final

## 5. Design da Interface e Diagramas

### 5.1 Componentes Reutilizáveis

#### Componentes Base (UI)
- **Button**: Botão customizável com variantes (primary, secondary, outline)
- **Select**: Dropdown estilizado para seleções
- **Input**: Campo de entrada numérica estilizado
- **Card**: Container para conteúdo com sombra e bordas arredondadas
- **Loader**: Indicador de carregamento animado

#### Componentes Específicos do Quiz
- **QuestionCard**: Exibe pergunta com suas opções de resposta
- **AnswerOption**: Botão/card individual para cada opção de resposta
- **ProgressBar**: Barra visual de progresso do quiz
- **ScoreDisplay**: Componente para exibir pontuação final
- **ConfigForm**: Formulário completo de configuração

#### Componentes de Layout
- **PageContainer**: Wrapper para padronizar espaçamento das páginas
- **Header**: Cabeçalho com título da aplicação
- **TransitionWrapper**: Wrapper para animações entre páginas

### 5.2 Diagrama de Fluxo do Usuário

```
┌─────────────────┐
│  Tela Inicial   │
│ (Configuração)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Preenche Form:  │
│ - Nº Perguntas  │
│ - Categoria     │
│ - Dificuldade   │
│ - Tipo          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Clica "Iniciar" │
│   (API Call)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Tela Quiz     │
│  Pergunta 1/N   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Responde e      │
│ Avança (Loop)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Tela Resultados │
│  Score: X/Y     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ "Jogar de Novo"│
└─────────────────┘
         │
         └──────► (Volta ao início)
```

### 5.3 Diagrama de Componentes

```
App.tsx
├── Router
│   ├── ConfigPage
│   │   ├── Header
│   │   ├── PageContainer
│   │   └── ConfigForm
│   │       ├── Input (quantidade)
│   │       ├── Select (categoria)
│   │       ├── Select (dificuldade)
│   │       ├── Select (tipo)
│   │       └── Button (iniciar)
│   │
│   ├── QuizPage
│   │   ├── Header
│   │   ├── PageContainer
│   │   ├── ProgressBar
│   │   └── QuestionCard
│   │       ├── Question Text
│   │       └── AnswerOption[] (map)
│   │
│   └── ResultsPage
│       ├── Header
│       ├── PageContainer
│       ├── ScoreDisplay
│       │   ├── Score Text
│       │   └── Percentage
│       └── Button (jogar novamente)
│
└── QuizProvider (Context)
```

## 6. Planejamento e Cronograma (Roadmap)

### Semana 1: Fundação e Configuração (7 dias)
**Dias 1-2: Setup Inicial**
- Criar repositório GitHub e configurar Git Flow
- Inicializar projeto com Vite + React + TypeScript
- Configurar Tailwind CSS e estrutura base
- Instalar e configurar dependências principais
- Criar estrutura de pastas do projeto

**Dias 3-4: Componentes Base e Integração API**
- Implementar componentes UI base (Button, Select, Input, Card)
- Criar serviço de integração com Open Trivia DB
- Implementar hooks customizados (useApi, useQuiz)
- Testar chamadas à API e tratamento de erros

**Dias 5-7: Tela de Configuração**
- Desenvolver ConfigForm com validações
- Implementar lógica de busca de categorias da API
- Criar navegação para próxima tela
- Estilizar tela com Tailwind/shadcn

### Semana 2: Core do Quiz (7 dias)
**Dias 8-10: Context e Estado Global**
- Implementar QuizContext com useReducer
- Criar actions e reducers para gerenciamento de estado
- Integrar Context com páginas
- Implementar persistência temporária de dados

**Dias 11-14: Tela do Quiz**
- Desenvolver QuestionCard e AnswerOption
- Implementar lógica de navegação entre perguntas
- Criar ProgressBar funcional
- Adicionar feedback visual nas respostas (diferencial)
- Implementar armazenamento de respostas do usuário

### Semana 3: Finalização e Polimento (6 dias)
**Dias 15-16: Tela de Resultados**
- Criar ScoreDisplay com cálculo de pontuação
- Implementar botão "Jogar Novamente" com reset de estado
- Estilizar tela de resultados
- Adicionar animações de transição

**Dias 17-19: Responsividade e Otimizações**
- Ajustar layouts para mobile (320px+)
- Otimizar performance e lazy loading
- Implementar tratamento de erros global
- Adicionar estados de loading apropriados

**Dias 20: Documentação e Deploy**
- Escrever README.md completo
- Criar documentação de componentes
- Preparar build de produção
- Realizar testes finais cross-browser

## 7. Estratégia de Testes

### 7.1 Testes Manuais com DevTools

#### Testes de Responsividade
- Utilizar o modo responsivo do Chrome DevTools
- Testar em viewports: 320px, 768px, 1024px, 1920px
- Verificar orientação portrait e landscape em mobile
- Validar que todos os elementos são acessíveis e legíveis

#### Testes de Performance
- Usar aba Performance do DevTools para identificar gargalos
- Verificar tempo de First Contentful Paint (< 1.5s)
- Analisar bundle size com Vite Bundle Visualizer
- Otimizar imagens e assets se necessário

#### Testes de Rede
- Simular conexões lentas (Slow 3G) no DevTools
- Verificar comportamento com falhas de rede
- Validar estados de loading e mensagens de erro
- Testar cache de respostas da API

### 7.2 Checklist de Validação

#### Funcionalidades Críticas
- [ ] Formulário de configuração valida todos os campos
- [ ] API retorna perguntas corretamente com parâmetros
- [ ] Navegação entre perguntas funciona sem erros
- [ ] Cálculo de pontuação está correto
- [ ] Botão "Jogar Novamente" reseta todo o estado

#### Experiência do Usuário
- [ ] Feedback visual claro em todas as interações
- [ ] Transições suaves entre telas
- [ ] Mensagens de erro são informativas
- [ ] Interface é intuitiva sem necessidade de instruções

## 8. Boas Práticas e Qualidade de Código

### 8.1 Convenção de Commits

Adotar o padrão **Conventional Commits** para mensagens padronizadas:

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé(s) opcional(is)]
```

#### Tipos de Commit
- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Alterações na documentação
- **style**: Formatação, sem alteração de código
- **refactor**: Refatoração sem adicionar features ou corrigir bugs
- **test**: Adição ou correção de testes
- **chore**: Tarefas de build, configs, etc.

#### Exemplos
```bash
feat(quiz): adicionar componente QuestionCard
fix(api): corrigir tratamento de erro na busca de categorias
docs: atualizar instruções de instalação no README
style: formatar código com prettier
refactor(config): simplificar lógica de validação do formulário
```

### 8.2 Estrutura do README.md

```markdown
# App de Trivia - Ecomp Jr

## 📋 Sobre o Projeto
Breve descrição da aplicação e seu propósito.

## 🚀 Tecnologias Utilizadas
- React 18
- Vite 5
- Tailwind CSS
- Axios
- [outras bibliotecas...]

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Passos
1. Clone o repositório
   ```bash
   git clone https://github.com/seu-usuario/trivia-app.git
   ```

2. Instale as dependências
   ```bash
   cd trivia-app
   npm install
   ```

3. Execute o projeto
   ```bash
   npm run dev
   ```

## 🎨 Design
[Link para o protótipo no Figma]

## 🏗️ Estrutura do Projeto
[Descrição da organização de pastas]

## 🤝 Contribuição
[Instruções para contribuir]

## 📄 Licença
[Informações de licença]
```

### 8.3 Padrões de Código

#### Componentização
- Componentes devem ter responsabilidade única
- Props devem ser tipadas com TypeScript
- Usar destructuring para props
- Preferir functional components com hooks

#### Nomenclatura
- Componentes: PascalCase (QuestionCard)
- Hooks: camelCase com prefixo 'use' (useQuiz)
- Utilitários: camelCase (formatScore)
- Tipos/Interfaces: PascalCase com sufixo apropriado (QuizConfig)

#### Organização de Imports
```typescript
// 1. Imports externos
import React from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Imports internos - componentes
import { Button } from '@/components/ui/Button';

// 3. Imports internos - hooks, utils, types
import { useQuiz } from '@/hooks/useQuiz';
import { formatScore } from '@/utils/formatters';
import type { QuizConfig } from '@/types/quiz.types';

// 4. Imports de estilos
import styles from './Component.module.css';
```

Este plano de ação fornece uma estrutura completa e detalhada para o desenvolvimento bem-sucedido do App de Trivia, garantindo que todos os requisitos sejam atendidos e as melhores práticas sejam seguidas durante todo o processo de desenvolvimento.
