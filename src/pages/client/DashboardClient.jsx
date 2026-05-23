import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faEnvelope, faPhone, faEdit, faSave, faTimes,
  faCamera, faShoppingBag, faHeart, faMapMarkerAlt, faClock,
  faCheckCircle, faTruck, faUserCircle,
  faUpload, faImage, faSpinner, faTrashAlt,
  faBox, faSignOutAlt, faBriefcase, faGraduationCap
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import API_URL from "../../config/api";

function DashboardClient() {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleRequestMessage, setRoleRequestMessage] = useState('');
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
    fetchOrders();
  }, []);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      setEditForm({
        name: res.data.name || '',
        email: res.data.email || '',
        phone: res.data.phone || ''
      });
    } catch (error) {
      console.error('Erreur profil', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/client/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data || []);
    } catch (error) {
      console.error('Erreur commandes', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/login';
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_URL}/profile`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      setIsEditing(false);
      showMessage('Profil mis à jour avec succès !');
    } catch (error) {
      showMessage('Erreur lors de la mise à jour', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showMessage('Veuillez sélectionner une image', 'error');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showMessage('L\'image ne doit pas dépasser 2 Mo', 'error');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/profile/avatar`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfile({ ...profile, avatar: res.data.avatar });
      showMessage('Photo de profil mise à jour !');
    } catch (error) {
      showMessage('Erreur lors de l\'upload', 'error');
    } finally {
      setUploading(false);
    }
  };

  const demanderRole = async (role) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/profile/role-request`, 
        { requestedRole: role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRoleRequestMessage(`Votre demande pour devenir ${role === 'artisan' ? 'Artisan' : 'Étudiant'} a bien été envoyée à l'administrateur.`);
      setShowRoleModal(true);
      setTimeout(() => setShowRoleModal(false), 4000);
      showMessage(`Demande envoyée pour devenir ${role === 'artisan' ? 'Artisan' : 'Étudiant'}`, 'success');
    } catch (error) {
      showMessage('Erreur lors de la demande', 'error');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { icon: faClock, text: 'En attente', class: 'bg-yellow-100 text-yellow-800' },
      confirmed: { icon: faCheckCircle, text: 'Confirmée', class: 'bg-blue-100 text-blue-800' },
      processing: { icon: faSpinner, text: 'En traitement', class: 'bg-purple-100 text-purple-800' },
      shipped: { icon: faTruck, text: 'Expédiée', class: 'bg-indigo-100 text-indigo-800' },
      delivered: { icon: faCheckCircle, text: 'Livrée', class: 'bg-green-100 text-green-800' },
      cancelled: { icon: faTimes, text: 'Annulée', class: 'bg-red-100 text-red-800' }
    };
    const b = badges[status] || badges.pending;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${b.class}`}>
        <FontAwesomeIcon icon={b.icon} className="text-xs" />
        {b.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-afi-green mx-auto"></div>
          <p className="mt-4 text-gray-500">Chargement de votre espace...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>Mon compte | AFI Collection</title></Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Message de notification */}
          {message.text && (
            <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg ${
              message.type === 'error' ? 'bg-red-500 text-white' : 'bg-afi-green text-white'
            } animate-slide-in`}>
              {message.text}
            </div>
          )}

          {/* Modal de confirmation demande de rôle */}
          {showRoleModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md text-center">
                <div className="text-4xl mb-3">📨</div>
                <h3 className="text-lg font-semibold mb-2">Demande envoyée !</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{roleRequestMessage}</p>
                <button onClick={() => setShowRoleModal(false)} className="mt-4 bg-afi-green text-white px-4 py-2 rounded-lg">Fermer</button>
              </div>
            </div>
          )}

          {/* En-tête avec bouton déconnexion */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <FontAwesomeIcon icon={faUserCircle} className="text-afi-green text-4xl" />
              Mon compte
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Carte Profil */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-afi-green to-afi-green-dark px-6 py-4">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FontAwesomeIcon icon={faUser} /> Mon profil
                  </h2>
                </div>
                
                <div className="p-6 text-center">
                  {/* Avatar */}
                  <div className="relative inline-block">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-afi-green to-afi-green-dark flex items-center justify-center mx-auto overflow-hidden">
                      {profile?.avatar ? (
                        <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <FontAwesomeIcon icon={faUserCircle} className="text-6xl text-white" />
                      )}
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="absolute bottom-0 right-2 bg-afi-green text-white p-2 rounded-full shadow-lg hover:bg-afi-green-dark transition-colors"
                    >
                      <FontAwesomeIcon icon={uploading ? faSpinner : faCamera} className={uploading ? 'animate-spin' : ''} />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{profile?.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{profile?.email}</p>
                  {profile?.phone && <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{profile.phone}</p>}

                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="mt-4 w-full bg-gray-100 dark:bg-gray-700 text-afi-green py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon icon={faEdit} /> Modifier mes informations
                  </button>

                  {/* Demande de changement de rôle */}
                  {profile?.role === 'client' && (
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-500 mb-3">Évoluez avec AFI Collection :</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => demanderRole('artisan')} 
                          className="flex-1 bg-afi-green/10 text-afi-green py-2 rounded-lg text-sm hover:bg-afi-green/20 transition-colors flex items-center justify-center gap-1"
                        >
                          <FontAwesomeIcon icon={faBriefcase} className="text-sm" /> Devenir Artisan
                        </button>
                        <button 
                          onClick={() => demanderRole('etudiant')} 
                          className="flex-1 bg-afi-yellow/10 text-afi-yellow py-2 rounded-lg text-sm hover:bg-afi-yellow/20 transition-colors flex items-center justify-center gap-1"
                        >
                          <FontAwesomeIcon icon={faGraduationCap} className="text-sm" /> Devenir Étudiant
                        </button>
                      </div>
                    </div>
                  )}

                  {profile?.role !== 'client' && profile?.role !== 'admin' && (
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-green-600 dark:text-green-400">
                        ✅ Rôle actuel : {profile?.role === 'artisan' ? 'Artisan' : profile?.role === 'etudiant' ? 'Étudiant' : profile?.role}
                      </p>
                    </div>
                  )}
                </div>

                {/* Formulaire d'édition */}
                {isEditing && (
                  <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <FontAwesomeIcon icon={faUser} className="mr-1" /> Nom complet
                        </label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-afi-green focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <FontAwesomeIcon icon={faEnvelope} className="mr-1" /> Email
                        </label>
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-afi-green focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <FontAwesomeIcon icon={faPhone} className="mr-1" /> Téléphone
                        </label>
                        <input
                          type="tel"
                          value={editForm.phone || ''}
                          onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-afi-green focus:border-transparent"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          disabled={saving}
                          className="flex-1 bg-afi-green text-white py-2 rounded-lg font-medium hover:bg-afi-green-dark transition-colors flex items-center justify-center gap-2"
                        >
                          {saving ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : <FontAwesomeIcon icon={faSave} />}
                          Enregistrer
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <FontAwesomeIcon icon={faTimes} /> Annuler
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Statistiques rapides */}
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faShoppingBag} /> Résumé
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-500">Commandes passées</span>
                    <span className="font-bold text-afi-green">{orders.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-500">Articles favoris</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-500">Membre depuis</span>
                    <span className="text-sm">{profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '-'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Commandes */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-afi-green to-afi-green-dark px-6 py-4">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FontAwesomeIcon icon={faShoppingBag} /> Mes commandes
                  </h2>
                </div>
                
                <div className="p-6">
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FontAwesomeIcon icon={faBox} className="text-3xl text-gray-400" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400">Aucune commande passée</p>
                      <a href="/" className="mt-4 inline-block text-afi-green hover:underline">Découvrir nos produits →</a>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map(order => (
                        <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
                          <div className="flex flex-wrap justify-between items-start gap-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-sm text-afi-green font-bold">#{order.id}</span>
                                {getStatusBadge(order.status)}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                <FontAwesomeIcon icon={faClock} className="mr-1" />
                                {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                                  day: 'numeric', month: 'long', year: 'numeric'
                                })}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-afi-green">{order.total?.toLocaleString()} FCFA</div>
                              <div className="text-sm text-gray-500">{order.items?.length || 0} article(s)</div>
                            </div>
                          </div>
                          
                          {order.items && order.items.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                              <div className="text-xs text-gray-500 mb-1">Produits :</div>
                              <div className="flex flex-wrap gap-2">
                                {order.items.slice(0, 3).map((item, idx) => (
                                  <span key={idx} className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                    {item.name} x{item.quantity}
                                  </span>
                                ))}
                                {order.items.length > 3 && (
                                  <span className="text-sm text-gray-500">+{order.items.length - 3} autres</span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default DashboardClient;
