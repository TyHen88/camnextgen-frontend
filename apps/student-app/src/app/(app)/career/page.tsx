import { PageShell } from '@/components/page-shell';
import { EmptyState } from '@camnextgen/ui';

export default function Page() {
  return (
    <PageShell title="Career Prep" description="Portfolio templates and interview prep.">
      <EmptyState title="No resources yet" description="Career prep tools will appear here." />
    </PageShell>
  );
}
