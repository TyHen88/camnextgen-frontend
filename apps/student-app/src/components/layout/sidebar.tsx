'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@camnextgen/ui';
import { useI18n } from '@camnextgen/lib';
import { studentNavItems } from '../navigation';

export const Sidebar = () => {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <aside className="hidden w-64 flex-col border-r border-border bg-card px-6 py-8 lg:sticky lg:top-0 lg:flex lg:h-screen">
      <div className="mb-10">
        <p className="font-display text-lg font-semibold text-foreground">CamNextGen.com</p>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t('nav.student')}</p>
      </div>
      <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
        {studentNavItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-2xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors',
                active ? 'bg-foreground text-background' : 'hover:bg-muted'
              )}
            >
              <item.icon className="h-4 w-4" />
              {t(item.labelKey)}
            </Link>
          );
        })}
        {/* <div className="flex items-center gap-3 rounded-2xl bg-muted px-3 py-2 text-xs text-foreground">
          <LanguageToggle />
        </div> */}
      </nav>
      <div className="mt-auto rounded-3xl bg-primary px-4 py-4 text-xs text-primary-foreground">
        Bridge your skills to industry-ready projects.
      </div>
    </aside>
  );
};
