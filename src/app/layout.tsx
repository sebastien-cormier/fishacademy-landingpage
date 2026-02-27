import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const GA_MEASUREMENT_ID = 'G-3S3LR8C19D'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fishacademy.fr'),
  title: {
    default: 'Fish Academy - Organisez vos parties de poker entre amis',
    template: '%s | Fish Academy',
  },
  description:
    'Fish Academy simplifie la logistique, les achats, les caves, les comptes et le suivi de saison pour vos parties de poker privées entre amis.',
  keywords: [
    'poker',
    'parties privées',
    'cash game',
    'tournoi poker',
    'gestion poker',
    'poker entre amis',
    'organisation poker',
  ],
  authors: [{ name: 'Fish Academy' }],
  creator: 'Fish Academy',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://fishacademy.fr',
    siteName: 'Fish Academy',
    title: 'Fish Academy - Organisez vos parties de poker entre amis',
    description:
      'Fish Academy simplifie la logistique, les achats, les caves, les comptes et le suivi de saison pour vos parties de poker privées entre amis.',
    images: [
      {
        url: '/images/hero-friends-game.png',
        width: 1200,
        height: 630,
        alt: 'Fish Academy - Parties de poker entre amis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fish Academy - Organisez vos parties de poker entre amis',
    description:
      'Fish Academy simplifie la logistique, les achats, les caves, les comptes et le suivi de saison pour vos parties de poker privées entre amis.',
    images: ['/images/hero-friends-game.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/images/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className="flex min-h-screen flex-col bg-dark-950 text-dark-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
