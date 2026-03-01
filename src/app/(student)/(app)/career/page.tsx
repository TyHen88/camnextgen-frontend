import { PageShell } from '@/components/student/page-shell';
import { EmptyState } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Career Prep" description="Portfolio templates and interview prep.">
      <EmptyState title="No resources yet" description="Career prep tools will appear here." />
    </PageShell>
  );
}
