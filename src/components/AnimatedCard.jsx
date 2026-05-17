import React from 'react';
import { motion } from 'framer-motion';

function AnimatedCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedCard;
