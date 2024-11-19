export const extractUserInfo = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};
export const extractChatUserInfo = (user) => {
  return {
    chatId: user.chatId,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    thumbnailUrl: user.thumbnailUrl,
    connectedUserId: user.connectedUserId,
  };
};

export const generateCombineId = (senderId, receiverId) => {
  return [senderId, receiverId].sort().join("_");
};

export const getTime = (timestamp) => {
  return new Date(timestamp.seconds * 1000).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const resizeLastMessage = (message) => {
  if (message.length > 20) {
    return message.substring(0, 20) + " ...";
  }
  return message;
};
