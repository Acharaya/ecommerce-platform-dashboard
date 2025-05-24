import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, searchProducts, getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Filter, X } from 'lucide-react';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFilter ? [categoryFilter] : []
  );

  // Get unique categories
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  useEffect(() => {
    let result = products;

    // Apply search query if present
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    // Apply category filter if present
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    } else if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }

    // Apply price filter
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(result);
  }, [searchQuery, categoryFilter, selectedCategories, priceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1500]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        {/* Filter Sidebar - Desktop */}
        <aside className="hidden md:block w-64 mr-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1500) && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear all
                </button>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">${priceRange[0]}</span>
                  <span className="text-sm text-gray-500">${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1500"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="1500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm text-gray-700"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
              <div className="bg-white w-80 h-full overflow-y-auto">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Price Range</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">${priceRange[0]}</span>
                        <span className="text-sm text-gray-500">${priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1500"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={() => setShowFilters(false)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg"
                    >
                      Apply Filters
                    </button>
                    
                    {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1500) && (
                      <button 
                        onClick={clearFilters}
                        className="w-full mt-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">
              {searchQuery 
                ? `Search results for "${searchQuery}"` 
                : categoryFilter 
                  ? `${categoryFilter} Products`
                  : 'All Products'}
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {/* Applied Filters (Mobile & Desktop) */}
          {(selectedCategories.length > 0 || searchQuery || categoryFilter) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategories.map(category => (
                <div key={category} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                  {category}
                  <button 
                    onClick={() => handleCategoryChange(category)}
                    className="ml-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {searchQuery && (
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                  Search: {searchQuery}
                </div>
              )}
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;