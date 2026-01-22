import {
  BadgeCheck,
  Bell,
  BookOpen,
  Briefcase,
  Calendar,
  GraduationCap,
  Home,
  Layers,
  MessageSquare,
  Settings,
  UserCircle
} from 'lucide-react';

export const studentNavItems = [
  { labelKey: 'nav.home', href: '/home', icon: Home },
  { labelKey: 'nav.catalog', href: '/catalog', icon: BookOpen },
  { labelKey: 'nav.enrollments', href: '/enrollments', icon: GraduationCap },
  { labelKey: 'nav.progress', href: '/progress', icon: BadgeCheck },
  { labelKey: 'nav.learningPaths', href: '/learning-paths', icon: Layers },
  { labelKey: 'nav.assessments', href: '/assessments', icon: BadgeCheck },
  { labelKey: 'nav.assignments', href: '/assignments', icon: BookOpen },
  { labelKey: 'nav.community', href: '/community', icon: MessageSquare },
  { labelKey: 'nav.events', href: '/events', icon: Calendar },
  { labelKey: 'nav.career', href: '/career', icon: Briefcase },
  { labelKey: 'nav.notifications', href: '/notifications', icon: Bell },
  { labelKey: 'nav.profile', href: '/profile', icon: UserCircle },
  { labelKey: 'nav.settings', href: '/settings', icon: Settings }
];
