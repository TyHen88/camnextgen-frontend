import { PageShell } from '@/components/page-shell';
import { EmptyState } from '@camnextgen/ui';

export default function Page() {
  return (
    <PageShell title="Learning Paths" description="Personalized roadmaps to reach your goals.">
      <EmptyState title="No paths selected" description="Take a skill assessment to get recommendations." />
    </PageShell>
  );
}
