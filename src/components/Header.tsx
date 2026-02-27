import { Search, ShoppingCart, MapPin, User, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { location, setIsLocationModalOpen, cart, setIsCartOpen } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo & Location */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl shadow-[0_4px_0_rgb(153,27,27)] transform group-hover:-translate-y-1 transition-transform duration-200 flex items-center justify-center border-2 border-orange-300">
               <span className="text-white font-black text-2xl italic drop-shadow-md">F</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 tracking-tighter filter drop-shadow-sm" style={{ textShadow: '1px 1px 0px rgba(255,200,200,0.5)' }}>
                Fantastic
              </h1>
              <span className="text-[10px] font-extrabold text-orange-400 tracking-[0.3em] uppercase ml-0.5">SHOPPING</span>
            </div>
          </div>
          
          <div 
            className="hidden md:flex flex-col cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            onClick={() => setIsLocationModalOpen(true)}
          >
            <span className="text-xs font-bold text-gray-900">Delivery in 8 minutes</span>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <span className="truncate max-w-[150px]">{location || 'Select Location'}</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-600" />
            <input 
              type="text"
              placeholder="Search 'milk'"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold transition-colors shadow-sm hover:shadow-md"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 ? (
              <div className="flex flex-col items-start leading-none">
                <span className="text-xs">{cartCount} items</span>
                <span className="text-sm">₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
              </div>
            ) : (
              <span>My Cart</span>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Search (visible only on mobile) */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search for products..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-4 outline-none focus:border-orange-500 text-sm"
          />
        </div>
      </div>
    </header>
  );
}
