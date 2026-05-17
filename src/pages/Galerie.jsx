import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCamera, faFilter, faTimes, faEye, 
  faHeart, faShare, faDownload, faChevronLeft, faChevronRight,
  faBagShopping, faShirt, faGem, faLeaf, faGraduationCap, faGlobe,
  faSearch, faSlidersH
} from '@fortawesome/free-solid-svg-icons';

function Galerie() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = [
    { id: 'all', name: 'Toutes', icon: faCamera, color: 'green' },
    { id: 'afisac', name: 'AFISAC', icon: faBagShopping, color: 'green' },
    { id: 'textile', name: 'Textile', icon: faShirt, color: 'yellow' },
    { id: 'mode', name: 'Mode', icon: faGem, color: 'red' },
    { id: 'agro', name: 'Agro', icon: faLeaf, color: 'green' },
    { id: 'formation', name: 'Formation', icon: faGraduationCap, color: 'yellow' },
    { id: 'evenements', name: 'Événements', icon: faGlobe, color: 'red' }
  ];

  const galleryItems = [
    { id: 1, category: 'afisac', image: 'https://picsum.photos/id/20/600/400', title: 'Sac Élégance', desc: 'Sac macramé fait main', date: '2026', likes: 45 },
    { id: 2, category: 'afisac', image: 'https://picsum.photos/id/21/600/400', title: 'Sandales Royales', desc: 'Chaussures artisanales', date: '2026', likes: 32 },
    { id: 3, category: 'afisac', image: 'https://picsum.photos/id/22/600/400', title: 'Collection Printemps', desc: 'Nouvelle collection', date: '2025', likes: 67 },
    { id: 4, category: 'textile', image: 'https://picsum.photos/id/23/600/400', title: 'Faso Dan Fani', desc: 'Tissu traditionnel', date: '2026', likes: 89 },
    { id: 5, category: 'textile', image: 'https://picsum.photos/id/24/600/400', title: 'Teinture Artisanale', desc: 'Couleurs naturelles', date: '2025', likes: 56 },
    { id: 6, category: 'textile', image: 'https://picsum.photos/id/25/600/400', title: 'Tissage Traditionnel', desc: 'Savoir-faire ancestral', date: '2026', likes: 78 },
    { id: 7, category: 'mode', image: 'https://picsum.photos/id/26/600/400', title: 'Collier Macramé', desc: 'Bijoux faits main', date: '2026', likes: 123 },
    { id: 8, category: 'mode', image: 'https://picsum.photos/id/27/600/400', title: 'Ceinture Gold', desc: 'Accessoire tendance', date: '2025', likes: 45 },
    { id: 9, category: 'mode', image: 'https://picsum.photos/id/28/600/400', title: 'Boucles d\'Oreilles', desc: 'Collection prestige', date: '2026', likes: 67 },
    { id: 10, category: 'agro', image: 'https://picsum.photos/id/29/600/400', title: 'Farine de Soja', desc: 'Produit local', date: '2026', likes: 34 },
    { id: 11, category: 'agro', image: 'https://picsum.photos/id/30/600/400', title: 'Produits Sésame', desc: 'Transformation artisanale', date: '2025', likes: 28 },
    { id: 12, category: 'formation', image: 'https://picsum.photos/id/31/600/400', title: 'Atelier Macramé', desc: 'CFP Dorcas', date: '2026', likes: 56 },
    { id: 13, category: 'formation', image: 'https://picsum.photos/id/32/600/400', title: 'Formation Teinture', desc: 'Apprenantes à l\'œuvre', date: '2025', likes: 89 },
    { id: 14, category: 'evenements', image: 'https://picsum.photos/id/33/600/400', title: 'Foire de Paris', desc: 'Participation 2025', date: '2025', likes: 234 },
    { id: 15, category: 'evenements', image: 'https://picsum.photos/id/34/600/400', title: 'Distinction Togo', desc: 'Prix Artisanat 2026', date: '2026', likes: 178 },
    { id: 16, category: 'evenements', image: 'https://picsum.photos/id/35/600/400', title: 'Salon de Dakar', desc: 'Représentation AFI', date: '2025', likes: 145 }
  ];

  const filteredByCategory = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);
  
  const filteredItems = searchTerm === ''
    ? filteredByCategory
    : filteredByCategory.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const openLightbox = (item) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    const currentIndex = currentItems.findIndex(item => item.id === selectedImage?.id);
    if (currentIndex < currentItems.length - 1) {
      setSelectedImage(currentItems[currentIndex + 1]);
    }
  };

  const prevImage = () => {
    const currentIndex = currentItems.findIndex(item => item.id === selectedImage?.id);
    if (currentIndex > 0) {
      setSelectedImage(currentItems[currentIndex - 1]);
    }
  };

  return (
    <>
      <Helmet>
        <title>Galerie - Créations et Événements | AFI Collection</title>
        <meta name="description" content="Découvrez notre galerie de créations artisanales, événements et formations AFI Collection" />
      </Helmet>

      {/* Hero compact avec bords arrondis - sans espace */}
      <div className="bg-gradient-to-r from-afi-green to-afi-greenDark rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
                <FontAwesomeIcon icon={faCamera} className="text-xl text-white" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-1">
                Galerie
              </h1>
              <p className="text-white/80 text-sm mb-4">
                Découvrez nos créations artisanales
              </p>
              
              {/* Barre de recherche compacte */}
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Rechercher une création..."
                  className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-white text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-afi-yellow shadow-md"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-gray-400 hover:text-gray-600 text-sm" />
                  </button>
                )}
              </div>
              
              {/* Résultat de recherche */}
              {searchTerm && (
                <p className="text-white/80 text-xs mt-2">
                  {filteredItems.length} résultat{filteredItems.length > 1 ? 's' : ''} trouvé{filteredItems.length > 1 ? 's' : ''} pour "{searchTerm}"
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filtres */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => {
              const isActive = filter === cat.id;
              const bgColor = isActive 
                ? `bg-afi-${cat.color} text-white` 
                : 'bg-white text-afi-green border-2 border-afi-green/30 hover:border-afi-green';
              
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFilter(cat.id);
                    setCurrentPage(1);
                  }}
                  className={`group px-4 py-1.5 rounded-full font-mono text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 ${bgColor}`}
                >
                  <FontAwesomeIcon icon={cat.icon} className="text-xs" />
                  {cat.name}
                  {isActive && (
                    <span className="ml-0.5 text-xs opacity-80">
                      ({filteredItems.length})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grille */}
        {currentItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <FontAwesomeIcon icon={faCamera} className="text-2xl text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">Aucune image trouvée</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {currentItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                  onClick={() => openLightbox(item)}
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                        <p className="text-white/80 text-xs">{item.desc}</p>
                        <div className="flex items-center gap-3 mt-1 text-white/60 text-xs">
                          <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faHeart} className="text-afi-red text-xs" />
                            {item.likes}
                          </span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <FontAwesomeIcon icon={faEye} className="text-white text-xs" />
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full bg-afi-${categories.find(c => c.id === item.category)?.color} text-white text-[10px]`}>
                        {categories.find(c => c.id === item.category)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">{item.title}</h3>
                    <p className="text-gray-500 text-xs truncate">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination compacte */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-1.5 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-afi-green hover:bg-afi-green/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                </button>
                {[...Array(totalPages)].slice(0, 5).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-8 h-8 rounded-full text-sm transition-all ${
                      currentPage === i + 1
                        ? 'bg-afi-green text-white'
                        : 'border border-gray-300 text-gray-600 hover:border-afi-green hover:bg-afi-green/10'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                {totalPages > 5 && (
                  <span className="w-8 h-8 flex items-center justify-center text-gray-500">...</span>
                )}
                {totalPages > 5 && (
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className={`w-8 h-8 rounded-full text-sm transition-all ${
                      currentPage === totalPages
                        ? 'bg-afi-green text-white'
                        : 'border border-gray-300 text-gray-600 hover:border-afi-green hover:bg-afi-green/10'
                    }`}
                  >
                    {totalPages}
                  </button>
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-afi-green hover:bg-afi-green/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-afi-green transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-afi-green transition-colors disabled:opacity-50"
              disabled={currentItems.findIndex(i => i.id === selectedImage.id) === 0}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-3xl" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-afi-green transition-colors disabled:opacity-50"
              disabled={currentItems.findIndex(i => i.id === selectedImage.id) === currentItems.length - 1}
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-3xl" />
            </button>
            
            <div className="max-w-3xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="rounded-xl shadow-2xl max-h-[80vh] object-contain"
              />
              <div className="mt-3 text-center">
                <h3 className="text-white text-lg font-serif mb-1">{selectedImage.title}</h3>
                <p className="text-gray-400 text-sm">{selectedImage.desc}</p>
                <div className="flex justify-center gap-4 mt-3">
                  <button className="text-white/70 hover:text-afi-red transition-colors flex items-center gap-1.5 text-sm">
                    <FontAwesomeIcon icon={faHeart} /> {selectedImage.likes}
                  </button>
                  <button className="text-white/70 hover:text-afi-green transition-colors flex items-center gap-1.5 text-sm">
                    <FontAwesomeIcon icon={faShare} /> Partager
                  </button>
                  <button className="text-white/70 hover:text-afi-yellow transition-colors flex items-center gap-1.5 text-sm">
                    <FontAwesomeIcon icon={faDownload} /> Télécharger
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Galerie;
