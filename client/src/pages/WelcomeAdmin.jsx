import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/AdminLayout';

const WelcomeAdmin = () => {
  const { user } = useAuth();

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 
          className="text-2xl md:text-3xl font-bold mb-2"
          style={{ 
            fontFamily: 'Playfair Display, serif',
            color: '#2D1B69'
          }}
        >
          Admin Panel
        </h1>
        <p 
          className="text-base md:text-lg"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#6B5B95'
          }}
        >
          Welcome to the PalmAstro administration dashboard
        </p>
      </div>

      {/* Main Admin Card */}
      <div 
        className="w-full max-w-4xl rounded-2xl md:rounded-[30px]"
        style={{
          backgroundColor: '#FFFDF9',
          boxShadow: '0 20px 60px rgba(45, 27, 105, 0.15)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          overflow: 'hidden'
        }}
      >
        {/* Header Section */}
        <div className="text-center px-4 md:px-8 pt-8 md:pt-12 pb-6 md:pb-8">
          {/* Admin Icon */}
          <div className="relative inline-block mb-4 md:mb-6">
            <div className="absolute inset-0 border-2 border-yellow-600 rounded-full opacity-30"></div>
            <div className="absolute inset-3 border border-yellow-600 rounded-full opacity-20"></div>
            <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600">
              <svg className="w-14 h-14 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 45 L40 65" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M30 55 L50 55" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="40" cy="25" r="12" stroke="white" strokeWidth="3" fill="none"/>
                <path d="M25 70 Q40 60 55 70" stroke="white" strokeWidth="2" fill="none" opacity="0.8"/>
              </svg>
            </div>
            {/* Decorative stars */}
            <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-600 rounded-full opacity-60"></div>
            <div className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-yellow-600 rounded-full opacity-50"></div>
            <div className="absolute -bottom-2 -left-1 w-1 h-1 bg-yellow-600 rounded-full opacity-40"></div>
            <div className="absolute -bottom-1 right-2 w-1.5 h-1.5 bg-yellow-600 rounded-full opacity-55"></div>
          </div>

          {/* Title */}
          <h1 
            className="text-2xl md:text-4xl font-bold mb-3 md:mb-4"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              color: '#2D1B69',
              lineHeight: '1.2'
            }}
          >
            Welcome, Admin!
          </h1>

          {/* Subtitle */}
          <p 
            className="text-sm md:text-lg mb-4 md:mb-6 px-2"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#6B5B95',
              lineHeight: '1.6'
            }}
          >
            You have successfully logged in to the PalmAstro Admin Dashboard
          </p>

          {/* Admin Badge */}
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-6 md:mb-8"
            style={{
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              color: '#D4AF37',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            <span className="mr-2">👑</span>
            Administrator Access
          </div>
        </div>

        {/* Admin Info Section */}
        <div className="px-4 md:px-8 pb-8 md:pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* User Info Card */}
            <div 
              className="p-4 md:p-6 rounded-xl"
              style={{
                backgroundColor: 'rgba(45, 27, 105, 0.05)',
                border: '1px solid rgba(45, 27, 105, 0.1)'
              }}
            >
              <h3 
                className="text-xl font-semibold mb-4"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  color: '#2D1B69'
                }}
              >
                Your Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p 
                    className="text-sm font-medium"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B5B95'
                    }}
                  >
                    Name
                  </p>
                  <p 
                    className="text-lg"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#2D1B69'
                    }}
                  >
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
                <div>
                  <p 
                    className="text-sm font-medium"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B5B95'
                    }}
                  >
                    Email
                  </p>
                  <p 
                    className="text-lg"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#2D1B69'
                    }}
                  >
                    {user?.email}
                  </p>
                </div>
                <div>
                  <p 
                    className="text-sm font-medium"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B5B95'
                    }}
                  >
                    Role
                  </p>
                  <p 
                    className="text-lg font-semibold"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#D4AF37'
                    }}
                  >
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Admin Actions Card */}
            <div 
              className="p-4 md:p-6 rounded-xl"
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.1)'
              }}
            >
              <h3 
                className="text-xl font-semibold mb-4"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  color: '#2D1B69'
                }}
              >
                Admin Actions
              </h3>
              <div className="space-y-3">
                <a
                  href="/admin/dashboard"
                  className="block w-full px-4 py-3 rounded-xl font-medium transition-all transform hover:scale-105 text-center"
                  style={{
                    backgroundColor: '#2D1B69',
                    color: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    border: '1px solid #D4AF37',
                    textDecoration: 'none'
                  }}
                >
                  View Pending Requests
                </a>
                <button
                  className="w-full px-4 py-3 rounded-xl font-medium transition-all transform hover:scale-105"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#2D1B69',
                    fontFamily: 'Inter, sans-serif',
                    border: '1px solid #D4AF37'
                  }}
                >
                  Manage Users
                </button>
                <button
                  className="w-full px-4 py-3 rounded-xl font-medium transition-all transform hover:scale-105"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#2D1B69',
                    fontFamily: 'Inter, sans-serif',
                    border: '1px solid #D4AF37'
                  }}
                >
                  View Payments
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div 
              className="text-center p-4 md:p-6 rounded-xl"
              style={{
                backgroundColor: 'rgba(45, 27, 105, 0.05)',
                border: '1px solid rgba(45, 27, 105, 0.1)'
              }}
            >
              <div className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#2D1B69' }}>0</div>
              <p className="text-sm" style={{ color: '#6B5B95', fontFamily: 'Inter, sans-serif' }}>Total Users</p>
            </div>
            <div 
              className="text-center p-4 md:p-6 rounded-xl"
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.1)'
              }}
            >
              <div className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#D4AF37' }}>0</div>
              <p className="text-sm" style={{ color: '#6B5B95', fontFamily: 'Inter, sans-serif' }}>Pending Readings</p>
            </div>
            <div 
              className="text-center p-4 md:p-6 rounded-xl"
              style={{
                backgroundColor: 'rgba(45, 27, 105, 0.05)',
                border: '1px solid rgba(45, 27, 105, 0.1)'
              }}
            >
              <div className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#2D1B69' }}>₹0</div>
              <p className="text-sm" style={{ color: '#6B5B95', fontFamily: 'Inter, sans-serif' }}>Total Revenue</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default WelcomeAdmin;
