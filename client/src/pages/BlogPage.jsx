import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
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
      featured: true
    },
    {
      id: 2,
      title: "Love and Relationships: What Your Heart Line Reveals",
      excerpt: "Learn how your heart line can provide insights into your romantic relationships and emotional well-being.",
      category: "Heart Line",
      date: "April 12, 2024",
      readTime: "6 min read",
      image: "heart-line"
    },
    {
      id: 3,
      title: "Career Success Through Your Fate Line",
      excerpt: "Explore how your fate line can guide your career decisions and professional development.",
      category: "Fate Line",
      date: "April 8, 2024",
      readTime: "4 min read",
      image: "fate-line"
    },
    {
      id: 4,
      title: "The Hidden Meanings of Palm Mounts",
      excerpt: "Discover the significance of the seven mounts on your palm and what they say about your personality.",
      category: "Palm Mounts",
      date: "April 5, 2024",
      readTime: "7 min read",
      image: "palm-mounts"
    },
    {
      id: 5,
      title: "Marriage Lines: Timing and Compatibility",
      excerpt: "Understanding marriage lines can help you predict relationship timing and compatibility with partners.",
      category: "Marriage Line",
      date: "April 1, 2024",
      readTime: "5 min read",
      image: "marriage-line"
    },
    {
      id: 6,
      title: "Health Indicators in Your Palm",
      excerpt: "Learn how palmistry can provide insights into your health patterns and potential wellness issues.",
      category: "Health Line",
      date: "March 28, 2024",
      readTime: "6 min read",
      image: "health-line"
    }
  ];

  const categories = ["All", "Life Line", "Heart Line", "Fate Line", "Palm Mounts", "Marriage Line", "Health Line"];

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
              Palmistry Blog
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              Discover ancient wisdom, learn palm reading techniques, and explore the mysteries hidden in your hands
            </p>
                      </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
              Featured Article
            </h2>
          </div>
          
          {blogPosts.filter(post => post.featured).map(post => (
            <div key={post.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full flex items-center justify-center" style={{backgroundColor: '#EADFD8'}}>
                    <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: '#D4AF37', color: 'white', fontFamily: 'Inter'}}>
                      {post.category}
                    </span>
                    <span className="text-sm" style={{color: '#5D4037', fontFamily: 'Inter'}}>{post.date}</span>
                    <span className="text-sm" style={{color: '#5D4037', fontFamily: 'Inter'}}>{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
                    {post.title}
                  </h3>
                  <p className="text-lg mb-6" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                    {post.excerpt}
                  </p>
                  <button className="px-6 py-3 rounded-full font-medium transition-all hover:scale-105" style={{backgroundColor: '#2D1E4F', color: 'white', fontFamily: 'Inter'}}>
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
                className={`px-6 py-2 rounded-full font-medium transition-all hover:scale-105 ${
                  category === 'All' 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                style={{fontFamily: 'Inter'}}
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
                {/* Image Placeholder */}
                <div className="h-48 flex items-center justify-center" style={{backgroundColor: '#EADFD8'}}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{backgroundColor: '#D4AF37', color: 'white', fontFamily: 'Inter'}}>
                      {post.category}
                    </span>
                    <span className="text-xs" style={{color: '#5D4037', fontFamily: 'Inter'}}>{post.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
                    {post.title}
                  </h3>
                  
                  <p className="mb-4" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{color: '#5D4037', fontFamily: 'Inter'}}>{post.readTime}</span>
                    <button className="text-sm font-medium hover:underline" style={{color: '#2D1E4F', fontFamily: 'Inter'}}>
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
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
              Stay Updated with Palmistry Insights
            </h2>
            <p className="text-xl mb-8" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              Get weekly articles about palmistry, astrology, and spiritual wisdom delivered to your inbox
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full border-2 focus:outline-none"
                  style={{borderColor: '#D4AF37', fontFamily: 'Inter'}}
                />
                <button
                  className="px-6 py-3 rounded-full text-white font-medium transition-all hover:scale-105"
                  style={{backgroundColor: '#D4AF37', fontFamily: 'Inter'}}
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
            <h2 className="text-4xl font-bold mb-4" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
              Popular Topics
            </h2>
            <p className="text-lg" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              Explore our most-read articles and discover what others are learning about palmistry
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div key={index} className="p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{backgroundColor: '#EADFD8'}}>
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2" style={{color: '#2D1E4F', fontFamily: 'Inter'}}>{topic}</h3>
                <p className="text-sm" style={{color: '#5D4037', fontFamily: 'Inter'}}>12 articles</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h2 className="text-4xl font-bold mb-6" style={{color: '#2D1E4F', fontFamily: 'Playfair Display'}}>
              Ready to Discover Your Palm's Secrets?
            </h2>
            <p className="text-xl mb-8" style={{color: '#1C1C1C', fontFamily: 'Inter'}}>
              After learning about palmistry, get a professional reading to uncover what your hands reveal about you
            </p>
            {user ? (
              <Link
                to="/form"
                className="px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-105 hover:shadow-lg text-lg"
                style={{backgroundColor: '#D4AF37', fontFamily: 'Inter'}}
              >
                Get Professional Reading
              </Link>
            ) : (
              <Link
                to="/premium-login"
                className="px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-105 hover:shadow-lg text-lg"
                style={{backgroundColor: '#D4AF37', fontFamily: 'Inter'}}
              >
                Get Professional Reading
              </Link>
            )}
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

export default BlogPage;
