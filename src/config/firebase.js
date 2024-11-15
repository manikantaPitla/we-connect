import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "we-connect-dev-official.firebaseapp.com",
  projectId: "we-connect-dev-official",
  storageBucket: "we-connect-dev-official.appspot.com",
  messagingSenderId: "710292818478",
  appId: "1:710292818478:web:32c2d51f18efb03f572dbf",
  measurementId: "G-GG1MB1YK1W",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
export { onAuthStateChanged };
