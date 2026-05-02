import React from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/images/hero-bg.png';

const Hero = () => {
  return (
    <header className="hero" id="home" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="container hero-container">
        <div className="hero-text-content">
          <div className="hero-badge">Voting Made Simple</div>
          <h1>Your Vote.<br /><span className="text-gradient">Your Power.</span></h1>
          <p>Elections don't have to be confusing. Learn exactly how to make your voice heard with our simple, step-by-step guide.</p>
          <div className="hero-buttons">
            <Link to="/steps" className="btn btn-primary">See the Steps</Link>
            <Link to="/ask" className="btn btn-secondary">Chat with our Guide</Link>
            <a 
              href="https://voters.eci.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-register"
            >
              🗳️ Register to Vote
            </a>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="glass-panel">
            <img src="/hero-voting.png" alt="Sleek Ballot Box with checkmark" className="hero-image" />
          </div>
          <div className="floating-stat float-1">
            <span className="stat-icon">✅</span>
            <span className="stat-text">Make a difference</span>
          </div>
          <div className="floating-stat float-2">
            <span className="stat-icon">🗳️</span>
            <span className="stat-text">100% Secure</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
