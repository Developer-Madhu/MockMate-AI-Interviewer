import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter Plan",
      price: isYearly ? "₹999" : "₹99",
      period: isYearly ? "/year" : "/month",
      description: "Perfect for beginners",
      features: [
        { name: "Practice Interviews", value: "10/month" },
        { name: "AI Feedback", value: "Basic" },
        { name: "Question Bank Access", value: "Limited" },
        { name: "Performance Analytics", value: "Basic" }
      ]
    },
    {
      name: "Pro Version",
      price: isYearly ? "₹4999" : "₹499",
      period: isYearly ? "/year" : "/month",
      description: "For serious candidates",
      features: [
        { name: "Practice Interviews", value: "Unlimited" },
        { name: "AI Feedback", value: "Advanced" },
        { name: "Question Bank Access", value: "Full" },
        { name: "Performance Analytics", value: "Advanced" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-4"
          >
            Choose Your Plan
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Select the perfect plan for your interview preparation journey
          </motion.p>

          {/* Billing Toggle */}
          <br />
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-1.5 flex items-center shadow-md">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  !isYearly 
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isYearly 
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.5 }}
              className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-8 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-500 mb-6">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-violet-600">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="p-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-gray-600">{feature.name}</span>
                    <span className="text-violet-600 font-medium">{feature.value}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="p-8 pt-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium hover:shadow-lg transition-shadow duration-300"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-500 mt-12"
        >
          All plans include 7-day free trial. No credit card required.
        </motion.p>
      </div>
    </div>
  );
};

export default Pricing;
