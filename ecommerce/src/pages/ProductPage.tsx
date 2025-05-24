import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../data/products';
import { ShoppingCart, Heart, Share2, Star, ChevronLeft, Check, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = id ? getProductById(id) : null;
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg">
          Return to Home
        </Link>
      </div>
    );
  }

  // Get similar products
  const similarProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    
    // Reset notification after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/?category=${product.category}`} className="hover:text-blue-600">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>
      </div>

      {/* Back Button - Mobile Only */}
      <button 
        onClick={() => navigate(-1)}
        className="md:hidden flex items-center text-gray-600 mb-4"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back
      </button>

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="p-6 flex items-center justify-center bg-gray-50">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="max-h-[400px] object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="p-6 md:p-8 flex flex-col">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              {product.rating && (
                <div className="flex items-center">
                  <div className="flex items-center text-amber-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 font-medium">{product.rating}</span>
                  </div>
                  {product.reviews && (
                    <span className="ml-2 text-gray-500">
                      ({product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'})
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <p className="text-gray-700 mb-6">
              {product.description}
            </p>
            
            <div className="text-3xl font-bold text-gray-900 mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <span className={`mr-2 ${
                  product.stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.stock > 0 ? (
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-1" />
                      In Stock
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-1" />
                      Out of Stock
                    </div>
                  )}
                </span>
                
                {product.stock > 0 && product.stock < 5 && (
                  <span className="text-amber-600 text-sm">
                    Only {product.stock} left!
                  </span>
                )}
              </div>
            </div>
            
            {product.stock > 0 && (
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button 
                    onClick={decreaseQuantity}
                    className="bg-gray-200 text-gray-700 h-10 w-10 flex items-center justify-center rounded-l-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                    min="1"
                    max={product.stock}
                    className="h-10 w-16 border-y border-gray-300 text-center"
                  />
                  <button 
                    onClick={increaseQuantity}
                    className="bg-gray-200 text-gray-700 h-10 w-10 flex items-center justify-center rounded-r-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg text-white font-medium ${
                  product.stock === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors`}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              
              <button className="flex-1 sm:flex-none flex items-center justify-center py-3 px-6 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </button>
            </div>
            
            {addedToCart && (
              <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center">
                <Check className="h-5 w-5 mr-2" />
                Added to cart!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button className="px-6 py-3 border-b-2 border-blue-600 text-blue-600 font-medium">
              Description
            </button>
            <button className="px-6 py-3 text-gray-500 font-medium">
              Specifications
            </button>
            <button className="px-6 py-3 text-gray-500 font-medium">
              Reviews
            </button>
          </div>
        </div>
        
        <div className="py-6">
          <h3 className="text-lg font-semibold mb-4">Product Description</h3>
          <div className="prose text-gray-700">
            <p>{product.description}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
            <p>Key Features:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Premium quality materials</li>
              <li>Durable construction</li>
              <li>Advanced technology</li>
              <li>User-friendly design</li>
              <li>Energy efficient</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;