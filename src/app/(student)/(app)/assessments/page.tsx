import { PageShell } from '@/components/student/page-shell';
import { EmptyState } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Assessments" description="Placement tests and skill check-ins.">
      <EmptyState title="No assessments" description="Assessment modules will appear here." />
    </PageShell>
  );
}
