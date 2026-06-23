import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl text-primary font-bold">Loading...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl text-primary font-bold">Product not found</div>
        </div>
      </div>
    );
  }

  const whatsappMessage = `Hi, I'm interested in ${product.name}. Price: ₹${product.price}. Can you provide more details?`;
  const whatsappLink = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg h-96">
            {product.images && product.images[0] ? (
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-6xl">📸</div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span className="inline-block bg-secondary text-primary px-4 py-2 rounded-full font-semibold text-sm">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-primary mb-4">{product.name}</h1>
            
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>
            
            <div className="mb-6">
              <div className="text-5xl font-bold text-secondary mb-2">₹{product.price}</div>
              <p className="text-gray-600">Competitive pricing | Quality guaranteed</p>
            </div>

            <div className="space-y-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary block text-center"
              >
                💬 Enquire on WhatsApp
              </a>
              
              <button className="btn-outline w-full">
                📞 Call Us
              </button>
            </div>

            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <h3 className="text-lg font-bold text-primary mb-4">Why Choose This Product?</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Premium quality materials</li>
                <li>✓ Professional finishing</li>
                <li>✓ Fast delivery available</li>
                <li>✓ Lifetime support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
