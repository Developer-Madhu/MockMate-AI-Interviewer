import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";
import { useAuth } from "../../Pages/Auth/AuthContext"; // Adjust the import path as needed

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth(); // Get the authentication state and logout function
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#7c3aed' }} />
                    <stop offset="100%" style={{ stopColor: '#d946ef' }} />
                  </linearGradient>
                </defs>
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path d="M12 2C7 2 4 6 4 10c0 2.5 1.5 4.5 3 6a4.8 4.8 0 0 1 1 3h8a4.8 4.8 0 0 1 1-3c1.5-1.5 3-3.5 3-6 0-4-3-8-8-8z" />
              </svg>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                MockMate AI
              </span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-violet-600 transition-colors duration-300 text-sm font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: menuItems.length * 0.1 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 focus:outline-none hover:bg-transparent active:bg-transparent"
            >
              <div className="relative w-6 h-5">
                <motion.span
                  className="absolute w-6 h-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 transform transition-transform duration-300"
                  animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="absolute w-6 h-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 top-2 transition-opacity duration-300"
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="absolute w-6 h-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 top-4 transform transition-transform duration-300"
                  animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
                />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden bg-white/95 backdrop-blur-sm rounded-b-2xl shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-4 space-y-1">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-violet-600 hover:bg-gray-50 transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.button
                  className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: menuItems.length * 0.1 }}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
