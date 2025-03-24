import React, { useEffect, useState } from "react"
import { useAuth } from "../Auth/AuthContext"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Bell, Search, TrendingUp, Users, Target, Activity } from "lucide-react"
import { motion } from "framer-motion"
import Sidebar from "../../components/Sidebar"

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalQuestions: 0,
    averageScore: 0,
    questionsByMonth: []
  })
  const [recentQuestions, setRecentQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch statistics
        const statsResponse = await fetch(`http://localhost:3000/api/questions/stats/${user.id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const statsData = await statsResponse.json();
        setStats(statsData);

        // Fetch recent questions
        const questionsResponse = await fetch(`http://localhost:5000/api/questions/user/${user.id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const questionsData = await questionsResponse.json();
        setRecentQuestions(questionsData.slice(0, 5)); // Get only the 5 most recent questions
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const statsCards = [
    {
      title: "Questions Attempted",
      value: stats.totalQuestions,
      icon: <Activity className="w-6 h-6" />,
      color: "from-blue-500 to-blue-400"
    },
    {
      title: "Average Score",
      value: Math.round(stats.averageScore),
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-blue-500 to-blue-400"
    },
    {
      title: "Target Score",
      value: 50,
      icon: <Target className="w-6 h-6" />,
      color: "from-blue-500 to-blue-400"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        {/* Header */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="border-b border-gray-200 h-16 fixed top-0 right-0 left-0 lg:left-64 flex items-center justify-between px-6 backdrop-blur-sm bg-white/80"
        >
          <div className="flex items-center flex-1">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </motion.button>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium"
            >
              {user?.username?.charAt(0).toUpperCase()}
            </motion.div>
          </div>
        </motion.header>

        {/* Main content */}
        <main className="p-6 pt-24">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statsCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{card.title}</p>
                    <p className="text-2xl font-semibold mt-1">{card.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-br ${card.color}`}>
                    {card.icon}
                  </div>
        </div>
              </motion.div>
            ))}
        </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.questionsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
        </div>
      </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentQuestions.map((question, index) => (
                <motion.div
                  key={question._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{question.question}</p>
                    <p className="text-sm text-gray-600">Score: {question.score}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(question.createdAt).toLocaleDateString()}
         </div>
                </motion.div>
              ))}
         </div>
          </div>
        </main>
       </div>
    </div>
  )
}

export default Dashboard