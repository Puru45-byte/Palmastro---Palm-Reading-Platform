import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PalmReadingsPage = () => {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#F8F5F2'}}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D1E4F' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6" style={{color: '#2D1E4F', fontFamily: 'Playfair Display', letterSpacing: '0.02em'}}>
              Palm Readings
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              Discover what your palm lines reveal about your life, love, career, and destiny
            </p>
            <Link
              to="/form"
              className="px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-105 hover:shadow-lg text-lg"
              style={{backgroundColor: '#D4AF37', fontFamily: 'Inter'}}
            >
              Get Your Reading Now
            </Link>
          </div>
        </div>
      </section>

      {/* Reading Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
              Types of Palm Readings
            </h2>
            <p className="text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              Choose the reading that best suits your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Life Line Reading */}
            <div className="group cursor-pointer">
              <div className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{backgroundColor: '#EADFD8'}}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{backgroundColor: '#D4AF37'}}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Life Line Reading</h3>
                <p className="text-center mb-4" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                  Discover your vitality, life changes, and major events throughout your journey.
                </p>
                <div className="text-center">
                  <span className="text-2xl font-bold" style={{color: '#D4AF37', fontFamily: 'Playfair Display'}}>Rs. 149</span>
                </div>
              </div>
            </div>
            
            {/* Heart Line Reading */}
            <div className="group cursor-pointer">
              <div className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{backgroundColor: '#EADFD8'}}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{backgroundColor: '#D4AF37'}}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Heart Line Reading</h3>
                <p className="text-center mb-4" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                  Insights into your emotional life, relationships, and matters of the heart.
                </p>
                <div className="text-center">
                  <span className="text-2xl font-bold" style={{color: '#D4AF37', fontFamily: 'Playfair Display'}}>Rs. 149</span>
                </div>
              </div>
            </div>
            
            {/* Career Line Reading */}
            <div className="group cursor-pointer">
              <div className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{backgroundColor: '#EADFD8'}}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{backgroundColor: '#D4AF37'}}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Career Line Reading</h3>
                <p className="text-center mb-4" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                  Your professional path, success potential, and work-life balance.
                </p>
                <div className="text-center">
                  <span className="text-2xl font-bold" style={{color: '#D4AF37', fontFamily: 'Playfair Display'}}>Rs. 149</span>
                </div>
              </div>
            </div>
            
            {/* Complete Hand Analysis */}
            <div className="group cursor-pointer">
              <div className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{backgroundColor: '#EADFD8'}}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{backgroundColor: '#D4AF37'}}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Complete Hand Analysis</h3>
                <p className="text-center mb-4" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                  Comprehensive reading covering all aspects of your life and destiny.
                </p>
                <div className="text-center">
                  <span className="text-2xl font-bold" style={{color: '#D4AF37', fontFamily: 'Playfair Display'}}>Rs. 299</span>
                </div>
              </div>
            </div>
            
            {/* Marriage Line Reading */}
            <div className="group cursor-pointer">
              <div className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{backgroundColor: '#EADFD8'}}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{backgroundColor: '#D4AF37'}}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Marriage Line Reading</h3>
                <p className="text-center mb-4" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                  Insights into your marriage prospects, timing, and relationship compatibility.
                </p>
                <div className="text-center">
                  <span className="text-2xl font-bold" style={{color: '#D4AF37', fontFamily: 'Playfair Display'}}>Rs. 199</span>
                </div>
              </div>
            </div>
            
            {/* Health Line Reading */}
            <div className="group cursor-pointer">
              <div className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{backgroundColor: '#EADFD8'}}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{backgroundColor: '#D4AF37'}}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Health Line Reading</h3>
                <p className="text-center mb-4" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                  Understanding your health patterns and potential wellness indicators.
                </p>
                <div className="text-center">
                  <span className="text-2xl font-bold" style={{color: '#D4AF37', fontFamily: 'Playfair Display'}}>Rs. 199</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
              How It Works
            </h2>
            <p className="text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              Get your personalized palm reading in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto" style={{backgroundColor: '#D4AF37'}}>
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Submit Your Details</h3>
              <p className="text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Upload palm images + ask your question
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto" style={{backgroundColor: '#D4AF37'}}>
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Human Expert Analysis ⭐</h3>
              <p className="text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Your request is reviewed by real palmists (not AI)
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto" style={{backgroundColor: '#D4AF37'}}>
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Receive Your Answer</h3>
              <p className="text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Get a clear, personalized response in 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
              What Our Clients Say
            </h2>
            <p className="text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              Real experiences from people who discovered their path through palmistry
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-bold" style={{color: '#2D1E4F', fontFamily: 'Inter'}}>Priya Sharma</h4>
                  <div className="flex text-yellow-500">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
              <p style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                "The life line reading was incredibly accurate! It helped me make important decisions about my career change."
              </p>
            </div>
            
            <div className="p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-bold" style={{color: '#2D1E4F', fontFamily: 'Inter'}}>Rahul Patel</h4>
                  <div className="flex text-yellow-500">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
              <p style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                "Amazing insights about my relationship. The heart line reading gave me clarity I was seeking for months."
              </p>
            </div>
            
            <div className="p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-bold" style={{color: '#2D1E4F', fontFamily: 'Inter'}}>Anita Desai</h4>
                  <div className="flex text-yellow-500">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
              <p style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                "The complete hand analysis was worth every penny. Comprehensive and life-changing insights!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h2 className="text-4xl font-bold mb-6" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
              Ready to Discover Your Future?
            </h2>
            <p className="text-xl mb-8" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              Join thousands who have found clarity and guidance through our expert palm readings
            </p>
            <Link
              to="/form"
              className="px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-105 hover:shadow-lg text-lg"
              style={{backgroundColor: '#D4AF37', fontFamily: 'Inter'}}
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-16" style={{backgroundColor: '#2D1E4F'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{fontFamily: 'Playfair Display'}}>Palmastro</h3>
              <p className="text-gray-300" style={{fontFamily: 'Inter'}}>
                Discover ancient wisdom hidden in your palm lines with our expert readers.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{fontFamily: 'Inter'}}>Quick Links</h4>
              <ul className="space-y-2 text-gray-300" style={{fontFamily: 'Inter'}}>
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/palm-readings" className="hover:text-white transition-colors">Palm Readings</Link></li>
                <li><Link to="/lines" className="hover:text-white transition-colors">Lines</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{fontFamily: 'Inter'}}>Contact Info</h4>
              <p className="text-gray-300" style={{fontFamily: 'Inter'}}>
                Email: support@palmastro.com<br />
                Phone: +91 98765 43210<br />
                Address: Mumbai, Maharashtra, India
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-600 text-center">
            <p className="text-gray-400" style={{fontFamily: 'Inter'}}>
              © 2024 Palmastro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PalmReadingsPage;
