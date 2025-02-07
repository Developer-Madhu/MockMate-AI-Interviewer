import React from "react";
import "./Overview.css";

const Overview = () => {
  return (
    <section className="steps-section">
      <div className="container">
        <div className="steps-container">
          {/* Step 1 - Beginner */}
          <div className="step">
            <div className="line"></div>
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="5"></circle>
              </svg>
            </div>
            <div className="step-content">
              <h2>STEP 1 - Beginner</h2>
              <p>Understanding basic interview concepts and common questions.</p>
            </div>
          </div>

          {/* Step 2 - Intermediate */}
          <div className="step">
            <div className="line"></div>
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18"></path>
              </svg>
            </div>
            <div className="step-content">
              <h2>STEP 2 - Intermediate</h2>
              <p>Practicing structured problem-solving and technical questions.</p>
            </div>
          </div>

          {/* Step 3 - Advanced */}
          <div className="step">
            <div className="line"></div>
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div className="step-content">
              <h2>STEP 3 - Advanced</h2>
              <p>Working on real-world case studies and mock interviews.</p>
            </div>
          </div>

          {/* Step 4 - Expert */}
          <div className="step">
            <div className="line"></div>
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3L2 21h20L12 3z"></path>
              </svg>
            </div>
            <div className="step-content">
              <h2>STEP 4 - Expert</h2>
              <p>Polishing communication skills and handling tricky interview scenarios.</p>
            </div>
          </div>

          {/* Step 5 - Mastery */}
          <div className="step">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 1 1 0 20"></path>
                <path d="M15 9l-6 6M9 9l6 6"></path>
              </svg>
            </div>
            <div className="step-content">
              <h2>FINAL STEP - Mastery</h2>
              <p>Becoming fully confident and ready for your dream job interview!</p>
            </div>
          </div>
        </div>

        {/* Step Image */}
        <img className="step-image" src="https://images.pexels.com/photos/5439137/pexels-photo-5439137.jpeg?auto=compress&cs=tinysrgb&w=600" alt="interview steps" />
      </div>
    </section>
  );
};

export default Overview;
