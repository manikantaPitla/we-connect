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
  return new Date(timestamp).toLocaleString("en-US", {
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

export const getDateTime = (milliSeconds) => {
  const date = new Date(milliSeconds);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
