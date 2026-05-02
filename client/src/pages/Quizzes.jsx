import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { postQuizResult } from '../services/api';

const MOCK_QUESTIONS = [
  {
    id: 1,
    type: 'multiple-choice',
    topic: 'Voter eligibility',
    question: 'What is the minimum voting age in most democratic elections?',
    options: ['16', '18', '21', '25'],
    correctAnswer: '18',
    explanation: 'In the majority of democracies, including the US and India, the legal voting age is 18.'
  },
  {
    id: 2,
    type: 'multiple-choice',
    topic: 'Required documents',
    question: 'Which of the following is most commonly accepted as a valid voter ID?',
    options: ['Library Card', 'Gym Membership', 'Driver\'s License', 'Utility Bill'],
    correctAnswer: 'Driver\'s License',
    explanation: 'A government-issued photo ID like a Driver\'s License is the most universally accepted form of identification for voting.'
  },
  {
    id: 3,
    type: 'multiple-choice',
    topic: 'Election timeline',
    question: 'Election Day in the US is traditionally held on which day of the week?',
    options: ['Monday', 'Tuesday', 'Thursday', 'Sunday'],
    correctAnswer: 'Tuesday',
    explanation: 'Election Day is traditionally set as the first Tuesday following the first Monday in November.'
  },
  {
    id: 4,
    type: 'multiple-choice',
    topic: 'Polling booth process',
    question: 'You are waiting in line at the polling place, and it reaches the official closing time. What should you do?',
    options: [
      'Leave immediately since the polls are closed.',
      'Ask the person behind you what to do.',
      'Stay in line. If you are in line before closing time, you have the right to vote.',
      'Go home and mail your ballot instead.'
    ],
    correctAnswer: 'Stay in line. If you are in line before closing time, you have the right to vote.',
    explanation: 'It is a federal right to cast your vote as long as you were physically in line before the designated poll closing time.'
  },
  {
    id: 5,
    type: 'multiple-choice',
    topic: 'Voting process',
    question: 'What is an absentee ballot?',
    options: [
      'A ballot cast by someone who is absent from the country forever.',
      'A ballot cast by mail before election day.',
      'A ballot cast by someone else on your behalf.',
      'A ballot that does not count towards the final result.'
    ],
    correctAnswer: 'A ballot cast by mail before election day.',
    explanation: 'An absentee or mail-in ballot allows voters to cast their vote by mail if they cannot attend the polling place in person on Election Day.'
  },
  {
    id: 6,
    type: 'multiple-choice',
    topic: 'Importance of voting',
    question: 'Why is voting considered a civic duty?',
    options: [
      'It is a legal requirement with severe punishments.',
      'It allows citizens to choose their representatives and influence public policy.',
      'It is the only way to pay taxes.',
      'It guarantees you a job in the government.'
    ],
    correctAnswer: 'It allows citizens to choose their representatives and influence public policy.',
    explanation: 'Voting is a fundamental right and responsibility that empowers citizens to have a say in how their government is run.'
  },
  {
    id: 7,
    type: 'multiple-choice',
    topic: 'Voter eligibility',
    question: 'In addition to age, what is another common requirement for voter eligibility in national elections?',
    options: [
      'Owning property',
      'Having a college degree',
      'Citizenship of that country',
      'Being employed'
    ],
    correctAnswer: 'Citizenship of that country',
    explanation: 'Most countries require voters to be legal citizens in order to participate in national elections.'
  },
  {
    id: 8,
    type: 'multiple-choice',
    topic: 'Polling booth process',
    question: 'Who are poll workers?',
    options: [
      'Politicians running for office.',
      'Trained officials who manage the voting process at the polling place.',
      'People conducting exit polls outside.',
      'Security guards for the building.'
    ],
    correctAnswer: 'Trained officials who manage the voting process at the polling place.',
    explanation: 'Poll workers are essential to elections. They set up the voting equipment, check in voters, and ensure the process runs smoothly and fairly.'
  },
  {
    id: 9,
    type: 'multiple-choice',
    topic: 'Voting process',
    question: 'What does "early voting" mean?',
    options: [
      'Voting before the age of 18.',
      'Casting a ballot in person before the official Election Day.',
      'Being the first person in line on Election Day.',
      'Voting for an election that happens next year.'
    ],
    correctAnswer: 'Casting a ballot in person before the official Election Day.',
    explanation: 'Many states offer early voting periods, allowing voters to cast their ballots in person on days leading up to Election Day.'
  },
  {
    id: 10,
    type: 'multiple-choice',
    topic: 'Election timeline',
    question: 'What is a voter registration deadline?',
    options: [
      'The time the polls close on Election Day.',
      'The last day you can submit your application to be eligible to vote in an upcoming election.',
      'The date the new president takes office.',
      'The day you must declare your political party.'
    ],
    correctAnswer: 'The last day you can submit your application to be eligible to vote in an upcoming election.',
    explanation: 'Most states require you to register to vote several weeks before an election in order to participate.'
  }
];

const Quizzes = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [savingResult, setSavingResult] = useState(false);

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];

  const handleSelectAnswer = (answer) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    setIsAnswerSubmitted(true);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setIsAnswerSubmitted(false);
    } else {
      // Finish quiz
      setQuizCompleted(true);
      setSavingResult(true);
      try {
        await postQuizResult({
          score: score + (selectedAnswer === currentQuestion.correctAnswer && !isAnswerSubmitted ? 1 : 0),
          totalQuestions: MOCK_QUESTIONS.length
        });
      } catch (err) {
        console.error("Failed to save quiz results:", err);
      } finally {
        setSavingResult(false);
      }
    }
  };

  const handleTryAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="section bg-light" style={{ minHeight: 'calc(100vh - 100px)', paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-header">
          <h2>Election Knowledge Quiz</h2>
          <p className="subtitle">Test your understanding of the election process.</p>
        </div>

        <AnimatePresence mode="wait">
          {!quizCompleted ? (
            <motion.div 
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="quiz-card"
            >
              <div className="quiz-progress">
                <div 
                  className="progress-bar" 
                  style={{ width: `${((currentQuestionIndex) / MOCK_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
              <div className="quiz-header">
                <span className="quiz-badge">{currentQuestion.topic}</span>
                <span className="quiz-counter">Question {currentQuestionIndex + 1} of {MOCK_QUESTIONS.length}</span>
              </div>
              
              <h3 className="quiz-question">{currentQuestion.question}</h3>

              <div className="quiz-options">
                {currentQuestion.options.map((option, idx) => {
                  let optionClass = 'quiz-option-btn';
                  if (selectedAnswer === option) optionClass += ' selected';
                  if (isAnswerSubmitted) {
                    if (option === currentQuestion.correctAnswer) optionClass += ' correct';
                    else if (selectedAnswer === option) optionClass += ' wrong';
                  }
                  return (
                    <button 
                      key={idx}
                      className={optionClass}
                      onClick={() => handleSelectAnswer(option)}
                      disabled={isAnswerSubmitted}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {isAnswerSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`quiz-feedback ${selectedAnswer === currentQuestion.correctAnswer ? 'correct-bg' : 'wrong-bg'}`}
                >
                  <h4>{selectedAnswer === currentQuestion.correctAnswer ? '✅ Correct!' : '❌ Incorrect!'}</h4>
                  <p>{currentQuestion.explanation}</p>
                </motion.div>
              )}

              <div className="quiz-footer">
                {!isAnswerSubmitted ? (
                  <button 
                    className="btn btn-primary quiz-submit-btn" 
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary quiz-next-btn" 
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex < MOCK_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="quiz-result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="quiz-result-card"
            >
              <h2>Quiz Completed! 🎉</h2>
              <div 
                className="score-circle" 
                style={{ '--percentage': `${(score / MOCK_QUESTIONS.length) * 100}%` }}
              >
                <span className="score-number">{score}</span>
                <span className="score-total">/ {MOCK_QUESTIONS.length}</span>
              </div>
              <p className="score-message">
                {score === MOCK_QUESTIONS.length ? 'Perfect score! You are a civic expert.' : 
                 score >= MOCK_QUESTIONS.length / 2 ? 'Great job! You have a solid understanding of the election process.' : 
                 'Good try! Keep learning about the election process.'}
              </p>
              {savingResult ? (
                <p className="saving-text">Saving your result...</p>
              ) : (
                <button className="btn btn-primary try-again-btn" onClick={handleTryAgain}>
                  Try Again
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quizzes;
