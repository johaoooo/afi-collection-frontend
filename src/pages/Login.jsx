import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faArrowRight, faKey, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (formData.email && formData.password) {
        localStorage.setItem('user', JSON.stringify({ email: formData.email, name: 'Utilisateur' }));
        navigate('/');
      } else {
        setErrors({ general: 'Email ou mot de passe incorrect' });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Connexion - AFI Collection</title>
        <meta name="description" content="Connectez-vous à votre compte AFI Collection" />
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-afi-green/10 rounded-full mb-4">
                <FontAwesomeIcon icon={faUserShield} className="text-3xl text-afi-green" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Connexion
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Connectez-vous pour accéder à votre espace personnel
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm text-center">
                  {errors.general}
                </div>
              )}

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
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-2">
                  MOT DE PASSE
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faKey} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-afi-ink rounded-xl focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-afi-green focus:ring-afi-green" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Se souvenir de moi</span>
                </label>
                <Link to="/mot-de-passe-oublie" className="text-sm text-afi-green hover:text-afi-greenDark transition-colors">
                  Mot de passe oublié ?
                </Link>
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
                    Se connecter
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
                <span className="text-gray-700 dark:text-gray-300">Continuer avec Google</span>
              </button>
              <button className="w-full border border-gray-300 dark:border-gray-600 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-afi-ink/30 transition-colors">
                <FontAwesomeIcon icon={faFacebookF} className="text-blue-600 text-lg" />
                <span className="text-gray-700 dark:text-gray-300">Continuer avec Facebook</span>
              </button>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Pas encore de compte ?{' '}
                <Link to="/register" className="text-afi-green font-semibold hover:underline">
                  Créer un compte
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Login;
