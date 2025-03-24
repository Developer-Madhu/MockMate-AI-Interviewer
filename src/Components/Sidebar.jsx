import React, { useState } from "react"
import { Menu, X, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const menuItems = ['Dashboard', 'Interview', 'Settings']

  const isActivePath = (item) => {
    const path = location.pathname.toLowerCase()
    if (item.toLowerCase() === 'dashboard' && path === '/') return true
    return path.includes(item.toLowerCase())
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div 
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 hidden lg:block"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <span className="text-xl font-bold text-blue-500">
              MockMate
            </span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActivePath(item)
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item}
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Mobile menu button */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="lg:hidden fixed top-0 left-0 p-4 z-50"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </motion.div>

      {/* Mobile navigation */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 lg:hidden"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="fixed inset-0 bg-black" 
            onClick={() => setIsOpen(false)} 
          />
          <motion.div 
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className="fixed inset-y-0 left-0 w-64 bg-white p-4"
          >
            <div className="flex items-center h-16 mb-4">
              <span className="text-xl font-bold text-blue-500">MockMate</span>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className={`block px-4 py-2 rounded-lg ${
                    isActivePath(item)
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default Sidebar 