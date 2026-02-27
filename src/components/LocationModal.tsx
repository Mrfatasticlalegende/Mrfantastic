import { useState, useEffect } from 'react';
import { MapPin, Navigation, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';

export default function LocationModal() {
  const { isLocationModalOpen, setIsLocationModalOpen, setLocation } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Mock reverse geocoding
        setTimeout(() => {
          setLocation("Indiranagar, Bangalore");
          setLoading(false);
          setIsLocationModalOpen(false);
        }, 1500);
      },
      (err) => {
        setError("Unable to retrieve your location");
        setLoading(false);
      }
    );
  };

  return (
    <AnimatePresence>
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Select Location</h2>
                <button 
                  onClick={() => setIsLocationModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={detectLocation}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-70 text-white py-3.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Navigation className="w-5 h-5" />
                      Detect My Location
                    </>
                  )}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500 uppercase font-bold text-xs tracking-wider">Or</span>
                  </div>
                </div>

                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Search delivery location"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg font-medium text-center">
                    {error}
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 text-center">
              <p className="text-xs text-gray-500">
                Serviceable in select locations only
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
