import { Order } from '../types';

export const orders: Order[] = [
  {
    id: 'ORD-1001',
    userId: '2',
    items: [
      {
        productId: '1',
        productName: 'Premium Wireless Headphones',
        price: 299.99,
        quantity: 1,
        imageUrl: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        productId: '6',
        productName: 'Portable Bluetooth Speaker',
        price: 89.99,
        quantity: 2,
        imageUrl: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ],
    total: 479.97,
    status: 'delivered',
    createdAt: '2023-08-12T10:30:00Z',
    shippingAddress: {
      fullName: 'Regular User',
      streetAddress: '123 Main St',
      city: 'Boston',
      state: 'MA',
      postalCode: '02108',
      country: 'USA'
    }
  },
  {
    id: 'ORD-1002',
    userId: '2',
    items: [
      {
        productId: '3',
        productName: 'Ultra HD 4K Monitor',
        price: 349.99,
        quantity: 1,
        imageUrl: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ],
    total: 349.99,
    status: 'shipped',
    createdAt: '2023-09-03T14:15:00Z',
    shippingAddress: {
      fullName: 'Regular User',
      streetAddress: '123 Main St',
      city: 'Boston',
      state: 'MA',
      postalCode: '02108',
      country: 'USA'
    }
  },
  {
    id: 'ORD-1003',
    userId: '2',
    items: [
      {
        productId: '5',
        productName: 'Ergonomic Office Chair',
        price: 249.99,
        quantity: 1,
        imageUrl: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        productId: '8',
        productName: 'Wireless Charging Pad',
        price: 39.99,
        quantity: 1,
        imageUrl: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ],
    total: 289.98,
    status: 'processing',
    createdAt: '2023-09-20T09:45:00Z',
    shippingAddress: {
      fullName: 'Regular User',
      streetAddress: '123 Main St',
      city: 'Boston',
      state: 'MA',
      postalCode: '02108',
      country: 'USA'
    }
  }
];

export function getOrdersByUserId(userId: string): Order[] {
  return orders.filter(order => order.userId === userId);
}

export function getOrderById(id: string): Order | undefined {
  return orders.find(order => order.id === id);
}

export function getAllOrders(): Order[] {
  return orders;
}