import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, faClock, faMoneyBillWave, faUserGraduate,
  faChalkboardUser, faCertificate, faCalendarAlt, faMapMarkerAlt,
  faPhone, faEnvelope, faChevronDown, faChevronUp, faStar,
  faUsers, faLaptopCode, faPaintbrush, faSeedling, faBriefcase,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function CfpDorcas() {
  const [openFormation, setOpenFormation] = useState(null);
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
  try {
    const res = await axios.get(`${API_URL}/formations`);
    const onlyFormations = res.data.filter(f => f.type === 'formation' || !f.type);
    setFormations(onlyFormations);
    setLoading(false);
  } catch (err) {
    console.error('Erreur chargement formations', err);
    setLoading(false);
  }
};

  const toggleFormation = (id) => {
    setOpenFormation(openFormation === id ? null : id);
  };

  const getIconForFormation = (iconName) => {
    switch(iconName) {
      case 'faLaptopCode': return faLaptopCode;
      case 'faPaintbrush': return faPaintbrush;
      case 'faSeedling': return faSeedling;
      default: return faGraduationCap;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} className="text-4xl text-afi-green animate-spin mb-4" />
          <p className="text-gray-500">Chargement des formations...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>CFP Dorcas - Centre de Formation Artisanale | AFI Collection</title>
        <meta name="description" content="Formations certifiantes en artisanat, teinture et agroalimentaire au Bénin." />
      </Helmet>

      <div className="bg-gradient-to-r from-afi-green to-afi-green-dark rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
                <FontAwesomeIcon icon={faGraduationCap} className="text-sm text-white" />
                <span className="text-xs font-medium text-white">CFP Dorcas</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">Centre de Formation</h1>
              <p className="text-white/80 text-sm max-w-md mx-auto">Depuis 2009, des formations certifiantes pour femmes et jeunes</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white dark:bg-afi-dark-card rounded-xl shadow-lg overflow-hidden mb-8 border-2 border-afi-green dark:border-afi-dark-border">
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-afi-green/10 dark:bg-white/20 flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faChalkboardUser} className="text-2xl text-afi-green dark:text-white" />
            </div>
            <h2 className="font-serif text-xl font-bold text-gray-800 dark:text-white mb-2">CFP Dorcas</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm max-w-2xl mx-auto">
              Le Centre de Formation et de Perfectionnement Dorcas propose des formations professionnelles 
              certifiantes destinées aux femmes et jeunes filles.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-2">Nos formations</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Des programmes adaptés à tous les niveaux</p>
          </div>

          <div className="space-y-4">
            {formations.map((formation, index) => (
              <motion.div 
                key={formation.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1 }} 
                className="bg-white dark:bg-afi-dark-card rounded-xl shadow-lg overflow-hidden border-2 border-afi-green dark:border-afi-dark-border"
              >
                <button 
                  onClick={() => toggleFormation(formation.id)} 
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-afi-green/10 dark:bg-white/20 flex items-center justify-center">
                      <FontAwesomeIcon icon={getIconForFormation(formation.icon)} className="text-xl text-afi-green dark:text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800 dark:text-white text-lg">{formation.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <FontAwesomeIcon icon={faClock} className="text-afi-green dark:text-white/70" />
                          {formation.duration}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
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
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{formation.description}</p>
                        <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-3">Programme :</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {formation.modules && formation.modules.length > 0 && (
  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
    <p className="text-sm font-semibold mb-2">📚 Au programme :</p>
    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
      {formation.modules.map((module, idx) => (
        <li key={idx}>{module}</li>
      ))}
    </ul>
  </div>
)}
                        </div>
                        <div className="mt-5 flex gap-3">
                          <a href="https://wa.me/2290196062287" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-afi-green text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-afi-green-dark transition-all">
                            <FontAwesomeIcon icon={faWhatsapp} /> S'inscrire via WhatsApp
                          </a>
                          <button className="inline-flex items-center gap-2 border border-afi-green text-afi-green dark:border-white/50 dark:text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-afi-green/10 transition-all">
                            <FontAwesomeIcon icon={faEnvelope} /> Demander un devis
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

        <div className="bg-gradient-to-r from-afi-green to-afi-green-dark rounded-2xl p-6 text-center text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div><div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3"><FontAwesomeIcon icon={faCalendarAlt} className="text-xl" /></div><h3 className="font-semibold text-lg mb-1">Formations continues</h3><p className="text-white/80 text-sm">Inscriptions toute l'année</p></div>
            <div><div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3"><FontAwesomeIcon icon={faCertificate} className="text-xl" /></div><h3 className="font-semibold text-lg mb-1">Certification officielle</h3><p className="text-white/80 text-sm">Diplôme reconnu</p></div>
            <div><div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3"><FontAwesomeIcon icon={faUsers} className="text-xl" /></div><h3 className="font-semibold text-lg mb-1">Petits groupes</h3><p className="text-white/80 text-sm">Suivi personnalisé</p></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CfpDorcas;
