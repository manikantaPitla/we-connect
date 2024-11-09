import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { generateCombineId } from "./user";

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

// Function to retrieve all chat data for a user
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
