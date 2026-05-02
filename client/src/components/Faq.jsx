import React, { useState, useRef, useEffect } from 'react';
import { fetchFaqs } from '../services/api';

const DEFAULT_FAQS = [
  { question: "What is the minimum voting age?", answer: "The minimum voting age is 18 years old in most democracies." },
  { question: "How do I register to vote?", answer: "You can register online through the official election website or by submitting a form to your local election office." },
  { question: "What documents are required for voting?", answer: "You generally need a valid government-issued photo ID such as a Driver's License, Passport, or Voter ID card." },
  { question: "How can I find my polling booth?", answer: "You can find your polling booth by using the 'Find Booth' feature on this app or checking your state's election portal." },
  { question: "What is the voting process?", answer: "The process involves registering to vote, finding your polling place, showing your ID, and casting your ballot either electronically or on paper." }
];

const FaqItem = ({ item, index, isActive, toggleAccordion }) => {
  const contentRef = useRef(null);
  
  return (
    <div className={`faq-item ${isActive ? 'active' : ''}`}>
      <button 
        className="faq-question" 
        onClick={() => toggleAccordion(index)}
        aria-expanded={isActive}
      >
        {item.question}
        <span className="toggle-icon">{isActive ? '−' : '+'}</span>
      </button>
      <div 
        className="faq-answer-wrapper"
        style={{
          maxHeight: isActive ? `${contentRef.current?.scrollHeight}px` : '0px',
          opacity: isActive ? 1 : 0
        }}
        ref={contentRef}
      >
        <div className="faq-answer">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaqs()
      .then(data => {
        if (data && data.length > 0) {
          setFaqs(data);
        } else {
          setFaqs(DEFAULT_FAQS);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load FAQs:", err);
        setFaqs(DEFAULT_FAQS); // Fallback data on error
        setLoading(false);
      });
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section">
      <div className="container faq-container">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p className="subtitle">Common questions from our learning community.</p>
        </div>
        
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading FAQs...</p>
          </div>
        ) : faqs.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">❓</div>
            <h4>No FAQs available yet</h4>
            <p>Please check back later.</p>
          </div>
        ) : (
          <div className="faq-list">
            {faqs.map((item, index) => (
              <FaqItem 
                key={item.id || index}
                item={item}
                index={index}
                isActive={activeIndex === index}
                toggleAccordion={toggleAccordion}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Faq;
