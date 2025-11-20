import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';

interface User {
  id: string;
  email: string;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  signup: (email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Simulate checking local storage or session
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay
    
    const mockUser = {
      id: 'user_123',
      email,
      credits: 50 // Default credits
    };
    
    setUser(mockUser);
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    setIsLoading(false);
    setLocation('/dashboard');
  };

  const signup = async (email: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay
    
    const mockUser = {
      id: 'user_123',
      email,
      credits: 100 // Sign up bonus
    };
    
    setUser(mockUser);
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    setIsLoading(false);
    setLocation('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mock_user');
    setLocation('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
