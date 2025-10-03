# Lista de Tarefas - Frontend App de Trivia

## 1. Planejamento e Configuração Inicial

### 1.1. Definição de Requisitos e Planejamento
- [ ] Ler e analisar todos os documentos do desafio
- [ ] Revisar o plano de ação existente
- [ ] Definir escopo e requisitos obrigatórios vs diferenciais
- [ ] Definir cronograma de desenvolvimento
- [ ] Criar repositório GitHub para o projeto
- [ ] Configurar estrutura de diretórios do projeto

### 1.2. Configuração do Ambiente de Desenvolvimento
- [ ] Instalar Node.js 18+ e npm/yarn
- [ ] Criar projeto React com Vite (TypeScript)
- [ ] Instalar dependências principais: axios, react-router-dom
- [ ] Instalar dependências de desenvolvimento: @types/node, eslint, prettier
- [ ] Configurar linter (ESLint) e formatter (Prettier)
- [ ] Criar arquivo .gitignore adequado para React + TypeScript

## 2. Prototipação da Interface (Diferencial)

### 2.1. Criação de Protótipo no Figma
- [ ] Criar conta no Figma (se necessário)
- [ ] Planejar layout das 3 telas principais:
  - [ ] Tela de Configuração do Quiz
  - [ ] Tela do Quiz
  - [ ] Tela de Resultados
- [ ] Criar wireframes das telas
- [ ] Desenvolver design visual com cores e tipografia
- [ ] Adicionar detalhes de interação e feedback visual
- [ ] Compartilhar link de visualização do protótipo
- [ ] Armazenar link do protótipo para incluir no README.md

## 3. Estruturação do Projeto e Componentes Base

### 3.1. Estruturação de Diretórios
- [ ] Criar estrutura de pastas conforme especificado:
  - [ ] src/components/
  - [ ] src/components/ui/
  - [ ] src/components/quiz/
  - [ ] src/components/layout/
  - [ ] src/pages/
  - [ ] src/hooks/
  - [ ] src/services/
  - [ ] src/utils/
  - [ ] src/types/
  - [ ] src/styles/
- [ ] Criar arquivos principais:
  - [ ] App.tsx
  - [ ] main.tsx
  - [ ] index.css (ou globals.css)

### 3.2. Componentes de UI Base (Diferencial - shadcn/ui)
- [ ] Instalar e configurar shadcn/ui (ou criar componentes base manualmente)
- [ ] Criar componente Button com variantes (primary, secondary, outline)
- [ ] Criar componente Select estilizado para seleções
- [ ] Criar componente Input estilizado para campo numérico
- [ ] Criar componente Card para containers
- [ ] Criar componente Loader para indicadores de carregamento
- [ ] Criar componente ProgressBar para barra de progresso
- [ ] Criar componente Modal para diálogos (se necessário)
- [ ] Testar componentes base isoladamente

### 3.3. Componentes Específicos do Quiz
- [ ] Criar componente QuestionCard para exibir perguntas
- [ ] Criar componente AnswerOption para opções de resposta
- [ ] Criar componente ScoreDisplay para exibir pontuação
- [ ] Criar componente ConfigForm com campos do formulário
- [ ] Criar componente ProgressBar para indicar progresso

### 3.4. Componentes de Layout
- [ ] Criar componente PageContainer para wrapper das páginas
- [ ] Criar componente Header com título da aplicação
- [ ] Criar componente TransitionWrapper para animações (opcional - diferencial)
- [ ] Criar componente Footer padrão (se necessário)

## 4. Definição de Tipos TypeScript

### 4.1. Tipos de Dados do Quiz
- [ ] Criar interface QuizConfig:
  - [ ] numberOfQuestions: number
  - [ ] categoryId?: number
  - [ ] difficulty?: 'easy' | 'medium' | 'hard'
  - [ ] type?: 'multiple' | 'boolean'
- [ ] Criar interface Question:
  - [ ] category: string
  - [ ] type: string
  - [ ] difficulty: string
  - [ ] question: string
  - [ ] correct_answer: string
  - [ ] incorrect_answers: string[]
  - [ ] answers: string[] (combinando correta e incorretas)
- [ ] Criar interface Answer:
  - [ ] questionId: string
  - [ ] selectedAnswer: string
  - [ ] isCorrect: boolean
- [ ] Criar interface QuizState:
  - [ ] config: QuizConfig
  - [ ] questions: Question[]
  - [ ] currentQuestionIndex: number
  - [ ] userAnswers: Answer[]
  - [ ] isLoading: boolean
  - [ ] error: string | null
  - [ ] quizStarted: boolean
  - [ ] quizCompleted: boolean

### 4.2. Tipos de API e Serviços
- [ ] Criar interface para resposta da API de categorias
- [ ] Criar interface para resposta da API de perguntas
- [ ] Definir tipos para parâmetros da API
- [ ] Criar tipos para erros de API

## 5. Integração com API do Open Trivia DB

### 5.1. Serviço de Integração
- [ ] Criar arquivo triviaApi.ts em services/
- [ ] Criar função para buscar categorias: getCategories()
- [ ] Criar função para buscar perguntas com parâmetros: getQuestions(quizConfig)
- [ ] Implementar configuração do Axios com interceptors (se necessário)
- [ ] Implementar tratamento de erros nas requisições
- [ ] Testar requisições com ferramentas como Postman

### 5.2. Formatação de Dados
- [ ] Criar função para misturar respostas correta e incorreta
- [ ] Criar função para decodificar HTML entities nas perguntas
- [ ] Criar função para validar e formatar parâmetros da API
- [ ] Implementar cache de categorias (opcional)

## 6. Gerenciamento de Estado e Contexto

### 6.1. Criação do Contexto de Quiz
- [ ] Criar QuizContext com QuizState
- [ ] Criar QuizProvider com useReducer para gerenciamento de estado
- [ ] Definir actions para o reducer:
  - [ ] SET_CONFIG
  - [ ] SET_QUESTIONS
  - [ ] SET_LOADING
  - [ ] SET_ERROR
  - [ ] SET_CURRENT_QUESTION
  - [ ] ADD_USER_ANSWER
  - [ ] RESET_QUIZ
  - [ ] START_QUIZ
  - [ ] COMPLETE_QUIZ
- [ ] Criar custom hook useQuiz para consumir o contexto

### 6.2. Implementação do Reducer
- [ ] Implementar lógica para cada action do reducer
- [ ] Implementar tratamento de estado inicial
- [ ] Implementar validações de estado
- [ ] Testar transições de estado

## 7. Página de Configuração do Quiz

### 7.1. Componente de Formulário
- [ ] Criar componente ConfigForm com campos:
  - [ ] Input numérico para número de perguntas (1-50)
  - [ ] Select para seleção de categoria (com lista dinâmica)
  - [ ] Select para seleção de dificuldade
  - [ ] Select para seleção de tipo de questão
- [ ] Implementar validação de campos obrigatórios
- [ ] Implementar botão "Iniciar Quiz" desabilitado até preencher campos
- [ ] Implementar efeito visual para campos obrigatórios

### 7.2. Lógica de Configuração
- [ ] Carregar categorias da API ao montar o componente
- [ ] Armazenar configuração do quiz no contexto
- [ ] Implementar chamada à API para buscar perguntas
- [ ] Navegar para tela do quiz após sucesso
- [ ] Mostrar mensagens de erro em caso de falha

### 7.3. Integração com API
- [ ] Implementar loading durante busca de categorias
- [ ] Implementar tratamento de erros para busca de categorias
- [ ] Implementar loading durante busca de perguntas
- [ ] Implementar tratamento de erros para busca de perguntas
- [ ] Validar quantidade de perguntas permitida pela API

## 8. Página do Quiz

### 8.1. Exibição de Perguntas
- [ ] Criar componente para exibir uma pergunta por vez
- [ ] Exibir contador de progresso ("Questão X de Y")
- [ ] Implementar ProgressBar visual
- [ ] Exibir categoria e dificuldade da pergunta (opcional)
- [ ] Decodificar HTML entities nas perguntas e respostas

### 8.2. Interação com Respostas
- [ ] Permitir seleção de apenas uma resposta por pergunta
- [ ] Implementar feedback visual temporário na seleção
- [ ] Implementar botão para avançar para próxima pergunta
- [ ] Desabilitar botão de avanço até selecionar uma resposta
- [ ] Armazenar resposta do usuário no contexto

### 8.3. Feedback Visual (Diferencial)
- [ ] Destacar resposta selecionada em destaque
- [ ] Destacar resposta correta em verde após seleção
- [ ] Destacar resposta incorreta do usuário em vermelho
- [ ] Mostrar ícones de verificação (✓/✗) nas opções
- [ ] Implementar animações suaves para feedback

### 8.4. Navegação entre Perguntas
- [ ] Bloquear navegação após responder
- [ ] Avançar automaticamente após tempo (opcional)
- [ ] Permitir navegação para próxima pergunta
- [ ] Finalizar quiz após última pergunta
- [ ] Atualizar estado de contexto ao navegar

## 9. Página de Resultados

### 9.1. Cálculo e Exibição de Pontuação
- [ ] Calcular pontuação final (número de acertos)
- [ ] Calcular porcentagem de acertos
- [ ] Criar componente ScoreDisplay para exibir resultados
- [ ] Exibir mensagem personalizada baseada na pontuação
- [ ] Mostrar resumo das perguntas respondidas (opcional)

### 9.2. Funcionalidade de Repetição
- [ ] Criar botão "Jogar Novamente"
- [ ] Implementar reset de estado do quiz ao clicar
- [ ] Navegar de volta para tela de configuração
- [ ] Limpar todas as respostas do usuário
- [ ] Resetar configurações do quiz

## 10. Rotas e Navegação

### 10.1. Configuração de Rotas
- [ ] Instalar e configurar react-router-dom
- [ ] Criar roteamento para as 3 páginas:
  - [ ] / (Configuração do Quiz)
  - [ ] /quiz (Tela do Quiz)
  - [ ] /results (Tela de Resultados)
- [ ] Implementar navegação programática entre telas
- [ ] Implementar proteção de rotas (se necessário)

### 10.2. Gerenciamento de Navegação
- [ ] Prevenir navegação indesejada com guards
- [ ] Implementar confirmação de saída durante o quiz (opcional)
- [ ] Implementar histórico de navegação apropriado
- [ ] Garantir navegação adequada no botão de voltar do navegador

## 11. Hooks Customizados

### 11.1. Hook useQuiz
- [ ] Criar hook customizado para consumir QuizContext
- [ ] Implementar validação de uso dentro do provider
- [ ] Adicionar métodos auxiliares para manipulação do estado
- [ ] Testar hook em diferentes componentes

### 11.2. Hook useApi
- [ ] Criar hook customizado para chamadas à API
- [ ] Implementar loading, data, error patterns
- [ ] Implementar cache para requisições repetidas
- [ ] Adicionar tratamento de erros centralizado

## 12. Validação de Formulários

### 12.1. Validação com Bibliotecas (opcional)
- [ ] Instalar biblioteca de validação (ex: zod, react-hook-form)
- [ ] Criar schemas de validação para formulários
- [ ] Implementar validação em tempo real
- [ ] Implementar feedback visual de validação

### 12.2. Validação Manual
- [ ] Implementar validação de campos obrigatórios
- [ ] Implementar validação de número de perguntas (mínimo 1, máximo 50)
- [ ] Implementar validação de campos preenchidos antes de prosseguir
- [ ] Mostrar mensagens de erro para campos inválidos

## 13. Responsividade e Design Adaptativo (Diferencial)

### 13.1. Layout Responsivo
- [ ] Implementar breakpoints para mobile (320px, 480px, 768px)
- [ ] Implementar layout responsivo para todas as telas
- [ ] Ajustar tamanhos de fonte e espaçamentos para mobile
- [ ] Testar em diferentes tamanhos de tela
- [ ] Garantir acessibilidade em todos os dispositivos

### 13.2. Design Mobile-First
- [ ] Criar layout mobile primeiro
- [ ] Adaptar para tablets e desktops
- [ ] Ajustar tamanhos de botões para toque em mobile
- [ ] Implementar espaçamentos apropriados para diferentes telas

## 14. Animações e Transições (Diferencial)

### 14.1. Animações entre Telas
- [ ] Instalar biblioteca de animações (ex: framer-motion)
- [ ] Implementar transições suaves entre páginas
- [ ] Adicionar animações de entrada e saída
- [ ] Implementar animações de feedback para interações

### 14.2. Animações de Feedback
- [ ] Adicionar animações para seleção de resposta
- [ ] Implementar animações para feedback de acerto/erro
- [ ] Adicionar animações para progresso do quiz
- [ ] Criar efeitos visuais para resultados

## 15. Testes e Verificação

### 15.1. Testes Manuais
- [ ] Testar fluxo completo do quiz
- [ ] Testar validações de formulário
- [ ] Testar navegação entre telas
- [ ] Testar diferentes configurações de quiz
- [ ] Testar feedback visual e respostas
- [ ] Testar funcionalidade de "Jogar Novamente"

### 15.2. Testes de Responsividade
- [ ] Testar em dispositivos móveis físicos
- [ ] Testar em diferentes tamanhos de tela com DevTools
- [ ] Verificar alinhamentos e quebras de layout
- [ ] Testar usabilidade em telas menores
- [ ] Validar tamanho de elementos para toque

### 15.3. Testes de Navegadores
- [ ] Testar em Chrome (última versão)
- [ ] Testar em Firefox (última versão)
- [ ] Testar em Safari (última versão)
- [ ] Testar em Edge (última versão)
- [ ] Verificar funcionalidades em navegadores antigos (se necessário)

## 16. Qualidade de Código e Boas Práticas

### 16.1. Padrões de Código
- [ ] Seguir convenções de nomenclatura (PascalCase para componentes)
- [ ] Utilizar type hints consistentemente
- [ ] Manter componentes com responsabilidade única
- [ ] Utilizar nomes de variáveis e funções descritivos
- [ ] Manter imports organizados e consistentes

### 16.2. Commits Padronizados
- [ ] Adotar padrão Conventional Commits (feat:, fix:, docs:, etc.)
- [ ] Escrever mensagens de commit descritivas e significativas
- [ ] Manter commits granulares e bem organizados
- [ ] Utilizar escopo nos commits quando apropriado
- [ ] Seguir boas práticas de versionamento de código

### 16.3. Componentização
- [ ] Manter componentes reutilizáveis e independentes
- [ ] Utilizar props de forma apropriada
- [ ] Evitar componentes muito grandes (max 200 linhas)
- [ ] Utilizar composição quando apropriado
- [ ] Separar componentes de UI dos componentes de layout

## 17. Documentação

### 17.1. Documentação do Código
- [ ] Adicionar JSDoc para funções e componentes principais
- [ ] Comentar lógica complexa com explicações claras
- [ ] Documentar propriedades dos componentes
- [ ] Documentar fluxo de dados entre componentes
- [ ] Adicionar comentários explicativos para decisões arquiteturais

### 17.2. Documentação do Projeto (README.md)
- [ ] Criar seção de descrição do projeto
- [ ] Adicionar tecnologias utilizadas
- [ ] Incluir instruções de instalação e configuração
- [ ] Documentar como rodar o projeto localmente
- [ ] Incluir instruções para executar testes
- [ ] Adicionar informações sobre os diferenciais implementados
- [ ] Incluir link para o protótipo no Figma (se criado)
- [ ] Incluir capturas de tela da aplicação (opcional)

### 17.3. Estrutura de Pastas
- [ ] Documentar organização de pastas e arquivos
- [ ] Explicar propósito de cada diretório
- [ ] Documentar padrões de nomenclatura adotados
- [ ] Incluir informações sobre componentização

## 18. Otimizações de Performance

### 18.1. Otimizações de Renderização
- [ ] Utilizar React.memo para componentes que não mudam frequentemente
- [ ] Utilizar useCallback para funções passadas como props
- [ ] Utilizar useMemo para cálculos pesados
- [ ] Evitar criação de objetos e arrays em cada renderização
- [ ] Implementar lazy loading de componentes (se necessário)

### 18.2. Otimizações de API
- [ ] Implementar cache de requisições para categorias
- [ ] Minimizar requisições desnecessárias
- [ ] Implementar tratamento adequado de erros de rede
- [ ] Adicionar loading states apropriados
- [ ] Implementar retry para requisições falhas (opcional)

## 19. Preparação para Entrega

### 19.1. Testes Finais
- [ ] Executar checklist de funcionalidades
- [ ] Realizar testes de ponta a ponta
- [ ] Verificar responsividade em todos os tamanhos de tela
- [ ] Validar acessibilidade mínima
- [ ] Testar em diferentes navegadores

### 19.2. Build de Produção
- [ ] Criar build de produção com `npm run build`
- [ ] Verificar tamanho do bundle
- [ ] Validar que build é gerado sem erros
- [ ] Testar build localmente com servidor estático

### 19.3. Validação Final
- [ ] Verificar implementação de todos os requisitos obrigatórios
- [ ] Verificar implementação dos diferenciais (se aplicável)
- [ ] Confirmar commits estão padronizados
- [ ] Confirmar documentação está completa
- [ ] Validação geral da experiência do usuário
- [ ] Preparação do email de entrega com link do repositório
