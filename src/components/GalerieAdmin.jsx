import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSave, faTimes, faImage } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

function GalerieAdmin() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ AJOUT : état d'erreur
  const [formData, setFormData] = useState({
    title: '', type: 'image', youtubeUrl: '', cloudinaryUrl: '', description: ''
  });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      setError(null);
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${API_URL}/admin/gallery`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // ✅ CORRECTION PRINCIPALE : normaliser res.data quelle que soit sa forme
      const data = res.data;
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.gallery)
          ? data.gallery
          : Array.isArray(data?.data)
            ? data.data
            : [];

      setItems(list);
    } catch (error) {
      console.error('Erreur galerie:', error);
      setError('Impossible de charger la galerie.');
      setItems([]); // ✅ items reste toujours un tableau même en erreur
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (selectedItem) {
        await axios.put(`${API_URL}/admin/gallery/${selectedItem.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/admin/gallery`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowModal(false);
      setSelectedItem(null);
      setFormData({ title: '', type: 'image', youtubeUrl: '', cloudinaryUrl: '', description: '' });
      fetchItems();
    } catch (error) {
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cet élément ?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/admin/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchItems();
    } catch (error) {
      alert('Erreur lors de la suppression');
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setSelectedItem(item);
      setFormData({
        title: item.title || '',
        type: item.type || 'image',
        youtubeUrl: item.youtubeUrl || '',
        cloudinaryUrl: item.cloudinaryUrl || '',
        description: item.description || ''
      });
    } else {
      setSelectedItem(null);
      setFormData({ title: '', type: 'image', youtubeUrl: '', cloudinaryUrl: '', description: '' });
    }
    setShowModal(true);
  };

  if (loading) return <div className="text-center py-8">Chargement de la galerie...</div>;

  // ✅ AJOUT : affichage d'erreur avec bouton réessayer
  if (error) return (
    <div className="text-center py-8">
      <p className="text-red-500 mb-3">{error}</p>
      <button onClick={fetchItems} className="text-afi-green hover:underline">Réessayer</button>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Galerie</h2>
        <button
          onClick={() => openModal()}
          className="bg-afi-green text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} /> Ajouter un média
        </button>
      </div>

      {/* ✅ État vide — vérifié avec items.length (toujours un tableau) */}
      {items.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <div className="text-6xl mb-4">📷</div>
          <p className="text-gray-500">Aucun média dans la galerie</p>
          <button onClick={() => openModal()} className="mt-4 text-afi-green hover:underline">
            Ajouter votre premier média
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                {item.type === 'video' ? (
                  <FontAwesomeIcon icon={faYoutube} className="text-red-500 text-5xl" />
                ) : item.cloudinaryUrl ? (
                  <img src={item.cloudinaryUrl} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <FontAwesomeIcon icon={faImage} className="text-blue-500 text-5xl" />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className={`text-xs px-2 py-1 rounded ${item.type === 'video' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                    {item.type === 'video' ? '🎬 Vidéo' : '🖼️ Image'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
                {item.youtubeUrl && (
                  <div className="mt-2 text-xs text-gray-400 truncate">🔗 {item.youtubeUrl}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {selectedItem ? '✏️ Modifier' : '➕ Ajouter'} un média
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block mb-1 font-medium">Titre</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Type</label>
                <select
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option value="image">🖼️ Image</option>
                  <option value="video">🎬 Vidéo</option>
                </select>
              </div>
              {formData.type === 'video' ? (
                <div>
                  <label className="block mb-1 font-medium">Lien YouTube</label>
                  <input
                    type="url"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    placeholder="https://www.youtube.com/embed/..."
                    value={formData.youtubeUrl}
                    onChange={e => setFormData({...formData, youtubeUrl: e.target.value})}
                  />
                </div>
              ) : (
                <div>
                  <label className="block mb-1 font-medium">URL Cloudinary</label>
                  <input
                    type="url"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    placeholder="https://res.cloudinary.com/..."
                    value={formData.cloudinaryUrl}
                    onChange={e => setFormData({...formData, cloudinaryUrl: e.target.value})}
                  />
                </div>
              )}
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  rows="3"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded dark:border-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-afi-green text-white rounded flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faSave} /> Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalerieAdmin;
