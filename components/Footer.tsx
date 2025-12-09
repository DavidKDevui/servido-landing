import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/confidentialite"
              className="text-gray-400 text-sm font-poppins hover:text-white transition-colors"
            >
              Politique de confidentialité
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/conditions-utilisation"
              className="text-gray-400 text-sm font-poppins hover:text-white transition-colors"
            >
              Conditions d&apos;utilisation
            </Link>
          </div>
          <p className="text-gray-400 text-sm font-poppins">
            © {new Date().getFullYear()} Servido. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}







