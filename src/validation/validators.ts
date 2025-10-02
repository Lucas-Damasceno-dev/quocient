import { quizConfigSchema } from '@/validation';
import { z } from 'zod';

/**
 * Validates the quiz configuration
 * @param config The quiz configuration to validate
 * @returns An object with isValid boolean and errors array
 */
export const validateQuizConfig = (config: any) => {
  const result = quizConfigSchema.safeParse(config);
  if (result.success) {
    return { isValid: true, errors: [] };
  } else {
    const errors = result.error.flatten();
    const errorMessages = Object.values(errors.fieldErrors)
      .flat()
      .filter(Boolean) as string[];
    return { 
      isValid: false, 
      errors: errorMessages
    };
  }
};

/**
 * Validates a single field in the quiz configuration
 * @param field The field name to validate
 * @param value The value to validate
 * @returns An object with isValid boolean and error message
 */
export const validateQuizConfigField = (field: keyof z.infer<typeof quizConfigSchema>, value: any) => {
  try {
    // Create a partial schema for the specific field
    const fieldSchema = quizConfigSchema.shape[field];
    fieldSchema.parse(value);
    return { isValid: true, error: null };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.issues[0]?.message || 'Invalid value' };
    }
    return { isValid: false, error: 'Invalid value' };
  }
};