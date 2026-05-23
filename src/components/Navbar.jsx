import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faTags, faGraduationCap, faUserTie, faImage, 
  faEnvelope, faHeart, faMoon, faSun, faUser, faShoppingCart,
  faBagShopping, faShirt, faGem, faLeaf, faChalkboardUser,
  faGlobe, faBars, faUserCircle, faEdit, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

function Navbar() {
  const { dark, toggle } = useTheme();
  const { items, toggleCart } = useCart();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [logoError, setLogoError] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('adminUser');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserRole(user.role);
        setUserName(user.name);
      } catch(e) {
        console.error('Erreur lecture rôle', e);
      }
    }
  }, []);

  const handleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/login');
    setShowUserMenu(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-afi-dark-bg border-b-2 border-afi-green shadow-lg transition-colors rounded-2xl w-fit mx-auto">
      <div className="px-4">
        <div className="flex justify-between items-center h-16 md:h-20 px-2 md:px-6">
          {/* Logo */}
          <div onClick={() => navigate('/')} className="flex items-center cursor-pointer mt-1 md:mt-2">
            {!logoError ? (
              <img src={logo} alt="AFI Collection" className="h-14 md:h-16 w-auto object-contain" onError={() => setLogoError(true)} />
            ) : (
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-afi-green flex items-center justify-center bg-white dark:bg-afi-dark-bg">
                <span className="font-bold text-xl md:text-2xl"><span className="text-black">A</span><span className="text-afi-yellow">F</span><span className="text-afi-red">I</span></span>
              </div>
            )}
          </div>

          {/* Menu mobile - hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggle} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-black dark:text-white"><FontAwesomeIcon icon={dark ? faSun : faMoon} className="text-sm" /></button>
            <button onClick={toggleCart} className="relative w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-black dark:text-white">
              <FontAwesomeIcon icon={faShoppingCart} className="text-sm" />
              {items.length > 0 && (<span className="absolute -top-1 -right-1 w-4 h-4 bg-afi-red text-white text-[9px] rounded-full flex items-center justify-center">{items.length}</span>)}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-black dark:text-white">
              <FontAwesomeIcon icon={faBars} className="text-sm" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1" ref={dropdownRef}>
            <Link to="/" className="px-3 py-2 text-black dark:text-gray-200 hover:text-afi-green-dark transition-colors flex items-center gap-2 hover:bg-afi-green/10 rounded-lg font-medium"><FontAwesomeIcon icon={faHome} className="text-sm" /><span>Accueil</span></Link>
            
            <div className="relative">
              <button onClick={() => handleDropdown('marque')} className="px-3 py-2 text-black dark:text-gray-200 hover:text-afi-green-dark transition-colors flex items-center gap-2 hover:bg-afi-green/10 rounded-lg font-medium"><FontAwesomeIcon icon={faTags} className="text-sm" /><span>La Marque ▾</span></button>
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
              <button onClick={() => handleDropdown('formation')} className="px-3 py-2 text-black dark:text-gray-200 hover:text-afi-green-dark transition-colors flex items-center gap-2 hover:bg-afi-green/10 rounded-lg font-medium"><FontAwesomeIcon icon={faGraduationCap} className="text-sm" /><span>Formation ▾</span></button>
              {openDropdown === 'formation' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-afi-dark-bg border border-gray-200 dark:border-afi-dark-border shadow-lg z-50 rounded-xl overflow-hidden">
                  <Link to="/cfp-dorcas" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-afi-green hover:text-white transition-colors"><FontAwesomeIcon icon={faChalkboardUser} className="w-5" /><span>CFP Dorcas</span></Link>
                  <Link to="/foires" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-afi-green hover:text-white transition-colors"><FontAwesomeIcon icon={faGlobe} className="w-5" /><span>Foires & Événements</span></Link>
                </div>
              )}
            </div>
            
            <Link to="/fondatrice" className="px-3 py-2 text-black dark:text-gray-200 hover:text-afi-green-dark transition-colors flex items-center gap-2 hover:bg-afi-green/10 rounded-lg font-medium"><FontAwesomeIcon icon={faUserTie} className="text-sm" /><span>La Fondatrice</span></Link>
            <Link to="/galerie" className="px-3 py-2 text-black dark:text-gray-200 hover:text-afi-green-dark transition-colors flex items-center gap-2 hover:bg-afi-green/10 rounded-lg font-medium"><FontAwesomeIcon icon={faImage} className="text-sm" /><span>Galerie</span></Link>
            <Link to="/contact" className="px-3 py-2 text-black dark:text-gray-200 hover:text-afi-green-dark transition-colors flex items-center gap-2 hover:bg-afi-green/10 rounded-lg font-medium"><FontAwesomeIcon icon={faEnvelope} className="text-sm" /><span>Contact</span></Link>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-2">
            <button onClick={toggle} className="w-9 h-9 rounded-full border border-gray-300 dark:border-afi-dark-border flex items-center justify-center hover:border-afi-green hover:bg-afi-green/10 transition-colors text-black dark:text-gray-200"><FontAwesomeIcon icon={dark ? faSun : faMoon} className="text-sm" /></button>
            
            {/* Menu utilisateur déroulant */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-9 h-9 rounded-full border border-gray-300 dark:border-afi-dark-border flex items-center justify-center hover:border-afi-green hover:bg-afi-green/10 transition-colors text-black dark:text-gray-200"
              >
                <FontAwesomeIcon icon={faUser} className="text-sm" />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-afi-dark-bg border border-gray-200 dark:border-afi-dark-border rounded-lg shadow-lg z-50 overflow-hidden">
                  {userName && (
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{userName}</p>
                      <p className="text-xs text-gray-500">{userRole === 'admin' ? 'Administrateur' : 'Client'}</p>
                    </div>
                  )}
                  <Link 
                    to={userRole === 'admin' ? '/admin' : '/dashboard'} 
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-afi-green hover:text-white transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <FontAwesomeIcon icon={faUserCircle} className="w-4" />
                    Mon espace
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="w-4" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>

            <button onClick={toggleCart} className="relative w-9 h-9 rounded-full border border-gray-300 dark:border-afi-dark-border flex items-center justify-center hover:border-afi-green hover:bg-afi-green/10 transition-colors text-black dark:text-gray-200">
              <FontAwesomeIcon icon={faShoppingCart} className="text-sm" />
              {items.length > 0 && (<span className="absolute -top-1 -right-1 w-4 h-4 bg-afi-red text-white text-[9px] rounded-full flex items-center justify-center">{items.length}</span>)}
            </button>
            <Link to="/don" className="ml-2 bg-afi-red text-white px-3 py-1.5 text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-1.5 rounded-lg"><FontAwesomeIcon icon={faHeart} />Don</Link>
          </div>
        </div>

        {/* Menu mobile déroulant */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="px-4 py-2 text-black dark:text-gray-200 hover:bg-afi-green/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Accueil</Link>
              <Link to="/afisac" className="px-4 py-2 text-black dark:text-gray-200 hover:bg-afi-green/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>AFISAC</Link>
              <Link to="/afi-textile" className="px-4 py-2 text-black dark:text-gray-200 hover:bg-afi-green/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>AFI Textile</Link>
              <Link to="/afi-mode" className="px-4 py-2 text-black dark:text-gray-200 hover:bg-afi-green/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>AFI Mode</Link>
              <Link to="/agroalimentaire" className="px-4 py-2 text-black dark:text-gray-200 hover:bg-afi-green/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Agroalimentaire</Link>
              <Link to="/cfp-dorcas" className="px-4 py-2 text-black dark:text-gray-200 hover:bg-afi-green/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>CFP Dorcas</Link>
              <Link to="/fondatrice" className="px-4 py-2 text-black dark:text-gray-200 hover:bg-afi-green/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>La Fondatrice</Link>
              <Link to="/galerie" className="px-4 py-2 text-black dark:text-gray-200 hover:bg-afi-green/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Galerie</Link>
              <Link to="/contact" className="px-4 py-2 text-black dark:text-gray-200 hover:bg-afi-green/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link to="/login" className="px-4 py-2 text-black dark:text-gray-200 hover:bg-afi-green/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Mon compte</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
