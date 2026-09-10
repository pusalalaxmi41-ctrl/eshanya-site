import type { Metadata } from 'next';
import { IBM_Plex_Mono, Inter, Manrope } from 'next/font/google';
import { business } from '../src/data/business';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: business.seo.title,
  description: business.seo.description,
  openGraph: {
    title: business.seo.title,
    description: business.seo.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: business.seo.title,
    description: business.seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${manrope.variable} ${mono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
