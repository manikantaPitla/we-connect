import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  declineConnectionRequest,
  getUserConnectionRequests,
} from "../../services";
import { SkeletonWrapper, UserItem } from "./style";
import { ButtonM } from "../../styles/commonStyles";
import { useLoading } from "../../hooks";
import Skeleton from "react-loading-skeleton";

import defaultProfileImage from "../../assets/images/default-user.webp";

function sentConnections() {
  const [userList, setUserList] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const { loading, stopLoading } = useLoading(true);

  const fetchSentRequests = async () => {
    try {
      const userList = await getUserConnectionRequests(user.uid);
      setUserList(userList);
    } catch (err) {
      console.log(err);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchSentRequests();
  }, []);

  const handleRemoveRequest = async (receivedUserId) => {
    try {
      await declineConnectionRequest(user.uid, receivedUserId, true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonWrapper key={index}>
              <Skeleton height={50} width={50} circle />
              <p>
                <Skeleton />
              </p>
              <Skeleton height={30} width={60} />
            </SkeletonWrapper>
          ))}
        </>
      ) : (
        <>
          {userList.length > 0 ? (
            <>
              {userList.map((user, index) => (
                <UserItem key={index}>
                  <img
                    src={user.thumbnailUrl || defaultProfileImage}
                    alt={user.displayName || "default profile"}
                    loading="lazy"
                  />
                  <p>{user.displayName}</p>
                  <div>
                    <ButtonM
                      $outline
                      type="button"
                      onClick={() => handleRemoveRequest(user.uid)}
                    >
                      Cancel
                    </ButtonM>
                  </div>
                </UserItem>
              ))}
            </>
          ) : (
            <p>No Requests</p>
          )}
        </>
      )}
    </>
  );
}

export default sentConnections;
