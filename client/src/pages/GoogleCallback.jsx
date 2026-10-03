import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      
      authAPI.getMe()
        .then(response => {
          const data = response.data;
          login(token, data);
          
          if (data.role === 'ADMIN') {
            navigate('/admin', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          navigate('/', { replace: true });
        });
    } else {
      navigate('/premium-login', { replace: true });
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
