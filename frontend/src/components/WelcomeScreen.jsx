// WelcomeScreen.jsx
import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onAnswer }) => {
  return (
    <div className="welcome-screen">
      <h1 className="welcome-title" style={{ textAlign: 'center' }}>Do you want to talk to a Ghost?</h1>

      <div className="buttons-container">
        <button className="answer-button yes" onClick={() => onAnswer(true)}>
          Yes
        </button>
        <button className="answer-button no" onClick={() => onAnswer(false)}>
          No
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
