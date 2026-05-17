import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowRight, faPaperPlane, faKey, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Veuillez saisir votre adresse email');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulation d'envoi (à remplacer par appel API)
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Mot de passe oublié - AFI Collection</title>
        <meta name="description" content="Réinitialisez votre mot de passe AFI Collection" />
      </Helmet>

      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-16 px-4">
        <div className="max-w-md mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-afi-ink/50 rounded-2xl shadow-xl p-8"
          >
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-afi-yellow/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faKey} className="text-3xl text-afi-yellow" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Mot de passe oublié
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Saisissez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm text-center">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-2">
                      ADRESSE EMAIL
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-afi-ink rounded-xl focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Nous vous enverrons un lien de réinitialisation à cette adresse.
                    </p>
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
                        Envoyer le lien
                        <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link to="/login" className="text-sm text-afi-green hover:text-afi-greenDark transition-colors flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                    Retour à la connexion
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-afi-green/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-3xl text-afi-green" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Email envoyé !
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    Un lien de réinitialisation a été envoyé à <strong>{email}</strong>.<br />
                    Veuillez vérifier votre boîte de réception (et vos spams).
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full bg-afi-green text-white py-3 rounded-xl font-semibold hover:bg-afi-greenDark transition-all flex items-center justify-center gap-2"
                    >
                      Retour à la connexion
                      <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                    </button>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setEmail('');
                      }}
                      className="w-full border border-gray-300 dark:border-gray-600 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-afi-ink/30 transition-all"
                    >
                      Renvoyer l'email
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
