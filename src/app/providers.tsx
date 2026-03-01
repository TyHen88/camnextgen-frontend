'use client';

import { AuthProvider, I18nProvider, QueryProvider } from '@/lib';
import { ThemeProvider, ToastProvider } from '@/components/ui';

export const Providers = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>
        <I18nProvider>
            <QueryProvider>
                <AuthProvider>
                    {children}
                    <ToastProvider />
                </AuthProvider>
            </QueryProvider>
        </I18nProvider>
    </ThemeProvider>
);
