"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Fermer le menu mobile
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Offset pour la navbar fixe
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-19 py-4">
          <div className="flex-shrink-0">
            <Link href="/" className="block" onClick={handleLinkClick}>
              <Image
                src="/img/transparent-logo.png"
                alt="Servido Logo"
                width={120}
                height={40}
                priority
                className="h-7 sm:h-9 w-auto my-auto"
              />
            </Link>
          </div>
          
          {/* Menu desktop */}
          <div className="hidden sm:flex items-center gap-6 lg:gap-8">
            <a
              href="#features"
              onClick={(e) => handleScroll(e, "features")}
              className="text-sm sm:text-base text-white hover:text-blue-400 transition-colors duration-200 font-poppins cursor-pointer"
            >
              Features
            </a>
            <a
              href="#faq"
              onClick={(e) => handleScroll(e, "faq")}
              className="text-sm sm:text-base text-white hover:text-blue-400 transition-colors duration-200 font-poppins cursor-pointer"
            >
              FAQ
            </a>
            <Link
              href="/blog"
              className="text-sm sm:text-base text-white hover:text-blue-400 transition-colors duration-200 font-poppins cursor-pointer"
            >
              Blog
            </Link>
          </div>

          {/* Bouton hamburger mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden flex flex-col gap-1.5 p-2 text-white hover:text-blue-400 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Menu mobile */}
        <div
          className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-4 border-t border-white/10 mt-4">
            <a
              href="#features"
              onClick={(e) => handleScroll(e, "features")}
              className="block text-base text-white hover:text-blue-400 transition-colors duration-200 font-poppins cursor-pointer"
            >
              Features
            </a>
            <a
              href="#faq"
              onClick={(e) => handleScroll(e, "faq")}
              className="block text-base text-white hover:text-blue-400 transition-colors duration-200 font-poppins cursor-pointer"
            >
              FAQ
            </a>
            <Link
              href="/blog"
              onClick={handleLinkClick}
              className="block text-base text-white hover:text-blue-400 transition-colors duration-200 font-poppins cursor-pointer"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
