import type { Metadata } from 'next';
import { clsx } from 'clsx';

import { ReactLenisProvider } from '@/components/providers/react-lenis';
import { manrope, sora } from '@/lib/fonts';

import '@/styles/index.scss';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(sora.variable, manrope.variable)}>
        <ReactLenisProvider>{children}</ReactLenisProvider>
      </body>
    </html>
  );
}
