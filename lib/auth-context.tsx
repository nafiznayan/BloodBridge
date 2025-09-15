'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Donor } from '@/lib/types';

interface AuthContextType {
  donor: Donor | null;
  isLoading: boolean;
  login: (token: string, donorData: Donor) => void;
  logout: () => void;
  updateDonor: (donorData: Donor) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [donor, setDonor] = useState<Donor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Verify token with backend
      const response = await fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDonor(data.donor);
      } else {
        // Token is invalid, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('donor');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('donor');
    } finally {
      setIsLoading(false);
    }
  };

  const login = (token: string, donorData: Donor) => {
    localStorage.setItem('token', token);
    localStorage.setItem('donor', JSON.stringify(donorData));
    setDonor(donorData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('donor');
    setDonor(null);
  };

  const updateDonor = (donorData: Donor) => {
    localStorage.setItem('donor', JSON.stringify(donorData));
    setDonor(donorData);
  };

  return (
    <AuthContext.Provider value={{ donor, isLoading, login, logout, updateDonor }}>
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