'use client';
import { PageShell } from '@/components/student/page-shell';
import { EmptyState } from '@/components/ui';
import { withMenuPermission } from '@/lib';

function Page() {
  return (
    <PageShell title="Progress" description="Stay on top of your learning goals.">
      <EmptyState title="No progress yet" description="Complete lessons to see progress insights." />
    </PageShell>
  );
}

export default withMenuPermission(Page, 'MENU_PROGRESS');
