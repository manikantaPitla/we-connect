import {
  doc,
  serverTimestamp,
  setDoc,
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

export const signOutAuth = async () => {
  await signOut(auth);
  localStorage.removeItem("weConnect");
};

// Set default user data in Firestore
const handleUserIdentification = async (user) => {
  const userDefaultData = {
    userInfo: {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      thumbnailUrl: user.photoURL,
      createdAt: serverTimestamp(),
    },
    connectionRequests: {
      sent: [],
      received: [],
    },
  };

  try {
    await setDoc(doc(db, "users", user.uid), userDefaultData, { merge: true });
    await setDoc(doc(db, "userChats", user.uid), {});
  } catch (error) {
    console.error("Error during user identification:", error);
    throw error;
  }
};

//checking user exist in app or else return error
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
