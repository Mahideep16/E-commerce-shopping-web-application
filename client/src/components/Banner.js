import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
  const banners = [
    {
      id: 1,
      title: 'Summer Collection',
      subtitle: 'Up to 70% off on trending styles',
      image: 'https://via.placeholder.com/1200x400?text=Summer+Collection',
      color: 'from-pink-500 to-red-500',
    },
    {
      id: 2,
      title: 'New Arrivals',
      subtitle: 'Shop the latest fashion trends',
      image: 'https://via.placeholder.com/1200x400?text=New+Arrivals',
      color: 'from-blue-500 to-purple-500',
    },
    {
      id: 3,
      title: 'Exclusive Deals',
      subtitle: 'Member only offers',
      image: 'https://via.placeholder.com/1200x400?text=Exclusive+Deals',
      color: 'from-green-500 to-teal-500',
    },
  ];

  const [currentBanner, setCurrentBanner] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="relative w-full h-96 md:h-96 overflow-hidden rounded-lg mt-20 mb-8">
      {banners.map((banner, index) => (
        <motion.div
          key={banner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentBanner === index ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className={`w-full h-full bg-gradient-to-r ${banner.color} flex items-center justify-center text-white`}
          >
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{banner.title}</h1>
              <p className="text-lg md:text-xl mb-8">{banner.subtitle}</p>
              <button className="bg-white text-primary font-bold px-8 py-3 rounded-lg hover:shadow-lg transition duration-300 hover:scale-105">
                Shop Now
              </button>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentBanner(index)}
            animate={{
              width: currentBanner === index ? 32 : 12,
              opacity: currentBanner === index ? 1 : 0.6,
            }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-full h-3 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
