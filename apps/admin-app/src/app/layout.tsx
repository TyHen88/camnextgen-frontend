import './globals.css';
import type { Metadata } from 'next';
import { Battambang, Space_Grotesk, Work_Sans } from 'next/font/google';
import { Providers } from './providers';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const body = Work_Sans({ subsets: ['latin'], variable: '--font-body' });
const khmer = Battambang({ subsets: ['khmer'], weight: ['400', '700'], variable: '--font-khmer' });

export const metadata: Metadata = {
  title: 'CamNextGen Admin',
  description: 'CamNextGen administration portal.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${khmer.variable}`}>
      <body className="font-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
