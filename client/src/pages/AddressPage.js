import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config/api';

const AddressPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    isDefault: false,
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetchAddresses();
  }, [token, navigate]);

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
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India',
      isDefault: false,
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Update addresses immediately from response
        setAddresses(data.addresses || []);
        alert('Address added successfully');
        resetForm();
      } else {
        alert(data.message || 'Failed to add address');
      }
    } catch (error) {
      console.error('Error adding address:', error);
      alert('Error adding address');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/orders/addresses/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setAddresses(data.addresses || []);
          alert('Address deleted successfully');
        } else {
          alert(data.message || 'Failed to delete address');
        }
      } catch (error) {
        console.error('Error deleting address:', error);
        alert('Error deleting address');
      }
    }
  };

  const handleSelectAndProceed = () => {
    if (!selectedAddressId) {
      alert('Please select an address to proceed');
      return;
    }

    const selectedAddress = addresses.find((addr) => addr._id === selectedAddressId);
    
    // Store selected address in sessionStorage for checkout
    sessionStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
    
    // Navigate to checkout if cart has items, otherwise to cart
    if (cartItems.length > 0) {
      navigate('/checkout');
    } else {
      navigate('/cart');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Addresses</h1>
          <p className="text-gray-600">Manage your delivery addresses</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New Address Form */}
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="card p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Address</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      required
                    />
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    required
                  />

                  <input
                    type="text"
                    name="addressLine1"
                    placeholder="Address Line 1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    required
                  />

                  <input
                    type="text"
                    name="addressLine2"
                    placeholder="Address Line 2 (Optional)"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    required
                  />

                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option>India</option>
                    <option>UAE</option>
                    <option>USA</option>
                  </select>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">Set as default</span>
                  </label>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* Addresses List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={isAdding ? 'lg:col-span-2' : 'lg:col-span-3'}
          >
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="w-full mb-6 border-2 border-dashed border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/5 flex items-center justify-center gap-2 transition"
              >
                <FiPlus size={20} /> Add New Address
              </button>
            )}

            <div className="space-y-4">
              {addresses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No saved addresses</p>
                  {!isAdding && (
                    <button
                      onClick={() => setIsAdding(true)}
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
                    >
                      Add Your First Address
                    </button>
                  )}
                </div>
              ) : (
                addresses.map((address, index) => (
                  <motion.div
                    key={address._id || index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`card p-6 relative cursor-pointer transition ${
                      selectedAddressId === address._id
                        ? 'border-2 border-primary bg-primary/5'
                        : 'border-2 border-transparent hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAddressId(address._id)}
                  >
                    {/* Radio button for selection */}
                    <input
                      type="radio"
                      name="selectedAddress"
                      checked={selectedAddressId === address._id}
                      onChange={() => setSelectedAddressId(address._id)}
                      className="absolute top-6 right-6 w-5 h-5 cursor-pointer"
                    />

                    {address.isDefault && (
                      <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                        Default
                      </span>
                    )}

                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {address.firstName} {address.lastName}
                    </h3>

                    <div className="space-y-2 text-gray-600 mb-4">
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>
                        {address.city}, {address.state} - {address.zipCode}
                      </p>
                      <p>{address.country}</p>
                      <p className="font-semibold">Phone: {address.phone}</p>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="flex items-center gap-2 text-primary hover:text-primary/70 font-semibold"
                      >
                        <FiEdit2 size={16} /> Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(address._id);
                        }}
                        className="flex items-center gap-2 text-red-500 hover:text-red-700 font-semibold"
                      >
                        <FiTrash2 size={16} /> Delete
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Proceed Button */}
            {addresses.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={handleSelectAndProceed}
                  disabled={!selectedAddressId}
                  className="w-full bg-gradient-to-r from-primary to-pink-600 text-white font-bold py-4 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {!selectedAddressId 
                    ? 'Select an Address to Continue' 
                    : cartItems.length > 0 
                      ? 'Proceed to Checkout' 
                      : 'Continue Shopping'}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
