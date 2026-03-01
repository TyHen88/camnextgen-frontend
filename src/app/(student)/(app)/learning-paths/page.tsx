'use client';
import { PageShell } from '@/components/student/page-shell';
import { EmptyState } from '@/components/ui';
import { withMenuPermission } from '@/lib';

function Page() {
  return (
    <PageShell title="Learning Paths" description="Personalized roadmaps to reach your goals.">
      <EmptyState title="No paths selected" description="Take a skill assessment to get recommendations." />
    </PageShell>
  );
}

export default withMenuPermission(Page, 'MENU_LEARNING_PATHS');
