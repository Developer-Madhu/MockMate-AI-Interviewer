import React from "react";
import "./ImageSection.css";

const ImageSection = () => {
  return (
    <section className="blog-section">
      <div className="container">
        {/* Blog Card 1 */}
        <div className="blog-card">
          <img className="blog-image" src="https://images.pexels.com/photos/5921786/pexels-photo-5921786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="blog" />
          <div className="blog-content">
            <h2 className="blog-category">MockMate</h2>
            <h1 className="blog-title">Online Assessment</h1>
            <p className="blog-description">
              Take the online assessment monitored by the built in AI models and evaluate your score.
            </p>
            <div className="blog-footer">
              <a href="#" className="learn-more">
                Learn More
                <svg className="arrow-icon" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Blog Card 2 */}
        <div className="blog-card">
          <img className="blog-image" src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600" alt="blog" />
          <div className="blog-content">
            <h2 className="blog-category">MockMate</h2>
            <h1 className="blog-title">The HR Round</h1>
            <p className="blog-description">
            A quick call with HR to check your basic details, qualifications, and interest in the role.
            </p>
            <div className="blog-footer">
              <a href="#" className="learn-more">
                Learn More
                <svg className="arrow-icon" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
              
            </div>
          </div>
        </div>

        {/* Blog Card 3 */}
        <div className="blog-card">
          <img className="blog-image" src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600" alt="blog" />
          <div className="blog-content">
            <h2 className="blog-category">MockMate</h2>
            <h1 className="blog-title">Technical Round</h1>
            <p className="blog-description">
            Deal with DSA, Programming, Problem-Solving and Networking.
            </p>
            <div className="blog-footer">
              <a href="#" className="learn-more">
                Learn More
                <svg className="arrow-icon" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            
            </div>
          </div>
        </div>

      </div>
      <br /><br />
      <div className="container">
        {/* Blog Card 1 */}
        <div className="blog-card">
          <img className="blog-image" src="https://images.pexels.com/photos/3205566/pexels-photo-3205566.jpeg?auto=compress&cs=tinysrgb&w=600" alt="blog" />
          <div className="blog-content">
            <h2 className="blog-category">MockMate</h2>
            <h1 className="blog-title">Evaluation & Analysis</h1>
            <p className="blog-description">
              Get Evaluations by AI and increase your problem solving capabilities
            </p>
            <div className="blog-footer">
              <a href="#" className="learn-more">
                Learn More
                <svg className="arrow-icon" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
             
            </div>
          </div>
        </div>

        {/* Blog Card 2 */}
        <div className="blog-card">
          <img className="blog-image" src="https://images.pexels.com/photos/7092528/pexels-photo-7092528.jpeg?auto=compress&cs=tinysrgb&w=600" alt="blog" />
          <div className="blog-content">
            <h2 className="blog-category">MockMate</h2>
            <h1 className="blog-title">Take Assessments</h1>
            <p className="blog-description">
              The Assessments & Mocks improve your problem-solving abilities
            </p>
            <div className="blog-footer">
              <a href="#" className="learn-more">
                Learn More
                <svg className="arrow-icon" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
             
            </div>
          </div>
        </div>

        {/* Blog Card 3 */}
        <div className="blog-card">
          <img className="blog-image" src="https://images.pexels.com/photos/891059/pexels-photo-891059.jpeg?auto=compress&cs=tinysrgb&w=600" alt="blog" />
          <div className="blog-content">
            <h2 className="blog-category">MockMate</h2>
            <h1 className="blog-title">Case Studies</h1>
            <p className="blog-description">
              Read what other Alumni and Students researched about
            </p>
            <div className="blog-footer">
              <a href="#" className="learn-more">
                Learn More
                <svg className="arrow-icon" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
              
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ImageSection;
