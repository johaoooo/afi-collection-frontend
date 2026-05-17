import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, faClock, faMoneyBillWave, faUserGraduate,
  faChalkboardUser, faCertificate, faCalendarAlt, faMapMarkerAlt,
  faPhone, faEnvelope, faChevronDown, faChevronUp, faStar,
  faUsers, faLaptopCode, faPaintbrush, faSeedling, faBriefcase
} from '@fortawesome/free-solid-svg-icons';

function CfpDorcas() {
  const [openFormation, setOpenFormation] = useState(null);

  const formations = [
    {
      id: 'macrame',
      name: 'Macramé-Tricotage',
      icon: faLaptopCode,
      color: 'green',
      duration: '1,5 — 3 mois',
      price: '100 000 — 150 000 FCFA',
      description: 'Apprenez les techniques de macramé et tricotage pour créer des sacs, chaussures, vêtements, accessoires et ameublement.',
      modules: [
        'Introduction au macramé et aux outils',
        'Techniques de base : nœuds et tissage',
        'Création de sacs et pochettes',
        'Fabrication de chaussures artisanales',
        'Vêtements et accessoires mode',
        'Ameublement et décoration intérieure'
      ]
    },
    {
      id: 'teinture',
      name: 'Teinture de Pagne',
      icon: faPaintbrush,
      color: 'yellow',
      duration: '1 — 2 mois',
      price: '80 000 — 120 000 FCFA',
      description: 'Maîtrisez l\'art de la teinture artisanale sur pagne pour créer des tenues, revêtements et objets décoratifs uniques.',
      modules: [
        'Introduction aux colorants naturels',
        'Techniques de teinture traditionnelle',
        'Création de motifs et dessins',
        'Teinture de pagnes et tenues',
        'Revêtements muraux et couvertures',
        'Rideaux et décoration textile'
      ]
    },
    {
      id: 'sesame',
      name: 'Filière Sésame',
      icon: faSeedling,
      color: 'green',
      duration: '1 mois',
      price: '50 000 FCFA',
      description: 'Formation à la transformation du sésame en produits alimentaires de qualité.',
      modules: [
        'Introduction à la filière sésame',
        'Production de farine de sésame',
        'Fabrication de sauce sésame',
        'Préparation de bouillie énergétique',
        'Chips et snacks au sésame',
        'Épices et condiments'
      ]
    },
    {
      id: 'soja',
      name: 'Filière Soja',
      icon: faSeedling,
      color: 'yellow',
      duration: '1 mois',
      price: '50 000 FCFA',
      description: 'Formation complète à la transformation du soja en produits alimentaires sains.',
      modules: [
        'Introduction à la filière soja',
        'Production de farine de soja',
        'Fabrication de bouillie nutritive',
        'Chips et snacks au soja',
        'Sauces et condiments',
        'Commercialisation des produits'
      ]
    }
  ];

  const temoignages = [
    { name: "Sarah A.", formation: "Macramé-Tricotage", message: "Cette formation m'a permis de créer ma propre entreprise artisanale. Je recommande vivement !", note: 5 },
    { name: "Fatima B.", formation: "Teinture de Pagne", message: "Des formateurs exceptionnels et un apprentissage pratique de qualité.", note: 5 },
    { name: "Rachida C.", formation: "Filière Soja", message: "Grâce à AFI Collection, j'ai acquis des compétences qui me permettent de vivre de mon artisanat.", note: 5 }
  ];

  const toggleFormation = (id) => {
    setOpenFormation(openFormation === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>CFP Dorcas - Centre de Formation Artisanale | AFI Collection</title>
        <meta name="description" content="Formations certifiantes en artisanat, teinture et agroalimentaire au Bénin. Macramé, teinture, sésame, soja." />
      </Helmet>

      {/* Hero compact */}
      <div className="bg-gradient-to-r from-afi-green to-afi-greenDark rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
                <FontAwesomeIcon icon={faGraduationCap} className="text-sm text-white" />
                <span className="text-xs font-medium text-white">CFP Dorcas</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                Centre de Formation
              </h1>
              <p className="text-white/80 text-sm max-w-md mx-auto">
                Depuis 2009, des formations certifiantes pour femmes et jeunes
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-afi-green rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-afi-green/10 dark:bg-white/20 flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faChalkboardUser} className="text-2xl text-afi-green dark:text-white" />
            </div>
            <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-2">
              CFP Dorcas
            </h2>
            <p className="text-gray-600 dark:text-white/80 text-sm max-w-2xl mx-auto">
              Le Centre de Formation et de Perfectionnement Dorcas propose des formations professionnelles 
              certifiantes destinées aux femmes et jeunes filles souhaitant acquérir un savoir-faire 
              artisanal ou agroalimentaire.
            </p>
          </div>
        </motion.div>

        {/* Formations */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Nos formations
            </h2>
            <p className="text-gray-600 dark:text-white/70 text-sm">
              Des programmes adaptés à tous les niveaux
            </p>
          </div>

          <div className="space-y-4">
            {formations.map((formation, index) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-afi-green rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFormation(formation.id)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-afi-${formation.color}/10 dark:bg-white/20 flex items-center justify-center`}>
                      <FontAwesomeIcon icon={formation.icon} className={`text-xl text-afi-${formation.color} dark:text-white`} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{formation.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-white/70">
                          <FontAwesomeIcon icon={faClock} className="text-afi-green dark:text-white/70" />
                          {formation.duration}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-white/70">
                          <FontAwesomeIcon icon={faMoneyBillWave} className="text-afi-green dark:text-white/70" />
                          {formation.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  <FontAwesomeIcon 
                    icon={openFormation === formation.id ? faChevronUp : faChevronDown} 
                    className="text-gray-400 dark:text-white/60"
                  />
                </button>

                <AnimatePresence>
                  {openFormation === formation.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="border-t border-gray-100 dark:border-white/10 pt-4">
                        <p className="text-gray-600 dark:text-white/80 text-sm mb-4">
                          {formation.description}
                        </p>
                        <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-3">Programme :</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {formation.modules.map((module, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/70">
                              <div className="w-1.5 h-1.5 rounded-full bg-afi-green dark:bg-white"></div>
                              {module}
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 flex gap-3">
                          <a
                            href="https://wa.me/2290196062287"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-afi-green text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-afi-greenDark transition-all"
                          >
                            <FontAwesomeIcon icon={faPhone} />
                            S'inscrire via WhatsApp
                          </a>
                          <button className="inline-flex items-center gap-2 border border-afi-green text-afi-green dark:border-white/50 dark:text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-afi-green/10 transition-all">
                            <FontAwesomeIcon icon={faEnvelope} />
                            Demander un devis
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Témoignages */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Ils nous font confiance
            </h2>
            <p className="text-gray-600 dark:text-white/70 text-sm">
              Découvrez les témoignages de nos apprenantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {temoignages.map((temoignage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-afi-green rounded-xl p-5 shadow-lg text-center"
              >
                <div className="w-12 h-12 rounded-full bg-afi-green/10 dark:bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <FontAwesomeIcon icon={faUserGraduate} className="text-xl text-afi-green dark:text-white" />
                </div>
                <div className="flex justify-center gap-1 mb-3">
                  {[...Array(temoignage.note)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-afi-yellow text-sm" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-white/80 text-sm italic">"{temoignage.message}"</p>
                <p className="font-semibold text-gray-800 dark:text-white mt-3 text-sm">{temoignage.name}</p>
                <p className="text-gray-500 dark:text-white/60 text-xs">{temoignage.formation}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Infos pratiques */}
        <div className="bg-gradient-to-r from-afi-green to-afi-greenDark rounded-xl p-6 text-center text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-xl" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Formations continues</h3>
              <p className="text-white/80 text-sm">Inscriptions toute l'année</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <FontAwesomeIcon icon={faCertificate} className="text-xl" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Certification officielle</h3>
              <p className="text-white/80 text-sm">Diplôme reconnu à l'issue de la formation</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <FontAwesomeIcon icon={faUsers} className="text-xl" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Petits groupes</h3>
              <p className="text-white/80 text-sm">Suivi personnalisé garanti</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CfpDorcas;
