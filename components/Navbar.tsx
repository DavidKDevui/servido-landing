import Image from "next/image";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-19 py-4">
          <div className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Servido Logo"
              width={120}
              height={40}
              priority
              className="h-9 w-auto my-auto"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

