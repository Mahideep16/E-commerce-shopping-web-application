import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiHeart, FiMenu, FiX, FiSearch, FiLogOut, FiUser } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { getTotalItems } = useCart();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();

  const categories = ['Men', 'Women', 'Kids', 'Accessories', 'Footwear', 'Beauty'];

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary to-pink-600 text-white py-2 px-4 text-center text-sm">
        <span>🎉 SPECIAL OFFER: Get 50% OFF on selected items!</span>
      </div>

      {/* Main Header */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-primary hover:text-pink-700 transition duration-300"
        >
          Maya
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            to="/products"
            className="text-gray-700 font-semibold hover:text-primary transition duration-300 relative group"
          >
            
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${category}`}
              className="text-gray-700 font-semibold hover:text-primary transition duration-300 relative group text-sm"
            >
              {category}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
          <Link
            to="/about"
            className="text-gray-700 font-semibold hover:text-primary transition duration-300 relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 font-semibold hover:text-primary transition duration-300 relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-light rounded-full px-4 py-2 flex-1 mx-8">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent ml-2 outline-none w-full"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <Link
            to="/wishlist"
            className="text-gray-700 hover:text-primary transition duration-300 relative hidden sm:block"
          >
            <FiHeart size={24} />
            {getWishlistCount() > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
              >
                {getWishlistCount()}
              </motion.span>
            )}
          </Link>

          <Link
            to="/cart"
            className="text-gray-700 hover:text-primary transition duration-300 relative"
          >
            <FiShoppingBag size={24} />
            {getTotalItems() > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
              >
                {getTotalItems()}
              </motion.span>
            )}
          </Link>

          {user ? (
            <div className="hidden sm:flex items-center gap-4">
              <Link
                to="/profile"
                className="flex items-center gap-2 text-gray-700 hover:text-primary transition duration-300 font-semibold"
              >
                <FiUser size={20} />
                {user.name?.split(' ')[0]}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition duration-300"
              >
                <FiLogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/login"
                className="text-gray-700 hover:text-primary transition duration-300 font-semibold"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 hover:text-primary transition duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden bg-white border-t border-gray-200"
      >
        <div className="px-4 py-4 space-y-4">
          <Link
            to="/products"
            className="block text-gray-700 font-semibold hover:text-primary transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${category}`}
              className="block text-gray-700 font-semibold hover:text-primary transition duration-300 text-sm"
              onClick={() => setIsOpen(false)}
            >
              {category}
            </Link>
          ))}
          <Link
            to="/about"
            className="block text-gray-700 font-semibold hover:text-primary transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 font-semibold hover:text-primary transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <div className="border-t pt-4 mt-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block text-gray-700 font-semibold hover:text-primary transition duration-300 mb-3"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/address"
                  className="block text-gray-700 font-semibold hover:text-primary transition duration-300 mb-3"
                  onClick={() => setIsOpen(false)}
                >
                  My Addresses
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left text-gray-700 font-semibold hover:text-red-600 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700 font-semibold hover:text-primary transition duration-300 mb-3"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full bg-primary text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
