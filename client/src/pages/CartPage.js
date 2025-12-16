import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center bg-light">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-dark mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link
            to="/products"
            className="bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-pink-700 transition duration-300 inline-block"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12 bg-light">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-dark mb-8"
        >
          Shopping Cart ({getTotalItems()} items)
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            {cartItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="grid grid-cols-4 gap-4 items-center">
                  {/* Image */}
                  <img
                    src={item.image || 'https://via.placeholder.com/150x200?text=Product'}
                    alt={item.name}
                    className="w-24 h-32 object-cover rounded"
                  />

                  {/* Details */}
                  <div className="col-span-2">
                    <h3 className="font-bold text-lg text-dark mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.brand}</p>
                    <div className="flex gap-4">
                      {item.size && (
                        <span className="text-xs bg-light px-2 py-1 rounded">
                          Size: {item.size}
                        </span>
                      )}
                      {item.color && (
                        <span className="text-xs bg-light px-2 py-1 rounded">
                          Color: {item.color}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="text-right">
                    <p className="text-primary font-bold text-xl mb-4">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 justify-end mb-4">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1, item.size, item.color)
                        }
                        className="p-2 bg-light rounded hover:bg-gray-200 transition duration-300"
                      >
                        <FiMinus size={16} />
                      </button>
                      <span className="font-bold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1, item.size, item.color)
                        }
                        className="p-2 bg-light rounded hover:bg-gray-200 transition duration-300"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size, item.color)}
                      className="text-red-500 hover:text-red-700 transition duration-300 flex items-center gap-1 justify-end text-sm"
                    >
                      <FiTrash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-fit bg-white p-8 rounded-lg shadow-lg sticky top-28"
          >
            <h2 className="text-2xl font-bold text-dark mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold">₹{getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span className="font-semibold">₹{Math.floor(getTotalPrice() * 0.18).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold text-dark mb-8">
              <span>Total</span>
              <span className="text-primary">
                ₹{Math.floor(getTotalPrice() * 1.18).toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-pink-700 transition duration-300 mb-4 transform hover:scale-105 shadow-lg"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/products"
              className="block text-center text-primary font-semibold hover:text-pink-700 transition duration-300 text-sm"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
