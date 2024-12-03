import {
  db,
  arrayUnion,
  doc,
  arrayRemove,
  serverTimestamp,
} from "./firebaseFunctions";
import { getUserChatData } from "./chat";
import { checkUserExist, extractUserInfo, generateCombineId } from "./user";
import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";

export const getUserConnections = async (
  requestedUserId,
  defaultData = "all"
) => {
  const connectionDocRef = doc(db, "connections", requestedUserId);

  try {
    const connectionDocData = await getDoc(connectionDocRef);

    if (!connectionDocData.exists()) {
      return [];
    }

    const connectionData = connectionDocData.data();
    switch (defaultData) {
      case "sent":
        return connectionData.sent;
      case "received":
        return connectionData.received;
      default:
        return connectionData;
    }
  } catch (error) {
    console.error("Error getting connections: ", error);
    throw error;
  }
};

export const sendConnectionRequest = async (senderId, receiverId) => {
  try {
    const senderConnectionData = await getUserConnections(senderId, "sent");

    if (checkUserExist(senderConnectionData)) {
      throw new Error("Connection request already sent.");
    }

    const isUserAlreadyConnected = await getUserChatData(
      senderId,
      receiverId,
      true
    );

    if (isUserAlreadyConnected.exists) {
      throw new Error("User already connected");
    }

    const batch = writeBatch(db);

    const senderDocRef = doc(db, "connections", senderId);
    const receiverDocRef = doc(db, "connections", receiverId);

    batch.update(senderDocRef, {
      sent: arrayUnion(receiverId),
    });
    batch.update(receiverDocRef, {
      received: arrayUnion(senderId),
    });

    await batch.commit();
  } catch (error) {
    console.error("connection request failed: ", error);
    throw error;
  }
};

export const getUserConnectionRequests = (
  requestUserId,
  requestType = "all",
  setConnectionsData
) => {
  return new Promise((resolve, reject) => {
    const connectionDocRef = doc(db, "connections", requestUserId);

    try {
      const unsubscribe = onSnapshot(
        connectionDocRef,
        async (connectionDocData) => {
          try {
            if (connectionDocData.exists()) {
              const connectionData = connectionDocData.data();

              let requestData = [];
              switch (requestType) {
                case "sent":
                  requestData = connectionData.sent;
                  break;
                case "received":
                  requestData = connectionData.received;
                  break;
                default:
                  requestData = connectionData;
                  break;
              }

              if (requestData && requestData.length > 0) {
                const usersQuery = query(
                  collection(db, "users"),
                  where("userId", "in", requestData)
                );

                const userDocData = await getDocs(usersQuery);
                const requestUsersList = userDocData.docs.map((doc) =>
                  extractUserInfo(doc.data())
                );

                setConnectionsData(requestUsersList);
                resolve(unsubscribe);
              } else {
                setConnectionsData([]);
                resolve(unsubscribe);
              }
            } else {
              setConnectionsData([]);
              resolve(unsubscribe);
            }
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(error);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

const modifyConnectionRequest = async (requestedUserId, recievedUserId) => {
  const requestedUserDocRef = doc(db, "connections", requestedUserId);
  const receivedUserDocRef = doc(db, "connections", recievedUserId);

  try {
    const batch = writeBatch(db);

    batch.update(requestedUserDocRef, {
      sent: arrayRemove(recievedUserId),
    });

    batch.update(receivedUserDocRef, {
      received: arrayRemove(requestedUserId),
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
        messages: [],
        chatInfo: {
          requestedBy: requestedUserId,
          acceptedBy: acceptingUserId,
          createdAt: serverTimestamp(),
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
  requestedUserId,
  receivedUserId
) => {
  try {
    await modifyConnectionRequest(requestedUserId, receivedUserId);
    await setUserToChats(receivedUserId, requestedUserId);
  } catch (error) {
    console.log("Failed to build connection" + error.message);
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
