import { PageShell } from '@/components/student/page-shell';
import { EmptyState } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Events" description="Workshops and live sessions for learners.">
      <EmptyState title="No events" description="Upcoming events will appear here." />
    </PageShell>
  );
}
