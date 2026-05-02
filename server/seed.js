import { db } from './config/firebase.js';

// Seed initial mock data into Firestore if credentials are provided
const seedDatabase = async () => {
  if (!db) {
    console.error(' Cannot seed database: DB not initialized (Missing serviceAccountKey.json)');
    return;
  }

  console.log(' Trashing old documents and seeding new data...');

  try {
    const timelines = [
      { order: 1, title: 'Voter Registration Deadline', date: '30 Days Before Election', desc: 'Last day to submit your voter registration form or update your address.', highlight: false },
      { order: 2, title: 'Early Voting Begins', date: '15 Days Before Election', desc: 'Polling places open early for those who cannot make it on the official election day.', highlight: false },
      { order: 3, title: 'Mail-in Ballots Due', date: 'Day Before Election', desc: 'If voting by mail, your ballot must be postmarked by this deadline.', highlight: false },
      { order: 4, title: 'Election Day', date: 'First Tuesday of November', desc: 'Polls are open from 7:00 AM to 8:00 PM. Make your voice heard!', highlight: true }
    ];

    const steps = [
      { stepNum: 1, title: 'Register to Vote ', desc: 'Fill out a quick form online or via mail to ensure your name is on the list of allowed voters.' },
      { stepNum: 2, title: 'Learn the Choices ', desc: 'Look up the people running for office and see what they promise to do if they win.' },
      { stepNum: 3, title: 'Find Your Polling Place ', desc: 'Check online to see exactly which building you need to go to on Voting Day.' },
      { stepNum: 4, title: 'Cast Your Ballot ', desc: 'Show up, pick your choices privately, and drop your ballot in the box or voting machine!', highlight: true }
    ];

    const faqs = [
      { question: "How do I know if I'm registered to vote?", answer: "You can easily verify your voter registration status through your state's official election website. Most states provide a simple online search tool." },
      { question: "Can I vote online?", answer: "Currently, general online voting is not securely available. However, many states allow you to register online and request a mail-in absentee ballot." },
      { question: "What if I make a mistake on my ballot?", answer: "If you are voting in person and make an error, simply ask a poll worker for a new ballot." },
      { question: "What happens if I'm in line when the polls close?", answer: "If you are waiting in line at your designated polling place before the official closing time, you have the legal right to cast your vote. Stay in line!" }
    ];

    const batch = db.batch();

    // Timeline Seed
    for (const dt of timelines) {
      const docRef = db.collection('timelines').doc(`timeline_${dt.order}`);
      batch.set(docRef, dt);
    }
    
    // Steps Seed
    for (const dt of steps) {
      const docRef = db.collection('steps').doc(`step_${dt.stepNum}`);
      batch.set(docRef, dt);
    }

    // FAQs Seed
    for (const [idx, dt] of faqs.entries()) {
      const docRef = db.collection('faqs').doc(`faq_${idx}`);
      batch.set(docRef, dt);
    }

    const pollingBooths = [
      { id: 1, boothName: 'Central High School', address: '123 Main St, Springfield', area: 'Downtown', city: 'Springfield', state: 'IL', pincode: '62701', boothNumber: 'A101', latitude: 39.7990, longitude: -89.6450 },
      { id: 2, boothName: 'Springfield Library', address: '456 Elm St, Springfield', area: 'Westside', city: 'Springfield', state: 'IL', pincode: '62702', boothNumber: 'B202', latitude: 39.8105, longitude: -89.6702 },
      { id: 3, boothName: 'Community Center', address: '789 Oak Ave, Shelbyville', area: 'North District', city: 'Shelbyville', state: 'IL', pincode: '62565', boothNumber: 'C303', latitude: 39.4062, longitude: -88.8080 },
      { id: 4, boothName: 'Lincoln Elementary', address: '321 Pine Rd, Capital City', area: 'South District', city: 'Capital City', state: 'IL', pincode: '62704', boothNumber: 'D404', latitude: 39.7654, longitude: -89.6644 }
    ];

    // Polling Booths Seed
    for (const booth of pollingBooths) {
      const docRef = db.collection('pollingBooths').doc(`booth_${booth.id}`);
      batch.set(docRef, booth);
    }

    await batch.commit();
    console.log(' Database seeded successfully!');
  } catch (error) {
    console.error(' Error during seeding:', error);
  }
};

seedDatabase();
