import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/essentials/navbar";
import Footer from "@/components/essentials/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aid For Humanity",
  description: "Together we can make a difference",
  keywords: "Aid, Humanity, Help, Support, Charity",
  local: "en-US",
  type: "website",
  url: "https://a4hbd.org",
  favicons: {
    apple: "/apple-touch-icon.png",
    android: "/android-chrome-192x192.png",
    ms: "/mstile-150x150.png",
    safari: "/safari-pinned-tab.svg",
  },
  image: {
    src: "/og-image.png",
    alt: "Og Image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href={metadata.favicons.apple} />
        <link rel="icon" href={metadata.favicons.android} />
        <link rel="icon" href={metadata.favicons.ms} />
        <title>{`${metadata.title} - ${metadata.description}`}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="og:title" content={metadata.title} />
        <meta name="og:description" content={metadata.description} />
        <meta name="og:image" alt={metadata.image.alt} content={metadata.image.src} />
      </head>
      <body className="">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}