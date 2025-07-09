import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { auth, provider, db } from "./firebaseConfig";

// Google Sign-In
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// Email/Password Sign-In
export const signInWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Email/Password Sign-Up
export const signUpWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// Sign Out
export const logout = () => signOut(auth);

// Save Score
export const saveScore = async (user, quizId, score, percentage) => {
  await addDoc(collection(db, "scores"), {
    uid: user.uid,
    displayName: user.displayName || user.email,
    quizId,
    score,
    percentage,
    createdAt: new Date(),
  });
};

// Get Leaderboard
export const getLeaderboard = async (quizId) => {
  const q = query(
    collection(db, "scores"),
    orderBy("percentage", "desc"),
    limit(10)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(doc => doc.data())
    .filter(doc => doc.quizId === quizId);
};