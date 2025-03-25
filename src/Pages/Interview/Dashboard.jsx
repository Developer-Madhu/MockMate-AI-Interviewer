import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Target, TrendingUp, Activity, Search, Bell, LogOut } from "lucide-react";
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
import Sidebar from '../../components/Sidebar';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      gradient: "from-indigo-500 to-blue-600",
      color: "text-indigo-500",
    },
    {
      title: "Average Score",
      value: `${stats.averageScore.toFixed(1)}%`,
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      gradient: "from-emerald-500 to-teal-600",
      color: "text-emerald-500",
    },
    {
      title: "Total Score",
      value: stats.totalScore,
      icon: <Activity className="h-6 w-6 text-white" />,
      gradient: "from-fuchsia-500 to-purple-600",
      color: "text-fuchsia-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      {/* Main Content */}
      <div className="lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-8 backdrop-blur-sm bg-white/80"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
                Welcome back, {userData.username}!
              </h1>
              <p className="text-gray-500 mt-1">
                {userData.education} • {userData.interests}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2.5 w-64 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                  <p className={`text-2xl font-bold mt-1 ${card.color}`}>
                    {card.value}
                  </p>
                </div>
                <div
                  className={`p-3 bg-gradient-to-br ${card.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
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
          className="bg-white rounded-2xl shadow-sm p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Performance Chart
          </h2>
          <Line data={chartData} options={chartOptions} />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
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
                  className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                >
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {activity.question}
                    </p>
                    <p className="text-sm text-gray-500">
                      Score: {activity.score || 0}
                    </p>
        </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
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