'use client';
import { PageShell } from '@/components/student/page-shell';
import { Card, CardContent } from '@/components/ui';
import { withMenuPermission } from '@/lib';

function Page() {
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

export default withMenuPermission(Page, 'MENU_SETTINGS');
