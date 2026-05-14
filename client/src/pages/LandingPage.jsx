import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import palmImage from '../assets/palm-illustration.png';
import cardBg from '../assets/card.png';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="min-h-screen" style={{ backgroundColor: '#f5f0eb' }}>
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
        <section className="relative px-4 sm:px-6 md:px-12 lg:px-20 py-16 md:py-0" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-0">

              {/* LEFT SIDE */}
              <div className="w-full lg:pr-5 text-center lg:text-left flex flex-col items-center lg:items-start order-2 lg:order-1">
                <p
                  className="font-medium"
                  style={{ color: '#b8960c', fontSize: 'clamp(14px, 2vw, 15px)', fontWeight: '500', marginBottom: '18px', letterSpacing: '0.3px', fontFamily: 'Inter' }}
                >
                  Discover Yourself
                </p>

                <h1
                  className="font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 46px)', fontWeight: '700', lineHeight: '1.2', marginBottom: '20px' }}
                >
                  Unlock the <span style={{ color: '#b8960c' }}>Secrets</span><br className="hidden sm:block" />
                  of <span style={{ color: '#b8960c' }}>Your Hand</span>
                </h1>

                <p
                  style={{
                    color: '#666666',
                    fontSize: 'clamp(15px, 2vw, 17px)',
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

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-fit justify-center lg:justify-start">
                  <button
                    onClick={() => navigate(user ? "/form" : "/premium-login")}
                    className="font-medium transition-all hover:scale-105"
                    style={{
                      background: '#2D1E4F',
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
                    onClick={() => navigate('/palm-readings')}
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
              <div className="flex justify-center items-center w-full mt-0 mb-4 lg:mb-0 lg:mt-0 order-1 lg:order-2">
                <div
                  className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] lg:-mr-[150px]"
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
                  <span style={{ position: 'absolute', top: '20px', right: '30px', fontSize: '24px', color: '#b8960c', textShadow: '0 0 8px rgba(255,255,255,0.8)' }}>✦</span>
                  <span style={{ position: 'absolute', bottom: '30px', left: '25px', fontSize: '20px', color: '#b8960c', textShadow: '0 0 8px rgba(255,255,255,0.8)' }}>★</span>
                  <span style={{ position: 'absolute', top: '60px', left: '40px', fontSize: '18px', color: '#b8960c', textShadow: '0 0 8px rgba(255,255,255,0.8)' }}>✦</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add white space between sections */}
        <div style={{ height: '80px', backgroundColor: 'transparent' }}></div>

        {/* SECTION 2: EXPLORE PALM LINES */}
        <section className="relative py-12 md:py-20" style={{ backgroundColor: 'transparent' }}>
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
                style={{ color: '#555', fontSize: '16px', fontFamily: 'Inter' }}
              >
                Each line tells a story about your life journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Life Line */}
              <div
                className="text-center rounded-2xl p-8 transition-all hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: '#e8e0d5' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: '#b8960c' }}
                >
                  <span style={{ fontSize: '24px' }}>❤️</span>
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
                <p style={{ color: '#555', fontSize: '14px', fontFamily: 'Inter' }}>
                  Reveals your vitality, life changes, and major events throughout your journey.
                </p>
              </div>

              {/* Card 2: Heart Line */}
              <div
                className="text-center rounded-2xl p-8 transition-all hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: '#e8e0d5' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: '#b8960c' }}
                >
                  <span style={{ fontSize: '24px' }}>💕</span>
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
                <p style={{ color: '#555', fontSize: '14px', fontFamily: 'Inter' }}>
                  Insights into your emotional life, relationships, and matters of heart.
                </p>
              </div>

              {/* Card 3: Career Line */}
              <div
                className="text-center rounded-2xl p-8 transition-all hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: '#e8e0d5' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: '#b8960c' }}
                >
                  <span style={{ fontSize: '24px' }}>💼</span>
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
                <p style={{ color: '#555', fontSize: '14px', fontFamily: 'Inter' }}>
                  Your professional path, success potential, and work-life balance.
                </p>
              </div>

              {/* Card 4: Hand Analysis */}
              <div
                className="text-center rounded-2xl p-8 transition-all hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: '#e8e0d5' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: '#b8960c' }}
                >
                  <span style={{ fontSize: '24px' }}>✋</span>
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
                <p style={{ color: '#555', fontSize: '14px', fontFamily: 'Inter' }}>
                  Complete palm reading covering all aspects of your life and destiny.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: HOW IT WORKS */}
        <section className="py-12 md:py-20" style={{ backgroundColor: 'transparent' }}>
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
                style={{ color: '#555', fontSize: '16px', fontFamily: 'Inter' }}
              >
                Get your personalized palm reading in 3 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: '#b8960c' }}
                >
                  <span style={{ fontSize: '32px', color: 'white' }}>📷</span>
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
                <p style={{ color: '#555', fontSize: '14px', fontFamily: 'Inter' }}>
                  Take clear photos of both your palms and upload them securely
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: '#b8960c' }}
                >
                  <span style={{ fontSize: '32px', color: 'white' }}>🤚</span>
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
                <p style={{ color: '#555', fontSize: '14px', fontFamily: 'Inter' }}>
                  Share what you want to know about your future, career, or relationships
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: '#b8960c' }}
                >
                  <span style={{ fontSize: '32px', color: 'white' }}>✓</span>
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
                <p style={{ color: '#555', fontSize: '14px', fontFamily: 'Inter' }}>
                  Receive detailed palm reading analysis via email within 24 hours
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CALL TO ACTION CARD */}
        <section className="flex justify-center w-full pb-10 md:pb-16 pt-5" style={{ backgroundColor: 'transparent' }}>
          
          {/* === MOBILE / TABLET VERSION (stacked card) === */}
          <div className="block md:hidden w-[92%] max-w-[500px] mx-auto rounded-[20px] overflow-hidden" style={{ backgroundColor: '#FFFDF9', boxShadow: '0 12px 40px rgba(80,40,120,0.12)', border: '1px solid rgba(212,175,55,0.15)' }}>
            {/* Card Image */}
            <div className="w-full h-[180px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #f3ece4 0%, #e8ddd2 100%)' }}>
              <img src={cardBg} alt="Palm Reading" className="w-full h-full object-cover object-right" />
            </div>

            {/* Card Content */}
            <div className="px-5 py-6">
              <div className="inline-flex items-center rounded-full mb-3" style={{ backgroundColor: 'rgba(212,175,55,0.1)', padding: '4px 12px' }}>
                <span style={{ fontSize: '9px', fontWeight: '700', color: '#6A4B1F', letterSpacing: '1.2px', fontFamily: 'Inter' }}>
                  100% HUMAN • SECURE • PRIVATE
                </span>
              </div>

              <h2 style={{ color: '#24104D', fontSize: '26px', fontFamily: "'Playfair Display', serif", fontWeight: '700', lineHeight: '1.15', marginBottom: '10px' }}>
                Unlock the <span style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D77A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Secrets</span><br/>
                of Your Palm
              </h2>

              <p style={{ color: '#4A3B63', fontSize: '14px', fontFamily: 'Inter', lineHeight: '1.6', marginBottom: '16px' }}>
                Get personalized insights about love, career, marriage, wealth, and your life path from expert palmists.
              </p>

              {/* Mini feature row */}
              <div className="grid grid-cols-4 gap-2 mb-5">
                {[
                  { emoji: '👨‍💼', label: 'Real Palmists' },
                  { emoji: '🔒', label: 'Secure' },
                  { emoji: '📧', label: 'Via Email' },
                  { emoji: '⏰', label: '24 Hours' }
                ].map((f, i) => (
                  <div key={i} className="flex flex-col items-center text-center rounded-lg py-2" style={{ backgroundColor: 'rgba(212,175,55,0.06)' }}>
                    <span className="text-lg mb-1">{f.emoji}</span>
                    <span style={{ fontSize: '9px', color: '#24104D', fontWeight: '600', fontFamily: 'Inter', lineHeight: '1.2' }}>{f.label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate(user ? "/form" : "/premium-login")}
                className="w-full flex items-center justify-center gap-2 transition-all hover:shadow-xl"
                style={{ background: '#2D0B59', color: 'white', borderRadius: '999px', padding: '13px 24px', fontSize: '15px', border: 'none', cursor: 'pointer', fontFamily: "'Playfair Display', serif", fontWeight: '600', boxShadow: '0 6px 16px rgba(45,11,89,0.3)' }}
              >
                <span style={{ color: '#D4AF37', fontSize: '16px' }}>✦</span> Reveal My Palm Reading →
              </button>
            </div>
          </div>

          {/* === DESKTOP VERSION (image overlay - original) === */}
          <div className="hidden md:flex relative mx-auto w-[95%] max-w-[1100px] items-center justify-center">
            <img 
              src={cardBg} 
              alt="Unlock the Secrets of Your Palm" 
              className="w-full h-auto object-contain block"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(80,40,120,0.1))' }}
            />

            {/* LEFT CONTENT OVERLAY (Absolute) */}
            <div className="absolute inset-0 z-10 w-full flex flex-col justify-center px-[8%] py-[4%]">
              <div className="w-full max-w-[420px]">
                <div className="inline-flex items-center rounded-full shadow-sm w-fit" style={{ backgroundColor: 'rgba(255,248,240,0.92)', padding: '6px 14px', marginBottom: '4%', boxShadow: '0 4px 10px rgba(106,75,31,0.08)' }}>
                  <span style={{ fontSize: 'clamp(9px, 1vw, 11px)', fontWeight: '700', color: '#6A4B1F', letterSpacing: '1.5px', fontFamily: 'Inter' }}>
                    100% HUMAN • SECURE • PRIVATE
                  </span>
                </div>

                <h2 style={{ color: '#24104D', fontSize: 'clamp(28px, 4vw, 56px)', fontFamily: "'Playfair Display', serif", fontWeight: '700', lineHeight: '1.05', letterSpacing: '-1px', textShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  Unlock the <span style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D77A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Secrets</span><br/>
                  of Your Palm
                </h2>

                <p style={{ color: '#4A3B63', fontSize: 'clamp(14px, 1.4vw, 18px)', fontFamily: 'Inter', lineHeight: '1.6', marginTop: '4%', marginBottom: '5%' }}>
                  Get personalized insights about love, career, marriage, wealth, and your life path from expert palmists.
                </p>
                
                <div className="grid grid-cols-4 gap-3" style={{ marginBottom: '6%', width: '100%', maxWidth: '380px' }}>
                  {[
                    { icon: <svg fill="#24104D" viewBox="0 0 24 24" width="20" height="20"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, text: 'Real Palmists\nNot AI' },
                    { icon: <svg fill="#24104D" viewBox="0 0 24 24" width="20" height="20"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>, text: 'Secure &\nPrivate' },
                    { icon: <svg fill="#24104D" viewBox="0 0 24 24" width="20" height="20"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>, text: 'Delivered to\nYour Email' },
                    { icon: <svg fill="#24104D" viewBox="0 0 24 24" width="20" height="20"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>, text: 'Within\n24 Hours' }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center text-center rounded-[12px] shadow-sm transition-transform hover:-translate-y-1 h-[85px]" style={{ backgroundColor: 'rgba(255,255,255,0.68)', backdropFilter: 'blur(8px)', padding: '10px 6px', border: '1px solid rgba(255,255,255,0.8)' }}>
                      <span className="mb-1">{feature.icon}</span>
                      <span style={{ fontSize: 'clamp(10px, 1vw, 12px)', color: '#24104D', fontWeight: '600', lineHeight: '1.2', whiteSpace: 'pre-line', fontFamily: 'Inter' }}>{feature.text}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate(user ? "/form" : "/premium-login")}
                  className="flex items-center justify-center gap-2 transition-all hover:-translate-y-[2px] hover:shadow-xl w-fit"
                  style={{ background: '#2D0B59', color: 'white', borderRadius: '999px', padding: '14px 28px', fontSize: 'clamp(14px, 1.5vw, 20px)', border: 'none', cursor: 'pointer', fontFamily: "'Playfair Display', serif", fontWeight: '600', boxShadow: '0 8px 20px rgba(45,11,89,0.35)' }}
                >
                  <span style={{ color: '#D4AF37', fontSize: '18px' }}>✦</span> Reveal My Palm Reading →
                </button>
                
                <div className="flex items-center" style={{ marginTop: '4%' }}>
                  <div className="flex -space-x-2 mr-3">
                    <div className="w-[28px] h-[28px] rounded-full border-[2px] border-[#FFF8F0] bg-gray-300 overflow-hidden"><img src="https://i.pravatar.cc/100?img=1" alt="user" className="w-full h-full object-cover" /></div>
                    <div className="w-[28px] h-[28px] rounded-full border-[2px] border-[#FFF8F0] bg-gray-300 overflow-hidden"><img src="https://i.pravatar.cc/100?img=5" alt="user" className="w-full h-full object-cover" /></div>
                    <div className="w-[28px] h-[28px] rounded-full border-[2px] border-[#FFF8F0] bg-gray-300 overflow-hidden"><img src="https://i.pravatar.cc/100?img=3" alt="user" className="w-full h-full object-cover" /></div>
                    <div className="w-[28px] h-[28px] rounded-full border-[2px] border-[#FFF8F0] bg-gray-300 overflow-hidden"><img src="https://i.pravatar.cc/100?img=8" alt="user" className="w-full h-full object-cover" /></div>
                  </div>
                  <span style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', color: '#4A3B63', fontFamily: 'Inter', fontWeight: '500' }}>Trusted by seekers worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </div>
    </Fragment>
  );
};

export default LandingPage;
