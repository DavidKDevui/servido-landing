"use client";

import Image from "next/image";
import { useState } from "react";

export function Hero() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-0">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-4 items-center">
            {/* Colonne gauche - Texte */}
            <div className="text-left sm:text-center lg:text-left lg:max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 sm:mb-6 leading-tight sm:leading-none tracking-[-1.5px] sm:tracking-[-2.9px] font-poppins">
                Des missions <span className="relative inline-block">
                  <span className="relative z-10">courtes</span>
                  <span className="absolute bottom-0 left-0 right-0 h-2 bg-white rounded-full opacity-60" style={{ transform: 'translateY(2px)' }}></span>
                </span>,
                <br />
                <span style={{ color: "#2563eb" }}>
                  des connexions <span className="relative inline-block">
                    <span className="relative z-10">rapides</span>
                    <span className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full opacity-60" style={{ transform: 'translateY(2px)' }}></span>
                  </span>
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-lg mx-0 sm:mx-auto lg:mx-0 leading-relaxed sm:leading-normal tracking-[-0.5px] sm:tracking-[-0.7px] font-poppins">
                La plateforme qui réunit les commerces et les freelances pour des missions de courtes durée.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center lg:items-start justify-center lg:justify-start">
                <button 
                  onClick={() => setShowModal(true)}
                  className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-100 text-black rounded-full font-medium text-sm sm:text-base hover:from-gray-50 hover:to-gray-200 transition-colors cursor-pointer font-poppins w-full sm:w-auto"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.08-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Télécharger sur iOS
                </button>
                <button 
                  onClick={() => setShowModal(true)}
                  className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-white text-white rounded-full font-medium text-sm sm:text-base hover:bg-white/10 transition-colors cursor-pointer font-poppins w-full sm:w-auto"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Télécharger sur Android
                </button>
              </div>
            </div>

          {/* Colonne droite - Image */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative z-10">
              <div className="relative">
                <div className="absolute inset-0 flex justify-center items-center -z-10">
                  <div className="w-full max-w-4xl h-[300px] sm:h-[400px] lg:h-[450px] rounded-full blur-3xl opacity-60 translate-x-0" style={{ background: 'radial-gradient(circle, #2563eb 0%, rgba(37, 99, 235, 0.4) 50%, transparent 70%)' }}></div>
                </div>
                
                {/* Icônes flottantes */}
                {/* <div className="absolute -top-8 -left-8 flex items-center justify-center animate-float z-20">
                  <div className="absolute -inset-4 w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)', filter: 'blur(12px)' }}></div>
                  <svg className="w-12 h-12 relative z-10" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#ffffff" }}>
                    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                  </svg>
                </div>
                <div className="absolute top-1/4 -right-12 flex items-center justify-center animate-float-delayed z-20">
                  <div className="absolute -inset-4 w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)', filter: 'blur(12px)' }}></div>
                  <svg className="w-10 h-10 relative z-10" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#ffffff" }}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="absolute bottom-1/4 -left-12 flex items-center justify-center animate-float-slow z-20">
                  <div className="absolute -inset-4 w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)', filter: 'blur(12px)' }}></div>
                  <svg className="w-10 h-10 relative z-10" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#ffffff" }}>
                    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                  </svg>
                </div>
                <div className="absolute -bottom-8 -right-8 flex items-center justify-center animate-float-delayed-slow z-20">
                  <div className="absolute -inset-4 w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)', filter: 'blur(12px)' }}></div>
                  <svg className="w-12 h-12 relative z-10" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#ffffff" }}>
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </div> */}
                
                <Image
                  src="/mockup.avif"
                  alt="Mockup de l'application mobile"
                  width={350}
                  height={260}
                  className="w-full max-w-[280px] sm:max-w-sm h-auto mx-auto"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Modal */}
    {showModal && (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={() => setShowModal(false)}
      >
        <div 
          className="bg-gray-950 rounded-2xl p-6 sm:p-8 max-w-md w-full border border-white/10 shadow-2xl mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 font-poppins">
              Application bientôt disponible
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed font-poppins">
              L&apos;application mobile Servido sera bientôt disponible sur l&apos;App Store et Google Play. Restez connecté pour être informé de son lancement !
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white hover:bg-gray-100 text-black rounded-full font-medium text-sm sm:text-base transition-colors cursor-pointer font-poppins w-full sm:w-auto"
            >
              Compris
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

