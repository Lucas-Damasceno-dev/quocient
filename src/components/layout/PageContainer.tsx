import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("flex min-h-svh flex-col items-center justify-center p-4", className)}>
      {children}
    </div>
  );
}