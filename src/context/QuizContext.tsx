/**
 * @file This file defines the QuizContext, which provides the state and actions for the quiz.
 */

import { useReducer } from 'react';
import type { ReactNode } from 'react';
import type { QuizState, QuizConfig, Question, Answer } from '@/types/quiz';
import { quizReducer, initialState } from './quizReducer';
import { QuizContext } from './quizContext';

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
/** Action to set the quiz configuration. */
interface SetConfigAction {
  type: typeof SET_CONFIG;
  payload: QuizConfig;
}

/** Action to set the questions for the quiz. */
interface SetQuestionsAction {
  type: typeof SET_QUESTIONS;
  payload: Question[];
}

/** Action to set the loading state of the quiz. */
interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

/** Action to set the error state of the quiz. */
interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string | null;
}

/** Action to set the current question index. */
interface SetCurrentQuestionAction {
  type: typeof SET_CURRENT_QUESTION;
  payload: number;
}

/** Action to add a user's answer to the state. */
interface AddUserAnswerAction {
  type: typeof ADD_USER_ANSWER;
  payload: Answer;
}

/** Action to reset the quiz to its initial state. */
interface ResetQuizAction {
  type: typeof RESET_QUIZ;
}

/** Action to start the quiz. */
interface StartQuizAction {
  type: typeof START_QUIZ;
}

/** Action to mark the quiz as completed. */
interface CompleteQuizAction {
  type: typeof COMPLETE_QUIZ;
}

/** A union of all possible quiz actions. */
export type QuizAction = 
  | SetConfigAction
  | SetQuestionsAction
  | SetLoadingAction
  | SetErrorAction
  | SetCurrentQuestionAction
  | AddUserAnswerAction
  | ResetQuizAction
  | StartQuizAction
  | CompleteQuizAction;

/**
 * The type of the quiz context, which includes the state and dispatch function.
 */
export interface QuizContextType {
  /** The current state of the quiz. */
  state: QuizState;
  /** The dispatch function for quiz actions. */
  dispatch: React.Dispatch<QuizAction>;
  /** A function to set the quiz configuration. */
  setConfig: (config: QuizConfig) => void;
  /** A function to set the questions for the quiz. */
  setQuestions: (questions: Question[]) => void;
  /** A function to set the loading state of the quiz. */
  setLoading: (loading: boolean) => void;
  /** A function to set the error state of the quiz. */
  setError: (error: string | null) => void;
  /** A function to set the current question index. */
  setCurrentQuestion: (index: number) => void;
  /** A function to add a user's answer to the state. */
  addUserAnswer: (answer: Answer) => void;
  /** A function to reset the quiz. */
  resetQuiz: () => void;
  /** A function to start the quiz. */
  startQuiz: () => void;
  /** A function to complete the quiz. */
  completeQuiz: () => void;
  /** A function to get the current question. */
  getCurrentQuestion: () => Question | undefined;
  /** A function to get the user's score. */
  getScore: () => number;
  /** A function to get the quiz progress. */
  getProgress: () => number;
  /** A function to get all of the user's answers. */
  getAllAnswers: () => Answer[];
  /** A function to check if the quiz is completed. */
  isQuizCompleted: () => boolean;
  /** A function to check if the quiz has started. */
  isQuizStarted: () => boolean;
}

/**
 * The props for the QuizProvider component.
 */
interface QuizProviderProps {
  /** The children to render within the provider. */
  children: ReactNode;
}

/**
 * The provider component for the quiz context.
 * This component provides the quiz state and actions to all of its children.
 */
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