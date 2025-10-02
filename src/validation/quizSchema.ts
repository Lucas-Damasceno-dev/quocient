import { z } from 'zod';

// Schema for quiz configuration
export const quizConfigSchema = z.object({
  numberOfQuestions: z
    .number()
    .int()
    .min(1, { message: 'Number of questions must be at least 1' })
    .max(50, { message: 'Number of questions must be at most 50' }),
  
  categoryId: z
    .number()
    .optional()
    .nullable(),
  
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .optional()
    .nullable(),
  
  type: z
    .enum(['multiple', 'boolean'])
    .optional()
    .nullable(),
});

// Type inference from the schema
export type QuizConfigSchema = z.infer<typeof quizConfigSchema>;

// For direct API parameters validation
export const quizApiParamsSchema = z.object({
  amount: z
    .number()
    .int()
    .min(1, { message: 'Amount must be at least 1' })
    .max(50, { message: 'Amount must be at most 50' }),
  
  category: z
    .number()
    .optional(),
  
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .optional(),
  
  type: z
    .enum(['multiple', 'boolean'])
    .optional(),
});

export type QuizApiParamsSchema = z.infer<typeof quizApiParamsSchema>;