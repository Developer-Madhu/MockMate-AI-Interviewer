import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, LogOut } from "lucide-react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = ['Home', 'Dashboard', 'Interview', 'Settings'];

  const isActivePath = (item) => {
    const path = location.pathname.toLowerCase();
    if (item.toLowerCase() === 'home' && path === '/') return true;
    if (item.toLowerCase() === 'dashboard' && path === '/') return true;
    return path.includes(item.toLowerCase());
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("progress");
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg hidden lg:flex lg:flex-col"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b border-gray-100">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
              MockMate
            </span>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item}
                to={item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`}
                className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                  isActivePath(item)
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item}
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Link>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="mx-4 mb-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Mobile menu button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="lg:hidden fixed top-4 left-4 z-50"
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-600 focus:outline-none"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-64 bg-white p-4"
            >
              <div className="flex items-center h-16 mb-4">
                <span className="text-xl font-bold text-blue-500">MockMate</span>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`}
                      className={`block px-4 py-2 rounded-lg ${
                        isActivePath(item)
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;