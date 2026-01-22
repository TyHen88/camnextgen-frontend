import { AuthLayout } from '@/components/layout/auth-layout';
import { Toaster } from '@camnextgen/ui/src/components/sonner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  )
}
