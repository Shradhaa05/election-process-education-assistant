import React from 'react';
import Timeline from '../components/Timeline';

const TimelinePage = () => {
  return (
    <div style={{ paddingTop: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '-50px' }}>
        <img 
          src="/election_awareness.png" 
          alt="Election Awareness" 
          style={{ maxWidth: '300px', width: '100%', borderRadius: '20px', boxShadow: 'var(--shadow-lg)' }} 
        />
      </div>
      <Timeline />
    </div>
  );
};

export default TimelinePage;
