import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const BlogPage = () => {
  const { user } = useAuth();
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Your Life Line: A Complete Guide",
      excerpt: "Discover what your life line reveals about your health, vitality, and major life events in this comprehensive guide.",
      category: "Life Line",
      date: "April 15, 2024",
      readTime: "5 min read",
      image: "life-line",
      featured: true,
      pdfUrl: "/pdfs/Palmastro_Guide.pdf#page=6"
    },
    {
      id: 2,
      title: "Love and Relationships: What Your Heart Line Reveals",
      excerpt: "Learn how your heart line can provide insights into your romantic relationships and emotional well-being.",
      category: "Heart Line",
      date: "April 12, 2024",
      readTime: "6 min read",
      image: "heart-line",
      pdfUrl: "/pdfs/Palmastro_Guide.pdf#page=9"
    },
    {
      id: 3,
      title: "Career Success Through Your Fate Line",
      excerpt: "Explore how your fate line can guide your career decisions and professional development.",
      category: "Fate Line",
      date: "April 8, 2024",
      readTime: "4 min read",
      image: "fate-line",
      pdfUrl: "/pdfs/Palmastro_Guide.pdf#page=11"
    },
    {
      id: 4,
      title: "The Hidden Meanings of Palm Mounts",
      excerpt: "Discover the significance of the seven mounts on your palm and what they say about your personality.",
      category: "Palm Mounts",
      date: "April 5, 2024",
      readTime: "7 min read",
      image: "palm-mounts",
      pdfUrl: "/pdfs/Palmastro_Guide.pdf#page=13"
    },
    {
      id: 5,
      title: "Marriage Lines: Timing and Compatibility",
      excerpt: "Understanding marriage lines can help you predict relationship timing and compatibility with partners.",
      category: "Marriage Line",
      date: "April 1, 2024",
      readTime: "5 min read",
      image: "marriage-line",
      pdfUrl: "/pdfs/Palmastro_Guide.pdf#page=15"
    },
    {
      id: 6,
      title: "Health Indicators in Your Palm",
      excerpt: "Learn how palmistry can provide insights into your health patterns and potential wellness issues.",
      category: "Health Line",
      date: "March 28, 2024",
      readTime: "6 min read",
      image: "health-line",
      pdfUrl: "/pdfs/Palmastro_Guide.pdf#page=17"
    }
  ];

  const categories = ["All", "Life Line", "Heart Line", "Fate Line", "Palm Mounts", "Marriage Line", "Health Line"];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F5F2' }}>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#2D1E4F', fontFamily: 'Playfair Display', letterSpacing: '0.02em' }}>
              Palmistry Blog
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8" style={{ color: '#1C1C1C', fontFamily: 'Inter' }}>
              Discover ancient wisdom, learn palm reading techniques, and explore the mysteries hidden in your hands
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#2D1E4F', fontFamily: 'Playfair Display' }}>
              Featured Article
            </h2>
          </div>

          {blogPosts.filter(post => post.featured).map(post => (
            <div key={post.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full flex items-center justify-center overflow-hidden p-8" style={{ backgroundColor: '#2D1E4F' }}>
                    <img
                      src={post.pdfUrl ? "/pdfs/life-line-cover.png" : undefined}
                      alt={post.title}
                      className="h-full max-h-[280px] w-auto object-contain rounded-lg shadow-lg"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: '#D4AF37', color: 'white', fontFamily: 'Inter' }}>
                      {post.category}
                    </span>
                    <span className="text-sm" style={{ color: '#5D4037', fontFamily: 'Inter' }}>{post.date}</span>
                    <span className="text-sm" style={{ color: '#5D4037', fontFamily: 'Inter' }}>{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#2D1E4F', fontFamily: 'Playfair Display' }}>
                    {post.title}
                  </h3>
                  <p className="text-lg mb-6" style={{ color: '#1C1C1C', fontFamily: 'Inter' }}>
                    {post.excerpt}
                  </p>
                  <button
                    onClick={() => post.pdfUrl ? window.open(post.pdfUrl, '_blank') : null}
                    className="inline-block px-6 py-3 rounded-full font-medium transition-all hover:scale-105 text-center"
                    style={{ backgroundColor: '#2D1E4F', color: 'white', fontFamily: 'Inter' }}
                  >
                    Read Full Article
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full font-medium transition-all hover:scale-105 ${category === 'All'
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                style={{ fontFamily: 'Inter' }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map(post => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
                {/* Image Placeholder replaced with Cover */}
                <div className="h-48 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#2D1E4F' }}>
                  <img 
                    src={post.pdfUrl ? "/pdfs/life-line-cover.png" : undefined}
                    alt={post.title}
                    className="h-full w-auto object-contain p-4"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#D4AF37', color: 'white', fontFamily: 'Inter' }}>
                      {post.category}
                    </span>
                    <span className="text-xs" style={{ color: '#5D4037', fontFamily: 'Inter' }}>{post.date}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ color: '#2D1E4F', fontFamily: 'Playfair Display' }}>
                    {post.title}
                  </h3>

                  <p className="mb-4" style={{ color: '#1C1C1C', fontFamily: 'Inter' }}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#5D4037', fontFamily: 'Inter' }}>{post.readTime}</span>
                    <button 
                      onClick={() => post.pdfUrl ? window.open(post.pdfUrl, '_blank') : null}
                      className="text-sm font-medium hover:underline" 
                      style={{ color: '#2D1E4F', fontFamily: 'Inter' }}
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#2D1E4F', fontFamily: 'Playfair Display' }}>
              Stay Updated with Palmistry Insights
            </h2>
            <p className="text-lg md:text-xl mb-8" style={{ color: '#1C1C1C', fontFamily: 'Inter' }}>
              Get weekly articles about palmistry, astrology, and spiritual wisdom delivered to your inbox
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full border-2 focus:outline-none"
                  style={{ borderColor: '#D4AF37', fontFamily: 'Inter' }}
                />
                <button
                  className="px-6 py-3 rounded-full text-white font-medium transition-all hover:scale-105"
                  style={{ backgroundColor: '#2D1E4F', fontFamily: 'Inter' }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#2D1E4F', fontFamily: 'Playfair Display' }}>
              Popular Topics
            </h2>
            <p className="text-lg" style={{ color: '#1C1C1C', fontFamily: 'Inter' }}>
              Explore our most-read articles and discover what others are learning about palmistry
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              "Beginner's Guide to Palm Reading",
              "Love and Relationships",
              "Career and Success",
              "Health and Wellness",
              "Marriage Compatibility",
              "Financial Success Signs",
              "Spiritual Growth",
              "Timing Major Life Events"
            ].map((topic, index) => (
              <div key={index} className="p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: '#EADFD8' }}>
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2" style={{ color: '#2D1E4F', fontFamily: 'Inter' }}>{topic}</h3>
                <p className="text-sm" style={{ color: '#5D4037', fontFamily: 'Inter' }}>12 articles</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#2D1E4F', fontFamily: 'Playfair Display' }}>
              Ready to Discover Your Palm's Secrets?
            </h2>
            <p className="text-lg md:text-xl mb-8" style={{ color: '#1C1C1C', fontFamily: 'Inter' }}>
              After learning about palmistry, get a professional reading to uncover what your hands reveal about you
            </p>
            {user ? (
              <Link
                to="/form"
                className="inline-block px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-105 hover:shadow-lg text-lg text-center"
                style={{ backgroundColor: '#2D1E4F', fontFamily: 'Inter' }}
              >
                Get Professional Reading
              </Link>
            ) : (
              <Link
                to="/premium-login"
                className="inline-block px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-105 hover:shadow-lg text-lg text-center"
                style={{ backgroundColor: '#2D1E4F', fontFamily: 'Inter' }}
              >
                Get Professional Reading
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogPage;
