export {
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
export * from "../config/firebase";
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
export { ref, onDisconnect, set, onValue } from "firebase/database";
