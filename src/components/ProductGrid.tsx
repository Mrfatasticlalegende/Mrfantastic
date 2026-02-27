import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const { products, selectedCategory, isLoading } = useStore();

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory)
    : products;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {selectedCategory ? 'Products' : 'All Products'}
      </h2>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
