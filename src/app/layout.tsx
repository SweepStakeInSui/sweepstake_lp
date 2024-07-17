import '@styles/index.scss';
import '@styles/global.scss';

import type { Metadata } from 'next';

import { contentFont } from '@/constants/font-styles';
import Layout from '@/layouts';

import Providers from './providers';

export const metadata: Metadata = {
  // metadataBase: new URL(''),
  title: 'Sweepstake',
  description: 'Sweepstake',
  openGraph: {
    title: 'Sweepstake',
    description: 'Sweepstake',
    type: 'website',
    locale: 'en_IE',
  },
  twitter: {
    title: 'Sweepstake',
    description: 'Sweepstake',
    site: '@site',
    creator: '@croissain',
    card: 'summary_large_image',
  },
};

interface IRootLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayout): React.ReactNode {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico/" />
      </head>
      <body className={contentFont.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
