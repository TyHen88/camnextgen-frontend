'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumbs } from '@camnextgen/ui';
import { ProfileMenu } from '../profile-menu';
import { ModeToggle } from '@/components/layout/toggle-mode';
import { LanguageToggle } from '@camnextgen/lib';
import { useI18n } from '@camnextgen/lib';

const segmentLabels: Record<string, string> = {
  dashboard: 'nav.dashboard',
  users: 'nav.users',
  courses: 'nav.courses',
  enrollments: 'nav.enrollments',
  'audit-logs': 'nav.auditLogs',
  announcements: 'nav.announcements',
  events: 'nav.events',
  scholarships: 'nav.scholarships',
  reports: 'nav.reports',
  settings: 'nav.settings',
  new: 'nav.new',
  edit: 'nav.edit'
};

type BreadcrumbItem = { label: string; href: string; current?: boolean };

const buildBreadcrumbs = (pathname: string, t: (key: string) => string): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean);

  const items: BreadcrumbItem[] = [{ label: t('nav.admin'), href: '/dashboard' }];

  segments.forEach((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const labelKey = segmentLabels[segment];
    const label = labelKey ? t(labelKey) : segment;

    items.push({
      label,
      href,
      current: index === segments.length - 1,
    });
  });

  return items;
};


export const Topbar = () => {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-8 py-4">
      <Breadcrumbs items={buildBreadcrumbs(pathname, t)} />
      <div className="flex items-center gap-3">
        <LanguageToggle />
        <ModeToggle />
        <ProfileMenu />
      </div>
    </header>
  );
};
