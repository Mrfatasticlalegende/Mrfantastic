import { useStore, Product } from '../context/StoreContext';
import { Clock, Plus, Minus } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, removeFromCart, cart, updateQuantity } = useStore();
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-3 flex flex-col h-full group relative">
      <div className="relative aspect-square mb-3 bg-gray-50 rounded-lg overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-1 left-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm">
          <Clock className="w-3 h-3 text-orange-600" />
          {product.deliveryTime}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-3">{product.weight}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>

          {quantity === 0 ? (
            <button 
              onClick={() => addToCart(product)}
              className="bg-white border border-orange-600 text-orange-600 hover:bg-orange-50 px-4 py-1.5 rounded-lg text-sm font-bold uppercase transition-colors"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center bg-orange-600 text-white rounded-lg overflow-hidden shadow-sm">
              <button 
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="p-1.5 hover:bg-orange-700 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-2 text-sm font-bold min-w-[20px] text-center">{quantity}</span>
              <button 
                onClick={() => addToCart(product)}
                className="p-1.5 hover:bg-orange-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
