import { useState, useCallback, useEffect } from 'react';
import { useQuiz } from '@/context';
import { decodeHtmlEntities } from '@/services';
import type { Answer } from '@/types/quiz';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { ADD_USER_ANSWER, COMPLETE_QUIZ, SET_CURRENT_QUESTION } from '@/context/QuizContext';

import { useQuizNavigationGuard } from '@/hooks/useQuizNavigationGuard';

const QUIZ_TIME = 30;

const QuizPage = () => {
  const { state, dispatch } = useQuiz();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(QUIZ_TIME);
  
  // Add navigation guard to prevent leaving during quiz
  useQuizNavigationGuard();

  // Get current question
  const currentQuestion = state.questions[state.currentQuestionIndex];
  
  // Calculate progress
  const progress = state.currentQuestionIndex + 1;
  const total = state.questions.length;

  // Handle answer selection
  const handleAnswerSelect = useCallback((answer: string) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
    }
  }, [isAnswered]);

  // Confirm answer and move to next question
  const handleConfirmAnswer = useCallback(() => {
    if (!selectedAnswer || isAnswered) return;

    setIsAnswered(true);

    // Determine if the answer is correct
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    
    // Create answer object to store in context
    const answer: Answer = {
      questionId: currentQuestion.id || `question-${state.currentQuestionIndex}`,
      selectedAnswer,
      isCorrect
    };

    // Dispatch action to add user answer to context
    dispatch({ type: ADD_USER_ANSWER, payload: answer });

    // Move to next question after a delay to show feedback
    setTimeout(() => {
      // If it's the last question, complete the quiz
      if (state.currentQuestionIndex === state.questions.length - 1) {
        dispatch({ type: COMPLETE_QUIZ });
      } else {
        // Move to next question
        dispatch({ 
          type: SET_CURRENT_QUESTION, 
          payload: state.currentQuestionIndex + 1 
        });
        
        // Reset state for next question
        setSelectedAnswer(null);
        setIsAnswered(false);
        setTimer(QUIZ_TIME);
      }
    }, 1500); // Show feedback for 1.5 seconds
  }, [selectedAnswer, isAnswered, currentQuestion, dispatch, state.currentQuestionIndex, state.questions.length]);

  useEffect(() => {
    if (isAnswered) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          handleConfirmAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAnswered, handleConfirmAnswer]);

  

  // If no questions are loaded, show loading or redirect
  if (state.questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading questions...</div>
      </div>
    );
  }

  // If current question doesn't exist, show error or redirect
  if (!currentQuestion) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Error: Question not found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 transition-all duration-300 ease-in-out">
      <h1 className="text-2xl font-bold text-center mb-6 transition-all duration-300 ease-in-out">Quiz Time!</h1>
      
      <div className="flex justify-center items-center mb-4">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {timer}s
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6 transition-all duration-300 ease-in-out">
        <ProgressBar current={progress} total={total} />
      </div>
      
      {/* Question card with feedback */}
      <div className="transition-all duration-300 ease-in-out transform">
        <QuestionCard
          question={{
            ...currentQuestion,
            text: decodeHtmlEntities(currentQuestion.question),
            options: currentQuestion.options?.map(opt => decodeHtmlEntities(opt)) || []
          }}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          onConfirm={handleConfirmAnswer}
          isAnswered={isAnswered}
          correctAnswer={currentQuestion.correct_answer}
        />
      </div>
    </div>
  );
};

export default QuizPage;