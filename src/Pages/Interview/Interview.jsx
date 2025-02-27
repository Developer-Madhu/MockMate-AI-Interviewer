import React, { useState, useEffect } from "react";
import axios from "axios"
import "./Interview.css";

function Interview() {

  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [error, setError] = useState(null);
  const [userAnswer, setUserAnswer] = useState(""); // Stores user input
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0)
  const [allscore, setallscore] = useState(() => { return parseInt(localStorage.getItem("score"), 10) || 0 })

  useEffect(() => {
    localStorage.setItem("score", score);
  }, [score]);

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
    }
  };

  return (
    <div className="container1">
      <h1 className="title">Your Interview preparation with AI starts here!</h1>
      <p className="description">
      The AI Interview Preparation System helps users practice interview questions across various topics like Aptitude, HR, and Technical domains. It generates relevant questions, evaluates user responses, and provides instant feedback with improvement suggestions. The system also tracks user performance by assigning scores based on answer accuracy
      </p>
      <div className="input-container">
        <div className="input-box">
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              id="inputField"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Aptitude, HR or Technical..."
            />
            <button type="submit" className="button">Go</button>
          </form>
        </div>
        <p className="footer-text text-center">Learn, Practice and Repeat.</p>
      </div>
      <div className="render bg-gray-200 w-full h-auto p-5">
        {generatedText && (
          <div className="output-box">
            <b>{generatedText}</b>
            <br /><br />

            <textarea
              className="answer-box"
              value={userAnswer}
              draggable='false'
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows="10"
              cols="50"
            ></textarea>
            <br /><br />

            <button className="verify-button" onClick={handleVerifyAnswer}>
              Verify Answer
            </button>

            <br /><br />
            {feedback && (
              <div className="feedback-box">
                <p><strong>Feedback:</strong> {feedback}</p>
              </div>
            )}
            <div className="score-box">
              <p><strong>Score:</strong> {score}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Interview;
