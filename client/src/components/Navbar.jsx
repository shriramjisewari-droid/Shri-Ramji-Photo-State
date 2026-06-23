import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState as useStateMenu } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = !!localStorage.getItem('adminToken');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 font-bold text-2xl hover:text-secondary transition">
            <span className="text-secondary">🎨</span> Shri Ramji Photo
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-secondary transition font-semibold">Home</Link>
            <Link to="/products" className="hover:text-secondary transition font-semibold">Products</Link>
            <Link to="/gallery" className="hover:text-secondary transition font-semibold">Gallery</Link>
            <Link to="/contact" className="hover:text-secondary transition font-semibold">Contact</Link>
            
            {isAdmin ? (
              <div className="flex items-center space-x-4">
                <Link to="/admin/dashboard" className="btn-secondary text-sm">Dashboard</Link>
                <button onClick={handleLogout} className="btn-outline text-sm">Logout</button>
              </div>
            ) : (
              <Link to="/admin/login" className="btn-secondary text-sm">Admin</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-2xl focus:outline-none"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block px-4 py-2 hover:bg-secondary hover:text-primary rounded">Home</Link>
            <Link to="/products" className="block px-4 py-2 hover:bg-secondary hover:text-primary rounded">Products</Link>
            <Link to="/gallery" className="block px-4 py-2 hover:bg-secondary hover:text-primary rounded">Gallery</Link>
            <Link to="/contact" className="block px-4 py-2 hover:bg-secondary hover:text-primary rounded">Contact</Link>
            {isAdmin ? (
              <>
                <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-secondary hover:text-primary rounded">Dashboard</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-secondary hover:text-primary rounded">Logout</button>
              </>
            ) : (
              <Link to="/admin/login" className="block px-4 py-2 hover:bg-secondary hover:text-primary rounded">Admin</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
