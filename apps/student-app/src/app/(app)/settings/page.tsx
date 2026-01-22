import { PageShell } from '@/components/page-shell';
import { Card, CardContent } from '@camnextgen/ui';

export default function Page() {
  return (
    <PageShell title="Settings" description="Customize your learning experience.">
      <Card className="bg-card">
        <CardContent>
          <p className="text-sm text-muted-foreground">Settings will appear here.</p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
