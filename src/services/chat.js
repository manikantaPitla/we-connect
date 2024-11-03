import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const searchUser = async (searchValue, currentUserId) => {
  const searchQueryLower = searchValue.toLowerCase();

  try {
    const q = query(
      collection(db, "users"),
      and(
        where("displayName", ">=", searchValue),
        where("displayName", "<=", searchValue + "\uf8ff"),
        or(
          where("displayName", ">=", searchQueryLower),
          where("displayName", "<=", searchQueryLower + "\uf8ff")
        )
      )
    );

    const querySnapshot = await getDocs(q);

    const resultList = querySnapshot.docs
      .filter((doc) => doc.data().uid !== currentUserId)
      .map((doc) => doc.data());

    return resultList;
  } catch (e) {
    throw new Error(error.message);
  }
};

export const getUser = async (id) => {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    throw new Error("Error getting user.", error.message);
  }
};
