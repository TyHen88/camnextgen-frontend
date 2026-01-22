'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button, Sheet, SheetContent, SheetTrigger } from '@camnextgen/ui';

const links = [
  { label: 'Learning Paths', href: '#paths' },
  { label: 'Community', href: '#community' },
  { label: 'Events', href: '#events' },
  { label: 'Career', href: '#career' }
];

export const LandingNav = () => (
  <header className="flex items-center justify-between px-6 py-6 md:px-16">
    <Link href="/" className="font-display text-lg font-semibold text-background">
      CamNextGen
    </Link>
    <nav className="hidden items-center gap-6 text-sm text-background/70 md:flex">
      {links.map((link) => (
        <a key={link.href} href={link.href} className="transition hover:text-background">
          {link.label}
        </a>
      ))}
    </nav>
    <div className="hidden items-center gap-2 md:flex">
      <Button variant="outline" size="sm" asChild>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/auth/register">Start Learning</Link>
      </Button>
    </div>
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="space-y-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="block text-sm text-foreground">
                {link.label}
              </a>
            ))}
            <div className="pt-4">
              <Button className="w-full" asChild>
                <Link href="/auth/register">Start Learning</Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </header>
);
