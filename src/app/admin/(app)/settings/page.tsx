import { PageShell } from '@/components/admin/page-shell';
import { Card, CardContent } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Settings" description="Control roles, access, and platform settings.">
      <Card className="bg-card">
        <CardContent>
          <p className="text-sm text-muted-foreground">Settings panels will appear here.</p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
