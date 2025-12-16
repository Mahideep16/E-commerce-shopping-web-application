import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products';

// Helper function to get image path from public/assets folder
const getAssetPath = (imageName) => `${process.env.PUBLIC_URL}/assets/${imageName}.png`;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [brandsCarousel, setBrandsCarousel] = useState(0);

  useEffect(() => {
    setProducts(productsData.slice(0, 12));
  }, []);

  // Rising Stars Brands Data
  const brands = [
    { name: 'RARE RABBIT', tagline: 'Style Meets Comfort', discount: 'Min. 50% Off', image: getAssetPath('RARE RABBIT') },
    { name: 'SNITCH', tagline: 'Modern Comfort', discount: 'Min. 60% Off', image: getAssetPath('SNITCH') },
    { name: 'POWERLOOK', tagline: 'Effortless Fashion', discount: 'Min. 60% Off', image: getAssetPath('POWERLOOK') },
    { name: 'FABLESTREET', tagline: 'Western Flair, Modern Elegance', discount: 'Min. 50% Off', image: getAssetPath('FABLESTREET') },
    { name: 'GLOBUS', tagline: 'Shine with Confidence', discount: 'Min. 30% Off', image: getAssetPath('GLOBUS') },
  ];

  // Shop by Category Data
  const categories = [
    { name: 'Casual', discount: '40-80% OFF', image: getAssetPath('Casual') },
    { name: 'Activewear', discount: '30-70% OFF', image: getAssetPath('Activewear') },
    { name: 'Men Sports', discount: '30-70% OFF', image: getAssetPath('Men Sports') },
    { name: 'Western Wear', discount: '40-80% OFF', image: getAssetPath('Western Wear') },
    { name: 'Sportswear', discount: '30-80% OFF', image: getAssetPath('Sportswear') },
    { name: 'Kids Wear', discount: '50-70% OFF', image: getAssetPath('Kids Wear') },
    { name: 'Footwear', discount: '50-70% OFF', image: getAssetPath('Footwear') },
    { name: 'Bags & Belts', discount: '40-70% OFF', image: getAssetPath('Bags & Belts') },
    { name: 'Office Wear', discount: '40-70% OFF', image: getAssetPath('Office Wear') },
    { name: 'Formal Wear', discount: 'UP TO 60% OFF', image: getAssetPath('Formal Wear') },
  ];

  const scrollBrands = (direction) => {
    if (direction === 'left') {
      setBrandsCarousel(Math.max(0, brandsCarousel - 1));
    } else {
      setBrandsCarousel(Math.min(brands.length - 4, brandsCarousel + 1));
    }
  };

  return (
    <div className="bg-white pt-20">
      {/* Banner */}
      <Banner />

      {/* Promo Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-6 mx-4 my-6 rounded-lg"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-orange-500 mb-2">Get 15% Off</h2>
            <p className="text-2xl text-gray-800 font-bold mb-4">Up To ₹200 Off*</p>
            <div className="bg-white px-4 py-3 rounded-lg inline-block">
              <p className="text-sm text-gray-600">COUPON CODE</p>
              <p className="text-2xl font-black text-gray-900">MAYA15</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">On Your First Order | T&C Apply</p>
            <div className="flex justify-center gap-4">
              <div className="text-4xl font-bold text-primary">%</div>
              <div className="text-4xl font-bold text-primary">50 Off*</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rising Stars Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">RISING STARS</h2>
        <p className="text-gray-600 mb-6">Trending brands loved by everyone</p>

        <div className="relative px-8">
          {/* Left Arrow */}
          {brandsCarousel > 0 && (
            <button
              onClick={() => scrollBrands('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:shadow-xl transition"
            >
              <FiChevronLeft size={24} className="text-primary" />
            </button>
          )}

          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500"
              style={{ transform: `translateX(-${brandsCarousel * 300}px)` }}
            >
              {brands.map((brand, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-64 cursor-pointer group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-gray-100 h-72 mb-4">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300"></div>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 text-base">{brand.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{brand.tagline}</p>
                    <p className="text-lg font-bold text-primary">{brand.discount}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          {brandsCarousel < brands.length - 4 && (
            <button
              onClick={() => scrollBrands('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:shadow-xl transition"
            >
              <FiChevronRight size={24} className="text-primary" />
            </button>
          )}
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1].map((dot) => (
            <button
              key={dot}
              onClick={() => setBrandsCarousel(dot * (brands.length - 4))}
              className={`w-2 h-2 rounded-full transition ${brandsCarousel === dot * (brands.length - 4) ? 'bg-primary' : 'bg-gray-300'}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-full mx-auto px-3 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">SHOP BY CATEGORY</h2>
            <p className="text-gray-600 mb-8">Browse products by category</p>
          </div>

          {/* Scrollable Container */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 md:gap-4 pb-4 px-3 md:px-8 min-w-max">
              {categories.map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-40 sm:w-44 md:w-48 cursor-pointer group"
                >
                  <Link to="/products" className="block h-full">
                    <div className="relative overflow-hidden rounded-lg bg-gray-300 h-40 md:h-52 mb-2 md:mb-3 flex flex-col justify-end">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      {/* Dark overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      
                      {/* Content */}
                      <div className="relative p-3 md:p-4 text-white z-10">
                        <p className="font-bold text-sm md:text-base line-clamp-2">{cat.name}</p>
                        <p className="text-xs md:text-sm font-bold text-secondary mt-1">{cat.discount}</p>
                      </div>
                    </div>
                    
                    {/* Shop Now Button */}
                    <button className="w-full bg-white text-gray-900 border-2 border-gray-300 py-2 rounded-lg font-bold text-xs md:text-sm hover:border-primary hover:text-primary transition duration-300">
                      Shop Now
                    </button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">NEW ARRIVALS</h2>
            <p className="text-gray-600">Latest trending products just added</p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition"
          >
            View All <FiArrowRight />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-primary to-pink-600 text-white py-12 my-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
            <p className="text-white/90 mb-6">Get exclusive deals and updates straight to your inbox</p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none"
              />
              <button className="bg-secondary text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
