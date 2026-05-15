import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import palmImage from '../assets/palm.png';

const FormPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    birthPlace: '',
    birthTime: '',
    question: ''
  });
  const [leftPalmUrl, setLeftPalmUrl] = useState('');
  const [rightPalmUrl, setRightPalmUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        dob: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        birthPlace: user.birthPlace || '',
        birthTime: user.birthTime || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = async (file, side) => {
  // side = 'left' or 'right'
  try {
    const formData = new FormData();
    formData.append('images', file);
    
    const token = localStorage.getItem('token');
    const response = await fetch('/api/upload/palm-images', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    
    const data = await response.json();
    if (data.urls && data.urls.length > 0) {
      // Save URL to state
      if (side === 'left') setLeftPalmUrl(data.urls[0]);
      if (side === 'right') setRightPalmUrl(data.urls[1] || data.urls[0]);
      console.log(`${side} palm uploaded:`, data.urls);
    }
  } catch (error) {
    console.error('Image upload failed:', error);
    alert('Image upload failed. Please try again.');
  }
};

const handleFileChange = (e, side) => {
  const file = e.target.files[0];
  if (file) {
    handleImageUpload(file, side);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!leftPalmUrl || !rightPalmUrl) {
      setError('Please upload both palm images');
      return;
    }

    if (!formData.question.trim()) {
      setError('Please enter your question');
      return;
    }

    setLoading(true);
    
    // Store form data and navigate to payment
    const requestData = {
      ...formData,
      leftPalmUrl,
      rightPalmUrl
    };
    localStorage.setItem('palmRequestData', JSON.stringify(requestData));
    navigate('/payment');
  };

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

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        {/* Main Form Card */}
        <div 
          className="w-full max-w-4xl"
          style={{
            backgroundColor: '#FFFDF9',
            borderRadius: '30px',
            boxShadow: '0 20px 60px rgba(45, 27, 105, 0.15)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            overflow: 'hidden'
          }}
        >
          {/* Header Section */}
          <div className="text-center px-4 sm:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8">
            {/* Palmistry Icon */}
            <div className="relative inline-block mb-6">
              <div className="relative z-10 w-32 h-32 flex items-center justify-center overflow-hidden rounded-full">
                <img 
                  src={palmImage} 
                  alt="Palm Reading" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative stars */}
              <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-600 rounded-full opacity-60"></div>
              <div className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-yellow-600 rounded-full opacity-50"></div>
              <div className="absolute -bottom-2 -left-1 w-1 h-1 bg-yellow-600 rounded-full opacity-40"></div>
              <div className="absolute -bottom-1 right-2 w-1.5 h-1.5 bg-yellow-600 rounded-full opacity-55"></div>
            </div>

            {/* Title */}
            <h1 
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#2D1B69',
                lineHeight: '1.2'
              }}
            >
              Submit Your Palm Reading Request
            </h1>

            {/* Subtitle */}
            <p 
              className="text-lg mb-6"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#6B5B95',
                lineHeight: '1.6'
              }}
            >
              Real human palmists will personally review your palms and deliver insights within 24 hours.
            </p>

            {/* Trust Badge */}
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                color: '#D4AF37',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <span className="mr-2">✓</span>
              100% Human Reviewed • Secure • Private
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="px-4 sm:px-8 pb-8 sm:pb-12">
            {/* Personal Information Section */}
            <div className="mb-10">
              <h2 
                className="text-xl font-semibold mb-6"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  color: '#2D1B69'
                }}
              >
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B5B95'
                    }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-yellow-200 focus:border-yellow-400 focus:outline-none transition-all"
                    style={{
                      backgroundColor: '#FFFDF9',
                      fontFamily: 'Inter, sans-serif',
                      color: '#2D1B69'
                    }}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B5B95'
                    }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-yellow-200 focus:border-yellow-400 focus:outline-none transition-all"
                    style={{
                      backgroundColor: '#FFFDF9',
                      fontFamily: 'Inter, sans-serif',
                      color: '#2D1B69'
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B5B95'
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    readOnly={!!user}
                    className="w-full px-4 py-3 rounded-xl border border-yellow-200 focus:border-yellow-400 focus:outline-none transition-all"
                    style={{
                      backgroundColor: user ? '#F5F5F5' : '#FFFDF9',
                      fontFamily: 'Inter, sans-serif',
                      color: '#2D1B69',
                      opacity: user ? 0.7 : 1
                    }}
                  />
                  {user && (
                    <p className="text-xs mt-1" style={{ color: '#D4AF37' }}>
                      Linked to your account
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B5B95'
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-yellow-200 focus:border-yellow-400 focus:outline-none transition-all"
                    style={{
                      backgroundColor: '#FFFDF9',
                      fontFamily: 'Inter, sans-serif',
                      color: '#2D1B69'
                    }}
                  />
                </div>

                {/* Date of Birth */}
                <div className="md:col-span-2">
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B5B95'
                    }}
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-yellow-200 focus:border-yellow-400 focus:outline-none transition-all"
                    style={{
                      backgroundColor: '#FFFDF9',
                      fontFamily: 'Inter, sans-serif',
                      color: '#2D1B69'
                    }}
                  />
                </div>

                {/* Birth Place */}
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B5B95'
                    }}
                  >
                    Birth Place
                  </label>
                  <input
                    type="text"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    placeholder="City, State, Country"
                    className="w-full px-4 py-3 rounded-xl border border-yellow-200 focus:border-yellow-400 focus:outline-none transition-all"
                    style={{
                      backgroundColor: '#FFFDF9',
                      fontFamily: 'Inter, sans-serif',
                      color: '#2D1B69'
                    }}
                  />
                </div>

                {/* Birth Time */}
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B5B95'
                    }}
                  >
                    Birth Time
                  </label>
                  <input
                    type="time"
                    name="birthTime"
                    value={formData.birthTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-yellow-200 focus:border-yellow-400 focus:outline-none transition-all"
                    style={{
                      backgroundColor: '#FFFDF9',
                      fontFamily: 'Inter, sans-serif',
                      color: '#2D1B69'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Palm Images Section */}
            <div className="mb-10">
              <h2 
                className="text-xl font-semibold mb-6"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  color: '#2D1B69'
                }}
              >
                Palm Images
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Palm Upload */}
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B5B95'
                    }}
                  >
                    Left Palm Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="leftPalm"
                      onChange={(e) => handleFileChange(e, 'left')}
                      accept="image/*"
                      required
                      className="hidden"
                      id="leftPalmInput"
                    />
                    <label
                      htmlFor="leftPalmInput"
                      className="block w-full p-8 border-2 border-dashed border-yellow-400 rounded-xl cursor-pointer hover:border-yellow-500 transition-all text-center"
                      style={{
                        backgroundColor: 'rgba(212, 175, 55, 0.05)'
                      }}
                    >
                      {leftPalmUrl ? (
                        <div>
                          <div className="text-green-600 mb-2">✓</div>
                          <p className="text-sm font-medium" style={{ color: '#2D1B69' }}>
                            Left palm image uploaded
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="text-3xl mb-2">📸</div>
                          <p className="text-sm font-medium mb-1" style={{ color: '#D4AF37' }}>
                            Upload Left Palm
                          </p>
                          <p className="text-xs" style={{ color: '#6B5B95' }}>
                            JPG/PNG • Max 5MB
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Right Palm Upload */}
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B5B95'
                    }}
                  >
                    Right Palm Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="rightPalm"
                      onChange={(e) => handleFileChange(e, 'right')}
                      accept="image/*"
                      required
                      className="hidden"
                      id="rightPalmInput"
                    />
                    <label
                      htmlFor="rightPalmInput"
                      className="block w-full p-8 border-2 border-dashed border-yellow-400 rounded-xl cursor-pointer hover:border-yellow-500 transition-all text-center"
                      style={{
                        backgroundColor: 'rgba(212, 175, 55, 0.05)'
                      }}
                    >
                      {rightPalmUrl ? (
                        <div>
                          <div className="text-green-600 mb-2">✓</div>
                          <p className="text-sm font-medium" style={{ color: '#2D1B69' }}>
                            Right palm image uploaded
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="text-3xl mb-2">📸</div>
                          <p className="text-sm font-medium mb-1" style={{ color: '#D4AF37' }}>
                            Upload Right Palm
                          </p>
                          <p className="text-xs" style={{ color: '#6B5B95' }}>
                            JPG/PNG • Max 5MB
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Question Section */}
            <div className="mb-10">
              <h2 
                className="text-xl font-semibold mb-6"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  color: '#2D1B69'
                }}
              >
                Your Question
              </h2>
              
              <div>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Ask about career, marriage, finances, life path, or any personal question…"
                  className="w-full px-4 py-3 rounded-xl border border-yellow-200 focus:border-yellow-400 focus:outline-none transition-all resize-none"
                  style={{
                    backgroundColor: '#FFFDF9',
                    fontFamily: 'Inter, sans-serif',
                    color: '#2D1B69'
                  }}
                />
                <p 
                  className="text-xs mt-2"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: '#6B5B95'
                  }}
                >
                  Our human experts answer with care and privacy.
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div 
                className="mb-6 p-4 rounded-xl text-center"
                style={{
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  border: '1px solid rgba(220, 38, 38, 0.2)',
                  color: '#DC2626',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {error}
              </div>
            )}

            {/* CTA Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="px-12 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #2D1B69 0%, #4A3B8A 100%)',
                  color: '#FFFFFF',
                  border: '2px solid #D4AF37',
                  fontFamily: 'Inter, sans-serif',
                  boxShadow: '0 8px 32px rgba(45, 27, 105, 0.3)'
                }}
              >
                {loading ? 'Processing...' : 'Proceed to Secure Payment'}
              </button>
              
              <p 
                className="mt-4 text-sm"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B5B95'
                }}
              >
                ₹149 • One Question • Human Reviewed
              </p>
            </div>

            {/* Trust Elements */}
            <div className="mt-12 pt-8 border-t border-yellow-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl mb-2">🔒</div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#2D1B69'
                    }}
                  >
                    Secure Payment
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B5B95'
                    }}
                  >
                    Your payment information is encrypted and secure
                  </p>
                </div>
                
                <div>
                  <div className="text-2xl mb-2">👁️</div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#2D1B69'
                    }}
                  >
                    Human Expert Analysis
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B5B95'
                    }}
                  >
                    Real palmists review your images, not AI
                  </p>
                </div>
                
                <div>
                  <div className="text-2xl mb-2">⏰</div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#2D1B69'
                    }}
                  >
                    Response in 24 Hours
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B5B95'
                    }}
                  >
                    Get your personalized reading within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
