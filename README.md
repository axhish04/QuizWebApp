📚 Quiz Web App 🎯

An interactive quiz application built with React (Vite), Firebase, and Material-UI. Users can sign in, take quizzes fetched from Firestore, and see their scores on a leaderboard.

![Screenshot](https://github.com/axhish04/QuizWebApp/blob/master/public/Screenshot%202025-07-09%20233311.png)

🚀 Features

✅ User Authentication

Google Sign-In using Firebase Authentication

✅ Dynamic Quizzes

Quizzes and questions stored in Firestore Database

Loaded dynamically in the app

✅ Leaderboard

Stores and displays top scores from all users

✅ Responsive UI

Mobile-friendly with Material-UI and Framer Motion animations

✅ Real-time Firestore Integration

Fetch quizzes and submit results seamlessly


🖥️ Demo

 [👉 Live Demo](https://quiz-app-b43fc.web.app/)

📂 Folder Structure

src/

├── components/      
├── pages/            
├── firebase/         
├── App.jsx          
├── main.jsx          
└── styles/       

🛠 Setup Instructions

1️⃣ Clone the repository

git clone https://github.com/<your-username>/QuizWebApp.git
cd QuizWebApp

2️⃣ Install dependencies

npm install

3️⃣ Set up Firebase

Go to Firebase Console

Create a project and enable:

Authentication (Google Sign-In)

Cloud Firestore

Replace Firebase config in src/firebase/firebaseConfig.js:

const firebaseConfig = {

  apiKey: "YOUR_API_KEY",
  
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  
  projectId: "YOUR_PROJECT_ID",
  
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  
  messagingSenderId: "SENDER_ID",
  
  appId: "APP_ID"
  
};

4️⃣ Run the app

npm run dev
Visit http://localhost:5173 in your browser 🚀
