import { PageShell } from '@/components/student/page-shell';
import { EmptyState } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Notifications" description="Stay updated with platform alerts.">
      <EmptyState title="You're all caught up" description="Notifications will appear here." />
    </PageShell>
  );
}
