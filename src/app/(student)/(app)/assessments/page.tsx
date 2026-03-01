'use client';
import { PageShell } from '@/components/student/page-shell';
import { EmptyState } from '@/components/ui';
import { withMenuPermission } from '@/lib';

function Page() {
  return (
    <PageShell title="Assessments" description="Placement tests and skill check-ins.">
      <EmptyState title="No assessments" description="Assessment modules will appear here." />
    </PageShell>
  );
}

export default withMenuPermission(Page, 'MENU_ASSESSMENTS');
