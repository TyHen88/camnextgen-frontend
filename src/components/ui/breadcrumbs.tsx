import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export const Breadcrumbs = ({ items, className }: { items: BreadcrumbItem[]; className?: string }) => (
  <nav className={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}>
    {items.map((item, index) => (
      <React.Fragment key={`${item.label}-${index}`}>
        {item.href ? (
          <a href={item.href} className="transition-colors hover:text-foreground">
            {item.label}
          </a>
        ) : (
          <span className="text-foreground">{item.label}</span>
        )}
        {index < items.length - 1 ? <ChevronRight className="h-4 w-4" /> : null}
      </React.Fragment>
    ))}
  </nav>
);
