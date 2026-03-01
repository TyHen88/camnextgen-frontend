import { AuthLayout } from '@/components/student/layout/auth-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  )
}
