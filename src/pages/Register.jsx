import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faEnvelope, faLock, faPhone, faEye, faEyeSlash, 
  faArrowRight, faArrowLeft, faCheckCircle, faUserPlus,
  faMapMarkerAlt, faUserCheck, faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
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

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName) newErrors.lastName = 'Nom requis';
    if (!formData.email) newErrors.email = 'Email requis';
    if (!formData.phone) newErrors.phone = 'Téléphone requis';
    if (formData.phone && formData.phone.length < 8) newErrors.phone = 'Téléphone invalide';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.password) newErrors.password = 'Mot de passe requis';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
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

  const stepProgress = [
    { number: 1, title: 'Informations', icon: faUser },
    { number: 2, title: 'Sécurité', icon: faShieldAlt }
  ];

  return (
    <>
      <Helmet>
        <title>Inscription - AFI Collection</title>
        <meta name="description" content="Créez votre compte AFI Collection" />
      </Helmet>

      <div className="min-h-[calc(100vh-80px)] py-8 px-4 bg-gradient-to-br from-afi-cream to-gray-100 dark:from-afi-dark-bg dark:to-gray-900">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            {stepProgress.map((s, i) => (
              <div key={s.number} className="flex items-center">
                <div className={`flex flex-col items-center ${step >= s.number ? 'text-afi-green' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    step > s.number ? 'bg-afi-green border-afi-green text-white' :
                    step === s.number ? 'border-afi-green text-afi-green' : 'border-gray-600 text-gray-600'
                  }`}>
                    {step > s.number ? <FontAwesomeIcon icon={faCheckCircle} /> : s.number}
                  </div>
                  <span className="text-xs mt-2 font-mono tracking-wider text-gray-600 dark:text-gray-400">{s.title}</span>
                </div>
                {i < stepProgress.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${step > s.number ? 'bg-afi-green' : 'bg-gray-600'}`}></div>
                )}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl shadow-2xl overflow-hidden border-2 border-afi-green dark:border-afi-dark-border bg-white dark:bg-afi-dark-card"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-afi-green to-afi-green-dark px-6 py-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-full mb-3">
                <FontAwesomeIcon icon={faUserPlus} className="text-2xl text-white" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-white">Créer un compte</h1>
              <p className="text-white/80 text-sm mt-1">
                {step === 1 ? 'Vos informations personnelles' : 'Sécurisez votre compte'}
              </p>
            </div>

            {/* Formulaire multi-étapes */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="font-mono text-[10px] text-afi-green dark:text-afi-green tracking-wider block mb-2">
                            <FontAwesomeIcon icon={faUser} className="mr-1" /> PRÉNOM *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-afi-dark-card text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-afi-green transition-all"
                            placeholder="Jean"
                          />
                          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="font-mono text-[10px] text-afi-green dark:text-afi-green tracking-wider block mb-2">
                            <FontAwesomeIcon icon={faUser} className="mr-1" /> NOM *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-afi-dark-card text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-afi-green transition-all"
                            placeholder="Dupont"
                          />
                          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="font-mono text-[10px] text-afi-green dark:text-afi-green tracking-wider block mb-2">
                          <FontAwesomeIcon icon={faEnvelope} className="mr-1" /> EMAIL *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-afi-dark-card text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-afi-green transition-all"
                          placeholder="jean.dupont@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="font-mono text-[10px] text-afi-green dark:text-afi-green tracking-wider block mb-2">
                          <FontAwesomeIcon icon={faPhone} className="mr-1" /> TÉLÉPHONE *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-afi-dark-card text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-afi-green transition-all"
                          placeholder="+229 01 23 45 67"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="font-mono text-[10px] text-afi-green dark:text-afi-green tracking-wider block mb-2">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" /> ADRESSE
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-afi-dark-card text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-afi-green transition-all"
                            placeholder="Votre adresse"
                          />
                        </div>
                        <div>
                          <label className="font-mono text-[10px] text-afi-green dark:text-afi-green tracking-wider block mb-2">
                            VILLE
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-afi-dark-card text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-afi-green transition-all"
                            placeholder="Cotonou"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-afi-green to-afi-green-dark text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                      >
                        Continuer <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="font-mono text-[10px] text-afi-green dark:text-afi-green tracking-wider block mb-2">
                          <FontAwesomeIcon icon={faLock} className="mr-1" /> MOT DE PASSE *
                        </label>
                        <div className="relative">
                          <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-400 text-sm" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-12 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-afi-dark-card text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-afi-green transition-all"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-400"
                          >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                          </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                      </div>

                      <div>
                        <label className="font-mono text-[10px] text-afi-green dark:text-afi-green tracking-wider block mb-2">
                          <FontAwesomeIcon icon={faLock} className="mr-1" /> CONFIRMER LE MOT DE PASSE *
                        </label>
                        <div className="relative">
                          <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-400 text-sm" />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full pl-10 pr-12 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-afi-dark-card text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-afi-green transition-all"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-400"
                          >
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                          </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 border-2 border-afi-green text-afi-green py-3 rounded-xl font-semibold hover:bg-afi-green/10 transition-all flex items-center justify-center gap-2"
                        >
                          <FontAwesomeIcon icon={faArrowLeft} /> Retour
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 bg-gradient-to-r from-afi-green to-afi-green-dark text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <>
                              S'inscrire
                              <FontAwesomeIcon icon={faUserCheck} />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-afi-dark-card text-gray-500 dark:text-gray-400">ou</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full border-2 border-gray-200 dark:border-gray-600 py-2.5 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <FontAwesomeIcon icon={faGoogle} className="text-red-500 text-lg" />
                  <span className="text-gray-700 dark:text-gray-300">S'inscrire avec Google</span>
                </button>
                <button className="w-full border-2 border-gray-200 dark:border-gray-600 py-2.5 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <FontAwesomeIcon icon={faFacebookF} className="text-blue-600 text-lg" />
                  <span className="text-gray-700 dark:text-gray-300">S'inscrire avec Facebook</span>
                </button>
              </div>

              <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Déjà inscrit ?{' '}
                  <Link to="/login" className="text-afi-green font-semibold hover:underline">
                    Se connecter
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

export default Register;
