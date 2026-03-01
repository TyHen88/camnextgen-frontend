'use client';
import { PageShell } from '@/components/student/page-shell';
import { EmptyState } from '@/components/ui';
import { withMenuPermission } from '@/lib';

function Page() {
  return (
    <PageShell title="Assignments" description="Submit projects and receive feedback.">
      <EmptyState title="No assignments" description="Assignments will appear per course." />
    </PageShell>
  );
}

export default withMenuPermission(Page, 'MENU_ASSIGNMENTS');
