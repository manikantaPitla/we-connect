import { auth, db, storage } from "../config/firebase";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const uploadMedia = async (
  userId,
  mediaType,
  file,
  progressCallback
) => {
  const date = new Date().getTime();
  const storageRef = ref(storage, `User Media/${userId}/${mediaType}/${date}`);

  const uploadTask = uploadBytesResumable(
    storageRef,
    file
    //     , {
    //     contentType: "image/jpeg",
    //   }
  );

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        if (progressCallback) {
          progressCallback(progress);
        }
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        resolve(downloadURL);
      }
    );
  });
};

export const updateUserProfile = async (dataToUpdate, userCallBack) => {
  const user = auth.currentUser;

  if (user) {
    try {
      await updateProfile(user, { ...dataToUpdate });

      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { ...dataToUpdate });

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        userCallBack(docSnap.data());
      }
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("No user is currently signed in.");
  }
};

// export const updateUserProfile = async (profilePic) => {
//   try {
//     await updateUserProfileData({ photoURL: profilePic });
//   } catch (error) {
//     throw new Error("Error updating user profile:", error.message);
//   }
// };

// export const updateUserName = async (displayName) => {
//   try {
//     await updateUserProfileData({ displayName });
//   } catch (error) {
//     throw new Error("Error updating username:", error.message);
//   }
// };

// export const updateUserNameAndProfile = async (displayName, profilePic) => {
//   try {
//     await updateUserProfileData({
//       photoURL: profilePic,
//       displayName,
//     });
//   } catch (error) {
//     throw new Error("Error updating profile and username :", error.message);
//   }
// };
