import { Skeleton } from '@camnextgen/ui';

export default function Loading() {
  return (
    <div className="space-y-4 p-8">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
}
