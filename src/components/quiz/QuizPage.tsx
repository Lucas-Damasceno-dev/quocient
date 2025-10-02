import { useState, useEffect } from 'react';
import { useQuiz } from '@/context';
import { decodeHtmlEntities } from '@/services';
import type { Answer } from '@/types/quiz';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { ADD_USER_ANSWER, COMPLETE_QUIZ, SET_CURRENT_QUESTION } from '@/context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { useQuizNavigationGuard } from '@/hooks/useQuizNavigationGuard';

const QuizPage = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Add navigation guard to prevent leaving during quiz
  useQuizNavigationGuard();

  // Get current question
  const currentQuestion = state.questions[state.currentQuestionIndex];
  
  // Calculate progress
  const progress = state.currentQuestionIndex + 1;
  const total = state.questions.length;

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
    }
  };

  // Confirm answer and move to next question
  const handleConfirmAnswer = () => {
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
        navigate('/results'); // Navigate to results page after completing quiz
      } else {
        // Move to next question
        dispatch({ 
          type: SET_CURRENT_QUESTION, 
          payload: state.currentQuestionIndex + 1 
        });
        
        // Reset state for next question
        setSelectedAnswer(null);
        setIsAnswered(false);
      }
    }, 1500); // Show feedback for 1.5 seconds
  };

  // If quiz is not started or completed, redirect to config
  if (!state.quizStarted || state.quizCompleted) {
    useEffect(() => {
      if (!state.quizStarted) {
        navigate('/');
      }
    }, [state.quizStarted, navigate]);
    return null;
  }

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