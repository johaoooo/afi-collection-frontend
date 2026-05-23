import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCreditCard, faMapMarkerAlt, faPhone, faEnvelope, faUser, faCheckCircle, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import API_URL from '../config/api';

function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '', email: '', phone: '', address: '',
    paymentMethod: 'MTN Mobile Money', notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (items.length === 0 && !orderComplete) navigate('/');
  }, [items, navigate, orderComplete]);

  useEffect(() => {
    const handleSuccess = async (response) => {
      try {
        const res = await axios.post(`${API_URL}/payment/verify`, { transactionId: response.transactionId });
        if (res.data.success) { setOrderNumber(response.transactionId); setOrderComplete(true); clearCart(); }
        else setError('Paiement non confirmé. Contactez le support.');
      } catch { setError('Erreur lors de la vérification du paiement.'); }
      finally { setIsSubmitting(false); }
    };
    const handleFailed = () => { setError('Paiement échoué. Veuillez réessayer.'); setIsSubmitting(false); };
    if (window.addSuccessListener) window.addSuccessListener(handleSuccess);
    if (window.addFailedListener) window.addFailedListener(handleFailed);
    return () => {
      if (window.removeSuccessListener) window.removeSuccessListener(handleSuccess);
      if (window.removeFailedListener) window.removeFailedListener(handleFailed);
    };
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const isMobileMoney = ['MTN Mobile Money', 'Moov Money'].includes(formData.paymentMethod);
    if (isMobileMoney) {
      if (window.openKkiapayWidget) {
        window.openKkiapayWidget({ amount: total, api_key: 'da52a61056cd11f193801de6de503f5f', sandbox: true, email: formData.email, phone: formData.phone, name: formData.customerName });
      } else { setError('Widget indisponible. Rechargez la page.'); setIsSubmitting(false); }
    } else {
      try {
        const res = await axios.post(`${API_URL}/orders`, { ...formData, items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity || 1 })), total });
        setOrderNumber(res.data.orderNumber || 'CMD-' + Date.now());
        setOrderComplete(true); clearCart();
      } catch { setError('Erreur lors de la commande.'); }
      finally { setIsSubmitting(false); }
    }
  };

  if (orderComplete) return (
    <>
      <Helmet><title>Commande confirmée - AFI Collection</title></Helmet>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white dark:bg-afi-dark-card rounded-2xl shadow-xl p-8 text-center border border-afi-green max-w-md w-full">
          <div className="w-16 h-16 bg-afi-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-afi-green" />
          </div>
          <h1 className="font-serif text-xl font-bold mb-2">Commande confirmée !</h1>
          <p className="text-gray-500 text-sm mb-3">Merci pour votre commande.</p>
          <p className="text-xs text-gray-400 mb-6">Réf : <span className="font-mono font-bold text-afi-green">{orderNumber}</span></p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/')} className="bg-afi-green text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-afi-green-dark transition-all">Accueil</button>
            <button onClick={() => navigate('/afisac')} className="border border-afi-green text-afi-green px-5 py-2 rounded-lg text-sm font-semibold hover:bg-afi-green hover:text-white transition-all">Continuer</button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Helmet><title>Validation de commande - AFI Collection</title></Helmet>
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Titre */}
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-bold">Validation de commande</h1>
          <p className="text-gray-500 text-sm mt-1">Complétez vos informations pour finaliser votre achat</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Formulaire — 3 colonnes */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-afi-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">

              {/* Section infos */}
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} /> Informations client
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-3">
                {error && <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">{error}</div>}

                {/* Nom */}
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Nom complet *</label>
                  <input type="text" name="customerName" required
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800 focus:outline-none focus:border-afi-green transition-colors"
                    value={formData.customerName} onChange={handleChange} placeholder="Jean Dupont" />
                </div>

                {/* Email + Téléphone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1"><FontAwesomeIcon icon={faEnvelope} className="mr-1" />Email *</label>
                    <input type="email" name="email" required
                      className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800 focus:outline-none focus:border-afi-green transition-colors"
                      value={formData.email} onChange={handleChange} placeholder="email@exemple.com" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1"><FontAwesomeIcon icon={faPhone} className="mr-1" />Téléphone *</label>
                    <input type="tel" name="phone" required
                      className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800 focus:outline-none focus:border-afi-green transition-colors"
                      value={formData.phone} onChange={handleChange} placeholder="229 XX XX XX XX" />
                  </div>
                </div>

                {/* Adresse */}
                <div>
                  <label className="text-xs text-gray-500 block mb-1"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />Adresse de livraison *</label>
                  <input type="text" name="address" required
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800 focus:outline-none focus:border-afi-green transition-colors"
                    value={formData.address} onChange={handleChange} placeholder="Quartier, Ville" />
                </div>

                {/* Paiement */}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <FontAwesomeIcon icon={faCreditCard} /> Moyen de paiement
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {['MTN Mobile Money', 'Moov Money', 'Paiement à la livraison'].map(method => (
                      <label key={method} className={`cursor-pointer border rounded-lg p-2 text-center text-xs transition-all ${formData.paymentMethod === method ? 'border-afi-green bg-afi-green/5 text-afi-green font-semibold' : 'border-gray-200 dark:border-gray-600 text-gray-500 hover:border-afi-green/50'}`}>
                        <input type="radio" name="paymentMethod" value={method} className="hidden" checked={formData.paymentMethod === method} onChange={handleChange} />
                        {method === 'MTN Mobile Money' && <div>📱 MTN<br/>Mobile Money</div>}
                        {method === 'Moov Money' && <div>📲 Moov<br/>Money</div>}
                        {method === 'Paiement à la livraison' && <div>🚚 À la<br/>livraison</div>}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Notes (optionnel)</label>
                  <textarea name="notes" rows="2"
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800 focus:outline-none focus:border-afi-green transition-colors resize-none"
                    value={formData.notes} onChange={handleChange} placeholder="Instructions particulières..." />
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-afi-green text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-afi-green-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2">
                  {isSubmitting ? 'Traitement...' : formData.paymentMethod === 'Paiement à la livraison' ? '✓ Confirmer la commande' : '💳 Payer via Mobile Money'}
                </button>
              </form>
            </div>
          </div>

          {/* Résumé — 2 colonnes */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-afi-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <FontAwesomeIcon icon={faShoppingBag} /> Votre panier ({items.length})
                </p>
              </div>
              <div className="p-5">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">x{item.quantity || 1}</p>
                      </div>
                      <p className="text-sm font-bold text-afi-green whitespace-nowrap">{((item.price || 0) * (item.quantity || 1)).toLocaleString('fr-FR')} F</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Sous-total</span>
                    <span className="text-sm">{total.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-500">Livraison</span>
                    <span className="text-sm text-afi-green font-semibold">Offerte</span>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-afi-green text-lg">{total.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                  <FontAwesomeIcon icon={faTruck} />
                  <span>Livraison gratuite partout au Bénin</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Checkout;
