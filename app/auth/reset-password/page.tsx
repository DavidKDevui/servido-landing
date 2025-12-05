'use client';

import { useEffect, useState, Suspense, useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { resetPassword } from '@/app/actions/reset-password';
import { createClient } from '@/lib/supabase/client';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [tokens, setTokens] = useState<{ accessToken: string | null; refreshToken: string | null }>({
    accessToken: null,
    refreshToken: null,
  });
  // const [deepLinkPrefix, setDeepLinkPrefix] = useState<string>('servido://');
  const [hasValidated, setHasValidated] = useState<boolean>(false);
  const [sessionReady, setSessionReady] = useState<boolean>(false);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [state, formAction, isPending] = useActionState<{
    error?: string;
    success?: boolean;
    message?: string;
  } | null, FormData>(resetPassword, null);

  useEffect(() => {
    // Ne pas re-valider si on a déjà validé une fois
    if (hasValidated) {
      return;
    }

    // Vérifier les paramètres de l'URL
    const checkValidity = () => {
      const hash = window.location.hash;
      
      // Parser le hash (format: #access_token=...&refresh_token=...&type=recovery)
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
      
      // Vérifier si type=recovery est présent (dans query params OU dans le hash)
      // Le type=recovery est obligatoire
      const hasRecoveryType = typeFromQuery === 'recovery' || typeFromHash === 'recovery';
      
      // Chercher env dans les query params ou dans le hash
      // const envFromQuery = searchParams.get('env');
      // const envFromHash = hashParams.get('env');
      // const env = envFromQuery || envFromHash || 'prod';
      
      // Déterminer le préfixe du deep link selon l'environnement
      // const prefix = env === 'prod' ? 'servido://' : 'exp://192.168.0.28:8081/';
      // setDeepLinkPrefix(prefix);
      
      // Stocker les tokens
      setTokens({
        accessToken,
        refreshToken,
      });
      
      // La validation est réussie si on a type=recovery ET access_token ET refresh_token dans le hash
      return hasAccessToken && hasRefreshToken && hasRecoveryType;
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

  // Créer la session Supabase avec les tokens si la validation est réussie
  useEffect(() => {
    if (isValid && tokens.accessToken && tokens.refreshToken) {
      const createSession = async () => {
        console.log('[Reset Password] Tentative de création de session...');
        console.log('[Reset Password] Access token présent:', tokens.accessToken ? `${tokens.accessToken.substring(0, 20)}...` : 'null');
        console.log('[Reset Password] Refresh token présent:', tokens.refreshToken ? `${tokens.refreshToken.substring(0, 20)}...` : 'null');
        
        try {
          // Vérifier que les variables d'environnement sont définies
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
          const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
          
          if (!supabaseUrl || !supabaseAnonKey) {
            const errorMsg = 'Configuration Supabase manquante. Vérifiez que NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sont définies dans votre fichier .env.local';
            console.error('[Reset Password]', errorMsg);
            setSessionError(errorMsg);
            setSessionReady(false);
            return;
          }

          const supabase = createClient();
          console.log('[Reset Password] Client Supabase créé, appel de setSession...');
          
          const { data, error } = await supabase.auth.setSession({
            access_token: tokens.accessToken!,
            refresh_token: tokens.refreshToken!,
          });

          if (error) {
            const errorMsg = error.message || 'Erreur lors de la création de la session';
            console.error('[Reset Password] Erreur lors de la création de session:', error);
            setSessionError(errorMsg);
            setSessionReady(false);
          } else if (data.session) {
            console.log('[Reset Password] Session créée avec succès:', {
              userId: data.session.user?.id,
              email: data.session.user?.email,
              expiresAt: data.session.expires_at,
            });
            setSessionError(null); // Réinitialiser l'erreur en cas de succès
            // Attendre un peu pour que les cookies soient bien synchronisés
            setTimeout(() => {
              console.log('[Reset Password] Session prête, cookies synchronisés');
              setSessionReady(true);
            }, 500);
          } else {
            const errorMsg = 'Aucune session retournée après la création';
            console.warn('[Reset Password] setSession réussi mais aucune session retournée');
            setSessionError(errorMsg);
            setSessionReady(false);
          }
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue lors de la création de la session';
          console.error('[Reset Password] Erreur lors de la création de session (catch):', error);
          setSessionError(errorMsg);
          setSessionReady(false);
        }
      };

      createSession();
    }
  }, [isValid, tokens.accessToken, tokens.refreshToken]);

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
  //       const deepLink = `${deepLinkPrefix}auth/reset-password?access_token=${encodeURIComponent(tokens.accessToken!)}&refresh_token=${encodeURIComponent(tokens.refreshToken!)}&type=recovery`;
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
                {state?.success ? 'Mot de passe modifié' : 'Réinitialiser votre mot de passe'}
              </h1>

              {/* Message de succès après modification */}
              {state?.success && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm font-poppins">{state.message}</p>
                </div>
              )}

              {/* Message d'erreur de session */}
              {sessionError && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm font-poppins">{sessionError}</p>
                </div>
              )}

              {/* Message d'erreur du formulaire */}
              {state?.error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm font-poppins">{state.error}</p>
                </div>
              )}

              {/* Message de chargement de session */}
              {!sessionReady && !sessionError && !state?.success && (
                <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-400 text-sm font-poppins flex items-center gap-2">
                    <svg 
                      className="w-4 h-4 animate-spin" 
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
                    Connexion en cours...
                  </p>
                </div>
              )}

              {/* Formulaire de réinitialisation */}
              {!state?.success && !sessionError && (
                <form action={formAction} className="space-y-4 text-left">
                  {/* Ancien mot de passe */}
                  <div>
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-300 mb-2 font-poppins">
                      Ancien mot de passe
                    </label>
                    <input
                      type="password"
                      id="oldPassword"
                      name="oldPassword"
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins"
                      placeholder="Entrez votre ancien mot de passe"
                    />
                  </div>

                  {/* Nouveau mot de passe */}
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2 font-poppins">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      required
                      minLength={6}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins"
                      placeholder="Entrez votre nouveau mot de passe"
                    />
                  </div>

                  {/* Confirmation du nouveau mot de passe */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2 font-poppins">
                      Confirmer le nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      minLength={6}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins"
                      placeholder="Confirmez votre nouveau mot de passe"
                    />
                  </div>

                  {/* Bouton de soumission */}
                  <button
                    type="submit"
                    disabled={isPending || !sessionReady || !!sessionError}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-100 text-black rounded-full font-medium text-sm sm:text-base hover:from-gray-50 hover:to-gray-200 transition-colors cursor-pointer font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <>
                        <svg 
                          className="w-5 h-5 animate-spin" 
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
                        Modification en cours...
                      </>
                    ) : (
                      'Modifier le mot de passe'
                    )}
                  </button>
                </form>
              )}

              {/* Bouton retour à l'accueil après succès */}
              {state?.success && (
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-100 text-black rounded-full font-medium text-sm sm:text-base hover:from-gray-50 hover:to-gray-200 transition-colors cursor-pointer font-poppins mt-4"
                >
                  Retour à l&apos;accueil
                </Link>
              )}
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
                Lien invalide ou expiré
              </h1>

              {/* Message */}
              <p className="text-gray-300 text-base sm:text-lg mb-8 font-poppins leading-relaxed">
                Le lien de réinitialisation de mot de passe est invalide ou a expiré. Veuillez vérifier votre email ou demander un nouveau lien de réinitialisation.
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

export default function ResetPasswordPage() {
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
      <ResetPasswordContent />
    </Suspense>
  );
}

