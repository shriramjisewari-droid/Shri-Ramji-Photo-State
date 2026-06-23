import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">About Shri Ramji Photo State</h1>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center text-6xl">
            📸
          </div>
          <div>
            <p className="text-gray-600 text-lg mb-6">
              Welcome to Shri Ramji Photo State, your premier destination for professional photography services and premium photo products.
            </p>
            <p className="text-gray-600 text-lg mb-6">
              With over a decade of experience in the industry, we specialize in capturing your most precious moments and transforming them into timeless memories.
            </p>
            <p className="text-gray-600 text-lg">
              Our state-of-the-art equipment, experienced team, and commitment to excellence ensure that every project we undertake is executed with the highest standards of quality and professionalism.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
