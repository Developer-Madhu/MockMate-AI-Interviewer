import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Settings, Check, Loader, Book, Target, Menu, X, ChevronRight } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const SettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    education: "",
    interests: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "English",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar

  const menuItems = ['Home', 'Dashboard', 'Interview', 'Settings']; // Sidebar links

  const isActivePath = (item) => {
    const path = location.pathname.toLowerCase();
    if (item.toLowerCase() === 'home' && path === '/') return true;
    if (item.toLowerCase() === 'dashboard' && path === '/') return true;
    return path.includes(item.toLowerCase());
  };

  // Fetch user details from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser({
        name: userData.username || "",
        email: userData.email || "",
        password: "", // Password is not stored in localStorage for security reasons
        education: userData.education || "",
        interests: userData.interests || "",
      });
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const payload = {
        username: user.name,
        email: user.email,
        education: user.education,
        interests: user.interests,
      };

      const response = await axios.put(
        "http://localhost:3000/settings",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedUser = { ...user };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsChange = (e) => {
    const { name, checked, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: name === "language" ? value : checked,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 hidden lg:block"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <span className="text-xl font-bold text-blue-500">MockMate</span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item}
                to={item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  isActivePath(item)
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
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

      {/* Main Content */}
      <div className="lg:ml-64 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Settings className="w-8 h-8 mr-2 text-blue-500" />
              Settings
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your profile and application preferences.
            </p>
          </div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <User className="w-6 h-6 mr-2 text-blue-500" />
              Profile
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`p-2 border rounded-lg focus:outline-none ${
                    isEditing ? "border-blue-500" : "border-gray-200 bg-gray-100"
                  }`}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`p-2 border rounded-lg focus:outline-none ${
                    isEditing ? "border-blue-500" : "border-gray-200 bg-gray-100"
                  }`}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm text-gray-600">Password</label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`p-2 border rounded-lg focus:outline-none ${
                    isEditing ? "border-blue-500" : "border-gray-200 bg-gray-100"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm text-gray-600">Education</label>
                <input
                  type="text"
                  name="education"
                  value={user.education}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`p-2 border rounded-lg focus:outline-none ${
                    isEditing ? "border-blue-500" : "border-gray-200 bg-gray-100"
                  }`}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm text-gray-600">Areas of Interest</label>
                <input
                  type="text"
                  name="interests"
                  value={user.interests}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`p-2 border rounded-lg focus:outline-none ${
                    isEditing ? "border-blue-500" : "border-gray-200 bg-gray-100"
                  }`}
                />
              </div>
              <div className="flex justify-end">
                {isEditing ? (
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {isLoading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Application Settings Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-6 border-t border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Settings className="w-6 h-6 mr-2 text-blue-500" />
              Application Settings
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800">Enable Notifications</p>
                  <p className="text-sm text-gray-600">
                    Receive updates and alerts.
                  </p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleSettingsChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800">Dark Mode</p>
                  <p className="text-sm text-gray-600">
                    Switch to a darker theme.
                  </p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="darkMode"
                    checked={settings.darkMode}
                    onChange={handleSettingsChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm text-gray-600">Language</label>
                <select
                  name="language"
                  value={settings.language}
                  onChange={handleSettingsChange}
                  className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;