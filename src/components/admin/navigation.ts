import {
  Activity,
  Bell,
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Settings,
  ShieldCheck,
  Users
} from 'lucide-react';

export const adminNavItems = [
  { labelKey: 'nav.dashboard', href: '/dashboard', icon: LayoutDashboard },
  { labelKey: 'nav.users', href: '/users', icon: Users },
  { labelKey: 'nav.courses', href: '/courses', icon: BookOpen },
  { labelKey: 'nav.enrollments', href: '/enrollments', icon: GraduationCap },
  { labelKey: 'nav.auditLogs', href: '/audit-logs', icon: ShieldCheck },
  { labelKey: 'nav.announcements', href: '/announcements', icon: Megaphone },
  { labelKey: 'nav.events', href: '/events', icon: Calendar },
  { labelKey: 'nav.scholarships', href: '/scholarships', icon: FileText },
  { labelKey: 'nav.reports', href: '/reports', icon: Activity },
  { labelKey: 'nav.settings', href: '/settings', icon: Settings }
];
