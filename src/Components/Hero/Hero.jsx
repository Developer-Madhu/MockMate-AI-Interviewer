import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="info-section">
      <div className="containers">
        {/* Section Header */}
        <div className="section-header">
          <h1 className="heading">Master the Interview Game with AI</h1>
          <p className="description">
            Empowering candidates with AI-driven, real-time interview solutions that provide personalized insights, adaptive assessments, and intelligent feedback—shaping the future of recruitment and skill development
          </p>
        </div>

        {/* Feature Cards */}
        <div className="features">
          <div className="feature">
            <h2 className="feature-title">Personalized AI Coaching</h2>
            <p className="feature-desc">
              Tailoring your interview experience with real time feedback given by AI
            </p>
            <a href="#" className="learn-more">
              Learn More
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>

          <div className="feature">
            <h2 className="feature-title">Seamless Progress Tracking</h2>
            <p className="feature-desc">
              This built in AI helps you monitor your skills and improve within time.
            </p>
            <a href="#" className="learn-more">
              Learn More
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>

          <div className="feature">
            <h2 className="feature-title">AI-Powered Assessments</h2>
            <p className="feature-desc">
              Smart evaluations provided by the AI which mimic real-world scenarios.
            </p>
            <a href="#" className="learn-more">
              Learn More
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>

          <div className="feature">
            <h2 className="feature-title">Future of Hiring</h2>
            <p className="feature-desc">
              Bridging the gap between talent and opportunity with technology
            </p>
            <a href="#" className="learn-more">
              Learn More
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Button */}

        <button className="main-button"><Link to='/dashboard'>Get Started</Link></button>

      </div>
    </section>
  );
};

export default Hero;
