import { PageShell } from '@/components/page-shell';
import { EmptyState } from '@camnextgen/ui';

export default function Page() {
  return (
    <PageShell title="Users" description="Manage students, mentors, and admins.">
      <EmptyState title="No users loaded" description="Connect to the backend to see user data." />
    </PageShell>
  );
}
