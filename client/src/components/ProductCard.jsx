import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';
import { getProducts } from '../api';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg hover-lift group"
    >
      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
          📦
        </div>
        <div className="absolute top-3 right-3 bg-secondary text-primary px-3 py-1 rounded-full text-sm font-bold">
          {product.discount || 'New'}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
          </div>
          <span className="text-gray-600 text-sm">(24 reviews)</span>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-2xl font-bold text-secondary">₹{product.price}</div>
            <div className="text-sm text-gray-500 line-through">₹{Math.round(product.price * 1.2)}</div>
          </div>
          {product.stock > 0 ? (
            <span className="text-green-600 font-semibold text-sm">In Stock</span>
          ) : (
            <span className="text-red-600 font-semibold text-sm">Out of Stock</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onAddToCart(product._id)}
            className="flex-1 btn btn-primary flex items-center justify-center gap-2 text-sm"
            disabled={product.stock === 0}
          >
            <FaShoppingCart /> Add
          </button>
          <button className="btn btn-outline px-3 text-red-500 hover:text-red-600">
            <FaHeart />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
