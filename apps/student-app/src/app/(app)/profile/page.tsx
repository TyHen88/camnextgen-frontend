import { PageShell } from '@/components/page-shell';
import ProfileMainPage from '@/features/profile/ProfileMainPage';
import { Card, CardContent } from '@camnextgen/ui';

export default function Page() {
  return (
    <PageShell title="Profile" description="Manage your personal information.">
      <ProfileMainPage />
    </PageShell>
  );
}
