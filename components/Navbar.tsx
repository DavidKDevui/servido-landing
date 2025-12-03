"use client";

import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-19 py-4">
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="/logo.png"
                alt="Servido Logo"
                width={120}
                height={40}
                priority
                className="h-7 sm:h-9 w-auto my-auto"
              />
            </Link>
          </div>
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
        </div>
      </div>
    </nav>
  );
}

