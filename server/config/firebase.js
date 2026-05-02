import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// Find the serviceAccountKey.json in the server directory
const serviceAccountPath = path.resolve('./serviceAccountKey.json');

let db;

try {
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    
    console.log('🔥 Firebase Admin initialized successfully.');
    db = admin.firestore();
  } else {
    console.warn('\n WARNING: serviceAccountKey.json not found in the server directory!');
    console.warn(' To connect to real Firestore database, please generate a service account key from your Firebase Console and save it as `server/serviceAccountKey.json`.');
    console.warn(' The server will run, but database queries will fail until credentials are provided.\n');
  }
} catch (error) {
  console.error(' Error initializing Firebase Admin: ', error);
}

export { db, admin };
