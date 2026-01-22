import { PageShell } from '@/components/page-shell';
import { EmptyState } from '@camnextgen/ui';

export default function Page() {
  return (
    <PageShell title="Progress" description="Stay on top of your learning goals.">
      <EmptyState title="No progress yet" description="Complete lessons to see progress insights." />
    </PageShell>
  );
}
