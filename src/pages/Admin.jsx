import DonAdmin from "../components/DonAdmin";
import GalerieAdmin from "../components/GalerieAdmin";
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, faBox, faShoppingCart, faUsers, faEnvelope, 
  faStar, faGraduationCap, faCog, faPlus, faEdit, faTrash, 
  faSave, faTimes, faMoneyBillWave, faGlobe, faClock,
  faPalette, faShareAlt, faSlidersH, faImages, faDonate
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [formations, setFormations] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  
  const [settings, setSettings] = useState({
    siteName: 'AFI Collection',
    siteDescription: 'Artisanat béninois d\'exception',
    siteLogo: '/logo.png',
    siteFavicon: '/favicon.ico',
    contactEmail: 'contact@afi-collection.com',
    contactPhone: '+229 01 96 06 22 87',
    contactAddress: 'Zoundja, Abomey-Calavi, Bénin',
    facebook: 'https://facebook.com/afi-collection',
    instagram: 'https://instagram.com/afi-collection',
    twitter: 'https://twitter.com/afi-collection',
    whatsapp: '22996062287',
    primaryColor: '#008753',
    secondaryColor: '#FCD116',
    accentColor: '#E8112D',
    fontFamily: 'Cormorant Garamond',
    enableCart: true,
    enableTestimonials: true,
    enableBlog: false,
    enableNewsletter: true,
    maintenanceMode: false,
    metaTitle: 'AFI Collection - Artisanat béninois',
    metaDescription: 'Sacs, tissus, accessoires et formation artisanale',
    metaKeywords: 'artisanat, bénin, sacs, tissus, formation',
    googleAnalytics: '',
    paymentMethods: ['whatsapp', 'bank_transfer'],
    bankName: 'Banque Atlantique',
    bankAccount: 'XXX-XXX-XXX',
    openingHours: 'Lundi - Samedi: 8h - 18h',
    closingDays: 'Dimanche',
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: '',
    smtpPass: ''
  });
  
  const [stats, setStats] = useState({
    totalProducts: 0, totalOrders: 0, totalRevenue: 0, totalUsers: 0,
    totalMessages: 0, pendingOrders: 0, lowStock: 0, totalSales: 0
  });

  useEffect(() => {
  const token = localStorage.getItem('adminToken');
  const userData = localStorage.getItem('adminUser');
  
  if (token && userData) {
    try {
      const parsedUser = JSON.parse(userData);
      setIsLoggedIn(true);
      setUser(parsedUser);
      fetchAllData();
    } catch (e) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      setIsLoggedIn(false);
    }
  }
  setLoading(false);
}, []);

// Ajoute ce useEffect séparé pour les événements des boutons
useEffect(() => {
  const exportBtn = document.getElementById('exportMessagesBtn');
  const markBtn = document.getElementById('markAllReadBtn');
  if (exportBtn) exportBtn.onclick = exportMessages;
  if (markBtn) markBtn.onclick = markAllAsRead;
}, [messages]); // Dépend de messages pour se mettre à jour

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [productsRes, ordersRes, usersRes, messagesRes, testimonialsRes, formationsRes, categoriesRes, settingsRes] = await Promise.all([
        axios.get('/api/admin/products', { headers }).catch(() => ({ data: [] })),
        axios.get('/api/admin/orders', { headers }).catch(() => ({ data: [] })),
        axios.get('/api/admin/users', { headers }).catch(() => ({ data: [] })),
        axios.get('/api/admin/messages', { headers }).catch(() => ({ data: [] })),
        axios.get('/api/admin/testimonials', { headers }).catch(() => ({ data: [] })),
        axios.get('/api/admin/formations', { headers }).catch(() => ({ data: [] })),
        axios.get('/api/admin/categories', { headers }).catch(() => ({ data: [] })),
        axios.get('/api/admin/settings', { headers }).catch(() => ({ data: {} }))
      ]);
      
      setProducts(productsRes.data || []);
      setOrders(ordersRes.data || []);
      setUsers(usersRes.data || []);
      setMessages(messagesRes.data || []);
      setTestimonials(testimonialsRes.data || []);
      setFormations(formationsRes.data || []);
      setCategories(categoriesRes.data || []);
      if (settingsRes.data) setSettings(prev => ({ ...prev, ...settingsRes.data }));
      
      const pendingOrders = (ordersRes.data || []).filter(o => o.status === 'pending').length;
      const lowStock = (productsRes.data || []).filter(p => p.stock < 5).length;
      const totalRevenue = (ordersRes.data || []).reduce((sum, o) => sum + (o.total || 0), 0);
      
      setStats({
        totalProducts: (productsRes.data || []).length,
        totalOrders: (ordersRes.data || []).length,
        totalRevenue,
        totalUsers: (usersRes.data || []).length,
        totalMessages: (messagesRes.data || []).length,
        pendingOrders,
        lowStock,
        totalSales: (ordersRes.data || []).length
      });
    } catch (error) {
      console.error('Erreur chargement:', error);
    }
  };
  
  const exportMessages = () => {
  const headers = ["Nom","Email","Telephone","Message","Date","Lu"];
  const rows = messages.map(m => [m.name,m.email,m.phone,m.message,new Date(m.createdAt).toLocaleString(),m.read?"Oui":"Non"]);
  const csv = [headers,...rows].map(r=>r.join(",")).join("\n");
  const blob = new Blob([csv],{type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `messages_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const markAllAsRead = async () => {
  const token = localStorage.getItem('adminToken');
  for (const msg of messages) {
    if (!msg.read) {
      await axios.put(`/api/admin/messages/${msg.id}`, { read: true }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  }
  fetchAllData();
};

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
      const response = await axios.post('/api/admin/login', { email, password });
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.user || { name: 'Admin', email: email, role: 'admin' }));
      setIsLoggedIn(true);
      setUser(response.data.user || { name: 'Admin', email: email, role: 'admin' });
      fetchAllData();
    } catch (error) {
      alert(error.response?.data?.message || 'Erreur de connexion');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleSave = async (data, type) => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { Authorization: `Bearer ${token}` };
      const apiType = type === 'testimonial' ? 'testimonials' : (type === 'product' ? 'products' : (type === 'formation' ? 'formations' : type));
      
      if (data.id) {
        await axios.put(`/api/admin/${apiType}/${data.id}`, data, { headers });
      } else {
        const response = await axios.post(`/api/admin/${apiType}`, data, { headers });
        data = response.data;
      }
      
      const stateMap = {
        product: { state: products, setter: setProducts },
        testimonial: { state: testimonials, setter: setTestimonials },
        formation: { state: formations, setter: setFormations },
        category: { state: categories, setter: setCategories }
      };
      
      const config = stateMap[type];
      if (config) {
        if (data.id) {
          config.setter(config.state.map(item => item.id === data.id ? data : item));
        } else {
          config.setter([...config.state, data]);
        }
      }
      
      setShowModal(false);
      setSelectedItem(null);
      fetchAllData();
    } catch (error) {
      alert(`Erreur lors de la sauvegarde`);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiType = type === 'testimonial' ? 'testimonials' : (type === 'product' ? 'products' : (type === 'formation' ? 'formations' : type));
      await axios.delete(`/api/admin/${apiType}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      
      const handleMarkAsRead = async (id) => {
  try {
    const token = localStorage.getItem('adminToken');
    await axios.put(`/api/admin/messages/${id}`, { read: true }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchAllData();
  } catch (error) {
    console.error('Erreur', error);
  }
};
      
      const stateMap = {
        product: { state: products, setter: setProducts },
        testimonial: { state: testimonials, setter: setTestimonials },
        formation: { state: formations, setter: setFormations },
        user: { state: users, setter: setUsers },
        message: { state: messages, setter: setMessages },
        category: { state: categories, setter: setCategories }
      };
      
      const config = stateMap[type];
      if (config) {
        config.setter(config.state.filter(item => item.id !== id));
      }
      
      setShowConfirmDelete(null);
      fetchAllData();
    } catch (error) {
      alert(`Erreur lors de la suppression`);
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/admin/orders/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
      fetchAllData();
    } catch (error) {
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleSaveSettings = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put('/api/admin/settings', settings, { headers: { Authorization: `Bearer ${token}` } });
      alert('Paramètres enregistrés avec succès !');
    } catch (error) {
      alert('Erreur lors de l\'enregistrement');
    }
  };

  const FormModal = ({ type, item, onClose, onSave }) => {
    const [formData, setFormData] = useState(item || getDefaultFormData(type));

    function getDefaultFormData(type) {
      switch(type) {
        case 'product':
          return { name: '', price: '', category: 'sac', description: '', icon: '👜', stock: 0, cloudinaryImage: '' };
        case 'testimonial':
          return { name: '', role: '', content: '', rating: 5, active: true, videoUrl: '' };
       case 'formation':
  return { name: '', description: '', duration: '1 mois', price: '', cloudinaryImage: '', videoUrl: '', type: 'formation' };
        case 'category':
          return { name: '', slug: '', icon: '📁' };
        default:
          return {};
      }
    }

    const getFormFields = () => {
      switch(type) {
        case 'product':
          return (
            <>
              <div><label className="block mb-1 font-medium">Nom</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></div>
              <div><label className="block mb-1 font-medium">Prix (FCFA)</label><input type="number" className="w-full p-2 border rounded dark:bg-gray-700" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required /></div>
              <div><label className="block mb-1 font-medium">Catégorie</label><select className="w-full p-2 border rounded dark:bg-gray-700" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}><option value="sac">Sac</option><option value="chaussure">Chaussure</option><option value="pagne">Pagne</option><option value="accessoire">Accessoire</option></select></div>
              <div><label className="block mb-1 font-medium">Icône</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} /></div>
              <div><label className="block mb-1 font-medium">Description</label><textarea className="w-full p-2 border rounded dark:bg-gray-700" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
              <div><label className="block mb-1 font-medium">Stock</label><input type="number" className="w-full p-2 border rounded dark:bg-gray-700" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} /></div>
              <div><label className="block mb-1 font-medium">Image Cloudinary</label><input type="url" className="w-full p-2 border rounded dark:bg-gray-700" placeholder="https://res.cloudinary.com/..." value={formData.cloudinaryImage || ""} onChange={e => setFormData({...formData, cloudinaryImage: e.target.value})} /></div>
            </>
          );
        case 'testimonial':
          return (
            <>
              <div><label className="block mb-1 font-medium">Nom</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></div>
              <div><label className="block mb-1 font-medium">Rôle</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} /></div>
              <div><label className="block mb-1 font-medium">Témoignage</label><textarea className="w-full p-2 border rounded dark:bg-gray-700" rows="4" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} required /></div>
              <div><label className="block mb-1 font-medium">Lien vidéo (YouTube ou Cloudinary)</label><input type="url" className="w-full p-2 border rounded dark:bg-gray-700" placeholder="https://www.youtube.com/embed/..." value={formData.videoUrl || ""} onChange={e => setFormData({...formData, videoUrl: e.target.value})} /></div>
              <div><label className="block mb-1 font-medium">Note</label><select className="w-full p-2 border rounded dark:bg-gray-700" value={formData.rating} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}><option value="5">5⭐</option><option value="4">4⭐</option><option value="3">3⭐</option><option value="2">2⭐</option><option value="1">1⭐</option></select></div>
              <div><label className="flex items-center gap-2"><input type="checkbox" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} /> Activer sur le site</label></div>
            </>
          );
       case 'formation':
  return (
    <>
      <div><label className="block mb-1 font-medium">Type</label>
        <select className="w-full p-2 border rounded dark:bg-gray-700" value={formData.type || 'formation'} onChange={e => setFormData({...formData, type: e.target.value})}>
          <option value="formation">🎓 Formation</option>
          <option value="evenement">📅 Événement</option>
        </select>
      </div>
      <div><label className="block mb-1 font-medium">Nom</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></div>
      <div><label className="block mb-1 font-medium">Description</label><textarea className="w-full p-2 border rounded dark:bg-gray-700" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
      {formData.type === 'formation' ? (
        <>
          <div><label className="block mb-1 font-medium">Durée</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} /></div>
          <div><label className="block mb-1 font-medium">Prix (FCFA)</label><input type="number" className="w-full p-2 border rounded dark:bg-gray-700" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} /></div>
        </>
      ) : (
        <>
          <div><label className="block mb-1 font-medium">Date de l'événement</label><input type="date" className="w-full p-2 border rounded dark:bg-gray-700" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} /></div>
          <div><label className="block mb-1 font-medium">Lieu</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" placeholder="Lieu de l'événement" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
        </>
      )}
      <div><label className="block mb-1 font-medium">Image Cloudinary</label><input type="url" className="w-full p-2 border rounded dark:bg-gray-700" placeholder="https://res.cloudinary.com/..." value={formData.cloudinaryImage || ""} onChange={e => setFormData({...formData, cloudinaryImage: e.target.value})} /></div>
      <div><label className="block mb-1 font-medium">Lien vidéo (YouTube)</label><input type="url" className="w-full p-2 border rounded dark:bg-gray-700" placeholder="https://www.youtube.com/embed/..." value={formData.videoUrl || ""} onChange={e => setFormData({...formData, videoUrl: e.target.value})} /></div>
    </>
  );
        default:
          return null;
      }
    };

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{item ? '✏️ Modifier' : '➕ Ajouter'} {type === 'product' ? 'un produit' : type === 'testimonial' ? 'un témoignage' : type === 'formation' ? 'une formation' : 'une catégorie'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><FontAwesomeIcon icon={faTimes} size="lg" /></button>
          </div>
          <div className="space-y-3">
            {getFormFields()}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="px-4 py-2 border rounded">Annuler</button>
            <button onClick={() => onSave(formData)} className="px-4 py-2 bg-afi-green text-white rounded"><FontAwesomeIcon icon={faSave} className="mr-1" /> Enregistrer</button>
          </div>
        </div>
      </div>
    );
  };

  if (!isLoggedIn && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-96">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-serif font-bold"><span className="text-afi-green">AFI</span> Collection</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Espace Administration</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4"><label className="block mb-2">Email</label><input type="email" name="email" className="w-full p-3 border rounded bg-white dark:bg-gray-700" required /></div>
            <div className="mb-4"><label className="block mb-2">Mot de passe</label><input type="password" name="password" className="w-full p-3 border rounded bg-white dark:bg-gray-700" required /></div>
            <button type="submit" className="w-full bg-afi-green text-white p-3 rounded font-semibold">Se connecter</button>
          </form>
          <div className="text-center text-xs text-gray-400 mt-4">admin@afi-collection.com / admin123</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center"><div className="text-3xl mb-4">⏳</div><p>Chargement...</p></div>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>Administration | AFI Collection</title></Helmet>
      
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <header className="bg-afi-green shadow-lg sticky top-0 z-40">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-serif font-bold text-white">AFI Collection Admin</h1>
              <p className="text-sm text-white/80">Bienvenue, {user?.name || 'Administrateur'} {user?.role === 'admin' && <span className="ml-2 bg-white/20 px-2 py-0.5 rounded text-xs">Admin</span>}</p>
            </div>
            <button onClick={handleLogout} className="bg-white text-afi-green px-4 py-2 rounded font-semibold hover:bg-gray-100">Déconnexion</button>
          </div>
        </header>

        <div className="bg-white dark:bg-gray-800 shadow-md overflow-x-auto sticky top-[72px] z-30">
          <div className="px-6 flex gap-1">
            {[
              { id: 'dashboard', label: 'Tableau de bord', icon: faTachometerAlt },
              { id: 'products', label: 'Produits', icon: faBox, count: stats.totalProducts },
              { id: 'gallery', label: 'Galerie', icon: faImages },
              { id: 'donations', label: 'Dons', icon: faDonate },
              { id: 'orders', label: 'Commandes', icon: faShoppingCart, count: stats.totalOrders },
              { id: 'users', label: 'Utilisateurs', icon: faUsers, count: stats.totalUsers },
              { id: 'messages', label: 'Messages', icon: faEnvelope, count: stats.totalMessages },
              { id: 'testimonials', label: 'Témoignages', icon: faStar },
              { id: 'formations', label: 'Formations', icon: faGraduationCap },
              { id: 'settings', label: 'Paramètres', icon: faCog }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium transition-colors flex items-center gap-2 ${
                  activeTab === tab.id ? 'border-b-2 border-afi-green text-afi-green' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800'
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} />
                <span>{tab.label}</span>
                {tab.count !== undefined && <span className="ml-1 text-xs bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"><div className="text-3xl mb-2"><FontAwesomeIcon icon={faMoneyBillWave} className="text-afi-green" /></div><div className="text-2xl font-bold text-afi-green">{stats.totalRevenue.toLocaleString()} FCFA</div><div className="text-gray-500">Chiffre d'affaires</div></div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"><div className="text-3xl mb-2"><FontAwesomeIcon icon={faBox} /></div><div className="text-2xl font-bold">{stats.totalProducts}</div><div className="text-gray-500">Produits</div>{stats.lowStock > 0 && <div className="text-sm text-red-500 mt-1">⚠️ {stats.lowStock} stock faible</div>}</div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"><div className="text-3xl mb-2"><FontAwesomeIcon icon={faShoppingCart} /></div><div className="text-2xl font-bold">{stats.totalOrders}</div><div className="text-gray-500">Commandes</div>{stats.pendingOrders > 0 && <div className="text-sm text-orange-500">⏳ {stats.pendingOrders} en attente</div>}</div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"><div className="text-3xl mb-2"><FontAwesomeIcon icon={faUsers} /></div><div className="text-2xl font-bold">{stats.totalUsers}</div><div className="text-gray-500">Utilisateurs</div></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow"><div className="p-4 border-b font-semibold flex items-center gap-2"><FontAwesomeIcon icon={faShoppingCart} /> Dernières commandes</div><div className="p-4">{orders.slice(0,5).map(order => (<div key={order.id} className="flex justify-between items-center py-2 border-b last:border-0"><div><div className="font-medium">#{order.id} - {order.customerName}</div><div className="text-sm text-gray-500">{order.total?.toLocaleString()} FCFA</div></div><span className={`px-2 py-1 text-xs rounded ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>{order.status}</span></div>))}</div></div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow"><div className="p-4 border-b font-semibold flex items-center gap-2"><FontAwesomeIcon icon={faEnvelope} /> Derniers messages</div><div className="p-4">{messages.slice(0,5).map(msg => (<div key={msg.id} className="py-2 border-b last:border-0"><div className="font-medium">{msg.name} - {msg.email}</div><div className="text-sm text-gray-600 truncate">{msg.message}</div></div>))}</div></div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Gestion des produits</h2><button onClick={() => { setSelectedItem(null); setModalType('product'); setShowModal(true); }} className="bg-afi-green text-white px-4 py-2 rounded"><FontAwesomeIcon icon={faPlus} className="mr-1" /> Ajouter</button></div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700"><tr><th className="p-3 text-left">Icône</th><th className="p-3 text-left">Nom</th><th className="p-3 text-left">Catégorie</th><th className="p-3 text-right">Prix</th><th className="p-3 text-center">Stock</th><th className="p-3 text-center">Image</th><th className="p-3 text-center">Actions</th></tr></thead>
                  <tbody>{products.map(product => (<tr key={product.id} className="border-t"><td className="p-3">{product.icon}</td><td className="p-3 font-medium">{product.name}</td><td className="p-3">{product.category}</td><td className="p-3 text-right">{product.price?.toLocaleString()} FCFA</td><td className={`p-3 text-center ${product.stock < 5 ? 'text-red-500 font-bold' : ''}`}>{product.stock}</td><td className="p-3 text-center">{product.cloudinaryImage && <img src={product.cloudinaryImage} alt={product.name} className="w-10 h-10 object-cover rounded" />}</td><td className="p-3 text-center"><button onClick={() => { setSelectedItem(product); setModalType('product'); setShowModal(true); }} className="text-blue-500 mr-2"><FontAwesomeIcon icon={faEdit} /></button><button onClick={() => setShowConfirmDelete({ id: product.id, type: 'product' })} className="text-red-500"><FontAwesomeIcon icon={faTrash} /></button></td></tr>))}</tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Gestion des commandes</h2>
              <div className="space-y-4">{orders.map(order => (<div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"><div className="flex justify-between items-start"><div><div className="font-mono text-afi-green">#{order.id}</div><div className="font-semibold">{order.customerName}</div><div className="text-sm text-gray-500">{order.customerPhone}</div></div><div className="text-right"><div className="font-bold text-afi-green">{order.total?.toLocaleString()} FCFA</div><select value={order.status} onChange={e => handleUpdateOrderStatus(order.id, e.target.value)} className="mt-2 p-1 border rounded text-sm"><option value="pending">En attente</option><option value="confirmed">Confirmée</option><option value="processing">En traitement</option><option value="shipped">Expédiée</option><option value="delivered">Livrée</option><option value="cancelled">Annulée</option></select></div></div></div>))}</div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Gestion des utilisateurs</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                <table className="w-full"><thead className="bg-gray-50 dark:bg-gray-700"><tr><th className="p-3 text-left">Nom</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Rôle</th><th className="p-3 text-center">Actions</th></tr></thead><tbody>{users.map(u => (<tr key={u.id} className="border-t"><td className="p-3">{u.name}</td><td className="p-3">{u.email}</td><td className="p-3"><span className={`px-2 py-1 text-xs rounded ${u.role === 'admin' ? 'bg-afi-green text-white' : 'bg-gray-200'}`}>{u.role || 'client'}</span></td><td className="p-3 text-center"><button onClick={() => setShowConfirmDelete({ id: u.id, type: 'user' })} className="text-red-500"><FontAwesomeIcon icon={faTrash} /></button></td></tr>))}</tbody></table>
              </div>
            </div>
          )}

        {activeTab === 'messages' && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">✉️ Messages</h2>
      <div className="flex gap-2">
        <button id="exportMessagesBtn" className="bg-afi-green text-white px-4 py-2 rounded text-sm">📥 Exporter CSV</button>
        <button id="markAllReadBtn" className="border border-afi-green text-afi-green px-4 py-2 rounded text-sm">✓ Marquer tout lu</button>
      </div>
    </div>
    <div className="space-y-4" id="messagesList">
      {messages.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500">Aucun message</p>
        </div>
      ) : (
        messages.map(msg => (
          <div key={msg.id} className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 ${!msg.read ? 'border-l-4 border-afi-green' : ''}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold">{msg.name} - {msg.email}</p>
                <p className="text-sm text-gray-500">{msg.phone}</p>
                <p className="mt-2">{msg.message}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(msg.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <a href={`https://wa.me/${msg.phone?.replace(/\D/g, '')}`} target="_blank" className="text-green-500 text-sm">💬</a>
                <a href={`mailto:${msg.email}`} className="text-blue-500 text-sm">✉️</a>
                <button onClick={() => setShowConfirmDelete({ id: msg.id, type: 'message' })} className="text-red-500 text-sm">🗑️</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
)}

          {activeTab === 'testimonials' && (
            <div>
              <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Témoignages clients</h2><button onClick={() => { setSelectedItem(null); setModalType('testimonial'); setShowModal(true); }} className="bg-afi-green text-white px-4 py-2 rounded"><FontAwesomeIcon icon={faPlus} className="mr-1" /> Ajouter</button></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{testimonials.map(t => (<div key={t.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"><div className="flex justify-between items-start"><div><div className="font-semibold">{t.name}</div><div className="text-sm text-gray-500">{t.role}</div></div>
                    <div className="flex gap-2">
                      <button onClick={() => { setSelectedItem(t); setModalType("testimonial"); setShowModal(true); }} className="text-blue-500 hover:text-blue-700">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button onClick={() => setShowConfirmDelete({ id: t.id, type: "testimonial" })} className="text-red-500 hover:text-red-700">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div></div><div className="mt-2 text-gray-600">{t.content}</div><div className="mt-2 text-afi-green">{'⭐'.repeat(t.rating || 5)}</div></div>))}</div>
            </div>
          )}

          {activeTab === 'formations' && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Gestion des formations et événements</h2>
      <button onClick={() => { setSelectedItem(null); setModalType('formation'); setShowModal(true); }} className="bg-afi-green text-white px-4 py-2 rounded"><FontAwesomeIcon icon={faPlus} className="mr-1" /> Ajouter</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {formations.map(f => (
        <div key={f.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex justify-between">
            <div>
              <span className={`text-xs px-2 py-1 rounded ${f.type === 'formation' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                {f.type === 'formation' ? '🎓 Formation' : '📅 Événement'}
              </span>
              <h3 className="font-bold text-lg mt-1">{f.name}</h3>
            </div>
            <button onClick={() => setShowConfirmDelete({ id: f.id, type: 'formation' })} className="text-red-500"><FontAwesomeIcon icon={faTrash} /></button>
          </div>
          <p className="text-gray-600 text-sm mt-1">{f.description}</p>
          {f.cloudinaryImage && <img src={f.cloudinaryImage} alt={f.name} className="w-full h-32 object-cover rounded mt-2" />}
          <div className="mt-2 flex justify-between text-sm">
            {f.type === 'formation' ? (
              <><span>Durée: {f.duration}</span><span className="font-bold text-afi-green">{f.price} FCFA</span></>
            ) : (
              <><span>📅 {f.date}</span><span>📍 {f.location}</span></>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <button onClick={() => { setSelectedItem(f); setModalType('formation'); setShowModal(true); }} className="text-blue-500 text-sm">Modifier</button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><FontAwesomeIcon icon={faCog} /> Paramètres du site</h2>
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><FontAwesomeIcon icon={faGlobe} /> Informations générales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block mb-1 text-sm font-medium">Nom du site</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.siteName} onChange={e => setSettings({...settings, siteName: e.target.value})} /></div>
                    <div><label className="block mb-1 text-sm font-medium">Description</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.siteDescription} onChange={e => setSettings({...settings, siteDescription: e.target.value})} /></div>
                    <div><label className="block mb-1 text-sm font-medium">Email de contact</label><input type="email" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.contactEmail} onChange={e => setSettings({...settings, contactEmail: e.target.value})} /></div>
                    <div><label className="block mb-1 text-sm font-medium">Téléphone</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.contactPhone} onChange={e => setSettings({...settings, contactPhone: e.target.value})} /></div>
                    <div className="md:col-span-2"><label className="block mb-1 text-sm font-medium">Adresse</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-700" value={settings.contactAddress} onChange={e => setSettings({...settings, contactAddress: e.target.value})} /></div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><FontAwesomeIcon icon={faPalette} /> Apparence</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block mb-1 text-sm font-medium">Couleur principale</label><input type="color" className="w-full h-10 border rounded" value={settings.primaryColor} onChange={e => setSettings({...settings, primaryColor: e.target.value})} /></div>
                    <div><label className="block mb-1 text-sm font-medium">Couleur secondaire</label><input type="color" className="w-full h-10 border rounded" value={settings.secondaryColor} onChange={e => setSettings({...settings, secondaryColor: e.target.value})} /></div>
                    <div><label className="block mb-1 text-sm font-medium">Police</label><select className="w-full p-2 border rounded" value={settings.fontFamily} onChange={e => setSettings({...settings, fontFamily: e.target.value})}><option>Cormorant Garamond</option><option>Poppins</option><option>Roboto</option><option>Open Sans</option></select></div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><FontAwesomeIcon icon={faShareAlt} /> Réseaux sociaux</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block mb-1 text-sm font-medium"><FontAwesomeIcon icon={faFacebook} className="mr-1" /> Facebook</label><input type="url" className="w-full p-2 border rounded" value={settings.facebook} onChange={e => setSettings({...settings, facebook: e.target.value})} /></div>
                    <div><label className="block mb-1 text-sm font-medium"><FontAwesomeIcon icon={faInstagram} className="mr-1" /> Instagram</label><input type="url" className="w-full p-2 border rounded" value={settings.instagram} onChange={e => setSettings({...settings, instagram: e.target.value})} /></div>
                    <div><label className="block mb-1 text-sm font-medium"><FontAwesomeIcon icon={faTwitter} className="mr-1" /> Twitter</label><input type="url" className="w-full p-2 border rounded" value={settings.twitter} onChange={e => setSettings({...settings, twitter: e.target.value})} /></div>
                    <div><label className="block mb-1 text-sm font-medium"><FontAwesomeIcon icon={faWhatsapp} className="mr-1" /> WhatsApp</label><input type="text" className="w-full p-2 border rounded" value={settings.whatsapp} onChange={e => setSettings({...settings, whatsapp: e.target.value})} /></div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><FontAwesomeIcon icon={faGlobe} /> SEO</h3>
                  <div className="space-y-3">
                    <div><label className="block mb-1 text-sm font-medium">Meta titre</label><input type="text" className="w-full p-2 border rounded" value={settings.metaTitle} onChange={e => setSettings({...settings, metaTitle: e.target.value})} /></div>
                    <div><label className="block mb-1 text-sm font-medium">Meta description</label><textarea className="w-full p-2 border rounded" rows="2" value={settings.metaDescription} onChange={e => setSettings({...settings, metaDescription: e.target.value})} /></div>
                    <div><label className="block mb-1 text-sm font-medium">Mots-clés</label><input type="text" className="w-full p-2 border rounded" value={settings.metaKeywords} onChange={e => setSettings({...settings, metaKeywords: e.target.value})} /></div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><FontAwesomeIcon icon={faSlidersH} /> Fonctionnalités</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 border rounded"><span>Activer le panier</span><input type="checkbox" checked={settings.enableCart} onChange={e => setSettings({...settings, enableCart: e.target.checked})} /></label>
                    <label className="flex items-center justify-between p-3 border rounded"><span>Activer les témoignages</span><input type="checkbox" checked={settings.enableTestimonials} onChange={e => setSettings({...settings, enableTestimonials: e.target.checked})} /></label>
                    <label className="flex items-center justify-between p-3 border rounded"><span>Mode maintenance</span><input type="checkbox" checked={settings.maintenanceMode} onChange={e => setSettings({...settings, maintenanceMode: e.target.checked})} /></label>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><FontAwesomeIcon icon={faClock} /> Horaires</h3>
                  <div className="space-y-3">
                    <div><label className="block mb-1 text-sm font-medium">Horaires d'ouverture</label><input type="text" className="w-full p-2 border rounded" value={settings.openingHours} onChange={e => setSettings({...settings, openingHours: e.target.value})} /></div>
                    <div><label className="block mb-1 text-sm font-medium">Jours de fermeture</label><input type="text" className="w-full p-2 border rounded" value={settings.closingDays} onChange={e => setSettings({...settings, closingDays: e.target.value})} /></div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button onClick={handleSaveSettings} className="bg-afi-green text-white px-6 py-3 rounded-lg font-semibold"><FontAwesomeIcon icon={faSave} className="mr-2" /> Enregistrer tous les paramètres</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeTab === "donations" && <DonAdmin />}
      {activeTab === "gallery" && <GalerieAdmin />}

      {showModal && <FormModal type={modalType} item={selectedItem} onClose={() => { setShowModal(false); setSelectedItem(null); }} onSave={(data) => handleSave(data, modalType)} />}
      
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6"><p className="mb-4">Supprimer cet élément ?</p><div className="flex justify-end gap-2"><button onClick={() => setShowConfirmDelete(null)} className="px-4 py-2 border rounded">Annuler</button><button onClick={() => handleDelete(showConfirmDelete.id, showConfirmDelete.type)} className="px-4 py-2 bg-red-500 text-white rounded">Supprimer</button></div></div>
        </div>
      )}
    </>
  );
}

export default Admin;
