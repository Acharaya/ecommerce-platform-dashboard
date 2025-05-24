import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllOrders } from '../../data/orders';
import { products } from '../../data/products';
import AdminLayout from './components/AdminLayout';
import { ShoppingBag, Users, Package, DollarSign, TrendingUp, Calendar, CreditCard, BarChart2 } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const orders = getAllOrders();
  
  // Calculate statistics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock < 5).length;
  
  // Chart data for last 7 days (mock data)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  });
  
  const salesData = [1200, 1400, 1000, 1800, 1600, 2000, 2200];
  const maxSale = Math.max(...salesData);

  // Recent orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
              <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500 font-medium">+12.5% from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500 font-medium">+8.2% from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-teal-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Products</h3>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-amber-600 font-medium">{lowStockProducts} products low in stock</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Customers</h3>
              <p className="text-2xl font-bold">126</p>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500 font-medium">+5.4% from last month</span>
          </div>
        </div>
      </div>
      
      {/* Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Revenue (Last 7 Days)</h2>
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              This Week
            </div>
          </div>
          
          <div className="h-64 flex items-end space-x-2">
            {salesData.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-all duration-200"
                  style={{ height: `${(value / maxSale) * 100}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{last7Days[index]}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link to="/admin/orders" className="text-blue-600 text-sm hover:text-blue-800">
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="font-medium">Payment Methods</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Credit Card</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">PayPal</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Other</span>
                <span className="text-sm font-medium">10%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <BarChart2 className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="font-medium">Top Categories</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Electronics</span>
                <span className="text-sm font-medium">42%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Audio</span>
                <span className="text-sm font-medium">28%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Wearables</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Package className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="font-medium">Order Status</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Delivered</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Shipped</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Processing</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;