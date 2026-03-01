'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { translations } from './locales';

export type Locale = 'en' | 'km';

export type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

// type Dictionary = Record<string, string>;

// const translations: Record<Locale, Dictionary> = {
// en: {
//     'nav.admin': 'Admin',
//     'nav.student': 'Student',
//     'nav.dashboard': 'Dashboard',
//     'nav.users': 'Users',
//     'nav.courses': 'Courses',
//     'nav.enrollments': 'Enrollments',
//     'nav.auditLogs': 'Audit Logs',
//     'nav.announcements': 'Announcements',
//     'nav.events': 'Events',
//     'nav.scholarships': 'Scholarships',
//     'nav.reports': 'Reports',
//     'nav.settings': 'Settings',
//     'nav.new': 'New',
//     'nav.edit': 'Edit',
//     'nav.home': 'Home',
//     'nav.catalog': 'Catalog',
//     'nav.progress': 'Progress',
//     'nav.learningPaths': 'Learning Paths',
//     'nav.assessments': 'Assessments',
//     'nav.assignments': 'Assignments',
//     'nav.community': 'Community',
//     'nav.career': 'Career',
//     'nav.notifications': 'Notifications',
//     'nav.profile': 'Profile',
//     'actions.light': 'Light',
//     'actions.dark': 'Dark',
//     'actions.system': 'System',
//     'actions.toggleTheme': 'Toggle theme',
//     'actions.language': 'Language'
//   },
//   km: {
//     'nav.admin': 'អ្នកគ្រប់គ្រង',
//     'nav.student': 'សិស្ស',
//     'nav.dashboard': 'ផ្ទាំងគ្រប់គ្រង',
//     'nav.users': 'អ្នកប្រើប្រាស់',
//     'nav.courses': 'វគ្គសិក្សា',
//     'nav.enrollments': 'ការចុះឈ្មោះ',
//     'nav.auditLogs': 'កំណត់ត្រាពិនិត្យ',
//     'nav.announcements': 'សេចក្តីប្រកាស',
//     'nav.events': 'ព្រឹត្តិការណ៍',
//     'nav.scholarships': 'អាហារូបករណ៍',
//     'nav.reports': 'របាយការណ៍',
//     'nav.settings': 'ការកំណត់',
//     'nav.new': 'បង្កើតថ្មី',
//     'nav.edit': 'កែប្រែ',
//     'nav.home': 'ទំព័រដើម',
//     'nav.catalog': 'បញ្ជីវគ្គសិក្សា',
//     'nav.progress': 'វឌ្ឍនភាព',
//     'nav.learningPaths': 'ផ្លូវសិក្សា',
//     'nav.assessments': 'ការវាយតម្លៃ',
//     'nav.assignments': 'ការងារ​/កិច្ចការផ្ទះ',
//     'nav.community': 'សហគមន៍',
//     'nav.career': 'អាជីព',
//     'nav.notifications': 'ការជូនដំណឹង',
//     'nav.profile': 'ប្រវត្តិ',
//     'actions.light': 'ពន្លឺ',
//     'actions.dark': 'ងងឹត',
//     'actions.system': 'ប្រព័ន្ធ',
//     'actions.toggleTheme': 'ប្ដូរទិដ្ឋភាព',
//     'actions.language': 'ភាសា'
//   }
// };

const STORAGE_KEY = 'cnx_locale';

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const availableLocales: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'km', label: 'Khmer', nativeLabel: 'ខ្មែរ' }
];

export const I18nProvider = ({
  children,
  initialLocale = 'en'
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const didInit = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!didInit.current) {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      const nextLocale = stored === 'en' || stored === 'km' ? stored : locale;

      if (nextLocale !== locale) {
        setLocaleState(nextLocale);
      }

      localStorage.setItem(STORAGE_KEY, nextLocale);
      document.documentElement.lang = nextLocale;
      didInit.current = true;
      return;
    }

    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const t = useCallback(
    (key: string) => translations[locale]?.[key] ?? translations.en[key] ?? key,
    [locale]
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t
    }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
};
