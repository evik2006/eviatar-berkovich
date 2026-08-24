import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';

const SITE_URL = 'https://eviatarberkovich.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Eviatar Berkovich (אביתר ברקוביץ) — Director & Cinematographer',
    template: '%s | Eviatar Berkovich',
  },
  description:
    'Eviatar Berkovich (אביתר ברקוביץ) is an Israeli director and cinematographer based in Tel Aviv, known for music videos, live sessions, and portrait photography for artists across the Israeli music scene.',
  keywords: [
    'Eviatar Berkovich',
    'אביתר ברקוביץ',
    'Eviatar Berkovitz',
    'director',
    'cinematographer',
    'music video director Israel',
    'Tel Aviv cinematographer',
  ],
  authors: [{ name: 'Eviatar Berkovich', url: SITE_URL }],
  creator: 'Eviatar Berkovich',
  publisher: 'Eviatar Berkovich',
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'profile',
    url: SITE_URL,
    siteName: 'Eviatar Berkovich',
    title: 'Eviatar Berkovich (אביתר ברקוביץ) — Director & Cinematographer',
    description:
      'Israeli director and cinematographer based in Tel Aviv — music videos, live sessions, and portrait photography.',
    locale: 'en_US',
    alternateLocale: 'he_IL',
    images: [{ url: '/logo1.png', width: 512, height: 512, alt: 'Eviatar Berkovich' }],
  },
  twitter: {
    card: 'summary',
    title: 'Eviatar Berkovich (אביתר ברקוביץ) — Director & Cinematographer',
    description: 'Israeli director and cinematographer based in Tel Aviv.',
    images: ['/logo1.png'],
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Eviatar Berkovich',
  alternateName: ['אביתר ברקוביץ', 'Eviatar Berkovitz'],
  url: SITE_URL,
  image: `${SITE_URL}/logo1.png`,
  jobTitle: 'Director & Cinematographer',
  nationality: 'Israeli',
  workLocation: {
    '@type': 'Place',
    name: 'Tel Aviv, Israel',
  },
  sameAs: [
    'https://www.instagram.com/eviatar_2006/',
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
{children}
      </body>
    </html>
  );
}
