import React from 'react';

const About = () => {
  return (
    <section id="about" className="section bg-light">
      <div className="container">
        <div className="section-header">
          <h2>What is an Election?</h2>
          <p className="subtitle">The simplest way to choose our future.</p>
        </div>
        <div className="about-grid">
          <div className="about-card glass">
            <div className="card-icon">🤝</div>
            <h3>Choosing Leaders</h3>
            <p>An election is the way citizens pick the people who will govern their city, state, or country.</p>
          </div>
          <div className="about-card glass">
            <div className="card-icon">⚖️</div>
            <h3>Making Rules</h3>
            <p>Sometimes, you also vote directly on new laws or public spending plans in your local area.</p>
          </div>
          <div className="about-card glass">
            <div className="card-icon">🌟</div>
            <h3>Having a Say</h3>
            <p>It's the most direct way you can impact what happens in your community and your daily life.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
