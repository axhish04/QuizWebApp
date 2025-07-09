import { db } from './firebaseConfig';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';

// Get all quizzes
export const fetchQuizzes = async () => {
  const querySnapshot = await getDocs(collection(db, 'quizzes'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Save quiz result
export const saveQuizResult = async (userId, userName, quizId, score, total) => {
  await addDoc(collection(db, 'results'), {
    userId,
    userName,
    quizId,
    score,
    total,
    timestamp: Timestamp.now()
  });
};
