"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, useTheme } from "@camnextgen/ui";
import { useI18n } from "@camnextgen/lib";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">{t('actions.toggleTheme')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>{t('actions.light')}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>{t('actions.dark')}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>{t('actions.system')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
