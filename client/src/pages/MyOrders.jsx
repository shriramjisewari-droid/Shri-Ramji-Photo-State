import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OrderTracker from '../components/OrderTracker';
import { FaBox, FaReceipt, FaTimes } from 'react-icons/fa';

const MyOrders = () => {
  const [orders, setOrders] = useState([
    {
      _id: '1',
      orderNumber: 'ORD-123456',
      status: 'shipped',
      total: 1848,
      createdAt: new Date().toISOString(),
      items: [
        { name: 'Photo Frame', price: 299, quantity: 2 },
        { name: 'Canvas Print', price: 1299, quantity: 1 },
      ],
    },
    {
      _id: '2',
      orderNumber: 'ORD-789012',
      status: 'delivered',
      total: 599,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      items: [
        { name: 'Passport Photo Pack', price: 299, quantity: 2 },
      ],
    },
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="min-h-screen bg-accent py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">📦 My Orders</h1>
          <p className="text-gray-600">Track your orders and view order history</p>
        </motion.div>

        {/* Orders List */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {orders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg shadow-lg p-12 text-center"
              >
                <div className="text-6xl mb-4">📭</div>
                <p className="text-2xl font-bold text-gray-600">No orders yet</p>
                <p className="text-gray-600 mt-2">Start shopping to place your first order</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {orders.map((order, idx) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedOrder(order)}
                    className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-bold text-primary text-lg">{order.orderNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className={`inline-block px-3 py-1 rounded-full text-white text-sm font-bold ${
                          order.status === 'delivered' ? 'bg-green-500' :
                          order.status === 'shipped' ? 'bg-blue-500' :
                          order.status === 'processing' ? 'bg-yellow-500' :
                          'bg-gray-500'
                        }`}>
                          {order.status.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-gray-600 text-sm mb-4">
                      <span>Ordered on {new Date(order.createdAt).toLocaleDateString()}</span>
                      <span className="font-bold text-secondary text-lg">₹{order.total}</span>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600 mb-2">{order.items.length} item(s)</p>
                      <div className="flex gap-2 flex-wrap">
                        {order.items.map((item, i) => (
                          <span key={i} className="bg-accent px-3 py-1 rounded text-sm text-primary">
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Order Details Sidebar */}
          {selectedOrder && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:col-span-1"
            >
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <FaReceipt /> Order Details
                  </h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Order Tracker */}
                <OrderTracker order={selectedOrder} />

                {/* Items */}
                <div className="mt-6">
                  <h4 className="font-bold text-primary mb-3">Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name} x{item.quantity}</span>
                        <span className="font-bold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
