import { PageShell } from '@/components/student/page-shell';
import { EmptyState } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Learning Paths" description="Personalized roadmaps to reach your goals.">
      <EmptyState title="No paths selected" description="Take a skill assessment to get recommendations." />
    </PageShell>
  );
}
