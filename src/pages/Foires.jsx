import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, faMapMarkerAlt, faTrophy, faGlobe,
  faChevronDown, faChevronUp, faStar, faUsers,
  faCamera, faHeart, faShare, faClock, faAward,
  faMedal, faCertificate, faBuilding, faPlane,
  faVideo, faPlay, faTimes, faEye, faDownload,
  faCalendarWeek, faPhotoVideo, faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

import API_URL from "../config/api";

function Foires() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState('image');

  const years = [2026, 2025, 2024, 2023];

  useEffect(() => {
    fetchEvents();
  }, []);

 const fetchEvents = async () => {
  try {
    const res = await axios.get(`${API_URL}/formations`);
    const onlyEvents = res.data.filter(f => f.type === 'evenement');
    setEvents(onlyEvents);
    console.log("📅 Événements chargés:", onlyEvents);
    setLoading(false);
  } catch (err) {
    console.error('Erreur chargement événements', err);
    setLoading(false);
  }
};

  const currentYearEvents = events.filter(e => {
  if (!e.date) return false;
  const eventYear = new Date(e.date).getFullYear();
  return eventYear === selectedYear;
});

  const openMedia = (media, type, eventTitle) => {
    setSelectedMedia({ url: media, type, title: eventTitle });
    setMediaType(type);
    document.body.style.overflow = 'hidden';
  };

  const closeMedia = () => {
    setSelectedMedia(null);
    document.body.style.overflow = 'auto';
  };

  const getTypeBadgeStyle = (type) => {
    switch(type) {
      case 'Distinction': return 'bg-afi-yellow text-black';
      case 'Foire': return 'bg-afi-green text-white';
      case 'Salon': return 'bg-afi-red text-white';
      case 'Cérémonie': return 'bg-purple-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getIconForEvent = (iconName) => {
    switch(iconName) {
      case 'faTrophy': return faTrophy;
      case 'faAward': return faAward;
      case 'faBuilding': return faBuilding;
      case 'faGlobe': return faGlobe;
      case 'faUsers': return faUsers;
      case 'faMedal': return faMedal;
      default: return faTrophy;
    }
  };

  const countries = [
    { name: 'Bénin', flag: '🇧🇯', events: 8 },
    { name: 'Togo', flag: '🇹🇬', events: 1 },
    { name: 'Sénégal', flag: '🇸🇳', events: 1 },
    { name: 'Côte d\'Ivoire', flag: '🇨🇮', events: 1 },
    { name: 'France', flag: '🇫🇷', events: 1 },
    { name: 'Royaume-Uni', flag: '🇬🇧', events: 1 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} className="text-4xl text-afi-green animate-spin mb-4" />
          <p className="text-gray-500">Chargement des événements...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Foires & Événements - AFI Collection</title>
        <meta name="description" content="Découvrez les participations d'AFI Collection aux foires nationales, régionales et internationales." />
      </Helmet>

      <div className="bg-gradient-to-r from-afi-green to-afi-green-dark rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
                <FontAwesomeIcon icon={faGlobe} className="text-sm text-white" />
                <span className="text-xs font-medium text-white">Rayonnement International</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">Foires & Événements</h1>
              <p className="text-white/80 text-sm max-w-md mx-auto">AFI Collection représente le Bénin dans les grandes foires nationales, régionales et mondiales</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-center gap-3 mb-8">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                selectedYear === year
                  ? 'bg-afi-green text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-afi-dark-card text-gray-600 dark:text-gray-300 hover:bg-afi-green/10 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="space-y-6 mb-12">
          {currentYearEvents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">Aucun événement pour cette année</p>
            </div>
          ) : (
            currentYearEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-afi-dark-card rounded-xl shadow-lg overflow-hidden border-2 border-afi-green dark:border-afi-dark-border"
              >
                <button
                  onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-afi-${event.color}/10 dark:bg-white/20 flex items-center justify-center`}>
                      <FontAwesomeIcon icon={getIconForEvent(event.icon)} className={`text-xl text-afi-${event.color} dark:text-white`} />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-gray-800 dark:text-white text-lg">{event.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeBadgeStyle(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <FontAwesomeIcon icon={faCalendarAlt} className="text-afi-green dark:text-white/70 text-xs" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-afi-green dark:text-white/70 text-xs" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <FontAwesomeIcon icon={expandedEvent === event.id ? faChevronUp : faChevronDown} className="text-gray-400 dark:text-white/60" />
                </button>

                <AnimatePresence>
                  {expandedEvent === event.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="border-t border-gray-100 dark:border-white/10 pt-4">
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{event.description}</p>
                        
                        {event.photos && event.photos.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-3">
                              <FontAwesomeIcon icon={faCamera} className="text-afi-green" />
                              <h4 className="font-semibold text-gray-800 dark:text-white text-sm">Galerie photos</h4>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {event.photos.slice(0, 4).map((photo, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => openMedia(photo, 'image', event.title)}
                                  className="relative group cursor-pointer rounded-lg overflow-hidden aspect-video"
                                >
                                  <img src={photo} alt={`${event.title} - photo ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                    <FontAwesomeIcon icon={faEye} className="text-white text-xl" />
                                  </div>
                                </div>
                              ))}
                            </div>
                            {event.photos.length > 4 && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">+{event.photos.length - 4} photos</p>
                            )}
                          </div>
                        )}

                        {event.videoUrl && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-3">
                              <FontAwesomeIcon icon={faVideo} className="text-afi-green" />
                              <h4 className="font-semibold text-gray-800 dark:text-white text-sm">Vidéo de l'événement</h4>
                            </div>
                            <div
                              onClick={() => openMedia(event.videoUrl, 'video', event.title)}
                              className="relative group cursor-pointer rounded-lg overflow-hidden aspect-video bg-gray-900"
                            >
                              <img src={event.videoThumbnail} alt={`Vidéo ${event.title}`} className="w-full h-full object-cover opacity-70" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-all">
                                  <FontAwesomeIcon icon={faPlay} className="text-white text-2xl ml-1" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-white/10">
                          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <FontAwesomeIcon icon={faUsers} className="text-afi-green" />
                             {event.participants && event.participants.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <FontAwesomeIcon icon={faCamera} className="text-afi-green" />
                             {event.photos && event.photos.slice(0, 4).map((photo, idx) => (
  <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
    <img src={photo} alt={`${event.title} - ${idx + 1}`} className="w-full h-full object-cover" />
  </div>
))}
                            </span>
                            {event.videoUrl && (
                              <span className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faVideo} className="text-afi-green" />
                                1 vidéo
                              </span>
                            )}
                          </div>
                          <button className="text-xs text-afi-green hover:text-afi-green-dark font-semibold transition-all">
                            <FontAwesomeIcon icon={faShare} className="mr-1" /> Partager
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-afi-dark-card rounded-xl shadow-lg overflow-hidden border-2 border-afi-green dark:border-afi-dark-border">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-afi-yellow/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={faTrophy} className="text-afi-yellow" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Distinctions majeures</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/10 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-afi-yellow/20 flex items-center justify-center">
                    <span className="text-sm">🏆</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">Prix Africain de l'Artisanat</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Lomé, Togo - 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/10 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-afi-green/20 flex items-center justify-center">
                    <span className="text-sm">🌍</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">Ambassadrice GRAAD GLOBAL</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Londres, Royaume-Uni - 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/10 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-afi-red/20 flex items-center justify-center">
                    <span className="text-sm">🥇</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">Médaille d'Or de l'Artisanat</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Porto-Novo, Bénin - 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-afi-dark-card rounded-xl shadow-lg overflow-hidden border-2 border-afi-green dark:border-afi-dark-border">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-afi-green/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={faGlobe} className="text-afi-green" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Pays représentés</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {countries.map((country, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-white/10 rounded-full">
                    <span className="text-lg">{country.flag}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{country.name}</span>
                    <span className="text-xs text-afi-green dark:text-white/60">({country.events})</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/10 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">AFI Collection continue d'étendre son rayonnement à l'international</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-afi-green to-afi-green-dark rounded-xl p-6 text-center text-white">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
            <FontAwesomeIcon icon={faCalendarWeek} className="text-xl" />
          </div>
          <h3 className="font-serif text-lg font-bold mb-2">Prochains événements</h3>
          <p className="text-white/80 text-sm mb-4">Suivez-nous pour ne rien manquer de nos prochaines participations</p>
          <a href="/contact" className="inline-flex items-center gap-2 bg-white text-afi-green px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
            <FontAwesomeIcon icon={faCalendarAlt} /> Être informé
          </a>
        </div>
      </div>

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeMedia}
          >
            <button onClick={closeMedia} className="absolute top-4 right-4 text-white hover:text-afi-green transition-colors z-10">
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>
            <div className="max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              {mediaType === 'image' ? (
                <img src={selectedMedia.url} alt={selectedMedia.title} className="rounded-xl shadow-2xl max-h-[85vh] w-full object-contain" />
              ) : (
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe src={selectedMedia.url} title={selectedMedia.title} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              )}
              <div className="mt-3 text-center">
                <h3 className="text-white text-lg font-serif">{selectedMedia.title}</h3>
                <div className="flex justify-center gap-4 mt-2">
                  <button className="text-white/70 hover:text-afi-green transition-colors flex items-center gap-1.5 text-sm">
                    <FontAwesomeIcon icon={faDownload} /> Télécharger
                  </button>
                  <button className="text-white/70 hover:text-afi-green transition-colors flex items-center gap-1.5 text-sm">
                    <FontAwesomeIcon icon={faShare} /> Partager
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

export default Foires;
