import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GhostInteractionPage.css';

const GhostInteractionPage = () => {
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('message-token') || '');
  const [inputMessage, setInputMessage] = useState('');
  const [userInteractions, setUserInteractions] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInteractions === 20) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: 'Goodbye Mortal - I am in your Wallet.' },
      ]);
    }
  }, [userInteractions]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant' && lastMessage.content.startsWith('Goodbye')) {
      setTimeout(() => {
        navigate('/');
      }, 10000);
    }
  }, [messages, navigate]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const fetchGhostResponse = async (inputMessage) => {
    console.log('Sending message to backend:', inputMessage);
  
    // If there is no token, create one and save it to the localStorage
    if (token === '') {
      const newToken = Math.random().toString(36).substr(2, 10);
      setToken(newToken);
      localStorage.setItem('message-token', newToken);
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/gpt4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Include the token in the header
        },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: inputMessage }] }),
      });
  
      const data = await response.json();
      console.log('Received response from backend:', data);
      return data.content;
    } catch (error) {
      console.error('Error fetching ghost response:', error);
      return 'Sorry, I encountered an error. Please try again later.';
    }
  };
  

  const handleSendMessage = async () => {
    if (inputMessage.trim() && userInteractions < 20) {
      setMessages([...messages, { role: "user", content: inputMessage }]);
      setInputMessage('');
      setUserInteractions(userInteractions + 1);

      const ghostResponse = await fetchGhostResponse(inputMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: ghostResponse },
      ]);
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="ghost-interaction-page">
      <h1>Talk to Your Ghost</h1>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'ghost-message'}`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          className="input-message"
          type="text"
          placeholder="Type your message here"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyDown={handleEnterPress}
          disabled={userInteractions >= 20}
        />
        <button className="send-button" onClick={handleSendMessage} disabled={userInteractions >= 20}>
          Send
        </button>
      </div>
    </div>
  );
};

export default GhostInteractionPage;


