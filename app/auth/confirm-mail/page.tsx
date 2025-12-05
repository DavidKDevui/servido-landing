'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

function ConfirmMailContent() {
  const searchParams = useSearchParams();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [tokens, setTokens] = useState<{ accessToken: string | null; refreshToken: string | null }>({
    accessToken: null,
    refreshToken: null,
  });
  const [deepLinkPrefix, setDeepLinkPrefix] = useState<string>('servido://');
  const [hasValidated, setHasValidated] = useState<boolean>(false);

  useEffect(() => {
    // Ne pas re-valider si on a déjà validé une fois
    if (hasValidated) {
      return;
    }

    // Vérifier les paramètres de l'URL
    const checkValidity = () => {
      const hash = window.location.hash;
      
      // Parser le hash (format: #access_token=...&refresh_token=...&type=signup)
      const hashWithoutSharp = hash.substring(1);
      const hashParams = new URLSearchParams(hashWithoutSharp);
      
      // Extraire les tokens
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      // Vérifier si access_token est dans le hash
      const hasAccessToken = hashParams.has('access_token') || hash.includes('access_token');
      
      // Vérifier si refresh_token est dans le hash
      const hasRefreshToken = hashParams.has('refresh_token') || hash.includes('refresh_token');
      
      // Chercher type dans les query params
      const typeFromQuery = searchParams.get('type');
      
      // Chercher type dans le hash
      const typeFromHash = hashParams.get('type');
      
      // Vérifier si type=signup est présent (dans query params OU dans le hash)
      const hasSignupType = typeFromQuery === 'signup' || typeFromHash === 'signup';
      
      // Chercher env dans les query params ou dans le hash
      const envFromQuery = searchParams.get('env');
      const envFromHash = hashParams.get('env');
      const env = envFromQuery || envFromHash || 'prod';
      
      // Déterminer le préfixe du deep link selon l'environnement
      const prefix = env === 'prod' ? 'servido://' : 'exp://192.168.0.28:8081/';
      setDeepLinkPrefix(prefix);
      
      // Stocker les tokens
      setTokens({
        accessToken,
        refreshToken,
      });
      
      // La validation est réussie si on a type=signup ET access_token ET refresh_token dans le hash
      return hasSignupType && hasAccessToken && hasRefreshToken;
    };

    // Utiliser setTimeout pour éviter l'avertissement du linter
    // Nécessaire car window.location.hash n'est disponible qu'après le montage
    const timer = setTimeout(() => {
      const result = checkValidity();
      setIsValid(result);
      setHasValidated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [searchParams, hasValidated]);

  // Nettoyer l'URL après validation (dans un useEffect séparé pour éviter les conflits)
  useEffect(() => {
    if (isValid !== null) {
      // Attendre un peu pour que le state soit bien mis à jour
      const timer = setTimeout(() => {
        if (window.history && window.history.replaceState) {
          window.history.replaceState({}, '', window.location.pathname);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isValid]);

  // Redirection automatique vers le deep link après 1 seconde si la validation est réussie
  // useEffect(() => {
  //   if (isValid && tokens.accessToken && tokens.refreshToken) {
  //     const timer = setTimeout(() => {
  //       const deepLink = `${deepLinkPrefix}auth/confirm-mail?access_token=${encodeURIComponent(tokens.accessToken!)}&refresh_token=${encodeURIComponent(tokens.refreshToken!)}&type=signup`;
  //       window.location.href = deepLink;
  //     }, 250); // 1 seconde
  //     return () => clearTimeout(timer);
  //   }
  // }, [isValid, tokens.accessToken, tokens.refreshToken, deepLinkPrefix]);

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
          {isValid === null ? (
            // État de chargement
            <div className="bg-gray-950/50 border border-white/10 rounded-2xl p-8 sm:p-12 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 animate-spin" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                    />
                  </svg>
                </div>
              </div>
              <p className="text-gray-300 text-base sm:text-lg font-poppins">
                Vérification en cours...
              </p>
            </div>
          ) : isValid ? (
            // Message de succès
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
                Votre adresse email a été confirmée. Vous pouvez maintenant retourner dans l&apos;application et profiter de tous les services Servido.
              </p>

              {/* Bouton pour retourner à l'app */}
              {/* <button
                onClick={() => {
                  if (tokens.accessToken && tokens.refreshToken) {
                    // Construire l'URL du deep link avec les tokens et le type
                    const deepLink = `${deepLinkPrefix}auth/confirm-mail?access_token=${encodeURIComponent(tokens.accessToken)}&refresh_token=${encodeURIComponent(tokens.refreshToken)}&type=signup`;
                    window.location.href = deepLink;
                  } else {
                    // Fallback vers la page d'accueil si les tokens ne sont pas disponibles
                    window.location.href = '/';
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-100 text-black rounded-full font-medium text-sm sm:text-base hover:from-gray-50 hover:to-gray-200 transition-colors cursor-pointer font-poppins"
              >
                Retourner dans l&apos;application
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
              </button> */}
            </div>
          ) : (
            // Message d'erreur
            <div className="rounded-2xl p-8 sm:p-12 text-center">
              {/* Icône d'erreur */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </div>
              </div>

              {/* Titre */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 font-poppins">
                Erreur de confirmation
              </h1>

              {/* Message */}
              <p className="text-gray-300 text-base sm:text-lg mb-8 font-poppins leading-relaxed">
                Le lien de confirmation est invalide ou a expiré. Veuillez vérifier votre email ou demander un nouveau lien de confirmation.
              </p>

              {/* Boutons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-white text-white rounded-full font-medium text-sm sm:text-base hover:bg-white/10 transition-colors cursor-pointer font-poppins w-full sm:w-auto"
                >
                  Retour à l&apos;accueil
                </Link>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-100 text-black rounded-full font-medium text-sm sm:text-base hover:from-gray-50 hover:to-gray-200 transition-colors cursor-pointer font-poppins w-full sm:w-auto"
                >
                  Réessayer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function ConfirmMailPage() {
  return (
    <Suspense fallback={
      <>
        <Navbar />
        <div className="bg-black pt-16 sm:pt-20 min-h-screen flex items-center">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)`,
            backgroundSize: '25px 25px',
            maskImage: 'radial-gradient(ellipse at center, black 0%, black 20%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 20%, transparent 100%)'
          }}></div>
          <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16">
            <div className="bg-gray-950/50 border border-white/10 rounded-2xl p-8 sm:p-12 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 animate-spin" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                    />
                  </svg>
                </div>
              </div>
              <p className="text-gray-300 text-base sm:text-lg font-poppins">
                Chargement...
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    }>
      <ConfirmMailContent />
    </Suspense>
  );
}

