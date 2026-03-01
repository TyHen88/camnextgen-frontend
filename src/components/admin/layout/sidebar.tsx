'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/components/ui';
import { useI18n } from '@/lib';
import { adminNavItems } from '../navigation';

export const Sidebar = () => {
  const pathname = usePathname();
  const { t } = useI18n();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted && resolvedTheme === 'dark' ? '/CamNextGen2.png' : '/CamNextGen.png';

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card px-6 py-8">
      <Link href="/admin/dashboard" className="mb-10 flex flex-col items-center gap-3 group animate-fade-in text-center">
        <div className="relative h-12 w-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          <Image
            src={logoSrc}
            alt="CamNextGen Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-display font-bold tracking-tight">
            <span className="text-brand-blue uppercase">Cam</span>
            <span className="text-brand-teal uppercase">NextGen</span>
          </span>
          <span className="text-[8px] uppercase tracking-[0.4em] text-primary font-bold mt-1.5 ml-1 px-2 py-0.5 border border-primary/20 bg-primary/5 rounded-full">{t('nav.admin')}</span>
        </div>
      </Link>
      <nav className="space-y-2">
        {adminNavItems.map((item) => {
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
      <div className="mt-auto rounded-3xl bg-foreground px-4 py-4 text-xs text-background">
        Empowering Cambodian tech talent.
      </div>
    </aside>
  );
};
