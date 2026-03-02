'use client';

import { PageShell } from '@/components/student/page-shell';
import NotificationsMainPage from '@/features/student/notifications/NotificationsMainPage';
import { withMenuPermission } from '@/lib';

function Page() {
  return (
    <PageShell title="" description="">
      <NotificationsMainPage />
    </PageShell>
  );
}

export default withMenuPermission(Page, 'MENU_NOTIFICATIONS');
