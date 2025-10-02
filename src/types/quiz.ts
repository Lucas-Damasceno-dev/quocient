// Quiz Configuration
export interface QuizConfig {
  numberOfQuestions: number;
  categoryId?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: 'multiple' | 'boolean';
}

// Quiz Question
export interface Question {
  id?: string; // For components that need an id
  category: string;
  type: string;
  difficulty: string;
  question: string; // Original question text
  text?: string; // Alias for question to maintain compatibility
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[]; // combining correct and incorrect answers
  options?: string[]; // Alias for answers to maintain compatibility
}

// User Answer
export interface Answer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
}

// Quiz State
export interface QuizState {
  config: QuizConfig;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Answer[];
  isLoading: boolean;
  error: string | null;
  quizStarted: boolean;
  quizCompleted: boolean;
}

// API Response Types
export interface CategoryApiResponse {
  response_code: number;
  categories: {
    id: number;
    name: string;
  }[];
}

export interface QuestionApiResponse {
  response_code: number;
  results: {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
}

// API Parameter Types
export interface QuizApiParams {
  amount: number;
  category?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: 'multiple' | 'boolean';
}

// API Error Types
export interface ApiError {
  response_code: number;
  message?: string;
}