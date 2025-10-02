import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { QuizState, QuizConfig, Question, Answer } from '@/types/quiz';

// Define action types
export const SET_CONFIG = 'SET_CONFIG';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER';
export const RESET_QUIZ = 'RESET_QUIZ';
export const START_QUIZ = 'START_QUIZ';
export const COMPLETE_QUIZ = 'COMPLETE_QUIZ';

// Define action interfaces
interface SetConfigAction {
  type: typeof SET_CONFIG;
  payload: QuizConfig;
}

interface SetQuestionsAction {
  type: typeof SET_QUESTIONS;
  payload: Question[];
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string | null;
}

interface SetCurrentQuestionAction {
  type: typeof SET_CURRENT_QUESTION;
  payload: number;
}

interface AddUserAnswerAction {
  type: typeof ADD_USER_ANSWER;
  payload: Answer;
}

interface ResetQuizAction {
  type: typeof RESET_QUIZ;
}

interface StartQuizAction {
  type: typeof START_QUIZ;
}

interface CompleteQuizAction {
  type: typeof COMPLETE_QUIZ;
}

// Union type for all actions
type QuizAction = 
  | SetConfigAction
  | SetQuestionsAction
  | SetLoadingAction
  | SetErrorAction
  | SetCurrentQuestionAction
  | AddUserAnswerAction
  | ResetQuizAction
  | StartQuizAction
  | CompleteQuizAction;

// Initial state
const initialState: QuizState = {
  config: {
    numberOfQuestions: 10,
    difficulty: undefined,
    type: undefined,
    categoryId: undefined,
  },
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  isLoading: false,
  error: null,
  quizStarted: false,
  quizCompleted: false,
};

// Reducer function
const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case SET_CONFIG:
      return {
        ...state,
        config: action.payload,
      };
    
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        currentQuestionIndex: 0,
        userAnswers: [],
        quizCompleted: false,
      };
    
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: action.payload,
      };
    
    case ADD_USER_ANSWER:
      // Check if answer already exists and update it, otherwise add new
      const existingAnswerIndex = state.userAnswers.findIndex(
        ans => ans.questionId === action.payload.questionId
      );
      
      let updatedAnswers: Answer[];
      if (existingAnswerIndex !== -1) {
        updatedAnswers = [...state.userAnswers];
        updatedAnswers[existingAnswerIndex] = action.payload;
      } else {
        updatedAnswers = [...state.userAnswers, action.payload];
      }
      
      return {
        ...state,
        userAnswers: updatedAnswers,
      };
    
    case START_QUIZ:
      return {
        ...state,
        quizStarted: true,
        quizCompleted: false,
        error: null,
      };
    
    case COMPLETE_QUIZ:
      return {
        ...state,
        quizCompleted: true,
        quizStarted: false,
      };
    
    case RESET_QUIZ:
      return {
        ...initialState,
        config: state.config, // Preserve the configuration when resetting
      };
    
    default:
      return state;
  }
};

// Create context
interface QuizContextType {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
  // Helper methods
  setConfig: (config: QuizConfig) => void;
  setQuestions: (questions: Question[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentQuestion: (index: number) => void;
  addUserAnswer: (answer: Answer) => void;
  resetQuiz: () => void;
  startQuiz: () => void;
  completeQuiz: () => void;
  // Additional helper methods
  getCurrentQuestion: () => Question | undefined;
  getScore: () => number;
  getProgress: () => number;
  getAllAnswers: () => Answer[];
  isQuizCompleted: () => boolean;
  isQuizStarted: () => boolean;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Provider component
interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider = ({ children }: QuizProviderProps) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Helper methods
  const setConfig = (config: QuizConfig) => {
    dispatch({ type: SET_CONFIG, payload: config });
  };

  const setQuestions = (questions: Question[]) => {
    dispatch({ type: SET_QUESTIONS, payload: questions });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: SET_LOADING, payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: SET_ERROR, payload: error });
  };

  const setCurrentQuestion = (index: number) => {
    dispatch({ type: SET_CURRENT_QUESTION, payload: index });
  };

  const addUserAnswer = (answer: Answer) => {
    dispatch({ type: ADD_USER_ANSWER, payload: answer });
  };

  const resetQuiz = () => {
    dispatch({ type: RESET_QUIZ });
  };

  const startQuiz = () => {
    dispatch({ type: START_QUIZ });
  };

  const completeQuiz = () => {
    dispatch({ type: COMPLETE_QUIZ });
  };

  const getCurrentQuestion = (): Question | undefined => {
    return state.questions[state.currentQuestionIndex];
  };

  const getScore = (): number => {
    return state.userAnswers.filter(answer => answer.isCorrect).length;
  };

  const getProgress = (): number => {
    return state.currentQuestionIndex + 1;
  };

  const getAllAnswers = (): Answer[] => {
    return state.userAnswers;
  };

  const isQuizCompleted = (): boolean => {
    return state.quizCompleted;
  };

  const isQuizStarted = (): boolean => {
    return state.quizStarted;
  };

  return (
    <QuizContext.Provider 
      value={{ 
        state, 
        dispatch,
        setConfig,
        setQuestions,
        setLoading,
        setError,
        setCurrentQuestion,
        addUserAnswer,
        resetQuiz,
        startQuiz,
        completeQuiz,
        getCurrentQuestion,
        getScore,
        getProgress,
        getAllAnswers,
        isQuizCompleted,
        isQuizStarted
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook to use the quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};