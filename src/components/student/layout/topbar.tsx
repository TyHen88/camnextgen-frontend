'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Breadcrumbs, Button, Sheet, SheetClose, SheetContent, SheetTrigger, cn } from '@/components/ui';
import { LanguageToggle, useI18n } from '@/lib';
import { ProfileMenu } from '../profile-menu';
import { studentNavItems } from '../navigation';
import { ModeToggle } from '@/components/layout/toggle-mode';

const segmentLabels: Record<string, string> = {
  home: 'Home',
  catalog: 'Catalog',
  courses: 'Courses',
  learn: 'Learning',
  enrollments: 'Enrollments',
  progress: 'Progress',
  'learning-paths': 'Learning Paths',
  assessments: 'Assessments',
  assignments: 'Assignments',
  community: 'Community',
  events: 'Events',
  career: 'Career',
  notifications: 'Notifications',
  profile: 'Profile',
  settings: 'Settings'
};

type BreadcrumbItem = { label: string; href: string; current?: boolean };

const buildBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean);

  const items: BreadcrumbItem[] = [{ label: 'CamNextGen', href: '/home' }];

  segments.forEach((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const isLast = index === segments.length - 1;

    items.push({
      label: segmentLabels[segment] ?? segment,
      href,
      current: isLast,
    });
  });

  return items;
};


export const Topbar = () => {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="left-0 right-auto border-r border-l-0">
            <div className="flex h-full flex-col">
              <div className="mb-8">
                <p className="font-display text-lg font-semibold text-foreground">CamNextGen</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t('nav.student')}</p>
              </div>
              <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
                {studentNavItems.map((item) => {
                  const active = pathname.startsWith(item.href);
                  return (
                    <SheetClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 rounded-2xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors',
                          active ? 'bg-foreground text-background' : 'hover:bg-muted'
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {t(item.labelKey)}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
              <div className="mt-6 rounded-3xl bg-primary px-4 py-4 text-xs text-primary-foreground">
                Bridge your skills to industry-ready projects.
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="min-w-0">
          <Breadcrumbs items={buildBreadcrumbs(pathname)} className="hidden md:flex" />
          <p className="text-sm font-semibold text-foreground md:hidden">CamNextGen</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <LanguageToggle />
        <ModeToggle />
        <ProfileMenu />
      </div>
    </header>
  );
};
