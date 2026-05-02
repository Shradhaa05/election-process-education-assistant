import React, { useState, useRef, useEffect } from 'react';
import { postQuestion } from '../services/api';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Hi there! I'm here to make the election process easy to understand. \n\nYou can type a question below or click one of the suggestions on the left!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const data = await postQuestion(text);
      
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: data.response }]);
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: "Sorry, I am currently unable to reach my server to answer your question." }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(inputValue);
    }
  };

  const suggestions = [
    "How do I register?",
    "Where is my polling place?",
    "Can I vote by mail?",
    "What if I make a mistake?",
    "What are the deadlines?"
  ];

  return (
    <section id="assistant" className="section bg-light">
      <div className="container">
        <div className="section-header">
          <h2>Interactive Guide Assistant</h2>
          <p className="subtitle">Have a question? Try asking our quick response system below.</p>
        </div>
        
        <div className="embedded-chat-ui">
          <div className="chat-sidebar">
            <h3>Suggested Questions</h3>
            <ul className="chat-suggestions">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <button className="suggest-btn" onClick={() => handleSend(suggestion)}>
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="chat-main">
            <div className="chat-header">
              <div className="chat-profile">
                <span className="chat-avatar">🤖</span>
                <div>
                  <h4>CivicGuide Bot</h4>
                  <span className="status-online">Always Online</span>
                </div>
              </div>
            </div>
            
            <div className="chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={msg.type === 'user' ? 'user-msg' : 'bot-msg'}>
                  <div className="msg-bubble">
                    {msg.text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i !== msg.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="bot-msg">
                  <div className="typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="chat-input-area">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a word like 'register', 'mail', or 'id'..." 
              />
              <button className="btn-send" onClick={() => handleSend(inputValue)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
