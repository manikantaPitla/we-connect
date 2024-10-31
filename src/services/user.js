export const extractUserInfo = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};


export const generateCombineId = (currentUserId, userId) => {
    return currentUserId > userId
      ? currentUserId + userId
      : userId + currentUserId;
  };