import React from 'react';
import { useCart } from '../context/CartContext';

function CartPanel() {
  const { items, total, isOpen, toggleCart, removeItem, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={toggleCart}></div>
      <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-afi-ink border-l-4 border-afi-green z-50 shadow-xl transition-transform duration-300">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-serif text-xl font-bold text-gray-800 dark:text-white">Mon Panier</h2>
            <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl">&times;</button>
          </div>
          
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-500 dark:text-gray-400 font-serif">Votre panier est vide</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-afi-ink/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-serif font-semibold text-gray-800 dark:text-white">{item.name}</p>
                      <p className="font-mono text-afi-green text-sm">{item.price.toLocaleString('fr-FR')} FCFA</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} 
                          className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:border-afi-green"
                        >
                          -
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity || 1}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} 
                          className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:border-afi-green"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between font-serif text-lg font-bold mb-4">
                  <span>Total</span>
                  <span className="text-afi-green">{total.toLocaleString('fr-FR')} FCFA</span>
                </div>
                <button className="w-full bg-afi-green text-white py-3 font-serif font-semibold hover:bg-afi-greenDark transition-colors rounded-lg mb-2">
                  Commander via WhatsApp
                </button>
                <button className="w-full border-2 border-afi-green text-afi-green py-3 font-serif font-semibold hover:bg-afi-green hover:text-white transition-colors rounded-lg">
                  Formulaire de commande
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPanel;
