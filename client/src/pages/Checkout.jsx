import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CheckoutSteps from '../components/CheckoutSteps';
import PaymentGateway from '../components/PaymentGateway';
import { FaBox, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';

const Checkout = () => {
  const [step, setStep] = useState(0);
  const [cartItems] = useState([
    { id: 1, name: 'Photo Frame', price: 299, quantity: 2 },
    { id: 2, name: 'Canvas Print', price: 1299, quantity: 1 },
  ]);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(total * 0.18);
  const shipping = total > 500 ? 0 : 50;
  const finalTotal = total + tax + shipping;

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleProceedToPayment = () => {
    if (!shippingAddress.name || !shippingAddress.phone || !shippingAddress.street) {
      alert('Please fill all required fields');
      return;
    }
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-accent py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">🛒 Checkout</h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </motion.div>

        {/* Steps */}
        <CheckoutSteps currentStep={step} />

        {/* Content */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Step 0: Cart Review */}
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                  <FaBox /> Order Review
                </h2>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-4">
                      <div>
                        <p className="font-bold text-primary">{item.name}</p>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-secondary">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="btn btn-primary w-full"
                >
                  Continue to Shipping
                </button>
              </motion.div>
            )}

            {/* Step 1: Shipping Address */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                  <FaMapMarkerAlt /> Shipping Address
                </h2>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      value={shippingAddress.name}
                      onChange={handleAddressChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={shippingAddress.phone}
                      onChange={handleAddressChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={shippingAddress.email}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address *"
                    value={shippingAddress.street}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City *"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State *"
                      value={shippingAddress.state}
                      onChange={handleAddressChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code *"
                    value={shippingAddress.zipCode}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={handleProceedToPayment}
                    className="btn btn-primary w-full"
                  >
                    Continue to Payment
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <PaymentGateway amount={finalTotal} orderId="ORD-12345" />
            )}
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 h-fit"
          >
            <h3 className="text-xl font-bold text-primary mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4 pb-4 border-b-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%):</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
            </div>
            <div className="bg-accent p-4 rounded-lg">
              <div className="flex justify-between font-bold text-lg text-primary">
                <span>Total:</span>
                <span className="text-secondary">₹{finalTotal}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
