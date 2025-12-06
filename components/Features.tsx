"use client";

import Image from "next/image";

const carouselImages = [
  { 
    src: "/carousel/IMG_0725.PNG", 
    alt: "Profil utilisateur Servido - Gère ton profil de freelance ou de commerce",
    title: "Consultez et gérez vos missions"
  },
  { 
    src: "/carousel/IMG_0726.PNG", 
    alt: "Carte interactive Servido - Visualise les missions disponibles sur une carte",
    title: "Planifiez vos disponibilités hebdo"
  },
  { 
    src: "/carousel/IMG_0730.PNG", 
    alt: "Fonctionnalités Servido - Découvre toutes les fonctionnalités de la plateforme",
    title: "Renseignez vous sur les commerces"
  },
  { 
    src: "/carousel/IMG_0727.PNG", 
    alt: "Messagerie Servido - Communique directement avec les commerces et freelances",
    title: "Communiquez avec les commerces"
  },
  { 
    src: "/carousel/IMG_0728.PNG", 
    alt: "Notifications Servido - Reste informé des nouvelles missions et messages",
    title: "Gardez un oeil sur votre visibilité"
  },
  { 
    src: "/carousel/IMG_0729.PNG", 
    alt: "Historique Servido - Consulte l'historique de tes missions et paiements",
    title: "Explorez les commerces aux alentours"
  },

];

export function Features() {

  return (
    <section id="features" className="bg-black py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 sm:mb-6 leading-tight tracking-[-1.5px] sm:tracking-[-2px] font-poppins max-w-3xl mx-auto">
          Trouve des missions à proximité,<br /> <span style={{ color: "#2563eb" }}>de manière <span className="relative inline-block">
                  <span className="relative z-10">spontanée</span>
                  <span className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full opacity-60" style={{ transform: 'translateY(2px)' }}></span>
                </span></span>
          </h2>

        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            {/* Gradient gauche */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 30%, transparent 100%)'
              }}
            />
            {/* Gradient droite */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 30%, transparent 100%)'
              }}
            />
            <div 
              className="flex items-center gap-4 animate-scroll"
              style={{ '--image-count': carouselImages.length } as React.CSSProperties}
            >
              {/* Dupliquer les images pour l'effet infini */}
              {[...carouselImages, ...carouselImages].map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[200px] sm:w-[240px] border border-white/5 rounded-2xl p-2 flex flex-col bg-white/6"
                  style={{ aspectRatio: "9/16" }}
                >
                  {/* Image - 85% de la hauteur */}
                  <div
                    className="relative rounded-xl overflow-hidden flex-shrink-0"
                    style={{ height: "85%" }}
                  >
                    <Image
                      src={image.src}
                      alt={`${image.alt} - ${image.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 200px, 240px"
                      loading="lazy"
                      quality={85}
                    />
                  </div>
                  {/* Texte - 15% de la hauteur */}
                  <div className="flex-1 flex items-center pt-4 pb-1">
                    <p className="px-2 text-white text-sm sm:text-base font-poppins font-semibold text-left w-full tracking-tight">
                      {image.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

