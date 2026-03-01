import * as React from 'react';
import { cn } from '@/lib/utils';

export const EmptyState = ({
  title,
  description,
  action,
  className
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('rounded-3xl border border-dashed border-border bg-muted/40 p-8 text-center', className)}>
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
    {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
  </div>
);
