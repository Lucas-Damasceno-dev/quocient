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
  let icon = null;
  
  if (isCorrect) {
    buttonVariant = 'default';
    additionalStyles = 'bg-green-500 hover:bg-green-500 text-white transition-all duration-300 ease-in-out transform scale-100';
    icon = '✓'; // Checkmark for correct answer
  } else if (isIncorrect) {
    buttonVariant = 'default';
    additionalStyles = 'bg-red-500 hover:bg-red-500 text-white transition-all duration-300 ease-in-out transform scale-100';
    icon = '✗'; // Cross for incorrect answer
  } else if (isSelected) {
    additionalStyles = 'transition-all duration-150 ease-in-out transform scale-[1.02]';
  } else {
    additionalStyles = 'transition-all duration-150 ease-in-out';
  }

  return (
    <Button
      variant={buttonVariant}
      className={`w-full justify-start text-left p-4 ${additionalStyles}`}
      onClick={onSelect}
      disabled={disabled}
    >
      {icon && (
        <span className="mr-3 font-bold">
          {icon}
        </span>
      )}
      {text}
    </Button>
  );
}