import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBox, faNewspaper, faGraduationCap, faSignOutAlt, 
  faPlus, faEdit, faTrash, faSave, faTimes, faCog,
  faChartLine, faVideo, faUser, faEnvelope, faPhone,
  faShoppingCart, faTruck, faCheckCircle, faTimesCircle, 
  faHourglassHalf, faEnvelopeOpen, faImage, faCalendarAlt,
  faHeart, faPalette, faGlobe, faMapMarkerAlt, faClock
} from '@fortawesome/free-solid-svg-icons';
import { 
  faYoutube, faFacebookF, faInstagram, faTwitter, faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const IMAGE_URL = 'http://localhost:5000';

function Admin() {
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [formations, setFormations] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [events, setEvents] = useState([]);
  const [donations, setDonations] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [showEditEventForm, setShowEditEventForm] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({ title: '', description: '', category: 'afisac', image: '' });
  const [newEvent, setNewEvent] = useState({ title: '', location: '', date: '', type: 'Foire', description: '', year: new Date().getFullYear(), image: '', participants: 0 });
  const [editEvent, setEditEvent] = useState({ id: null, title: '', location: '', date: '', type: '', description: '', year: '', image: '', participants: 0 });
  const [settings, setSettings] = useState({
    siteName: 'AFI Collection',
    slogan: 'Tisser l\'avenir, valoriser le local',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    contactEmail: 'afiavitossa@gmail.com',
    phone: '+229 01 96 06 22 87',
    phone2: '',
    address: 'Zoundja, Abomey-Calavi, Bénin',
    mapUrl: '',
    openingHours: 'Lun - Sam : 9h - 18h',
    primaryColor: '#008753',
    secondaryColor: '#FCD116',
    accentColor: '#E8112D',
    facebook: 'https://facebook.com/aficollection',
    instagram: 'https://instagram.com/aficollection',
    twitter: 'https://twitter.com/aficollection',
    whatsapp: 'https://wa.me/2290196062287',
    youtube: '',
    linkedin: '',
    metaDescription: 'AFI Collection - Artisanat béninois d\'exception. Sacs, tissus, accessoires, agroalimentaire et formation artisanale.',
    metaKeywords: 'artisanat, bénin, sacs, tissus, formation, afi collection',
    googleAnalytics: '',
    newsletterActive: true,
    maintenanceMode: false
  });

  const fetchProducts = async () => { const res = await axios.get(`${API_URL}/products`); setProducts(res.data); };
  const fetchNews = async () => { const res = await axios.get(`${API_URL}/news`); setNews(res.data); };
  const fetchFormations = async () => { const res = await axios.get(`${API_URL}/formations`); setFormations(res.data); };
  const fetchTestimonials = async () => { const res = await axios.get(`${API_URL}/testimonials`); setTestimonials(res.data); };
  const fetchOrders = async () => { const res = await axios.get(`${API_URL}/orders`); setOrders(res.data); };
  const fetchMessages = async () => { const res = await axios.get(`${API_URL}/messages`); setMessages(res.data); };
  const fetchGallery = async () => { const res = await axios.get(`${API_URL}/gallery`); setGallery(res.data); };
  const fetchEvents = async () => { const res = await axios.get(`${API_URL}/events`); setEvents(res.data); };
  const fetchDonations = async () => { 
    try { 
      const res = await axios.get(`${API_URL}/donations`); 
      setDonations(res.data); 
    } catch(e) { console.log('Donations API non disponible'); } 
  };

  const deleteProduct = async (id) => { if (window.confirm('Supprimer ?')) { await axios.delete(`${API_URL}/products/${id}`); fetchProducts(); } };
  const deleteNews = async (id) => { if (window.confirm('Supprimer ?')) { await axios.delete(`${API_URL}/news/${id}`); fetchNews(); } };
  const deleteFormation = async (id) => { if (window.confirm('Supprimer ?')) { await axios.delete(`${API_URL}/formations/${id}`); fetchFormations(); } };
  const deleteTestimonial = async (id) => { if (window.confirm('Supprimer ?')) { await axios.delete(`${API_URL}/testimonials/${id}`); fetchTestimonials(); } };
  const deleteOrder = async (id) => { if (window.confirm('Supprimer ?')) { await axios.delete(`${API_URL}/orders/${id}`); fetchOrders(); } };
  const deleteMessage = async (id) => { if (window.confirm('Supprimer ?')) { await axios.delete(`${API_URL}/messages/${id}`); fetchMessages(); setSelectedMessage(null); } };
  const deleteGalleryItem = async (id) => { if (window.confirm('Supprimer ?')) { await axios.delete(`${API_URL}/gallery/${id}`); fetchGallery(); } };
  const deleteEvent = async (id) => { if (window.confirm('Supprimer ?')) { await axios.delete(`${API_URL}/events/${id}`); fetchEvents(); } };
  const deleteDonation = async (id) => { if (window.confirm('Supprimer ?')) { await axios.delete(`${API_URL}/donations/${id}`); fetchDonations(); } };

  const addGalleryItem = async (e) => { e.preventDefault(); await axios.post(`${API_URL}/gallery`, newGalleryItem); setNewGalleryItem({ title: '', description: '', category: 'afisac', image: '' }); setShowAddForm(false); fetchGallery(); };
  const addEvent = async (e) => { e.preventDefault(); await axios.post(`${API_URL}/events`, newEvent); setNewEvent({ title: '', location: '', date: '', type: 'Foire', description: '', year: new Date().getFullYear(), image: '', participants: 0 }); setShowAddEventForm(false); fetchEvents(); };
  
  const startEditEvent = (event) => {
    setSelectedEvent(event);
    setEditEvent({
      id: event.id, title: event.title, location: event.location, date: event.date,
      type: event.type, description: event.description, year: event.year,
      image: event.image || '', participants: event.participants || 0
    });
    setShowEditEventForm(true);
  };
  const cancelEditEvent = () => { setSelectedEvent(null); setEditEvent({ id: null, title: '', location: '', date: '', type: '', description: '', year: '', image: '', participants: 0 }); setShowEditEventForm(false); };
  const updateEvent = async (e) => { e.preventDefault(); try { await axios.put(`${API_URL}/events/${editEvent.id}`, editEvent); cancelEditEvent(); fetchEvents(); } catch(err) { console.error(err); alert('Erreur modification'); } };

  const updateSettings = async (e) => { e.preventDefault(); alert('Paramètres enregistrés !'); localStorage.setItem('siteSettings', JSON.stringify(settings)); };

  const updateOrderStatus = async (id, status) => { await axios.put(`${API_URL}/orders/${id}/status`, { status }); fetchOrders(); };
  const markMessageAsRead = async (id) => { await axios.put(`${API_URL}/messages/${id}/read`); fetchMessages(); };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === 'admin@afi-collection.com' && loginData.password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      setLoginError('Email ou mot de passe incorrect');
    }
  };
  const handleLogout = () => { setIsAuthenticated(false); localStorage.removeItem('adminAuth'); };

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) setSettings(JSON.parse(savedSettings));
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts(); fetchNews(); fetchFormations(); fetchTestimonials(); fetchOrders(); 
      fetchMessages(); fetchGallery(); fetchEvents(); fetchDonations();
    }
  }, [isAuthenticated]);

  const getStatusBadge = (status) => {
    const config = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: faHourglassHalf, label: 'En attente' },
      confirmed: { color: 'bg-blue-100 text-blue-800', icon: faCheckCircle, label: 'Confirmée' },
      shipped: { color: 'bg-purple-100 text-purple-800', icon: faTruck, label: 'Expédiée' },
      delivered: { color: 'bg-green-100 text-green-800', icon: faCheckCircle, label: 'Livrée' },
      cancelled: { color: 'bg-red-100 text-red-800', icon: faTimesCircle, label: 'Annulée' }
    };
    return config[status] || config.pending;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-96">
          <div className="text-center mb-6"><FontAwesomeIcon icon={faChartLine} className="text-5xl text-afi-green mb-3" /><h2 className="text-2xl font-bold">Administration</h2></div>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg mb-3 dark:bg-gray-700 dark:text-white" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
            <input type="password" placeholder="Mot de passe" className="w-full p-3 border rounded-lg mb-3 dark:bg-gray-700 dark:text-white" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
            {loginError && <p className="text-red-500 text-sm mb-3">{loginError}</p>}
            <button type="submit" className="w-full bg-afi-green text-white py-3 rounded-lg font-semibold"><FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Se connecter</button>
          </form>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter(m => !m.isRead).length;
  const totalDonations = donations.reduce((sum, d) => sum + (d.amount || 0), 0);

  return (
    <>
      <Helmet><title>Administration - AFI Collection</title></Helmet>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-afi-green text-white p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold"><FontAwesomeIcon icon={faChartLine} className="mr-2" /> Administration AFI Collection</h1>
            <button onClick={handleLogout} className="bg-white/20 px-4 py-2 rounded-lg"><FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Déconnexion</button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <div className="flex gap-2 mb-6 border-b flex-wrap">
            <button onClick={() => setActiveTab('products')} className={`px-4 py-2 font-semibold ${activeTab === 'products' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}><FontAwesomeIcon icon={faBox} className="mr-1" /> Produits ({products.length})</button>
            <button onClick={() => setActiveTab('news')} className={`px-4 py-2 font-semibold ${activeTab === 'news' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}><FontAwesomeIcon icon={faNewspaper} className="mr-1" /> Actualités ({news.length})</button>
            <button onClick={() => setActiveTab('formations')} className={`px-4 py-2 font-semibold ${activeTab === 'formations' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}><FontAwesomeIcon icon={faGraduationCap} className="mr-1" /> Formations ({formations.length})</button>
            <button onClick={() => setActiveTab('testimonials')} className={`px-4 py-2 font-semibold ${activeTab === 'testimonials' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}><FontAwesomeIcon icon={faVideo} className="mr-1" /> Témoignages ({testimonials.length})</button>
            <button onClick={() => setActiveTab('gallery')} className={`px-4 py-2 font-semibold ${activeTab === 'gallery' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}><FontAwesomeIcon icon={faImage} className="mr-1" /> Galerie ({gallery.length})</button>
            <button onClick={() => setActiveTab('events')} className={`px-4 py-2 font-semibold ${activeTab === 'events' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}><FontAwesomeIcon icon={faCalendarAlt} className="mr-1" /> Événements ({events.length})</button>
            <button onClick={() => setActiveTab('donations')} className={`px-4 py-2 font-semibold ${activeTab === 'donations' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}><FontAwesomeIcon icon={faHeart} className="mr-1" /> Dons ({donations.length})</button>
            <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 font-semibold ${activeTab === 'orders' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}><FontAwesomeIcon icon={faShoppingCart} className="mr-1" /> Commandes ({orders.length})</button>
            <button onClick={() => setActiveTab('messages')} className={`px-4 py-2 font-semibold ${activeTab === 'messages' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}><FontAwesomeIcon icon={faEnvelope} className="mr-1" /> Messages ({unreadCount})</button>
            <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 font-semibold ${activeTab === 'settings' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}><FontAwesomeIcon icon={faCog} className="mr-1" /> Paramètres</button>
          </div>

          {/* PRODUITS */}
          {activeTab === 'products' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-afi-green">
              <div className="p-4 border-b"><h2 className="font-bold text-lg">Liste des produits</h2></div>
              <div className="overflow-x-auto">
                <table className="w-full"><thead className="bg-gray-50 dark:bg-gray-700"><tr><th className="p-3">Image</th><th className="p-3">Nom</th><th className="p-3">Prix</th><th className="p-3">Catégorie</th><th className="p-3">Actions</th></tr></thead>
                  <tbody>{products.map(p => (<tr key={p.id} className="border-t"><td className="p-3">{p.thumbnail ? <img src={`${IMAGE_URL}${p.thumbnail}`} className="w-12 h-12 object-cover rounded" /> : p.image ? <img src={`${IMAGE_URL}${p.image}`} className="w-12 h-12 object-cover rounded" /> : <FontAwesomeIcon icon={faBox} className="text-2xl text-gray-400" />}</td><td className="p-3">{p.name}</td><td className="p-3">{p.price.toLocaleString('fr-FR')} FCFA</td><td className="p-3">{p.category}</td><td className="p-3"><button className="text-blue-500 mr-2"><FontAwesomeIcon icon={faEdit} /></button><button onClick={() => deleteProduct(p.id)} className="text-red-500"><FontAwesomeIcon icon={faTrash} /></button></td></tr>))}</tbody>
                </table>
              </div>
            </div>
          )}

          {/* ACTUALITÉS */}
          {activeTab === 'news' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-afi-green">
              <h2 className="font-bold text-lg mb-4">Actualités</h2>
              {news.map(n => (<div key={n.id} className="flex justify-between items-center p-3 border-b"><div><span className="font-semibold">{n.title}</span><p className="text-sm text-gray-500">{n.date}</p></div><div><button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faEdit} /></button><button onClick={() => deleteNews(n.id)} className="text-red-500"><FontAwesomeIcon icon={faTrash} /></button></div></div>))}
            </div>
          )}

          {/* FORMATIONS */}
          {activeTab === 'formations' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-afi-green">
              <h2 className="font-bold text-lg mb-4">Formations</h2>
              {formations.map(f => (<div key={f.id} className="flex justify-between items-center p-3 border-b"><div><span className="font-semibold">{f.name}</span><p className="text-sm text-gray-500">{f.duration} - {f.price}</p></div><div><button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faEdit} /></button><button onClick={() => deleteFormation(f.id)} className="text-red-500"><FontAwesomeIcon icon={faTrash} /></button></div></div>))}
            </div>
          )}

          {/* TÉMOIGNAGES */}
          {activeTab === 'testimonials' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-afi-green">
              <h2 className="font-bold text-lg mb-4">Témoignages</h2>
              {testimonials.map(t => (<div key={t.id} className="flex justify-between items-center p-3 border-b"><div><span className="font-semibold">{t.name}</span><p className="text-sm text-gray-500">{t.role}</p><p className="text-xs text-afi-green">Note: {t.note}⭐</p></div><div><button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faEdit} /></button><button onClick={() => deleteTestimonial(t.id)} className="text-red-500"><FontAwesomeIcon icon={faTrash} /></button></div></div>))}
            </div>
          )}

          {/* GALERIE */}
          {activeTab === 'gallery' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-afi-green">
              <div className="flex justify-between items-center mb-4"><h2 className="font-bold text-lg">Galerie</h2><button onClick={() => setShowAddForm(!showAddForm)} className="bg-afi-green text-white px-4 py-2 rounded-lg"><FontAwesomeIcon icon={faPlus} /> Ajouter</button></div>
              {showAddForm && (<div className="mb-6 p-4 bg-gray-50 rounded-lg"><form onSubmit={addGalleryItem} className="space-y-3"><input type="text" placeholder="Titre" className="w-full p-2 border rounded" value={newGalleryItem.title} onChange={(e) => setNewGalleryItem({...newGalleryItem, title: e.target.value})} required /><input type="text" placeholder="Description" className="w-full p-2 border rounded" value={newGalleryItem.description} onChange={(e) => setNewGalleryItem({...newGalleryItem, description: e.target.value})} required /><select className="w-full p-2 border rounded" value={newGalleryItem.category} onChange={(e) => setNewGalleryItem({...newGalleryItem, category: e.target.value})}><option value="afisac">AFISAC</option><option value="textile">Textile</option><option value="mode">Mode</option><option value="agro">Agro</option><option value="formation">Formation</option><option value="evenements">Événements</option></select><input type="text" placeholder="URL image" className="w-full p-2 border rounded" value={newGalleryItem.image} onChange={(e) => setNewGalleryItem({...newGalleryItem, image: e.target.value})} required /><button type="submit" className="bg-afi-green text-white px-4 py-2 rounded-lg">Ajouter</button><button type="button" onClick={() => setShowAddForm(false)} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg">Annuler</button></form></div>)}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{gallery.map(item => (<div key={item.id} className="border rounded-lg p-2 relative group"><img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded mb-2" /><p className="font-semibold text-sm truncate">{item.title}</p><p className="text-xs text-gray-500">{item.category}</p><button onClick={() => deleteGalleryItem(item.id)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><FontAwesomeIcon icon={faTrash} className="text-xs" /></button></div>))}</div>
            </div>
          )}

          {/* ÉVÉNEMENTS */}
          {activeTab === 'events' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-afi-green">
              <div className="flex justify-between items-center mb-4"><h2 className="font-bold text-lg">Événements</h2><button onClick={() => setShowAddEventForm(!showAddEventForm)} className="bg-afi-green text-white px-4 py-2 rounded-lg"><FontAwesomeIcon icon={faPlus} /> Ajouter</button></div>
              {showAddEventForm && (<div className="mb-6 p-4 bg-gray-50 rounded-lg"><form onSubmit={addEvent} className="space-y-3"><input type="text" placeholder="Titre" className="w-full p-2 border rounded" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} required /><input type="text" placeholder="Lieu" className="w-full p-2 border rounded" value={newEvent.location} onChange={(e) => setNewEvent({...newEvent, location: e.target.value})} required /><input type="text" placeholder="Date" className="w-full p-2 border rounded" value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} required /><select className="w-full p-2 border rounded" value={newEvent.type} onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}><option value="Foire">Foire</option><option value="Salon">Salon</option><option value="Distinction">Distinction</option><option value="Cérémonie">Cérémonie</option></select><textarea placeholder="Description" rows="3" className="w-full p-2 border rounded" value={newEvent.description} onChange={(e) => setNewEvent({...newEvent, description: e.target.value})} required /><input type="number" placeholder="Année" className="w-full p-2 border rounded" value={newEvent.year} onChange={(e) => setNewEvent({...newEvent, year: e.target.value})} required /><input type="number" placeholder="Participants" className="w-full p-2 border rounded" value={newEvent.participants} onChange={(e) => setNewEvent({...newEvent, participants: e.target.value})} /><input type="text" placeholder="URL image" className="w-full p-2 border rounded" value={newEvent.image} onChange={(e) => setNewEvent({...newEvent, image: e.target.value})} /><button type="submit" className="bg-afi-green text-white px-4 py-2 rounded-lg">Ajouter</button><button type="button" onClick={() => setShowAddEventForm(false)} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg">Annuler</button></form></div>)}
              
              {showEditEventForm && selectedEvent && (<div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-2 border-afi-yellow"><h3 className="font-bold mb-3">Modifier l'événement</h3><form onSubmit={updateEvent} className="space-y-3"><input type="text" placeholder="Titre" className="w-full p-2 border rounded" value={editEvent.title} onChange={(e) => setEditEvent({...editEvent, title: e.target.value})} required /><input type="text" placeholder="Lieu" className="w-full p-2 border rounded" value={editEvent.location} onChange={(e) => setEditEvent({...editEvent, location: e.target.value})} required /><input type="text" placeholder="Date" className="w-full p-2 border rounded" value={editEvent.date} onChange={(e) => setEditEvent({...editEvent, date: e.target.value})} required /><select className="w-full p-2 border rounded" value={editEvent.type} onChange={(e) => setEditEvent({...editEvent, type: e.target.value})}><option value="Foire">Foire</option><option value="Salon">Salon</option><option value="Distinction">Distinction</option><option value="Cérémonie">Cérémonie</option></select><textarea placeholder="Description" rows="3" className="w-full p-2 border rounded" value={editEvent.description} onChange={(e) => setEditEvent({...editEvent, description: e.target.value})} required /><input type="number" placeholder="Année" className="w-full p-2 border rounded" value={editEvent.year} onChange={(e) => setEditEvent({...editEvent, year: e.target.value})} required /><input type="number" placeholder="Participants" className="w-full p-2 border rounded" value={editEvent.participants} onChange={(e) => setEditEvent({...editEvent, participants: e.target.value})} /><input type="text" placeholder="URL image" className="w-full p-2 border rounded" value={editEvent.image} onChange={(e) => setEditEvent({...editEvent, image: e.target.value})} /><button type="submit" className="bg-afi-yellow text-black px-4 py-2 rounded-lg"><FontAwesomeIcon icon={faSave} className="mr-1" /> Enregistrer</button><button type="button" onClick={cancelEditEvent} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg">Annuler</button></form></div>)}
              
              <div className="space-y-3">{events.map(event => (<div key={event.id} className="border rounded-lg p-3 flex justify-between items-center"><div><p className="font-semibold">{event.title}</p><p className="text-sm text-gray-500">{event.date} - {event.location}</p><span className={`text-xs px-2 py-0.5 rounded-full ${event.type === 'Distinction' ? 'bg-yellow-100 text-yellow-800' : event.type === 'Foire' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{event.type}</span></div><div><button onClick={() => startEditEvent(event)} className="text-blue-500 mr-2"><FontAwesomeIcon icon={faEdit} /> Modifier</button><button onClick={() => deleteEvent(event.id)} className="text-red-500"><FontAwesomeIcon icon={faTrash} /> Supprimer</button></div></div>))}</div>
            </div>
          )}

          {/* DONS */}
          {activeTab === 'donations' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-afi-green">
              <div className="mb-4 p-4 bg-gradient-to-r from-afi-green to-afi-green-dark rounded-lg text-white">
                <h3 className="font-bold text-lg">Total collecté</h3>
                <p className="text-3xl font-bold">{totalDonations.toLocaleString('fr-FR')} FCFA</p>
                <p className="text-sm opacity-80">{donations.length} donateurs</p>
              </div>
              <h2 className="font-bold text-lg mb-4">Liste des dons</h2>
              {donations.length === 0 ? <p className="text-center text-gray-500">Aucun don pour le moment</p> : (
                <div className="space-y-3">{donations.map(d => (<div key={d.id} className="border rounded-lg p-3 flex justify-between items-center"><div><p className="font-semibold">{d.name || 'Anonyme'}</p><p className="text-sm text-gray-500">{d.amount?.toLocaleString('fr-FR')} FCFA - {d.cause || 'Général'}</p><p className="text-xs text-gray-400">{new Date(d.createdAt).toLocaleDateString('fr-FR')}</p></div><button onClick={() => deleteDonation(d.id)} className="text-red-500"><FontAwesomeIcon icon={faTrash} /> Supprimer</button></div>))}</div>
              )}
            </div>
          )}

          {/* COMMANDES */}
          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-afi-green">
              <div className="p-4 border-b"><h2 className="font-bold text-lg">Commandes</h2></div>
              <div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50 dark:bg-gray-700"><tr><th className="p-3">N°</th><th className="p-3">Client</th><th className="p-3">Total</th><th className="p-3">Statut</th><th className="p-3">Actions</th></tr></thead>
              <tbody>{orders.map(order => { const statusInfo = getStatusBadge(order.status); return (<tr key={order.id} className="border-t"><td className="p-3 font-mono text-sm">{order.orderNumber}</td><td className="p-3">{order.customerName}</td><td className="p-3">{order.total.toLocaleString('fr-FR')} FCFA</td><td className="p-3"><span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusInfo.color}`}><FontAwesomeIcon icon={statusInfo.icon} /> {statusInfo.label}</span></td><td className="p-3"><select onChange={(e) => updateOrderStatus(order.id, e.target.value)} className="text-sm border rounded px-2 py-1"><option value="pending">En attente</option><option value="confirmed">Confirmée</option><option value="shipped">Expédiée</option><option value="delivered">Livrée</option><option value="cancelled">Annulée</option></select><button onClick={() => deleteOrder(order.id)} className="ml-2 text-red-500"><FontAwesomeIcon icon={faTrash} /> Supprimer</button></td></tr>);})}</tbody>
              </table></div></div>
          )}

          {/* MESSAGES */}
          {activeTab === 'messages' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-afi-green">
                <div className="p-4 border-b"><h2 className="font-bold text-lg">Messages ({messages.length})</h2></div>
                <div className="divide-y max-h-[600px] overflow-y-auto">{messages.length === 0 ? <div className="p-8 text-center">Aucun message</div> : messages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(msg => (<div key={msg.id} onClick={() => { setSelectedMessage(msg); if(!msg.isRead) markMessageAsRead(msg.id); }} className={`p-4 cursor-pointer hover:bg-gray-50 ${!msg.isRead ? 'border-l-4 border-afi-green bg-afi-green/5' : ''}`}><p className="font-semibold">{msg.name}</p><p className="text-xs text-gray-500">{msg.email}</p><p className="text-sm text-gray-600 mt-2 line-clamp-2">{msg.message}</p><p className="text-xs text-gray-400 mt-2">{new Date(msg.createdAt).toLocaleDateString('fr-FR')}</p></div>))}</div>
              </div>
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-afi-green">
                {selectedMessage ? (<div><div className="p-4 border-b flex justify-between"><h2 className="font-bold text-lg">Détail</h2><button onClick={() => deleteMessage(selectedMessage.id)} className="text-red-500"><FontAwesomeIcon icon={faTrash} /> Supprimer</button></div><div className="p-6"><div className="grid grid-cols-2 gap-4"><div><label>Nom</label><p className="font-semibold">{selectedMessage.name}</p></div><div><label>Email</label><p>{selectedMessage.email}</p></div><div><label>Téléphone</label><p>{selectedMessage.phone || 'Non renseigné'}</p></div><div><label>Objet</label><p>{selectedMessage.subject}</p></div></div><div className="mt-4"><label>Message</label><p className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedMessage.message}</p></div><div className="mt-4"><a href={`mailto:${selectedMessage.email}`} className="bg-afi-green text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"><FontAwesomeIcon icon={faEnvelope} /> Répondre</a></div></div></div>) : (<div className="flex items-center justify-center h-64 text-gray-500"><div className="text-center"><FontAwesomeIcon icon={faEnvelopeOpen} className="text-5xl mb-3" /><p>Sélectionnez un message</p></div></div>)}
              </div>
            </div>
          )}

          {/* PARAMÈTRES */}
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-afi-green">
              <h2 className="font-bold text-lg mb-4"><FontAwesomeIcon icon={faCog} className="mr-2" /> Paramètres du site</h2>
              <form onSubmit={updateSettings} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium mb-1">Nom du site</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.siteName} onChange={(e) => setSettings({...settings, siteName: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-1">Slogan</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.slogan} onChange={(e) => setSettings({...settings, slogan: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-1">Logo (URL)</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.logo} onChange={(e) => setSettings({...settings, logo: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-1">Favicon (URL)</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.favicon} onChange={(e) => setSettings({...settings, favicon: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-1">Email de contact</label><input type="email" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.contactEmail} onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-1">Téléphone principal</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.phone} onChange={(e) => setSettings({...settings, phone: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-1">Téléphone secondaire</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.phone2} onChange={(e) => setSettings({...settings, phone2: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-1">Adresse</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.address} onChange={(e) => setSettings({...settings, address: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-1">Horaires d'ouverture</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.openingHours} onChange={(e) => setSettings({...settings, openingHours: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-1">URL Google Maps</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.mapUrl} onChange={(e) => setSettings({...settings, mapUrl: e.target.value})} /></div>
                </div>

                <div className="border-t pt-4"><h3 className="font-bold mb-3">Couleurs</h3><div className="grid grid-cols-3 gap-4"><div><label className="block text-sm mb-1">Couleur principale</label><input type="color" className="w-full h-10 p-1 border rounded" value={settings.primaryColor} onChange={(e) => setSettings({...settings, primaryColor: e.target.value})} /></div><div><label className="block text-sm mb-1">Couleur secondaire</label><input type="color" className="w-full h-10 p-1 border rounded" value={settings.secondaryColor} onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})} /></div><div><label className="block text-sm mb-1">Couleur d'accent</label><input type="color" className="w-full h-10 p-1 border rounded" value={settings.accentColor} onChange={(e) => setSettings({...settings, accentColor: e.target.value})} /></div></div></div>

                <div className="border-t pt-4"><h3 className="font-bold mb-3">Réseaux sociaux</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm mb-1"><FontAwesomeIcon icon={faFacebookF} className="mr-1" /> Facebook</label><input type="url" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.facebook} onChange={(e) => setSettings({...settings, facebook: e.target.value})} /></div><div><label className="block text-sm mb-1"><FontAwesomeIcon icon={faInstagram} className="mr-1" /> Instagram</label><input type="url" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.instagram} onChange={(e) => setSettings({...settings, instagram: e.target.value})} /></div><div><label className="block text-sm mb-1"><FontAwesomeIcon icon={faTwitter} className="mr-1" /> Twitter</label><input type="url" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.twitter} onChange={(e) => setSettings({...settings, twitter: e.target.value})} /></div><div><label className="block text-sm mb-1"><FontAwesomeIcon icon={faWhatsapp} className="mr-1" /> WhatsApp</label><input type="url" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.whatsapp} onChange={(e) => setSettings({...settings, whatsapp: e.target.value})} /></div></div></div>

                <div className="border-t pt-4"><h3 className="font-bold mb-3">SEO & Analytics</h3><div><label className="block text-sm mb-1">Meta Description</label><textarea rows="2" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.metaDescription} onChange={(e) => setSettings({...settings, metaDescription: e.target.value})} /></div><div><label className="block text-sm mb-1 mt-3">Meta Keywords</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.metaKeywords} onChange={(e) => setSettings({...settings, metaKeywords: e.target.value})} /></div><div><label className="block text-sm mb-1 mt-3">Code Google Analytics</label><textarea rows="2" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.googleAnalytics} onChange={(e) => setSettings({...settings, googleAnalytics: e.target.value})} /></div></div>

                <div className="border-t pt-4 flex gap-4"><label className="flex items-center gap-2"><input type="checkbox" checked={settings.newsletterActive} onChange={(e) => setSettings({...settings, newsletterActive: e.target.checked})} /> Activer la newsletter</label><label className="flex items-center gap-2"><input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})} /> Mode maintenance</label></div>

                <button type="submit" className="bg-afi-green text-white px-6 py-2 rounded-lg hover:bg-afi-green-dark transition">Enregistrer tous les paramètres</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;
