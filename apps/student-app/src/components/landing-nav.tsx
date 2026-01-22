'use client';
import React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button, Sheet, SheetContent, SheetTrigger } from '@camnextgen/ui';
import { useState } from 'react';
import { ModeToggle } from './layout/toggle-mode';

const links = [
  { label: 'Learning Paths', href: '#paths' },
  { label: 'Community', href: '#community' },
  { label: 'Events', href: '#events' },
  { label: 'Career', href: '#career' }
];

export const LandingNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-gradient-to-b from-background/95 to-muted/80 border-b rounded-b-2xl border-foreground/10 shadow-sm animate-slide-in-down">
      <div className="flex items-center justify-between px-6 py-4 md:px-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl font-bold text-foreground hover:text-foreground/80 transition-colors duration-300 animate-fade-in group"
        >
          <span className="inline-block transition-transform duration-300 group-hover:scale-110">CamNextGen</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-foreground/70 transition-all duration-300 hover:text-foreground group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-foreground to-foreground/60 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden items-center gap-3 md:flex animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <ModeToggle />
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-foreground/30 text-foreground hover:bg-foreground/5 hover:border-foreground/50 transition-all duration-300 hover:shadow-md bg-transparent"
          >
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-foreground text-background hover:bg-foreground/90 hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
          >
            <Link href="/auth/register">Start Learning</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-foreground/30 text-foreground hover:bg-foreground/5 transition-all duration-300 bg-transparent"
              >
                <Menu className="h-5 w-5 transition-transform duration-300" />
              </Button>
            </SheetTrigger>
            <SheetContent
              // side="right"
              className="bg-gradient-to-b from-background to-muted/70 border-l border-foreground/10"
            >
              <div className="flex flex-col gap-6 pt-8">
                <div className="font-display text-lg font-bold text-foreground">CamNextGen</div>
                <nav className="flex flex-col gap-4">
                  {links.map((link, index) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300 group animate-slide-in-left"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <span className="group-hover:translate-x-2 inline-block transition-transform duration-300">{link.label}</span>
                    </a>
                  ))}
                </nav>
                <div className="border-t border-foreground/10 pt-4">
                  <Button
                    className="w-full bg-foreground text-background hover:bg-foreground/90 hover:shadow-lg transition-all duration-300 font-medium"
                    asChild
                  >
                    <Link href="/auth/register" onClick={() => setIsOpen(false)}>Start Learning</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
