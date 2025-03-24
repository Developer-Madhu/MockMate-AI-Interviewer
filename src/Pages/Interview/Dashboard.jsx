import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Target, TrendingUp, Activity, Search, Bell } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    totalQuestions: 0,
    averageScore: 0,
    totalScore: 0,
    recentActivity: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar
  const location = useLocation();

  const menuItems = ['Home', 'Dashboard', 'Interview', 'Settings']; // Sidebar links

  const isActivePath = (item) => {
    const path = location.pathname.toLowerCase();
    if (item.toLowerCase() === 'home' && path === '/') return true;
    if (item.toLowerCase() === 'dashboard' && path === '/') return true;
    return path.includes(item.toLowerCase());
  };

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }

    // Get progress data from localStorage
    const storedProgress = localStorage.getItem("progress");
    if (storedProgress) {
      const progressData = JSON.parse(storedProgress);
      setStats({
        totalQuestions: progressData.totalQuestions || 0,
        averageScore: progressData.averageScore || 0,
        totalScore: progressData.score || 0,
        recentActivity: userData?.questionHistory || [],
      });
    }

    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("progress");
    navigate("/login");
  };

  // Chart data for user performance
  const chartData = {
    labels: stats.recentActivity.map((_, index) => `Attempt ${index + 1}`),
    datasets: [
      {
        label: "Score",
        data: stats.recentActivity.map((activity) => activity.score || 0),
        borderColor: "rgba(79, 70, 229, 1)",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Your Performance Over Time",
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">User data not found. Please login again.</div>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Questions",
      value: stats.totalQuestions,
      icon: <Target className="h-6 w-6 text-white" />,
      gradient: "from-blue-500 to-blue-600",
      color: "text-blue-500",
    },
    {
      title: "Average Score",
      value: `${stats.averageScore.toFixed(1)}%`,
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      gradient: "from-green-500 to-green-600",
      color: "text-green-500",
    },
    {
      title: "Total Score",
      value: stats.totalScore,
      icon: <Activity className="h-6 w-6 text-white" />,
      gradient: "from-purple-500 to-purple-600",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
      <div className="lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-4 lg:p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome back, {userData.username}!
              </h1>
              <p className="text-gray-600">
                {userData.education} • {userData.interests}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-4 lg:p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`p-3 bg-gradient-to-br ${card.gradient} rounded-full text-white`}
                >
                  {card.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-4 lg:p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Performance Chart
          </h2>
          <Line data={chartData} options={chartOptions} />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-4 lg:p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {activity.question}
                    </p>
                    <p className="text-sm text-gray-600">
                      Score: {activity.score || 0}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No recent activity. Start practicing!
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;