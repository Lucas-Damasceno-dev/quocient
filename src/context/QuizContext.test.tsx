import { quizReducer } from './quizReducer';
import { SET_CONFIG, SET_QUESTIONS, ADD_USER_ANSWER, COMPLETE_QUIZ, RESET_QUIZ } from './QuizContext';
import type { QuizState, QuizConfig, Question, Answer } from '@/types/quiz';

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

describe('quizReducer', () => {
  it('should handle SET_CONFIG', () => {
    const config: QuizConfig = { numberOfQuestions: 20, difficulty: 'easy' };
    const action = { type: SET_CONFIG, payload: config };
    const newState = quizReducer(initialState, action as any);
    expect(newState.config).toEqual(config);
  });

  it('should handle SET_QUESTIONS', () => {
    const questions: Question[] = [{
      category: 'test',
      question: 'test',
      correct_answer: 'true',
      incorrect_answers: ['false'],
      difficulty: 'easy',
      type: 'boolean',
      answers: ['true', 'false'],
      id: '1',
      options: ['true', 'false'],
      text: 'test'
    }];
    const action = { type: SET_QUESTIONS, payload: questions };
    const newState = quizReducer(initialState, action as any);
    expect(newState.questions).toEqual(questions);
    expect(newState.currentQuestionIndex).toBe(0);
    expect(newState.userAnswers).toEqual([]);
    expect(newState.quizCompleted).toBe(false);
  });

  it('should handle ADD_USER_ANSWER', () => {
    const answer: Answer = { questionId: '1', selectedAnswer: 'true', isCorrect: true };
    const action = { type: ADD_USER_ANSWER, payload: answer };
    const newState = quizReducer(initialState, action as any);
    expect(newState.userAnswers).toEqual([answer]);
  });

  it('should handle COMPLETE_QUIZ', () => {
    const action = { type: COMPLETE_QUIZ };
    const newState = quizReducer(initialState, action as any);
    expect(newState.quizCompleted).toBe(true);
    expect(newState.quizStarted).toBe(false);
  });

  it('should handle RESET_QUIZ', () => {
    const modifiedState: QuizState = { ...initialState, quizCompleted: true };
    const action = { type: RESET_QUIZ };
    const newState = quizReducer(modifiedState, action as any);
    expect(newState).toEqual({ ...initialState, config: modifiedState.config });
  });
});
