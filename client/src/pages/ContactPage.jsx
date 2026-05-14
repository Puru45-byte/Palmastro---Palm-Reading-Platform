import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to send message');
      }
    } catch (error) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f4ee' }}>
      <Navbar />
      
      <div style={{ 
        padding: '80px 20px 40px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 
            style={{ 
              fontSize: 'clamp(32px, 5vw, 48px)',
              color: '#2D1B69',
              fontFamily: 'Playfair Display, serif',
              fontWeight: '600',
              marginBottom: '20px'
            }}
          >
            Contact Us
          </h1>
          <p 
            style={{ 
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#6B5B95',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.6'
            }}
          >
            We're here to help you on your spiritual journey. Reach out with any questions or concerns.
          </p>
        </div>

        {/* Contact Form */}
        <div 
          style={{
            backgroundColor: '#FFFDF9',
            borderRadius: '24px',
            padding: 'clamp(24px, 4vw, 50px)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)'
          }}
        >
          {success ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📧</div>
              <h2 
                style={{ 
                  fontSize: '32px',
                  color: '#2D1B69',
                  fontFamily: 'Playfair Display, serif',
                  marginBottom: '15px'
                }}
              >
                Message Sent Successfully!
              </h2>
              <p 
                style={{ 
                  fontSize: '18px',
                  color: '#6B5B95',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Thank you for contacting us. We'll get back to you soon.
              </p>
              <p 
                style={{ 
                  fontSize: '16px',
                  color: '#D4AF37',
                  fontFamily: 'Inter, sans-serif',
                  marginTop: '10px'
                }}
              >
                Redirecting to home page...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px', marginBottom: '30px' }}>
                {/* Name Field */}
                <div>
                  <label 
                    style={{ 
                      display: 'block',
                      fontSize: '16px',
                      color: '#2D1B69',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      marginBottom: '10px'
                    }}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontFamily: 'Inter, sans-serif',
                      backgroundColor: '#FFFDF9',
                      color: '#2D1B69',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#D4AF37';
                      e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label 
                    style={{ 
                      display: 'block',
                      fontSize: '16px',
                      color: '#2D1B69',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      marginBottom: '10px'
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontFamily: 'Inter, sans-serif',
                      backgroundColor: '#FFFDF9',
                      color: '#2D1B69',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#D4AF37';
                      e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div style={{ marginBottom: '30px' }}>
                <label 
                  style={{ 
                    display: 'block',
                    fontSize: '16px',
                    color: '#2D1B69',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    marginBottom: '10px'
                  }}
                >
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: '#FFFDF9',
                    color: '#2D1B69',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#D4AF37';
                    e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Message Field */}
              <div style={{ marginBottom: '30px' }}>
                <label 
                  style={{ 
                    display: 'block',
                    fontSize: '16px',
                    color: '#2D1B69',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    marginBottom: '10px'
                  }}
                >
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: '#FFFDF9',
                    color: '#2D1B69',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#D4AF37';
                    e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div style={{
                  backgroundColor: '#fee',
                  color: '#c33',
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '18px',
                  background: 'linear-gradient(135deg, #2D1B69 0%, #4A3B8A 100%)',
                  color: '#FFFFFF',
                  border: '2px solid #D4AF37',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  transform: loading ? 'none' : 'translateY(0)',
                  opacity: loading ? 0.7 : 1
                }}
                onMouseOver={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(45, 27, 105, 0.3)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
