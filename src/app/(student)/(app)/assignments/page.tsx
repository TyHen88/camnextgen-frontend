import { PageShell } from '@/components/student/page-shell';
import { EmptyState } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Assignments" description="Submit projects and receive feedback.">
      <EmptyState title="No assignments" description="Assignments will appear per course." />
    </PageShell>
  );
}
