// Firebase v11 Modular SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA64h2pjcdtMd7rUEGY71Maax8geWcrPGM",
  authDomain: "quiz-app-b43fc.firebaseapp.com",
  projectId: "quiz-app-b43fc",
  storageBucket: "quiz-app-b43fc.firebasestorage.app",
  messagingSenderId: "98603418035",
  appId: "1:98603418035:web:adf167c877158e414f8bc6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };