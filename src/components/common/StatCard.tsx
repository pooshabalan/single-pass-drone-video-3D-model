import type { ReactNode } from 'react';
import { Card, CardContent } from './Card';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  context?: string;
  className?: string;
}

export function StatCard({ label, value, icon, context, className = '' }: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="flex items-center p-4">
        {icon && (
          <div className="flex-shrink-0 mr-4 text-accent p-2 bg-accent/10 rounded-md">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-secondary-text whitespace-normal break-words leading-tight">
            {label}
          </p>
          <div className="flex items-baseline mt-1.5">
            <p className="text-xl font-semibold text-primary">
              {value}
            </p>
            {context && (
              <span className="ml-2 text-[12px] text-muted truncate">
                {context}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
