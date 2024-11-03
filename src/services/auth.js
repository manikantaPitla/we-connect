import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// Create a new user
export const signUpWithEmail = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    await handleUserIdentification(userCredential.user);
  } catch (error) {
    throw error;
  }
};

// Login with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

//create users and usersChat collection
const handleUserIdentification = async (user) => {
  const userData = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };

  try {
    const userDocRef = doc(collection(db, "users"), user.uid);
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      await setDoc(userDocRef, userData);
      await setDoc(doc(db, "userChats", user.uid), {});
    }
  } catch (error) {
    throw error;
  }
};
