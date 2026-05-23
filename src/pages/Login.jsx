import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faArrowRight, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

import API_URL from "../config/api";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Remplir l'email sauvegardé
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setErrors({});
  
  try {
    const response = await axios.post(`${API_URL}/login`, formData);
    
    // Sauvegarder le token
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('adminUser', JSON.stringify(response.data.user));
    
    // Rediriger selon le rôle
    if (response.data.user.role === 'client') {
      navigate('/dashboard');
    } else {
      navigate('/admin');
    }
  } catch (error) {
    if (error.response?.status === 401) {
      setErrors({ general: 'Email ou mot de passe incorrect' });
    } else {
      setErrors({ general: 'Erreur de connexion' });
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      <Helmet>
        <title>Connexion - AFI Collection</title>
        <meta name="description" content="Connectez-vous à votre compte AFI Collection" />
      </Helmet>

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-8 px-4 bg-gradient-to-br from-afi-cream to-gray-100 dark:from-afi-dark-bg dark:to-gray-900">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl shadow-2xl overflow-hidden border-2 border-afi-green dark:border-afi-dark-border bg-white dark:bg-afi-dark-card"
          >
            {/* Header avec icône */}
            <div className="bg-gradient-to-r from-afi-green to-afi-green-dark px-6 py-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <FontAwesomeIcon icon={faUserShield} className="text-3xl text-white" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-white">Bienvenue</h1>
              <p className="text-white/80 text-sm mt-1">Connectez-vous à votre compte</p>
            </div>

            {/* Formulaire */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {errors.general && (
                  <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm text-center">
                    {errors.general}
                  </div>
                )}

                <div>
                  <label className="font-mono text-[10px] text-afi-green dark:text-afi-green tracking-wider block mb-2">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-1" /> EMAIL
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-400 text-sm" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-afi-dark-card text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-afi-green dark:text-afi-green tracking-wider block mb-2">
                    <FontAwesomeIcon icon={faLock} className="mr-1" /> MOT DE PASSE
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-400 text-sm" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-afi-dark-card text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-400"
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-afi-green focus:ring-afi-green" 
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Se souvenir de moi</span>
                  </label>
                  <Link to="/mot-de-passe-oublie" className="text-sm text-afi-green hover:text-afi-green-dark transition-colors">
                    Mot de passe oublié ?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-afi-green to-afi-green-dark text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-afi-dark-card text-gray-500 dark:text-gray-400">ou</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full border-2 border-gray-200 dark:border-gray-600 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <FontAwesomeIcon icon={faGoogle} className="text-red-500 text-lg" />
                  <span className="text-gray-700 dark:text-gray-300">Continuer avec Google</span>
                </button>
                <button className="w-full border-2 border-gray-200 dark:border-gray-600 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <FontAwesomeIcon icon={faFacebookF} className="text-blue-600 text-lg" />
                  <span className="text-gray-700 dark:text-gray-300">Continuer avec Facebook</span>
                </button>
              </div>

              <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Pas encore de compte ?{' '}
                  <Link to="/register" className="text-afi-green font-semibold hover:underline">
                    Créer un compte
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Login;
