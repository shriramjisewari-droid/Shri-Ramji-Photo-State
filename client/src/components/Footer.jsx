import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-4">Shri Ramji Photo State</h3>
            <p className="text-gray-300 mb-4">
              Professional photography studio providing premium photo products and services since 2005.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary transition">Facebook</a>
              <a href="#" className="hover:text-secondary transition">Instagram</a>
              <a href="#" className="hover:text-secondary transition">WhatsApp</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-secondary mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-secondary transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-secondary transition">Products</Link></li>
              <li><Link to="/gallery" className="hover:text-secondary transition">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-secondary mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li>📍 Jaipur, Rajasthan, India</li>
              <li>📞 +91 9876543210</li>
              <li>📧 info@shriramjiphoto.com</li>
              <li>⏰ 10 AM - 8 PM Daily</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Shri Ramji Photo State. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
