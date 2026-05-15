import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { requestAPI } from '../services/api';
import AdminLayout from '../components/AdminLayout';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const response = await requestAPI.getRequests('PENDING');
      setRequests(response.data || []);
    } catch (error) {
      console.error('Failed to fetch pending requests:', error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerRequest = async (requestId) => {
    if (!answer.trim()) {
      alert('Please enter an answer before submitting.');
      return;
    }

    try {
      setSubmitting(true);
      await requestAPI.submitAnswer(requestId, answer);
      
      // Clear form and refresh requests
      setAnswer('');
      setSelectedRequest(null);
      fetchPendingRequests();
      
      // Show success message
      setSuccessMessage('Reading response sent successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);
      
    } catch (error) {
      console.error('Failed to submit answer:', error);
      alert('Failed to submit answer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const downloadImages = (images) => {
    images.forEach((url, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `palm-photo-${index + 1}.jpg`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 500);
    });
  };

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return url;
    return url;
  };

  const getUserNameForFile = (user) => {
    if (!user || (!user.firstName && !user.lastName)) return 'user';
    return `${user.firstName || ''}-${user.lastName || ''}`.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  const handleDownload = async (url, filename) => {
    const fullUrl = getImageUrl(url);
    try {
      const response = await fetch(fullUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Download failed, opening in new tab', error);
      window.open(fullUrl, '_blank');
    }
  };

  
  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
          {/* Success Notification Banner */}
          {successMessage && (
            <div 
              className="fixed top-8 right-8 z-50 p-4 rounded-xl shadow-2xl animate-bounce"
              style={{
                backgroundColor: '#FFFDF9',
                border: '2px solid #D4AF37',
                color: '#2D1B69',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <p className="font-bold">Success!</p>
                  <p className="text-sm">{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#2D1B69'
              }}
            >
              Pending Requests
            </h1>
            <p 
              className="text-lg"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#6B5B95'
              }}
            >
              Manage and respond to user palm reading requests
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: '#FFFDF9',
                border: '1px solid rgba(212, 175, 55, 0.25)'
              }}
            >
              <div className="text-3xl font-bold mb-2" style={{ color: '#D4AF37' }}>
                {requests.length}
              </div>
              <p className="text-sm" style={{ color: '#6B5B95', fontFamily: 'Inter, sans-serif' }}>
                Pending Requests
              </p>
            </div>
            
            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: '#FFFDF9',
                border: '1px solid rgba(212, 175, 55, 0.25)'
              }}
            >
              <div className="text-3xl font-bold mb-2" style={{ color: '#2D1B69' }}>
                0
              </div>
              <p className="text-sm" style={{ color: '#6B5B95', fontFamily: 'Inter, sans-serif' }}>
                Completed Today
              </p>
            </div>
            
            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: '#FFFDF9',
                border: '1px solid rgba(212, 175, 55, 0.25)'
              }}
            >
              <div className="text-3xl font-bold mb-2" style={{ color: '#2D1B69' }}>
                ₹0
              </div>
              <p className="text-sm" style={{ color: '#6B5B95', fontFamily: 'Inter, sans-serif' }}>
                Revenue Today
              </p>
            </div>
          </div>

          {/* Requests List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#D4AF37' }}></div>
              <p style={{ color: '#2D1B69', fontFamily: 'Inter, sans-serif' }}>Loading pending requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div 
              className="text-center py-12 rounded-xl"
              style={{
                backgroundColor: '#FFFDF9',
                border: '1px solid rgba(212, 175, 55, 0.25)'
              }}
            >
              <div className="text-6xl mb-4">📋</div>
              <h3 
                className="text-xl font-semibold mb-2"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  color: '#2D1B69'
                }}
              >
                No Pending Requests
              </h3>
              <p style={{ color: '#6B5B95', fontFamily: 'Inter, sans-serif' }}>
                All requests have been answered. Great job!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Requests List */}
              <div>
                <h2 
                  className="text-xl font-semibold mb-4"
                  style={{ 
                    fontFamily: 'Playfair Display, serif',
                    color: '#2D1B69'
                  }}
                >
                  Request Queue
                </h2>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div
                      key={request.id}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedRequest?.id === request.id 
                          ? 'ring-2 ring-yellow-500' 
                          : 'hover:shadow-lg'
                      }`}
                      style={{
                        backgroundColor: '#FFFDF9',
                        border: '1px solid rgba(212, 175, 55, 0.25)'
                      }}
                      onClick={() => setSelectedRequest(request)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p 
                            className="font-medium mb-1"
                            style={{ 
                              fontFamily: 'Inter, sans-serif',
                              color: '#2D1B69'
                            }}
                          >
                            {request.user && (request.user.firstName || request.user.lastName)
                              ? `${request.user.firstName || ''} ${request.user.lastName || ''}`.trim()
                              : 'User Request'}
                          </p>
                          <p 
                            className="text-sm mb-2"
                            style={{ 
                              fontFamily: 'Inter, sans-serif',
                              color: '#6B5B95'
                            }}
                          >
                            {new Date(request.createdAt).toLocaleDateString()} at {new Date(request.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                      <p 
                        className="text-sm line-clamp-2 mb-3"
                        style={{ 
                          fontFamily: 'Inter, sans-serif',
                          color: '#2D1B69'
                        }}
                      >
                        {request.question}
                      </p>
                      
                      {/* Image count section */}
                      <div style={{marginTop:'10px'}}>
                        <span style={{fontSize:'12px', color:'#888'}}>
                          📷 {[request.leftPalmUrl, request.rightPalmUrl].filter(Boolean).length} photo(s)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Answer Form */}
              <div>
                <h2 
                  className="text-xl font-semibold mb-4"
                  style={{ 
                    fontFamily: 'Playfair Display, serif',
                    color: '#2D1B69'
                  }}
                >
                  Provide Answer
                </h2>
                {selectedRequest ? (
                  <div 
                    className="p-6 rounded-xl"
                    style={{
                      backgroundColor: '#FFFDF9',
                      border: '1px solid rgba(212, 175, 55, 0.25)'
                    }}
                  >
                    <div className="mb-4">
                      <p 
                        className="text-sm font-medium mb-2"
                        style={{ 
                          fontFamily: 'Inter, sans-serif',
                          color: '#6B5B95'
                        }}
                      >
                        User Question:
                      </p>
                      <p 
                        className="text-lg mb-4"
                        style={{ 
                          fontFamily: 'Inter, sans-serif',
                          color: '#2D1B69'
                        }}
                      >
                        {selectedRequest.question}
                      </p>
                      
                      {/* Download Images Buttons */}
                      <div className="flex flex-wrap gap-4 mt-2">
                        {selectedRequest.leftPalmUrl && (
                          <button
                            onClick={() => handleDownload(selectedRequest.leftPalmUrl, `${getUserNameForFile(selectedRequest.user)}-leftpalm.jpg`)}
                            className="px-4 py-2 text-sm rounded-lg font-medium transition-all hover:shadow-md"
                            style={{
                              backgroundColor: '#FFFDF9',
                              color: '#2D1B69',
                              border: '1px solid #D4AF37',
                              fontFamily: 'Inter, sans-serif'
                            }}
                          >
                            📸 Download Left Palm
                          </button>
                        )}
                        {selectedRequest.rightPalmUrl && (
                          <button
                            onClick={() => handleDownload(selectedRequest.rightPalmUrl, `${getUserNameForFile(selectedRequest.user)}-rightpalm.jpg`)}
                            className="px-4 py-2 text-sm rounded-lg font-medium transition-all hover:shadow-md"
                            style={{
                              backgroundColor: '#FFFDF9',
                              color: '#2D1B69',
                              border: '1px solid #D4AF37',
                              fontFamily: 'Inter, sans-serif'
                            }}
                          >
                            📸 Download Right Palm
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ 
                          fontFamily: 'Inter, sans-serif',
                          color: '#6B5B95'
                        }}
                      >
                        Your Answer:
                      </label>
                      <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-yellow-200 focus:border-yellow-400 focus:outline-none resize-none"
                        style={{
                          backgroundColor: '#FFFDF9',
                          fontFamily: 'Inter, sans-serif',
                          color: '#2D1B69'
                        }}
                        placeholder="Provide your palm reading answer here..."
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleAnswerRequest(selectedRequest.id)}
                        disabled={submitting}
                        className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background: 'linear-gradient(135deg, #2D1B69 0%, #4A3B8A 100%)',
                          color: '#FFFFFF',
                          border: '2px solid #D4AF37',
                          fontFamily: 'Inter, sans-serif'
                        }}
                      >
                        {submitting ? 'Submitting...' : 'Submit Answer'}
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedRequest(null);
                          setAnswer('');
                        }}
                        className="px-6 py-3 rounded-xl font-medium transition-all"
                        style={{
                          backgroundColor: 'transparent',
                          color: '#2D1B69',
                          border: '1px solid #D4AF37',
                          fontFamily: 'Inter, sans-serif'
                        }}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="text-center py-12 rounded-xl"
                    style={{
                      backgroundColor: '#FFFDF9',
                      border: '1px solid rgba(212, 175, 55, 0.25)'
                    }}
                  >
                    <div className="text-4xl mb-4">👆</div>
                    <p style={{ color: '#6B5B95', fontFamily: 'Inter, sans-serif' }}>
                      Select a request from the left to provide an answer
                    </p>
                  </div>
                )}
            </div>
          </div>
    )}
    </AdminLayout>
  );
};

export default AdminDashboard;
