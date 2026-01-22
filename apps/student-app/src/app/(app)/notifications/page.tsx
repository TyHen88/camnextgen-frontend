import { PageShell } from '@/components/page-shell';
import { EmptyState } from '@camnextgen/ui';

export default function Page() {
  return (
    <PageShell title="Notifications" description="Stay updated with platform alerts.">
      <EmptyState title="You're all caught up" description="Notifications will appear here." />
    </PageShell>
  );
}
