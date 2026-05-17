import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faEnvelope, faLock, faPhone, faEye, faEyeSlash, 
  faArrowRight, faUserPlus, faIdCard, faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName) newErrors.lastName = 'Nom requis';
    if (!formData.email) newErrors.email = 'Email requis';
    if (!formData.phone) newErrors.phone = 'Téléphone requis';
    if (!formData.password) newErrors.password = 'Mot de passe requis';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ 
        email: formData.email, 
        name: `${formData.firstName} ${formData.lastName}` 
      }));
      navigate('/');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Inscription - AFI Collection</title>
        <meta name="description" content="Créez votre compte AFI Collection" />
      </Helmet>

      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-16 px-4">
        <div className="max-w-md mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-afi-ink/50 rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-afi-yellow/10 rounded-full mb-4">
                <FontAwesomeIcon icon={faUserPlus} className="text-3xl text-afi-yellow" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Inscription
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Créez votre compte pour profiter de tous nos services
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-2">
                    PRÉNOM
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-afi-ink rounded-xl focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all"
                      placeholder="Jean"
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-2">
                    NOM
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-afi-ink rounded-xl focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all"
                      placeholder="Dupont"
                    />
                  </div>
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-2">
                  EMAIL
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-afi-ink rounded-xl focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all"
                    placeholder="jean.dupont@email.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-2">
                  TÉLÉPHONE
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-afi-ink rounded-xl focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all"
                    placeholder="+229 01 23 45 67"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-2">
                  MOT DE PASSE
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faShieldAlt} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-afi-ink rounded-xl focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-2">
                  CONFIRMER LE MOT DE PASSE
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faShieldAlt} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-afi-ink rounded-xl focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" className="w-4 h-4 rounded border-gray-300 text-afi-green focus:ring-afi-green" required />
                <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                  J'accepte les{' '}
                  <Link to="/conditions-generales" className="text-afi-green hover:underline">conditions générales</Link>
                  {' '}et la{' '}
                  <Link to="/politique-confidentialite" className="text-afi-green hover:underline">politique de confidentialité</Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-afi-green text-white py-3 rounded-xl font-semibold hover:bg-afi-greenDark transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Créer mon compte
                    <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-afi-ink/50 text-gray-500">ou</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full border border-gray-300 dark:border-gray-600 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-afi-ink/30 transition-colors">
                <FontAwesomeIcon icon={faGoogle} className="text-red-500 text-lg" />
                <span className="text-gray-700 dark:text-gray-300">S'inscrire avec Google</span>
              </button>
              <button className="w-full border border-gray-300 dark:border-gray-600 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-afi-ink/30 transition-colors">
                <FontAwesomeIcon icon={faFacebookF} className="text-blue-600 text-lg" />
                <span className="text-gray-700 dark:text-gray-300">S'inscrire avec Facebook</span>
              </button>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Déjà inscrit ?{' '}
                <Link to="/login" className="text-afi-green font-semibold hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Register;
