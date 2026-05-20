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
  faComments, faImage, faBullhorn,
  // Icônes pro pour les sous-marques
  faBriefcase, faShoePrints as faShoes, faShirt as faTShirt, faGem as faJewel, faAppleAlt
} from '@fortawesome/free-solid-svg-icons';
import AnimatedSection from '../components/AnimatedSection';
import CountUp from '../components/CountUp';
import axios from 'axios';

// Import des images locales
import afiImage from '../assets/afi.jpeg';
import afi2Image from '../assets/afi2.jpeg';
import afi7Image from '../assets/afi7.jpeg';

const API_URL = 'http://localhost:5000/api';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [videoTestimonials, setVideoTestimonials] = useState([]);
  const scrollContainerRef = useRef(null);

  const slides = [
    {
      title: "AFI Collection",
      subtitle: "Tisser l'avenir, valoriser le local",
      image: afiImage,
      cta: "Découvrir",
      link: "/afisac"
    },
    {
      title: "AFI Collection",
      subtitle: "Tisser l'avenir, valoriser le local",
      image: afi2Image,
      cta: "Découvrir notre histoire",
      link: "/fondatrice"
    },
    {
      title: "AFI Collection",
      subtitle: "Tisser l'avenir, valoriser le local",
      image: afi7Image,
      cta: "S'inscrire",
      link: "/cfp-dorcas"
    }
  ];

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${API_URL}/testimonials/active`);
      console.log("📹 Données reçues:", res.data); setVideoTestimonials(res.data);
    } catch (err) {
      console.error('Erreur chargement témoignages', err);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    let interval;
    if (autoplay && scrollContainerRef.current && videoTestimonials.length > 0) {
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
  }, [autoplay, videoTestimonials]);

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
    { name: 'AFISAC', code: 'Sacs & Chaussures', desc: 'Créations en macramé et pagne, confectionnées à la main selon les techniques traditionnelles béninoises.', price: '15 000 — 40 000 FCFA', icon: faShoes, path: '/afisac', stats: '25+ modèles' },
    { name: 'AFI Textile', code: 'Pagnes & Tissus', desc: 'Teinture artisanale, tissage Faso Dan Fani et décoration intérieure africaine authentique.', price: '10 000 — 80 000 FCFA', icon: faTShirt, path: '/afi-textile', stats: '50+ tissus' },
    { name: 'AFI Mode', code: 'Accessoires', desc: 'Bijoux tissés, ceintures et accessoires tendance — 100% faits main avec une touche africaine.', price: '5 000 — 20 000 FCFA', icon: faJewel, path: '/afi-mode', stats: '100+ créations' },
    { name: 'Agroalimentaire', code: 'Farines & Dérivés', desc: 'Soja et sésame 100% béninois, transformés en produits alimentaires sains et nutritifs.', price: 'Sachets 250g — 1kg', icon: faSeedling, path: '/agroalimentaire', stats: '10+ produits' },
    { name: 'CFP Dorcas', code: 'Centre de Formation', desc: '4 filières certifiantes pour femmes et jeunes dans l\'artisanat et l\'agroalimentaire.', price: '50 000 — 150 000 FCFA', icon: faGraduationCap, path: '/cfp-dorcas', stats: '200+ diplômées' }
  ];

  const actualites = [
    { date: "Mars 2026", title: "Prix Africain de l'Artisanat", desc: "AFI Collection récompensée à Lomé, Togo", icon: faTrophy, color: "bg-afi-yellow" },
    { date: "Jan 2026", title: "Nouvelle Collection", desc: "Découvrez les créations AFI Mode Printemps 2026", icon: faGem, color: "bg-afi-green" },
    { date: "Déc 2025", title: "Ambassadrice GRAAD", desc: "Mme TOSSA honorée à Londres", icon: faAward, color: "bg-afi-red" }
  ];

  return (
    <>
      <Helmet><title>AFI Collection - Artisanat béninois d'exception</title></Helmet>

      {/* Hero Slideshow */}
      <div className="w-full px-2 sm:px-4 pt-2">
        <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative min-h-[60vh] sm:min-h-[85vh] md:min-h-[80vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${slides[currentSlide].image})` }}>
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center px-4 max-w-3xl mx-auto">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-6 bg-white/20 backdrop-blur-sm">
                      <span className="text-white/90 text-[10px] sm:text-xs tracking-wide font-medium">Depuis 2015</span>
                    </motion.div>
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-5 tracking-wide">
                        <span className="text-afi-green drop-shadow-lg">AFI</span>
                        <span className="text-white drop-shadow-lg"> Collection</span>
                      </h1>
                      <div className="mb-5 sm:mb-7">
                        <p className="text-afi-yellow text-base sm:text-lg md:text-xl font-medium tracking-wide">
                          « {slides[currentSlide].subtitle} »
                        </p>
                      </div>
                      <Link to={slides[currentSlide].link} className="inline-block bg-afi-green text-white px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold hover:bg-afi-green-dark transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base md:text-lg tracking-wide">
                        {slides[currentSlide].cta} →
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center gap-2 sm:gap-3 z-10">
              {slides.map((_, index) => (<button key={index} onClick={() => setCurrentSlide(index)} className={`transition-all ${currentSlide === index ? 'w-6 sm:w-8 h-1 sm:h-1.5 bg-afi-green' : 'w-1.5 sm:w-2 h-1 sm:h-1.5 bg-white/50'} rounded-full`} />))}
            </div>
            <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg transition-all z-10 border border-white/30"><FontAwesomeIcon icon={faChevronLeft} className="text-white text-sm sm:text-base md:text-lg" /></button>
            <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg transition-all z-10 border border-white/30"><FontAwesomeIcon icon={faChevronRight} className="text-white text-sm sm:text-base md:text-lg" /></button>
          </div>
        </div>
      </div>

      {/* Section Chiffres Clés */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 md:-mt-20 relative z-20">
        <div className="bg-gradient-to-r from-afi-green to-afi-green-dark rounded-2xl sm:rounded-3xl py-3 sm:py-4 px-4 sm:px-6 shadow-xl">
          <div className="flex flex-row justify-around items-center gap-2 sm:gap-4 overflow-x-auto">
            {chiffres.map((c, i) => (
              <div key={i} className="text-center flex-shrink-0 min-w-[70px] sm:min-w-0">
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-white/20 rounded-full mb-1 sm:mb-2">
                  <FontAwesomeIcon icon={c.icon} className="text-white text-xs sm:text-sm md:text-base" />
                </div>
                <div className="text-white font-serif font-bold text-sm sm:text-base md:text-lg">{c.valeur}{c.suffix}</div>
                <div className="font-mono text-[8px] sm:text-[9px] md:text-[10px] text-white/70 tracking-wider mt-0.5 whitespace-nowrap">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Sous-marques - avec icônes pro */}
      <AnimatedSection direction="up">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
              <FontAwesomeIcon icon={faStore} className="text-afi-green text-lg sm:text-xl" />
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">
                Nos <em className="text-afi-green not-italic">sous-marques</em>
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-2">Cinq univers complémentaires pour valoriser le savoir-faire béninois.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {brands.map((brand, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10 }} className={`group relative bg-gradient-to-br from-afi-green to-afi-green-dark rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-white/20`}>
                <Link to={brand.path}>
                  <div className="absolute top-0 right-0 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-white/10 rounded-bl-full"></div>
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <FontAwesomeIcon icon={brand.icon} className="text-white text-3xl sm:text-4xl" />
                      </motion.div>
                      <div className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                        <span className="text-[10px] sm:text-xs font-semibold text-white">{brand.stats}</span>
                      </div>
                    </div>
                    <div className="mb-2 sm:mb-3">
                      <div className="font-mono text-[8px] sm:text-[9px] text-white/70 tracking-wider mb-0.5 sm:mb-1">{brand.code}</div>
                      <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">{brand.name}</h3>
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{brand.desc}</p>
                    </div>
                    <div className="flex justify-between items-center mt-3 sm:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-white/20">
                      <p className="font-mono text-[10px] sm:text-xs text-white font-bold">{brand.price}</p>
                      <motion.div whileHover={{ x: 5 }} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all">
                        <FontAwesomeIcon icon={faArrowRight} className="text-white text-xs sm:text-sm" />
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
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
              <FontAwesomeIcon icon={faComments} className="text-afi-red text-lg sm:text-xl" />
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">
                Ils <em className="text-afi-red not-italic">parlent</em> de nous
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-2">
              Découvrez les retours authentiques de nos clients, partenaires et apprenantes
            </p>
          </div>
          {videoTestimonials.length > 0 && (
            <div className="relative">
              <button onClick={() => scrollVideo('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg hover:bg-afi-green hover:text-white transition-all"><FontAwesomeIcon icon={faChevronLeft} className="text-xs sm:text-sm" /></button>
              <button onClick={() => scrollVideo('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg hover:bg-afi-green hover:text-white transition-all"><FontAwesomeIcon icon={faChevronRight} className="text-xs sm:text-sm" /></button>
              <div ref={scrollContainerRef} className="flex overflow-x-auto gap-3 sm:gap-4 md:gap-6 pb-4 sm:pb-6 scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
                {videoTestimonials.map((video, index) => (
                  <motion.div key={video.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }} className="min-w-[250px] sm:min-w-[300px] md:min-w-[380px] bg-white dark:bg-afi-dark-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all flex-shrink-0 border-2 border-afi-green dark:border-afi-dark-border">
                    <div className="relative group cursor-pointer">
                      <iframe src={video.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"} className="w-full h-36 sm:h-40 md:h-48 object-cover" frameBorder="0" allowFullScreen title={video.name || "Témoignage"}></iframe>
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex items-center justify-center">
                        <motion.div whileHover={{ scale: 1.1 }} className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <FontAwesomeIcon icon={faPlay} className="text-white text-lg sm:text-xl md:text-2xl ml-0.5 sm:ml-1" />
                        </motion.div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">{video.duration}</div>
                    </div>
                    <div className="p-3 sm:p-4 md:p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-afi-red/10 flex items-center justify-center">
                          <FontAwesomeIcon icon={faVideo} className="text-afi-red text-xs sm:text-sm" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white text-xs sm:text-sm">{video.name}</h3>
                          <p className="text-[10px] sm:text-xs text-afi-red">{video.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-2 line-clamp-3">{video.message}</p>
                      <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 dark:border-white/10">
                        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400">
                          <FontAwesomeIcon icon={faStar} className="text-afi-yellow text-xs" />
                          <span className="font-semibold">{video.note}.0</span>
                        </div>
                        <button className="text-[10px] sm:text-xs text-afi-green hover:text-afi-green-dark font-semibold transition-all hover:translate-x-1">
                          Regarder la vidéo →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-center gap-2 mt-4 sm:mt-6">
            <button onClick={() => setAutoplay(!autoplay)} className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-[10px] sm:text-xs font-medium transition-all flex items-center gap-1 sm:gap-2 ${autoplay ? 'bg-afi-green text-white' : 'bg-gray-200 text-gray-600'}`}>
              <FontAwesomeIcon icon={autoplay ? faPause : faPlay} className="text-xs" />
              {autoplay ? 'Autoplay' : 'Pause'}
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Section Actualités */}
      <AnimatedSection direction="up">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2"><FontAwesomeIcon icon={faNewspaper} className="text-afi-green text-lg sm:text-xl" /><h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">Dernières <em className="text-afi-green not-italic">actualités</em></h2></div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-2">Restez informés des dernières nouvelles d'AFI Collection</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {actualites.map((act, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="bg-white dark:bg-afi-dark-card rounded-xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all border-2 border-afi-green dark:border-afi-dark-border">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 ${act.color} rounded-full flex items-center justify-center mb-3 sm:mb-4`}><FontAwesomeIcon icon={act.icon} className="text-white text-base sm:text-lg md:text-xl" /></motion.div>
                <p className="text-[10px] sm:text-xs text-afi-green font-mono">{act.date}</p>
                <h3 className="font-serif text-base sm:text-lg font-bold text-gray-800 dark:text-white mt-1 sm:mt-2">{act.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">{act.desc}</p>
                <Link to="/foires" className="inline-flex items-center gap-2 text-afi-green text-xs sm:text-sm mt-3 sm:mt-4 hover:gap-3 transition-all">En savoir plus <FontAwesomeIcon icon={faArrowRight} className="text-[10px] sm:text-xs" /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Section Engagement Social */}
      <AnimatedSection direction="up">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-afi-green/90 to-afi-green-dark/90"></div>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="relative z-10 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 text-center">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4"><FontAwesomeIcon icon={faHandsHelping} className="text-white text-2xl sm:text-3xl" /><h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">Engagement &amp; Impact Social</h2></div>
              <p className="text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 text-xs sm:text-sm md:text-base">AFI Collection s'engage pour l'autonomisation des femmes et la transmission des savoir-faire artisanaux.</p>
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
                <motion.div whileHover={{ scale: 1.05 }} className="text-center"><div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full mb-2 sm:mb-3"><FontAwesomeIcon icon={faUserGraduate} className="text-white text-xl sm:text-2xl" /></div><div className="text-2xl sm:text-3xl font-bold text-white">200+</div><div className="text-[10px] sm:text-sm text-white/80">Femmes formées</div></motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="text-center"><div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full mb-2 sm:mb-3"><FontAwesomeIcon icon={faHandsHelping} className="text-white text-xl sm:text-2xl" /></div><div className="text-2xl sm:text-3xl font-bold text-white">15+</div><div className="text-[10px] sm:text-sm text-white/80">Partenariats actifs</div></motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="text-center"><div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full mb-2 sm:mb-3"><FontAwesomeIcon icon={faLeaf} className="text-white text-xl sm:text-2xl" /></div><div className="text-2xl sm:text-3xl font-bold text-white">100%</div><div className="text-[10px] sm:text-sm text-white/80">Produits locaux</div></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Donation */}
      <AnimatedSection direction="up">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-8 sm:pb-12 md:pb-16">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-afi-red to-red-700 rounded-2xl sm:rounded-3xl py-8 sm:py-10 md:py-12 px-3 sm:px-4 text-center shadow-xl">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 mb-3 sm:mb-4"><FontAwesomeIcon icon={faHandHoldingHeart} className="text-white text-xs sm:text-sm" /><span className="text-white text-[10px] sm:text-sm">Soutenez l'artisanat béninois</span></div>
              <div className="flex items-center justify-center gap-2 mb-2"><FontAwesomeIcon icon={faHeart} className="text-white text-xl sm:text-2xl" /><h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white">Faire un Don</h3></div>
              <p className="text-white/90 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">Chaque contribution soutient la formation des femmes et jeunes artisans via CFP Dorcas</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link to="/don" className="inline-block bg-white text-afi-red px-6 sm:px-8 py-2 sm:py-3 font-serif font-bold hover:bg-gray-100 transition-all rounded-xl shadow-lg text-sm sm:text-base">Contribuer maintenant</Link></motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </>
  );
}

export default Home;

// Fonction pour convertir n'importe quel lien YouTube en embed
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  // Si c'est déjà un embed
  if (url.includes('/embed/')) return url;
  // Si c'est un lien watch?v=
  if (url.includes('watch?v=')) {
    const videoId = url.split('watch?v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  // Si c'est un lien youtu.be
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
}
