import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCawIAPBNWwBnmdx0OQ6Xd6O8RsNAiQChQ",
  authDomain: "social-utopia-da98f.firebaseapp.com",
  projectId: "social-utopia-da98f",
  storageBucket: "social-utopia-da98f.appspot.com",
  messagingSenderId: "892685220806",
  appId: "1:892685220806:web:4a7b85d90028cc278b90c7"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");
export default app;