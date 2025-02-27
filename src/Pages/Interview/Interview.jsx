import React, { useState } from "react";
import axios from "axios"
import "./Interview.css";

function Interview() {
  
    const [prompt, setPrompt] = useState("");
      const [generatedText, setGeneratedText] = useState("");
      const [error, setError] = useState(null);
    
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
        } catch (err) {
          console.error("Error:", err);
          setError(err.message); 
        }
      };
  return (
    <div className="container1">
      <h1 className="title">Knausgaard typewriter readymade marfa</h1>
      <p className="description">
        Kickstarter biodiesel roof party wayfarers cold-pressed. Palo santo
        live-edge tumeric scenester copper mug flexitarian. Prism vice offal
        plaid everyday carry. Gluten-free chia VHS squid listicle artisan.
      </p>
      <div className="input-container">
        <div className="input-box">
          <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            id="inputField"
            value={prompt}  
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter text..."
          />
          <button type="submit" className="button">
            Go
          </button>
          </form>
        </div>
        <p className="footer-text text-center">Learn, Practice and Repeat.</p>
      </div>
      <div className="render bg-gray-200 w-full h-auto p-5">
      {generatedText && (
        <div className="output-box">
          <p>{generatedText}</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default Interview;
