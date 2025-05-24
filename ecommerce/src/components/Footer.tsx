import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ShopWave</h3>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for premium electronics, accessories, and more.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-white transition-colors">Cart</Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-300 hover:text-white transition-colors">My Orders</Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/?category=Electronics" className="text-gray-300 hover:text-white transition-colors">Electronics</Link>
              </li>
              <li>
                <Link to="/?category=Wearables" className="text-gray-300 hover:text-white transition-colors">Wearables</Link>
              </li>
              <li>
                <Link to="/?category=Audio" className="text-gray-300 hover:text-white transition-colors">Audio</Link>
              </li>
              <li>
                <Link to="/?category=Gaming" className="text-gray-300 hover:text-white transition-colors">Gaming</Link>
              </li>
              <li>
                <Link to="/?category=Accessories" className="text-gray-300 hover:text-white transition-colors">Accessories</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-gray-400 mt-0.5" />
                <span className="text-gray-300">123 Commerce St, Tech City, TC 98765</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-300">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-300">support@shopwave.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} ShopWave. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Shipping Info</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;