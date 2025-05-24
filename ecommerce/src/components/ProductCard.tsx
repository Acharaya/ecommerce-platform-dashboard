import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link 
      to={`/products/${product.id}`} 
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.stock < 5 && product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
            Only {product.stock} left
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center mb-3">
          {product.rating && (
            <>
              <div className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 text-sm font-medium">{product.rating}</span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
            </>
          )}
          <span className="text-sm text-gray-500">
            {product.category}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`rounded-full p-2 ${
              product.stock === 0 
                ? 'bg-gray-200 cursor-not-allowed' 
                : 'bg-blue-100 hover:bg-blue-600 hover:text-white'
            } transition-colors duration-300`}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;