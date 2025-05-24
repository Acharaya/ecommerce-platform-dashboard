import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
    // Mock coupon validation
    if (couponCode.toLowerCase() === 'discount10') {
      setCouponError('Coupon applied successfully!');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
              <div className="col-span-6 font-medium">Product</div>
              <div className="col-span-2 font-medium text-center">Price</div>
              <div className="col-span-2 font-medium text-center">Quantity</div>
              <div className="col-span-2 font-medium text-right">Total</div>
            </div>
            
            {items.map((item) => (
              <div key={item.product.id} className="border-b last:border-b-0 p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product Info */}
                  <div className="md:col-span-6 flex items-center">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div>
                      <Link to={`/products/${item.product.id}`} className="font-medium text-gray-800 hover:text-blue-600">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:col-span-2 text-center">
                    <div className="md:hidden text-sm text-gray-500 mb-1">Price:</div>
                    ${item.product.price.toFixed(2)}
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:col-span-2 flex justify-center">
                    <div className="md:hidden text-sm text-gray-500 mb-1 mr-2">Quantity:</div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="bg-gray-100 text-gray-700 h-8 w-8 flex items-center justify-center rounded-l"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                        min="1"
                        max={item.product.stock}
                        className="h-8 w-12 border-y border-gray-200 text-center"
                      />
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="bg-gray-100 text-gray-700 h-8 w-8 flex items-center justify-center rounded-r"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total & Remove Button */}
                  <div className="md:col-span-2 flex items-center justify-between md:justify-end">
                    <div>
                      <div className="md:hidden text-sm text-gray-500 mb-1">Total:</div>
                      <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-6">
            <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Continue Shopping
            </Link>
            
            <button 
              onClick={clearCart}
              className="text-red-600 hover:text-red-800"
            >
              Clear Cart
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${(getCartTotal() * 0.07).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>${(getCartTotal() + getCartTotal() * 0.07).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                Apply Coupon Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="coupon"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 rounded-l-lg border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button 
                  onClick={handleApplyCoupon}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-lg hover:bg-gray-300 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p className={`text-sm mt-1 ${couponError.includes('Invalid') ? 'text-red-600' : 'text-green-600'}`}>
                  {couponError}
                </p>
              )}
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
            
            <div className="mt-4 text-sm text-gray-500 text-center">
              Secure checkout powered by Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;