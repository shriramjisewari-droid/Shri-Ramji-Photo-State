import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Shri Ramji Photo State</h3>
            <p className="text-gray-300">Professional photography services and premium photo products for all occasions.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/products" className="hover:text-secondary transition">Products</a></li>
              <li><a href="/gallery" className="hover:text-secondary transition">Gallery</a></li>
              <li><a href="/about" className="hover:text-secondary transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-secondary transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center gap-2">
                <FaPhone size={16} />
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope size={16} />
                <span>info@shriramji.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt size={16} />
                <span>Your City, India</span>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-secondary transition"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-secondary transition"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-secondary transition"><FaTwitter size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Shri Ramji Photo State. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
