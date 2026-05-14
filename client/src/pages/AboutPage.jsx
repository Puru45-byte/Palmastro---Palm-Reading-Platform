import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
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
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#2D1E4F', fontFamily: 'Playfair Display', letterSpacing: '0.02em'}}>
              About Palmastro
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              Discover ancient wisdom through modern palmistry with our team of expert readers
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center flex-col-reverse md:flex-row">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
                Our Story
              </h2>
              <p className="text-lg mb-6" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Founded in 2020, Palmastro brings together ancient palmistry wisdom with modern technology to provide you with accurate, personalized readings from certified palm readers.
              </p>
              <p className="text-lg mb-6" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                We believe that everyone deserves access to genuine palmistry insights, which is why we've created a platform that connects you with experienced palmists who have studied this ancient art for decades.
              </p>
              <p className="text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Our mission is to make palmistry accessible, accurate, and affordable for everyone seeking guidance and self-discovery.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-96 rounded-2xl flex items-center justify-center" style={{backgroundColor: '#EADFD8', border: '3px solid #D4AF37'}}>
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Ancient Wisdom, Modern Access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
              Our Expertise
            </h2>
            <p className="text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              What makes Palmastro the trusted choice for palm readings
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{backgroundColor: '#D4AF37'}}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Certified Experts</h3>
              <p className="text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                All our palm readers are certified with years of experience in traditional palmistry
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{backgroundColor: '#D4AF37'}}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>24-Hour Delivery</h3>
              <p className="text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Get your detailed reading delivered to your email within 24 hours
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{backgroundColor: '#D4AF37'}}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Personalized Care</h3>
              <p className="text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Each reading is carefully crafted to address your specific questions and concerns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{color: '#D4AF37', fontFamily: 'Playfair Display'}}>10,000+</div>
              <p className="text-sm md:text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>Happy Clients</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{color: '#D4AF37', fontFamily: 'Playfair Display'}}>15+</div>
              <p className="text-sm md:text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>Expert Palmists</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{color: '#D4AF37', fontFamily: 'Playfair Display'}}>50,000+</div>
              <p className="text-sm md:text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>Readings Completed</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{color: '#D4AF37', fontFamily: 'Playfair Display'}}>4.9/5</div>
              <p className="text-sm md:text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
