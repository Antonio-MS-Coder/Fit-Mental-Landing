import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/data/constants";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: SITE_CONFIG.authors,
  creator: SITE_CONFIG.creator,
  publisher: 'Gobierno de México - SECTUR',
  applicationName: SITE_CONFIG.name,
  generator: 'Next.js 14',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e40af' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' }
  ],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  category: 'government',
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon.ico', sizes: '48x48' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/images/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/images/safari-pinned-tab.svg', color: '#1e40af' },
    ],
  },
  other: {
    'msapplication-TileColor': '#1e40af',
    'msapplication-config': '/browserconfig.xml'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Government compliance */}
        <meta name="government-site" content="true" />
        <meta name="jurisdiction" content="Mexico" />
        <meta name="agency" content="SECTUR" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GovernmentOrganization",
              name: "Turismo Mundial AO",
              description: SITE_CONFIG.description,
              url: SITE_CONFIG.url,
              logo: `${SITE_CONFIG.url}/images/ao-logo.svg`,
              sameAs: [
                "https://www.gob.mx/sectur",
                "https://www.visitmexico.com"
              ],
              parentOrganization: {
                "@type": "GovernmentOrganization",
                name: "Gobierno de México",
                url: "https://www.gob.mx"
              },
              areaServed: "Mexico",
              serviceType: "Tourism Employment Platform",
              knowsAbout: [
                "Tourism Jobs",
                "Professional Certification",
                "Tourism Experiences",
                "Travel Safety"
              ]
            })
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
