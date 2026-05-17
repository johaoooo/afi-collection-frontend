import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, faHandHoldingHeart, faGraduationCap, 
  faUsers, faSeedling, faMoneyBillWave, faShieldAlt,
  faCheckCircle, faPhone, faEnvelope, faGlobe,
  faChartLine, faHandsHelping, faBox, faClock,
  faBook, faChalkboardUser, faUserGraduate, faGem
} from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard, faPaypal } from '@fortawesome/free-brands-svg-icons';

function Don() {
  const [amount, setAmount] = useState(10000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState('formation');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const presetAmounts = [5000, 10000, 25000, 50000, 100000];

  const causes = [
    { id: 'formation', name: 'Formations CFP Dorcas', desc: 'Financer l\'accès à la formation pour les femmes et jeunes artisans béninois', icon: faGraduationCap, raised: '1 247 000 FCFA', target: '2 500 000 FCFA', percentage: 50 },
    { id: 'materiaux', name: 'Achat de matériaux', desc: 'Soutenir l\'approvisionnement en fils, pagnes et outils de création', icon: faBox, raised: '458 000 FCFA', target: '1 000 000 FCFA', percentage: 46 },
    { id: 'bourses', name: 'Bourses apprenantes', desc: 'Permettre aux femmes sans moyens d\'accéder aux formations certifiantes', icon: faUserGraduate, raised: '892 000 FCFA', target: '1 500 000 FCFA', percentage: 59 }
  ];

  const impactItems = [
    { amount: '5 000 FCFA', icon: faBook, title: 'Matériel pédagogique', desc: 'Permet d\'acheter du matériel pour une apprenante', color: 'from-blue-500 to-blue-600' },
    { amount: '25 000 FCFA', icon: faChalkboardUser, title: 'Formation continue', desc: 'Finance une semaine de formation CFP Dorcas', color: 'from-green-500 to-green-600' },
    { amount: '100 000 FCFA', icon: faUserGraduate, title: 'Formation complète', desc: 'Offre une formation complète à une femme défavorisée', color: 'from-purple-500 to-purple-600' }
  ];

  const totalRaised = 2597000;
  const totalTarget = 5000000;
  const totalPercentage = Math.round((totalRaised / totalTarget) * 100);

  const handleAmountSelect = (value) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmount = (e) => {
    setCustomAmount(e.target.value);
    setAmount(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 75) return 'bg-afi-green';
    if (percentage >= 50) return 'bg-afi-yellow';
    return 'bg-afi-red';
  };

  return (
    <>
      <Helmet>
        <title>Faire un Don - Soutenez l'artisanat béninois | AFI Collection</title>
        <meta name="description" content="Soutenez l'artisanat béninois. Vos dons aident à former des femmes et jeunes artisans via le CFP Dorcas." />
      </Helmet>

      {/* Hero compact */}
      <div className="bg-gradient-to-r from-afi-red to-red-700 rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
                <FontAwesomeIcon icon={faHeart} className="text-sm text-white" />
                <span className="text-xs font-medium text-white">Faire un Don</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                Soutenez l'artisanat béninois
              </h1>
              <p className="text-white/80 text-sm max-w-md mx-auto">
                Votre générosité aide à former des femmes et jeunes artisans
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Objectif global */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-afi-green rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="p-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-afi-green/10 dark:bg-white/20 px-3 py-1 rounded-full mb-3">
                <FontAwesomeIcon icon={faChartLine} className="text-afi-green dark:text-white text-xs" />
                <span className="text-xs font-medium text-afi-green dark:text-white">Objectif 2026</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">
                {totalRaised.toLocaleString('fr-FR')} FCFA
              </h2>
              <p className="text-gray-500 dark:text-white/70 text-sm">collectés sur {totalTarget.toLocaleString('fr-FR')} FCFA</p>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-afi-green dark:text-white">
                    {totalPercentage}% atteint
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold inline-block text-gray-500 dark:text-white/70">
                    {totalPercentage < 100 ? 'Encore ' + (totalTarget - totalRaised).toLocaleString('fr-FR') + ' FCFA' : 'Objectif atteint !'}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-white/20">
                <div style={{ width: `${totalPercentage}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressColor(totalPercentage)} transition-all duration-500`}></div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de don */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-afi-green rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-2">
                Contribuer
              </h2>
              <p className="text-gray-600 dark:text-white/70 text-sm mb-5">
                Chaque contribution aide à préserver et développer l'artisanat béninois.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Montant */}
                <div className="mb-6">
                  <label className="font-mono text-[9px] text-afi-green dark:text-white/80 tracking-wider block mb-3">
                    MONTANT DU DON
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {presetAmounts.map(a => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => handleAmountSelect(a)}
                        className={`px-4 py-2 font-serif text-sm border rounded-lg transition-colors ${
                          amount === a && !customAmount 
                            ? 'bg-afi-green text-white border-afi-green' 
                            : 'border-gray-300 dark:border-white/20 text-gray-600 dark:text-white/80 hover:border-afi-green'
                        }`}
                      >
                        {a.toLocaleString('fr-FR')} FCFA
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Montant libre (FCFA)"
                    value={customAmount}
                    onChange={handleCustomAmount}
                    className="w-full p-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/50 focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all"
                  />
                </div>

                {/* Cause */}
                <div className="mb-6">
                  <label className="font-mono text-[9px] text-afi-green dark:text-white/80 tracking-wider block mb-3">
                    CAUSE À SOUTENIR
                  </label>
                  <div className="space-y-3">
                    {causes.map(cause => (
                      <div
                        key={cause.id}
                        onClick={() => setSelectedCause(cause.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedCause === cause.id 
                            ? 'border-afi-green bg-afi-green/5 dark:bg-white/10' 
                            : 'border-gray-200 dark:border-white/20'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full ${selectedCause === cause.id ? 'bg-afi-green' : 'bg-afi-green/10 dark:bg-white/20'} flex items-center justify-center flex-shrink-0`}>
                            <FontAwesomeIcon icon={cause.icon} className={`${selectedCause === cause.id ? 'text-white' : 'text-afi-green dark:text-white'} text-lg`} />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-semibold ${selectedCause === cause.id ? 'text-afi-green dark:text-white' : 'text-gray-800 dark:text-white'}`}>{cause.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-white/70">{cause.desc}</p>
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-gray-500 dark:text-white/60 mb-1">
                                <span>{cause.raised}</span>
                                <span>Objectif {cause.target}</span>
                              </div>
                              <div className="overflow-hidden h-1.5 text-xs flex rounded-full bg-gray-200 dark:bg-white/20">
                                <div style={{ width: `${cause.percentage}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressColor(cause.percentage)} transition-all duration-500`}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coordonnées */}
                <div className="mb-6">
                  <label className="font-mono text-[9px] text-afi-green dark:text-white/80 tracking-wider block mb-3">
                    VOS COORDONNÉES
                  </label>
                  <input
                    type="text"
                    placeholder="Nom complet"
                    className="w-full p-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/50 mb-3 focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email (pour recevoir votre reçu)"
                    className="w-full p-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/50 mb-3 focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    className="w-full p-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/50 focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all"
                  />
                </div>

                {/* Moyens de paiement */}
                <div className="mb-6">
                  <label className="font-mono text-[9px] text-afi-green dark:text-white/80 tracking-wider block mb-3">
                    MOYEN DE PAIEMENT
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-white/20 rounded-lg text-gray-700 dark:text-white/80">
                      <FontAwesomeIcon icon={faMoneyBillWave} /> <span>MTN Mobile Money</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-white/20 rounded-lg text-gray-700 dark:text-white/80">
                      <FontAwesomeIcon icon={faMoneyBillWave} /> <span>Moov Money</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-white/20 rounded-lg text-gray-700 dark:text-white/80">
                      <FontAwesomeIcon icon={faCcVisa} /> <span>Carte bancaire</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-afi-red to-red-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faHeart} />
                  Confirmer mon don
                </button>

                {formSubmitted && (
                  <div className="mt-4 p-3 bg-afi-green/10 dark:bg-white/20 text-afi-green dark:text-white rounded-lg text-sm text-center flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    Merci pour votre générosité ! Un reçu vous sera envoyé par email.
                  </div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Impact et informations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Impact avec icônes professionnelles */}
            <div className="bg-white dark:bg-afi-green rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-afi-green/10 dark:bg-white/20 flex items-center justify-center">
                    <FontAwesomeIcon icon={faHandHoldingHeart} className="text-afi-green dark:text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Impact de votre don</h3>
                </div>
                <div className="space-y-4">
                  {impactItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-white dark:from-white/10 dark:to-transparent rounded-xl shadow-sm hover:shadow-md transition-all">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <FontAwesomeIcon icon={item.icon} className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                          <h4 className="font-bold text-gray-800 dark:text-white text-lg">{item.amount}</h4>
                          <span className="text-xs font-semibold text-afi-green dark:text-afi-green px-2 py-0.5 rounded-full bg-afi-green/10 dark:bg-white/20">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-white/70">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sécurité */}
            <div className="bg-white dark:bg-afi-green rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-afi-green/10 dark:bg-white/20 flex items-center justify-center">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-afi-green dark:text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Paiement sécurisé</h3>
                </div>
                <p className="text-gray-600 dark:text-white/70 text-sm mb-4">
                  Vos transactions sont sécurisées via nos partenaires de paiement agréés.
                </p>
                <div className="flex justify-center gap-4">
                  <FontAwesomeIcon icon={faCcVisa} className="text-3xl text-gray-400 dark:text-white/50" />
                  <FontAwesomeIcon icon={faCcMastercard} className="text-3xl text-gray-400 dark:text-white/50" />
                  <FontAwesomeIcon icon={faPaypal} className="text-3xl text-gray-400 dark:text-white/50" />
                  <span className="text-xl">📱</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-afi-green to-afi-greenDark rounded-xl p-6 text-center text-white">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <FontAwesomeIcon icon={faHandsHelping} className="text-xl" />
              </div>
              <h3 className="font-serif text-lg font-bold mb-2">Besoin d'aide ?</h3>
              <p className="text-white/80 text-sm mb-4">Notre équipe est à votre disposition</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="tel:+2290196062287" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm hover:bg-white/30 transition-all">
                  <FontAwesomeIcon icon={faPhone} />
                  Appeler
                </a>
                <a href="https://wa.me/2290196062287" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm hover:bg-white/30 transition-all">
                  <FontAwesomeIcon icon={faEnvelope} />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Don;
