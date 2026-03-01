import { PageShell } from '@/components/admin/page-shell';
import { Card, CardContent } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Reports" description="Analytics for learning outcomes and growth.">
      <Card className="bg-card">
        <CardContent>
          <p className="text-sm text-muted-foreground">Reports and analytics widgets will live here.</p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
