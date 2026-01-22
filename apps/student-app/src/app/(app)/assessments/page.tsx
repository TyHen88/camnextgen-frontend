import { PageShell } from '@/components/page-shell';
import { EmptyState } from '@camnextgen/ui';

export default function Page() {
  return (
    <PageShell title="Assessments" description="Placement tests and skill check-ins.">
      <EmptyState title="No assessments" description="Assessment modules will appear here." />
    </PageShell>
  );
}
