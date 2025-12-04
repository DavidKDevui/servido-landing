import { generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = generateSEOMetadata({
  title: "Conditions d'Utilisation",
  description: "Consultez les conditions d'utilisation de Servido. Ces conditions régissent votre utilisation de notre plateforme de services et définissent vos droits et obligations en tant qu'utilisateur.",
  keywords: ["conditions d'utilisation", "CGU", "conditions générales", "règles", "servido", "plateforme"],
  url: "/conditions-utilisation",
});

export default function ConditionsUtilisationPage() {
  return (
    <>
      <Navbar />
      <div className="bg-black pt-16 sm:pt-20 min-h-screen">
        {/* Texture en background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)`,
          backgroundSize: '25px 25px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 20%, transparent 100%)'
        }}></div>
        
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16">
          {/* Breadcrumb */}
          <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Conditions d'Utilisation" }]} />
          
          {/* En-tête */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 sm:mb-6 leading-tight tracking-[-1.5px] sm:tracking-[-2px] font-poppins">
              <span className="text-white">Conditions d'Utilisation</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-poppins">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Contenu */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-gray-950/50 border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8">
              
              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  1. Acceptation des conditions
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  En accédant et en utilisant la plateforme Servido, vous acceptez d'être lié par les présentes conditions 
                  d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
                </p>
                <p className="text-gray-300 leading-relaxed font-poppins">
                  Ces conditions s'appliquent à tous les utilisateurs de la plateforme, y compris les prestataires de services 
                  et les clients.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  2. Description du service
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Servido est une plateforme en ligne qui met en relation des prestataires de services avec des clients. 
                  Nous facilitons les connexions et les transactions, mais nous ne sommes pas partie prenante dans les 
                  contrats de service conclus entre les utilisateurs.
                </p>
                <p className="text-gray-300 leading-relaxed font-poppins">
                  Nous nous réservons le droit de modifier, suspendre ou interrompre tout ou partie de la plateforme à tout moment, 
                  avec ou sans préavis.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  3. Inscription et compte utilisateur
                </h2>
                <h3 className="text-xl font-semibold text-white mb-3 font-poppins">
                  3.1. Éligibilité
                </h3>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Pour utiliser Servido, vous devez :
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 font-poppins mb-4">
                  <li>Être âgé d'au moins 18 ans</li>
                  <li>Avoir la capacité juridique de contracter</li>
                  <li>Fournir des informations exactes et à jour</li>
                  <li>Maintenir la sécurité de votre compte et de votre mot de passe</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-white mb-3 font-poppins">
                  3.2. Responsabilité du compte
                </h3>
                <p className="text-gray-300 leading-relaxed font-poppins">
                  Vous êtes responsable de toutes les activités qui se produisent sous votre compte. Vous devez immédiatement 
                  nous notifier de toute utilisation non autorisée de votre compte ou de toute autre violation de sécurité.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  4. Comportement des utilisateurs
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  En utilisant Servido, vous vous engagez à :
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 font-poppins mb-4">
                  <li>Respecter toutes les lois et réglementations applicables</li>
                  <li>Ne pas publier de contenu illégal, offensant, diffamatoire ou frauduleux</li>
                  <li>Ne pas harceler, menacer ou nuire à d'autres utilisateurs</li>
                  <li>Ne pas utiliser la plateforme à des fins frauduleuses ou illégales</li>
                  <li>Ne pas tenter d'accéder de manière non autorisée à la plateforme ou à d'autres comptes</li>
                  <li>Ne pas transmettre de virus, logiciels malveillants ou code nuisible</li>
                  <li>Respecter les droits de propriété intellectuelle d'autrui</li>
                </ul>
                <p className="text-gray-300 leading-relaxed font-poppins">
                  La violation de ces règles peut entraîner la suspension ou la résiliation de votre compte.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  5. Prestations de services
                </h2>
                <h3 className="text-xl font-semibold text-white mb-3 font-poppins">
                  5.1. Relation entre utilisateurs
                </h3>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Servido agit uniquement comme intermédiaire. Le contrat de service est conclu directement entre le prestataire 
                  et le client. Servido n'est pas partie à ce contrat et n'assume aucune responsabilité concernant la qualité, 
                  la sécurité ou la légalité des services fournis.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3 font-poppins">
                  5.2. Obligations des prestataires
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 font-poppins mb-4">
                  <li>Fournir des services de qualité professionnelle</li>
                  <li>Respecter les délais convenus</li>
                  <li>Communiquer de manière claire et professionnelle</li>
                  <li>Respecter toutes les lois et réglementations applicables</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-white mb-3 font-poppins">
                  5.3. Obligations des clients
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 font-poppins">
                  <li>Fournir des informations précises sur les services demandés</li>
                  <li>Effectuer les paiements dans les délais convenus</li>
                  <li>Respecter les termes du contrat de service</li>
                  <li>Traiter les prestataires avec respect et professionnalisme</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  6. Paiements et frais
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Les paiements sont traités par des prestataires de services de paiement tiers sécurisés. Servido peut prélever 
                  des frais de plateforme sur les transactions, qui seront clairement indiqués avant la finalisation de la transaction.
                </p>
                <p className="text-gray-300 leading-relaxed font-poppins">
                  Les remboursements sont soumis à notre politique de remboursement et aux conditions spécifiques de chaque transaction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  7. Propriété intellectuelle
                </h2>
                <h3 className="text-xl font-semibold text-white mb-3 font-poppins">
                  7.1. Contenu de la plateforme
                </h3>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Tous les contenus de la plateforme Servido, y compris mais sans s'y limiter, les textes, graphiques, logos, 
                  icônes, images, clips audio et logiciels, sont la propriété de Servido ou de ses concédants de licence et sont 
                  protégés par les lois sur la propriété intellectuelle.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3 font-poppins">
                  7.2. Contenu des utilisateurs
                </h3>
                <p className="text-gray-300 leading-relaxed font-poppins">
                  En publiant du contenu sur Servido, vous accordez à Servido une licence mondiale, non exclusive, transférable, 
                  sous-licenciable et gratuite pour utiliser, reproduire, modifier et distribuer ce contenu dans le cadre de 
                  l'exploitation de la plateforme.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  8. Limitation de responsabilité
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Servido est fourni "en l'état" et "selon disponibilité". Dans la mesure permise par la loi, nous déclinons 
                  toute garantie, expresse ou implicite, concernant la plateforme.
                </p>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Servido ne sera pas responsable de :
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 font-poppins">
                  <li>Les dommages directs, indirects, accessoires ou consécutifs résultant de l'utilisation de la plateforme</li>
                  <li>La qualité, la sécurité ou la légalité des services fournis par les prestataires</li>
                  <li>Les litiges entre utilisateurs</li>
                  <li>Les interruptions ou erreurs de la plateforme</li>
                  <li>La perte de données ou d'informations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  9. Indemnisation
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins">
                  Vous acceptez d'indemniser et de dégager Servido de toute responsabilité concernant les réclamations, pertes, 
                  dommages, responsabilités et frais (y compris les frais d'avocat) résultant de votre utilisation de la plateforme, 
                  de votre violation de ces conditions ou de votre violation des droits d'autrui.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  10. Résiliation
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Vous pouvez résilier votre compte à tout moment en nous contactant ou via les paramètres de votre compte.
                </p>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Nous nous réservons le droit de suspendre ou de résilier votre compte à tout moment, avec ou sans préavis, 
                  pour violation de ces conditions ou pour toute autre raison que nous jugeons appropriée.
                </p>
                <p className="text-gray-300 leading-relaxed font-poppins">
                  Après la résiliation, votre droit d'utiliser la plateforme prendra fin immédiatement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  11. Modifications des conditions
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins">
                  Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les modifications 
                  entreront en vigueur dès leur publication sur cette page. Votre utilisation continue de la plateforme après 
                  la publication des modifications constitue votre acceptation des nouvelles conditions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  12. Droit applicable et juridiction
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins">
                  Ces conditions sont régies par les lois françaises. Tout litige découlant de ces conditions ou de votre 
                  utilisation de la plateforme sera soumis à la juridiction exclusive des tribunaux français.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  13. Dispositions générales
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Si une disposition de ces conditions est jugée invalide ou inapplicable, les autres dispositions resteront 
                  en vigueur. Le fait que nous n'exercions pas un droit ou une disposition de ces conditions ne constitue pas 
                  une renonciation à ce droit ou à cette disposition.
                </p>
                <p className="text-gray-300 leading-relaxed font-poppins">
                  Ces conditions constituent l'intégralité de l'accord entre vous et Servido concernant l'utilisation de la plateforme.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  14. Contact
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Pour toute question concernant ces conditions d'utilisation, vous pouvez nous contacter :
                </p>
                <div className="bg-gray-900/50 border border-white/5 rounded-lg p-4 font-poppins">
                  <p className="text-gray-300 mb-2">
                    <strong className="text-white">Servido</strong>
                  </p>
                  <p className="text-gray-300 mb-2">
                    Email : legal@servido.com
                  </p>
                  <p className="text-gray-300">
                    Nous nous efforçons de répondre à toutes les demandes dans les meilleurs délais.
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

