import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, faInstagram, faWhatsapp, faTwitter, 
  faLinkedinIn, faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faHeart, faEnvelope, faPhone, faMapMarkerAlt, 
  faClock, faArrowRight, faNewspaper, faStore,
  faGraduationCap, faGem, faLeaf, faBagShopping, faShirt
} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

function Footer() {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setNewsletterStatus('Merci pour votre inscription !');
      setEmail('');
      setTimeout(() => setNewsletterStatus(''), 3000);
    }
  };

  const socialLinks = [
    { icon: faFacebookF, url: 'https://facebook.com', color: '#1877F2', name: 'Facebook' },
    { icon: faInstagram, url: 'https://instagram.com', color: '#E4405F', name: 'Instagram' },
    { icon: faWhatsapp, url: 'https://wa.me/2290196062287', color: '#25D366', name: 'WhatsApp' },
    { icon: faTwitter, url: 'https://twitter.com', color: '#1DA1F2', name: 'Twitter' },
    { icon: faLinkedinIn, url: 'https://linkedin.com', color: '#0077B5', name: 'LinkedIn' },
  ];

  const quickLinks = [
    { name: 'AFISAC', path: '/afisac', icon: faBagShopping },
    { name: 'AFI Textile', path: '/afi-textile', icon: faShirt },
    { name: 'AFI Mode', path: '/afi-mode', icon: faGem },
    { name: 'Agroalimentaire', path: '/agroalimentaire', icon: faLeaf },
    { name: 'CFP Dorcas', path: '/cfp-dorcas', icon: faGraduationCap },
  ];

  const infoLinks = [
    { name: 'À propos', path: '/fondatrice' },
    { name: 'Galerie', path: '/galerie' },
    { name: 'Foires & Événements', path: '/foires' },
    { name: 'Contact', path: '/contact' },
    { name: 'Conditions Générales', path: '/conditions-generales' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-afi-dark-bg text-white mt-auto">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faNewspaper} className="text-afi-green text-xl" />
                <h3 className="font-serif text-xl font-bold">Newsletter</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Recevez nos actualités et offres exclusives
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800 dark:bg-gray-700 text-white placeholder-gray-400 border border-gray-700 focus:border-afi-green focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-afi-green text-white rounded-lg font-semibold hover:bg-afi-green-dark transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                S'inscrire <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
              </button>
            </form>
            {newsletterStatus && (
              <p className="text-afi-green text-sm mt-2 text-center md:text-left">{newsletterStatus}</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="AFI Collection" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              « Tisser l'avenir, valoriser le local » — AFI Collection valorise le patrimoine artisanal du Bénin et de l'Afrique de l'Ouest.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                  style={{ backgroundColor: social.color }}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-white text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Nos Produits */}
          <div>
            <h4 className="font-mono text-[11px] text-afi-green tracking-wider mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faStore} className="text-sm" />
              NOS PRODUITS
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-afi-green transition-colors text-sm flex items-center gap-2 group"
                  >
                    <FontAwesomeIcon icon={link.icon} className="text-xs opacity-60 group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="font-mono text-[11px] text-afi-green tracking-wider mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faNewspaper} className="text-sm" />
              INFORMATIONS
            </h4>
            <ul className="space-y-2.5">
              {infoLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-afi-green transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-[11px] text-afi-green tracking-wider mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
              CONTACT
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <FontAwesomeIcon icon={faPhone} className="text-afi-green mt-0.5" />
                <span>+229 01 96 06 22 87</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <FontAwesomeIcon icon={faEnvelope} className="text-afi-green mt-0.5" />
                <a href="mailto:afiavitossa@gmail.com" className="hover:text-afi-green transition-colors">
                  afiavitossa@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-afi-green mt-0.5" />
                <span>Zoundja, Abomey-Calavi, Bénin</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <FontAwesomeIcon icon={faClock} className="text-afi-green mt-0.5" />
                <span>Lun - Sam : 9h - 18h</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 text-afi-green text-sm font-semibold hover:gap-3 transition-all"
              >
                Formulaire de contact <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs font-mono tracking-wider">
              © {currentYear} AFI Collection - Tous droits réservés
            </p>
            <div className="flex gap-6">
              <Link to="/conditions-generales" className="text-gray-500 text-xs hover:text-afi-green transition-colors">
                Conditions générales
              </Link>
              <Link to="/politique-confidentialite" className="text-gray-500 text-xs hover:text-afi-green transition-colors">
                Confidentialité
              </Link>
            </div>
            <p className="text-gray-600 text-xs flex items-center gap-1">
              Conçu avec <FontAwesomeIcon icon={faHeart} className="text-afi-red text-xs" /> au Bénin
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
