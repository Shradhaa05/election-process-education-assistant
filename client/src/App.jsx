import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import VotingSteps from './pages/VotingSteps';
import TimelinePage from './pages/TimelinePage';
import FaqPage from './pages/FaqPage';
import AskPage from './pages/AskPage';
import Quizzes from './pages/Quizzes';
import MapPage from './pages/Map';
import Analytics from './pages/Analytics';

function App() {
  // Initialize theme from internal localStorage or default to light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('civic_theme') || 'light';
  });

  // Apply theme to HTML root element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('civic_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main style={{ minHeight: 'calc(100vh - 250px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/steps" element={<VotingSteps />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/ask" element={<AskPage />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
