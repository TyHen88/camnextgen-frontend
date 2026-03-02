'use client';

import { AuthLayout } from '@/components/student/layout/auth-layout';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWide = pathname?.includes('/login') || pathname?.includes('/register');

  return (
    <AuthLayout wide={isWide}>
      {children}
    </AuthLayout>
  )
}
