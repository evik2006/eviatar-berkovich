import type { Metadata } from 'next';
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
      <body style={{ background: '#000000', color: '#FFFFFF', overflowX: 'hidden' }}>
        <CustomCursor />
        <SocialIcons />
{children}
      </body>
    </html>
  );
}
