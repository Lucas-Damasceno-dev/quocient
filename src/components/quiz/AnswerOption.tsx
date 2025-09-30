import { Button } from '@/components/ui/button';

interface AnswerOptionProps {
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  onSelect: () => void;
  disabled: boolean;
}

export function AnswerOption({
  text,
  isSelected,
  isCorrect,
  isIncorrect,
  onSelect,
  disabled
}: AnswerOptionProps) {
  let buttonVariant: 'outline' | 'default' | 'link' | 'destructive' 
    | 'secondary' | 'ghost' | null | undefined = 'outline';
  let additionalStyles = '';
  
  if (isCorrect) {
    buttonVariant = 'default';
    additionalStyles = 'bg-green-500 hover:bg-green-500 text-white';
  } else if (isIncorrect) {
    buttonVariant = 'default';
    additionalStyles = 'bg-red-500 hover:bg-red-500 text-white';
  } else if (isSelected) {
    buttonVariant = 'default';
  }

  return (
    <Button
      variant={buttonVariant}
      className={`w-full justify-start text-left p-4 ${additionalStyles}`}
      onClick={onSelect}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}