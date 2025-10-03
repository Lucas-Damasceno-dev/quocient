import type { QuizState } from '@/types/quiz';
import type { QuizAction } from './QuizContext';
import { SET_CONFIG, SET_QUESTIONS, SET_LOADING, SET_ERROR, SET_CURRENT_QUESTION, ADD_USER_ANSWER, START_QUIZ, COMPLETE_QUIZ, RESET_QUIZ } from './QuizContext';
import type { Answer } from '@/types/quiz';

export const initialState: QuizState = {
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

export const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
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
    
    case ADD_USER_ANSWER: {
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
    }
    
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