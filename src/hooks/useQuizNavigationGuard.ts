import { useEffect } from 'react';
import { useQuiz } from '@/context';

export const useQuizNavigationGuard = () => {
  const { state } = useQuiz();

  // Prevent user from leaving the quiz page during an active quiz
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (state.quizStarted && !state.quizCompleted && state.currentQuestionIndex < state.questions.length) {
        event.preventDefault();
        event.returnValue = 'Are you sure you want to leave the quiz? Your progress will be lost.';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [state.quizStarted, state.quizCompleted, state.currentQuestionIndex, state.questions.length]);
};