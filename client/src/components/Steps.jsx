import React, { useState, useEffect } from 'react';
import { fetchSteps } from '../services/api';

const Steps = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSteps()
      .then(data => {
        setSteps(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load steps:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="steps" className="section">
      <div className="container">
        <div className="section-header">
          <h2>How to Vote</h2>
          <p className="subtitle">Four easy steps to get your ballot cast.</p>
        </div>
        
        {loading ? (
          <div style={{ textAlign:'center' }}>Loading steps...</div>
        ) : (
          <div className="steps-container">
            {steps.map((item, index) => (
              <React.Fragment key={item.id || index}>
                <div className={`step-row ${index % 2 !== 0 ? 'reverse' : ''}`}>
                  <div className="step-num">{item.stepNum}</div>
                  <div className={`step-card ${item.highlight ? 'highlight-card' : ''}`}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
                {index !== steps.length - 1 && <div className="step-line"></div>}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Steps;
