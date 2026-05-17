import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faTags, faGraduationCap, faUserTie, faImage, 
  faEnvelope, faHeart, faMoon, faSun, faUser, faShoppingCart,
  faBagShopping, faShirt, faGem, faLeaf, faChalkboardUser,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

function Navbar() {
  const { dark, toggle } = useTheme();
  const { items, toggleCart } = useCart();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-afi-dark-bg border-b-2 border-afi-green shadow-lg transition-colors rounded-b-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20 px-6">
          <div onClick={() => navigate('/')} className="flex items-center cursor-pointer">
            {!logoError ? (
              <img src={logo} alt="AFI Collection" className="h-16 w-auto object-contain" onError={() => setLogoError(true)} />
            ) : (
              <div className="w-14 h-14 rounded-full border-2 border-afi-green flex items-center justify-center bg-white dark:bg-afi-dark-bg">
                <span className="font-bold text-2xl"><span className="text-afi-green">A</span><span className="text-afi-yellow">F</span><span className="text-afi-red">I</span></span>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-1" ref={dropdownRef}>
            <Link to="/" className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-afi-green transition-colors flex items-center gap-2 hover:bg-afi-green/10 rounded-lg font-medium"><FontAwesomeIcon icon={faHome} className="text-sm" /><span>Accueil</span></Link>
            
            <div className="relative">
              <button onClick={() => handleDropdown('marque')} className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-afi-green transition-colors flex items-center gap-2 hover:bg-afi-green/10 rounded-lg font-medium"><FontAwesomeIcon icon={faTags} className="text-sm" /><span>La Marque ▾</span></button>
              {openDropdown === 'marque' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-afi-dark-bg border border-gray-200 dark:border-afi-dark-border shadow-lg z-50 rounded-xl overflow-hidden">
                  <Link to="/afisac" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-afi-green hover:text-white transition-colors"><FontAwesomeIcon icon={faBagShopping} className="w-5" /><span>AFISAC - Sacs & Chaussures</span></Link>
                  <Link to="/afi-textile" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-afi-green hover:text-white transition-colors"><FontAwesomeIcon icon={faShirt} className="w-5" /><span>AFI Textile - Pagnes & Tissus</span></Link>
                  <Link to="/afi-mode" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-afi-green hover:text-white transition-colors"><FontAwesomeIcon icon={faGem} className="w-5" /><span>AFI Mode - Accessoires</span></Link>
                  <Link to="/agroalimentaire" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-afi-green hover:text-white transition-colors"><FontAwesomeIcon icon={faLeaf} className="w-5" /><span>Agroalimentaire</span></Link>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button onClick={() => handleDropdown('formation')} className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-afi-green transition-colors flex items-center gap-2 hover:bg-afi-green/10 rounded-lg font-medium"><FontAwesomeIcon icon={faGraduationCap} className="text-sm" /><span>Formation ▾</span></button>
              {openDropdown === 'formation' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-afi-dark-bg border border-gray-200 dark:border-afi-dark-border shadow-lg z-50 rounded-xl overflow-hidden">
                  <Link to="/cfp-dorcas" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-afi-green hover:text-white transition-colors"><FontAwesomeIcon icon={faChalkboardUser} className="w-5" /><span>CFP Dorcas</span></Link>
                  <Link to="/foires" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-afi-green hover:text-white transition-colors"><FontAwesomeIcon icon={faGlobe} className="w-5" /><span>Foires & Événements</span></Link>
                </div>
              )}
            </div>
            
            <Link to="/fondatrice" className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-afi-green transition-colors flex items-center gap-2 hover:bg-afi-green/10 rounded-lg font-medium"><FontAwesomeIcon icon={faUserTie} className="text-sm" /><span>La Fondatrice</span></Link>
            <Link to="/galerie" className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-afi-green transition-colors flex items-center gap-2 hover:bg-afi-green/10 rounded-lg font-medium"><FontAwesomeIcon icon={faImage} className="text-sm" /><span>Galerie</span></Link>
            <Link to="/contact" className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-afi-green transition-colors flex items-center gap-2 hover:bg-afi-green/10 rounded-lg font-medium"><FontAwesomeIcon icon={faEnvelope} className="text-sm" /><span>Contact</span></Link>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggle} className="w-9 h-9 rounded-full border border-gray-300 dark:border-afi-dark-border flex items-center justify-center hover:border-afi-green hover:bg-afi-green/10 transition-colors text-gray-700 dark:text-gray-200"><FontAwesomeIcon icon={dark ? faSun : faMoon} className="text-sm" /></button>
            <Link to="/login" className="w-9 h-9 rounded-full border border-gray-300 dark:border-afi-dark-border flex items-center justify-center hover:border-afi-green hover:bg-afi-green/10 transition-colors text-gray-700 dark:text-gray-200"><FontAwesomeIcon icon={faUser} className="text-sm" /></Link>
            <button onClick={toggleCart} className="relative w-9 h-9 rounded-full border border-gray-300 dark:border-afi-dark-border flex items-center justify-center hover:border-afi-green hover:bg-afi-green/10 transition-colors text-gray-700 dark:text-gray-200"><FontAwesomeIcon icon={faShoppingCart} className="text-sm" />
              {items.length > 0 && (<span className="absolute -top-1 -right-1 w-4 h-4 bg-afi-red text-white text-[9px] rounded-full flex items-center justify-center">{items.length}</span>)}
            </button>
            <Link to="/don" className="ml-2 bg-afi-red text-white px-4 py-2 font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 rounded-lg"><FontAwesomeIcon icon={faHeart} />Faire un Don</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
