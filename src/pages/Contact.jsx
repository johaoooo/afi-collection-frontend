import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, faPhone, faMapMarkerAlt, faClock, 
  faPaperPlane, faUser, faComment, faTag
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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setStatus('Message envoyé avec succès !');
      setFormData({ name: '', email: '', phone: '', subject: 'Commande produit', message: '' });
      setIsLoading(false);
      setTimeout(() => setStatus(''), 3000);
    }, 1000);
  };

  const contactInfos = [
    { icon: faPhone, title: 'Téléphone / WhatsApp', value: '+229 01 96 06 22 87', link: 'tel:+2290196062287' },
    { icon: faEnvelope, title: 'Email', value: 'afiavitossa@gmail.com', link: 'mailto:afiavitossa@gmail.com' },
    { icon: faMapMarkerAlt, title: 'Adresse', value: 'Zoundja, Abomey-Calavi, Bénin', link: null },
    { icon: faClock, title: 'Horaires', value: 'Lun - Sam : 9h - 18h', link: null }
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

      {/* Hero compact */}
      <div className="bg-gradient-to-r from-afi-green to-afi-green-dark rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-xl text-white" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-1">Contact</h1>
              <p className="text-white/80 text-sm">Nous sommes à votre écoute</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="bg-white dark:bg-afi-dark-card rounded-xl shadow-lg overflow-hidden">
              <div className="bg-afi-green px-6 py-4">
                <h2 className="font-serif text-xl font-bold text-white">Envoyez-nous un message</h2>
                <p className="text-white/80 text-sm">Réponse sous 24-48h</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-1">NOM COMPLET</label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all text-sm bg-white dark:bg-afi-dark-card text-gray-700 dark:text-gray-200" placeholder="Votre nom" required />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-1">EMAIL</label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all text-sm bg-white dark:bg-afi-dark-card text-gray-700 dark:text-gray-200" placeholder="votre@email.com" required />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-1">TÉLÉPHONE</label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all text-sm bg-white dark:bg-afi-dark-card text-gray-700 dark:text-gray-200" placeholder="+229 XX XX XX XX" />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-1">OBJET</label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faTag} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <select name="subject" value={formData.subject} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all text-sm bg-white dark:bg-afi-dark-card text-gray-700 dark:text-gray-200">
                        <option>Commande produit</option>
                        <option>Inscription CFP Dorcas</option>
                        <option>Partenariat</option>
                        <option>Don</option>
                        <option>Autre demande</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-1">MESSAGE</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faComment} className="absolute left-3 top-3 text-gray-400 text-sm" />
                    <textarea rows="4" name="message" value={formData.message} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all text-sm resize-none bg-white dark:bg-afi-dark-card text-gray-700 dark:text-gray-200" placeholder="Votre message..." required></textarea>
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="w-full bg-afi-green text-white py-2.5 rounded-lg font-semibold hover:bg-afi-green-dark transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm">
                  {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <>Envoyer le message <FontAwesomeIcon icon={faPaperPlane} className="text-sm" /></>}
                </button>
                
                {status && <div className="bg-afi-green/10 text-afi-green p-3 rounded-lg text-sm text-center">{status}</div>}
              </form>
            </motion.div>
          </div>

          {/* Informations de contact */}
          <div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-6">
              {/* Carte des infos */}
              <div className="bg-white dark:bg-afi-dark-card rounded-xl shadow-lg overflow-hidden">
                <div className="bg-afi-green px-6 py-4">
                  <h2 className="font-serif text-xl font-bold text-white">Coordonnées</h2>
                  <p className="text-white/80 text-sm">Retrouvez-nous ici</p>
                </div>
                <div className="p-6 space-y-4">
                  {contactInfos.map((info, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-afi-green/10 flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon icon={info.icon} className="text-afi-green text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{info.title}</p>
                        {info.link ? (
                          <a href={info.link} className="text-gray-700 dark:text-gray-300 hover:text-afi-green transition-colors text-sm">{info.value}</a>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carte des réseaux sociaux */}
              <div className="bg-white dark:bg-afi-dark-card rounded-xl shadow-lg overflow-hidden">
                <div className="bg-afi-green px-6 py-4">
                  <h2 className="font-serif text-xl font-bold text-white">Suivez-nous</h2>
                  <p className="text-white/80 text-sm">Restez connectés</p>
                </div>
                <div className="p-6">
                  <div className="flex justify-center gap-4">
                    {socialLinks.map((social, index) => (
                      <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:scale-110 hover:-translate-y-1" style={{ backgroundColor: social.color }}>
                        <FontAwesomeIcon icon={social.icon} className="text-white text-lg" />
                      </a>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <a href="https://wa.me/2290196062287" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 text-sm font-semibold">
                      <FontAwesomeIcon icon={faWhatsapp} /> Écrire sur WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Carte horaire */}
              <div className="bg-gradient-to-r from-afi-green to-afi-green-dark rounded-xl p-5 text-center text-white">
                <FontAwesomeIcon icon={faClock} className="text-2xl mb-2 opacity-80" />
                <h3 className="font-serif text-lg font-bold mb-1">Service client disponible</h3>
                <p className="text-white/80 text-sm">Lundi - Samedi : 9h - 18h</p>
                <p className="text-white/70 text-xs mt-2">Réponse garantie sous 24-48h</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
