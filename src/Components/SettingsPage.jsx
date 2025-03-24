import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Settings, Check, Loader } from "lucide-react";

const SettingsPage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "English",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
    }, 2000); // Simulate API call
  };

  const handleSettingsChange = (e) => {
    const { name, checked, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: name === "language" ? value : checked,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
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
                disabled={!isEditing}
                className={`p-2 border rounded-lg focus:outline-none ${
                  isEditing ? "border-blue-500" : "border-gray-200"
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
                disabled={!isEditing}
                className={`p-2 border rounded-lg focus:outline-none ${
                  isEditing ? "border-blue-500" : "border-gray-200"
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
                disabled={!isEditing}
                className={`p-2 border rounded-lg focus:outline-none ${
                  isEditing ? "border-blue-500" : "border-gray-200"
                }`}
                placeholder="••••••••"
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
  );
};

export default SettingsPage;