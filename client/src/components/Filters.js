import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const Filters = ({ onFilterChange }) => {
  const [expandedFilter, setExpandedFilter] = useState(null);

  const filters = {
    category: ['Men', 'Women', 'Kids', 'Accessories', 'Footwear', 'Beauty'],
    brand: ['Nike', 'Adidas', 'Puma', 'Reebok', 'Saucony', 'Asics'],
    price: ['₹0 - ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', '₹2000 - ₹5000', '₹5000+'],
    rating: ['4★ & above', '3★ & above', '2★ & above', '1★ & above'],
  };

  const toggleFilter = (filterName) => {
    setExpandedFilter(expandedFilter === filterName ? null : filterName);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-lg font-bold text-dark mb-6">Filters</h2>

      {Object.entries(filters).map(([filterName, options]) => (
        <div key={filterName} className="mb-6 border-b border-gray-200 pb-6">
          <button
            onClick={() => toggleFilter(filterName)}
            className="w-full flex items-center justify-between font-semibold text-gray-800 hover:text-primary transition duration-300"
          >
            <span className="capitalize">{filterName}</span>
            <motion.div
              animate={{ rotate: expandedFilter === filterName ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown />
            </motion.div>
          </button>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={
              expandedFilter === filterName
                ? { opacity: 1, height: 'auto' }
                : { opacity: 0, height: 0 }
            }
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-3"
          >
            {options.map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    onFilterChange(filterName, option, e.target.checked)
                  }
                  className="w-4 h-4 text-primary rounded cursor-pointer"
                />
                <span className="text-gray-700 group-hover:text-primary transition duration-300">
                  {option}
                </span>
              </label>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default Filters;
