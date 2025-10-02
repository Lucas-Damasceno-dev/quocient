import axios from 'axios';
import type { CategoryApiResponse, QuestionApiResponse, QuizConfig, QuizApiParams } from '@/types/quiz';

// Create axios instance with base configuration
const triviaApi = axios.create({
  baseURL: 'https://opentdb.com',
});

// Cache for categories to avoid repeated API calls
let categoriesCache: CategoryApiResponse | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
let cacheTimestamp: number | null = null;

// Interceptor to handle requests
triviaApi.interceptors.request.use(
  (config) => {
    // You can add common headers or authentication here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle responses
triviaApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error cases
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Fetches all available categories from the Open Trivia Database
 * Uses caching to avoid repeated API calls within the cache duration
 * @returns Promise<CategoryApiResponse>
 */
export const getCategories = async (): Promise<CategoryApiResponse> => {
  // Check if we have a valid cache
  if (categoriesCache && cacheTimestamp) {
    const now = Date.now();
    if (now - cacheTimestamp < CACHE_DURATION) {
      // Return cached data if it's still valid
      console.log('Returning cached categories');
      return categoriesCache;
    }
  }

  try {
    console.log('Fetching fresh categories from API');
    const response = await triviaApi.get('/api_category.php');
    
    // Update cache with new data
    categoriesCache = response.data;
    cacheTimestamp = Date.now();
    
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Fetches questions based on the provided quiz configuration
 * @param quizConfig - Configuration for the quiz
 * @returns Promise<QuestionApiResponse>
 */
export const getQuestions = async (quizConfig: QuizConfig): Promise<QuestionApiResponse> => {
  try {
    // Format API parameters from quiz configuration
    const params = formatApiParams(quizConfig);
    
    const response = await triviaApi.get('/api.php', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

/**
 * Function to shuffle correct and incorrect answers
 * @param correctAnswer - The correct answer
 * @param incorrectAnswers - Array of incorrect answers
 * @returns Shuffled array of answers
 */
export const shuffleAnswers = (correctAnswer: string, incorrectAnswers: string[]): string[] => {
  // Combine correct and incorrect answers
  const allAnswers = [...incorrectAnswers, correctAnswer];
  
  // Shuffle using Fisher-Yates algorithm
  for (let i = allAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
  }
  
  return allAnswers;
};

/**
 * Function to decode HTML entities in questions
 * @param text - Text that may contain HTML entities
 * @returns Decoded text
 */
export const decodeHtmlEntities = (text: string): string => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

/**
 * Function to validate and format API parameters
 * @param config - Quiz configuration
 * @returns Formatted API parameters
 */
export const formatApiParams = (config: QuizConfig): QuizApiParams => {
  const params: QuizApiParams = {
    amount: config.numberOfQuestions,
  };

  if (config.categoryId) {
    params.category = config.categoryId;
  }

  if (config.difficulty) {
    params.difficulty = config.difficulty;
  }

  if (config.type) {
    params.type = config.type;
  }

  return params;
};

export default triviaApi;