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
import type { MenuCode } from '@/types';

export type NavItem = {
  labelKey: string;
  href: string;
  icon: any;
  menuCode: MenuCode;
};

export const studentNavItems: NavItem[] = [
  { labelKey: 'nav.home', href: '/home', icon: Home, menuCode: 'MENU_HOME' },
  { labelKey: 'nav.catalog', href: '/catalog', icon: BookOpen, menuCode: 'MENU_CATALOG' },
  { labelKey: 'nav.enrollments', href: '/enrollments', icon: GraduationCap, menuCode: 'MENU_ENROLLMENTS' },
  { labelKey: 'nav.progress', href: '/progress', icon: BadgeCheck, menuCode: 'MENU_PROGRESS' },
  { labelKey: 'nav.learningPaths', href: '/learning-paths', icon: Layers, menuCode: 'MENU_LEARNING_PATHS' },
  { labelKey: 'nav.assessments', href: '/assessments', icon: BadgeCheck, menuCode: 'MENU_ASSESSMENTS' },
  { labelKey: 'nav.assignments', href: '/assignments', icon: BookOpen, menuCode: 'MENU_ASSIGNMENTS' },
  { labelKey: 'nav.community', href: '/community', icon: MessageSquare, menuCode: 'MENU_COMMUNITY' },
  { labelKey: 'nav.events', href: '/events', icon: Calendar, menuCode: 'MENU_EVENTS' },
  { labelKey: 'nav.career', href: '/career', icon: Briefcase, menuCode: 'MENU_CAREER' },
  { labelKey: 'nav.notifications', href: '/notifications', icon: Bell, menuCode: 'MENU_NOTIFICATIONS' },
  { labelKey: 'nav.profile', href: '/profile', icon: UserCircle, menuCode: 'MENU_PROFILE' },
  { labelKey: 'nav.settings', href: '/settings', icon: Settings, menuCode: 'MENU_SETTINGS' }
];
