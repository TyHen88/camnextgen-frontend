'use client';
import { PageShell } from '@/components/student/page-shell';
import ProfileMainPage from '@/features/student/profile/ProfileMainPage';
import { withMenuPermission } from '@/lib';

function Page() {
  return (
    <PageShell title="Profile & Settings" description="Manage your personal information.">
      <ProfileMainPage />
    </PageShell>
  );
}

export default withMenuPermission(Page, 'MENU_PROFILE');
