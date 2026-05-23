import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

function Loader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          >
            <div className="text-center">
              {/* Logo animé */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="mb-6"
              >
                <img 
                  src={logo} 
                  alt="AFI Collection" 
                  className="w-28 h-28 mx-auto object-contain"
                />
              </motion.div>

              {/* Titre */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="font-serif text-3xl font-bold text-gray-800 mb-2"
              >
                AFI Collection
              </motion.h1>

              {/* Slogan */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-gray-500 text-sm mb-8"
              >
                Tisser l'avenir, valoriser le local
              </motion.p>

              {/* Barre de progression animée */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="h-1 bg-gray-200 rounded-full overflow-hidden w-48 mx-auto"
              >
                <motion.div
                  className="h-full bg-afi-green rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              </motion.div>

              {/* Points de chargement */}
              <div className="flex justify-center gap-2 mt-4">
                {[0, 0.2, 0.4].map((delay, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay, repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-2 bg-afi-green rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}

export default Loader;
