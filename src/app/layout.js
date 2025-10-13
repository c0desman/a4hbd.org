import { Inter } from 'next/font/google';
import "./globals.css";
import Script from 'next/script';
import Navbar from "@/components/essentials/navbar";
import Footer from "@/components/essentials/footer";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500']
});

// Base URL for absolute paths
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://a4hbd.org';

export const metadata = {
  title: "Aid For Humanity - Together we can make a difference",
  description: "Aid For Humanity is a non-profit organization dedicated to providing support, relief, and development programs in Bangladesh and beyond.",
  keywords: "Aid, Humanity, Help, Support, Charity, Bangladesh, NGO, Non-Profit, Volunteer, Donate, Community, Relief, Development, Education, Health, Environment, Social Work",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Aid For Humanity - Together we can make a difference",
    description: "A non-profit organization dedicated to providing support, relief, and development programs in Bangladesh and beyond.",
    url: baseUrl,
    siteName: "Aid For Humanity",
    images: [
      {
        url: `${baseUrl}/logo/a4h.jpg`,
        width: 1200,
        height: 630,
        alt: "Aid For Humanity - Making a difference together",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aid For Humanity - Together we can make a difference",
    description: "A non-profit organization dedicated to providing support, relief, and development programs in Bangladesh and beyond.",
    images: [`${baseUrl}/logo/a4h.jpg`],
    site: "@AidForHumanity",
    creator: "@AidForHumanity",
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
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
  icons: {
    icon: [
      { url: '/logo/favicon.png' },
      new URL('/logo/favicon.png', baseUrl),
    ],
    shortcut: [
      { url: '/logo/favicon.png' },
      new URL('/logo/favicon.png', baseUrl),
    ],
    apple: [
      { url: '/logo/favicon.png' },
      new URL('/logo/favicon.png', baseUrl),
    ],
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/logo/favicon.png',
    },
  },
  manifest: `${baseUrl}/manifest.json`, // Consider adding a web app manifest
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <head>
        {/* Additional meta tags for better SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="alternate" type="application/rss+xml" href={`${baseUrl}/rss.xml`} /> {/* Consider adding RSS feed */}
      </head>
      <body>
        {/* FB root container required by SDK */}
        <div id="fb-root" />

        {/* Load Facebook SDK once for the whole app */}
        <Script
          id="facebook-jssdk"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v24.0&appId=1849384698982784"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}