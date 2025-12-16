import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [checkoutData, setCheckoutData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    // Get checkout data from session
    const data = sessionStorage.getItem('checkoutData');
    if (data) {
      setCheckoutData(JSON.parse(data));
    } else {
      navigate('/checkout');
    }
  }, [token, navigate]);

  const validateCardData = () => {
    const newErrors = {};

    if (!cardData.cardNumber.replace(/\s/g, '') || cardData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!cardData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }

    if (!cardData.expiryMonth || !cardData.expiryYear) {
      newErrors.expiry = 'Expiry date is required';
    }

    if (!cardData.cvv || cardData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '').slice(0, 16);
    let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardData((prev) => ({
      ...prev,
      cardNumber: formattedValue,
    }));
    if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: '' }));
  };

  const handleCVVChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCardData((prev) => ({
      ...prev,
      cvv: value,
    }));
    if (errors.cvv) setErrors((prev) => ({ ...prev, cvv: '' }));
  };

  const handleCardNameChange = (e) => {
    setCardData((prev) => ({
      ...prev,
      cardName: e.target.value,
    }));
    if (errors.cardName) setErrors((prev) => ({ ...prev, cardName: '' }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'card' && !validateCardData()) {
      return;
    }

    setLoading(true);

    try {
      // Here you would integrate with a real payment gateway
      // For now, we'll simulate a payment and create the order

      const paymentDetails = {
        method: paymentMethod,
        ...(paymentMethod === 'card' && {
          cardLast4: cardData.cardNumber.slice(-4),
          cardName: cardData.cardName,
        }),
        transactionId: paymentMethod === 'cod' ? 'COD' + Date.now() : 'TXN' + Date.now(),
        status: paymentMethod === 'cod' ? 'pending' : 'completed',
      };

      const orderData = {
        items: checkoutData.items,
        shippingAddress: {
          street: checkoutData.address.addressLine1,
          city: checkoutData.address.city,
          state: checkoutData.address.state,
          zipCode: checkoutData.address.zipCode,
          country: checkoutData.address.country,
        },
        paymentMethod: paymentMethod,
        paymentDetails: paymentDetails,
        subtotal: checkoutData.subtotal,
        tax: checkoutData.tax,
        shipping: checkoutData.shipping,
        total: checkoutData.total,
      };

      // Create order
      const response = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const orderResponse = await response.json();

      // Normalize data for confirmation page
      const confirmationOrder = {
        ...orderResponse.order,
        _id: orderResponse.order?.id,
        status: 'confirmed',
        paymentMethod,
        shippingAddress: {
          name: `${checkoutData.address.firstName} ${checkoutData.address.lastName}`.trim(),
          street: `${checkoutData.address.addressLine1}${checkoutData.address.addressLine2 ? ', ' + checkoutData.address.addressLine2 : ''}`,
          city: checkoutData.address.city,
          state: checkoutData.address.state,
          zipCode: checkoutData.address.zipCode,
          country: checkoutData.address.country,
        },
      };

      sessionStorage.setItem('orderConfirmation', JSON.stringify(confirmationOrder));
      sessionStorage.removeItem('checkoutData');

      // Clear the cart after successful order
      clearCart();

      // Redirect to order confirmation
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!checkoutData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.button
          onClick={() => navigate('/checkout')}
          className="flex items-center gap-2 text-primary font-semibold mb-6 hover:gap-3 transition"
        >
          <FiArrowLeft size={20} /> Back to Checkout
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment</h1>
          <p className="text-gray-600">Secure payment for your order</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="card p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <FiLock className="text-primary" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3 mb-8">
                {[
                  { id: 'card', label: '💳 Credit/Debit Card', icon: '💳' },
                  { id: 'upi', label: '📱 UPI', icon: '📱' },
                  { id: 'netbanking', label: '🏦 Net Banking', icon: '🏦' },
                  { id: 'wallet', label: '👛 Wallet', icon: '👛' },
                  { id: 'cod', label: '💵 Cash on Delivery', icon: '💵' },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition ${
                      paymentMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-semibold text-gray-900">{method.label}</span>
                  </label>
                ))}
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handlePayment} className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.cardNumber}
                      onChange={handleCardNumberChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                        errors.cardNumber
                          ? 'border-red-500'
                          : 'border-gray-300 focus:border-primary'
                      }`}
                      maxLength="19"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardData.cardName}
                      onChange={handleCardNameChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                        errors.cardName
                          ? 'border-red-500'
                          : 'border-gray-300 focus:border-primary'
                      }`}
                    />
                    {errors.cardName && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                    )}
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={cardData.expiryMonth}
                          onChange={(e) =>
                            setCardData((prev) => ({
                              ...prev,
                              expiryMonth: e.target.value,
                            }))
                          }
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        >
                          <option value="">MM</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        <select
                          value={cardData.expiryYear}
                          onChange={(e) =>
                            setCardData((prev) => ({
                              ...prev,
                              expiryYear: e.target.value,
                            }))
                          }
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        >
                          <option value="">YY</option>
                          {[...Array(10)].map((_, i) => {
                            const year = new Date().getFullYear() + i;
                            return (
                              <option key={year} value={String(year).slice(-2)}>
                                {String(year).slice(-2)}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      {errors.expiry && (
                        <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={handleCVVChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                          errors.cvv ? 'border-red-500' : 'border-gray-300 focus:border-primary'
                        }`}
                        maxLength="3"
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    {loading ? 'Processing Payment...' : 'Pay ₹' + checkoutData.total}
                  </button>
                </form>
              )}

              {/* Other Payment Methods */}
              {paymentMethod !== 'card' && (
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {loading
                    ? 'Processing...'
                    : paymentMethod === 'cod'
                    ? 'Place Order (Cash on Delivery)'
                    : 'Pay ₹' + checkoutData.total}
                </button>
              )}

              {/* Test Card Info */}
              {paymentMethod === 'card' && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Test Card Details:</p>
                  <p className="text-xs text-blue-700">Card: 4111 1111 1111 1111</p>
                  <p className="text-xs text-blue-700">CVV: 123</p>
                  <p className="text-xs text-blue-700">Expiry: Any future date</p>
                </div>
              )}
            </div>

            {/* Security Info */}
            <div className="card p-6 space-y-4">
              <div className="flex gap-3">
                <span className="text-2xl">🔐</span>
                <div>
                  <p className="font-semibold text-gray-900">Secure Payment Gateway</p>
                  <p className="text-sm text-gray-600">All payments are encrypted and secure</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold text-gray-900">SSL Encrypted</p>
                  <p className="text-sm text-gray-600">Your card details are safe with us</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{checkoutData.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{checkoutData.tax}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {checkoutData.shipping === 0 ? (
                      <span className="text-green-600 font-semibold">FREE</span>
                    ) : (
                      `₹${checkoutData.shipping}`
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Total</h3>
                <h3 className="font-bold text-primary text-2xl">₹{checkoutData.total}</h3>
              </div>

              {/* Items */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">
                  {checkoutData.items.length} Items
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {checkoutData.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <p className="text-gray-600">{item.name}</p>
                      <p className="text-gray-900 font-semibold">x{item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
