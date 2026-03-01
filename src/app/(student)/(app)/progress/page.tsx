import { PageShell } from '@/components/student/page-shell';
import { EmptyState } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Progress" description="Stay on top of your learning goals.">
      <EmptyState title="No progress yet" description="Complete lessons to see progress insights." />
    </PageShell>
  );
}
