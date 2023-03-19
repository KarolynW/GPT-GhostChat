// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';
import GhostInteractionPage from './pages/GhostInteractionPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/ghost-interaction" element={<GhostInteractionPage />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


