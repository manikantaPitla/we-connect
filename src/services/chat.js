import {
  and,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { generateCombineId } from "./user";
import { uploadMedia } from "./storage";

export const getUserChatData = async (
  currentUserId,
  connectedUserId,
  checkConnectionExist = false
) => {
  try {
    const userChatsRef = doc(db, "userChats", currentUserId);
    const userChatsDoc = await getDoc(userChatsRef);

    let userChatData = { exists: false, data: null };

    if (userChatsDoc.exists()) {
      const userChatsData = userChatsDoc.data();
      userChatData.data = userChatsData;

      if (checkConnectionExist) {
        const combineId = generateCombineId(currentUserId, connectedUserId);
        userChatData.exists = Boolean(userChatsData[combineId]);
      }

      return userChatData;
    }
    return userChatData;
  } catch (error) {
    console.error("Error checking if user chat exists:", error);
    throw new Error(`Failed to check chat existence between users.`);
  }
};

export const searchUser = async (searchValue, currentUserId) => {
  const searchQueryLower = searchValue.toLowerCase();

  try {
    const userQuery = query(
      collection(db, "users"),
      and(
        where("userInfo.displayName", ">=", searchQueryLower),
        where("userInfo.displayName", "<=", searchQueryLower + "\uf8ff")
      )
    );

    const userQuerySnapshot = await getDocs(userQuery);

    const resultList = await Promise.all(
      userQuerySnapshot.docs.map(async (docSnapshot) => {
        const userData = docSnapshot.data();
        const connectedUserId = userData.userInfo.uid;

        const userChatData = await getUserChatData(
          currentUserId,
          connectedUserId,
          true
        );

        const isConnectionRequestPending =
          userData.connectionRequests.received.includes(currentUserId) ||
          userData.connectionRequests.sent.includes(currentUserId);

        return {
          ...userData.userInfo,
          alreadyConnected: userChatData.exists,
          isConnectionRequestPending,
        };
      })
    );

    return resultList.filter((user) => user.uid !== currentUserId);
  } catch (error) {
    throw new Error(`Error searching users: ${error.message}`);
  }
};

export const getUserChats = async (currentUserId) => {
  try {
    const userChatsRef = doc(db, "userChats", currentUserId);
    const userChatsDoc = await getDoc(userChatsRef);

    if (userChatsDoc.exists()) {
      const userChatsData = userChatsDoc.data();

      const chatList = await Promise.all(
        Object.entries(userChatsData).map(async ([chatId, chatInfo]) => {
          const userData = await getUserData(chatInfo.connectedUserId);
          return {
            chatId,
            ...userData,
            ...chatInfo,
          };
        })
      );

      return chatList;
    } else {
      console.log("No chats found for this user.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching user chats:", error);
    throw new Error(`Failed to retrieve chats for user ${currentUserId}`);
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
      const data = docSnap.data();
      if (connectionRequests) {
        return sentRequests
          ? data.connectionRequests.sent
          : data.connectionRequests.received;
      }
      return data.userInfo;
    }
    return null;
  } catch (error) {
    throw new Error(`Error getting user data: ${error.message}`);
  }
};
export const sendMessage = async (
  senderId,
  receiverId,
  chatData,
  setMediaLoading
) => {
  const { message, file } = chatData;

  const combineId = generateCombineId(senderId, receiverId);
  try {
    let mediaURL = null;

    if (file) {
      const mediaType =
        (file.type.startsWith("image/") && "images") ||
        (file.type.startsWith("video/") && "videos") ||
        (file.type.startsWith("audio/") && "audios");
      mediaURL = await uploadMedia(senderId, mediaType, file, (progress) =>
        setMediaLoading(progress)
      );
    }

    const chatDocRef = doc(db, "chats", combineId);
    const senderChatRef = doc(db, "userChats", senderId);
    const receiverChatRef = doc(db, "userChats", receiverId);

    const timestamp = serverTimestamp();

    const batch = writeBatch(db);

    batch.update(chatDocRef, {
      messages: arrayUnion({
        id: `${Date.now()}_${senderId}`,
        type: "private",
        text: message,
        senderId,
        media: mediaURL,
        timestamp: Timestamp.now(),
      }),
    });

    batch.update(senderChatRef, {
      [`${combineId}.lastMessage`]: message || "Media Sent",
      [`${combineId}.lastMessageTimeStamp`]: timestamp,
      [`${combineId}.unreadCount`]: 0,
    });

    batch.update(receiverChatRef, {
      [`${combineId}.lastMessage`]: message || "Media Sent",
      [`${combineId}.lastMessageTimeStamp`]: timestamp,
      [`${combineId}.unreadCount`]: increment(1),
    });

    await batch.commit();
    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const getUserMessagesData = async (senderId, receiverId) => {
  const combineId = generateCombineId(senderId, receiverId);

  const messagesDocRef = doc(db, "chats", combineId);

  try {
    const messagesDocData = await getDoc(messagesDocRef);
    if (messagesDocData.exists()) {
      return messagesDocData.data();
    }
  } catch (error) {
    throw error;
  }
};
