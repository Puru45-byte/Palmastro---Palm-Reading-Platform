import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true to check auth

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setLoading(false);
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      const token = response.data.token;
      const user = response.data.user;
      
      localStorage.setItem('token', token);
      setUser(user);
      setLoading(false);
      
      return { token, user };
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await authAPI.getMe();
        const userData = response.data;
        
        // Ensure user object has the correct structure
        const normalizedUser = {
          ...userData,
          name: userData.name || `${userData.firstName} ${userData.lastName}`.trim(),
          phone: userData.phone || null,
          dateOfBirth: userData.dateOfBirth || null
        };
        
        setUser(normalizedUser);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await fetchUserData();
        } catch (error) {
          console.error('Auth initialization failed:', error);
          setLoading(false);
        }
      } else {
        // No token, set loading to false
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  const value = {
    user,
    login,
    logout,
    register,
    loading,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
