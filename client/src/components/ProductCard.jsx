import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const whatsappMessage = `Hi, I'm interested in ${product.name}. Price: ₹${product.price}. Can you provide more details?`;
  const whatsappLink = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden card-hover group">
      {/* Image */}
      <div className="h-64 bg-gray-200 overflow-hidden relative">
        {product.images && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-5xl">📸</div>
        )}
        {product.isFeatured && (
          <div className="absolute top-3 right-3 bg-secondary text-primary px-3 py-1 rounded-full text-xs font-bold">
            Featured
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block bg-secondary text-primary px-3 py-1 rounded-full text-xs font-semibold">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2">{product.name}</h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-3xl font-bold text-secondary">₹{product.price}</div>
        </div>

        <div className="space-y-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary block text-center text-sm"
          >
            💬 Enquire Now
          </a>
          <Link
            to={`/product/${product._id}`}
            className="btn-outline block text-center text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
