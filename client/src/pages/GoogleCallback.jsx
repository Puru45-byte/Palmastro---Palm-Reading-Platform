import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Store the token
      localStorage.setItem('token', token);
      
      // Get user info and login properly
      fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        // Use the login method to properly set user state
        login(token, data);
        
        // Check if user is admin and redirect accordingly
        if (data.role === 'ADMIN') {
          console.log('Admin user detected, navigating to admin dashboard...');
          navigate('/admin');
        } else {
          console.log('Regular user detected, navigating to home...');
          navigate('/');
        }
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        navigate('/premium-login');
      });
    } else {
      // No token, redirect to login
      navigate('/premium-login');
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#D4AF37' }}></div>
        <p className="text-lg font-semibold" style={{ color: '#2D1B69', fontFamily: 'Inter, sans-serif' }}>Completing authentication...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
