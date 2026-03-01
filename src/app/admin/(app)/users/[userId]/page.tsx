import { PageShell } from '@/components/admin/page-shell';
import { Card, CardContent } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="User Detail" description="Profile and activity overview.">
      <Card className="bg-card">
        <CardContent>
          <p className="text-sm text-muted-foreground">User profile details will appear here.</p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
