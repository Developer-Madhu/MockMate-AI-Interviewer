import React, { useState } from "react";
import "./Interview.css";
import OpenAI from "openai";

function Interview() {


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
          <input
            type="text"
            id="inputField"
            placeholder="Enter text..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className="button" onClick={handleSubmit}>
            Send
          </button>
        </div>
        <p className="footer-text text-center">Learn, Practice and Repeat.</p>
      </div>
      <div className="render bg-gray-200 w-full h-auto p-5">
        {response ? response : "Type something and click Send!"}
      </div>
    </div>
  );
}

export default Interview;
