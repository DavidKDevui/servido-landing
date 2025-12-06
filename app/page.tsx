import { generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const baseMetadata = generateSEOMetadata({
  title: "Des extras courts, des connexions rapides",
  description: "Bienvenue sur Servido, ta plateforme de services moderne et innovante. Découvre nos solutions adaptées à tes besoins.",
  keywords: ["servido", "services", "plateforme", "accueil", "solutions"],
  url: "/",
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Servido | Des extras courts, des connexions rapides",
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Servido | Des extras courts, des connexions rapides",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Servido | Des extras courts, des connexions rapides",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Servido",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/img/store-logo.png`,
  description: "Plateforme de services moderne et innovante",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Servido",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <Navbar />
      <div className="bg-black pt-16 sm:pt-20 relative">
        {/* Texture en background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.13) 1px, transparent 0)`,
          backgroundSize: '35px 35px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 30%, transparent 100%)'
        }}></div>
        <div className="relative z-10">
          <Hero />
        </div>
      </div>
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
