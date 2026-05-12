import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.8'%3E%3Cpath d='M30 30l-3-3 3-3 3 3-3 3zm0-12l-2-2 2-2 2 2-2 2zm0 24l-2-2 2-2 2 2-2 2zm-12-12l-2-2 2-2 2 2-2 2zm24 0l-2-2 2-2 2 2-2 2zm-18-6l-2-2 2-2 2 2-2 2zm12 12l-2-2 2-2 2 2-2 2zm-18-6l-2-2 2-2 2 2-2 2zm12 0l-2-2 2-2 2 2-2 2z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 flex">
        {/* Left Navigation Bar */}
        <div className="w-64 min-h-screen shadow-2xl" style={{ 
          background: 'linear-gradient(135deg, #1a0f3d 0%, #2D1B69 50%, #4A3B8A 100%)',
          borderRight: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          <div className="p-6">
            {/* Admin Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 22 L20 30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M15 26 L25 26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="20" cy="12" r="6" stroke="white" strokeWidth="2" fill="none"/>
                  <path d="M12 35 Q20 30 28 35" stroke="white" strokeWidth="1.5" fill="none" opacity="0.8"/>
                </svg>
              </div>
              <h3 
                className="text-xl font-bold mb-2"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  color: '#FFFFFF',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Admin Panel
              </h3>
              <p 
                className="text-sm font-medium"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#F8F9FA',
                  opacity: 0.9
                }}
              >
                {user?.email || 'admin@palmastro.com'}
              </p>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              <Link
                to="/admin"
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 transform ${
                  isActive('/admin') 
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 shadow-lg scale-105' 
                    : 'text-gray-100 hover:bg-white hover:bg-opacity-15 hover:scale-102'
                }`}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}
              >
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="truncate">Admin Panel</span>
              </Link>
              
              <Link
                to="/admin/dashboard"
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 transform ${
                  isActive('/admin/dashboard') 
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 shadow-lg scale-105' 
                    : 'text-gray-100 hover:bg-white hover:bg-opacity-15 hover:scale-102'
                }`}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}
              >
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="truncate">Pending Requests</span>
              </Link>
              
              <button
                onClick={() => navigate('/')}
                className="flex items-center px-4 py-3 rounded-xl text-gray-100 hover:bg-white hover:bg-opacity-15 transition-all duration-200 transform hover:scale-102 w-full text-left"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}
              >
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="truncate">Visit Main Site</span>
              </button>

              {/* Divider */}
              <div className="border-t border-gray-600 border-opacity-30 my-4"></div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 rounded-xl text-red-300 hover:bg-red-500 hover:bg-opacity-20 transition-all duration-200 transform hover:scale-102 w-full text-left"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}
              >
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="truncate">Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
