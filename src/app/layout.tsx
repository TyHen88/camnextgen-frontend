import type { Metadata } from 'next';
import { Battambang, Space_Grotesk, Work_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from './providers';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const body = Work_Sans({ subsets: ['latin'], variable: '--font-body' });
const khmer = Battambang({ subsets: ['khmer'], weight: ['400', '700'], variable: '--font-khmer' });

export const metadata: Metadata = {
    title: 'CamNextGen',
    description: 'Barrier-free technical education for the next generation of Cambodian IT professionals.',
    icons: {
        icon: '/favicon.ico',
        apple: '/icon.png',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={`${display.variable} ${body.variable} ${khmer.variable}`}
            suppressHydrationWarning
        >
            <body className="font-body" suppressHydrationWarning>
                <style dangerouslySetInnerHTML={{ __html: display.style }} />
                <style dangerouslySetInnerHTML={{ __html: body.style }} />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
