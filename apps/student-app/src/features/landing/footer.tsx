'use client';

import Link from 'next/link';

const links = [
  { label: 'Courses', href: '/catalog' },
  { label: 'Community', href: '/community' },
  { label: 'Events', href: '/events' },
  { label: 'Career Prep', href: '/career' }
];

export const LandingFooter = () => (
  <footer className="rounded-[32px] bg-gradient-to-r from-background to-muted/60 px-8 py-10 text-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden border border-foreground/10">
    {/* Decorative animated border */}
    <div className="absolute inset-0 rounded-[32px] border border-foreground/5 pointer-events-none" />

    <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <div className="animate-fade-in">
        <p className="font-display text-lg font-bold text-balance">CamNextGen</p>
        <p className="text-sm text-foreground/70 mt-1 max-w-xs">
          Empowering the next generation of Cambodian IT professionals.
        </p>
      </div>
      <div className="flex flex-wrap gap-6 text-sm text-foreground/70 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative group transition-all duration-300 hover:text-foreground font-medium"
          >
            {link.label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>
      <div className="text-sm text-foreground/70 font-medium animate-fade-in group hover:text-foreground transition-colors duration-300" style={{ animationDelay: '0.2s' }}>
        <a href="mailto:hello@camnextgen.org" className="hover:text-foreground transition-colors duration-300 group-hover:underline">
          hello@camnextgen.org
        </a>
      </div>
    </div>
  </footer>
);
