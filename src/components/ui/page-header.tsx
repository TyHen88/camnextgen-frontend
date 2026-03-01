import * as React from 'react';
import { cn } from '@/lib/utils';

export const PageHeader = ({
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
  <div className={cn('flex flex-col gap-3 md:flex-row md:items-center md:justify-between', className)}>
    <div>
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
    </div>
    {action ? <div>{action}</div> : null}
  </div>
);
