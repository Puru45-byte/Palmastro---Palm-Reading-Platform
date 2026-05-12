import React from 'react';
import { Link } from 'react-router-dom';

const SignupTest = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F5F2', padding: '20px' }}>
      <h1 style={{ color: '#2D1E4F', fontFamily: 'Playfair Display', marginBottom: '20px' }}>
        Create Account Test
      </h1>
      <p style={{ color: '#6D6D6D', fontFamily: 'Inter', marginBottom: '30px' }}>
        This is a test signup page to verify routing works.
      </p>
      <div style={{ 
        backgroundColor: '#ffffffcc', 
        padding: '40px', 
        borderRadius: '20px',
        maxWidth: '500px',
        margin: '0 auto',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input 
            type="text" 
            placeholder="Full Name" 
            style={{ 
              padding: '12px', 
              borderRadius: '8px',
              border: '1px solid #EADFD8',
              fontSize: '14px',
              fontFamily: 'Inter'
            }}
          />
          <input 
            type="email" 
            placeholder="Email" 
            style={{ 
              padding: '12px', 
              borderRadius: '8px',
              border: '1px solid #EADFD8',
              fontSize: '14px',
              fontFamily: 'Inter'
            }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            style={{ 
              padding: '12px', 
              borderRadius: '8px',
              border: '1px solid #EADFD8',
              fontSize: '14px',
              fontFamily: 'Inter'
            }}
          />
          <button 
            type="submit"
            style={{
              padding: '12px 24px',
              borderRadius: '25px',
              backgroundColor: '#2D1E4F',
              color: 'white',
              border: '2px solid #D4AF37',
              fontSize: '16px',
              fontFamily: 'Inter',
              cursor: 'pointer'
            }}
          >
            Create Account
          </button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center', fontFamily: 'Inter' }}>
          <span style={{ color: '#6D6D6D' }}>
            Already have an account?{' '}
          </span>
          <Link 
            to="/premium-login" 
            style={{ color: '#D4AF37', textDecoration: 'underline', marginLeft: '5px' }}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupTest;
