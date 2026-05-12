import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Welcome Back, <span style={{color: '#D4AF37'}}>{user?.name || 'User'}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your palm reading journey continues...
              
              <div className="mt-8 text-center">
                <Link 
                  to="/" 
                  className="text-purple-600 hover:text-purple-500 transition-colors"
                >
                  ← Back to Main Page
                </Link>
              </div>
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Started</h3>
              <p className="text-gray-600 mb-6">Choose your next palm reading service</p>
              
              <div className="space-y-4">
                <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Start New Reading
                </button>
                
                <button className="w-full px-6 py-3 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                  View Your Readings
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
