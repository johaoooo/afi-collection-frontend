import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrophy, faCalendarAlt, faPhone, 
  faEnvelope, faAward, faBriefcase,
  faHeart, faUsers, faLightbulb, faQuoteLeft,
  faChevronDown, faChevronUp, faGlobe,
  faHandsHelping, faCertificate, faMedal, faUserTie,
  faStar, faGraduationCap, faClock, faEye,
  faTimes, faShare, faDownload, faPrint
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';

function Fondatrice() {
  const [isBioOpen, setIsBioOpen] = useState(true);
  const [isAwardsOpen, setIsAwardsOpen] = useState(true);
  const [isCareerOpen, setIsCareerOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const distinctions = [
    { year: '2026', title: 'Prix Africain de l\'Artisanat le plus populaire', location: 'Lomé, Togo', icon: faTrophy, color: 'yellow', description: 'Reconnue pour l\'excellence de ses créations et son impact sur le développement de l\'artisanat ouest-africain.' },
    { year: '2025', title: 'Titre d\'Ambassadrice GRAAD GLOBAL', location: 'Londres, Royaume-Uni', icon: faGlobe, color: 'green', description: 'Nominée pour son engagement en faveur de l\'artisanat féminin en Afrique.' },
    { year: '2024', title: 'Distinction d\'Excellence Artisanale', location: 'Cotonou, Bénin', icon: faMedal, color: 'yellow', description: 'Récompense pour l\'ensemble de son œuvre artisanale.' },
    { year: '2023', title: 'Prix de la Femme Entrepreneur Africaine', location: 'Abidjan, Côte d\'Ivoire', icon: faAward, color: 'green', description: 'Honorée pour son leadership et son impact économique.' },
    { year: '2022', title: 'Médaille d\'Or de l\'Artisanat Béninois', location: 'Porto-Novo, Bénin', icon: faCertificate, color: 'yellow', description: 'La plus haute distinction artisanale du Bénin.' }
  ];

  const parcours = [
    { year: '2015', title: 'Fondation d\'AFI Collection', desc: 'Création de la marque ombrelle à Zoundja, Abomey-Calavi', icon: faBriefcase },
    { year: '2009', title: 'Création du CFP Dorcas', desc: 'Centre de Formation et de Perfectionnement pour femmes et jeunes', icon: faGraduationCap },
    { year: '2000', title: 'Lancement des premières créations', desc: 'Début de l\'aventure artisanale', icon: faStar },
    { year: '1990', title: 'Début de carrière', desc: 'Premiers pas dans l\'artisanat béninois', icon: faClock }
  ];

  const valeurs = [
    { icon: faHeart, title: 'Passion', desc: 'Un engagement sincère pour l\'artisanat', color: 'red' },
    { icon: faUsers, title: 'Transmission', desc: 'Partager le savoir-faire avec la nouvelle génération', color: 'green' },
    { icon: faLightbulb, title: 'Innovation', desc: 'Allier tradition et modernité', color: 'yellow' },
    { icon: faHandsHelping, title: 'Impact', desc: 'Autonomiser les femmes par la formation', color: 'green' }
  ];

  const openLightbox = (item) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Helmet>
        <title>La Fondatrice - Mme TOSSA Afiavi | AFI Collection</title>
        <meta name="description" content="Découvrez Mme TOSSA Afiavi, fondatrice d'AFI Collection, artisan, formatrice et femme d'exception" />
      </Helmet>

      {/* Hero compact comme la galerie */}
      <div className="bg-gradient-to-r from-afi-green to-afi-greenDark rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
                <FontAwesomeIcon icon={faUserTie} className="text-sm text-white" />
                <span className="text-xs font-medium text-white">La Fondatrice</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                Mme TOSSA Afiavi
              </h1>
              <p className="text-white/80 text-sm max-w-md mx-auto">
                35+ ans d'excellence artisanale
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Profil et infos */}
          <div className="lg:col-span-1">
            {/* Photo de profil */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 cursor-pointer"
              onClick={() => openLightbox({ image: 'https://picsum.photos/id/64/800/800', title: 'Mme TOSSA Afiavi', desc: 'Portrait de la fondatrice' })}
            >
              <div className="relative group">
                <img 
                  src="https://picsum.photos/id/64/400/400" 
                  alt="Mme TOSSA Afiavi"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FontAwesomeIcon icon={faEye} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-5 text-center">
                <h2 className="font-serif text-xl font-bold text-gray-800">Mme TOSSA Afiavi Gbèssito Honorine</h2>
                <p className="text-afi-green text-sm mt-1">PDG · AFI Collection</p>
                <div className="flex justify-center gap-2 mt-3">
                  <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-afi-green hover:text-white transition-colors">
                    <FontAwesomeIcon icon={faFacebookF} className="text-sm" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-afi-green hover:text-white transition-colors">
                    <FontAwesomeIcon icon={faLinkedin} className="text-sm" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-afi-green hover:text-white transition-colors">
                    <FontAwesomeIcon icon={faTwitter} className="text-sm" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Valeurs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {valeurs.map((v, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all group cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-full bg-afi-${v.color}/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-afi-${v.color} transition-all`}>
                    <FontAwesomeIcon icon={v.icon} className={`text-afi-${v.color} text-xl group-hover:text-white transition-all`} />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">{v.title}</h3>
                  <p className="text-gray-500 text-xs mt-1">{v.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Contact rapide */}
            <div className="bg-gradient-to-r from-afi-green to-afi-greenDark rounded-xl p-5 text-center text-white">
              <FontAwesomeIcon icon={faHeart} className="text-2xl mb-2 opacity-80" />
              <h3 className="font-serif text-lg font-bold mb-2">Une question ?</h3>
              <p className="text-white/80 text-sm mb-4">Mme TOSSA est disponible pour les partenariats</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="tel:+2290196062287" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm hover:bg-white/30 transition-all">
                  <FontAwesomeIcon icon={faPhone} /> Appeler
                </a>
                <a href="https://wa.me/2290196062287" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm hover:bg-white/30 transition-all">
                  <FontAwesomeIcon icon={faEnvelope} /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Colonne droite - Contenu détaillé */}
          <div className="lg:col-span-2">
            {/* Biographie */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-5">
              <button
                onClick={() => setIsBioOpen(!isBioOpen)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-afi-green/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faBriefcase} className="text-afi-green text-sm" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Biographie</h3>
                </div>
                <FontAwesomeIcon icon={isBioOpen ? faChevronUp : faChevronDown} className="text-gray-400" />
              </button>
              <AnimatePresence>
                {isBioOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="text-gray-600 text-sm space-y-3">
                      <p>
                        Née le 16 mai 1969 à Savè, Mme TOSSA est une artisane passionnée qui a consacré sa vie 
                        à la valorisation du patrimoine artisanal béninois. Mariée et mère de 5 enfants, elle 
                        dirige depuis 2009 le Centre de Formation et de Perfectionnement Dorcas (CFP Dorcas).
                      </p>
                      <p>
                        Sous le slogan « Tisser l'avenir, valoriser le local », elle valorise le patrimoine 
                        artisanal du Bénin et de l'Afrique de l'Ouest, en alliant savoir-faire ancestral et 
                        dynamisme entrepreneurial moderne. Elle préside plusieurs organisations régionales et 
                        continentales dédiées à l'artisanat et à l'agripreneuriat féminin.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Distinctions */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-5">
              <button
                onClick={() => setIsAwardsOpen(!isAwardsOpen)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-afi-yellow/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faTrophy} className="text-afi-yellow text-sm" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Distinctions</h3>
                  <span className="text-xs bg-afi-green/10 text-afi-green px-2 py-0.5 rounded-full">12+</span>
                </div>
                <FontAwesomeIcon icon={isAwardsOpen ? faChevronUp : faChevronDown} className="text-gray-400" />
              </button>
              <AnimatePresence>
                {isAwardsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="space-y-3">
                      {distinctions.map((dist, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-8 h-8 rounded-full bg-afi-${dist.color}/10 flex items-center justify-center flex-shrink-0`}>
                            <FontAwesomeIcon icon={dist.icon} className={`text-afi-${dist.color} text-sm`} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{dist.title}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                              <span>{dist.year}</span>
                              <span>•</span>
                              <span>{dist.location}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{dist.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Parcours */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <button
                onClick={() => setIsCareerOpen(!isCareerOpen)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-afi-green/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-afi-green text-sm" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Parcours</h3>
                </div>
                <FontAwesomeIcon icon={isCareerOpen ? faChevronUp : faChevronDown} className="text-gray-400" />
              </button>
              <AnimatePresence>
                {isCareerOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="relative pl-6 border-l-2 border-afi-green ml-3 space-y-6">
                      {parcours.map((step, index) => (
                        <div key={index} className="relative">
                          <div className="absolute -left-9 w-4 h-4 rounded-full bg-afi-green"></div>
                          <div className="mb-1">
                            <span className="text-xs font-mono text-afi-green font-semibold">{step.year}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <FontAwesomeIcon icon={step.icon} className="text-afi-green text-sm mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-gray-800 text-sm">{step.title}</h4>
                              <p className="text-gray-500 text-xs mt-1">{step.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Citation */}
            <div className="bg-gradient-to-r from-afi-green/10 to-afi-green/5 rounded-xl p-5 text-center border border-afi-green/20">
              <FontAwesomeIcon icon={faQuoteLeft} className="text-afi-green text-2xl mb-2 opacity-50" />
              <p className="text-gray-600 italic text-sm">
                « Tisser l'avenir, valoriser le local - Plus qu'un slogan, une philosophie de vie. »
              </p>
              <p className="text-afi-green text-xs font-semibold mt-2">— Mme TOSSA Afiavi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox pour la photo */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-afi-green transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>
            <div className="max-w-4xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="rounded-xl shadow-2xl max-h-[80vh] object-contain"
              />
              <div className="mt-3 text-center">
                <h3 className="text-white text-lg font-serif mb-1">{selectedImage.title}</h3>
                <p className="text-gray-400 text-sm">{selectedImage.desc}</p>
                <div className="flex justify-center gap-4 mt-3">
                  <button className="text-white/70 hover:text-afi-green transition-colors flex items-center gap-1.5 text-sm">
                    <FontAwesomeIcon icon={faDownload} /> Télécharger
                  </button>
                  <button className="text-white/70 hover:text-afi-green transition-colors flex items-center gap-1.5 text-sm">
                    <FontAwesomeIcon icon={faShare} /> Partager
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Fondatrice;
