import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faShoppingCart, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useCart } from '../context/CartContext';

function AfiMode() {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  
  const products = [
    { id: 20, name: 'Collier Macramé Royal', price: 12000, icon: '📿', desc: 'Collier fait main en macramé', popularity: 67 },
    { id: 21, name: 'Bracelet Tissé Set', price: 8000, icon: '💚', desc: 'Set de 3 bracelets tissés', popularity: 89 },
    { id: 22, name: 'Ceinture Macramé Gold', price: 15000, icon: '✨', desc: 'Ceinture avec finitions dorées', popularity: 45 },
    { id: 23, name: "Boucles d'Oreilles", price: 6000, icon: '🟢', desc: 'Boucles d\'oreilles en macramé', popularity: 78 },
    { id: 24, name: 'Foulard Pagne Chic', price: 10000, icon: '🧣', desc: 'Foulard en pagne tissé', popularity: 56 },
    { id: 25, name: 'Pochette Pagne Mini', price: 7000, icon: '👛', desc: 'Mini pochette élégante', popularity: 92 }
  ];

  const filteredProducts = searchTerm === '' 
    ? products 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <>
      <Helmet><title>AFI Mode - Accessoires artisanaux | AFI Collection</title></Helmet>
      <div className="bg-gradient-to-r from-afi-green to-afi-greenDark rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4"><FontAwesomeIcon icon={faGem} className="text-sm text-white" /><span className="text-xs font-medium text-white">AFI Mode</span></div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">Accessoires de Mode</h1>
              <p className="text-white/80 text-sm max-w-md mx-auto">Bijoux tissés, ceintures et accessoires tendance — 100% faits main avec une touche africaine authentique.</p>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><FontAwesomeIcon icon={faSearch} className="text-gray-400 text-sm" /></div>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher un bijou, ceinture..." className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-white text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-afi-green shadow-md" />
            {searchTerm && (<button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-4 flex items-center"><FontAwesomeIcon icon={faTimes} className="text-gray-400 hover:text-gray-600 text-sm" /></button>)}
          </div>
          {searchTerm && (<p className="text-center text-sm text-gray-500 mt-2">{filteredProducts.length} résultat{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}</p>)}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16"><div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3"><FontAwesomeIcon icon={faGem} className="text-2xl text-gray-400" /></div><p className="text-gray-500">Aucun produit trouvé</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <div className="relative h-48 flex items-center justify-center text-6xl bg-gradient-to-br from-gray-50 to-gray-100">{product.icon}</div>
                <div className="p-5"><h3 className="font-serif text-xl font-bold text-gray-800 mb-1">{product.name}</h3><p className="text-gray-500 text-sm mb-3">{product.desc}</p>
                <div className="flex justify-between items-center mb-4"><span className="font-mono text-afi-green font-bold text-lg">{product.price.toLocaleString('fr-FR')} FCFA</span>
                <div className="flex items-center gap-1 text-xs text-gray-400"><FontAwesomeIcon icon={faShoppingCart} className="text-afi-green" /> {product.popularity}</div></div>
                <div className="flex gap-3"><button onClick={() => addItem({ id: product.id, name: product.name, price: product.price })} className="flex-1 bg-afi-green text-white py-2 rounded-lg font-semibold text-sm hover:bg-afi-greenDark transition-all">Ajouter au panier</button>
                <a href="https://wa.me/2290196062287" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-all"><FontAwesomeIcon icon={faWhatsapp} /></a></div></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AfiMode;
