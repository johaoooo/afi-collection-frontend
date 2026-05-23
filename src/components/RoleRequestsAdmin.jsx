import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faSpinner, faClock, faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import API_URL from '../config/api';

function RoleRequestsAdmin() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({});

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${API_URL}/admin/role-requests`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur:', error);
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setProcessing({ ...processing, [id]: true });
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API_URL}/admin/role-requests/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRequests();
    } catch (error) {
      alert('Erreur lors de l\'approbation');
    } finally {
      setProcessing({ ...processing, [id]: false });
    }
  };

  const handleReject = async (id) => {
    setProcessing({ ...processing, [id]: true });
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API_URL}/admin/role-requests/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRequests();
    } catch (error) {
      alert('Erreur lors du rejet');
    } finally {
      setProcessing({ ...processing, [id]: false });
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><FontAwesomeIcon icon={faClock} /> En attente</span>;
      case 'approved': return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><FontAwesomeIcon icon={faCheck} /> Approuvé</span>;
      case 'rejected': return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><FontAwesomeIcon icon={faTimes} /> Rejeté</span>;
      default: return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">{status}</span>;
    }
  };

  const getRoleLabel = (role) => {
    switch(role) {
      case 'artisan': return '👨‍🎨 Artisan';
      case 'etudiant': return '🎓 Étudiant';
      case 'manager': return '📊 Gestionnaire';
      case 'editor': return '✏️ Éditeur';
      default: return role;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement des demandes...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📋 Demandes de changement de rôle</h2>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-gray-500">Aucune demande en attente</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map(req => (
            <div key={req.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-afi-green/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="text-afi-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">{req.user.name}</h3>
                      <div className="flex gap-3 text-sm text-gray-500">
                        <span><FontAwesomeIcon icon={faEnvelope} className="mr-1" />{req.user.email}</span>
                        <span><FontAwesomeIcon icon={faPhone} className="mr-1" />{req.user.phone || 'Non renseigné'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                      📍 Rôle actuel : <span className="font-semibold">{req.user.role}</span>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                      🎯 Rôle demandé : <span className="font-semibold">{getRoleLabel(req.requestedRole)}</span>
                    </div>
                    <div>
                      {getStatusBadge(req.status)}
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-400">
                    📅 Demandé le {new Date(req.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
                {req.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(req.id)}
                      disabled={processing[req.id]}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1 disabled:opacity-50"
                    >
                      {processing[req.id] ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : <FontAwesomeIcon icon={faCheck} />}
                      Approuver
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      disabled={processing[req.id]}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1 disabled:opacity-50"
                    >
                      {processing[req.id] ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : <FontAwesomeIcon icon={faTimes} />}
                      Rejeter
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RoleRequestsAdmin;
