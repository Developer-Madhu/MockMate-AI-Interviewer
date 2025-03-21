import React, { useState } from "react";

const Overview = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      position: "top-0 left-1/2 -translate-x-1/2 -translate-y-[52%]",
      title: "Beginner",
      number: 1,
      gradient: "from-blue-500 via-violet-500 to-purple-600",
      description: "Understanding basic interview concepts and common questions.",
      animation: "animate-fade-in-down"
    },
    {
      position: "top-[12%] right-0 translate-x-[52%] -translate-y-[12%]",
      title: "Intermediate",
      number: 2,
      gradient: "from-violet-500 via-fuchsia-500 to-pink-600",
      description: "Practicing structured problem-solving and technical questions.",
      animation: "animate-fade-in-right"
    },
    {
      position: "bottom-[12%] right-0 translate-x-[52%] translate-y-[12%]",
      title: "Advanced",
      number: 3,
      gradient: "from-fuchsia-500 via-pink-500 to-rose-600",
      description: "Working on real-world case studies and mock interviews.",
      animation: "animate-fade-in-right"
    },
    {
      position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-[52%]",
      title: "Expert",
      number: 4,
      gradient: "from-pink-500 via-rose-500 to-orange-600",
      description: "Polishing communication skills and handling tricky scenarios.",
      animation: "animate-fade-in-up"
    },
    {
      position: "bottom-[12%] left-0 -translate-x-[52%] translate-y-[12%]",
      title: "Mastery",
      number: 5,
      gradient: "from-rose-500 via-orange-500 to-yellow-600",
      description: "Becoming fully confident and ready for your dream job!",
      animation: "animate-fade-in-left"
    },
    {
      position: "top-[12%] left-0 -translate-x-[52%] -translate-y-[12%]",
      title: "Dream Job",
      number: 6,
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      description: "Landing your dream role and starting your success journey!",
      animation: "animate-fade-in-left"
    }
  ];

  return (
    <section className="relative min-h-screen py-8 sm:py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/30 via-fuchsia-50/20 to-rose-50/30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24 sm:mb-32 md:mb-40 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
            Your Journey to Interview Success
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Follow our structured learning path to master the art of interviewing
          </p>
        </div>
        
        {/* Circular Steps Layout */}
        <div className="relative w-full max-w-[280px] xs:max-w-[340px] sm:max-w-[450px] md:max-w-[580px] lg:max-w-[720px] aspect-square mx-auto">
          {/* Center Circle with Enhanced Animation */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 xs:w-24 sm:w-28 md:w-32 lg:w-36 aspect-square bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl z-20 animate-pulse-slow group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/50 via-fuchsia-500/50 to-pink-500/50 blur-md group-hover:blur-lg transition-all duration-500"></div>
            <div className="relative text-white text-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold">6</span>
              <p className="text-[10px] xs:text-xs mt-0.5">Steps</p>
            </div>
          </div>

          {/* Circular Path */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Main circle with gradient and rotation */}
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="url(#gradient-stroke)"
                strokeWidth="0.75"
                className="animate-spin-slower"
              />
              {/* Inner circle with gradient */}
              <circle
                cx="50"
                cy="50"
                r="32"
                fill="none"
                stroke="url(#gradient-stroke-2)"
                strokeWidth="0.75"
                className="animate-pulse-slow opacity-60"
              />
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="gradient-stroke" gradientTransform="rotate(90)">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#D946EF" />
                  <stop offset="100%" stopColor="#F43F5E" />
                </linearGradient>
                <linearGradient id="gradient-stroke-2" gradientTransform="rotate(45)">
                  <stop offset="0%" stopColor="#6D28D9" />
                  <stop offset="100%" stopColor="#DB2777" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Enhanced Step Cards */}
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`absolute ${step.position} group transition-all duration-500 hover:scale-105 ${step.animation}`}
              style={{ 
                animationDelay: `${index * 300}ms`,
                zIndex: activeStep === index ? 30 : 10 
              }}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className={`bg-white/90 backdrop-blur-sm rounded-xl p-3 xs:p-4 sm:p-5 shadow-lg transition-all duration-500 w-[140px] xs:w-[160px] sm:w-[200px] md:w-[220px] lg:w-[240px] border border-gray-100
                ${activeStep === index ? 'shadow-2xl shadow-violet-500/20 scale-105' : 'hover:shadow-xl'}`}>
                <div className={`absolute -top-3 -left-3 w-7 xs:w-8 sm:w-10 aspect-square bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center text-white font-bold text-xs xs:text-sm sm:text-base shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {step.number}
                </div>
                <div className="mt-2 xs:mt-3">
                  <h3 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 group-hover:text-violet-600 transition-colors duration-300">{step.title}</h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-2 xs:mt-3 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${step.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700`}
                  ></div>
                </div>
              </div>
            </div>
          ))}

          {/* Enhanced Progress Circle */}
          <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2">
            <div className="relative w-12 xs:w-16 aspect-square">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  className="text-gray-100"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="32"
                  cy="32"
                />
                <circle
                  className="text-violet-500"
                  strokeWidth="4"
                  strokeDasharray="188.5"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  stroke="url(#progress-gradient)"
                  fill="transparent"
                  r="30"
                  cx="32"
                  cy="32"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="188.5"
                    to="0"
                    dur="2s"
                    fill="freeze"
                  />
                </circle>
                <defs>
                  <linearGradient id="progress-gradient">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="50%" stopColor="#D946EF" />
                    <stop offset="100%" stopColor="#F43F5E" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-br from-violet-600 to-fuchsia-600">6</span>
                <p className="text-xs text-gray-600">Steps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
