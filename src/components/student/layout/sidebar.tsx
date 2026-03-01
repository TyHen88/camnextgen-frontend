'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/components/ui';
import { useI18n, useAuth } from '@/lib';
import { studentNavItems } from '../navigation';

export const Sidebar = () => {
  const pathname = usePathname();
  const { t } = useI18n();
  const { hasMenu } = useAuth();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted && resolvedTheme === 'dark' ? '/CamNextGen2.png' : '/CamNextGen.png';

  return (
    <aside className="hidden w-64 flex-col border-r border-border bg-card px-6 py-8 lg:sticky lg:top-0 lg:flex lg:h-screen">
      <Link href="/home" className="mb-10 flex flex-col items-center gap-3 group animate-fade-in text-center">
        <div className="flex flex-col items-center">
          <span className="text-xl font-display font-bold tracking-tight">
            <span className="text-brand-blue uppercase">Cam</span>
            <span className="text-brand-teal uppercase">NextGen</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-muted-foreground mt-0.5">{t('nav.student')}</span>
        </div>
      </Link>
      <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
        {studentNavItems
          .filter((item) => hasMenu(item.menuCode))
          .map((item) => {
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
      </nav>
      <div className="mt-auto rounded-3xl bg-primary px-4 py-4 text-xs text-primary-foreground">
        Bridge your skills to industry-ready projects.
      </div>
    </aside>
  );
};
