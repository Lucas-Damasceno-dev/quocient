import { cn } from '@/lib/utils';

interface TransitionWrapperProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export function TransitionWrapper({ 
  children, 
  className, 
  duration = 300
}: TransitionWrapperProps) {
  // Simple fade-in transition without external dependencies
  const transitionClasses = `animate-fade-in duration-${duration} opacity-100`;

  return (
    <div 
      className={cn(transitionClasses, className)}
    >
      {children}
    </div>
  );
}