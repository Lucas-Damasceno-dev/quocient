import { useMemo } from 'react';
import { useQuiz } from '@/context';
import { ScoreDisplay } from './ScoreDisplay';
import { RESET_QUIZ } from '@/context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const ResultsPage = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();

  const finalScore = useMemo(() => {
    if (state.userAnswers.length === 0) return 0;
    
    const correctAnswers = state.userAnswers.filter(answer => answer.isCorrect).length;
    return correctAnswers;
  }, [state.userAnswers]);
  const totalQuestions = state.questions.length;
  const percentage = totalQuestions > 0 ? Math.round((finalScore / totalQuestions) * 100) : 0;

  // Handle play again functionality
  const handlePlayAgain = () => {
    // Dispatch action to reset the quiz state
    dispatch({ type: RESET_QUIZ });
    // Navigate back to the configuration page
    navigate('/');
  };

  

  return (
    <motion.div
      className="container mx-auto py-8 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">Quiz Results</h1>
      
      <motion.div className="flex justify-center mb-6" variants={itemVariants}>
        <div className="text-center bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <motion.div
            className="text-4xl sm:text-5xl font-bold text-primary mb-2"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {finalScore}<span className="text-muted-foreground text-xl sm:text-2xl">/{totalQuestions}</span>
          </motion.div>
          <motion.div
            className="text-xl sm:text-2xl font-semibold"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {percentage}%
          </motion.div>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            You answered {finalScore} out of {totalQuestions} questions correctly.
          </p>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ScoreDisplay 
          score={finalScore} 
          total={totalQuestions} 
          onRestart={handlePlayAgain} 
        />
      </motion.div>
      
      {/* Optional: Show summary of answered questions */}
      <motion.div className="mt-8 max-w-2xl mx-auto" variants={containerVariants}>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Question Summary</h2>
        <div className="space-y-4">
          {state.questions.map((question, index) => {
            const userAnswer = state.userAnswers.find(
              answer => answer.questionId === (question.id || `question-${index}`)
            );
            
            return (
              <motion.div 
                key={question.id || `question-${index}`} 
                className={`p-3 sm:p-4 rounded-lg border ${
                  userAnswer?.isCorrect 
                    ? 'bg-green-50 border-green-200' 
                    : userAnswer 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-gray-50 border-gray-200'
                }`}
                variants={itemVariants}
              >
                <div className="font-medium text-sm sm:text-base">Question {index + 1}: {question.question}</div>
                <div className="mt-2">
                  <div className="text-xs sm:text-sm">
                    <span className="font-semibold">Your answer:</span> {userAnswer?.selectedAnswer || 'Not answered'}
                    {!userAnswer?.isCorrect && userAnswer && (
                      <span className="block mt-1 text-green-600">
                        <span className="font-semibold">Correct answer:</span> {question.correct_answer}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsPage;