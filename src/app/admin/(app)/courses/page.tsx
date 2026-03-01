import { PageShell } from '@/components/admin/page-shell';
import { CoursesTable } from '@/features/admin/courses/courses-table';

export default function Page() {
  return (
    <PageShell title="Courses" description="Review and manage the course catalog.">
      <CoursesTable />
    </PageShell>
  );
}
