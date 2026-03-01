import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
  {
    variants: {
      variant: {
        default: 'bg-muted text-foreground',
        accent: 'bg-primary/10 text-primary',
        success: 'bg-emerald-100 text-emerald-700'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(badgeVariants({ variant, className }))} {...props} />
  )
);
Badge.displayName = 'Badge';
