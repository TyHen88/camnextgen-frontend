import { PageShell } from '@/components/admin/page-shell';
import { EmptyState } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Users" description="Manage students, mentors, and admins.">
      <EmptyState title="No users loaded" description="Connect to the backend to see user data." />
    </PageShell>
  );
}
