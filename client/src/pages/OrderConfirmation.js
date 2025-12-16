import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiPackage, FiTruck, FiArrowRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderData = sessionStorage.getItem('orderConfirmation');
    if (!orderData) {
      navigate('/');
      return;
    }

    setOrder(JSON.parse(orderData));
  }, [navigate]);

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <FiCheckCircle className="text-green-500" size={80} />
          </motion.div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. Your order has been placed successfully.
          </p>

          <div className="bg-white rounded-lg p-6 mb-8 inline-block">
            <p className="text-gray-600 text-sm">Order Number</p>
            <p className="text-3xl font-bold text-primary">{order._id.slice(-8).toUpperCase()}</p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Order Items */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-lg font-bold text-gray-900 mt-2">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FiTruck className="text-primary" /> Delivery Address
              </h2>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">
                  {order.shippingAddress?.name}
                </p>
                <p className="text-gray-600">{order.shippingAddress?.street}</p>
                <p className="text-gray-600">
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} -{' '}
                  {order.shippingAddress?.zipCode}
                </p>
                <p className="text-gray-600">{order.shippingAddress?.country}</p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="text-sm font-semibold text-blue-900 mb-2">Estimated Delivery</p>
                <p className="text-2xl font-bold text-blue-600">
                  {estimatedDelivery.toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm text-blue-700 mt-1">Usually arrives in 5-7 business days</p>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FiPackage className="text-primary" /> Order Status
              </h2>

              <div className="space-y-4">
                {[
                  { status: 'Order Placed', completed: true },
                  { status: 'Confirmed', completed: order.status !== 'pending' },
                  { status: 'Shipped', completed: order.status === 'shipped' || order.status === 'delivered' },
                  { status: 'Delivered', completed: order.status === 'delivered' },
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step.completed
                          ? 'bg-green-500 text-white'
                          : order.status === 'pending' && index === 1
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {step.completed ? '✓' : index + 1}
                    </div>
                    <div>
                      <p
                        className={`font-semibold ${
                          step.completed
                            ? 'text-gray-900'
                            : order.status === 'pending' && index === 1
                            ? 'text-yellow-600'
                            : 'text-gray-500'
                        }`}
                      >
                        {step.status}
                      </p>
                      {step.completed && (
                        <p className="text-xs text-gray-600">Completed</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{order.tax}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {order.shipping === 0 ? (
                      <span className="text-green-600 font-semibold">FREE</span>
                    ) : (
                      `₹${order.shipping}`
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-gray-900 text-lg">Total</h3>
                <h3 className="font-bold text-primary text-2xl">₹{order.total}</h3>
              </div>

              {/* Payment Info */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Payment Method</p>
                <p className="font-semibold text-gray-900 capitalize">
                  {order.paymentMethod || 'Credit Card'}
                </p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  ✓ Payment Successful
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition">
                  Track Order
                </button>

                <Link
                  to="/products"
                  className="block w-full text-center border-2 border-primary text-primary font-semibold py-2 rounded-lg hover:bg-primary/5 transition"
                >
                  Continue Shopping
                </Link>

                <Link
                  to="/profile"
                  className="block w-full text-center border-2 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  View All Orders
                </Link>
              </div>

              {/* Help Section */}
              <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                <p className="text-sm font-semibold text-gray-900">Need Help?</p>
                <a href="mailto:support@myntra.com" className="text-primary text-sm hover:underline">
                  📧 support@myntra.com
                </a>
                <p className="text-xs text-gray-600">
                  We're here to help. Email us anytime for support.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <p className="text-3xl mb-2">✓</p>
              <h3 className="font-bold text-gray-900 mb-2">100% Authentic</h3>
              <p className="text-sm text-gray-600">All products are genuine and authentic</p>
            </div>
            <div className="card p-6 text-center">
              <p className="text-3xl mb-2">🔄</p>
              <h3 className="font-bold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600">30-day return and exchange policy</p>
            </div>
            <div className="card p-6 text-center">
              <p className="text-3xl mb-2">🎁</p>
              <h3 className="font-bold text-gray-900 mb-2">Rewards</h3>
              <p className="text-sm text-gray-600">Earn points on every purchase</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
