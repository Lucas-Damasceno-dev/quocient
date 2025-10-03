import { validateQuizConfig, validateQuizConfigField } from './validators';

describe('validateQuizConfig', () => {
  it('should return isValid: true for a valid config', () => {
    const config = { numberOfQuestions: 10, difficulty: 'easy' };
    const result = validateQuizConfig(config as any);
    expect(result.isValid).toBe(true);
  });

  it('should return isValid: false for an invalid config', () => {
    const config = { numberOfQuestions: 0, difficulty: 'invalid' };
    const result = validateQuizConfig(config as any);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

describe('validateQuizConfigField', () => {
  it('should return isValid: true for a valid field value', () => {
    const result = validateQuizConfigField('numberOfQuestions', 10);
    expect(result.isValid).toBe(true);
  });

  it('should return isValid: false for an invalid field value', () => {
    const result = validateQuizConfigField('numberOfQuestions', 0);
    expect(result.isValid).toBe(false);
    expect(result.error).not.toBeNull();
  });
});
