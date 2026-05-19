import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBox, faNewspaper, faGraduationCap, faSignOutAlt, 
  faPlus, faEdit, faTrash, faSave, faTimes, faUpload,
  faImage, faTag, faDollarSign, faList, faEye,
  faChartLine, faUsers, faTrophy, faClock, faGlobe,
  faBagShopping, faShirt, faGem, faLeaf, faChalkboardUser,
  faVideo, faStar, faUser, faEnvelope, faPhone, faCalendar,
  faToggleOn, faToggleOff, faArrowUp, faArrowDown,
  faShoppingCart, faTruck, faCheckCircle, faTimesCircle, faHourglassHalf,
  faEnvelopeOpen, faEnvelope as faEnvelopeSolid
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
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
  const [activeTab, setActiveTab] = useState('products');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    message: '',
    videoUrl: '',
    duration: '',
    note: 5
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: faHourglassHalf, label: 'En attente' },
      confirmed: { color: 'bg-blue-100 text-blue-800', icon: faCheckCircle, label: 'Confirmée' },
      shipped: { color: 'bg-purple-100 text-purple-800', icon: faTruck, label: 'Expédiée' },
      delivered: { color: 'bg-green-100 text-green-800', icon: faCheckCircle, label: 'Livrée' },
      cancelled: { color: 'bg-red-100 text-red-800', icon: faTimesCircle, label: 'Annulée' }
    };
    return statusConfig[status] || statusConfig.pending;
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error('Erreur chargement commandes', err);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/orders/${id}/status`, { status });
      fetchOrders();
    } catch (err) {
      console.error('Erreur mise à jour statut', err);
    }
  };

  const deleteOrder = async (id) => {
    if (window.confirm('Supprimer cette commande ?')) {
      await axios.delete(`${API_URL}/orders/${id}`);
      fetchOrders();
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_URL}/messages`);
      setMessages(res.data);
    } catch (err) {
      console.error('Erreur chargement messages', err);
    }
  };

  const markMessageAsRead = async (id) => {
    try {
      await axios.put(`${API_URL}/messages/${id}/read`);
      fetchMessages();
    } catch (err) {
      console.error('Erreur marquage message', err);
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Supprimer ce message ?')) {
      await axios.delete(`${API_URL}/messages/${id}`);
      fetchMessages();
      setSelectedMessage(null);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${API_URL}/testimonials`);
      setTestimonials(res.data);
    } catch (err) {
      console.error('Erreur chargement témoignages', err);
    }
  };

  const addTestimonial = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/testimonials`, newTestimonial);
      setNewTestimonial({ name: '', role: '', message: '', videoUrl: '', duration: '', note: 5 });
      setShowAddForm(false);
      fetchTestimonials();
    } catch (err) {
      console.error('Erreur ajout témoignage', err);
    }
  };

  const deleteTestimonial = async (id) => {
    if (window.confirm('Supprimer ce témoignage ?')) {
      await axios.delete(`${API_URL}/testimonials/${id}`);
      fetchTestimonials();
    }
  };

  const toggleTestimonialStatus = async (id, currentStatus) => {
    await axios.put(`${API_URL}/testimonials/${id}`, { active: !currentStatus });
    fetchTestimonials();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === 'admin@afi-collection.com' && loginData.password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
      localStorage.setItem('adminAuth', 'true');
    } else {
      setLoginError('Email ou mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchNews();
      fetchFormations();
      fetchTestimonials();
      fetchOrders();
      fetchMessages();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error('Erreur chargement produits', err);
    }
  };

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${API_URL}/news`);
      setNews(res.data);
    } catch (err) {
      console.error('Erreur chargement actualités', err);
    }
  };

  const fetchFormations = async () => {
    try {
      const res = await axios.get(`${API_URL}/formations`);
      setFormations(res.data);
    } catch (err) {
      console.error('Erreur chargement formations', err);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Supprimer ce produit ?')) {
      await axios.delete(`${API_URL}/products/${id}`);
      fetchProducts();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-96">
          <div className="text-center mb-6">
            <FontAwesomeIcon icon={faChartLine} className="text-5xl text-afi-green mb-3" />
            <h2 className="text-2xl font-bold">Administration</h2>
          </div>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg mb-3 dark:bg-gray-700 dark:text-white" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
            <input type="password" placeholder="Mot de passe" className="w-full p-3 border rounded-lg mb-3 dark:bg-gray-700 dark:text-white" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
            {loginError && <p className="text-red-500 text-sm mb-3">{loginError}</p>}
            <button type="submit" className="w-full bg-afi-green text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faSignOutAlt} /> Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <>
      <Helmet><title>Administration - AFI Collection</title></Helmet>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-afi-green text-white p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faChartLine} className="text-xl" />
              <h1 className="text-xl font-bold">Administration AFI Collection</h1>
            </div>
            <button onClick={handleLogout} className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 flex items-center gap-2">
              <FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <div className="flex gap-2 mb-6 border-b flex-wrap">
            <button onClick={() => setActiveTab('products')} className={`px-4 py-2 font-semibold flex items-center gap-2 ${activeTab === 'products' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}>
              <FontAwesomeIcon icon={faBox} /> Produits ({products.length})
            </button>
            <button onClick={() => setActiveTab('news')} className={`px-4 py-2 font-semibold flex items-center gap-2 ${activeTab === 'news' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}>
              <FontAwesomeIcon icon={faNewspaper} /> Actualités ({news.length})
            </button>
            <button onClick={() => setActiveTab('formations')} className={`px-4 py-2 font-semibold flex items-center gap-2 ${activeTab === 'formations' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}>
              <FontAwesomeIcon icon={faGraduationCap} /> Formations ({formations.length})
            </button>
            <button onClick={() => setActiveTab('testimonials')} className={`px-4 py-2 font-semibold flex items-center gap-2 ${activeTab === 'testimonials' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}>
              <FontAwesomeIcon icon={faVideo} /> Témoignages ({testimonials.length})
            </button>
            <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 font-semibold flex items-center gap-2 ${activeTab === 'orders' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}>
              <FontAwesomeIcon icon={faShoppingCart} /> Commandes ({orders.length})
            </button>
            <button onClick={() => setActiveTab('messages')} className={`px-4 py-2 font-semibold flex items-center gap-2 ${activeTab === 'messages' ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-500'}`}>
              <FontAwesomeIcon icon={faEnvelopeSolid} /> Messages ({unreadCount})
            </button>
          </div>

          {/* Produits */}
          {activeTab === 'products' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-afi-green dark:border-afi-dark-border">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold text-lg flex items-center gap-2"><FontAwesomeIcon icon={faBox} /> Liste des produits</h2>
                <button className="bg-afi-green text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1"><FontAwesomeIcon icon={faPlus} /> Ajouter</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr><th className="p-3 text-left">Nom</th><th className="p-3 text-left">Prix</th><th className="p-3 text-left">Catégorie</th><th className="p-3 text-left">Actions</th></tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} className="border-t dark:border-gray-700">
                        <td className="p-3">{p.name}</td>
                        <td className="p-3">{p.price.toLocaleString('fr-FR')} FCFA</td>
                        <td className="p-3">{p.category}</td>
                        <td className="p-3">
                          <button className="text-blue-500 mr-2"><FontAwesomeIcon icon={faEdit} /></button>
                          <button onClick={() => deleteProduct(p.id)} className="text-red-500"><FontAwesomeIcon icon={faTrash} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* News */}
          {activeTab === 'news' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-afi-green dark:border-afi-dark-border">
              <h2 className="font-bold text-lg mb-4">Actualités ({news.length})</h2>
              {news.map(n => <div key={n.id} className="flex justify-between items-center p-3 border-b"><div>{n.title}</div><button className="text-red-500"><FontAwesomeIcon icon={faTrash} /></button></div>)}
            </div>
          )}

          {/* Formations */}
          {activeTab === 'formations' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-afi-green dark:border-afi-dark-border">
              <h2 className="font-bold text-lg mb-4">Formations ({formations.length})</h2>
              {formations.map(f => <div key={f.id} className="flex justify-between items-center p-3 border-b"><div>{f.name}</div><button className="text-red-500"><FontAwesomeIcon icon={faTrash} /></button></div>)}
            </div>
          )}

          {/* Témoignages */}
          {activeTab === 'testimonials' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-afi-green dark:border-afi-dark-border">
              <div className="mb-4">
                <button onClick={() => setShowAddForm(!showAddForm)} className="bg-afi-green text-white px-4 py-2 rounded-lg hover:bg-afi-green-dark flex items-center gap-2">
                  <FontAwesomeIcon icon={faPlus} /> Ajouter un témoignage
                </button>
              </div>
              {showAddForm && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <h3 className="font-bold mb-3">Nouveau témoignage</h3>
                  <form onSubmit={addTestimonial} className="space-y-3">
                    <input type="text" placeholder="Nom" className="w-full p-2 border rounded dark:bg-gray-600" value={newTestimonial.name} onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})} required />
                    <input type="text" placeholder="Rôle" className="w-full p-2 border rounded dark:bg-gray-600" value={newTestimonial.role} onChange={(e) => setNewTestimonial({...newTestimonial, role: e.target.value})} required />
                    <textarea placeholder="Message" className="w-full p-2 border rounded dark:bg-gray-600" rows="3" value={newTestimonial.message} onChange={(e) => setNewTestimonial({...newTestimonial, message: e.target.value})} required />
                    <input type="text" placeholder="URL Vidéo YouTube" className="w-full p-2 border rounded dark:bg-gray-600" value={newTestimonial.videoUrl} onChange={(e) => setNewTestimonial({...newTestimonial, videoUrl: e.target.value})} />
                    <div className="flex gap-2">
                      <button type="submit" className="bg-afi-green text-white px-4 py-2 rounded-lg">Ajouter</button>
                      <button type="button" onClick={() => setShowAddForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Annuler</button>
                    </div>
                  </form>
                </div>
              )}
              {testimonials.map(t => (
                <div key={t.id} className="flex justify-between items-center p-3 border-b">
                  <div><span className="font-semibold">{t.name}</span><p className="text-sm text-gray-500">{t.role}</p></div>
                  <button onClick={() => deleteTestimonial(t.id)} className="text-red-500"><FontAwesomeIcon icon={faTrash} /></button>
                </div>
              ))}
            </div>
          )}

          {/* Commandes */}
          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-afi-green dark:border-afi-dark-border">
              <div className="p-4 border-b"><h2 className="font-bold text-lg">Commandes ({orders.length})</h2></div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr><th className="p-3">N°</th><th className="p-3">Client</th><th className="p-3">Total</th><th className="p-3">Statut</th><th className="p-3">Actions</th></tr>
                  </thead>
                  <tbody>
                    {orders.map(order => {
                      const statusInfo = getStatusBadge(order.status);
                      return (
                        <tr key={order.id} className="border-t">
                          <td className="p-3 font-mono text-sm">{order.orderNumber}</td>
                          <td className="p-3">{order.customerName}</td>
                          <td className="p-3">{order.total.toLocaleString('fr-FR')} FCFA</td>
                          <td className="p-3"><span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusInfo.color}`}><FontAwesomeIcon icon={statusInfo.icon} /> {statusInfo.label}</span></td>
                          <td className="p-3">
                            <select onChange={(e) => updateOrderStatus(order.id, e.target.value)} className="text-sm border rounded px-2 py-1">
                              <option value="pending">En attente</option><option value="confirmed">Confirmée</option><option value="shipped">Expédiée</option><option value="delivered">Livrée</option><option value="cancelled">Annulée</option>
                            </select>
                            <button onClick={() => deleteOrder(order.id)} className="ml-2 text-red-500"><FontAwesomeIcon icon={faTrash} /></button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Messages */}
          {activeTab === 'messages' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-afi-green dark:border-afi-dark-border">
                <div className="p-4 border-b bg-gray-50 dark:bg-gray-700">
                  <h2 className="font-bold text-lg flex items-center gap-2"><FontAwesomeIcon icon={faEnvelopeSolid} /> Messages ({messages.length})</h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">Aucun message</div>
                  ) : (
                    messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(msg => (
                      <div key={msg.id} onClick={() => { setSelectedMessage(msg); if (!msg.isRead) markMessageAsRead(msg.id); }} className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${!msg.isRead ? 'border-l-4 border-afi-green bg-afi-green/5' : ''}`}>
                        <p className={`font-semibold ${!msg.isRead ? 'text-afi-green' : 'text-gray-800 dark:text-white'}`}>{msg.name}</p>
                        <p className="text-xs text-gray-500">{msg.email}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{msg.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{new Date(msg.createdAt).toLocaleDateString('fr-FR')}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-afi-green dark:border-afi-dark-border">
                {selectedMessage ? (
                  <div>
                    <div className="p-4 border-b bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                      <h2 className="font-bold text-lg">Détail du message</h2>
                      <button onClick={() => deleteMessage(selectedMessage.id)} className="text-red-500 hover:text-red-700"><FontAwesomeIcon icon={faTrash} /> Supprimer</button>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-xs text-gray-500">Nom</label><p className="font-semibold">{selectedMessage.name}</p></div>
                        <div><label className="text-xs text-gray-500">Email</label><p className="font-semibold">{selectedMessage.email}</p></div>
                        <div><label className="text-xs text-gray-500">Téléphone</label><p className="font-semibold">{selectedMessage.phone || 'Non renseigné'}</p></div>
                        <div><label className="text-xs text-gray-500">Objet</label><p className="font-semibold">{selectedMessage.subject}</p></div>
                      </div>
                      <div><label className="text-xs text-gray-500">Message</label><p className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">{selectedMessage.message}</p></div>
                      <div className="flex gap-3 pt-4 border-t">
                        <a href={`mailto:${selectedMessage.email}`} className="bg-afi-green text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-afi-green-dark transition-all flex items-center gap-2">
                          <FontAwesomeIcon icon={faEnvelopeSolid} /> Répondre
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    <div className="text-center"><FontAwesomeIcon icon={faEnvelopeOpen} className="text-5xl mb-3 opacity-50" /><p>Sélectionnez un message</p></div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;
