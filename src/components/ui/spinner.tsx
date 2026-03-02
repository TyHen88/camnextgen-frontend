import * as React from 'react';
import { LoaderIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const spinnerVariants = {
    sm: 'size-4',
    md: 'size-6',
    lg: 'size-8',
    xl: 'size-12'
};

function Spinner({ className, size = 'md', ...props }: React.ComponentProps<"svg"> & { size?: keyof typeof spinnerVariants }) {
    return (
        <LoaderIcon
            role="status"
            aria-label="Loading"
            className={cn("animate-spin", spinnerVariants[size], className)}
            {...props}
        />
    )
}

export { Spinner }
