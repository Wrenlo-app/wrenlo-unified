import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wrenlo | AI Front Desk & Lead Recovery for Home Service Contractors",
  description: "Wrenlo is an AI-powered front desk and lead recovery solution designed for U.S. home service contractors. Never miss a lead again with intelligent call handling, text responses, and lead management automation.",
  keywords: [
    "AI front desk",
    "lead recovery",
    "home service contractors",
    "HVAC software",
    "plumbing software",
    "electrical software",
    "AI phone answering",
    "lead management",
    "contractor software",
  ],
  authors: [{ name: "Wrenlo" }],
  creator: "Wrenlo",
  publisher: "Wrenlo",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL("https://www.wrenlo.co"),
  alternates: {
    canonical: "https://www.wrenlo.co",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.wrenlo.co",
    siteName: "Wrenlo",
    title: "Wrenlo | AI Front Desk & Lead Recovery for Home Service Contractors",
    description: "Wrenlo is an AI-powered front desk and lead recovery solution designed for U.S. home service contractors. Never miss a lead again with intelligent call handling, text responses, and lead management automation.",
    images: [
      {
        url: "https://www.wrenlo.co/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wrenlo - AI Front Desk for Home Service Contractors",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wrenlo | AI Front Desk & Lead Recovery for Home Service Contractors",
    description: "Never miss a lead again. Wrenlo automates customer calls, texts, and lead management for home service contractors.",
    creator: "@wrenlo",
    images: ["https://www.wrenlo.co/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon-128x128.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD Structured Data for Organization */}
  <link rel="icon" href="/favicon.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" href="/favicon-128x128.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Wrenlo",
              url: "https://www.wrenlo.co",
              logo: "https://www.wrenlo.co/wrenlo-logo.png",
              description: "AI-powered front desk and lead recovery solution for home service contractors",
              sameAs: [
                "https://twitter.com/wrenlo",
                "https://linkedin.com/company/wrenlo-ai",
                // Add your social media URLs
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                // Add your phone number if desired
              },
            }),
          }}
        />
        {/* JSON-LD Structured Data for SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Wrenlo",
              description: "AI Front Desk and Lead Recovery for Home Service Contractors",
              url: "https://www.wrenlo.co",
              applicationCategory: "BusinessApplication",
              offers: {
                "@type": "Offer",
                price: "Contact for pricing",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "150",
                // Update with your actual ratings
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}