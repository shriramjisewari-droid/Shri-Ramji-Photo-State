import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products?featured=true`);
        setFeaturedProducts(response.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="gradient-primary text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">Shri Ramji Photo State</h1>
          <p className="text-2xl md:text-3xl mb-8 text-yellow-200">Your Memories, Our Art</p>
          <p className="text-lg md:text-xl mb-8 text-gray-100">Professional Photography Studio in Rajasthan</p>
          <a 
            href="https://wa.me/919876543210" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary inline-block"
          >
            📞 Contact Us on WhatsApp
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-2 text-center">Featured Products</h2>
          <div className="h-1 w-24 bg-secondary mx-auto mb-12"></div>
          
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-2 text-center">Our Services</h2>
          <div className="h-1 w-24 bg-secondary mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '📸', name: 'Passport Photo', desc: 'Professional passport-sized photos' },
              { icon: '🖼️', name: 'Photo Frames', desc: 'Beautiful wooden & metallic frames' },
              { icon: '🎨', name: 'Canvas Print', desc: 'High-quality canvas prints' },
              { icon: '📚', name: 'Photo Albums', desc: 'Premium hardbound albums' },
              { icon: '🪪', name: 'ID Cards', desc: 'Student & employee ID cards' },
              { icon: '✨', name: 'Lamination', desc: 'Professional lamination service' },
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-lg text-center card-hover">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-2 text-center">Why Choose Us?</h2>
          <div className="h-1 w-24 bg-secondary mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⭐', title: '20+ Years', desc: 'Experience in photography' },
              { icon: '👥', title: 'Expert Team', desc: 'Skilled professionals' },
              { icon: '🎯', title: 'Quality', desc: 'Best results guaranteed' },
              { icon: '💰', title: 'Affordable', desc: 'Best prices in town' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-secondary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">Ready to Capture Your Memories?</h2>
          <p className="text-lg text-primary mb-8">Contact us today for a free consultation</p>
          <a 
            href="https://wa.me/919876543210" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            💬 Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
