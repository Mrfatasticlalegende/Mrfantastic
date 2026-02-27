import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, cartTotal } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="text-lg font-bold text-gray-900">My Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                    <p className="text-sm text-gray-500 mt-1">Add items to start shopping</p>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-orange-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{item.weight}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                        <div className="flex items-center bg-orange-600 text-white rounded-lg overflow-hidden shadow-sm h-8">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 hover:bg-orange-700 transition-colors h-full flex items-center"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold min-w-[20px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 hover:bg-orange-700 transition-colors h-full flex items-center"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Item Total</span>
                    <span className="font-medium">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Delivery Fee</span>
                    <span className="font-medium text-orange-600">Free</span>
                  </div>
                  <div className="border-t border-gray-100 my-2 pt-2 flex justify-between font-bold text-lg">
                    <span>Grand Total</span>
                    <span>₹{cartTotal}</span>
                  </div>
                </div>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-orange-200 transition-all flex items-center justify-between px-6">
                  <span>Proceed to Pay</span>
                  <span>₹{cartTotal}</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
