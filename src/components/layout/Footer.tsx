import { cn } from '@/lib/utils';

interface FooterProps {
  children?: React.ReactNode;
  className?: string;
}

export function Footer({ children, className }: FooterProps) {
  return (
    <footer className={cn("py-6 text-center text-sm text-muted-foreground", className)}>
      {children || (
        <p>
          © {new Date().getFullYear()} Quotient - Trivia App. All rights reserved.
        </p>
      )}
    </footer>
  );
}