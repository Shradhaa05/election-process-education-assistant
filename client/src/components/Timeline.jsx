import React, { useState, useEffect } from 'react';
import { fetchTimeline } from '../services/api';

const DEFAULT_TIMELINE = [
  { id: 1, title: 'Voter Registration Deadline', date: '30 Days Before Election', desc: 'Last day to submit your voter registration form or update your address.', highlight: false },
  { id: 2, title: 'Early Voting Begins', date: '15 Days Before Election', desc: 'Polling places open early for those who cannot make it on the official election day.', highlight: false },
  { id: 3, title: 'Mail-in Ballots Due', date: 'Day Before Election', desc: 'If voting by mail, your ballot must be postmarked by this deadline.', highlight: false },
  { id: 4, title: 'Election Day', date: 'First Tuesday of November', desc: 'Polls are open from 7:00 AM to 8:00 PM. Make your voice heard!', highlight: true }
];

const Timeline = () => {
  const [timelines, setTimelines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimeline()
      .then(data => {
        if (data && data.length > 0) {
          setTimelines(data);
        } else {
          setTimelines(DEFAULT_TIMELINE);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load timeline:", err);
        setTimelines(DEFAULT_TIMELINE);
        setLoading(false);
      });
  }, []);

  return (
    <section id="timeline" className="section bg-light">
      <div className="container">
        <div className="section-header">
          <h2>Election Timeline</h2>
          <p className="subtitle">Key dates to keep in mind.</p>
        </div>
        
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading timeline...</p>
          </div>
        ) : timelines.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">📅</div>
            <h4>No Timeline Available</h4>
            <p>Please check back closer to election day.</p>
          </div>
        ) : (
          <div className="timeline-wrapper">
            {timelines.map((item) => (
              <div key={item.id} className="timeline-item">
                <div className={`timeline-dot ${item.highlight ? 'highlight-dot' : ''}`}></div>
                <div className={`timeline-content ${item.highlight ? 'highlight-content' : ''}`}>
                  <h3>{item.title}</h3>
                  <span className="date">{item.date}</span>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Timeline;
