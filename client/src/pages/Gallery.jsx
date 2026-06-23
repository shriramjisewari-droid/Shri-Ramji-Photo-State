import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-accent py-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">Our Gallery</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.05 }}
              className="h-64 bg-gray-300 rounded-lg overflow-hidden shadow-lg cursor-pointer flex items-center justify-center text-4xl"
            >
              📷
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Gallery;
