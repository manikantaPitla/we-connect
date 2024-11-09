export const extractUserInfo = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};

export const generateCombineId = (currentUserId, requestUserId) => {
  return [currentUserId, requestUserId].sort().join("_");
};
