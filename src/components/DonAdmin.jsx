import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSave, faTimes, faDonate } from '@fortawesome/free-solid-svg-icons';

function DonAdmin() {
  const [dons, setDons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDon, setSelectedDon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    donorName: '', amount: '', email: '', phone: '', message: '', status: 'pending', date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => { fetchDons(); }, []);

  const fetchDons = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/donations', { headers: { Authorization: `Bearer ${token}` } });
      setDons(res.data);
      setLoading(false);
    } catch (error) { setLoading(false); }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (selectedDon) {
        await axios.put(`/api/admin/donations/${selectedDon.id}`, formData, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post('/api/admin/donations', formData, { headers: { Authorization: `Bearer ${token}` } });
      }
      setShowModal(false);
      setSelectedDon(null);
      setFormData({ donorName: '', amount: '', email: '', phone: '', message: '', status: 'pending', date: new Date().toISOString().split('T')[0] });
      fetchDons();
    } catch (error) { alert('Erreur'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/donations/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchDons();
    } catch (error) { alert('Erreur'); }
  };

  const totalDons = dons.reduce((sum, d) => sum + (d.amount || 0), 0);

  if (loading) return <div className="text-center py-8">Chargement...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div><h2 className="text-xl font-bold">Gestion des dons</h2><p className="text-sm text-gray-500">Total: <span className="font-bold text-afi-green">{totalDons.toLocaleString()} FCFA</span></p></div>
        <button onClick={() => setShowModal(true)} className="bg-afi-green text-white px-4 py-2 rounded flex items-center gap-2"> Ajouter</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead className="bg-gray-50 dark:bg-gray-700"><tr><th className="p-3">Date</th><th className="p-3">Donateur</th><th className="p-3 text-right">Montant</th><th className="p-3">Statut</th><th className="p-3">Actions</th></tr></thead>
          <tbody>{dons.map(d => (<tr key={d.id} className="border-t"><td className="p-3">{d.date}</td><td className="p-3 font-medium">{d.donorName}</td><td className="p-3 text-right font-bold text-afi-green">{d.amount?.toLocaleString()} FCFA</td><td className="p-3"><span className={`px-2 py-1 rounded text-xs ${d.status === 'pending' ? 'bg-yellow-100' : d.status === 'confirmed' ? 'bg-green-100' : 'bg-blue-100'}`}>{d.status}</span></td><td className="p-3"><button onClick={() => { setSelectedDon(d); setFormData(d); setShowModal(true); }} className="text-blue-500 mr-2"></button></td></tr>))}</tbody>
        </table>
      </div>
      {dons.length === 0 && <div className="text-center py-12"><p>Aucun don</p><button onClick={() => setShowModal(true)} className="mt-2 text-afi-green">Ajouter</button></div>}
      {showModal && (<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"><div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"><div className="flex justify-between mb-4"><h2 className="text-xl font-bold">{selectedDon ? 'Modifier' : 'Ajouter'} un don</h2><button onClick={() => { setShowModal(false); setSelectedDon(null); }}> Enregistrer</button></div></div></div>)}
    </div>
  );
}

export default DonAdmin;
