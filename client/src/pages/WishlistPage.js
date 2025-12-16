import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1, product.sizes?.[0] || 'M', product.colors?.[0] || 'Black');
    removeFromWishlist(product.id);
    alert('Moved to cart!');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-light pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-dark mb-2">My Wishlist</h1>
            <p className="text-gray-600">Save your favorite items for later</p>
          </motion.div>

          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FiShoppingCart size={64} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Add items to your wishlist to save them for later</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-pink-700 transition duration-300"
            >
              <FiArrowLeft />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-dark mb-2">My Wishlist</h1>
            <p className="text-gray-600">{wishlistItems.length} item(s) saved</p>
          </div>
          <button
            onClick={clearWishlist}
            className="text-red-500 hover:text-red-700 transition font-semibold flex items-center gap-2"
          >
            <FiTrash2 size={20} />
            Clear All
          </button>
        </motion.div>

        {/* Wishlist Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8"
        >
          {wishlistItems.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 },
                },
              }}
              className="relative"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 group">
                <Link to={`/product/${product.id}`} className="block">
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-light h-64">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Badges */}
                    {product.isNew && (
                      <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                        NEW
                      </div>
                    )}

                    {product.discount && (
                      <div className="absolute top-3 right-3 bg-secondary text-dark px-2 py-1 rounded text-xs font-bold">
                        -{product.discount}%
                      </div>
                    )}

                    {/* Delete from Wishlist */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromWishlist(product.id);
                      }}
                      className="absolute top-3 right-3 z-10 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-gray-500 text-xs font-semibold mb-1">
                      {product.brand || 'Brand'}
                    </p>
                    <h3 className="text-gray-800 font-semibold line-clamp-2 hover:text-primary transition duration-300">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-1 my-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-xs text-gray-600">
                          {product.rating} ({product.reviews || 0})
                        </span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-primary font-bold text-lg">
                        ₹{Math.floor(product.price).toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          ₹{Math.floor(product.originalPrice).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Move to Cart Button */}
                <button
                  onClick={() => handleMoveToCart(product)}
                  className="w-full bg-primary text-white py-2 font-bold hover:bg-pink-700 transition duration-300 flex items-center justify-center gap-2"
                >
                  <FiShoppingCart size={18} />
                  Move to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Shopping Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-pink-700 transition duration-300"
          >
            <FiArrowLeft />
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default WishlistPage;
