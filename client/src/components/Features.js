import React from 'react';
import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiRotateCcw, FiHeadphones } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: FiTruck,
      title: 'Free Shipping',
      description: 'On orders above ₹500',
    },
    {
      icon: FiShield,
      title: 'Secure Payment',
      description: '100% secure transactions',
    },
    {
      icon: FiRotateCcw,
      title: 'Easy Returns',
      description: '30 days return policy',
    },
    {
      icon: FiHeadphones,
      title: '24/7 Support',
      description: 'Dedicated customer service',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-16 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-dark">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="text-center p-6 rounded-lg bg-light hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-primary text-white p-4 rounded-full">
                    <Icon size={32} />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 text-dark">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
