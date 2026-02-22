import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@/components/Analytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cryoseat.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CryoSeat — Personal Microclimate for Deep Work",
    template: "%s | CryoSeat",
  },
  description:
    "The retrofit heated & cooled seat system for your existing office chair. Stay comfortable, stay focused — on demand.",
  keywords: [
    "heated office chair pad",
    "cooled office chair",
    "office chair temperature control",
    "remote work comfort",
    "home office accessories",
    "ergonomic chair pad",
    "biohacking workspace",
  ],
  authors: [{ name: "CryoSeat" }],
  creator: "CryoSeat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "CryoSeat",
    title: "CryoSeat — Personal Microclimate for Deep Work",
    description:
      "Heated & cooled seat pad that retrofits your existing office chair. Demand test — join the waitlist.",
    images: [
      {
        url: "/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "CryoSeat — Personal Microclimate for Deep Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CryoSeat — Personal Microclimate for Deep Work",
    description:
      "Stop fighting the thermostat. Retrofit your chair with dual heating + cooling. Join the waitlist.",
    images: ["/images/og-card.png"],
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
  verification: {
    // google: "your-google-verification-id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A0A0B" />
      </head>
      <body className="bg-bg text-neutral-100 antialiased">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
