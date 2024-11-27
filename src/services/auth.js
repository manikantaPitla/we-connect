import {
  doc,
  serverTimestamp,
  updateDoc,
  auth,
  db,
  realtimeDb,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  ref,
  onDisconnect,
  set,
  onValue,
} from "./firebaseFunctions";

import { getUserData } from "./chat";
import { signOut } from "firebase/auth";
import { writeBatch } from "firebase/firestore";

export const signUpWithEmail = async (userName, email, password) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredentials.user;

    await updateProfile(user, {
      displayName: userName,
    });

    await initializeNewUser(user);
  } catch (error) {
    console.error("Sign-up error:", error);
    throw error;
  }
};

const initializeNewUser = async (user) => {
  const batch = writeBatch(db);

  const userDefaultData = {
    userId: user.uid,
    userName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    thumbnailURL: user.photoURL,
    createdAt: serverTimestamp(),
    online: false,
    lastSeen: serverTimestamp(),
  };

  try {
    const userDocRef = doc(db, "users", user.uid);
    batch.set(userDocRef, userDefaultData, { merge: true });

    const userChatsDocRef = doc(db, "userChats", user.uid);
    batch.set(userChatsDocRef, {}, { merge: true });

    const userConnectionsDocRef = doc(db, "connections", user.uid);
    batch.set(
      userConnectionsDocRef,
      {
        sent: [],
        received: [],
      },
      { merge: true }
    );

    await batch.commit();
  } catch (error) {
    throw error;
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  }
};

export const signOutAuth = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("weConnect");
  } catch (error) {
    console.error("Sign-out error:", error);
  }
};

//below are not yet implemented

//to be deprecated
export const authUserProtection = async () => {
  return new Promise((resolve, reject) => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userInfo = await getUserData(user.uid);

          resolve(userInfo);
        } else {
          resolve(null);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        reject(error);
      } finally {
        unSubscribe();
      }
    });
  });
};

export const checkUserExistence = async (
  setUser,
  isNavigating = false,
  navigate
) => {
  try {
    const userInfo = await authUserProtection();
    if (userInfo) {
      setUser(userInfo);
    } else {
      isNavigating && navigate("auth/signin");
    }
  } catch (error) {
    isNavigating && navigate("page-error");
    console.log("user auth error :", error);
  }
};

// ****************************************************************

// Sync user's online status in Firestore and Realtime Database
const syncOnlineStatus = async (userId, isOnline) => {
  try {
    const statusRef = ref(realtimeDb, `status/${userId}`);
    await set(statusRef, {
      online: isOnline,
      lastSeen: serverTimestamp(),
    });

    await updateDoc(doc(db, "users", userId), {
      online: isOnline,
      lastSeen: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error syncing online status:", error);
    throw new Error("Failed to sync online status.");
  }
};

// Monitor user's connection status and update Firestore and Realtime Database
const monitorUserConnection = async () => {
  const user = auth.currentUser;

  if (user) {
    const userId = user.uid;
    const statusRef = ref(realtimeDb, `status/${userId}`);

    // Set offline status in Realtime Database when disconnected
    onDisconnect(statusRef).set({
      online: false,
      lastSeen: serverTimestamp(),
    });

    // Track connection status in Realtime Database
    const connectedRef = ref(realtimeDb, ".info/connected");
    onValue(connectedRef, async (snapshot) => {
      if (snapshot.val() === true) {
        // User is online
        await syncOnlineStatus(userId, true);

        // Listen for tab close or reload to set Firestore status
        window.addEventListener("beforeunload", async () => {
          await syncOnlineStatus(userId, false);
        });
      } else {
        // User is offline
        try {
          await updateDoc(doc(db, "users", userId), {
            online: false,
            lastSeen: serverTimestamp(),
          });
        } catch (error) {
          console.error("Error updating Firestore on disconnect:", error);
        }
      }
    });
  }
};
