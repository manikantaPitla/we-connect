import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const searchUser = async (searchValue, currentUserId) => {
  const searchQueryLower = searchValue.toLowerCase();

  try {
    // Search query adjusted to your new structure
    const userQuery = query(
      collection(db, "users"),
      and(
        where("userInfo.displayName", ">=", searchValue),
        where("userInfo.displayName", "<=", searchValue + "\uf8ff"),
        or(
          where("userInfo.displayName", ">=", searchQueryLower),
          where("userInfo.displayName", "<=", searchQueryLower + "\uf8ff")
        )
      )
    );

    const userQuerySnapshot = await getDocs(userQuery);

    const resultList = await Promise.all(
      userQuerySnapshot.docs.map(async (docSnapshot) => {
        const userData = docSnapshot.data();

        const isConnectionRequestPending =
          userData.connectionRequests.received.includes(currentUserId) ||
          userData.connectionRequests.sent.includes(currentUserId);

        const userChatDocRef = doc(
          db,
          "userChats",
          currentUserId,
          "chats",
          userData.userInfo.uid
        );
        const userChatDoc = await getDoc(userChatDocRef);

        return {
          ...userData.userInfo,
          alreadyConnected: userChatDoc.exists(),
          isConnectionRequestPending,
        };
      })
    );

    // Filter out the current user and return the result list
    return resultList.filter((user) => user.uid !== currentUserId);
  } catch (error) {
    throw new Error(`Error searching users: ${error.message}`);
  }
};

export const getUserData = async (
  id,
  connectionRequests = false,
  sentRequests = false
) => {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return connectionRequests
        ? sentRequests
          ? docSnap.data().connectionRequests.sent
          : docSnap.data().connectionRequests.received
        : docSnap.data().userInfo;
    }
  } catch (error) {
    throw new Error(
      `Error getting ${
        connectionRequests
          ? sentRequests
            ? "sent requests"
            : "recieve requests"
          : "user data"
      }`
    );
  }
};
