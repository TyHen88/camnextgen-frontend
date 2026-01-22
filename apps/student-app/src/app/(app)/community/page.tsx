import { PageShell } from '@/components/page-shell';
import { EmptyState } from '@camnextgen/ui';

export default function Page() {
  return (
    <PageShell title="Community" description="Ask mentors and peers in Q&A threads.">
      <EmptyState title="No questions yet" description="Start a discussion to get help." />
    </PageShell>
  );
}
