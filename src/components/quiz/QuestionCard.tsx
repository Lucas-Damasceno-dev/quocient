import { Card, CardContent } from '@/components/ui/card';
import { AnswerOption } from './AnswerOption';
import { Button } from '@/components/ui/button';

interface Question {
  id: string;
  text: string;
  options: string[];
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
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Category: {question.category}</h3>
          <h2 className="text-xl font-bold mb-4">{question.text}</h2>
        </div>
        
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <AnswerOption
              key={index}
              text={option}
              isSelected={selectedAnswer === option}
              isCorrect={isAnswered && option === correctAnswer}
              isIncorrect={isAnswered && option === selectedAnswer && option !== correctAnswer}
              onSelect={() => onAnswerSelect(option)}
              disabled={isAnswered}
            />
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={onConfirm}
            disabled={!selectedAnswer || isAnswered}
            className="px-6 py-2"
          >
            Confirm Answer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}