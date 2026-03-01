'use client';

import { Languages } from 'lucide-react';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui';
import { availableLocales, useI18n } from './provider';

export const LanguageToggle = () => {
  const { locale, setLocale } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle language">
          <Languages className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLocales.map((item) => (
          <DropdownMenuItem
            key={item.code}
            onClick={() => setLocale(item.code)}
            className={item.code === locale ? 'font-semibold text-foreground' : undefined}
          >
            {item.nativeLabel} ({item.label})
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
