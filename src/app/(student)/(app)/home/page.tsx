'use client';

import { PageShell } from '@/components/student/page-shell';
import HomeMainPage from '@/features/student/home/HomeMainPage';
import { withMenuPermission } from '@/lib';

function Page() {
  return (
    <PageShell title="" description="">
      <HomeMainPage />
    </PageShell>
  );
}

export default withMenuPermission(Page, 'MENU_HOME');
