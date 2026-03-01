import { AppShell } from '@/components/admin/layout/app-shell';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
