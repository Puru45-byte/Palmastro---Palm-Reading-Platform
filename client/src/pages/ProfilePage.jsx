import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI, ordersAPI } from '../services/api';

const ProfilePage = () => {
  const { user, setUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [orders, setOrders] = useState([]);
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchReadings();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getMyOrders();
      setOrders(response.data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchReadings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/readings/my-readings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setReadings(data || []);
      } else {
        console.error('Failed to fetch readings');
        setReadings([]);
      }
    } catch (error) {
      console.error('Failed to fetch readings:', error);
      setReadings([]);
    }
  };

  const handleEdit = (field, currentValue) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const handleSave = async (field) => {
    try {
      const token = localStorage.getItem('token');
      const body = {};
      
      if (field === 'name') body.name = editValue;
      if (field === 'phone') body.phone = editValue;
      if (field === 'dob') body.dateOfBirth = editValue;
      
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(body)
      });
      
      if (!response.ok) throw new Error('Failed to update');
      
      const data = await response.json();
      
      // Update AuthContext user state with new data
      setUser(prev => ({ ...prev, ...data.user || data }));
      
      // Close edit mode for that field
      setEditingField(null);
      setEditValue('');
      
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue('');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const menuItems = [
    { id: 'personal', label: '👤 Personal Info' },
    { id: 'orders', label: '📦 Order History' },
    { id: 'payments', label: '💳 Payment History' },
    { id: 'readings', label: '🔮 My Readings' }
  ];

  const renderPersonalInfo = () => (
    <div style={{ padding: '40px' }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        color: '#1a1a3e', 
        marginBottom: '24px',
        fontFamily: 'Playfair Display'
      }}>
        Personal Information
      </h2>
      <p style={{ 
        fontSize: '14px', 
        color: '#8a8a9a', 
        marginBottom: '32px',
        fontFamily: 'Inter'
      }}>
        Manage your personal details
      </p>
      
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)'
      }}>
        {/* Full Name */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ 
            fontSize: '12px', 
            color: '#8a8a9a', 
            textTransform: 'uppercase', 
            marginBottom: '8px',
            fontFamily: 'Inter',
            fontWeight: '500'
          }}>
            Full Name
          </div>
          {editingField === 'name' ? (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontFamily: 'Inter'
                }}
              />
              <button
                onClick={() => handleSave('name')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#b8960c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#b8960c',
                  border: '1px solid #b8960c',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '12px 0'
            }}>
              <div style={{ color: '#1a1a3e', fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>
                {user?.name || 'User Name'}
              </div>
              <button
                onClick={() => handleEdit('name', user?.name || '')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#b8960c',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                ✏️
              </button>
            </div>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ 
            fontSize: '12px', 
            color: '#8a8a9a', 
            textTransform: 'uppercase', 
            marginBottom: '8px',
            fontFamily: 'Inter',
            fontWeight: '500'
          }}>
            Email
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '12px 0'
          }}>
            <div style={{ color: '#1a1a3e', fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>
              {user?.email || 'user@example.com'}
            </div>
              <span style={{ color: '#b8960c', fontSize: '12px' }}>🔒</span>
          </div>
        </div>

        {/* Phone */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ 
            fontSize: '12px', 
            color: '#8a8a9a', 
            textTransform: 'uppercase', 
            marginBottom: '8px',
            fontFamily: 'Inter',
            fontWeight: '500'
          }}>
            Phone Number
          </div>
          {editingField === 'phone' ? (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="tel"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontFamily: 'Inter'
                }}
              />
              <button
                onClick={() => handleSave('phone')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#b8960c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#b8960c',
                  border: '1px solid #b8960c',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '12px 0'
            }}>
              <div style={{ color: '#1a1a3e', fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>
                {user?.phone || 'Not provided'}
              </div>
              <button
                onClick={() => handleEdit('phone', user?.phone || '')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#b8960c',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                ✏️
              </button>
            </div>
          )}
        </div>

        {/* Date of Birth */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ 
            fontSize: '12px', 
            color: '#8a8a9a', 
            textTransform: 'uppercase', 
            marginBottom: '8px',
            fontFamily: 'Inter',
            fontWeight: '500'
          }}>
            Date of Birth
          </div>
          {editingField === 'dob' ? (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="date"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontFamily: 'Inter'
                }}
              />
              <button
                onClick={() => handleSave('dob')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#b8960c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#b8960c',
                  border: '1px solid #b8960c',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '12px 0'
            }}>
              <div style={{ color: '#1a1a3e', fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>
                {user?.dateOfBirth ? formatDate(user.dateOfBirth) : 'Not provided'}
              </div>
              <button
                onClick={() => handleEdit('dob', user?.dateOfBirth || '')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#b8960c',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                ✏️
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderOrderHistory = () => (
    <div style={{ padding: '40px' }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        color: '#1a1a3e', 
        marginBottom: '24px',
        fontFamily: 'Playfair Display'
      }}>
        Order History
      </h2>
      <p style={{ 
        fontSize: '14px', 
        color: '#8a8a9a', 
        marginBottom: '32px',
        fontFamily: 'Inter'
      }}>
        Your palm reading orders
      </p>
      
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)'
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #e5e7eb',
              borderTop: '3px solid #b8960c',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
            <p style={{ color: '#8a8a9a', fontFamily: 'Inter' }}>No orders yet</p>
            <button
              onClick={() => window.location.href = '/palm-readings'}
              style={{
                padding: '12px 24px',
                backgroundColor: '#b8960c',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontFamily: 'Inter',
                cursor: 'pointer',
                marginTop: '16px'
              }}
            >
              Get Your Reading
            </button>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontFamily: 'Inter', fontWeight: '600' }}>Service</th>
                <th style={{ padding: '12px', textAlign: 'left', fontFamily: 'Inter', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'left', fontFamily: 'Inter', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', fontFamily: 'Inter', fontWeight: '600' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontFamily: 'Inter' }}>{order.service || 'Palm Reading'}</td>
                  <td style={{ padding: '12px', fontFamily: 'Inter' }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontFamily: 'Inter',
                      fontWeight: '500',
                      backgroundColor: order.status === 'completed' ? '#10b981' : 
                                       order.status === 'pending' ? '#f59e0b' : '#3b82f6',
                      color: 'white'
                    }}>
                      {order.status === 'completed' ? 'Completed' : 
                       order.status === 'pending' ? 'Pending' : 'Processing'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <a
                      href={`/orders/${order.id}`}
                      style={{ 
                        color: '#b8960c', 
                        textDecoration: 'none', 
                        fontFamily: 'Inter',
                        fontWeight: '500'
                      }}
                    >
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  const renderPaymentHistory = () => (
    <div style={{ padding: '40px' }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        color: '#1a1a3e', 
        marginBottom: '24px',
        fontFamily: 'Playfair Display'
      }}>
        Payment History
      </h2>
      <p style={{ 
        fontSize: '14px', 
        color: '#8a8a9a', 
        marginBottom: '32px',
        fontFamily: 'Inter'
      }}>
        Your transaction records
      </p>
      
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)'
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #e5e7eb',
              borderTop: '3px solid #b8960c',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💳</div>
            <p style={{ color: '#8a8a9a', fontFamily: 'Inter' }}>No payment history</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontFamily: 'Inter', fontWeight: '600' }}>Order ID</th>
                <th style={{ padding: '12px', textAlign: 'left', fontFamily: 'Inter', fontWeight: '600' }}>Amount</th>
                <th style={{ padding: '12px', textAlign: 'left', fontFamily: 'Inter', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'left', fontFamily: 'Inter', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', fontFamily: 'Inter', fontWeight: '600' }}>Method</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontFamily: 'monospace' }}>
                    #{order.id?.toString().padStart(6, '0')}
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'Inter', fontWeight: '500' }}>
                    ₹149
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'Inter' }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontFamily: 'Inter',
                      fontWeight: '500',
                      backgroundColor: order.status === 'completed' ? '#10b981' : 
                                       order.status === 'pending' ? '#f59e0b' : '#ef4444',
                      color: 'white'
                    }}>
                      {order.status === 'completed' ? 'Paid' : 
                       order.status === 'pending' ? 'Pending' : 'Failed'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'Inter' }}>
                    {order.paymentMethod || 'Card'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  const renderMyReadings = () => (
    <div style={{ padding: '40px' }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        color: '#1a1a3e', 
        marginBottom: '24px',
        fontFamily: 'Playfair Display'
      }}>
        My Palm Readings
      </h2>
      <p style={{ 
        fontSize: '14px', 
        color: '#8a8a9a', 
        marginBottom: '32px',
        fontFamily: 'Inter'
      }}>
        Your personalized palm reading results
      </p>
      
      {readings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔮</div>
          <p style={{ color: '#8a8a9a', fontFamily: 'Inter', marginBottom: '16px' }}>No readings yet</p>
          <button
            onClick={() => window.location.href = '/palm-readings'}
            style={{
              padding: '12px 24px',
              backgroundColor: '#b8960c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontFamily: 'Inter',
              cursor: 'pointer'
            }}
          >
            Get Your Reading
          </button>
        </div>
      ) : (
        <div>
          {readings.map((reading) => (
            <div key={reading.id} style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '20px',
              boxShadow: '0 2px 20px rgba(0,0,0,0.06)'
            }}>
              {/* Header with date and status */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{ 
                  fontSize: '14px', 
                  color: '#8a8a9a', 
                  fontFamily: 'Inter'
                }}>
                  📅 {new Date(reading.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  backgroundColor: reading.status === 'COMPLETED' ? '#10b981' : '#f59e0b',
                  color: 'white'
                }}>
                  {reading.status === 'COMPLETED' ? 'Completed' : 'Pending'}
                </span>
              </div>

              {/* Question section */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#8a8a9a', 
                  textTransform: 'uppercase', 
                  marginBottom: '8px',
                  fontFamily: 'Inter',
                  fontWeight: '500'
                }}>
                  YOUR QUESTION
                </div>
                <div style={{ 
                  fontSize: '16px', 
                  color: '#1a1a3e', 
                  fontStyle: 'italic',
                  fontFamily: 'Inter',
                  marginBottom: '16px'
                }}>
                  "{reading.question}"
                </div>
              </div>

              {/* Divider */}
              <div style={{ 
                height: '1px', 
                backgroundColor: '#e5e7eb', 
                marginBottom: '16px'
              }}></div>

              {/* Answer section */}
              <div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#8a8a9a', 
                  textTransform: 'uppercase', 
                  marginBottom: '8px',
                  fontFamily: 'Inter',
                  fontWeight: '500'
                }}>
                  PALMIST'S ANSWER
                </div>
                <div style={{ 
                  fontSize: '16px', 
                  color: '#1a1a3e', 
                  fontFamily: 'Inter',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap'
                }}>
                  {reading.answer || 'Your reading is being processed...'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfo();
      case 'orders':
        return renderOrderHistory();
      case 'payments':
        return renderPaymentHistory();
      case 'readings':
        return renderMyReadings();
      default:
        return renderPersonalInfo();
    }
  };

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f0eb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #b8960c',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#1a1a3e', fontFamily: 'Inter' }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f0eb',
      display: 'flex'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '260px',
        backgroundColor: 'white',
        borderRight: '1px solid #e8e0d5',
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflowY: 'auto'
      }}>
        {/* User Avatar */}
        <div style={{ padding: '24px', textAlign: 'center', borderBottom: '1px solid #e8e0d5' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#b8960c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'Inter'
          }}>
            {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#1a1a3e', 
            marginBottom: '4px',
            fontFamily: 'Inter'
          }}>
            {user?.name || 'User'}
          </div>
          <div style={{ 
            fontSize: '12px', 
            color: '#8a8a9a', 
            marginBottom: '4px',
            fontFamily: 'Inter'
          }}>
            {user?.email || 'user@example.com'}
          </div>
          <div style={{ 
            fontSize: '12px', 
            color: '#8a8a9a', 
            fontFamily: 'Inter'
          }}>
            Member since {user?.createdAt ? formatDate(user.createdAt) : 'Unknown'}
          </div>
        </div>

        {/* Navigation Menu */}
        <div style={{ padding: '16px' }}>
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                padding: '12px 20px',
                cursor: 'pointer',
                borderRadius: '8px',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: activeTab === item.id ? '#fdf8f0' : 'transparent',
                borderLeft: activeTab === item.id ? '3px solid #b8960c' : '3px solid transparent',
                color: activeTab === item.id ? '#b8960c' : '#1a1a3e',
                fontFamily: 'Inter',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  e.target.style.backgroundColor = '#b8960c20';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div style={{ padding: '16px', marginTop: 'auto' }}>
          <button
            onClick={logout}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'transparent',
              color: '#ef4444',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'Inter',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfilePage;
