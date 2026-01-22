import { PageShell } from '@/components/page-shell';
import { EmptyState } from '@camnextgen/ui';

export default function Page() {
  return (
    <PageShell title="Events" description="Manage workshops, webinars, and live sessions.">
      <EmptyState title="No events scheduled" description="Add an event to engage learners." />
    </PageShell>
  );
}
