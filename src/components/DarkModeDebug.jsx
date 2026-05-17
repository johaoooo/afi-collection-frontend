import React from 'react';
import { useTheme } from '../context/ThemeContext';

function DarkModeDebug() {
  const { dark, toggle } = useTheme();
  
  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg bg-white dark:bg-black border-2 border-afi-green">
      <p className="text-sm font-mono mb-2 text-black dark:text-white">
        Dark mode: {dark ? '✅ ACTIF' : '❌ INACTIF'}
      </p>
      <button 
        onClick={toggle}
        className="px-3 py-1 bg-afi-green text-white rounded text-sm"
      >
        Toggle Theme
      </button>
      <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-700">
        <p className="text-xs text-black dark:text-white">Couleurs de test:</p>
        <div className="flex gap-2 mt-1">
          <div className="w-6 h-6 bg-black dark:bg-white border"></div>
          <div className="w-6 h-6 bg-afi-dark-bg dark:bg-afi-dark-bg border"></div>
          <div className="w-6 h-6 bg-afi-dark-card dark:bg-afi-dark-card border"></div>
        </div>
      </div>
    </div>
  );
}

export default DarkModeDebug;
