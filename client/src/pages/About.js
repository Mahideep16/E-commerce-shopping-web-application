import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Happy Customers', value: '500K+' },
    { label: 'Products', value: '100K+' },
    { label: 'Cities', value: '250+' },
    { label: 'Years', value: '10+' },
  ];

  const values = [
    {
      title: 'Quality',
      description: 'We ensure every product meets the highest quality standards.',
      icon: '✓',
    },
    {
      title: 'Trust',
      description: 'Your satisfaction and trust are our top priorities.',
      icon: '♡',
    },
    {
      title: 'Innovation',
      description: 'We continuously innovate to improve your shopping experience.',
      icon: '⚡',
    },
    {
      title: 'Support',
      description: '24/7 customer support to help you anytime.',
      icon: '◎',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-4 text-center"
        >
          <h1 className="text-5xl font-bold mb-6">About Maya</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Revolutionizing online shopping with premium quality products, affordable prices, and exceptional customer service.
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Maya was founded in 2014 with a simple mission: to make quality fashion and lifestyle products accessible to everyone. What started as a small team of passionate individuals has grown into one of the leading e-commerce platforms in the region.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We believe that everyone deserves to access premium quality products at affordable prices. Our extensive network of suppliers, logistics partners, and dedicated team members work tirelessly to deliver this promise every single day.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we serve over 500,000 happy customers across 250+ cities, offering a curated selection of products from trusted brands and sellers.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
              alt="Our team"
              className="rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'XYZ', role: 'Founder & CEO' },
              { name: 'Maya', role: 'Chief Product Officer' },
              { name: 'Needi', role: 'Chief Technology Officer' },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-6 rounded-xl shadow text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Start shopping with Maya today and discover amazing products at unbeatable prices.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/products')}
            className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 mx-auto hover:bg-gray-100 transition"
          >
            Shop Now <FiArrowRight />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
