import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface QuizConfig {
  numberOfQuestions: number;
  categoryId?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: 'multiple' | 'boolean';
}

interface Category {
  id: number;
  name: string;
}

interface ConfigFormProps {
  config: QuizConfig;
  categories: Category[];
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

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    // Limit between 1 and 50 questions
    const clampedValue = Math.min(Math.max(value, 1), 50);
    onConfigChange({ ...config, numberOfQuestions: clampedValue });
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

  const isFormValid = numberOfQuestions > 0;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Configure Your Quiz</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="number-of-questions">Number of Questions</Label>
          <Input
            id="number-of-questions"
            type="number"
            min="1"
            max="50"
            value={numberOfQuestions}
            onChange={handleNumberChange}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={categoryId?.toString() || 'any'} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Category</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
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