import { PageShell } from '@/components/page-shell';
import { EmptyState } from '@camnextgen/ui';

export default function Page() {
  return (
    <PageShell title="Audit Logs" description="Trace critical actions across the platform.">
      <EmptyState title="No audit logs" description="Audit data will appear once events are recorded." />
    </PageShell>
  );
}
