import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const discount = product.discount || Math.floor(Math.random() * 50 + 10);
  const discount_price = product.originalPrice ? product.originalPrice : product.price * 1.5;

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-200 h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          loading="eager"
          decoding="async"
          style={{ opacity: 1 }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/300x400?text=' + encodeURIComponent(product.name || 'Product');
          }}
        />

        {/* Badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
            NEW
          </div>
        )}

        {/* Discount Badge */}
        <div className="absolute top-3 right-3 bg-secondary text-dark px-2 py-1 rounded text-xs font-bold">
          -{discount}%
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 backdrop-blur-sm"
        >
          <button
            onClick={() => addToCart(product, 1, 'M', 'Black')}
            className="bg-primary text-white p-3 rounded-full hover:bg-pink-700 transition duration-300 transform hover:scale-110"
          >
            <FiShoppingBag size={20} />
          </button>
          <button
            onClick={handleWishlistToggle}
            className={`${
              inWishlist ? 'bg-red-500' : 'bg-white'
            } ${inWishlist ? 'text-white' : 'text-red-500'} p-3 rounded-full hover:scale-110 transition duration-300 transform`}
          >
            <FiHeart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-500 text-xs font-semibold mb-1">
          {product.brand || 'Brand Name'}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="text-gray-800 font-semibold line-clamp-2 hover:text-primary transition duration-300"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 my-2">
          <span className="text-yellow-500">★</span>
          <span className="text-xs text-gray-600">
            {product.rating || 4.5} ({product.reviews || 1200})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold text-lg">
            ₹{Math.floor(product.price).toLocaleString()}
          </span>
          <span className="text-gray-400 line-through text-sm">
            ₹{Math.floor(discount_price).toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
