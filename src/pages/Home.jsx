import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrophy, faUsers, faBox, faGlobe, faAward, 
  faHandHoldingHeart, faGem, faClock, faStar, 
  faQuoteLeft, faNewspaper, faChevronLeft, faChevronRight, faVideo,
  faStore, faPaintbrush, faShoePrints, faSeedling, faChalkboardUser,
  faEye, faHeart, faLeaf, faCalendarAlt, faChartLine, 
  faHandsHelping, faUserGraduate, faCamera, faPlay, faPause,
  faArrowRight, faCheckCircle, faBuilding, faGraduationCap,
  faBagShopping, faShirt, faChartSimple, faChartColumn,
  faComments, faImage, faBullhorn
} from '@fortawesome/free-solid-svg-icons';
import AnimatedSection from '../components/AnimatedSection';
import CountUp from '../components/CountUp';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const scrollContainerRef = useRef(null);

  const slides = [
    {
      title: "AFI Collection",
      subtitle: "Tisser l'avenir, valoriser le local",
      description: "Découvrez nos créations uniques alliant savoir-faire ancestral et design contemporain.",
      bgColor: "from-afi-green/30 to-afi-green/10",
      cta: "Découvrir",
      link: "/afisac"
    },
    {
      title: "AFI Collection",
      subtitle: "Tisser l'avenir, valoriser le local",
      description: "Mme TOSSA Afiavi a dédié sa vie à l'artisanat béninois, formant plus de 500 artisans.",
      bgColor: "from-afi-yellow/30 to-afi-yellow/10",
      cta: "Découvrir notre histoire",
      link: "/fondatrice"
    },
    {
      title: "AFI Collection",
      subtitle: "Tisser l'avenir, valoriser le local",
      description: "Des formations certifiantes pour les femmes et les jeunes dans l'artisanat et l'agroalimentaire.",
      bgColor: "from-afi-red/30 to-afi-red/10",
      cta: "S'inscrire",
      link: "/cfp-dorcas"
    }
  ];

  const videoTestimonials = [
    { id: 1, title: "Marie K. - Cliente fidèle", role: "Ambassadrice AFI", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", description: "Une qualité exceptionnelle et un service irréprochable.", duration: "2:34" },
    { id: 2, title: "Dr. Jean B. - Partenaire", role: "Partenaire commercial", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", description: "AFI Collection représente l'excellence de l'artisanat africain.", duration: "3:12" },
    { id: 3, title: "Sarah A. - Diplômée CFP Dorcas", role: "Entrepreneure", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", description: "Grâce à la formation, j'ai pu créer ma propre entreprise.", duration: "4:01" },
    { id: 4, title: "Fatima B. - Client internationale", role: "Collectionneuse", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", description: "Une collectionneuse fidèle de leurs créations uniques.", duration: "2:15" },
    { id: 5, title: "CFP Dorcas - Formation", role: "Témoignage apprenante", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", description: "La formation m'a donné les compétences nécessaires.", duration: "3:45" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    let interval;
    if (autoplay && scrollContainerRef.current) {
      interval = setInterval(() => {
        const container = scrollContainerRef.current;
        if (container) {
          const scrollAmount = container.clientWidth;
          const maxScroll = container.scrollWidth - container.clientWidth;
          if (container.scrollLeft + scrollAmount >= maxScroll) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          }
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay]);

  const scrollVideo = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth;
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const chiffres = [
    { valeur: '35', label: "Ans d'expertise", icon: faClock, suffix: '+' },
    { valeur: '500', label: 'Artisans formés', icon: faUsers, suffix: '+' },
    { valeur: '1000', label: 'Produits créés', icon: faBox, suffix: '+' },
    { valeur: '10', label: 'Pays couverts', icon: faGlobe, suffix: '+' },
    { valeur: '12', label: 'Distinctions', icon: faAward, suffix: '+' }
  ];

  const brands = [
    { name: 'AFISAC', code: 'Sacs & Chaussures', desc: 'Créations en macramé et pagne.', price: '15 000 — 40 000 FCFA', icon: '👜', path: '/afisac', stats: '25+ modèles', color: 'from-emerald-500 to-teal-600' },
    { name: 'AFI Textile', code: 'Pagnes & Tissus', desc: 'Teinture artisanale, tissage traditionnel.', price: '10 000 — 80 000 FCFA', icon: '🧵', path: '/afi-textile', stats: '50+ tissus', color: 'from-blue-500 to-indigo-600' },
    { name: 'AFI Mode', code: 'Accessoires', desc: 'Bijoux, ceintures, accessoires tendance.', price: '5 000 — 20 000 FCFA', icon: '💎', path: '/afi-mode', stats: '100+ créations', color: 'from-purple-500 to-pink-600' },
    { name: 'Agroalimentaire', code: 'Farines & Dérivés', desc: 'Soja et sésame 100% béninois.', price: 'Sachets 250g — 1kg', icon: '🌿', path: '/agroalimentaire', stats: '10+ produits', color: 'from-lime-500 to-green-600' },
    { name: 'CFP Dorcas', code: 'Centre de Formation', desc: '4 filières certifiantes.', price: '50 000 — 150 000 FCFA', icon: '🎓', path: '/cfp-dorcas', stats: '200+ diplômées', color: 'from-orange-500 to-red-600' }
  ];

  const actualites = [
    { date: "Mars 2026", title: "Prix Africain de l'Artisanat", desc: "AFI Collection récompensée à Lomé, Togo", icon: faTrophy, color: "bg-afi-yellow" },
    { date: "Jan 2026", title: "Nouvelle Collection", desc: "Découvrez les créations AFI Mode Printemps 2026", icon: faGem, color: "bg-afi-green" },
    { date: "Déc 2025", title: "Ambassadrice GRAAD", desc: "Mme TOSSA honorée à Londres", icon: faAward, color: "bg-afi-red" }
  ];

  return (
    <>
      <Helmet>
        <title>AFI Collection - Artisanat béninois d'exception</title>
      </Helmet>

      {/* Hero Slideshow */}
      <div className="w-full px-4 pt-2">
        <div className="w-full rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative min-h-[85vh] md:min-h-[80vh] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={`w-full h-full bg-gradient-to-br ${slides[currentSlide].bgColor} flex items-center justify-center absolute inset-0`}
              >
                <div className="text-center px-4 max-w-3xl mx-auto">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ delay: 0.2 }} 
                    className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs mb-4 tracking-wide"
                  >
                    AFI Collection
                  </motion.div>
                  <motion.h1 
                    initial={{ y: 50, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ delay: 0.3 }} 
                    className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
                  >
                    <span className="text-afi-green">AFI</span> Collection
                  </motion.h1>
                  <motion.p 
                    initial={{ y: 30, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ delay: 0.4 }} 
                    className="text-afi-green italic text-lg md:text-xl lg:text-2xl mb-4 font-serif"
                  >
                    « {slides[currentSlide].subtitle} »
                  </motion.p>
                  <motion.p 
                    initial={{ y: 30, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ delay: 0.5 }} 
                    className="text-gray-800 dark:text-gray-200 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base"
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ delay: 0.6 }}
                  >
                    <Link 
                      to={slides[currentSlide].link} 
                      className="inline-block bg-afi-green text-white px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold hover:bg-afi-green-dark transition-all transform hover:scale-105 shadow-lg text-sm md:text-base"
                    >
                      {slides[currentSlide].cta} →
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all ${currentSlide === index ? 'w-8 h-1.5 bg-afi-green' : 'w-1.5 h-1.5 bg-gray-400'} rounded-full`}
                />
              ))}
            </div>
            
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg transition-all z-10"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-sm md:text-base text-gray-800" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg transition-all z-10"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-sm md:text-base text-gray-800" />
            </button>
          </div>
        </div>
      </div>

      {/* Section Chiffres Clés */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 md:-mt-20 relative z-20">
        <div className="bg-gradient-to-r from-afi-green to-afi-green-dark rounded-3xl py-10 md:py-12 px-6 shadow-2xl">
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FontAwesomeIcon icon={faChartSimple} className="text-white/80 text-lg" />
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">AFI Collection en chiffres</h2>
            </div>
            <p className="text-white/80 text-sm md:text-base">Une communauté qui grandit chaque jour</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {chiffres.map((c, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: i * 0.1 }} 
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-full mb-3">
                  <FontAwesomeIcon icon={c.icon} className="text-white text-xl md:text-2xl" />
                </div>
                <CountUp target={c.valeur} suffix={c.suffix} />
                <div className="font-mono text-[10px] md:text-xs text-white/70 tracking-wider mt-1">{c.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Sous-marques */}
      <AnimatedSection direction="up">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FontAwesomeIcon icon={faStore} className="text-afi-green text-xl" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Nos <em className="text-afi-green not-italic">sous-marques</em>
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
              Cinq univers complémentaires pour valoriser le savoir-faire béninois.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }} 
                whileHover={{ y: -10 }} 
                className={`group relative bg-gradient-to-br ${brand.color} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer`}
              >
                <Link to={brand.path}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <span className="text-4xl">{brand.icon}</span>
                      </motion.div>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold text-white">{brand.stats}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="font-mono text-[9px] text-white/70 tracking-wider mb-1">{brand.code}</div>
                      <h3 className="font-serif text-2xl font-bold text-white mb-2">{brand.name}</h3>
                      <p className="text-white/80 text-sm leading-relaxed">{brand.desc}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/20">
                      <p className="font-mono text-xs text-white font-bold">{brand.price}</p>
                      <motion.div whileHover={{ x: 5 }} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all">
                        <FontAwesomeIcon icon={faArrowRight} className="text-white text-sm" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Section Témoignages Vidéo */}
      <AnimatedSection direction="up">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FontAwesomeIcon icon={faComments} className="text-afi-red text-xl" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Ils <em className="text-afi-red not-italic">parlent</em> de nous
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
              Découvrez les retours authentiques de nos clients, partenaires et apprenantes
            </p>
          </div>
          <div className="relative">
            <button onClick={() => scrollVideo('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-afi-green hover:text-white transition-all">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button onClick={() => scrollVideo('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-afi-green hover:text-white transition-all">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <div ref={scrollContainerRef} className="flex overflow-x-auto gap-6 pb-6 scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
              {videoTestimonials.map((video, index) => (
                <motion.div 
                  key={video.id} 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ delay: index * 0.1 }} 
                  whileHover={{ y: -5 }} 
                  className="min-w-[300px] md:min-w-[380px] bg-white dark:bg-afi-dark-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all flex-shrink-0"
                >
                  <div className="relative group cursor-pointer">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex items-center justify-center">
                      <motion.div whileHover={{ scale: 1.1 }} className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <FontAwesomeIcon icon={faPlay} className="text-white text-2xl ml-1" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">{video.duration}</div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-afi-red/10 flex items-center justify-center">
                        <FontAwesomeIcon icon={faVideo} className="text-afi-red text-sm" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white text-sm">{video.title}</h3>
                        <p className="text-xs text-afi-red">{video.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3">{video.description}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <FontAwesomeIcon icon={faStar} className="text-afi-yellow text-xs" />
                        <span className="font-semibold">5.0</span>
                      </div>
                      <button className="text-xs text-afi-green hover:text-afi-green-dark font-semibold transition-all hover:translate-x-1">
                        Regarder la vidéo →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            <button 
              onClick={() => setAutoplay(!autoplay)} 
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${
                autoplay ? 'bg-afi-green text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              <FontAwesomeIcon icon={autoplay ? faPause : faPlay} className="text-xs" />
              {autoplay ? 'Autoplay activé' : 'Pause'}
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Section Actualités */}
      <AnimatedSection direction="up">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FontAwesomeIcon icon={faNewspaper} className="text-afi-green text-xl" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Dernières <em className="text-afi-green not-italic">actualités</em>
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
              Restez informés des dernières nouvelles d'AFI Collection
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actualites.map((act, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }} 
                whileHover={{ y: -5 }} 
                className="bg-white dark:bg-afi-dark-card rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
              >
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className={`w-12 h-12 ${act.color} rounded-full flex items-center justify-center mb-4`}>
                  <FontAwesomeIcon icon={act.icon} className="text-white text-xl" />
                </motion.div>
                <p className="text-xs text-afi-green font-mono">{act.date}</p>
                <h3 className="font-serif text-lg font-bold text-gray-800 dark:text-white mt-2">{act.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{act.desc}</p>
                <Link to="/foires" className="inline-flex items-center gap-2 text-afi-green text-sm mt-4 hover:gap-3 transition-all">
                  En savoir plus <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Section Engagement Social */}
      <AnimatedSection direction="up">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-afi-green/90 to-afi-green-dark/90"></div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 0.5 }} 
              className="relative z-10 py-12 px-8 text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <FontAwesomeIcon icon={faHandsHelping} className="text-white text-3xl" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">Engagement & Impact Social</h2>
              </div>
              <p className="text-white/90 max-w-2xl mx-auto mb-8">
                AFI Collection s'engage pour l'autonomisation des femmes et la transmission des savoir-faire artisanaux.
              </p>
              <div className="flex flex-wrap justify-center gap-12">
                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3">
                    <FontAwesomeIcon icon={faUserGraduate} className="text-white text-2xl" />
                  </div>
                  <div className="text-3xl font-bold text-white">200+</div>
                  <div className="text-sm text-white/80">Femmes formées</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3">
                    <FontAwesomeIcon icon={faHandsHelping} className="text-white text-2xl" />
                  </div>
                  <div className="text-3xl font-bold text-white">15+</div>
                  <div className="text-sm text-white/80">Partenariats actifs</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3">
                    <FontAwesomeIcon icon={faLeaf} className="text-white text-2xl" />
                  </div>
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="text-sm text-white/80">Produits locaux</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Donation */}
      <AnimatedSection direction="up">
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-afi-red to-red-700 rounded-3xl py-12 px-4 text-center shadow-xl">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 mb-4">
                <FontAwesomeIcon icon={faHandHoldingHeart} className="text-white" />
                <span className="text-white text-sm">Soutenez l'artisanat béninois</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <FontAwesomeIcon icon={faHeart} className="text-white text-2xl" />
                <h3 className="font-serif text-3xl font-bold text-white">Faire un Don</h3>
              </div>
              <p className="text-white/90 mb-6">Chaque contribution soutient la formation des femmes et jeunes artisans via CFP Dorcas</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/don" className="inline-block bg-white text-afi-red px-8 py-3 font-serif font-bold hover:bg-gray-100 transition-all rounded-xl shadow-lg">
                  Contribuer maintenant
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </>
  );
}

export default Home;
