import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quizConfigSchema } from '@/validation';
import type { QuizConfig } from '@/types/quiz';

export const useQuizForm = (defaultValues?: QuizConfig) => {
  const form = useForm({
    resolver: zodResolver(quizConfigSchema),
    defaultValues: defaultValues || {
      numberOfQuestions: 10,
      categoryId: undefined,
      difficulty: undefined,
      type: undefined,
    },
    mode: 'onChange', // Trigger validation on change
  });

  return form;
};