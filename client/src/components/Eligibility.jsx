import React from 'react';

const Eligibility = () => {
  return (
    <section id="eligibility" className="section bg-dark text-white">
      <div className="container">
        <div className="section-header">
          <h2>Who Can Vote?</h2>
          <p className="subtitle text-light-opacity">The basic rules to be eligible.</p>
        </div>
        <div className="eligibility-flex">
          <div className="eligibility-box">
            <h3>The Requirements</h3>
            <ul>
              <li><span className="check">✓</span> You must be a Citizen.</li>
              <li><span className="check">✓</span> You must be at least 18 years old by Election Day.</li>
              <li><span className="check">✓</span> You must live in the state where you are voting.</li>
              <li><span className="check">✓</span> You must register before the deadline.</li>
            </ul>
          </div>
          <div className="eligibility-box">
            <h3>What to Bring</h3>
            <p>When you vote in person, bring a valid ID. Accepted forms usually include:</p>
            <ul>
              <li><span className="check">✓</span> Driver's License</li>
              <li><span className="check">✓</span> State ID Card</li>
              <li><span className="check">✓</span> Passport</li>
            </ul>
            <div className="alert-box">
              <strong>Tip:</strong> ID rules change depending on your state. Check locally to be safe!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Eligibility;
