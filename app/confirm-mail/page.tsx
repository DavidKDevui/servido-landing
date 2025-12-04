import { generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = generateSEOMetadata({
  title: "Email Confirmé",
  description: "Votre adresse email a été confirmée avec succès. Vous pouvez maintenant retourner dans l'application Servido.",
  keywords: ["confirmation email", "email vérifié", "servido"],
  url: "/confirm-mail",
});

export default function ConfirmMailPage() {
  return (
    <>
      <Navbar />
      <div className="bg-black pt-16 sm:pt-20 min-h-screen flex items-center">
        {/* Texture en background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)`,
          backgroundSize: '25px 25px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 20%, transparent 100%)'
        }}></div>
        
        <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16">
          <div className="bg-gray-950/50 border border-white/10 rounded-2xl p-8 sm:p-12 text-center">
            {/* Icône de succès */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg 
                  className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
            </div>

            {/* Titre */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 font-poppins">
              Email confirmé avec succès
            </h1>

            {/* Message */}
            <p className="text-gray-300 text-base sm:text-lg mb-8 font-poppins leading-relaxed">
              Votre adresse email a été confirmée. Vous pouvez maintenant retourner dans l'application et profiter de tous les services Servido.
            </p>

            {/* Bouton pour retourner à l'app */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 font-poppins"
            >
              Retourner dans l'application
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

