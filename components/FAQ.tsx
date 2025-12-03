"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Comment fonctionne Servido ?",
    answer: "Servido est une plateforme qui connecte les commerces locaux avec des freelances pour des missions de courte durée. Les commerces publient leurs besoins, et les freelances peuvent accepter les missions qui leur conviennent directement depuis l'application mobile."
  },
  {
    question: "Quels types de missions sont disponibles ?",
    answer: "Les missions disponibles sur Servido sont variées et adaptées aux besoins des commerces : livraisons, service client, assistance événementielle, et bien d'autres missions de courte durée qui nécessitent une intervention rapide."
  },
  {
    question: "Comment puis-je commencer à utiliser Servido ?",
    answer: "C'est simple ! Téléchargez l'application mobile Servido sur iOS ou Android, créez votre compte en quelques minutes, et commencez soit à publier des missions si vous êtes un commerce, soit à accepter des missions si vous êtes freelance."
  },
  {
    question: "Les paiements sont-ils sécurisés ?",
    answer: "Oui, tous les paiements sur Servido sont sécurisés et traités de manière transparente. Les freelances reçoivent leur rémunération rapidement après la validation de la mission."
  },
  {
    question: "Y a-t-il des frais d'utilisation ?",
    answer: "Servido propose des tarifs transparents et compétitifs. Les frais varient selon le type de mission et sont clairement indiqués avant la confirmation. Consultez l'application pour plus de détails sur nos tarifs."
  },
  {
    question: "Puis-je utiliser Servido en tant que commerce et freelance ?",
    answer: "Absolument ! Vous pouvez utiliser Servido à la fois pour publier des missions pour votre commerce et pour accepter des missions en tant que freelance. Un seul compte vous permet d'accéder aux deux fonctionnalités."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-black py-16 sm:py-20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 sm:mb-6 leading-tight tracking-[-1.5px] sm:tracking-[-2px] font-poppins">
            Questions <span className="relative inline-block">
              <span className="relative z-10">fréquentes</span>
              <span className="absolute bottom-0 left-0 right-0 h-2 bg-white rounded-full opacity-60" style={{ transform: 'translateY(2px)' }}></span>
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto font-poppins">
            Trouvez les réponses aux questions les plus courantes sur Servido
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-lg backdrop-blur-sm overflow-hidden transition-all duration-500 ease-out ${
                  isOpen
                    ? "border-blue-500/50 bg-gray-900/80 shadow-lg shadow-blue-500/20 scale-[1.02]"
                    : "border-white/10 bg-gray-950/50 hover:border-white/20 hover:bg-gray-950/70"
                }`}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className={`w-full px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg cursor-pointer transition-all duration-300 ${
                    isOpen ? "bg-gradient-to-r from-blue-500/10 to-transparent" : "hover:bg-white/5"
                  }`}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base sm:text-lg font-medium pr-4 font-poppins transition-colors duration-300 ${
                      isOpen ? "text-blue-400" : "text-white"
                    }`}
                  >
                    {item.question}
                  </span>
                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-full transition-all duration-500 ${
                        isOpen ? "bg-blue-500/20 scale-150 blur-xl" : ""
                      }`}
                    />
                    <svg
                      className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-all duration-500 ease-out relative z-10 ${
                        isOpen
                          ? "rotate-180 text-blue-400 scale-110"
                          : "text-white"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    isOpen
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div
                    className={`px-6 sm:px-8 pb-5 sm:pb-6 transition-all duration-500 delay-75 ${
                      isOpen ? "translate-y-0" : "-translate-y-2"
                    }`}
                  >
                    <div className="h-px bg-gradient-to-r from-blue-500/50 via-blue-500/20 to-transparent mb-4" />
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-poppins animate-fadeIn">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

