import {
  db,
  arrayUnion,
  doc,
  arrayRemove,
  serverTimestamp,
} from "./firebaseFunctions";
import { getUserChatData, getUserData } from "./chat";
import { generateCombineId } from "./user";
import {
  collection,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";

export const sendConnectionRequest = async (senderId, receiverId) => {
  try {
    const senderData = await getUserData(senderId, true, true);

    if (senderData.includes(receiverId)) {
      throw new Error("Connection request already sent.");
    }

    const isUserAlreadyConnected = await getUserChatData(
      senderId,
      receiverId,
      true
    );
    console.log(isUserAlreadyConnected);

    if (isUserAlreadyConnected.exists) {
      throw new Error("User already connected");
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

    if (usersIdList && usersIdList.length > 0) {
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

const modifyConnectionRequest = async (requestedUserId, recievedUserId) => {
  const requestedUserDocRef = doc(db, "users", requestedUserId);
  const receivedUserDocRef = doc(db, "users", recievedUserId);

  try {
    const batch = writeBatch(db);

    batch.update(requestedUserDocRef, {
      "connectionRequests.sent": arrayRemove(recievedUserId),
    });

    batch.update(receivedUserDocRef, {
      "connectionRequests.received": arrayRemove(requestedUserId),
    });

    await batch.commit();
  } catch (error) {
    console.log("Error updating connection requests", error.message);
    throw error;
  }
};

const setUserToChats = async (acceptingUserId, requestedUserId) => {
  const acceptingUserDocRef = doc(db, "userChats", acceptingUserId);
  const requestedUserDocRef = doc(db, "userChats", requestedUserId);

  const combineId = generateCombineId(acceptingUserId, requestedUserId);
  const chatDocRef = doc(db, "chats", combineId);

  try {
    const batch = writeBatch(db);

    const acceptingUserDoc = await getDoc(acceptingUserDocRef);

    if (acceptingUserDoc.exists()) {
      batch.update(acceptingUserDocRef, {
        [combineId]: {
          connectedUserId: requestedUserId,
          lastMessage: "You are now connected",
          lastMessageTimeStamp: serverTimestamp(),
          unreadCount: 0,
        },
      });
    }

    const requestedUserDoc = await getDoc(requestedUserDocRef);

    if (requestedUserDoc.exists()) {
      batch.update(requestedUserDocRef, {
        [combineId]: {
          connectedUserId: acceptingUserId,
          lastMessage: "You are now connected",
          lastMessageTimeStamp: serverTimestamp(),
          unreadCount: 0,
        },
      });
    }

    const chatDoc = await getDoc(chatDocRef);
    if (!chatDoc.exists()) {
      batch.set(chatDocRef, {
        messages: arrayUnion({
          id: `${Date.now()}_${acceptingUserId}`,
          type: "connection",
          text: "You are now connected",
          senderId: acceptingUserId,
          media: null,
          timestamp: Timestamp.now(),
        }),
        createdAt: serverTimestamp(),
      });
    }

    await batch.commit();
    console.log("Users added to chats successfully.");
  } catch (error) {
    throw error;
  }
};

export const acceptConnectionRequest = async (
  requestedUserId,
  receivedUserId
) => {
  try {
    await modifyConnectionRequest(requestedUserId, receivedUserId);
    await setUserToChats(receivedUserId, requestedUserId);
  } catch (error) {
    console.log("SET USER TO CHAT ERROR: " + error.message);
    throw error;
  }
};

export const declineConnectionRequest = async (
  requestedUserId,
  receivedUserId,
  isCancellingSentRequest = false
) => {
  try {
    isCancellingSentRequest
      ? await modifyConnectionRequest(requestedUserId, receivedUserId)
      : await modifyConnectionRequest(receivedUserId, requestedUserId);
    console.log("REMOVED BOTH USER REQUESTS LIST");
  } catch (error) {
    throw error;
  }
};
