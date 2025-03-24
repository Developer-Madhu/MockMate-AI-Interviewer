import React, { useEffect, useState } from "react"
import { useAuth } from "../Auth/AuthContext"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Bell, Search, TrendingUp, Users, Target, Activity } from "lucide-react"
import { motion } from "framer-motion"
import Sidebar from "../../components/Sidebar"

const Dashboard = () => {
  const { user } = useAuth()
  const [hoveredCard, setHoveredCard] = useState(null)

  // Sample data for the chart
  const data = [
    { name: 'Jan', score: 65 },
    { name: 'Feb', score: 75 },
    { name: 'Mar', score: 85 },
    { name: 'Apr', score: 80 },
    { name: 'May', score: 90 },
    { name: 'Jun', score: 95 },
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const statsCards = [
    {
      title: "Questions Attempted",
      value: user?.questionHistory?.length || 0,
      icon: <Activity className="w-6 h-6" />,
      color: "from-blue-500 to-blue-400"
    },
    {
      title: "Average Score",
      value: user?.score || 0,
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
          <div className="max-w-7xl mx-auto space-y-6">
            <motion.h1 
              {...fadeInUp}
              className="text-3xl font-bold text-gray-900"
            >
              Welcome back, <span className="text-blue-500">{user?.username}</span>!
            </motion.h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {statsCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="relative overflow-hidden bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{card.title}</p>
                      <h3 className="text-3xl font-bold mt-2">{card.value}</h3>
                    </div>
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color} text-white`}>
                      {card.icon}
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === index ? 0.1 : 0 }}
                    className={`absolute inset-0 bg-gradient-to-r ${card.color}`}
                  />
                </motion.div>
              ))}
            </div>

            {/* Performance Chart */}
            <motion.div 
              {...fadeInUp}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <h2 className="text-xl font-bold mb-6">Performance Overview</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.4} />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="score" 
                      fill="url(#colorScore)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div 
              {...fadeInUp}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {user?.questionHistory?.slice(0, 5).map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{question.question}</p>
                      <p className="text-sm text-gray-500">Score: {question.score}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(question.timestamp).toLocaleDateString()}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard