import React, { useState, useEffect } from "react";
import axios from "axios"
import Sidebar from "../../components/Sidebar"

function Interview() {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [error, setError] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0)
  const [allscore, setallscore] = useState(() => { return parseInt(localStorage.getItem("score"), 10) || 0 })
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    localStorage.setItem("score", score);
  }, [score]);

  const formatFeedback = (feedbackText) => {
    const points = feedbackText
      .split('*')
      .map(point => point.trim())
      .filter(point => point.length > 0);
    return points;
  };

  const formatQuestion = (questionText) => {
    // Split the question into parts if it contains multiple lines or sections
    const parts = questionText.split('\n').filter(part => part.trim());
    
    // If it's a single line, return it as is
    if (parts.length === 1) {
      return questionText;
    }

    // Format each part with appropriate styling
    return parts.map((part, index) => {
      // Check if it's a question number
      if (part.match(/^\d+\./)) {
        return (
          <div key={index} className="text-lg font-semibold text-indigo-600 mb-2">
            {part}
          </div>
        );
      }
      // Check if it's a sub-question or option
      else if (part.match(/^[a-d]\)/i) || part.match(/^[a-d]\./i)) {
        return (
          <div key={index} className="ml-6 text-gray-700 mb-1">
            {part}
          </div>
        );
      }
      // Regular text
      else {
        return (
          <div key={index} className="text-gray-700 mb-2">
            {part}
          </div>
        );
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error generating content");
      }

      const data = await response.json();
      setGeneratedText(data.response);

      const previousQuestions = JSON.parse(localStorage.getItem("questionHistory")) || [];
      const updatedQuestions = [...previousQuestions, data.response];
      localStorage.setItem("questionHistory", JSON.stringify(updatedQuestions));

    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    }
  };

  const handleVerifyAnswer = async () => {
    setIsVerifying(true);
    try {
      const response = await fetch("http://localhost:3000/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: generatedText, answer: userAnswer }),
      });

      if (!response.ok) {
        throw new Error("Error analyzing the answer");
      }

      const data = await response.json();
      setFeedback(data.feedback);
      if (data.feedback.includes("Correctness") || data.feedback.includes("Good job")) {
        setScore(prevScore => prevScore + 1);
        allscore.push(score)
        localStorage.setItem('userscore', score)
      }
    } catch (err) {
      console.error("Error:", err);
      setFeedback("Error analyzing your answer.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <main className="p-6">
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  AI Interview Preparation
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Practice interview questions across various topics like Aptitude, HR, and Technical domains. 
                  Get instant feedback and track your performance with our AI-powered system.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Enter topic (Aptitude, HR, or Technical)..."
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
                    >
                      Generate Question
                    </button>
                  </div>
                </form>
              </div>

              {generatedText && (
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                  <div className="bg-indigo-50 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <svg className="w-6 h-6 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Question
                    </h2>
                    <div className="prose prose-indigo max-w-none">
                      <b>{formatQuestion(generatedText)}</b>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full h-40 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                    />

                    <button
                      onClick={handleVerifyAnswer}
                      disabled={isVerifying}
                      className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isVerifying ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Verifying...
                        </>
                      ) : (
                        'Verify Answer'
                      )}
                    </button>
                  </div>

                  {feedback && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback:</h3>
                      <ul className="space-y-3">
                        {formatFeedback(feedback).map((point, index) => (
                          <li key={index} className="flex items-start">
                            <span className="flex-shrink-0 h-6 w-6 text-green-500 mr-2">•</span>
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex justify-between items-center bg-indigo-50 rounded-xl p-4">
                    <span className="text-lg font-semibold text-gray-900">Current Score:</span>
                    <span className="text-2xl font-bold text-indigo-600">{score}</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-600">{error}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Interview;
