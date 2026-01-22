import { PageShell } from '@/components/page-shell';
import { EmptyState } from '@camnextgen/ui';

export default function Page() {
  return (
    <PageShell title="Assignments" description="Submit projects and receive feedback.">
      <EmptyState title="No assignments" description="Assignments will appear per course." />
    </PageShell>
  );
}
