import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, Package, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  setCartOpen: (open: boolean) => void;
}

const Navbar = ({ setCartOpen }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
            <ShoppingBag className="mr-2" />
            ShopWave
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 transition-colors">
                Categories
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/?category=Electronics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Electronics
                </Link>
                <Link to="/?category=Wearables" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Wearables
                </Link>
                <Link to="/?category=Audio" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Audio
                </Link>
                <Link to="/?category=Gaming" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Gaming
                </Link>
              </div>
            </div>
            <Link to="/orders" className="text-gray-700 hover:text-blue-600 transition-colors">
              Orders
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                  <User className="h-6 w-6" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                    {user?.name}
                  </div>
                  
                  {isAdmin() && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <Link to="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Package className="h-4 w-4 mr-2" />
                    My Orders
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                <User className="h-6 w-6" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                Home
              </Link>
              <details className="group">
                <summary className="text-gray-700 hover:text-blue-600 transition-colors py-2 cursor-pointer">
                  Categories
                </summary>
                <div className="mt-2 pl-4 flex flex-col space-y-2">
                  <Link to="/?category=Electronics" className="text-gray-700 hover:text-blue-600 transition-colors py-1">
                    Electronics
                  </Link>
                  <Link to="/?category=Wearables" className="text-gray-700 hover:text-blue-600 transition-colors py-1">
                    Wearables
                  </Link>
                  <Link to="/?category=Audio" className="text-gray-700 hover:text-blue-600 transition-colors py-1">
                    Audio
                  </Link>
                  <Link to="/?category=Gaming" className="text-gray-700 hover:text-blue-600 transition-colors py-1">
                    Gaming
                  </Link>
                </div>
              </details>
              <Link to="/orders" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                Orders
              </Link>
              
              {isAuthenticated ? (
                <>
                  {isAdmin() && (
                    <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-600 hover:text-red-800 transition-colors py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                  Login / Register
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;