import { Link, useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmationPage = () => {
  const { id } = useParams<{ id: string }>();
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">
            Your order has been placed successfully.
          </p>
        </div>

        <div className="border-t border-b py-4 my-6">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div>
              <h2 className="font-medium text-gray-700">Order Number</h2>
              <p className="text-lg font-bold">{id}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <h2 className="font-medium text-gray-700">Order Date</h2>
              <p>{orderDate}</p>
            </div>
          </div>

          <div>
            <h2 className="font-medium text-gray-700 mb-2">Shipping Information</h2>
            <p>John Doe</p>
            <p>123 Main Street</p>
            <p>Boston, MA 02108</p>
            <p>United States</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-medium text-gray-700 mb-4">Estimated Delivery</h2>
          <div className="relative">
            <div className="flex items-center mb-2">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                1
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Order Placed</h3>
                <p className="text-sm text-gray-500">{orderDate}</p>
              </div>
            </div>
            <div className="absolute h-full w-0.5 bg-gray-200 left-4 top-0 z-0 ml-[3px]"></div>
            
            <div className="flex items-center mb-2 relative z-10">
              <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">
                2
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Processing</h3>
                <p className="text-sm text-gray-500">Your order is being processed</p>
              </div>
            </div>
            
            <div className="flex items-center mb-2 relative z-10">
              <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">
                3
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Shipped</h3>
                <p className="text-sm text-gray-500">Estimated ship date: {new Date(Date.now() + 2*24*60*60*1000).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center relative z-10">
              <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">
                4
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Delivered</h3>
                <p className="text-sm text-gray-500">Estimated delivery: {new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            A confirmation email has been sent to your email address.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/orders"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View Order Details
            </Link>
            <Link
              to="/"
              className="bg-white text-gray-800 border border-gray-300 py-2 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;