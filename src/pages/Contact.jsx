import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, faPhone, faMapMarkerAlt, faClock, 
  faPaperPlane, faUser, faComment, faTag,
  faChevronDown, faChevronUp, faCheckCircle, faExclamationTriangle,
  faCommentDots, faHeadset, faBuilding, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { 
  faWhatsapp, faFacebookF, faInstagram, faTwitter 
} from '@fortawesome/free-brands-svg-icons';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Commande produit',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Veuillez remplir tous les champs obligatoires');
      setTimeout(() => setError(''), 3000);
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setStatus('Message envoyé avec succès !');
      setFormData({ name: '', email: '', phone: '', subject: 'Commande produit', message: '' });
      setIsLoading(false);
      setTimeout(() => setStatus(''), 3000);
    }, 1000);
  };

  const contactInfos = [
    { icon: faPhone, title: 'Téléphone', value: '+229 01 96 06 22 87', detail: 'Lun-Sam, 9h-18h', link: 'tel:+2290196062287' },
    { icon: faEnvelope, title: 'Email', value: 'afiavitossa@gmail.com', detail: 'Réponse sous 24h', link: 'mailto:afiavitossa@gmail.com' },
    { icon: faMapMarkerAlt, title: 'Adresse', value: 'Zoundja, Abomey-Calavi', detail: 'Bénin', link: null }
  ];

  const socialLinks = [
    { icon: faWhatsapp, name: 'WhatsApp', link: 'https://wa.me/2290196062287', color: '#25D366' },
    { icon: faFacebookF, name: 'Facebook', link: 'https://facebook.com', color: '#1877F2' },
    { icon: faInstagram, name: 'Instagram', link: 'https://instagram.com', color: '#E4405F' },
    { icon: faTwitter, name: 'Twitter', link: 'https://twitter.com', color: '#1DA1F2' }
  ];

  return (
    <>
      <Helmet>
        <title>Contact - AFI Collection</title>
        <meta name="description" content="Contactez AFI Collection pour vos commandes, formations ou partenariats" />
      </Helmet>

      {/* Hero compact avec bords arrondis */}
      <div className="bg-gradient-to-r from-afi-green to-afi-greenDark rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
                <FontAwesomeIcon icon={faCommentDots} className="text-sm text-white" />
                <span className="text-xs font-medium text-white">Contact</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                Écrivez-nous
              </h1>
              <p className="text-white/80 text-sm max-w-md mx-auto">
                Une question ? Notre équipe vous répond rapidement
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Formulaire compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              
              {status && (
                <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-emerald-600" />
                  <p className="text-emerald-700 dark:text-emerald-300 text-sm">{status}</p>
                </div>
              )}
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center gap-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="w-4 h-4 text-red-600" />
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom *"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-afi-green focus:border-transparent transition"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Votre email *"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-afi-green focus:border-transparent transition"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Votre téléphone (optionnel)"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-afi-green focus:border-transparent transition"
                  />
                </div>

                <div>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-afi-green focus:border-transparent transition"
                  >
                    <option>Commande produit</option>
                    <option>Inscription CFP Dorcas</option>
                    <option>Partenariat</option>
                    <option>Don</option>
                    <option>Autre demande</option>
                  </select>
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Votre message *"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-afi-green focus:border-transparent transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-afi-green to-afi-greenDark text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} className="w-3.5 h-3.5" />
                      Envoyer le message
                      <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Bouton déplier */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            <FontAwesomeIcon icon={isInfoOpen ? faChevronUp : faChevronDown} className="w-3.5 h-3.5" />
            {isInfoOpen ? 'Masquer les coordonnées' : 'Voir nos coordonnées'}
          </button>
        </div>

        {/* Informations dépliables */}
        <AnimatePresence>
          {isInfoOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
                  
                  {contactInfos.map((info, index) => (
                    <div key={index} className="p-5 text-center">
                      <div className="w-11 h-11 bg-gradient-to-r from-afi-green to-afi-greenDark rounded-xl flex items-center justify-center mx-auto mb-3">
                        <FontAwesomeIcon icon={info.icon} className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{info.title}</h3>
                      {info.link ? (
                        <a href={info.link} className="text-gray-600 dark:text-gray-400 text-sm mt-1 block hover:text-afi-green transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{info.value}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">{info.detail}</p>
                    </div>
                  ))}
                </div>

                {/* Réseaux sociaux */}
                <div className="border-t border-gray-100 dark:border-gray-700 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-3">Suivez-nous</p>
                  <div className="flex justify-center gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all transform hover:scale-110 hover:-translate-y-1"
                        style={{ backgroundColor: social.color }}
                      >
                        <FontAwesomeIcon icon={social.icon} className="text-white text-sm" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Service client */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
            <FontAwesomeIcon icon={faHeadset} className="text-afi-green" />
            <span>Service client disponible du lundi au samedi, 9h - 18h</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
