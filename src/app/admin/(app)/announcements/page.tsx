import { PageShell } from '@/components/admin/page-shell';
import { EmptyState } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Announcements" description="Publish updates to students and mentors.">
      <EmptyState title="No announcements" description="Create the first announcement for the community." />
    </PageShell>
  );
}
