import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    if (email === 'admin@example.com' && password === 'password') {
      const adminUser = {
        id: '1',
        name: 'Admin User',
        email,
        role: 'admin',
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(adminUser));
    } else if (email === 'user@example.com' && password === 'password') {
      const regularUser = {
        id: '2',
        name: 'Regular User',
        email,
        role: 'customer',
      };
      setUser(regularUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(regularUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would be an API call
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      role: 'customer',
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      register, 
      logout,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}