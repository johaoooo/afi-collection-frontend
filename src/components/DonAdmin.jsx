import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import API_URL from '../config/api';

function DonAdmin() {
  const [dons, setDons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDon, setSelectedDon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    donorName: '', amount: '', email: '', phone: '', message: '', status: 'pending',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => { fetchDons(); }, []);

  const fetchDons = async () => {
    try {
      setError(null);
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${API_URL}/admin/donations`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // ✅ CORRECTION PRINCIPALE : normaliser res.data quelle que soit sa forme
      const data = res.data;
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.donations)
          ? data.donations
          : Array.isArray(data?.data)
            ? data.data
            : [];

      setDons(list);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Impossible de charger les dons.');
      setDons([]); // ✅ dons reste toujours un tableau
    } finally {
      setLoading(false);
    }
  };

  const openModal = (don = null) => {
    if (don) {
      setSelectedDon(don);
      setFormData({
        donorName: don.donorName || '',
        amount: don.amount || '',
        email: don.email || '',
        phone: don.phone || '',
        message: don.message || '',
        status: don.status || 'pending',
        date: don.date ? don.date.split('T')[0] : new Date().toISOString().split('T')[0]
      });
    } else {
      setSelectedDon(null);
      setFormData({
        donorName: '', amount: '', email: '', phone: '', message: '', status: 'pending',
        date: new Date().toISOString().split('T')[0]
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDon(null);
    setFormData({
      donorName: '', amount: '', email: '', phone: '', message: '', status: 'pending',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (selectedDon) {
        await axios.put(`${API_URL}/admin/donations/${selectedDon.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/admin/donations`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      closeModal();
      fetchDons();
    } catch (err) {
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce don ?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/admin/donations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDons();
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  // ✅ sécurisé : dons est toujours un tableau
  const totalDons = dons.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);

  if (loading) return <div className="text-center py-8">Chargement...</div>;

  if (error) return (
    <div className="text-center py-8">
      <p className="text-red-500 mb-3">{error}</p>
      <button onClick={fetchDons} className="text-afi-green hover:underline">Réessayer</button>
    </div>
  );

  return (
    <div>
      {/* En-tête */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Gestion des dons</h2>
          <p className="text-sm text-gray-500">
            Total : <span className="font-bold text-afi-green">{totalDons.toLocaleString('fr-FR')} FCFA</span>
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-afi-green text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} /> Ajouter
        </button>
      </div>

      {/* Tableau ou état vide */}
      {dons.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-500 mb-2">Aucun don enregistré</p>
          <button onClick={() => openModal()} className="text-afi-green hover:underline">
            Ajouter un don
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Donateur</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-right">Montant</th>
                <th className="p-3 text-center">Statut</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dons.map(d => (
                <tr key={d.id} className="border-t dark:border-gray-700">
                  <td className="p-3 text-sm">
                    {d.date ? new Date(d.date).toLocaleDateString('fr-FR') : '-'}
                  </td>
                  <td className="p-3 font-medium">{d.donorName || '-'}</td>
                  <td className="p-3 text-sm text-gray-500">{d.email || '-'}</td>
                  <td className="p-3 text-right font-bold text-afi-green">
                    {parseFloat(d.amount || 0).toLocaleString('fr-FR')} FCFA
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      d.status === 'pending'   ? 'bg-yellow-100 text-yellow-800' :
                      d.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      d.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                 'bg-blue-100 text-blue-800'
                    }`}>
                      {d.status === 'pending'   ? 'En attente' :
                       d.status === 'confirmed' ? 'Confirmé' :
                       d.status === 'cancelled' ? 'Annulé' : d.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => openModal(d)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Modifier"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Supprimer"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal ajouter / modifier */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {selectedDon ? '✏️ Modifier' : '➕ Ajouter'} un don
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block mb-1 text-sm font-medium">Nom du donateur</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={formData.donorName}
                  onChange={e => setFormData({...formData, donorName: e.target.value})}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Montant (FCFA)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={formData.amount}
                  onChange={e => setFormData({...formData, amount: e.target.value})}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Téléphone</label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Message</label>
                <textarea
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  rows="3"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Statut</label>
                <select
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmé</option>
                  <option value="cancelled">Annulé</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={formData.date?.split('T')[0] || ''}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={closeModal} className="px-4 py-2 border rounded dark:border-gray-600">
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

export default DonAdmin;
