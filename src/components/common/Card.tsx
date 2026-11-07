import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-surface border border-border rounded-md shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function CardHeader({ title, icon, action }: CardHeaderProps) {
  return (
    <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-secondary/50">
      <div className="flex items-center space-x-2">
        {icon && <div className="text-secondary-text">{icon}</div>}
        <h3 className="font-semibold text-[14px] text-primary">{title}</h3>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}
