import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import palmImage from '../assets/palm.png';

const PremiumLoginPage = () => {
  console.log('PremiumLoginPage component rendering');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with:', { email, password });
      console.log('Sending request to:', 'http://localhost:5002/api/auth/login');
      const response = await authAPI.login({ email, password });
      const token = response.data.token;
      const userData = response.data.user;
      
      // Save token and set user state
      localStorage.setItem('token', token);
      login(token, userData);
      
      console.log('Login successful, checking user role...');
      
      // Check if user is admin and redirect accordingly
      if (userData.role === 'ADMIN') {
        console.log('Admin user detected, navigating to admin dashboard...');
        navigate('/admin');
      } else {
        console.log('Regular user detected, navigating to home...');
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      console.error('Error response:', err.response);
      console.error('Error data:', err.response?.data);
      console.error('Error status:', err.response?.status);
      console.error('Error status text:', err.response?.statusText);
      console.error('Request config:', err.config);
      
      let errorMessage = 'Login failed. Please try again.';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.code === 'NETWORK_ERROR') {
        errorMessage = 'Network error. Please check your connection.';
      } else if (err.code === 'ECONNREFUSED') {
        errorMessage = 'Cannot connect to server. Please try again later.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5002/api/auth/google';
  };

  return (
    <div className="min-h-screen relative" style={{backgroundColor: '#F8F5F2'}}>
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Star Pattern */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.8'%3E%3Cpath d='M20 20l-2-2 2-2 2 2-2 2zm0-8l-1-1 1-1 1 1-1 1zm0 16l-1-1 1-1 1 1-1 1zm-8-8l-1-1 1-1 1 1-1 1zm16 0l-1-1 1-1 1 1-1 1zm-12-4l-1-1 1-1 1 1-1 1zm8 8l-1-1 1-1 1 1-1 1zm-8-8l-1-1 1-1 1 1-1 1zm8 0l-1-1 1-1 1 1-1 1z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        {/* Large Astrology Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10">
          <div className="absolute inset-0 border-2 border-yellow-600 rounded-full"></div>
          <div className="absolute inset-4 border border-yellow-600 rounded-full"></div>
          <div className="absolute inset-8 border border-yellow-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-600 rounded-full"></div>
        </div>
        
        {/* Corner Botanical Elements */}
        <div className="absolute bottom-10 left-10 opacity-20">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 100 Q40 80 60 100 T100 100" stroke="#D4AF37" strokeWidth="2" fill="none"/>
            <path d="M30 110 Q50 90 70 110 T110 110" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
            <circle cx="40" cy="95" r="3" fill="#D4AF37"/>
            <circle cx="80" cy="105" r="2" fill="#D4AF37"/>
          </svg>
        </div>
        
        <div className="absolute bottom-10 right-10 opacity-20">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 100 Q40 80 60 100 T100 100" stroke="#D4AF37" strokeWidth="2" fill="none" transform="scale(-1,1) translate(-120,0)"/>
            <path d="M30 110 Q50 90 70 110 T110 110" stroke="#D4AF37" strokeWidth="1.5" fill="none" transform="scale(-1,1) translate(-120,0)"/>
            <circle cx="40" cy="95" r="3" fill="#D4AF37" transform="scale(-1,1) translate(-120,0)"/>
            <circle cx="80" cy="105" r="2" fill="#D4AF37" transform="scale(-1,1) translate(-120,0)"/>
          </svg>
        </div>
      </div>

      <Navbar />

      {/* Main Login Container */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-20">
        <div 
          className="w-full max-w-md relative"
          style={{
            backgroundColor: '#ffffffcc',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          {/* Top Icon Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              {/* Palmistry Hand Icon */}
              <div className="relative z-10 w-32 h-32 flex items-center justify-center overflow-hidden rounded-full">
                <img 
                  src={palmImage} 
                  alt="Palm Reading" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Small Stars Around Icon */}
              <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-600 rounded-full opacity-60"></div>
              <div className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-yellow-600 rounded-full opacity-50"></div>
              <div className="absolute -bottom-2 -left-1 w-1 h-1 bg-yellow-600 rounded-full opacity-40"></div>
              <div className="absolute -bottom-1 right-2 w-1.5 h-1.5 bg-yellow-600 rounded-full opacity-55"></div>
            </div>
          </div>

          {/* Heading Section */}
          <div className="text-center mb-8">
            <h1 
              className="text-3xl font-bold mb-2"
              style={{fontFamily: 'Playfair Display', color: '#2D1E4F'}}
            >
              Welcome Back
            </h1>
            <p 
              className="text-sm"
              style={{fontFamily: 'Inter', color: '#6D6D6D'}}
            >
              Unlock the secrets written in your hands
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 rounded-lg text-sm text-center" style={{backgroundColor: '#FEE2E2', color: '#DC2626', fontFamily: 'Inter'}}>
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 5.5L10 10L17.5 5.5M2.5 5.5C2.5 4.67157 3.17157 4 4 4H16C16.8284 4 17.5 4.67157 17.5 5.5M2.5 5.5V14.5C2.5 15.3284 3.17157 16 4 16H16C16.8284 16 17.5 15.3284 17.5 14.5V5.5" stroke="#6D6D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-30"
                  style={{
                    backgroundColor: '#FDFBF8',
                    border: '1px solid #EADFD8',
                    fontFamily: 'Inter',
                    color: '#2D1E4F'
                  }}
                  placeholder="Email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="11" width="10" height="7" rx="2" stroke="#6D6D6D" strokeWidth="1.5"/>
                    <path d="M7 11V7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7V11" stroke="#6D6D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-30"
                  style={{
                    backgroundColor: '#FDFBF8',
                    border: '1px solid #EADFD8',
                    fontFamily: 'Inter',
                    color: '#2D1E4F'
                  }}
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12C2 12 5 5 10 5C15 5 18 12 18 12C18 12 15 19 10 19C5 19 2 12 2 12Z" stroke="#6D6D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="10" cy="12" r="3" stroke="#6D6D6D" strokeWidth="1.5"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12C2 12 5 5 10 5C15 5 18 12 18 12C18 12 15 19 10 19C5 19 2 12 2 12Z" stroke="#6D6D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="10" cy="12" r="3" stroke="#6D6D6D" strokeWidth="1.5"/>
                      <path d="M18 1L2 19" stroke="#6D6D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #2D1E4F 0%, #4B3F72 100%)',
                border: '2px solid #D4AF37',
                color: 'white',
                fontFamily: 'Inter'
              }}
            >
              <span className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5L7 7L10 10M10 10L7 13M10 10H2" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </span>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" style={{borderColor: '#EADFD8'}}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4" style={{backgroundColor: '#ffffffcc', fontFamily: 'Inter', color: '#6D6D6D'}}>
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md flex items-center justify-center group"
            style={{
              backgroundColor: 'white',
              border: '1px solid #EADFD8',
              fontFamily: 'Inter',
              color: '#2D1E4F'
            }}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Footer */}
          <div className="text-center mt-8" style={{fontFamily: 'Inter'}}>
            <span className="text-sm" style={{color: '#6D6D6D'}}>
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium hover:underline" style={{color: '#D4AF37'}}>
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumLoginPage;
