import { useState } from 'react';
import { getAllOrders } from '../../data/orders';
import AdminLayout from './components/AdminLayout';
import { Search, Filter, ChevronDown, Eye, Clock, Truck, CheckCircle, XCircle, Download, Calendar } from 'lucide-react';
import { Order } from '../../types';

const AdminOrders = () => {
  const [orders] = useState(getAllOrders());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
  // Filter orders based on search, status, and date
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    // Date filtering
    let matchesDate = true;
    if (dateFilter === 'today') {
      const today = new Date();
      const orderDate = new Date(order.createdAt);
      matchesDate = 
        orderDate.getDate() === today.getDate() &&
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear();
    } else if (dateFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = new Date(order.createdAt) >= weekAgo;
    } else if (dateFilter === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      matchesDate = new Date(order.createdAt) >= monthAgo;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    // In a real app, this would update the order status via API
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-gray-600">Manage and track customer orders</p>
      </div>
      
      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Search order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>
      </div>
      
      {/* Order Cards */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600">No orders found matching your criteria.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Order Header */}
              <div 
                className="flex flex-col md:flex-row md:items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center mt-4 md:mt-0 justify-between md:justify-end w-full md:w-auto">
                  <div className="flex items-center mr-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="font-medium">${order.total.toFixed(2)}</span>
                    <ChevronDown className={`h-5 w-5 ml-2 text-gray-400 transform transition-transform ${
                      expandedOrderId === order.id ? 'rotate-180' : ''
                    }`} />
                  </div>
                </div>
              </div>
              
              {/* Order Details */}
              {expandedOrderId === order.id && (
                <div className="border-t border-gray-200 p-4">
                  {/* Order Items */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.productId} className="flex items-center">
                          <img 
                            src={item.imageUrl} 
                            alt={item.productName} 
                            className="w-12 h-12 object-cover rounded mr-4"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-gray-500">
                              ${item.price.toFixed(2)} x {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Customer Info & Shipping */}
                    <div>
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      {order.shippingAddress ? (
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{order.shippingAddress.fullName}</p>
                          <p>{order.shippingAddress.streetAddress}</p>
                          <p>
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                          </p>
                          <p>{order.shippingAddress.country}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No shipping address provided</p>
                      )}
                    </div>
                    
                    {/* Order Summary */}
                    <div>
                      <h4 className="font-medium mb-2">Order Summary</h4>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>${(order.total * 0.93).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax:</span>
                          <span>${(order.total * 0.07).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between font-medium text-gray-900 pt-2 border-t">
                          <span>Total:</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                      <span className="mr-2 text-sm font-medium">Status:</span>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className="border border-gray-300 rounded-lg px-3 py-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                        <Download className="h-4 w-4 mr-1" />
                        Invoice
                      </button>
                      <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </button>
                      <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                        <Truck className="h-4 w-4 mr-1" />
                        Ship Order
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;