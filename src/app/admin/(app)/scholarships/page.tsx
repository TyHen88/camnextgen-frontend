import { PageShell } from '@/components/admin/page-shell';
import { EmptyState } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Scholarships" description="Review applications and approvals.">
      <EmptyState title="No applications" description="Scholarship requests will appear here." />
    </PageShell>
  );
}
