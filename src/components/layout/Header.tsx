import { cn } from '@/lib/utils';
import { memo } from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Header = memo(({ title, subtitle, className }: HeaderProps) => {
  return (
    <header className={cn("w-full py-6 text-center", className)}>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
    </header>
  );
});