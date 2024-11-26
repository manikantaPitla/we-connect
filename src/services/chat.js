import {
  and,
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

export const getUserChats = (currentUserId, setChatList) => {
  try {
    const userChatsRef = doc(db, "userChats", currentUserId);

    const unSubscribe = onSnapshot(userChatsRef, async (userChatsDoc) => {
      if (userChatsDoc.exists()) {
        const userChatsData = userChatsDoc.data();

        const chatList = await Promise.all(
          Object.entries(userChatsData).map(async ([chatId, chatInfo]) => {
            const { lastMessageTimeStamp, ...restData } = chatInfo;

            const userData = await getUserData(chatInfo.connectedUserId);
            const { uid, email, ...userDetails } = userData;

            const formattedChatInfo = {
              chatId,
              ...restData,
              ...userDetails,
              createdAt: userDetails.createdAt?.toMillis() || null,
              lastMessageTimeStamp: lastMessageTimeStamp?.toMillis() || null,
            };
            return formattedChatInfo;
          })
        );
        console.log(chatList);

        setChatList(chatList);
      } else {
        console.log("No chats found for this user.");
        setChatList([]);
      }
    });

    return unSubscribe;
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
  setMediaLoading,
  addNewMessage
) => {
  const { message, file } = chatData;

  const combineId = generateCombineId(senderId, receiverId);
  try {
    let mediaURL = null;
    let mediaType = null;

    if (file) {
      const mediaPath =
        (file.type.startsWith("image/") && "images") ||
        (file.type.startsWith("video/") && "videos") ||
        (file.type.startsWith("audio/") && "audios");

      console.log("path", mediaPath, mediaPath.slice(0, -1));

      mediaType = mediaPath.slice(0, -1);
      console.log("Media type", mediaType);
      mediaURL = await uploadMedia(senderId, mediaPath, file, (progress) =>
        setMediaLoading(progress)
      );
    }

    const chatDocRef = doc(db, "chats", combineId);
    const senderChatRef = doc(db, "userChats", senderId);
    const receiverChatRef = doc(db, "userChats", receiverId);

    const timestamp = Timestamp.now();

    const newMessageObj = {
      id: `${Date.now()}_${senderId}`,
      text: message || null,
      senderId,
      messageType: "chat",
      media: mediaURL,
      mediaType,
      timestamp,
      isDeleted: false,
      isEdited: false,
      reactions: {},
    };

    addNewMessage({ ...newMessageObj, timestamp: timestamp.toMillis() });

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
    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const getUserMessagesData = async (chatId, setMessages) => {
  const messagesDocRef = doc(db, "chats", chatId);

  try {
    const unSubscribe = onSnapshot(messagesDocRef, (messagesDocData) => {
      if (messagesDocData.exists()) {
        const messageData = messagesDocData.data();

        const messageList = messagesDocData
          .data()
          .messages.map((eachMessage) => {
            return {
              ...eachMessage,
              timestamp: eachMessage.timestamp.toMillis(),
            };
          });

        console.log(messageList);
        setMessages({
          createdAt: messageData.createdAt.toMillis(),
          messages: messageList,
        });
      }
    });

    return unSubscribe;
  } catch (error) {
    throw error;
  }
};
