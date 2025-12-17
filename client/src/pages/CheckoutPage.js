import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight, FiPlus } from 'react-icons/fi';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config/api';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, getTotalPrice } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login', { state: { from: location } });
      return;
    }

    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }

    fetchAddresses();
  }, [token, navigate, cartItems, location]);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAddresses(data.addresses || []);
        
        // Check if address was pre-selected from address page
        const preSelectedAddress = sessionStorage.getItem('selectedAddress');
        if (preSelectedAddress) {
          setSelectedAddress(JSON.parse(preSelectedAddress));
          sessionStorage.removeItem('selectedAddress'); // Clear after use
        } else {
          // Select default address or first address
          const defaultAddress = data.addresses?.find((a) => a.isDefault);
          setSelectedAddress(defaultAddress || data.addresses?.[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = getTotalPrice();
  const shippingCost = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax + shippingCost;

  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    // Store checkout data in session/context
    sessionStorage.setItem(
      'checkoutData',
      JSON.stringify({
        items: cartItems,
        address: selectedAddress,
        shippingMethod,
        subtotal,
        tax,
        shipping: shippingCost,
        total,
      })
    );

    navigate('/payment');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Review and complete your order</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Order Items */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-lg font-bold text-gray-900 mt-2">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Address</h2>

              {addresses.length === 0 ? (
                <button
                  onClick={() => navigate('/address')}
                  className="w-full border-2 border-dashed border-primary text-primary py-6 rounded-lg font-semibold hover:bg-primary/5 transition"
                >
                  + Add Delivery Address
                </button>
              ) : (
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <label
                      key={address._id}
                      className={`relative block p-4 border-2 rounded-lg cursor-pointer transition ${
                        selectedAddress?._id === address._id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress?._id === address._id}
                        onChange={() => setSelectedAddress(address)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <div className="ml-6 mt-2">
                        <h3 className="font-semibold text-gray-900">
                          {address.firstName} {address.lastName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.addressLine1}
                          {address.addressLine2 && <>, {address.addressLine2}</>}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} - {address.zipCode}
                        </p>
                        <p className="text-sm text-gray-600">Phone: {address.phone}</p>
                        {address.isDefault && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded mt-2 inline-block">
                            Default
                          </span>
                        )}
                      </div>
                    </label>
                  ))}

                  <button
                    onClick={() => navigate('/address')}
                    className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 flex items-center justify-center gap-2 transition mt-4"
                  >
                    <FiPlus size={20} /> Add Another Address
                  </button>
                </div>
              )}
            </div>

            {/* Shipping Method */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 border-primary rounded-lg cursor-pointer bg-primary/5">
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={shippingMethod === 'standard'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      Standard Shipping
                      {subtotal > 500 && (
                        <span className="ml-2 text-green-600 text-sm font-bold">FREE</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600">Delivery in 5-7 days</p>
                  </div>
                  {shippingCost > 0 && <p className="font-semibold">₹{shippingCost}</p>}
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary">
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={shippingMethod === 'express'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Express Shipping</h3>
                    <p className="text-sm text-gray-600">Delivery in 2-3 days</p>
                  </div>
                  <p className="font-semibold">₹99</p>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Total</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{tax}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600 font-semibold">FREE</span>
                    ) : (
                      `₹${shippingCost}`
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 text-lg">Total</h3>
                <h3 className="font-bold text-primary text-2xl">₹{total}</h3>
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={!selectedAddress || loading}
                className="w-full bg-gradient-to-r from-primary to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                Proceed to Payment <FiChevronRight className="inline" />
              </button>

              <Link
                to="/cart"
                className="block w-full text-center border-2 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Back to Cart
              </Link>

              {/* Order Guarantees */}
              <div className="mt-8 space-y-3 text-sm">
                <div className="flex gap-2">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">100% Secure Checkout</p>
                    <p className="text-gray-600">SSL encrypted transactions</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-2xl">🔒</span>
                  <div>
                    <p className="font-semibold text-gray-900">Safe Payments</p>
                    <p className="text-gray-600">Multiple payment options</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
