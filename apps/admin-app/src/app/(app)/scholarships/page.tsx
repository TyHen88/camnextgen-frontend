import { PageShell } from '@/components/page-shell';
import { EmptyState } from '@camnextgen/ui';

export default function Page() {
  return (
    <PageShell title="Scholarships" description="Review applications and approvals.">
      <EmptyState title="No applications" description="Scholarship requests will appear here." />
    </PageShell>
  );
}
