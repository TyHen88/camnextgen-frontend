'use client';
import { PageShell } from '@/components/student/page-shell';
import { useAuth, withMenuPermission } from '@/lib';
import { Badge, Button, Card, CardContent } from '@/components/ui';
import { toast } from 'sonner';

function Page() {
  const { user } = useAuth();

  const converter = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning ';
    if (hour < 18) return 'Good afternoon ';
    return 'Good evening ';
  };

  const title = `${converter()}`;
  const studentName = user?.name ? user.name : 'student';
  return (
    <PageShell title={title + studentName + '!'} description="Continue your path to industry-ready skills.">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card">
          <CardContent className="space-y-3">

            <Badge variant="accent">In Progress</Badge>
            <h3 className="text-lg font-semibold text-foreground">Frontend Foundations</h3>
            <p className="text-sm text-muted-foreground">Lesson 4: Responsive Layouts</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="space-y-3">
            <Badge>Next Up</Badge>
            <h3 className="text-lg font-semibold text-foreground">Career Prep</h3>
            <p className="text-sm text-muted-foreground">Build your portfolio checklist.</p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

export default withMenuPermission(Page, 'MENU_HOME');
