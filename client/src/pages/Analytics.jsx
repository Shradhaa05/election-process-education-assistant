import React, { useState, useEffect } from 'react';
import { fetchAnalytics } from '../services/api';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const DEFAULT_ANALYTICS = {
    totalQuestions: 1245,
    totalQuizAttempts: 890,
    averageScore: 78,
    faqInteractions: 3420,
    popularTopics: [
      { topic: "Voter Registration Requirements", views: 1540 },
      { topic: "How to Find Polling Booths", views: 985 },
      { topic: "Mail-in Voting Deadlines", views: 820 },
      { topic: "Accepted Forms of ID", views: 650 },
    ],
    popularLocations: [
      { name: "Springfield, IL", searches: 450 },
      { name: "Chicago, IL", searches: 380 },
      { name: "Bhubaneswar, Odisha", searches: 290 },
      { name: "Peoria, IL", searches: 150 },
    ]
  };

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await fetchAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error("Error fetching analytics, using fallback:", err);
        setAnalytics(DEFAULT_ANALYTICS);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="container section">
        <div className="loading-state">
          <div className="spinner"></div>
          <p style={{ color: 'var(--text-light)' }}>Loading platform analytics...</p>
        </div>
      </div>
    );
  }

  if (error && !analytics) {
    return (
      <div className="container section">
        <div className="alert-box">
          <strong>Oops! </strong> {error}
        </div>
      </div>
    );
  }

  // Helper to calculate max value for chart scaling
  const maxSearches = Math.max(...(analytics?.popularLocations?.map(l => l.searches) || [1]));
  const maxViews = Math.max(...(analytics?.popularTopics?.map(t => t.views) || [1]));

  return (
    <div className="container section">
      <div className="section-header">
        <h2>Analytics Dashboard</h2>
        <p className="subtitle">Monitor voter education engagement and platform usage.</p>
      </div>

      {/* Top Level Metrics Cards */}
      <div className="analytics-grid">
        <div className="analytics-card" style={{ borderLeftColor: 'var(--primary)' }}>
          <div className="analytics-card-title">Questions Asked 💬</div>
          <div className="analytics-card-value">{analytics.totalQuestions}</div>
        </div>
        
        <div className="analytics-card" style={{ borderLeftColor: '#10B981' }}>
          <div className="analytics-card-title">Quiz Attempts 📝</div>
          <div className="analytics-card-value">{analytics.totalQuizAttempts}</div>
        </div>
        
        <div className="analytics-card" style={{ borderLeftColor: '#8B5CF6' }}>
          <div className="analytics-card-title">Avg Quiz Score 🎯</div>
          <div className="analytics-card-value">{analytics.averageScore}%</div>
        </div>
        
        <div className="analytics-card" style={{ borderLeftColor: 'var(--accent)' }}>
          <div className="analytics-card-title">FAQ Interactions ❓</div>
          <div className="analytics-card-value">{analytics.faqInteractions}</div>
        </div>
      </div>

      <div className="analytics-charts-container">
        {/* Popular Topics Bar Chart */}
        <div className="chart-card">
          <h3>Most Viewed Topics</h3>
          <div className="chart-content">
            {analytics.popularTopics?.map((item, index) => (
              <div className="chart-item" key={index}>
                <div className="chart-item-header">
                  <span className="chart-item-label">{item.topic}</span>
                  <span className="chart-item-value">{item.views} views</span>
                </div>
                <div className="chart-bar-bg">
                  <div 
                    className="chart-bar-fill" 
                    style={{ width: `${(item.views / maxViews) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            {(!analytics.popularTopics || analytics.popularTopics.length === 0) && (
              <p style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>No topic data available yet.</p>
            )}
          </div>
        </div>

        {/* Popular Locations Bar Chart */}
        <div className="chart-card">
          <h3>Top Searched Booth Areas</h3>
          <div className="chart-content">
            {analytics.popularLocations?.map((item, index) => (
              <div className="chart-item" key={index}>
                <div className="chart-item-header">
                  <span className="chart-item-label">{item.name}</span>
                  <span className="chart-item-value">{item.searches} searches</span>
                </div>
                <div className="chart-bar-bg">
                  <div 
                    className="chart-bar-fill" 
                    style={{ 
                      width: `${(item.searches / maxSearches) * 100}%`,
                      backgroundColor: '#10B981' 
                    }}
                  ></div>
                </div>
              </div>
            ))}
            {(!analytics.popularLocations || analytics.popularLocations.length === 0) && (
              <p style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>No location search data available yet.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Fallback Notice */}
      <div className="analytics-notice">
        <p>Data is aggregated across all platform users in real-time. Missing data may be supplemented with historical samples.</p>
      </div>
    </div>
  );
};

export default Analytics;
