'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted && resolvedTheme === 'dark' ? '/CamNextGen2.png' : '/CamNextGen.png';

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground flex flex-col font-body">
      {/* Decorative blurred backgrounds */}
      <div className="absolute -left-32 top-0 h-[600px] w-[600px] rounded-full bg-brand-blue/15 blur-[140px] animate-pulse" />
      <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-brand-teal/15 blur-[120px] animate-pulse" />

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 py-12">
        <div className="mb-10 animate-fade-in text-center">
          <Link href="/" className="flex flex-col items-center gap-4 group">
            <div className="relative h-16 w-16 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <Image
                src={logoSrc}
                alt="CamNextGen Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-display font-bold tracking-tight">
                <span className="text-brand-blue uppercase">Cam</span>
                <span className="text-brand-teal uppercase">NextGen</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mt-1.5 ml-1 px-2 py-0.5 border border-primary/20 bg-primary/5 rounded-full">Admin Portal</span>
            </div>
          </Link>
        </div>

        <div className="w-full max-w-md animate-slide-up">
          {children}
        </div>
      </div>

      <footer className="relative z-10 py-6 text-center text-sm text-foreground/30 animate-fade-in">
        <p>© {new Date().getFullYear()} CamNextGen. Internal Administration System.</p>
      </footer>
    </div>
  );
};
