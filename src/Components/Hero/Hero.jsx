import React from 'react';
import { motion } from 'framer-motion';
import guy from '../../assets/guy.png'

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden py-20 lg:py-24">
      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-violet-200/30 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="text-left space-y-6">
            {/* Brand Tag */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-md border border-gray-100 animate-fade-in-down">
              <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                MockMate AI
              </span>
        </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
              <span>Bring all your</span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                interviews together
              </span>
              <span className="inline-block ml-2 animate-bounce-slow">⚡</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-xl animate-fade-in-up">
              A better experience for your interview preparation and less stress for your career journey.
            </p>

            {/* CTA Button */}
            <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <button className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>

          {/* Right Column - Image & Floating Elements */}
          <div className="relative animate-fade-in-left">
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-visible p-2 animate-fade-in">
              <img 
                src={guy} 
                alt="Interview Preparation"
                className="w-full h-full object-cover rounded-2xl relative z-0"
              />
            </div>

            <motion.div 
              className="absolute -top-4 -left-4 bg-white rounded-2xl p-3 shadow-lg transform -rotate-6 hover:rotate-0 transition-all duration-300 hover:scale-105 z-30"
              animate={{ y: [-8, 2, -8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center relative">
                  <span className="text-white font-semibold">M</span>
                  <div className="absolute -right-1 -top-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Mireya</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-xs text-green-600">Online</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Floating Card - David */}
            <motion.div 
              className="absolute top-1/4 -right-8 bg-white rounded-2xl p-3 shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300 hover:scale-105 z-30"
              animate={{ y: [-8, 2, -8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center relative">
                  <span className="text-white font-semibold">D</span>
                  <div className="absolute -right-1 -top-1 w-3 h-3 bg-blue-400/50 rounded-full animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">David</span>
                  <div className="flex items-center">
                    <span className="text-xs text-blue-600 animate-pulse">Interviewing</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Bottom Status Card */}
            <motion.div 
              className="absolute -bottom-8 -right-4 bg-white rounded-2xl p-4 shadow-lg hover:scale-105 transition-all duration-300 z-30"
              animate={{ y: [-8, 2, -8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white relative group">
                  <svg className="w-7 h-7 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div className="absolute -right-1 -top-1 w-3 h-3 bg-emerald-400/50 rounded-full animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-gray-900">Interview Ready!</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-[98%] h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-sm text-emerald-600 font-medium">98%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Single decorative element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-violet-200/20 to-fuchsia-200/20 rounded-full blur-3xl" />
          </div>
          </div>
        </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <div className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center p-1">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-scroll" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
