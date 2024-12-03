import {
  and,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../config/firebase";
import {
  checkUserExist,
  extractUserInfo,
  generateCombineId,
  getDateTime,
  getMediaFileSrc,
  getTime,
} from "./user";
import { generateThumbnail, uploadMedia } from "./storage";
import { getUserConnections } from "./connection";

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
        where("userName", ">=", searchQueryLower),
        where("userName", "<=", searchQueryLower + "\uf8ff")
      )
    );

    const userQuerySnapshot = await getDocs(userQuery);

    const resultList = await Promise.all(
      userQuerySnapshot.docs.map(async (docSnapshot) => {
        const userData = docSnapshot.data();
        const searchUserId = userData.userId;

        const [connectionData, userChatData] = await Promise.all([
          getUserConnections(searchUserId),
          getUserChatData(currentUserId, searchUserId, true),
        ]);

        const isConnectionPending =
          checkUserExist(connectionData.sent, searchUserId) ||
          checkUserExist(connectionData.received, searchUserId);

        return {
          ...extractUserInfo(userData),
          alreadyConnected: userChatData.exists,
          isConnectionPending,
        };
      })
    );

    return resultList.filter((user) => user?.userId !== currentUserId);
  } catch (error) {
    throw new Error(`Error searching users: ${error.message}`);
  }
};

export const getUserChats = async (currentUserId, setChatList) => {
  try {
    const userChatsRef = doc(db, "userChats", currentUserId);

    return new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(userChatsRef, async (userChatsDoc) => {
        try {
          if (userChatsDoc.exists()) {
            const userChatsData = userChatsDoc.data();

            const chatList = await Promise.all(
              Object.entries(userChatsData).map(async ([chatId, chatInfo]) => {
                const { lastMessageTimeStamp, connectedUserId, ...restData } =
                  chatInfo;

                const userData = await getUserProfileData(connectedUserId);
                const { userId, email, ...userDetails } = userData;

                return {
                  chatId,
                  ...restData,
                  ...userDetails,
                  connectedUserId,
                  createdAt: userDetails.createdAt?.toMillis() || null,
                  lastMessageTimeStamp:
                    lastMessageTimeStamp?.toMillis() || null,
                };
              })
            );

            setChatList((prev) => {
              const isDifferent =
                JSON.stringify(prev) !== JSON.stringify(chatList);
              return isDifferent ? chatList : prev;
            });

            resolve(chatList);
          } else {
            reject("No chat data found.");
          }
        } catch (error) {
          reject(error);
        }
      });

      return unsubscribe;
    });
  } catch (error) {
    throw error;
  }
};

export const getUserProfileData = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("Couldn't find user profile");
    }
  } catch (error) {
    throw error;
  }
};

//about to deprecate
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

const validateMedia = async (
  senderId,
  file,
  newMessageStatusObj,
  setMediaLoading,
  addNewMessage
) => {
  if (!file) {
    const emptyData = { mediaThumbnail: null, mediaType: null, mediaURL: null };

    addNewMessage({ ...newMessageStatusObj, ...emptyData });
    return emptyData;
  }

  try {
    const mediaPath =
      (file.type.startsWith("image/") && "images") ||
      (file.type.startsWith("video/") && "videos") ||
      (file.type.startsWith("audio/") && "audios");

    const mediaType = mediaPath.slice(0, -1);

    const dummyMediaURL = await getMediaFileSrc(file);
    const dummyMessageObj = {
      ...newMessageStatusObj,
      mediaType,
      mediaThumbnail: { name: file.name, url: dummyMediaURL },
      media: { name: file.name, url: dummyMediaURL },
      messageType: mediaType || "text",
    };
    addNewMessage(dummyMessageObj);

    let mediaThumbnail = null;

    if (file.type.startsWith("images/") || mediaPath === "images") {
      const thumbnailFile = (await generateThumbnail(file)) || null;

      const firebaseThumbnailURL = await uploadMedia(
        senderId,
        "images/chat/thumbnails",
        thumbnailFile
      );

      mediaThumbnail = { name: file.name, url: firebaseThumbnailURL };
    }

    const firebaseMediaURL = await uploadMedia(
      senderId,
      mediaPath,
      file,
      (progress) => setMediaLoading(progress)
    );

    return {
      mediaThumbnail,
      mediaType,
      mediaURL: { url: firebaseMediaURL, name: file.name },
    };
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (
  senderId,
  receiverId,
  chatData,
  setMediaLoading,
  addNewMessage,
  updateMessage
) => {
  const { message, file } = chatData;
  const combineId = generateCombineId(senderId, receiverId);
  const timestamp = Timestamp.now();

  try {
    const messageObj = {
      messageId: `${Date.now()}_${senderId}`,
      text: message || null,
      senderId,
      timestamp,
      isDeleted: false,
      isEdited: false,
      reactions: {},
    };

    const newMessageStatusObj = {
      ...messageObj,
      status: "sending",
      timestamp: getTime(timestamp.toMillis()),
    };

    const { mediaThumbnail, mediaType, mediaURL } = await validateMedia(
      senderId,
      file,
      newMessageStatusObj,
      setMediaLoading,
      addNewMessage
    );

    const chatDocRef = doc(db, "chats", combineId);
    const senderChatRef = doc(db, "userChats", senderId);
    const receiverChatRef = doc(db, "userChats", receiverId);

    const newMessageObj = {
      ...messageObj,
      mediaType,
      messageType: mediaType || "text",
      media: mediaURL,
      mediaThumbnail: mediaThumbnail,
    };

    const batch = writeBatch(db);

    batch.update(chatDocRef, {
      messages: arrayUnion(newMessageObj),
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

    updateMessage({ messageId: newMessageObj.messageId, status: "sent" });
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const getUserMessagesData = (chatId, setMessages) => {
  const messagesDocRef = doc(db, "chats", chatId);

  const unSubscribe = onSnapshot(messagesDocRef, (messagesDocData) => {
    if (messagesDocData.exists()) {
      const messageData = messagesDocData.data();

      const messageList = messagesDocData.data().messages.map((eachMessage) => {
        return {
          ...eachMessage,
          timestamp: getTime(eachMessage.timestamp.toMillis()),
        };
      });

      setMessages({
        chatInfo: {
          ...messageData.chatInfo,
          createdAt: getDateTime(messageData.chatInfo.createdAt.toMillis()),
        },
        messages: messageList,
      });
    }
  });

  return unSubscribe;
};

export const clearChat = async (chatId, chatUserId, deletingUserId) => {
  if (!chatId) return;
  try {
    const chatDocRef = doc(db, "chats", chatId);
    const deletingUserDocRef = doc(db, "userChats", deletingUserId);
    const currentChatUserDocRef = doc(db, "userChats", chatUserId);

    console.log({ chatId, chatDocRef });
    const chatDocData = await getDoc(chatDocRef);
    if (chatDocData.exists()) {
      if (chatDocData.data().messages.length === 0) {
      }
    }

    const batch = writeBatch(db);

    batch.update(deletingUserDocRef, {
      [`${chatId}.lastMessage`]: "Chat Cleared",
      [`${chatId}.lastMessageTimeStamp`]: Timestamp.now(),
    });

    batch.update(currentChatUserDocRef, {
      [`${chatId}.lastMessage`]: "Chat Cleared",
      [`${chatId}.lastMessageTimeStamp`]: Timestamp.now(),
    });

    await batch.commit();

    await updateDoc(chatDocRef, {
      messages: [],
    });
  } catch (error) {
    throw error;
  }
};
