import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLeaf, faSeedling, faCheckCircle, 
  faStar, faUsers, faAward, faClock, faTruck,
  faArrowRight, faHeart, faStore, faSearch, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Agroalimentaire() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filieres = [
    {
      id: 'soja',
      name: 'Filière Soja',
      icon: faSeedling,
      color: 'from-green-500 to-emerald-600',
      bgLight: 'bg-green-50',
      description: 'Transformation complète du soja béninois en produits alimentaires variés et hautement nutritifs.',
      benefices: ['Riche en protéines (40%)', 'Source de fer et calcium', 'Excellent pour la santé cardiovasculaire', 'Idéal pour les régimes végétariens'],
      produits: [
        { name: 'Farine de Soja', price: '2 500 FCFA', weight: '500g', desc: 'Farine pure de soja béninois', icon: '🫘', popularite: 95 },
        { name: 'Bouillie de Soja', price: '1 800 FCFA', weight: '250g', desc: 'Bouillie instantanée enrichie', icon: '🥣', popularite: 88 },
        { name: 'Chips de Soja', price: '1 000 FCFA', weight: '100g', desc: 'Chips apéritives saines', icon: '🍿', popularite: 76 },
        { name: 'Sauce Soja', price: '2 500 FCFA', weight: '250ml', desc: 'Sauce traditionnelle artisanale', icon: '🥫', popularite: 82 }
      ]
    },
    {
      id: 'sesame',
      name: 'Filière Sésame',
      icon: faLeaf,
      color: 'from-yellow-500 to-amber-600',
      bgLight: 'bg-yellow-50',
      description: 'Graines de sésame transformées en produits alimentaires sains aux saveurs authentiques.',
      benefices: ['Riche en calcium (800mg/100g)', 'Source de magnésium et fer', 'Antioxydant naturel', 'Énergie durable'],
      produits: [
        { name: 'Farine de Sésame', price: '3 000 FCFA', weight: '500g', desc: 'Farine de sésame grillé', icon: '🌾', popularite: 92 },
        { name: 'Bouillie de Sésame', price: '2 000 FCFA', weight: '250g', desc: 'Bouillie énergétique', icon: '🥄', popularite: 85 },
        { name: 'Chips de Sésame', price: '1 200 FCFA', weight: '100g', desc: 'Chips apéritives croustillantes', icon: '🍪', popularite: 78 },
        { name: 'Sauce Sésame', price: '2 500 FCFA', weight: '250ml', desc: 'Sauce traditionnelle onctueuse', icon: '🥫', popularite: 80 },
        { name: 'Huile de Sésame', price: '4 000 FCFA', weight: '250ml', desc: 'Huile vierge pressée à froid', icon: '🫒', popularite: 70 }
      ]
    }
  ];

  // Filtrer les produits par recherche
  const allProducts = filieres.flatMap(f => f.produits.map(p => ({ ...p, filiere: f.id })));
  const filteredProducts = searchTerm === '' 
    ? allProducts 
    : allProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const qualites = [
    { icon: faAward, title: 'Produits certifiés', desc: 'Contrôle qualité rigoureux', color: 'text-afi-yellow' },
    { icon: faLeaf, title: '100% Naturel', desc: 'Sans additifs ni conservateurs', color: 'text-afi-green' },
    { icon: faHeart, title: 'Bien-être', desc: 'Des aliments sains et nutritifs', color: 'text-afi-red' },
    { icon: faUsers, title: 'Production locale', desc: 'Soutien aux agriculteurs béninois', color: 'text-afi-green' }
  ];

  const avis = [
    { nom: "Dr. A. Komlan", note: 5, commentaire: "Des produits d'excellente qualité.", produit: "Farine de Soja" },
    { nom: "Mme B. Fatou", note: 5, commentaire: "L'huile de sésame est divine !", produit: "Huile de Sésame" },
    { nom: "C. Rachid", note: 4, commentaire: "Très satisfait des produits AFI.", produit: "Bouillie de Soja" }
  ];

  return (
    <>
      <Helmet><title>Agroalimentaire - Farines de Soja & Sésame | AFI Collection</title></Helmet>
      <div className="bg-gradient-to-r from-lime-600 to-green-700 rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4"><FontAwesomeIcon icon={faLeaf} className="text-sm text-white" /><span className="text-xs font-medium text-white">Agroalimentaire</span></div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">Farines & Produits Locaux</h1>
              <p className="text-white/80 text-sm max-w-md mx-auto">Transformation des céréales et légumineuses béninoises — soja et sésame de qualité supérieure</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Barre de recherche */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><FontAwesomeIcon icon={faSearch} className="text-gray-400 text-sm" /></div>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher un produit..." className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-white text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-afi-green shadow-md" />
            {searchTerm && (<button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-4 flex items-center"><FontAwesomeIcon icon={faTimes} className="text-gray-400 hover:text-gray-600 text-sm" /></button>)}
          </div>
          {searchTerm && (<p className="text-center text-sm text-gray-500 mt-2">{filteredProducts.length} résultat{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}</p>)}
        </div>

        {/* Section qualités */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {qualites.map((q, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-afi-green/10 flex items-center justify-center mx-auto mb-3"><FontAwesomeIcon icon={q.icon} className={`text-2xl ${q.color}`} /></div>
              <h3 className="font-semibold text-gray-800 text-sm">{q.title}</h3><p className="text-gray-500 text-xs mt-1">{q.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Filières */}
        {filieres.map((filiere, idx) => (
          <motion.div key={filiere.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.2 }} className="mb-12">
            <div className={`bg-gradient-to-r ${filiere.color} rounded-2xl p-6 mb-6`}>
              <div className="flex items-center gap-3"><div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center"><FontAwesomeIcon icon={filiere.icon} className="text-3xl text-white" /></div>
              <div><h2 className="font-serif text-2xl font-bold text-white">{filiere.name}</h2><p className="text-white/80 text-sm max-w-2xl">{filiere.description}</p></div></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {filiere.benefices.map((benefice, i) => (<div key={i} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2"><FontAwesomeIcon icon={faCheckCircle} className="text-afi-green text-xs" /><span>{benefice}</span></div>))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filiere.produits.map((produit, i) => (
                <motion.div key={produit.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer" onClick={() => { setSelectedProduct(produit); setShowDetails(true); }}>
                  <div className="relative h-32 flex items-center justify-center text-5xl bg-gradient-to-br from-gray-50 to-gray-100">{produit.icon}<div className="absolute top-2 right-2 bg-afi-green/10 text-afi-green text-xs px-2 py-0.5 rounded-full">{produit.popularite}% ⭐</div></div>
                  <div className="p-4"><h3 className="font-semibold text-gray-800">{produit.name}</h3><p className="text-gray-500 text-xs mt-1 line-clamp-2">{produit.desc}</p>
                  <div className="flex justify-between items-center mt-3"><div><p className="font-mono text-afi-green font-bold">{produit.price}</p><p className="text-gray-400 text-xs">{produit.weight}</p></div><button className="w-8 h-8 bg-afi-green rounded-full flex items-center justify-center text-white hover:bg-afi-greenDark transition-all"><FontAwesomeIcon icon={faWhatsapp} className="text-sm" /></button></div></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Avis clients */}
        <div className="mt-12"><div className="text-center mb-8"><div className="flex items-center justify-center gap-2 mb-2"><FontAwesomeIcon icon={faStar} className="text-afi-yellow text-xl" /><h2 className="font-serif text-2xl font-bold text-gray-800">Ce que disent nos clients</h2></div><p className="text-gray-500 text-sm">Des produits qui séduisent les connaisseurs</p></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">{avis.map((avis, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-xl p-5 shadow-md"><div className="flex gap-1 mb-3">{[...Array(avis.note)].map((_, j) => (<FontAwesomeIcon key={j} icon={faStar} className="text-afi-yellow text-sm" />))}</div><p className="text-gray-600 text-sm italic">"{avis.commentaire}"</p><div className="mt-3"><p className="font-semibold text-gray-800 text-sm">{avis.nom}</p><p className="text-xs text-afi-green">{avis.produit}</p></div></motion.div>))}</div></div>

        {/* Livraison */}
        <div className="mt-10 bg-gradient-to-r from-afi-green to-afi-greenDark rounded-2xl p-6 text-white"><div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"><div><div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3"><FontAwesomeIcon icon={faTruck} className="text-xl" /></div><h3 className="font-semibold text-lg">Livraison rapide</h3><p className="text-white/80 text-sm">Livraison à domicile sous 24-72h</p></div><div><div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3"><FontAwesomeIcon icon={faClock} className="text-xl" /></div><h3 className="font-semibold text-lg">Produits frais</h3><p className="text-white/80 text-sm">Préparation à la commande</p></div><div><div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3"><FontAwesomeIcon icon={faStore} className="text-xl" /></div><h3 className="font-semibold text-lg">Point de vente</h3><p className="text-white/80 text-sm">Retrait sur place à Zoundja</p></div></div></div>

        {/* CTA */}
        <div className="mt-10 text-center"><a href="https://wa.me/2290196062287" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"><FontAwesomeIcon icon={faWhatsapp} className="text-xl" /> Commander via WhatsApp <FontAwesomeIcon icon={faArrowRight} /></a></div>
      </div>

      {/* Modal détails produit */}
      <AnimatePresence>
        {showDetails && selectedProduct && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setShowDetails(false)}><motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}><div className="text-center"><div className="text-6xl mb-4">{selectedProduct.icon}</div><h3 className="font-serif text-xl font-bold text-gray-800">{selectedProduct.name}</h3><p className="text-gray-500 text-sm mt-2">{selectedProduct.desc}</p><div className="my-4 p-3 bg-gray-50 rounded-lg"><div className="flex justify-between items-center"><span className="text-gray-600">Prix</span><span className="font-mono text-afi-green font-bold text-lg">{selectedProduct.price}</span></div><div className="flex justify-between items-center mt-2"><span className="text-gray-600">Poids</span><span>{selectedProduct.weight}</span></div></div><div className="flex gap-3"><a href="https://wa.me/2290196062287" target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"><FontAwesomeIcon icon={faWhatsapp} /> Commander</a><button onClick={() => setShowDetails(false)} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-all">Fermer</button></div></div></motion.div></motion.div>)}
      </AnimatePresence>
    </>
  );
}

export default Agroalimentaire;
