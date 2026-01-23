import AuditLogsMainPage from '@/components/audit-log/AuditLogsMainPage';
import { PageShell } from '@/components/page-shell';

export default function Page() {
  return (
    <PageShell title="Audit Logs" description="Trace critical actions across the platform.">
      <AuditLogsMainPage />
    </PageShell>
  );
}
