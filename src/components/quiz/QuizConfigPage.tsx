import { useState, useEffect } from 'react';
import { useQuiz } from '@/context';
import { getCategories, getQuestions, shuffleAnswers } from '@/services';
import type { QuizConfig } from '@/types/quiz';
import { ConfigForm } from './ConfigForm';
import { SET_CONFIG, SET_QUESTIONS, SET_LOADING, SET_ERROR, START_QUIZ } from '@/context/QuizContext';
import { useNavigate } from 'react-router-dom';

const QuizConfigPage = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        setError(null);
        const response = await getCategories();
        setCategories(response.categories);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleConfigChange = (config: QuizConfig) => {
    dispatch({ type: SET_CONFIG, payload: config });
  };

  const handleStartQuiz = async () => {
    try {
      setIsLoadingQuestions(true);
      setError(null);
      
      // Dispatch start quiz action
      dispatch({ type: START_QUIZ });
      dispatch({ type: SET_LOADING, payload: true });
      
      // Fetch questions based on configuration
      const response = await getQuestions(state.config);
      
      // Process questions and add shuffled answers
      const processedQuestions = response.results.map((question, index) => ({
        ...question,
        id: `question-${index}`, // Add an ID for tracking
        text: question.question, // Add alias for compatibility
        options: shuffleAnswers(question.correct_answer, question.incorrect_answers), // Shuffle answers
        answers: [question.correct_answer, ...question.incorrect_answers]
      }));
      
      // Set questions in the state
      dispatch({ type: SET_QUESTIONS, payload: processedQuestions });
      dispatch({ type: SET_LOADING, payload: false });
      
      // Navigate to the quiz page after successful loading
      navigate('/quiz');
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to load questions. Please try again.');
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: SET_ERROR, payload: 'Failed to load questions' });
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Show loading state for categories
  if (isLoadingCategories) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Quiz Configuration</h1>
      
      {error && (
        <div className="max-w-md mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <ConfigForm
        config={state.config}
        categories={categories}
        onConfigChange={handleConfigChange}
        onStartQuiz={handleStartQuiz}
        isLoading={isLoadingQuestions}
      />
    </div>
  );
};

export default QuizConfigPage;