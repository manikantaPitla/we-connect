export const extractUserInfo = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};

export const generateCombineId = (requestedUserId, requestUserId) => {
  return [requestedUserId, requestUserId].sort().join("_");
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
