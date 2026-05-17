import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileContract, faGavel, faShieldHeart, faTruck, 
  faCreditCard, faRefresh, faUserLock, faEnvelope,
  faScaleBalanced, faHandshake, faClock, faMapMarkerAlt,
  faPhone, faGlobe, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

function Terms() {
  const sections = [
    {
      icon: faFileContract,
      title: "1. Acceptation des conditions",
      content: "En accédant et en utilisant le site AFI Collection, vous acceptez d'être lié par les présentes conditions générales. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site."
    },
    {
      icon: faUserLock,
      title: "2. Compte utilisateur",
      content: "Pour passer une commande ou vous inscrire à nos formations, vous devez créer un compte. Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités effectuées sous votre compte."
    },
    {
      icon: faHandshake,
      title: "3. Commandes et paiements",
      content: "Les commandes sont confirmées après validation du paiement. Nous acceptons les paiements par MTN Mobile Money, Moov Money, virement bancaire et paiement à la livraison pour les zones couvertes."
    },
    {
      icon: faTruck,
      title: "4. Livraison",
      content: "Les délais de livraison sont de 2 à 5 jours ouvrables au Bénin et variables à l'international. Les frais de livraison sont à la charge du client sauf mention contraire."
    },
    {
      icon: faRefresh,
      title: "5. Droit de rétractation",
      content: "Conformément à la législation béninoise, vous disposez d'un délai de 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation, sous réserve que les produits soient retournés dans leur état d'origine."
    },
    {
      icon: faShieldHeart,
      title: "6. Garantie",
      content: "Tous nos produits artisanaux bénéficient d'une garantie de conformité de 30 jours. Les défauts de fabrication sont pris en charge par nos soins."
    },
    {
      icon: faCreditCard,
      title: "7. Prix",
      content: "Les prix sont indiqués en FCFA toutes taxes comprises. AFI Collection se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande."
    },
    {
      icon: faGavel,
      title: "8. Propriété intellectuelle",
      content: "Tous les éléments du site (textes, images, logos, créations) sont la propriété exclusive d'AFI Collection et sont protégés par les lois sur la propriété intellectuelle."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Conditions Générales - AFI Collection</title>
        <meta name="description" content="Conditions générales de vente et d'utilisation du site AFI Collection" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-afi-ink/50 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-afi-green to-afi-greenDark p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon icon={faFileContract} className="text-3xl" />
              </div>
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold">Conditions Générales</h1>
                <p className="text-white/80 text-sm mt-1">Dernière mise à jour : Mai 2026</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-8">
            <div className="bg-afi-cream dark:bg-afi-ink/30 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faScaleBalanced} className="text-afi-green text-xl mt-1" />
                <div>
                  <h2 className="font-serif text-lg font-bold text-gray-800 dark:text-white mb-2">Préambule</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Les présentes conditions générales régissent l'utilisation du site internet AFI Collection 
                    et les relations contractuelles entre AFI Collection et ses clients. Elles s'appliquent à 
                    toutes les commandes passées sur notre site.
                  </p>
                </div>
              </div>
            </div>

            {sections.map((section, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-afi-green/10 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={section.icon} className="text-afi-green text-lg" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-gray-800 dark:text-white mb-2">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-afi-green/10 rounded-xl p-4 mt-4">
              <div className="flex items-center gap-3 mb-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-afi-green" />
                <h3 className="font-semibold text-gray-800 dark:text-white">Questions ?</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Pour toute question concernant nos conditions générales, contactez-nous à{' '}
                <a href="mailto:afiavitossa@gmail.com" className="text-afi-green hover:underline">afiavitossa@gmail.com</a>
                {' '}ou par téléphone au <span className="font-semibold">+229 01 96 06 22 87</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Terms;
