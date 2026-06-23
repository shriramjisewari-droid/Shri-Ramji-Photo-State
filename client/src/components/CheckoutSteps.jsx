import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaBox, FaTruck, FaCheckCircle } from 'react-icons/fa';

const CheckoutSteps = ({ currentStep = 0 }) => {
  const steps = [
    { id: 1, label: 'Cart', icon: FaBox },
    { id: 2, label: 'Shipping', icon: FaTruck },
    { id: 3, label: 'Payment', icon: FaCreditCard },
    { id: 4, label: 'Confirmation', icon: FaCheckCircle },
  ];

  return (
    <div className="w-full py-8 px-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;

          return (
            <div key={step.id} className="flex-1 flex items-center">
              {/* Step Circle */}
              <motion.div
                animate={{
                  scale: isActive ? 1.2 : 1,
                  boxShadow: isActive ? '0 0 20px rgba(139, 21, 56, 0.5)' : 'none'
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                  isActive ? 'bg-primary' : isCompleted ? 'bg-secondary' : 'bg-gray-300'
                }`}
              >
                <Icon size={20} />
              </motion.div>

              {/* Step Label */}
              <p className={`ml-2 font-semibold ${
                isActive ? 'text-primary' : isCompleted ? 'text-secondary' : 'text-gray-400'
              }`}>
                {step.label}
              </p>

              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <motion.div
                  animate={{ backgroundColor: isCompleted ? '#D4AF37' : '#e5e7eb' }}
                  className="flex-1 h-1 mx-2 rounded"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutSteps;
