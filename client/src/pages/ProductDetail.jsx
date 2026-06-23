import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductById } from '../api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center text-4xl text-gray-400">
            📦
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-primary mb-4">{product.name}</h1>
            <div className="text-3xl text-secondary font-bold mb-4">₹{product.price}</div>
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>
            <button className="btn btn-primary text-lg w-full mb-4">
              Enquire Now
            </button>
            <button className="btn btn-outline text-lg w-full">
              Contact via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
