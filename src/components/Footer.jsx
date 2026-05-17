import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-afi-dark-bg text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo et infos */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="AFI Collection" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 italic text-sm mb-4">« Tisser l'avenir, valoriser le local »</p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center hover:border-afi-green hover:text-afi-green transition-colors text-gray-300 hover:text-white">
                <FontAwesomeIcon icon={faFacebook} className="text-sm" />
              </a>
              <a href="#" className="w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center hover:border-afi-green hover:text-afi-green transition-colors text-gray-300 hover:text-white">
                <FontAwesomeIcon icon={faInstagram} className="text-sm" />
              </a>
              <a href="#" className="w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center hover:border-afi-green hover:text-afi-green transition-colors text-gray-300 hover:text-white">
                <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
              </a>
            </div>
          </div>
          
          {/* La Marque */}
          <div>
            <h4 className="font-mono text-[9px] text-afi-green tracking-wider mb-4">LA MARQUE</h4>
            <ul className="space-y-2">
              <li><Link to="/afisac" className="text-gray-300 hover:text-afi-green transition-colors text-sm">AFISAC - Sacs & Chaussures</Link></li>
              <li><Link to="/afi-textile" className="text-gray-300 hover:text-afi-green transition-colors text-sm">AFI Textile - Pagnes & Tissus</Link></li>
              <li><Link to="/afi-mode" className="text-gray-300 hover:text-afi-green transition-colors text-sm">AFI Mode - Accessoires</Link></li>
              <li><Link to="/agroalimentaire" className="text-gray-300 hover:text-afi-green transition-colors text-sm">Agroalimentaire</Link></li>
            </ul>
          </div>
          
          {/* Formation & Événements */}
          <div>
            <h4 className="font-mono text-[9px] text-afi-green tracking-wider mb-4">FORMATION</h4>
            <ul className="space-y-2">
              <li><Link to="/cfp-dorcas" className="text-gray-300 hover:text-afi-green transition-colors text-sm">CFP Dorcas</Link></li>
              <li><Link to="/foires" className="text-gray-300 hover:text-afi-green transition-colors text-sm">Foires & Événements</Link></li>
              <li><Link to="/galerie" className="text-gray-300 hover:text-afi-green transition-colors text-sm">Galerie</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-mono text-[9px] text-afi-green tracking-wider mb-4">CONTACT</h4>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm flex items-center gap-2">📞 +229 01 96 06 22 87</li>
              <li className="text-gray-300 text-sm flex items-center gap-2">✉ afiavitossa@gmail.com</li>
              <li className="text-gray-300 text-sm flex items-center gap-2">📍 Zoundja, Abomey-Calavi, Bénin</li>
              <li><Link to="/contact" className="text-afi-green hover:text-afi-green-dark transition-colors text-sm">Formulaire de contact →</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-xs font-mono tracking-wider">
            © 2026 AFI Collection - Tous droits réservés - Conçu avec <FontAwesomeIcon icon={faHeart} className="text-afi-red text-xs" /> au Bénin
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
