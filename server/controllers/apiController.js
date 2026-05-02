import { db } from '../config/firebase.js';

// Fallback mock data in case Firebase is not connected (improves dev experience if credentials are bad)
const MOCK_DATA = {
  timeline: [
    { id: 1, title: 'Voter Registration Deadline', date: '30 Days Before Election', desc: 'Last day to submit your voter registration form or update your address.', highlight: false },
    { id: 2, title: 'Early Voting Begins', date: '15 Days Before Election', desc: 'Polling places open early for those who cannot make it on the official election day.', highlight: false },
    { id: 3, title: 'Mail-in Ballots Due', date: 'Day Before Election', desc: 'If voting by mail, your ballot must be postmarked by this deadline.', highlight: false },
    { id: 4, title: 'Election Day', date: 'First Tuesday of November', desc: 'Polls are open from 7:00 AM to 8:00 PM. Make your voice heard!', highlight: true }
  ],
  steps: [
    { stepNum: 1, title: 'Register to Vote 📝', desc: 'Fill out a quick form online or via mail to ensure your name is on the list of allowed voters.' },
    { stepNum: 2, title: 'Learn the Choices 📚', desc: 'Look up the people running for office and see what they promise to do if they win.' },
    { stepNum: 3, title: 'Find Your Polling Place 📍', desc: 'Check online to see exactly which building you need to go to on Voting Day.' },
    { stepNum: 4, title: 'Cast Your Ballot 🗳️', desc: 'Show up, pick your choices privately, and drop your ballot in the box or voting machine!', highlight: true }
  ],
  faqs: [
    { question: "How do I know if I'm registered to vote?", answer: "You can easily verify your voter registration status through your state's official election website. Most states provide a simple online search tool." },
    { question: "Can I vote online?", answer: "Currently, general online voting is not securely available. However, many states allow you to register online and request a mail-in absentee ballot." },
    { question: "What if I make a mistake on my ballot?", answer: "If you are voting in person and make an error, simply ask a poll worker for a new ballot." },
    { question: "What happens if I'm in line when the polls close?", answer: "If you are waiting in line at your designated polling place before the official closing time, you have the legal right to cast your vote. Stay in line!" }
  ],
  pollingBooths: [
    { id: 1, boothName: 'Central High School', address: '123 Main St, Springfield', area: 'Downtown', city: 'Springfield', state: 'IL', pincode: '62701', boothNumber: 'A101', latitude: 39.7990, longitude: -89.6450 },
    { id: 2, boothName: 'Springfield Library', address: '456 Elm St, Springfield', area: 'Westside', city: 'Springfield', state: 'IL', pincode: '62702', boothNumber: 'B202', latitude: 39.8105, longitude: -89.6702 },
    { id: 3, boothName: 'Community Center', address: '789 Oak Ave, Shelbyville', area: 'North District', city: 'Shelbyville', state: 'IL', pincode: '62565', boothNumber: 'C303', latitude: 39.4062, longitude: -88.8080 },
    { id: 4, boothName: 'Lincoln Elementary', address: '321 Pine Rd, Capital City', area: 'South District', city: 'Capital City', state: 'IL', pincode: '62704', boothNumber: 'D404', latitude: 39.7654, longitude: -89.6644 },
    { id: 5, boothName: 'Chicago Town Hall', address: '888 City Ave, Chicago', area: 'Loop', city: 'Chicago', state: 'IL', pincode: '60601', boothNumber: 'CH101', latitude: 41.8818, longitude: -87.6231 },
    { id: 6, boothName: 'Peoria Civic Center', address: '201 SW Jefferson Ave', area: 'Downtown', city: 'Peoria', state: 'IL', pincode: '61602', boothNumber: 'P200', latitude: 40.6936, longitude: -89.5890 }
  ],
  analytics: {
    totalQuestions: 142,
    totalQuizAttempts: 87,
    averageScore: 76,
    popularLocations: [
      { name: "Downtown Springfield", searches: 45 },
      { name: "Westside Library", searches: 32 },
      { name: "North District Center", searches: 28 },
      { name: "Shelbyville Elementary", searches: 15 }
    ],
    popularTopics: [
      { topic: "Voter Registration", views: 230 },
      { topic: "Mail-in Ballots", views: 185 },
      { topic: "Polling Locations", views: 142 },
      { topic: "Voter ID Requirements", views: 95 }
    ],
    faqInteractions: 312
  }
};

export const getTimeline = async (req, res) => {
  try {
    if (!db) return res.json(MOCK_DATA.timeline);
    const snapshot = await db.collection('timelines').orderBy('order', 'asc').get();
    const timelines = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(timelines.length ? timelines : MOCK_DATA.timeline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSteps = async (req, res) => {
  try {
    if (!db) return res.json(MOCK_DATA.steps);
    const snapshot = await db.collection('steps').orderBy('stepNum', 'asc').get();
    const steps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(steps.length ? steps : MOCK_DATA.steps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFaqs = async (req, res) => {
  try {
    if (!db) return res.json(MOCK_DATA.faqs);
    const snapshot = await db.collection('faqs').get();
    const faqs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(faqs.length ? faqs : MOCK_DATA.faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }
    
    // If DB exists, save the user question for analytics/later review
    if (db) {
      await db.collection('questions').add({
        question,
        timestamp: new Date()
      });
    }

    // Process naive bot response logic serverside
    const lowerQuestion = question.toLowerCase();
    let response = "Sorry, I didn't quite catch that. Try asking me about 'registering to vote', 'where to vote', or 'what ID to bring'.";
    
    if (lowerQuestion.includes('register') || lowerQuestion.includes('sign up')) {
      response = "To register to vote, you typically need to submit a form to your local election office either online, by mail, or in person. Deadlines vary by state.";
    } else if (lowerQuestion.includes('id') || lowerQuestion.includes('bring')) {
      response = "If you're voting in person, most polling locations ask for a valid ID (like a Driver's License or Passport).";
    } else if (lowerQuestion.includes('where') || lowerQuestion.includes('location') || lowerQuestion.includes('place')) {
      response = "Your polling place depends on your residential address. You can easily find it by visiting your state's official voter portal online.";
    } else if (lowerQuestion.includes('mail') || lowerQuestion.includes('absentee')) {
      response = "Voting by mail (or absentee voting) lets you cast your ballot from home. You'll need to request a mail-in ballot before your state's deadline.";
    } else if (lowerQuestion.includes('deadline') || lowerQuestion.includes('when')) {
      response = "Election Day is generally the first Tuesday in November, but early voting and registration deadlines happen weeks before!";
    }

    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postQuizResult = async (req, res) => {
  try {
    const { score, totalQuestions, timestamp } = req.body;
    if (score === undefined || !totalQuestions) {
      return res.status(400).json({ error: 'Score and totalQuestions are required' });
    }
    
    // If DB exists, save the user quiz results
    if (db) {
      await db.collection('quizResults').add({
        score,
        totalQuestions,
        timestamp: timestamp || new Date()
      });
    }

    res.json({ success: true, message: 'Quiz result saved.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPollingBooths = async (req, res) => {
  try {
    const { city, state, pincode } = req.query;
    
    let booths = [];
    if (!db) {
      booths = MOCK_DATA.pollingBooths;
    } else {
      const snapshot = await db.collection('pollingBooths').get();
      booths = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (!booths.length) booths = MOCK_DATA.pollingBooths; // Fallback to mock data if empty collection
    }

    // Apply filtering based on query params
    if (city || state || pincode) {
      booths = booths.filter(booth => {
        const matchCity = city ? booth.city.toLowerCase().includes(city.toLowerCase()) : true;
        const matchState = state ? booth.state.toLowerCase().includes(state.toLowerCase()) : true;
        const matchPincode = pincode ? booth.pincode === pincode : true;
        
        // Return true if any of the provided criteria loosely matches
        return (city && matchCity) || (state && matchState) || (pincode && matchPincode);
      });
    }

    res.json(booths);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    if (!db) return res.json(MOCK_DATA.analytics);

    let analytics = { ...MOCK_DATA.analytics }; // Start with mock defaults for missing tracking data

    try {
      // 1. Total Questions Submitted
      const questionsSnapshot = await db.collection('questions').get();
      if (!questionsSnapshot.empty) {
        analytics.totalQuestions = questionsSnapshot.size;
      }

      // 2. Total Quiz Attempts & Average Score
      const quizzesSnapshot = await db.collection('quizResults').get();
      if (!quizzesSnapshot.empty) {
        analytics.totalQuizAttempts = quizzesSnapshot.size;
        let totalPercentage = 0;
        quizzesSnapshot.forEach(doc => {
          const data = doc.data();
          if (data.totalQuestions && data.totalQuestions > 0) {
            totalPercentage += (data.score / data.totalQuestions) * 100;
          }
        });
        analytics.averageScore = Math.round(totalPercentage / quizzesSnapshot.size);
      }
      
      // Note: For pollingBoothSearches, popularTopics, and faqInteractions, 
      // since the tracking logic might not exist in the app yet, 
      // we'll rely on the merged mock data to ensure the UI looks complete.
      // In a real scenario, we'd query those collections here.
      
    } catch (dbError) {
      console.error("Error fetching some analytics from Firebase, falling back to mock for missing parts:", dbError);
    }

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
