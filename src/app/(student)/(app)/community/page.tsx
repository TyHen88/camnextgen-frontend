'use client';
import { PageShell } from '@/components/student/page-shell';
import { EmptyState } from '@/components/ui';
import { withMenuPermission } from '@/lib';

function Page() {
  return (
    <PageShell title="Community" description="Ask mentors and peers in Q&A threads.">
      <EmptyState title="No questions yet" description="Start a discussion to get help." />
    </PageShell>
  );
}

export default withMenuPermission(Page, 'MENU_COMMUNITY');
