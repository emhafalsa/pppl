import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { userApi } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (userData: { name: string; email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await userApi.login({ email, password });
      
      if (response.success && response.user) {
        setUser({
          id: response.user.id.toString(),
          name: response.user.name,
          email: response.user.email,
          role: response.user.role,
          enrolledCourses: response.user.role === 'student' ? ['1', '2'] : undefined
        });
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    
    setIsLoading(false);
    return false;
  };

  const signUp = async (userData: { name: string; email: string; password: string }): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await userApi.signUp(userData);
      
      if (response.success && response.user) {
        setUser({
          id: response.user.id.toString(),
          name: response.user.name,
          email: response.user.email,
          role: response.user.role || 'student',
          enrolledCourses: response.user.role === 'student' ? [] : undefined
        });
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Sign up error:', error);
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    signUp,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};