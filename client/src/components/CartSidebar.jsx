import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

const CartSidebar = ({ isOpen, onClose, cartItems = [] }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-screen w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FaShoppingCart /> Shopping Cart
              </h2>
              <button
                onClick={onClose}
                className="text-2xl hover:text-secondary transition"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center text-gray-600">
                  <div>
                    <div className="text-5xl mb-4">🛒</div>
                    <p>Your cart is empty</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-accent p-4 rounded-lg flex justify-between items-start"
                    >
                      <div>
                        <p className="font-bold text-primary">{item.name}</p>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                        <p className="text-secondary font-bold">₹{item.price * item.quantity}</p>
                      </div>
                      <button className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t-2 border-gray-200 p-6 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold">Subtotal:</span>
                  <span className="text-secondary font-bold">₹{total}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Shipping:</span>
                  <span>₹{total > 500 ? 'FREE' : '50'}</span>
                </div>
                <div className="flex justify-between items-center text-lg bg-accent p-3 rounded-lg">
                  <span className="font-bold">Total:</span>
                  <span className="text-secondary font-bold text-xl">₹{total + (total > 500 ? 0 : 50)}</span>
                </div>
                <button className="btn btn-primary w-full">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
