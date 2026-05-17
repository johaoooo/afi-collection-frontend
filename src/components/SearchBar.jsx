import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faFilter, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

function SearchBar({ onSearch, onFilterChange, placeholder = "Rechercher un produit...", categories = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortBy, setSortBy] = useState('popularity');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, onSearch]);

  const handleFilterApply = () => {
    onFilterChange({
      category: selectedCategory,
      priceRange,
      sortBy
    });
    setShowFilters(false);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange({ min: 0, max: 100000 });
    setSortBy('popularity');
    onFilterChange({
      category: 'all',
      priceRange: { min: 0, max: 100000 },
      sortBy: 'popularity'
    });
  };

  return (
    <div className="mb-8">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400 dark:text-white/50" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-11 pr-11 py-3 border border-gray-200 dark:border-white/20 rounded-xl bg-white dark:bg-transparent text-gray-800 dark:text-white placeholder-gray-400 focus:border-afi-green focus:ring-2 focus:ring-afi-green/20 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              <FontAwesomeIcon icon={faTimes} className="text-gray-400 hover:text-gray-600 dark:text-white/50" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-5 py-3 rounded-xl flex items-center gap-2 transition-all ${
            showFilters 
              ? 'bg-afi-green text-white' 
              : 'bg-white dark:bg-afi-green border border-gray-200 dark:border-white/20 text-gray-600 dark:text-white/80 hover:bg-afi-green/10'
          }`}
        >
          <FontAwesomeIcon icon={faSlidersH} />
          <span className="text-sm font-medium hidden sm:inline">Filtres</span>
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-5 bg-white dark:bg-afi-green rounded-xl shadow-lg border border-gray-200 dark:border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Catégorie */}
              <div>
                <label className="font-mono text-[9px] text-afi-green dark:text-white/80 tracking-wider block mb-2">
                  <FontAwesomeIcon icon={faFilter} className="mr-1" /> CATÉGORIE
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 dark:border-white/20 rounded-lg bg-white dark:bg-transparent text-gray-700 dark:text-white text-sm"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Prix */}
              <div>
                <label className="font-mono text-[9px] text-afi-green dark:text-white/80 tracking-wider block mb-2">💰 PRIX MAXIMUM</label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-white/60 mt-1">
                  <span>0 FCFA</span>
                  <span>{priceRange.max.toLocaleString('fr-FR')} FCFA</span>
                </div>
              </div>

              {/* Tri */}
              <div>
                <label className="font-mono text-[9px] text-afi-green dark:text-white/80 tracking-wider block mb-2">📊 TRIER PAR</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 dark:border-white/20 rounded-lg bg-white dark:bg-transparent text-gray-700 dark:text-white text-sm"
                >
                  <option value="popularity">Popularité</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="name">Nom A-Z</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-white/10">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-white/70 transition-colors"
              >
                Réinitialiser
              </button>
              <button
                onClick={handleFilterApply}
                className="px-5 py-2 bg-afi-green text-white rounded-lg text-sm font-semibold hover:bg-afi-greenDark transition-all"
              >
                Appliquer les filtres
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;
