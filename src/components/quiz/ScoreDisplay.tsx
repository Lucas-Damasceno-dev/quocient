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
    <Card className="w-full max-w-md mx-auto text-center">
      <CardHeader>
        <CardTitle className="text-2xl">Quiz Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-5xl font-bold text-primary">{score}<span className="text-muted-foreground text-2xl">/{total}</span></div>
        <div className="text-xl">{percentage}%</div>
        <p className="text-lg">{message}</p>
        <p className="text-muted-foreground">
          You answered {score} out of {total} questions correctly.
        </p>
        <div className="pt-4">
          <Button onClick={onRestart} className="w-full">
            Play Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}