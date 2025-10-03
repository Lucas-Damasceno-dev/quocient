import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ScoreDisplayProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export function ScoreDisplay({ score, total, onRestart }: ScoreDisplayProps) {
  const percentage = Math.round((score / total) * 100);
  
  // Determine message based on score
  let message = '';
  if (percentage >= 80) {
    message = 'Excellent work!';
  } else if (percentage >= 60) {
    message = 'Good job!';
  } else if (percentage >= 40) {
    message = 'Not bad, could be better!';
  } else {
    message = 'Keep practicing!';
  }

  return (
    <Card className="w-full max-w-md mx-auto text-center p-4 sm:p-6">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl">Quiz Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-4xl sm:text-5xl font-bold text-primary">{score}<span className="text-muted-foreground text-xl sm:text-2xl">/{total}</span></div>
        <div className="text-lg sm:text-xl">{percentage}%</div>
        <p className="text-base sm:text-lg">{message}</p>
        <p className="text-sm sm:text-base text-muted-foreground">
          You answered {score} out of {total} questions correctly.
        </p>
        <div className="pt-4">
          <Button onClick={onRestart} variant="default" size="lg" className="w-full text-base sm:text-lg">
            Play Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}