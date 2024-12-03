export const extractUserInfo = (user) => {
  return {
    userId: user.userId,
    email: user.email,
    userName: user.userName,
    thumbnailURL: user.thumbnailURL,
  };
};
export const extractChatUserInfo = (user) => {
  return {
    chatId: user.chatId,
    userName: user.userName,
    thumbnailURL: user.thumbnailURL,
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

export const checkUserExist = (obj, id) =>
  obj.some((user) => user.userId === id);

export const getMediaFileSrc = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const fileSrc = reader.result;
      resolve(fileSrc);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
