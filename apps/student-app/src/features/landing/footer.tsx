import Link from 'next/link';

const links = [
  { label: 'Courses', href: '/catalog' },
  { label: 'Community', href: '/community' },
  { label: 'Events', href: '/events' },
  { label: 'Career Prep', href: '/career' }
];

export const LandingFooter = () => (
  <footer className="rounded-[32px] bg-foreground px-8 py-10 text-background">
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-display text-lg font-semibold">CamNextGen</p>
        <p className="text-sm text-background/60">
          Empowering the next generation of Cambodian IT professionals.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-background/70">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="transition hover:text-background">
            {link.label}
          </Link>
        ))}
      </div>
      <div className="text-sm text-background/70">hello@camnextgen.org</div>
    </div>
  </footer>
);
