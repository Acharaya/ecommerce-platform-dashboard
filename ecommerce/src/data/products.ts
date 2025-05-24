import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear audio with our premium wireless headphones. Features noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    price: 299.99,
    category: 'Electronics',
    imageUrl: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 15,
    rating: 4.8,
    reviews: [
      {
        id: 'r1',
        userId: '101',
        userName: 'AudioPhile',
        rating: 5,
        comment: 'Best headphones I\'ve ever owned. Sound quality is impeccable.',
        date: '2023-05-15'
      },
      {
        id: 'r2',
        userId: '102',
        userName: 'MusicLover',
        rating: 4,
        comment: 'Great sound, but the ear cups could be a bit more comfortable for extended use.',
        date: '2023-06-20'
      }
    ]
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness goals with our advanced smart watch. Features heart rate monitoring, sleep tracking, and 50+ workout modes.',
    price: 199.99,
    category: 'Wearables',
    imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 22,
    rating: 4.5
  },
  {
    id: '3',
    name: 'Ultra HD 4K Monitor',
    description: 'Elevate your viewing experience with our 27-inch 4K monitor. Perfect for gaming, design work, and media consumption.',
    price: 349.99,
    category: 'Electronics',
    imageUrl: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 8,
    rating: 4.7
  },
  {
    id: '4',
    name: 'Professional DSLR Camera',
    description: 'Capture stunning photos and videos with our professional-grade DSLR camera. Includes 24.1MP sensor and 4K video recording.',
    price: 1299.99,
    category: 'Photography',
    imageUrl: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 5,
    rating: 4.9
  },
  {
    id: '5',
    name: 'Ergonomic Office Chair',
    description: 'Work in comfort with our ergonomic office chair. Features adjustable height, lumbar support, and breathable mesh back.',
    price: 249.99,
    category: 'Furniture',
    imageUrl: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 12,
    rating: 4.6
  },
  {
    id: '6',
    name: 'Portable Bluetooth Speaker',
    description: 'Take your music anywhere with our waterproof, portable Bluetooth speaker. Offers 20 hours of playback and rich bass.',
    price: 89.99,
    category: 'Audio',
    imageUrl: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 30,
    rating: 4.3
  },
  {
    id: '7',
    name: 'Mechanical Gaming Keyboard',
    description: 'Dominate your games with our responsive mechanical keyboard. Features RGB lighting, programmable keys, and durable construction.',
    price: 129.99,
    category: 'Gaming',
    imageUrl: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 18,
    rating: 4.7
  },
  {
    id: '8',
    name: 'Wireless Charging Pad',
    description: 'Charge your devices without the clutter of cables. Compatible with all Qi-enabled smartphones and accessories.',
    price: 39.99,
    category: 'Accessories',
    imageUrl: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 25,
    rating: 4.4
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
}