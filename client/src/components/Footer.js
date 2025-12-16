import React from 'react';
import { motion } from 'framer-motion';
import { FiFacebook, FiInstagram, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  const quickLinks = ['About Us', 'Contact', 'Privacy Policy', 'Terms & Conditions'];
  const socialLinks = [
    { icon: FiFacebook, label: 'Facebook', url: '#' },
    { icon: FiInstagram, label: 'Instagram', url: '#' },
    { icon: FiTwitter, label: 'Twitter', url: '#' },
    { icon: FiMail, label: 'Email', url: '#' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-b border-gray-700">
          {/* Brand & About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-primary mb-3">Maya</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your ultimate fashion and lifestyle destination. Discover premium brands, exclusive deals, and trending collections all in one place.
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>📍 Fashion Hub, Mumbai, India</p>
              <p>📞 1-800-123-4567</p>
              <p>📧 support@maya.com</p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold mb-4 text-gray-100 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-primary transition text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold mb-4 text-gray-100 text-sm uppercase tracking-wide">Follow Us</h4>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    whileHover={{ scale: 1.15 }}
                    className="bg-gray-800 hover:bg-primary p-3 rounded-full transition text-white"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-xs text-gray-300">
              <p className="font-semibold mb-1">✓ Secure Transactions</p>
              <p>All payments are encrypted & secure</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 text-xs text-gray-500">
          <p>© 2025 Maya. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
