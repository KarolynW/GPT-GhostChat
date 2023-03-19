// HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeScreen from '../components/WelcomeScreen';
import GoodbyeScreen from '../components/GoodbyeScreen';

const HomePage = () => {
  const [showGoodbye, setShowGoodbye] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    if (answer) {
      navigate('/payment');
    } else {
      setShowGoodbye(true);
    }
  };

  return (
    <div>
      {!showGoodbye ? (
        <WelcomeScreen onAnswer={handleAnswer} />
      ) : (
        <GoodbyeScreen />
      )}
    </div>
  );
};

export default HomePage;

