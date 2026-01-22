import { PageShell } from '@/components/page-shell';
import { CoursesTable } from '@/features/courses/courses-table';

export default function Page() {
  return (
    <PageShell title="Courses" description="Review and manage the course catalog.">
      <CoursesTable />
    </PageShell>
  );
}
