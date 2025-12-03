"use client";

import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

export function CTA() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <section className="bg-black py-16 sm:py-20 relative">
      {/* Texture en background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '25px 25px',
        maskImage: 'radial-gradient(ellipse at center, black 0%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 20%, transparent 100%)'
      }}></div>
      {/* Lueur - commentée */}
      {/* <div className="absolute inset-0 flex justify-center items-end pb-8 pointer-events-none">
        <div className="w-full max-w-4xl h-[350px] rounded-full blur-3xl opacity-50" style={{ background: 'radial-gradient(circle, #2563eb 0%, rgba(37, 99, 235, 0.4) 50%, transparent 70%)' }}></div>
      </div> */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-12 sm:mb-16 leading-tight tracking-[-1.5px] sm:tracking-[-2px] font-poppins max-w-2xl mx-auto">
            Commence dès à présent <br /> <span style={{ color: "#2563eb" }}>à recevoir <span className="relative inline-block">
              <span className="relative z-10">des missions</span>
              <span className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full opacity-60" style={{ transform: 'translateY(2px)' }}></span>
            </span></span>
          </h2>
          
          {/* QR Codes et Boutons */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center justify-center w-full">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white rounded-lg border-6 border-white shadow-2xl">
                <QRCodeSVG
                  value="https://apps.apple.com/app/servido"
                  size={160}
                  level="H"
                  includeMargin={false}
                />
              </div>
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-b from-white to-gray-100 text-black rounded-full font-medium text-base hover:from-gray-50 hover:to-gray-200 transition-colors cursor-pointer font-poppins"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.08-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Télécharger sur iOS
              </button>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white rounded-lg border-6 border-white shadow-2xl">
                <QRCodeSVG
                  value="https://play.google.com/store/apps/details?id=com.servido"
                  size={160}
                  level="H"
                  includeMargin={false}
                />
              </div>
              <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white rounded-full font-medium text-base hover:bg-white/10 transition-colors cursor-pointer font-poppins">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Télécharger sur Android
              </button>
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

