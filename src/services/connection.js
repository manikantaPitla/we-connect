import {
  db,
  arrayUnion,
  doc,
  arrayRemove,
  serverTimestamp,
} from "./firebaseFunctions";
import { getUserData } from "./chat";
import { generateCombineId } from "./user";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

export const sendConnectionRequest = async (senderId, receiverId) => {
  try {
    const senderData = await getUserData(senderId, true, true);

    if (senderData.includes(receiverId)) {
      throw new Error("Connection request already sent.");
    }

    const batch = writeBatch(db);

    const senderDocRef = doc(db, "users", senderId);
    const receiverDocRef = doc(db, "users", receiverId);

    batch.update(senderDocRef, {
      "connectionRequests.sent": arrayUnion(receiverId),
    });
    batch.update(receiverDocRef, {
      "connectionRequests.received": arrayUnion(senderId),
    });

    await batch.commit();
  } catch (error) {
    console.error("Error sending connection request:", error);
    throw error;
  }
};

export const getUserConnectionRequests = async (
  userId,
  isRequestUsers = true
) => {
  try {
    const usersIdList = await getUserData(userId, true, isRequestUsers);

    if (usersIdList !== undefined) {
      const usersQuery = query(
        collection(db, "users"),
        where("userInfo.uid", "in", usersIdList)
      );
      const querySnapshot = await getDocs(usersQuery);
      const requestUsersList = querySnapshot.docs.map(
        (doc) => doc.data().userInfo
      );
      return requestUsersList;
    }

    return [];
  } catch (error) {
    throw error;
  }
};

const modifyConnectionRequest = async (receivedUserId, requestUserId) => {
  const currentUserDocRef = doc(db, "users", receivedUserId);
  const requestUserDocRef = doc(db, "users", requestUserId);

  try {
    const batch = writeBatch(db);

    batch.update(currentUserDocRef, {
      "connectionRequests.received": arrayRemove(requestUserId),
    });

    batch.update(requestUserDocRef, {
      "connectionRequests.sent": arrayRemove(receivedUserId),
    });

    await batch.commit();
  } catch (error) {
    console.log("Error updating connection requests", error.message);
    throw error;
  }
};

const setUserToChats = async (receivedUserId, requestUserId) => {
  console.log({ receivedUserId, requestUserId });
  const currentUserRef = doc(db, "userChats", receivedUserId);
  const requestedUserRef = doc(db, "userChats", requestUserId);

  const combineId = generateCombineId(receivedUserId, requestUserId);

  try {
    const batch = writeBatch(db);

    const currentUserDoc = await getDoc(currentUserRef);

    if (currentUserDoc.exists()) {
      batch.update(currentUserRef, {
        [combineId]: {
          connectedUserId: requestUserId,
          lastMessage: "Connection request accepted",
          lastMessageTimeStamp: serverTimestamp(),
          unreadCount: 0,
        },
      });
    }

    const requestedUserDoc = await getDoc(requestedUserRef);

    if (requestedUserDoc.exists()) {
      batch.update(requestedUserRef, {
        [combineId]: {
          connectedUserId: receivedUserId,
          lastMessage: "Connection request accepted",
          lastMessageTimeStamp: serverTimestamp(),
          unreadCount: 0,
        },
      });
    }

    await batch.commit();
    console.log("Users added to chats successfully.");
  } catch (error) {
    throw error;
  }
};

export const acceptConnectionRequest = async (
  receivedUserId,
  requestUserId
) => {
  try {
    await modifyConnectionRequest(receivedUserId, requestUserId);
    await setUserToChats(receivedUserId, requestUserId);
  } catch (error) {
    console.log("SET USER TO CHAT ERROR: " + error.message);
    throw error;
  }
};

export const declineConnectionRequest = async (
  receivedUserId,
  requestUserId,
  isCancellingSentRequest = false
) => {
  try {
    isCancellingSentRequest
      ? await modifyConnectionRequest(requestUserId, receivedUserId)
      : await modifyConnectionRequest(receivedUserId, requestUserId);
    console.log("REMOVED BOTH USER REQUESTS LIST");
  } catch (error) {
    throw error;
  }
};
