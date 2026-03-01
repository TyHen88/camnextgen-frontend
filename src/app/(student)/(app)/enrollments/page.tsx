import { PageShell } from '@/components/student/page-shell';
import { EmptyState } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Enrollments" description="Track your active courses and progress.">
      <EmptyState title="No enrollments yet" description="Enroll in a course to get started." />
    </PageShell>
  );
}
