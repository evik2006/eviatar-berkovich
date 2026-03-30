import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';
import SocialIcons from '@/components/SocialIcons';

export const metadata: Metadata = {
  title: 'Eviatar Berkovich — Director & Cinematographer',
  description: 'Portfolio of Eviatar Berkovich, Director and Cinematographer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        {/* Preload the hero animation so it's buffered before paint */}
        <link rel="preload" as="video" href="/animation-logo.mp4" type="video/mp4" />
      </head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-2DE1K3N9FG" strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-2DE1K3N9FG');
      `}</Script>
      <body style={{ background: '#000000', color: '#FFFFFF', overflowX: 'hidden' }}>
        <CustomCursor />
        <SocialIcons />
{children}
      </body>
    </html>
  );
}
