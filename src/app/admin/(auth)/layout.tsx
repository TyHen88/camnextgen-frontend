import { AuthLayout } from '@/components/admin/layout/auth-layout';
import { Toaster } from 'sonner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout>
      {children}
      <Toaster richColors position="top-right" />
    </AuthLayout>
  );
}
