import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCreditCard, faMapMarkerAlt, faPhone, faEnvelope, faUser, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import API_URL from '../config/api';

function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'MTN Mobile Money',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      navigate('/');
    }
  }, [items, navigate, orderComplete]);

  // Écouter le succès KKiaPay
  useEffect(() => {
    const handleKkiapaySuccess = async (response) => {
      try {
        const transactionId = response.transactionId;
        const res = await axios.post(`${API_URL}/payment/verify`, { transactionId });
        if (res.data.success) {
          setOrderNumber(transactionId);
          setOrderComplete(true);
          clearCart();
        } else {
          setError('Paiement non confirmé. Contactez le support.');
        }
      } catch (err) {
        setError('Erreur lors de la vérification du paiement.');
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleKkiapayFailed = () => {
      setError('Paiement échoué. Veuillez réessayer.');
      setIsSubmitting(false);
    };

    if (window.addSuccessListener) {
      window.addSuccessListener(handleKkiapaySuccess);
    }
    if (window.addFailedListener) {
      window.addFailedListener(handleKkiapayFailed);
    }

    return () => {
      if (window.removeSuccessListener) window.removeSuccessListener(handleKkiapaySuccess);
      if (window.removeFailedListener) window.removeFailedListener(handleKkiapayFailed);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const isMobileMoney = formData.paymentMethod === 'MTN Mobile Money' || formData.paymentMethod === 'Moov Money';

    if (isMobileMoney) {
      // Ouvrir le widget KKiaPay
      if (window.openKkiapayWidget) {
        window.openKkiapayWidget({
          amount: total,
          api_key: 'da52a61056cd11f193801de6de503f5f',
          sandbox: true,
          email: formData.email,
          phone: formData.phone,
          name: formData.customerName,
        });
      } else {
        setError('Widget de paiement non disponible. Rechargez la page.');
        setIsSubmitting(false);
      }
    } else {
      // Paiement à la livraison - commande directe
      try {
        const orderData = {
          ...formData,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1
          })),
          total
        };
        const res = await axios.post(`${API_URL}/orders`, orderData);
        setOrderNumber(res.data.orderNumber || 'CMD-' + Date.now());
        setOrderComplete(true);
        clearCart();
      } catch (err) {
        setError('Erreur lors de la commande. Veuillez réessayer.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (orderComplete) {
    return (
      <>
        <Helmet><title>Commande confirmée - AFI Collection</title></Helmet>
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white dark:bg-afi-dark-card rounded-2xl shadow-xl p-8 text-center border-2 border-afi-green">
            <div className="w-20 h-20 bg-afi-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faCheckCircle} className="text-5xl text-afi-green" />
            </div>
            <h1 className="font-serif text-2xl font-bold mb-2">Commande confirmée !</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Merci pour votre commande. Un email de confirmation vous sera envoyé.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Référence : <span className="font-mono font-bold text-afi-green">{orderNumber}</span>
            </p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => navigate('/')} className="bg-afi-green text-white px-6 py-2 rounded-lg font-semibold hover:bg-afi-green-dark transition-all">
                Retour à l'accueil
              </button>
              <button onClick={() => navigate('/afisac')} className="border-2 border-afi-green text-afi-green px-6 py-2 rounded-lg font-semibold hover:bg-afi-green hover:text-white transition-all">
                Continuer mes achats
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Validation de commande - AFI Collection</title></Helmet>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-afi-dark-card rounded-2xl shadow-lg overflow-hidden border-2 border-afi-green">
              <div className="bg-afi-green px-6 py-4">
                <h1 className="font-serif text-xl font-bold text-white">Validation de commande</h1>
                <p className="text-white/80 text-sm">Complétez vos informations pour finaliser</p>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <div>
                  <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-1 flex items-center gap-2">
                    <FontAwesomeIcon icon={faUser} /> NOM COMPLET *
                  </label>
                  <input type="text" name="customerName" required className="w-full p-3 border rounded-lg dark:bg-gray-700" value={formData.customerName} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-1 flex items-center gap-2">
                      <FontAwesomeIcon icon={faEnvelope} /> EMAIL *
                    </label>
                    <input type="email" name="email" required className="w-full p-3 border rounded-lg dark:bg-gray-700" value={formData.email} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-1 flex items-center gap-2">
                      <FontAwesomeIcon icon={faPhone} /> TÉLÉPHONE *
                    </label>
                    <input type="tel" name="phone" required className="w-full p-3 border rounded-lg dark:bg-gray-700" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-1 flex items-center gap-2">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> ADRESSE DE LIVRAISON *
                  </label>
                  <input type="text" name="address" required className="w-full p-3 border rounded-lg dark:bg-gray-700" value={formData.address} onChange={handleChange} />
                </div>
                <div>
                  <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-1 flex items-center gap-2">
                    <FontAwesomeIcon icon={faCreditCard} /> MOYEN DE PAIEMENT
                  </label>
                  <select name="paymentMethod" className="w-full p-3 border rounded-lg dark:bg-gray-700" value={formData.paymentMethod} onChange={handleChange}>
                    <option>MTN Mobile Money</option>
                    <option>Moov Money</option>
                    <option>Paiement à la livraison</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[9px] text-afi-green tracking-wider block mb-1">NOTES (optionnel)</label>
                  <textarea name="notes" rows="3" className="w-full p-3 border rounded-lg dark:bg-gray-700" value={formData.notes} onChange={handleChange} />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-afi-green text-white py-3 rounded-lg font-semibold hover:bg-afi-green-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                  {isSubmitting ? 'Traitement en cours...' : (
                    formData.paymentMethod === 'Paiement à la livraison'
                      ? 'Confirmer ma commande'
                      : 'Payer via Mobile Money'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Résumé */}
          <div>
            <div className="bg-white dark:bg-afi-dark-card rounded-2xl shadow-lg overflow-hidden border-2 border-afi-green sticky top-24">
              <div className="bg-afi-green px-6 py-4">
                <h2 className="font-serif text-xl font-bold text-white">Résumé</h2>
                <p className="text-white/80 text-sm">Votre panier</p>
              </div>
              <div className="p-6">
                <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center pb-3 border-b">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantité: {item.quantity || 1}</p>
                      </div>
                      <p className="font-mono text-afi-green font-bold">{((item.price || 0) * (item.quantity || 1)).toLocaleString('fr-FR')} FCFA</p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-serif text-lg font-bold">
                    <span>Total</span>
                    <span className="text-afi-green">{total.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex items-center gap-2 text-sm text-gray-500">
                  <FontAwesomeIcon icon={faTruck} />
                  <span>Livraison offerte</span>
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
