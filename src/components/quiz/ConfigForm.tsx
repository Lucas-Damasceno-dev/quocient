import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { validateQuizConfigField } from '@/validation/validators';
import type { QuizConfig } from '@/types/quiz';

interface Category {
  id: number;
  name: string;
}

interface ConfigFormProps {
  config: QuizConfig;
  categories?: Category[];
  onConfigChange: (config: QuizConfig) => void;
  onStartQuiz: () => void;
  isLoading: boolean;
}

export function ConfigForm({
  config,
  categories,
  onConfigChange,
  onStartQuiz,
  isLoading
}: ConfigFormProps) {
  const { numberOfQuestions, categoryId, difficulty, type } = config;
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validate fields in real-time
  useEffect(() => {
    const newErrors: Record<string, string> = {};
    
    // Validate number of questions
    const numberValidation = validateQuizConfigField('numberOfQuestions', numberOfQuestions);
    if (!numberValidation.isValid) {
      newErrors.numberOfQuestions = numberValidation.error || '';
    }
    
    setErrors(newErrors);
  }, [numberOfQuestions]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    // Update the configuration
    onConfigChange({ ...config, numberOfQuestions: value });
  };

  const handleCategoryChange = (value: string) => {
    onConfigChange({ 
      ...config, 
      categoryId: value === 'any' ? undefined : parseInt(value) 
    });
  };

  const handleDifficultyChange = (value: string) => {
    onConfigChange({ 
      ...config, 
      difficulty: value === 'any' ? undefined : (value as 'easy' | 'medium' | 'hard') 
    });
  };

  const handleTypeChange = (value: string) => {
    onConfigChange({ 
      ...config, 
      type: value === 'any' ? undefined : (value as 'multiple' | 'boolean') 
    });
  };

  const isFormValid = numberOfQuestions > 0 && !errors.numberOfQuestions;

  return (
    <Card className="w-full max-w-md mx-auto sm:p-6">
      <CardHeader className="text-center px-4 sm:px-6">
        <CardTitle className="text-2xl sm:text-3xl">Configure Your Quiz</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4 sm:p-6">
        <div className="space-y-2">
          <Label htmlFor="number-of-questions" className="flex items-center">
            Number of Questions <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="number-of-questions"
            type="number"
            min="1"
            max="50"
            value={numberOfQuestions}
            onChange={handleNumberChange}
            className={`w-full ${errors.numberOfQuestions ? 'border-red-500' : ''}`}
          />
          {errors.numberOfQuestions && (
            <p className="text-red-500 text-sm">{errors.numberOfQuestions}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="flex items-center">
            Category <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select value={categoryId?.toString() || 'any'} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Category</SelectItem>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-categories" disabled>
                  No categories available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Difficulty</Label>
          <Select value={difficulty || 'any'} onValueChange={handleDifficultyChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Difficulty</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Type</Label>
          <Select value={type || 'any'} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select question type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Type</SelectItem>
              <SelectItem value="multiple">Multiple Choice</SelectItem>
              <SelectItem value="boolean">True/False</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full" 
          onClick={onStartQuiz} 
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? 'Loading Questions...' : 'Start Quiz'}
        </Button>
      </CardContent>
    </Card>
  );
}