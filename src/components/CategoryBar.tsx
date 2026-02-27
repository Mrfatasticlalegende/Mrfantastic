import { useStore } from '../context/StoreContext';
import { cn } from '../lib/utils';

export default function CategoryBar() {
  const { categories, selectedCategory, setSelectedCategory } = useStore();

  return (
    <div className="bg-white shadow-sm sticky top-20 z-30">
      <div className="max-w-7xl mx-auto px-4 py-2 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-2 rounded-xl transition-all min-w-[80px]",
                selectedCategory === cat.id 
                  ? "bg-orange-50 text-orange-700" 
                  : "hover:bg-gray-50 text-gray-600"
              )}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-100">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-medium text-center max-w-[80px] leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
