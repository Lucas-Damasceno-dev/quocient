import { Card, CardContent } from '@/components/ui/card';
import { AnswerOption } from './AnswerOption';
import { Button } from '@/components/ui/button';

interface Question {
  id?: string;
  text: string; // alias for question
  options: string[]; // combined answers
  category: string;
  difficulty: string;
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  onConfirm: () => void;
  isAnswered: boolean;
  correctAnswer?: string;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  onConfirm,
  isAnswered,
  correctAnswer
}: QuestionCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto transition-all duration-300 ease-in-out sm:p-4">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-4 transition-all duration-300 ease-in-out">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Category: {question.category}</h3>
          <h2 className="text-lg sm:text-xl font-bold mb-4 transition-all duration-300 ease-in-out">{question.text}</h2>
        </div>
        
        <div className="space-y-3 mb-6 transition-all duration-300 ease-in-out">
          {question.options.map((option, index) => (
            <div 
              key={index} 
              className={`transition-all duration-300 ease-in-out ${isAnswered ? 'opacity-100' : 'opacity-100'}`}
            >
              <AnswerOption
                text={option}
                isSelected={selectedAnswer === option}
                isCorrect={isAnswered && option === correctAnswer}
                isIncorrect={isAnswered && option === selectedAnswer && option !== correctAnswer}
                onSelect={() => onAnswerSelect(option)}
                disabled={isAnswered}
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center transition-all duration-300 ease-in-out">
          <Button 
            onClick={onConfirm}
            disabled={!selectedAnswer || isAnswered}
            className="px-6 py-3 sm:px-8 sm:py-3 text-base sm:text-lg transition-all duration-200 ease-in-out hover:scale-105"
          >
            Confirm Answer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}