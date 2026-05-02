import React from 'react';
import Steps from '../components/Steps';
import Eligibility from '../components/Eligibility';

const VotingSteps = () => {
  return (
    <div style={{ paddingTop: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '-50px' }}>
        <img 
          src="/voting_process.png" 
          alt="Secure Voting Process" 
          style={{ maxWidth: '300px', width: '100%', borderRadius: '20px', boxShadow: 'var(--shadow-lg)' }} 
        />
      </div>
      <Steps />
      <Eligibility />
    </div>
  );
};

export default VotingSteps;
