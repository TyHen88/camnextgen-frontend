import { PageShell } from '@/components/student/page-shell';
import ProfileMainPage from '@/features/student/profile/ProfileMainPage';
import { Card, CardContent } from '@/components/ui';

export default function Page() {
  return (
    <PageShell title="Profile" description="Manage your personal information.">
      <ProfileMainPage />
    </PageShell>
  );
}
