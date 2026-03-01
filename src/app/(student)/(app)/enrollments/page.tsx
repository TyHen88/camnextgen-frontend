'use client';
import { PageShell } from '@/components/student/page-shell';
import { EmptyState } from '@/components/ui';
import { withMenuPermission } from '@/lib';

function Page() {
  return (
    <PageShell title="Enrollments" description="Track your active courses and progress.">
      <EmptyState title="No enrollments yet" description="Enroll in a course to get started." />
    </PageShell>
  );
}

export default withMenuPermission(Page, 'MENU_ENROLLMENTS');
