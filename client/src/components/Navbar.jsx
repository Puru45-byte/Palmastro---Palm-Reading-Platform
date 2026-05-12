import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  console.log('Navbar - User state:', user);
  console.log('Navbar - User logged in:', !!user);
  
  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return isActive 
      ? "font-medium" 
      : "text-gray-700 hover:text-gray-900 transition-colors";
  };

  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return isActive 
      ? {color: '#2D1E4F', fontFamily: 'Inter'}
      : {fontFamily: 'Inter'};
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.avatar-container')) {
        setDropdownOpen(false);
      }
      if (mobileMenuOpen && !event.target.closest('.mobile-menu-container') && !event.target.closest('.mobile-menu-button')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen, mobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="group">
              <h1 className="text-2xl sm:text-3xl font-bold text-purple-900 transition-all duration-300 group-hover:text-purple-700" style={{fontFamily: 'Playfair Display', color: '#9f891e'}}>
                Palmastro
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              <NavLink 
                to="/" 
                className={({isActive}) => 
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-purple-900 bg-yellow-50" 
                      : "text-gray-600 hover:text-purple-900 hover:bg-yellow-50"
                  }`
                }
                style={{fontFamily: 'Inter'}}
              >
                Home
              </NavLink>
              <NavLink 
                to="/about" 
                className={({isActive}) => 
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-purple-900 bg-yellow-50" 
                      : "text-gray-600 hover:text-purple-900 hover:bg-yellow-50"
                  }`
                }
                style={{fontFamily: 'Inter'}}
              >
                About
              </NavLink>
              <NavLink 
                to="/palm-readings" 
                className={({isActive}) => 
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-purple-900 bg-yellow-50" 
                      : "text-gray-600 hover:text-purple-900 hover:bg-yellow-50"
                  }`
                }
                style={{fontFamily: 'Inter'}}
              >
                Palm Reading
              </NavLink>
              <NavLink 
                to="/lines" 
                className={({isActive}) => 
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-purple-900 bg-yellow-50" 
                      : "text-gray-600 hover:text-purple-900 hover:bg-yellow-50"
                  }`
                }
                style={{fontFamily: 'Inter'}}
              >
                Lines
              </NavLink>
              <NavLink 
                to="/blog" 
                className={({isActive}) => 
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-purple-900 bg-yellow-50" 
                      : "text-gray-600 hover:text-purple-900 hover:bg-yellow-50"
                  }`
                }
                style={{fontFamily: 'Inter'}}
              >
                Blog
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({isActive}) => 
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-purple-900 bg-yellow-50" 
                      : "text-gray-600 hover:text-purple-900 hover:bg-yellow-50"
                  }`
                }
                style={{fontFamily: 'Inter'}}
              >
                Contact
              </NavLink>
            </div>
          </div>
          
          {/* Right Side - Desktop & Mobile */}
          <div className="flex items-center space-x-3">
            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {user ? (
                <div className="avatar-container">
                  <div 
                    className="avatar relative group"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%',
                      backgroundColor: '#9f891e', 
                      color: 'white',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      cursor: 'pointer', 
                      fontWeight: '600', 
                      fontSize: '16px',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 8px rgba(159, 137, 30, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                      e.target.style.boxShadow = '0 4px 12px rgba(159, 137, 30, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = '0 2px 8px rgba(159, 137, 30, 0.2)';
                    }}
                  >
                    {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                  </div>
                  {dropdownOpen && (
                    <div className="dropdown absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden" style={{zIndex: '50'}}>
                      {user.role === 'ADMIN' ? (
                        <>
                          <button 
                            onClick={() => { navigate('/admin'); setDropdownOpen(false); }}
                            className="w-full text-left px-4 py-3 text-sm font-medium text-yellow-700 hover:bg-yellow-50 transition-colors flex items-center space-x-2"
                          >
                            <span>👑</span>
                            <span>Admin Panel</span>
                          </button>
                          <button 
                            onClick={() => { navigate('/admin/dashboard'); setDropdownOpen(false); }}
                            className="w-full text-left px-4 py-3 text-sm text-yellow-600 hover:bg-yellow-50 transition-colors flex items-center space-x-2"
                          >
                            <span>📋</span>
                            <span>Pending Requests</span>
                          </button>
                          <div className="border-t border-gray-100"></div>
                          <button 
                            onClick={() => { logout(); setDropdownOpen(false); }}
                            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                          >
                            <span>🚪</span>
                            <span>Logout</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => { navigate('/profile'); setDropdownOpen(false); }}
                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                          >
                            <span>👤</span>
                            <span>My Profile</span>
                          </button>
                          <div className="border-t border-gray-100"></div>
                          <button 
                            onClick={() => { logout(); setDropdownOpen(false); }}
                            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                          >
                            <span>🚪</span>
                            <span>Logout</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/premium-login')} 
                    className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 rounded-full transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                    style={{fontFamily: 'Inter', backgroundColor: '#9f891e'}}
                  >
                    Get Reading
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-button lg:hidden p-2 rounded-lg text-gray-600 hover:text-yellow-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-container lg:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-3 space-y-1">
              <NavLink 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className={({isActive}) => 
                  `block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive 
                      ? "text-purple-900 bg-yellow-50" 
                      : "text-gray-600 hover:text-purple-900 hover:bg-yellow-50"
                  }`
                }
                style={{fontFamily: 'Inter'}}
              >
                Home
              </NavLink>
              <NavLink 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className={({isActive}) => 
                  `block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive 
                      ? "text-purple-900 bg-yellow-50" 
                      : "text-gray-600 hover:text-purple-900 hover:bg-yellow-50"
                  }`
                }
                style={{fontFamily: 'Inter'}}
              >
                About
              </NavLink>
              <NavLink 
                to="/palm-readings" 
                onClick={() => setMobileMenuOpen(false)}
                className={({isActive}) => 
                  `block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive 
                      ? "text-purple-900 bg-yellow-50" 
                      : "text-gray-600 hover:text-purple-900 hover:bg-yellow-50"
                  }`
                }
                style={{fontFamily: 'Inter'}}
              >
                Palm Reading
              </NavLink>
              <NavLink 
                to="/lines" 
                onClick={() => setMobileMenuOpen(false)}
                className={({isActive}) => 
                  `block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive 
                      ? "text-purple-900 bg-yellow-50" 
                      : "text-gray-600 hover:text-purple-900 hover:bg-yellow-50"
                  }`
                }
                style={{fontFamily: 'Inter'}}
              >
                Lines
              </NavLink>
              <NavLink 
                to="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className={({isActive}) => 
                  `block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive 
                      ? "text-purple-900 bg-yellow-50" 
                      : "text-gray-600 hover:text-purple-900 hover:bg-yellow-50"
                  }`
                }
                style={{fontFamily: 'Inter'}}
              >
                Blog
              </NavLink>
              <NavLink 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className={({isActive}) => 
                  `block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive 
                      ? "text-purple-900 bg-yellow-50" 
                      : "text-gray-600 hover:text-purple-900 hover:bg-yellow-50"
                  }`
                }
                style={{fontFamily: 'Inter'}}
              >
                Contact
              </NavLink>
              
              {/* Mobile Auth Section */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <div 
                        style={{
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '50%',
                          backgroundColor: '#9f891e', 
                          color: 'white',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontWeight: '600', 
                          fontSize: '14px'
                        }}
                      >
                        {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900" style={{fontFamily: 'Inter'}}>
                          {user.name || 'User'}
                        </div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    {user.role === 'ADMIN' && (
                      <>
                        <button 
                          onClick={() => { navigate('/admin'); setMobileMenuOpen(false); }}
                          className="w-full text-left px-3 py-2 text-sm text-yellow-700 hover:bg-yellow-50 transition-colors flex items-center space-x-2"
                        >
                          <span>👑</span>
                          <span>Admin Panel</span>
                        </button>
                        <button 
                          onClick={() => { navigate('/admin/dashboard'); setMobileMenuOpen(false); }}
                          className="w-full text-left px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50 transition-colors flex items-center space-x-2"
                        >
                          <span>📋</span>
                          <span>Pending Requests</span>
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      <span>👤</span>
                      <span>My Profile</span>
                    </button>
                    <button 
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                    >
                      <span>🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button 
                      onClick={() => { navigate('/premium-login'); setMobileMenuOpen(false); }}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg transition-all duration-200"
                      style={{fontFamily: 'Inter', backgroundColor: '#9f891e'}}
                    >
                      Get Reading
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
