import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLock, faUserSecret, faDatabase, faCookie, 
  faEnvelope, faShieldAlt, faEye, faTrashAlt,
  faUserCheck, faBell, faChartLine, faGlobe,
  faFileInvoice, faPhone, faCheckDouble
} from '@fortawesome/free-solid-svg-icons';

function Privacy() {
  const sections = [
    {
      icon: faDatabase,
      title: "1. Collecte des données",
      content: "Nous collectons les informations que vous nous fournissez volontairement lors de votre inscription, commande ou prise de contact : nom, prénom, email, téléphone, adresse. Nous collectons également automatiquement des données de navigation (cookies, adresse IP, pages visitées)."
    },
    {
      icon: faShieldAlt,
      title: "2. Utilisation des données",
      content: "Vos données sont utilisées pour : traiter vos commandes, gérer votre compte, vous envoyer nos actualités (avec votre consentement), améliorer nos services, et répondre à vos demandes."
    },
    {
      icon: faLock,
      title: "3. Sécurité des données",
      content: "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, perte ou divulgation. Toutes les transactions sont sécurisées via SSL."
    },
    {
      icon: faCookie,
      title: "4. Cookies",
      content: "Notre site utilise des cookies pour améliorer votre expérience de navigation, mémoriser vos préférences et analyser notre trafic. Vous pouvez contrôler l'utilisation des cookies via les paramètres de votre navigateur."
    },
    {
      icon: faUserCheck,
      title: "5. Vos droits",
      content: "Conformément à la législation, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Vous pouvez également vous opposer au traitement de vos données ou demander leur limitation."
    },
    {
      icon: faTrashAlt,
      title: "6. Conservation des données",
      content: "Vos données sont conservées pendant la durée nécessaire à la gestion de notre relation commerciale, et jusqu'à 5 ans après la fin de cette relation à des fins de preuve."
    },
    {
      icon: faGlobe,
      title: "7. Partage des données",
      content: "Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec nos partenaires de livraison et prestataires de paiement uniquement pour l'exécution de vos commandes."
    },
    {
      icon: faEye,
      title: "8. Données des mineurs",
      content: "Notre site n'est pas destiné aux mineurs de moins de 18 ans. Nous ne collectons pas sciemment de données concernant des mineurs."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité - AFI Collection</title>
        <meta name="description" content="Politique de confidentialité et protection des données personnelles d'AFI Collection" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-afi-ink/50 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-afi-green to-afi-greenDark p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon icon={faLock} className="text-3xl" />
              </div>
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold">Politique de Confidentialité</h1>
                <p className="text-white/80 text-sm mt-1">Dernière mise à jour : Mai 2026</p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            <div className="bg-afi-cream dark:bg-afi-ink/30 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faUserSecret} className="text-afi-green text-xl mt-1" />
                <div>
                  <h2 className="font-serif text-lg font-bold text-gray-800 dark:text-white mb-2">Notre engagement</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    AFI Collection s'engage à protéger vos données personnelles et à respecter votre vie privée. 
                    Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
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

            <div className="bg-gradient-to-r from-afi-green/10 to-afi-green/5 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <FontAwesomeIcon icon={faCheckDouble} className="text-afi-green" />
                <h3 className="font-semibold text-gray-800 dark:text-white">Récapitulatif de vos droits</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">✓ Droit d'accès à vos données</li>
                <li className="flex items-center gap-2">✓ Droit de rectification de vos informations</li>
                <li className="flex items-center gap-2">✓ Droit à l'effacement (droit à l'oubli)</li>
                <li className="flex items-center gap-2">✓ Droit à la portabilité de vos données</li>
                <li className="flex items-center gap-2">✓ Droit d'opposition au traitement</li>
                <li className="flex items-center gap-2">✓ Droit de retirer votre consentement</li>
              </ul>
            </div>

            <div className="bg-afi-green/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-afi-green" />
                <h3 className="font-semibold text-gray-800 dark:text-white">Contact DPO</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Pour toute question concernant vos données personnelles ou pour exercer vos droits, contactez notre Délégué à la Protection des Données :
              </p>
              <div className="space-y-1 text-sm">
                <p>📧 <a href="mailto:afiavitossa@gmail.com" className="text-afi-green hover:underline">afiavitossa@gmail.com</a></p>
                <p>📞 +229 01 96 06 22 87</p>
                <p>📍 Zoundja, Abomey-Calavi, Bénin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Privacy;
