import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaPhone } from 'react-icons/fa';

const PaymentGateway = ({ amount, orderId }) => {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [loading, setLoading] = useState(false);

  const handleRazorpay = async () => {
    setLoading(true);
    // Razorpay integration code here
    console.log('Processing payment via Razorpay');
    setTimeout(() => setLoading(false), 2000);
  };

  const handleCOD = async () => {
    setLoading(true);
    console.log('Order confirmed with COD');
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-primary mb-8">Select Payment Method</h2>

      <div className="space-y-4 mb-8">
        {/* Razorpay Option */}
        <motion.label
          whileHover={{ scale: 1.02 }}
          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
            paymentMethod === 'razorpay'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-primary'
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="razorpay"
            checked={paymentMethod === 'razorpay'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-4 h-4"
          />
          <FaCreditCard className="ml-4 text-primary" size={24} />
          <div className="ml-4 flex-1">
            <p className="font-bold text-primary">Razorpay Payment</p>
            <p className="text-gray-600 text-sm">Debit/Credit Card, UPI, Wallets</p>
          </div>
          <span className="text-2xl font-bold text-secondary">₹{amount}</span>
        </motion.label>

        {/* COD Option */}
        <motion.label
          whileHover={{ scale: 1.02 }}
          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
            paymentMethod === 'cod'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-primary'
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-4 h-4"
          />
          <FaPhone className="ml-4 text-green-600" size={24} />
          <div className="ml-4 flex-1">
            <p className="font-bold text-gray-800">Cash on Delivery</p>
            <p className="text-gray-600 text-sm">Pay when you receive your order</p>
          </div>
        </motion.label>
      </div>

      {/* Order Summary */}
      <div className="bg-accent p-6 rounded-lg mb-6">
        <h3 className="font-bold text-primary mb-4">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{Math.round(amount * 0.86)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (18%):</span>
            <span>₹{Math.round(amount * 0.18)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>₹{amount > 500 ? 'FREE' : '50'}</span>
          </div>
          <div className="border-t-2 pt-2 flex justify-between font-bold text-lg">
            <span>Total Amount:</span>
            <span className="text-secondary">₹{amount}</span>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={paymentMethod === 'razorpay' ? handleRazorpay : handleCOD}
        disabled={loading}
        className="btn btn-primary w-full text-lg"
      >
        {loading ? 'Processing...' : `Pay ₹${amount} via ${paymentMethod === 'razorpay' ? 'Razorpay' : 'COD'}`}
      </motion.button>

      <p className="text-center text-gray-600 text-sm mt-4">
        ✓ Your payment is secure and encrypted
      </p>
    </motion.div>
  );
};

export default PaymentGateway;
