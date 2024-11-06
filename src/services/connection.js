import {
  arrayUnion,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { getUser } from "./chat";

export const sendConnectionRequest = async (senderId, receiverId) => {
  const requestData = {
    senderId,
    timestamp: Timestamp.now(),
    status: "pending",
  };

  const receiverRef = doc(db, "connectionRequests", receiverId);
  const senderRef = doc(db, "connectionRequests", senderId);

  try {
    //checking if the connection request has already been sent
    const receiverDocSnap = await getDoc(receiverRef);
    if (receiverDocSnap.exists()) {
      const receivedRequests = receiverDocSnap.data().receivedRequests || [];
      const existingRequest = receivedRequests.find(
        (request) => request.senderId === senderId
      );

      if (existingRequest) {
        throw new Error("Connection request already sent");
      }
    }
    // Update the receiver's connection requests
    await updateDoc(receiverRef, {
      receivedRequests: arrayUnion(requestData),
    });

    // Optionally, update the sender's sent requests
    await updateDoc(senderRef, {
      sentRequests: arrayUnion({ receiverId, ...requestData }),
    });
  } catch (error) {
    throw error;
  }
};

// Function to get sent requests
export const getSentRequests = async (userId) => {
  const userRef = doc(db, "connectionRequests", userId);

  try {
    const userDocSnap = await getDoc(userRef);
    if (userDocSnap.exists()) {
      const sentRequests = userDocSnap.data().receivedRequests || [];
      const sentRequestUsersList = [];
      for (const sentRequestUser of sentRequests) {
        const docUser = await getUser(sentRequestUser.senderId);

        const returnObj = {
          displayName: docUser.displayName,
          photoUrl: docUser.thumbnail,
          status: sentRequestUser.status,
          timestamp: sentRequestUser.timestamp,
        };

        sentRequestUsersList.push(returnObj);
      }

      return sentRequestUsersList;
    }
    return [];
  } catch (error) {
    throw error;
  }
};

export const getReceivedRequests = async (userId) => {
  const userRef = doc(db, "connectionRequests", userId);

  try {
    const userDocSnap = await getDoc(userRef);
    if (userDocSnap.exists()) {
      const receivedRequests = userDocSnap.data().receivedRequests || [];
      const requestUsersList = [];

      for (const requestUser of receivedRequests) {
        const docUser = await getUser(requestUser.senderId);

        const returnObj = {
          displayName: docUser.displayName,
          photoUrl: docUser.thumbnail,
          status: requestUser.status,
          timestamp: requestUser.timestamp,
        };

        requestUsersList.push(returnObj);
      }

      return requestUsersList;
    }
    return [];
  } catch (error) {
    console.error("Error fetching received requests:", error);
    throw error;
  }
};

export const acceptConnectionRequest = () => {};
export const declineConnectionRequest = () => {};
