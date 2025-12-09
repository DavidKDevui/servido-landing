import type { Metadata } from "next";
import { Poppins, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Servido - Ta plateforme de services",
    template: "%s | Servido",
  },
  description: "Découvre Servido, ta plateforme de services moderne et innovante.",
  keywords: ["servido", "services", "plateforme", "application"],
  authors: [{ name: "Servido Team" }],
  creator: "Servido",
  publisher: "Servido",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  icons: {
    icon: "/img/store-logo.png",
    apple: "/img/store-logo.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Servido",
    title: "Servido - Votre plateforme de services",
    description: "Découvre Servido, ta plateforme de services moderne et innovante.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Servido",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servido - Votre plateforme de services",
    description: "Découvre Servido, ta plateforme de services moderne et innovante.",
    images: ["/og-image.jpg"],
    creator: "@servido",
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
    google: "XVyxMKC3rs1Q_EzuM-x16kbSJEWCd581KbFVKB8gTDg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${poppins.variable} ${playfairDisplay.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
