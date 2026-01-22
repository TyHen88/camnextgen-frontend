import { PageShell } from '@/components/page-shell';
import { EmptyState } from '@camnextgen/ui';

export default function Page() {
  return (
    <PageShell title="Announcements" description="Publish updates to students and mentors.">
      <EmptyState title="No announcements" description="Create the first announcement for the community." />
    </PageShell>
  );
}
