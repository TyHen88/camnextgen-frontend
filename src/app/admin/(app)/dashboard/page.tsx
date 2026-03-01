import { PageShell } from '@/components/admin/page-shell';
import { OverviewCards } from '@/features/admin/dashboard/overview-cards';
import { Card, CardContent } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Dashboard" description="Monitor CamNextGen operations in real time.">
      <OverviewCards />
      <Card className="bg-card">
        <CardContent className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Today at a glance</h3>
          <p className="text-sm text-muted-foreground">
            42 new enrollments, 6 scholarship applications, and 18 mentor responses.
          </p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
