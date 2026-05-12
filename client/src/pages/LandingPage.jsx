import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import palmImage from '../assets/palm-illustration.png';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="min-h-screen" style={{backgroundColor: '#f5f0eb'}}>
        {/* Background dot pattern */}
        <div 
          className="fixed inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#d4c5b0 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <Navbar />

        {/* SECTION 1: HERO */}
        <section className="relative" style={{minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '0 60px 0 80px'}}>
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{gap: '0'}}>
              
              {/* LEFT SIDE */}
              <div style={{width: '70%', paddingRight: '20px'}}>
                <p 
                  className="font-medium" 
                  style={{color: '#b8960c', fontSize: '15px', fontWeight: '500', marginBottom: '18px', letterSpacing: '0.3px', fontFamily: 'Inter'}}
                >
                  Discover Yourself
                </p>
                
                <h1 
                  className="font-bold" 
                  style={{fontFamily: "'Playfair Display', serif", fontSize: '46px', fontWeight: '700', lineHeight: '1.2', marginBottom: '20px', whiteSpace: 'nowrap'}}
                >
                  Unlock the <span style={{color: '#b8960c'}}>Secrets</span><br/>
                  of <span style={{color: '#b8960c'}}>Your Hand</span>
                </h1>
                
                <p 
                  style={{
                    color: '#666666', 
                    fontSize: '17px', 
                    lineHeight: '1.75', 
                    maxWidth: '440px',
                    marginBottom: '40px',
                    fontFamily: 'Inter'
                  }}
                >
                  Discover the ancient wisdom hidden in your palm lines. Our expert 
                  palm readers provide personalized insights into your life path, 
                  relationships, and future possibilities.
                </p>
                
                <div style={{display: 'flex', gap: '16px', width: 'fit-content'}}>
                  <button
                    onClick={() => navigate(user ? "/form" : "/premium-login")}
                    className="font-medium transition-all hover:scale-105"
                    style={{
                      background: '#b8960c', 
                      color: 'white', 
                      borderRadius: '50px',
                      padding: '15px 36px', 
                      fontSize: '16px',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'Inter',
                      minWidth: 'auto'
                    }}
                  >
                    Get Started
                  </button>
                  
                  <button
                    className="font-medium transition-all hover:bg-gray-50"
                    style={{
                      background: 'transparent', 
                      color: '#1a1a3e', 
                      border: '2px solid #1a1a3e', 
                      borderRadius: '50px',
                      padding: '13px 34px', 
                      fontSize: '16px',
                      cursor: 'pointer',
                      fontFamily: 'Inter',
                      minWidth: 'auto'
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
              
              {/* RIGHT SIDE */}
              <div className="flex justify-center items-center" style={{width: '55%'}}>
                <div 
                  className="relative"
                  style={{
                    width: '500px', 
                    height: '500px',
                    right: '-220px'
                  }}
                >
                  {/* Palm image */}
                  <img 
                    src={palmImage} 
                    alt="Palm Reading" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center'
                    }}
                  />
                  
                  {/* Decorative stars */}
                  <span style={{position: 'absolute', top: '20px', right: '30px', fontSize: '24px', color: '#b8960c', textShadow: '0 0 8px rgba(255,255,255,0.8)'}}>✦</span>
                  <span style={{position: 'absolute', bottom: '30px', left: '25px', fontSize: '20px', color: '#b8960c', textShadow: '0 0 8px rgba(255,255,255,0.8)'}}>★</span>
                  <span style={{position: 'absolute', top: '60px', left: '40px', fontSize: '18px', color: '#b8960c', textShadow: '0 0 8px rgba(255,255,255,0.8)'}}>✦</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add white space between sections */}
        <div style={{height: '80px', backgroundColor: '#f5f0eb'}}></div>

        {/* SECTION 2: EXPLORE PALM LINES */}
        <section className="relative" style={{backgroundColor: '#f5f0eb', padding: '80px 0'}}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 
                className="font-bold mb-4" 
                style={{
                  color: '#1a1a3e', 
                  fontSize: '36px', 
                  fontFamily: 'Playfair Display'
                }}
              >
                Explore Your Palm Lines
              </h2>
              <p 
                className="text-center" 
                style={{color: '#555', fontSize: '16px', fontFamily: 'Inter'}}
              >
                Each line tells a story about your life journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Life Line */}
              <div 
                className="text-center rounded-2xl p-8 transition-all hover:scale-105 hover:shadow-xl"
                style={{backgroundColor: '#e8e0d5'}}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{backgroundColor: '#b8960c'}}
                >
                  <span style={{fontSize: '24px'}}>❤️</span>
                </div>
                <h3 
                  className="font-bold mb-3" 
                  style={{
                    color: '#1a1a3e', 
                    fontSize: '18px', 
                    fontFamily: 'Playfair Display'
                  }}
                >
                  Life Line
                </h3>
                <p style={{color: '#555', fontSize: '14px', fontFamily: 'Inter'}}>
                  Reveals your vitality, life changes, and major events throughout your journey.
                </p>
              </div>

              {/* Card 2: Heart Line */}
              <div 
                className="text-center rounded-2xl p-8 transition-all hover:scale-105 hover:shadow-xl"
                style={{backgroundColor: '#e8e0d5'}}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{backgroundColor: '#b8960c'}}
                >
                  <span style={{fontSize: '24px'}}>💕</span>
                </div>
                <h3 
                  className="font-bold mb-3" 
                  style={{
                    color: '#1a1a3e', 
                    fontSize: '18px', 
                    fontFamily: 'Playfair Display'
                  }}
                >
                  Heart Line
                </h3>
                <p style={{color: '#555', fontSize: '14px', fontFamily: 'Inter'}}>
                  Insights into your emotional life, relationships, and matters of heart.
                </p>
              </div>

              {/* Card 3: Career Line */}
              <div 
                className="text-center rounded-2xl p-8 transition-all hover:scale-105 hover:shadow-xl"
                style={{backgroundColor: '#e8e0d5'}}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{backgroundColor: '#b8960c'}}
                >
                  <span style={{fontSize: '24px'}}>💼</span>
                </div>
                <h3 
                  className="font-bold mb-3" 
                  style={{
                    color: '#1a1a3e', 
                    fontSize: '18px', 
                    fontFamily: 'Playfair Display'
                  }}
                >
                  Career Line
                </h3>
                <p style={{color: '#555', fontSize: '14px', fontFamily: 'Inter'}}>
                  Your professional path, success potential, and work-life balance.
                </p>
              </div>

              {/* Card 4: Hand Analysis */}
              <div 
                className="text-center rounded-2xl p-8 transition-all hover:scale-105 hover:shadow-xl"
                style={{backgroundColor: '#e8e0d5'}}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{backgroundColor: '#b8960c'}}
                >
                  <span style={{fontSize: '24px'}}>✋</span>
                </div>
                <h3 
                  className="font-bold mb-3" 
                  style={{
                    color: '#1a1a3e', 
                    fontSize: '18px', 
                    fontFamily: 'Playfair Display'
                  }}
                >
                  Hand Analysis
                </h3>
                <p style={{color: '#555', fontSize: '14px', fontFamily: 'Inter'}}>
                  Complete palm reading covering all aspects of your life and destiny.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: HOW IT WORKS */}
        <section style={{backgroundColor: '#ede5da', padding: '80px 0'}}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 
                className="font-bold mb-4" 
                style={{
                  color: '#1a1a3e', 
                  fontSize: '36px', 
                  fontFamily: 'Playfair Display'
                }}
              >
                How It Works
              </h2>
              <p 
                className="text-center" 
                style={{color: '#555', fontSize: '16px', fontFamily: 'Inter'}}
              >
                Get your personalized palm reading in 3 simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{backgroundColor: '#b8960c'}}
                >
                  <span style={{fontSize: '32px', color: 'white'}}>📷</span>
                </div>
                <h3 
                  className="font-bold mb-3" 
                  style={{
                    color: '#1a1a3e', 
                    fontSize: '18px', 
                    fontFamily: 'Inter'
                  }}
                >
                  Upload Palm Images
                </h3>
                <p style={{color: '#555', fontSize: '14px', fontFamily: 'Inter'}}>
                  Take clear photos of both your palms and upload them securely
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{backgroundColor: '#b8960c'}}
                >
                  <span style={{fontSize: '32px', color: 'white'}}>🤚</span>
                </div>
                <h3 
                  className="font-bold mb-3" 
                  style={{
                    color: '#1a1a3e', 
                    fontSize: '18px', 
                    fontFamily: 'Inter'
                  }}
                >
                  Ask Your Question
                </h3>
                <p style={{color: '#555', fontSize: '14px', fontFamily: 'Inter'}}>
                  Share what you want to know about your future, career, or relationships
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{backgroundColor: '#b8960c'}}
                >
                  <span style={{fontSize: '32px', color: 'white'}}>✓</span>
                </div>
                <h3 
                  className="font-bold mb-3" 
                  style={{
                    color: '#1a1a3e', 
                    fontSize: '18px', 
                    fontFamily: 'Inter'
                  }}
                >
                  Get Your Answer
                </h3>
                <p style={{color: '#555', fontSize: '14px', fontFamily: 'Inter'}}>
                  Receive detailed palm reading analysis via email within 24 hours
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: PRICING CARD */}
        <section style={{backgroundColor: '#ede5da', padding: '60px 0'}}>
          <div className="max-w-4xl mx-auto px-4">
            <div 
              className="text-center rounded-3xl p-12"
              style={{backgroundColor: 'white'}}
            >
              <h2 
                className="font-bold mb-4" 
                style={{
                  color: '#9f891eff', 
                  fontSize: '32px', 
                  fontFamily: 'Playfair Display'
                }}
              >
                Get Your Palm Reading
              </h2>
              <p 
                className="mb-8" 
                style={{color: '#555', fontSize: '16px', fontFamily: 'Inter'}}
              >
                Get personalized insights about your future from our expert palm readers
              </p>
              
              <div 
                className="rounded-2xl p-8 mb-6"
                style={{backgroundColor: '#b8960c'}}
              >
                <div 
                  className="font-bold mb-2" 
                  style={{color: 'white', fontSize: '40px'}}
                >
                  Rs. 149
                </div>
                <div style={{color: 'white', fontSize: '16px', opacity: 0.9}}>
                  One-time payment
                </div>
                <div style={{color: 'white', fontSize: '14px', opacity: 0.8, marginTop: '4px'}}>
                  Professional palm reading analysis
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => navigate(user ? "/form" : "/premium-login")}
                  className="font-medium transition-all hover:scale-105 mx-auto"
                  style={{
                    background: '#b8960c', 
                    color: 'white', 
                    borderRadius: '30px',
                    padding: '16px 40px', 
                    fontSize: '16px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-block',
                    fontFamily: 'Inter'
                  }}
                >
                  Get Started Now
                </button>
                
                <p 
                  className="mt-3" 
                  style={{color: '#555', fontSize: '13px', fontFamily: 'Inter'}}
                >
                  ⚡ Instant access • 🔒 Secure payment • 📧 Email delivery
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{backgroundColor: '#2d1b4e', padding: '60px 80px 30px'}}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Column 1 */}
              <div>
                <h3 
                  className="font-bold mb-3" 
                  style={{
                    color: 'white', 
                    fontSize: '22px', 
                    fontFamily: 'Playfair Display'
                  }}
                >
                  Palmistry
                </h3>
                <p 
                  style={{
                    color: 'rgba(255,255,255,0.7)', 
                    fontSize: '14px', 
                    maxWidth: '260px',
                    marginTop: '12px',
                    fontFamily: 'Inter'
                  }}
                >
                  Discover ancient wisdom hidden in your palm lines with our expert readers.
                </p>
              </div>

              {/* Column 2 */}
              <div>
                <h4 
                  className="font-bold mb-4" 
                  style={{color: 'white', fontSize: '18px', fontFamily: 'Inter'}}
                >
                  Quick Links
                </h4>
                <ul style={{color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: '2.2', fontFamily: 'Inter'}}>
                  <li className="mb-2"><Link to="/about" style={{color: 'inherit', textDecoration: 'none'}}>About Us</Link></li>
                  <li className="mb-2"><Link to="/services" style={{color: 'inherit', textDecoration: 'none'}}>Services</Link></li>
                  <li className="mb-2"><Link to="/blog" style={{color: 'inherit', textDecoration: 'none'}}>Blog</Link></li>
                  <li className="mb-2"><Link to="/contact" style={{color: 'inherit', textDecoration: 'none'}}>Contact</Link></li>
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <h4 
                  className="font-bold mb-4" 
                  style={{color: 'white', fontSize: '18px', fontFamily: 'Inter'}}
                >
                  Contact Info
                </h4>
                <div style={{color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: '2.2', fontFamily: 'Inter'}}>
                  <div>Email: support@palmistry.com</div>
                  <div>Phone: +91 98765 43210</div>
                  <div>Location: Mumbai, India</div>
                </div>
              </div>
            </div>

            <div 
              className="border-t mt-10 pt-5 text-center"
              style={{borderColor: 'rgba(255,255,255,0.2)'}}
            >
              <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontFamily: 'Inter'}}>
                © 2024 Palmistry. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default LandingPage;
