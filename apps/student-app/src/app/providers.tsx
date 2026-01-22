'use client';

import { AuthProvider, I18nProvider, QueryProvider } from '@camnextgen/lib';
import { ThemeProvider, ToastProvider } from '@camnextgen/ui';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <ToastProvider />
    <I18nProvider>
      <QueryProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryProvider>
    </I18nProvider>
  </ThemeProvider>
);
