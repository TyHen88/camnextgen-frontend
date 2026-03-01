import { PageShell } from '@/components/admin/page-shell';
import { EmptyState } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Enrollments" description="Track student enrollments and progress.">
      <EmptyState title="No enrollments yet" description="Enrollment data will show up here." />
    </PageShell>
  );
}
