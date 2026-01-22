import { PageShell } from '@/components/page-shell';
import { Card, CardContent } from '@camnextgen/ui';

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
