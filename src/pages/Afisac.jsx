import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faShoppingCart, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useCart } from '../context/CartContext';

function Afisac() {
  const { addItem } = useCart();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const products = [
    { id: 1, name: 'Sac Élégance', price: 25000, category: 'sac', icon: '👜', desc: 'Sac macramé fait main', popularity: 45 },
    { id: 2, name: 'Sac Bohème Royal', price: 32000, category: 'sac', icon: '🎒', desc: 'Sac en pagne tissé', popularity: 32 },
    { id: 3, name: 'Mini Pagne Chic', price: 15000, category: 'sac', icon: '👝', desc: 'Mini sac cérémonie', popularity: 28 },
    { id: 4, name: 'Sandales Royales', price: 22000, category: 'chaussure', icon: '👡', desc: 'Sandales en macramé', popularity: 38 },
    { id: 5, name: 'Mocassins Pagne', price: 35000, category: 'chaussure', icon: '👞', desc: 'Mocassins tissés', popularity: 25 },
    { id: 6, name: 'Chaussures Cérémonie', price: 40000, category: 'chaussure', icon: '👠', desc: 'Chaussures pagne', popularity: 20 }
  ];

  const filteredByCategory = filter === 'all' ? products : products.filter(p => p.category === filter);
  const filteredProducts = searchTerm === '' ? filteredByCategory : filteredByCategory.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.desc.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Helmet><title>AFISAC - Sacs & Chaussures artisanaux | AFI Collection</title></Helmet>
      <div className="bg-gradient-to-r from-afi-green to-afi-green-dark rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4"><FontAwesomeIcon icon={faBagShopping} className="text-sm text-white" /><span className="text-xs font-medium text-white">AFISAC</span></div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">Sacs & Chaussures Artisanaux</h1>
              <p className="text-white/80 text-sm max-w-md mx-auto">Créations en macramé et pagne, confectionnées à la main selon les techniques traditionnelles béninoises.</p>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><FontAwesomeIcon icon={faSearch} className="text-gray-400 text-sm" /></div>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher un produit..." className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-white dark:bg-afi-dark-card text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-afi-green shadow-md border-2 border-afi-green dark:border-afi-dark-border" />
            {searchTerm && (<button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-4 flex items-center"><FontAwesomeIcon icon={faTimes} className="text-gray-400 hover:text-gray-600 text-sm" /></button>)}
          </div>
          {searchTerm && (<p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">{filteredProducts.length} résultat{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}</p>)}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button onClick={() => setFilter('all')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === 'all' ? 'bg-afi-green text-white shadow-md' : 'bg-white dark:bg-afi-dark-card text-gray-700 dark:text-gray-200 border-2 border-afi-green dark:border-afi-dark-border hover:bg-afi-green/10'}`}>Tous</button>
          <button onClick={() => setFilter('sac')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === 'sac' ? 'bg-afi-green text-white shadow-md' : 'bg-white dark:bg-afi-dark-card text-gray-700 dark:text-gray-200 border-2 border-afi-green dark:border-afi-dark-border hover:bg-afi-green/10'}`}>Sacs Macramé</button>
          <button onClick={() => setFilter('chaussure')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === 'chaussure' ? 'bg-afi-green text-white shadow-md' : 'bg-white dark:bg-afi-dark-card text-gray-700 dark:text-gray-200 border-2 border-afi-green dark:border-afi-dark-border hover:bg-afi-green/10'}`}>Chaussures</button>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16"><div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-afi-dark-card rounded-full flex items-center justify-center mb-3"><FontAwesomeIcon icon={faBagShopping} className="text-2xl text-gray-400" /></div><p className="text-gray-500 dark:text-gray-400">Aucun produit trouvé</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-white dark:bg-afi-dark-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all border-2 border-afi-green dark:border-afi-dark-border">
                <div className="relative h-48 flex items-center justify-center text-6xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-afi-dark-card dark:to-afi-dark-bg">{product.icon}</div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold text-gray-800 dark:text-white mb-1">{product.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{product.desc}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-afi-green dark:text-white font-bold text-lg">{product.price.toLocaleString('fr-FR')} FCFA</span>
                    <div className="flex items-center gap-1 text-xs text-gray-400"><FontAwesomeIcon icon={faShoppingCart} className="text-afi-green dark:text-white/70" /> {product.popularity}</div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price })} className="flex-1 bg-afi-green text-white py-2 rounded-lg font-semibold text-sm hover:bg-afi-green-dark transition-all">Ajouter au panier</button>
                    <a href="https://wa.me/2290196062287" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-all"><FontAwesomeIcon icon={faWhatsapp} /></a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Afisac;
