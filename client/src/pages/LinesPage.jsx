import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const LinesPage = () => {
  const { user } = useAuth();
  
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
              Palm Lines
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              Discover the ancient wisdom hidden in your palm lines and what they reveal about your life
            </p>
                      </div>
        </div>
      </section>

      {/* Major Lines Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
              Major Palm Lines
            </h2>
            <p className="text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              The four most important lines in palmistry that reveal your life's journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Life Line */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Life Line</h3>
                <p className="text-lg mb-4" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                  The Life Line begins between the thumb and index finger and curves around the base of the thumb. It represents your vitality, physical health, and major life events.
                </p>
                <div className="space-y-2">
                  <p className="font-medium" style={{color: '#2D1E4F', fontFamily: 'Inter'}}>What it reveals:</p>
                  <ul className="list-disc list-inside space-y-1" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                    <li>Physical health and vitality</li>
                    <li>Major life changes and events</li>
                    <li>Longevity and well-being</li>
                    <li>Ability to overcome obstacles</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Heart Line */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Heart Line</h3>
                <p className="text-lg mb-4" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                  The Heart Line runs horizontally across the upper palm. It governs all matters of the heart, including emotional stability, romantic perspectives, and relationships.
                </p>
                <div className="space-y-2">
                  <p className="font-medium" style={{color: '#2D1E4F', fontFamily: 'Inter'}}>What it reveals:</p>
                  <ul className="list-disc list-inside space-y-1" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                    <li>Emotional stability and expression</li>
                    <li>Romantic relationships and love life</li>
                    <li>Cardiac health and emotional well-being</li>
                    <li>Capacity for love and compassion</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Head Line */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Head Line</h3>
                <p className="text-lg mb-4" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                  The Head Line starts from the palm edge near the Life Line and runs horizontally. It represents your mental approach, intellect, and communication style.
                </p>
                <div className="space-y-2">
                  <p className="font-medium" style={{color: '#2D1E4F', fontFamily: 'Inter'}}>What it reveals:</p>
                  <ul className="list-disc list-inside space-y-1" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                    <li>Intellectual abilities and learning style</li>
                    <li>Communication and expression</li>
                    <li>Mental approach to problem-solving</li>
                    <li>Creativity and analytical thinking</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Fate Line */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Fate Line</h3>
                <p className="text-lg mb-4" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                  The Fate Line runs vertically from the base of the palm toward the middle finger. It indicates the degree to which your life is affected by external circumstances.
                </p>
                <div className="space-y-2">
                  <p className="font-medium" style={{color: '#2D1E4F', fontFamily: 'Inter'}}>What it reveals:</p>
                  <ul className="list-disc list-inside space-y-1" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                    <li>Career path and professional success</li>
                    <li>Life direction and purpose</li>
                    <li>Impact of external circumstances</li>
                    <li>Degree of control over your destiny</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minor Lines Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
              Minor Lines & Special Signs
            </h2>
            <p className="text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              Additional lines and markings that provide deeper insights into your personality and future
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Marriage Line */}
            <div className="p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <h3 className="text-xl font-bold mb-3" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Marriage Line</h3>
              <p className="mb-3" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Located on the side of the palm below the little finger, indicating romantic relationships and marriage prospects.
              </p>
              <p className="text-sm" style={{color: '#5D4037', fontFamily: 'Inter'}}>
                <strong>Reveals:</strong> Marriage timing, relationship quality, number of significant relationships
              </p>
            </div>
            
            {/* Sun Line */}
            <div className="p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <h3 className="text-xl font-bold mb-3" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Sun Line</h3>
              <p className="mb-3" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Runs parallel to the Fate Line, representing fame, success, and recognition in your chosen field.
              </p>
              <p className="text-sm" style={{color: '#5D4037', fontFamily: 'Inter'}}>
                <strong>Reveals:</strong> Career success, public recognition, artistic talents, financial gains
              </p>
            </div>
            
            {/* Health Line */}
            <div className="p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <h3 className="text-xl font-bold mb-3" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Health Line</h3>
              <p className="mb-3" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Extends from the Life Line toward the little finger, indicating health patterns and wellness.
              </p>
              <p className="text-sm" style={{color: '#5D4037', fontFamily: 'Inter'}}>
                <strong>Reveals:</strong> Health tendencies, recovery ability, major health events
              </p>
            </div>
            
            {/* Travel Line */}
            <div className="p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <h3 className="text-xl font-bold mb-3" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Travel Line</h3>
              <p className="mb-3" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Lines that move toward the Luna mount, indicating journeys and travel opportunities.
              </p>
              <p className="text-sm" style={{color: '#5D4037', fontFamily: 'Inter'}}>
                <strong>Reveals:</strong> Travel opportunities, journeys, international connections
              </p>
            </div>
            
            {/* Intuition Line */}
            <div className="p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <h3 className="text-xl font-bold mb-3" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Intuition Line</h3>
              <p className="mb-3" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Curved line from the Life Line toward the Luna mount, representing psychic abilities and intuition.
              </p>
              <p className="text-sm" style={{color: '#5D4037', fontFamily: 'Inter'}}>
                <strong>Reveals:</strong> Intuitive abilities, psychic awareness, spiritual insights
              </p>
            </div>
            
            {/* Children Line */}
            <div className="p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <h3 className="text-xl font-bold mb-3" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Children Line</h3>
              <p className="mb-3" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Small vertical lines on the marriage area, indicating children and family relationships.
              </p>
              <p className="text-sm" style={{color: '#5D4037', fontFamily: 'Inter'}}>
                <strong>Reveals:</strong> Number of children, relationship with offspring, family happiness
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mounts Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
              Palm Mounts
            </h2>
            <p className="text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              The fleshy areas of your palm that reveal your personality traits and strengths
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Jupiter Mount */}
            <div className="text-center p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                <span className="text-2xl font-bold text-white">♃</span>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Jupiter Mount</h3>
              <p className="text-sm" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Leadership, ambition, spirituality, and authority
              </p>
            </div>
            
            {/* Saturn Mount */}
            <div className="text-center p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                <span className="text-2xl font-bold text-white">♄</span>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Saturn Mount</h3>
              <p className="text-sm" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Responsibility, discipline, wisdom, and perseverance
              </p>
            </div>
            
            {/* Apollo Mount */}
            <div className="text-center p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                <span className="text-2xl font-bold text-white">☉</span>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Apollo Mount</h3>
              <p className="text-sm" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Creativity, artistry, success, and recognition
              </p>
            </div>
            
            {/* Mercury Mount */}
            <div className="text-center p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                <span className="text-2xl font-bold text-white">☿</span>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Mercury Mount</h3>
              <p className="text-sm" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Communication, business, wit, and adaptability
              </p>
            </div>
            
            {/* Mars Mount */}
            <div className="text-center p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                <span className="text-2xl font-bold text-white">♂</span>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Mars Mount</h3>
              <p className="text-sm" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Courage, aggression, energy, and determination
              </p>
            </div>
            
            {/* Venus Mount */}
            <div className="text-center p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                <span className="text-2xl font-bold text-white">♀</span>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Venus Mount</h3>
              <p className="text-sm" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Love, beauty, sensuality, and social grace
              </p>
            </div>
            
            {/* Luna Mount */}
            <div className="text-center p-6 rounded-2xl" style={{backgroundColor: '#EADFD8'}}>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                <span className="text-2xl font-bold text-white">☽</span>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>Luna Mount</h3>
              <p className="text-sm" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                Imagination, intuition, creativity, and emotions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
              Ready to Understand Your Palm Lines?
            </h2>
            <p className="text-lg md:text-xl mb-8" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              Let our expert palm readers analyze your unique palm lines and reveal your life's hidden secrets
            </p>
            <Link
              to={user ? "/form" : "/premium-login"}
              className="px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-105 hover:shadow-lg text-lg"
              style={{backgroundColor: '#2D1E4F', fontFamily: 'Inter'}}
            >
              Get Professional Reading
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LinesPage;
