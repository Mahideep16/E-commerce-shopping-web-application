import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products';

const ProductsPage = () => {
  const allProducts = useMemo(() => productsData, []);
  const [displayed, setDisplayed] = useState(allProducts);
  const [sortBy, setSortBy] = useState('trending');
  const [activeCategories, setActiveCategories] = useState(new Set());

  const applyFilters = (nextCategories, nextSort) => {
    let filtered = allProducts;

    if (nextCategories.size > 0) {
      filtered = filtered.filter((product) => nextCategories.has(product.category));
    }

    if (nextSort === 'price_low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (nextSort === 'price_high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (nextSort === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    setDisplayed(filtered);
  };

  const handleFilterChange = (filterName, option, checked) => {
    if (filterName !== 'category') return;

    const nextCategories = new Set(activeCategories);
    if (checked) {
      nextCategories.add(option);
    } else {
      nextCategories.delete(option);
    }

    setActiveCategories(nextCategories);
    applyFilters(nextCategories, sortBy);
  };

  const handleSort = (value) => {
    setSortBy(value);
    applyFilters(activeCategories, value);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="bg-light min-h-screen pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-dark mb-2">All Products</h1>
          <p className="text-gray-600">Browse our complete collection</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Filters onFilterChange={handleFilterChange} />
          </motion.div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <p className="text-gray-700 font-semibold">
                Showing {displayed.length} products
              </p>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg outline-none hover:border-primary transition duration-300"
              >
                <option value="trending">Sort by: Trending</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayed.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {/* Load More Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center mt-12"
            >
              <button className="bg-primary text-white font-bold px-12 py-4 rounded-lg hover:bg-pink-700 transition duration-300 transform hover:scale-105 shadow-lg">
                Load More Products
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
