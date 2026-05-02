# Election Process Education Assistant (CivicGuide)

This is a **Full-Stack Application** built to guide learners through the election process with a clean, beautifully designed interface and a robust backend. 

## Tech Stack
- **Frontend:** React (powered by Vite)
- **Backend:** Node.js, Express
- **Database:** Firebase Firestore (Admin SDK)

---

## Project Structure

The project is split into two independent modules:
- `/client` - The Vite React frontend application.
- `/server` - The Node/Express REST API backend.

---

## Setup & Run Instructions

To successfully run both the frontend and backend locally, you will need to open **two separate terminal windows**.

### Step 1: Configure Firebase (Backend)
If you wish the backend to connect to a real database (rather than falling back to simulated memory data), you need a Firebase Service Account:
1. Go to your Firebase project console.
2. Navigate to Project Settings > Service Accounts.
3. Generate a new private key and download the `.json` file.
4. Rename it to `serviceAccountKey.json` and drop it strictly into the `/server` directory.

### Step 2: Seed the Database
*Only perform this if you provided the `serviceAccountKey.json` from Step 1.*
In your first terminal window:
```bash
cd server
npm install
npm run seed
```
This will automatically parse the election stages and populate your Firestore collections (`timelines`, `steps`, `faqs`).

### Step 3: Run the Server (Backend)
In your first terminal window:
```bash
cd server
npm install  # (If not already installed)
npm run dev
```
The server will now be live at `http://localhost:5000`.

### Step 4: Run the Client (Frontend)
Open a **second** terminal window:
```bash
cd client
npm install
npm run dev
```
Your modern frontend will spin up (usually at `http://localhost:5173`) and will instantly connect to your local backend to serve the timeline, steps, FAQs, and chatbot responses!
