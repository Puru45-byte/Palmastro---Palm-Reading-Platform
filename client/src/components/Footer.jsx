import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#2d1b4e' }} className="px-4 py-6 md:py-5 md:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Mobile Footer (compact 2-col layout) */}
        <div className="block md:hidden">
          <div className="flex items-center gap-2 mb-4">
            <h3 style={{ color: 'white', fontSize: '16px', fontFamily: 'Playfair Display', fontWeight: 'bold', margin: 0 }}>
              Palmistry
            </h3>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>•</span>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontFamily: 'Inter', margin: 0 }}>
              Ancient wisdom for modern seekers
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontFamily: 'Inter', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                Quick Links
              </h4>
              <ul style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', lineHeight: '2', fontFamily: 'Inter', listStyle: 'none', padding: 0, margin: 0 }}>
                <li><Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link></li>
                <li><Link to="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link></li>
                <li><Link to="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link></li>
                <li><Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontFamily: 'Inter', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                Contact
              </h4>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', lineHeight: '2', fontFamily: 'Inter' }}>
                <div>support@palmistry.com</div>
                <div>+91 98765 43210</div>
                <div>Mumbai, India</div>
              </div>
            </div>
          </div>

          <div className="border-t pt-3 text-center" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontFamily: 'Inter', margin: 0 }}>
              © 2024 Palmistry. All rights reserved.
            </p>
          </div>
        </div>

        {/* Desktop Footer (original 3-col) */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-3" style={{ color: 'white', fontSize: '22px', fontFamily: 'Playfair Display' }}>
                Palmistry
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', maxWidth: '260px', marginTop: '12px', fontFamily: 'Inter' }}>
                Discover ancient wisdom hidden in your palm lines with our expert readers.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ color: 'white', fontSize: '18px', fontFamily: 'Inter' }}>
                Quick Links
              </h4>
              <ul style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: '2.2', fontFamily: 'Inter' }}>
                <li className="mb-2"><Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link></li>
                <li className="mb-2"><Link to="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link></li>
                <li className="mb-2"><Link to="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link></li>
                <li className="mb-2"><Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ color: 'white', fontSize: '18px', fontFamily: 'Inter' }}>
                Contact Info
              </h4>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: '2.2', fontFamily: 'Inter' }}>
                <div>Email: support@palmistry.com</div>
                <div>Phone: +91 98765 43210</div>
                <div>Location: Mumbai, India</div>
              </div>
            </div>
          </div>
          <div className="border-t mt-10 pt-5 pb-5 text-center" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontFamily: 'Inter' }} className="mb-0">
              © 2024 Palmistry. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
