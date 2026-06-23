import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaTruck, FaCheckCircle, FaClock } from 'react-icons/fa';

const OrderTracker = ({ order }) => {
  const statusSteps = [
    { status: 'pending', label: 'Order Placed', icon: FaBox },
    { status: 'confirmed', label: 'Confirmed', icon: FaCheckCircle },
    { status: 'processing', label: 'Processing', icon: FaClock },
    { status: 'shipped', label: 'Shipped', icon: FaTruck },
    { status: 'delivered', label: 'Delivered', icon: FaCheckCircle },
  ];

  const currentStatusIndex = statusSteps.findIndex(s => s.status === order?.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-primary mb-8">Order Status</h2>

      {/* Timeline */}
      <div className="space-y-6">
        {statusSteps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx < currentStatusIndex;
          const isActive = idx === currentStatusIndex;

          return (
            <div key={step.status} className="flex items-start gap-4">
              {/* Circle */}
              <motion.div
                animate={{
                  scale: isActive ? 1.2 : 1,
                  backgroundColor: isCompleted || isActive ? '#8B1538' : '#e5e7eb'
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white"
              >
                <Icon size={20} />
              </motion.div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <p className={`font-bold text-lg ${
                  isCompleted || isActive ? 'text-primary' : 'text-gray-400'
                }`}>
                  {step.label}
                </p>
                {isActive && (
                  <p className="text-gray-600 text-sm mt-2">
                    Your order is currently {step.label.toLowerCase()}
                  </p>
                )}
                {isCompleted && (
                  <p className="text-secondary text-sm mt-2">✓ Completed</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Estimated Delivery */}
      {currentStatusIndex >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-4 bg-green-100 border-2 border-green-500 rounded-lg"
        >
          <p className="text-green-700 font-bold">📦 Estimated Delivery: 2-3 days</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OrderTracker;
