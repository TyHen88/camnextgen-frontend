'use client';
import { PageShell } from '@/components/student/page-shell';
import { EmptyState } from '@/components/ui';
import { withMenuPermission } from '@/lib';

function Page() {
  return (
    <PageShell title="Events" description="Workshops and live sessions for learners.">
      <EmptyState title="No events" description="Upcoming events will appear here." />
    </PageShell>
  );
}

export default withMenuPermission(Page, 'MENU_EVENTS');
