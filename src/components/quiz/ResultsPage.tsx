import { useEffect } from 'react';
import { useQuiz } from '@/context';
import { ScoreDisplay } from './ScoreDisplay';
import { RESET_QUIZ } from '@/context/QuizContext';
import { useNavigate } from 'react-router-dom';

const ResultsPage = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();

  // Calculate score and percentage
  const calculateScore = () => {
    if (state.userAnswers.length === 0) return 0;
    
    const correctAnswers = state.userAnswers.filter(answer => answer.isCorrect).length;
    return correctAnswers;
  };

  const finalScore = calculateScore();
  const totalQuestions = state.questions.length;
  const percentage = totalQuestions > 0 ? Math.round((finalScore / totalQuestions) * 100) : 0;

  // Handle play again functionality
  const handlePlayAgain = () => {
    // Dispatch action to reset the quiz state
    dispatch({ type: RESET_QUIZ });
    // Navigate back to the configuration page
    navigate('/');
  };

  // Redirect if quiz is not completed yet
  useEffect(() => {
    if (!state.quizCompleted) {
      navigate('/quiz');
    }
  }, [state.quizCompleted, navigate]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Quiz Results</h1>
      
      <div className="flex justify-center mb-6">
        <div className="text-center bg-white p-6 rounded-lg shadow-md">
          <div className="text-5xl font-bold text-primary mb-2">{finalScore}<span className="text-muted-foreground text-2xl">/{totalQuestions}</span></div>
          <div className="text-2xl font-semibold">{percentage}%</div>
          <p className="mt-2 text-muted-foreground">
            You answered {finalScore} out of {totalQuestions} questions correctly.
          </p>
        </div>
      </div>
      
      <ScoreDisplay 
        score={finalScore} 
        total={totalQuestions} 
        onRestart={handlePlayAgain} 
      />
      
      {/* Optional: Show summary of answered questions */}
      <div className="mt-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Question Summary</h2>
        <div className="space-y-4">
          {state.questions.map((question, index) => {
            const userAnswer = state.userAnswers.find(
              answer => answer.questionId === (question.id || `question-${index}`)
            );
            
            return (
              <div 
                key={question.id || `question-${index}`} 
                className={`p-4 rounded-lg border ${
                  userAnswer?.isCorrect 
                    ? 'bg-green-50 border-green-200' 
                    : userAnswer 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="font-medium">Question {index + 1}: {question.question}</div>
                <div className="mt-2">
                  <div className="text-sm">
                    <span className="font-semibold">Your answer:</span> {userAnswer?.selectedAnswer || 'Not answered'}
                    {!userAnswer?.isCorrect && userAnswer && (
                      <span className="block mt-1 text-green-600">
                        <span className="font-semibold">Correct answer:</span> {question.correct_answer}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;