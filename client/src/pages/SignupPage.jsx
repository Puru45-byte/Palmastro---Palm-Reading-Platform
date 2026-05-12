import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting registration with:', { firstName, lastName, email, password });
      const result = await register({ firstName, lastName, email, password });
      console.log('Registration successful:', result);
      navigate('/form');
    } catch (err) {
      console.error('Registration error:', err);
      console.error('Error response:', err.response);
      console.error('Error data:', err.response?.data);
      
      let errorMessage = 'Registration failed. Please try again.';
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F5F2' }}>
      <Navbar />

      {/* Main Signup Container */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 'calc(100vh - 64px)', 
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(45, 30, 79, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Top Icon Section */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {/* Palmistry Hand Icon */}
              <div style={{ 
                position: 'relative', 
                width: '80px', 
                height: '80px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto'
              }}>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 45 C20 35 25 30 30 30 C35 30 40 35 40 45" stroke="#D4AF37" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path d="M25 30 L25 15" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M30 30 L30 10" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M35 30 L35 15" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M22 25 Q30 20 38 25" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.7"/>
                  <path d="M22 35 Q30 30 38 35" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.7"/>
                </svg>
              </div>
              
              {/* Small Stars Around Icon */}
              <div style={{
                position: 'absolute',
                top: '-8px',
                left: '-8px',
                width: '8px',
                height: '8px',
                backgroundColor: '#D4AF37',
                borderRadius: '50%',
                opacity: '0.6'
              }}></div>
              <div style={{
                position: 'absolute',
                top: '-4px',
                right: '-12px',
                width: '6px',
                height: '6px',
                backgroundColor: '#D4AF37',
                borderRadius: '50%',
                opacity: '0.5'
              }}></div>
            </div>
          </div>

          {/* Heading Section */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '8px',
              fontFamily: 'Playfair Display',
              color: '#2D1E4F'
            }}>
              Create Account
            </h1>
            <p style={{
              fontSize: '14px',
              fontFamily: 'Inter',
              color: '#6D6D6D'
            }}>
              Begin your palmistry journey
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              marginBottom: '24px',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
              textAlign: 'center',
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              fontFamily: 'Inter'
            }}>
              {error}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* First Name Field */}
            <div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #EADFD8',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  color: '#2D1E4F',
                  backgroundColor: '#FDFBF8',
                  boxSizing: 'border-box'
                }}
                placeholder="First Name"
                required
              />
            </div>

            {/* Last Name Field */}
            <div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #EADFD8',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  color: '#2D1E4F',
                  backgroundColor: '#FDFBF8',
                  boxSizing: 'border-box'
                }}
                placeholder="Last Name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #EADFD8',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  color: '#2D1E4F',
                  backgroundColor: '#FDFBF8',
                  boxSizing: 'border-box'
                }}
                placeholder="Email"
                required
              />
            </div>

            {/* Password Field */}
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 12px',
                  borderRadius: '8px',
                  border: '1px solid #EADFD8',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  color: '#2D1E4F',
                  backgroundColor: '#FDFBF8',
                  boxSizing: 'border-box'
                }}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                {showPassword ? '👁' : '👁'}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #EADFD8',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  color: '#2D1E4F',
                  backgroundColor: '#FDFBF8',
                  boxSizing: 'border-box'
                }}
                placeholder="Confirm Password"
                required
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 24px',
                borderRadius: '25px',
                background: loading ? '#4B3F72' : 'linear-gradient(135deg, #2D1E4F 0%, #4B3F72 100%)',
                color: 'white',
                border: '2px solid #D4AF37',
                fontSize: '16px',
                fontFamily: 'Inter',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? '0.7' : '1',
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <div style={{ marginTop: '24px', textAlign: 'center', fontFamily: 'Inter' }}>
            <span style={{ color: '#6D6D6D', fontSize: '14px' }}>
              Already have an account?{' '}
            </span>
            <Link 
              to="/premium-login" 
              style={{ 
                color: '#D4AF37', 
                textDecoration: 'underline', 
                marginLeft: '5px',
                fontSize: '14px'
              }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
