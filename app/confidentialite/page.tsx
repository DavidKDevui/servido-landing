import { generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = generateSEOMetadata({
  title: "Politique de Confidentialité",
  description: "Découvrez comment Servido protège et utilise vos données personnelles. Notre politique de confidentialité détaille nos pratiques en matière de collecte, utilisation et protection de vos informations.",
  keywords: ["confidentialité", "politique de confidentialité", "protection des données", "RGPD", "vie privée", "servido"],
  url: "/confidentialite",
});

export default function ConfidentialitePage() {
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
          <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Politique de Confidentialité" }]} />
          
          {/* En-tête */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 sm:mb-6 leading-tight tracking-[-1.5px] sm:tracking-[-2px] font-poppins">
              <span className="text-white">Politique de Confidentialité</span>
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
                  1. Introduction
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Chez Servido, nous accordons une grande importance à la protection de vos données personnelles. 
                  Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons 
                  vos informations lorsque vous utilisez notre plateforme de services.
                </p>
                <p className="text-gray-300 leading-relaxed font-poppins">
                  En utilisant Servido, vous acceptez les pratiques décrites dans cette politique. Si vous n'acceptez pas 
                  cette politique, veuillez ne pas utiliser nos services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  2. Données que nous collectons
                </h2>
                <h3 className="text-xl font-semibold text-white mb-3 font-poppins">
                  2.1. Informations que vous nous fournissez
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 font-poppins mb-4">
                  <li>Nom, prénom et coordonnées (adresse e-mail, numéro de téléphone)</li>
                  <li>Informations de profil (photo, description, compétences)</li>
                  <li>Informations de paiement (traitées de manière sécurisée par nos prestataires)</li>
                  <li>Contenu que vous publiez sur la plateforme</li>
                  <li>Communications avec d'autres utilisateurs</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-white mb-3 font-poppins">
                  2.2. Informations collectées automatiquement
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 font-poppins">
                  <li>Données de navigation (adresse IP, type de navigateur, pages visitées)</li>
                  <li>Données d'utilisation (temps passé sur la plateforme, fonctionnalités utilisées)</li>
                  <li>Cookies et technologies similaires</li>
                  <li>Informations sur votre appareil (modèle, système d'exploitation)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  3. Utilisation de vos données
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Nous utilisons vos données personnelles pour :
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 font-poppins">
                  <li>Fournir, maintenir et améliorer nos services</li>
                  <li>Faciliter les connexions entre prestataires et clients</li>
                  <li>Traiter les transactions et gérer les paiements</li>
                  <li>Vous envoyer des notifications importantes concernant votre compte</li>
                  <li>Personnaliser votre expérience utilisateur</li>
                  <li>Détecter et prévenir la fraude et les abus</li>
                  <li>Respecter nos obligations légales</li>
                  <li>Analyser l'utilisation de la plateforme pour améliorer nos services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  4. Partage de vos données
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations uniquement dans les cas suivants :
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 font-poppins">
                  <li><strong>Avec d'autres utilisateurs :</strong> Les informations de votre profil public sont visibles par les autres utilisateurs de la plateforme</li>
                  <li><strong>Avec nos prestataires de services :</strong> Nous pouvons partager des données avec des prestataires qui nous aident à exploiter la plateforme (hébergement, paiement, analyse)</li>
                  <li><strong>Pour des raisons légales :</strong> Si la loi l'exige ou pour protéger nos droits et notre sécurité</li>
                  <li><strong>Avec votre consentement :</strong> Dans d'autres cas, uniquement avec votre autorisation explicite</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  5. Sécurité de vos données
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger 
                  vos données personnelles contre l'accès non autorisé, la perte, la destruction ou la modification. 
                  Cependant, aucune méthode de transmission sur Internet n'est 100% sécurisée.
                </p>
                <p className="text-gray-300 leading-relaxed font-poppins">
                  Nous utilisons notamment :
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 font-poppins">
                  <li>Chiffrement des données sensibles</li>
                  <li>Authentification sécurisée</li>
                  <li>Surveillance régulière de nos systèmes</li>
                  <li>Accès restreint aux données personnelles</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  6. Vos droits
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 font-poppins">
                  <li><strong>Droit d'accès :</strong> Vous pouvez demander une copie de vos données personnelles</li>
                  <li><strong>Droit de rectification :</strong> Vous pouvez corriger vos données inexactes ou incomplètes</li>
                  <li><strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression de vos données dans certains cas</li>
                  <li><strong>Droit à la portabilité :</strong> Vous pouvez récupérer vos données dans un format structuré</li>
                  <li><strong>Droit d'opposition :</strong> Vous pouvez vous opposer au traitement de vos données</li>
                  <li><strong>Droit à la limitation :</strong> Vous pouvez demander la limitation du traitement de vos données</li>
                  <li><strong>Droit de retirer votre consentement :</strong> À tout moment, si le traitement est basé sur votre consentement</li>
                </ul>
                <p className="text-gray-300 leading-relaxed font-poppins mt-4">
                  Pour exercer ces droits, contactez-nous à l'adresse indiquée dans la section "Contact" ci-dessous.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  7. Cookies
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience, analyser l'utilisation 
                  de la plateforme et personnaliser le contenu. Vous pouvez gérer vos préférences de cookies dans les paramètres 
                  de votre navigateur.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  8. Conservation des données
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins">
                  Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services et respecter 
                  nos obligations légales. Lorsque vous supprimez votre compte, nous supprimons ou anonymisons vos données dans 
                  un délai raisonnable, sauf si la conservation est requise par la loi.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  9. Modifications de cette politique
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins">
                  Nous pouvons modifier cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement 
                  significatif en publiant la nouvelle politique sur cette page et en mettant à jour la date de "Dernière mise à jour". 
                  Nous vous encourageons à consulter régulièrement cette page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  10. Contact
                </h2>
                <p className="text-gray-300 leading-relaxed font-poppins mb-4">
                  Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, vous pouvez nous contacter :
                </p>
                <div className="bg-gray-900/50 border border-white/5 rounded-lg p-4 font-poppins">
                  <p className="text-gray-300 mb-2">
                    <strong className="text-white">Servido</strong>
                  </p>
                  <p className="text-gray-300 mb-2">
                    Email : privacy@servido.com
                  </p>
                  <p className="text-gray-300">
                    Pour les demandes liées au RGPD, vous avez également le droit de déposer une plainte auprès de la Commission 
                    Nationale de l'Informatique et des Libertés (CNIL).
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

