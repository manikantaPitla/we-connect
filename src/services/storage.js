import { auth, db, storage } from "../config/firebase";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import Resizer from "react-image-file-resizer";

export const generateThumbnail = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

export const uploadMedia = async (
  userId,
  mediaType,
  file,
  progressCallback
) => {
  const date = new Date().getTime();
  const storageRef = ref(storage, `user_media/${userId}/${mediaType}/${date}`);

  const uploadTask = uploadBytesResumable(storageRef, file, {
    contentType: file.type,
  });

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
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const existingData = docSnap.data();

        const updatedUserInfo = {
          ...existingData,
          ...dataToUpdate,
        };

        await updateDoc(docRef, updatedUserInfo);

        const updatedDocSnap = await getDoc(docRef);

        if (updatedDocSnap.exists()) {
          userCallBack(updatedDocSnap.data());
        }
      }
    } catch (error) {
      throw error;
    }
  }
};
